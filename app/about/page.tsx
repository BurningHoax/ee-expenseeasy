"use client";

import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { BarChart3, ShieldCheck, Users } from "lucide-react";

const pillars = [
  {
    title: "Clarity Over Chaos",
    description:
      "Everything from personal spending to group dues is visible in one consistent flow.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    title: "Trustworthy Splits",
    description:
      "Expense splits are calculated transparently so everyone can verify who owes what.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Privacy First",
    description:
      "Your financial activity is yours. We design with security and consent in mind.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl space-y-8">
          <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-card/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
            <p className="mb-3 inline-flex rounded-full border border-border bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Why ExpenseEasy
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Built for real people,
              <span className="block bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                not spreadsheet experts.
              </span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              ExpenseEasy helps you run your money life with less friction.
              Track personal expenses, split group costs, and settle balances
              quickly.
            </p>
          </section>

          <section className="grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <Card
                key={pillar.title}
                className="rounded-2xl border border-border/80 bg-card/85 p-6 shadow-lg shadow-cyan-500/5 backdrop-blur-sm"
              >
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3 text-primary">
                  {pillar.icon}
                </div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {pillar.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.description}
                </p>
              </Card>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
