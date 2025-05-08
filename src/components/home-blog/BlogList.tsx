"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useBlogsQuery } from "@/redux/Api/homeBlogApi";
import { BlogSkeleton } from "./BlogSkleton";
import Link from "next/link";
import {  servicesOption } from "@/constants/service";
import { combinedCountryDataWithAllCountry, getCountryLabel } from "@/constants/countryOptions";

export default function BlogList() {
  const [page, setPage] = useState(1);
  const [country, setCountry] = useState<string>("all");
  const [service, setService] = useState<string>("all");

  const { data, isLoading, isFetching, error } = useBlogsQuery({
    page,
    limit: 10,
    country: country === "all" ? undefined : country,
    service: service === "all" ? undefined : service,
  });

  const handleSearch = (newCountry: string, newService: string) => {
    setPage(1);
    setCountry(newCountry);
    setService(newService);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setCountry("all");
    setService("all");
    handleSearch("all", "all");
  };

  return (
    <div className="container mx-auto p-4 mt-[160px]">
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <div className="space-y-6">
          <div className="bg-white rounded-sm p-4">
            <h1 className="text-2xl font-bold mb-4">Resources</h1>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Country</label>
                <Select
                  value={country}
                  onValueChange={(value: any) => handleSearch(value, service)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" ">Select</SelectItem>
                    {/* <SelectItem value="allCountries">All Countries</SelectItem> */}
                    {combinedCountryDataWithAllCountry.map((countryItem) => (
                      <SelectItem key={countryItem.id} value={countryItem.value}>
                        {countryItem.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">AND / OR</div>
              <div>
                <label className="text-sm font-medium mb-1 block">Services</label>
                <Select
                  value={service}
                  onValueChange={(value: any) => handleSearch(country, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {servicesOption.map((service, index) => (
                      <SelectItem key={index} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-blue-600" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>
        </div>


        <div className="space-y-6">
          <div className="grid gap-4">
            {isLoading || isFetching ? (
              Array(3)
                .fill(0)
                .map((_, index) => <BlogSkeleton key={index} />)
            ) : error ? (
              <Card className="p-6">
                <p className="text-center text-red-500">
                  Failed to load blogs. Please try again later.
                </p>
              </Card>
            ) : data?.data.blogs.length === 0 ? (
              <Card className="p-6">
                <p className="text-center text-muted-foreground">
                  No blogs found.
                </p>
              </Card>
            ) : (
              data?.data.blogs.map((blog) => (
                <Link href={`blog-details/${blog.id}`} key={blog.id}>
                  <div key={blog.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row font-sans ">
                      <div className="w-full sm:w-48 h-48 relative">
                        <Image
                          src={blog.banner}
                          alt={blog.title}
                          fill
                          className="lg:[131px] lg:h-[128px] rounded-xl"
                        />
                      </div>
                      <div className="flex-1">
                        <CardHeader>
                          <div className="flex items-center justify-between text-[#000] text-[18px] font-[600]">
                            {blog.title}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center  text-sm gap-2">
                            {/* <span className="text-[344054]">
                              By {blog.author.firstName} {blog.author.lastName}
                            </span> */}

                            <span className="text-[#344054]">
                              Country:{getCountryLabel(blog.country)}
                              
                            </span>
                          </div>
                          <div className="mt-4 text-[15px] font-[400] text-[400]">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: blog.content.slice(0, 40),
                              }}
                              className=""
                            />
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {data && data.data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1 || isLoading || isFetching}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="text-sm text-muted-foreground">
                Page {page} of {data.data.totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(page + 1)}
                disabled={
                  page === data.data.totalPages || isLoading || isFetching
                }
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
