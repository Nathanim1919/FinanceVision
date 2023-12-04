import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from "./components/header/Header";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Service from "./pages/Services";
import './app.css';
import { checkAuth } from './features/userAuth/userAuthSlice';
import Faq from "./pages/Faq";

function App() {

    const token = localStorage.getItem('token')
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    console.log(tokenExpiration)
    const isTokenExpired = new Date(tokenExpiration) < new Date();
  

    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [authChecked, setAuthChecked] = useState(false);
    
    
    useEffect(() => {
      const initializeApp = async () => {
          if (isTokenExpired) {
            // Token has expired, remove it from local storage
            localStorage.removeItem('token');
          }
          else{

            if (token){
              await dispatch(checkAuth());
              setAuthChecked(true);
            }
          }
        };

        initializeApp();
  }, [dispatch]);

  if (authChecked) {
    // Return a loading spinner or placeholder while checking authentication
    navigate('/profile')
  }

  return (
    <>
      <Header />
      <Home />
      <Service />
      <Blog />
      <Faq />
      <About />
      <Footer />
    </>
  );
}

export default App;