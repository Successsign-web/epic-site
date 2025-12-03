import React from 'react';
import { Send } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative h-96 md:h-80 lg:h-96 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1950"
          alt="Happy Wedding Couple"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10 items-center">

          {/* Left – Short & Sweet Content */}
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Plan Your Dream Wedding<br />
              <span className="text-yellow-400">Absolutely Free</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-200 font-medium">
              5000+ couples planned their wedding with us<br />
              Verified Vendors • Best Prices • Zero Stress
            </p>
          </div>

          {/* Right – Super Compact Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Get Free Quotes in 2 Minutes
              </h3>

              <form className="space-y-5">
                {/* Name + Number in One Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 font-medium"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 font-medium"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Wedding City (Delhi, Jaipur, etc.)"
                  className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 font-medium"
                />

                <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 shadow-lg">
                  Get Free Consultation
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;