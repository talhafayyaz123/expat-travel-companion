"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMakeAdminMutation } from "@/redux/Api/memberApi";
import { toast } from "sonner";
// import { Card } from "@/components/ui/card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type AdminFormData = z.infer<typeof schema>;

const AdminForm = () => {
  const [makeAdmin, { isLoading, isError }] = useMakeAdminMutation();

  const {
    register,
      handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: AdminFormData) => {
    try {
      const result = await makeAdmin({ ...data }).unwrap();
        toast.success("Admin created successfully!");
        reset()
    } catch (error) {
      console.error("Failed to create admin:", error);
      toast.error("Error creating admin. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center size-full mt-10">
      <div className="pt-5 pb-6 px-6  rounded-xl md:w-[500px] w-[300px] bg-white">
        <Card className="w-full bg-transparent border-none p-0">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl  mb-[26px]">Create Admin</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="bg-transparent border  placeholder:"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className=" text-sm mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="bg-transparent border  placeholder:"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className=" text-sm mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent border  placeholder:"
                  {...register("email")}
                />
                {errors.email && (
                  <p className=" text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-transparent border  placeholder:"
                  {...register("password")}
                />
                {errors.password && (
                  <p className=" text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 "
              >
                {isLoading ? "Creating..." : "Create Admin"}
              </Button>
              {isError && (
                <p className="text-red-500 text-sm">
                  Error creating admin. Please try again.
                </p>
              )}
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminForm;
