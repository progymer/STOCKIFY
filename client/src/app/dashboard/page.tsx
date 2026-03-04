"use client";

import { CheckCircle, Package, Tag, TrendingDown, TrendingUp } from "lucide-react";
import CardExpenseSummary from "./CardExpenseSummary";
import CardPopularProducts from "./CardPopularProducts";
import CardPurchaseSummary from "./CardPurchaseSummary";
import CardSalesSummary from "./CardSalesSummary";
import { StatCard } from "./StatCard";


export default function Dashboard() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
        <CardPopularProducts />
        <CardSalesSummary />
        <CardPurchaseSummary />
        <CardExpenseSummary />
        <StatCard
          title="Customer & expenses"
          primaryIcon={<Package className="text-blue-600 w-6 h-6" />}
          dateRange="08 - 12 December 2025"
          details={[
            {
              title: "Customers Growth",
              amount: "1,750.00",
              changePercentage: 22,
              IconComponent: TrendingUp,
            },
            {
              title: "Expenses",
              amount: "1,234.56",
              changePercentage: -18,
              IconComponent: TrendingDown,
            },
          ]}
        />
        <StatCard
          title="Dues & Pending Orders"
          primaryIcon={<CheckCircle className="text-blue-600 w-6 h-6" />}
          dateRange="22 - 29 December 2025"
          details={[
            {
              title: "Dues",
              amount: "2,150.00",
              changePercentage: 60,
              IconComponent: TrendingUp,
            },
            {
              title: "Pending Orders",
              amount: "600.00",
              changePercentage: -56,
              IconComponent: TrendingDown,
            },
          ]}
        />
        <StatCard
          title="Sales & Discount"
          primaryIcon={<Tag className="text-blue-600 w-6 h-6" />}
          dateRange="22 - 29 December 2025"
          details={[
            {
              title: "Sales",
              amount: "1000.00",
              changePercentage: 20,
              IconComponent: TrendingUp,
            },
            {
              title: "Discount",
              amount: "200.00",
              changePercentage: -10,
              IconComponent: TrendingDown,
            },
          ]}
        />
      </div>
    );
}