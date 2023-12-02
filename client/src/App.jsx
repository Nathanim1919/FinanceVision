import react, {useEffect} from 'react';
import Header from "./components/header/Header";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import Service from "./pages/Services";
import './app.css';
import Faq from "./pages/Faq";
import {useDispatch} from 'react-redux';
import { initializeAuth } from './features/userAuth/userAuthSlice';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the initializeAuth action during application initialization
    dispatch(initializeAuth());
  }, [dispatch]);
  return(
    <>
    <Header/>
    <Home/>
    <Service/>
    <Blog/>
    <Faq/>
    <About/>
    <Footer/>
    </>
  )
}

export default App
