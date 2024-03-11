import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { selectIsLoggedIn, selectUser, setUser, clearUser } from '../features/auth/authSlice';
import { Loader } from '../components/Loader';
import styled from 'styled-components';
import { BASE_URL } from '../utils/Api';

export function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); 
  const user = useSelector(selectUser);

  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true); 

      if (user) {
        setIsLoading(false); 
        return;
      }
      
      try {
        const token = localStorage.getItem('accessToken');
        console.log('token:', token);
        const response = await axios.get(`${BASE_URL}/api/v1/auth/getUser`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        });
        console.log('.................................................')
        console.log(response.data)
        if (response.data.data !== null) {
          dispatch(setUser(response.data.data));
        } else {
          dispatch(clearUser());
          navigate('/login', { replace: true });
        }
      } catch (error) {
        dispatch(clearUser());
        navigate('/login', { replace: true });
      } finally {
        setIsLoading(false); 
      }
    };

    checkAuthentication();
  }, [dispatch, navigate]);

  return (
    <Container>
      {isLoading ? (
       <Loader/>
      ) : isLoggedIn ? (
        <Outlet/>
      ) : (
       navigate('/login', {replace: true})
      )}
    </Container>
  );
}



const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`