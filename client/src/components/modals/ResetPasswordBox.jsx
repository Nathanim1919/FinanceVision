import React, { useState } from 'react'
import styled from 'styled-components';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000ce;
    z-index: 12;
    display: grid;
    place-items: center;
    box-shadow: 0 23px 65px rgba(0,0,0,.2);

    form{
        padding: 2rem;

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
            padding: 0.6rem 1rem;
            border: 1px solid #eee;
            outline: none;
        }

        input[type="submit"]{
            background-color: #518151;
            color: #fff;
            cursor: pointer;
        }
    }
`

function ResetPasswordBox() {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const resetPassword = async (e) => {
        e.preventDefault();
        try{
            if (newPassword === confirmPassword){
                const response = await axios.post(`${process.env.BASE_URL}/api/v1/auth/resetPassword`,{
                    newPassword
                })
            } else {
                alert("Password not match!");
            }
        } catch(err){
            console.log(err)
        }
    }

  return (
    <Container>
        <form onSubmit={resetPassword}>
            <div className='closeIcon'>
                <IoMdClose/>
            </div>
            <input onChange={(e)=>setNewPassword(e.target.value)} type="password" placeholder='Enter password'/>
            <input onChange={(e)=> setConfirmPassword(e.target.value)} type="password" placeholder='Confirm password'/>
            <input type="submit" />
        </form>
    </Container>
  )
}

export default ResetPasswordBox;