"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/expat-logo-pro.png";
import { useRouter } from "next/navigation";
import { useResetPassMutation } from "@/redux/Api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

// Define Zod schema for password validation
const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[0-9]/, "Password must include a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // Points the error to confirmPassword field
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPass, { isLoading }] = useResetPassMutation();
  const router = useRouter();
  const getEmail = useSelector((state: RootState) => state.forgotPass.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      const response = await resetPass({
        email: getEmail,
        password: data.newPassword,
      }).unwrap();
      router.push("/login");
    } catch (err) {}
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-[454px] space-y-6 rounded">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src={logo}
            alt="Expat Group logo"
            className="w-[80px] h-[80px] md:w-[108px] md:h-[108px] lg:w-[142px] lg:h-[100px] object-contain"
          />
        </div>

        {/* Form */}
        <div>
          <div className="space-y-2 mt-6 mb-8 text-center">
            <h1 className="text-xl md:text-2xl font-outfit font-semibold">
              Change New Password!
            </h1>
            <p className="text-sm md:text-base font-normal font-inter text-gray-500">
              Enter a different password than the previous one
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="new-password"
                className="text-sm md:text-[18px] font-outfit text-gray-600"
              >
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  placeholder="BFiofgvsb***JJ"
                  type={showPassword ? "text" : "password"}
                  {...register("newPassword")}
                  required
                  className={`w-full border ${
                    errors.newPassword ? "border-red-500" : "border-[#98A2B3]"
                  } pr-10`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirm-password"
                className="text-sm md:text-[18px] font-outfit text-[#475467]"
              >
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  placeholder="BFiofgvsb***JJ"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  required
                  className={`w-full border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-[#98A2B3]"
                  } pr-10`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex justify-center rounded-lg items-center font-outfit text-white text-sm md:text-[18px] font-medium py-3 md:py-[10px] bg-primary hover:bg-blue-700"
            >
              {isLoading ? "Loading..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
