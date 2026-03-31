"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/animated-button";
import { Input } from "@/components/ui/input";
import { Person, SplitExpense, SplitType } from "@/types/split";
import { Trash2, Plus } from "lucide-react";

interface AddSplitFormProps {
  people: Person[];
  onSubmit: (data: {
    description: string;
    category: string;
    amount: number;
    paidBy: string;
    splitType: SplitType;
    splits: Record<string, number>;
    notes?: string;
  }) => void;
}

export function AddSplitForm({ people, onSubmit }: AddSplitFormProps) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState(people[0]?.id || "");
  const [splitType, setSplitType] = useState<SplitType>("equal");
  const [splits, setSplits] = useState<Record<string, number>>({});
  const [notes, setNotes] = useState("");

  React.useEffect(() => {
    if (splitType === "equal" && people.length > 0) {
      const perPerson = parseFloat(amount) / people.length || 0;
      const newSplits: Record<string, number> = {};
      people.forEach((p) => {
        newSplits[p.id] = perPerson;
      });
      setSplits(newSplits);
    }
  }, [amount, splitType, people]);

  const handleSplitChange = (personId: string, value: string) => {
    setSplits((prev) => ({
      ...prev,
      [personId]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !paidBy || people.length === 0) {
      alert("Please fill all fields and add people");
      return;
    }

    onSubmit({
      description,
      category,
      amount: parseFloat(amount),
      paidBy,
      splitType,
      splits,
      notes,
    });

    setDescription("");
    setAmount("");
    setSplits({});
    setNotes("");
  };

  const totalAmount = parseFloat(amount) || 0;
  const totalSplit = Object.values(splits).reduce((a, b) => a + b, 0);
  const isBalanced = Math.abs(totalSplit - totalAmount) < 0.01;

  const categories = [
    "General",
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Other",
  ];

  return (
    <Card className="border border-border/80 bg-card/85 p-6 shadow-lg shadow-cyan-500/5 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        Add Expense to Split
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Description
          </label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Dinner at restaurant"
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Total Amount
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              className="w-full"
            />
          </div>
        </div>

        {/* Paid By */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Who Paid?
          </label>
          <select
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          >
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Split Type */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Split Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(["equal", "unequal"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSplitType(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  splitType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {type === "equal" ? "Equally" : "Unequally"}
              </button>
            ))}
          </div>
        </div>

        {/* Split Details */}
        {people.length > 0 && (
          <div>
            <label className="mb-3 block text-sm font-medium text-foreground">
              How to Split?{" "}
              {!isBalanced && (
                <span className="text-red-600">(Not balanced)</span>
              )}
            </label>
            <div className="space-y-3">
              {people.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/75 p-3"
                >
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: person.color }}
                  />
                  <span className="w-24 text-sm font-medium text-foreground">
                    {person.name}
                  </span>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={splits[person.id] || 0}
                      onChange={(e) =>
                        handleSplitChange(person.id, e.target.value)
                      }
                      placeholder="0.00"
                      step="0.01"
                      disabled={splitType === "equal"}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-lg border border-primary/25 bg-primary/10 p-3">
              <p className="text-sm font-medium text-foreground/90">
                Total Split: ₹{totalSplit.toFixed(2)} / ₹
                {totalAmount.toFixed(2)}
              </p>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes..."
            rows={2}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          variant="primary"
          animated={true}
          className="w-full"
          disabled={!isBalanced || people.length === 0}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Split Expense
        </Button>
      </form>
    </Card>
  );
}
