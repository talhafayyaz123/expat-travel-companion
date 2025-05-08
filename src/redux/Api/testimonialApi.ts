import baseApi from "./baseApi";

const myTopApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        testimonial: build.query({
            query: (data: any) => {
                return {
                    url: "/testimonial",
                    method: "GET",
                    body: data
                }
            },
            
           
        }),
    
      
      

        
    }),
})


export const { useTestimonialQuery } = myTopApi