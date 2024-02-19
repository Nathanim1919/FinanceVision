import React from "react";

function SidebarLayout() {
  return (
    <div>
        <div className="sidebar">
            <div className="sidebarItem">
                <p>Dashboard</p>
            </div>
            <div className="sidebarItem">
                <p>Incomes</p>
            </div>
            <div className="sidebarItem">
                <p>Expenses</p>
            </div>
            <div className="sidebarItem">
                <p>Transactions</p>
            </div>
            <div className="sidebarItem">
                <p>Reports</p>
            </div>
            <div className="sidebarItem">
                <p>Notifications</p>
            </div>
            
        </div>

        <div className="sidebarFooter">
            <div className="sidebarItem">
                <p>Settings</p>
            </div>

            <div className="sidebarItem">
                <p>Logout</p>
            </div>

            
        </div>
    </div>
  );
}

export default SidebarLayout;