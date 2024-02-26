import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { FaArrowRotateLeft } from "react-icons/fa6";


const IncomeForm = ({setCreateIncome}) => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
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
    console.log(incomeData)
    setIsLoading(true)
    try {
      // Assuming you have an API endpoint for creating income records
      await axios.post('http://localhost:3000/api/v1/incomes/', {incomeData, userId:user._id});

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
      console.log(incomeData)
    } catch (error) {
      // Handle error - display an error message, log the error, etc.
      console.error('Error creating income:', error.message);
    }
    setIsLoading(false);
    setCreateIncome(false)
  };


 
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
          />

         
          <input
            type="text"
            name="category"
            placeholder='Enter Category'
            value={incomeData.category}
            onChange={handleInputChange}
          />

         
          <input
            type="number"
            name="amount"
            placeholder='Enter amount'
            value={incomeData.amount}
            onChange={handleInputChange}
          />

          
          <input
            type="text"
            name="merchant"
            placeholder="Enter the payer's name?"
            value={incomeData.merchant}
            onChange={handleInputChange}
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


          {!isLoading?<button type="submit">Create Income</button>:
          <button className='loadingState'><FaArrowRotateLeft/><span></span> Creating ...</button>}
        </form>
    </Container>
  );
};

export default IncomeForm;


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
