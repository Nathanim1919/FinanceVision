import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { aiMessage, createMessage } from '../../features/chat/chatSlice';
import { SocketContext } from '../../utils/socketConnection';

export default function InputForm() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user);
  const socket = useContext(SocketContext);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    dispatch(createMessage({message, chatBoard:user.chatBoard}))
      .then((userMessage) => {
        socket.emit('new-message', userMessage);
      });
    setMessage("")
    dispatch(aiMessage({message, chatBoard:user.chatBoard}))
    .then((aiMessage) => {
        socket.emit('new-message', aiMessage);
      });
  }

  return (
    <Container onSubmit={sendMessage}>
        <input value={message} onChange={(e)=>setMessage(e.target.value)} type={"text"} placeholder={"Ask me anything"}/>
        <input type={'submit'} value={'send'}/>
    </Container>    
  )
}


const Container = styled.form`
    display: flex;
    align-items: center;
    
    
    @media screen and (max-width:800px){
      bottom: 25%;
      right: 0;
      left: 0;
      
    }
    input{
        padding: 0.5rem 1rem;
        border: none;
        outline: none;
        background-color: transparent;
        color: #fff;
    }

    input:nth-child(1){
        flex: 1;
    }
    input:nth-child(2){
        background-color: #ffffff;
        color: #282626;
        cursor: pointer;
    }
`
