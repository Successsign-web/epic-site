import React, { useState, useEffect } from "react";
import ListingCard from "../ListingCard";
import { Sparkles } from "lucide-react";
import LoadingSpinner from "../LoadingSpinner"; // Import LoadingSpinner

const VenueCardsGrid = ({ venues, loading, error }) => {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    if (Array.isArray(venues)) {
      setFilteredVenues(venues);
      setVisibleCount(8);
    } else {
      setFilteredVenues([]);
    }
  }, [venues]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600 font-medium">Error: {error.message}</div>;
  }

  const venuesToShow = filteredVenues.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venuesToShow.map((venue) => (
            <ListingCard key={venue._id} venue={venue} />
          ))}
        </div>

        {visibleCount < filteredVenues.length && (
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

        {visibleCount >= filteredVenues.length && filteredVenues.length > 0 && (
          <div className="text-center mt-10 text-gray-600 font-medium">
            🎉 You've seen all the venues!
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCardsGrid;