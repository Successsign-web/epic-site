import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, IndianRupee, Crown } from 'lucide-react';
import Headingicon from "../../assets/icons/title-img.webp";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// --- Full Dummy Data ---
const premiumVenues = [
    {
        _id: "pv1",
        title: "The Grand Imperial Palace",
        description: "Experience unparalleled luxury and majestic service at our 5-star hotel.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
        venueCategory: { name: "5 Star Hotel", slug: "5-star-hotel" },
        location: { city: { name: "Udaipur" }, state: { name: "Rajasthan" } },
        startingPrice: 150000,
        rating: 4.9,
        isPremium: true
    },
    {
        _id: "pv2",
        title: "Azure Beach Resort & Spa",
        description: "A breathtaking luxury resort by the sea, perfect for destination weddings.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
        venueCategory: { name: "Luxury Resort", slug: "luxury-resort" },
        location: { city: { name: "Goa" }, state: { name: "Goa" } },
        startingPrice: 120000,
        rating: 4.8,
        isPremium: true
    },
    {
        _id: "pv3",
        title: "The Royal Orchid Garden",
        description: "An exclusive farmhouse offering a blend of elegance and natural beauty.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
        venueCategory: { name: "Luxury Farmhouse", slug: "luxury-farmhouse" },
        location: { city: { name: "Delhi" }, state: { name: "NCR" } },
        startingPrice: 100000,
        rating: 4.7,
        isPremium: true
    },
    {
        _id: "pv4",
        title: "Skyline Grand Hotel",
        description: "Modern elegance with stunning city views for an unforgettable event.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
        venueCategory: { name: "5 Star Hotel", slug: "5-star-hotel" },
        location: { city: { name: "Mumbai" }, state: { name: "Maharashtra" } },
        startingPrice: 130000,
        rating: 4.9,
        isPremium: true
    }
];

const premiumServices = [
    {
        _id: "ps1",
        title: "Elite Wedding Photography",
        description: "Capturing your special moments with artistic vision and professional finesse.",
        image: "https://images.unsplash.com/photo-1522108785324-4f4a5c5c0c0c?q=80&w=1925&auto=format&fit=crop",
        serviceCategory: { name: "Photography", slug: "photography" },
        location: { city: { name: "Delhi" }, state: { name: "NCR" } },
        startingPrice: 80000,
        rating: 4.9,
        isPremium: true
    },
    {
        _id: "ps2",
        title: "Luxury Bridal Makeup",
        description: "Transforming you into a radiant bride with bespoke makeup artistry.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
        serviceCategory: { name: "Makeup Artist", slug: "makeup-artist" },
        location: { city: { name: "Mumbai" }, state: { name: "Maharashtra" } },
        startingPrice: 25000,
        rating: 4.8,
        isPremium: true
    },
    {
        _id: "ps3",
        title: "Exquisite Wedding Decorators",
        description: "Crafting breathtaking backdrops and ambiance for your dream wedding.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
        serviceCategory: { name: "Decorators", slug: "decorators" },
        location: { city: { name: "Bengaluru" }, state: { name: "Karnataka" } },
        startingPrice: 100000,
        rating: 4.7,
        isPremium: true
    },
    {
        _id: "ps4",
        title: "Premium Catering Services",
        description: "Delight your guests with an unparalleled culinary experience.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop",
        serviceCategory: { name: "Caterers", slug: "caterers" },
        location: { city: { name: "Hyderabad" }, state: { name: "Telangana" } },
        startingPrice: 90000,
        rating: 4.9,
        isPremium: true
    }
];

const PremiumServices = () => {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('venues');

    // Dynamic Data Selection
    const currentData = selectedCategory === 'venues' ? premiumVenues : premiumServices;
    const totalSlides = currentData.length;
    const visibleDotCount = 5;

    // Custom Pagination Logic
    const getStartIndex = () => {
        let start = activeIndex - Math.floor(visibleDotCount / 2);
        if (start < 0) start = 0;
        if (activeIndex > totalSlides - Math.floor(visibleDotCount / 2) - 1 && totalSlides >= visibleDotCount) {
            start = totalSlides - visibleDotCount;
        } else if (totalSlides < visibleDotCount) {
            start = 0;
        }
        return start;
    };

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-6">
                
                {/* Section Heading */}
                <div className='flex justify-center items-center flex-col mb-12 text-center'>
                    <p className="text-gray-600 text-lg">Exclusive Choices for Your Perfect Day</p>
                    <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-600 mb-4">Premium Listings</h2>
                    <img src={Headingicon} alt="decoration" />
                </div>

                {/* Selection Buttons (Your Original Design) */}
                <div className="flex justify-center mb-10">
                    <button
                        onClick={() => { setSelectedCategory('venues'); setActiveIndex(0); }}
                        className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                            selectedCategory === 'venues'
                                ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } rounded-l-full focus:outline-none`}
                    >
                        Premium Venues
                    </button>
                    <button
                        onClick={() => { setSelectedCategory('services'); setActiveIndex(0); }}
                        className={`px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                            selectedCategory === 'services'
                                ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        } rounded-r-full focus:outline-none`}
                    >
                        Premium Services
                    </button>
                </div>

                {/* Swiper Content */}
                <div className="relative">
                    <Swiper
                        key={selectedCategory} // Force re-render on tab change
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                        modules={[Autoplay]}
                        spaceBetween={24}
                        slidesPerView={1}
                        loop={true}
                        speed={800}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        breakpoints={{
                            640: { slidesPerView: 1.2 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {currentData.map((item) => (
                            <SwiperSlide key={item._id}>
                                <Link 
                                    to={`/listing?category=${(item.venueCategory || item.serviceCategory).slug}&city=${item.location.city.name.toLowerCase().replace(/ /g, '-')}`} 
                                    className="group block rounded-2xl overflow-hidden shadow-md my-3 bg-white h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                                >
                                    <div className="relative overflow-hidden">
                                        <img src={item.image} alt={item.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
                                        {item.isPremium && (
                                            <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                                                <Crown size={14} /> Premium
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors mb-2 line-clamp-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                                        <div className="flex items-center justify-between text-sm text-gray-700 mb-4">
                                            <span className="flex items-center gap-1"><MapPin size={16} /> {item.location.city.name}, {item.location.state.name}</span>
                                            <span className="flex items-center gap-1"><Star size={16} className="fill-yellow-500 text-yellow-500" /> {item.rating}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                            <span className="text-lg font-bold text-red-600 flex items-baseline">
                                                <IndianRupee size={16} className="mr-1" />{item.startingPrice.toLocaleString('en-IN')}
                                                <span className="text-sm text-gray-500 font-normal ml-1">
                                                    {selectedCategory === 'venues' ? '/ event' : '/ onwards'}
                                                </span>
                                            </span>
                                            <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-sm font-semibold rounded-full hover:shadow-md transition">
                                                View Details
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Pagination Dots */}
                    <div className="flex justify-center gap-3 mt-10">
                        {Array.from({ length: Math.min(visibleDotCount, totalSlides) }).map((_, i) => {
                            const startIndex = getStartIndex();
                            const dotIndex = startIndex + i;
                            const isActive = dotIndex === activeIndex;

                            return (
                                <button
                                    key={i}
                                    onClick={() => swiperRef.current?.slideToLoop(dotIndex)}
                                    className={`transition-all duration-500 rounded-full ${
                                        isActive
                                            ? 'w-10 h-2 bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg'
                                            : 'w-2 h-2 bg-gray-400'
                                    }`}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Explorer Button */}
                <div className="text-center mt-16">
                    <Link
                        to="/listing?isPremium=true&type=all"
                        className="group inline-flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg rounded-sm transition-all duration-500 hover:shadow-xl active:scale-95"
                    >
                        <span>Explore All Premium Listings</span>
                        <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PremiumServices;