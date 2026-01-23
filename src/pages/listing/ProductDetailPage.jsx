import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart, IndianRupee, Minus, Plus, Truck, ShieldCheck, RefreshCw, User, ThumbsUp, X, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const dummyProducts = {
    '1': {
        id: '1',
        name: 'Custom Wedding Invitations - Gold Foil Edition',
        vendor: 'Elegant Designs Co.',
        price: 5000,
        originalPrice: 8500,
        rating: 4.5,
        reviews: 128,
        description: 'Beautifully crafted custom wedding invitations to make your announcement as special as your big day. Choose from a variety of premium papers, inks, and designs.',
        images: [
            'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?auto=format&fit=crop&q=80&w=1740',
            'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=1740',
            'https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&q=80&w=1740',
            'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=1740',
        ],
    },
};

const similarProducts = [
    { id: 2, name: 'Bridal Jewelry Set', price: 75000, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1740', vendor: 'Shine Jewels', rating: 4.0, reviews: 85 },
    { id: 3, name: 'Wedding Cake (5-tier)', price: 15000, image: 'https://images.unsplash.com/photo-1535254973040-607b474cb80d?auto=format&fit=crop&q=80&w=1740', vendor: 'Sweet Delights Bakery', rating: 4.5, reviews: 210 },
    { id: 4, name: 'Groom’s Sherwani', price: 40000, image: 'https://images.unsplash.com/photo-1594932224828-99e02631248a?auto=format&fit=crop&q=80&w=1740', vendor: 'Royal Attire', rating: 3.5, reviews: 60 },
    { id: 5, name: 'Designer Blouse', price: 12000, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1740', vendor: 'Fashion House', rating: 4.8, reviews: 150 },
];

const ProductDetailPage = () => {
    const { id } = useParams();
    const product = dummyProducts[id] || dummyProducts['1'];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const navigate = useNavigate();

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    const handleQuantityChange = (type) => {
        if (type === 'increment') setQuantity(prev => prev + 1);
        else if (type === 'decrement' && quantity > 1) setQuantity(prev => prev - 1);
    };

    const getLoggedInUser = () => {
        const authKeys = ['loggedInUser', 'user', 'auth_data'];
        for (let key of authKeys) {
            const storedData = localStorage.getItem(key);
            if (storedData && storedData !== "undefined" && storedData !== "null") {
                try {
                    const parsed = JSON.parse(storedData);
                    return parsed?.data?.user || parsed?.user || (parsed?.email ? parsed : null);
                } catch (e) { continue; }
            }
        }
        return null;
    };

    const addToCartInternal = (item, user, qty) => {
        // AUTH CHECK: If no user, redirect to register
        if (!user) {
            toast.error("Please login to continue");
            navigate('/user/signup');
            return false;
        }

        const userEmail = user?.email || 'guest';
        const cartKey = `cart_${userEmail}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += qty;
        } else {
            cart.push({ id: item.id, name: item.name, price: item.price, vendor: item.vendor, image: item.images ? item.images[0] : (item.image || ''), quantity: qty });
        }
        localStorage.setItem(cartKey, JSON.stringify(cart));
        window.dispatchEvent(new Event('cartUpdated'));
        return true;
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        if (userRating === 0) return toast.error("Please select a star rating");
        toast.success("Review submitted successfully!");
        setIsReviewModalOpen(false);
        setUserRating(0);
        setReviewText("");
    };

    return (
        <div className="bg-white min-h-screen text-slate-900 selection:bg-red-100 pb-16 text-left">
            <div className="max-w-7xl mx-auto px-4 py-8">
                
                {/* --- MAIN PRODUCT INFO --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
                    <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-3">
                        <div className="flex md:flex-col gap-2 overflow-x-auto shrink-0">
                            {product.images.map((img, idx) => (
                                <button key={idx} onMouseEnter={() => setCurrentImageIndex(idx)} className={`w-14 h-14 rounded-md border-2 transition-all ${currentImageIndex === idx ? 'border-red-600' : 'border-slate-100'}`}>
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                        <div className="flex-1 aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative max-h-[400px]">
                            <img src={product.images[currentImageIndex]} alt="" className="w-full h-full object-cover" />
                            <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-sm text-slate-300"><Heart size={18} /></button>
                        </div>
                    </div>

                    <div className="lg:col-span-7 flex flex-col pt-0">
                        <h1 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2 italic tracking-tight uppercase">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-bold">
                                {product.rating} <Star size={10} fill="currentColor" />
                            </div>
                            <span className="text-xs text-slate-400 font-bold tracking-tight">{product.reviews} Reviews | By {product.vendor}</span>
                        </div>

                        <div className="flex items-baseline gap-3 mb-6 font-black italic tracking-tighter">
                            <span className="text-3xl"><IndianRupee size={22} className="inline mb-1" />{product.price.toLocaleString('en-IN')}</span>
                            <span className="text-slate-400 line-through text-sm font-bold">₹{product.originalPrice}</span>
                            <span className="text-red-600 text-xs uppercase tracking-widest ml-1">40% OFF</span>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed mb-6 border-l-4 border-red-500 pl-4">{product.description}</p>

                        <div className="flex items-center gap-6 mb-8">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qty</span>
                            <div className="flex items-center bg-white rounded-md border border-slate-200 shadow-sm">
                                <button onClick={() => handleQuantityChange('decrement')} className="p-2 hover:bg-slate-50 disabled:opacity-20" disabled={quantity === 1}><Minus size={14} /></button>
                                <span className="w-8 text-center font-bold text-slate-800 text-sm">{quantity}</span>
                                <button onClick={() => handleQuantityChange('increment')} className="p-2 hover:bg-slate-50"><Plus size={14} /></button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mb-10">
                            <button onClick={() => { 
                                if(addToCartInternal(product, getLoggedInUser(), quantity)) toast.success('Added to cart!'); 
                            }} className="flex-1 border-2 border-slate-900 text-slate-900 font-black py-3 rounded-lg hover:bg-slate-900 hover:text-white transition-all text-sm uppercase flex items-center justify-center gap-2">
                                <ShoppingCart size={18} /> Add to Cart
                            </button>
                            <button onClick={() => { 
                                if(addToCartInternal(product, getLoggedInUser(), quantity)) navigate('/user/cart'); 
                            }} className="flex-1 bg-red-600 text-white font-black py-3 rounded-lg shadow-md hover:bg-red-700 transition-all text-sm uppercase">
                                Buy Now
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-2 border-t pt-6">
                            <div className="flex flex-col items-center text-center gap-1"><Truck size={18} className="text-slate-400" /><span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Fast Delivery</span></div>
                            <div className="flex flex-col items-center text-center gap-1"><RefreshCw size={18} className="text-slate-400" /><span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Easy Returns</span></div>
                            <div className="flex flex-col items-center text-center gap-1"><ShieldCheck size={18} className="text-slate-400" /><span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Secure Payment</span></div>
                        </div>
                    </div>
                </div>

                {/* --- RATINGS & REVIEWS SECTION (New Vertical Layout) --- */}
                <div className="mt-16 border-t border-slate-100 pt-16">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter italic">Ratings & Reviews</h2>
                    
                    <div className="flex flex-col gap-10">
                        {/* TOP: Rating Summary Box */}
                        <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="text-5xl font-black text-slate-900">{product.rating}</div>
                                    <div>
                                        <div className="flex text-yellow-500 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />
                                            ))}
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {product.reviews} Verified Buyers
                                        </span>
                                    </div>
                                </div>

                                <div className="md:w-64">
                                    <button 
                                        onClick={() => {
                                            if(!getLoggedInUser()) {
                                                toast.error("Login to write a review");
                                                navigate('/register');
                                            } else {
                                                setIsReviewModalOpen(true);
                                            }
                                        }} 
                                        className="w-full py-3 bg-white border-2 border-slate-900 text-slate-900 font-black text-xs rounded-xl hover:bg-slate-900 hover:text-white transition-all uppercase tracking-widest"
                                    >
                                        Write a review
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* BOTTOM: Reviews List (Full Width) */}
                        <div className="space-y-8 w-full">
                            {[1, 2].map((i) => (
                                <div key={i} className="pb-8 border-b border-slate-50 last:border-0">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-sm uppercase">C</div>
                                            <div>
                                                <h4 className="text-sm font-black text-slate-900">Verified Customer</h4>
                                                <div className="flex text-yellow-500">
                                                    {[...Array(5)].map((_, starIdx) => <Star key={starIdx} size={10} fill="currentColor" />)}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recently</span>
                                    </div>
                                    <p className="text-sm text-slate-600 leading-relaxed italic">
                                        "The invitations were beautiful and premium quality. The gold foil work is amazing!"
                                    </p>
                                    <button className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-tighter">
                                        <ThumbsUp size={12} /> Helpful
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- SIMILAR PRODUCTS --- */}
                <div className="mt-20">
                    <h2 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter uppercase italic underline decoration-red-600 underline-offset-8 decoration-4">Similar Picks</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {similarProducts.map(item => (
                            <div key={item.id} className="group block rounded-xl overflow-hidden bg-white h-full transition-all duration-300 hover:shadow-sm border border-gray-100 cursor-pointer">
                                <div className="relative overflow-hidden h-44" onClick={() => navigate(`/product/${item.id}`)}>
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <button 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            if(addToCartInternal(item, getLoggedInUser(), 1)) toast.success('Added!'); 
                                        }} 
                                        className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                    >
                                        <ShoppingCart size={16} />
                                    </button>
                                </div>
                                <div className="p-4 text-left" onClick={() => navigate(`/product/${item.id}`)}>
                                    <h3 className="text-base font-bold text-gray-800 mb-0.5 truncate uppercase tracking-tighter">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">by {item.vendor}</p>
                                    <div className="flex items-center gap-0.5 mb-3 text-yellow-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < 4 ? "currentColor" : "none"} className={i < 4 ? "" : "text-gray-300"} />)}
                                    </div>
                                    <div className="flex justify-between items-center pt-2 -mb-1 ">
                                        <span className="text-base font-bold text-red-600 flex items-baseline tracking-tighter">
                                            <IndianRupee size={12} className="mr-0.5" />{item.price.toLocaleString('en-IN')}
                                        </span>
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                if(addToCartInternal(item, getLoggedInUser(), 1)) navigate('/user/cart'); 
                                            }} 
                                            className="px-3 py-1 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm active:scale-95 transition-all"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- MODAL --- */}
                {isReviewModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl">
                            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                                <h3 className="text-xl font-black italic uppercase tracking-tighter">Write a Review</h3>
                                <button onClick={() => setIsReviewModalOpen(false)}><X size={24} /></button>
                            </div>
                            <form onSubmit={handleReviewSubmit} className="p-8">
                                <div className="mb-6 text-center">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Rate this product</p>
                                    <div className="flex justify-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button key={star} type="button" onClick={() => setUserRating(star)} className={`transition-all ${userRating >= star ? 'text-yellow-400 scale-110' : 'text-slate-200'}`}>
                                                <Star size={36} fill={userRating >= star ? "currentColor" : "none"} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 italic">Your Feedback</label>
                                    <textarea rows="4" required value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="How was the quality?" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-red-500 text-sm"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-red-600 text-white font-black py-4 rounded-xl shadow-lg hover:bg-red-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
                                    <Send size={18} /> Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;