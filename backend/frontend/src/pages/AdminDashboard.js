import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Make sure this is the correct path to your CSS file

const AdminDashboard = () => {
  const navigate = useNavigate();

  const navigateToUsers = () => navigate('/userManager'); // Replace with the correct route
  const navigateToInbox = () => navigate('/EmailList'); // Replace with the correct route

  return (
    <div className="admin-dashboard-background px-2 md:lg:xl:px-40 border-t border-b py-20 bg-opacity-10">
           <title>Admin Dashboard</title>

      <div className="grid grid-cols-1 md:lg:xl:grid-cols-2 bg-white shadow-xl shadow-neutral-100 border">
        <div onClick={navigateToUsers}
            className="admin-card p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
            {/* ... Users card content ... */}
            <p class="text-xl font-medium text-slate-700 mt-3">Users</p>
            <p class="mt-2 text-sm text-slate-500">View, Delete and Update current users.</p>
        </div>

        <div onClick={navigateToInbox}
            className="admin-card p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
            {/* ... Inbox card content ... */}
            <p class="text-xl font-medium text-slate-700 mt-3">Inbox</p>
            <p class="mt-2 text-sm text-slate-500">View Inbox</p>

        </div>
      </div>
    </div>  
  );
}

export default AdminDashboard;
