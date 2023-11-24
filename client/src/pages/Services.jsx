import React from 'react';
import styled from 'styled-components';
import serviceImage1 from '../../src/assets/service/s1.jpg';
import serviceImage2 from '../../src/assets/service/s2.jpg';
import serviceImage3 from '../../src/assets/service/s3.jpg';
import serviceImage4 from '../../src/assets/service/s4.jpg';
import serviceImage5 from '../../src/assets/service/s5.jpg';
import serviceImage6 from '../../src/assets/service/s6.jpg';


const Container = styled.div`
    display:grid;
    place-items:center;
    width: 70vw;
    margin:3rem auto;


    .header{
      display: flex;
      flex-direction: column;

      >h1{
        background-color: #333;
        padding:.2rem 1rem;
        color: #fff;
      }

      >*{
        margin: 0;
      }
    }
`

const AboutContainer = styled.div`
    display: grid;
    gap: 0rem;
    place-items: center;

    >div:nth-child(1),
    div:nth-child(3),
    div:nth-child(5){
      flex-direction: row-reverse;
    }
    > div:nth-child(1) .textContent::after,
    div:nth-child(3) .textContent::after,
    div:nth-child(5) .textContent::after{
       transform:rotate(3deg);
    }

    >div{
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;

      @media screen and (max-width:800px){
         display: grid;
      }
      
      .textContent{
        position:relative;

        >*{
          position:relative;
          z-index:2;
        }

        h2{
          color:#fff;
        }

        &::after{
          position:absolute;
          top:2%;
          left:0;
          width:70%;
          height:40%;
          background-color:#333;
          transform:rotate(-3deg);
          content:'';
          border-radius:10px;
        }
      }

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
    image:serviceImage6,
    title: 'Track Your Expenses',
    description: 'Easily monitor and categorize your expenses to gain insights into your spending habits.',
  },
  {
    id: 2,
    image:serviceImage2,
    title: 'Set and Achieve Goals',
    description: 'Define financial goals, track your progress, and celebrate your achievements along the way.',
  },
  {
    id: 3,
    image:serviceImage3,
    title: 'Budgeting Made Simple',
    description: 'Effortlessly create budgets, allocate funds, and stay on top of your financial targets.',
  },
  {
    id: 4,
    image:serviceImage4,
    title: 'Secure Your Future',
    description: 'Explore investment options, retirement planning, and strategies for long-term financial security.',
  },
  {
    id: 5,
    image:serviceImage5,
    title: 'Financial Education',
    description: 'Access a wealth of financial resources, tips, and articles to enhance your financial literacy.',
  },
{
  id: 6,
  image: serviceImage1,
  title: 'AI powered Assistance',
  description: 'Experience the power of artificial intelligence in financial management with our sleek and intuitive user interface designed for a seamless experience.',
},

];

function Service() {
  return (
    <Container>
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
          <div className="textContent">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
        </div>
      ))}
    </AboutContainer>
    </Container>
  );
}

export default Service;
