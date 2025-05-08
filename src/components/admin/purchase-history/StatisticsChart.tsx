"use client";

import { Bar } from "react-chartjs-2";
import "./chartStyle.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
};

const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

interface MonthlyData {
  month: string;
  totalRevenue: number;
  totalCount: number;
}

const StatisticsChart = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "this-year" | "last-year"
  >("this-year");
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const responsiveOptions = {
    ...options,
    maintainAspectRatio: false,
    aspectRatio: isTabletOrMobile ? 1 : 2,
  };

  // Fetch data based on the selected year
  const fetchData = async (year: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/monthly-statistic?year=${year}`
      );
      const result = await response.json();

      if (result.success) {
        const businessData = result.data.map(
          (item: MonthlyData) => item.totalRevenue
        );
        setData({
          labels,
          datasets: [
            {
              label: `(${year})`,
              data: businessData,
              backgroundColor: "#2563eb",
            },
          ],
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const year =
      selectedPeriod === "this-year"
        ? new Date().getFullYear()
        : new Date().getFullYear() - 1;
    setSelectedYear(year);
    fetchData(year);
  }, [selectedPeriod]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between w-full">
        <CardTitle className="md:text-[18px] font-semibold text-sm">
          Statistics
        </CardTitle>
        <Select
          defaultValue="this-year"
          onValueChange={(value) =>
            setSelectedPeriod(value as "this-year" | "last-year")
          }
        >
          <SelectTrigger className="md:w-[94px] w-[70px] !p-[8px] text-[12px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent className="text-[12px]">
            <SelectItem value="this-year">This Year</SelectItem>
            <SelectItem value="last-year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex items-center justify-center w-full">
        <div className="w-full md:px-4 px-1">
          {loading ? (
            <p>Loading data...</p>
          ) : data ? (
            <Bar className="!w-full" options={responsiveOptions} data={data} />
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsChart;
