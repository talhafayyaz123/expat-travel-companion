export interface Author {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  
  export interface Blog {
    id: string
    banner: string
    title: string
    content: string
    authorId: string
    country: string
    services: string
    createdAt: string
    updatedAt: string
    author: Author
  }
  
  export interface BlogResponse {
    success: boolean
    statusCode: number
    message: string
    data: {
      totalBlogs: number
      currentPage: number
      totalPages: number
      blogs: Blog[]
    }
  }
  
  export interface BlogQueryParams {
    page: number
    limit: number
    country?: string
    service?: string
  }
  
  