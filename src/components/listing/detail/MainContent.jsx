import React, { useState } from 'react';
import HeroSection from './HeroSection';
import DynamicIcon from '../../DynamicIcon'; // Import DynamicIcon
import { Share2 } from 'lucide-react';

const MainContent = ({ venueData, detailImages }) => { // Accepted detailImages prop
    const [currentReview, setCurrentReview] = useState(0);
    const [userName, setUserName] = useState('');
    const [userRating, setUserRating] = useState(5);
    const [userComment, setUserComment] = useState('');

    if (!venueData) {
        return <div>Loading...</div>; // Or some other placeholder
    }

    // Destructure directly from venueData
    const { title, description, startingPrice, reviews, faqs, photoAlbums, location, venueCategory, services } = venueData;

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (userName && userComment) {
            alert("Thank you! Your review has been submitted.");
            setUserName('');
            setUserComment('');
            setUserRating(5);
        }
    };

    return (
        <div className="detail-bs-info bg-gray-200 py-3 px-3 shadow-xl rounded-lg">
            {/* ====== Header ====== */}
            <div className="card bg-white shadow-md rounded-lg mb-3 overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-wrap -mx-4 items-start">
                        <div className="w-full md:w-1/2 px-4">
                            <h1 className="text-2xl gradient-text font-bold">{title}</h1>
                            <h2 className="text-sm body-font text-gray-600">
                                <span className="location">{location?.city?.name}, {location?.state?.name}</span>
                            </h2>
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <div className="flex justify-end items-center space-x-4 mt-4 md:mt-0">
                                {/* Hire, Shortlist, Share buttons can be implemented later */}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4 mt-6 items-center">
                        <div className="w-full md:w-8/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-1/3 px-2 border-r border-gray-300">
                                    <h6 className="text-md text-red-600">Starting Price</h6>
                                    <p className="m0 text-sm text-gray-900">₹ {startingPrice || 'N/A'}</p>
                                </div>
                                <div className="w-1/3 px-3 border-r border-gray-400">
                                    <h6 className="text-md text-red-600">Primary Market</h6>
                                    <p className="m0 text-sm text-gray-900">{location?.city?.name}</p>
                                </div>
                                <div className="w-1/3 px-3">
                                    <h6 className="text-md text-red-600">Reviews</h6>
                                    <p className="m0 text-sm text-gray-900">{reviews?.length || 0} reviews</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12 mt-4 md:mt-0">
                            <div className="flex space-x-2">
                                <a href="#pricing" className="bg-red-500 text-sm text-white px-3 py-2 rounded-md hover:bg-red-600">Request Pricing</a>
                                <a href="#write-review" className="bg-gray-200 text-sm text-gray-800 px-3 py-2 rounded-md hover:bg-gray-300">Write a Review</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HeroSection images={detailImages} />

            {/* ====== About ====== */}
            <div className="card bg-white shadow-md rounded-lg mb-3 overflow-hidden mt-6">
                <div className="p-6">
                    <h3 className="text-xl gradient-text font-bold mb-2">About {title}</h3>
                    <div className="space-y-4 text-gray-700">
                        <p>{description || 'No description available.'}</p>
                    </div>
                </div>
            </div>

            {/* ====== Services Only ====== */}
            {services && Object.keys(services).length > 0 && (
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">Services & Amenities</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {Object.values(services).map((service, index) => { // Use Object.values and check service.value
                                if (service.value) {
                                    return (
                                        <div key={index} className="flex flex-col items-center justify-start text-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
                                            <DynamicIcon name={service.icon} className="h-8 w-8 mb-3 text-red-600" />
                                            <p className="font-semibold text-sm leading-tight">{service.name}</p>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ====== FAQ ====== */}
            {faqs && faqs.length > 0 && (
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <details key={index} className="group bg-gray-50 rounded-lg overflow-hidden">
                                    <summary className="flex justify-between items-center p-5 cursor-pointer list-none font-medium text-gray-800 hover:bg-gray-100">
                                        <span>{faq.question}</span>
                                        <span className="transition group-open:rotate-180 text-red-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <p className="px-5 pb-5 text-gray-600">{faq.answer}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ====== Gallery ====== */}
            {detailImages && detailImages.length > 0 && (
                <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {detailImages.map((src, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                    <img src={src} alt="" className="w-full h-56 object-cover hover:scale-110 transition duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ====== Reviews ====== */}
            {reviews && reviews.length > 0 && (
                 <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                    <div className="p-6">
                        <h3 className="text-2xl font-bold mb-6">Customer Reviews ({reviews.length})</h3>
                        {/* Review rendering logic here */}
                    </div>
                </div>
            )}

            {/* ====== Write a Review Card ====== */}
            <div id="write-review" className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Write Your Review</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        {/* Form remains the same */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MainContent;