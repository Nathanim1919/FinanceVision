import React, {useEffect} from 'react'
import { GrLinkNext } from "react-icons/gr";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GrTransaction } from "react-icons/gr";
import { CiCalendarDate } from "react-icons/ci";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { FaMoneyBill } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { fetchTransactions } from '../../features/transactions/transactionSlice';
import { Loader } from '../../components/Loader';




export const Transactions = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const transactions = useSelector(state => state.transaction.transactions);
  const loading = useSelector(state => state.transaction.loading);


  useEffect(() => {
    dispatch(fetchTransactions(user._id));
  }, [dispatch, user]);
  
  return (
    loading?<Loader/>:
    <Content>
    
    <Container>
      <Header>
          <h2>Nathan's Transactions</h2>
          <div className='icon' onClick={()=>setCreateIncome(true)}>
              <IoMdAdd/>
          </div>
      </Header>
      <TransactionsContainer className="transactions">
        {transactions?.map(transaction => (
          <TransactionBox key={transaction.date}>
              <div className='transaction upperData'>
                  <h4><BiSolidCategoryAlt/>{transaction.title}</h4>
                  <p style={{backgroundColor:transaction.amount < 0?"red":"blue",color:"white"}}><FaMoneyBill/>{transaction.amount} BIRR</p>
              </div>
              <div className='transaction lowerData'>
                  <h4>{transaction.merchant}</h4>
                  <p><CiCalendarDate/>{transaction.date}</p>
              </div>
          </TransactionBox>
        ))}
      </TransactionsContainer>
    </Container>
    </Content>
  )
}


const Content = styled.div`
    margin: 0 auto;
    height: 85vh;
    overflow-y: auto;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon{
        background-color: #cecbcb;
        width: 20px;
        height: 20px;
        padding: .4rem;
        border-radius: 50%;
        color: blue;
        cursor: pointer;
        display: grid;
        place-items: center;
    }
`
const TransactionBox = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  padding: .3rem;
  transition: all 0.3s ease-in-out;
  animation: fadeIn 0.5s ease-in-out;
    
    @keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);

    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
  }

  &:hover{
    background-color: #f5f5f5;
  }


  >div.transaction{
    margin: 0;
    display: flex;
    justify-content: space-between;
    padding: 0;

    >*{
      margin: 0;
      padding: 0;
    }

    p{
      font-size: .8rem;
      display: flex;
      align-items: center;
      gap: .3rem;
      font-size: .7rem;
      border-radius: 10px;
      padding:.1rem .2rem;
      color: #5e5b5b;
      margin-bottom: .2rem;
    }
  }
  .upperData h4{
    font-size: .8rem;
    display: flex;
    align-items: center;
    gap:.4rem;
  }
  .lowerData h4{
    font-size:.7rem;
    font-weight: 600;
    background-color: #9cb89c;
    display: grid;
    place-items: center;
    padding:.1rem .3rem;
    border-radius: 10px;
    margin-bottom: .3rem;
    color:#fff;
  }
`
const TransactionsContainer = styled.div`
   display: grid;
   gap: .5rem;
`


const Container = styled.div`
  color: #1e1d1d;
  width: 60%;
  margin: auto;
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