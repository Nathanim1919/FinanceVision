import React,{useEffect} from 'react';
import styled from 'styled-components';
import serviceImage1 from '../../src/assets/service/s1.jpg';
import serviceImage2 from '../../src/assets/service/s2.jpg';
import serviceImage3 from '../../src/assets/service/s3.jpg';
import serviceImage4 from '../../src/assets/service/s4.jpg';
import serviceImage5 from '../../src/assets/service/s5.jpg';
import serviceImage6 from '../../src/assets/service/s6.jpg';
import Aos from 'aos';
import 'aos/dist/aos.css';


const Container = styled.div`
    width: 70%;
    margin: 3rem auto;
  `;

const AboutContainer = styled.div`
  display: grid;
  gap: 2rem;

  >div{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap:2rem;


    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
`

const aboutSections = [
  {
    id: 1,
    image:serviceImage6,
    title: 'Track Your Expenses',
    description: 'Easily monitor and categorize your expenses to gain insights into your spending habits.',
  },
    {
      id: 2,
      image: serviceImage2,
      title: 'Financial Education',
      description: 'Access a wealth of financial resources, tips, and articles to enhance your financial literacy.',
    },

  {
    id: 3,
    image:serviceImage4,
    title: 'Budgeting Made Simple',
    description: 'Effortlessly create budgets, allocate funds, and stay on top of your financial targets.',
  },
  {
    id: 4,
    image:serviceImage3,
    title: 'Secure Your Future',
    description: 'Explore investment options, retirement planning, and strategies for long-term financial security.',
  },
  {
    id: 5,
    image: serviceImage5,
    title: 'Set and Achieve Goals',
    description: 'Define financial goals, track your progress, and celebrate your achievements along the way.',
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
          <div className = 'imageContainer' data-aos = {(index + 1) % 2 === 0 ? "fade-right" : "fade-left"} >
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
