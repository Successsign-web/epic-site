import React from 'react';
import { Mail, Send, Sparkles, Stars } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center py-12 px-4">
      <div className="max-w-5xl w-full bg-white rounded-[40px] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Side - Visual Branding Area */}
          <div className="lg:w-2/5 btngradiant p-10 lg:p-14 text-white flex flex-col justify-between relative">
            {/* Background Abstract Shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 rounded-full -ml-16 -mb-16 blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-black/10 backdrop-blur-lg px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Stars className="w-4 h-4 text-yellow-300" />
                <span>Premium Service</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-6">
                Let's plan your <br /> big day.
              </h1>
              <p className="text-white/80 leading-relaxed text-lg">
               Tell us your vision, and we will turn it into a memorable reality.
              </p>
            </div>

            <div className="relative z-10 mt-12">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-white p-2 rounded-lg">
                    <Mail className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="font-bold text-white">Official Email</span>
                </div>
                <p className="text-white/90 text-lg">info@wedplanners.in</p>
              </div>
            </div>
          </div>

          {/* Right Side - Clean Contact Form */}
          <div className="lg:w-3/5 p-10 lg:p-14 bg-white">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                Send a Message <Sparkles className="w-6 h-6 text-red-400" />
              </h2>
              <div className="h-1 w-12 bg-red-500 mt-3 rounded-full"></div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 group-focus-within:text-red-500 transition-colors">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-50 focus:bg-white focus:border-red-200 transition-all text-gray-800"
                  />
                </div>
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 group-focus-within:text-red-500 transition-colors">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="rahul@example.com"
                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-50 focus:bg-white focus:border-red-200 transition-all text-gray-800"
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 group-focus-within:text-red-500 transition-colors">
                  Subject
                </label>
                <input 
                  type="text" 
                  placeholder="How can we help?"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-50 focus:bg-white focus:border-red-200 transition-all text-gray-800"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 ml-1 group-focus-within:text-red-500 transition-colors">
                  Message
                </label>
                <textarea 
                  rows="4" 
                  placeholder="Share your wedding details..."
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-50 focus:bg-white focus:border-red-200 transition-all text-gray-800 resize-none"
                ></textarea>
              </div>

              <div className="pt-4">
                <button 
                  type="submit" 
                  className="btngradiant w-full text-white font-bold py-5 rounded-2xl shadow-[0_10px_20px_-5px_rgba(239,68,68,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(239,68,68,0.5)] transform hover:-translate-y-1 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message Now</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;