import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
  }

  input {
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const GoogleButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #555;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  img {
    width: 20px;
    margin-right: 10px;
  }

  &:hover {
    background-color: #f8f9fa;
  }
`;

const NeedAnAccount = styled.p`
  text-align: center;
  margin-top: 20px;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
      color: #0056b3;
    }
  }
`;

function Login() {
  return (
    <LoginContainer>
      <Title>Login to Your Account</Title>
      <Form>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Log In</button>
      </Form>

      <GoogleButton>
        <img src="https://example.com/google-icon.png" alt="Google Logo" />
        Log In with Google
      </GoogleButton>

      <NeedAnAccount>
        Need an account? <a href="/register">Sign up</a>
      </NeedAnAccount>
    </LoginContainer>
  );
}

export default Login;
