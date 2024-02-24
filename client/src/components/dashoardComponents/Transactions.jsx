import React from 'react'
import { GrLinkNext } from "react-icons/gr";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GrTransaction } from "react-icons/gr";

export const Transactions = () => {
  const transactionData = [
    {
      date: "2024-02-22",
      category: "Groceries",
      amount: -150.00,
      merchant: "Supermarket X",
      type:"income"
    },
    {
      date: "2024-02-21",
      category: "Salary",
      amount: 2500.00,
      merchant: "Company Payroll",
      type:"expense"
    },
    {
      date: "2024-02-20",
      category: "Utilities",
      amount: -50.00,
      merchant: "Electric Company",
      type:"income"
    },
  ]
  
  return (
    <Container>
      <div className="header">
        <h2><GrTransaction/>Recent Transactions</h2>
        <Link className='showAllIcon'>
          <GrLinkNext/>
        </Link>
      </div>
      <TransactionsContainer className="transactions">
        {transactionData.map(transaction => (
          <TransactionBox key={transaction.date}>
              <div className='transaction upperData'>
                  <h4>{transaction.category}</h4>
                  <p style={{backgroundColor:transaction.amount < 0?"red":"blue"}}>{transaction.amount}</p>
              </div>
              <div className='transaction lowerData'>
                  <h4>{transaction.merchant}</h4>
                  <p>{transaction.date}</p>
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
    }

    p{
      font-size: .8rem;
      background-color: #50adff;
      border-radius: 10px;
      padding:.1rem .2rem;
      color: #fff;
      margin-bottom: .2rem;
    }
  }
  .upperData h4{
    font-size: .8rem;
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