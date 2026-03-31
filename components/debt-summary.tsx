"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Debt } from "@/types/split";
import { TrendingUp, TrendingDown } from "lucide-react";

interface DebtSummaryProps {
  debts: Debt[];
  getPerson: (id: string) => { name: string; color: string } | undefined;
}

export function DebtSummary({ debts, getPerson }: DebtSummaryProps) {
  const sortedDebts = [...debts].sort(
    (a, b) => Math.abs(b.amount) - Math.abs(a.amount),
  );

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {sortedDebts.map((debt) => {
        const person = getPerson(debt.personId);
        if (!person) return null;

        const isOwed = debt.amount > 0;
        const displayAmount = Math.abs(debt.amount);

        return (
          <Card
            key={debt.personId}
            className={`p-4 border transition-all hover:-translate-y-0.5 hover:shadow-md ${
              isOwed
                ? "border-emerald-300/50 bg-emerald-400/10"
                : "border-amber-300/50 bg-amber-400/10"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0"
                  style={{ backgroundColor: person.color }}
                />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {person.name}
                  </p>
                  <p
                    className={`text-xs ${isOwed ? "text-green-700 dark:text-green-300" : "text-orange-700 dark:text-orange-300"}`}
                  >
                    {isOwed ? "is owed" : "owes"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {isOwed ? (
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                )}
                <p
                  className={`text-xl font-semibold ${
                    isOwed
                      ? "text-green-700 dark:text-green-300"
                      : "text-orange-700 dark:text-orange-300"
                  }`}
                >
                  ₹{displayAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
