// Router.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from '../App';
import Login from '../features/userAuth/Login';
import Register from '../features/userAuth/Register';
import UserProfile from '../features/userAuth/userProfile';
import AuthenticatedRoute from '../utils/authenticateRoute';
import Transaction from '../features/financialData/Transaction';
import Incomes from '../features/financialData/Incomes';
import Expenses from '../features/financialData/Expenses';
import Goals from '../features/financialData/Goals';
import DataAnalytics from '../features/financialData/DataAnalaytics';
import DashBoard from '../features/financialData/DashBoard';
import FinancialNotifications from '../features/financialData/Notification';
import WelcomeMessage from '../components/Welcome';

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
      element: (
        <AuthenticatedRoute element={<UserProfile />}>
          <Outlet /> {/* Place Outlet here */}
        </AuthenticatedRoute>
      ),
      children: [
        {
          path:'',
          element:<WelcomeMessage/>
        },
        {
          path: 'dashboard', // This is the default child route, e.g., '/profile'
          element: <DashBoard />,
        },
        {
          path: 'transactions',
          element: <Transaction />,
        },
        {
          path: 'goals',
          element: <Goals />,
        },
        {
          path: 'analaytics',
          element: <DataAnalytics />,
        },
        {
          path: 'incomes',
          element: <Incomes />,
        },
        {
          path: 'expenses',
          element: <Expenses/>,
        },
        {
          path:'notifications',
          element:<FinancialNotifications/>
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;