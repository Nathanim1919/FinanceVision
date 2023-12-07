import React from 'react'
import {
    BsPersonCircle
} from "react-icons/bs";
import {
    IoMenu
} from "react-icons/io5";
import styled from 'styled-components';

function Header2({user, setOpenSidebar}) {
  return (
     <Header>
          <div className='menuIcon' onClick={()=>setOpenSidebar(true)}>
            <IoMenu/>
          </div>
          <div className='content'>
            <BsPersonCircle/>
            <p>{user.fullname}</p>
          </div>
     </Header>
  )
}

export default Header2;


const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    font-size: 1.1rem;
    background-color: #fff;
    border-bottom: 1px solid #eee;


     .menuIcon{
        cursor: pointer;
     }

     >div:nth-child(1){
        font-size: 2rem;
     }

    >div:nth-child(2){
        display: flex;
        align-items: center;
        gap: 0.4rem;
        justify-content: center;
        
        >p{
            background-color: #eee;
            padding:0 .5rem;
            border-radius: 5px;
            font-size: 1rem;
        }
    }
`