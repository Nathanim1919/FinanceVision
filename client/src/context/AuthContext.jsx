import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';


// Create context with actual values
export const AuthContext = createContext({
    isLoggedIn: false,
    user: null,
    handleLogin: (userData) => {console.log(userData)},
    handleLogout: () => {},

});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // Simulate authentication (replace with your actual logic)
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const storedUser = localStorage.getItem('user');

                if (storedUser) {
                    setIsLoggedIn(true);
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
            }
        };
        checkAuthentication().then(r => console.log(r));
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
