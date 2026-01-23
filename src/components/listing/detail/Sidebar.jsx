import React, { useState, useEffect, useRef } from 'react'; // Add useRef
import api from '../../../utils/axiosInstance'; // Import the API instance
import toast from 'react-hot-toast'; // Import toast for notifications
import { MapPin } from 'lucide-react'; // Import MapPin icon

const Sidebar = ({ venueData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fn_date: '',
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    budget: '', 
    guestCount: '',
    rooms: '',
    fn_type: '',
    fn_time: '',
    wed_detail: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isLocating, setIsLocating] = useState(false); // New state for location loading
  const addressInputRef = useRef(null); // Create a ref for the address input

  useEffect(() => {
    if (venueData?.accommodation) {
      setFormData(prev => ({ ...prev, rooms: venueData.accommodation }));
    }
    // No default location set for granular inputs from venueData

    // Google Maps Autocomplete initialization
    if (window.google && addressInputRef.current) {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        { types: ['address'], componentRestrictions: { country: 'in' } } // Restrict to address predictions and India
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          return;
        }

        let address1 = '';
        let city = '';
        let state = '';
        let pincode = '';

        for (const component of place.address_components) {
          const componentType = component.types[0];

          switch (componentType) {
            case 'street_number': {
              address1 = `${component.long_name} ${address1}`;
              break;
            }
            case 'route': {
              address1 += component.long_name;
              break;
            }
            case 'postal_code': {
              pincode = component.long_name;
              break;
            }
            case 'postal_code_suffix': {
              pincode = `${pincode}-${component.long_name}`;
              break;
            }
            case 'locality': // city
              city = component.long_name;
              break;
            case 'administrative_area_level_1': // state
              state = component.long_name;
              break;
            // Add other component types as needed
          }
        }

        setFormData(prev => ({
          ...prev,
          addressLine1: address1,
          city: city,
          state: state,
          pincode: pincode,
          addressLine2: '', // Clear addressLine2 after autocomplete for fresh entry
        }));
      });
    }
  }, [venueData]); // Re-run effect if venueData changes, though autocomplete should only init once.


  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;


        if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
          toast.error('Google Maps API not fully loaded. Please try again in a moment.');
          setIsLocating(false);
          return;
        }
        
        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat: latitude, lng: longitude };

        geocoder.geocode({ location: latlng }, (results, status) => {

          if (status === 'OK' && results[0]) {
            let locality = ''; // city
            let adminArea1 = ''; // state
            let postalCode = '';

            for (const component of results[0].address_components) {
              const componentType = component.types[0];

              switch (componentType) {
                case 'locality':
                  locality = component.long_name;
                  break;
                case 'administrative_area_level_1':
                  adminArea1 = component.long_name;
                  break;
                case 'postal_code':
                  postalCode = component.long_name;
                  break;
              }
            }

            setFormData(prev => ({
              ...prev,
              addressLine1: results[0].formatted_address,
              city: locality,
              state: adminArea1,
              pincode: postalCode,
              addressLine2: '',
            }));
            toast.success('Location fetched successfully!');
          } else {
            toast.error('Geocoder failed due to: ' + status);
          }
          setIsLocating(false);
        });
      },
      (error) => {
        setIsLocating(false);
        toast.error(`Geolocation error: ${error.message}. Please enable location services.`);
        console.error('Geolocation error:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: type === 'radio' ? value : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    if (!formData.budget) {
        setSubmitError('Price is a required field.');
        setIsSubmitting(false);
        return;
    }
    if (!formData.guestCount) {
        setSubmitError('Number of Guests is a required field.');
        setIsSubmitting(false);
        return;
    }

    const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.wed_detail,
        source: 'website',
        category: venueData?.venueCategory?.name || 'General',
        budget: formData.budget, // Changed from formData.price
        deviceType: 'Desktop',
        venueId: venueData?._id,
        venueTitle: venueData?.title,
        eventDate: formData.fn_date,
        location: [formData.addressLine1, formData.city, formData.state, formData.pincode].filter(Boolean).join(', '),
        guests: formData.guestCount,
        rooms: formData.rooms,
        functionType: formData.fn_type,
        functionTime: formData.fn_time,
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await api.post('/public/inquiry', payload);
      
      if (response.data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          fn_date: '',
          addressLine1: '',
          city: '',
          state: '',
          pincode: '',
          budget: '',
          guestCount: '',
          rooms: venueData?.accommodation || '',
          fn_type: '',
          fn_time: '',
          wed_detail: '',
        });
      } else {
        setSubmitError(response.data.message || 'Submission failed.');
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || err.message || 'An unexpected error occurred.');
      console.error("Form submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="right-form">
        <div className="card bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="p-6">
                <div className="text-center btngradiant font-bold text-xl text-white py-2 mb-4">
                    Get Free Quote
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                        <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                        <input type="text" name="phone" placeholder="Mobile Number" required value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                        <div className="relative">
                            <i className="fa fa-calendar absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"></i>
                            <input type="date" name="fn_date" value={formData.fn_date} onChange={handleChange} placeholder="Event Date" className="w-full pl-10 pr-4 py-2 border rounded-md" />
                        </div>
                        <div className="flex flex-col items-start">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isLocating) handleGetCurrentLocation();
                                }}
                                className={`flex items-center text-blue-600 hover:text-blue-800 text-sm mt-1 gap-1 ${isLocating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-disabled={isLocating}
                            >
                                {isLocating ? (
                                    <>
                                        <MapPin size={16} className="animate-pulse" /> Locating...
                                    </>
                                ) : (
                                    <>
                                        <MapPin size={16} /> Use Current Location
                                    </>
                                )}
                            </a>
                            <input type="text" id="addressLine1" name="addressLine1" placeholder="Address Line 1" required value={formData.addressLine1} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" ref={addressInputRef} />
                        </div>
                        <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                        <input type="text" name="state" placeholder="State" required value={formData.state} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                        <input type="text" name="pincode" placeholder="Pincode" required value={formData.pincode} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                        <select name="budget" required value={formData.budget} onChange={handleChange} className="w-full px-4 py-2 border rounded-md bg-white">
                            <option value="">Select Price Range</option>
                            <option value={25000}>Below 25k</option>
                            <option value={50000}>Upto 50k</option>
                            <option value={100000}>Upto 1 Lakh</option>
                            <option value={500000}>1 Lakh - 5 Lakh</option>
                            <option value={1000000}>5 Lakh - 10 Lakh</option>
                            <option value={2000000}>10 Lakh - 20 Lakh</option>
                            <option value={5000000}>25 Lakh - 50 Lakh</option>
                            <option value={5000001}>Above 50 Lakh</option>
                        </select>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" name="guestCount" placeholder="Number of Guests" required value={formData.guestCount} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                            <input type="text" name="rooms" placeholder="No of rooms" value={formData.rooms} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
                        </div>
                         <div>
                            <p className="text-sm text-gray-700 mb-2">Function Type</p>
                            <div className="flex space-x-4">
                               <label className="flex items-center">
                                 <input name="fn_type" type="radio" value="Pre-Wedding" checked={formData.fn_type === 'Pre-Wedding'} onChange={handleChange} className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Pre-Wedding</span>
                               </label>
                               <label className="flex items-center">
                                 <input name="fn_type" type="radio" value="Wedding" checked={formData.fn_type === 'Wedding'} onChange={handleChange} className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Wedding</span>
                               </label>
                            </div>
                         </div>
                         <div>
                            <p className="text-sm text-gray-700 mb-2">Function Time</p>
                            <div className="flex space-x-4">
                               <label className="flex items-center">
                                 <input name="fn_time" type="radio" value="Evening" checked={formData.fn_time === 'Evening'} onChange={handleChange} className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Evening</span>
                               </label>
                               <label className="flex items-center">
                                 <input name="fn_time" type="radio" value="Day" checked={formData.fn_time === 'Day'} onChange={handleChange} className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500" />
                                 <span className="ml-2 text-sm text-gray-700">Day</span>
                               </label>
                            </div>
                         </div>
                         <textarea name="wed_detail" placeholder="Details about your wedding" required value={formData.wed_detail} onChange={handleChange} className="w-full px-4 py-2 border rounded-md"></textarea>
                         <button type="submit" className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600 font-semibold" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                         </button>
                         {submitSuccess && <p className="text-green-600 text-sm mt-2">Quote submitted successfully!</p>}
                         {submitError && <p className="text-red-600 text-sm mt-2">Error: {submitError}</p>}
                    </div>
                </form>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;
