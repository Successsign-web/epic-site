import React from 'react';
import { Ban, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Rejected = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <Ban className="w-20 h-20 text-red-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Application Rejected</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We regret to inform you that your vendor application has been rejected. This decision is final, but you may contact us if you believe there has been an error.
        </p>
        <div className="space-y-4">
          <Link
            to="/contact-us"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700 transition-all"
          >
            <Mail className="w-5 h-5 mr-2" /> Contact Us
          </Link>
          <Link
            to="/vendor/signup"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-red-600 bg-red-50 hover:bg-red-100 transition-all"
          >
            Re-apply
          </Link>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Thank you for your understanding.
        </p>
      </div>
    </div>
  );
};

export default Rejected;
