import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        talkingPoints: build.mutation({
            query: (data) => {
                return {
                    url: "/takingPoint/create",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["TalkingPoints"],
        }),
        getTalkingPoints: build.query({
            query: () => {
                return {
                    url: "/takingPoint/get-my-taking",
                    method: "GET",
                };
            },
            providesTags: ["TalkingPoints"],
        }),
        getProfTalkingPoints: build.query({
            query: (id) => {
                return {
                    url: `/takingPoint/user/${id}`,
                    method: "GET",
                };
            },
            providesTags: ["TalkingPoints"],
        }),
        talkingPointsUpda: build.mutation({
            query: ({ formdata, id }) => {
                return {
                    url: `/takingPoint/${id}`,
                    method: "PUT",
                    body: formdata,
                };
            },
            invalidatesTags:["TalkingPoints"],
        }),
    }),
});

export const { 
    useTalkingPointsMutation, 
    useGetTalkingPointsQuery, 
    useGetProfTalkingPointsQuery, 
    useTalkingPointsUpdaMutation 
} = userApi;
