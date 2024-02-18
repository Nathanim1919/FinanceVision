import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoIosClose } from "react-icons/io";

const SuccessContainer = styled.div`
  text-align: center;
  width: 100vw;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  padding: 20px 0;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 33px rgba(0,0,0,.3);
  animation: animate .3s linear;


  @keyframes animate {
      0%{
        transform: translateY(-100%);
      } 100%{
        transform: translateY(0%);
      }
  }

  .closeIcon{
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    background-color: #eee;
    border-radius: 50%;
    position: absolute;
    top: .5rem;
    right: 2rem;
    font-size:1.4rem;
    cursor: pointer;
  }

  >*{
    margin: 0;
  }
`;

const Title = styled.h1`
  color: #4CAF50;
  font-size: 1rem;
`;

const Message = styled.p`
  font-size: 16px;
  line-height: 1.5;
  font-size: .9rem;
`;

const ResendLink = styled.a`
  color: #007BFF;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export const Success = ({setIsRegistered}) => {
  return (
    <SuccessContainer>
      <div className='closeIcon' onClick={()=>setIsRegistered(false)}>
        <IoIosClose/>
      </div>
      <Title>Registration Successful</Title>
      <Message>We've sent a verification email to your address.
        Please click on the link in the email to verify your account.
      </Message>
      <Message>
        If you haven't received the email, you can{' '}
        <ResendLink href="#">resend it</ResendLink>.
      </Message>
    </SuccessContainer>
  );
};
