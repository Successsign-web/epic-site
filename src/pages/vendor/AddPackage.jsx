import React, { useState, useMemo,useEffect } from 'react';
import toast from 'react-hot-toast';
import { ChevronRight, ChevronLeft, Check, Upload, DollarSign, Image, HelpCircle, Video, Eye, EyeOff, Package, Info, MapPin, GalleryHorizontal, ListVideo, BadgeCheck, Loader2 } from 'lucide-react';
import Select from 'react-select';
import api from '../../utils/axiosInstance';
import API_CONFIG from '../../Config/apiConfig';
import { State, City } from 'country-state-city';
import RichTextEditor from '../../components/RichTextEditor';
import DynamicIcon from '../../components/DynamicIcon';

const AddPackage = () => {



    const [currentStep, setCurrentStep] = useState(1);
    const [packageId, setPackageId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const [featuredImage, setFeaturedImage] = useState(null);
    const [featuredImagePreview, setFeaturedImagePreview] = useState(null);
    const [services, setServices] = useState([]);
    const [serviceData, setServiceData] = useState({});

    useEffect(() => {
        // Cleanup function to revoke the object URL
        return () => {
            if (featuredImagePreview) {
                URL.revokeObjectURL(featuredImagePreview);
            }
        };
    }, [featuredImagePreview]);
    

    
const [venueCategoryOptions , setVenueCategoryOptions ] = useState([]);

const fetchVenueCategories = async () => {
    try {
        const token = localStorage.getItem("vendorToken");

        const res = await api.get('/vendor/venue-categories', {
            headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Venue category API response:", res.data);

        const options = res.data.data.map(cat => ({
            value: cat._id,
            label: cat.name,
            services: cat.services || [], // Include services in the option
        }));

        setVenueCategoryOptions(options);

    } catch (err) {
        console.error('Error fetching venue categories:', err);
        toast.error('Failed to load venue categories');
    }
};

useEffect(() => {
    fetchVenueCategories();
}, []);


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startingPrice: '',
        venueCategory: null,
        locality: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        fullAddress: '',
        albums: [{ title: '', photos: [] }],
        faqs: [{ question: '', answer: '' }],
        videos: [{ title: '', url: '' }],
        visibility: 'private',
    });

    const states = State.getStatesOfCountry("IN");
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const cityList = useMemo(() => selectedState ? City.getCitiesOfState('IN', selectedState.value) : [], [selectedState]);
    const stateOptions = states.map(s => ({ value: s.isoCode, label: s.name }));
    const cityOptions = cityList.map(c => ({ value: c.name, label: c.name }));

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (albumIndex, files) => {
        const updatedAlbums = [...formData.albums];
        updatedAlbums[albumIndex].photos = Array.from(files);
        setFormData(prev => ({ ...prev, albums: updatedAlbums }));
    };

    const addRemoveItem = (type, index) => {
        const currentItems = [...formData[type]];
        if (index !== undefined) {
            currentItems.splice(index, 1);
        } else {
            if (type === 'albums') currentItems.push({ title: '', photos: [] });
            else if (type === 'faqs') currentItems.push({ question: '', answer: '' });
            else if (type === 'videos') currentItems.push({ title: '', url: '' });
        }
        setFormData(prev => ({ ...prev, [type]: currentItems }));
    };


    const handleItemChange = (type, index, field, value) => {
        const updatedItems = [...formData[type]];
        updatedItems[index][field] = value;
        setFormData(prev => ({ ...prev, [type]: updatedItems }));
    }


    const steps = [
        { number: 1, title: 'Details & Location', icon: Info },
        { number: 2, title: 'Albums (Optional)', icon: GalleryHorizontal },
        { number: 3, title: 'Videos (Optional)', icon: ListVideo },
        { number: 4, title: 'FAQs (Optional)', icon: HelpCircle },
        { number: 5, title: 'Publish', icon: BadgeCheck },
    ];

    const fetchLocation = () => {
        if (!navigator.geolocation) return toast.error("Location not supported");

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            try {
                const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_CONFIG.GOOGLE_MAPS_API_KEY}`);
                const json = await res.json();
                
                if (json.results[0]) {
                    const c = json.results[0].address_components;
                    const addr = json.results[0].formatted_address;

                    let state = "", city = "", locality = "", pin = "";

                    c.forEach(comp => {
                        if (comp.types.includes("administrative_area_level_1")) state = comp.long_name;
                        if (!city && comp.types.includes("locality")) city = comp.long_name;
                        if (!city && comp.types.includes("administrative_area_level_2")) city = comp.long_name;
                        if (!locality && comp.types.includes("sublocality_level_1")) locality = comp.long_name;
                        if (comp.types.includes("postal_code")) pin = comp.long_name;
                    });

                    const matchedState = states.find(s => s.name.toLowerCase().includes(state.toLowerCase()));
                    
                    setFormData(prev => ({
                        ...prev, 
                        state: matchedState ? matchedState.name : state, 
                        city, 
                        locality, 
                        fullAddress: addr, 
                        pincode: pin
                    }));

                    if (matchedState) {
                        setSelectedState({ value: matchedState.isoCode, label: matchedState.name });
                        const cities = City.getCitiesOfState("IN", matchedState.isoCode);
                        const matchedCity = cities.find(c => c.name.toLowerCase() === city.toLowerCase());
                        if (matchedCity) {
                            setSelectedCity({ value: matchedCity.name, label: matchedCity.name });
                        }
                    }
                }
            } catch (e) { console.error(e); toast.error("Could not fetch location"); }
        }, () => toast.error("Location permission denied"));
    };


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

    const handleCategoryChange = (option) => {
        setFormData(p => ({ ...p, venueCategory: option }));
        setServices(option ? option.services : []);
        setServiceData({}); // Reset service data when category changes
    };

    const nextStep = async () => {
        if (loading) return;

        if (currentStep === 1) { // Create Package with Location
            if (!formData.title || !formData.startingPrice || !formData.venueCategory || !formData.fullAddress || !formData.city || !formData.state) {
                return toast.error('Please fill all required fields in this step.');
            }
            setLoading(true);
            const data = new FormData();
            
            // In a real app, vendor ID would come from logged-in user context
            data.append('vendor', '692d436d2b1c931a86a0b65a');
            data.append('venueCategory', formData.venueCategory.value);
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('startingPrice', formData.startingPrice);
             // Append featured image if it exists
        if (featuredImage) {
            data.append('featuredImage', featuredImage);
        }

        // New validation: Ensure at least one service is provided if the category has services
        if (services.length > 0 && Object.values(serviceData).every(value => !value)) {
            return toast.error('Please fill out at least one service for the selected category.');
        }

        // Append services data as a JSON object of key-value pairs
        const servicesObject = services.reduce((obj, service) => {
            const value = serviceData[service._id];
            if (value) {
                obj[service.name] = value;
            }
            return obj;
        }, {});

        if (Object.keys(servicesObject).length > 0) {
            data.append('services', JSON.stringify(servicesObject));
        }

            
            const location = {
                locality: formData.locality,
                fullAddress: formData.fullAddress,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode,
                country: formData.country,
            }
            data.append('location', JSON.stringify(location));

            try {
                const token = localStorage.getItem("vendorToken");
                const res = await api.post('/vendor/venue-packages', data, {
                    headers: { 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                 }
                });
                setPackageId(res.data.data?._id || res.data._id);
                setCurrentStep(2);
                toast.success('Basic info and location saved!');
            } catch (err) {
                toast.error(err.response?.data?.message || 'Error creating package');
            } finally {
                setLoading(false);
            }
        
        } else if (currentStep === 2) { // Upload Albums
            setLoading(true);
            const validAlbums = formData.albums.filter(a => a.title && a.photos.length > 0);
            if (validAlbums.length === 0) {
                toast.info('No albums provided, skipping this step.');
                setCurrentStep(3);
                setLoading(false);
                return;
            }
            const data = new FormData();
            validAlbums.forEach((album, i) => {
                data.append(`albums[${i}][title]`, album.title);
                album.photos.forEach(photo => {
                    data.append(`albums[${i}][photos]`, photo);
                });
            });

            try {
                const token = localStorage.getItem("vendorToken");
                await api.patch(`/vendor/venue-packages/${packageId}/albums`, data, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setCurrentStep(3);
                toast.success('Albums uploaded successfully!');
            } catch (err) {
                toast.error(err.response?.data?.message || 'Albums upload failed!');
            } finally {
                setLoading(false);
            }
        } else if (currentStep === 3) { // Save Videos
            setLoading(true);
            const validVideos = formData.videos.filter(v => v.title && v.url);
            if (validVideos.length === 0) {
                toast.info('No videos provided, skipping this step.');
                setCurrentStep(4);
                setLoading(false);
                return;
            }
            try {
                const token = localStorage.getItem("vendorToken");
                for (const video of validVideos) {
                    const data = new URLSearchParams();
                    data.append('title', video.title);
                    data.append('url', video.url);
                    await api.post(`/vendor/venue-packages/${packageId}/videos`, data, {
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                }
                setCurrentStep(4);
                toast.success('Videos saved successfully!');
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to save videos!');
            } finally {
                setLoading(false);
            }
        } else if (currentStep === 4) { // Save FAQs
            setLoading(true);
            const validFaqs = formData.faqs.filter(f => f.question && f.answer);
            if (validFaqs.length === 0) {
                toast.info('No FAQs provided, skipping this step.');
                setCurrentStep(5);
                setLoading(false);
                return;
            }
            try {
                const token = localStorage.getItem("vendorToken");
                for (const faq of validFaqs) {
                    const data = new URLSearchParams();
                    data.append('question', faq.question);
                    data.append('answer', faq.answer);
                    await api.post(`/vendor/venue-packages/${packageId}/faqs`, data, {
                        headers: { 
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                }
                setCurrentStep(5);
                toast.success('FAQs saved successfully!');
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to save FAQs!');
            } finally {
                setLoading(false);
            }
        } else if (currentStep === 5) { // Update Status
            setLoading(true);
            try {
                const token = localStorage.getItem("vendorToken");
                await api.put(`/vendor/venue-packages/${packageId}/status`, {
                    
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


    if (success) {
        return (
            <div className="min-h-[70vh] bg-gray-50 flex items-center justify-center p-6 font-poppins">
                <div className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-md w-full">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check className="w-14 h-14 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Package Created!</h2>
                    <p className="text-gray-600 mt-3">Your new venue package has been successfully created and is ready.</p>
                    <a href="/vendor/dashboard" className="mt-8 inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-all">
                        Go to Dashboard
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
                    className={`w-full ${Icon ? 'pl-9' : 'pl-3'} pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            borderColor: '#d1d5db',
            '&:hover': { borderColor: '#ef4444' },
            boxShadow: 'none',
            borderRadius: '0.5rem',
            padding: '0.15rem 0'
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
                    <h1 className="text-3xl font-bold text-gray-900">Add New Package</h1>
                    <p className="mt-1 text-sm text-gray-600">Create a new offering for your clients in just a few steps.</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-10 px-4">
                    <div className="flex items-center">
                        {steps.map((stepInfo, index) => {
                            const isCompleted = currentStep > stepInfo.number;
                            const isCurrent = currentStep === stepInfo.number;
                            return (
                                <React.Fragment key={stepInfo.number}>
                                    <div className="flex flex-col items-center w-32">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-green-600' : isCurrent ? 'bg-red-600' : 'bg-gray-300'}`}>
                                            {isCompleted ? <Check className="w-6 h-6 text-white" /> : <stepInfo.icon className="w-5 h-5 text-white" />}
                                        </div>
                                        <p className={`mt-2 text-xs font-semibold text-center ${isCurrent ? 'text-red-600' : 'text-gray-500'}`}>{stepInfo.title}</p>
                                    </div>
                                    {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 transition-colors duration-300 ${currentStep > index + 1 ? 'bg-green-600' : 'bg-gray-200'}`} />}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>


                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    {/* Step 1: Basic Info & Location */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4"><Package className="w-5 h-5 mr-2 text-red-600"/>Basic Information</h3>
                            {renderInput('title', 'Package Title', Package, 'text', true)}
                           <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
    <RichTextEditor
        value={formData.description}
        onChange={(html) => setFormData(prev => ({ ...prev, description: html }))}
        placeholder="Describe your package in detail... (supports bold, italic, lists, etc.)"
    />
</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {renderInput('startingPrice', 'Starting Price (INR)', null, 'number', true)}

                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Venue Category *</label>
                                    <Select options={venueCategoryOptions} value={formData.venueCategory} onChange={handleCategoryChange} styles={selectStyles} placeholder="Select a category..." />
                                </div>
                            </div>


                            {/* Featured Image Upload */}
                            <div className="pt-4 mt-4 border-t">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4"><Image className="w-5 h-5 mr-2 text-red-600"/>Featured Image</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                        {featuredImagePreview ? (
                                            <img src={featuredImagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg"/>
                                        ) : (
                                            <span className="text-xs text-gray-500">No Image</span>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        id="featured-image-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFeaturedImageChange}
                                    />
                                    <label htmlFor="featured-image-upload" className="cursor-pointer bg-white border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-all">
                                        <Upload className="w-4 h-4 mr-2 inline-block" />
                                        {featuredImage ? 'Change Image' : 'Upload Image'}
                                    </label>
                                </div>
                            </div>
                            
                            {/* Services Section */}
                <div className="pt-4 mt-4 border-t">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                        <ListVideo className="w-5 h-5 mr-2 text-red-600" />
                        Package Services
                    </h3>
                    {!formData.venueCategory ? (
                        <p className="text-sm text-gray-500">Please select a venue category to see available services.</p>
                    ) : loading ? (
                        <div className="flex items-center gap-2 text-gray-500">
                            <Loader2 className="w-5 h-5 animate-spin"/>
                            <span>Loading services...</span>
                        </div>
                    ) : services.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {services.map(service => (
                                <div key={service._id}>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
                                        <DynamicIcon name={service.icon} className="w-4 h-4 mr-2" />
                                        {service.name}
                                    </label>
                                    <div className="relative">
                                         <input
                                            type={service.type || 'text'}
                                            value={serviceData[service._id] || ''}
                                            onChange={(e) => handleServiceDataChange(service._id, e.target.value)}
                                            className="w-full pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                                            placeholder={`Enter ${service.name}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No services found for this category.</p>
                    )}
                </div>


                            <div className="pt-4 mt-4 border-t">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4"><MapPin className="w-5 h-5 mr-2 text-red-600"/>Location</h3>
                                <div 
                                    onClick={fetchLocation}
                                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm cursor-pointer group transition-all duration-300 hover:gap-3 mb-4"
                                >
                                    <MapPin className="w-5 h-5 group-hover:animate-pulse transition-transform group-hover:scale-110" />
                                    <span className="border-b border-dotted border-indigo-400 group-hover:border-solid">
                                        Auto detect my location
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">State *</label>
                                        <Select options={stateOptions} value={selectedState} onChange={opt => { setSelectedState(opt); setFormData(p => ({...p, state: opt.label, city: ''})); setSelectedCity(null); }} styles={selectStyles} placeholder="Select state..."/>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">City *</label>
                                        <Select options={cityOptions} value={selectedCity} onChange={opt => { setSelectedCity(opt); setFormData(p => ({...p, city: opt.label})); }} styles={selectStyles} placeholder="Select city..." isDisabled={!selectedState} />
                                    </div>
                                </div>
                                {renderInput('locality', 'Locality / Area', MapPin)}
                                {renderInput('fullAddress', 'Full Address', MapPin, 'text', true)}
                                {renderInput('pincode', 'Pincode', MapPin)}
                            </div>
                        </div>
                    )}
                    
                    
                    {/* Step 2: Albums */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                           {formData.albums.map((album, i) => (
                               <div key={i} className="p-4 border rounded-lg bg-gray-50 space-y-3">
                                   <input type="text" placeholder="Album Title" value={album.title} onChange={e => handleItemChange('albums', i, 'title', e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg" />
                                   <input type="file" multiple onChange={e => handleFileChange(i, e.target.files)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"/>
                                   {i > 0 && <button onClick={() => addRemoveItem('albums', i)} className="text-xs text-red-600">Remove Album</button>}
                               </div>
                           ))}
                           <button onClick={() => addRemoveItem('albums')} className="text-sm font-medium text-red-600">+ Add another album</button>
                        </div>
                    )}

                    {/* Step 3: Videos */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-2">Videos (Optional)</h3>
                                {formData.videos.map((video, i) => (
                                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 border-b">
                                        <input placeholder="Video Title" value={video.title} onChange={e => handleItemChange('videos', i, 'title', e.target.value)} className="px-3 py-2 text-sm border rounded-md"/>
                                        <input placeholder="YouTube/Vimeo URL" value={video.url} onChange={e => handleItemChange('videos', i, 'url', e.target.value)} className="px-3 py-2 text-sm border rounded-md"/>
                                        {i > 0 && <button onClick={() => addRemoveItem('videos', i)} className="text-xs text-red-600 sm:col-span-2">Remove Video</button>}
                                    </div>
                                ))}
                                <button onClick={() => addRemoveItem('videos')} className="text-sm font-medium text-red-600 mt-2">+ Add Video</button>
                            </div>
                        </div>
                    )}
                     {/* Step 4: FAQs */}
                     {currentStep === 4 && (
                        <div className="space-y-6">
                             <div>
                                <h3 className="font-semibold text-gray-800 mb-2">FAQs (Optional)</h3>
                                {formData.faqs.map((faq, i) => (
                                    <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2 border-b">
                                        <input placeholder="Question" value={faq.question} onChange={e => handleItemChange('faqs', i, 'question', e.target.value)} className="px-3 py-2 text-sm border rounded-md"/>
                                        <input placeholder="Answer" value={faq.answer} onChange={e => handleItemChange('faqs', i, 'answer', e.target.value)} className="px-3 py-2 text-sm border rounded-md"/>
                                        {i > 0 && <button onClick={() => addRemoveItem('faqs', i)} className="text-xs text-red-600 sm:col-span-2">Remove FAQ</button>}
                                    </div>
                                ))}
                                <button onClick={() => addRemoveItem('faqs')} className="text-sm font-medium text-red-600 mt-2">+ Add FAQ</button>
                            </div>
                        </div>
                        )}

                    {/* Step 5: Publish */}
                    {currentStep === 5 && (
                        <div className="text-center py-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Set Package Visibility</h3>
                            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
                                'Public' packages are visible to all clients. 'Private' packages are hidden and can only be shared via a direct link.
                            </p>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setFormData(p => ({...p, visibility: 'private'}))} className={`px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold border-2 transition-all ${formData.visibility === 'private' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                                    <EyeOff className="w-5 h-5" /> Private
                                </button>
                                <button onClick={() => setFormData(p => ({...p, visibility: 'public'}))} className={`px-6 py-3 rounded-lg flex items-center gap-2 text-sm font-semibold border-2 transition-all ${formData.visibility === 'public' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                                    <Eye className="w-5 h-5" /> Public
                                </button>
                            </div>
                        </div>
                    )}
                    
                    {/* Navigation */}
                    <div className="flex justify-between items-center pt-6 mt-8 border-t border-gray-200">
                        <button onClick={prevStep} disabled={currentStep === 1 || loading} className={`flex items-center px-5 py-2 rounded-lg font-medium text-sm transition-all ${currentStep === 1 ? 'text-gray-400 cursor-not-allowed' : 'bg-gray-200 hover:bg-gray-300'}`}>
                            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                        </button>
                        <button onClick={nextStep} disabled={loading} className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-bold text-sm hover:from-red-600 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Saving...</>
                            ) : (
                                currentStep === 5 ? (
                                    'Finish & Publish'
                                ) : (
                                    currentStep === 2 && formData.albums.filter(a => a.title && a.photos.length > 0).length === 0 ? 'Skip & Continue' :
                                    currentStep === 3 && formData.videos.filter(v => v.title && v.url).length === 0 ? 'Skip & Continue' :
                                    currentStep === 4 && formData.faqs.filter(f => f.question && f.answer).length === 0 ? 'Skip & Continue' :
                                    'Save & Continue'
                                )
                            )}
                            {!loading && currentStep < 5 && <ChevronRight className="w-5 h-5 ml-2" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPackage;