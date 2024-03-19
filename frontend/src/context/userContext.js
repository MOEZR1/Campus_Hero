import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return; // Handle missing or invalid token
      }
  
      try {
        const response = await axios.get('/profile', {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        }); 
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
  
    fetchUserProfile(); 
  }, []); // Add token dependency
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
