import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageCircle, Trash2, X } from "lucide-react";
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
  useDeleteMessagesMutation,
} from "@/redux/Api/messagesApi";
import { FaAngleDown, FaArrowDown, FaTrash } from "react-icons/fa6";
import { Dropdown, Menu, Space } from "antd";
import type { MenuProps } from "antd";
import { set } from "zod";
import { toast } from "sonner";
import { connectSocketWithUserId, socket } from "../../utilities/socket.js";
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

interface DeleteResponse {
  message: string;
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
  const [dropdownVisible, setDropdownVisible] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // const [showCheckbox, setShowCheckbox] = useState(false);
  const [deleteMessages, { isLoading: isDeleting }] =
    useDeleteMessagesMutation();

  const [selectedMessages, setSelectedMessages] = useState<any[]>([]);
  const [conversationQuery, setConversationQuery] = useState({});

  // Fetch user data
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
  } = useGetAllConversationsQuery(conversationQuery, {
    pollingInterval: isPolling,
  });

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
    // Only select the first conversation if none is currently selected
    if (!selectedConversation && conversations?.length) {
      const defaultConv = conversations[0];
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
  }, [allConversations, conversations, selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversation?.messages]);

  // When a conversation is selected, update selectedConversation with full messages from messagesData
  useEffect(() => {
    if (!selectedConversation || !messagesData?.data) return;
    if (
      selectedConversation.id === messagesData.data[0]?.conversationId &&
      (!selectedConversation.messages ||
        selectedConversation.messages.length !== messagesData.data.length ||
        selectedConversation.messages[0]?.id !== messagesData.data[0]?.id) // quick check
    ) {
      setSelectedConversation((conv) =>
        conv ? { ...conv, messages: messagesData.data } : conv
      );
    }
  }, [messagesData, selectedConversation]);

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

  useEffect(() => {
    if (userData && userData.data.id) {
      connectSocketWithUserId(userData.data.id);
      const onConnect = () => {
        console.log("Socket ID:", socket.id, "Connected:", socket.connected);
      };

      socket.on("connect", onConnect);
      // If already connected (hot reload), call handler immediately
      if (socket.connected) {
        onConnect();
      }
      // Cleanup: remove connect listener and any others
      return () => {
        socket.off("connect", onConnect);
      };
    }
  }, [socket, userData]);

  useEffect(() => {
    const handleNewMessage = ({
      from_user_id,
      conversation_id,
    }: {
      from_user_id: string;
      conversation_id: string;
    }) => {
      // If the notification is for the currently open conversation, refetch messages
      if (selectedConversation && conversation_id === selectedConversation.id) {
        if (typeof refetch === "function") refetch();
      }
      // Optionally, you can refetch other data here if needed
    };

    socket.on("message_received_notification", handleNewMessage);

    return () => {
      socket.off("message_received_notification", handleNewMessage);
    };
  }, [selectedConversation, refetch]);

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

      // Find the recipient (other participant)
      const to_user_id = selectedConversation.participants.find(
        (id) => id !== userData?.data?.id
      );

      if (socket.connected && to_user_id) {
        socket.emit("message_sent", {
          to_user_id,
          conversation_id: selectedConversation.id,
          from_user_id: userData?.data?.id,
          text: input,
        });
      }
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
    setSelectedConversation(conversation);
    // selectedMessages will be set after messagesData loads
  };

  const handleNewConversationClick = async (id: string) => {
    try {
      await createConversation([id, userData?.data?.id]).unwrap();
      setDropdownOpen(false);
      setConversationQuery({ is_user: id }); // This will trigger GET with query string
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  const handleDeleteMessage = (messageId: any) => {
    setSelectedMessages([messageId]);
    setDropdownVisible(null);
  };

  // Toggle dropdown visibility
  const toggleDropdown = (id: string) => {
    setDropdownVisible(dropdownVisible === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle checkbox state change
  const handleCheckboxChange = (id: any) => {
    setSelectedMessages((prevSelectedMessages) => {
      // If id exists in the selectedMessages, remove it
      if (prevSelectedMessages.includes(id)) {
        return prevSelectedMessages.filter((messageId) => messageId !== id);
      }
      // Otherwise, add the id
      else {
        return [...prevSelectedMessages, id];
      }
    });
  };

  const handleDelete = async () => {
    if (!selectedConversation) return;

    const allMessageIds = selectedConversation.messages.map((msg) => msg.id);
    if (!allMessageIds.length) return;

    try {
      // Pass both messageIds and conversationId
      const response = await deleteMessages({
        messageIds: allMessageIds,
        conversationId: selectedConversation.id, // Pass the conversationId here
      }).unwrap();

      toast.success("Messages deleted successfully!");

      // Remove messages from selectedConversation
      setSelectedConversation((conv) => {
        if (!conv) return conv;
        const updatedMessages = conv.messages.filter(
          (m) => !allMessageIds.includes(m.id)
        );
        if (updatedMessages.length === 0) return null;
        return { ...conv, messages: updatedMessages };
      });

      setConversations((prevConvs) =>
        prevConvs.filter((conv) => {
          if (conv.id !== selectedConversation?.id) return true;
          const updatedMessages = conv.messages.filter(
            (m) => !allMessageIds.includes(m.id)
          );
          return updatedMessages.length > 0;
        })
      );

      setSelectedMessages([]);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete messages.");
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
                  className="users-dropdown absolute top-7 pb-5 pt-2 right-0 mt-2 w-full bg-white border rounded shadow overflow-hidden z-50"
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
              {/* Conversation */}

              <div className="max-h-[320px] overflow-y-auto">
                {conversations?.length ? (
                  conversations
                    .filter((conv) => {
                      const otherParticipantIds = conv.participants.filter(
                        (id: string) => id !== userData?.data?.id
                      );
                      const uniqueOtherParticipantIds: string[] = Array.from(
                        new Set(otherParticipantIds)
                      );
                      return uniqueOtherParticipantIds.length > 0;
                    })
                    .map((conv) => {
                      // Get all other participant IDs except the current user
                      const otherParticipantIds = conv.participants.filter(
                        (id: string) => id !== userData?.data?.id
                      );
                      // Remove duplicates
                      const uniqueOtherParticipantIds: string[] = Array.from(
                        new Set(otherParticipantIds)
                      );
                      // Only show names if there is at least one other participant
                      const displayNames =
                        uniqueOtherParticipantIds.length > 0
                          ? uniqueOtherParticipantIds
                              .map((id: string) => {
                                const name =
                                  typeof participants[id] === "string"
                                    ? participants[id]
                                    : "Unknown";
                                return `${name}`;
                              })
                              .join(", ")
                          : "(No other participant)";

                      const senderId =
                        conv.participants.find(
                          (id) => id !== userData?.data?.id
                        ) || "Unknown";

                      const isSelected =
                        selectedConversation &&
                        selectedConversation.id === conv.id;

                      return (
                        <div
                          key={conv.id}
                          className={`relative p-2 cursor-pointer rounded-lg flex items-center justify-between ${
                            isSelected
                              ? "bg-blue-500 text-white"
                              : "hover:bg-gray-200"
                          }`}
                          onClick={() => handleSelectedConversation(conv)}
                        >
                          <span>{displayNames}</span>

                          {selectedConversation &&
                            selectedConversation.messages && (
                              <button
                                className="ml-auto rounded p-1"
                                disabled={isDeleting}
                                onClick={handleDelete}
                              >
                                <Trash2
                                  className={`${
                                    isSelected ? "text-white" : "text-red-700"
                                  }`}
                                  height={20}
                                  width={20}
                                />
                              </button>
                            )}
                        </div>
                      );
                    })
                ) : (
                  <p className="text-gray-500">No conversations available.</p>
                )}

                {/* Conversation Count */}
                {/* {selectedConversation &&
                  selectedConversation.messages.length > 0 && (
                    <div className="mt-3">
                      <span className="text-[15px] font-semibold">{`Selected (${selectedConversation.messages.length})`}</span>
                    </div>
                  )} */}
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
                  messagesData?.data.map((msg: any) => (
                    <div key={msg.id} className="flex items-center my-2">
                      {/* Checkbox on the left side */}
                      {/* {showCheckbox && (
                        <div className="mr-2">
                          <input
                            type="checkbox"
                            checked={selectedMessages.includes(msg.id)}
                            onChange={() => handleCheckboxChange(msg.id)}
                            className="cursor-pointer"
                          />
                        </div>
                      )} */}

                      {/* Message bubble */}
                      <div
                        className={`p-2 rounded-lg max-w-[75%] ${
                          msg.senderId === userData?.data?.id
                            ? "bg-blue-500 text-white self-end ml-auto"
                            : "bg-gray-300 text-black"
                        } relative flex-1`}
                      >
                        {/* Custom Dropdown Trigger */}
                        {/* {!showCheckbox && (
                          <div className="absolute bottom-[19px] right-[15px] z-50">
                            <button
                              className="text-white"
                              onClick={() => toggleDropdown(msg.id)}
                            >
                              <FaAngleDown />
                            </button> */}

                        {/* Custom Dropdown Menu */}
                        {/* {dropdownVisible === msg.id && (
                              <div
                                ref={dropdownRef}
                                className="absolute right-0 bg-white text-black rounded w-20 shadow-lg"
                              >
                                <ul>
                                  <li>
                                    <a
                                      href="#"
                                      className="block px-4 py-2 text-sm cursor-pointer rounded hover:text-red-600"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        handleDeleteMessage(msg.id);
                                        setShowCheckbox(true);
                                      }}
                                    >
                                      Delete
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        )} */}

                        {/* Message Text */}
                        <span className="block leading-4">{msg.text}</span>

                        {/* Message Time */}
                        <span className="block ms-auto text-[10px] max-w-max">
                          {new Date(msg.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No messages in this conversation.
                  </p>
                )}
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
