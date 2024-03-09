import React from 'react';
import styled from 'styled-components';
import AboutImage from '/blog/about.png';
import { FaCheckCircle } from "react-icons/fa";

const AboutUs = () => {
  return (
    <Container id='about'>
        
        <div>
            <img src={AboutImage} alt="About us" />
        </div>
        <Information>
            <Title>About <span>FVISON</span></Title>
            <Section>
                <h2>Our Mission</h2>
                <p>F-vision is here to help you achieve financial freedom and peace of mind. We understand the complexities of managing your finances, and we're passionate about creating tools and resources that are accessible, user-friendly, and impactful.</p>
            </Section>

            <Section>
                <h2>What Makes Us Different</h2>
                <List>
                    <li><FaCheckCircle/>Personalized approach</li>
                    <li><FaCheckCircle/>Innovative technology</li>
                    <li><FaCheckCircle/>Holistic view</li>
                    <li><FaCheckCircle/>Focus on education</li>
                    <li><FaCheckCircle/>User-friendly platform</li>
                </List>
            </Section>

            <CallToAction>
                Join us on your path to financial well-being today and take control of your finances.
                <button>Get Started</button>
            </CallToAction>
        </Information>
    </Container>
  );
};



export default AboutUs;


const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    padding: 3rem 0;

    
    @media screen and (max-width:768px){
        grid-template-columns: 1fr;
        padding: 2rem;
    }

    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const Information = styled.div`
    display: flex;
    flex-direction: column;

    >*{
        margin:0;
    }
`

const Title = styled.h1`
    font-size: 2.5rem;
    span{
        color: #12a1fa;
    }
    @media screen and (max-width:768px){
        font-size: 1.5rem;
        align-self: center;
    }
`

const Section = styled.div`
    h2{
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    p{
        color: #333;
    }
`

const List = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: .5rem;
    padding: 0;
    margin: 0;

    li{
        display: flex;
        gap: .5rem;
        align-items: center;
        background-color: #c8edc2;
        /* color: #3f78ff; */
        font-size: 1rem;
        font-weight: 500;
        padding: .5rem;
        width: 100%;

        *:nth-child(1){
            /* color: #1135ff; */
        }
    }
`

const CallToAction = styled.div`
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    button{
        background-color: #12a1fa;
        color: #fff;
        border: none;
        padding: .5rem 1rem;
        cursor: pointer;
        outline: none;
        border-radius: 5px;
    }
`