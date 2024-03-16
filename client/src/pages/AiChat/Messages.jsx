import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { FaRobot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import styled from 'styled-components';
import io from 'socket.io-client'


function Messages() {
  const messages = useSelector((state)=> state.chat.messages);
  const isLoading = useSelector((state)=> state.chat.isLoading);
  const socket = io('https://financevision-2.onrender.com');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);


  useEffect(()=>{
    socket.on('message-sent', (data) => {
      notifications.push(data)
    });
    return () => socket.off('message-sent');
  },[])
  
  return (
    <Container>
      {
        messages.map(msg=> (
          <div className={msg.sender==='ai'?"box aiBox":"box userBox"}>
            {msg.sender === 'ai'?
            <div className='icon'><FaRobot/></div>:<div className='icon'><IoPerson/></div>}
            <div className={msg.sender==='ai'?"messageBox aiMessage":"messageBox userMessage"}>
                <p>{msg.content}</p>
            </div>
            <div ref={messagesEndRef} />
            
          </div>

))
}
    {isLoading && 
    <p className='loader'>Ai is Thinking ...</p>
    }
    </Container>
  )
}

export default Messages;

const Container = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
padding-top: 0.3rem;
overflow-y: auto;
height: 700px;
align-items: flex-start;

.loader{
  background-color: #eee;
  font-size: .7rem;
  padding: 0.2rem 1rem;
  border-radius: 20px;

}

.box{
  display: flex;
  /* background-color: #b0a8a8; */
  font-size: .8rem;
  padding: 0 1rem;
  max-width: 70%;
  align-items: flex-start;
  position: relative;

  @media screen and (max-width:800px){
    max-width: 80%;
  }

  .icon{
    background-color: #fff;
    width: 30px;
    height: 30px;
    position: absolute;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-size: 1.2rem;
    left: 0;
    top: -.3rem;
  }
  }

  .messageBox{
    padding: 0 2rem;
    font-size: .7rem;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  div.aiBox{
    align-self: flex-end;

  }

  div.aiMessage{
    background-color: #333;
    color: #fff;
  }

  div.userMessage{
    background-color: blue;
    color: #fff;
  }
`