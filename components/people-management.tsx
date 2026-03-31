"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/animated-button";
import { Person } from "@/types/split";
import { X, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PeopleManagementProps {
  people: Person[];
  onAddPerson: (name: string, email?: string) => void;
  onRemovePerson: (personId: string) => void;
}

export function PeopleManagement({
  people,
  onAddPerson,
  onRemovePerson,
}: PeopleManagementProps) {
  const [newPersonName, setNewPersonName] = React.useState("");
  const [newPersonEmail, setNewPersonEmail] = React.useState("");

  const handleAdd = () => {
    if (newPersonName.trim()) {
      onAddPerson(newPersonName.trim(), newPersonEmail.trim() || undefined);
      setNewPersonName("");
      setNewPersonEmail("");
    }
  };

  return (
    <Card className="p-6 border border-border/80 bg-card/85 shadow-lg shadow-cyan-500/5 backdrop-blur-sm">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-foreground">
        People
      </h2>

      {/* Add Person Form */}
      <div className="mb-6 rounded-xl border border-border/70 bg-background/80 p-4">
        <div className="space-y-3">
          <Input
            type="text"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            placeholder="Person's name"
            className="w-full"
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          />
          <Input
            type="email"
            value={newPersonEmail}
            onChange={(e) => setNewPersonEmail(e.target.value)}
            placeholder="Email (optional)"
            className="w-full"
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          />
          <Button
            onClick={handleAdd}
            size="sm"
            variant="primary"
            animated={true}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Person
          </Button>
        </div>
      </div>

      {/* People List */}
      {people.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No people added yet. Add someone to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {people.map((person) => (
            <div
              key={person.id}
              className="flex items-center gap-3 rounded-lg border border-border/70 bg-background/75 p-3 transition-all hover:-translate-y-0.5 hover:border-primary/40"
            >
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: person.color }}
              />
              <div className="flex-1">
                <p className="font-medium text-foreground">{person.name}</p>
                {person.email && (
                  <p className="text-xs text-muted-foreground">
                    {person.email}
                  </p>
                )}
              </div>
              <button
                onClick={() => onRemovePerson(person.id)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors text-red-600 dark:text-red-400"
                title="Remove person"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-lg border border-primary/25 bg-primary/10 p-3">
        <p className="text-xs text-foreground/85">
          {people.length} person{people.length !== 1 ? "s" : ""} added
        </p>
      </div>
    </Card>
  );
}
