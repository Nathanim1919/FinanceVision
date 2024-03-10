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
          monthlyData.expenses += (-1 * transaction.amount);
        }
      });
  
      financialData.push(monthlyData);
    }
  
    return financialData;
  };
  structureTransactions(transactions);
  return (
    <div style={{ width: "350px", height: "210px" }}>
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
