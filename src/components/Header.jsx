import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, User, LogIn, MapPin, Users, Search, X, Menu, ShoppingCart } from 'lucide-react';
import epicLogo from '../assets/logo/epic-logo.webp';
import api from '../utils/axiosInstance';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownTimeoutId = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [venueCategories, setVenueCategories] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu
  const [mobileVenuesAccordionOpen, setMobileVenuesAccordionOpen] = useState(false);
  const [mobileVendorsAccordionOpen, setMobileVendorsAccordionOpen] = useState(false);
  const [mobileRealWeddingsAccordionOpen, setMobileRealWeddingsAccordionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoginSignupOpen, setIsLoginSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // New state to store current user object
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const userJSON = localStorage.getItem('loggedInUser');
      if (userJSON) {
        const parsedUser = JSON.parse(userJSON);
        setIsLoggedIn(true);
        setCurrentUser(parsedUser.user); // Set the user object
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    const updateCartCount = () => {
      const storedUserString = localStorage.getItem('loggedInUser');
      console.log('Header.jsx updateCartCount: storedUserString', storedUserString);
      if (storedUserString) {
        const loggedInUser = JSON.parse(storedUserString);
        console.log('Header.jsx updateCartCount: loggedInUser', loggedInUser);
        if (loggedInUser && loggedInUser.user && loggedInUser.user.email) {
          const cartKey = `cart_${loggedInUser.user.email}`;
          console.log('Header.jsx updateCartCount: cartKey', cartKey);
          const cartData = localStorage.getItem(cartKey);
          console.log('Header.jsx updateCartCount: cartData', cartData);
          const cart = cartData ? JSON.parse(cartData) : [];
          const currentCartCount = Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
          console.log('Header.jsx updateCartCount: currentCartCount', currentCartCount);
          setCartCount(currentCartCount);
        } else {
          console.log('Header.jsx updateCartCount: loggedInUser.user.email missing');
          setCartCount(0); // No user.email found
        }
      } else {
        console.log('Header.jsx updateCartCount: loggedInUserString missing');
        setCartCount(0); // No loggedInUser string
      }
    };

    checkLoginStatus();
    updateCartCount();

    const handleLoginLogoutEvent = () => {
      checkLoginStatus();
      updateCartCount();
      setIsProfileDropdownOpen(false);
      setIsLoginSignupOpen(false);
    };

    window.addEventListener('loginEvent', handleLoginLogoutEvent);
    window.addEventListener('logoutEvent', handleLoginLogoutEvent);
    window.addEventListener('storage', handleLoginLogoutEvent);
    window.addEventListener('cartUpdated', updateCartCount);


    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('loginEvent', handleLoginLogoutEvent);
      window.removeEventListener('logoutEvent', handleLoginLogoutEvent);
      window.removeEventListener('storage', handleLoginLogoutEvent);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setCurrentUser(null); // Clear currentUser on logout
    setIsProfileDropdownOpen(false);
    window.dispatchEvent(new Event('logoutEvent')); // Dispatch custom event
    navigate('/');
  };

  const handleMouseEnter = (dropdownName) => {
    if (dropdownTimeoutId.current) {
      clearTimeout(dropdownTimeoutId.current);
    }
    setOpenDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutId.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  useEffect(() => {
    const fetchVenueCategories = async () => {
      try {
        const response = await api.get('/public/venue-categories');
        if (response.data && Array.isArray(response.data.data)) {
          setVenueCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching venue categories:", error);
      }
    };
    fetchVenueCategories();

    return () => {
      // Cleanup timeout on component unmount
      if (dropdownTimeoutId.current) clearTimeout(dropdownTimeoutId.current);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // Close mobile menu on location change
    setMobileMenuOpen(false);
    setMobileVenuesAccordionOpen(false);
    setMobileVendorsAccordionOpen(false);
    setMobileRealWeddingsAccordionOpen(false);
  }, [location.pathname]);



  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = () => {
    const citySlug = selectedLocation.toLowerCase().replace(/ /g, '-');
    navigate(`/listing?search=${searchQuery}&city=${citySlug}`);
    setSearchOpen(false);
  };

  const toggleMobileMenu = () => { // New function to toggle mobile menu
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const vendorGroups = [
    {
      title: "Planning & Decoration",
      items: [
        { name: "Wedding Planners", href: "#" },
        { name: "Wedding Decorators", href: "#" },
        { name: "Balloon Decorators", href: "#" },
        { name: "Varmala & Fireworks", href: "#" },
      ]
    },
    {
      title: "Wedding Photographers",
      items: [
        { name: "Pre-Wedding", href: "#" },
        { name: "Candid Photography", href: "#" },
        { name: "Traditional Photography", href: "#" },
        { name: "Cinematic Video", href: "#" },
      ]
    },
    {
      title: "Bridal Makeup & Mehendi",
      items: [
        { name: "Bridal Makeup", href: "#" },
        { name: "Family Makeup", href: "#" },
        { name: "Mehendi Artist", href: "#" },
        { name: "Party Makeup", href: "#" },
      ]
    },
    {
      title: "Bridal & Groom Wear",
      items: [
        { name: "Bridal Lehengas", href: "#" },
        { name: "Wedding Gowns", href: "#" },
        { name: "Sherwani", href: "#" },
        { name: "Kurta Pyjama", href: "#" },
      ]
    },
    {
      title: "Catering & Sweets",
      items: [
        { name: "Wedding Caterers", href: "#" },
        { name: "Chaat & Food Stalls", href: "#" },
        { name: "Wedding Cakes", href: "#" },
      ]
    },
    {
      title: "Music & Entertainment",
      items: [
        { name: "DJ & Music", href: "#" },
        { name: "Sangeet Choreographer", href: "#" },
        { name: "Anchor/Emcee", href: "#" },
        { name: "Wedding Band", href: "#" },
      ]
    },
    {
      title: "Jewellery & Invitation",
      items: [
        { name: "Wedding Jewellery", href: "#" },
        { name: "Invitation Cards", href: "#" },
        { name: "E-Invites", href: "#" },
        { name: "Wedding Gifts", href: "#" },
      ]
    },
    {
      title: "Others",
      items: [
        { name: "Pandits & Astrologers", href: "#" },
        { name: "Honeymoon Packages", href: "#" },
        { name: "Wedding Transportation", href: "#" },
      ]
    },
  ];

  const realWeddingCities = ["Bangalore", "Delhi NCR", "Hyderabad", "Mumbai", "Jaipur", "Kolkata", "Chennai"];
  const realWeddingCultures = [
  "Maharashtrian", 
  "Punjabi / Sikh", 
  "Bengali", 
  "Gujarati", 
  "Marwari", 
  "Telugu", 
  "Others"
];
  const realWeddingThemes = ["Destination Wedding", "Royal Palace", "Beach Wedding", "Intimate Wedding", "Grand Celebration"];

  const latestRealWeddings = [
    { name: "Ridhima & Safal", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", href: "#" },
    { name: "Shefali + Nitish", img: "https://www.shaadibaraati.com/weding/7374389d952fe0dd2537c09ffe9fb7dd.jpg", href: "#" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-20">

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 z-30">
            <Link to="/">
              <img src={epicLogo} alt="Epic Wedding Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-2`}>
            <div className="flex items-center space-x-2">
              <Link to="/" className="px-3 py-2 text-sm text-gray-800 hover:text-red-600 font-bold transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-600"></span>
              </Link>

              {/* Venues Dropdown */}
              <div
                onMouseEnter={() => handleMouseEnter('venues')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-3 py-2 text-sm text-gray-800 hover:text-red-600 font-bold flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Venues</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'venues' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 right-0 mt-0 p-5 bg-white rounded-b-2xl shadow-2xl border-t border-gray-100 transform-gpu will-change-[opacity,transform] transition-[opacity,transform] duration-200 ease-in-out ${openDropdown === 'venues' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <div className="grid grid-cols-12 ">
                    <div className="col-span-3">
                      <h3 className="font-bold text-md mb-4 gradient-text ">By Type</h3>
                      {venueCategories.map(category => (
                        <Link key={category._id} to={`/listing?category=${category.slug}`} className="block pb-[3px] text-sm text-gray-600 hover:text-red-600 transition">{category.name}</Link>
                      ))}
                    </div>
                    <div className="col-span-3">
                      <h3 className="font-bold text-md mb-4 gradient-text ">By City</h3>
                      {["Delhi NCR", "Mumbai", "Bangalore", "Jaipur", "Goa", "Udaipur", "Noida"].map(city => {
                        const slug = city.toLowerCase().replace(/ /g, '-');
                        return (
                          <Link key={city} to={`/listing?city=${slug}`} className="block pb-[5px] text-sm text-gray-600 hover:text-red-600 transition">{city}</Link>
                        );
                      })}
                    </div>
                    <div className="col-span-6">
                      <h3 className="font-bold text-md mb-4 text-center text-red-600">Popular Destination Weddings</h3>
                     
                     <div className="grid grid-cols-3 gap-4">
  {[
    { name: "Udaipur", url: "https://images.unsplash.com/photo-1590050877209-4366601b34bc?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Goa", url: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Jaipur", url: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Kerala", url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Jodhpur", url: "https://images.unsplash.com/photo-1590715764032-491107578278?auto=format&fit=crop&w=300&h=200&q=80" },
    { name: "Jim Corbett", url: "https://images.unsplash.com/photo-1581063344237-779836e4f32c?auto=format&fit=crop&w=300&h=200&q=80" }
  ].map((dest) => (
    <a key={dest.name} href="#" className="group">
      <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
        <img 
          src={dest.url} 
          alt={dest.name} 
          className="w-full h-32 object-cover group-hover:scale-110 transition duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <p className="absolute bottom-3 left-0 right-0 text-center text-white font-bold text-xs sm:text-sm">
          {dest.name}
        </p>
      </div>
    </a>
  ))}
</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendors Dropdown */}
              <div
                onMouseEnter={() => handleMouseEnter('vendors')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-3 py-2 text-sm text-gray-800 hover:text-red-600 font-bold flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Vendors</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'vendors' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 right-0 mt-0 bg-white rounded-b-2xl shadow-2xl border-t border-gray-100 overflow-hidden transform-gpu will-change-[opacity,transform] transition-[opacity,transform] duration-200 ease-in-out ${openDropdown === 'vendors' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <div className="grid grid-cols-4 bg-gray-50">
                    {vendorGroups.map((group, idx) => (
                      <div key={idx} className="p-5">
                        <h4 className="font-bold gradient-text mb-4 text-md">{group.title}</h4>
                        <ul className="space-y-2">
                          {group.items.map((item, i) => {
                            const slug = item.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                            return (
                              <li key={i}>
                                <Link to={`/listing-services?category=${slug}`} className="text-gray-700 hover:text-red-600 transition text-sm block pb-[5px]">
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real Weddings Dropdown */}
              <div
                onMouseEnter={() => handleMouseEnter('realWeddings')}
                onMouseLeave={handleMouseLeave}
              >
                <button className="px-3 py-2 text-sm text-gray-800 hover:text-red-600 font-bold flex items-center space-x-1">
                  Real Weddings
                  <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'realWeddings' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 right-0 mt-0 bg-white rounded-b-2xl shadow-2xl border-t border-gray-100 p-8 transform-gpu will-change-[opacity,transform] transition-[opacity,transform] duration-200 ease-in-out ${openDropdown === 'realWeddings' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                  <div className="grid grid-cols-4 gap-8">
                    <div>
                      <h4 className="font-bold gradient-text mb-4">By City</h4>
                      {realWeddingCities.map(city => <a key={city} href="#" className="block text-sm py-[3px] text-gray-600 hover:text-red-600">{city}</a>)}
                    </div>
                    <div>
                      <h4 className="font-bold gradient-text mb-4">By Culture</h4>
                      {realWeddingCultures.map(culture => <a key={culture} href="#" className="block text-sm py-[3px] text-gray-600 hover:text-red-600 text-sm">{culture}</a>)}
                    </div>
                    <div>
                      <h4 className="font-bold gradient-text mb-4">By Theme</h4>
                      {realWeddingThemes.map(theme => <a key={theme} href="#" className="block text-sm py-[3px] text-gray-600 hover:text-red-600">{theme}</a>)}
                    </div>
                    <div>
                      <h4 className="font-bold gradient-text mb-4 text-center">Latest Real Weddings</h4>
                      <div className="space-y-4">
                        {latestRealWeddings.map((wed, i) => (
                          <a key={i} href={wed.href} className="block group">
                            <img src={wed.img} alt={wed.name} className="w-full h-28 object-cover rounded-lg shadow-md group-hover:shadow-xl transition" />
                            <p className="text-center mt-2 font-bold text-gray-800 group-hover:text-red-600">{wed.name}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/blog" className="px-3 py-2 text-sm text-gray-800 hover:text-red-600 font-bold relative group">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-600"></span>
              </Link>

              <Link to="/items-listing/all" className="px-3 py-2 text-sm text-gray-800 hover:text-red-600 font-bold relative group">
                Marketplace
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-600"></span>
              </Link>

            
              <Link to="/wedmate" className="px-3 py-2 text-sm text-gray-800 hover:text-red-600 font-bold relative group">
                Wedmate
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-600"></span>
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col items-center justify-center h-full space-y-8 p-6">
              <Link to="/" className="text-2xl text-gray-800 hover:text-red-600 font-bold" onClick={toggleMobileMenu}>Home</Link>
              {/* Mobile Venues Accordion */}
              <div className="w-full">
                <button
                  className="flex items-center justify-between w-full p-4 text-2xl text-gray-800 hover:text-red-600 font-bold border-b border-gray-200"
                  onClick={() => setMobileVenuesAccordionOpen(!mobileVenuesAccordionOpen)}
                >
                  <span>Venues</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${mobileVenuesAccordionOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileVenuesAccordionOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 bg-gray-50 text-left">
                    <h3 className="font-bold text-lg mb-2 gradient-text">By Type</h3>
                    {venueCategories.map(category => (
                      <Link key={category._id} to={`/listing?category=${category.slug}`} className="block py-1 text-md text-gray-600 hover:text-red-600 transition" onClick={toggleMobileMenu}>{category.name}</Link>
                    ))}
                    <h3 className="font-bold text-lg mt-4 mb-2 gradient-text">By City</h3>
                    {["Delhi NCR", "Mumbai", "Bangalore", "Jaipur", "Goa", "Udaipur", "Noida"].map(city => {
                      const slug = city.toLowerCase().replace(/ /g, '-');
                      return (
                        <Link key={city} to={`/listing?city=${slug}`} className="block py-1 text-md text-gray-600 hover:text-red-600 transition" onClick={toggleMobileMenu}>{city}</Link>
                      );
                    })}
                    {/* Simplified Destination Weddings for mobile - just links */}
                    <h3 className="font-bold text-lg mt-4 mb-2 text-red-600">Popular Destination Weddings</h3>
                    {["Udaipur", "Goa", "Jaipur", "Kerala", "Jodhpur", "Jim Corbett"].map(dest => (
                      <Link key={dest} to={`/listing?city=${dest.toLowerCase().replace(/ /g, '-')}`} className="block py-1 text-md text-gray-600 hover:text-red-600 transition" onClick={toggleMobileMenu}>{dest}</Link>
                    ))}
                  </div>
                </div>
              </div>
              {/* Mobile Vendors Accordion */}
              <div className="w-full">
                <button
                  className="flex items-center justify-between w-full p-4 text-2xl text-gray-800 hover:text-red-600 font-bold border-b border-gray-200"
                  onClick={() => setMobileVendorsAccordionOpen(!mobileVendorsAccordionOpen)}
                >
                  <span>Vendors</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${mobileVendorsAccordionOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileVendorsAccordionOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 bg-gray-50 text-left">
                    {vendorGroups.map((group, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        <h4 className="font-bold gradient-text mb-2 text-lg">{group.title}</h4>
                        <ul className="space-y-1">
                          {group.items.map((item, i) => {
                            const slug = item.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                            return (
                              <li key={i}>
                                <Link to={`/listing-services?category=${slug}`} className="text-gray-700 hover:text-red-600 transition text-md block py-1">
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Mobile Real Weddings Accordion */}
              <div className="w-full">
                <button
                  className="flex items-center justify-between w-full p-4 text-2xl text-gray-800 hover:text-red-600 font-bold border-b border-gray-200"
                  onClick={() => setMobileRealWeddingsAccordionOpen(!mobileRealWeddingsAccordionOpen)}
                >
                  <span>Real Weddings</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${mobileRealWeddingsAccordionOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileRealWeddingsAccordionOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 bg-gray-50 text-left">
                    <h4 className="font-bold gradient-text mb-2 text-lg">By City</h4>
                    {realWeddingCities.map(city => <a key={city} href="#" className="block text-md py-1 text-gray-600 hover:text-red-600" onClick={toggleMobileMenu}>{city}</a>)}
                    <h4 className="font-bold gradient-text mt-4 mb-2 text-lg">By Culture</h4>
                    {realWeddingCultures.map(culture => <a key={culture} href="#" className="block text-md py-1 text-gray-600 hover:text-red-600" onClick={toggleMobileMenu}>{culture}</a>)}
                    <h4 className="font-bold gradient-text mt-4 mb-2 text-lg">By Theme</h4>
                    {realWeddingThemes.map(theme => <a key={theme} href="#" className="block text-md py-1 text-gray-600 hover:text-red-600" onClick={toggleMobileMenu}>{theme}</a>)}
                    {/* Simplified Latest Real Weddings for mobile - just links */}
                    <h4 className="font-bold gradient-text mt-4 mb-2 text-lg">Latest Real Weddings</h4>
                    <div className="space-y-2">
                        {latestRealWeddings.map((wed, i) => (
                            <a key={i} href={wed.href} className="block group text-md py-1 text-gray-600 hover:text-red-600" onClick={toggleMobileMenu}>
                                {wed.name}
                            </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/blog" className="text-2xl text-gray-800 hover:text-red-600 font-bold" onClick={toggleMobileMenu}>Blog</Link>
              <Link to="/items-listing/all" className="text-2xl text-gray-800 hover:text-red-600 font-bold" onClick={toggleMobileMenu}>Marketplace</Link>
              <Link to="/e-invites" className="text-2xl text-gray-800 hover:text-red-600 font-bold" onClick={toggleMobileMenu}>E-invites</Link>
              <Link to="/wedmate" className="text-2xl text-gray-800 hover:text-red-600 font-bold" onClick={toggleMobileMenu}>Wedmate</Link>
            </div>
          </div>

          {/* Search Overlay */}
          <div className={`absolute inset-x-0 top-0 h-full flex items-center justify-center bg-white transition-opacity duration-300 ${searchOpen ? 'opacity-100 visible z-20' : 'opacity-0 invisible z-0'}`}>
            <div className="w-full max-w-2xl">
              <div className="flex items-center border-2 border-red-500 rounded-full pr-2 py-1">
                <div className="flex-1 relative"> 
                  <input
                    type="text"
                    placeholder="Search for vendors, venues..."
                    className="w-full py-1 pl-10 pr-4 border-none focus:outline-none text-md"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="border-l-2 border-gray-300 h-6 mx-2"></div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="in location..."
                    className="w-full py-1 pl-10 pr-4 border-none focus:outline-none text-md"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button onClick={handleSearch} className="p-2 cursor-pointer rounded-full text-white  transition -mr-1" style={{ background: 'linear-gradient(to right, #FF0100, #CD9B35)' }}>
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

      {/* Right Side */}
      <div className="flex-shrink-0 flex items-center space-x-4 z-30">
        <button onClick={toggleSearch} className="p-2 hover:bg-gray-100 rounded-full transition">
          {searchOpen ? <X className="w-5 h-5 text-gray-600" /> : <Search className="w-5 h-5 text-gray-600" />}
        </button>

        {!isLoggedIn ? (
          <Link
            to="/user/signup"
            className="px-6 py-3 rounded-full font-bold text-white flex items-center space-x-2 hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(to right, #FF0100, #CD9B35)' }}
          >
            Guest Login
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/user/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Profile Dropdown Logic remains same */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="hover:bg-gray-100 rounded-full transition relative flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 font-bold overflow-hidden"
              >
                {currentUser && currentUser.profile?.url ? (
                  <img src={currentUser.profile.url} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileDropdownOpen(false)}>Profile</Link>
                  <Link to="/user/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsProfileDropdownOpen(false)}>My Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</header>
  );
};

export default Header;