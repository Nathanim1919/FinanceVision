import { useEffect } from 'react'
import { GrLinkNext } from "react-icons/gr";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GrTransaction } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../components/Loader';
import { CiMoneyCheck1 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import { formatDate } from '../../utils/Formatting';
import { fetchIncomes } from '../../features/incomes/incomeSlice';
import { fetchExpenses } from '../../features/expenses/expenseSlice';
import { IoIosAdd } from "react-icons/io";


export const Transactions = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const transactions = useSelector(state => state.transaction.transactions).slice(0,3);
  const loading = useSelector(state => state.transaction.loading);


  useEffect(() => {
    if (user._id && transactions.length === 0){
        dispatch(fetchIncomes(user._id))
        dispatch(fetchExpenses(user._id))
    }
  }, [user]);

  return (
    loading?<Loader/>:
    <Container>
      <div className="header">
        <h2><GrTransaction/>Recent Transactions</h2>
        <Link to={'/transactions'} className='showAllIcon'>
          <GrLinkNext/>
        </Link>
      </div>
      <TransactionsContainer className="transactions">
        {transactions.length === 0 ? (
            <div className='emptyOne'>
              <p>No transactions recorded yet. creating your first transaction now.</p>
              <div>
                <Link to="/goals"><IoIosAdd/>Income</Link>
                <Link to="/expenses"><IoIosAdd/>Expense</Link>
              </div>
            </div>
        ): transactions.map(transaction => (
          <TransactionBox key={transaction.date}>
              <div className='transaction upperData'>
                  <h4>{transaction.title}</h4>
                  <p style={{backgroundColor:transaction.amount < 0?"red":"blue"}}><CiMoneyCheck1/>{transaction.amount} ETB</p>
              </div>
              <div className='transaction lowerData'>
                  <h4><CiLocationOn/>{transaction.merchant}</h4>
                  <p className='date'><CiCalendarDate/>{formatDate(transaction.date)}</p>
              </div>
          </TransactionBox>
        ))}
      </TransactionsContainer>
    </Container>
  )
}


const TransactionBox = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;


  >div.transaction{
    margin: 0;
    display: flex;
    justify-content: space-between;
    padding: 0;

    >*{
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      gap: .1rem;
    }
    

    p{
      font-size: .8rem;
      background-color: #50adff;
      border-radius: 10px;
      padding:0rem .2rem;
      color: #fff;
      margin-bottom: .2rem;
    }
    p.date{
      padding: 0;
      background-color: transparent;
      color: #333;
      display: flex;
      align-items: center;
      gap: .3rem;
      font-size: .7rem;
  }
  }
  .upperData h4{
    font-size: .8rem;
  }
  .lowerData h4{
    font-size:.7rem;
    font-weight: 600;
    background-color: #9cb89c;
    padding:.1rem .3rem;
    border-radius: 10px;
    margin-bottom: .3rem;
    color:#fff;
  }


`
const TransactionsContainer = styled.div`
   display: grid;
   gap: .5rem;

   .emptyOne{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding:1rem 0rem;
    width: 100%;

    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 3rem;
    }


    a{
      background-color: #eee;
      padding: 0.1rem .5rem;
      color: #333;
      border-radius: 20px;
      text-decoration: none;
      font-size: .8rem;
      display: flex;
      align-items: center;
      gap: .3rem;
      font-weight: 600;
    }
  }
`


const Container = styled.div`
  color: #1e1d1d;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;

    .showAllIcon{
      width: 15px;
      height: 15px;
      display: grid;
      place-items: center;
      background-color: #eee;
      padding: 0.3rem;
      border-radius: 50%;
    }

    >*{
      margin: 0;
      padding: 0;
    }

    h2{
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: 1rem;
    }
  }
`