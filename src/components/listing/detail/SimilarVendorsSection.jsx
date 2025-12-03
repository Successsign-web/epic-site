import React, { useState } from "react";
import ListingCard from "../../ListingCard";
import { Sparkles } from "lucide-react";

const SimilarVendorsSection = () => {
  const allVenues = [
    {
      id: 10,
      title: "2017 Gulfstream Ameri-lite Farmhouse",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818636c00b50.png",
      link: "https://epic.successsign.shop/venue/10",
      feature: "Farm House",
      views: 96200,
      location: "Azamgarh, Uttar Pradesh",
      price: "50,000 onwards",
      videoCall: true,
      isNew: true,
      isPremium: true,
      rating: 4.8,
      capacity: "800 Guests",
    },
    {
      id: 3,
      title: "Luxury Banquet Hall Delhi",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-03-10-67ceade7d99e1.png",
      link: "https://epic.successsign.shop/venue/3",
      feature: "Banquet Hall",
      views: 33100,
      location: "New Delhi",
      price: "1,20,000 onwards",
      videoCall: false,
      isNew: false,
      isPremium: true,
      rating: 4.5,
      capacity: "600 Guests",
    },
    {
      id: 15,
      title: "The Heritage Palace",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818636c00b50.png",
      link: "#",
      feature: "Heritage Hotel",
      views: 78400,
      location: "Jaipur, Rajasthan",
      price: "1,50,000 onwards",
      videoCall: true,
      isNew: false,
      isPremium: true,
      rating: 4.9,
      capacity: "1000 Guests",
    },
    {
      id: 22,
      title: "Green Valley Resort",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-03-10-67ceade7d99e1.png",
      link: "#",
      feature: "Resort",
      views: 65200,
      location: "Lonavala, Maharashtra",
      price: "80,000 onwards",
      videoCall: true,
      isNew: true,
      isPremium: false,
      rating: 4.7,
      capacity: "700 Guests",
    },
    {
      id: 28,
      title: "Royal Gardens Banquet",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818636c00b50.png",
      link: "#",
      feature: "Banquet Hall",
      views: 48900,
      location: "Mumbai",
      price: "90,000 onwards",
      videoCall: false,
      isNew: false,
      isPremium: true,
      rating: 4.6,
      capacity: "900 Guests",
    },
    {
      id: 35,
      title: "Sunset Beach Resort",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-03-10-67ceade7d99e1.png",
      link: "#",
      feature: "Beach Resort",
      views: 91200,
      location: "Goa",
      price: "1,80,000 onwards",
      videoCall: true,
      isNew: true,
      isPremium: true,
      rating: 4.9,
      capacity: "1200 Guests",
    },
    {
      id: 41,
      title: "Dreamland Farmhouse",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-05-05-6818636c00b50.png",
      link: "#",
      feature: "Farm House",
      views: 57300,
      location: "Gurgaon, Haryana",
      price: "65,000 onwards",
      videoCall: true,
      isNew: false,
      isPremium: false,
      rating: 4.4,
      capacity: "500 Guests",
    },
    {
      id: 47,
      title: "Grand Celebration Palace",
      image: "https://epic.successsign.shop/storage/app/public/venue/thumbnails/2025-03-10-67ceade7d99e1.png",
      link: "#",
      feature: "Palace",
      views: 82100,
      location: "Udaipur, Rajasthan",
      price: "2,00,000 onwards",
      videoCall: false,
      isNew: true,
      isPremium: true,
      rating: 5.0,
      capacity: "1500 Guests",
    },
  ];

  const [visibleCount, setVisibleCount] = useState(4);
  const venuesToShow = allVenues.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Similar Vendors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venuesToShow.map((venue) => (
            <ListingCard key={venue.id} venue={venue} />
          ))}
        </div>

        {visibleCount < allVenues.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleShowMore}
              className="btngradiant text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Sparkles size={18} />
              Show More Venues
            </button>
          </div>
        )}

        {visibleCount >= allVenues.length && allVenues.length > 4 && (
          <div className="text-center mt-10 text-gray-600 font-medium">
            🎉 You have seen all the venues!
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarVendorsSection;
