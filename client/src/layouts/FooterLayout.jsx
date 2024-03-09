import React from 'react';
import styled from 'styled-components';
import FooterImage from '/blog/foot.png';
import FooterImage2 from '/blog/footer.png';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa";
import { BsMicrosoftTeams } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";



const Container = styled.div`

@media screen and (max-width:768px){
        padding: 2rem;
    }
`

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: white;
    background-color: blue;
    border-radius: 10px;

    @media screen and (max-width:768px){
        flex-direction: column;
    }

    .links{
        display: grid;
        
        h2{
            width: 100%;
            background-color: #fff;
            padding: 0.5rem 1rem;
            color: #333;
            
        }
    }
    
    >*{
        padding: 2rem;
        flex: 1;
    }

    img{
        width: 100%;
        height: auto;
        object-fit: cover;
    }


`

const Information = styled.div`
    display: flex;
    justify-content: space-between;
    
    
    p{
        display: flex;
        align-items: center;
        gap: 1rem;
        
        >*:nth-child(1){
            width: 13px;
            height: 13px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            background: white;
            color: #333;
            padding: .3rem;
        }
    }
    @media screen and (max-width: 768px) {
        padding: 1rem;
        flex-direction: column;
        
        h3{
            background: #fff;
            color:#333;
            padding:.3rem 1rem;
        }
    }
`

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background: #252424;
    width: 100%;
    padding: 2rem 0;
    margin: 2rem auto;
    border-radius: 20px;
`


const Upper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width:768px){
        flex-direction: column;
        
    }


    img{
        width: 50%;
        height: auto;
        object-fit: cover;

        @media screen and (max-width:768px){
            width: 70%;

        }
        
    }
`

const Footer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
    background-color: #222323;
    
    @media screen and (max-width: 768px){
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
    }

    div div{
        display: flex;
        align-items: center;
        gap: 1rem;

        >*{
            cursor: pointer;

            &:hover{
                color: #12a1fa;
            }
        }
    }
`
const Subscribe = styled.div`
    color: #fff;
    padding: 3rem;

    h2{
        font-size: 2rem;
        
        @media  screen and (max-width: 768px) {
            font-size: 1.3rem;
        }
    }
`

const INputBox = styled.div`
    display: flex;

    input{
        flex: 1;
        //border: 1px solid #4a96ff;
        outline: none;
    }

    button{
        background-color: #4a96ff;
        color: #fff;
        border: 1px solid #4a96ff;
        outline: none;
        cursor: pointer;

        &:hover{
            background-color: #12a1fa;
        }
    }
    
    >*{
        padding:.5rem 1rem;
    }
`
function FooterLayout() {
  return (
    <Container>
        <SubContainer>
            <div>
                <img src={FooterImage} alt="" />
            </div>
            <div className='links'>
                <h2>F-<span>VISION</span></h2>
                <Information>
                    <div>
                        <h3>Quick Links</h3>
                        <p><FaHome/>Home</p>
                        <p><FaServicestack/>Services</p>
                        <p><BsMicrosoftTeams/>About</p>
                        <p><FaBook/>Blog</p>
                        <p><MdContacts/>Contact</p>
                    </div>
                    <div>
                        <h3>Contact US</h3>
                        <p><MdMarkEmailRead/>nathanim2tadele@gmail.com</p>
                        <p><FaPhoneSquareAlt/>0942581962</p>
                        <p><FaLocationDot/>Addis Ababa, Ethiopia</p>
                    </div>
                </Information>
            </div>
        </SubContainer>
        <FooterContainer>
            <Upper>
                <img src={FooterImage2} alt="" />
                <Subscribe>
                    <h2>Subscribe to our newsletter</h2>
                    <INputBox>
                        <input type="text" placeholder="Enter your email" />
                        <button>Subscribe</button>
                    </INputBox>
                </Subscribe>
            </Upper>
            <Footer>
                <div>
                    <p>Follow us on social media</p>
                    <div>
                        <FaFacebook />
                        <FaInstagram />
                        <FaTwitter />
                        <FaLinkedin />
                    </div>
                </div>
                <div>
                    <p>© 2021 F-VISION. All rights reserved.</p>
                </div>
            </Footer>
        </FooterContainer>
    </Container>
  )
}

export default FooterLayout