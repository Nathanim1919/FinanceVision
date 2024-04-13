import {useEffect, useState} from 'react'
import Header from "./Header.jsx";
import InputForm from "./InputForm.jsx";
import Messages from './Messages.jsx';
import styled from 'styled-components';
import { fetchChat } from '../../features/chat/chatSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import PlanImage from '../../../public/chat/plan.png';
import AdviceImage from '../../../public/chat/advice.png';
import BudgetImage from '../../../public/chat/budget.png';
import TrackImage from '../../../public/chat/track.png';



function ChatBoard() {

  const user = useSelector((state) => state.auth.user);
  const [openChat, setOpenChat] = useState(false);
  const dispatch  = useDispatch();

  useEffect(()=> {
    dispatch(fetchChat({chatId:user.chatBoard}))
  },[user])
  
  return (
<Container openChat={openChat}>
    <div className='header'>
      <h1>Welcome to the AI Chat Board</h1>
      <h2>Hello, {user.username}!</h2>
      <p>Engage in interesting conversations with our AI. Click the button below to start chatting.</p>
      <button onClick={() => setOpenChat(!openChat)}>
        {openChat ? "Close Chat" : "Start Chatting"}
      </button>
  </div>

  <div className="info-boxes">
    <div className="info-box">
      <img src={PlanImage} alt="" />
      <h3>Financial Planning</h3>
      <p>Our AI can help you create a personalized financial plan.</p>
    </div>
    <div className="info-box">
      <img src={BudgetImage} alt="" />
      <h3>Budgeting</h3>
      <p>Get assistance in managing your budget effectively.</p>
    </div>
    <div className="info-box">
      <img src={AdviceImage} alt="" />
      <h3>Investment Advice</h3>
      <p>Receive investment advice based on your financial goals.</p>
    </div>
    <div className="info-box">
      <img src={TrackImage} alt="" />
      <h3>Expense Tracking</h3>
      <p>Track your expenses and understand your spending habits better.</p>
    </div>
  </div>
  <div className="container">
    <Header setOpenChat={setOpenChat}/>
    <Messages/>
    <InputForm/>
  </div>
</Container>
  )
}

export default ChatBoard;


const Container = styled.div`
    background-color: #f5f5f5;
    

    .header{
      padding: 2rem 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h1{
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h2{
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      p{
        font-size: 1rem;
        margin-bottom: 1rem;
        max-width: 80%;
        text-align: center;
      }

      button{
        padding: 0.5rem 1rem;
        background-color: #286cff;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover{
          background-color: #1e4bb5;
        }

      }

      >*{
        margin:0;
      }
    }

    .info-boxes{
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      padding: 2rem 0;
      width:90%;
      margin: 0 auto;
      

      .info-box{
        display: grid;
        place-items: center;
        background-color: #fff;
        padding: 1rem;
        border-radius: 10px;
        box-shadow: 0 6px 30px rgba(0,0,0,0.1);
        h3{
          margin-bottom: 1rem;
        }
      }
    }

    .container{
      overflow: hidden;
      display: grid;
      grid-template-rows: .1fr .8fr .1fr;
      height: 100vh;
      width: 40vw;
      margin: 0 auto;
      background-color: #fff;
      box-shadow: 0 6px 30px rgba(0,0,0,0.1);
      position: fixed;
      transform: translateX(${props => props.openChat ? 0 : 100}%);
      transition: all 0.3s ease-in-out;
      z-index: 12;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 1rem 2rem;


      @media screen and (max-width:800px){
          width: 100vw;
          height: 100vh;
          overflow-x: hidden;
          padding: 1rem;
      }
    }
  


  

  >*{
      width: 100%;
  }

  >*:nth-child(2){
      //flex: 1;
  }
`