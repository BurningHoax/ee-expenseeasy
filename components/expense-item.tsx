"use client";

import React from "react";

interface ExpenseItemProps {
  category: string;
  amount: number;
  date: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "red" | "purple" | "orange";
}

const colorMap = {
  blue: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
  green: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
  red: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
  purple:
    "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
  orange:
    "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300",
};

export function ExpenseItem({
  category,
  amount,
  date,
  icon,
  color = "blue",
}: ExpenseItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-card/80 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>

      <div className="flex-1">
        <p className="font-medium text-foreground">{category}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>

      <p className="text-lg font-semibold text-foreground">
        ₹{amount.toFixed(2)}
      </p>
    </div>
  );
}
