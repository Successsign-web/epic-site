import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Video } from "lucide-react"; // Import Video icon

const ServiceCard = ({ servicePackage }) => {
  const imageUrl = servicePackage.featuredImage?.url || 'https://via.placeholder.com/300x200';

  // Find the 'Video call' service and check its value
  const videoCallService = servicePackage.services && Object.values(servicePackage.services).find(
    (service) => service.name === 'Video call'
  );
  const isAvailableForVideoCall = videoCallService && videoCallService.value;

  return (
    <Link to={`/listing-services/${servicePackage._id}`}>
      <div
        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden relative group hover:shadow-xl transition-all duration-300 h-full"
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 z-10 flex gap-2 flex-wrap">
          {isAvailableForVideoCall && (
            <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md animate-pulse">
              <Video size={13} />
              Available for Video Call
            </span>
          )}
        </div>

        <div className="block overflow-hidden">
          <img
            src={imageUrl}
            alt={servicePackage.title}
            className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold text-gray-800 line-clamp-2 hover:text-red-600 transition">
            {servicePackage.title}
          </h3>
          <p className="text-gray-500 mt-2 text-xs flex items-center gap-1.5">
            <MapPin size={14} />
            {servicePackage.location?.city?.name}, {servicePackage.location?.state?.name}
          </p>
          <div className="flex items-center justify-between mt-4 py-2 border-t border-b border-dashed border-red-400">
            <span className="text-red-600 text-sm font-[400] flex items-center gap-1">
              <span className="text-base">₹</span>
              {servicePackage.startingPrice || 'N/A'}
            </span>
            <div
              className="btngradiant text-white text-xs font-medium px-3 py-1 rounded-full hover:bg-red-700 transition shadow"
            >
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
