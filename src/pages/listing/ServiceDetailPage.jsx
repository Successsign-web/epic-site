import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../utils/axiosInstance';
import LoadingSpinner from '../../components/LoadingSpinner';
import MainContent from '../../components/listing/detail/MainContent';
import Sidebar from '../../components/listing/detail/Sidebar';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [servicePackage, setServicePackage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServicePackageDetails = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/public/service-packages/${id}`);
       
        if (response.data && response.data.data) {
          setServicePackage(response.data.data);
        } else {
          setError('No data found for this service.');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch service details.');
        console.error("Failed to fetch service details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchServicePackageDetails();
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
  
  if (!servicePackage) {
    return <div className="text-center mt-10">Service not found.</div>;
  }

  const detailImages = [];
  if (servicePackage.featuredImage?.url) {
    detailImages.push(servicePackage.featuredImage.url);
  }
  if (servicePackage.photoAlbums && Array.isArray(servicePackage.photoAlbums)) {
    servicePackage.photoAlbums.forEach(album => {
      if (album.url) {
        detailImages.push(album.url);
      }
    });
  }
  
  // Map servicePackage data to the structure expected by MainContent and Sidebar
  const mappedData = {
      ...servicePackage,
      venueCategory: servicePackage.service, // Assuming servicePackage.service has a similar structure to venueCategory
  };

  return (
    <>
      <div id="detail" className="container mx-auto px-4 pt-8">
        {/* Breadcrumb Section */}
        <section className="bg-white py-3 px-4 rounded-md mb-6">
          <div className="container-fluide">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-red-500">Home</Link>
              <span>/</span>
              <Link to="/listing-services" className="hover:text-red-500">Services</Link>
              <span>/</span>
              <span className="text-gray-800 font-semibold">{servicePackage.title || 'Detail'}</span>
            </div>
          </div>
        </section>

        <div className="lg:flex lg:flex-row lg:items-start lg:gap-x-8">
          {/* Main Content */}
          <div className="w-full lg:w-8/12">
            <MainContent venueData={mappedData} detailImages={detailImages} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-4/12 lg:sticky lg:top-20">
            <Sidebar venueData={mappedData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceDetailPage;
