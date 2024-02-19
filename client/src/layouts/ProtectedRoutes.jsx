import {useAuth} from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export function ProtectedRoutes({ children }) {
    const { isLoggedIn, user} = useAuth();
    console.log("////////////////\\\\\\\\\\\\\\\\\|||||||||||||||||   ",user)
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/login', { replace: true })
      }
      else {
        navigate('/dashboard', { replace: true })
      }
    }, [isLoggedIn]);
  
    return <>{children}</>; // Render child components
  }