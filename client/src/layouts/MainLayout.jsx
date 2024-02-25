import React from 'react';
import HeaderLayout from './HeaderLayout';
import SidebarLayout from './SidebarLayout';
import styled from 'styled-components';
import { Dashboard } from '../pages/Dashboard';
import { Outlet } from 'react-router-dom';


const Container = styled.div`
  display: grid;
  grid-template-rows: .1fr .9fr;
`

const View = styled.div`
  display: grid;
  grid-template-columns: .12fr .88fr;
`

function Layout({ children }) {
  return (
    <Container>
      <HeaderLayout />
      <View className="main-content">
        <SidebarLayout />
        <main><Outlet/></main>
      </View>
    </Container>
  );
}

export default Layout;