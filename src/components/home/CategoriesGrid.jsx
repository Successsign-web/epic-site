import React from 'react';
import Headingicon from "../../assets/icons/title-img.webp";
import bgImg from "../../assets/icons/venue.webp";

const CenterStartMarquee = () => {
  const categories = [
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818672372eee.png", title: "Banquet Hall", link: "/category/banquet" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-681866939caf6.png", title: "Luxury Resort", link: "/category/resort" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-68186603a7121.png", title: "Beach Resort", link: "/category/beach" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-681864e38c38d.png", title: "Farm House", link: "/category/farmhouse" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818636c00b50.png", title: "Wedding Lawn", link: "/category/lawn" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818625537260.png", title: "5-Star Hotel", link: "/category/hotel" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818616227372.png", title: "Royal Banquet", link: "/category/royal" },
    { img: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-68185ee7d4057.png", title: "Hill Resort", link: "/category/hill" },
  ];

  const duplicatedCategories = [...categories, ...categories];

  return (
    <section className="py-16 catgorybox" >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex justify-center items-center flex-col mb-12">
          <p className="text-gray-600 text-lg">Explore by Category</p>
          <h2 className="text-4xl font-bold gradient-text mb-4">Popular Categories</h2>
          <img src={Headingicon} alt="decoration"/>
        </div>

        {/* First Row - Left to Right */}
        <div className="relative overflow-hidden py-6">
          <div className="flex animate-marquee-left">
            {duplicatedCategories.map((cat, index) => (
              <a
                key={index}
                href={cat.link}
                className="mx-6 group flex flex-col items-center transition-all duration-500 hover:scale-110 flex-shrink-0"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-2xl border-4 border-white group-hover:border-red-600 transition-all duration-500">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <p className="mt-3 text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  {cat.title}
                </p>
                <span className="block w-12 h-1 bg-gradient-to-r from-red-600 to-orange-500 mt-1 scale-0 group-hover:scale-100 transition-transform duration-400 rounded-full"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="relative overflow-hidden py-6">
          <div className="flex animate-marquee-right">
            {duplicatedCategories.map((cat, index) => (
              <a
                key={index}
                href={cat.link}
                className="mx-6 group flex flex-col items-center transition-all duration-500 hover:scale-110 flex-shrink-0"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-2xl border-4 border-white group-hover:border-red-600 transition-all duration-500">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <p className="mt-3 text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  {cat.title}
                </p>
                <span className="block w-12 h-1 bg-gradient-to-r from-red-600 to-orange-500 mt-1 scale-0 group-hover:scale-100 transition-transform duration-400 rounded-full"></span>
              </a>
            ))}
          </div>
        </div>

        {/* View All Button - Center Mein */}
        <div className="flex justify-center mt-12">
          <a
            href="/all-categories"
            className="group inline-flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg   transition-all duration-500"
          >
            <span>View All Categories</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* CSS for Perfect Center Start + Infinite Loop */}
      <style jsx>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left { animation: marquee-left 40s linear infinite; }
        .animate-marquee-right { animation: marquee-right 40s linear infinite; }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CenterStartMarquee;