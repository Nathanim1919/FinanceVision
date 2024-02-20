import React from 'react';
import styled from 'styled-components';
import FooterImage from '../../public/blog/foot.png';
import FooterImage2 from '../../public/blog/footer.png';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Container = styled.div`
    /* background-color: #1f1c1c; */
`

const SubContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: white;
    background-color: blue;
    border-radius: 10px;

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
`

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    color: white;
    `


const Upper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;


    img{
        width: 40%;
        height: auto;
        object-fit: cover;
    }
`

const Footer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 1rem 0;
    background-color: #222323;

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
    color: #333;
    padding: 3rem;
    background-color: #efead8;

    h2{
        font-size: 2rem;
    }
`

const INputBox = styled.div`
    display: flex;

    input{
        flex: 1;
        border: 1px solid #4a96ff;
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
                        <p>Home</p>
                        <p>Services</p>
                        <p>About</p>
                        <p>Blog</p>
                        <p>Contact</p>
                    </div>
                    <div>
                        <h3>Contact US</h3>
                        <p>nathanim2tadele@gmail.com</p>
                        <p>0942581962</p>
                        <p>Addis Ababa, Ethiopia</p>
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