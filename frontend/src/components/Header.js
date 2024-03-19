import React, { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { UserContext } from '../context/userContext';
import '../App.css'; // Adjust the path if your App.css is in a different location


function Header() {
  const { user, setUser } = useContext(UserContext);
  console.log('Header Rendered: User state is:', user); // *** Add this line ***

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      toast.error('Failed to logout');
    }
  };


  return (
    <div key={user ? user._id : 'logged-out'}>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 shadow-lg rounded-bl-3xl rounded-br-3xl ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={process.env.PUBLIC_URL + 'public/Logo.png'}
              className="h-8"
              alt="CampusHabitHero Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </Link>
          <div className="flex items-center space-x-3 md:space-x-0 rtl:space-x-reverse header-links">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Dashboard
                </Link>
                <Link
                  to="/habit-tracking"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Habit Tracking
                </Link>
                <Link
                  to="/deadlines"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Deadlines
                </Link>
                <Link
                  to="/contact"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Contact 
                </Link>
                <Link
                  to="/resource-hub"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                >
                  Resource Hub
                </Link>

                <button
                  onClick={logout}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 header-links"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 header-links"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 header-links"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
