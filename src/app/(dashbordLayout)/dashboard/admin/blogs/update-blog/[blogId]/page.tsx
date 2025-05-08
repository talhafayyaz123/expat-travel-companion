"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudIcon } from "lucide-react";
import {
  blogPostSchema,
  BlogPostFormData,
} from "../../../../../../../schema/blogSchema";
import { useUpdateBlogMutation, useSingleBlogQuery } from "@/redux/Api/blogApi";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/loading";
import { Blog } from "@/types/Blog";
// import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.bubble.css";
import "react-quill-new/dist/quill.snow.css";
import { formats, modules } from "@/constants/editorData";
const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});
import Image from "next/image";
import { combinedCountryDataWithAllCountry } from "@/constants/countryOptions";

export default function UpdateBlogPost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const router = useRouter();

  const { blogId } = useParams<{ blogId: string }>();

  interface SingleDataResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: Blog;
    isLoading: boolean;
  }

  const { data: singleBlogData, isLoading: singleBlogLoading } =
    useSingleBlogQuery<SingleDataResponse>(blogId);


  const [updateBlog] = useUpdateBlogMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<BlogPostFormData>({});

  const [contentValue, setContentValue] = useState("");

  const [selectedCountry, setSelectedCountry] = useState<string | undefined>("");

  useEffect(() => {
    if (singleBlogData?.data) {
      const { country, content, services, title } = singleBlogData.data;
  
      reset({
        country,  
        content,
        banner: undefined,
        services,
        title,
      });
  
      setSelectedCountry(country); 
      setContentValue(content);
    }
  }, [singleBlogData, reset])

  const [preview, setPreview] = useState(true);

  const onSubmit = async (data: BlogPostFormData) => {
    setIsSubmitting(true);
    const formData = new FormData();

    try {
      const newData = {
        country: data?.country,
        services: data?.services,
        title: data?.title,
        content: contentValue,
      };
      formData.append("data", JSON.stringify(newData));
      if (data.banner && data.banner[0]) {
        formData.append(
          "banner",
          data.banner && data.banner[0] ? data.banner[0] : ""
        );
      }

      await updateBlog({ id: blogId, formData }).unwrap();
      toast.success("Blog updated successfully");
      router.push("/dashboard/admin/blogs");
      router.refresh();
      reset();
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error("Failed to update the blog post");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (singleBlogLoading) {
    return <Loader />;
  }



  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Update Blog Post</CardTitle>
          <p className="text-sm text-muted-foreground">
            Update your blog post details and content here.
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label>Post Banner</Label>
              <div className="relative">
                <div className="border-2 border-dashed rounded-lg p-8">
                  <div className="flex flex-col items-center justify-center gap-2">
                    {singleBlogData?.data?.banner && !isEditingImage ? (
                      <>
                        {/* <div className="relative">
                         <Image src={singleBlogData.data.banner} alt="" className="size-full" fill />
                        </div> */}
                        <img
                          className="h-[300px] w-full"
                          src={singleBlogData.data.banner}
                          alt=""
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="absolute top-2 right-2"
                          onClick={() => setIsEditingImage(true)}
                        >
                          Edit Image
                        </Button>
                      </>
                    ) : (
                      <>
                        <CloudIcon className="h-8 w-8 text-muted-foreground" />
                        <label
                          htmlFor="banner"
                          className="cursor-pointer text-blue-500 hover:underline"
                        >
                          Browse
                        </label>
                        <input
                          type="file"
                          id="banner"
                          className="hidden"
                          accept="image/*"
                          {...register("banner", {
                            onChange: (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setFileName(file.name);
                              }
                            },
                          })}
                        />
                        {fileName && (
                          <p className="text-sm text-green-600">
                            File selected: {fileName}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                {errors.banner && (
                  <p className="text-sm text-red-500">
                    {errors.banner.message}
                  </p>
                )}
              </div>
            </div>

            <Controller
              name="country"
              control={control}
              defaultValue={singleBlogData?.data?.country} 
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value} 
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {combinedCountryDataWithAllCountry.map((country, idx) => (
                      <SelectItem key={idx} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter your blog title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Blog Content</Label>

              <ReactQuill
                value={contentValue}
                onChange={(e) => setContentValue(e)}
                modules={modules}
                className=""
                formats={formats}
                theme="snow"
              />

              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Blog Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
