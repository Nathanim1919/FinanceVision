import React from 'react'
import styled from 'styled-components';
import { IoIosNotifications } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom';

function Notification() {
    const notifications = [
        {
          "title": "Goal Achieved",
          "message": "Congratulations! You have successfully achieved your savings goal.",
          "type": "success",
          "user": "user_id_1",
          "createdAt": "2024-02-22T12:00:00Z"
        },
        {
          "title": "Net Worth Warning",
          "message": "Your net worth has decreased significantly. Review your financial strategy.",
          "type": "warning",
          "user": "user_id_2",
          "createdAt": "2024-02-23T09:30:00Z"
        },
        {
          "title": "Account Update",
          "message": "Important: There is a scheduled maintenance for your financial account tomorrow.",
          "type": "info",
          "user": "user_id_3",
          "createdAt": "2024-02-24T15:45:00Z"
        }
      ]
      
  return (
    <Container>
        <div className="header">
            <h2><IoIosNotifications/>Notifications</h2>
            <Link to={'/notifications'} className='showAllIcon'>
            <GrLinkNext/>
            </Link>
      </div>
      <NotificationContainer>
        {notifications.map(notification => (
          <NotificationBox key={notification.createdAt}>
              <div className='notification'>
                    <div>
                        <IoIosNotifications/>
                    </div>
                    <div className='data'>
                        <h4>{notification.title}</h4>
                        <p style={{backgroundColor:notification.type === "success"?"green":notification.type === "warning"?"red":"blue"}}>{notification.type}</p>
                    </div>
              </div>
              <div className='timestamp'>
                 <p>2 days ago</p>
              </div>
          </NotificationBox>
        ))}
      </NotificationContainer>
    </Container>
  )
}

export default Notification;



const Container = styled.div`
  color: #1e1d1d;
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: .5rem;

   

    .showAllIcon{
      width: 15px;
      height: 15px;
      display: grid;
      place-items: center;
      background-color: #eee;
      padding: 0.3rem;
      border-radius: 50%;
    }

    >*{
      margin: 0;
      padding: 0;
    }

    h2{
      display: flex;
      align-items: center;
      gap: .5rem;
      font-size: 1rem;
    }
  }
`

const NotificationContainer = styled.div`
  display: grid;
  gap: .5rem;
`

const NotificationBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f3e09c75;
    border-radius: 10px;
    padding:.3rem .5rem;
    .notification{
        display: flex;
        align-items: center;
        gap: .3rem;

        .data{
            display: flex;
            flex-direction: column;

            h4{
                font-size: .8rem;
                font-weight: 500;
            }

            p{
                color: #fff;
                border-radius: 10px;
                font-size: .7rem;
                display: grid;
                place-items: center;
            }


            >*{
                margin: 0;
            }
        }
        >*{
            margin: 0;
            padding: 0;
        }
    }

    .timestamp{
        font-size: 0.7rem;
    }
`