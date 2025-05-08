"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberName?: string;
  
}

const DeleteMemberDialog: React.FC<DeleteMemberDialogProps> = ({ isOpen, onClose, memberName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{memberName}</strong>? This action is not reversible.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMemberDialog;
