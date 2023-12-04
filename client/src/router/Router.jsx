// Router.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Login from '../features/userAuth/Login';
import Register from '../features/userAuth/Register';
import UserProfile from '../features/userAuth/userProfile';
import AuthenticatedRoute from '../utils/authenticateRoute';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/profile',
      element: <AuthenticatedRoute element={<UserProfile />} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
