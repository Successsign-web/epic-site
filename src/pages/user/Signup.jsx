import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { Mail, Lock, User, Check, Heart, Gift } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/axiosInstance';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 5.107 29.61 3 24 3C11.318 0 1 12.843 1 24s10.318 21 23 21s23-9.843 23-21c0-1.341-.138-2.65-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 5.107 29.61 3 24 3C16.318 3 9.656 6.812 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 45c5.61 0 10.553-3.707 12.802-8.841l-6.571-4.819C28.655 34.892 24.349 37 24 37c-5.894 0-10.82-3.524-12.63-8.318l-6.707 5.238C9.656 41.188 16.318 45 24 45z"/>
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.571 4.819C42.022 35.245 44 30.027 44 24c0-1.341-.138-2.65-.389-3.917z"/>
  </svg>
);

const Signup = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('All fields are required');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.post('/user/register', formData);
      const { user, token } = res.data.data;

      localStorage.setItem('loggedInUser', JSON.stringify({ user, token }));
      window.dispatchEvent(new Event('loginEvent'));
      toast.success(res.data.message || 'Registered successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

   const handleGoogleSignup = useGoogleLogin({
  flow: 'auth-code', 
  onSuccess: async (codeResponse) => {
    setIsLoading(true);
    try {
      
      console.log("Google Code received:", codeResponse.code);
      
      const response = await api.post('/user/google-auth', { 
        code: codeResponse.code 
      });
      console.log('Signup.jsx: Google Auth Backend Response:', response.data); // Debug log

      const { user, token } = response.data.data;
      localStorage.setItem('loggedInUser', JSON.stringify({ user, token }));
      window.dispatchEvent(new Event('loginEvent'));
      toast.success('Signed in with Google!');
      navigate('/');
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      toast.error(error.response?.data?.message || 'Google Auth Failed');
    } finally {
      setIsLoading(false);
    }
  },
  onError: () => toast.error('Google Sign-In Failed'),
});

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
     
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-md w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Create Your Account</h2>
            <p className="mt-1 text-sm text-gray-600">Plan your dream wedding with us</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your full name" required disabled={isLoading} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your email" required disabled={isLoading} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                    placeholder="Choose a password" required disabled={isLoading} />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={isLoading}
                  className="w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-medium text-sm hover:from-red-600 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>

            <div className="my-6 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-xs font-semibold text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button onClick={handleGoogleSignup} disabled={isLoading}
              className="w-full flex justify-center items-center gap-3 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50 transition-all transform hover:scale-105 shadow-md">
              <GoogleIcon /> Sign up with Google
            </button>

            <p className="text-xs text-gray-600 text-center mt-6">
              Already have an account? <Link to="/user/login" className="font-semibold text-red-600 hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>

     
      <div className="hidden lg:block w-1/2 bg-cover bg-center relative" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1595991051543-640a22144799?w=1200')` }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-red-900/60 backdrop-blur-sm"></div>
        <div className="relative h-full flex flex-col justify-between px-12 py-10 text-white">
          <div>
            <h1 className="text-5xl font-bold mb-3">Start Your Journey</h1>
            <p className="text-lg text-gray-200">Join today and unlock amazing features</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex gap-3"><Heart/> Save Favorites</div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex gap-3"><Check/> Easy Planning</div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 flex gap-3"><Gift/> Exclusive Deals</div>
          </div>
          <div className="text-sm text-gray-300">© {new Date().getFullYear()} Epic Wedding</div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
