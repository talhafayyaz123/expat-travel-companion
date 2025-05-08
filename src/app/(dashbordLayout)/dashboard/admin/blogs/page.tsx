"use client";

import Loader from "@/app/loading";
import BlogData from "@/components/admin/blog/BlogData";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCountryLabel } from "@/constants/countryOptions";
import { servicesOption } from "@/constants/servicesOption";
import { useAllBlogsQuery } from "@/redux/Api/blogApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { MdArrowForward } from "react-icons/md";
import { z } from "zod";

const schema = z.object({
  country: z.string().nonempty("Country is required"),
  service: z.string(),
});

type FormData = {
  country: string;
  service: string;
};

const BlogPage = () => {
  const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [country, setCountry] = useState("");
  const [service, setService] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

  // Fetching blog data based on the query
  const {
    data: blogData,
    isLoading: isBlogDataLoading,
    isFetching,
  } = useAllBlogsQuery({
    page,
    limit,
    country,
    service,
  });

  // Initializing the form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "",
      service: "",
    },
  });

  useEffect(() => {
    if (blogData?.data?.blogs) {
      const countries = Array.from(
        new Set(
          blogData.data.blogs.map((blog: { country: string }) => blog.country)
        )
      ) as string[]; // Explicitly cast to string[]

      setUniqueCountries((prev) => (prev.length > 0 ? prev : countries));
    }
  }, [blogData]);

  // Form submit handler
  const onSubmit = (data: FormData) => {
    setIsFiltering(true);
    setCountry(data.country || ""); // Use empty string if country is undefined
    setService(data.service || ""); // Use empty string if service is undefined
    reset();
  };

  useEffect(() => {
    if (!isFetching) {
      setIsFiltering(false);
    }
  }, [isFetching]);

  return (
    <div className="">
      <div className="p-4 rounded-md bg-white">
        <div className="flex justify-between items-center pb-12">
          <h2 className="font-sans md:text-[32px] text-[18px]">
            My blogs({blogData ? blogData?.data.blogs.length : 0})
          </h2>
          <div className="flex items-center gap-2">
            <AiOutlinePlus className="text-[#0872BA] size-6" />
            <Link className="" href={"/dashboard/admin/blogs/new-blog"}>
              Upload new
            </Link>
          </div>
        </div>

        <form
          className="grid xl:grid-cols-3 grid-cols-1 md:gap-8 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Country Field */}
          <div>
            <label className="mb-4 text-[20px]">Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[200px] mt-2">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {(uniqueCountries as string[]).map((c, index) => (
                      <SelectItem key={index} value={c}>
                        {getCountryLabel(c)}
                        {/* {c} */}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && (
              <span className="text-red-500">{errors.country.message}</span>
            )}
          </div>

          {/* Service Field */}
          <div className="flex flex-col gap-8 xl:flex-row items-start xl:items-end">
            <p className="max-md:mt-2 max-sm:mt-5">AND / OR</p>
            <div className="max-md:mt-4">
              <Label htmlFor="service">Service</Label>
              <Controller
                name="service"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="service" className="md:w-[200px]">
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
              {errors.service && (
                <p className="text-sm text-red-500">{errors.service.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex xl:justify-end items-end">
            <Button
              type="submit"
              className="flex gap-2 bg-[#0872BA] w-max items-center"
            >
              <span className="text-[16px]">Search</span>
              <MdArrowForward height={24} width={24} />
            </Button>
          </div>
        </form>
      </div>
      {/* Display Loader or Data */}
      {isBlogDataLoading || isFiltering ? (
        <div className="flex justify-center py-10">
          <Loader />
        </div>
      ) : (
        <BlogData blogData={blogData} isBlogDataLoading={isBlogDataLoading} />
      )}
    </div>
  );
};

export default BlogPage;