import React,{useState} from 'react';
import styled from 'styled-components';
import faqImage from '../../src/assets/faq.jpg'
import {
    FaCircleCheck
} from "react-icons/fa6";
import {
    IoIosArrowDown,
    IoIosArrowUp
} from "react-icons/io";

const FaqContainer = styled.div`
  width:80vw;
  margin: 5rem auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap:2rem;

  img{
    width:100%;
  }
  >.container{

      h4{
        display: grid;
        grid-template-columns: .001fr .9fr .1fr;
        align-items: center;
        gap: 2rem;
      }

  }
`;

const FaqList = styled.ul`
  list-style: none;
  padding: 0;
  `;

const FaqItem = styled.li`
  margin-bottom: 20px;
  cursor: pointer;
  
  &:hover{
    opacity: .8;
  }
`;
const Answer = styled.p `
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  width: 90%;
  padding:0 1rem;
  font-size: .9rem;
`;

function Faq() {
  const faqData = [
    {
      question: 'What does your platform offer for financial tracking?',
      answer: 'Our platform leverages cutting-edge AI assistance, specifically Generative AI, to provide individuals and organizations with powerful tools for seamless and intelligent financial tracking.',
    },
    {
      question: 'How does AI assistance enhance financial management?',
      answer: 'The Generative AI on our platform automates and streamlines financial tracking processes, offering personalized insights, predictions, and recommendations to optimize your financial decision-making.',
    },
    {
      question: 'Can I trust the security of my financial data on your platform?',
      answer: 'Absolutely. We prioritize the security of your data. Our platform employs robust encryption and follows industry best practices to ensure the confidentiality and integrity of your financial information.',
    },
    {
      question: 'Is there a learning curve for using the AI features?',
      answer: 'Not at all. Our platform is designed for user-friendly interactions. The AI assistance is intuitive, making it easy for users to harness its power for effective financial management.',
    },
    {
      question: 'What makes your financial tracking solution unique?',
      answer: 'Our platform stands out by seamlessly integrating Generative AI into financial tracking. This unique approach ensures a personalized and intelligent experience, setting us apart from traditional solutions.',
    },
    {
      question: 'How can I access the latest financial insights and tips?',
      answer: 'Stay informed by exploring our regularly updated blog section. Our blogs cover a range of financial topics, providing valuable insights and tips for both individuals and organizations.',
    },
    {
      question: 'Is there a trial period to experience the platform\'s capabilities?',
      answer: 'Yes, we offer a [length of free trial] free trial. It\'s an opportunity to experience firsthand how our platform, with its AI assistance and blog resources, can enhance your financial tracking and decision-making.',
    },
    {
      question: 'Can I customize the AI assistance for my specific financial needs?',
      answer: 'Absolutely. Our platform allows you to tailor the AI assistance to address your unique financial requirements, ensuring a personalized and efficient experience.',
    },
    {
      question: 'How can I get support if I have questions or encounter issues?',
      answer: 'Our dedicated customer support team is available [mention hours/days] to assist you. Whether you have questions about the AI features or need general assistance, we\'re here to help.',
    },
    {
      question: 'Is there ongoing training available for using the platform effectively?',
      answer: 'Yes, we provide comprehensive training resources, including video tutorials and user guides. Our goal is to empower users to maximize the benefits of AI assistance and effectively manage their finances.',
    },
  ];


   const [openIndex, setOpenIndex] = useState(null);

   const handleQuestionClick = (index) => {
       setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
   };

   return (
    <FaqContainer>
      <div className='container'>
            <h2>Frequently Asked Questions (FAQs)</h2>
            <FaqList>
                {faqData.map((faq, index) => (
                <FaqItem key={index} onClick={() => handleQuestionClick(index)}>
                    <h4><FaCircleCheck/>{faq.question}{!(openIndex === index)?<IoIosArrowDown/>:<IoIosArrowUp/>}</h4>
                    <Answer isOpen={openIndex === index}>{faq.answer}</Answer>
                </FaqItem>
                ))}
            </FaqList>
      </div>
        <div>
            <img src={faqImage} alt=''/>
        </div>
    </FaqContainer>
  );
}

export default Faq;
