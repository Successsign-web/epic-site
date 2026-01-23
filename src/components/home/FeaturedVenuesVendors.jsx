import React from 'react';
import { MapPin, Users, Heart } from 'lucide-react';

const FeaturedVenuesVendors = () => {
  const featuredItems = [
    {
      type: "venue",
      name: "The Grand Ballroom",
      description: "An elegant space perfect for lavish celebrations, with stunning decor and capacity for 500+ guests.",
      image: "https://images.unsplash.com/photo-1549488319-f9c3141f1737?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
      icon: <MapPin className="w-6 h-6 text-red-600" />
    },
    {
      type: "vendor",
      name: "Eternal Moments Photography",
      description: "Capturing the raw emotions and candid moments of your special day with an artistic touch.",
      image: "https://images.unsplash.com/photo-1594918738320-b484435775f0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
      icon: <Users className="w-6 h-6 text-yellow-600" />
    },
    {
      type: "venue",
      name: "Secret Garden Estate",
      description: "A magical outdoor setting with lush greenery and charming pathways, ideal for a fairy-tale wedding.",
      image: "https://images.unsplash.com/photo-1620612194689-54316a761e3d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
      icon: <MapPin className="w-6 h-6 text-red-600" />
    },
    {
      type: "vendor",
      name: "Blissful Bites Catering",
      description: "Exquisite culinary creations and impeccable service to delight your guests with a memorable feast.",
      image: "https://images.unsplash.com/photo-1514933651105-0646ef9ffc11?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "#",
      icon: <Users className="w-6 h-6 text-yellow-600" />
    },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-display">
          <span className="text-red-600">Featured</span> Venues & Vendors
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover hand-picked selections of the finest wedding venues and most trusted vendors to make your day extraordinary.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white text-xl font-bold flex items-center space-x-2">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-base mb-4">{item.description}</p>
                <a
                  href={item.link}
                  className="inline-flex items-center px-6 py-2 border border-red-600 text-red-600 font-semibold rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 group-hover:tracking-wide"
                >
                  View Details <Heart className="ml-2 w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-16 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
          Browse All {featuredItems[0].type === "venue" ? "Venues" : "Vendors"}
        </button>
      </div>
    </section>
  );
};

export default FeaturedVenuesVendors;
