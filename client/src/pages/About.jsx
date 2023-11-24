import React,{useEffect} from 'react';
import styled from 'styled-components';
import aboutImage from '../../src/assets/about.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';

const AboutContainer = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  margin: 20px;
  width: 80vw;
  margin: 5rem auto;
  text-align: left;
  gap: 2rem;
  flex-wrap: wrap;

  h1>h1 {
    font-size: 2rem;
    margin-bottom: 10px;
    color:#333;
    padding: 0.4rem;
    border-radius: 3px;

    span{
      color: #fff;
      background-color: #333;
      padding: 0.3rem 1rem;
      position: relative;
      transform: scale(.8);
    }
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-bottom: 20px;
  }

  img {
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;

function About() {
    useEffect(() => {
      Aos.init({
        duration: 1000
      })
    }, []);
  return (
    <AboutContainer>
      <img data-aos="fade-right" src={aboutImage} alt="About Us" />
      <div data-aos="fade-left">
        <h1><h1>About <span>Us</span></h1></h1>
        <p>Welcome to our financial assistance platform, where we empower individuals to take control of their finances and achieve their goals.
     At our website, we provide a user - friendly environment
     for managing expenses, setting financial goals, and gaining insights into your financial well - being.
     Whether you are a seasoned investor or just starting with budgeting, our platform is designed to meet your diverse financial needs.
               Explore our features, stay informed with financial trends through our blog, and embark on a journey towards financial success with our personalized tools and resources.
        </p>
      </div>
    </AboutContainer>
  );
}

export default About;
