import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  selectIsLoggedIn,
  selectUser,
  setUser,
  clearUser,
} from "../features/auth/authSlice";
import { Loader } from "../components/Loader";
import styled from "styled-components";
import { BASE_URL } from "../utils/Api";

export function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(selectUser);

  // Configure Axios to send cookies with requests

  /*
    Check if the user is authenticated, if not redirect to the login page, else render the protected routes
    This is done by making a request to the server to get the user data.
    If the user is authenticated, the server will return the user data, else it will return null or an error.
  */
  useEffect(() => {
    const checkAuthentication = async () => {
      setIsLoading(true);

      if (user) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/api/v1/auth/getUser`, {
          withCredentials: true,
        });

        if (response.data.data !== null) {
          dispatch(setUser(response.data.data));
        } else {
          dispatch(clearUser());
          navigate("/login", { replace: true });
        }
      } catch (error) {
        dispatch(clearUser());
        navigate("/login", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [dispatch, navigate]);

  /*
    Display a loader while the user authentication is being checked
    If the user is authenticated, render the protected routes
    If the user is not authenticated, redirect to the login page
  */

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : isLoggedIn ? (
        <Outlet />
      ) : (
        navigate("/login", { replace: true })
      )}
    </Container>
  );
}

// Styles
const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
