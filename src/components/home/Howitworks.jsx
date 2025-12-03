import React from 'react';
import { Search, MessageCircle, Calendar, CheckCircle } from 'lucide-react';
import Headingicon from "../../assets/icons/title-img.webp";
import bgImg from "../../assets/icons/popular-bg.webp"

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Search Your Perfect Venue",
      desc: "Browse hundreds of verified venues with real photos & pricing."
    },
    {
      icon: <MessageCircle className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Connect Directly with Owner",
      desc: "Chat or call instantly – no middleman, no waiting."
    },
    {
      icon: <Calendar className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Check Availability & Book",
      desc: "Select date, confirm & pay small token to block instantly."
    }
  ];

  return (
    <section className="py-16 overflow-hidden bg-no-repeat bg-right bg-contain" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex justify-center items-center flex-col mb-12">
                  <p className="text-gray-600 text-lg">Simple & Fast Process</p>
                  <h2 className="text-4xl font-bold gradient-text mb-4">How It Works</h2>
                  <img src={Headingicon} alt="decoration"/>
                </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative text-center flex flex-col items-center"
            >
              {/* Circle with Number & Icon */}
              <div className="mb-6 ">
                 <div className="relative p-[10px] rounded-full bg-gray-300 ">
                <div className="w-20 h-20 md:w-24 md:h-24  rounded-full bg-white flex items-center justify-center text-[#242424] transition-all duration-300" >
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10  text-white rounded-full flex items-center justify-center font-bold text-sm md:text-lg shadow-md" style={{ background: 'linear-gradient(to right, #FF0100, #CD9B35)' }}>
                  {index + 1}
                </div>
              </div>
              </div>
             

              {/* Text */}
              <h3 className="text-lg md:text-xl font-bold gradient-text mb-3 px-4">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href="/search"
            className="group inline-flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg   transition-all duration-500"
          >
            Start Searching Now
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;