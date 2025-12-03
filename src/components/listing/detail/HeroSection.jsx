import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

// Apne images yahan daal do
import img1 from '../../../assets/banner/banner1.jpg';
import img2 from '../../../assets/banner/banner2.jpg';
import img3 from '../../../assets/banner/banner3.jpg';
import img4 from '../../../assets/banner/banner4.jpg';
import img5 from '../../../assets/banner/banner4.jpg';

const images = [img1, img2, img3, img4, img5];

const HeroSection = () => {
  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden bg-black">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-button-next-hero',
          prevEl: '.swiper-button-prev-hero',
        }}
        loop={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={0}
        speed={800}
        className="h-full"
        breakpoints={{
          // Mobile pe bhi perfect
          640: { slidesPerView: 1 },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {index > 0 && (
                <img
                  src={images[index > 0 ? index - 1 : images.length - 1]}
                  alt=""
                  className="absolute right-0 top-0 h-full w-auto z-10 pointer-events-none"
                  style={{ width: '20px', objectFit: 'cover' }}
                />
              )}

              {/* Next Image - Sirf 20px left se dikhegi */}
              {index < images.length - 1 && (
                <img
                  src={images[(index + 1) % images.length]}
                  alt=""
                  className="absolute left-0 top-0 h-full w-auto z-10 pointer-events-none"
                  style={{ width: '20px', objectFit: 'cover' }}
                />
              )}

              {/* Main Center Image - Full Screen */}
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Red Arrows */}
        <div className="swiper-button-prev-hero absolute left-[-20px] top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-all group">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        <div className="swiper-button-next-hero absolute right-[-20px] top-1/2 -translate-y-1/2 z-40 w-14 h-14 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-all group">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Swiper>
    </div>
  );
};

export default HeroSection;