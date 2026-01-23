// EditVendorProfile.jsx
import React, { useState, useEffect } from 'react';
import { Camera, Upload, X, Check, MapPin, Phone, Mail, Globe, Users, Calendar,Edit2 } from 'lucide-react';

const EditVendorProfile = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [profilePreview, setProfilePreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');

  useEffect(() => {
    const savedVendor = JSON.parse(localStorage.getItem('vendor')) || {};
    const cleanData = {
      vendorName: savedVendor.vendorName || "My Business",
      contactPerson: savedVendor.contactPerson || "Owner",
      phone: savedVendor.phone || "",
      email: savedVendor.email || "",
      website: savedVendor.website || "",
      city: savedVendor.city || "Delhi",
      state: savedVendor.state || "Delhi",
      locality: savedVendor.locality || "",
      experience: savedVendor.experience > 100 ? "12+" : savedVendor.experience || "5",
      teamSize: savedVendor.teamSize > 100 ? "10+" : savedVendor.teamSize || "5",
      workingSince: savedVendor.workingSince > 2000 ? savedVendor.workingSince : 2015,
      profile: savedVendor.profile?.url || "",
      coverImage: savedVendor.coverImage?.url || "",
    };
    setFormData(cleanData);
    setProfilePreview(cleanData.profile || "https://via.placeholder.com/150");
    setCoverPreview(cleanData.coverImage || "https://via.placeholder.com/1200x400/1a1a1a/ffffff?text=Add+Cover+Photo");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'profile') {
          setProfilePreview(reader.result);
          setFormData(prev => ({ ...prev, profile: reader.result }));
        } else {
          setCoverPreview(reader.result);
          setFormData(prev => ({ ...prev, coverImage: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Save to localStorage
    localStorage.setItem('vendorData', JSON.stringify(formData));
    onSave(formData);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 text-white p-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Edit2 className="w-7 h-7" /> Edit Profile
            </h2>
            <p className="text-red-100 mt-1">Update your business information</p>
          </div>

          {/* Cover Photo */}
          <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: `url(${coverPreview})` }}>
            <label className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white px-5 py-3 rounded-lg cursor-pointer transition flex items-center gap-2">
              <Upload className="w-5 h-5" /> Change Cover Photo
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'cover')} />
            </label>
          </div>

          <div className="px-8 pt-8 pb-10">
            {/* Profile Pic */}
            <div className="flex justify-center -mt-20 mb-6 relative">
              <div className="relative">
                <img
                  src={profilePreview}
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover"
                />
                <label className="absolute bottom-2 right-2 bg-red-600 p-4 rounded-full cursor-pointer hover:bg-red-700 transition shadow-lg">
                  <Camera className="w-6 h-6 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(e, 'profile')} />
                </label>
              </div>
            </div>

            {/* Form Grid */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">+91</span>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-red-500"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Website (optional)
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ''}
                  onChange={handleInputChange}
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Locality / Area</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. Rohini Sector 16"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Working Since
                </label>
                <input
                  type="number"
                  name="workingSince"
                  value={formData.workingSince || ''}
                  onChange={handleInputChange}
                  min="1990"
                  max="2025"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Team Size
                </label>
                <input
                  type="text"
                  name="teamSize"
                  value={formData.teamSize || ''}
                  onChange={handleInputChange}
                  placeholder="e.g. 8 or 10+"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={onCancel}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
              >
                <X className="w-5 h-5" /> Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-medium"
              >
                <Check className="w-5 h-5" /> Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditVendorProfile;