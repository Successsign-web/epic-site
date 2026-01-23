import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../utils/axiosInstance';
import LoadingSpinner from '../components/LoadingSpinner'; // Adjust path as needed
import API_CONFIG from '../Config/apiConfig'; // Adjust path as needed
import Headingicon from '../assets/icons/title-img.webp'; // Relative path check

const AllCategoriesPage = () => {
  const navigate = useNavigate(); // Get navigate instance
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/public/venue-categories');
        if (response.data && Array.isArray(response.data.data)) {
            setCategoriesData(response.data.data);
            console.log("Categories data received for AllCategoriesPage:", response.data.data);
        } else {
            console.warn("API response data for AllCategoriesPage is not an array:", response.data);
            setCategoriesData([]);
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch categories for AllCategoriesPage:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getAbsoluteImageUrl = (relativePath) => {
    if (!relativePath || typeof relativePath !== 'string') {
      return '';
    }
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return relativePath;
    }
    return API_CONFIG.IMAGE_BASE_URL + relativePath;
  };


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
        Error loading categories. Please try again later.
      </div>
    );
  }

  if (categoriesData.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No categories available.
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-center items-center flex-col mb-10">
          <p className="text-gray-600 text-lg">Explore All</p>
          <h1 className="text-4xl font-bold gradient-text mb-4">Venue Categories</h1>
          <img src={Headingicon} alt="decoration"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categoriesData.map((cat, index) => {
          console.log("Category object:", cat); // Re-added debug log
          return (
            <a
            key={cat._id || index}
            onClick={() => navigate('/listing?category=' + cat.slug)}
            className="group relative block w-full h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
          >
            {/* Image with a zoom effect on hover */}
            <img 
              src={getAbsoluteImageUrl(cat.image?.url)} 
              alt={cat.name} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
            />
            {/* Permanent gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Always visible, left-down corner text */}
            <div className="absolute bottom-0 left-0 p-4">
              <h3 className="text-xl font-semibold text-white tracking-wide text-left" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                {cat.name}
              </h3>
              {cat.description && (
                <p className="text-sm text-gray-200 mt-1" style={{textShadow: '1px 1px 3px rgba(0,0,0,0.8)'}}>
                  {cat.description}
                </p>
              )}
            </div>
          </a>
          );
        })}

      </div>
    </div>
  );
};

export default AllCategoriesPage;