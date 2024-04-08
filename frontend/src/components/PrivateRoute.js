// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext'; // Adjust the import path to your UserContext

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    // If there's no user logged in, redirect to the login page, but save the
    // intended location they were trying to access.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, display the children components (the protected routes)
  return children;
};

export default PrivateRoute;
