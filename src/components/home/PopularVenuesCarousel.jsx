import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Headingicon from "../../assets/icons/title-img.webp"

import bgImg from "../../assets/icons/popular-bg.webp"
import cardBg from "../../assets/icons/search-bg.webp"

const PopularVenuesCarousel = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const venues = [
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818672372eee.png", title: "Banquet Hall", link: "/venue/14" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-681866939caf6.png", title: "Luxury Resort", link: "/venue/13" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-68186603a7121.png", title: "Beach Resort", link: "/venue/12" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-681864e38c38d.png", title: "Community Halls", link: "/venue/11" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818636c00b50.png", title: "Farm House", link: "/venue/10" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818625537260.png", title: "Grand Banquet", link: "/venue/9" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818616227372.png", title: "Royal Banquet Halls", link: "/venue/8" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-68185ee7d4057.png", title: "Hill Resort", link: "/venue/7" },
  ];

  // Total slides ke hisaab se visible 5 dots banayenge
  const totalSlides = venues.length;
  const visibleDotCount = 5;
  const half = Math.floor(visibleDotCount / 2);

  const getStartIndex = () => {
    let start = activeIndex - half;
    if (start < 0) start = 0;
    if (activeIndex > totalSlides - half - 1) {
      start = Math.max(0, totalSlides - visibleDotCount);
    }
    return start;
  };

  return (
    <section className="py-16 bg-no-repeat bg-right bg-contain" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="max-w-7xl mx-auto px-6 my-9">
        <div className='flex justify-center items-center flex-col mb-8'>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Loved by Couples</p>
          <h2 className="text-4xl font-bold gradient-text mb-4">Popular Searches</h2>
          <img className='text-center' src={Headingicon} alt="heading-icon" />
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={3}
          centeredSlides={true}
          loop={true}
          speed={1000}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          className=""
        >
          {venues.map((venue, index) => (
            <SwiperSlide key={index}>
              {({ isActive }) => (
                <div className={`relative  overflow-hidden  pt-14 pb-5 transition-all duration-700   ${
                  isActive ? 'scale-100 brightness-105' : 'scale-95 opacity-95'
                }`}>
                    <img className='venue-card' src={cardBg} alt=" card-cion " />
                 <div className="p-3 bg-gray-50 rounded-xl border  border-gray-300 relative ">
                    <div className='relative rounded-xl overflow-hidden'>
                         <img src={venue.img} alt={venue.title} className="w-full h-44 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  <a
  href={venue.link}
  className={`absolute bottom-[-15px] left-1/2 -translate-x-1/2 font-bold px-8 border text-red-600 border-red-600 py-2 rounded-lg transition-all duration-500 whitespace-nowrap ${
    isActive ? 'text-white scale-110' : 'bg-white text-gray-800'
  }`}
  style={
    isActive
      ? { background: 'linear-gradient(to right, #FF0100, #CD9B35)' }
      : {}
  }
>
                    {venue.title}
                  </a>
                 </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom 5 Dots Only – Center Active */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {Array.from({ length: Math.min(visibleDotCount, totalSlides) }, (_, i) => {
            const startIndex = getStartIndex();
            const dotIndex = startIndex + i;
            const isActive = dotIndex === activeIndex;

            return (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(dotIndex)}
                className={`transition-all duration-500 rounded-full ${
                  isActive
                    ? 'w-6 h-2 bg-red-600 shadow-lg shadow-red-600/50'
                    : 'w-2 h-2 bg-gray-800'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default PopularVenuesCarousel;