import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector,useDispatch } from 'react-redux';
import { aiMessage, createMessage } from '../../features/chat/chatSlice';


export default function InputForm() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.auth.user);

  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(createMessage({message, chatBoard:user.chatBoard}))
    dispatch(aiMessage({message, chatBoard:user.chatBoard}))
    setMessage("")
  }

  return (
    <Container onSubmit={sendMessage}>
        <input value={message} onChange={(e)=>setMessage(e.target.value)} type={"text"} placeholder={"Ask me anything"}/>
        <input type={'submit'} value={'send'}/>
    </Container>    
  )
}


const Container = styled.form`
    background-color: red;
    display: flex;
    align-items: center;
    input{
        padding: 0.5rem 1rem;
        border: none;
        outline: none;
    }

    input:nth-child(1){
        flex: 1;
    }
    input:nth-child(2){
        background-color: #286cff;
        color: #fff;
    }
`
