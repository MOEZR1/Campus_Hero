import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const UserRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // If no user is logged in or the user is an admin, redirect appropriately
  if (!user) {
    return <Navigate to="/dashboard" replace />;
  } else if (user.isAdmin) {
    return <Navigate to="/AdminDashboard" replace />;
  }

  // If a normal user is logged in, render the children components
  return children;
};

export default UserRoute;
