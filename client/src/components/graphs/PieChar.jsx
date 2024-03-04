import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";



const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function UserFinancePieChart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);


  const data = [
    { name: "Incomes", value: incomes.reduce((acc, income) => acc + income.amount, 0) },
    { name: "Expenses", value: expenses.reduce((acc, expense) => acc + expense.amount, 0)},
    { name: "Net", value: incomes.reduce((acc, income) => acc + income.amount, 0) - expenses.reduce((acc, expense) => acc + expense.amount, 0) },
  ];


  return (
    <PieChart width={200} height={200}>
      <Pie
        data={data}
        cx={100}
        cy={100}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
