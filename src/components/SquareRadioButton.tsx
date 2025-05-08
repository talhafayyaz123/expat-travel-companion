import * as React from "react";
import { cn } from "@/lib/utils";

export interface SquareRadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const SquareRadioButton = React.forwardRef<
  HTMLInputElement,
  SquareRadioButtonProps
>(({ className, label, ...props }, ref) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" ref={ref} {...props} />
        <div
          className={cn(
            "w-5 h-5 border border-gray-300 rounded-sm transition-colors",
            props.checked ? "bg-primary border-primary" : "bg-white",
            className
          )}
        />
        {props.checked && (
          <svg
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33334 2.5L3.75001 7.08333L1.66667 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </label>
  );
});
SquareRadioButton.displayName = "SquareRadioButton";

export { SquareRadioButton };
