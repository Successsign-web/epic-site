import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
        {/* Image Section */}
        <div className="lg:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1515934751635-becd7866d1ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Couple in wedding attire"
            className="rounded-3xl shadow-2xl w-full h-96 object-cover object-center transform -rotate-3 hover:rotate-0 transition-transform duration-500 ease-in-out"
          />
          <div className="absolute bg-gradient-to-br from-red-600 to-yellow-600 w-full h-full top-0 left-0 rounded-3xl opacity-20 -z-10 transform rotate-3"></div>
        </div>

        {/* Content Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 font-display">
            <span className="text-red-600">Our Story,</span> Your Journey
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Welcome to Epic Wedding, where every love story finds its perfect beginning. We are passionate about crafting unforgettable wedding experiences, connecting you with the finest venues and vendors who share our commitment to excellence.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            From intimate ceremonies to grand celebrations, we believe your wedding day should be a true reflection of your unique bond. Let us guide you through every step, making your dream wedding a seamless and joyous reality.
          </p>
          <button className="bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
