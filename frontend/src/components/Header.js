// Header.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import logoImage from '../images/logo2.png';
import memberImage from '../images/man4.png';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.post('/logout');
      setUser(null);
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to logout');
    }
    closeMenu(); // Close the menu after logout

  };


  
  const renderLinks = () => {
    if (user) {
      if (user.isAdmin) {
        // Admin-specific links
        return (
          <>
            <Link to="/AdminDashboard" onClick={closeMenu}className={`nav-link ${currentPage === '/AdminDashboard' ? 'active' : ''}`}>Admin Dashboard</Link>
            {/* More admin links can be added here */}
          </>
        );
      } else {
        // Regular user links
        return (
          <>
          <Link to="/dashboard" onClick={closeMenu} className={`nav-link ${currentPage === '/dashboard' ? 'active' : ''}`}>
            Dashboard
          </Link>
            <Link to="/habit-tracking" onClick={closeMenu}className={`nav-link ${currentPage === '/habit-tracking' ? 'active' : ''}`}>Habit Tracking</Link>
            <Link to="/deadlines" onClick={closeMenu}className={`nav-link ${currentPage === '/deadlines' ? 'active' : ''}`}>Deadlines</Link>
            <Link to="/resource-hub" onClick={closeMenu}className={`nav-link ${currentPage === '/resource-hub' ? 'active' : ''}`}>Resource Hub</Link>
            {/* More user links can be added here */}
          </>
        );
      }
    } else {
      // Links for guests
      return (
        <>
          <Link to="/login" onClick={closeMenu}className="nav-link login-button">Login</Link>
          <Link to="/register" onClick={closeMenu} className="nav-link signup-button">Sign Up</Link>

        </>
      );
    }
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const currentPage = window.location.pathname;

  return (
    <header className="bg-gray-100 fixed w-full z-10 top-0 shadow-md">
      <div className="max-w-6xl mx-auto px-5 lg:px-0 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="Company Logo" className="h-10 w-auto mr-3" />
        </Link>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          <div className="space-y-2">
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
            <span className="block w-8 h-0.5 bg-gray-600"></span>
          </div>
        </button>
        <div className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-gray-100 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${isMenuOpen ? 'top-16' : 'top-[-490px]'}`}>
          {renderLinks()}
          {user && (
        <div className="flex items-center space-x-4">
        <Link to="/profile" onClick={closeMenu}className="nav-link">
                <img
    src={user.avatar || memberImage}
    alt="User avatar"
    className="rounded-full h-8 w-8"
                />
              </Link>
              <button onClick={logout}  className="nav-link bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
