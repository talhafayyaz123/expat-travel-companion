"use client";

import { cn } from "@/lib/utils"; // Utility for conditionally combining classNames
import { FC } from "react";

interface LoaderProps {
  isOpen: boolean; // Controls visibility of the loader
  size?: "small" | "medium" | "large"; // Loader size
  message?: string; // Optional loading message
}

const Loader: FC<LoaderProps> = ({ isOpen, size = "medium", message = "Loading..." }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    small: "h-4 w-4 border-2",
    medium: "h-6 w-6 border-2",
    large: "h-8 w-8 border-4",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center space-y-4 bg-white rounded-lg p-6 shadow-lg">
        {/* Spinner */}
        <div
          className={cn(
            "animate-spin rounded-full border-t-primary border-gray-300",
            sizeClasses[size]
          )}
        ></div>

        {/* Message */}
        <p className="text-gray-700 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
