import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface WizardStep {
  id: string;
  label: string;
  isCompleted?: boolean;
  route: string; // Add route for each step
}

interface WizardNavProps {
  steps?: WizardStep[];
  currentStep: string;
  className?: string;
}

export function WizardNav({ steps = [], className }: WizardNavProps) {
  const pathName = usePathname();
  if (!steps || steps.length === 0) {
    return null;
  }



  return (
    <nav className={cn("relative flex flex-col items-center text-center gap-4", className)}>
      {steps.map((step, index) => {
        const isCurrent = step.route === pathName; // Highlight if step's route matches current path
        const isClickable = step.isCompleted; // Only completed steps should be clickable

        return (
          <div
            key={step.id}
            className="group flex flex-col items-center text-center w-full gap-6 text-sm font-medium"
          >
            {/* Link for completed steps, and span for non-completed */}
            {isClickable ? (
              <Link
                href={step.route}
                className={cn(
                  "relative w-full font-medium hover:underline",
                  isCurrent || step.isCompleted ? "text-primary font-bold" : "text-gray-600"
                )}
              >
                {step.label}
              </Link>
            ) : (
              <span className={cn("relative w-full  cursor-not-allowed",isCurrent?"text-primary":"text-gray-600")}>
              {step.label}
              </span>
            )}

            {/* Divider line */}
            {index !== steps.length - 1 && (
              <div
                className={cn(
                  "h-[100px] w-[2px] border-l-2 border-dotted",
                  step.isCompleted ? "border-primary" : "border-gray-400"
                )}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
