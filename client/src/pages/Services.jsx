import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
  width: 70%;
  margin: auto;

  div.about-section:nth-child(1),
    div.about-section:nth-child(3),
      div.about-section:nth-child(5){
        flex-direction: row-reverse;
      }

  .about-section {
    margin: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-wrap: wrap;

    img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 10px;
    }

    div {
      display: flex;
      flex-direction: column;

      h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      p {
        font-size: 1rem;
        color: #555;
      }
    }
  }
`;

const aboutSections = [
  {
    id: 1,
    image: 'https://example.com/image1.jpg',
    title: 'Track Your Expenses',
    description: 'Easily monitor and categorize your expenses to gain insights into your spending habits.',
  },
  {
    id: 2,
    image: 'https://example.com/image2.jpg',
    title: 'Set and Achieve Goals',
    description: 'Define financial goals, track your progress, and celebrate your achievements along the way.',
  },
  {
    id: 3,
    image: 'https://example.com/image3.jpg',
    title: 'Budgeting Made Simple',
    description: 'Effortlessly create budgets, allocate funds, and stay on top of your financial targets.',
  },
  {
    id: 4,
    image: 'https://example.com/image4.jpg',
    title: 'Secure Your Future',
    description: 'Explore investment options, retirement planning, and strategies for long-term financial security.',
  },
  {
    id: 5,
    image: 'https://example.com/image5.jpg',
    title: 'Financial Education',
    description: 'Access a wealth of financial resources, tips, and articles to enhance your financial literacy.',
  },
  {
    id: 6,
    image: 'https://example.com/image6.jpg',
    title: 'User-Friendly Interface',
    description: 'Enjoy a sleek and intuitive user interface designed for a seamless financial management experience.',
  },
];

function Service() {
  return (
    <>
    <div className='header'> 
        <h1>Discover Our Features</h1>
        <p>Explore the key features that make our app stand out in helping you achieve financial success.</p>
      </div>
    <AboutContainer>
      {aboutSections.map(section => (
        <div className='about-section' key={section.id}>
          <img src={section.image} alt={`About section - ${section.title}`} />
          <div>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
        </div>
      ))}
    </AboutContainer>
    </>
  );
}

export default Service;
