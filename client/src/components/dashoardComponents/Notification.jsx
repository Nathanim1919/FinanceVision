import { useEffect } from "react";
import styled from "styled-components";
import { IoIosNotifications } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoIosWarning, IoMdNotifications } from "react-icons/io";
import { MdCalendarToday } from "react-icons/md";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { calculateTimeDifference } from "../../utils/Formatting";
import { fetchNotifications } from "../../features/notification/notificationSlice";
import BellIcon from "/notiIcon/bell.png";

const Notification = () => {
  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector(
    (state) => state.notification.notifications,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotifications(user._id));
  }, [dispatch, user._id]);

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
        {notifications?.length === 0 ? (
          <div style={{ display: "grid", placeItems: "center" }}>
            <img src={BellIcon} alt="bell" style={{ width: "50px" }} />
            <p>
              No new notifications.
              <br />
              Stay tuned!
            </p>
          </div>
        ) : (
          notifications?.slice(0, 3).map((notification) => (
            <NotificationBox key={notification.createdAt}>
              <div className="notification">
                <div>
                  <IoIosNotifications />
                </div>
                <div className="data">
                  <h4>{notification.title.slice(0, 20)}...</h4>
                  {notification.type === "success" && (
                    <p style={{ backgroundColor: "green" }}>
                      <FaCheckCircle />
                      {notification.type}
                    </p>
                  )}
                  {notification.type === "info" && (
                    <p style={{ backgroundColor: "blue" }}>
                      <FaInfoCircle />
                      {notification.type}
                    </p>
                  )}
                  {notification.type === "warning" && (
                    <p style={{ backgroundColor: "red" }}>
                      <IoIosWarning />
                      {notification.type}
                    </p>
                  )}
                </div>
              </div>

              <div className="timestamp">
                {notification.isRead === false && (
                  <p className="new">
                    <IoMdNotifications />
                    New
                  </p>
                )}
                <p className="date">
                  <MdCalendarToday />
                  {calculateTimeDifference(notification.createdAt)}
                </p>
              </div>
            </NotificationBox>
          ))
        )}
      </NotificationContainer>
    </Container>
  );
};

export default Notification;

const Container = styled.div`
  color: #1e1d1d;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;

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
      gap: 0.5rem;
      font-size: 1rem;
    }
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;

    .icon {
      background-color: #cecbcb;
      width: 20px;
      height: 20px;
      padding: 0.4rem;
      border-radius: 50%;
      color: blue;
      cursor: pointer;
      display: grid;
      place-items: center;
    }
  }
`;
const NotificationContainer = styled.div`
  display: grid;
  gap: 0.5rem;
  /* place-items: center; */

  p {
    text-align: center;
  }
`;

const NotificationBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f3e09c75;
  border-radius: 10px;
  padding: 0.3rem 0.5rem;
  .notification {
    display: flex;
    align-items: center;
    gap: 0.3rem;

    .data {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h4 {
        font-size: 0.8rem;
        font-weight: 500;
      }

      p {
        color: #fff;
        display: flex;
        align-items: center;
        gap: 0.3rem;
        border-radius: 10px;
        font-size: 0.7rem;
        padding: 0.1rem 0.3rem;
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
    gap: 0.4rem;
    flex-direction: column;

    P {
      margin: 0;
      padding: 0;
    }

    p {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .new {
      color: #fff;
      background-color: red;
      padding: 0.1rem 0.3rem;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      border-radius: 30px;
    }
  }
`;
