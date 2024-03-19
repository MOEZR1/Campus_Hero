import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/register', data); // Assuming you have a /register backend route

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success('Registration Successful! Please log in now.');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Registration failed. Please try again.');  // Handle errors gracefully
    }
  };
  
  return (
    // Main container with background color, font, and text color
    <div className="bg-white font-[Reem Kufi] text-[#333]">
      {/* Container for the register form, centered on the screen */}
      <div className="min-h-screen flex fle-col items-center justify-center lg:p-6 p-4">
        {/* Grid layout for the welcome message and the register form */}
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          {/* Container for the welcome message */}
          <div className="max-md:text-center">
            {/* Heading for the welcome message */}
            <h2 className="text-6xl font-bold lg:leading-[50px] text-black mb-4">
            Create an account!
            </h2>
            {/* Subtitle for the welcome message */}
            <p className="text-lg mb-4">
              Create your free account and experience everything{' '}
              <span style={{ color: 'blue' }}>Campus Habit Hero</span> has to offer.
            </p>
          </div>





                <form onSubmit={registerUser} className="bg-[#F2F2F2] rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full shadow-lg">

                  {/* Informational message and login link */}
                  <p className="text-black-500 text-sm text-center mb-4">
                    Enter your account details below or <a href="/login" className="font-medium text-primary-600 underline">log in</a>
                  </p>
                  {/* Input field for username */}
                  <div className="mb-6">
                    <label htmlFor="username" className="text-xs font-semibold px-1 block">Username</label>
                    <input
                      type="text"
                    
                      className="bg-white-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333] border border-[#000000]"
                      placeholder="Username"
                      value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
                  </div>
                  {/* Input field for email */}
                  <div className="mb-6">
                    <label htmlFor="email" className="text-xs font-semibold px-1 block">Email</label>
                    <input
                      type="email"
                      autoComplete="email"
                      required
                      className="bg-white-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333] border border-[#000000]"
                      placeholder="example@youremail.com"
                      value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                    
                  </div>
                  {/* Input field for password */}
                  <div className="mb-6">
                    <label htmlFor="password" className="text-xs font-semibold px-1 block">Password</label>
                    <input
                      type="password"
                      className="bg-white-100 w-full text-sm px-4 py-3.5 rounded-md outline-[#333] border border-[#000000]"
                      placeholder="********"
                      value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                  </div>
                  {/* Submit button */}
                  <div className="mb-6">
                    <button className="block w-full max-w-xs mx-auto bg-black hover:bg-gray-800 text-white rounded-lg px-3 py-3 font-semibold" type="submit">Register</button>
                  </div>
                  {/* Forgot password link */}
                  <div className="text-sm text-center mt-2">
                    <a href="#" className="text-black underline font-bold">
                    Forgot your password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>

  );
};

// Export Register component
export default Register;
