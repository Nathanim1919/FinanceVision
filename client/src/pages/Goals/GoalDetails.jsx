import React, { useState, useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import styled from 'styled-components';
import { PiSubtitles } from "react-icons/pi";
import { BsCardHeading } from "react-icons/bs";
import { FaMoneyBillWave } from "react-icons/fa";
import { GoGoal } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { BsFillTicketDetailedFill } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { TbProgress } from "react-icons/tb";
import { formatDate, formatNumber } from '../../utils/Formatting';
import { CiCalendarDate } from "react-icons/ci";
import { MdCalendarToday } from "react-icons/md";
import { RiLuggageDepositLine } from "react-icons/ri";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { updateGoal } from '../../features/goals/goalSlice';
import { useNavigate } from 'react-router-dom';
import { fetchUser } from '../../features/auth/authSlice';
import { calculateTimeLeft } from '../../utils/Formatting';

export const GoalDetails = ({ goal, setShowDetails }) => {
  const user = useSelector(state => state.auth.user)
  const navigate = useNavigate()

  const [depositAmount, setDepositAmount] = useState(0);

  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newDepositAmount = parseInt(e.target.value, 10);

    if (isNaN(newDepositAmount) || newDepositAmount < 0) {
      setErrorMessage('Please enter a valid non-negative number for deposit amount.');
      return; // Prevent state update if input is invalid
    }

    setDepositAmount(newDepositAmount);
    setErrorMessage(''); // Clear any previous error message
  };



  const handleDeposit = async (id) => {
    try {
      const resultAction = await dispatch(updateGoal({
        id,
        depositAmount,
        userId: user._id
      }));
      dispatch(fetchUser());


      if (resultAction.payload){
        const { data, message,error } = resultAction.payload;
        if (resultAction.status >= 400) {
          setErrorMessage(message);
          console.log('Data:', data);
          console.log('Message:', message);
          console.log('error:', error);
          return;
        }
      } else {
        throw new Error('No payload returned from updateGoal action');
      }
    
     
      setDepositAmount(0);
      setShowDetails(false);
    } catch (error) {
      console.error('Error updating goal progress:', error);
      setErrorMessage('An error occurred while depositing funds. Please try again later.');
    }
  };
  

  return (
    <Overlay>
      <Container>
        <Header className="header">
          <h2><BsFillTicketDetailedFill />Goal Details</h2>
          <div className='closeIcon' onClick={() => setShowDetails(false)}>
            <IoMdClose />
          </div>
        </Header>

        <Content className="goal-details">
          <div className='titles'>
            <div>
              <BsCardHeading />
              <h2>{goal.title}</h2>
            </div>
            <div>
              <PiSubtitles />
              <p>{goal.description}</p>
            </div>
          </div>

          <div className='targetValues'>
            <div>
              <h4><GoGoal />Target</h4>
              <p><FaMoneyBillWave />{formatNumber(goal.target)} ETB</p>
            </div>
            <div>
              <h4><GiProgression />Current</h4>
              <p><FaMoneyBillWave />{formatNumber(goal.current)} ETB</p>
            </div>
          </div>

          <div className="depositeInput">
            <h4><RiLuggageDepositLine />Deposite</h4>
            <div>
              <input onChange={handleChange} type="text" value={depositAmount} />
              <button onClick={()=>handleDeposit(goal._id)}>Add</button>
            </div>
            {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
          </div>

          <div className="progress">
            <div>
              <div className='outter'>
                <div style={{ width: `${goal.progress}%` }} className='inner'></div>
              </div>
              <div className='percent'>
                <p>{goal.progress}</p>
                %
              </div>
            </div>
            <p><MdCalendarToday />{goal.progress === 100?'Completed':calculateTimeLeft(goal.startDate, goal.deadline)}</p>
          </div>

          <div className='statusAndCategory'>
            <p><BiCategory />{goal.category}</p>
            <p><TbProgress />{goal.status}</p>
          </div>

          <div className="date">
            <p><CiCalendarDate />{formatDate(goal.startDate)}</p>
            <p><CiCalendarDate />{formatDate(goal.deadline)}</p>
          </div>
        </Content>
      </Container>
    </Overlay>
  );
};


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,.5);
  z-index: 1;
`


const Container = styled.div`
 box-shadow: 0 8px 45px rgba(0,0,0,.2);
  background-color: white;
  position: absolute;
  height: 100vh;
  width: 40vw;
  right: 0;
  top: 0;
  z-index: 2;
`


const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
  background-color: #eee;

  h2{
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .closeIcon{
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    background-color: #eee;
    padding: 0.3rem;
    border-radius: 50%;
    cursor: pointer;
    
  }
`

const Content = styled.div`
  margin: 0 auto;
  padding: 1rem 2rem;

  h4{
        display: flex;
        align-items: center;
        gap: .5rem;
      }

  .titles{
     div{
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid #ddd;
     }
  }

  .depositeInput{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap:1rem;

    div{
      background-color: #eee;
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.2rem 1rem;
      border-radius: 30px;

      button{
        background-color: #1f9af8;
        color: #fff;
        padding: 0.1rem 1rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
      }

      input{
        border: none;
        outline: none;
        display: grid;
        place-items: center;
        padding-left: 1rem;
        width: 100px;
      }
    }
  }

  .targetValues{
    padding: 0;
    display: flex;
    flex-direction: column;
    div{
      margin: 0;
      display: flex;
      align-items: center;
      gap: 1rem;
      border-bottom: 1px solid #ddd;

    


      p{
        background-color: #eee;
        padding: .2rem .5rem;
        border-radius: 30px;
        display: flex;
        align-items: center;
        gap: .4rem;
        font-size: .8rem;
      }
    }
  }

  .statusAndCategory{
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #ddd;

    p{
      background-color: #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: .3rem;
      padding: 0.1rem 1rem;
      border-radius: 30px;
      font-size: .8rem;
    }
  }

  .date{
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid #ddd;

    p{
      display: flex;
      align-items: center;
      gap: .3rem;
      font-size: .8rem;
      background-color: #eee;
      padding: 0.1rem 1rem;
      border-radius: 30px;

    }
  }

  .progress{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ddd;
    padding: 0.2rem 0;

    >*{
      margin: 0;
      padding: 0;
    }
    
    >p{
      background-color: #eee;
      font-size: .8rem;
      padding: 0.2rem 1rem;
      border-radius: 30px;
      align-self: flex-start;
      display: flex;
      align-items: center;
      gap: .3rem;
    }
    >div{
      display: flex;
      align-items: center;
      gap: 1rem;

      .percent{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
        width: 33px;
        height: 33px;
        border-radius: 50%;
        font-size: .8rem;
      }

      div:nth-child(1){
        flex: 1;
        height: 5px;
        width: 100%;
        background-color: #eee;
        position: relative;
        overflow: hidden;


        div{
          background-color: #1f6dff;
          position: absolute;
          left: 0;
          height: 100%;

        }
      }
    }
  }
`