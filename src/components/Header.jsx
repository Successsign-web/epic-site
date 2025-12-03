import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, LogIn, MapPin, Users, Search, X } from 'lucide-react';
import epicLogo from '../assets/logo/epic-logo.webp';

const Header = () => {
  const [venuesOpen, setVenuesOpen] = useState(false);
  const [vendorsOpen, setVendorsOpen] = useState(false);
  const [realWeddingsOpen, setRealWeddingsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
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
  const realWeddingCultures = ["Hindu Wedding", "Muslim Nikah", "Sikh Anand Karaj", "Christian Wedding", "Telugu Wedding", "Punjabi Wedding"];
  const realWeddingThemes = ["Destination Wedding", "Royal Palace", "Beach Wedding", "Intimate Wedding", "Grand Celebration"];

  const latestRealWeddings = [
    { name: "Ridhima & Safal", img: "https://www.shaadibaraati.com/weding/be48daab88b124c6098761b8fe89c5fa.JPG", href: "#" },
    { name: "Shefali + Nitish", img: "https://www.shaadibaraati.com/weding/7374389d952fe0dd2537c09ffe9fb7dd.jpg", href: "#" },
  ];

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0 z-30">
            <Link to="/">
              <img src={epicLogo} alt="Epic Wedding Logo" className="h-16 w-auto" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className={`absolute inset-x-0 top-0 h-full flex items-center justify-center transition-opacity duration-300 ${searchOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
            <div className="flex items-center space-x-1">
              <Link to="/" className="px-5 py-2 text-gray-700 hover:text-red-600 font-medium transition-all duration-300 relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-600"></span>
              </Link>

              {/* Venues Dropdown */}
              <div onMouseEnter={() => setVenuesOpen(true)} onMouseLeave={() => setVenuesOpen(false)}>
                <button className="px-5 py-2 text-gray-700 hover:text-red-600 font-medium flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>Venues</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${venuesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 right-0 mt-0 p-5 bg-white rounded-b-2xl shadow-2xl border-t border-gray-100 transition-all duration-300 ${venuesOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="grid grid-cols-12 ">
                    <div className="col-span-3">
                      <h3 className="font-bold text-md mb-4 gradient-text ">By Type</h3>
                      {["Banquet Halls", "Hotels", "Lawns/Farmhouse", "Resorts", "Destination"].map(item => (
                        <a key={item} href="#" className="block pb-[3px] text-sm text-gray-600 hover:text-red-600 transition">{item}</a>
                      ))}
                    </div>
                    <div className="col-span-3">
                      <h3 className="font-bold text-md mb-4 gradient-text ">By City</h3>
                      {["Delhi NCR", "Mumbai", "Bangalore", "Jaipur", "Goa", "Udaipur"].map(city => (
                        <a key={city} href="#" className="block pb-[5px] text-sm text-gray-600 hover:text-red-600 transition">{city}</a>
                      ))}
                    </div>
                    <div className="col-span-6">
                      <h3 className="font-bold text-md mb-4 text-center text-red-600">Popular Destination Weddings</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {["Udaipur", "Goa", "Jaipur", "Kerala", "Jodhpur", "Jim Corbett"].map(dest => (
                          <a key={dest} href="#" className="group">
                            <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition">
                              <img src={`https://source.unsplash.com/random/300x200/?${dest},wedding`} alt={dest} className="w-full h-32 object-cover group-hover:scale-110 transition" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                              <p className="absolute bottom-3 left-0 right-0 text-center text-white font-bold">{dest}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendors Dropdown */}
              <div onMouseEnter={() => setVendorsOpen(true)} onMouseLeave={() => setVendorsOpen(false)}>
                <button className="px-5 py-2 text-gray-700 hover:text-red-600 font-medium flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Vendors</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${vendorsOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 right-0 mt-0 bg-white rounded-b-2xl shadow-2xl border-t border-gray-100 overflow-hidden transition-all duration-300 ${vendorsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="grid grid-cols-4 bg-gray-50">
                    {vendorGroups.map((group, idx) => (
                      <div key={idx} className="p-5">
                        <h4 className="font-bold gradient-text mb-4 text-md">{group.title}</h4>
                        <ul className="space-y-2">
                          {group.items.map((item, i) => (
                            <li key={i}>
                              <a href={item.href} className="text-gray-700 hover:text-red-600 transition text-sm block pb-[5px]">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real Weddings Dropdown */}
              <div onMouseEnter={() => setRealWeddingsOpen(true)} onMouseLeave={() => setRealWeddingsOpen(false)}>
                <button className="px-5 py-2 text-gray-700 hover:text-red-600 font-medium flex items-center space-x-1">
                  Real Weddings
                  <ChevronDown className={`w-4 h-4 transition-transform ${realWeddingsOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`absolute top-full left-0 right-0 mt-0 bg-white rounded-b-2xl shadow-2xl border-t border-gray-100 p-8 transition-all duration-300 ${realWeddingsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
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
                            <p className="text-center mt-2 font-medium text-gray-800 group-hover:text-red-600">{wed.name}</p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/blog" className="px-5 py-2 text-gray-700 hover:text-red-600 font-medium relative group">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-red-600"></span>
              </Link>
            </div>
          </nav>

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
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <div className="border-l-2 border-gray-300 h-6 mx-2"></div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="in location..."
                    className="w-full py-1 pl-10 pr-4 border-none focus:outline-none text-md"
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                <button className="p-2 cursor-pointer rounded-full text-white  transition -mr-1" style={{ background: 'linear-gradient(to right, #FF0100, #CD9B35)' }}>
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
            <Link to="/vendor/signup" className="px-6 py-3 rounded-full font-bold text-white flex items-center space-x-2 hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(to right, #FF0100, #CD9B35)' }}>
                Register as a Vendor
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;