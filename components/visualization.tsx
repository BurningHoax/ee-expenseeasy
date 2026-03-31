"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/card";

interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface VisualizationProps {
  type: "bar" | "line" | "pie";
  data: ChartData[];
  title: string;
  dataKey: string;
  colors?: string[];
  height?: number;
}

const defaultColors = [
  "#14b8a6",
  "#06b6d4",
  "#84cc16",
  "#f59e0b",
  "#f97316",
  "#8b5cf6",
];

export function Visualization({
  type,
  data,
  title,
  dataKey,
  colors = defaultColors,
  height = 300,
}: VisualizationProps) {
  return (
    <Card className="p-6 border border-border/80 bg-card/80 shadow-lg shadow-cyan-500/5 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      <h3 className="text-lg font-semibold text-foreground mb-4 tracking-tight">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={height}>
        {type === "bar" && (
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#9ca3af"
              opacity={0.3}
            />
            <XAxis stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#f8fafc" }}
            />
            <Legend />
            <Bar dataKey={dataKey} fill={colors[0]} radius={[8, 8, 0, 0]} />
          </BarChart>
        )}

        {type === "line" && (
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#9ca3af"
              opacity={0.3}
            />
            <XAxis stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#f8fafc" }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={colors[0]}
              strokeWidth={3}
              dot={{ fill: colors[0], r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        )}

        {type === "pie" && (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ₹${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "0.5rem",
              }}
              labelStyle={{ color: "#f8fafc" }}
            />
          </PieChart>
        )}
      </ResponsiveContainer>
    </Card>
  );
}
