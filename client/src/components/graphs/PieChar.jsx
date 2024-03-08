import React from "react";
import styled from "styled-components";
import {useSelector } from "react-redux";


export default function UserFinancePieChart() {
  const incomes = useSelector((state) => state.income.incomes);
  const expenses = useSelector((state) => state.expense.expenses);


  const data = [
    { name: "Incomes", value: incomes.reduce((acc, income) => acc + income.amount, 0) },
    { name: "Expenses", value: expenses.reduce((acc, expense) => acc + expense.amount, 0)},
    { name: "Net", value: incomes.reduce((acc, income) => acc + income.amount, 0) - expenses.reduce((acc, expense) => acc + expense.amount, 0) },
  ];


  return (
    <Container>
       <Upper>
          <div>
            <h1>{data[0].value} <span>ETB</span></h1>
            <p>Total Income</p>
            </div>
          <div>
            <h1>{data[1].value} <span>ETB</span></h1>
            <p>Total Expense</p>
            </div>
       </Upper>
       <Net>
            <h1>{data[2].value} <span>ETB</span></h1>
            <p>Net Amount</p>
       </Net>

    </Container>
  );
}



const Container = styled.div`
width: 100%;
display: grid;
gap: .5rem;

span{
  font-size: .7rem;
}

p{
  color: #696666;
}

`

const Upper = styled.div`
    display: flex;
    justify-content: space-between;
    color: #333;
    gap: .5rem;

    div {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #eee;
        padding: 0.5rem;

        > *{
          margin: 0;
        }
    }
`

const Net = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #eee;
    color: #333;
    align-items: center;
    padding: 0.5rem;

    > *{
      margin: 0;
    }
`