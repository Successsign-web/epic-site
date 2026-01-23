import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ChevronRight, Sparkles } from 'lucide-react';
import baner1 from "../../assets/banner/banner1.jpg";
import baner2 from "../../assets/banner/banner2.jpg";
import baner3 from "../../assets/banner/banner3.jpg";
import baner4 from "../../assets/banner/banner4.jpg";
import baner5 from "../../assets/banner/banner4.png";
import Typewriter from "typewriter-effect";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [baner1, baner2, baner3, baner4, baner5];
  const [selectedCity, setSelectedCity] = useState(''); // State for city input
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    if (selectedCity) {
      navigate(`/listing?city=${selectedCity.toLowerCase().replace(/ /g, '-')}`);
    } else {
      // Optionally navigate to a default listing page or show an error
      navigate('/listing');
    }
  };

  return (
    <section className="relative h-screen overflow-hidden m-4 mt-0 rounded-2xl">
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img src={slide} alt={`Wedding ${index + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
          </div>
        ))}
      </div>

     
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
         
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 text-white space-y-6 animate-fadeInUp">
              <div className="flex items-center gap-3 mb-0">
                <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                <p className="text-yellow-300 font-medium tracking-wider">INDIA'S #1 WEDDING PLATFORM</p>
              </div>
              <h1 className="text-5xl md:text-5xl font-bold leading-tight">
                Plan Your
                <span className="block  bg-clip-text gradient-text">
                  <Typewriter
                    options={{
                      strings: ["Dream Wedding", "Perfect Day", "Grand Celebration"],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      deleteSpeed: 50,
                    }}
                  />
                </span>
                With India's Best Vendors
              </h1>
              <p className="text-lg text-gray-200 max-w-2xl leading-relaxed">
                Discover 50,000+ verified wedding venues & vendors in 100+ cities.
                From royal palaces to beach resorts — your perfect wedding starts here.
              </p>
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-1 h-14 pr-4 rounded-full border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    50K+
                  </div>
                  <span className="text-white font-medium">Verified Vendors</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-1 h-14 pr-4 rounded-full border border-white/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                    100+
                  </div>
                  <span className="text-white font-medium">Cities</span>
                </div>
              </div>
            </div>


            <div className="lg:col-span-5 animate-fadeInUp animation-delay-300">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30 max-w-lg mx-auto">
                <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-red-600 to-yellow-600 bg-clip-text text-transparent">
                  Find Your Perfect Wedding
                </h3>
                <div className="space-y-5">
                  {/* City */}
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                    <input
                      type="text"
                      placeholder="Enter City (Delhi, Mumbai, Jaipur...)"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all"
                      value={selectedCity} // Bind value
                      onChange={(e) => setSelectedCity(e.target.value)} // Handle change
                    />
                  </div>

                  {/* Service */}
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                    <select className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-300 appearance-none text-gray-800 text-md font-medium focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all">
                      <option>Wedding Venues</option>
                      <option>Photographers</option>
                      <option>Makeup Artists</option>
                      <option>Wedding Planners</option>
                      <option>Caterers</option>
                    </select>
                    <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
                  </div>

                  {/* Date & Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                      <input
                        type="date"
                        placeholder="Wedding Date"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-600" />
                      <input
                        type="text"
                        placeholder="Guests"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 text-gray-800 focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <button
                    onClick={handleSearch} // Attach handleSearch
                    className="w-full bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold text-lg py-3 rounded-xl  flex items-center justify-center gap-3 group"
                  >
                    <Search className="w-6 h-6 group-hover:translate-x-1 transition" />
                    Search Wedding Vendors
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </button>
                  <p className="text-center text-sm text-gray-600 mt-4">
                    Get free quotes from <span className="font-bold text-red-600">top 3 vendors</span> in your city
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Navigation Dots */}
     <div className="absolute bottom-4 right-16 z-20 flex space-x-3">
  {slides.map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentSlide(index)}
      style={
        currentSlide === index
          ? {
              background: "linear-gradient(to right, rgb(255,1,0), rgb(205,155,53), rgb(255,1,0))"
            }
          : {}
      }
      className={`w-3 h-3 rounded-full transition-all duration-300 transform 
        ${currentSlide === index
          ? 'scale-125 shadow-lg'
          : 'bg-white/40 hover:bg-white/70'
        }`}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>


      {/* Custom CSS */}
      <style jsx>{`
        @keyframes shimmer-slow {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer-slow {
          animation: shimmer-slow 12s infinite linear;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;