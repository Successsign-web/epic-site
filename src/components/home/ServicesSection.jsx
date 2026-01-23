import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import api from '../../utils/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';
import Headingicon from "../../assets/icons/title-img.webp";

const ServicesSection = () => {
  const [servicesData, setServicesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/public/service-categories'); // Reverted to service-categories
        if (response.data && Array.isArray(response.data.data)) {
          setServicesData(response.data.data);
        } else {
          console.warn("API response data for services is not an array:", response.data);
          setServicesData([]);
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch services:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading services. Please try again later.
      </div>
    );
  }

  if (servicesData.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No services available.
      </div>
    );
  }

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className='flex justify-center items-center flex-col mb-8'>
                
                 <h2 className="text-4xl  font-bold gradient-text mb-4">
                  Wedding Services
                </h2>
                <img className='text-center' src={Headingicon} alt="heading-icon" />
                <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
                  Look at the best wedding services for every party
                </p>
               </div>
        

        <div className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <Link
              to={`/listing-services?category=${service.slug}`} // Navigate to service listing page with category slug
              key={service._id} // Assuming _id is available and unique
              className="relative bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 h-64 flex items-end group"
            >
              <img
                src={service.image?.url || 'https://via.placeholder.com/400x300'} // Assuming image.url for services
                alt={service.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-60 transition-opacity duration-300"></div>

              <div className="relative z-10 p-8 text-left text-white">
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p className="text-sm mt-1">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/listing-services"
            className="group inline-flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg transition-all duration-500"
          >
            <span>View All Services</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ServicesSection;