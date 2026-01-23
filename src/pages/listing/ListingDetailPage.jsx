import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import MainContent from '../../components/listing/detail/MainContent';
import Sidebar from '../../components/listing/detail/Sidebar';
import SimilarVendorsSection from '../../components/listing/detail/SimilarVendorsSection';
import ProductsSection from '../../components/listing/detail/ProductsSection'; // Import new component
import LoadingSpinner from '../../components/LoadingSpinner';

const dummyProducts = [
  { id: 'prod1', name: 'Custom Bridal Bouquet', description: 'Fresh flowers, custom design.', price: 4999, image: 'https://via.placeholder.com/300/FF0000/FFFFFF?Text=Product1' },
  { id: 'prod2', name: 'Personalized Welcome Sign', description: 'Acrylic or wooden welcome sign.', price: 7500, image: 'https://via.placeholder.com/300/00FF00/FFFFFF?Text=Product2' },
  { id: 'prod3', name: 'Guest Favor Box (Set of 50)', description: 'Includes assorted sweets and a thank you note.', price: 10000, image: 'https://via.placeholder.com/300/0000FF/FFFFFF?Text=Product3' },
  { id: 'prod4', name: 'Varmala/Garland Set', description: 'Matching rose garlands for bride and groom.', price: 8000, image: 'https://via.placeholder.com/300/FFFF00/000000?Text=Product4' },
];

const ListingDetailPage = () => {
  const { id } = useParams();
  const [venueData, setVenueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/public/venue-packages/${id}`);
       
        if (response.data && response.data.data) {
          // Augment the data with dummy products for the demo
          const augmentedData = {
            ...response.data.data,
            products: dummyProducts 
          };
          setVenueData(augmentedData);
        } else {
          setError('No data found for this venue.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch venue details.');
        console.error("Failed to fetch venue details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchVenueDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        Error: {error}
      </div>
    );
  }
  
  if (!venueData) {
    return <div className="text-center mt-10">Venue not found.</div>;
  }

  const detailImages = [];
  if (venueData.featuredImage?.url) {
    detailImages.push(venueData.featuredImage.url);
  }
  if (venueData.photoAlbums && Array.isArray(venueData.photoAlbums)) {
    venueData.photoAlbums.forEach(album => {
      if (album.url) {
        detailImages.push(album.url);
      }
    });
  }

  return (
    <>
      <div id="detail" className="container mx-auto px-4 pt-8">
        {/* Breadcrumb Section */}
        <section className="bg-white py-3 px-4 rounded-md mb-6">
          <div className="container-fluide">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-red-500">Home</Link>
              <span>/</span>
              <Link to="/listing" className="hover:text-red-500">Wedding Venues</Link>
              <span>/</span>
              <span className="text-gray-800 font-semibold">{venueData.title || 'Detail'}</span>
            </div>
          </div>
        </section>

        <div className="lg:flex lg:flex-row lg:items-start lg:gap-x-8">
          {/* Main Content */}
          <div className="w-full lg:w-8/12">
            <MainContent venueData={venueData} detailImages={detailImages} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-4/12 lg:sticky lg:top-20">
            <Sidebar venueData={venueData} />
          </div>
        </div>
      </div>
      
      {/* Products Section */}
      <ProductsSection products={venueData.products} />
      
      {/* Similar Vendors Section */}
      <SimilarVendorsSection 
        currentVenueId={venueData._id} 
        currentVenueCategorySlug={venueData.venueCategory?.slug} 
      />
    </>
  );
};

export default ListingDetailPage;