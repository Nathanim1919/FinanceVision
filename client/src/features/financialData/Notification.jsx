import React from 'react';
import styled from 'styled-components';
import { IoMdAlert } from 'react-icons/io';
import {
    FaArrowRightLong
} from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

const NotificationsContainer = styled.div`
        background-color: #fff;
        margin: 1rem;
        padding:1rem;
        box-shadow:0 6px 27px rgba(0,0,0,.05);
        border-radius: 10px;


          .headerSection{
    display:flex;
    align-items:center;
    justify-content:space-between;
    
    .nextIcon{
        width:28px;
        height:28px;
        background-color: #eee;
        border-radius: 50%;
        display: grid;
        place-items: center;
        cursor: pointer;
    }
  }
  /* Add styling for the notifications container */
`;

const NotificationsList = styled.div`
  /* Add styling for the list of notifications */
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #d4edda; /* Example background color for success alerts */

  /* Customize styling for individual notification items */
`;

const AlertIcon = styled.div`
  font-size: 24px;
  margin-right: 10px;
`;

function FinancialNotifications() {
  const financialAlerts = [
    { id: 1, type: 'billing', message: 'Billing alert: Your credit card payment is due soon.' },
    { id: 2, type: 'goal', message: 'Goal achieved: You reached your savings goal!' },
    { id: 3, type: 'achievement', message: 'Achievement unlocked: You saved 20% of your income.' },
  ];

  return (
    <NotificationsContainer>
      <div className = 'headerSection' >
        <h3>Financial Notifications</h3>
         <NavLink to = {
           '/profile/notifications'
         }
         className = "nextIcon" >
          <FaArrowRightLong/>
        </NavLink>
      </div>
      <NotificationsList>
        {financialAlerts.map(alert => (
          <NotificationItem key={alert.id} className={alert.type}>
            <AlertIcon>
              <IoMdAlert />
            </AlertIcon>
            <div>{alert.message}</div>
          </NotificationItem>
        ))}
      </NotificationsList>
    </NotificationsContainer>
  );
}

export default FinancialNotifications;
