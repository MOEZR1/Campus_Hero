import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';


const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send form data to backend API
      await axios.post('/contact', { name, email, phone, company, message });
      toast.error('Contact form submitted successfully!');
    // Clear form input fields
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    } catch (error) {
      console.error(error);
      toast.success('Contact form submitted successfully!');
    }
  };


  return (
    <div className="bg-white font-[Reem Kufi] text-[#333]"> 
            <title>Contact Us</title>

            <div className="min-h-screen flex fle-col items-center justify-center lg:p-10 p-4 grid md:grid-cols-2 items-center gap-10 max-w-2x3 w-full"> 
          {/* Container for the welcome message */}
          <div className="max-md:text-center">
            {/* Heading for the welcome message */}
            <h2 className="text-6xl font-bold lg:leading-[50px] text-black mb-4">
            Let's Get In Touch! 
          </h2>
            {/* Subtitle for the welcome message */}
            <p className="text-lg mb-4">
            Fill out the form, and we'll reach out soon. We appreciate your interest in <span style={{ color: 'blue' }}>Campus Habit Hero</span>.
          </p>
          </div>


          <form onSubmit={handleSubmit} className="bg-[#F2F2F2] rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto max-md:mx-auto w-full shadow-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
               Name
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                id="name" 
                type="text" 
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3"> 
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
               Email
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="email" 
                type="email" 
                placeholder="jane.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="phone" 
                type="text" 
                placeholder="(555) 555-5555"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="company">
                Company
              </label>
              <input 
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="company" 
                type="text" 
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="message">
                Message
              </label>
              <textarea 
                className="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                id="message" 
                rows="4"
                placeholder="Enter your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-6">
            <div className="w-full px-3">
              <button 
                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
                type="submit"
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
