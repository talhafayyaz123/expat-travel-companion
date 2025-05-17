import { Member } from "@/types/Member";
import baseApi from "./baseApi";

const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allMember: builder.query({
      query: () => "/users/get-all-users",
      providesTags: ["member"],
    }),

    makeAdmin: builder.mutation<Member, Member>({
      query: (plan: any) => ({
        url: `/users/make-admin`,
        method: "POST",
        body: plan,
      }),
      invalidatesTags: ["member"],
    }),

    summitVerifyMember: builder.mutation<Member, Member>({
      query: (member) => ({
        url: `/users/member/${member.id}`,
        method: "PUT",
        body: member,
      }),
      invalidatesTags: ["member"],
    }),

    hideUnhideMember: builder.mutation<Member, Member>({
      query: (member) => ({
        url: `/users/hide-unhide/${member.id}`,
        method: "PUT",
        body: member,
      }),
      invalidatesTags: ["member"],
    }),

    deleteMember: builder.mutation<Member, Member>({
      query: (member) => ({
        url: `/users/delete/${member.id}`,
        method: "DELETE",
        body: member,
      }),
      invalidatesTags: ["member"],
    }),
  }),
});

export const {
  useAllMemberQuery,
  useSummitVerifyMemberMutation,
  useHideUnhideMemberMutation,
  useDeleteMemberMutation,
  useMakeAdminMutation,
} = memberApi;
