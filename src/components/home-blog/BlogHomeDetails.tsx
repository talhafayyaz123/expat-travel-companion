"use client";

import { useSingleBlogQuery } from "@/redux/Api/homeBlogApi";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, usePathname } from "next/navigation";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface SingleBlogProps {
  id: string;
}

export default function BlogHomeDetails() {
  const { id } = useParams();

  const { data, isLoading, error } = useSingleBlogQuery(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Skeleton className="w-full h-[400px] rounded-lg mb-8" />
        <Skeleton className="w-3/4 h-10 mb-4" />
        <Skeleton className="w-32 h-6 mb-8" />
        <div className="space-y-4">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-red-500">
          Failed to load blog post. Please try again later.
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center text-muted-foreground">
          Blog post not found.
        </div>
      </div>
    );
  }

  const blog = data?.data;

  return (
    <article className="container mx-auto mt-[160px] px-4 py-8 ">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
        <Image
          src={blog.banner}
          alt={blog.title}
          fill
          className="object-cover "
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-white mb-2">{blog.title}</h1>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>
                By {blog.author.firstName} {blog.author.lastName}
              </span>
              <span>•</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        {/* Split content by newlines and create proper paragraphs */}

        <div className="mt-4 text-[15px] font-[400] text-[400]">
          <div
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="custom-class"
          />
        </div>
      </div>

      <footer className="mt-8 pt-8 border-t">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Country:</span>
            <span className="text-sm text-muted-foreground">
              {blog.country}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Service:</span>
            <span className="text-sm text-muted-foreground">
              {blog.services}
            </span>
          </div>
        </div>
      </footer>
    </article>
  );
}
