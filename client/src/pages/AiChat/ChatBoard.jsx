import {useEffect} from 'react'
import Header from "./Header.jsx";
import InputForm from "./InputForm.jsx";
import Messages from './Messages.jsx';
import styled from 'styled-components';
import { fetchChat } from '../../features/chat/chatSlice.js'
import { useDispatch, useSelector } from 'react-redux'

function ChatBoard() {

  const user = useSelector((state) => state.auth.user);
  const dispatch  = useDispatch();

  useEffect(()=> {
    dispatch(fetchChat({chatId:user.chatBoard}))
  },[user])
  
  return (
    <Container>
        <Header/>
        <Messages/>
        <InputForm/>
    </Container>
  )
}

export default ChatBoard;


const Container = styled.div`
  border-top-right-radius:10px;
  border-top-left-radius:10px;
    overflow: hidden;
    display: grid;
    grid-template-rows: .1fr .8fr .1fr;
  


  @media screen and (max-width:800px){
    width: 90vw;
    height: 100vh;
    overflow-x: hidden;
    padding: 1rem;
  }

  >*{
      width: 100%;
  }

  >*:nth-child(2){
      //flex: 1;
  }
`