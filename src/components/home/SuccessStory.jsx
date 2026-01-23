import React from 'react';

import SuccessImg from "../../assets/success/success-img.webp"
import Headingicon from "../../assets/icons/title-img.webp";
import WedIcon01 from "../../assets/icons/wed-icon-01.svg";
import WedIcon02 from "../../assets/icons/wed-icon-02.svg";
import WedIcon03 from "../../assets/icons/wed-icon-03.svg";

const successData = [
  {
   "img": WedIcon01,
  "title": "180+ Wedding Venues & Vendors",
  "desc": "There is a reliable pool of practitioners in all types."
  },
  {
    img: WedIcon02,
    title: "350+ Successful Wedding Events",
    desc: "True weddings are designed and implemented with love, care, and precision."
  },
  {
    img: WedIcon03,
    title: "65+ Cities Covered",
    desc: "Going a step further and expanding to India to assist couples in planning weddings in any place, with ease."
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
          <p className="text-gray-600 text-lg">🌟 Who We Are — Our Success Story</p>
          <h2 className="text-4xl font-bold gradient-text mb-4">EPIC Weddings is the company that helps make your dream wedding come true.</h2>
          <img src={Headingicon} alt="decoration"/>
        </div>
           

            <div className=" gap-8 flex flex-col">
             {successData.map((item,index)=> (
                <div className="flex" key={index}>
                    <div className="bg-gray-300 w-20 h-20 flex justify-center items-center rounded-full">
                        <img src={item.img} alt="imges" className='w-12 h-12 object-contain' />
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