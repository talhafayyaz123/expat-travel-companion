"use client";

import { Button } from "@/components/ui/button";
import { MembershipPlanType } from "@/types/MembershipPlanType";
import React, { useState } from "react";
import { LiaEdit, LiaTrashAltSolid } from "react-icons/lia";
import { MdOutlineDone } from "react-icons/md";
import UpdateDataDialog from "../Dialogs/UpdateDataDialogs/UpdateDataDialog";
import { useDeletePlanMutation } from "@/redux/Api/membershipPlansApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  membership: MembershipPlanType;
}

const MembershipCard = ({ membership }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Corrected mutation hook
  const [
    deletePlan,
    { isLoading: isDeleting, isError: createError, error: createErrorDetails },
  ] = useDeletePlanMutation();

  // Handle dialog visibility
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleUpdateSubmit = (updatedData: MembershipPlanType) => {
    closeDialog();
  };

  // Handle delete action correctly
  const handleDelete = async () => {
    setDialogOpen(false);
    // Instead of passing 'member', pass the correct 'membership.id' for deletion
    try {
      await deletePlan({
        id: membership.id,
        amount: 0,
        name: "",
        features: [],
        billingInterval: "month",
      }).unwrap();
      toast.success("Membership plan deleted");
    } catch (error) {
      toast.error("Error deleting membership plan");
    }
  };

  return (
    <div className="card border rounded-lg mt-4 p-3">
      {/* Title and Update Button */}
      <div className="flex justify-between items-center">
        <p className="md:text-[20px] text-lg font-semibold">
          {membership.name}
        </p>
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={openDialog}
          >
            <LiaEdit className="text-lg" />
            <span className="max-sm:hidden">Update</span>
          </Button>

          {/* Dialog for Deletion Confirmation */}
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setDialogOpen(true)}
                className="border rounded px-3 py-[6px]"
                variant={"outline"}
              >
                {isDeleting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <LiaTrashAltSolid className="text-red-600" size={20} />
                )}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this item? This action cannot be
                undone.
              </DialogDescription>
              <div className="flex justify-end mt-4">
                <button
                  className="mr-2 border border-gray-300 rounded px-4 py-2"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white rounded px-4 py-2"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Features List */}
      <div className="flex flex-col gap-2 mt-4">
        {membership.features.map((feature, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            <div className="flex items-center justify-center bg-[#D9D9D9] rounded-full p-[2px]">
              <MdOutlineDone className="text-sm" />
            </div>
            <p className="text-sm">{feature.title}</p>
          </div>
        ))}
      </div>

      {/* Price Section */}
      <p className="pt-5 text-[24px] font-medium flex items-center gap-1">
        ${membership.amount}
        <span className="text-[16px] font-normal"> /month</span>
      </p>

      {/* Update Membership Plan Dialog */}
      <UpdateDataDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleUpdateSubmit}
        initialData={{
          id: membership.id || "",
          name: membership.name,
          features: membership.features,
          amount: membership.amount,
          billingInterval: membership.billingInterval as
            | "month"
            | "year"
            | "lifetime",
          active: membership.active,
        }}
      />
    </div>
  );
};

export default MembershipCard;
