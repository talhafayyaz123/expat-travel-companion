import messagesBaseApi from "./messagesBaseApi";

const messagesApi = messagesBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllConversations: build.query({
      query: () => ({
        url: "/conversations",
        method: "GET",
      }),
      providesTags: ["Conversations"],
    }),
    createConversation: build.mutation({
      query: (participants) => ({
        url: "/conversations",
        method: "POST",
        body: { participants },
      }),
      invalidatesTags: ["Conversation"],
    }),
    getConversation: build.query({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}`,
        method: "GET",
      }),
      providesTags: ["Conversation"],
    }),
    sendMessage: build.mutation({
      query: ({ conversationId, text }) => ({
        url: `/conversations/message`,
        method: "POST",
        body: { conversationId, text },
      }),
      invalidatesTags: ["Conversation"],
    }),

     deleteMessages: build.mutation<void, { messageIds: string[], conversationId: string }>({
      query: ({ messageIds, conversationId }) => ({
        url: "/conversations/messages/delete-all",
        method: "POST",
        body: { messageIds, conversationId },  
      }),
      invalidatesTags: ["Conversation"],
    }),

    getMessageByConvo: build.query({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}/messages`,
        method: "GET",
      }),
      providesTags: ["Conversation"],
    }),
  }),
});

export const {
  useGetAllConversationsQuery,
  useCreateConversationMutation,
  useGetConversationQuery,
  useSendMessageMutation,
  useGetMessageByConvoQuery,
  useDeleteMessagesMutation,
} = messagesApi;
