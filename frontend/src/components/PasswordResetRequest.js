import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');

  const sendPasswordResetEmail = async (event) => {
    event.preventDefault();
    try {
      // Make the API call to your backend service
      const response = await axios.post('/api/forgotPasswordRequest', { email }); // Updated URL
      if (response.status === 200) {
        // Show success message
        toast.success('Reset link sent to your email');
      }
    } catch (error) {
      // Handle errors, e.g. showing a notification with error.response.data.message
      toast.error(error.response?.data?.message || 'Failed to send reset link'); 
    }
  };

  return (
    <div className="bg-white font-[Reem Kufi] text-[#333]">
      <title>Forgot Password</title>
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="max-md:text-center">
            <h2 className="text-6xl font-bold lg:leading-[50px] text-black mb-4">
              Forgot Your Password
            </h2>
            <p className="text-lg mb-4">
              <span className="text-blue-600">Don't worry,</span> We got you
            </p>
          </div>
          <form onSubmit={sendPasswordResetEmail} className="bg-[#F2F2F2] rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full shadow-lg">
            <h3 className="text-lg font-bold mb-2 text-center">
              Enter your email to reset your password.
            </h3>
            <div>
              <input
                type="email"
                autoComplete="email"
                required
                className="bg-white w-full text-sm px-4 py-3.5 rounded-md outline-none border border-[#000000]"
                placeholder="example@youremail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-black border border-black hover:bg-[#222] focus:outline-none"
              >
                Send Reset Link
              </button>
            </div>
            <div className="text-sm text-center mt-2">
              <a href="/login" className="text-black underline font-bold">
                Back to login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
