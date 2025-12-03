import React from 'react';
import HeroSection from '../../components/listing/HeroSection';
import ListingHeader from '../../components/listing/ListingHeader'; // Import the new component
import FilterSection from '../../components/listing/FilterSection';
import VendorCard from '../../components/listing/VendorCard'; // Import the new VendorCard component

const ListingPage = () => {
  

  return (
    <div>
      <HeroSection />
      <FilterSection />
      <ListingHeader /> 
      <VendorCard />
      
      
    </div>
  );
};

export default ListingPage;
