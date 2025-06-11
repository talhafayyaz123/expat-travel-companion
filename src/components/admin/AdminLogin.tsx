"use client";

import logo from "@/assets/expat-logo-transparent.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginUserMutation } from "@/redux/Api/userApi";
import { setUser } from "@/redux/ReduxFunction";
import LoginSchema, { LoginFormData } from "@/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode"; // Ensure proper import for jwtDecode
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export default function AdminLogin() {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  useEffect(() => {
    // Check if it's the user's first visit
    if (!Cookies.get("firstVisit")) {
      // Remove the cookies if it's the first visit
      Cookies.remove("token");
    }
  }, []);

  const onSubmit = async (data: LoginFormData) => {
    try {
      toast.loading("Logging in...");

      const response = await loginUser(data).unwrap();

      if (response?.success) {
        const token = response?.data?.token;

        // Set the token in cookies
        Cookies.set("token", token, { expires: 7 }); // Example: 7 days expiration

        // Dispatch user data to Redux
        dispatch(
          setUser({
            role: response?.data?.role,
            token: token,
            email: data?.email,
          })
        );

        reset(); // Reset form

        // Immediately dismiss the loading toast before redirecting
        toast.dismiss();

        // Decode the token to extract `isPayment`
        const decodedToken: { role: string } = jwtDecode(token);
        console.log("Admin Token", decodedToken);

        // Prevent redirect if already on the target page
        if (!isLoading) {
          if (decodedToken?.role === "ADMIN") {
            router.push("/dashboard/admin");
          } else if (decodedToken?.role !== "ADMIN") {
            router.push("/adminLogin");
          }

          toast.success("Login successful");
        }
      } else {
        toast.dismiss();
        toast.error(
          response?.data?.message || "Login failed! Please try again."
        );
      }
    } catch (err) {
      toast.dismiss();
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex w-full items-center justify-center bg-gray-100 min-h-screen p-6">
      <div className="w-full max-w-[500px] bg-white rounded-lg shadow-lg p-8 space-y-8">
        <div className="flex justify-center mb-5 max-h-[120px]">
          <Image
            src={logo}
            alt="Admin Logo"
            className="object-cover w-[230px]"
            // className="w-24 h-auto object-contain lg:w-28"
          />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label
              className="text-[16px] text-gray-700 font-medium"
              htmlFor="email"
            >
              Email address
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              type="email"
              className="w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              className="text-[16px] text-gray-700 font-medium"
              htmlFor="password"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                className="w-full pr-10"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-5 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-500 font-medium hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center rounded-lg items-center font-medium text-white text-[16px] py-[10px] bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2 h-4 w-4"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
