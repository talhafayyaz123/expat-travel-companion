import baseApi from "./baseApi";

const myTopApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        mytopAdd: build.mutation({
            query: (data: any) => {
                return {
                    url: "/selection/create",
                    method: "POST",
                    body: data
                }
                

                
            },
            invalidatesTags:["MyTop"]
            
           
        }),
        getMyTop: build.query({
            query: () => {
                return {
                    url: "selection/get-my",
                    method: "GET",
                }
            },
            providesTags: ["MyTop"],

            
           
        }),
        getSingleMyTop: build.query({
            query: (id) => {
                return {
                    url: `selection/user/${id}`,
                    method: "GET",
                }
            },
            providesTags: ["MyTop"],

            
           
        }),
        getProfMyTopView: build.query({
            query: (id) => ({
                url: `/selection/user/${id}`,
                method: "GET",
            }),
            providesTags: ["MyTop"],


              
           
        }),
        mytopUpdata: build.mutation({
            query: ({ formdata, id }) => ({
              url: `/selection/${id}`,  
              method: "PUT",          
              body: formdata,        
            }),
            invalidatesTags: ["MyTop"], 
          }),
          
      

        
    }),
})


export const { useMytopAddMutation,useGetMyTopQuery,useGetProfMyTopViewQuery,useMytopUpdataMutation ,useGetSingleMyTopQuery} = myTopApi