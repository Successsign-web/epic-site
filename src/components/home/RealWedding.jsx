import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { 
  Heart, 
  Palette, 
  Camera, 
  Flower2, 
  Users, 
  Sparkles,
  Crown      // Real Weddings ke liye royal feel
} from 'lucide-react';

import Headingicon from "../../assets/icons/title-img.webp";
import cardBg from "../../assets/icons/search-bg.webp";

const UltimateBrowseSection = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  const tabsData = {
    all: [
      { type: "vendor", name: "Heena Artistry", cat: "Mehndi Artist", price: "₹7K", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/v/1" },
      { type: "wedding", couple: "Ridhima & Safal", location: "Jaipur Palace", budget: "₹85L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/1" },
      { type: "vendor", name: "Royal Touch Makeup", cat: "Bridal Makeup", price: "₹35K", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/v/2" },
      { type: "wedding", couple: "Shefali + Nitish", location: "Goa Beach", budget: "₹65L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/2" },
      { type: "vendor", name: "Candid Clicks", cat: "Photography", price: "₹1.2L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/v/3" },
        { type: "vendor", name: "Heena Artistry", cat: "Mehndi Artist", price: "₹7K", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/v/1" },
      { type: "wedding", couple: "Ridhima & Safal", location: "Jaipur Palace", budget: "₹85L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/1" },
      { type: "vendor", name: "Royal Touch Makeup", cat: "Bridal Makeup", price: "₹35K", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/v/2" },
      { type: "wedding", couple: "Shefali + Nitish", location: "Goa Beach", budget: "₹65L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/2" },
      { type: "vendor", name: "Candid Clicks", cat: "Photography", price: "₹1.2L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/v/3" },
    
    ],
    mehndi: [
      { type: "vendor", name: "Heena Artistry", cat: "Bridal Mehndi", price: "₹7,000", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/mehndi/1" },
      { type: "vendor", name: "Rajasthani Mehndi", cat: "Traditional", price: "₹11,000", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/mehndi/2" },
    ],
    makeup: [
      { type: "vendor", name: "Royal Touch Makeup", cat: "HD Airbrush", price: "₹35,000", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/makeup/1" },
    ],
    photography: [
      { type: "vendor", name: "Candid Clicks", cat: "Candid + Cinematic", price: "₹1.2L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/photo/1" },
    ],
    decorators: [
      { type: "vendor", name: "Dream Decor", cat: "Floral & Royal", price: "₹2.5L", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/decor/1" },
    ],
    realweddings: [
      { type: "wedding", couple: "Ridhima & Safal", location: "Jaipur Palace", budget: "₹85 Lakh", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/1" },
      { type: "wedding", couple: "Shefali + Nitish", location: "Goa Beach", budget: "₹65 Lakh", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/2" },
      { type: "wedding", couple: "Ananya & Arjun", location: "Udaipur Royal", budget: "₹1.2 Crore", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/3" },
      { type: "wedding", couple: "Priya & Vikram", location: "Delhi Grand", budget: "₹95 Lakh", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", link: "/real-wedding/4" },
    ]
  };

  const currentData = tabsData[activeTab] || [];
  const totalSlides = currentData.length;
  const visibleDotCount = 5;
  const half = Math.floor(visibleDotCount / 2);

  const getStartIndex = () => {
    let start = activeIndex - half;
    if (start < 0) start = 0;
    if (activeIndex > totalSlides - half - 1) start = Math.max(0, totalSlides - visibleDotCount);
    return start;
  };

  const tabConfig = [
    { key: "all", label: "All", icon: <Sparkles className="w-5 h-5" /> },
    { key: "mehndi", label: "Mehndi", icon: <Palette className="w-5 h-5" /> },
    { key: "makeup", label: "Makeup", icon: <Heart className="w-5 h-5" /> },
    { key: "photography", label: "Photography", icon: <Camera className="w-5 h-5" /> },
    { key: "decorators", label: "Decorators", icon: <Flower2 className="w-5 h-5" /> },
    { key: "realweddings", label: "Real Weddings", icon: <Crown className="w-5 h-5" /> },
  ];

  return (
    <section className="py-20 bg-no-repeat bg-right-top bg-contain" style={{backgroundImage: `ur[](https://epic.successsign.shop/storage/app/public/section-bg-vendor-wedding.webp)`}}>
      <div className="max-w-7xl mx-auto px-6">

        <div className='flex justify-center items-center flex-col mb-12'>
          <p className="text-gray-600 text-lg">Your Dream Wedding Starts Here</p>
          <h2 className="text-4xl font-extrabold gradient-text mb-4">Vendors & Real Weddings</h2>
          <img className='text-center' src={Headingicon} alt="decoration" />
        </div>

        {/* Premium Tabs with Lucide Icons */}
        <div className="flex flex-wrap justify-center gap-5 mb-5">
          {tabConfig.map(tab => {
            const hasData = (tabsData[tab.key]?.length ?? 0) > 0;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  if (hasData) {
                    setActiveTab(tab.key);
                    setActiveIndex(0);
                    swiperRef.current?.slideTo(0);
                  }
                }}
                disabled={!hasData}
                className={`flex items-center gap-3 px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer  ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white scale-105'
                    : hasData
                    ? 'bg-white text-gray-800 border-2 border-gray-300 hover:border-red-600 '
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.key && hasData && (
                  <span className="ml-2 text-sm opacity-90">({currentData.length})</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Swiper Carousel */}
        {currentData.length > 0 ? (
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={3}
            centeredSlides={true}
            loop={currentData.length > 3}
            speed={1000}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {currentData.map((item, i) => (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <div className={`relative overflow-hidden pt-14 pb-5 transition-all duration-700 ${isActive ? 'scale-100 brightness-105' : 'scale-95 opacity-95'}`}>
                    <img className='venue-card ' src={cardBg} alt="" />
                    <div className="p-4 bg-[#f2f2f2] shadow-sm rounded-xl relative ">
                      <div className='relative rounded-xl overflow-hidden'>
                        <div className='relative'>
                          <img src={item.img} alt={item.type === "wedding" ? item.couple : item.name} className="w-full h-72 object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          {item.type === "wedding" ? (
                            <>
                              <h3 className="text-lg font-bold flex items-center gap-2">
                                <Users className="w-6 h-6" /> {item.couple}
                              </h3>
                              <p className="text-sm opacity-90">{item.location}</p>
                            </>
                          ) : (
                            <>
                              <h3 className="text-xl font-bold">{item.name}</h3>
                              <p className="text-sm opacity-90">{item.cat}</p>
                            </>
                          )}
                        </div>
                      </div>

                      <a
                        href={item.link}
                        className={`absolute hidden bottom-[-10px] left-1/2 -translate-x-1/2 font-bold px-5 py-2 rounded-lg transition-all duration-500 text-sm shadow-2xl whitespace-nowrap ${
                          isActive ? 'text-white scale-110' : 'bg-white text-gray-800'
                        }`}
                        style={isActive ? { background: 'linear-gradient(to right, #FF0100, #CD9B35)', display:'block' } : {}}
                      >
                        {item.type === "wedding" ? `${item.budget} Wedding` : `${item.price} Onwards`}
                      </a>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-24">
            <Sparkles className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-2xl text-gray-500">Coming Soon...</p>
          </div>
        )}

        {/* Custom 5 Dots */}
        {currentData.length > 0 && (
          <div className="flex justify-center gap-3 mt-10">
            {Array.from({ length: Math.min(visibleDotCount, totalSlides) }, (_, i) => {
              const startIndex = getStartIndex();
              const dotIndex = startIndex + i;
              const isActiveDot = dotIndex === activeIndex;

              return (
                <button
                  key={i}
                  onClick={() => swiperRef.current?.slideToLoop(dotIndex)}
                  className={`transition-all duration-500 rounded-full ${
                    isActiveDot ? 'w-8 h-2 bg-red-600 shadow-lg shadow-red-600/50' : 'w-2 h-2 bg-gray-800'
                  }`}
                />
              );
            })}
          </div>
        )}

        

      </div>
    </section>
  );
};

export default UltimateBrowseSection;