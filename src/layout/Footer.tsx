import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-gray-500">&copy; 2024 EduPortal. All rights reserved.</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-500 hover:text-gray-900">
              About
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-900">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-500 hover:text-gray-900">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;