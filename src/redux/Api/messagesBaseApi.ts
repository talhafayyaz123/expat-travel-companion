import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const messagesBaseApi = createApi({
  reducerPath: "messaagesBaseApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://6b94-39-60-236-60.ngrok-free.app/api",
     baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      const token = Cookies.get("token");
      if (token) {
        headers.set("Authorization", `${token}`);
      } else {
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Conversations", "Conversation"],
});

export default messagesBaseApi;
