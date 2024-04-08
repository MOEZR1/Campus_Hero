import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';


const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

// Only useParams is needed here, not useSearchParams
const { token } = useParams();

const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    toast.error('Passwords do not match.');
    return;
  }
  try {
    // Use the token from useParams directly
    await axios.put(`/api/reset-password/${token}`, { password }); // Note the `/api` prefix if your routes use it
    toast.success('Password has been reset successfully');
    navigate('/login');
  } catch (error) {
    toast.error(error.response?.data?.message || 'Could not reset password, please try again.');
  }
};

  return (
    <div className="bg-white font-[Reem Kufi] text-[#333]">
           <title>Reset Password</title>

      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
      <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div className="max-md:text-center">
            <h2 className="text-6xl font-bold lg:leading-[50px] text-black mb-4">
              Reset Password
            </h2>
            <p className="text-lg mb-4">
              <span className="text-blue-600">That's the time</span> to reset your password!
            </p>
          </div>
        <form onSubmit={handleSubmit} className="bg-[#F2F2F2] rounded-xl px-6 py-8 space-y-6 max-w-md w-full shadow-lg">
        <h3 className="text-lg font-bold mb-2 text-center">
              Enter new password
            </h3>
          <label htmlFor="password" className="block mb-2 font-bold">New Password:</label>
          <input
            type="password"
            id="password"
            className="bg-white w-full text-sm px-4 py-3.5 rounded-md outline-none border border-[#000000] mb-4"
            value={password}
            placeholder="**********"

            onChange={handlePasswordChange}
            required
          />
          <label htmlFor="confirmPassword" className="block mb-2 font-bold">Confirm New Password:</label>
          <input
            type="password"
            id="confirmPassword"
            className="bg-white w-full text-sm px-4 py-3.5 rounded-md outline-none border border-[#000000]"
            value={confirmPassword}
            placeholder="**********"

            onChange={handleConfirmPasswordChange}
            required
          />
          <button
            type="submit"
            className="mt-4 w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-black border border-black hover:bg-[#222] focus:outline-none"
          >
            Reset Password
          </button>
        </form>
        </div>

      </div>
    </div>
  );
};

export default PasswordReset;
