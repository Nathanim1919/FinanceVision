import React from 'react';
import styled from 'styled-components';
import {
    MdDashboard
} from "react-icons/md";
import {
    FaSquareMinus
} from "react-icons/fa6";
import {
    FaPlusSquare
} from "react-icons/fa";
import {
    GrTransaction
} from "react-icons/gr";
import {
    IoMdNotifications
} from "react-icons/io";
import {
    GoGoal
} from "react-icons/go";
import {
    GoGraph
} from "react-icons/go";
import {
    IoMdClose
} from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { TbBrandBinance } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";

function Sidebar({
    setOpenSidebar,
    openSidebar
}) {


    const logout = () => {
        const tokenKey = "token"; // replace with your actual token key
        const token = localStorage.getItem(tokenKey);
      
        if (token) {
          localStorage.removeItem(tokenKey);
          console.log("Token removed successfully");
        } else {
          console.log("No token found in localStorage");
        }
      };
      
  return (
    <SidebarContainer openSidebar ={openSidebar}>
       <div
            className='closeIcon'
            onClick={() => setOpenSidebar(false)}
            aria-label='Close Sidebar'
        >
             <IoMdClose />
        </div>

        <NavLink to={'/profile'} className="logo">
            <TbBrandBinance/>
        </NavLink >
<div className='sidebarLinks'>
        <NavLink onClick={()=>setOpenSidebar(false)} to = '/profile/dashboard'
        className = {
            nav => (nav.isActive ? "active" : "not-active")
        } >
          <MdDashboard />
          <span>Dashboard</span>
        </NavLink>

        <NavLink onClick={()=>setOpenSidebar(false)} to='/profile/incomes' className={nav => (nav.isActive ? "active" : "not-active")}>
          <FaPlusSquare />
          <span>Income</span>
        </NavLink>

        <NavLink onClick={()=>setOpenSidebar(false)} to='/profile/expenses' className={nav => (nav.isActive ? "active" : "not-active")}>
          <FaSquareMinus />
          <span>Expense</span>
        </NavLink>

        <NavLink onClick={()=>setOpenSidebar(false)} to='/profile/transactions' className={nav => (nav.isActive ? "active" : "not-active")}>
          <GrTransaction />
          <span>Transaction</span>
        </NavLink>

        <NavLink onClick={()=>setOpenSidebar(false)} to='/profile/goals' className={nav => (nav.isActive ? "active" : "not-active")}>
          <GoGoal />
          <span>Goal</span>
        </NavLink>

        <NavLink onClick={()=>setOpenSidebar(false)} to='/profile/analaytics' className={nav => (nav.isActive ? "active" : "not-active")}>
          <GoGraph />
          <span>Report</span>
        </NavLink>

        <NavLink onClick={()=>setOpenSidebar(false)} to='/profile/notifications' className={nav => (nav.isActive ? "active" : "not-active")}>
          <IoMdNotifications />
          <span>Notification</span>
        </NavLink>
        <NavLink onClick={()=>logout()} to='/' className={nav => (nav.isActive ? "active" : "not-active")}>
          <IoIosLogOut />
          <span>Log out</span>
        </NavLink>
      </div>
    </SidebarContainer>
  )
}
export default Sidebar;


const SidebarContainer = styled.div`
    position: fixed;
    height: 100vh;
    width: 160px;
    z-index: 2;
    background-color: #fff;
    top: 0;
    left: 0;
    display: grid;
    align-items: center;
    transform: ${props => props.openSidebar ? 'translateX(-0%)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    padding: 0 1rem;

    .logo{
        position:absolute;
        left:1rem;
        transform:scale(2);
        cursor:pointer;
    }
    .sidebarLinks {
        position:relative;
       


        a.not-active {
            background-color: transparent;
        }

        >a.active {
            background-color: #eee;
        }
    }


    >div{
        display: grid;
        justify-content: flex-start;
        gap: 1rem;
        
        
        >*{
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: .5rem;
            padding:.5rem 1rem;
            cursor: pointer;
            color: #333;
            text-decoration: none;
            border-radius: 10px;

            &:hover{
                background-color: #eee;

                >*:nth-child(1){
                    transform: scale(1.1);
                }
            }
        }
    }
    >div.closeIcon{
        font-size: 1.3rem;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background-color: #eee;
        position: absolute;
        top: 2rem;
        right: 2rem;
        z-index: 5;
    }

    @media screen and (min-width:900px){
        position: fixed;
        height: 10%;
        width: 100%;
        background-color: #fff;
        top: 0%;
        left: 0%;
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        align-items: center;
        transform: translateY(0);
        transition: transform 0.3s ease-in-out;
        margin: .1rem auto;
        border-bottom: 2px solid #eee;

        >div{
             justify-content: center;
        }

        div.closeIcon{
            display: none;
        }

        .sidebarLinks{
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;


            @media screen and (min-width:1200px){
                width: 80vw;
            }

           
          

            >a{
                font-size: 1rem;
                position: relative;
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: center;
                flex: 1;
                transition: transform .4s ease-in-out;
                 
                >*{
                    margin: 0rem;
                    
                }

                
                
                &:hover{
                    transform: scale(.94);
                }
            }
             a::after{
                 content: '';
                 width: 0%;
                 height: 2px;
                 background-color: #333;
                 position: absolute;
                 bottom: -.7rem;
                 left: 0;
                  transition: width .4s ease-in-out;
             }
            a.active::after{
                width: 100%;
            }
        }
    }
`