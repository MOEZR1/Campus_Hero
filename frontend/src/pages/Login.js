import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext'; 

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();


  const [data, setData] = useState({
    email: '',
    password: '',
  });


  const loginUser = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/login', data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        // Call the login function with the user data
        await login(response.data); // Ensure this is an async call so that context updates
  
        // After the context updates, redirect based on the user type
        if (response.data.isAdmin) {
          toast.success('Admin Login Successfully! Welcome!');
          navigate('/AdminDashboard'); // Redirect to Admin Dashboard
        } else {
          toast.success('Login Successfully! Welcome!');
          navigate('/dashboard'); // Redirect to standard Dashboard
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please try again.');
    }
  };
  

  return (
    
    // Main container with background color, font, and text color
    <div className="bg-white font-[Reem Kufi] text-[#333]">
            <title>Login</title>

      {/* Container for the login form, centered on the screen */}
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        {/* Grid layout for the welcome message and the login form */}
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          {/* Container for the welcome message */}
          <div className="max-md:text-center">
            {/* Heading for the welcome message */}
            <h2 className="text-6xl font-bold lg:leading-[50px] text-black mb-4">
              Welcome back!
            </h2>
            {/* Subtitle for the welcome message */}
            <p className="text-lg mb-4">
              <span className="text-blue-600">Sign in</span> for full access
            </p>
          </div>





          {/* Container for the login form */}

          <form onSubmit={loginUser} className="bg-[#F2F2F2] rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full shadow-lg">
            {/* Heading for the login form */}
            <p className="text-black-900 text-sm text-center mb-4">
                    Enter your account details below or <a href="/register" className="font-medium text-primary-600 underline">Register</a>
                  </p>
            {/* Input field for email */}
            <div>
              <input
                type="email"
                autoComplete="email"
                required
                className="bg-white-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333] border border-[#000000]"
                placeholder="example@youremail.com"
                value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>

              
            </div>
            {/* Input field for password */}
            <div>
              <input
              
                type="password"
                autoComplete="current-password"
                required
                className="bg-white-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333] border border-[#000000]"
                placeholder="********"
                value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>

            </div>
            {/* Button to submit the login form */}
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-black border border-black hover:bg-[#222] focus:outline-none"
              >
                Log in
              </button>
            </div>
            {/* Forgot password link */}
            <div className="text-sm text-center mt-2">
              <a href="/forgotPassword" className="text-black underline font-bold">
                Forgot your password?
              </a>
            </div>
            {/* Placeholder button with no functionality */}
            <div className="space-x-6 flex justify-center">
              <button type="submit" className="border-none outline-none"></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

