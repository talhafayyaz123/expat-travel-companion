"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { getCountryLabel } from "@/constants/countryOptions";
import { string } from "zod";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa6";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    country: string[];
    planName: string[];
    summitVerify: boolean | string;
    status: string;
  }) => void;
  countries: string[];
  memberships: string[];
}

const verificationStatus = [
  { status: "Verified", key: true },
  { status: "Unverified", key: false },
];
const activeStatus = [
  { status: "Active", key: "ACTIVE" },
  { status: "Inactive", key: "BLOCKED" },
];

const FilterDialog: React.FC<FilterDialogProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  countries,
  memberships,
}) => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedMemberships, setSelectedMemberships] = useState<string[]>([]);
  const [verification, setVerification] = useState<boolean | string>("");
  const [activation, setActivation] = useState<string>("");

  useEffect(() => {
    if (!isOpen) {
      // Reset form state when the dialog is closed
      setSelectedCountries([]);
      setSelectedMemberships([]);
    }
  }, [isOpen]);

  const handleCheckboxChange = (
    selectedList: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (selectedList.includes(value)) {
      setList(selectedList.filter((item) => item !== value));
    } else {
      setList([...selectedList, value]);
    }
  };

  const handleLastCheckboxChange = (value: boolean) => {
    setVerification((prev) => (prev === value ? "" : value));
  };

  const handleActivityCheckboxChange = (value: string) => {
    if (activation === value) {
      setActivation("");
    } else {
      setActivation(value);
    }
  };

  const handleApply = () => {
    onApplyFilters({
      country: selectedCountries,
      planName: selectedMemberships,
      summitVerify: verification,
      status: activation,
    });
    // Reset form immediately after applying filters
    setSelectedCountries([]);
    setSelectedMemberships([]);
    setVerification("");
    setActivation("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <div
          onClick={onClose}
          className="absolute  top-4 cursor-pointer right-3"
        >
          <X size={24} />
        </div>
        <DialogHeader>
          <DialogTitle>Filter Members</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-semibold">Verification Status</h4>
            {verificationStatus.map((veri) => (
              <div key={veri.status} className="flex items-center space-x-2">
                <Checkbox
                  id={veri.status}
                  onCheckedChange={() => handleLastCheckboxChange(veri.key)}
                  checked={verification === veri.key} // Strict comparison
                />
                <label htmlFor={veri.status} className="text-sm">
                  {veri.status}{" "}
                </label>
                {}
                {veri.status === "Verified" && (
                  <FaCheck style={{ color: "green" }} />
                )}
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-lg font-semibold">Activity Status</h4>
            {activeStatus.map((activeStat) => (
              <div
                key={activeStat.status}
                className="flex items-center space-x-2"
              >
                <Checkbox
                  id={activeStat.status}
                  onCheckedChange={() =>
                    handleActivityCheckboxChange(activeStat.key)
                  }
                  checked={activation == activeStat.key}
                />
                <label htmlFor={activeStat.status} className="text-sm">
                  {activeStat.status}
                </label>
                {activeStat.status === "Active" && <FaEyeSlash />}
                {activeStat.status === "Inactive" && <FaEye />}
              </div>
            ))}
          </div>
          <div>
            <h4 className="text-lg font-semibold">Country</h4>
            {countries.map((country) => (
              <div key={country} className="flex items-center space-x-2">
                <Checkbox
                  id={country}
                  onCheckedChange={() =>
                    handleCheckboxChange(
                      selectedCountries,
                      setSelectedCountries,
                      country
                    )
                  }
                  checked={selectedCountries.includes(country)}
                />
                <label htmlFor={country} className="text-sm">
                  {getCountryLabel(country)}
                  {/* {
                    country
                  } */}
                </label>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-lg font-semibold">Membership</h4>
            {memberships.map((membership) => (
              <div key={membership} className="flex items-center space-x-2">
                <Checkbox
                  id={membership}
                  onCheckedChange={() =>
                    handleCheckboxChange(
                      selectedMemberships,
                      setSelectedMemberships,
                      membership
                    )
                  }
                  checked={selectedMemberships.includes(membership)}
                />
                <label htmlFor={membership} className="text-sm">
                  {membership}
                </label>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleApply} className="bg-[#efefef] text-black">
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
