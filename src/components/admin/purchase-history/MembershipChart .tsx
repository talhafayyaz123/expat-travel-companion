"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "react-responsive";

import { useEffect, useState, useCallback } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const MembershipChart = () => {
  const [chartData, setChartData] = useState<any>(null); // Chart data state
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const responsiveOptions = {
    ...options,
    maintainAspectRatio: false,
    aspectRatio: isTabletOrMobile ? 1 : 2,
  };

  const year = new Date().getFullYear();

  const fetchData = useCallback(async () => {
    try {
      // Fetch data from the API
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/payment/membership?year=${year}`
      );
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const responseData = await response.json();

      // Transform API response data into chart-compatible data
      const labels = responseData.data.map(
        (item: any) => item.subscriptionPlane
      );

      const counts = responseData.data.map((item: any) => item.count);

      // Define static colors for the chart
      const backgroundColors = [
        "#2563eb", // Blue
        "#f97316", // Orange
        "#34d399", // Green
        "#facc15", // Yellow
        "#ec4899", // Pink
        "#8b5cf6", // Purple
      ];

      // Prepare the chart data
      const formattedChartData = {
        labels,
        datasets: [
          {
            data: counts,
            backgroundColor: backgroundColors.slice(0, counts.length),
          },
        ],
      };
      setChartData(formattedChartData);
    } catch (error) {
    }
  }, [year]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, [fetchData]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between flex-shrink-0 overflow-hidden">
        <CardTitle className="md:text-[18px] font-semibold text-sm">
          Membership Statistics
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {chartData ? (
          <Doughnut
            className="md:min-h-[200px] h-[200px] sm:w-auto !w-full"
            data={chartData}
            options={responsiveOptions}
          />
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default MembershipChart;
