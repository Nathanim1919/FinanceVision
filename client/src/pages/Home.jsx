import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroImage from '../../src/assets/hero.jpg'
import Aos from 'aos';
import 'aos/dist/aos.css'

function Home() {

  useEffect(() => {
    Aos.init({
      duration: 500
    })
  }, []);

  return (
    <HomeContainer className = "home-container" >
      <div className="hero-section" data-aos="fade-right">
        <h1>Navigate Financial Success with the Power of AI at Your Fingertips</h1>
        <p>Transform the way you manage money. Our personal finance app is designed to help you take charge, plan for the future, and thrive financially.</p>
        <div className="cta-buttons">
          <Link to="/register">
            <button className="get-started">Get Started for Free</button>
          </Link>
        </div>
      </div>
      <div data-aos="zoom-in">
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
  padding:3rem;
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

  @media screen and (max-width:650px){
    width: 90vw;
    padding:6rem 1rem;
    padding-bottom: 0;
    margin: auto;
      h1{
        font-size: 1.2rem;
      }
  }
`