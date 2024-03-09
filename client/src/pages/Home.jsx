import styled from "styled-components";
import HeroImage from "/images/hero.jpg";
import { FaBitcoin } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import Services from "../sections/Services";
import { FAQs } from "./FAQs";
import BlogPost from "../layouts/BlogPost";
import FooterLayout from "../layouts/FooterLayout";
import AboutUs from "../layouts/About";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import {Link} from 'react-scroll';
import { NavLink } from "react-router-dom";



const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon{
        display: none;
    }

    @media screen and (max-width: 700px){
          justify-content: space-between;
          padding: 0 1rem;
          border-bottom: 1px solid #262525;
          .icon{
            display: grid;
            font-size: 2rem;
            font-weight: 800;
            cursor: pointer;
        }
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

            @media screen and (max-width:768px){
                font-size:2rem;
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
        background-color: #1d42ffd5;
        align-self: end;
        padding: 0 2rem;
        border-radius: 4rem;
        position: fixed;
        z-index: 10;
        right: 4%;
       
        transition: all .4s ease-in-out;
        backdrop-filter: blur(10px);

        .closeIcon{
            display: none;
            cursor: pointer;
        }

        @media screen and (max-width:700px){
            position: fixed;
            width: 100%;
            right: 0%;
            padding: 2rem 0;
            border-radius: 0;
            flex-direction: column;
            gap: 2rem;
            box-shadow: 0 5px 23px rgba(0,0,0,.3);
            top:${props => props.isOpen ? '0%' : '-100%'};
            background-color: #000000d4;

            .closeIcon{
                display: block;
                position: absolute;
                right: 2rem;
                top: 1rem;
                font-size: 2rem;
                cursor: pointer;
                color: #fff;
            }
            
        }

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
                a{
                    padding:.1rem .7rem;
                }
                a.active{
                   background-color: orange;
                   border-radius: 40px;
             }
            }

            


            @media screen and (max-width:700px){
                flex-direction: column;
                width: 100%;
                gap: 0;

                li{
                    font-size: 1.2rem;
                    border-bottom: 1px solid #535151;
                    width: 100%;
                    display: grid;
                    place-items: center;
                    padding: 1rem 0;
                    cursor: pointer;                    

                    &:hover{
                        color: #151514;
                        background-color: #1463bed4;
                    }
                }
            }

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
    const [isOpen, setIsOpen] = useState(false);
    return (
       <Container>
            <Header className="header">
                <div className="logo"  id="hero">
                    <h1>F<span>Vision</span></h1>
                </div>
                <div className="icon" onClick={()=>setIsOpen(true)}>
                    <CiMenuFries/>
                </div>

            <Navbar isOpen={isOpen}>
                <div className="closeIcon" onClick={()=>setIsOpen(false)}>
                    <IoMdClose/>
                </div>
                <ul>
                    <li>
                        <Link
                            onClick={()=>setIsOpen(false)} 
                            activeClass="active"
                            to="hero"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}>
                                Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={()=>setIsOpen(false)} 
                            activeClass="active"
                            to="services"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}>
                                Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={()=>setIsOpen(false)} 
                            activeClass="active"
                            to="blog"
                            spy={true}
                            smooth={true}
                            offset={-100}
                            duration={500}>
                                Blog
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={()=>setIsOpen(false)} 
                            activeClass="active"
                            to="about"
                            spy={true}
                            smooth={true}
                            offset={-0}
                            duration={500}>
                                About
                        </Link>
                    </li>
                    <li>
                        <Link
                            onClick={()=>setIsOpen(false)} 
                            activeClass="active"
                            to="faqs"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}>
                                FAQs
                        </Link>
                    </li>
                </ul>
                <Button className="btns">
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>
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