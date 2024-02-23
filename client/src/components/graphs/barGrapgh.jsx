import "./PieChart.css";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const financialData = [
  {
    month: "January",
    income: 5000,
    expenses: 3000
  },
  {
    month: "February",
    income: 5500,
    expenses: 3200
  },
  {
    month: "March",
    income: 6000,
    expenses: 2800
  },
  {
    month: "April",
    income: 6200,
    expenses: 3500
  },
  {
    month: "May",
    income: 7000,
    expenses: 4000
  },
  {
    month: "June",
    income: 7500,
    expenses: 4200
  },
  {
    month: "July",
    income: 8000,
    expenses: 3800
  },
  {
    month: "August",
    income: 8200,
    expenses: 4300
  },
  {
    month: "September",
    income: 8500,
    expenses: 4500
  },
  {
    month: "October",
    income: 9000,
    expenses: 4800
  }
];

export default function BardGraph() {
  return (
    <div style={{ width: "400px", height: "100%" }}>
      <ResponsiveContainer>
        <AreaChart
          data={financialData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="income" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="expenses" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
