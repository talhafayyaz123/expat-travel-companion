import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { LiaArrowUpSolid } from "react-icons/lia";

interface MetricCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    timeframe: string;
  };
  subtitle?: string;
}


const MetricCard = ({ title, value, change, subtitle }: MetricCardProps) => {
  const isPositive = change?.value && change.value > 0

  
  return (
    <Card>
      <CardContent className="pt-6 relative overflow-hidden">
        <div className=" items-center flex-shrink-0 ">
          <div className="">
            <p className="text-ts text-muted-foreground">{title}</p>
            <h3 className="lg:text-[42.5px] md:text-[32px] text-[22px] font-bold mt-2">{value}</h3>
            {subtitle && (
              <p className="pt-4 text-ts text-[#475467] text-muted-foreground mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {change && (
            <div className="flex  pt-4">
              {isPositive ? (
                <ArrowUp className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="w-4 h-4 text-red-500" />
              )}
              <span
                className={`text-sm ${
                  isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {Math.abs(change.value)}% {change.timeframe}
              </span>
            </div>
          )}
        </div>

        {/* Side deign */}
        <div className="absolute bg-[#0872BAA6] -top-1 -right-1 p-2 rounded-full">
          <LiaArrowUpSolid className="text-white" />
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
