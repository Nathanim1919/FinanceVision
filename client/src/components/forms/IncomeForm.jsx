import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";

const IncomeForm = ({setCreateIncome}) => {
  const [incomeData, setIncomeData] = useState({
    date: '',
    category: '',
    amount: '',
    merchant: '',
    frequency: 'onetime',
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
        date: '',
        category: '',
        amount: '',
        merchant: '',
        frequency: 'onetime',
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
      position: relative;

      .closeIcon{
        position: absolute;
        z-index: 3;
        top: 1rem;
        right: 1rem;
        width: 20px;
        height: 20px;
        display: grid;
        padding: 0.3rem;
        place-items: center;
        background-color: #eee;
        border-radius: 50%;
        cursor: pointer;
      }


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
          <div onClick={()=>setCreateIncome(false)} className='closeIcon'>
            <IoMdClose/>
          </div>

          <h3>Create Income Source</h3>
          <input
            type="date"
            name="date"
            value={incomeData.date}
            onChange={handleInputChange}
            required
          />

         
          <input
            type="text"
            name="category"
            placeholder='Enter Category'
            value={incomeData.category}
            onChange={handleInputChange}
            required
          />

         
          <input
            type="number"
            name="amount"
            placeholder='Enter amount'
            value={incomeData.amount}
            onChange={handleInputChange}
            required
          />

          
          <input
            type="text"
            name="merchant"
            placeholder='Who gives you the money?'
            value={incomeData.merchant}
            onChange={handleInputChange}
            required
          />

         
          <select
            name="frequency"
            value={incomeData.frequency}
            onChange={handleInputChange}
          >
            <option value="onetime">One-time</option>
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="custom">Custom</option>
          </select>

          <button type="submit">Create Income</button>
        </form>
    </Container>
  );
};

export default IncomeForm;
