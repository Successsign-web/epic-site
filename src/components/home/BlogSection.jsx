import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import blog1 from "../../assets/blog/bridalfashion.jpg"
import blog2 from "../../assets/blog/weddingplanner.avif"
import blog4 from "../../assets/blog/mehndi.webp"
import blog3 from "../../assets/blog/realwedding.jpg"
import blog5 from "../../assets/blog/venu.webp"
import Headingicon from "../../assets/icons/title-img.webp";
const BlogCard = ({ blog }) => {
  return (
    <a 
      href={blog.link} 
      className="group block rounded-2xl overflow-hidden shadow-md my-3 bg-white"
    >
      <div className="relative overflow-hidden">
        <img 
          src={blog.image} 
          alt={blog.title}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className="px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-600 to-yellow-600 shadow-lg">
            {blog.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {blog.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-red-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
            Read More <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </a>
  );
};

const BlogsSection = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const blogs = [
    {
      title: "Top 10 Trending Bridal Lehengas of 2025 Every Bride Needs",
      category: "Bridal Fashion",
      date: "Nov 15, 2025",
      readTime: "6 min read",
      excerpt: "From pastel dreams to bold reds – discover the hottest colors, embroideries, and designer collections ruling this wedding season.",
      image: blog1,
      link: "/blog/top-bridal-lehenga-trends-2025"
    },
    {
      title: "How to Plan a ₹50 Lakh Destination Wedding – Full Budget Breakdown",
      category: "Wedding Planning",
      date: "Nov 12, 2025",
      readTime: "8 min read",
      excerpt: "Goa, Udaipur, Thailand or Bali? Real couples share exact costs and smart savings tips.",
      image: blog2,
      link: "/blog/50-lakh-destination-wedding-guide"
    },
    {
      title: "Real Wedding: Anushka & Rohan’s Royal Rajasthani Celebration",
      category: "Real Weddings",
      date: "Nov 8, 2025",
      readTime: "10 min read",
      excerpt: "A ₹1.2 crore palace wedding with 500 guests, 7 grand functions and viral decor!",
      image: blog3,
      link: "/blog/anushka-rohan-jaipur-real-wedding"
    },
    {
      title: "20 Latest Arabic & Minimal Mehndi Designs Brides Are Loving",
      category: "Mehndi Trends",
      date: "Nov 5, 2025",
      readTime: "5 min read",
      excerpt: "Elegant, minimal and super Instagram-worthy Arabic designs for modern brides.",
      image: blog4,
      link: "/blog/latest-arabic-minimal-mehndi-2025"
    },
    {
      title: "Best Wedding Venues in Delhi Under ₹30 Lakh",
      category: "Venues",
      date: "Nov 2, 2025",
      readTime: "7 min read",
      excerpt: "Luxury farmhouses, heritage hotels and banquet halls that give royal vibes without breaking the bank.",
      image: blog5,
      link: "/blog/best-delhi-wedding-venues"
    }
  ];

  const totalSlides = blogs.length;
  const visibleDotCount = 5;
  const half = Math.floor(visibleDotCount / 2);

  const getStartIndex = () => {
    let start = activeIndex - half;
    if (start < 0) start = 0;
    if (activeIndex > totalSlides - half - 1) start = Math.max(0, totalSlides - visibleDotCount);
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
            <SwiperSlide key={index}>
              <div className="px-2">
                <BlogCard blog={blog} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom 5 Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: Math.min(visibleDotCount, totalSlides) }, (_, i) => {
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