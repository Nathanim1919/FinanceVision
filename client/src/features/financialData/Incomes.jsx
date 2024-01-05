import React, { useState } from 'react';
import styled from 'styled-components';
import { FaBriefcase,FaPlus, FaMoneyBillAlt, FaGift, FaHandHoldingUsd } from 'react-icons/fa';
import IncomeForm from './forms/IncomeForm';


const IncomesContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin: 1rem;
  border-radius: 10px;
  

  .header{
    display:flex;
    justify-content:space-between;
    align-items: center;


    >*:nth-child(2){
      width: 20px;
      padding: .5rem;
      height: 20px;
      border-radius: 50%;
      background-color: #eee;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
`;

const IncomesList = styled.div`
  /* Add styling for the list of incomes */
`;

const IncomeItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  .info{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:1rem;



    >*:nth-child(2){
      background-color: rgba(0, 255, 0, .5);
      padding: .2rem .5rem;
      border-radius: 13px;
    }

    
  }

  /* Customize styling for individual income items */
`;

const IncomeIcon = styled.div`
  font-size: 24px;
  margin-right: 10px;
`;

function Incomes() {
  const incomes = [
    { id: 1, icon: <FaBriefcase />, source: 'Salary', amount: 3000.00 },
    { id: 2, icon: <FaMoneyBillAlt />, source: 'Freelance Work', amount: 500.00 },
    { id: 3, icon: <FaGift />, source: 'Gift', amount: 100.00 },
    { id: 4, icon: <FaHandHoldingUsd />, source: 'Investments', amount: 200.00 },
  ];


  const [addIncome, setAddIncome] = useState(false);

  return (
    <IncomesContainer>
      <div className="header">
          <h3>Income Sources</h3>
          <FaPlus onClick={()=>setAddIncome(true)}/>
          {addIncome && <IncomeForm setAddIncome={setAddIncome}/>}
      </div>

      <IncomesList>
        {incomes.map(income => (
          <IncomeItem key={income.id}>
            <IncomeIcon>{income.icon}</IncomeIcon>
            <div className='info'>
              <div>{income.source}</div>
              <div>{`+${income.amount}`}</div>
            </div>
          </IncomeItem>
        ))}
      </IncomesList>
    </IncomesContainer>
  );
}

export default Incomes;
