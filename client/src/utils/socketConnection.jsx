import React, { createContext } from 'react';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    // const socket = io('https://financevision-2.onrender.com');
    const socket = io('http://localhost:3000');
  
    return (
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    );
  };