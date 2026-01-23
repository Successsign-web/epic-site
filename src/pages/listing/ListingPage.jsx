import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeroSection from '../../components/listing/HeroSection';
import ListingHeader from '../../components/listing/ListingHeader';
import FilterSection from '../../components/listing/FilterSection';
import VendorCard from '../../components/listing/VendorCard';
import api from '../../utils/axiosInstance';

const ListingPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');
  const cityFilter = queryParams.get('city');
  const searchFilter = queryParams.get('search');
  const isPremiumFilter = queryParams.get('isPremium') === 'true'; // Get isPremium flag
  const isPopularFilter = queryParams.get('isPopular') === 'true'; // Get isPopular flag

  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all venues
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/public/venue-packages`);
        if (response.data && Array.isArray(response.data.data)) {
          setVenues(response.data.data);
        }
        else {
          setVenues([]);
        }
        setLoading(false);
      }
      catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  // Filter venues when data or filters change
  useEffect(() => {
    let currentVenues = venues;

    // Apply search filter
    if (searchFilter) {
      currentVenues = currentVenues.filter(venue =>
        venue.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Apply premium filter
    if (isPremiumFilter) {
      currentVenues = currentVenues.filter(venue => venue.isPremium);
    }

    // Apply popular filter
    if (isPopularFilter) {
      currentVenues = currentVenues.filter(venue => venue.isPopular);
    }

    // Apply city filter
    if (cityFilter) {
      currentVenues = currentVenues.filter(venue => 
        venue.location?.city?.name.toLowerCase().replace(/ /g, '-') === cityFilter
      );
    }

    // Then apply category filter on the result
    if (categoryFilter) {
      const rawKeywords = categoryFilter.toLowerCase().split('-');
      const keywordsToSearch = new Set();
      rawKeywords.forEach(keyword => {
        keywordsToSearch.add(keyword);
        if (keyword.endsWith('s') && keyword.length > 1) {
          keywordsToSearch.add(keyword.slice(0, -1));
        }
        if (keyword === 'halls') keywordsToSearch.add('hall');
        if (keyword === 'venues') keywordsToSearch.add('venue');
      });

      currentVenues = currentVenues.filter(venue => {
        const venueFeatureLower = venue.venueCategory?.name ? venue.venueCategory.name.trim().toLowerCase() : '';
        const venueTitleLower = venue.title ? venue.title.trim().toLowerCase() : '';
        const isMatch = Array.from(keywordsToSearch).some(keyword =>
          venueFeatureLower.includes(keyword) || venueTitleLower.includes(keyword)
        );
        return isMatch;
      });
    }
    
    setFilteredVenues(currentVenues);
  }, [venues, categoryFilter, cityFilter, searchFilter, isPremiumFilter, isPopularFilter]);

  return (
    <div>
      <HeroSection />
      <FilterSection />
      <ListingHeader resultsCount={filteredVenues.length} />
      <VendorCard venues={filteredVenues} loading={loading} error={error} />
    </div>
  );
};

export default ListingPage;


