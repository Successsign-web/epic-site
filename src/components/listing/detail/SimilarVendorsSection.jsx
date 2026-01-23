import React, { useState, useEffect } from "react";
import ListingCard from "../../ListingCard";
import { Sparkles } from "lucide-react";
import api from '../../../utils/axiosInstance';
import LoadingSpinner from '../../LoadingSpinner';

const dummyVenues = [
  {
    _id: "dummy1",
    featuredImage: { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    title: "Grand Palace Hall (Dummy)",
    venueCategory: { name: "Banquet Halls", slug: "banquet-halls" },
    rating: 4.5,
    location: { city: { name: "Delhi" }, state: { name: "NCR" } },
    capacity: 500,
    startingPrice: 2500,
    isPremium: true,
  },
  {
    _id: "dummy2",
    featuredImage: { url: 'https://images.unsplash.com/photo-1604355259422-75210414387d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    title: "Sunset Gardens (Dummy)",
    venueCategory: { name: "Lawns/Farmhouse", slug: "lawns-farmhouse" },
    rating: 4.8,
    location: { city: { name: "Jaipur" }, state: { name: "Rajasthan" } },
    capacity: 1000,
    startingPrice: 5000,
    isNew: true,
  },
  {
    _id: "dummy3",
    featuredImage: { url: 'https://images.unsplash.com/photo-15955145356掑-9f5855a4009e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    title: "The Royal Hotel (Dummy)",
    venueCategory: { name: "Hotels", slug: "hotels" },
    rating: 4.2,
    location: { city: { name: "Mumbai" }, state: { name: "Maharashtra" } },
    capacity: 300,
    startingPrice: 3500,
  },
  {
    _id: "dummy4",
    featuredImage: { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    title: "Seaside Resort (Dummy)",
    venueCategory: { name: "Resorts", slug: "resorts" },
    rating: 4.9,
    location: { city: { name: "Goa" }, state: { name: "Goa" } },
    capacity: 400,
    startingPrice: 8000,
    videoCall: true,
  },
  {
    _id: "dummy5",
    featuredImage: { url: 'https://images.unsplash.com/photo-1590057889319-3f736e39335e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG9טby1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    title: "Another Banquet Hall (Dummy)",
    venueCategory: { name: "Banquet Halls", slug: "banquet-halls" },
    rating: 4.0,
    location: { city: { name: "Delhi" }, state: { name: "NCR" } },
    capacity: 200,
    startingPrice: 1500,
  }
];


const SimilarVendorsSection = ({ currentVenueId, currentVenueCategorySlug }) => {
  const [similarVenues, setSimilarVenues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchAndSetVenues = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get('/public/venue-packages');
        if (response.data && Array.isArray(response.data.data)) {
          const filtered = response.data.data.filter(venue =>
            venue._id !== currentVenueId &&
            venue.venueCategory?.slug === currentVenueCategorySlug
          );

          if (filtered.length > 0) {
            setSimilarVenues(filtered);
          } else {
            // Fallback to dummy data if no real similar venues are found
            const dummyFiltered = dummyVenues.filter(venue => 
              venue.venueCategory.slug === currentVenueCategorySlug &&
              venue._id !== currentVenueId
            );
            setSimilarVenues(dummyFiltered);
          }
        } else {
          // Fallback if API response is not as expected
          const dummyFiltered = dummyVenues.filter(venue => 
            venue.venueCategory.slug === currentVenueCategorySlug &&
            venue._id !== currentVenueId
          );
          setSimilarVenues(dummyFiltered);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch data.');
        console.error("Failed to fetch similar venues:", err);
        // Fallback to dummy data on API error
        const dummyFiltered = dummyVenues.filter(venue => 
          venue.venueCategory.slug === currentVenueCategorySlug &&
          venue._id !== currentVenueId
        );
        setSimilarVenues(dummyFiltered);
      } finally {
        setIsLoading(false);
      }
    };

    if (currentVenueCategorySlug) {
      fetchAndSetVenues();
    } else {
      setIsLoading(false);
    }
  }, [currentVenueId, currentVenueCategorySlug]);

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50 flex justify-center items-center h-48">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 bg-gray-50 text-center text-red-600">
        Error loading similar vendors: {error}
      </div>
    );
  }

  const venuesToShow = similarVenues.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  if (similarVenues.length === 0) {
    return null; // Or a message saying "No similar vendors found"
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Similar Vendors</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venuesToShow.map((venue) => (
            <ListingCard key={venue._id} venue={venue} />
          ))}
        </div>

        {visibleCount < similarVenues.length && (
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

        {visibleCount >= similarVenues.length && similarVenues.length > 4 && (
          <div className="text-center mt-10 text-gray-600 font-medium">
            🎉 You have seen all the similar venues!
          </div>
        )}
      </div>
    </div>
  );
};

export default SimilarVendorsSection;
