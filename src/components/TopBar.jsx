import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, Sparkles } from 'lucide-react';

const TopBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white relative overflow-hidden" style={{ background: 'linear-gradient(to right, #FF0100, #CD9B35, #FF0100)' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between h-11">

          {/* Left: Contact */}
          <div className="flex items-center space-x-6 animate-slideInLeft">

            <a href="mailto:info@wedplanners.in" className="flex items-center space-x-2 hover:text-yellow-300 transition group">
             
             
            </a>
          </div>

          {/* Center Tagline */}
          <div className="hidden lg:flex items-center space-x-3">
            </div>

          {/* Right Side: White Box + GLOWING GRADIENT ICONS */}
          <div className="flex items-center bg-white py-2.5 px-6  animate-slideInRight gap-5">

            {/* Vendor Text */}
            <a href="https://admin.wedplanners.in" className="hidden sm:block text-sm border-r pr-4 gradient-text   font-bold tracking-wide  transition">
              Are you a vendor?
            </a>

            {/* PREMIUM GLOWING SOCIAL ICONS */}
            <div className="flex items-center space-x-4">

              {/* Facebook - Red/Gold Gradient */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="relative p-2 rounded-full bg-gradient-to-br from-red-500 to-pink-600 shadow-lg  transition-all duration-300 group">
                <Facebook className="w-4 h-4 text-white drop-shadow-md" />
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition"></div>
              </a>

              {/* Instagram - Full Insta Gradient + Glow */}
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="relative p-2 rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 shadow-lg  transition-all duration-300 group">
                <Instagram className="w-3 h-3 text-white drop-shadow-md" />
                <div className="absolute inset-0 rounded-full bg-white/30 opacity-0 group-hover:opacity-100 transition blur-sm"></div>
              </a>

              {/* Twitter/X - Gold/Red Luxury */}
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="relative p-2 rounded-full bg-gradient-to-br from-amber-500 to-red-600 shadow-lg  transition-all duration-300 group">
                <Twitter className="w-3 h-3 text-white drop-shadow-md" />
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition"></div>
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-shimmer { animation: shimmer 4s infinite linear; }
        .animate-gradient { background-size: 200% auto; animation: gradient 4s ease infinite; }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default TopBar;