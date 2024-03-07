import React, {useEffect, useMemo} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import { selectUser } from "../../features/auth/authSlice";


export default function FinancialBarChart() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const transactions = useSelector(state => state.transaction.transactions);


  useEffect(() => {
    dispatch(fetchTransactions(user._id));
  }, [dispatch, user]);


  const data = useMemo(() => {
      return transactions.map(transaction => ({
          category: transaction.title,
          incomes: transaction.type === 'deposit' ? transaction.amount : 0,
          expenses: transaction.type === 'withdraw' ? (transaction.amount)*-1 : 0,
      }));
    }, [transactions]);


  if (data.length < 1){
    return(
      <h2>Empty Tranasction History</h2>
    )
  }

  return (
    <BarChart width={330} height={220} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="incomes" stackId="a" fill="#66CC66" />
      <Bar dataKey="expenses" stackId="a" fill="#FF7F7F" />
    </BarChart>
  );
}

