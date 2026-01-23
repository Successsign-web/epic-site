import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Star, IndianRupee, Search, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import Headingicon from "../assets/icons/title-img.webp";

// Dummy Data
const dummyProducts = [
  { id: 1, name: 'Custom Wedding Invitations', price: 5000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Elegant Designs Co.', rating: 4.5, category: 'Stationery', location: 'Delhi', description: 'Beautifully crafted custom wedding invitations.' },
  { id: 2, name: 'Bridal Jewelry Set', price: 75000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Shine Jewels', rating: 4.0, category: 'Jewelry', location: 'Mumbai', description: 'Exquisite jewelry set for the bride.' },
  { id: 3, name: 'Wedding Cake (5-tier)', price: 15000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Sweet Delights Bakery', rating: 5.0, category: 'Food', location: 'Delhi', description: 'A magnificent 5-tier wedding cake.' },
  { id: 4, name: 'Groom’s Sherwani', price: 40000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Royal Attire', rating: 4.2, category: 'Apparel', location: 'Jaipur', description: 'Elegant and stylish sherwani for the groom.' },
  { id: 5, name: 'Designer Blouse', price: 12000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Fashion House', rating: 3.8, category: 'Apparel', location: 'Mumbai', description: 'A designer blouse for special occasions.' },
  { id: 6, name: 'Wedding Shoes', price: 8000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Footwear Co.', rating: 3.1, category: 'Footwear', location: 'Delhi', description: 'Comfortable and stylish wedding shoes.' },
  { id: 7, name: 'Bridal Veil', price: 3000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Veil & Co', rating: 2.5, category: 'Apparel', location: 'Delhi', description: 'Comfortable wedding veil.' },
];

const dummyServices = [
  { id: 101, name: 'Wedding Photography', price: 150000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Eternal Memories', rating: 4.8, category: 'Photography', location: 'Mumbai', description: 'Comprehensive wedding photography package.' },
  { id: 102, name: 'Full Wedding Planning', price: 200000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Dream Day Events', rating: 4.5, category: 'Planning', location: 'Delhi', description: 'End-to-end wedding planning services.' },
  { id: 103, name: 'Catering Services', price: 300000, image: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740', vendor: 'Feast Masters', rating: 4.9, category: 'Food', location: 'Jaipur', description: 'Delicious catering for your wedding feast.' },
];

const AllItemsListingPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Raw states (for inputs)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [locationSearch, setLocationSearch] = useState(searchParams.get('location') || '');

  // Applied states (triggering the actual filter)
  const [appliedSearch, setAppliedSearch] = useState(searchParams.get('search') || '');
  const [appliedLocation, setAppliedLocation] = useState(searchParams.get('location') || '');

  // Filter States
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || 500000);
  const [selectedCategories, setSelectedCategories] = useState(searchParams.get('categories')?.split(',') || []);
  const [ratingFilter, setRatingFilter] = useState(searchParams.get('rating') || 'all');

  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const ITEMS_PER_PAGE = 9;

  const allCategories = [...new Set([...dummyProducts, ...dummyServices].map(item => item.category))];
  const allLocations = [...new Set([...dummyProducts, ...dummyServices].map(item => item.location))];

  useEffect(() => {
    let sourceItems = type === 'products' ? dummyProducts : dummyServices;
    setItems(sourceItems);
  }, [type]);

  // Sync with URL when Applied Search or other filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (appliedSearch) params.set('search', appliedSearch);
    if (appliedLocation) params.set('location', appliedLocation);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (selectedCategories.length) params.set('categories', selectedCategories.join(','));
    if (ratingFilter !== 'all') params.set('rating', ratingFilter);
    params.set('page', currentPage);
    setSearchParams(params);
  }, [appliedSearch, appliedLocation, maxPrice, selectedCategories, ratingFilter, currentPage]);

  // Main Filtering Logic
  useEffect(() => {
    let temp = items;

    if (appliedSearch) {
      temp = temp.filter(i => i.name.toLowerCase().includes(appliedSearch.toLowerCase()));
    }
    if (appliedLocation) {
      temp = temp.filter(i => i.location === appliedLocation);
    }
    if (maxPrice) {
      temp = temp.filter(i => i.price <= maxPrice);
    }
    if (selectedCategories.length) {
      temp = temp.filter(i => selectedCategories.includes(i.category));
    }
    if (ratingFilter !== 'all') {
      if (ratingFilter === '4plus') temp = temp.filter(i => i.rating >= 4);
      if (ratingFilter === '3to4') temp = temp.filter(i => i.rating >= 3 && i.rating < 4);
      if (ratingFilter === 'below3') temp = temp.filter(i => i.rating < 3);
    }

    setFilteredItems(temp);
  }, [items, appliedSearch, appliedLocation, maxPrice, selectedCategories, ratingFilter]);

  // Search button click handler
  const handleSearchTrigger = () => {
    setAppliedSearch(searchTerm);
    setAppliedLocation(locationSearch);
    setCurrentPage(1); // Search se naye results milenge isliye page 1 reset
  };

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const currentItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleAddToCart = (item) => {
    const stored = localStorage.getItem('loggedInUser');
    if (!stored) return toast.error('Please login first');
    const user = JSON.parse(stored).user;
    const key = `cart_${user.email}`;
    const cart = JSON.parse(localStorage.getItem(key)) || [];
    const exists = cart.find(i => i.id === item.id);
    if (exists) exists.quantity++; else cart.push({ ...item, quantity: 1 });
    localStorage.setItem(key, JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Added to cart');
  };

  const RenderCard = ({ item }) => (
    <div className="group rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100 transition-all hover:shadow-md">
      <div className="relative h-52">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <button onClick={() => handleAddToCart(item)} className="absolute top-3 right-3 p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all">
          <ShoppingCart size={18} />
        </button>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 truncate">{item.name}</h3>
        <p className="text-xs text-gray-500 mb-2">by {item.vendor}</p>
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(item.rating) ? "#eab308" : "none"} className={i < Math.floor(item.rating) ? "text-yellow-500" : "text-gray-300"} />
          ))}
          <span className="text-xs text-gray-400 ml-1">({item.rating})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-red-600 flex items-center">
            <IndianRupee size={16} />{item.price.toLocaleString('en-IN')}
          </span>
          <button onClick={() => navigate(`/product/${item.id}`)} className="px-5 py-2 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-[10px] font-bold rounded-full uppercase tracking-widest">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-4xl font-black gradient-text mb-2 capitalize tracking-tight">
            Explore {type} Products
          </h2>
          <img src={Headingicon} alt="decoration" className="w-40" />
        </div>

        {/* Big Search Bar with Location */}
        <div className="max-w-8xl mx-auto mb-12 flex flex-col md:flex-row items-center bg-white shadow-xl rounded-2xl md:rounded-full border border-gray-100 p-2 gap-2">
          <div className="flex-1 flex items-center px-4 w-full">
            <Search className="text-red-500 mr-2" size={24} />
            <input 
              type="text" 
              placeholder={`Search for wedding ${type}...`} 
              className="w-full p-3 outline-none text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchTrigger()}
            />
          </div>
          <div className="hidden md:block w-[1px] h-10 bg-gray-200"></div>
          <div className="flex-1 flex items-center px-4 w-full">
            <MapPin className="text-red-500 mr-2" size={24} />
            <select 
              className="w-full p-3 outline-none text-lg bg-transparent cursor-pointer"
              value={locationSearch}
              onChange={(e) => setLocationSearch(e.target.value)}
            >
              <option value="">Select Location</option>
              {allLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <button 
            onClick={handleSearchTrigger}
            className="w-full md:w-auto px-10 py-4 bg-red-600 text-white rounded-xl md:rounded-full font-bold hover:bg-red-700 transition shadow-lg"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-8 bg-gray-50/50 p-6 rounded-3xl h-fit border border-gray-100">
            <div>
              <h3 className="font-bold text-gray-800 text-xl mb-4">Price Range</h3>
              <input 
                type="range" 
                min="0" 
                max="500000" 
                step="5000"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-sm font-bold text-red-600 mt-2">
                <span>₹0</span>
                <span>Up to ₹{Number(maxPrice).toLocaleString()}</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-xl mb-4">Rating</h3>
              <div className="space-y-3">
                {[
                  { label: 'All Ratings', value: 'all' },
                  { label: 'Above 4.0 Stars', value: '4plus' },
                  { label: '3.0 - 4.0 Stars', value: '3to4' },
                  { label: 'Below 3.0 Stars', value: 'below3' }
                ].map((r) => (
                  <label key={r.value} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="rating" 
                      className="w-4 h-4 accent-red-600"
                      checked={ratingFilter === r.value}
                      onChange={() => setRatingFilter(r.value)}
                    />
                    <span className="text-sm text-gray-600 group-hover:text-red-600 transition">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-xl mb-4">Categories</h3>
              <div className="space-y-3">
                {allCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 accent-red-600 rounded"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => {
                        setSelectedCategories(prev => 
                          prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
                        );
                      }}
                    />
                    <span className="text-sm text-gray-600 group-hover:text-red-600 transition">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={() => {
                setSearchTerm(''); setAppliedSearch('');
                setLocationSearch(''); setAppliedLocation('');
                setMaxPrice(500000);
                setSelectedCategories([]); setRatingFilter('all');
              }}
              className="w-full py-3 bg-white border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-100 transition shadow-sm"
            >
              Reset All Filters
            </button>
          </aside>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500 text-sm">Showing <b>{filteredItems.length}</b> results</p>
              <div className="flex gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="p-2 bg-gray-100 rounded-full disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-2 bg-gray-100 rounded-full disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentItems.map(item => <RenderCard key={item.id} item={item} />)}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-400">No {type} found</h3>
                <p className="text-gray-400">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllItemsListingPage;