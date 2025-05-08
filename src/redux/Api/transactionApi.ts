import { MembershipPlanType } from "@/schema/MembershipPlanSchema";
import baseApi from "./baseApi";

const memberShipApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // All transaction
    allTransaction: builder.query({
      query: () => "/payment",
      providesTags: ["transaction"],
    }),

    // All transaction
    thisDayTransaction: builder.query({
      query: () => "/payment/last-day",
      providesTags: ["transaction"],
    }),

    // All transaction
    totalRevinue: builder.query({
      query: () => "/payment/all-revenue",
      providesTags: ["transaction"],
    }),

    // All transaction
    totalMember: builder.query({
      query: () => "/payment/all-member",
      providesTags: ["member"],
    }),

   
  }),
  overrideExisting: true,
});

export const { useAllTransactionQuery,useThisDayTransactionQuery,useTotalMemberQuery,useTotalRevinueQuery } = memberShipApi;
