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

  return (
    <Container className="conatiner">
        <form action="">
            <Input type='email' placeholder='Enter your email' value={userData.email} onChange={(e)=>setUserData({email:e.target.value})} error='it is error'/>
            <Input type='text' placeholder='Enter your username' value={userData.username} onChange={(e)=>setUserData({username:e.target.value})} error='it is error'/>
            <Input type='password' placeholder='Enter your password' value={userData.password} onChange={(e)=>setUserData({password:e.target.value})} error='it is error, really it is error'/>
            <Input type='password' placeholder='confirm password' value={userData.confirmPassword} onChange={(e)=>setUserData({confirmPassword:e.target.value})} error='it is error'/>
            <Input type='submit' value='Register'/>
            <div className="validation">
                <p>Password strength is ---------- Strong</p>
                <div className='reuirements'>
                    <p>Must contain at least</p>
                    <ul>
                        <li>8 characters</li>
                        <li>1 lowercase character</li>
                        <li>1 special character</li>
                    </ul>
                </div>
            </div>
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
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    background-color: #498fdf;
    height: 80vh;
    border-bottom-left-radius:200%;
    border-bottom-right-radius:200%;
  }


  form{
    background-color: #fff;
    position: relative;
    z-index: 3;
    padding: 2rem;
    box-shadow: 0 7px 23px rgba(0, 0, 0, 0.539);
    display: flex;
    flex-direction: column;
    gap: .5rem;
  }
`