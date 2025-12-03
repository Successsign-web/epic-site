import React, { useState } from 'react';
import HeroSection from './HeroSection';

const MainContent = () => {
    const [currentReview, setCurrentReview] = useState(0);
    const [userName, setUserName] = useState('');
    const [userRating, setUserRating] = useState(5);
    const [userComment, setUserComment] = useState('');

    const services = [
        { icon: 'https://www.shaadibaraati.com/vendors-service/24fecfb223d6116bc6809db871b5f7cd.png', title: 'Inclusions', detail: 'Yes' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/3d4374afc6ca931639d4106d4d78b08c.png', title: 'Wedding Packages', detail: 'Yes' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/bb74d8a930a9156e052fc72946441b9a.png', title: 'Spaces', detail: 'Banquet + Lawn' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/495b74c4e0b924f5bc0ce45e1cd2912a.png', title: 'No of Guests', detail: '500 - 1500' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/ea96836955387d84bd15bf773258ac4f.png', title: 'Accommodation', detail: '30 Rooms' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/7101691e376a0fbc6bc7ec5913f747db.png', title: 'Valet Parking', detail: 'Yes' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/8e1f8c5d2e8e8f9d0a1b2c3d4e5f6g7h.png', title: 'Swimming Pool', detail: 'Yes' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/a1b2c3d4e5f60718293a4b5c6d7e8f90.png', title: 'Bridal Suite', detail: 'Yes' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/d4e5f60718293a4b5c6d7e8f90a1b2c3.png', title: 'In-house Catering', detail: 'Yes' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/f60718293a4b5c6d7e8f90a1b2c3d4e5.png', title: 'Outside Decor', detail: 'Allowed' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/18293a4b5c6d7e8f90a1b2c3d4e5f607.png', title: 'DJ Available', detail: 'Yes' },
        { icon: 'https://www.shaadibaraati.com/vendors-service/293a4b5c6d7e8f90a1b2c3d4e5f60718.png', title: 'Power Backup', detail: '100%' },
    ];

    const faqs = [
        { question: 'Do you have other facilities other than Wedding Venue?', answer: 'Yes – Swimming Pool, Spa, Gym, Kids Play Area & Restaurant' },
        { question: 'Do you have any time limit for events?', answer: 'No time restrictions for booked events' },
        { question: 'What is your exact seating capacity?', answer: 'Floating: 1500 | Sitting: 800 (Lawn + Banquet)' },
        { question: 'Can the client provide their own alcohol?', answer: 'Yes, permitted with corkage charges' },
        { question: 'Do you have full power backup?', answer: '100% Power Backup with silent generators' },
        { question: 'What is the setting of the venue?', answer: 'Banquet Hall + Lawn + Poolside' },
        { question: 'Is outside decoration allowed?', answer: 'Yes, outside decorators are allowed' },
        { question: 'Is there a bridal changing room?', answer: 'Yes, luxurious AC bridal suite available' },
    ];

    const galleryImages = [
        "https://www.shaadibaraati.com/vendor-portfolio/5b995f542efe3779f44486b5bc956d34.jpg",
        "https://www.shaadibaraati.com/vendor-portfolio/0d0d32a06c5b6db57772bd0407fd6f2d.jpg",
        "https://www.shaadibaraati.com/vendor-portfolio/ffe321456ad0094321e1116548370bf8.jpg",
        "https://www.shaadibaraati.com/vendor-portfolio/a96d4adfc80d71c0abd05a8dd71f4409.jpg",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
        "https://images.unsplash.com/photo-1606216798426-3c6b5c0c0c4c?w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ];

    const reviewsData = [
        { author: "Hansraj Sachdev", rating: 5, comment: "Excellent Venue , Superb location ,Perfect Destination Wedding Venue, Venue have a Beautiful Swimming Pool, Awesome Terrace & Garden location for Mandap..." },
        { author: "Priya & Rohan", rating: 5, comment: "Best decision for our wedding! The lawn was magical at night with fairy lights. Staff went above and beyond." },
        { author: "Neha Sharma", rating: 5, comment: "Amazing experience! Food was delicious, decor was stunning and coordination was flawless." },
        { author: "Vikram Singh", rating: 4, comment: "Great venue overall. Only suggestion – parking management could be improved during peak events." },
    ];

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
            {/* ====== Header (same as yours) ====== */}
            <div className="card bg-white shadow-md rounded-lg mb-3 overflow-hidden">
                <div className="p-6">
                    <div className="flex flex-wrap -mx-4 items-start">
                        <div className="w-full md:w-1/2 px-4">
                            <h1 className="text-2xl gradient-text font-bold">Fun And Food Resorts</h1>
                            <h2 className="text-sm body-font text-gray-600">
                                <span className="location">Wedding Venues, Indore</span>
                            </h2>
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <div className="flex justify-end items-center space-x-4 mt-4 md:mt-0">
                                <div className="text-center">
                                    <button className="p-2 w-10 h-10 rounded-full text-black bg-gray-200 hover:bg-red-600 hover:text-white">
                                        <i className="far fa-check-circle"></i>
                                    </button>
                                    <span className="block text-sm">Hire</span>
                                </div>
                                <div className="text-center">
                                    <button className="p-2 w-10 h-10 rounded-full text-black bg-gray-200 hover:bg-red-600 hover:text-white">
                                        <i className="fas fa-heart"></i>
                                    </button>
                                    <span className="block text-sm">Shortlist</span>
                                </div>
                                <div className="text-center">
                                    <button className="p-2 w-10 h-10 rounded-full text-black bg-gray-200 hover:bg-red-600 hover:text-white">
                                        <i className="fas fa-share-alt"></i>
                                    </button>
                                    <span className="block text-sm">Share</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-4 mt-6 items-center">
                        <div className="w-full md:w-8/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-1/3 px-2 border-r border-gray-300">
                                    <h6 className="text-md text-red-600">Starting Price</h6>
                                    <p className="m0 text-sm text-gray-900">₹ 2,00,000 Onward</p>
                                </div>
                                <div className="w-1/3 px-3 border-r border-gray-400">
                                    <h6 className="text-md text-red-600">Primary Market</h6>
                                    <p className="m0 text-sm text-gray-900">Indore</p>
                                </div>
                                <div className="w-1/3 px-3">
                                    <h6 className="text-md text-red-600">Reviews</h6>
                                    <p className="m0 text-sm text-gray-900">5 out of 5</p>
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

            <HeroSection />

            {/* ====== About ====== */}
            <div className="card bg-white shadow-md rounded-lg mb-3 overflow-hidden mt-6">
                <div className="p-6">
                    <h3 className="text-xl gradient-text font-bold mb-2">About Fun And Food Resorts</h3>
                    <h4 className="text-md mb-2">Fun N Food Resort in Khandwa Road, Indore</h4>
                    <div className="space-y-4 text-gray-700">
                        <p>Fun N Food Resort is one of the most beautiful destination wedding venues in Indore with lush green lawns, elegant banquet halls, swimming pool, and luxurious rooms. Perfect for grand weddings and intimate celebrations.</p>
                    </div>
                </div>
            </div>

            {/* ====== Services Only ====== */}
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Services & Amenities</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
                        {services.map((service, index) => (
                            <div key={index} className="service-box">
                                <img src={service.icon} alt={service.title} className="mx-auto h-10 mb-2" />
                                <p className="font-semibold">{service.title}</p>
                                <p className="text-gray-600">{service.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ====== FAQ - Alag Card ====== */}
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

            {/* ====== Gallery ====== */}
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Photo Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryImages.map((src, index) => (
                            <div key={index} className="overflow-hidden rounded-lg shadow-md">
                                <img src={src} alt="" className="w-full h-56 object-cover hover:scale-110 transition duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ====== Reviews Carousel ====== */}
            <div className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-6">Customer Reviews ({reviewsData.length})</h3>
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
                            {reviewsData.map((review, i) => (
                                <div key={i} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-gray-50 p-6 rounded-lg border">
                                        <div className="flex items-start gap-4">
                                            <img src="https://www.shaadibaraati.com/assets/img/vendor.png" alt="" className="w-12 h-12 rounded-full" />
                                            <div>
                                                <p className="font-bold">{review.author}</p>
                                                <div className="flex text-yellow-500 my-1">
                                                    {[...Array(review.rating)].map((_, s) => <span key={s}>★</span>)}
                                                </div>
                                                <p className="text-gray-700 text-sm mt-2">"{review.comment}"</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {reviewsData.length > 1 && (
                            <>
                                <button onClick={() => setCurrentReview((currentReview - 1 + reviewsData.length) % reviewsData.length)}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-red-600 hover:text-white">
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button onClick={() => setCurrentReview((currentReview + 1) % reviewsData.length)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 hover:bg-red-600 hover:text-white">
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </>
                        )}
                        <div className="flex justify-center mt-4 gap-2">
                            {reviewsData.map((_, i) => (
                                <button key={i} onClick={() => setCurrentReview(i)}
                                    className={`w-3 h-3 rounded-full ${i === currentReview ? 'bg-red-600 w-10' : 'bg-gray-400'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ====== Write a Review Card - Naya Alag Card ====== */}
            <div id="write-review" className="card bg-white shadow-lg rounded-lg overflow-hidden mt-6">
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4">Write Your Review</h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-red-500"
                        />
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setUserRating(star)}
                                    className={`text-3xl ${star <= userRating ? 'text-yellow-500' : 'text-gray-300'}`}
                                >
                                    ★
                                </button>
                            ))}
                            <span className="ml-4 text-gray-600">{userRating} out of 5</span>
                        </div>
                        <textarea
                            placeholder="Share your experience..."
                            value={userComment}
                            onChange={(e) => setUserComment(e.target.value)}
                            required
                            rows="5"
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-red-500"
                        />
                        <button type="submit" className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 font-semibold">
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MainContent;