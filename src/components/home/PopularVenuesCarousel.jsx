import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Headingicon from "../../assets/icons/title-img.webp";
import api from '../../utils/axiosInstance'; // Import axiosInstance
import LoadingSpinner from '../LoadingSpinner'; // Import LoadingSpinner

import bgImg from "../../assets/icons/popular-bg.webp";
import cardBg from "../../assets/icons/search-bg.webp";

const PopularVenuesCarousel = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [venues, setVenues] = useState([]); // State to store fetched venues
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await api.get('/public/venue-categories'); // Fetch data from the specified API
        if (response.data && Array.isArray(response.data.data)) {
          setVenues(response.data.data); // Update venues state
        } else {
          console.warn("API response data for venues is not an array:", response.data);
          setVenues([]);
        }
      } catch (err) {
        setError(err); // Set error state
        console.error("Failed to fetch venues:", err);
      } finally {
        setIsLoading(false); // Set loading to false
      }
    };
    fetchVenues();
  }, []); // Empty dependency array means this runs once on mount

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

  if (isLoading) {
    return (
      <section className="py-16 bg-no-repeat bg-right bg-contain" style={{backgroundImage: `url(${bgImg})`}}>
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center h-48">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-no-repeat bg-right bg-contain" style={{backgroundImage: `url(${bgImg})`}}>
        <div className="max-w-7xl mx-auto px-6 text-center text-red-600">
          Error loading popular venues. Please try again later.
        </div>
      </section>
    );
  }

  if (venues.length === 0) {
    return (
      <section className="py-16 bg-no-repeat bg-right bg-contain" style={{backgroundImage: `url(${bgImg})`}}>
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          No popular venues available.
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-no-repeat bg-right bg-contain" style={{backgroundImage: `url(${bgImg})`}}>
      <div className="max-w-7xl mx-auto px-6 my-9">
        {/* Section Heading - Always Render */}
        <div className='flex justify-center items-center flex-col mb-8'>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">Loved by Couples</p>
          <h2 className="text-4xl font-bold gradient-text mb-4">Popular Searches</h2>
          <img className='text-center' src={Headingicon} alt="heading-icon" />
        </div>

        {/* Conditional Rendering for Loading, Error, or Empty States */}
        {isLoading && (
          <div className="flex justify-center items-center h-48">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="text-center text-red-600">
            Error loading popular venues. Please try again later.
          </div>
        )}

        {!isLoading && !error && venues.length === 0 && (
          <div className="text-center text-gray-600">
            No popular venues available.
          </div>
        )}

        {/* Swiper Carousel - Render only when data is loaded and available */}
        {!isLoading && !error && venues.length > 0 && (
          <>
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
                             <img src={venue.image.url} alt={venue.name} className="w-full h-44 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                      <a
      href={`/listing?category=${venue.slug}`}
      className={`absolute bottom-[-15px] left-1/2 -translate-x-1/2 font-bold px-8 border text-red-600 border-red-600 py-2 rounded-lg transition-all duration-500 whitespace-nowrap ${
        isActive ? 'text-white scale-110' : 'bg-white text-gray-800'
      }`}
      style={
        isActive
          ? { background: 'linear-gradient(to right, #FF0100, #CD9B35)' }
          : {}
      }
    >
                        {venue.name}
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
          </>
        )}
      </div>
    </section>
  );
};

export default PopularVenuesCarousel;