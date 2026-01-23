import React from 'react';
import { ShieldAlert, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Inactive = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
        <ShieldAlert className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Account Inactive</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your vendor account is currently inactive. This might be due to a review process or a policy violation.
          Please contact support to reactivate your account and regain access to your dashboard.
        </p>
        <div className="space-y-4">
          <Link
            to="/contact-us"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all"
          >
            <Mail className="w-5 h-5 mr-2" /> Contact Support
          </Link>
          <button
                        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all"
          >
            <Phone className="w-5 h-5 mr-2" /> Call Support
          </button>
        </div>
        <p className="mt-8 text-sm text-gray-500">
          Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default Inactive;
