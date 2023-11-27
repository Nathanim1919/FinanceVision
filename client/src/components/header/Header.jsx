import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AiOutlineMenu
} from "react-icons/ai";
import {
  IoMdClose
} from "react-icons/io";
import Member from '../../pages/Member';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0rem;
  left: 0;
  right: 0;
  transform: translateY(${(props) => (props.scrollingUp ? '0' : '-100%')});
  background-color: #fff;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
  z-index: 10;

  .closeIcon {
    display: none;
  }

  .logoIcon{
    display: none;
  }

  @media screen and (max-width:700px){
    justify-content:space-between;
    padding:1rem;
    max-width: 100vw;
    transform: translateY(0);
    .logo{
      display: flex;
      align-items: center;
      gap:1rem;

      .logoIcon{
        display: grid;
        font-size: 2rem;
        cursor: pointer;
      }

    }
    .menuItem{
      position: absolute;
      display: grid;
      place-items: center;
      padding:0rem;
      left: 0;
      right: 0;
      height:70vh;
      width:100vw;
      top: 0rem;
      background-color: #fff;
      z-index: 10;
      transform: translateY(${(props) => (props.openMenu?'0':'-100%')});
      transition: all .5s ease-in-out;

      
      ul{
        background-color: #fff;
        display: grid;
        place-items: center;
        gap: 3rem;
        padding:0 3rem;

        .closeIcon{
          position: absolute;
          top: 2rem;
          left: 70%;
          font-size: 2rem;
          cursor: pointer;
          display: grid;
        }
        
        
        >*{
          padding:0 2rem;
          width: 100%;

        }
       }
    }
  }

  h2 {
    font-size: 2rem;
    margin: 0;
    color: orange;
  }

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

    li {
      margin-right: 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #007bff;
      }
    }
  }

  div {
    display: flex;
    align-items: center;

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 5px 7px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin-right: 10px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }

    button.memberBtn{
      background-color: transparent;
      color: #333;
    }
  }
`;

function Header() {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [openMenu, setOpenmenu] = useState(false);
  const [oepnForm, setOpenForm] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openregister, setOpenregister] = useState(false);


  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const st = window.scrollY;

      setScrollingUp(st < lastScrollTop);
      lastScrollTop = st;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer openMenu = {
      openMenu
    }
    scrollingUp = {
      scrollingUp
    } >
      {
        oepnForm && < Member setOpenregister={setOpenregister} openregister={openregister} setOpenForm = {
          setOpenForm
        }
        />
      }
      <div className='logo'>
        <div className='logoIcon' onClick={()=>setOpenmenu(true)}>
          <AiOutlineMenu/>
        </div>
        <h2>fin.</h2>
      </div>
      <div className='menuItem'>
        <ul>
          <div className='closeIcon' onClick={()=>setOpenmenu(false)}>
              <IoMdClose/>
          </div>
          <li>Home</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
      </div>
        <div>
          <button onClick={()=>{setOpenForm(true); setOpenLogin(true); setOpenregister(false)}} className='memberBtn'>Login</button>
          <button onClick={()=>{setOpenForm(true); setOpenLogin(false); setOpenregister(true)}}>Register</button>
        </div>
    </HeaderContainer>
  );
}
export default Header;