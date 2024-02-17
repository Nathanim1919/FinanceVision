import React, { useState } from 'react'
import Input from '../components/Input'
import {styled} from 'styled-components'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import {passswordValidation, emailValidation, usernameValidation} from '../utils/Validation' 
import { Link } from 'react-router-dom'

export const Register = () => {
  const [userData, setUserData] = useState({
    email:'',
    username:'',
    password:'',
    confirmPassword:''
  })

  const [passwordData, setPasswordData] = useState({
    hasLength: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialCharacter: false,
    hasDigit: false
  })

  const [username, setUserName] = useState({
    error: null
  })


  const [email, setEmail] = useState({
    error:null
  })
  
  function onChange(e){
    setUserData({...userData, [e.target.name]: e.target.value})
    if (e.target.name === 'username'){
      setUserName({
        error:usernameValidation(userData.username)
      })
    }

    if (e.target.name === 'email'){
      setEmail({
        error:emailValidation(userData.email)
      })
    }

    if(e.target.name === 'password'){
      const {hasDigit,isValidate, hasLength, hasLowerCase, hasUpperCase, hasSpecialCharacter} = passswordValidation(e.target.value);
      setPasswordData({
        hasDigit,
        hasLength,
        hasLowerCase,
        hasUpperCase,
        hasSpecialCharacter
      })
    }
  }

  return (
    <Container className="conatiner">
        <form>
            <h2>Register For Free</h2>
            <div className='inputContainers'>
              <Input name="email" type='email' placeholder='Enter your email' value={userData.email} onChange={onChange} error={email.error}/>
              <Input name="username" type='text' placeholder='Enter your username' value={userData.username} onChange={onChange} error={username.error}/>
            </div>
            <div className='inputContainers'>
              <Input name="password" type='password' placeholder='Enter your password' value={userData.password} onChange={onChange} error={null}/>
              <Input name="confirmpassword" type='password' placeholder='confirm password' value={userData.confirmPassword} onChange={onChange} error = {null}/>
            </div>
            <Input type='submit' value='Register'/>
            <Input type='submit' value='Singup with Google'/>
            <p className='navigate'>Already have an account? <Link to="/Login">Login</Link></p>
            <div className="validation">
                <div className='requirement'>
                    <p>Password Must contain</p>
                    <ul>
                        <li className={passwordData.hasLength?"passed":""}>
                          {passwordData.hasLength?<FaCheckCircle/>:<IoIosCloseCircle/>}at least 8 characters
                        </li>
                        <li className={passwordData.hasDigit?"passed":""}>
                          {passwordData.hasDigit?<FaCheckCircle/>:<IoIosCloseCircle/>}at least 1 Digit
                        </li>
                        <li className={passwordData.hasLowerCase?"passed":''}>
                          {passwordData.hasLowerCase?<FaCheckCircle/>:<IoIosCloseCircle/>}at least 1 Lowercase character
                        </li>
                        <li className={passwordData.hasUpperCase?"passed":""}>
                          {passwordData.hasUpperCase?<FaCheckCircle/>:<IoIosCloseCircle/>}at least 1 Uppercase character
                          </li>
                        <li className={passwordData.hasSpecialCharacter?"passed":""}>
                          {passwordData.hasSpecialCharacter?<FaCheckCircle/>:<IoIosCloseCircle/>}at least 1 Special character
                        </li>
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

  .validation{

    .requirement{
      display: flex;
      flex-direction: column;
      font-size: .8rem;
      gap:.5rem;

      >*{
        margin: 0;
      }

      ul{
        display: flex;
        flex-direction: column;
        gap: 0rem;
        margin-top: .5rem;

        >*{
          margin: 0;
        }
        
         li{
          display: flex;
          align-items: center;
          gap: .5rem;
          font-size: .8rem;
          margin: 0;
          color: #b74e4e;
         }

         li.passed{
          color: #607253;
         }
      }
    }
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
      width: 100%;
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

    .inputContainers{
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      gap: .5rem;
      margin-bottom: .6rem;
      flex-wrap: wrap;
      
    @media screen and (max-width: 600px){
       flex-direction: column;
       width: 100%;

       >*{
        width: 100%;
       }
    }
      >*{
        flex: 1;
      }
    }
    >h2{
      align-self: center;
    }
  }
`