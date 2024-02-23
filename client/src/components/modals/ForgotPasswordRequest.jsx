import React, { useState } from 'react'
import styled from 'styled-components'
import { IoMdClose } from "react-icons/io";


const Conatiner = styled.div`
    box-shadow: 0 23px 65px rgba(0,0,0,.2);
    background-color: #000000a1;
    display: grid;
    place-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;


    form{
        display: grid;
        padding: 2rem;
        gap: 1rem;

        .closeIcon{
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            background-color: #eee;
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
        }
    
        input{
            padding: 0.5rem 1rem;
            border: 1px solid #eee;
            outline: none;
        }

        input[type="submit"]{
            background-color: #1b76ff;
            color: #fff;
            cursor: pointer;

            &:hover{
                background-color: #3333b2;
            }
        }
    }
`

function ForgotPasswordRequest({setRequestForgotPassword}) {
    const [email, setEmail] = useState('');
    
    async function forgotPasswordRequest(e){
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/v1/auth/forgotPasswordRequest',{email})
          console.log(response);
        } catch (error) {
           console.log(error)
        }
        setRequestForgotPassword(false)
    }

      return (
        <Conatiner>
            <form onSubmit={forgotPasswordRequest}>
                <div className='closeIcon' onClick={()=>setRequestForgotPassword(false)}>
                    <IoMdClose/>
                </div>
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email' name='email'/>
                <input type="submit" />
            </form>
        </Conatiner>
      )
  }


export default ForgotPasswordRequest