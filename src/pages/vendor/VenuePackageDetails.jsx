import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Loader2, ArrowLeft, Edit, Trash2, MapPin, Users, Video, Star, Crown, Sparkles } from 'lucide-react';

const VenuePackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const token = localStorage.getItem('vendorToken');
        const res = await api.get(`/vendor/venue-packages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPkg(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load package details');
      } finally {
        setLoading(false);
      }
    };
    fetchPackage();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this venue package?')) return;
    try {
      const token = localStorage.getItem('vendorToken');
      await api.delete(`/vendor/venue-packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Venue package deleted successfully');
      navigate('/vendor/manage-packages');
    } catch (err) {
      toast.error('Failed to delete package');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600 w-10 h-10" /></div>;

  if (!pkg) return <div className="text-center text-red-600 text-xl">Package not found</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/vendor/manage-packages')}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600"
        >
          <ArrowLeft size={20} /> Back to Packages
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/vendor/edit-venue-package/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Edit size={18} /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{pkg.title}</h1>
      <p className="text-gray-600 mb-6">{pkg.venueCategory?.name || 'Venue'}</p>

      {/* Main Image */}
      <img
        src={pkg.featuredImage?.url || 'https://source.unsplash.com/random/1200x600/?wedding'}
        alt={pkg.title}
        className="w-full h-96 object-cover rounded-xl mb-6"
      />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Location</p>
          <p className="font-medium flex items-center gap-2">
                      </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Capacity</p>
          <p className="font-medium flex items-center gap-2">
            <Users size={18} /> {pkg.services?.capacity || 'N/A'}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Starting Price</p>
          <p className="font-medium text-red-600 text-xl">
            ₹{Number(pkg.startingPrice).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Description</h2>
        <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: pkg.description || 'No description available' }} />
      </div>

      {/* Services */}
      {pkg.services && Object.keys(pkg.services).length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Services Included</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(pkg.services).map(([key, value]) => (
              <li key={key} className="bg-gray-50 p-3 rounded-lg">
                <span className="font-medium capitalize">{key}</span>: {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Photo Albums */}
      {pkg.photoAlbums?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Photo Albums</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pkg.photoAlbums.map((album, i) => (
              <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={album.thumbnail?.url || album.images?.[0]?.url}
                  alt={album.title}
                  className="w-full h-40 object-cover"
                />
                <p className="text-center text-sm p-2">{album.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {pkg.videos?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pkg.videos.map((video, i) => (
              <div key={i} className="bg-gray-100 p-4 rounded-lg">
                <p className="font-medium">{video.title}</p>
                <a
  href={
    video?.url?.startsWith("http")
      ? video.url
      : `https://${video.url}`
  }
  target="_blank"
  rel="noopener noreferrer"
  className="text-red-600 hover:underline"
>
  Watch Video
</a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAQs */}
      {pkg.faqs?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {pkg.faqs.map((faq, index) => (
              <details key={index} className="group bg-gray-50 rounded-lg overflow-hidden">
                <summary className="flex justify-between items-center p-5 cursor-pointer list-none font-medium text-gray-800 hover:bg-gray-100">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180 text-red-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VenuePackageDetails;