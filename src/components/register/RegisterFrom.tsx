"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupSchema, { RegistrationFormData } from "@/schema/SignupSchema";
import { useForm } from "react-hook-form";
import {
  useRegisterUserMutation,
  useLoginUserMutation,
} from "@/redux/Api/userApi";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/ReduxFunction";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface RegisterResponse {
  success: boolean;
  message: string;
}

interface LoginResponse {
  data: {
    token: string;
    role: string;
  };
}

const RegisterForm = () => {
  const [registerUser, { data, isLoading: isRegistering }] =
    useRegisterUserMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev); // Toggle function

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const loadingToastId = toast.loading("Processing Register...");
      const { promoCode, confirm_password, ...payload } = data;

      // Step 1: Register the user
      await registerUser(payload).unwrap();

      setTimeout(async () => {
        try {
          // Attempt to log the user in
          const loginRes = (await loginUser({
            email: data.email,
            password: data.password,
          }).unwrap()) as LoginResponse;

          Cookies.set("token", loginRes?.data?.token);

          dispatch(
            setUser({
              role: loginRes?.data?.role,
              token: loginRes?.data?.token,
              email: data.email,
            })
          );
          localStorage.setItem("promotekit_referral", data.promoCode ?? "");

          toast.success("Register successful!");
          router.push("/membership");
          toast.dismiss(loadingToastId);

          reset();
        } catch (loginError) {
          router.push("/login");
        }
      }, 3000);
    } catch (registrationError: any) {
      const apiError =
        registrationError?.data?.message ||
        "Register failed. Please try again.";
      setErrorMessage(apiError);
      toast.error(apiError);
    }
  };

  const Token = Cookies.get("token");

  return (
    <>
      <div className="pt-5 pb-6 px-6 bg-[rgba(56,56,56,0.20)] backdrop-blur-[12px] rounded-xl">
        <Card className="w-full bg-transparent border-none p-0">
          <CardHeader className="p-0">
            <CardTitle className="text-2xl text-white mb-[26px] font-bold">
              Sign up with email
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 p-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white text-[16px]">
                    First name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className="bg-transparent border-white text-white placeholder:text-white"
                    {...register("firstName")}
                  />
                  {errors.firstName?.message && (
                    <p className="text-white text-sm mt-1">
                      {errors.firstName.message as string}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName text-[16px]"
                    className="text-white text-[16px]"
                  >
                    Last name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    className="bg-transparent border-white text-white placeholder:text-white"
                    {...register("lastName")}
                  />
                  {errors.lastName?.message && (
                    <p className="text-white text-sm mt-1 text-[16px]">
                      {errors.lastName.message as string}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white text-[16px]">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-transparent border-white text-white placeholder:text-white"
                  {...register("email")}
                />
                {errors.email?.message && (
                  <p className="text-white text-sm mt-1">
                    {errors.email.message as string}
                  </p>
                )}
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="promoCode" className="text-white text-[16px]">
                  Promo Code
                </Label>
                <Input
                  id="promoCode"
                  // type="email"
                  placeholder="Enter your promo code"
                  className="bg-transparent border-white text-white placeholder:text-white"
                  {...register("promoCode")}
                /> */}
              {/* {errors.email?.message && (
                  <p className="text-white text-sm mt-1">
                    {errors.email.message as string}
                  </p>
                )} */}
              {/* </div> */}

              <div className="space-y-2 ">
                <Label htmlFor="password" className="text-white text-[16px]">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="bg-transparent border-white text-white placeholder:text-white"
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
                {/* {errors.password?.message && (
                  <p className="text-red-500 text-sm">
                      {errors.confirm_password.message}
                    </p>
                )} */}
                <p className="text-white text-sm">
                  Password must be at least 8 characters
                </p>

                <div className="relative">
                  <Input
                    id="password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="bg-transparent border-white text-white placeholder:text-white"
                    {...register("confirm_password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {errors.confirm_password && (
                    <p className="text-red-500 text-sm">
                      {errors.confirm_password.message}
                    </p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-[16px]"
                disabled={isRegistering || isLoggingIn} // Add this line
              >
                {isRegistering || isLoggingIn ? "Sign Up..." : "Sign up"}
              </Button>
              <div className="text-center text-[18px] text-zinc-400">
                You are already member{" "}
                {Token ? (
                  ""
                ) : (
                  <Link
                    href="/login"
                    className="text-blue-500 hover:text-blue-400"
                  >
                    log in
                  </Link>
                )}
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </>
  );
};

export default RegisterForm;
