// src/components/UserRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const UserRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user || user.isAdmin) {
    return <Navigate to="/AdminDashboard" replace />;
  }

  return children;
};

export default UserRoute;