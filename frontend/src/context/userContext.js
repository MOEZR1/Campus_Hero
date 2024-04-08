import axios from 'axios';
import React, { createContext, useState, useEffect, useCallback } from 'react';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Start with no user logged in
  const [loading, setLoading] = useState(true); // Introduce loading state

  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null); // Ensure user is set to null if there is no token
      setLoading(false); // Loading is complete
      return;
    }

    try {
      const response = await axios.get('/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data); // Set user with the response from the server
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null); // Ensure user is set to null if fetching fails
    }
    setLoading(false); // Loading is complete, whether the fetch was successful or not
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const login = async (token) => {
    localStorage.setItem('token', token);
    await fetchUserProfile(); // Re-fetch user profile after login
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null); // Clear user state on logout
    setLoading(false); // Ensure loading state is false after logout
  };

  if (loading) {
    // Here you might want to return a loading spinner or similar
    return <div>Loading...</div>;
  }

  // Providing login and logout methods via context to be used throughout your application
  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
