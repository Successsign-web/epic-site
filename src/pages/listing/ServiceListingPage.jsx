import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../../components/listing/HeroSection';
import ListingHeader from '../../components/listing/ListingHeader';
import FilterSection from '../../components/listing/FilterSection';
import ServiceCard from '../../components/listing/ServiceCard'; // Use the new ServiceCard component
import api from '../../utils/axiosInstance';

const ServiceListingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');
  
  const [servicePackages, setServicePackages] = useState([]);
  const [filteredServicePackages, setFilteredServicePackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all service packages
  useEffect(() => {
    const fetchServicePackages = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/public/service-packages`);
        if (response.data && Array.isArray(response.data.data)) {
          setServicePackages(response.data.data);
        } else {
          setServicePackages([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchServicePackages();
  }, []);

  // Filter service packages when data or filters change
  useEffect(() => {
    let currentServicePackages = servicePackages;

    if (categoryFilter) {
        currentServicePackages = currentServicePackages.filter(pkg =>
            pkg.service?.slug === categoryFilter
        );
    }
    
    setFilteredServicePackages(currentServicePackages);
  }, [servicePackages, categoryFilter]);

  return (
    <div>
      <HeroSection />
      <FilterSection />
      <ListingHeader resultsCount={filteredServicePackages.length} />
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading && <p>Loading...</p>}
            {error && <p>Error loading services.</p>}
            {!loading && !error && filteredServicePackages.map(pkg => (
              <ServiceCard key={pkg._id} servicePackage={pkg} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceListingPage;
