import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
    IoMdClose
} from "react-icons/io";
import { FcMindMap } from "react-icons/fc";
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';



function AskAi({user, setOpenAi}) {
  const [message, setMessage] = useState('');  
  const [haveConversation, setHaveConversation] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
        // Save user message
        const userMessage = await axios.post('http://localhost:5000/api/messages/sendMessage', { text: message, userId: user._id });
        console.log(userMessage)

        // Trigger AI response
        const aiResponse = await axios.post(process.env.OPENAI_API, { text: message });

        // Save AI response as a message
        const aiMessage = await axios.post('http://localhost:5000/api/messages/sendMessage', {
            text: aiResponse.data.aiText,  // Adjust based on your AI response structure
            sender: 'ai',
        });

        console.log(aiMessage)

        // Clear the message input
        setMessage('');
        setHaveConversation(!haveConversation);
    } catch (error) {
        console.log(error);
    }
};

  
const getMessages =async () => {
    try {
        const messages = await axios.get('http://localhost:5000/api/messages/getMessage', {userId: user._id })
        console.log("hey", messages);
    } catch (error) {
        console.log(error);
    }
}


  useEffect(()=>{
    getMessages();
  },[haveConversation])


  return (
    <Container >
        <div className='header'>
            <p>hi {user.fullname}</p>
            <div className='close' onClick={()=>setOpenAi(false)}>
                < IoMdClose/>
            </div>
        </div>
        <div className='messages'>
           <div className="userMessage">
                <div>
                    <FaRegUser/>
                    <div className="message-content">
                        <p>Hi there! I need some help with my finances.</p>
                    </div>
                </div>
                <p>5 seconds ago</p>
           </div>

           <div className="aiMessage">
                <div>
                    <div className="message-content">
                     <p>Hello! I'm here to assist you with your finances. What specific information or assistance are you looking for?</p>
                    </div>
                    <FcMindMap style={{
                        fontSize:"3rem",
                    }}/>
                </div>
                <p>3 seconds ago</p>
           </div>
        </div>

        <div className='footer'>
            <form onSubmit={sendMessage}>
                <input value={message} onChange={(e)=> setMessage(e.target.value)} type='text' placeholder='ask me..' required/>
                <input type='submit' value={'send'}/>
            </form>
        </div>
    </Container>
  )
}

export default AskAi;

const Container = styled.div`
    position: absolute;
    background-color: #fff;
    bottom: 2rem;
    right: 1rem;
    box-shadow: 0 34px 76px rgba(0,0,0,.2);
    height: 90vh;
    width: 35%;
    z-index: 10;
    display: grid;
    grid-template-rows: .1fr 1fr .1fr;
    border-radius: 10px;
    overflow: hidden;

    @media screen and (max-width:1000px){
        width:60vw;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }
    @media screen and (max-width:800px){
        width:90vw;
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%, -50%);
    }


    .header{
        background-color: #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #fff;
        padding: 0 1rem;

        .close{
            cursor: pointer;
        }
    }

    .footer{
        background-color: #333;
        color: #fff;
        display: grid;
        place-items: center;

        form{
            width: 80%;
            display: flex;
            align-items: center;
            >*:nth-child(2){
                flex: 1;
            }
            >*:nth-child(2){
                cursor: pointer;
            }

            >*{
                width: 100%;
                padding: 0.4rem 1rem;
                background-color: transparent;
                border: none;
                outline: none;
                color: #fff;
            }

            input[type="submit"]{
                background-color:#575454;
                border-radius:30px;
            }
        }
    }

    .messages{
        background-color:#f2eeee;
        position:relative;
        height:74.5vh;
        overflow:auto;
        

        >div{
            width:90%;
            position:relative;
            display:flex;
            justify-content:center;
            flex-direction:column;
            margin:.3rem;
            margin-left:auto;
            right:0;
            border-radius:10px;
            padding:0 .5rem;
            font-size:.9rem;

            >div{
                display:flex;
                align-items:center;
                gap:1rem;


                .message-content{
                    background-color:blue;
                    padding:.3rem 1rem;
                    border-radius:10px;
                    color:#fff;
                    box-shadow:0 4px 12px rgba(214, 209, 209, 0.2);
                }
            }

           

            >p:nth-child(2){
                align-self:end;
                font-size:.7rem;
                color:#726e6e;
            }

            >*{
                margin:0;
            }
        }

        >div.aiMessage{
                .message-content{
                    background-color:#fff;
                    padding:.3rem 1rem;
                    border-radius:10px;
                    color:#302f2f;
                    box-shadow:0 4px 12px rgba(214, 209, 209, 0.2);
                }
            }
        div.userMessage{
            margin-right:auto;
            left:0;
        }
    }
`;