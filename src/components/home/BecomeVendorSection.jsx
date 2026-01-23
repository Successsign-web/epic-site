import React from 'react';

const SimpleVendorCTA = () => {
  return (
    <section className="py-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="boxgradiant py-8 px-12 text-center ">

          {/* Heading */}
          <h2 className="text-4xl text-white font-bold  mb-4">
            List Your Venue 100% FREE
          </h2>

          {/* Subtext */}
          <p className="text-md  text-white  max-w-2xl mb-4 mx-auto leading-relaxed">
            Get direct inquiries from thousands of couples every month — No commission, no hidden charges
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">

            {/* Register Button - Soft Blue */}
            <a
              href="/vendor/register"
              className="px-8 py-3 bg-white text-red-600 font-bold text-md    flex items-center gap-3"
            >
              List Your Venue Free
             
            </a>

          </div>

          {/* Small login text */}
          <p className="text-sm text-gray-100 mt-2">
            Already have an account? 
            <a href="/vendor/login" className="text-white font-semibold hover:underline ml-1">Login →</a>
          </p>

        </div>
      </div>
    </section>
  );
};

export default SimpleVendorCTA;