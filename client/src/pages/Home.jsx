import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroImage from '../../src/assets/hero.jpg'

function Home() {
  return (
    <HomeContainer className = "home-container" >
      <div className="hero-section">
        <h1>Navigate Financial Success with the Power of AI at Your Fingertips</h1>
        <p>Transform the way you manage money. Our personal finance app is designed to help you take charge, plan for the future, and thrive financially.</p>
        <div className="cta-buttons">
          <Link to="/signup">
            <button className="get-started">Get Started for Free</button>
          </Link>
        </div>
      </div>
      <div>
        <img src={heroImage} alt=''/>
      </div>
    </HomeContainer>
  );
}

export default Home;


const HomeContainer = styled.div`
  height: 100vh;
  width: 80vw;
  display: grid;
  grid-template-columns:repeat(auto-fit, minmax(350px, 1fr));
  place-items: center;
  padding:1rem 3rem;
  margin: auto;

  button{
    padding: .7rem 2rem;
    background-color: blue;
    color: #fff;
    font-family: inherit;
    font-weight: 600;
    border: none;
    border-radius: 10px;
  }


  >div{
    position: relative;

    >img{
      width: 100%;
    }
  }

`