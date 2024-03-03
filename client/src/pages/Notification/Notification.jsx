import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { IoIosNotifications } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import io from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaCheckCircle,FaInfoCircle } from "react-icons/fa";
import { IoIosWarning,IoMdNotifications } from "react-icons/io";
import { NotificationDetail } from './NotificationDetail';



function Notification() {
  const [notifications, setNotifications] = useState([]);
  const [notificationId, setNotificationId] = useState(null);
  const user = useSelector(state => state.auth.user);
  const socket = io('http://localhost:5000');

  socket.on('connect', () => {
    console.log('Connected to server');
  });

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

  const setRead = async (id) => {
    const readNotification = await axios.patch(`http://localhost:3000/api/v1/notifications/${id}`);
    console.log(readNotification);
    setNotificationId(id)
  }
  

  useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const fetchedNotifications = await axios.get(`http://localhost:3000/api/v1/notifications?userId=${user._id}`)
          setNotifications(fetchedNotifications.data);
          console.log((fetchedNotifications.data));
        } catch (error) {
          console.error("Error fetching notifications:", error);
          // Handle errors appropriately
        }
      };

      fetchNotifications();

      socket.on('notification-created', (data) => {
        setNotifications((item) => [...item, data]);
      });

      return () => socket.off('notification-created');
  }, []);

  return (
    <Container>
      <Content>
      <Header>
          <h2>Nathan's Notifications</h2>
      </Header>
      <NotificationContainer>
        {(notifications?.slice(0,).reverse()).map(notification => (
          <>
         
          {notification._id === notificationId && notificationId !== null && <NotificationDetail notification={notification} setNotificationId={setNotificationId} notificationId={notificationId}/>}
          <NotificationBox key={notification.createdAt} onClick={()=>setRead(notification._id)}>
              <div className='notification'>
                    <div>
                        <IoIosNotifications/>
                    </div>
                    <div className='data'>
                        <h4>{notification.title}</h4>
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
          </>
        ))}
      </NotificationContainer>
        
      </Content>
    </Container>
  )
}

export default Notification;




const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

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
`


const Container = styled.div`
  color: #1e1d1d;
  margin: 0 auto;
  height: 88vh;
  overflow-y: auto;
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

const Content = styled.div`
  width: 60%;
  margin: auto;
`

const NotificationBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eee;
    border-bottom: 1px solid #eee;
    border-radius: 10px;
    padding:.3rem .5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    animation: fadeIn 0.5s ease-in-out;
    
    @keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);

    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
  }

    &:hover{
      background-color: #f3e09c4e;
    }


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