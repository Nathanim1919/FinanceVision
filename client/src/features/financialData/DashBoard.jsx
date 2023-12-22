import React,{useState} from 'react'
import styled from 'styled-components'
import Transaction from './Transaction';
import DataAnalytics from './DataAnalaytics';
import FinancialNotifications from './Notification';
import { useSelector } from 'react-redux';

function DashBoard() {
    const user = useSelector(state => state.userAuth.user);
   
  return (
     <ProfileContainer>
         
            {/* <ProfileSection user={user}/> */}
            <div className='infoPage'>
                <div className='financeData'>
                  <FinancialNotifications user={user}/>
                  <Transaction user={user}/>
                  <DataAnalytics user={user}/>
                </div>     
            </div>
          </ProfileContainer>
  )
}

export default DashBoard;

const ProfileContainer = styled.div `
     
     .financeData{
         padding:0 2rem;
         display: grid;
         margin: auto;
         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
         background-color: #eee;
     }
   
     @media screen and (min-width:700px){
      width:98%;

      .profileSection{
        width: 100%;
        background-color: #fff;
        padding: 0 1rem;
        margin: auto;
      }

      .infoPage{
        display: grid;
        grid-template-columns: 1fr;
      }
        .financeData{
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          margin: auto;

          >div:nth-child(3){
            grid-column: span 2;
          }
        }
     } 
`;