import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';

function Header() {
  const user = useSelector((state) => state.auth.user)
  return (
    <Container>
        <h3>{user.username}</h3>
        <div>
            <h3>Conversations</h3>
        </div>

    </Container>
  )
}

export default Header;


const Container = styled.div`
    background-color: #22175f;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: .8rem;
    color: #fff;

    *{

        padding: 0 1rem;
    }
`