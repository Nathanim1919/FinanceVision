import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { createExpense } from '../../features/expenses/expenseSlice';
import { fetchUser } from '../../features/auth/authSlice';

const ExpenseForm = ({setCreateExpense}) => {
  const isLoading = useSelector((state) => state.expense.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch  = useDispatch();
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

  const setFrequency = (e) => {
    const selectedFrequency = e.target.innerText.toLowerCase();
    setIncomeData({ ...incomeData, frequency: selectedFrequency });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // create new income 
    dispatch(createExpense(incomeData, user._id));
    dispatch(fetchUser())

    // Reset form after successful submission
    setIncomeData({
      date: '',
      category: '',
      amount: '',
      merchant: '',
      frequency: 'onetime',
    });
    setCreateExpense(false);
  };


  return (
    <Container>
        <form onSubmit={handleSubmit}>
          <div onClick={()=>setCreateExpense(false)} className='closeIcon'>
            <IoMdClose/>
          </div>
          <h3>Create Expense</h3>
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
            placeholder='Recipient?'
            value={incomeData.merchant}
            onChange={handleInputChange}
            required
          />

         
        <div className="frequency">
          <li onClick={setFrequency}>
            {incomeData.frequency !== "onetime" ? (
              <MdOutlineRadioButtonUnchecked />
            ) : (
              <MdOutlineRadioButtonChecked />
            )}
            onetime
          </li>
          <li onClick={setFrequency}>
            {incomeData.frequency !== "weekly" ? (
              <MdOutlineRadioButtonUnchecked />
            ) : (
              <MdOutlineRadioButtonChecked />
            )}
            weekly
          </li>
          <li onClick={setFrequency}>
            {incomeData.frequency !== "monthly" ? (
              <MdOutlineRadioButtonUnchecked />
            ) : (
              <MdOutlineRadioButtonChecked />
            )}
            monthly
          </li>
          <li onClick={setFrequency}>
            {incomeData.frequency !== "annually" ? (
              <MdOutlineRadioButtonUnchecked />
            ) : (
              <MdOutlineRadioButtonChecked />
            )}
            annually
          </li>
        </div>


          {!isLoading?<button type="submit">Create Expense</button>:
          <button className='loadingState'><FaArrowRotateLeft/><span></span> Creating ...</button>}
        </form>
    </Container>
  );
};

export default ExpenseForm;







// the styled components
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
      position: relative;
      border-radius: 10px;

      .frequency{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        list-style-type: none;
        gap: .5rem;

          >li{
            display: flex;
            align-items: center;
            gap: .5rem;
            cursor: pointer;
            background-color: #46cbff;
            padding: 0.1rem 0.5rem;
            border-radius: 15px;
            font-size: .8rem;
            color: #fff;
          } 
      }

  button.loadingState{
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: .1rem;
    background-color: #fff;
    color: #333;
    cursor: not-allowed;

    &:hover{
      background-color: #fff;
    }
  }

  button span{
    animation: rotate 1s linear infinite;


    @keyframes rotate {
      from {
        transform: rotate(0deg);

      }
      to {
        transform: rotate(360deg);
      }
    }
  }

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