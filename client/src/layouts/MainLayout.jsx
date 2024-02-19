import React from 'react';
import HeaderLayout from './HeaderLayout';
import SidebarLayout from './SidebarLayout';

function Layout({ children }) {
  return (
    <div>
      <HeaderLayout />
      <div className="main-content">
        <SidebarLayout />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;