import React, { useState, useEffect } from 'react';
import { 
  Camera, MapPin, Phone, Mail, Globe, Calendar, Users, 
  Edit2, Check, X, Upload, Star, Wallet, Package, MessageCircle ,FileText
} from 'lucide-react';

const VendorProfile = () => {
  const [vendor, setVendor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const savedVendor = JSON.parse(localStorage.getItem('vendor'));
    
    if (savedVendor) {
      const cleanData = {
        vendorName: savedVendor.vendorName || "My Business",
        contactPerson: savedVendor.contactPerson || "Owner",
        phone: savedVendor.phone || "",
        email: savedVendor.email || "",
        website: savedVendor.website || "",
        profile: savedVendor.profile?.url || "https://via.placeholder.com/150",
        coverImage: savedVendor.coverImage?.url || "https://via.placeholder.com/1200x400/1a1a1a/ffffff?text=Add+Cover+Photo",
        city: savedVendor.city || "Delhi",
        state: savedVendor.state || "Delhi",
        locality: savedVendor.locality || "N/A",
        address: savedVendor.address || "",
        experience: savedVendor.experience || 0,
        teamSize: savedVendor.teamSize || 0,
        workingSince: savedVendor.workingSince || new Date().getFullYear(),
        walletBalance: 12500,
        totalBookings: 89,
        rating: 4.8
      };
      setVendor(cleanData);
      setFormData(cleanData);
    }
  }, []);

  const handleSave = () => {
    setVendor(formData);
    setIsEditing(false);
    
    // Save updated data back to localStorage (or send to backend later)
    localStorage.setItem('vendor', JSON.stringify(formData));
    alert("Profile updated successfully!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!vendor) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading your profile...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button onClick={() => { setIsEditing(false); setFormData(vendor); }} 
                  className="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2">
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button onClick={handleSave} 
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} 
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                <Edit2 className="w-4 h-4" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Cover + Profile */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="h-64 bg-cover bg-center relative" style={{ backgroundImage: `url(${formData.coverImage})` }}>
            {isEditing && (
              <label className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-black/80 text-sm flex items-center gap-2">
                <Upload className="w-4 h-4" /> Change Cover
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.onload = () => setFormData(prev => ({...prev, coverImage: reader.result}));
                    reader.readAsDataURL(e.target.files[0]);
                  }
                }} />
              </label>
            )}
          </div>

          <div className="px-8 pt-6 pb-10 relative">
            <div className="flex items-end -mt-20">
              <div className="relative">
                <img src={formData.profile} alt="Profile" className="w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover" />
                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-red-600 p-3 rounded-full cursor-pointer hover:bg-red-700 shadow-lg">
                    <Camera className="w-6 h-6 text-white" />
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                      if (e.target.files[0]) {
                        const reader = new FileReader();
                        reader.onload = () => setFormData(prev => ({...prev, profile: reader.result}));
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }} />
                  </label>
                )}
              </div>

              <div className="ml-8 flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleInputChange}
                    className="text-3xl font-bold border-b-4 border-red-600 outline-none w-full mb-2"
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-gray-800">{vendor.vendorName}</h2>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="text-base text-gray-600 border-b-2 border-gray-300 outline-none"
                    placeholder="Contact Person"
                  />
                ) : (
                  <p className="text-base text-gray-600">{vendor.contactPerson} • Wedding Venue</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Wallet className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <p className="text-xl font-bold">₹{vendor.walletBalance.toLocaleString()}</p>
            <p className="text-gray-600">Wallet Balance</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Star className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
            <p className="text-xl font-bold">{vendor.rating}</p>
            <p className="text-gray-600">Rating</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <Package className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <p className="text-xl font-bold">12</p>
            <p className="text-gray-600">Packages</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <MessageCircle className="w-10 h-10 text-purple-600 mx-auto mb-3" />
            <p className="text-xl font-bold">24</p>
            <p className="text-gray-600">New Inquiries</p>
          </div>
        </div>

        {/* Editable Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Business Details */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
            </h3>
            <div className="space-y-5">
              <div>
                <label className="text-gray-600 text-sm">Working Since</label>
                {isEditing ? (
                  <input type="number" name="workingSince" value={formData.workingSince} onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none text-base font-medium" />
                ) : (
                  <p className="text-base font-medium">{vendor.workingSince}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm">Experience (Years)</label>
                {isEditing ? (
                  <input type="number" name="experience" value={formData.experience} onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none text-base font-medium" />
                ) : (
                  <p className="text-base font-medium">{vendor.experience} Years</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm">Team Size</label>
                {isEditing ? (
                  <input type="number" name="teamSize" value={formData.teamSize} onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none text-base font-medium" />
                ) : (
                  <p className="text-base font-medium">{vendor.teamSize} Members</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-3">
              <Phone className="w-6 h-6 text-red-600" /> Contact Information
            </h3>
            <div className="space-y-5">
              <div>
                <label className="text-gray-600 text-sm">Phone Number</label>
                {isEditing ? (
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none text-base" placeholder="9876543210" />
                ) : (
                  // Removed display of phone number
                  null 
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm">Email Address</label>
                {isEditing ? (
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none text-base" />
                ) : (
                  <p className="text-base font-medium flex items-center gap-2"><Mail className="w-5 h-5" /> {vendor.email}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm">Full Address</label>
                {isEditing ? (
                  <textarea name="address" value={formData.address} onChange={handleInputChange} rows={2}
                    className="w-full border rounded-lg px-3 py-2 focus:border-red-600 outline-none text-base" />
                ) : (
                  <p className="text-base font-medium flex items-start gap-2"><MapPin className="w-5 h-5 mt-1" /> {vendor.locality}, {vendor.city}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 text-sm">Website (Optional)</label>
                {isEditing ? (
                  <input type="url" name="website" value={formData.website} onChange={handleInputChange}
                    className="w-full border-b-2 border-gray-300 focus:border-red-600 outline-none text-base" placeholder="https://yourwebsite.com" />
                ) : vendor.website ? (
                  <a href={vendor.website} target="_blank" rel="noopener noreferrer" className="text-base text-red-600 hover:underline flex items-center gap-2">
                    <Globe className="w-5 h-5" /> Visit Website →
                  </a>
                ) : (
                  <p className="text-base text-gray-500 italic">No website added</p>
                )}
              </div>
            </div>
          </div>
        </div>
         <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><FileText className="w-7 h-7 text-red-600" /> Documents</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {['gst', 'pan', 'idProof'].map(doc => (
                <div key={doc}>
                  <p className="text-gray-600 mb-2 capitalize">{doc === 'idProof' ? 'ID Proof' : doc.toUpperCase()}</p>
                  {formData.documents?.[doc] ? (
                    <div className="relative group">
                      <img src={formData.documents[doc]} alt={doc} className="w-full h-48 object-cover rounded-xl shadow" />
                      {isEditing && (
                        <label className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 cursor-pointer transition">
                          <Upload className="w-12 h-12 text-white" />
                          <input type="file" className="hidden" onChange={(e) => handleDocChange(e, doc)} />
                        </label>
                      )}
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl h-48 flex items-center justify-center text-gray-500">
                      {isEditing && <label className="cursor-pointer"><Upload className="w-10 h-10 mx-auto" /> Upload <input type="file" className="hidden" onChange={(e) => handleDocChange(e, doc)} /></label>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition">Add New Package</button>
          <button className="bg-gray-800 text-white py-4 rounded-xl font-semibold hover:bg-black transition">View Inquiries</button>
          <button className="bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 transition">View Bookings</button>
          <button className="bg-green-600 text-white py-4 rounded-xl font-semibold hover:bg-green-700 transition">View Public Profile →</button>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;