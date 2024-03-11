// Desc: Register component for user registration.
import React, { useState } from 'react'
import Input from '../components/Input'
import {styled} from 'styled-components'
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import {passswordValidation, emailValidation, usernameValidation} from '../utils/Validation' 
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Success } from '../components/modals/success'
import { IoArrowBack } from "react-icons/io5";
import { Loader } from '../components/Loader';
import { BASE_URL } from '../utils/Api';


/**
 * Register component for user registration.
 * @component
 * @returns {JSX.Element} Register component JSX
 */
export const Register = () => {
  // state to handle user data
  const [userData, setUserData] = useState({
    email:'',
    username:'',
    password:'',
    confirmPassword:''
  })
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // state to handle password validation
  const [passwordData, setPasswordData] = useState({
    hasLength: false,
    hasLowerCase: false,
    hasUpperCase: false,
    hasSpecialCharacter: false,
    hasDigit: false
  })

  // state to handle username validation
  const [username, setUserName] = useState({
    error: null
  })

// state to handle email validation
  const [email, setEmail] = useState({
    error:null
  })
  
  // function to handle input change
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


  // function to register user
  const registerUser = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    
    // check if the password and confirm password are the same
      if(userData.password !== userData.confirmPassword){
        return alert('Password does not match');
      }
      
      try{
      // send a post request to the server to register the user
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, userData)
      console.log(response);
      if (response.statusText === 'Created'){
          setError('')
          setIsRegistered(true);
          navigate('/login');
      } else {
        if (response.status >= 400 && response.status < 500){
              setError(response.data.message);
        } else {
            setError("Internal server error, Please try again!");
        }
      }
    }catch(err){
      console.log(err);
      setError(err);
    }
    setIsLoading(false);
 }

  return (
    <Container className="conatiner">
      {isLoading && <Loader/>}
      <Link to={'/'} className='backIcon'>
        <IoArrowBack/>
      </Link>
        <form onSubmit={registerUser}>
         {error && <p className='errorMessage'><IoIosCloseCircle/>{error}</p>}
            <h2>Register For Free</h2>
            <div className='inputContainers'>
              <Input name="email" type='email' placeholder='Enter your email' value={userData.email} onChange={onChange} error={email.error}/>
              <Input name="username" type='text' placeholder='Enter your username' value={userData.username} onChange={onChange} error={username.error}/>
            </div>
            <div className='inputContainers'>
              <Input name="password" type='password' placeholder='Enter your password' value={userData.password} onChange={onChange} error={null}/>
              <Input name="confirmPassword" type='password' placeholder='confirm password' value={userData.confirmPassword} onChange={onChange} error = {null}/>
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
        {isRegistered && <Success setIsRegistered={setIsRegistered}/>}
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

    .errorMessage{
      background-color: #f1cccc;
      padding: 0.3rem;
      color: #780909;
      font-size: .8rem;
      transition: all .3s ease-in-out;
      display: flex;
      align-items: center;
      gap: .5rem;
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