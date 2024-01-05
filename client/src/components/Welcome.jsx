import React, {useState} from 'react';
import styled from 'styled-components';
import {
    useSelector
} from 'react-redux';
import AskAi from './ai/AskAi';
import imgBg from '../assets/service/s1.jpg';

const WelcomeContainer = styled.div`
  display: grid;
  grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));
  place-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 20px;
  gap:2rem;

  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }

  .buttons{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    width: 100%;

    >*{
      flex: 1;
      padding: 0.6rem 1rem;
      background-color: blue;
      border: none;
      font-weight: bolder;
      color: #fff;
      cursor: pointer;
    }
  }
`;

const WelcomeMessage = () => {
     const user = useSelector(state => state.userAuth.user);
     const [openAI, setOpenAi] = useState(false);
  return (
    <WelcomeContainer>

    <div>
        <img src={imgBg} alt="image"/>
    </div>  
    <div>
      <h2>{(user.fullname).toUpperCase()}, Welcome to Your Financial Assistant App!</h2>
      <p>
        This intelligent financial assistant is here to make managing your finances a breeze. Take advantage of our
        cutting - edge features, Our AI assistant is here to help you on your financial journey.Whether you need advice, want to explore
        personalized insights, or have questions about your finances, simply ask the assistant
        for assistance.
        It's like having a financial expert right at your fingertips!
      </p>
      <div className='buttons'>
        <button onClick={()=> setOpenAi(true)}>Ask AI</button>
        <button>Set up Financial information</button>
      </div>
      {openAI && <AskAi user={user} setOpenAi={setOpenAi}/>}
    </div>
    </WelcomeContainer>
  );
};

export default WelcomeMessage;