import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { ArrowRight } from 'lucide-react';
import Headingicon from "../../assets/icons/title-img.webp";
import BlogCard from '../../pages/blog/BlogCard'; // Import the reusable component
import api from '../../utils/axiosInstance';
import toast from 'react-hot-toast'; 


const BlogsSection = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const visibleDotCount = 5; // Defined visibleDotCount
  const half = Math.floor(visibleDotCount / 2); // Defined half

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.get('/public/blogs?page=1&limit=10&category=&search='); 
        if (response.data && response.data.data && Array.isArray(response.data.data.blogs)) {
          setBlogs(response.data.data.blogs);
        } else {
          console.warn("API response data for blogs is not an array:", response.data);
          setBlogs([]);
        }
      } catch (err) {
        setError(err);
        toast.error('Failed to fetch blogs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const getStartIndex = () => {
    let start = activeIndex - half;
    if (start < 0) start = 0;
    if (activeIndex > blogs.length - half - 1) start = Math.max(0, blogs.length - visibleDotCount);
    return start;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-200 to-white catgorybox">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
         <div className='flex justify-center items-center flex-col mb-12'>
                  <p className="text-gray-600 text-lg">Inspiration, Tips & Real Love Stories</p>
                  <h2 className="text-4xl font-extrabold gradient-text mb-4">Wedding Blog & Ideas</h2>
                  <img className='text-center' src={Headingicon} alt="decoration" />
                </div>
        
        {loading && <p className="text-center text-lg text-gray-700">Loading blogs...</p>}
        {error && <p className="text-center text-lg text-red-500">Error: {error.message}</p>}

        {!loading && !error && blogs.length > 0 && (
          <>
            {/* Swiper Slider */}
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              modules={[Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              speed={800}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {blogs.map((blog, index) => (
                <SwiperSlide key={blog.id}>
                  <div className="px-2">
                    <BlogCard blog={blog} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom 5 Dots */}
            <div className="flex justify-center gap-3 mt-10">
              {Array.from({ length: Math.min(visibleDotCount, blogs.length) }, (_, i) => {
                const startIndex = getStartIndex();
                const dotIndex = startIndex + i;
                const isActive = dotIndex === activeIndex;

                return (
                  <button
                    key={i}
                    onClick={() => swiperRef.current?.slideToLoop(dotIndex)}
                    className={`transition-all duration-500 rounded-full ${
                      isActive 
                        ? 'w-10 h-2 bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg' 
                        : 'w-2 h-2 bg-gray-400'
                    }`}
                  />
                );
              })}
            </div>
          </>
        )}

        {!loading && !error && blogs.length === 0 && (
          <p className="text-center text-lg text-gray-700">No blogs found.</p>
        )}

        {/* View All Button */}
        <div className="text-center mt-16">
          <a 
            href="/blog"
           className="group inline-flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg   transition-all duration-500"
      >
            Explore All Blogs
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default BlogsSection;