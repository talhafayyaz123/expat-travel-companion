import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        lifeCicleAdd: build.mutation({
            query: (data: any) => {
                return {
                    url: "/lifestyle/create",
                    method: "POST",
                    body: data
                }
            },
            invalidatesTags:["Lifestyle"]
            
           
        }),
        lifStyleMy: build.query({
            query: () => {
                return {
                    url: "/lifestyle/my-lifestyle",
                    method: "GET",
            
                }
            },
            providesTags:["Lifestyle"]
            
           
        }),
        getLifestyleUser: build.query({
            query: (id) => ({
                url: `lifestyle/user/${id}`,
                method: "GET",
              }),
              providesTags:["Lifestyle"]


              
           
        }),
        updateLifeStyle: build.mutation({
            query: (data) => ({
                url: `/lifestyle`,
                method: "PUT",
                body:data
              }),
              invalidatesTags:["Lifestyle"]


              
           
        }),

        
    }),
})


export const { useLifeCicleAddMutation,useLifStyleMyQuery,useGetLifestyleUserQuery ,useUpdateLifeStyleMutation} = userApi