"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema, { LoginFormData } from "@/schema/LoginSchema";
import loginimg from "@/assets/login/Rectangle 10333.png";
import logo from "@/assets/expat-logo-pro.png";
import { useLoginUserMutation } from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Ensure proper import for jwtDecode
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev); // Toggle function

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
        const decodedToken: { role: string,isPayment:boolean } = jwtDecode(token);

        // Prevent redirect if already on the target page
        if (!isLoading) {
          if (decodedToken?.isPayment) {
            router.push('/travel');
          } else if (decodedToken?.isPayment === false) {
            router.push("/membership");
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
      console.log("err",err);
      toast.dismiss();
      toast.error("An error occurred. Please try again.");
    }
  };


  return (
    <div className="flex flex-col lg:flex-row bg-white min-h-screen">
      <div className="relative hidden lg:block w-1/2">
        <Image
          src={loginimg}
          alt="People looking"
          className="object-cover"
          fill
          priority
        />
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2 p-6">
        <div className="w-full max-w-[524px] space-y-8">
          <div className="flex justify-center mb-8">
            <Image
              src={logo}
              alt="Expat Logo"
              className="w-24 h-auto object-contain lg:w-28"
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                className="text-[18px] text-[#101828] font-sans font-semibold"
                htmlFor="email"
              >
                Email address
              </Label>
              <Input
                id="email"
                placeholder="Enter your email "
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

            <div className="space-y-2 relative">
              <Label
                className="text-[18px] text-[#101828] font-sans font-semibold"
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
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <Link
                href="/"
                className="text-sm text-green-500 font-inter hover:text-red-500"
              >
                Register
              </Link>
              <Link
                href="/forgot-password"
                className="text-sm text-[#E75A4E] font-inter hover:text-red-500"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center rounded-lg items-center font-outfit text-white text-[18px] font-medium py-[10px] bg-primary hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Login..." : "Login"}
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
    </div>
  );
}
