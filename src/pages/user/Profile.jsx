import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, LogOut, Edit, ShoppingCart, Phone, Camera, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/axiosInstance';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({ fullName: '', phone: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    toast.success('Logged out successfully!');
    window.dispatchEvent(new Event('logoutEvent'));
    navigate('/');
  };

  // Fetch Profile on Load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const storedUser = localStorage.getItem('loggedInUser');
        if (!storedUser) {
          navigate('/user/login');
          return;
        }
        const { token } = JSON.parse(storedUser);

        const response = await api.get('/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.data);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch profile');
        navigate('/user/login');
      }
    };

    fetchUserProfile();

    // Cart Count Logic
    const updateCartCount = () => {
      const storedUserString = localStorage.getItem('loggedInUser');
      console.log('Profile.jsx updateCartCount: storedUserString', storedUserString);
      if (storedUserString) {
        const loggedInUser = JSON.parse(storedUserString);
        console.log('Profile.jsx updateCartCount: loggedInUser', loggedInUser);

        if (loggedInUser?.user?.email) {
          const cartKey = `cart_${loggedInUser.user.email}`;
          console.log('Profile.jsx updateCartCount: cartKey', cartKey);
          const cartData = localStorage.getItem(cartKey);
          console.log('Profile.jsx updateCartCount: cartData', cartData);
          const cart = cartData ? JSON.parse(cartData) : [];
          const currentCartCount = Array.isArray(cart) ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
          console.log('Profile.jsx updateCartCount: currentCartCount', currentCartCount);
          setCartCount(currentCartCount);
        } else {
          console.log('Profile.jsx updateCartCount: loggedInUser.user.email missing');
          setCartCount(0);
        }
      } else {
        console.log('Profile.jsx updateCartCount: loggedInUserString missing');
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, [navigate]);

  // Edit Mode Toggle
  const handleEditClick = () => {
    setIsEditing(true);
    setEditFormData({
      fullName: user.fullName,
      phone: user.phone || '',
    });
  };

  // Image Preview Logic
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // --- Fixed Save Function ---
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem('loggedInUser');
      const { token } = JSON.parse(storedUser);

      // FormData is required for file uploads
      const formData = new FormData();
      formData.append('fullName', editFormData.fullName);
      formData.append('phone', editFormData.phone);
      if (selectedFile) {
        formData.append('profile', selectedFile);
      }

      const response = await api.put('/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Crucial for backend to see files
        },
      });

      const updatedUser = response.data.data;
      setUser(updatedUser);
      
      // Update LocalStorage to keep session in sync
      localStorage.setItem('loggedInUser', JSON.stringify({ user: updatedUser, token }));
      
      // Notify other components (like Navbar) about the update
      window.dispatchEvent(new Event('loginEvent'));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
        
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="relative mx-auto w-32 h-32 mb-4 group">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-red-500 shadow-lg bg-gray-100">
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : user?.profile?.url ? (
                <img src={user.profile.url} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full"><User size={48} className="text-gray-400" /></div>
              )}
            </div>
            
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full text-white cursor-pointer hover:bg-red-700 transition-colors shadow-md">
                <Camera size={20} />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                className="w-full text-center text-xl font-bold border-b-2 border-red-500 outline-none pb-1"
                value={editFormData.fullName}
                onChange={(e) => setEditFormData({...editFormData, fullName: e.target.value})}
                placeholder="Full Name"
              />
              <input
                type="text"
                className="w-full text-center text-gray-600 border-b border-gray-300 outline-none pb-1"
                value={editFormData.phone}
                onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                placeholder="Phone Number"
              />
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-black text-gray-900 mb-1 tracking-tight">{user?.fullName}</h2>
              <p className="text-gray-500 flex items-center justify-center gap-2 font-medium">
                <Mail size={16} /> {user?.email}
              </p>

            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Link to="/user/cart">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-md active:scale-95">
                <ShoppingCart size={18} /> Cart ({cartCount})
              </button>
            </Link>

            {isEditing ? (
              <button 
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-md active:scale-95"
              >
                <Check size={18} /> Save
              </button>
            ) : (
              <button 
                onClick={handleEditClick}
                className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
              >
                <Edit size={18} /> Edit
              </button>
            )}
          </div>

          {isEditing && (
            <button 
              onClick={handleCancelEdit}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all"
            >
              Cancel Changes
            </button>
          )}

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;