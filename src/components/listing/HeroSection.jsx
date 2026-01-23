import React from 'react';
import bannerImage from '../../assets/banner/banner1.jpg';

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-96"
      style={{ backgroundImage: `url(${bannerImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
        <h1 className="text-5xl font-bold">Find Your Perfect Vendor</h1>
        <p className="mt-4 text-lg">Browse through the best wedding vendors</p>
      </div>
    </div>
  );
};

export default HeroSection;
