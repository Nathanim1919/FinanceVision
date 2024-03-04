import "./PieChart.css";
import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import { selectUser } from "../../features/auth/authSlice";
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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const transactions = useSelector(state => state.transaction.transactions);

  useEffect(() => {
    dispatch(fetchTransactions(user._id));
  }, [dispatch, user]);

  const structureTransactions = (transactions) => {
    const financialData = [];
  
    // Group transactions by month
    const transactionsByMonth = transactions.reduce((acc, transaction) => {
      // Assuming transaction.date is a string in ISO format, adjust this part accordingly
      const date = new Date(transaction.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month}`;
  
      if (!acc[key]) {
        acc[key] = [];
      }
  
      acc[key].push(transaction);
  
      return acc;
    }, {});
  
    // Process grouped transactions to generate financial data
    for (const key in transactionsByMonth) {
      const transactionsInMonth = transactionsByMonth[key];
      const monthName = new Date(transactionsInMonth[0].date).toLocaleString('default', { month: 'long' });
  
      const monthlyData = {
        month: monthName,
        income: 0,
        expenses: 0,
      };
  
      transactionsInMonth.forEach((transaction) => {
        if (transaction.type === 'deposit') {
          monthlyData.income += transaction.amount;
        } else if (transaction.type === 'withdraw') {
          monthlyData.expenses += transaction.amount;
        }
      });
  
      financialData.push(monthlyData);
    }
  
    return financialData;
  };
  structureTransactions(transactions);
  return (
    <div style={{ width: "400px", height: "100%" }}>
      <ResponsiveContainer>
        <AreaChart
          data={structureTransactions(transactions)}
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
