import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-text">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-2">We'd love to hear from you!</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div className="mt-6">
                <input type="text" placeholder="Subject" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200" />
              </div>
              <div className="mt-6">
                <textarea placeholder="Your Message" rows="5" className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-200"></textarea>
              </div>
              <div className="mt-6 text-right">
                <button type="submit" className="btngradiant text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg flex items-start gap-6">
              <div className="bg-red-100 p-4 rounded-full">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Email</h3>
                <p className="text-gray-600">Our friendly team is here to help.</p>
                <a href="mailto:support@epicweddingportal.com" className="text-red-500 font-semibold hover:underline">support@epicweddingportal.com</a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg flex items-start gap-6">
              <div className="bg-red-100 p-4 rounded-full">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Phone</h3>
                <p className="text-gray-600">Mon-Fri from 10am to 6pm.</p>
                <a href="tel:+919971120292" className="text-red-500 font-semibold hover:underline">+91 99711 20292</a>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg flex items-start gap-6">
              <div className="bg-red-100 p-4 rounded-full">
                <MapPin className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Office</h3>
                <p className="text-gray-600">Come say hello at our office HQ.</p>
                <p className="text-red-500 font-semibold">3rd Floor, Plot No. 12, Sector 44, Gurugram, Haryana - 122003</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
