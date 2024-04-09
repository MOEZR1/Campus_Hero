import React from "react";
import { Link } from "react-router-dom"; // Import the Link component

const Footer = () => {
  return (
    <footer className="text-black-600 flex justify-end items-center p-4 fixed bottom-0 w-full">
      <nav aria-label="Footer navigation"> {/* Added nav tag for accessibility */}
        <ul className="list-none mr-4">
          <li className="inline mr-4">
            <Link to="/about" className="text-decoration-none hover:text-black-700 font-bold text-sm">About</Link> 
          </li>
          <li className="inline mr-4">
            <Link to="/faqs" className="text-decoration-none hover:text-black-700 font-bold text-sm">FAQs</Link> 
          </li>
          <li className="inline mr-4">
            <Link to="/contact" className="text-decoration-none hover:text-black-700 font-bold text-sm">Contact Us</Link> 
          </li>
          <li className="inline">
            <Link to="#" className="text-decoration-none hover:text-black-700 font-bold text-sm">#</Link> 
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
