"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import VisaCardIcon from "../icon/VisaCardIcon";
import BankCardIcon from "../icon/BankCardIcon";
import { useCreatePaymentMethodMutation } from "@/redux/Api/stripeApi";
import { useSubscriptionPlanMutation } from "@/redux/Api/membershipApi";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import logoPayments from "@/assets/expat-logo-transparent.png";
import CredidIcon from "../icon/CredidIcon";
import { toast } from "sonner";
import { useState } from "react";
import { clearFormData } from "@/redux/allSlice/formslice";
import { logOut } from "@/redux/ReduxFunction";
import Cookies from "js-cookie"; // To remove the cookie
import { DialogTitle } from "@radix-ui/react-dialog";

// Zod schema for form validation
const paymentSchema = z.object({
  number: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(16, "Card number must be 16 digits"),
  exp_month: z
    .string()
    .min(2, "Expiration month is required")
    .max(2, "Invalid month format")
    .regex(/^(0[1-9]|1[0-2])$/, "Expiration month must be between 01 and 12"), // Regex for valid months (01-12)
  exp_year: z
    .string()
    .min(2, "Expiration year is required")
    .max(2, "Invalid year format"),
  cvc: z.string().min(3, "CVC must be 3 digits").max(3, "CVC must be 3 digits"),
  type: z.string().min(1, "Card type is required"),
});

interface PaymentFormProps {
  amount: number;
  priceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Payments({
  amount,
  priceId,
  isOpen,
  onClose,
}: PaymentFormProps) {
  const router = useRouter();
  const loginEmail = useSelector((state: RootState) => state.Auth);

  const [getPayId, { isLoading: payIdLoading, isError: payIdError }] =
    useCreatePaymentMethodMutation();
  const [subscription, { isLoading: subsLoading, isError: subsError }] =
    useSubscriptionPlanMutation();
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      number: "",
      exp_month: "",
      exp_year: "",
      cvc: "",
      type: "",
    },
  });
  const dispatch = useDispatch();

  const onSubmit = async (values: z.infer<typeof paymentSchema>) => {
    const formData = new FormData();
    formData.append("card[number]", values.number);
    formData.append("card[exp_month]", values.exp_month);
    formData.append("card[exp_year]", values.exp_year);
    formData.append("card[cvc]", values.cvc);
    formData.append("type", values.type);

    try {
      const referralId = localStorage.getItem("promotekit_referral") || "";
      // Show loading toast when payment is processing
      const loadingToastId = toast.loading("Processing payment...");

      const response = await getPayId(formData).unwrap();
      const methodId = response.id; // Ensure this is the correct ID

      setPaymentMethodId(methodId); // Store the payment method ID

      const subscriptionResponse = await subscription({
        email: loginEmail.email,
        priceId,
        methodId,
        referralId,
      }).unwrap();
      // ...

      // Show success toast
      toast.success("Subscription successful!");
      router.push("/login");

      // Remove token from cookies
      Cookies.remove("token");

      // Dispatch the logOut action to update the Redux store
      dispatch(logOut());

      dispatch(clearFormData());
      // Dismiss the loading toast
      toast.dismiss(loadingToastId);
    } catch (err) {
      // Show error toast
      toast.error("Payment failed. Please try again.");

      // Dismiss the loading toast in case of error
      toast.dismiss();
    }
  };

  if (isOpen)
    return (
      <div className="bg-black fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center">
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogTitle />
            <div className="flex justify-center mb-2">
              <Image
                src={logoPayments}
                alt="Expat Group logo"
                className="object-cover w-[270px] h-[170px]"
                // className="w-[80px] h-[80px] md:w-[108px] md:h-[108px] lg:w-[170px] lg:h-[140px] object-cover"
              />
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="text-sm font-medium">Card Information</label>
                <div className="relative">
                  <Input
                    {...form.register("number")}
                    placeholder="4242 4242 4242 4242"
                    className="pr-12"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <VisaCardIcon />
                    <CredidIcon />
                    <BankCardIcon />
                  </div>
                </div>
                {/* Display error message for number */}
                {form.formState.errors.number && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.number.message}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Input
                    {...form.register("exp_month")}
                    placeholder="MM"
                    className="w-full"
                  />
                  {/* Display error message for exp_month */}
                  {form.formState.errors.exp_month && (
                    <span className="text-sm text-red-500">
                      {form.formState.errors.exp_month.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...form.register("exp_year")}
                    placeholder="YY"
                    className="w-full"
                  />
                  {/* Display error message for exp_year */}
                  {form.formState.errors.exp_year && (
                    <span className="text-sm text-red-500">
                      {form.formState.errors.exp_year.message}
                    </span>
                  )}
                </div>
                <div>
                  <Input
                    {...form.register("cvc")}
                    placeholder="CVC"
                    className="w-full"
                  />
                  {/* Display error message for cvc */}
                  {form.formState.errors.cvc && (
                    <span className="text-sm text-red-500">
                      {form.formState.errors.cvc.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select
                  onValueChange={(value) => form.setValue("type", value)}
                  defaultValue={form.getValues("type")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
                {/* Display error message for type */}
                {form.formState.errors.type && (
                  <span className="text-sm text-red-500">
                    {form.formState.errors.type.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-[#0872BA] text-white rounded-[8px]"
                disabled={payIdLoading || subsLoading}
              >
                {payIdLoading || subsLoading
                  ? "Processing..."
                  : `Pay $${amount.toFixed(2)}`}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  else return null;
}
