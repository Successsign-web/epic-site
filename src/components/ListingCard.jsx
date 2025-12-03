import React from "react";
import { Link } from "react-router-dom";
import { Video, MapPin, Star, StarHalf, Crown, Sparkles, Users } from "lucide-react";

// Star Rating Component (moved here for self-containment)
const StarRating = ({ rating }) => {
  const safeRating = Number(rating);

  // Prevent crashes
  const fullStars = Number.isFinite(safeRating) && safeRating > 0  
    ? Math.floor(safeRating)  
    : 0;

  const hasHalf =
    Number.isFinite(safeRating) && safeRating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
      ))}
      {hasHalf && (
        <StarHalf size={14} className="fill-yellow-500 text-yellow-500" />
      )}
      <span className="text-xs text-gray-600 ml-1">
        {safeRating || 0}
      </span>
    </div>
  );
};


const ListingCard = ({ venue }) => {
  return (
    <Link to={`/listing/${venue.id}`}>
      <div
        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative group hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-2 flex-wrap">
          {venue.videoCall && (
            <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md animate-pulse">
              <Video size={13} />
              Available for Video Call
            </span>
          )}
          {venue.isNew && (
            <span className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
              <Sparkles size={13} />
              NEW
            </span>
          )}
          {venue.isPremium && (
            <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-md">
              <Crown size={14} />
            </span>
          )}
        </div>

        {/* Image */}
        <div className="block overflow-hidden">
          <img
            src={venue.image}
            alt={venue.title}
            className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-red-600 font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              {venue.feature}
            </span>
            <StarRating rating={venue.rating} />
          </div>

          <h3 className="text-base font-bold text-gray-800 line-clamp-2 hover:text-red-600 transition">
            {venue.title}
          </h3>

          <div className="flex justify-between items-center mt-2">
            <p className="text-gray-500 mt-2 text-xs flex items-center gap-1.5">
              <MapPin size={14} />
              {venue.location}
            </p>
            <p className="text-gray-600 mt-1 text-xs flex items-center gap-1.5">
              <Users size={14} />
              {venue.capacity}
            </p>
          </div>

          {/* Price + Book Now */}
          <div className="flex items-center justify-between mt-4 py-2 border-t border-b border-dashed border-red-400">
            <span className="text-red-600 text-sm font-[400] flex items-center gap-1">
              <span className="text-base">₹</span>
              {venue.price}
            </span>
            <div
              className="btngradiant text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-red-700 transition shadow"
            >
              Book Now
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
