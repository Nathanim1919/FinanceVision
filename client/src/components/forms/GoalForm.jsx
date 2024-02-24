import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios
import styled from 'styled-components';

const GoalForm = () => {
  const [incomeData, setIncomeData] = useState({
    title:"",
    description:"",
    target:0,
    current:0,
    category:"General",
    status:"",
    deadline:null,
    startDate:null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have an API endpoint for creating income records
      await axios.post('http://localhost/api/v1/incomes/createIncome', incomeData);

      // Reset form after successful submission
      setIncomeData({
        title:"",
        description:"",
        target:0,
        current:0,
        category:"General",
        status:"",
        deadline:null,
        startDate:null
      });

      // You can also add a success message or redirect the user
      console.log('Income created successfully!');
    } catch (error) {
      // Handle error - display an error message, log the error, etc.
      console.error('Error creating income:', error.message);
    }
  };


  const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: #0000004e;
    z-index: 10;
    color: #333;
    backdrop-filter: blur(3px);


    form{
      background-color: #fff;
      display: flex;
      flex-direction: column;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.116);
      gap: .3rem;
      border-radius: 10px;


      input{
        padding: 0.4rem 1rem;
        border: 1px solid #eee;
      }

      button{
        padding: 0.4rem;
        background-color: #aed7ae;
        color: #fff;
        border: none;
        cursor: pointer;
        
        &:hover{
          background-color: #85a285;
        }
      }

    }
  `

  return (
    <Container>
        <form onSubmit={handleSubmit}>
          <h3>Create Goal</h3>
          <div>
             <input type="text" placeholder='Title'/>
             <input type="text" placeholder='Description'/>
             <input type="Number" placeholder='target amount'/>
             <input type="date" placeholder='Start date'/>
             <input type="date" placeholder='Deadline'/>
             
          </div>
        </form>
    </Container>
  );
};

export default GoalForm;