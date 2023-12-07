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


const UserProfile = () => {

  const dispatch = useDispatch();
  const user = useSelector(state => state.userAuth.user);
  const [openSidebar, setOpenSidebar] = useState(false);



  // get values
   const isDashboardOpen = useSelector((state) => state.sidebar.openSections.dashboard);
   const isIncomeOpen = useSelector((state) => state.sidebar.openSections.income);
   const isExpenseOpen = useSelector((state) => state.sidebar.openSections.expense);
   const isTransactionOpen = useSelector((state) => state.sidebar.openSections.transaction);
   const isGoalOpen = useSelector((state) => state.sidebar.openSections.goal);
   const isReportOpen = useSelector((state) => state.sidebar.openSections.report);
  


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  

  if (!user) return <Loading/>
  else{    
      return (
        <ProfileContainer>
          <Header2 user={user} setOpenSidebar={setOpenSidebar}/>
          <Sidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>

          <ProfileSection user={user}/>
            <div setDashboard={setDashboard} setIncome={setIncome} setExpense={setExpense} setTransaction={setTransaction} setGoal={setGoal} setReport={setReport} className='infoPage'>
                <div className='financeData'>
                  <Transaction user={user}/>
                  <FinancialNotifications user={user}/>
                  <DataAnalaytics user={user}/>
                  {/* <Incomes/>
                  <Expenses/> */}
                </div>
            </div>
          </ProfileContainer>
      );
  }
}
export default UserProfile;


const ProfileContainer = styled.div`
      background-color: #fff;
      display: grid;
      gap: 1rem;
      margin: 4rem auto;

      .financeData{
          padding: 0rem;
          display: grid;
          grid-template-columns: 1fr;
          background-color: #eee;
        

          /* >div:nth-child(3){
            grid-column: span 2;
          } */
      }
     .profileSection{
        background-color:#fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2rem;
        color:#333;

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

     @media screen and (min-width:700px){
      width:98%;

      .profileSection{
        width: 70%;
        margin: auto;
      }

      .infoPage{
        display: grid;
        grid-template-columns: 1fr;
      }
        .financeData{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            width: 70%;
          margin: auto;

          >div:nth-child(3){
            grid-column: span 2;
          }
        }
     }
`;