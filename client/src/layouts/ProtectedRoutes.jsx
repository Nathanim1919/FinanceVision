import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectIsLoggedIn, selectUser, setUser, clearUser } from '../features/auth/authSlice';
import { Loader } from '../components/Loader';

export function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true); // Show loading indicator

      try {
        const response = await axios.get('http://localhost:3000/api/v1/auth/getUser', { withCredentials: true });
        console.log(response.data.data);

        if (response.statusText === 'OK' && response.data.data !== null) {
          dispatch(setUser(response.data.data));
        } else {
          dispatch(clearUser());
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        dispatch(clearUser());
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    };

    checkAuthentication();
  }, [dispatch, navigate]);

  // Conditional rendering based on authentication and loading state
  return (
    <>
      {isLoading ? (
       <Loader/>// Replace with your loading indicator UI
      ) : isLoggedIn ? (
        <Outlet/>
      ) : (
       navigate('/login', {replace: true}) // Redirect to login if not authenticated
      )}
    </>
  );
}
