import Header from "./components/header/Header"
import About from "./pages/About"
import Blog from "./pages/Blog"
import Footer from "./pages/Footer"
import Home from "./pages/Home"
import Login from "./pages/LOgin"
import Register from "./pages/Register"
import Service from "./pages/Services"
import './app.css';


function App() {
  return(
    <>
    <Header/>
    <Home/>
    <Blog/>
    <Service/>
    <About/>
    <Footer/>
    </>
  )
}

export default App
