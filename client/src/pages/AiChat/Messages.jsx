import { useEffect, useRef } from 'react'
import { useSelector} from 'react-redux'
import { FaRobot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import styled from 'styled-components';



function Messages() {
  const messages = useSelector((state)=> state.chat.messages);
  const isLoading = useSelector((state)=> state.chat.isLoading);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
     
  useEffect(
    scrollToBottom , [messages]);

  
  return (
    <Container   ref={messagesEndRef}>
      <MessagesContainer>
          {
            messages && messages.map(msg=> (
              <div className={msg.sender==='ai'?"box aiBox":"box userBox"}>
                    {msg.sender === 'ai'?
                    <div className='icon'><FaRobot/></div>:<div className='icon'><IoPerson/></div>}
                      {msg.content !== "" && <div className={msg.sender==='ai'?"messageBox aiMessage":"messageBox userMessage"}>
                          <p>{msg.content}</p>
                      </div>}
<div ref={messagesEndRef} />
              </div>

        ))
        }
        {isLoading && 
        <p className='loader'>I'am Thinking ...</p>
        }
     </MessagesContainer>
    </Container>
  )
}

export default Messages;

const Container = styled.div`
  
`

const MessagesContainer = styled.div`
height: 90vh;
overflow: hidden;
display: flex;
flex-direction: column;
gap: 1rem;
padding:1rem 0;
overflow-y: auto;
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
    left: .4rem;
    top: -.3rem;
  }
  }

  .messageBox{
    padding: 0 2rem;
    font-size: .7rem;
    /* box-shadow: 0 10px 26px rgba(0, 0, 0, 0.3); */
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