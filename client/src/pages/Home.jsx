import { Link } from "react-router-dom";
import styled from "styled-components";
import HeroImage from "/images/hero.jpg";
import { FaBitcoin } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Services from "../sections/Services";
import { FAQs } from "./FAQs";
import BlogPost from "../layouts/BlogPost";
import FooterLayout from "../layouts/FooterLayout";
import AboutUs from "../layouts/About";

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px){
          justify-content: space-around;
        }

    .logo{

        @media screen and (max-width: 768px){
            position: relative;
            z-index: 3;
        }
        
        h1{
            font-size: 1.6rem;
            span{
                color: #12a1fa;
            }
        }
    
    }
`

const Container = styled.div`
    width: 80vw;
    margin:0 auto;

   

    @media screen and (max-width: 768px){
        width: 100vw;
    }

    /* &::after{
        content: '';
        position: absolute;
        top: 0%;
        right: 0%;
        width: 40vw;
        background-color: #498fdf;
        height: 11vh;
        border-bottom-left-radius:170px;
        border-bottom-right-radius:170px;

        @media screen and (max-width: 768px){
            width: 100vw;
            height: 12vh;
            border-bottom-left-radius:0px;
            border-bottom-right-radius:0px;
        }
    } */


    .hero{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;
        position: relative;

        @media screen and (max-width: 768px){
            grid-template-columns: 1fr;
            padding: 2rem;
        }

        .icon{
            color: gold;
            font-size: 6rem;
            right: 40%;
            position: absolute;

            @media screen and (max-width: 768px){
                right: -8%;
                top: 18%;
    
            }
        }
        .icon2{
            color: gold;
            font-size: 16rem;
            left: 20%;
            bottom: -18%;
            opacity: .2;
            position: absolute;
            transform: rotate(34deg);
        }

        a {
            padding: .5rem 1rem;
            border-radius: 5px;
            background-color: #12a1fa;
            color: #fff;
            text-decoration: none;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        h1{
            font-size: 3rem;
            line-height: 1;
            color: #171717;
            span{
                color: #12a1fa;
            }
        }

        p{
            font-size: 1.2rem;
            color: #171717;
        }

        img{
            width: 100%;
            border-radius: 10px;
        }
    
    }
`

const Navbar = styled.nav`
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #007bff;
        align-self: end;
        padding: 0 2rem;
        border-radius: 4rem;
        position: fixed;
        z-index: 10;
        right: 4%;

        ul{
            position: relative;
            z-index: 5;
            display: flex;
            gap: 2rem;
            list-style: none;
            color: #ffffff;
            font-size: 1rem;
            font-weight: 500;
            text-transform: capitalize;
            margin-right: 2rem;

            li{
                cursor: pointer;

                &:hover{
                    color: #dbdaa5;
                }
            }
        
        }
`

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 3;
    a{
        color: #ffffff;
        text-decoration: none;
        padding: .2rem 1rem;
        border-radius: 5px;
        
    }

    a:hover{
        color: #ddd;
    }

    a:nth-child(2){
            border-radius: 15px;
            background-color: #ffffff;
            color: #2b2a2a;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all .4s ease-in-out;
    }

    a:nth-child(2):hover{
        border: 1px solid rgb(255, 255, 255);
        background-color: transparent;
        color: #fcfcfc;
    }
    
`


export const Home = () => {
    return (
       <Container>
            <Header className="header">
                <div className="logo">
                    <h1>F<span>Vision</span></h1>
                </div>

            <Navbar>
                <ul>
                    <li>Home</li>
                    <li>Service</li>
                    <li>Blog</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
                <Button className="btns">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </Button>
            </Navbar>
            </Header>

            <div className="hero">
                <div>
                    <div className="icon">
                        <FaBitcoin/>
                    </div>
                    <div className="icon2">
                        <FaMoneyCheckAlt/>
                    </div>
                    <h1>Know where your <span>money</span> goes.</h1>
                    <p>Track income, expenses, and transactions effortlessly. Gain insights and achieve financial goals.</p>
                    <Link to="/register">Get Started</Link>
                </div>
                <div>
                    <img src={HeroImage} alt="hero"/>
                </div>    
            </div>

            <Services/>
            <BlogPost/>
            <AboutUs/>
            <FAQs/>
            <FooterLayout/>
       </Container>
    )
};