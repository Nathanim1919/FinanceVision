import React, {useEffect, useMemo} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionSlice";
import { selectUser } from "../../features/auth/authSlice";
import styled from "styled-components";
import TranIcon from '/notiIcon/tra.png';


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


  return (
    <div>
      {transactions.length < 1 ? 
        <IntroContainer>
          <div className="image">
            <img src={TranIcon} alt="transactions icon"/>
          </div>
          <h2>No transactions recorded</h2>
          <p>Once you start adding transactions,<br/>you will see a graph here</p>
          <p>Get started by adding your first transaction</p>
        </IntroContainer>
      :
      <BarChart width={330} height={220} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="incomes" stackId="a" fill="#66CC66" />
        <Bar dataKey="expenses" stackId="a" fill="#FF7F7F" />
      </BarChart>
      }
    </div>
  );
}


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


  .image{
    position: absolute;
    width: 80px;
    height: auto;
    top: -20%;

    >img{
      width: 100%;
      height: auto;
      object-fit: cover;
      sh
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: .9rem;
    font-weight: 400;
  }

  >* {
    margin: 0;
  }
`
