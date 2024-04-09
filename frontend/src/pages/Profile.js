import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
  const { user, setUser} = useContext(UserContext); // Add setUser here
  const [editMode, setEditMode] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [avatar, setAvatar] = useState(null); // Add a new state for avatar file

  useEffect(() => {
    // Only set state if user is not null
    if (user) {
      setEditedUsername(user.username);
      setEditedEmail(user.email);
    }
  }, [user]);

  // Ensure that user is not null before attempting to save
  const handleSave = async () => {
    if (!user) {
      toast.error('No user data available.');
      return;
    }
  
    try {
      const response = await axios.put('/profile', {
        username: editedUsername,
        email: editedEmail
      }, {
        withCredentials: true,
        headers: { 'Authorization': `Bearer ${user.token}` }, // Assuming you store the token in the user context
      });
  
      // Check if we received an updated user object
      if (response.data) {
        // Update the user context with the new information
        setUser({ ...user, ...response.data });
  
        // Now user context has the updated data, the profile will re-render automatically
        toast.success('Profile updated successfully');
      } else {
        // If the data is not in the expected format, log the response for debugging
        console.error('Unexpected response format:', response);
      }
  
      // Exit edit mode
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile', error);
      toast.error('Failed to update profile');
    }

    
    return <div>Loading user data...</div>; // Render a loading state
  };
 
  
  return (
    <div className="profile-container"> 
            <title>Profile</title>

      {/* Profile Section */}
      <div className="profile-block">
            {/* Avatar Section */}

        <h2 className="text-xl font-bold mb-2">Profile</h2>
        <div className="space-y-4">
          {editMode ? (
            <>
              <div>
                <label className="text-gray-700">Username</label>
                <input
                  type="text"
                  className="border rounded w-full p-2"
                  value={editedUsername}
                  onChange={(e) => setEditedUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="text-gray-700">Email</label>
                <input
                  type="email"
                  className="border rounded w-full p-2"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-gray-700">Username</label>
                <p className="border rounded p-2">{user.username}</p>
              </div>
              <div>
                <label className="text-gray-700">Email</label>
                <p className="border rounded p-2">{user.email}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="profile-actions">
          {editMode ? (
            <>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setEditMode(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div> 
  ); 
};

export default Profile;
