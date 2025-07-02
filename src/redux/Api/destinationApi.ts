import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    destinationAdd: build.mutation({
      query: (data: any) => {
        return {
          url: "/destination",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllDestination"],
    }),
    getDestination: build.query({
      query: () => {
        return {
          url: "destination/my-destination",
          method: "GET",
        };
      },
      providesTags: ["AllDestination", "User"],
    }),
    getSingleDes: build.query({
      query: (destinationId) => ({
        url: `destination/${destinationId}`,
        method: "GET",
      }),
      providesTags: ["AllDestination"],
    }),
    updateDest: build.mutation({
      query: (updateData) => ({
        url: `destination/${updateData.id}`, // Use the `id` to define the URL
        method: "PUT",
        body: {
          travelType: updateData.travelType,
          TravelBegins: updateData.TravelBegins,
          destinationCountry: updateData.destinationCountry,
          destinationCity: updateData.destinationCity,
          haveRoom: updateData.haveRoom,
        },
        invalidatesTags: ["AllDestination"],
      }),
    }),
    getSingleUserDes: build.query({
      query: (destinationId) => ({
        url: `destination/user/${destinationId}`,
        method: "GET",
      }),
      providesTags: ["AllDestination", "User"],
    }),
    deleteDest: build.mutation({
      query: (destinationId) => ({
        url: `destination/${destinationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllDestination", "User"],
    }),
  }),
});

export const {
  useDestinationAddMutation,
  useGetDestinationQuery,
  useGetSingleDesQuery,
  useUpdateDestMutation,
  useGetSingleUserDesQuery,
  useDeleteDestMutation,
} = userApi;
