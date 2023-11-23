import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  text-align: center;
  margin: 20px;

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
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
  return (
    <AboutContainer>
      <h1>About Our Website</h1>
      <p>Welcome to our financial assistance platform, where we empower individuals to take control of their finances and achieve their goals.</p>
      <img src="https://example.com/about-image.jpg" alt="About Us" />
      <p>
        At our website, we provide a user-friendly environment for managing expenses, setting financial goals, and gaining insights into your financial well-being.
        Whether you are a seasoned investor or just starting with budgeting, our platform is designed to meet your diverse financial needs.
      </p>
      <p>
        Explore our features, stay informed with financial trends through our blog, and embark on a journey towards financial success with our personalized tools and resources.
      </p>
    </AboutContainer>
  );
}

export default About;
