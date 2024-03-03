import React, {useState, useEffect} from "react";
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
import { clearUser } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../components/Loader";
import { GoGoal } from "react-icons/go";


const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  height: 100vh;
  flex-direction: column;
  box-shadow: 0 7px 33px rgba(0, 0, 0, 0.1);
  gap: 3rem;

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
    

    .notificationNumber{
      background-color: red;
      position: absolute;
      top: -.4rem;
      width: 14px;
      height: 14px;
      display: grid;
      place-items: center;
      border-radius: 50%;
      color: #fff;
      font-size: .5rem;
      right: -.41rem;
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
      background:linear-gradient(to right, #4c8eff, blue) ;
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

function SidebarLayout() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const user = useSelector((state) => state.auth.user);
  const [notifications, setNotifications] = useState([]);

  const logout = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/logout", null, {
        withCredentials: true
      });
     
        dispatch(clearUser());
        navigate('/login', { replace: true });
  
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    fetchNotifications();
  }, []);


  const unreadNotifications = notifications.filter((notification) => notification.isRead === false);

  return (
    <Container>
      {isLoading && <Loader />}
      <div className="sidebar">
        <NavLink to="/dashboard" className="sidebarItem" activeClassName="active">
          <MdDashboard />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/incomes" className="sidebarItem" activeClassName="active">
          <FaGetPocket />
          <p>Incomes</p>
        </NavLink>
        <NavLink to="/expenses" className="sidebarItem" activeClassName="active">
          <TiExport />
          <p>Expenses</p>
        </NavLink>
        <NavLink to="/goals" className="sidebarItem" activeClassName="active">
          <GoGoal />
          <p>Goals</p>
        </NavLink>
        <NavLink
          to="/transactions"
          className="sidebarItem"
          activeClassName="active"
        >
          <GrTransaction />
          <p>Transactions</p>
        </NavLink>
        <NavLink
          to="/notifications"
          className="sidebarItem"
          activeClassName="active"
        >
          <div style={{position:'relative'}}>
            <span className="notificationNumber">{unreadNotifications.length}</span>
             <IoMdNotifications />
          </div>
          <p>Notifications</p>
        </NavLink>
      </div>

      <div className="sidebarFooter">
        <NavLink to="/settings" className="sidebarItem" activeClassName="active">
          <IoMdSettings />
          <p>Settings</p>
        </NavLink>

        <Link onClick={logout} className="sidebarItem" activeClassName="active">
          <IoMdLogOut />
          <p>Logout</p>
        </Link>
      </div>
    </Container>
  );
}

export default SidebarLayout;
