import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { membershipSchema } from "@/schema/MembershipPlanSchema";
import { MembershipPlanType } from "@/types/MembershipPlanType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import React, { useState, useCallback } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LiaPlusSolid } from "react-icons/lia";
import { MdOutlineDone } from "react-icons/md";
import { toast } from "sonner";
import { useCreateNewMembershipPlanMutation } from "@/redux/Api/membershipPlansApi";

interface NewMembershipPlanDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewMembershipPlanDialog = ({
  isOpen,
  onClose,
}: NewMembershipPlanDialogProps) => {
  const [featuresList, setFeaturesList] = useState<{ title: string }[]>([]);
  const [
    createNewPlan,
    { isLoading: isCreating, isError: createError, error: createErrorDetails },
  ] = useCreateNewMembershipPlanMutation();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<MembershipPlanType>({
    resolver: zodResolver(membershipSchema),
    defaultValues: {
      name: "",
      amount: 0,
      features: [],
      billingInterval: "month",
      freeTrailDays: 7,
      description: "",
    },
  });

  const handleAddFeatures = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const inputElement = document.getElementById(
        "newFeatureInput"
      ) as HTMLInputElement | null;

      if (inputElement) {
        const newFeature = inputElement.value.trim();
        if (newFeature.length <= 5) {
          return toast.error("Feature must have at least 5 characters");
        }

        setFeaturesList((prevFeatures) => {
          const updatedFeatures = [...prevFeatures, { title: newFeature }];
          setValue("features", updatedFeatures, { shouldValidate: true });
          return updatedFeatures;
        });

        inputElement.value = ""; // Reset input
      }
    },
    [setValue]
  );

  const onCloseHandler = useCallback(() => {
    reset();
    setFeaturesList([]);
    onClose();
  }, [reset, onClose]);

  const onSubmit: SubmitHandler<MembershipPlanType> = async (data) => {
    try {
      const membershipPlanData = {
        name: data.name,
        amount: Number(data.amount),
        currency: data.currency || "usd",
        description: data.description,
        features: data.features,
        billingInterval: "month" as "month" | "year" | "lifetime", // Ensure correct type
        intervalCount: 1,
        trialPeriodDays: Number(data.freeTrailDays),
        active: true,
      };

      const res = await createNewPlan(membershipPlanData).unwrap();

      toast.success("Membership plan created successfully!");

      reset();
      setFeaturesList([]);
      onClose();
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onCloseHandler}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <div className="absolute top-8 right-3" onClick={onCloseHandler}>
          <X className="text-2xl cursor-pointer" />
        </div>
        <DialogHeader>
          <DialogTitle className="md:text-[30px] text-[20px] font-semibold mb-[18.5px] max-w-[90%] ">
            Create New Membership Plan
          </DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title Field */}
            <div className="flex flex-col gap-1">
              <label>Title</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter title"
                    className="border p-2 rounded"
                  />
                )}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Features Section */}
            <p className="">Features</p>
            {featuresList.length > 0 && (
              <div className="flex flex-col gap-2 md:mt-0 mt-5">
                {featuresList.map((feature, idx) => (
                  <div className="flex items-center gap-1" key={idx}>
                    <div className="flex items-center justify-center bg-[#D9D9D9] rounded-full p-[2px]">
                      <MdOutlineDone className="text-sm" />
                    </div>
                    <p className="md:text-sm text-xs">{feature.title}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2 items-center">
              <Input placeholder="Add new feature" id="newFeatureInput" />
              <Button type="button" onClick={handleAddFeatures}>
                <LiaPlusSolid />
              </Button>
            </div>
            {errors.amount && (
              <span className="text-red-500 text-sm">
                {errors?.features?.message}
              </span>
            )}
            {/* Price Field */}
            <div className="flex flex-col gap-1 mt-3">
              <label>Price</label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter price"
                    pattern="^\d*\.?\d*$"
                    className="border p-2 rounded"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
              {errors.amount && (
                <span className="text-red-500 text-sm">
                  {errors.amount.message}
                </span>
              )}
            </div>
            {/* Interval Field */}
            {/* <div className="flex flex-col gap-1">
              <label>Billing Interval</label>
              <Controller
                name="billingInterval"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select billing interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Monthly</SelectItem>
                      <SelectItem value="year">Yearly</SelectItem>
                      <SelectItem value="lifetime">Lifetime</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.billingInterval && (
                <span className="text-red-500 text-sm">
                  {errors.billingInterval.message}
                </span>
              )}
            </div> */}
            {/* Free Trial Days Field */}
            <div className="flex flex-col gap-1">
              <label>Free Trial Days</label>
              <Controller
                name="freeTrailDays"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select free trial days" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 7, 14, 30].map((days) => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} days
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.freeTrailDays && (
                <span className="text-red-500 text-sm">
                  {errors.freeTrailDays.message}
                </span>
              )}
            </div>
            {/* Description Field */}
            <div className="flex flex-col gap-1 mt-3">
              <label>Description</label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter description"
                    className="border p-2 rounded"
                  />
                )}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* Submit and Cancel Buttons */}
            <div className="flex justify-center items-center gap-4 mt-5">
              <Button
                type="button"
                onClick={onCloseHandler}
                className="bg-gray-500 text-white px-6 py-2 rounded-full"
              >
                Cancel
              </Button>
              {isCreating ? (
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center"
                >
                  Creating...
                  <Loader2 className="animate-spin" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full"
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewMembershipPlanDialog;
