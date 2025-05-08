"use client";

import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CloudIcon, Key } from "lucide-react";

import { useCreateBlogMutation } from "@/redux/Api/blogApi";
import { useGetUserQuery } from "@/redux/Api/userApi";
import { toast } from "sonner";
import { formats, modules } from "@/constants/editorData";
import { useRouter } from "next/navigation";
import {
  
  combinedCountryDataWithAllCountry,
} from "@/constants/countryOptions";
import { servicesOption } from "@/constants/servicesOption";

type Inputs = {
  title: string;
  banner: string;
  services: string;
  country: string;
};

export default function CreateBlogPost() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [contentValue, setContentValue] = useState("");
  const router = useRouter();

  const [createNewBlog, { isLoading, isError }] = useCreateBlogMutation();
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery({});

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const formData = new FormData();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const newData = {
        country: data.country,
        services: data.services,
        title: data.title,
        content: contentValue,
      };

      formData.append("data", JSON.stringify(newData));
      if (data.banner && data.banner[0]) {
        formData.append(
          "banner",
          data.banner && data.banner[0] ? data.banner[0] : ""
        );
      }
      await createNewBlog(formData);
      toast.success("Blog created");
      router.push("/dashboard/admin/blogs");
      router.refresh();
    } catch (error) {
    
    }
  };

  const serviceCategories = [
    "Assessments, Coaching, Counseling",
    "Co-living Accommodations & Services",
    "Cultural Exchange & Social Networking",
    "Education & Childcare",
    "Emergency Services",
    "Financial & Tax Services",
    "Insurance - Health, Travel, Property, Other",
    "Language & Cultural Integration",
    "Legal Services",
    "Professional Services",
    "Relocation Services",
    "Screening Services",
    "Technology & Communication",
    "Travel & Transportation",
    "Visa and Immigration Services",
    "Other",
  ];

  //   const formData = new FormData();
  //   setIsSubmitting(true);
  //   const newData = {
  //     country: data.country,
  //     services: data.services,
  //     title: data.title,
  //     content: contentValue,
  //   };



  //   // try {

  //   //   if (data.banner && data.banner[0]) {
  //   //     formData.append(
  //   //       "banner",
  //   //       data.banner && data.banner[0] ? data.banner[0] : ""
  //   //     );
  //   //   }

 

  //   //   await createNewBlog(formData);
  //   //   toast.success("Blog created");
  //   //   reset();
  //   // } catch (error) {
  //   //   console.error("Error creating blog post:", error);
  //   // } finally {
  //   //   setIsSubmitting(false);
  //   // }
  // };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center mb-[32px]">
          <CardTitle className="xl:text-[40px] md:text-2xl text-xl  font-bold mb-[16px]">
            Create new blog post
          </CardTitle>
          <p className="text-sm text-muted-foreground ">
            Add new services post for your website viewer that make them highly
            interested for purchase !
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="country">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {combinedCountryDataWithAllCountry.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.country && (
                  <p className="text-sm text-red-500">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="services">Services</Label>
                <Controller
                  name="services"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="services">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        {servicesOption.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            {service.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.services && (
                  <p className="text-sm text-red-500">
                    {errors.services.message}
                  </p>
                )}
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="services">Services</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">AND/OR</span>
                  <Input
                    id="services"
                    {...register("services")}
                    placeholder="Enter your blog title"
                  />
                </div>
                {errors.services && (
                  <p className="text-sm text-red-500">
                    {errors.services.message}
                  </p>
                )}
              </div> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Blog tittle</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Enter your blog title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className=" ">
              <ReactQuill
                value={contentValue}
                onChange={(e) => setContentValue(e)}
                modules={modules}
                className="mb-[100px]"
                formats={formats}
                theme="snow"
                style={{ height: "300px" }}
              />
            </div>

            <div className="">
              <Label>Post banner </Label>
              <div className="border-2 border-dashed rounded-lg p-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <CloudIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="flex items-center gap-1">
                    <span>Upload </span>
                    <label
                      htmlFor="banner"
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      browse
                    </label>
                    <input
                      type="file"
                      id="banner"
                      className="hidden"
                      accept="image/*,video/*"
                      {...register("banner", {
                        onChange: (e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setFileName(file.name);
                          }
                        },
                      })}
                    />
                  </div>
                  {fileName && (
                    <p className="text-sm text-green-600">
                      File selected: {fileName}
                    </p>
                  )}
                </div>
              </div>
              {errors.banner && (
                <p className="text-sm text-red-500">{errors.banner.message}</p>
              )}
            </div>

            <Button
              // type="submit"
              className="w-full"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting || isLoading
                ? "Publishing..."
                : fileName
                ? "Published"
                : "Publish now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
