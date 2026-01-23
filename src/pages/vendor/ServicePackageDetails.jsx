import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import {
  Loader2,
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Users,
  Video,
  Star,
  MessageCircleQuestion,
  DollarSign,
  List,
  Image as ImageIcon,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  FileText,
} from 'lucide-react';

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 text-left flex justify-between items-center focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <MessageCircleQuestion size={20} className="text-red-600" />
          <h3 className="text-base font-semibold text-gray-800">{question}</h3>
        </div>
        <span className="text-gray-600 transition-transform duration-300">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <div
        className={`px-5 pb-4 text-gray-700 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const ServicePackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const token = localStorage.getItem('vendorToken');
        const res = await api.get(`/vendor/service-packages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", res);          // FULL RESPONSE
console.log("API Status:", res.status);     // Status code
console.log("API Data:", res.data);         // Data object
console.log("Service Package Data:", res.data.data); // Actual data
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
    if (!window.confirm('Are you sure you want to delete this service package?')) return;
    try {
      const token = localStorage.getItem('vendorToken');
      await api.delete(`/vendor/service-packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Service package deleted successfully');
      navigate('/vendor/manage-packages');
    } catch (err) {
      toast.error('Failed to delete package');
    }
  };

  const openAlbum = (album, index = 0) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(index);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % selectedAlbum.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-red-600 w-10 h-10" /></div>;

  if (!pkg) return <div className="text-center text-red-600 text-xl">Package not found</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/vendor/manage-packages')}
          className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Packages
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/vendor/edit-service-package/${id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Edit size={18} /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors"
          >
            <Trash2 size={18} /> Delete
          </button>
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{pkg.title}</h1>
      <p className="text-gray-600 text-base mb-6">
        {pkg.serviceSubCategory?.name || pkg.serviceCategory?.name || 'Service'}
      </p>

      {/* Featured Image */}
      <img
        src={pkg.featuredImage?.url || 'https://source.unsplash.com/random/1200x600/?wedding'}
        alt={pkg.title}
        className="w-full h-80 md:h-96 object-cover rounded-xl mb-8 shadow-md"
      />

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <MapPin size={18} /> Location
          </p>
          <p className="font-medium text-base">{pkg.location?.fullAddress || pkg.location?.city || 'Multiple Locations'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <Users size={18} /> Capacity
          </p>
          <p className="font-medium text-base">{pkg.services?.capacity || 'N/A'}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600 flex items-center gap-2 mb-1">
            <DollarSign size={18} /> Starting Price
          </p>
          <p className="font-bold text-red-600 text-xl">₹{Number(pkg.startingPrice).toLocaleString()}</p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-10 pb-8 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
          <FileText size={22} className="text-red-600" /> Description
        </h2>
        <div className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: pkg.description || 'No description available' }} />
      </div>

      {/* Services Included */}
      {pkg.services && Object.keys(pkg.services).length > 0 && (
        <div className="mb-10 pb-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
            <List size={22} className="text-red-600" /> Services Included
          </h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(pkg.services).map(([key, value]) => (
              <li key={key} className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-base">
                <span className="font-medium capitalize">{key}</span>: {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* FAQs */}
      {pkg.faqs?.length > 0 && (
        <div className="mb-10 pb-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
            <MessageCircleQuestion size={22} className="text-red-600" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {pkg.faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      )}

      {/* Photo Albums */}
      {pkg.photoAlbums?.length > 0 && (
        <div className="mb-10 pb-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
            <ImageIcon size={22} className="text-red-600" /> Photo Albums
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pkg.photoAlbums.map((album, i) => (
              <div
                key={i}
                onClick={() => openAlbum(album)}
                className="bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow border border-gray-200"
              >
                <img
                  src={album.thumbnail?.url || album.images?.[0]?.url || 'https://source.unsplash.com/random/300x300/?wedding'}
                  alt={album.title}
                  className="w-full h-40 object-cover"
                />
                <p className="text-center text-sm p-3 font-medium">{album.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Videos */}
      {pkg.videos?.length > 0 && (
        <div className="mb-10 pb-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
            <PlayCircle size={22} className="text-red-600" /> Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pkg.videos.map((video, i) => (
              <div key={i} className="bg-gray-100 p-5 rounded-lg border border-gray-200">
                <p className="font-medium text-base mb-2">{video.title}</p>
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline text-sm">
                  Watch Video →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reviews */}
      {pkg.reviews?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-3">
            <Star size={22} className="text-red-600" /> Customer Reviews
          </h2>
          <div className="space-y-6">
            {pkg.reviews.map((review, i) => (
              <div key={i} className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={18} fill={idx < review.rating ? "#f59e0b" : "#e5e7eb"} className="text-yellow-500" />
                    ))}
                  </div>
                  <span className="font-medium text-base">{review.user?.name || 'Anonymous'}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {selectedAlbum && selectedAlbum.images?.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <button onClick={closeAlbum} className="absolute top-6 right-6 text-white text-4xl hover:text-gray-300 transition-colors">×</button>
          <button onClick={prevImage} className="absolute left-6 text-white text-5xl hover:text-gray-300 transition-colors">‹</button>
          <button onClick={nextImage} className="absolute right-6 text-white text-5xl hover:text-gray-300 transition-colors">›</button>
          <img
            src={selectedAlbum.images[currentImageIndex]?.url}
            alt={`${selectedAlbum.title} - ${currentImageIndex + 1}`}
            className="max-w-[90%] max-h-[90%] object-contain rounded-lg"
          />
          <div className="absolute bottom-6 text-white text-lg font-medium">
            {currentImageIndex + 1} / {selectedAlbum.images.length}
          </div>
          <div className="absolute top-6 left-6 text-white text-xl font-semibold">
            {selectedAlbum.title}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicePackageDetails;