import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const financialData = [
  {
    category: "Groceries",
    expenses: 400,
    income: 0
  },
  {
    category: "Salary",
    expenses: 0,
    income: 2500
  },
  {
    category: "Utilities",
    expenses: 50,
    income: 0
  },
  {
    category: "Dining Out",
    expenses: 120,
    income: 0
  },
  {
    category: "Rent",
    expenses: 800,
    income: 0
  },
  {
    category: "Investments",
    expenses: 0,
    income: 1500
  },
  {
    category: "Entertainment",
    expenses: 80,
    income: 0
  },
  {
    category: "Miscellaneous",
    expenses: 30,
    income: 0
  }
];

export default function FinancialBarChart() {
  return (
    <BarChart width={330} height={220} data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="expenses" stackId="a" fill="#FF7F7F" />
      <Bar dataKey="income" stackId="a" fill="#66CC66" />
    </BarChart>
  );
}
