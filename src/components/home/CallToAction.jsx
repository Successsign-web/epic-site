import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-yellow-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4 font-display">
          Ready to Plan Your Epic Wedding?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Start your journey with us today and turn your wedding dreams into a breathtaking reality. Explore our curated collections and connect with top professionals.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Find Your Dream Team
          </button>
          <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Get Inspired
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
