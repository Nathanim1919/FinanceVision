import { Link } from "react-router-dom";
export const Home = () => {
    return (
        <>
            <div>
                <h1>HOME PAGE</h1>
                <Link to={'/login'}>login</Link>
                <Link to={'/register'}>sign up</Link>
            </div>
        </>
    )
};