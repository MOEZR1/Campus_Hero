import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../App.css'; // Make sure you have the CSS file for styling

Modal.setAppElement('#root');

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios.get('/emails') // Make sure the endpoint matches your API.
      .then((response) => {
        setEmails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching emails:', error);
      });
  }, []);

  const openModal = (email) => {
    setSelectedEmail(email);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEmail(null);
  };

  // Function to parse the email text content
  const parseEmailText = (text) => {
    const details = {};
    const lines = text.split('\n');
    lines.forEach((line) => {
      const [key, value] = line.split(': ').map((str) => str.trim());
      if (key && value) {
        details[key.toLowerCase()] = value;
      }
    });
    return details;
  };

  return (
    <div className="email-list">
      {/* Table markup here... */}
      
      <div className="min-h-screen bg-gray-100 p-8">
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow rounded-lg">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="text-left p-4">Date</th>
          <th className="text-left p-4">Email</th>
          <th className="text-left p-4">Subject</th>
          <th className="text-left p-4">Action</th>
        </tr>
      </thead>
      <tbody>
              {emails.map((email, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px' }}>{new Date(email.receivedAt).toLocaleDateString()}</td>
                  <td style={{ padding: '8px' }}>{email.from}</td>
                  <td style={{ padding: '8px' }}>{email.subject}</td>
                  <td style={{ padding: '8px' }}>
                  <button onClick={() => openModal(email)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
{/* Modal structure */}
<Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Email Details"
  className="Modal" /* Reference the CSS class for the modal */
  overlayClassName="Overlay" /* Reference the CSS class for the overlay */
>
  {/* Modal content */}
  <div className="relative w-auto my-6 mx-auto max-w-3xl">
    {/*content*/}
    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
      {/*header*/}
      <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
        <h3 className="text-3xl font-semibold">
          Email Details
        </h3>
        <button
          className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
          onClick={closeModal}
        >
          <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
            ×
          </span>
        </button>
      </div>
      {/*body*/}
      {selectedEmail && (
      <div className="relative p-6 flex-auto">
        {/* Email details go here */}

        {selectedEmail.text && (
              <>
                {Object.entries(parseEmailText(selectedEmail.text)).map(([key, value]) => (
                  <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}</p>
                ))}
                </>
        )}
      </div>
      )}

      {/*footer*/}
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <button
          className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
</Modal>

    </div>
  );
};

export default EmailList;
