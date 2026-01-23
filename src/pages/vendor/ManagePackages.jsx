import React, { useState, useEffect } from 'react';
import api from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Loader2, Edit, Trash2, Eye, Video, MapPin, Star, StarHalf, Crown, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManagePackages = () => {
  const [activeTab, setActiveTab] = useState('venue');
  const [venuePackages, setVenuePackages] = useState([]);
  const [servicePackages, setServicePackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const StarRating = ({ rating }) => {
    const r = Number(rating) || 0;
    const full = Math.floor(r);
    const half = r % 1 >= 0.5;

    return (
      <div className="flex items-center gap-0.5">
        {Array(full).fill().map((_, i) => (
          <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
        ))}
        {half && <StarHalf size={14} className="fill-yellow-500 text-yellow-500" />}
        <span className="text-xs text-gray-600 ml-1">{r.toFixed(1)}</span>
      </div>
    );
  };

  const PackageCard = ({ pkg, type }) => {
    const defaultImage = 'https://source.unsplash.com/random/400x300/?wedding-placeholder';

    return (
      <div
        className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden flex flex-col h-full cursor-pointer hover:shadow-xl transition"
        onClick={() => handleViewDetails(pkg.id, type)}
      >
        {/* Badges */}
        <div className="relative">
          <div className="absolute top-3 left-3 right-3 z-10 flex gap-2 flex-wrap">
            {pkg.videoCall && (
              <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md animate-pulse">
                <Video size={13} /> Video Call
              </span>
            )}
            {pkg.isNew && (
              <span className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                <Sparkles size={13} /> NEW
              </span>
            )}
            {pkg.isPremium && (
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-md">
                <Crown size={14} /> Premium
              </span>
            )}
          </div>
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-44 object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4 flex-grow">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-red-600 font-medium flex items-center gap-1">
              <div className="w-2 h-2 bg-red-600 rounded-full"></div>
              {pkg.feature}
            </span>
            <StarRating rating={pkg.rating} />
          </div>

          <h3 className="text-base font-bold text-gray-800 line-clamp-2">{pkg.title}</h3>

          {/* Location - only one line, no overflow */}
          <div className="flex items-center gap-1.5 mt-2">
             <MapPin size={14}  />
          <p
  className="text-gray-500 text-xs flex items-center gap-1.5 
  w-full truncate min-w-0"
>
  {pkg.location}
</p>
          </div>

          <p className="text-gray-600 text-xs mt-1 flex items-center gap-1.5">
            <Users size={14} />
            {pkg.capacity}
          </p>

          <div className="mt-4 py-2 border-tb border-b border-dashed border-red-400">
            <span className="text-red-600 text-sm font-medium flex items-center gap-1">
              <span className="text-base">₹</span>
              {pkg.price}
            </span>
          </div>
        </div>

        {/* Buttons - always visible at bottom */}
        <div className="flex justify-end gap-2 my-2 mx-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleViewDetails(pkg.id, type); }}
            className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-green-700"
          >
            <Eye size={16} /> View
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleEdit(pkg.id, type); }}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-blue-700"
          >
            <Edit size={16} /> Edit
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(pkg.id, type); }}
            className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm flex items-center gap-1 hover:bg-red-700"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    );
  };

  const transformPackage = (pkg, type) => ({
    id: pkg._id,
    image: pkg.featuredImage?.url || 'https://source.unsplash.com/random/400x300/?wedding-placeholder',
    title: pkg.title || 'Untitled Package',
    feature: type === 'venue' ? pkg.venueCategory?.name || 'Venue' : pkg.serviceCategory?.name || pkg.serviceSubCategory?.name || 'Service',
    rating: pkg.averageRating || 0,
        capacity: pkg.services?.capacity || 'N/A',
    price: pkg.startingPrice ? Number(pkg.startingPrice).toLocaleString() : 'N/A',
    videoCall: pkg.videos?.length > 0 || false,
    isNew: false,
    isPremium: false,
  });

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('vendorToken');
      const [venueRes, serviceRes] = await Promise.all([
        api.get('/vendor/venue-packages', { headers: { Authorization: `Bearer ${token}` } }),
        api.get('/vendor/service-packages', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setVenuePackages((venueRes.data?.data?.packages || []).map(p => transformPackage(p, 'venue')));
      setServicePackages((serviceRes.data?.data?.packages || []).map(p => transformPackage(p, 'service')));
    } catch (err) {
      console.error(err);
      setError('Failed to load packages');
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPackages(); }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm(`Delete this ${type} package?`)) return;
    try {
      const token = localStorage.getItem('vendorToken');
      await api.delete(`/vendor/${type}-packages/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} package deleted`);
      fetchPackages();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const handleEdit = (id, type) => {
    navigate(`/vendor/edit-${type}-package/${id}`);
  };

  const handleViewDetails = (id, type) => {
    navigate(`/vendor/${type}-package-details/${id}`);
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-red-600" /> Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-xl text-center font-bold mb-6">Manage My Packages</h1>

     <div className="mb-6 flex justify-center">
  <div className="relative bg-gray-100 shadow-md rounded-[30px] p-2">
    
    {/* Sliding Active Background */}
    <div
      className={`absolute top-2 left-2 h-[48px] bg-red-600 rounded-[30px] transition-all duration-300 ease-in-out
        ${
          activeTab === 'venue'
            ? 'w-[190px] translate-x-0'
            : 'w-[190px] translate-x-[190px]'
        }
      `}
    />

    {/* Buttons */}
    <div className="relative flex gap-2">
      <button
        onClick={() => setActiveTab('venue')}
        className={`px-8 py-3 whitespace-nowrap rounded-[30px] text-sm font-medium z-10 transition-colors
          ${activeTab === 'venue' ? 'text-white' : 'text-gray-600'}
        `}
      >
        Venue Packages
      </button>

      <button
        onClick={() => setActiveTab('service')}
        className={`px-8 py-3 whitespace-nowrap rounded-[30px] text-sm font-medium z-10 transition-colors
          ${activeTab === 'service' ? 'text-white' : 'text-gray-600'}
        `}
      >
        Service Packages
      </button>
    </div>

  </div>
</div>


      {activeTab === 'venue' && (
        <>
          <h2 className="text-md bg-gray-200 rounded-sm p-3 font-semibold mb-4">Your Venue Packages</h2>
          {venuePackages.length === 0 ? (
            <p className="text-gray-600">No venue packages found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venuePackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="venue" />)}
            </div>
          )}
        </>
      )}

      {activeTab === 'service' && (
        <>
          <h2 className="text-md bg-gray-200 rounded-sm p-3 font-semibold mb-4">Your Service Packages</h2>
          {servicePackages.length === 0 ? (
            <p className="text-gray-600">No service packages found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicePackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} type="service" />)}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManagePackages;