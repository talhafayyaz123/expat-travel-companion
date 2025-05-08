"use client";

import MembershipChart from "@/components/admin/purchase-history/MembershipChart ";
import MetricCard from "@/components/admin/purchase-history/MetricCard";
import PaymentTable from "@/components/admin/purchase-history/PaymentTable";
import StatisticsChart from "@/components/admin/purchase-history/StatisticsChart";
import {
  useThisDayTransactionQuery,
  useTotalMemberQuery,
  useTotalRevinueQuery,
} from "@/redux/Api/transactionApi";
import { Loader } from "lucide-react";
import React from "react";

const Purchase = () => {
  const { data: thisDayTransaction, isLoading: thisDayTransactionLoading } =
    useThisDayTransactionQuery(undefined);
  const { data: totalRevinue, isLoading: totalRevinueLoading } =
    useTotalRevinueQuery(undefined);
  const { data: totalMember, isLoading: totalMemberLoading } =
    useTotalMemberQuery(undefined);

  if (thisDayTransactionLoading || totalRevinueLoading || totalMemberLoading) {
    return (
      <div className="h-96 flex items-center justify-center w-full ">
        <Loader className={`animate-spin text-xl`} />
      </div>
    );
  }


  return (
    <div className="xl:p-6 md:px-2 px-1 py-2 space-y-6">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        <MetricCard
          title="Last transaction"
          value={`$${thisDayTransaction?.data._sum.amount ?thisDayTransaction?.data._sum.amount:0}`}
          subtitle="Last 24 hour transaction"
        />
        <MetricCard
          title="Total revenue"
          value={`$${totalRevinue?.data.totalRevenue}`}
          change={{ value: 8.3, timeframe: "more then last month" }}
        />
        <MetricCard
          title="Total Memberships"
          value={`${totalMember?.data.thisMonthMemberships}`}
          change={{ value: -8.3, timeframe: "less then last month" }}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <StatisticsChart />
        <MembershipChart />
      </div>

      <div className="space-y-4">
        <PaymentTable />
      </div>
    </div>
  );
};

export default Purchase;
