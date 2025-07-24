import messagesBaseApi from "./messagesBaseApi";

const messagesApi = messagesBaseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllConversations: build.query({
      query: (params) => {
        let url = "/conversations";
        if (params?.is_user) {
          url += `?is_user=${params.is_user}`;
        }
        return {
          url,
          method: "GET",
        };
      },
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
    // Mutation for marking messages as seen
    markConversationMessagesAsSeen: build.mutation({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}/mark-seen`,
        method: 'GET',
      }),
      invalidatesTags: ['Conversation'],
    }),
     getUnreadMessagesCount: build.query({
      query: () => {
        let url = "/conversations/unread";
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Conversations"],
    }),
  }),
});

export const {
  useGetAllConversationsQuery,
  useGetUnreadMessagesCountQuery,
  useCreateConversationMutation,
  useGetConversationQuery,
  useSendMessageMutation,
  useGetMessageByConvoQuery,
  useDeleteMessagesMutation,
  useMarkConversationMessagesAsSeenMutation
} = messagesApi;
