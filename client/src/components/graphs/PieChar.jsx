// import React from 'react';
// import { PieChart, Pie, Cell } from 'recharts';

// // Optional for styling:
// import './PieChart.css'; // Import your custom CSS file


// const expenses = [
//     { category: 'Housing', amount: 1000, date: '2024-02-21' },
//     { category: 'Food', amount: 500, date: '2024-02-20' },
//     { category: 'Transportation', amount: 300, date: '2024-02-18' },
//     { category: 'Entertainment', amount: 200, date: '2024-02-15' },
//     { category: 'Other', amount: 150, date: '2024-02-12' },
//   ];
  
//   // Sample categories array
//   const categories = ['Housing', 'Food', 'Transportation', 'Entertainment', 'Other'];


//   const calculateExpensesByCategory = (expenses, categoryArray) => {
//     const categories = {};
//     categoryArray.forEach((category) => {
//       categories[category] = 0;
//     });
  
//     expenses.forEach((expense) => {
//       categories[expense.category] += expense.amount;
//     });
  
//     return Object.entries(categories).map(([name, value]) => ({ name, value }));
//   };
  
  
//   const ExpensePieChart = () => {
//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#C0C0C0']; // Customize colors
  
//     return (
//       <PieChart width={200} height={200}>
//         <Pie
//           data={calculateExpensesByCategory(expenses, categories)} // Pass category array
//           dataKey="value"
//           cx={100}
//           cy={100}
//           innerRadius={60}
//           outerRadius={80}
//           fill="#ffffff"
//         >
//           {calculateExpensesByCategory(expenses, categories).map((entry, index) => (
//             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//       </PieChart>
//     );
//   };
  
//   export default ExpensePieChart;
  
import "./PieChart.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
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
export default function ExpensePieChart() {
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
    </PieChart>
  );
}
