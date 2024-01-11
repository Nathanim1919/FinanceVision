import React, { useState } from 'react';
import styled from 'styled-components';
import {FaPlus} from 'react-icons/fa';
import GoalForm from './forms/GoalForm';


const GoalsComponent = () => {
  const [createGoal, setCreateGoal] = useState(false);
  const [goals, setGoals] = useState([
    {
      name: 'Emergency Fund',
      amount: 5000,
      category: 'Savings',
      targetDate: '2024-12-31',
      priority: 'High',
      contributions: [
        { amount: 500, frequency: 'Monthly' },
        { amount: 1000, frequency: 'Quarterly' }
      ],
      riskTolerance: 'Low',
      trackingProgress: '10%',
      notes: 'Save for unexpected expenses like medical emergencies.'
    },
    {
      name: 'Retirement Fund',
      amount: 100000,
      category: 'Retirement',
      targetDate: '2050-01-01',
      priority: 'High',
      contributions: [
        { amount: 1000, frequency: 'Monthly' },
        { amount: 5000, frequency: 'Yearly' }
      ],
      riskTolerance: 'Moderate',
      trackingProgress: false,
      notes: 'Build a fund for a comfortable retirement.'
    },
    {
      name: 'Education Fund',
      amount: 20000,
      category: 'Education',
      targetDate: '2030-06-30',
      priority: 'Medium',
      contributions: [
        { amount: 300, frequency: 'Monthly' },
        { amount: 1500, frequency: 'Yearly' }
      ],
      riskTolerance: 'Low',
      trackingProgress: true,
      notes: 'Save for children\'s education expenses.'
    },
    {
      name: 'Travel Adventure',
      amount: 8000,
      category: 'Personal',
      targetDate: '2023-12-31',
      priority: 'Medium',
      contributions: [
        { amount: 200, frequency: 'Monthly' },
        { amount: 1000, frequency: 'Quarterly' }
      ],
      riskTolerance: 'High',
      trackingProgress: true,
      notes: 'Explore new destinations and experiences.'
    },
    {
      name: 'Debt Repayment',
      amount: 5000,
      category: 'Debt',
      targetDate: '2024-09-30',
      priority: 'High',
      contributions: [
        { amount: 500, frequency: 'Monthly' },
        { amount: 1000, frequency: 'Quarterly' }
      ],
      riskTolerance: 'Low',
      trackingProgress: true,
      notes: 'Pay off credit card debt and become debt-free.'
    }
  ]);
  

  const [newGoal, setNewGoal] = useState({
    name: '',
    amount: 0,
    category: '',
    targetDate: '',
    priority: '',
    contributions: [],
    riskTolerance: '',
    trackingProgress: false,
    notes: ''
  });

  const addGoal = () => {
    if (
      newGoal.name.trim() !== '' &&
      newGoal.amount > 0 &&
      newGoal.category.trim() !== '' &&
      newGoal.targetDate.trim() !== '' &&
      newGoal.priority.trim() !== '' &&
      newGoal.riskTolerance.trim() !== ''
    ) {
      setGoals([...goals, newGoal]);
      setNewGoal({
        name: '',
        amount: 0,
        category: '',
        targetDate: '',
        priority: '',
        contributions: [],
        riskTolerance: '',
        trackingProgress: false,
        notes: ''
      });
    }
  };

  return (
    <div> 
      <GoalListContainer>
        <div className='header'>
          <h2>Your Financial Goals</h2>
          <FaPlus onClick={()=> setCreateGoal(true)} className="icon"/>
          {createGoal && <GoalForm setCreateGoal={setCreateGoal}/>}
        </div>
        <ul>
          {goals.map((goal, index) => (
            <GoalItem key={index}>
              <strong>{goal.name}</strong>
              <p>
                Amount: ${goal.amount} | Category: {goal.category} | Target Date: {goal.targetDate} | Priority: {goal.priority} | Risk Tolerance: {goal.riskTolerance}
              </p>
              <p>Contributions: {goal.contributions.map((contribution, i) => `$${contribution.amount} ${contribution.frequency}${i === goal.contributions.length - 1 ? '' : ', '}`)}</p>
              <p>Tracking Progress: {goal.trackingProgress ? 'Yes' : 'No'}</p>
              <p>Notes: {goal.notes}</p>
            </GoalItem>
          ))}
        </ul>
      </GoalListContainer>
    </div>
  );
};

export default GoalsComponent;


const GoalListContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .header{
    display:flex;
    justify-content: space-between;
    align-items: center;


    .icon{
      border-radius: 50%;
      padding: 0.5rem;
      background-color: #eee;
      cursor: pointer;

      &:hover{
        background-color: #aba7a7;
      }
    }
  }
`;

const GoalItem = styled.li`
  margin-bottom: 20px;
`;