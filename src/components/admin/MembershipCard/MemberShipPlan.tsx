"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { LiaPlusSolid } from "react-icons/lia";
import NewMembershipPlanDialog from "../Dialogs/UpdateDataDialogs/NewMembershipPlanDialog";

const MemberShipPlan = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle opening and closing of the dialog
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div className="">
          <Button
              variant={"ghost"}
        className="flex items-center gap-2 mt-5 text-[#0872BA] "
        onClick={openDialog}
      >
        <LiaPlusSolid /> Add new membership plane
      </Button>

      {/* Update Membership Plan Dialog */}
      <NewMembershipPlanDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
  );
};

export default MemberShipPlan;
