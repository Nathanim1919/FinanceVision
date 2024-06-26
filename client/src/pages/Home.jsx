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
import {useSelector, useDispatch} from 'react-redux';
import { MdDashboard } from "react-icons/md";




const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
        display: none;
    }

    @media screen and (max-width: 768px) {
        justify-content: space-between;
        padding: 0 1rem;
        background-color: #1515f8;
        color: #fff;
        position: fixed;
        z-index: 10;
        left: 0;
        right: 0;
        .icon {
            display: grid;
            font-size: 1.8rem;
            font-weight: 800;
            cursor: pointer;
        }
    }

    .logo {

        @media screen and (max-width: 768px) {
            position: relative;
            z-index: 3;
        }

        h1 {
            font-size: 1.5rem;

            span {
                color: #12a1fa;
            }
        }

    }
`

const Container = styled.div`
    width: 80vw;
    margin: 0 auto;
    padding: 0;

    @media screen and (max-width: 768px) {
        width: 100vw;
    }

    .hero {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: center;
        position: relative;

        .hero-text {
            position: relative;
            z-index: 3;
            display: flex;
            flex-direction: column;
            align-items: flex-start;

            > * {
                margin: 0;
            }

            h1 {
                margin-bottom: 1rem;
            }

            h3 {
                span {
                    font-size: 1.3rem;
                    padding: .1rem .5rem;
                    background-color: #ffb838;
                    color: #fff;
                    margin-right:1rem;

                }
                display: flex;
                align-items: center;
                color: #333;
                font-size: 2rem;
            }

            p {
                margin-bottom: 1rem;
            }

            @media screen and (max-width: 768px) {
                margin-top: 4rem;

            }
        }


        @media screen and (max-width: 768px) {
            grid-template-columns: 1fr;
            padding: 2rem;

        }

        .icon {
            color: gold;
            font-size: 6rem;
            right: 40%;
            position: absolute;

            @media screen and (max-width: 768px) {
                right: -45%;
                top: 0%;
                font-size: 26rem;
                opacity: .5;

            }
        }

        .icon2 {
            color: gold;
            font-size: 16rem;
            left: 20%;
            bottom: -18%;
            opacity: .2;
            position: absolute;
            transform: rotate(34deg);
        }

        a {
            padding: .5rem 3rem;
            background-color: #4f5bff;
            cursor: pointer;
            color: #fff;
            text-decoration: none;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        h1 {
            font-size: 4rem;
            line-height: 1;
            color: #171717;

            span {
                color: #12a1fa;
            }

            @media screen and (max-width: 768px) {
                font-size: 2rem;
            }
        }

        p {
            font-size: 1.2rem;
            color: #171717;
        }

        img {
            width: 100%;
            border-radius: 10px;
        }

    }
`

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(29, 66, 255, 0.67);
    align-self: end;
    padding: 0 2rem;
    border-radius: 4rem;
    position: fixed;
    backdrop-filter: blur(10px);
    z-index: 10;
    right: 4%;

    transition: all .4s ease-in-out;
    backdrop-filter: blur(10px);

    .closeIcon {
        display: none;
        cursor: pointer;
    }

    @media screen and (max-width: 700px) {
        position: fixed;
        width: 100%;
        right: 0%;
        padding: 2rem 0;
        border-radius: 0;
        flex-direction: column;
        gap: 2rem;
        box-shadow: 0 5px 23px rgba(0, 0, 0, .3);
        top: ${props => props.isOpen ? '0%' : '-100%'};
        background-color: #000000d4;

        .closeIcon {
            display: block;
            position: absolute;
            right: 2rem;
            top: 1rem;
            font-size: 2rem;
            cursor: pointer;
            color: #fff;
        }

    }

    ul {
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

        li {
            a {
                padding: .1rem .7rem;
                color: #fff;
            }

            a.active {
                background-color: orange;
                border-radius: 40px;
            }
        }


        @media screen and (max-width: 700px) {
            flex-direction: column;
            width: 100%;
            gap: 0;

            li {
                font-size: 1.2rem;
                border-bottom: 1px solid #535151;
                width: 100%;
                display: grid;
                place-items: center;
                padding: 1rem 0;
                cursor: pointer;

                &:hover {
                    color: #151514;
                    background-color: #1463bed4;
                }
            }
        }

        li {
            cursor: pointer;

            &:hover {
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

    .dashboardLink{
        background-color: #fff;
        border-radius: 50px;
        padding: 0.4rem .4rem;
        font-size: .8rem;
        
        .gotoDashboard{
            display: flex;
            align-items: center;
            gap: .5rem;
            color: #333;
        }

    }
    
    a{
        /* color: #ffffff; */
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
    const user = useSelector(state => state.auth.user);

    return (
       <Container id="heroContainer">
            <Header className="header">
                <div className="logo"  id="hero">
                    <Link   to="heroContainer"
                            spy={true}
                            smooth={true}
                            offset={0}
                            duration={500}>
                        <h1>F<span>Vision</span></h1>
                    </Link>
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
                    {!user?
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/register">Register</NavLink>
                    </>
                    :<div className="dashboardLink">
                        <NavLink className='gotoDashboard' to="/dashboard"><MdDashboard/>Dashboard</NavLink>
                    </div>
                }
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
                    <div className="hero-text">
                       {user && <h3><span>Welcome back, </span> {user.username}</h3>}
                        <h1>Know where your <span>money</span> goes.</h1>
                        <p>Track income, expenses, and transactions effortlessly. Gain insights and achieve financial goals.</p>
                        {!user && <NavLink to="/login">Get Started</NavLink>}
                        {user && <NavLink to="/dashboard">Get Back to Dashboard</NavLink>}
                    </div>
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
