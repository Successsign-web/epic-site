import React, { useState, useMemo, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  DollarSign,
  Image,
  HelpCircle,
  Video,
  Eye,
  EyeOff,
  Package,
  Info,
  MapPin,
  GalleryHorizontal,
  ListVideo,
  BadgeCheck,
  Loader2,
  Trash2,
  Lock,
} from 'lucide-react';
import Select from 'react-select';
import api from '../../utils/axiosInstance';
import API_CONFIG from '../../Config/apiConfig';
import { State, City } from 'country-state-city';
import RichTextEditor from '../../components/RichTextEditor';
import DynamicIcon from '../../components/DynamicIcon';
import { useParams, useNavigate } from 'react-router-dom';

const EditServicePackage = () => {
  const { id: packageId } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
  const [services, setServices] = useState([]);
  const [serviceData, setServiceData] = useState({});

  const [serviceCategoryOptions, setServiceCategoryOptions] = useState([]);
  const [subServiceCategoryOptions, setSubServiceCategoryOptions] = useState([]);
  const [originalData, setOriginalData] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startingPrice: '',
    serviceCategory: null,
    subServiceCategory: null,
    locality: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    fullAddress: '',
    albums: [],
    faqs: [],
    videos: [],
    visibility: 'private',
  });

  const states = State.getStatesOfCountry("IN");
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const cityList = useMemo(() => selectedState ? City.getCitiesOfState('IN', selectedState.value) : [], [selectedState]);
  const stateOptions = states.map(s => ({ value: s.isoCode, label: s.name }));
  const cityOptions = cityList.map(c => ({ value: c.name, label: c.name }));

    useEffect(() => {
    const fetchCategoriesAndPackage = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("vendorToken");
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch all service categories
        const catRes = await api.get('/vendor/service-categories', { headers });
        const categories = catRes.data.data.map(cat => ({
          value: cat._id,
          label: cat.name,
        }));
        setServiceCategoryOptions(categories);

        // 2. Fetch package data
        const pkgRes = await api.get(`/vendor/service-packages/${packageId}`, { headers });
        const pkg = pkgRes.data.data;
        setOriginalData(pkg);

        let categoryOption = null;
        let subCategoryOption = null;
        let foundServices = [];

        // 3. Find the parent category and the specific sub-category
        if (pkg.serviceSubCategory?.serviceCategory?._id && categories.length > 0) {
          const parentCategory = categories.find(c => c.value === pkg.serviceSubCategory.serviceCategory._id);
          if (parentCategory) {
            categoryOption = parentCategory;
            
            // Fetch sub-categories for the parent category
            const subCatRes = await api.get(`/vendor/service-categories/${parentCategory.value}/service-sub-categories`, { headers });
            const fullSubCategories = subCatRes.data.data.map(sub => ({
              value: sub._id,
              label: sub.name,
              services: sub.services,
            }));
            setSubServiceCategoryOptions(fullSubCategories);

            subCategoryOption = fullSubCategories.find(sc => sc.value === pkg.serviceSubCategory._id) || null;
            if (subCategoryOption) {
              foundServices = subCategoryOption.services;
              setServices(foundServices);
            }
          }
        }
        
        // 4. Set form data
        setFormData({
          title: pkg.title,
          description: pkg.description,
          startingPrice: pkg.startingPrice,
          serviceCategory: categoryOption,
          subServiceCategory: subCategoryOption,
          locality: pkg.location.locality,
          city: pkg.location.city,
          state: pkg.location.state,
          pincode: pkg.location.pincode,
          country: pkg.location.country,
          fullAddress: pkg.location.fullAddress,
          albums: pkg.photoAlbums || [], // Corrected from pkg.albums
          faqs: pkg.faqs || [],
          videos: pkg.videos || [],
          visibility: pkg.visibility,
        });

        // 5. Populate service data correctly
        if (subCategoryOption && pkg.services) {
          const initialServiceData = {};
          foundServices.forEach(service => {
            if (pkg.services[service.name]) {
              initialServiceData[service._id] = pkg.services[service.name];
            }
          });
          setServiceData(initialServiceData);
        }

        setFeaturedImagePreview(pkg.featuredImage?.url || null);

        // 6. Set state & city dropdowns correctly
        const matchedState = stateOptions.find(s => s.label.toLowerCase() === pkg.location.state.toLowerCase());
        if (matchedState) {
          setSelectedState(matchedState);
          const citiesOfState = City.getCitiesOfState('IN', matchedState.value).map(c => ({ value: c.name, label: c.name }));
          const matchedCity = citiesOfState.find(c => c.label.toLowerCase() === pkg.location.city.toLowerCase());
          if (matchedCity) {
            setSelectedCity(matchedCity);
          }
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load package data.");
        navigate('/vendor/my-packages');
      } finally {
        setLoading(false);
      }
    };

    if (packageId) fetchCategoriesAndPackage();
  }, [packageId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (albumIndex, files) => {
    const updatedAlbums = [...formData.albums];
    if (!updatedAlbums[albumIndex].newPhotos) updatedAlbums[albumIndex].newPhotos = [];
    updatedAlbums[albumIndex].newPhotos = Array.from(files);
    setFormData(prev => ({ ...prev, albums: updatedAlbums }));
  };

  const addRemoveItem = (type, index) => {
    const currentItems = [...formData[type]];
    if (index !== undefined) {
      currentItems.splice(index, 1);
    } else {
      if (type === 'albums') currentItems.push({ title: '', images: [] });
      else if (type === 'faqs') currentItems.push({ question: '', answer: '' });
      else if (type === 'videos') currentItems.push({ title: '', url: '' });
    }
    setFormData(prev => ({ ...prev, [type]: currentItems }));
  };

  const handleItemChange = (type, index, field, value) => {
    const updatedItems = [...formData[type]];
    updatedItems[index][field] = value;
    setFormData(prev => ({ ...prev, [type]: updatedItems }));
  };

  const handleDeletePhoto = async (albumIndex, photoId) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("vendorToken");
      const albumId = formData.albums[albumIndex]._id;
      await api.delete(`/vendor/service-packages/${packageId}/albums/${albumId}/photos/${photoId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const res = await api.get(`/vendor/service-packages/${packageId}`, { headers: { Authorization: `Bearer ${token}` } });
      setFormData(prev => ({ ...prev, albums: res.data.data.photoAlbums || [] }));
      setOriginalData(prev => ({ ...prev, photoAlbums: res.data.data.photoAlbums || [] }));

      toast.success("Photo deleted successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async (albumIndex) => {
    const album = formData.albums[albumIndex];
    if (!album?._id) {
      const updatedAlbums = formData.albums.filter((_, i) => i !== albumIndex);
      setFormData(prev => ({ ...prev, albums: updatedAlbums }));
      toast.success('New album removed locally.');
      return;
    }

    if (!window.confirm("Are you sure you want to delete this album?")) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("vendorToken");
      await api.delete(`/vendor/service-packages/${packageId}/albums/${album._id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const res = await api.get(`/vendor/service-packages/${packageId}`, { headers: { Authorization: `Bearer ${token}` } });
      setFormData(prev => ({ ...prev, albums: res.data.data.photoAlbums || [] }));
      setOriginalData(prev => ({ ...prev, photoAlbums: res.data.data.photoAlbums || [] }));
      toast.success("Album deleted successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete album.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Details & Location', icon: Info },
    { number: 2, title: 'Albums', icon: GalleryHorizontal },
    { number: 3, title: 'Videos', icon: ListVideo },
    { number: 4, title: 'FAQs', icon: HelpCircle },
    { number: 5, title: 'Publish', icon: BadgeCheck },
  ];

  const handleFeaturedImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setFeaturedImagePreview(previewUrl);
    }
  };

  const handleServiceDataChange = (serviceId, value) => {
    setServiceData(prev => ({ ...prev, [serviceId]: value }));
  };

  const nextStep = async () => {
    if (loading) return;

    if (currentStep === 1) {
      if (!formData.title || !formData.startingPrice || !formData.fullAddress) {
        return toast.error('Please fill all required fields.');
      }
      setLoading(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('startingPrice', formData.startingPrice);
      if (featuredImage) data.append('featuredImage', featuredImage);

      const servicesObject = services.reduce((obj, service) => {
        const value = serviceData[service._id];
        if (value) obj[service.name] = value;
        return obj;
      }, {});
      if (Object.keys(servicesObject).length > 0) {
        data.append('services', JSON.stringify(servicesObject));
      }

      const location = {
        locality: formData.locality,
        fullAddress: formData.fullAddress,
        city: selectedCity?.label || formData.city,
        state: selectedState?.label || formData.state,
        pincode: formData.pincode,
        country: formData.country,
      };
      data.append('location', JSON.stringify(location));

      try {
        const token = localStorage.getItem("vendorToken");
        await api.put(`/vendor/service-packages/${packageId}/basic`, data, {
          headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
        setCurrentStep(2);
        toast.success('Basic info and location updated!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Error updating package');
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      // Albums upload logic (same as before)
      setLoading(true);
      const newAlbums = formData.albums.filter(a => a.newPhotos && a.newPhotos.length > 0);
      if (newAlbums.length === 0) {
        toast.info('No new albums to upload.');
        setCurrentStep(3);
        setLoading(false);
        return;
      }

      const data = new FormData();
      newAlbums.forEach((album, i) => {
        data.append(`albums[${i}][title]`, album.title);
        album.newPhotos.forEach(photo => data.append(`albums[${i}][photos]`, photo));
      });

      try {
        const token = localStorage.getItem("vendorToken");
        await api.patch(`/vendor/service-packages/${packageId}/albums`, data, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const res = await api.get(`/vendor/service-packages/${packageId}`, { headers: { Authorization: `Bearer ${token}` } });
        setFormData(prev => ({ ...prev, albums: res.data.data.albums || [] }));
        setOriginalData(prev => ({ ...prev, albums: res.data.data.albums || [] }));
        setCurrentStep(3);
        toast.success('Albums updated successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Albums upload failed!');
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 3) {
      // Videos logic (same)
    setLoading(true);
try {
  const token = localStorage.getItem("vendorToken");

  const validVideos = formData.videos.filter(
    v => v.title && v.url
  );

  await api.put(
    `/vendor/service-packages/${packageId}/videos`,
    { videos: validVideos },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );

  setCurrentStep(4);
  toast.success("Videos saved successfully!");
} catch (err) {
  toast.error(err.response?.data?.message || "Failed to save videos!");
} finally {
  setLoading(false);
}
    } else if (currentStep === 4) {
      // FAQs logic (same)
      setLoading(true);
      try {
        const token = localStorage.getItem("vendorToken");
        await api.put(`/vendor/service-packages/${packageId}/faqs`, { faqs: formData.faqs.filter(f => f.question && f.answer) }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCurrentStep(5);
        toast.success('FAQs saved successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to save FAQs!');
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 5) {
      // Visibility logic (same)
      setLoading(true);
      try {
        const token = localStorage.getItem("vendorToken");
        await api.put(`/vendor/service-packages/${packageId}/status`, {
          visibility: formData.visibility
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setSuccess(true);
        toast.success('Package status updated successfully!');
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to update status');
      } finally {
        setLoading(false);
      }
    }
  };

  const prevStep = () => setCurrentStep(currentStep > 1 ? currentStep - 1 : 1);

  if (loading && !originalData) {
    return <div className="min-h-[70vh] flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-red-600" /></div>;
  }

  if (success) {
    return (
      <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-14 h-14 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Package Updated!</h2>
          <p className="text-gray-600 mt-3">Your service package has been successfully updated.</p>
          <a href="/vendor/my-packages" className="mt-8 inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all">
            View My Packages
          </a>
        </div>
      </div>
    );
  }

  const renderInput = (name, placeholder, Icon, type = "text", required = false) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">{placeholder} {required && '*'}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: '#d1d5db',
      '&:hover': { borderColor: '#ef4444' },
      boxShadow: 'none',
      borderRadius: '0.5rem',
      padding: '0.15rem 0',
      backgroundColor: state.isDisabled ? '#f9fafb' : 'white',
      cursor: state.isDisabled ? 'not-allowed' : 'default',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ef4444' : state.isFocused ? '#fee2e2' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Service Package</h1>
          <p className="mt-1 text-sm text-gray-600">Update the details of your service package.</p>
        </div>

        {/* Steps Progress Bar */}
        <div className="mb-10 px-4">
          <div className="flex items-center">
            {steps.map((stepInfo, index) => {
              const isCompleted = currentStep > stepInfo.number;
              const isCurrent = currentStep === stepInfo.number;
              return (
                <React.Fragment key={stepInfo.number}>
                  <div className="flex flex-col items-center w-32">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-green-600' : isCurrent ? 'bg-red-600' : 'bg-gray-300'}`}>
                      {isCompleted ? <Check className="w-6 h-6 text-white" /> : <stepInfo.icon className="w-5 h-5 text-white" />}
                    </div>
                    <p className={`mt-2 text-xs font-semibold text-center ${isCurrent ? 'text-red-600' : 'text-gray-500'}`}>{stepInfo.title}</p>
                  </div>
                  {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${currentStep > index + 1 ? 'bg-green-600' : 'bg-gray-200'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4"><Package className="w-5 h-5 mr-2 text-red-600"/>Basic Information</h3>
              {renderInput('title', 'Package Title', Package, 'text', true)}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                <RichTextEditor value={formData.description} onChange={(html) => setFormData(prev => ({ ...prev, description: html }))} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderInput('startingPrice', 'Starting Price (INR)', null, 'number', true)}
              </div>

              {/* Category & Sub-Category - Read Only */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-4 border-t">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <Lock size={14} className="text-gray-500" />
                    Service Category (Cannot be changed)
                  </label>
                  <Select
                    value={formData.serviceCategory}
                    styles={selectStyles}
                    isDisabled={true}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-2">
                    <Lock size={14} className="text-gray-500" />
                    Sub-Service Category (Cannot be changed)
                  </label>
                  <Select
                    value={formData.subServiceCategory}
                    styles={selectStyles}
                    isDisabled={true}
                  />
                </div>
              </div>

              {/* Services */}
              <div className="pt-4 mt-4 border-t">
                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4"><ListVideo className="w-5 h-5 mr-2 text-red-600" />Package Services</h3>
                {!formData.subServiceCategory ? (
                  <p className="text-sm text-gray-500">No services found.</p>
                ) : services.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.map(service => (
                      <div key={service._id}>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
                          <DynamicIcon name={service.icon} className="w-4 h-4 mr-2" />
                          {service.name}
                        </label>
                        <input
                          type={service.type || 'text'}
                          value={serviceData[service._id] || ''}
                          onChange={(e) => handleServiceDataChange(service._id, e.target.value)}
                          className="w-full pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                          placeholder={`Enter ${service.name}`}
                        />
                      </div>
                    ))}
                  </div>
                ) : <p className="text-sm text-gray-500">No services found for this sub-category.</p>}
              </div>

              {/* Featured Image */}
              <div className="pt-4 mt-4 border-t">
                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4"><Image className="w-5 h-5 mr-2 text-red-600"/>Featured Image</h3>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center">
                    {featuredImagePreview ? <img src={featuredImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg"/> : <span className="text-xs text-gray-500">No Image</span>}
                  </div>
                  <input type="file" id="featured-image-upload" className="hidden" accept="image/*" onChange={handleFeaturedImageChange} />
                  <label htmlFor="featured-image-upload" className="cursor-pointer bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50">
                    <Upload className="w-4 h-4 mr-2 inline-block" />
                    Upload New Image
                  </label>
                </div>
              </div>

              {/* Location */}
              <div className="pt-4 mt-4 border-t">
                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4"><MapPin className="w-5 h-5 mr-2 text-red-600"/>Location</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">State *</label>
                    <Select options={stateOptions} value={selectedState} onChange={opt => { setSelectedState(opt); setFormData(p => ({...p, state: opt.label, city: ''})); setSelectedCity(null); }} styles={selectStyles}/>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">City *</label>
                    <Select options={cityOptions} value={selectedCity} onChange={opt => { setSelectedCity(opt); setFormData(p => ({...p, city: opt.label})); }} styles={selectStyles} isDisabled={!selectedState} />
                  </div>
                </div>
                {renderInput('locality', 'Locality / Area', MapPin)}
                {renderInput('fullAddress', 'Full Address', MapPin, 'text', true)}
                {renderInput('pincode', 'Pincode', MapPin)}
              </div>
            </div>
          )}

          {/* Baaki steps same rahega (Albums, Videos, FAQs, Publish) */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-semibold text-gray-800">Manage Albums</h3>
              {formData.albums.map((album, i) => (
                <div key={album._id || `new-${i}`} className="p-4 border rounded-lg bg-gray-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <input type="text" placeholder="Album Title" value={album.title} onChange={e => handleItemChange('albums', i, 'title', e.target.value)} className="w-full px-3 py-2 text-sm border rounded-lg" />
                    <button onClick={() => handleDeleteAlbum(i)} className="ml-4 text-red-600 hover:text-red-800 p-2"><Trash2 className="w-5 h-5"/></button>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {album.images && album.images.map((photo) => (
                      <div key={photo._id} className="relative aspect-square">
                        <img src={photo.url} alt="photo" className="w-full h-full object-cover rounded-md"/>
                        <button onClick={() => handleDeletePhoto(i, photo._id)} className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs">
                          <Trash2 className="w-3 h-3"/>
                        </button>
                      </div>
                    ))}
                    {album.newPhotos && album.newPhotos.map((photo, pIndex) => (
                      <div key={`new-photo-${pIndex}`} className="relative aspect-square">
                        <img src={URL.createObjectURL(photo)} alt="new-photo" className="w-full h-full object-cover rounded-md"/>
                      </div>
                    ))}
                  </div>
                  <input type="file" multiple onChange={e => handleFileChange(i, e.target.files)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700"/>
                </div>
              ))}
              <button onClick={() => addRemoveItem('albums')} className="text-sm font-medium text-red-600">+ Add another album</button>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Videos</h3>
                {formData.videos.map((video, i) => (
                  <div key={video._id || `new-${i}`} className="flex items-center gap-2 p-2 border-b">
                    <input placeholder="Video Title" value={video.title} onChange={e => handleItemChange('videos', i, 'title', e.target.value)} className="flex-1 px-3 py-2 text-sm border rounded-md"/>
                    <input placeholder="YouTube/Vimeo URL" value={video.url} onChange={e => handleItemChange('videos', i, 'url', e.target.value)} className="flex-1 px-3 py-2 text-sm border rounded-md"/>
                    <button onClick={() => addRemoveItem('videos', i)} className="text-red-600 p-2"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))}
                <button onClick={() => addRemoveItem('videos')} className="text-sm font-medium text-red-600 mt-2">+ Add Video</button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">FAQs</h3>
                {formData.faqs.map((faq, i) => (
                  <div key={faq._id || `new-${i}`} className="flex items-center gap-2 p-2 border-b">
                    <input placeholder="Question" value={faq.question} onChange={e => handleItemChange('faqs', i, 'question', e.target.value)} className="flex-1 px-3 py-2 text-sm border rounded-md"/>
                    <input placeholder="Answer" value={faq.answer} onChange={e => handleItemChange('faqs', i, 'answer', e.target.value)} className="flex-1 px-3 py-2 text-sm border rounded-md"/>
                    <button onClick={() => addRemoveItem('faqs', i)} className="text-red-600 p-2"><Trash2 className="w-5 h-5"/></button>
                  </div>
                ))}
                <button onClick={() => addRemoveItem('faqs')} className="text-sm font-medium text-red-600 mt-2">+ Add FAQ</button>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center py-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Set Package Visibility</h3>
              <div className="flex justify-center gap-4">
                <button onClick={() => setFormData(p => ({...p, visibility: 'private'}))} className={`px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold border-2 ${formData.visibility === 'private' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700'}`}>
                  <EyeOff className="w-5 h-5" /> Private
                </button>
                <button onClick={() => setFormData(p => ({...p, visibility: 'public'}))} className={`px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold border-2 ${formData.visibility === 'public' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700'}`}>
                  <Eye className="w-5 h-5" /> Public
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-200">
            <button onClick={prevStep} disabled={currentStep === 1 || loading} className={`flex items-center px-5 py-2 rounded-lg font-medium text-sm ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}>
              <ChevronLeft className="w-4 h-4 mr-1" /> Previous
            </button>
            <button onClick={nextStep} disabled={loading} className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-bold text-sm hover:from-red-600 hover:to-red-800 shadow-lg disabled:opacity-50">
              {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Saving...</> : currentStep === 5 ? 'Finish & Update' : 'Save & Continue'}
              {!loading && currentStep < 5 && <ChevronRight className="w-5 h-5 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditServicePackage;