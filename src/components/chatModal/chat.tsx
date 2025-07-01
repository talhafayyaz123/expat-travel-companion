import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle, X } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  useCreateConversationMutation,
  useGetAllConversationsQuery,
  useGetMessageByConvoQuery,
  useSendMessageMutation,
} from "@/redux/Api/messagesApi";
import { useGetUserQuery } from "@/redux/Api/userApi";

interface ChatModalProps {
  isOpen: boolean;
  setOpen: (val: boolean) => void;
  floatingButtonIsDisplayed: boolean;
  setFloatingButtonDisplay: (val: boolean) => void;
  profileId: any;
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
  messages: MessageProps[];
  createdAt: string;
  participants: string[];
}

export default function ChatModal({
  isOpen,
  setOpen,
  floatingButtonIsDisplayed,
  setFloatingButtonDisplay,
  profileId,
}: ChatModalProps) {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<ConversationProps>([]);
  // const [messages, sendMessage] = useState<MessageProps[]>([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { data: userData, isLoading, isError } = useGetUserQuery(undefined);

  const {
    data: conversations,
    error,
    isLoading: isConversationsLoading,
    refetch,
  } = useGetAllConversationsQuery(undefined);

  const [
    createConversation,
    { isLoading: createConversationLoading, isError: createConversationError },
  ] = useCreateConversationMutation();

  const [
    sendMessage,
    { isLoading: sendMessageLoading, isError: sendMessageError },
  ] = useSendMessageMutation();

  const shouldPoll = isOpen && !!conversation?.id;

  const {
    data: messagesData,
    isLoading: messagesLoading,
    isError: messagesError,
  } = useGetMessageByConvoQuery(conversation?.id, {
    skip: !conversation?.id,
    pollingInterval: shouldPoll ? 10000 : 0,
  });

  const participants = [profileId, userData?.data?.id];

  // useEffect(() => {
  //   if (!conversations?.data) return;

  //   const currentConv = conversations.data.filter((conv: any) =>
  //     participants.every((part) => conv.participants.includes(part))
  //   );

  //   if (currentConv?.length > 0) {
  //     setConversation(currentConv[0]);
  //     currentConv[0].messages;
  //   } else {
  //     createCurrentConversation();
  //   }
  // }, [conversations]);

  // const createCurrentConversation = async () => {
  //   try {
  //     await createConversation(participants).unwrap();
  //     refetch();
  //   } catch (error) {
  //     console.error("Failed to create conversation:", error);
  //   }
  // };

  useEffect(() => {
    if (!conversations?.data) return;

    const currentConv = conversations.data.filter((conv: any) =>
      participants.every((part) => conv.participants.includes(part))
    );

    if (currentConv.length > 0) {
      setConversation(currentConv[0]);
    } else {
      createCurrentConversation();
    }
  }, [conversations]);

  const createCurrentConversation = async () => {
    try {
      const response = await createConversation(participants).unwrap();
      refetch(); // Refresh conversations
    } catch (error: any) {
      // console.log(error);
      // console.error(
      //   "❌ Failed to create conversation:",
      //   error?.data || error?.message || error
      // );
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: MessageProps = {
      id: Date.now().toString(),
      conversationId: conversation?.id,
      text: input,
      senderId: userData?.data?.id || "Unknown",
      createdAt: new Date().toISOString(),
    };

    try {
      await sendMessage({
        conversationId: conversation.id,
        text: input,
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Chat Button (Visible when modal is minimized) */}
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
        <DialogContent
          aria-describedby={undefined}
          className="max-w-md p-4 bg-white rounded-lg shadow-lg z-[9991]"
        >
          <span className="hidden">
            <DialogTitle></DialogTitle>
          </span>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Chat</h2>
            <span className="text-[12px] text-center">
              You can send Zoom or Google Meet
              <br /> invites through the message system
            </span>

            {/* Close Button (Minimizes chat) */}
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

          <div className="h-80 overflow-y-auto p-4">
            {messagesData?.data?.map((msg: MessageProps) => (
              <div
                key={msg.id}
                className={`p-2 my-2 rounded-lg max-w-[75%] ${
                  msg.senderId === userData?.data?.id
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-300 text-black"
                }`}
              >
                <span className="block leading-4 break-words">{msg.text}</span>{" "}
                <span className="block ms-auto max-w-max text-[10px]">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
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
        </DialogContent>
      </Dialog>
    </>
  );
}
