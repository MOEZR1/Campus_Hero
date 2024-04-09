//frontend/src/pages/usermanager.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../context/userContext';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('User token:', user.token); // Log the token

        const response = await axios.get('/admin/users', {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error); // Log the error details
        toast.error('Failed to fetch users');
      }
    };
    if (user && user.isAdmin) {
      fetchUsers();
    }
  }, [user]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setUsers(users.filter((u) => u._id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  return (
    <div className="user-manager-container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p className="mb-4">Manage user accounts</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left shadow-md rounded-lg">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2">Username</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="border-b" key={user._id}>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManager;
