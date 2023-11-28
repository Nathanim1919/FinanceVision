import React from 'react';
import styled from 'styled-components';
import {
  FcGoogle
} from "react-icons/fc";
import cverImage from '../../assets/reg.jpg';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { loginAsync } from './userAuthSlice';
import { Link } from 'react-router-dom';
import {
  IoMdClose
} from "react-icons/io";

const RegisterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  gap: 2rem;


  @media screen and (min-width: 768px) {
        width: 60%;
  }

  >*{
    width: 100%;
  }

  .buttons{
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1rem;
    margin-top: 2rem;
  }
`;

const Title = styled.div`
  margin-bottom: 20px;
  background-position: center;
  background-size: cover;
  padding: 1rem 0;
  color: #fff;
  background-image: url(${cverImage});
  position: relative;

  a{
    position: absolute;
    right: 1rem;
    top: 1rem;
    color: #fff;
     font-size: 1.5rem;
  }

  h1{
    position: relative;
    padding:0 1rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

      @media screen and (max-width:768px){
       font-size: 1.5rem;
    }
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  flex-direction: column;
  gap: 1rem;

  >div{
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
    >*{
      flex: 1;
    }
  }

  label {
    margin-bottom: 8px;
  }

  input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding:.6rem 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
    font-weight: 500;
    font-family: inherit;

  

    &:hover {
      background-color: #0056b3;
    }
  }

  button.signupwgoogole{
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid blue;
    gap: 1rem;
    background-color: transparent;
    color:#333;
  }
`;



const AlreadyHaveAccount = styled.p`
  text-align: center;
  margin-top: 20px;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
      color: #0056b3;
    }
  }
`;

function Login({setOpenregister}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const handleInputChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleLogin = (e) =>{
    e.preventDefault();

    // dispatch loginAsync action
    dispatch(loginAsync({
      email:formData.email,
      password:formData.password
    }));
  }


  return (
    <RegisterContainer >
      <Title>
        <h1>Sign in</h1>
        <Link to={'/'}>
            < IoMdClose/>
        </Link>
      </Title>
      <Form onSubmit={handleLogin}>
        <div>
          <input value={formData.email} onChange={handleInputChange}  placeholder='Enter your Email' type="email" id="email" name="email" required />
        </div>

        <div>
          <input value={formData.password} onChange={handleInputChange} required placeholder='Enter Your Password' type="password" id="password" name="password" />
          </div>

        <button className='signup' type="submit">Sign In</button>
      <button className='signupwgoogole'>
       <FcGoogle/>
        Sign In with Google
      </button>
      </Form>

  <div className='buttons'>
      <AlreadyHaveAccount>
       Don't you have an account? <Link to={'/register'}>Sign Up</Link>
      </AlreadyHaveAccount>
  </div>
    </RegisterContainer>
  );
}

export default Login;