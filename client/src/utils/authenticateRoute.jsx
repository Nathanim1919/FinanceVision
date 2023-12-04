// AuthenticatedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../features/userAuth/userAuthSlice';

const AuthenticatedRoute = ({ element }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);

  useEffect(() => {
    // Check authentication on component mount
    dispatch(checkAuth());
  }, [dispatch]);

  return isAuthenticated ? element : < Navigate to="/"/>;
};

export default AuthenticatedRoute;