"use client";

import { Navbar } from "@/components/navbar";
import { ProtectedPage } from "@/components/protected-page";
import { PeopleManagement } from "@/components/people-management";
import { AddSplitForm } from "@/components/add-split-form";
import { DebtSummary } from "@/components/debt-summary";
import { SettlementView } from "@/components/settlement-view";
import { SplitHistory } from "@/components/split-history";
import { Visualization } from "@/components/visualization";
import { useSplitExpenses } from "@/hooks/use-split-expenses";
import type { SplitType } from "@/types/split";
import { Card } from "@/components/ui/card";
import { Users, TrendingUp, Receipt } from "lucide-react";

export default function SplitToolPage() {
  const {
    expenses,
    people,
    addPerson,
    removePerson,
    addSplitExpense,
    deleteExpense,
    calculateSettlements,
    getAllDebts,
  } = useSplitExpenses();

  const settlements = calculateSettlements();
  const debts = getAllDebts();

  const handleAddSplit = (data: {
    description: string;
    category: string;
    amount: number;
    paidBy: string;
    splitType: SplitType;
    splits: Record<string, number>;
    notes?: string;
  }) => {
    const participants = Object.entries(data.splits).map(
      ([personId, amount]) => ({
        personId,
        amount: Number(amount),
      }),
    );

    addSplitExpense(
      data.description,
      data.category,
      data.amount,
      data.paidBy,
      data.splitType,
      participants,
      data.notes,
    );
  };

  const getPerson = (id: string) => people.find((p) => p.id === id);

  // Prepare data for charts
  const expensesByCategory = expenses.reduce(
    (acc, exp) => {
      const existing = acc.find((e) => e.name === exp.category);
      if (existing) {
        existing.value += exp.totalAmount;
      } else {
        acc.push({ name: exp.category, value: exp.totalAmount });
      }
      return acc;
    },
    [] as Array<{ name: string; value: number }>,
  );

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.totalAmount, 0);

  return (
    <ProtectedPage>
      <div className="min-h-screen flex flex-col bg-transparent">
        <Navbar />

        <main className="flex-1 px-4 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
              <p className="mb-2 inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
                Group Settlements
              </p>
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
                Split Expenses
              </h1>
              <p className="text-muted-foreground">
                Track shared expenses and settle debts like a pro
              </p>
            </div>

            {/* Key Metrics */}
            {people.length > 0 && (
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border border-border/75 bg-card/85 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">People</p>
                      <p className="text-2xl font-bold tracking-tight text-foreground">
                        {people.length}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border border-border/75 bg-card/85 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Total Spent
                      </p>
                      <p className="text-2xl font-bold tracking-tight text-foreground">
                        ₹{totalSpent.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="border border-border/75 bg-card/85 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Receipt className="w-6 h-6 text-cyan-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Transactions
                      </p>
                      <p className="text-2xl font-bold tracking-tight text-foreground">
                        {expenses.length}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - People & Add Form */}
              <div className="lg:col-span-1 space-y-6">
                <PeopleManagement
                  people={people}
                  onAddPerson={addPerson}
                  onRemovePerson={removePerson}
                />
              </div>

              {/* Middle & Right - Forms & Details */}
              <div className="lg:col-span-2 space-y-6">
                {people.length > 0 && (
                  <>
                    <AddSplitForm people={people} onSubmit={handleAddSplit} />

                    <DebtSummary debts={debts} getPerson={getPerson} />

                    <SettlementView
                      settlements={settlements}
                      getPerson={getPerson}
                    />

                    {/* Charts */}
                    {expenses.length > 0 && expensesByCategory.length > 0 && (
                      <Visualization
                        type="pie"
                        data={expensesByCategory}
                        title="Spending by Category"
                        dataKey="value"
                        height={300}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            {/* History */}
            {expenses.length > 0 && (
              <SplitHistory
                expenses={expenses}
                getPerson={getPerson}
                onDelete={deleteExpense}
              />
            )}
          </div>
        </main>
      </div>
    </ProtectedPage>
  );
}
