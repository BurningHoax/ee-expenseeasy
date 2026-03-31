"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/animated-button";
import { Card } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { Visualization } from "@/components/visualization";
import { ExpenseItem } from "@/components/expense-item";
import { ProtectedPage } from "@/components/protected-page";
import type { SVGProps } from "react";
import { Plus, Coffee, ShoppingCart, Fuel, Home } from "lucide-react";

const chartData = [
  { name: "Mon", value: 250 },
  { name: "Tue", value: 320 },
  { name: "Wed", value: 180 },
  { name: "Thu", value: 420 },
  { name: "Fri", value: 380 },
  { name: "Sat", value: 450 },
  { name: "Sun", value: 320 },
];

const categoryData = [
  { name: "Food", value: 890 },
  { name: "Transport", value: 450 },
  { name: "Entertainment", value: 320 },
  { name: "Shopping", value: 680 },
  { name: "Utilities", value: 280 },
];

const recentExpenses = [
  {
    category: "Coffee Shop",
    amount: 5.2,
    date: "10:30 AM",
    icon: <Coffee className="w-5 h-5" />,
    color: "orange" as const,
  },
  {
    category: "Grocery Store",
    amount: 85.5,
    date: "9:15 AM",
    icon: <ShoppingCart className="w-5 h-5" />,
    color: "green" as const,
  },
  {
    category: "Gas Station",
    amount: 45.0,
    date: "Yesterday",
    icon: <Fuel className="w-5 h-5" />,
    color: "red" as const,
  },
  {
    category: "Rent",
    amount: 1200.0,
    date: "2 days ago",
    icon: <Home className="w-5 h-5" />,
    color: "purple" as const,
  },
];

export default function Dashboard() {
  return (
    <ProtectedPage>
      <div className="min-h-screen flex flex-col bg-transparent">
        <Navbar />

        <main className="flex-1 px-4 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-12 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
              <div>
                <p className="mb-2 inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                  Personal Finance Hub
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Dashboard
                </h1>
                <p className="mt-1 text-muted-foreground">
                  Welcome back! Here&apos;s your financial overview.
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                animated={true}
                className="relative z-10"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Expense
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Today's Expenses"
                value="₹345.70"
                icon={<ShoppingCart className="w-6 h-6" />}
                trend={-15}
                trendLabel="vs today last week"
                color="blue"
              />
              <StatCard
                title="This Month"
                value="₹4,280"
                icon={<Plus className="w-6 h-6" />}
                trend={22}
                trendLabel="vs last month"
                color="red"
              />
              <StatCard
                title="Budget Remaining"
                value="₹1,720"
                icon={<HomeIcon className="w-6 h-6" />}
                trend={-8}
                trendLabel="of monthly budget"
                color="green"
              />
              <StatCard
                title="Avg Daily Spend"
                value="₹142.67"
                icon={<TrendIcon className="w-6 h-6" />}
                trend={5}
                trendLabel="vs last week"
                color="purple"
              />
            </div>

            {/* Main Charts */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Weekly Chart - Takes 2 columns */}
              <div className="lg:col-span-2">
                <Visualization
                  type="bar"
                  data={chartData}
                  title="Weekly Spending"
                  dataKey="value"
                  height={350}
                />
              </div>

              {/* Category Breakdown */}
              <Visualization
                type="pie"
                data={categoryData}
                title="Spending by Category"
                dataKey="value"
                height={350}
              />
            </div>

            {/* Recent Expenses Section */}
            <div>
              <Card className="border border-border/80 bg-card/85 p-6 shadow-lg shadow-cyan-500/5 backdrop-blur-sm">
                <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
                  Recent Expenses
                </h2>
                <div className="space-y-2">
                  {recentExpenses.map((expense, idx) => (
                    <ExpenseItem key={idx} {...expense} />
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Expenses
                </Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </ProtectedPage>
  );
}

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function TrendIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M16 6l2.29 2.29-4.29 4.29-4-4L2 16.59 3.41 18 10 11.41l4 4 5.88-5.88L22 12v-6z" />
    </svg>
  );
}
