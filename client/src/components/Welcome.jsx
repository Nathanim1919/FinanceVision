import React from 'react';
import styled from 'styled-components';
import {
    useSelector
} from 'react-redux';

const WelcomeContainer = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  margin-top: 20px;
`;

const WelcomeMessage = () => {
     const user = useSelector(state => state.userAuth.user);
  return (
    <WelcomeContainer>
      <h2>{user.fullname}, Welcome to Your Financial Assistant App!</h2>
      <p>
        This intelligent financial assistant is here to make managing your finances a breeze. Take advantage of our
        cutting-edge features, including:
      </p>
      <ul>
        <li>Effortlessly track your expenses, incomes, and transactions.</li>
        <li>Set and achieve financial goals with personalized insights.</li>
        <li>Gain deep insights into your financial habits through advanced analytics.</li>
        <li>Utilize AI-powered advice for smart financial decision-making.</li>
        <li>Ask questions and receive personalized recommendations from our AI assistant.</li>
      </ul>
      <p>
        Our AI assistant is here to help you on your financial journey. Whether you need advice, want to explore
        personalized insights, or have questions about your finances, simply ask the assistant for assistance.
        It's like having a financial expert right at your fingertips!
      </p>
      <p>
        Get started by exploring the menu and setting up your financial information. If you have any questions,
        feel free to reach out to our support team.
      </p>
    </WelcomeContainer>
  );
};

export default WelcomeMessage;
