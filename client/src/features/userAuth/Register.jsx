import React, {useState} from 'react';
import styled from 'styled-components';
import {
  FcGoogle
} from "react-icons/fc";
import cverImage from '../../assets/reg.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { registerAsync } from './userAuthSlice';
import axios from 'axios';
import {
  IoMdClose
} from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 



function Register() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname:'',
    email:'',
    password:'',
    confirmPassword: '',
  });


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }


  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // dispatch the registerAsync action
      const result = await dispatch(registerAsync(formData));
      console.log(result)
      if (registerAsync.fulfilled.match(result)){
          navigate('/login')
      }
  
      setFormData({
        fullname:'',
        email:'',
        password:'',
        confirmPassword:''
      })
      
    } catch (error) {
      console.log('registration failed', error);
    }

  }



  return (
    <RegisterContainer>
      <Title>
        <h1>Create an Account</h1>
          <Link to={'/'}>
            < IoMdClose/>
        </Link>
      </Title>
      <Form onSubmit={handleRegister}>
        <div>
          <input required value={formData.fullname} onChange={handleInputChange} placeholder='Enter Your fullname' type="text" id="name" name="fullname"  />

          <input value={formData.email} onChange={handleInputChange}  placeholder='Enter your Email' type="email" id="email" name="email" required />
        </div>

        <div>
          <input value={formData.password} onChange={handleInputChange} required placeholder='Enter Your Password' type="password" id="password" name="password" />

          <input value={formData.confirmPassword} onChange={handleInputChange} required placeholder='Confirm Your Password' type="password" id="confirmPassword" name="confirmPassword" />
          </div>

        <button className='signup' type="submit">Create account</button>
      <button className='signupwgoogole'>
       <FcGoogle/>
        Sign Up with Google
      </button>
      </Form>

  <div className='buttons'>
      <AlreadyHaveAccount>
        Already have an account? <Link to={'/login'}>Log in</Link>
      </AlreadyHaveAccount>
  </div>
    </RegisterContainer>
  );
}

export default Register;



// styled component
const RegisterContainer = styled.div `
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

const Title = styled.div `
  margin-bottom: 20px;
  background-position: center;
  background-size: cover;
  padding: 1rem 0;
  color: #fff;
  background-image: url(${cverImage});
  position: relative;

    a {
      position: absolute;
      right: 1rem;
      top: 1rem;
      color: #fff;
      font-size: 1.5rem;
    }

  h1{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 1rem;

     @media screen and (max-width:768px){
       font-size: 1.5rem;
    }
  }
`;

const Form = styled.form `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  flex-direction: column;
  gap: 1rem;

  >div{
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;


    @media screen and (max-width:768px){
       gap:0rem;
    }
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



const AlreadyHaveAccount = styled.p `
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
