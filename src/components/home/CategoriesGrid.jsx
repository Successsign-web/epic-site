
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headingicon from "../../assets/icons/title-img.webp";
import bgImg from "../../assets/icons/venue.webp";
import api from '../../utils/axiosInstance';
import LoadingSpinner from '../LoadingSpinner';
import API_CONFIG from '../../Config/apiConfig';

const CenterStartMarquee = () => {
  const navigate = useNavigate();
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/public/venue-categories');
        if (response.data && Array.isArray(response.data.data)) {
            setCategoriesData(response.data.data);
        } else {
            console.warn("API response data is not an array:", response.data);
            setCategoriesData([]);
        }
      } catch (err) {
        setError(err);
        console.error("Failed to fetch categories:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);



  if (isLoading) {
    return (
      <section className="py-16 catgorybox">
        <div className="max-w-7xl mx-auto px-6 flex justify-center items-center h-48">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 catgorybox">
        <div className="max-w-7xl mx-auto px-6 text-center text-red-600">
          Error loading categories. Please try again later.
        </div>
      </section>
    );
  }

  if (categoriesData.length === 0) {
    return (
      <section className="py-16 catgorybox">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          No categories available.
        </div>
      </section>
    );
  }




  return (
    <section className="py-16 catgorybox" >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="flex justify-center items-center flex-col mb-12">
          <p className="text-gray-600 text-lg">Venues by Category</p>
          <h2 className="text-4xl font-bold gradient-text mb-4">Discover the right venues for all budgets and tastes</h2>
          <img src={Headingicon} alt="decoration"/>
        </div>

        {/* Marquee container */}
        <div className="overflow-x-hidden py-6">
          <div className="flex flex-nowrap animate-marquee-manual">
            {[...categoriesData, ...categoriesData].map((cat, index) => (
              <a
                key={index}
                onClick={() => navigate(`/listing?category=${cat.slug}`)}
                className="mx-6 group flex flex-col items-center transition-all duration-500 hover:scale-110 flex-shrink-0 cursor-pointer"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-2xl border-4 border-white group-hover:border-red-600 transition-all duration-500">
                  <img src={cat.image.url} alt={cat.name} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <p className="mt-3 text-base font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
                  {cat.name}
                </p>
                <span className="block w-12 h-1 bg-gradient-to-r from-red-600 to-orange-500 mt-1 scale-0 group-hover:scale-100 transition-transform duration-400 rounded-full"></span>
              </a>
            ))}
          </div>
        </div>

        
        





        {/* View All Button - Center Mein */}
        <div className="flex justify-center mt-12">
          <a
            href="/all-categories"
            className="group inline-flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg   transition-all duration-500"
          >
            <span>View All Categories</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

    </section>
  );
};

export default CenterStartMarquee;