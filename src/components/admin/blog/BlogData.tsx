"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowAltCircleRight, FaTrash } from "react-icons/fa";
import { LiaEdit, LiaTrashAltSolid } from "react-icons/lia";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, LoaderIcon } from "lucide-react";
import { useAllBlogsQuery, useDeleteBlogMutation } from "@/redux/Api/blogApi";
import Loader from "@/app/loading";
import { Blog } from "@/types/Blog";

import blogWord from "@/assets/blog-word.svg";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

interface props {
  blogData: { data: { blogs: Blog[] } };
  isBlogDataLoading: boolean;
}

const BlogData = ({ blogData, isBlogDataLoading }: props) => {
  const [page, setPage] = useState(1); // You can manage this in your component state
  const [limit, setLimit] = useState(10);
  const router = useRouter();
  const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const blogs = blogData?.data.blogs;

  // const handleNavigate = () => {
  //   router.push("")
  // }

  const handleDelete = async (
    blog: Blog,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      e.preventDefault();
      await deleteBlog(blog);

      setDialogOpen(false);
      toast.success("Blog deleted");
    } catch (error) {
      toast.error("Try again");
    }
  };

  return (
    <div className="p-4 rounded-md  mt-10 overflow-x-auto w-full">
      {" "}
      <div className="flex flex-col gap-5  w-full">
        {" "}
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="card flex xl:flex-row flex-col gap-2 h-full justify-between flex-shrink-0 bg-white p-3 rounded-md w-full min-w-0"
          >
            <div className="flex xl:flex-row flex-col xl:items-center md:gap-12 gap-5 ">
              <div className="relative xl:h-[131px] xl:w-[128px]    h-[250px] md:h-[370px]   shrink-0 md:w-full w-full mx-auto ">
                <Image src={blog.banner} alt="" className="size-full" fill />
                <div className="absolute  border-2 border-white w-full top-3"></div>
                <div className="absolute  border-2 border-white w-full bottom-3"></div>
                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white font-semibold md:text-lg text-xl z-20">
                  <p className="text-white/70 md:text-sm text-lg">
                    {blog.services}
                  </p>
                </div>
                <div className="absolute inset-0 bg-[rgba(0,0,0,0.7)] z-10"></div>
              </div>
              <div className="flex flex-col gap-3  max-sm:min-w-[250px]">
                <h3 className="  max-sm:font-semibold">{blog.title}</h3>
                <div className="flex gap-2 items-center">
                  <Image src={blogWord} alt="" height={16} width={16} />
                  <p>{blog.content.length}</p>
                </div>
                <div
                  className="md:text-sm text-xs"
                  dangerouslySetInnerHTML={{
                    __html: blog.content.slice(0, 200),
                  }}
                >
                  {/* {blog.content.slice(0, 200)} */}
                </div>
              </div>
            </div>
            {/*  */}

            <div className="action flex items-center gap-2 h-full  shrink-0   md:w-[120px] w-[80px] xl:justify-end">
              <Button
                onClick={() =>
                  router.push(`/dashboard/admin/blogs/update-blog/${blog.id}`)
                }
                variant="outline"
                className="flex items-center gap-2"
                //   onClick={openDialog}
              >
                <LiaEdit className="text-lg" />
              </Button>

              {/* Dialog for Deletion Confirmation */}

              <Button
                className="border text-white bg-white rounded "
                onClick={(e) => handleDelete(blog, e)}
              >
                {isLoading ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <FaTrash className="text-red-500" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogData;
