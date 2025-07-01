"use client";

import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MdOutlineDone } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LiaPlusSolid, LiaTimesSolid } from "react-icons/lia";
import { Loader2, X } from "lucide-react";

import {
  MembershipPlanType,
  membershipSchema,
} from "@/schema/MembershipPlanSchema";
import { toast } from "sonner";
import { useUpdatePlanMutation } from "@/redux/Api/membershipPlansApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpdateDataDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MembershipPlanType) => void;
  initialData: MembershipPlanType;
}

const UpdateDataDialog = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}: UpdateDataDialogProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MembershipPlanType>({
    defaultValues: initialData,
    // resolver: zodResolver(membershipSchema),
  });

  const [
    updateNewPlan,
    { isLoading: isCreating, isError: createError, error: createErrorDetails },
  ] = useUpdatePlanMutation();

  const [features, setFeatures] = useState(initialData.features);
  const [show, setShow] = useState(false);

  const handleAddFeatures = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const inputElement = document.getElementById(
      "featureInput"
    ) as HTMLInputElement | null;

    if (inputElement) {
      const data = inputElement.value;
      if (data.length <= 5) {
        return toast.error("At least 5 characters");
      }
      setFeatures([{ title: data }, ...features]);
      inputElement.value = "";
    }
  };

  const handleRemoveFeature = (feature: { title: string }, idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
    toast.success("Feature removed!");
  };

  const handleShow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShow(true);
  };

  const onsubmit: SubmitHandler<MembershipPlanType> = async (data) => {
    const mPandata = {
      ...data,
      amount: Number(data.amount), // Convert amount to a number if needed
      features: features, // Pass the updated features
      id: initialData.id, // Make sure to include the id
      interval: initialData.billingInterval || "monthly", // Keep the interval
    };

    try {
      const response = await updateNewPlan(mPandata).unwrap(); // .unwrap() to handle response properly
      toast.success("Updated successfully!");
      onClose(); // Close the modal
      onSubmit(mPandata); // Inform parent component about the update
    } catch (error) {
      toast.error("Failed to update membership plan.");
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <div className="absolute top-8 right-3" onClick={onClose}>
          <X className="text-2xl cursor-pointer" />
        </div>
        <DialogHeader>
          <DialogTitle className="md:text-[30px] text-[20px] font-semibold mb-[18.5px]">
            Update Membership Plan
          </DialogTitle>
          <form onSubmit={handleSubmit(onsubmit)} className="space-y-5">
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
            <div className="flex flex-col gap-2 md:mt-0 mt-5">
              {features.map((feature, idx) => (
                <div className="flex items-center gap-1" key={idx}>
                  <div className="flex items-center justify-center bg-[#D9D9D9] rounded-full p-[2px]">
                    <MdOutlineDone className="text-sm" />
                  </div>
                  <p className="text-sm flex items-center gap-3">
                    {feature.title}{" "}
                    <LiaTimesSolid
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleRemoveFeature(feature, idx)}
                    />
                  </p>
                </div>
              ))}
            </div>

            {/* Add New Membership Plan Link */}
            {show && (
              <div className={`flex gap-2 items-center `}>
                <Input
                  className=""
                  placeholder="Add new feature"
                  id="featureInput"
                />
                <Button
                  onClick={(e) => handleAddFeatures(e)}
                  className="px-[12px] py-[6px]"
                >
                  <LiaPlusSolid />
                </Button>
              </div>
            )}
            <Button
              variant={"ghost"}
              className="flex items-center gap-2 mt-5 text-[#0872BA]"
              onClick={(e) => handleShow(e)}
            >
              <LiaPlusSolid className="" /> Add new membership plan
            </Button>

            {/* Interval Field */}
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(value === "true")} // Convert string back to boolean
                  defaultValue={field.value ? "true" : "false"} // Convert boolean to string
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select billing interval" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Active</SelectItem>
                    <SelectItem value="false">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

            {/* Price Field */}
            <div className="flex flex-col gap-1 mt-3">
              <label>Price</label>
              <Controller
                disabled
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="string"
                    placeholder="Enter price"
                    className="border p-2 rounded"
                  />
                )}
              />
              {errors.amount && (
                <span className="text-red-500 text-sm">
                  {errors.amount.message}
                </span>
              )}
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex justify-center items-center gap-4 mt-5">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white px-6 py-2 rounded-full"
              >
                Cancel
              </Button>
              {isCreating ? (
                <Button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-full flex items-center"
                >
                  <Loader2 className="animate-spin" />
                  Updating..
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

export default UpdateDataDialog;
