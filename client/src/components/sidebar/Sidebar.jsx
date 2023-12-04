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

function Sidebar({setOpenSidebar,openSidebar}) {
  return (
    <SidebarContainer  openSidebar ={openSidebar}>
       <div
            className='closeIcon'
            onClick={() => setOpenSidebar(false)}
            aria-label='Close Sidebar'
        >
             <IoMdClose />
        </div>

        <div>
            <div>
                <MdDashboard/>
                <span>Dashboard</span>
            </div>

            <div>
               <FaPlusSquare/>    
               <span>Income</span>
            </div>

            <div>
                <FaSquareMinus/>
                <span>Expense</span>
            </div>

            <div>    
              <GrTransaction/>    
              <span>Transaction</span>
            </div>

            <div>  
              <GoGoal/>     
              <span>Goal</span>
            </div>

            <div>
                <GoGraph/>
                <span>Report</span>
            </div>
            <div>
                    <IoMdNotifications/>
                    <span>Notification</span>
            </div>
        </div>
    </SidebarContainer>
  )
}
export default Sidebar;




const SidebarContainer = styled.div`
    position: absolute;
    height: 100vh;
    width: 40vw;
    z-index: 2;
    background-color: #fff;
    top: 0;
    left: 0;
    display: grid;
    align-items: center;
    transform: ${props => props.openSidebar ? 'translateX(-0%)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;



    
    >div{
        display: grid;
        justify-content: center;
        gap: 1.5rem;
        
        
        >*{
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: .5rem;
            padding:.5rem 1rem;
            cursor: pointer;
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
`