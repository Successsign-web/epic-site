import React from 'react';

import SuccessImg from "../../assets/success/success-img.webp"
import Headingicon from "../../assets/icons/title-img.webp";

const successData = [
  {
   "img": "https://epic.successsign.shop/public/assets/new-front-asset/assets/img/icons/wed-icon-01.svg",
  "title": "2000+ Wedding Venues",
  "desc": "Choose from a curated list of 2000+ stunning wedding venues across India — from luxurious resorts to royal palaces."
  },
  {
    img: "https://epic.successsign.shop/public/assets/new-front-asset/assets/img/icons/wed-icon-02.svg",
    title: "350+ Real Wedding Event Success",
    desc: "We’ve been part of over 350 beautiful real weddings, creating memories that last a lifetime."
  },
  {
    img: "https://epic.successsign.shop/public/assets/new-front-asset/assets/img/icons/wed-icon-03.svg",
    title: "More than 65+ Cities Available",
    desc: "From metropolitan cities to serene destinations — we bring your dream wedding to your favorite location."
  }
];


const SuccessSection = () => {
  return (
    <section className="py-16 catgorybox">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="order-2 lg:order-1">
            <img 
              src={SuccessImg}
              alt="Happy Couple - Success Story"
              className="w-full "
            />
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <div className="flex justify-center items-center flex-col mb-12">
          <p className="text-gray-600 text-lg">Who we are</p>
          <h2 className="text-4xl font-bold gradient-text mb-4">Our Success Story</h2>
          <img src={Headingicon} alt="decoration"/>
          <p className="text-gray-600 text-base text-center mt-2 max-w-2xl">
    We are dedicated to creating unforgettable wedding experiences with precision, 
    passion, and professionalism. Our team delivers seamless planning, breathtaking 
    decorations, and stress-free coordination to make every celebration truly 
    magical. From intimate gatherings to grand events, we turn your dream wedding 
    into a beautifully crafted reality.
  </p>
        </div>
           

            <div className=" gap-8 flex flex-col">
             {successData.map((item,index)=> (
                <div className="flex" key={index}>
                    <div className="bg-gray-300 w-20 flex justify-center items-center rounded-full">
                        <img src={item.img} alt="imges" className='w-full p-4' />
                    </div>
                    <div className='ml-4'>
                        {item.title && 
                        (
                            <h2 className="text-xl font-bold gradient-text mb-2">
                                {item.title}
                            </h2>
                        )}
                         {item.desc && 
                        (
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        )}
                        </div>
                </div>

             )
             )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessSection;