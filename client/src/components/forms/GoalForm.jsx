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
import { createGoal } from '../../features/goals/goalSlice';
import {useSelector, useDispatch} from 'react-redux';



const GoalForm = ({setCreateGoal}) => {
  const [openCategory, setOpenCategory] = useState(false);
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();
  const [goalData, setGoalData] = useState({
    title: "",
    description: "",
    target: 0,
    category: "General",
    status: "In Progress",
    deadline: null,
    startDate: null,
  });


  const handleInputChange = (e) => {
    setGoalData({ ...goalData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(createGoal({goalData,userId:user._id}));
      setGoalData({  // Reset form data
        title: "",
        description: "",
        target: 0,
        deadline: null,
        startDate: null,
      });
      setCreateGoal(false);
    } catch (error) {
      // Handle API call errors (e.g., display error message, retry logic)
      console.error("Error creating goal:", error);
    }
  };
  

  // Combined category and dropdown logic for cleaner structure
  const handleCategoryChange = (newCategory) => {
    setGoalData({ ...goalData, category: newCategory });
  };

  const toggleCategoryDropdown = () => {
    setOpenCategory(!openCategory);
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
                <span onClick={toggleCategoryDropdown} class="selected-option">{goalData.category}{!openCategory?<IoIosArrowDown/>:<IoIosArrowUp/>}</span>
                {openCategory && <ul class="options" openCategory={openCategory}>
                  <li onClick={()=> {handleCategoryChange("General");setOpenCategory(false)}} value="General"><LuGoal/>General</li>
                  <li onClick={()=> {handleCategoryChange("Health");setOpenCategory(false)}} value="Health"><RiHealthBookFill/>Health</li>
                  <li onClick={()=> {handleCategoryChange("Education");setOpenCategory(false)}} value="Education"><MdCastForEducation/>Education</li>
                  <li onClick={()=> {handleCategoryChange("Business");setOpenCategory(false)}} value="Business"><FaBusinessTime/>Business</li>
                  <li onClick={()=> {handleCategoryChange("Travel");setOpenCategory(false)}} value="Travel"><SiYourtraveldottv/>Travel</li>
                  <li onClick={()=> {handleCategoryChange("Entertainment");setOpenCategory(false)}} value="Entertainment"><FaRegLaugh/>Entertainment</li>
                  <li onClick={()=> {handleCategoryChange("Family");setOpenCategory(false)}} value="Family"><MdFamilyRestroom/>Family</li>
                  <li onClick={()=> {handleCategoryChange("Other");setOpenCategory(false)}} value="Other"><BsMotherboard/>Other</li>
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

          @media screen and (max-width: 500px){
            transform: translateY(-60%) translateX(-40%);
          }

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