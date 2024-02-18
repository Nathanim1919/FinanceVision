import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export const EmailVerified = () => {
  const navigate = useNavigate();
  const { unHashedToken } = useParams();
  console.log("VErification code is")
  console.log(unHashedToken)

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/auth/verify-email/${unHashedToken}`);
        // Handle successful verification, e.g., update context state
        console.log(response.data.message);
      } catch (error) {
        // Handle verification failure, e.g., display an error message
        console.error('Email verification failed:', error.message);
      } finally {
        // Navigate to the login page after verification (success or failure)
        navigate('/login');
      }
    };
    verify();
  }, [unHashedToken, navigate]);

  return (
    <div>
      <h1>Email Verification in Progress...</h1>
      <p>Please wait while we verify your email address.</p>
    </div>
  );
};
