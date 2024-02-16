import React, { useState } from 'react'
import Input from '../components/Input'
import {styled} from 'styled-components'


export const Login = () => {
  const [userData, setUserData] = useState({
    email:'',
    username:'',
    password:'',
    confirmPassword:''
  })



  function onChange(e){
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  return (
    <Container className="conatiner">
        <form action="">
            <h2>Login here</h2>
            <Input name="email" type='email' placeholder='Enter your email' value={userData.email} onChange={onChange}/>
            <Input name="password" type='password' placeholder='Enter your password' value={userData.password} onChange={onChange}/>
            <Input type='submit' value='Login'/>
            <Input type='submit' value='Login with Google'/>
            <p className='navigate'>Don't you have an account? <a href="/register">Signup</a></p>
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