import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(${(props) => (props.scrollingUp ? '0' : '-100%')});
  background-color: #fff;
  color: #333;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;
  z-index: 10;

  h2 {
    font-size: 2rem;
    margin: 0;
    color: orange;
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
      padding: 5px 7px;
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
  const [scrollingUp, setScrollingUp] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const st = window.scrollY;

      setScrollingUp(st < lastScrollTop);
      lastScrollTop = st;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <HeaderContainer scrollingUp={scrollingUp}>
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
