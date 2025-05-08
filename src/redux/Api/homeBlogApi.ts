import baseApi from "./baseApi"
import { BlogResponse, BlogQueryParams } from "@/types/blogTypeHome"

const homeBlogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    blogs: build.query<BlogResponse, BlogQueryParams>({
      query: ({ page, limit, country, service }) => {
        const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
          ...(country && { country }),
          ...(service && { service })
        })
        
        return {
          url: `/blog?${params.toString()}`,
          method: "GET",
        }
      },
    }),
    singleBlog: build.query({
        query: (id) => ({
            url: `blog/${id}`,
            method: "GET",
          }),

          
       
    }),
  }),
})

export const { useBlogsQuery,useSingleBlogQuery } = homeBlogApi
