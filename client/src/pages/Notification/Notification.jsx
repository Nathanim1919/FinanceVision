import {useState, useEffect, useContext} from 'react'
import styled from 'styled-components';
import {IoIosNotifications} from "react-icons/io";
import {MdCalendarToday} from "react-icons/md";
import {useSelector, useDispatch} from 'react-redux';
import {FaCheckCircle, FaInfoCircle} from "react-icons/fa";
import {IoIosWarning, IoMdNotifications} from "react-icons/io";
import {NotificationDetail} from './NotificationDetail';
import {BASE_URL} from '../../utils/Api';
import {Loader} from '../../components/Loader';
import {calculateTimeDifference} from '../../utils/Formatting';
import {fetchNotifications, setRead} from '../../features/notification/notificationSlice';
import {SocketContext} from '../../utils/socketConnection';
import {setNotification} from '../../features/notification/notificationSlice';

function Notification() {
    const [notificationId, setNotificationId] = useState(null);
    const notifications = useSelector((state) => state.notification.notifications);
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.notification.loading);
    const dispatch = useDispatch();

    const socket = useContext(SocketContext);


    const setReadNoti = async (id) => {
        // dispatch(fetchNotifications(user._id))
        setNotificationId(id)
        // if (notifications.find(notification => notification._id === id).isRead === false) {
        // }
        dispatch(setRead(id));
        // const readNotification = await axios.patch(`${BASE_URL}/api/v1/notifications/${id}`);
    }

    useEffect(() => {
        if (notifications?.length === 0 ){
            dispatch(fetchNotifications(user._id));
        }
    }, [dispatch, notifications?.length, user._id]);


    useEffect(() => {
        socket.on('notification-created', (data) => {
            dispatch(setNotification(data));
        });
        return () => socket.off('notification-created');
    }, [dispatch, socket]);


    return (
        loading ? <Loader/> :
            <Container>
                <Content>
                    <Header>
                        <h2>{user.username}'s Notifications</h2>
                    </Header>
                    <NotificationContainer>
                        {notifications?.length === 0 ?
                            <div className='emptyNotification'>
                                <p>You currently have no notifications.</p>
                                <p>Check back later for updates!</p>
                            </div>
                            : notifications?.map(notification => (
                                <>
                                    {notification._id === notificationId && notificationId !== null &&
                                        <NotificationDetail notification={notification}
                                                            setNotificationId={setNotificationId}
                                                            notificationId={notificationId}/>}
                                    <NotificationBox key={notification.createdAt}
                                                     onClick={() => setReadNoti(notification._id)}>
                                        <div className='notification'>
                                            <div>
                                                <IoIosNotifications/>
                                            </div>
                                            <div className='data'>
                                                <h4>{notification.title}</h4>
                                                {notification.type === 'success' &&
                                                    <p style={{backgroundColor: "green"}}>
                                                        <FaCheckCircle/>{notification.type}
                                                    </p>}
                                                {notification.type === 'info' && <p style={{backgroundColor: "blue"}}>
                                                    <FaInfoCircle/>{notification.type}
                                                </p>}
                                                {notification.type === 'warning' && <p style={{backgroundColor: "red"}}>
                                                    <IoIosWarning/>{notification.type}
                                                </p>}
                                            </div>
                                        </div>
                                        <div className='timestamp'>
                                            {notification.isRead === false &&
                                                <p className='new'><IoMdNotifications/>New</p>}
                                            <p className='date'>
                                                <MdCalendarToday/>{calculateTimeDifference(notification.createdAt)}</p>
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

    .icon {
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


    @media screen and (max-width: 800pxpx) {
        height: 100%;

    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem;


        .showAllIcon {
            width: 15px;
            height: 15px;
            display: grid;
            place-items: center;
            background-color: #eee;
            padding: 0.3rem;
            border-radius: 50%;
        }

        > * {
            margin: 0;
            padding: 0;
        }

        h2 {
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

    .emptyNotification {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .8rem;


        > * {
            margin: 0;
            padding: 0;
        }
    }
`

const Content = styled.div`
    width: 60%;
    margin: auto;


    @media screen and (max-width: 800px) {
        width: 90%;

    }
`

const NotificationBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eee;
    border-bottom: 1px solid #eee;
    border-radius: 10px;
    padding: .3rem .5rem;
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

    &:hover {
        background-color: #f3e09c4e;
    }


    .notification {
        display: flex;
        align-items: center;
        gap: .3rem;

        .data {
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            h4 {
                font-size: .8rem;
                font-weight: 500;
            }

            p {
                color: #fff;
                display: flex;
                align-items: center;
                gap: .3rem;
                border-radius: 10px;
                font-size: .7rem;
                padding: 0.1rem .3rem;
            }


            > * {
                margin: 0;
            }
        }

        > * {
            margin: 0;
            padding: 0;
        }
    }

    .timestamp {
        font-size: 0.7rem;
        display: flex;
        align-items: flex-end;
        gap: .4rem;
        flex-direction: column;

        P {
            margin: 0;
            padding: 0;
        }

        p {
            display: flex;
            align-items: center;
            gap: .4rem;
        }

        .new {
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