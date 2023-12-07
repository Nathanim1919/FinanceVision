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
import Sidebar from '../../components/sidebar/Sidebar';
import DataAnalaytics from '../financialData/DataAnalaytics';


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
        <ProfileContainer >
          <Header2 user={user} setOpenSidebar={setOpenSidebar}/>
          <div className='profileSection'>
            <div>
              <div className='content'>
                <h4>Hello {user.fullname}, Welcome!</h4>
                <span>Save, Plan, Invest</span>
              </div>
            </div>
    
            <div>
              <h2>{user.savings} Birr</h2>
            </div>
          </div>
          <Sidebar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar}/>
          <div className='financeData'>
            <Transaction/>
            <FinancialNotifications/>
            <DataAnalaytics selectedYear={2023}/>
            {/* <Incomes/>
            <Expenses/> */}

          </div>
        </ProfileContainer>
      );
  }
}
export default UserProfile;



const ProfileContainer = styled.div`
      margin: 4rem auto;
      .financeData{
         display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      }
     .profileSection{
        background-color:rgb(60,179,113);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 1rem;
        color:#fff;

        >div{
          display: flex;
          justify-content: center;
          align-items: center;
          gap:.5rem;

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
        .financeData{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }
     }
`;