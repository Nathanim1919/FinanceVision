// UserProfile.jsx
import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { checkAuth } from './userAuthSlice';
import styled from 'styled-components';
import Header2 from '../../components/header/Header2';
import Loading from '../../components/loader/Loding';
import Transaction from '../financialData/Transaction';
import Incomes from '../financialData/Incomes';
import Expenses from '../financialData/Expenses';
import FinancialNotifications from '../financialData/Notification';
import Sidebar from '../sidebar/Sidebar';
import DataAnalaytics from '../financialData/DataAnalaytics';
import ProfileSection from '../../components/profileSection';
import Goals from '../financialData/Goals';
import DataAnalytics from '../financialData/DataAnalaytics';
import DashBoard from '../financialData/DashBoard';
import { Outlet } from 'react-router-dom';


const UserProfile = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth.user);
   const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  

  if (!user) return <Loading/>
  else{    
      return (
        
        <Conatiner>
          <Header2 user={user} setOpenSidebar={setOpenSidebar}/>
          <Sidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
           <ProfileSection user={user}/>
          <Outlet/>
        </Conatiner>
      );
  }
}
export default UserProfile;


const Conatiner = styled.div`
    width: 95vw;
    background-color: #fff;
    margin: auto;


      .profileSection{
        background-color:#fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#333;
        padding: 0 2rem;
        margin-top: 10%;
  

        >div{
          display: flex;
          justify-content: center;
          align-items: center;
          gap:0rem;

          .content{
            display: flex;
            flex-direction: column;

            >*{
              margin: 0;
            }
          }

          .menuIcon{
            font-size: 2rem;
          }
        }
     }



    @media screen and (min-width:768px){
        width: 80vw;
        /* > *{
          width: 80%;
        } */
    }
`