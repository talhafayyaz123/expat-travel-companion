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
} from "@/redux/Api/messagesApi";

interface ChatModalProps {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  floatingButtonIsDisplayed: boolean;
  setFloatingButtonDisplay: (val: boolean) => void;
  allConversations: ConversationProps[];
}

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

interface User {
  id: string;
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
  const [refreshConversations, setRefreashConversations] = useState(10);

  const { data: userData, isLoading, isError } = useGetUserQuery(undefined);

  const [
    sendMessage,
    { isLoading: sendMessageLoading, isError: sendMessageError },
  ] = useSendMessageMutation();

  const [
    createConversation,
    { isLoading: createConversationLoading, isError: createConversationError },
  ] = useCreateConversationMutation();

  const isPolling = isOpen ? 10000 : 0;

  const {
    data: getConversations,
    error,
    isLoading: isConversationsLoading,
    refetch,
  } = useGetAllConversationsQuery(undefined, { pollingInterval: isPolling });

  const [
    fetchUser,
    { data: userByIdData, isLoading: userLoading, isError: userError },
  ] = useLazyGetUserByIdQuery();

  const {
    data: allUsers,
    isLoading: allUsersLoading,
    isError: allUsersError,
  } = useAllUserQuery(undefined);

  const shouldPoll = isOpen && !!selectedConversation?.id;

  const {
    data: messagesData,
    isLoading: messagesLoading,
    isError: messagesError,
  } = useGetMessageByConvoQuery(selectedConversation?.id, {
    skip: !selectedConversation?.id,
    pollingInterval: shouldPoll ? 10000 : 0,
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setConversations(getConversations?.data);
  }, [getConversations]);

  useEffect(() => {
    const defaultConv = conversations?.length ? conversations[0] : null;
    if (defaultConv) {
      const senderId =
        defaultConv.participants.find((id) => id !== userData?.data?.id) ||
        "Unknown";

      const defaultConvObj = { ...defaultConv, participants: [senderId] };

      setSelectedConversation(defaultConvObj);
    }

    fetchParticipantNames().then((names) => {
      const pairs = Object.assign({}, ...names);
      setParticipants(pairs);
    });
  }, [allConversations, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  const fetchParticipantNames = async () => {
    if (!conversations) return [];

    const names = await Promise.all(
      conversations.map(async (conv) => {
        const participantId = conv.participants.find(
          (participant) => participant !== userData?.data?.id
        );
        return handleFetchUserName(participantId);
      })
    );

    return names;
  };

  const handleFetchUserName = async (id: string | undefined) => {
    if (!id) return "";

    try {
      const response = await fetchUser(id).unwrap();
      return {
        [id]: response?.data?.firstName + " " + response?.data?.lastName,
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return "Unknown";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !selectedConversation) return;

    const newMessage: MessageProps = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      text: input,
      senderId: userData?.data?.id || "Unknown",
      createdAt: new Date().toISOString(),
    };

    const selectedConv = conversations.find(
      (conv) => conv.id === selectedConversation.id
    );

    try {
      await sendMessage({
        conversationId: selectedConversation.id,
        text: input,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }

    const senderId =
      selectedConversation.participants.find(
        (id) => id !== userData?.data?.id
      ) || "Unknown";

    const updateSelectedConv = {
      ...selectedConv!,
      messages: [...selectedConversation?.messages, newMessage],
      participants: [senderId],
    };

    setSelectedConversation(updateSelectedConv);
    setInput("");
  };

  const handleSelectedConversation = (conversation: ConversationProps) => {
    const senderId =
      conversation.participants.find((id) => id !== userData?.data?.id) ||
      "Unknown";

    const convObj = { ...conversation, participants: [senderId] };
    setSelectedConversation(convObj);
  };

  const handleNewConversationClick = async (id: string) => {
    try {
      await createConversation([id, userData?.data?.id]).unwrap();
      setDropdownOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
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

      {/* Chat Modal */}
      <Dialog
        open={isOpen}
        onOpenChange={(state) => {
          setOpen(state);
          setFloatingButtonDisplay(!state);
        }}
      >
        <DialogContent className="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg z-[9991]">
          <span className="hidden">
            <DialogTitle></DialogTitle>
          </span>
          <div className="flex h-96">
            {/* Left Panel - Conversations List */}
            <div className="w-1/3 border-r p-2 overflow-y-auto">
              <div className="flex justify-between items-center border-b pb-2 mb-2 relative">
                <h3 className="text-lg font-bold max-w-max">Conversations</h3>

                {/* Button to toggle dropdown */}
                <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <PlusCircle />
                </button>

                {/* Animated Dropdown */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    isOpen && dropdownOpen
                      ? { height: "250px", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="users-dropdown absolute top-7 pb-5 pt-2 right-0 mt-2 w-full bg-white border rounded shadow overflow-hidden"
                >
                  <h3 className="text-base font-bold border-b pb-2 text-center">
                    Users
                  </h3>
                  <div className="py-2 max-h-[200px] overflow-y-auto">
                    {allUsers?.data?.map((user: any) => (
                      <button
                        key={user?.id}
                        className="p-2 cursor-pointer w-[75%] block mx-auto rounded-lg text-center bg-gray-200 text-blue-500 hover:bg-blue-500 hover:text-white first:mt-0 mt-2"
                        onClick={() => handleNewConversationClick(user?.id)}
                      >
                        {user?.firstName + " " + user?.lastName}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="max-h-[320px] overflow-y-auto">
                {conversations?.length ? (
                  conversations.map((conv) => {
                    const senderId =
                      conv.participants.find(
                        (id) => id !== userData?.data?.id
                      ) || "Unknown";
                    return (
                      <div
                        key={conv.id}
                        className={`p-2 cursor-pointer rounded-lg ${
                          selectedConversation?.id === conv.id
                            ? "bg-blue-500 text-white"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => handleSelectedConversation(conv)}
                      >
                        {participants[senderId]}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500">No conversations available.</p>
                )}
              </div>
            </div>

            {/* Right Panel - Chat Messages */}
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

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                {messagesLoading ? (
                  <p className="text-gray-500">Loading...</p>
                ) : messagesData?.data?.length ? (
                  messagesData?.data.map((msg: MessageProps) => (
                    <div
                      key={msg.id}
                      className={`p-2 my-2 rounded-lg max-w-[75%] ${
                        msg.senderId === userData?.data?.id
                          ? "bg-blue-500 text-white self-end ml-auto"
                          : "bg-gray-300 text-black"
                      }`}
                    >
                      <span className="block leading-4">{msg.text}</span>
                      <span className="block ms-auto text-[10px] max-w-max">
                        {new Date(msg.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No messages in this conversation.
                  </p>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              {selectedConversation && (
                <div className="p-2 border-t flex">
                  <input
                    type="text"
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Type a message..."
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
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
