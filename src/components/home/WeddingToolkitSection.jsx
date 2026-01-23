import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

import bannerbottom from "../../assets/banner/hero-bootom.png"
import Headingicon from "../../assets/icons/title-img.webp"

// Lucide Icons (sabse popular aur beautiful icons abhi)
import { 
  CheckSquare, 
  Globe, 
  Users, 
  Wallet, 
  Store, 
  Gift, 
  Palette, 
  Mail,
  CalendarCheck,
  Clock,
  ArrowRight
} from 'lucide-react';

const WeddingToolsCarousel = () => {
  const tools = [
    { Icon: CheckSquare,      label: "Checklist" },
    { Icon: Globe,            label: "Wedding Website" },
    { Icon: Users,            label: "Guest List" },
    { Icon: Wallet,           label: "Budget Planner" },
    { Icon: Store,            label: "Vendor Manager" },
    { Icon: Gift,             label: "Gift Registry" },
    { Icon: Palette,          label: "Theme & Vision" },
    { Icon: Mail,             label: "E-Invites" },
    { Icon: CalendarCheck,    label: "Timeline" },
    { Icon: Clock,            label: "Countdown" },
  ];

  return (
    <section className=" pt-10">
<div className="flex justify-center items-center">
         <img className='text-center w-[30px] ' src={bannerbottom} alt="icon" />

</div>
       
    <div className= "pt-8 " >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
       <div className='flex justify-center items-center flex-col mb-8'>
         <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          It is a special wedding day — and we are here to make it a day to remember. EPIC Weddings simplifies the whole process of wedding planning, making it a happy and stress-free experience, which starts with the identification of a suitable vendor, all the way to making a reservation.
        </p>
         <h2 className="text-4xl  font-bold gradient-text mb-4">
         Let’s Celebrate Your Love
        </h2>
        <img className='text-center' src={Headingicon} alt="heading-icon" />
       
       </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          slidesPerView={2}
          breakpoints={{
            480: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 7 },
          }}
          autoplay={{ delay: 2200, disableOnInteraction: false }}
          loop={true}
          speed={900}
          className="py-6"
        >
          {tools.map((tool, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center group">
                <div className=" mb-4">
                  <tool.Icon 
                    size={42} 
                    className="" 
                    strokeWidth={1.8}
                  />
                </div>
                <p className="text-gray-700 font-medium text-sm">
                  {tool.label}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* CTA Button */}
        <a
          href="https://www.wedplanners.in/"
                style={{ background: 'linear-gradient(to right, #FF0100, #CD9B35)' }}
          className="inline-flex items-center gap-2 mt-12 text-white font-bold px-8 py-3  text-lg  "
        >
          Start Planning Now
          <ArrowRight size={26} className="animate-pulse" />
        </a>
      </div>
      </div>
    </section>
  );
};

export default WeddingToolsCarousel;