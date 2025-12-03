import React from 'react';
import { Link } from 'react-router-dom';

const Sitemap = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">Sitemap</h1>
          <p className="text-lg text-gray-600 mt-2">Explore all pages of Epic Wedding</p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Main Navigation</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><Link to="/" className="text-red-500 hover:underline">Home</Link></li>
              <li><Link to="/listing" className="text-red-500 hover:underline">Wedding Venues & Vendors</Link></li>
              <li><Link to="/listing/1" className="text-red-500 hover:underline">Example Listing Detail Page</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><Link to="/about-us" className="text-red-500 hover:underline">About Us</Link></li>
              <li><Link to="/privacy-policy" className="text-red-500 hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-red-500 hover:underline">Terms & Conditions</Link></li>
              <li><Link to="/vendor-reviews" className="text-red-500 hover:underline">Vendor Reviews</Link></li>
              <li><Link to="/customer-reviews" className="text-red-500 hover:underline">Customer Reviews</Link></li>
              <li><Link to="/testimonial" className="text-red-500 hover:underline">Testimonial</Link></li>
              <li><Link to="/site-maps" className="text-red-500 hover:underline">Sitemap</Link></li>
              <li><Link to="/career" className="text-red-500 hover:underline">Career</Link></li>
              <li><Link to="/contact-us" className="text-red-500 hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Add more sections as needed, e.g., Vendor Categories, Cities */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Vendor Categories</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><Link to="/listing?category=wedding-venues" className="text-red-500 hover:underline">Wedding Venues</Link></li>
              <li><Link to="/listing?category=planning-and-decoration" className="text-red-500 hover:underline">Planning & Decoration</Link></li>
              <li><Link to="/listing?category=wedding-photographer" className="text-red-500 hover:underline">Wedding Photographers</Link></li>
              <li><Link to="/listing?category=bridal-mehendi" className="text-red-500 hover:underline">Bridal Mehendi</Link></li>
              <li><Link to="/listing?category=bridal-makeup-artist" className="text-red-500 hover:underline">Bridal Makeup</Link></li>
              <li><Link to="/listing?category=wedding-caterers" className="text-red-500 hover:underline">Wedding Caterers</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Cities</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><Link to="/listing?city=delhi-ncr" className="text-red-500 hover:underline">Delhi NCR</Link></li>
              <li><Link to="/listing?city=mumbai" className="text-red-500 hover:underline">Mumbai</Link></li>
              <li><Link to="/listing?city=bangalore" className="text-red-500 hover:underline">Bangalore</Link></li>
              <li><Link to="/listing?city=indore" className="text-red-500 hover:underline">Indore</Link></li>
              <li><Link to="/listing?city=jaipur" className="text-red-500 hover:underline">Jaipur</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sitemap;
