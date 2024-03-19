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
      toast.success('Contact form submitted successfully!');
    // Clear form input fields
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    } catch (error) {
      console.error(error);
      toast.success('Failed to submit contact form');
    }
  };


  return (
    <div className="container mx-auto p-4"> <br/> <br/> <br/><br/><br/>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-8"> 
          <h2 className="text-4xl font-bold mb-2">How Can We Help You?</h2>
          <p className="text-lg">
            We're here to answer your questions, provide support, and hear your feedback. Please fill out the form.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
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
