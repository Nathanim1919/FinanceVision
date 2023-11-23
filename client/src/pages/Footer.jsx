import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px;
`;

const FooterContent = styled.div`
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const FooterLinks = styled.div`
  margin-top: 15px;

  a {
    color: #007bff;
    margin: 0 10px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactInfo = styled.div`
  margin-top: 15px;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; 2023 Your Financial Assistance Platform. All rights reserved.</FooterText>
        <FooterLinks>
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/blog">Blog</a>
          <a href="/contact">Contact</a>
        </FooterLinks>
        <ContactInfo>
          <p>Contact us: info@yourfinancialplatform.com</p>
          <p>123 Main Street, Cityville, Country</p>
        </ContactInfo>
      </FooterContent>
    </FooterContainer>
  );
}

export default Footer;
