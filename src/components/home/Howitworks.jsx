import React from 'react';
import { Search, ClipboardList, Calendar, CheckCircle } from 'lucide-react';
import Headingicon from "../../assets/icons/title-img.webp";
import bgImg from "../../assets/icons/popular-bg.webp"

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Explore Vendors",
      desc: "Filtered wedding venues and vendors in India."
    },
    {
      icon: <ClipboardList className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Shortlist & Compare",
      desc: "Reviews, photos, and ratings. Check prices before finalising."
    },
    {
      icon: <Calendar className="w-10 h-10 md:w-12 md:h-12" />,
      title: "Book Seamlessly",
      desc: "Get in touch with sellers immediately and verify your reservations."
    },
    {
        icon: <CheckCircle className="w-10 h-10 md:w-12 md:h-12" />,
        title: "Enjoy Your Big Day",
        desc: "The ideal party is provided by our reliable partners, allowing you to relax."
    }
  ];

  return (
    <section className="py-16 overflow-hidden bg-no-repeat bg-right bg-contain" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex justify-center items-center flex-col mb-12">
            <p className="text-gray-600 text-lg">It is an easy step-by-step process to plan your wedding</p>
            <h2 className="text-4xl font-bold gradient-text mb-4">Timeline Wedding and How it Works</h2>
            <img src={Headingicon} alt="decoration"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
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
      </div>
    </section>
  );
};

export default HowItWorks;