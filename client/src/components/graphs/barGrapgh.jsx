import "./PieChart.css";
import React, { useEffect } from "react";
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
  ResponsiveContainer,
} from "recharts";
import TranIcon from "/notiIcon/tra.png";
import styled from "styled-components";

export default function BardGraph() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const transactions = useSelector((state) => state.transaction.transactions);

  useEffect(() => {
    if (user._id && transactions.length === 0) {
      dispatch(fetchTransactions(user._id));
    }
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
      const monthName = new Date(transactionsInMonth[0].date).toLocaleString(
        "default",
        { month: "long" },
      );

      const monthlyData = {
        month: monthName,
        income: 0,
        expenses: 0,
      };

      transactionsInMonth.forEach((transaction) => {
        if (transaction.type === "deposit") {
          monthlyData.income += transaction.amount;
        } else if (transaction.type === "withdraw") {
          monthlyData.expenses += -1 * transaction.amount;
        }
      });

      financialData.push(monthlyData);
    }

    return financialData;
  };
  structureTransactions(transactions);
  return transactions.length < 1 ? (
    <IntroContainer>
      <div className="image">
        <img src={TranIcon} alt="transactions icon" />
      </div>
      <h2>No transactions recorded</h2>
      <p>Once you start adding transactions, you will see a graph here</p>
      <p>Get started by adding your first transaction</p>
    </IntroContainer>
  ) : (
    <Container>
      <ResponsiveContainer>
        <AreaChart
          data={structureTransactions(transactions)}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 350px;
  height: 210px;
  background-color: #fff;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 7px 23px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media screen and (max-width: 800px) {
    /* display: none; */
    margin-bottom: 8rem;
  }
`;

const IntroContainer = styled.div`
  position: relative;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  color: #333;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  background-color: rgba(237, 237, 233, 0.59);

  .image {
    position: absolute;
    width: 80px;
    height: auto;
    top: -20%;

    > img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 0.9rem;
    font-weight: 400;
  }

  > * {
    margin: 0;
  }
`;
