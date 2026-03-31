"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SplitExpense } from "@/types/split";
import { Trash2 } from "lucide-react";

interface SplitHistoryProps {
  expenses: SplitExpense[];
  getPerson: (id: string) => { name: string; color: string } | undefined;
  onDelete: (expenseId: string) => void;
}

export function SplitHistory({
  expenses,
  getPerson,
  onDelete,
}: SplitHistoryProps) {
  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  if (expenses.length === 0) {
    return (
      <Card className="border border-border/80 bg-card/85 p-6 shadow-lg shadow-cyan-500/5 backdrop-blur-sm">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight text-foreground">
          Expense History
        </h2>
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No expenses added yet. Add an expense to get started!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border border-border/80 bg-card/85 p-6 shadow-lg shadow-cyan-500/5 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        Expense History
      </h2>

      <div className="space-y-3">
        {sortedExpenses.map((expense) => {
          const paidByPerson = getPerson(expense.paidBy);
          if (!paidByPerson) return null;

          return (
            <div
              key={expense.id}
              className="rounded-xl border border-border/75 bg-background/75 p-4 transition-all hover:-translate-y-0.5 hover:border-primary/35"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: paidByPerson.color }}
                    />
                    <p className="font-semibold text-foreground">
                      {expense.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="outline">{expense.category}</Badge>
                    <span className="text-muted-foreground">
                      Paid by <strong>{paidByPerson.name}</strong>
                    </span>
                    <span className="text-muted-foreground">
                      {formatDate(expense.createdAt)}
                    </span>
                  </div>

                  {expense.notes && (
                    <p className="mt-2 text-xs italic text-muted-foreground">
                      {expense.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xl font-bold text-foreground">
                      ₹{expense.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {expense.splitType === "equal"
                        ? "Equal split"
                        : "Custom split"}
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors text-red-600 dark:text-red-400"
                    title="Delete expense"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Participants */}
              <div className="mt-3 border-t border-border pt-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Split between:
                </p>
                <div className="flex flex-wrap gap-2">
                  {expense.participants.map((participant) => {
                    const person = getPerson(participant.personId);
                    return person ? (
                      <Badge key={participant.personId} variant="secondary">
                        {person.name}: ₹{participant.amount.toFixed(2)}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
