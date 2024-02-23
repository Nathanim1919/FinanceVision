import React from "react";
import styled from "styled-components";
import { MdDashboard, MdAutoGraph } from "react-icons/md";
import { FaGetPocket } from "react-icons/fa";
import { IoMdSettings, IoMdLogOut, IoMdNotifications } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { TiExport } from "react-icons/ti";
import { NavLink } from "react-router-dom";

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
    background-color: blue;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.3);
  }
`;

function SidebarLayout() {
  return (
    <Container>
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
          <TiExport />
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
          <IoMdNotifications />
          <p>Notifications</p>
        </NavLink>
      </div>

      <div className="sidebarFooter">
        <NavLink to="/setting" className="sidebarItem" activeClassName="active">
          <IoMdSettings />
          <p>Settings</p>
        </NavLink>

        <NavLink to="/logout" className="sidebarItem" activeClassName="active">
          <IoMdLogOut />
          <p>Logout</p>
        </NavLink>
      </div>
    </Container>
  );
}

export default SidebarLayout;
