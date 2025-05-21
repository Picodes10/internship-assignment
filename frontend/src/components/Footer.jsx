import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              InReal
            </Link>
            <p className="mt-4 text-gray-500 text-sm">
              Connecting talented professionals with their dream jobs. Our AI-powered platform
              makes job searching and recruitment smarter and more efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/jobs" className="text-base text-gray-500 hover:text-gray-900">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-base text-gray-500 hover:text-gray-900">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-base text-gray-500 hover:text-gray-900">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:support@inreal.com" className="text-base text-gray-500 hover:text-gray-900">
                  support@inreal.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-base text-gray-500 hover:text-gray-900">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} InReal. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
