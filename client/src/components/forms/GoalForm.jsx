import React, { useState } from 'react';
import axios from 'axios'; // You may need to install axios: npm install axios
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { LuGoal } from "react-icons/lu";
import { RiHealthBookFill } from "react-icons/ri";
import { MdCastForEducation } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";
import { SiYourtraveldottv } from "react-icons/si";
import { FaRegLaugh } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { BsMotherboard } from "react-icons/bs";





const GoalForm = ({setCreateGoal}) => {
  const [openCategory, setOpenCategory] = useState(false)
  const [incomeData, setIncomeData] = useState({
    title:"",
    description:"",
    target:0,
    current:0,
    category:"General",
    status:"In progress",
    deadline:null,
    startDate:null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(incomeData);

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


  
  return (
    <Container>
        <form onSubmit={handleSubmit}>
          <div onClick={()=>setCreateGoal(false)} className='closeIcon'>
            <IoMdClose/>
          </div>
          <h3>Create Goal</h3>
          <div className='inputDatas'>
             <input onChange={handleInputChange} name='title' type="text" placeholder='Title'/>
             <textarea onChange={handleInputChange} name="description" placeholder='Description' id="" cols="30" rows="2"></textarea>
             <input onChange={handleInputChange} name='target' type="Number" placeholder='target amount'/>
             <input onChange={handleInputChange} name='startDate' type="date" placeholder='Start date'/>
             <input onChange={handleInputChange} name='deadline' type="date" placeholder='Deadline'/>
             <div class="custom-select">
                <span onClick={()=>setOpenCategory(!openCategory)} class="selected-option">{incomeData.category}{!openCategory?<IoIosArrowDown/>:<IoIosArrowUp/>}</span>
                {openCategory && <ul class="options" openCategory={openCategory}>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="General"><LuGoal/>General</li>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="Health"><RiHealthBookFill/>Health</li>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="Education"><MdCastForEducation/>Education</li>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="Business"><FaBusinessTime/>Business</li>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="Travel"><SiYourtraveldottv/>Travel</li>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="Entertainment"><FaRegLaugh/>Entertainment</li>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="Family"><MdFamilyRestroom/>Family</li>
                  <li onClick={(e)=>{setIncomeData({...incomeData, [incomeData.category]:e.target.innerText }); setOpenCategory(false)}} value="Other"><BsMotherboard/>Other</li>
                </ul>}
              </div>
           <button type='submit'>Create</button>
          </div>
        </form>
    </Container>
  );
};

export default GoalForm;




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


      .custom-select{
        width: 100%;
        border: none;
        outline: none;
        position: relative;


        ul{
          position: absolute;
          background-color: #fff;
          transform: translateY(-60%) translateX(150%);
          display: grid;
          box-shadow: 0 9px 44px rgba(0, 0, 0, 0.374);
          padding: 0;
          animation: animate .4s linear;

          @keyframes animate {
              from{
                opacity: 0;
              }
              to{
                opacity: 1;
              }
          }

          li{
            font-size: .7rem;
            list-style-type: none;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;

            &:hover{
              background-color: #eee;
            }

          }
        }

        span{
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }
      }

      

      
      .inputDatas{
        display: grid;
        width: 100%;
        gap: .3rem;

        *{
          padding: 0.4rem 1rem;
          border: 1px solid #eee;
          resize: none;
          outline: none;
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