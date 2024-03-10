import React, { useState } from 'react'
import Input from '../components/Input'
import {styled} from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoArrowBack } from "react-icons/io5";
import { Loader } from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import ForgotPasswordRequest from '../components/modals/ForgotPasswordRequest'
import ResetPasswordBox from '../components/modals/ResetPasswordBox';
import { BASE_URL, VERCEL_DOMAIN } from '../utils/Api'

export const Login = () => {
  const [userData, setUserData] = useState({
    email:'',
    password:'',
  })
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [requestForgotPassword, setRequestForgotPassword]= useState(false);


  function onChange(e){
    setUserData({...userData, [e.target.name]: e.target.value})
  }


  const authenticateUser = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { userData });
      console.log(response)
      const { accessToken } = response.data.data;
      console.log(accessToken)

      if (accessToken && response.data.data !== null) {
        // Set the access token cookie using document.cookie
        document.cookie = `accessToken=${accessToken}; domain=.finance-vision.vercel.app; path=/; secure; httpOnly; sameSite=None`;
        navigate('/dashboard', { replace: true });

      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
}


  return (
    <Container className="conatiner">
      {isLoading && <Loader/>}
     {requestForgotPassword && <ForgotPasswordRequest setRequestForgotPassword={setRequestForgotPassword}/>}
     {/* {requestForgotPassword && <ResetPasswordBox/>} */}
      <Link to={'/'} className='backIcon'>
        <IoArrowBack/>
      </Link>
        <form onSubmit={authenticateUser}>
            <h2>Login here</h2>
            <Input name="email" type='text' placeholder='Enter your email' value={userData.email} onChange={onChange}/>
            <Input name="password" type='password' placeholder='Enter your password' value={userData.password} onChange={onChange}/>
            <p className='navigate'>Don't you have an account? <Link to="/register">Signup</Link></p>
            <Input type='submit' value='Login'/>
            <Input type='submit' value='Login with Google'/>
            <Link className='navigate' onClick={()=>setRequestForgotPassword(true)}>Forgot your password?</Link>
        </form>
    </Container>
  )
}

const Container = styled.div`
  position:absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  .backIcon{
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 30px;
    height: 30px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    font-size: 1.4rem;
    background-color: #0356b63f;
    z-index: 5;
    cursor: pointer;
  }


  &::after{
    content: '';
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    background-color: #498fdf;
    height: 50vh;
    border-bottom-left-radius:70px;
    border-bottom-right-radius:70px;
  }


  form{
    background-color: #fff;
    position: relative;
    width: 40vw;
    z-index: 3;
    padding:1rem 2rem;
    box-shadow: 0 7px 23px rgba(0, 0, 0, 0.094);
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-radius: 10px;

    >*{
      margin: 0;
    }

    .navigate{
      font-size: .8rem;
      align-self: flex-end;
    }

    @media screen and (max-width: 900px){
       width: 70vw;
    }

    @media screen and (max-width: 600px){
       width: 70vw;
    }

    >h2{
      align-self: center;
    }
  }
`