import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdDashboard, MdAutoGraph } from "react-icons/md";
import { FaGetPocket } from "react-icons/fa";
import { IoMdSettings, IoMdLogOut, IoMdNotifications } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { TiExport } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { GoGoal } from "react-icons/go";
import io from "socket.io-client";
import { BASE_URL, SOCKET_URL } from "../utils/Api";
import { toggleShow } from "../features/sidebar/sidebarSlice";
import { FaRobot } from "react-icons/fa6";

function SidebarLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const user = useSelector((state) => state.auth.user);
  const show = useSelector((state) => state.sidebar.show);

  const [notifications, setNotifications] = useState([]);
  const socket = io("https://finance-vision.vercel.app");
  axios.defaults.withCredentials = true;

  // Logout user
  const logoutUser = async () => {
    setIsLoading(true);
    try {
      // Dispatch the logout action and wait for it to complete
      await dispatch(logout());

      // If the logout action completes successfully, navigate to the login page
      navigate("/login");
    } catch (error) {
      // If an error occurs during the logout process, log the error and show an error message
      console.error("An error occurred during the logout process:", error);
      // You could also show a toast notification or some other form of user feedback here
    } finally {
      // Regardless of whether the logout action succeeds or fails, stop showing the loading indicator
      setIsLoading(false);
    }
  };

  const unreadNotifications = notifications.filter(
    (notification) => notification.isRead === false,
  );

  // Fetch notifications
  const fetchNotifications = useCallback(async () => {
    try {
      const fetchedNotifications = await axios.get(
        `${BASE_URL}/api/v1/notifications?userId=${user._id}`,
      );
      setNotifications(fetchedNotifications.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [user._id]);

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
    socket.on("notification-created", (data) => {
      setNotifications((item) => [...item, data]);
    });
    return () => socket.off("notification-created");
  }, [fetchNotifications, socket]);

  return (
    <Container show={show}>
      <>
        <div className="sidebar">
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/dashboard"
            className="sidebarItem"
            activeClassName="active"
          >
            <MdDashboard />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/incomes"
            className="sidebarItem"
            activeClassName="active"
          >
            <FaGetPocket />
            <p>Incomes</p>
          </NavLink>
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/expenses"
            className="sidebarItem"
            activeClassName="active"
          >
            <TiExport />
            <p>Expenses</p>
          </NavLink>
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/goals"
            className="sidebarItem"
            activeClassName="active"
          >
            <GoGoal />
            <p>Goals</p>
          </NavLink>
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/transactions"
            className="sidebarItem"
            activeClassName="active"
          >
            <GrTransaction />
            <p>Transactions</p>
          </NavLink>
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/notifications"
            className="sidebarItem"
            activeClassName="active"
          >
            <div style={{ position: "relative" }}>
              {unreadNotifications.length > 0 && (
                <span className="notificationNumber">
                  {" "}
                  <IoMdNotifications />
                </span>
              )}
              <IoMdNotifications />
            </div>
            <p>Notifications</p>
          </NavLink>
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/chatAi"
            className="sidebarItem"
            activeClassName="active"
          >
            <div>
              <FaRobot />
            </div>
            <p>Talk with AI</p>
          </NavLink>
        </div>

        <div className="sidebarFooter">
          <NavLink
            onClick={() => dispatch(toggleShow())}
            to="/settings"
            className="sidebarItem"
            activeClassName="active"
          >
            <IoMdSettings />
            <p>Settings</p>
          </NavLink>

          <Link
            onClick={logoutUser}
            className="sidebarItem"
            activeClassName="active"
          >
            <IoMdLogOut />
            <p>Logout</p>
            {isLoading && (
              <div className="loader">
                <Loader />
              </div>
            )}
          </Link>
        </div>
      </>
    </Container>
  );
}

export default SidebarLayout;

const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  height: 100vh;
  position: relative;
  top: 0;
  bottom: 0;
  flex-direction: column;
  box-shadow: 0 7px 33px rgba(0, 0, 0, 0.1);
  gap: 3rem;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 800px) {
    position: absolute;
    top: 0;
    left: ${(props) => (props.show ? "0%" : "-100%")};
    bottom: 0;
    width: 50%;
    z-index: 10;

    .sidebar {
      margin-top: 6rem;
    }
  }

  div a {
    text-decoration: none;
    color: #000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    padding: 0 0.3rem;
    margin: 0.3rem;
    transition: transform 0.3s ease-in-out;
    position: relative;
    right: 0;

    .notificationNumber {
      background-color: red;
      position: absolute;
      top: -0.4rem;
      width: 14px;
      height: 14px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      font-size: 0.5rem;
      right: -0.41rem;
    }

    &:hover > *:nth-child(1) {
      width: 15px;
      height: 15px;
      padding: 0.3rem;
      border-radius: 50%;
      display: grid;
      place-items: center;
      color: #1029cd;
      background-color: #fff;
    }

    &:hover {
      background-color: blue;
      cursor: pointer;
      color: #fff;
      border-radius: 5px;
      box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3);
    }
  }

  div a.active {
    background: linear-gradient(to right, #4c8eff, blue);
    cursor: pointer;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3);
  }
  div a.active > *:nth-child(1) {
    width: 15px;
    height: 15px;
    padding: 0.3rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: #1029cd;
    background-color: #fff;
  }
`;
