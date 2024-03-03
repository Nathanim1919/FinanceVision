import React, { useEffect } from 'react'
import { IoMdClose } from "react-icons/io";
import styled from 'styled-components';
import Success from '/notiIcon/success.png';
import Info from '/notiIcon/info.png';
import Warning from '/notiIcon/warning.png';
import axios from 'axios';
import { formatDate } from '../../utils/Formatting';
import { CiCalendarDate } from "react-icons/ci";


export const NotificationDetail = ({ notification, setNotificationId }) => {

  return (
    <ReadNotificationContainer>
      <div>
        <div onClick={()=>setNotificationId(null)} className='closeIcon'>
          <IoMdClose/>
        </div>
        <div>
            <div className='heading'>
                {notification.type === 'success' && <img src={Success} alt=""/>}
                {notification.type === 'info' && <img src={Info} alt=""/>}
                {notification.type === 'warning' && <img src={Warning} alt=""/>}
                <h4>{notification.title}</h4>
            </div>
            <div className='content'>
                <p>{notification.message}</p>
                <p className='date'><CiCalendarDate/>{formatDate(notification.createdAt)}</p>  
            </div>
        </div>
      </div>
    </ReadNotificationContainer>
  );
};


const ReadNotificationContainer = styled.div`
    position:fixed;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.505);
    z-index: 2;
    backdrop-filter: blur(0px);

    >div{
      background-color: #fff;
      padding: 0;
      border-radius: 10px;
      box-shadow: 0 8px 45px rgba(0,0,0,.05);
      position: relative;
      overflow: hidden;
      display: grid;

      .content{
        padding: 1rem;
      }
      
      .date{
        display:flex ;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
        gap: .4rem;
        font-size: .7rem;
        color: #656262;
        padding: 0.3rem 1rem;
      }

      .heading{
        display: flex;
        align-items: center;
        gap: .5rem;
        padding:0 1rem;
        background-color: #eee;
        img{
          width: 50px;
          height: 50px;
        }
      }

      .closeIcon{
        position: absolute;
        top: .2rem;
        right: .2rem;
        width: 20px;
        height: 20px;
        display: grid;
        place-items: center;
        background-color: #eee;
        padding: 0.3rem;
        border-radius: 50%;
        cursor: pointer;
      }
    }
`