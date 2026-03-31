"use client";

import { useState, useCallback } from "react";
import {
  SplitExpense,
  Settlement,
  Person,
  Debt,
  SplitType,
  SplitParticipant,
} from "@/types/split";

export function useSplitExpenses() {
  const [expenses, setExpenses] = useState<SplitExpense[]>([]);
  const [people, setPeople] = useState<Person[]>([]);

  // Add a person to the split group
  const addPerson = useCallback(
    (name: string, email?: string) => {
      const colors = [
        "#3b82f6",
        "#ef4444",
        "#10b981",
        "#f59e0b",
        "#8b5cf6",
        "#ec4899",
        "#06b6d4",
        "#6366f1",
      ];
      const person: Person = {
        id: `person-${Date.now()}-${Math.random()}`,
        name,
        email,
        color: colors[people.length % colors.length],
      };
      setPeople((prev) => [...prev, person]);
      return person;
    },
    [people.length],
  );

  // Remove a person
  const removePerson = useCallback((personId: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== personId));
    setExpenses((prev) =>
      prev.map((exp) => ({
        ...exp,
        participants: exp.participants.filter((p) => p.personId !== personId),
      })),
    );
  }, []);

  // Add a split expense
  const addSplitExpense = useCallback(
    (
      description: string,
      category: string,
      totalAmount: number,
      paidBy: string,
      splitType: SplitType,
      participants: SplitParticipant[],
      notes?: string,
    ) => {
      const expense: SplitExpense = {
        id: `expense-${Date.now()}-${Math.random()}`,
        description,
        category,
        totalAmount,
        paidBy,
        splitType,
        participants,
        createdAt: new Date(),
        notes,
      };
      setExpenses((prev) => [...prev, expense]);
      return expense;
    },
    [],
  );

  // Calculate who owes whom
  const calculateSettlements = useCallback((): Settlement[] => {
    const balances: Record<string, number> = {};

    // Initialize balances
    people.forEach((p) => {
      balances[p.id] = 0;
    });

    // Process each expense
    expenses.forEach((exp) => {
      // Add what the payer paid
      balances[exp.paidBy] += exp.totalAmount;

      // Subtract what each participant owes
      exp.participants.forEach((participant) => {
        balances[participant.personId] -= participant.amount;
      });
    });

    // Generate settlements
    const settlements: Settlement[] = [];
    const debtors = Object.entries(balances)
      .filter(([, amount]) => amount < 0)
      .map(([id, amount]) => ({ id, amount: Math.abs(amount) }));
    const creditors = Object.entries(balances)
      .filter(([, amount]) => amount > 0)
      .map(([id, amount]) => ({ id, amount }));

    // Simple settlement algorithm
    for (const debtor of debtors) {
      for (const creditor of creditors) {
        if (creditor.amount > 0 && debtor.amount > 0) {
          const settlementAmount = Math.min(creditor.amount, debtor.amount);
          settlements.push({
            from: debtor.id,
            to: creditor.id,
            amount: settlementAmount,
            expenseIds: expenses.map((e) => e.id),
          });
          creditor.amount -= settlementAmount;
          debtor.amount -= settlementAmount;
        }
      }
    }

    return settlements;
  }, [expenses, people]);

  // Get individual person's debt
  const getPersonDebt = useCallback(
    (personId: string): Debt => {
      let balance = 0;

      expenses.forEach((exp) => {
        if (exp.paidBy === personId) {
          balance += exp.totalAmount;
        }
        const participant = exp.participants.find(
          (p) => p.personId === personId,
        );
        if (participant) {
          balance -= participant.amount;
        }
      });

      return {
        personId,
        amount: balance,
      };
    },
    [expenses],
  );

  // Get all people's debts
  const getAllDebts = useCallback((): Debt[] => {
    return people.map((p) => getPersonDebt(p.id));
  }, [people, getPersonDebt]);

  // Delete an expense
  const deleteExpense = useCallback((expenseId: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
  }, []);

  // Edit an expense
  const editExpense = useCallback(
    (expenseId: string, updates: Partial<SplitExpense>) => {
      setExpenses((prev) =>
        prev.map((e) => (e.id === expenseId ? { ...e, ...updates } : e)),
      );
    },
    [],
  );

  return {
    expenses,
    people,
    addPerson,
    removePerson,
    addSplitExpense,
    deleteExpense,
    editExpense,
    calculateSettlements,
    getPersonDebt,
    getAllDebts,
  };
}
