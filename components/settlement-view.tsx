"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settlement } from "@/types/split";
import { ArrowRight, CheckCircle } from "lucide-react";

interface SettlementViewProps {
  settlements: Settlement[];
  getPerson: (id: string) => { name: string; color: string } | undefined;
}

export function SettlementView({
  settlements,
  getPerson,
}: SettlementViewProps) {
  if (settlements.length === 0) {
    return (
      <Card className="border border-emerald-300/50 bg-emerald-400/10 p-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          <div>
            <h3 className="font-semibold text-green-900 dark:text-green-200">
              All Settled!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              No outstanding debts. Everyone is squared up! 🎉
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-border/80 bg-card/85 p-6 shadow-lg shadow-cyan-500/5 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        Settlements Due
      </h2>

      <div className="space-y-3">
        {settlements.map((settlement, idx) => {
          const fromPerson = getPerson(settlement.from);
          const toPerson = getPerson(settlement.to);

          if (!fromPerson || !toPerson) return null;

          return (
            <div
              key={idx}
              className="flex items-center gap-4 rounded-xl border border-border/75 bg-background/75 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              {/* From Person */}
              <div className="flex items-center gap-2 flex-1">
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: fromPerson.color }}
                />
                <span className="font-medium text-foreground">
                  {fromPerson.name}
                </span>
              </div>

              {/* Arrow */}
              <div className="flex items-center gap-2 text-muted-foreground">
                <ArrowRight className="w-5 h-5" />
              </div>

              {/* To Person */}
              <div className="flex items-center gap-2 flex-1">
                <span className="font-medium text-foreground">
                  {toPerson.name}
                </span>
                <div
                  className="w-5 h-5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: toPerson.color }}
                />
              </div>

              {/* Amount */}
              <Badge className="bg-primary text-primary-foreground font-semibold">
                ₹{settlement.amount.toFixed(2)}
              </Badge>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-lg border border-primary/25 bg-primary/10 p-4">
        <p className="text-sm text-foreground/90">
          💡 <strong>Tip:</strong> Share these settlements with your friends to
          keep track of who needs to pay whom.
        </p>
      </div>
    </Card>
  );
}
