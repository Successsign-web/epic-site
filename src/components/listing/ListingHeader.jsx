import React from 'react';

const ListingHeader = ({ resultsCount }) => {
  return (
    <div className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between">
          
          {/* Left Side: Breadcrumb and Title */}
          <div className="w-full md:w-1/2">
            <div className="text-sm  font-medium text-red-600 mb-2">
              <a href="#" className="hover:text-gray-600">Home</a>
              <span className="mx-2">/</span>
              <a href="#" className="hover:text-gray-600">Wedding Caterers</a>
              <span className="mx-2">/</span>
              <span className="text-gray-700">India</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Wedding Caterers in India</h1>
            <p className="text-gray-600 mt-1">Showing {resultsCount} results as per your search criteria</p>
          </div>

          {/* Right Side: Search and Filter */}
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <form className="flex flex-wrap items-center justify-end gap-2">
              <input 
                type="search" 
                placeholder="Search vendor..." 
                className="px-4 py-2 border border-gray-300 rounded-md !focus:ring-red-500 !focus:border-red-500 flex-grow"
              />
              <select defaultValue="Wedding Caterers" className="px-4 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500">
                <option>Wedding Caterers</option>
                <option>Wedding Venues</option>
                <option>Bridal Makeup Artist</option>
                {/* ... more categories */}
              </select>
             
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListingHeader;