// user.js
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'; // Or your preferred table library

function User() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Columns for your data table
  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Username', selector: row => row.username, sortable: true },
    // ... add more columns for email, status, etc.
    {
      name: 'Actions',
      cell: (row) => (
        <div className="flex justify-end gap-4">
          <button onClick={() => handleDelete(row.id)}>Delete</button>
          <button onClick={() => handleEdit(row.id)}>Edit</button>
          {/* Add buttons for activate/deactivate as needed */}
        </div>
       ),
    },
  ];

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users');  
      if (!response.ok) {
        throw new Error('Something went wrong fetching users');
      }

      const data = await response.json();
      setUsers(data); 
    } catch (error) {
      setError(error.message);  
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    fetchUsers(); 
  }, []); 

  const handleDelete = (userId) => {
    // Implement delete logic to send a DELETE request to your /api/users/{userId} endpoint
  };

  const handleEdit = (userId) => {
    // Implement edit logic (likely redirect the user to an edit form)
  };

  return (
    <div className="container w-full md:w-4/5 mx-auto px-2">
      {/* Title, Add New Admin button, etc. ... */}
      {isLoading && <p>Loading users...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      <DataTable 
        columns={columns} 
        data={users}
        // ... add other DataTable props for pagination, styling, etc.
      /> 
    </div>
  );
}

export default User;
