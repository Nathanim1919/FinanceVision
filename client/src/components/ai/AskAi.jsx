import React, {useState} from 'react';
import styled from 'styled-components';
import {
    IoMdClose
} from "react-icons/io";

function AskAi({user}) {
  return (
    <Container >
        <div className='header'>
            <p>hi {user.fullname}</p>
            <div className='close'>
                < IoMdClose/>
            </div>
        </div>
        <div className='messages'>
            message
        </div>

        <div className='footer'>
            <form>
                <input type='text' placeholder='ask me..' required/>
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
    width: 30%;
    z-index: 10;
    display: grid;
    grid-template-rows: .1fr 1fr .1fr;
    border-radius: 10px;
    overflow: hidden;


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
            width: 90%;
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
        }
    }

`;