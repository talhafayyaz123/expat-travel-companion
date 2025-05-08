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
  currentStep: string; // Use currentStep to highlight the active step
  className?: string;
}

export function WizardNavSmall({ steps = [],  className }: WizardNavProps) {
  const pathName = usePathname();

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <nav className={cn("relative flex items-center justify-center sm:gap-3 gap-1", className)}>
      {steps.map((step, index) => {
        const isCurrent = step.route === pathName;
        const isClickable = step.isCompleted;
        const isColor = isCurrent || isClickable;

        return (
          <div key={step.id} className="flex items-center justify-center sm:gap-3 gap-1">
            {/* Step Label */}
            {isClickable ? (
              <Link
                href={step.route}
                className={cn(
                  "relative sm:text-[13px] text-[11px] font-medium hover:underline",
                  isColor ? "text-primary font-bold" : "text-gray-600"
                )}
              >
                {step.label}
              </Link>
            ) : (
              <span className="relative sm:text-[11px] text-[10px] text-gray-400 cursor-not-allowed">
                {step.label}
              </span>
            )}

           
        
          </div>
        );
      })}
    </nav>
  );
}
