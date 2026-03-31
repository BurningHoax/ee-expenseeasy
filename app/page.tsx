"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  HandCoins,
  Sparkles,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/animated-button";
import { Visualization } from "@/components/visualization";

const spendingMix = [
  { name: "Food", value: 38 },
  { name: "Travel", value: 22 },
  { name: "Rent", value: 27 },
  { name: "Other", value: 13 },
];

const monthlyFlow = [
  { name: "Jan", value: 12500 },
  { name: "Feb", value: 11100 },
  { name: "Mar", value: 13800 },
  { name: "Apr", value: 11700 },
  { name: "May", value: 10400 },
  { name: "Jun", value: 12600 },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 pb-16 pt-8 sm:pt-12">
        <section className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--border)_65%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_65%,transparent)_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                Smart Expense Tracking
              </p>

              <h1 className="text-balance text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Track money together,
                <span className="block bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                  settle faster.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                ExpenseEasy gives you personal expense clarity and
                Splitwise-like group settlements in one clean flow.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="default"
                    animated
                    className="w-full sm:w-auto"
                  >
                    Open Dashboard
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/split">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Split Expenses
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <Card className="relative overflow-hidden border-border/70 bg-card/80 p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <div className="pointer-events-none absolute -left-14 top-8 h-44 w-44 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricTile
                title="This month"
                value="₹28,450"
                hint="-9% vs previous"
                icon={<Wallet className="h-4 w-4" />}
              />
              <MetricTile
                title="To collect"
                value="₹6,320"
                hint="From 3 friends"
                icon={<HandCoins className="h-4 w-4" />}
              />
              <MetricTile
                title="Daily avg"
                value="₹948"
                hint="Healthy trend"
                icon={<BarChart3 className="h-4 w-4" />}
              />
              <MetricTile
                title="Savings rate"
                value="21%"
                hint="On target"
                icon={<CircleDollarSign className="h-4 w-4" />}
              />
            </div>
          </Card>
        </section>

        <section className="mx-auto mt-10 grid max-w-7xl gap-6 lg:grid-cols-2">
          <Visualization
            type="line"
            data={monthlyFlow}
            title="Monthly Expense Flow"
            dataKey="value"
            height={320}
          />
          <Visualization
            type="pie"
            data={spendingMix}
            title="Spending Mix"
            dataKey="value"
            height={320}
          />
        </section>
      </main>
    </div>
  );
}

function MetricTile({
  title,
  value,
  hint,
  icon,
}: {
  title: string;
  value: string;
  hint: string;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/75 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </p>
        <div className="rounded-full bg-secondary p-2 text-secondary-foreground">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{hint}</p>
    </div>
  );
}
