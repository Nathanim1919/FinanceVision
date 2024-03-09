import React, { useState } from 'react';
import FAQImage from '/images/faq.png';
import styled from 'styled-components';
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaHandPointRight } from "react-icons/fa";


const Container = styled.div`
    display: grid;
    place-items: center;
    padding: 2rem;
`

const SubContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr .6fr;
    place-items: center;

    @media screen and (max-width:768px){
        grid-template-columns: 1fr;
    }

    h2{
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;

        @media screen and (max-width:768px){
            font-size: 1rem;
        } 

        &:hover{
            color: #8f9293;
        }
    }

    p{
        opacity: .8;
        width: 80%;
        position: relative;
        left: 5%;
        display: flex;
        align-items: flex-start;
        gap: .5rem;


        *:nth-child(1){
            font-size: 3rem;
        }
    }


    img{
        width: 100%;
        height: auto;
        object-fit: cover;
    }

`

export const FAQs = () => {
    const faqArray = [
        {
          question: "What data does your service collect?",
          answer: "We collect financial data you provide voluntarily (income, expenses, transactions) and anonymize it for analysis. We may also collect usage data to improve our service.",
        },
        {
          question: "Is my data secure?",
          answer: "Yes, we employ bank-grade security measures to protect your data, including encryption, multi-factor authentication, and regular security audits. We adhere to strict data privacy regulations to ensure your information is safe and secure.",
        },
        
        {
          question: "Where can I learn more about your features?",
          answer: "Visit our website for detailed feature descriptions, explore our help center for tutorials, or contact our support team for personalized assistance.",
        },
        {
          question: "How can I track my expenses?",
          answer: "Use our intuitive expense tracker to categorize and analyze your spending by categories, vendors, or time periods. Generate reports and set budgets to optimize your finances.",
        },
        {
          question: "How do I set financial goals?",
          answer: "Our goal-setting tool allows you to create specific, measurable, achievable, relevant, and time-bound financial goals. Track progress visually, receive reminders, and adjust your goals as needed.",
        },
       
        {
          question: "What kind of reports do you offer?",
          answer: "Generate customizable reports to analyze income, expenses, net worth, cash flow, and spending trends. Identify areas for improvement and make informed financial decisions based on clear data insights.",
        },
       
      ];

    const [showAnswer, setShowAnswer] = React.useState(false);
    const [id, setId] = useState(null)
      
    return (
        <Container id='faqs'>
            <h1>Frequently Asked Questions</h1>
            <SubContainer>
                <div>
                    {faqArray.map((faq, index) => (
                        <div key={index}>
                            <h2 onClick={()=>setId(index)}><FaRegQuestionCircle/>{faq.question}{id !== index?<IoIosArrowDown/>:<IoIosArrowUp/>}</h2>
                            {id === index && <p><FaHandPointRight/>{faq.answer}</p>}
                        </div>
                    ))}
                </div>

                <div>
                    <img src={FAQImage} alt="FAQs" />
                </div>

            </SubContainer>
        </Container>
    )
}