import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard,ChevronDown, LogOut, Bell,IndianRupee, Package, MessageSquare, Wallet, User, Settings, DollarSign, Menu } from 'lucide-react'; // Added DollarSign
import epicLogo from '../../assets/logo/epic-logo.webp';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', link: '/vendor/dashboard', active: true },
    {
        icon: Package,
        label: 'Packages',
        isDropdown: true,
        children: [
            { label: 'Add Venue Package', link: '/vendor/add-venue-package' },
            { label: 'Add Service Package', link: '/vendor/add-service-package' },
            { label: 'Manage Packages', link: '/vendor/manage-packages' },
        ],
    },
    { icon: MessageSquare, label: 'Leads & Chats', link: '/vendor/leads', badge: 12 },
    { icon: Wallet, label: 'Wallet', link: '/vendor/wallet' },
    { icon: User, label: 'Edit Profile', link: '/vendor/profile/edit' },
    { icon: Settings, label: 'Settings', link: '/vendor/settings' },
  ];
const VendorLayout = () => {
    const [vendorInfo, setVendorInfo] = useState({
        contactPerson: 'Vendor',
        vendorName: 'My Business',
        profile: { url: 'https://via.placeholder.com/100' },
        walletBalance: 0,
    });
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showPackagesDropdown, setShowPackagesDropdown] = useState(false); // New state for packages dropdown

    useEffect(() => {
        const savedVendor = localStorage.getItem('vendor');
        if (savedVendor) {
            setVendorInfo(JSON.parse(savedVendor));
        }
    }, []);

  return (
    <div className="min-h-screen bg-[#1C252E] 
    ">
      {/* ========== SIDEBAR ========== */}
<aside
  className={`fixed left-0 top-0 h-full bg-[#1C252E] shadow-2xl transition-all duration-300 z-50 ${
    isCollapsed ? 'w-20' : 'w-64'
  }`}
>
  {/* Logo */}
  <div className="h-20 flex items-center justify-center border-b border-gray-700">
    <img
      src={epicLogo}
      alt="Epic Wedding"
      className={`transition-all duration-300 ${isCollapsed ? 'h-10' : 'h-12'}`}
    />
  </div>

  {/* Navigation */}
  <nav className="mt-6 px-4">
    {menuItems.map((item) => (
      <React.Fragment key={item.label}>
        {item.isDropdown ? (
          <div>
            <button
              onClick={() => setShowPackagesDropdown(!showPackagesDropdown)}
              className={`flex items-center w-full gap-3 px-4 py-4 mb-2 rounded-xl transition-all group relative
                ${
                  showPackagesDropdown
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
            >
              <item.icon
                className={`h-5 w-5 flex-shrink-0 ${
                  showPackagesDropdown ? 'text-white' : 'group-hover:text-purple-400'
                }`}
              />
              <span className={`font-medium transition-all ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                {item.label}
              </span>
              {!isCollapsed && (
                <ChevronDown className={`ml-auto h-4 w-4 transition-transform ${showPackagesDropdown ? 'rotate-180' : ''}`} />
              )}
            </button>
            {showPackagesDropdown && !isCollapsed && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={child.link}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all text-sm"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            to={item.link}
            className={`flex items-center gap-3 px-4 py-4 mb-2 rounded-xl transition-all group relative
              ${
                item.active
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl'
                  : 'text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
          >
            <item.icon
              className={`h-5 w-5 flex-shrink-0 ${
                item.active ? 'text-white' : 'group-hover:text-purple-400'
              }`}
            />
            <span
              className={`font-medium transition-all ${
                isCollapsed ? 'opacity-0 w-0' : 'opacity-100'
              }`}
            >
              {item.label}
            </span>
            {item.badge && !isCollapsed && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-bold">
                {item.badge}
              </span>
            )}
            {item.badge && isCollapsed && (
              <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                <span className="bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              </div>
            )}
          </Link>
        )}
      </React.Fragment>
    ))}

    {/* Logout */}
    <div className="mt-12 pt-6 border-t border-gray-700">
      <Link
        to="/logout"
        className="flex items-center gap-3 px-4 py-4 rounded-xl text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
      >
        <LogOut className="h-5 w-5" />
        <span className={`font-medium ${isCollapsed ? 'hidden' : ''}`}>Logout</span>
      </Link>
    </div>
  </nav>
</aside>


      {/* Main Content */}
      <div className={`transition-all duration-300 flex flex-col h-screen overflow-y-auto ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
    <div className='bg-[#F9F9FC] m-3 mr-2 mb-0 rounded-b-none rounded-xl flex flex-col flex-1'>
        
        {/* Top Bar */}
     <header className="bg-[#F9F9FC] rounded-tl-xl rounded-tr-xl  shadow-sm flex justify-between items-center h-20 pl-2 px-8 z-10">
         
            {/* Left */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-5">
              {/* Wallet */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-2 rounded-2xl shadow-lg">
                <IndianRupee className="h-5 w-5" />
                <div>
                  <p className="text-xs opacity-90">Balance</p>
                  <p className="text-md font-bold">₹{(vendorInfo.walletBalance || 0).toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Notification */}
              <button className="relative p-3 rounded-xl hover:bg-gray-100 transition">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition"
                >
                  <img src={vendorInfo.profile?.url} alt="Profile" className="h-11 w-11 rounded-full ring-4 ring-purple-100" />
                  <div className="text-left hidden lg:block">
                    <p className="font-semibold text-gray-800 text-sm">{vendorInfo.contactPerson}</p>
                    <p className="text-xs text-gray-500">{vendorInfo.vendorName}</p>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                    <Link to="/vendor/profile" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm">My Profile</span>
                    </Link>
                    <Link to="/vendor/wallet" className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                      <Wallet className="h-5 w-5 text-gray-600" />
                      <span className="text-sm">Wallet History</span>
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <Link to="/logout" className="flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-600 w-full text-left transition">
                      <LogOut className="h-5 w-5" />
                      <span className="text-sm font-medium">Logout</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 pb-0 overflow-y-auto slim-scroll max-h-[calc(97vh-90px)]">
            <Outlet />
        </main>

        {/* Overlay when dropdown open (mobile friendly) */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setShowDropdown(false)}
        />
      )}
       </div>
      </div>
    </div>
  );
};

export default VendorLayout;