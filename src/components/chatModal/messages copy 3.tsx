import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  useGetUserQuery,
  useLazyGetUserByIdQuery,
  useAllUserQuery,
} from "@/redux/Api/userApi";
import {
  useSendMessageMutation,
  useGetMessageByConvoQuery,
  useCreateConversationMutation,
  useGetAllConversationsQuery,
  useDeleteMessageMutation,
} from "@/redux/Api/messagesApi";

interface MessageProps {
  id: string;
  conversationId: string;
  text: string;
  senderId: string;
  createdAt: string;
}

interface ConversationProps {
  id: string;
  createdAt: string;
  participants: string[];
  messages: MessageProps[];
}

interface ChatModalProps {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  floatingButtonIsDisplayed: boolean;
  setFloatingButtonDisplay: (val: boolean) => void;
  allConversations: ConversationProps[];
}

export default function MessagesModal({
  isOpen,
  setOpen,
  floatingButtonIsDisplayed,
  setFloatingButtonDisplay,
  allConversations,
}: ChatModalProps) {
  const [input, setInput] = useState("");
  const [conversations, setConversations] =
    useState<ConversationProps[]>(allConversations);
  const [selectedConversation, setSelectedConversation] =
    useState<ConversationProps | null>(null);
  const [participants, setParticipants] = useState<Record<string, string>>({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  const { data: userData, isLoading, isError } = useGetUserQuery(undefined);
  const [sendMessage] = useSendMessageMutation();
  const [createConversation] = useCreateConversationMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const pollInterval = isOpen ? 10000 : 0;
  const { data: convResp, refetch } = useGetAllConversationsQuery(undefined, {
    pollingInterval: pollInterval,
  });
  const [fetchUser] = useLazyGetUserByIdQuery();
  const { data: allUsers } = useAllUserQuery();

  const shouldPollMsgs = isOpen && !!selectedConversation?.id;
  const { data: msgsResp, isLoading: msgsLoading } = useGetMessageByConvoQuery(
    selectedConversation?.id,
    {
      skip: !selectedConversation?.id,
      pollingInterval: shouldPollMsgs ? 10000 : 0,
    }
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sync conversations
  useEffect(() => {
    if (convResp?.data) setConversations(convResp.data);
  }, [convResp]);

  // Default conversation + fetch names
  useEffect(() => {
    if (conversations.length && !selectedConversation) {
      const defaultC = conversations[0];
      const other = defaultC.participants.find(
        (id) => id !== userData?.data?.id
      )!;
      setSelectedConversation({ ...defaultC, participants: [other] });
    }
    fetchNames();
  }, [conversations, userData]);

  // Scroll down on messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  // Fetch participant display names
  const fetchNames = async () => {
    const pairs = await Promise.all(
      conversations.map(async (c) => {
        const other = c.participants.find((id) => id !== userData?.data?.id)!;
        try {
          const r = await fetchUser(other).unwrap();
          return { [other]: `${r.data.firstName} ${r.data.lastName}` };
        } catch {
          return { [other]: "Unknown" };
        }
      })
    );
    setParticipants(Object.assign({}, ...pairs));
  };

  const handleSelect = (msgId: string, yes: boolean) => {
    setSelectedMessages((prev) =>
      yes ? [...prev, msgId] : prev.filter((id) => id !== msgId)
    );
  };

  // **Replace** old message with the new one
  const handleSend = async () => {
    if (!input.trim() || !selectedConversation) return;

    const newMsg: MessageProps = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      text: input,
      senderId: userData?.data?.id || "Unknown",
      createdAt: new Date().toISOString(),
    };

    try {
      await sendMessage({
        conversationId: selectedConversation.id,
        text: input,
      }).unwrap();
    } catch (err) {
      console.error("Send failed", err);
    }

    // Keep only the newly sent message in state
    setSelectedConversation((conv) =>
      conv && conv.id === selectedConversation.id
        ? { ...conv, messages: [newMsg] }
        : conv
    );
    setInput("");
  };

  const handleDelete = async () => {
    if (!selectedConversation || !selectedMessages.length) return;
    try {
      await Promise.all(
        selectedMessages.map((id) => deleteMessage({ messageId: id }).unwrap())
      );
      setSelectedConversation((conv) =>
        conv
          ? {
              ...conv,
              messages: conv.messages.filter(
                (m) => !selectedMessages.includes(m.id)
              ),
            }
          : conv
      );
      setSelectedMessages([]);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <>
      {floatingButtonIsDisplayed && (
        <button
          onClick={() => {
            setOpen(true);
            setFloatingButtonDisplay(false);
          }}
          className="fixed bottom-5 right-5 bg-primary text-white p-3 rounded-full shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setOpen(open);
          setFloatingButtonDisplay(!open);
        }}
      >
        <DialogContent className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg">
          <span className="hidden">
            <DialogTitle>Chat</DialogTitle>
          </span>
          <div className="flex h-96">
            {/* Left: Conversations */}
            <div className="w-1/3 border-r p-2 overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-2 mb-2 relative">
                <h3 className="text-lg font-bold">Conversations</h3>
                <button onClick={() => setDropdownOpen((d) => !d)}>
                  <PlusCircle />
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    isOpen && dropdownOpen
                      ? { height: "250px", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  className="absolute top-7 right-0 w-full bg-white border rounded shadow overflow-hidden"
                >
                  <h3 className="text-base font-bold border-b pb-2 text-center">
                    Users
                  </h3>
                  <div className="py-2 max-h-[200px] overflow-y-auto">
                    {allUsers?.data?.data?.map((u: any) => (
                      <button
                        key={u.id}
                        onClick={async () => {
                          await createConversation([
                            u.id,
                            userData?.data?.id!,
                          ]).unwrap();
                          refetch();
                          setDropdownOpen(false);
                        }}
                        className="p-2 block mx-auto w-3/4 rounded-lg bg-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white mt-2"
                      >
                        {u.firstName} {u.lastName}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
              {conversations.map((c) => {
                const other = c.participants.find(
                  (id) => id !== userData?.data?.id
                )!;
                return (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedConversation({ ...c, participants: [other] });
                      setSelectedMessages([]);
                    }}
                    className={`p-2 cursor-pointer rounded-lg ${
                      selectedConversation?.id === c.id
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {participants[other] || "Unknown"}
                  </div>
                );
              })}
            </div>

            {/* Right: Chat */}
            <div className="w-2/3 flex flex-col">
              <div className="flex justify-between items-center p-2 border-b">
                <h3 className="text-lg font-bold">
                  {selectedConversation
                    ? participants[selectedConversation.participants[0]]
                    : "Select a conversation"}
                </h3>
                <button
                  onClick={() => {
                    setOpen(false);
                    setFloatingButtonDisplay(true);
                  }}
                  className="p-1 rounded-full bg-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                {msgsLoading ? (
                  <p className="text-gray-500">Loading…</p>
                ) : selectedConversation?.messages.length ? (
                  selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className="flex items-start justify-between mb-2"
                    >
                      <div
                        className={`p-2 rounded-lg max-w-[75%] ${
                          msg.senderId === userData?.data?.id
                            ? "bg-blue-500 text-white self-end ml-auto"
                            : "bg-gray-300 text-black"
                        }`}
                      >
                        <span className="block leading-4">{msg.text}</span>
                        <span className="block ms-auto text-[10px]">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        className="mt-1 ml-2"
                        checked={selectedMessages.includes(msg.id)}
                        onChange={(e) => handleSelect(msg.id, e.target.checked)}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No messages in this conversation.
                  </p>
                )}
                <div ref={messagesEndRef} />
              </div>

              {selectedConversation && (
                <div className="p-2 border-t flex items-center">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Type a message…"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <button
                    onClick={handleSend}
                    className="ml-2 px-4 py-2 bg-primary text-white rounded-lg"
                  >
                    Send
                  </button>
                  {selectedMessages.length > 0 && (
                    <button
                      onClick={handleDelete}
                      className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg"
                    >
                      Delete ({selectedMessages.length})
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
