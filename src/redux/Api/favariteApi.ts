import baseApi from "./baseApi";

const favariteApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        myfavAdd: build.mutation({
            query: (data: any) => ({
                url: "/favorites/toggle",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["favourite","AllDestination","Destination","Lifestyle"]
        }),

        getMyfav: build.query({
            query: () => ({
                url: "favorites",
                method: "GET",
            }),
            providesTags: ["favourite","AllDestination","User"],
        }),
    }),
})


export const { useMyfavAddMutation, useGetMyfavQuery } = favariteApi