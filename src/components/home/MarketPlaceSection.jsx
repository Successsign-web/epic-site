import React, { useRef, useState, useEffect } from 'react';
import { Package, HeartHandshake, ShoppingCart, Star, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Headingicon from "../../assets/icons/title-img.webp";

const MarketPlaceSection = () => {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();
  
  // Refs aur Active Indexes
  const productSwiperRef = useRef(null);
  const serviceSwiperRef = useRef(null);
  const [productIndex, setProductIndex] = useState(0);
  const [serviceIndex, setServiceIndex] = useState(0);

  const dummyProducts = [
    { id: 1, name: 'Custom Wedding Invitations', price: 5000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Elegant Designs Co.', rating: 4.5 },
    { id: 2, name: 'Bridal Jewelry Set', price: 75000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Shine Jewels', rating: 4.0 },
    { id: 3, name: 'Wedding Cake (5-tier)', price: 15000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Sweet Delights Bakery', rating: 5.0 },
    { id: 4, name: 'Groom’s Sherwani', price: 40000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Royal Attire', rating: 4.2 },
    { id: 5, name: 'Designer Blouse', price: 12000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Fashion House', rating: 3.8 },
    { id: 6, name: 'Wedding Shoes', price: 8000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Footwear Co.', rating: 4.1 },
  ];

const dummyServices = [
    { id: 1, name: 'Wedding Photography', price: 150000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Eternal Memories', rating: 4.8 },
    { id: 2, name: 'Full Wedding Planning', price: 200000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Dream Day Events', rating: 4.5 },
    { id: 3, name: 'Catering Services', price: 300000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Feast Masters', rating: 4.9 },
    { id: 4, name: 'Decoration Services', price: 50000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Floral Magic', rating: 4.6 },
    { id: 5, name: 'Makeup Artist', price: 20000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Glamour Studio', rating: 4.3 },
    { id: 6, name: 'Live Band Performance', price: 120000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'The Wedding Beats', rating: 4.7 },
  ];

  // Pagination Logic
  const visibleDotCount = 5;
  const getStartIndex = (index, total) => {
    let half = Math.floor(visibleDotCount / 2);
    let start = index - half;
    if (start < 0) start = 0;
    if (index > total - half - 1 && total >= visibleDotCount) start = total - visibleDotCount;
    return start;
  };

  const handleAddToCart = (item) => {
    const storedUserString = localStorage.getItem('loggedInUser');
    if (!storedUserString) {
      toast.error('Please login to add items.');
      navigate('/user/login'); // Changed to login for consistency
      return;
    }
    const loggedInUser = JSON.parse(storedUserString);
    if (!loggedInUser || !loggedInUser.user || !loggedInUser.user.email) {
        toast.error('Please login to add items.');
        navigate('/user/login'); // Changed to login for consistency
        return;
    }

    const key = `cart_${loggedInUser.user.email}`; // Correctly access nested email
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const exists = cart.find(i => i.id === item.id);
    if (exists) exists.quantity++;
    else cart.push({ ...item, quantity: 1 });
    localStorage.setItem(key, JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart');
  };

  // Card UI with soft shadow
  const RenderCard = ({ item }) => (
    <div className="group block rounded-2xl overflow-hidden shadow-sm my-3 bg-white h-full transition-all duration-300 hover:shadow-md border border-gray-100">
      <div className="relative overflow-hidden h-52">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <button onClick={(e) => { e.preventDefault(); handleAddToCart(item); }} className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all">
          <ShoppingCart size={18} />
        </button>
      </div>
      <div className="p-5 text-left">
        <h3 className="text-[17px] font-bold text-gray-800 mb-1 truncate">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-3">by {item.vendor}</p>
        <div className="flex items-center gap-1 mb-4 text-yellow-500">
          {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(item.rating) ? "currentColor" : "none"} className={i < Math.floor(item.rating) ? "" : "text-gray-300"} />)}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-gray-50">
          <span className="text-lg font-bold text-red-600 flex items-baseline">
            <IndianRupee size={14} className="mr-0.5" />{item.price.toLocaleString('en-IN')}
          </span>
          <button onClick={() => navigate(`/product/${item.id}`)} className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <div className="flex flex-col items-center mb-10">
          <p className="text-gray-600 text-lg">Your One-Stop Shop</p>
          <h2 className="text-4xl font-extrabold gradient-text mb-4">Market Place</h2>
          <img src={Headingicon} alt="decoration" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {['products', 'services'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 rounded-full flex items-center gap-2 font-bold capitalize transition-all duration-300 ${
                activeTab === tab 
                ? 'bg-gradient-to-r from-red-600 to-orange-500 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {tab === 'products' ? <Package size={18} /> : <HeartHandshake size={18} />} {tab}
            </button>
          ))}
        </div>

        {/* SWIPERS - Using conditional rendering to prevent "stuck" swiper */}
        <div className="min-h-[450px]">
          {activeTab === 'products' ? (
            <div key="product-section">
              <Swiper
                onSwiper={(s) => (productSwiperRef.current = s)}
                onSlideChange={(s) => setProductIndex(s.realIndex)}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
              >
                {dummyProducts.map(p => <SwiperSlide key={p.id}><RenderCard item={p} /></SwiperSlide>)}
              </Swiper>
              
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.min(visibleDotCount, dummyProducts.length) }).map((_, i) => {
                  const dotIdx = getStartIndex(productIndex, dummyProducts.length) + i;
                  return (
                    <button key={i} onClick={() => productSwiperRef.current?.slideToLoop(dotIdx)} className={`transition-all duration-500 rounded-full ${dotIdx === productIndex ? 'w-10 h-2 bg-gradient-to-r from-red-600 to-yellow-600' : 'w-2 h-2 bg-gray-300'}`} />
                  );
                })}
              </div>
            </div>
          ) : (
            <div key="service-section">
              <Swiper
                onSwiper={(s) => (serviceSwiperRef.current = s)}
                onSlideChange={(s) => setServiceIndex(s.realIndex)}
                modules={[Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
              >
                {dummyServices.map(s => <SwiperSlide key={s.id}><RenderCard item={s} /></SwiperSlide>)}
              </Swiper>

              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.min(visibleDotCount, dummyServices.length) }).map((_, i) => {
                  const dotIdx = getStartIndex(serviceIndex, dummyServices.length) + i;
                  return (
                    <button key={i} onClick={() => serviceSwiperRef.current?.slideToLoop(dotIdx)} className={`transition-all duration-500 rounded-full ${dotIdx === serviceIndex ? 'w-10 h-2 bg-gradient-to-r from-red-600 to-yellow-600' : 'w-2 h-2 bg-gray-300'}`} />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* View All Button (Premium Style) */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate(`/items-listing/${activeTab}`)}
            className="group inline-flex items-center gap-3 px-10 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold text-lg transition-all duration-500 rounded-sm shadow-md hover:shadow-xl"
          >
            <span>Explore All {activeTab === 'products' ? 'Products' : 'Services'}</span>
            <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default MarketPlaceSection;