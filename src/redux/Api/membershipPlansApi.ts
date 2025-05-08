import { MembershipPlanType } from "@/schema/MembershipPlanSchema";
import baseApi from "./baseApi";

const memberShipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allMembershipPlan: builder.query({
      query: () => "/payment/prices",
      providesTags: ["plan"],
    }),

    // Mutation for updating an existing plan
    deletePlan: builder.mutation<MembershipPlanType, MembershipPlanType>({
      query: (plan) => ({
        url: `/payment/prices/${plan.id}`, // Ensure the URL includes the plan's ID
        method: "DELETE", // Use PUT for update
        body: plan, // Send the updated plan data
      }),
      invalidatesTags: ["plan"], // You might want to invalidate the relevant tags to refresh the cache
    }),
    // Mutation for updating an existing plan
    updatePlan: builder.mutation<MembershipPlanType, MembershipPlanType>({
      query: (plan) => ({
        url: `/payment/prices/${plan.id}`, // Ensure the URL includes the plan's ID
        method: "PUT", // Use PUT for update
        body: plan, // Send the updated plan data
      }),
      invalidatesTags: ["plan"], // You might want to invalidate the relevant tags to refresh the cache
    }),

    // Mutation for creating a new membership plan (assuming this is intended as a new plan creation)
    createNewMembershipPlan: builder.mutation<
      MembershipPlanType,
      MembershipPlanType
    >({
      query: (plan: any) => ({
        url: `/payment/create-price`,
        method: "POST",
        body: plan,
      }),
      invalidatesTags: ["plan"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAllMembershipPlanQuery,
  useUpdatePlanMutation,
  useCreateNewMembershipPlanMutation,
  useDeletePlanMutation
} = memberShipApi;
