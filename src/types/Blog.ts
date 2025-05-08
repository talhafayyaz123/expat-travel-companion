import { Member } from "./Member";



export interface Blog {
  data: any;
  id?: string;
  banner: string;
  title: string;
  content: string;
  country: string;
  services: string;
  authorId?: string;
  createdAt?: string;
  updatedAt?: string;
  author?: Member;
}

