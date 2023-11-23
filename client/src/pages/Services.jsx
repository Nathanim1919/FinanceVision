import React from 'react';
import styled from 'styled-components';
import blogImage1 from '../../src/assets/blog/b1.jpg';
import blogImage2 from '../../src/assets/blog/b2.jpg';
import blogImage3 from '../../src/assets/blog/b3.jpg';
import blogImage4 from '../../src/assets/blog/b4.jpg';
import blogImage5 from '../../src/assets/blog/b5.jpg';
import blogImage6 from '../../src/assets/blog/b6.jpg';

const AboutContainer = styled.div`
    display: grid;
    gap: 0rem;
    place-items: center;
    width: 80vw;
    margin: auto;

    >div:nth-child(1),
    div:nth-child(3),
    div:nth-child(5){
      flex-direction: row-reverse;
    }

    >div{
      display: flex;
      justify-content: space-around;
      align-items: center;

      >*{
        flex: 1;
      }

      img{
        width: 100%;
        height: 100%;
      }
    }
  `;

const aboutSections = [
  {
    id: 1,
    image: blogImage1,
    title: 'Track Your Expenses',
    description: 'Easily monitor and categorize your expenses to gain insights into your spending habits.',
  },
  {
    id: 2,
    image: blogImage2,
    title: 'Set and Achieve Goals',
    description: 'Define financial goals, track your progress, and celebrate your achievements along the way.',
  },
  {
    id: 3,
    image: blogImage3,
    title: 'Budgeting Made Simple',
    description: 'Effortlessly create budgets, allocate funds, and stay on top of your financial targets.',
  },
  {
    id: 4,
    image: blogImage4,
    title: 'Secure Your Future',
    description: 'Explore investment options, retirement planning, and strategies for long-term financial security.',
  },
  {
    id: 5,
    image: blogImage5,
    title: 'Financial Education',
    description: 'Access a wealth of financial resources, tips, and articles to enhance your financial literacy.',
  },
  {
    id: 6,
    image: blogImage6,
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
          <div>
          <img src={section.image} alt={`About section - ${section.title}`} />
          </div>
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
