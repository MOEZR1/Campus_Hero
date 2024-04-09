// src/components/AdminRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user || !user.isAdmin) {
    // Instead of navigating to "/login", you can show an alert or redirect to an error page
    return <Navigate to="/dashboard" replace />;
    
  }

  return children;
};

export default AdminRoute;