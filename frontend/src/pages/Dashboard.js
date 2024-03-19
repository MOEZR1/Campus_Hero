import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return (
    <div>
      <h1>Welcome to your Dashboard, {user.username}!</h1>
      {/* ... your dashboard content ... */}
    </div>
  );
};

export default Dashboard;
