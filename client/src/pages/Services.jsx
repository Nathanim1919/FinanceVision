import React,{useEffect} from 'react';
import styled from 'styled-components';
import serviceImage1 from '../../src/assets/service/s1.jpg';
import serviceImage2 from '../../src/assets/service/s2.jpg';
import serviceImage3 from '../../src/assets/service/s3.jpg';
import serviceImage4 from '../../src/assets/service/s4.jpg';
import serviceImage5 from '../../src/assets/service/s5.jpg';
import serviceImage6 from '../../src/assets/service/s6.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css'


const Container = styled.div`
    display:grid;
    place-items:center;
    width: 60vw;
    margin:5rem auto;

    @media screen and (max-width:750px) {
      width: 80vw;

      h1{
        font-size: 1.5rem;
      }
    }


    .header{
      display: flex;
      flex-direction: column;

      >h1{
        font-weight: bolder;
        padding:.2rem 1rem;
        color: #333;
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

    
    .imageContainer::after{
      position: absolute;
      top:50%;
      right:-60%;
      height: 60%;
      width:100%;
      content: '';
      background: #eee;
      border-top-left-radius: 100px;
      border-bottom-left-radius: 100px;

       @media screen and (max-width:650px){
          height: 48%;
        }
    }
    > div:nth-child(2) .imageContainer::after,
    div:nth-child(4) .imageContainer::after,
    div:nth-child(6) .imageContainer::after{
       left:-60%;
        border-top-right-radius: 100px;
      border-bottom-right-radius: 100px;
        border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }

    .imageContainer{
      padding:3rem;
      img{
        border-radius: 20% 0%;
        position: relative;
        z-index: 5;
        padding: 1rem;
        filter:drop-shadow(0 9px 24px rgba(0,0,0,.1));
      }
    }


    >div{
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;

      @media screen and (max-width:800px){
         display: grid;

        div:nth-child(1) .textContent::after,
        div:nth-child(3) .textContent::after,
        div:nth-child(5) .textContent::after{
          background-color: transparent;
        }

         div.textContent {
              &::after{
               background-color: transparent;
               color: #333;
            }
         }
         
         
         div.textContent h2{
          font-size: 1.2rem;
          color: #333;
         }
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
  useEffect(() => {
    Aos.init({
      duration: 500
    })
  }, []);
  return (
    <Container>
    <div className='header'> 
        <h1>Discover Our Features</h1>
        <p>Explore the key features that make our app stand out in helping you achieve financial success.</p>
    </div>
    <AboutContainer>
      {aboutSections.map((section,index) => (
        <div className='about-section' key={section.id}>
          <div className='imageContainer' data-aos="zoom-in">
             <img src={section.image} alt={`About section - ${section.title}`} />
          </div>
          <div className="textContent" data-aos={(index + 1)%2 === 0?"fade-left":"fade-right"}>
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
