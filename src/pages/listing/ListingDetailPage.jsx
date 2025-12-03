import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainContent from '../../components/listing/detail/MainContent';
import Sidebar from '../../components/listing/detail/Sidebar';
import SimilarVendorsSection from '../../components/listing/detail/SimilarVendorsSection';

const ListingDetailPage = () => {
  const { id } = useParams(); // Get the ID from the URL

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
              <span className="text-gray-800 font-semibold">Fun And Food Resorts</span> {/* Replace with dynamic name */}
            </div>
          </div>
        </section>

        <div className="lg:flex lg:flex-row lg:items-start lg:gap-x-8">
          {/* Main Content */}
          <div className="w-full lg:w-8/12">
            <MainContent />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-4/12 lg:sticky lg:top-20">
            <Sidebar />
          </div>
        </div>
      </div>
      
      {/* Similar Vendors Section */}
      <SimilarVendorsSection />
    </>
  );
};

export default ListingDetailPage;
