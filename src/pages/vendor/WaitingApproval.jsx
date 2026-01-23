
import React from 'react';
import { Clock, Mail, Phone } from 'lucide-react';

const WaitingApproval = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-12 h-12 text-yellow-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Account Under Review
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for registering! Your vendor account is currently being reviewed by our team.
          <br /><br />
          You will receive an email & SMS once your account is <span className="font-bold text-green-600">APPROVED</span>.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 space-y-4 text-left">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-purple-600" />
            <span className="text-sm">We will notify you on your registered email</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-purple-600" />
            <span className="text-sm">SMS alert on your phone number</span>
          </div>
        </div>

        <button 
          onClick={() => window.location.href = "/vendor/login"}
          className="mt-8 w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-all"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default WaitingApproval;