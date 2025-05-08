// stripeApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stripeApi = createApi({
  reducerPath: "stripeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.stripe.com/v1/",
    prepareHeaders: (headers) => {
      const apiKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;
      if (apiKey) {
        headers.set("Authorization", `Bearer ${apiKey}`);
      } else {
        console.error(
          "Stripe API key is not defined in the environment variables"
        );
      }
      headers.set("Content-Type", "application/x-www-form-urlencoded");
      return headers;
    },
  }),
  endpoints: (build) => ({
    createPaymentMethod: build.mutation({
      query: (data: any) => ({
        url: "payment_methods",
        method: "POST",
        body: new URLSearchParams(data), // Format data as x-www-form-urlencoded
      }),
    }),
  }),
});

// Export the hook for using this API
export const { useCreatePaymentMethodMutation } = stripeApi;
export default stripeApi;
