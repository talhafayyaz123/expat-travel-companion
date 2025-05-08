import { Blog } from "@/types/Blog";
import baseApi from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allBlogs: builder.query({
      query: ({ page = 1, limit = 10, country, service }) =>
        `/blog?page=${page}&limit=${limit}&country=${country}&service=${service}`,
      providesTags: ["blog"],
    }),

    // Corrected endpoint to fetch a single blog
    singleBlog: builder.query<string, string>({
      query: (id) => `/blog/${id}`,
      providesTags: ["blog"],
    }),

    createBlog: builder.mutation({
      query: (blog) => ({
        url: `/blog`,
        method: "POST",
        body: blog,
      }),
      invalidatesTags: ["blog"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/blog/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation<Blog, Blog>({
      query: (blog) => ({
        url: `/blog/${blog.id}`,
        method: "DELETE",
        body: blog,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAllBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useCreateBlogMutation,
  useSingleBlogQuery, // This is the hook for singleBlog
} = blogApi;
