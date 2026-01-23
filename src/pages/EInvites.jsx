import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Sliders, Star, Heart, Share2, Filter } from 'lucide-react';

const EInvites = () => {
    const categories = [
        { name: 'Wedding Invitations', count: 150 },
        { name: 'Save The Date', count: 80 },
        { name: 'Mehendi Ceremony', count: 50 },
        { name: 'Cocktail Party', count: 40 },
        { name: 'Reception', count: 60 },
        { name: 'Birthday', count: 90 },
    ];

    const templates = [
        { id: 1, name: 'Enchanted Garden', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-card-design-template-82ff528731307902506e3001804f329b_screen.jpg?ts=1626871020', price: '₹ 2,999', rating: 4.8, reviews: 145, liked: true },
        { id: 2, name: 'Royal Motif', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-design-template-6a3f0631f900a6e0e5b74a1612711579_screen.jpg?ts=1637145799', price: '₹ 4,499', rating: 4.9, reviews: 210, liked: false },
        { id: 3, name: 'Minimalist Charm', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-template-design-a8d62268b88cf647318f757e24bc306c_screen.jpg?ts=1636442654', price: '₹ 1,999', rating: 4.7, reviews: 98, liked: false },
        { id: 4, name: 'Bohemian Dream', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-card-design-template-8c58999338676606366df0473a5a7428_screen.jpg?ts=1626871022', price: '₹ 3,299', rating: 4.8, reviews: 112, liked: true },
        { id: 5, name: 'Classic Floral', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-card-design-template-b3a1a742861e6704b23265507567fcb3_screen.jpg?ts=1626871024', price: '₹ 2,499', rating: 4.6, reviews: 180, liked: false },
        { id: 6, name: 'Modern Geometric', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-design-template-d9a58e23f0f7f73967d71d18721c607a_screen.jpg?ts=1637145801', price: '₹ 3,999', rating: 4.9, reviews: 160, liked: false },
        { id: 7, name: 'Watercolor Wishes', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-card-design-template-94a208c187399583f491c13dfc785721_screen.jpg?ts=1626871020', price: '₹ 3,199', rating: 4.7, reviews: 130, liked: true },
        { id: 8, name: 'Regal Damask', thumbnail: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/wedding-invitation-design-template-98835824888252a92666a4f91d84f469_screen.jpg?ts=1637145800', price: '₹ 4,999', rating: 5.0, reviews: 250, liked: true },
    ];

    const [activeCategory, setActiveCategory] = useState('Wedding Invitations');

    return (
        <div className="bg-rose-50">
            {/* Hero Section */}
            <div className="relative bg-white text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">Find The Perfect Invitation</h1>
                    <p className="mt-4 text-md sm:text-lg text-gray-600">Digital Cards, Custom E-invites, Save The Date, & More</p>
                    
                    <div className="mt-8 max-w-3xl mx-auto">
                        <div className="flex items-center bg-white rounded-full shadow-lg p-2">
                            <Search className="text-gray-400 mx-3" />
                            <input 
                                type="text"
                                placeholder="Search for designs, e.g. 'floral', 'modern'..."
                                className="flex-grow bg-transparent focus:outline-none"
                            />
                            <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories & Filters */}
            <div className="sticky top-[80px] bg-white/80 backdrop-blur-sm z-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                            {categories.map(cat => (
                                <button 
                                    key={cat.name}
                                    onClick={() => setActiveCategory(cat.name)}
                                    className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${activeCategory === cat.name ? 'bg-red-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {cat.name} <span className="text-xs opacity-75 ml-1">({cat.count})</span>
                                </button>
                            ))}
                        </div>
                        <button className="hidden sm:flex items-center px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300">
                            <Filter size={16} className="mr-2"/> Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Templates Section */}
            <div className="py-12 sm:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-left mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{activeCategory}</h2>
                        <p className="mt-2 text-md text-gray-600">Showing {templates.length} designs</p>
                    </div>
                    <motion.div 
                        layout 
                        className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" // Adjusted grid for larger cards on extra-large screens
                    >
                        {templates.map((template) => (
                            <motion.div
                                layout
                                key={template.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden" // Reduced shadow
                            >
                                <div className="relative">
                                    <img src={template.thumbnail} alt={template.name} className="w-full h-80 object-cover" /> {/* Increased image height */}
                                    <div className="absolute top-2 right-2 flex space-x-1">
                                         <button className="p-2 bg-white/70 rounded-full backdrop-blur-sm hover:bg-white">
                                            <Share2 size={16} className="text-gray-700"/>
                                        </button>
                                        <button className={`p-2 bg-white/70 rounded-full backdrop-blur-sm hover:bg-white ${template.liked ? 'text-red-500' : 'text-gray-700'}`}>
                                            <Heart size={16} />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                                         <h3 className="text-lg font-bold text-white truncate">{template.name}</h3>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-lg font-bold text-red-600">{template.price}</p>
                                        <div className="flex items-center space-x-1 text-sm">
                                            <Star size={16} className="text-yellow-500" />
                                            <span className="font-bold">{template.rating}</span>
                                            <span className="text-gray-500">({template.reviews})</span>
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full px-4 py-2 border-2 border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200">
                                        View Details
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                     <div className="mt-12 text-center">
                        <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-full shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300">
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EInvites;
