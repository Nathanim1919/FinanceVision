import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components';
import { IoIosNotifications } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { IoIosWarning,IoMdNotifications } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { FaCheckCircle,FaInfoCircle } from "react-icons/fa";
import { BASE_URL, SOCKET_URL } from '../../utils/Api';


const Notification = () => {
    const socket = io(SOCKET_URL);
    const user = useSelector((state) => state.auth.user);
    const [notifications, setNotifications] = useState([]);


    function calculateTimeDifference(notificationCreatedAt) {
      const now = Date.now();
      const notificationDate = new Date(notificationCreatedAt);
      const timeDifference = Math.floor((now - notificationDate.getTime()) / 1000); // Convert to seconds
    
      const units = [
        { name: "day", value: 24 * 60 * 60 },
        { name: "hour", value: 60 * 60 },
        { name: "minute", value: 60 },
        { name: "second", value: 1 },
      ];
    
      for (const unit of units) {
        const elapsed = Math.floor(timeDifference / unit.value);
        if (elapsed >= 1) {
          return `${elapsed} ${unit.name}${elapsed > 1 ? 's' : ''} ago`;
        }
      }
    
      return "just now";
    }
  
  
    const fetchNotifications = useCallback(async (userId, setNotifications) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/notifications?userId=${userId}`);
        setNotifications(response.data.reverse());
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    }, []);
  
    useEffect(() => {
      const fetchAndSetNotifications = async () => {
        await fetchNotifications(user._id, setNotifications);
      };
  
      fetchAndSetNotifications();
  
      socket.on('notification-created', (data) => {
        setNotifications((prevNotifications) => [data, ...prevNotifications]);
      });
  
      return () => socket.off('notification-created');
    }, [user._id]);
  
    return (
      <Container>
        <Header>
          <h2>
            <IoIosNotifications />
            Notifications
          </h2>
          <Link to="/notifications" className="showAllIcon">
            <GrLinkNext />
          </Link>
        </Header>
        <NotificationContainer>
          {notifications.slice(0, 3).map((notification) => (
            <NotificationBox key={notification.createdAt}>
            <div className='notification'>
                    <div>
                        <IoIosNotifications/>
                    </div>
                    <div className='data'>
                        <h4>{(notification.title).slice(0,20)}...</h4>
                        {notification.type === 'success' && <p style={{backgroundColor:"green"}}>
                          <FaCheckCircle/>{notification.type}
                        </p>}
                        {notification.type === 'info' && <p style={{backgroundColor:"blue"}}>
                          <FaInfoCircle/>{notification.type}
                        </p>}
                        {notification.type === 'warning' && <p style={{backgroundColor:"red"}}>
                          <IoIosWarning/>{notification.type}
                        </p>}
                    </div>
              </div>
              
              <div className='timestamp'>
                {notification.isRead === false && <p className='new'><IoMdNotifications/>New</p>}
                 <p className='date'><MdCalendarToday/>{calculateTimeDifference(notification.createdAt)}</p>
              </div>
            </NotificationBox>
          ))}
        </NotificationContainer>
      </Container>
    );
  };
  
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
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2{
      display: flex;
      align-items: center;
      gap: .4rem;
      font-size: .8rem;

    .icon{
        background-color: #cecbcb;
        width: 20px;
        height: 20px;
        padding: .4rem;
        border-radius: 50%;
        color: blue;
        cursor: pointer;
        display: grid;
        place-items: center;
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
            align-items: flex-start;

            h4{
                font-size: .8rem;
                font-weight: 500;
            }

            p{
                color: #fff;
                display: flex;
                align-items: center;
                gap: .3rem;
                border-radius: 10px;
                font-size: .7rem;
                padding: 0.1rem .3rem;
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
        display: flex;
        align-items: flex-end;
        gap: .4rem;
        flex-direction: column;

        P{
            margin: 0;
            padding: 0;
        }

        p{
          display: flex;
          align-items: center;
          gap: .4rem;
        }

        .new{
          color: #fff;
          background-color: red;
          padding: 0.1rem .3rem;
          display: flex;
          align-items: center;
          gap: .2rem;
          border-radius: 30px;
        }
    }
`