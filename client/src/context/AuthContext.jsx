import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Create context with actual values
export const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    handleLogin: (userData) => {console.log(userData)},
    handleLogout: () => {},
});

// Create a provider for components to consume and subscribe to changes
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/auth/getUser',{withCredentials: true});
            console.log(response.data.data);
            setIsLoggedIn(true);
            console.log("/////////////////////////////////////////////000000000000000000000000000000  ",isLoggedIn)
            setUser(response.data.data); 
          } catch (error) {
            console.error('Error checking authentication:', error);
          }
        };
        checkAuthentication();
    }, []);
      
    const handleLogin = (userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        // Save user data to localStorage (replace with secure storage in a real app)
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        // Remove user data from localStorage
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};