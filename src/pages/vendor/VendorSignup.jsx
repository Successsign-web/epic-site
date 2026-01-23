import toast from 'react-hot-toast';
import { Mail, Lock, User, Briefcase, Phone, MapPin, FileText, Upload, Globe, Calendar, Users, ChevronRight, ChevronLeft, Check, ShieldCheck } from 'lucide-react';
import { State, City } from 'country-state-city';
import Select from 'react-select';
import API_CONFIG from '../../Config/apiConfig';
import api from '../../utils/axiosInstance';
import React, { useState } from 'react';

const VendorSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const states = State.getStatesOfCountry("IN");
  const [cityList, setCityList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otp, setOtp] = useState('');
  const [tempPhone, setTempPhone] = useState('');

  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const [formData, setFormData] = useState({
    contactPerson: '', phone: '', email: '', password: '',
    vendorName: '', experience: '', teamSize: '', workingSince: '', website: '',
    state: '', city: '', locality: '', address: '', pincode: '', googleMapLink: '',
    profile: null, coverImage: null, gst: null, pan: null, idProof: null, registrationProof: null
  });

  const steps = [
    { number: 1, title: 'Personal Details', icon: User },
    { number: 2, title: 'Business Details', icon: Briefcase },
    { number: 3, title: 'Location Details', icon: MapPin },
    { number: 4, title: 'Documents & Media', icon: FileText }
  ];

  const backgroundImages = [
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleNext = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const handlePrevious = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  // OTP & Registration Functions
  const handleSendOtp = () => {
    if (!formData.phone) {
      toast.error("Please enter a phone number!");
      return;
    }
    setTempPhone(formData.phone);
    setShowOtpScreen(true);
    toast(`OTP sent to ${formData.phone} → For testing purposes, the OTP is: 1234`);
  };

  const verifyOtp = () => {
    if (otp === '1234') {
      registerVendor();
    } else {
      toast.error('Incorrect OTP! The testing OTP is 1234');
      setOtp('');
    }
  };

  const registerVendor = async () => {
    setLoading(true);
    const data = new FormData();

    // Append all fields
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await api.post('/vendor', data);
      const status = response.data.data.status;

      if (status === "active") {
        toast.success("Congratulations! Registration successful! Redirecting to dashboard...");
        localStorage.setItem("vendorToken", response.data.token || "dummy");
        window.location.href = "/vendor/dashboard";
      }
      else if (status === "pending") {
        toast.success("Registration complete! Your account is under review. You will get approval soon.");
        window.location.href = "/vendor/waiting-approval";
      }
      else {
        toast("Registration successful! Admin will review it soon.");
        window.location.href = "/vendor/login";
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong, please try again");
    } finally {
      setLoading(false);
      setShowOtpScreen(false);
      setOtp('');
    }
  };

  // Auto Location
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
          const finalState = matchedState ? matchedState.name : state;

          setFormData(prev => ({
            ...prev, state: finalState, city, locality, address: addr, pincode: pin,
            googleMapLink: `https://maps.google.com?q=${lat},${lng}`
          }));

                     if (matchedState) {
            setSelectedState({ value: matchedState.isoCode, label: matchedState.name });
            const cities = City.getCitiesOfState("IN", matchedState.isoCode);
            setCityList(cities);
            const matchedCity = cities.find(c => c.name.toLowerCase() === city.toLowerCase());
            if (matchedCity) {
              setSelectedCity({ value: matchedCity.name, label: matchedCity.name });
            }
          }
        }
      } catch (e) { console.error(e); toast.error("Could not fetch location"); }
    }, () => toast.error("Location permission denied"));
  };

  const stateOptions = states.map(s => ({ value: s.isoCode, label: s.name }));
  const cityOptions = cityList.map(c => ({ value: c.name, label: c.name }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* LEFT FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-xl w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 text-gray-900">Vendor Registration</h2>
            <p className="mt-1 text-sm text-gray-600">Join our wedding professionals network</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 backdrop-blur-sm">

            {/* Step 1 */}
            {currentStep === 1 && (
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <User className="w-5 h-5 mr-2 text-red-600" /> Personal Information
                </h3>
                <div><label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact Person Name *</label><div>
                  <div className="relative"><User className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" /><input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Full name" /></div></div>

                <div><label className="block text-xs font-semibold text-gray-700 mb-1.5">Phone Number *</label><div className="relative"><Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" /><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Phone number" /></div></div>

                <div><label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address *</label><div className="relative"><Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" /><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Email" /></div></div>

                <div><label className="block text-xs font-semibold text-gray-700 mb-1.5">Password *</label><div className="relative"><Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" /><input type="password" name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" placeholder="Password" /></div></div>
              </div>
              </div>
            )}

           {/* Step 2: Business Details */}
            {currentStep === 2 && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-red-600" />
                  Business Information
                </h3>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Business/Vendor Name *</label>
                  <div className="relative">
                    <Briefcase className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="vendorName"
                      value={formData.vendorName}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Enter business name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Experience (Years) *</label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Years"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Working Since *</label>
                    <div className="relative">
                      <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        name="workingSince"
                        value={formData.workingSince}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        placeholder="Year"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Team Size</label>
                  <div className="relative">
                    <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="number"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Number of members"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location Details */}
            {currentStep === 3 && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-600" />
                  Location Information
                </h3>
            

                
                <div className="grid grid-cols-2 gap-3">
                  <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">State *</label>
      
      <Select
                      value={selectedState}
                      onChange={(option) => {
                        setSelectedState(option);
                        setSelectedCity(null);
                        setFormData(prev => ({ ...prev, state: option?.label || '', city: '' }));
                        if (option) setCityList(City.getCitiesOfState("IN", option.value));
                        else setCityList([]);
                      }}
                      options={stateOptions}
                      placeholder="Search state..."
                      isSearchable
                      isClearable
                      className="text-sm"
                      classNamePrefix="react-select"
                      styles={{
          control: (provided) => ({
            ...provided,
            borderColor: '#d1d5db',
            '&:hover': { borderColor: '#ef4444' },
            boxShadow: 'none',
            borderRadius: '0.5rem',
            padding: '0.15rem 0.5rem',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#ef4444' : state.isFocused ? '#fee2e2' : 'white',
            color: state.isSelected ? 'white' : 'black',
          }),
        }}
                    />
    </div>

    {/* City Select - Searchable */}
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1.5">City *</label>
      <Select
       value={selectedCity}
                      onChange={(option) => {
                        setSelectedCity(option);
                        setFormData(prev => ({ ...prev, city: option?.label || '' }));
                      }}
                      options={cityOptions}
                      placeholder={cityList.length === 0 ? "Select state first" : "Search city..."}
                      isSearchable
                      isDisabled={cityList.length === 0}
                      isClearable
                      noOptionsMessage={() => "No cities found"}
                      className="text-sm"
                      classNamePrefix="react-select"
        styles={{
          control: (provided) => ({
            ...provided,
            borderColor: '#d1d5db',
            '&:hover': { borderColor: '#ef4444' },
            boxShadow: 'none',
            borderRadius: '0.5rem',
            padding: '0.15rem 0.5rem',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#ef4444' : state.isFocused ? '#fee2e2' : 'white',
            color: state.isSelected ? 'white' : 'black',
          }),
        }}
      />
    </div>
                </div>
                 <div 
  onClick={fetchLocation}
  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm cursor-pointer group transition-all duration-300 hover:gap-3 mt-2"
>
  <MapPin className="w-5 h-5 group-hover:animate-pulse transition-transform group-hover:scale-110" />
  <span className="border-b border-dotted border-indigo-400 group-hover:border-solid">
    Auto detect my location
  </span>
</div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Locality *</label>
                  <input
                    type="text"
                    name="locality"
                    value={formData.locality}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    placeholder="Enter locality/area"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter full address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Pincode"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Google Map Link</label>
                    <input
                      type="url"
                      name="googleMapLink"
                      value={formData.googleMapLink}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      placeholder="Map link"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Documents & Media */}
            {currentStep === 4 && (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-red-600" />
                  Documents & Media
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Profile Image *</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-red-500 hover:bg-red-50 transition-all cursor-pointer">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                      <input
                        type="file"
                        name="profile"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="profile"
                      />
                      <label htmlFor="profile" className="cursor-pointer text-xs text-gray-600">
                        {formData.profile ? formData.profile.name.slice(0, 15) + '...' : 'Upload Profile'}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Cover Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center hover:border-red-500 hover:bg-red-50 transition-all cursor-pointer">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 mb-1" />
                      <input
                        type="file"
                        name="coverImage"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                        id="coverImage"
                      />
                      <label htmlFor="coverImage" className="cursor-pointer text-xs text-gray-600">
                        {formData.coverImage ? formData.coverImage.name.slice(0, 15) + '...' : 'Upload Cover'}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Business Documents (Optional)</h4>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">GST Certificate</label>
                      <input
                        type="file"
                        name="gst"
                        onChange={handleFileChange}
                        className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        id="gst"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">PAN Card</label>
                      <input
                        type="file"
                        name="pan"
                        onChange={handleFileChange}
                        className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        id="pan"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">ID Proof</label>
                      <input
                        type="file"
                        name="idProof"
                        onChange={handleFileChange}
                        className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        id="idProof"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Registration Proof</label>
                      <input
                        type="file"
                        name="registrationProof"
                        onChange={handleFileChange}
                        className="w-full text-xs file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        id="registrationProof"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* NAVIGATION + OTP MODAL */}
            <div className="relative pt-4 mt-4 border-t border-gray-200">
              <div className="flex justify-between items-center relative">

                <button onClick={handlePrevious} disabled={currentStep === 1}
                  className={`flex items-center px-5 py-2 rounded-lg font-medium text-sm transition-all ${currentStep === 1 ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 hover:bg-gray-300 hover:scale-105'}`}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </button>

                <div className="absolute left-1/2 -translate-x-1/2">
                  <p className="text-xs text-gray-600">
                    Already have account? <a href="/vendor/login" className="font-semibold text-red-600">Sign in</a>
                  </p>
                </div>

                {/* OTP SCREEN */}
                {showOtpScreen && (
                  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck className="w-14 h-14 text-green-600" />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">Verify Phone</h2>
                      <p className="text-xl font-bold text-green-600 mb-8">{tempPhone}</p>
                      <p className="text-sm text-green-600 font-bold mb-6">Test OTP: 1234</p>
                      <input
                        type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,4))}
                        className="w-full text-center text-5xl tracking-widest py-6 border-4 rounded-3xl mb-8"
                        placeholder="----"
                        maxLength="4"
                      />
                      <button onClick={verifyOtp} disabled={otp.length !== 4 || loading}
                        className="w-full py-5 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-3xl disabled:opacity-50">
                        {loading ? 'Registering...' : 'Verify & Register'}
                      </button>
                      <button onClick={() => { setShowOtpScreen(false); setOtp(''); }} className="mt-4 text-gray-600">
                        Back
                      </button>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                {!showOtpScreen && currentStep < 4 ? (
                  <button onClick={handleNext}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-medium text-sm hover:from-red-600 hover:to-red-800 transition-all transform hover:scale-105 shadow-lg">
                    Next <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                ) : !showOtpScreen && (
              <button 
                 onClick={handleSendOtp}
                         className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-md font-bold text-[13px] hover:from-green-700 hover:to-emerald-800 transition-all shadow-sm flex items-center gap-2"
                         >
                       <ShieldCheck className="w-4 h-4" /> 
                            Send OTP
                           </button>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
       <div  className="hidden lg:block w-1/2 bg-cover bg-center transition-all duration-700 ease-in-out relative"
        style={{ 
          backgroundImage: `url('${backgroundImages[currentStep - 1]}')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-red-900/60 backdrop-blur-sm"></div>
        <div className="relative h-full flex flex-col justify-between px-12 py-10 ">
          {/* Top: Step Info */}
          <div className="text-white">
            <div className="inline-block bg-white/10 backdrop-blur-md px-4 pt-1 rounded-full border border-white/20 mb-4">
              <span className="text-sm font-semibold">Step {currentStep} of 4</span>
            </div>
            {currentStep === 1 && (
              <>
                <h1 className="text-5xl font-bold mb-2 leading-tight animate-fadeIn">Welcome Aboard!</h1>
                <p className="text-lg text-gray-200 leading-relaxed">Let's get started with your personal information</p>
              </>
            )}
            {currentStep === 2 && (
              <>
                <h1 className="text-5xl font-bold mb-2 leading-tight animate-fadeIn">Your Business</h1>
                <p className="text-lg text-gray-200 leading-relaxed">Share details about your amazing services and experience</p>
              </>
            )}
            {currentStep === 3 && (
              <>
                <h1 className="text-5xl font-bold mb-2 leading-tight animate-fadeIn">Where Are You?</h1>
                <p className="text-lg text-gray-200 leading-relaxed">Help couples find you easily with your location details</p>
              </>
            )}
            {currentStep === 4 && (
              <>
                <h1 className="text-5xl font-bold mb-2 leading-tight animate-fadeIn">Final Step!</h1>
                <p className="text-lg text-gray-200 leading-relaxed">Upload your documents and showcase your brand</p>
              </>
            )}
          </div>

            {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.number;
                const isCurrent = currentStep === step.number;
                
                return (
                  <React.Fragment key={step.number}>
                    <div className="flex flex-col bg-white/10 backdrop-blur-md rounded-xl p-5 items-center flex-1">
                      <div className={`w-10 h-10  rounded-full flex items-center justify-center transition-all duration-500 transform ${
                        isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600 scale-110' : 
                        isCurrent ? 'bg-gradient-to-br from-red-500 to-red-700 scale-110 shadow-lg' : 
                        'bg-gray-300 scale-100'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <Icon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <span className={`text-xs mt-1.5 font-medium text-center transition-colors duration-300 ${
                        isCurrent ? 'text-red-600' : 'text-white'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-0.5 transition-all duration-500 ${
                        currentStep > step.number ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Bottom: Features */}
          <div className="space-y-3">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="bg-red-500 rounded-lg p-2">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-sm">Verified Platform</h3>
                  <p className="text-xs text-gray-300">Trusted by 10,000+ vendors</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="bg-red-500 rounded-lg p-2">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold text-sm">Wide Reach</h3>
                  <p className="text-xs text-gray-300">Connect with thousands of couples</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSignup;