import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #343a40;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 2rem;
    margin: 0;
  }

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;

    li {
      margin-right: 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #007bff;
      }
    }
  }

  div {
    display: flex;
    align-items: center;

    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 15px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      margin-right: 10px;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <div>
        <h2>fin.</h2>
      </div>
      <div>
        <ul>
          <li>Home</li>
          <li>Blog</li>
          <li>About</li>
          <li>Contact us</li>
        </ul>
        <div>
          <button>Sign up</button>
          <button>Log in</button>
        </div>
      </div>
    </HeaderContainer>
  );
}

export default Header;
