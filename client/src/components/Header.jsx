import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HEADE>
        <div className="logo">
            logo
        </div>

        <div className="profile">
            profile
        </div>
    </HEADE>
  )
}

export default Header;

const HEADE = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: #f5f5f5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    .logo{
        font-size: 2rem;
    }
    .profile{
        font-size: 1.5rem;
    }
`