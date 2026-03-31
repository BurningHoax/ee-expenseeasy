// Types for Split Expense Management - Ready for Supabase

export type SplitType = "equal" | "unequal" | "itemwise";

export interface Person {
  id: string;
  name: string;
  email?: string;
  color: string;
}

export interface SplitParticipant {
  personId: string;
  amount: number; // Amount this person paid or owes
  percentage?: number; // For percentage-based splits
}

export interface SplitExpense {
  id: string;
  description: string;
  category: string;
  totalAmount: number;
  paidBy: string; // Person ID who paid
  splitType: SplitType;
  participants: SplitParticipant[]; // People involved in the split
  createdAt: Date;
  notes?: string;
  userId?: string; // For Supabase auth
  groupId?: string; // If part of a group
}

export interface Settlement {
  from: string; // Person ID
  to: string; // Person ID
  amount: number;
  expenseIds: string[]; // Related expense IDs
}

export interface Debt {
  personId: string;
  amount: number; // Positive = they owe, Negative = they are owed
}

export interface User {
  id: string;
  email: string;
  name: string;
  color: string;
}
