"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  color?: "blue" | "green" | "red" | "purple" | "orange";
}

const colorMap = {
  blue: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  green: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
  red: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
  purple:
    "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
  orange:
    "bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800",
};

const iconColorMap = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  red: "text-red-600 dark:text-red-400",
  purple: "text-purple-600 dark:text-purple-400",
  orange: "text-orange-600 dark:text-orange-400",
};

const trendColorMap = {
  blue: "text-blue-600 dark:text-blue-400",
  green: "text-green-600 dark:text-green-400",
  red: "text-red-600 dark:text-red-400",
  purple: "text-purple-600 dark:text-purple-400",
  orange: "text-orange-600 dark:text-orange-400",
};

export function StatCard({
  title,
  value,
  icon,
  trend,
  trendLabel = "vs last month",
  color = "blue",
}: StatCardProps) {
  const isTrendPositive = trend && trend > 0;

  return (
    <Card
      className={`p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${colorMap[color]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground mt-2 tracking-tight">
            {value}
          </p>
          {trend !== undefined && (
            <div className="flex items-center gap-2 mt-2">
              {isTrendPositive ? (
                <TrendingUp className={`h-4 w-4 ${trendColorMap[color]}`} />
              ) : (
                <TrendingDown className={`h-4 w-4 ${trendColorMap[color]}`} />
              )}
              <span className={`text-sm font-medium ${trendColorMap[color]}`}>
                {isTrendPositive ? "+" : ""}
                {trend}%
              </span>
              <span className="text-xs text-muted-foreground">
                {trendLabel}
              </span>
            </div>
          )}
        </div>
        <div
          className={`p-3 rounded-xl bg-background/80 shadow-inner ${iconColorMap[color]}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
