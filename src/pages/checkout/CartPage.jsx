import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, IndianRupee, Minus, Plus, ArrowLeft, ShieldCheck, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserString = localStorage.getItem('loggedInUser');
        if (storedUserString) {
            const loggedInUser = JSON.parse(storedUserString);
            const email = loggedInUser?.user?.email || loggedInUser?.email;
            if (email) {
                const cartKey = `cart_${email}`;
                const storedCartData = localStorage.getItem(cartKey);
                const storedCart = storedCartData ? JSON.parse(storedCartData) : [];
                
                if (Array.isArray(storedCart)) {
                    setCartItems(storedCart);
                    setProducts(storedCart);
                }
            }
        }
    }, []);

    const getCartKey = () => {
        const storedUserString = localStorage.getItem('loggedInUser');
        if (storedUserString) {
            const user = JSON.parse(storedUserString);
            const email = user?.user?.email || user?.email;
            if (email) return `cart_${email}`;
        }
        return null;
    };

    const handleRemoveFromCart = (productId) => {
        const cartKey = getCartKey();
        if (!cartKey) return;

        const updatedCart = cartItems.filter(item => item.id !== productId);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setProducts(updatedCart);
        window.dispatchEvent(new Event('cartUpdated'));
        toast.success('Removed from cart');
    };

    const handleQuantityChange = (productId, newQuantity) => {
        const cartKey = getCartKey();
        if (!cartKey) return;

        if (newQuantity < 1) {
            handleRemoveFromCart(productId);
            return;
        }

        const updatedCart = cartItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
        );
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setProducts(updatedCart);
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const subtotal = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; 
    const total = subtotal + tax;

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100 pb-20">
            <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 text-left">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-100 pb-8">
                    <div>
                        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-600 transition-all mb-4">
                            <ArrowLeft size={16} /> Continue Shopping
                        </button>
                        <h1 className="text-4xl font-black italic tracking-tight uppercase">Your Shopping Cart</h1>
                    </div>
                    {products.length > 0 && (
                        <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Total Items</span>
                            <span className="text-xl font-black italic">{products.length} Items</span>
                        </div>
                    )}
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-100">
                        <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                        <h2 className="text-2xl font-black italic mb-4 uppercase">Your cart is empty</h2>
                        <Link to="/items-listing/products" className="inline-block px-8 py-3 bg-red-600 text-white font-black text-xs uppercase tracking-widest rounded-lg hover:bg-red-700 transition-all">
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                        
                        {/* --- LEFT: ITEMS --- */}
                        <div className="lg:col-span-8 space-y-4">
                            {products.map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all">
                                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 w-full flex flex-col justify-between">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-lg font-black italic text-slate-900 leading-tight mb-1">{item.name}</h3>
                                                <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">By {item.vendor}</p>
                                            </div>
                                            <button onClick={() => handleRemoveFromCart(item.id)} className="p-2 text-slate-300 hover:text-red-600 transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200">
                                                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)} className="p-1.5 hover:bg-white rounded-md transition-colors" disabled={item.quantity === 1}><Minus size={14} /></button>
                                                <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)} className="p-1.5 hover:bg-white rounded-md transition-colors"><Plus size={14} /></button>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xl font-black italic text-slate-900 flex items-center tracking-tighter">
                                                    <IndianRupee size={16} strokeWidth={3} />{(item.price * item.quantity).toLocaleString('en-IN')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            <div className="flex flex-wrap gap-4 pt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full"><Truck size={14} /> Free Shipping</span>
                                <span className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full"><ShieldCheck size={14} /> Secure Payment</span>
                            </div>
                        </div>

                        {/* --- RIGHT: SUMMARY --- */}
                        <div className="lg:col-span-4 lg:sticky lg:top-8">
                            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200">
                                <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 border-b border-slate-800 pb-4">Order Summary</h2>
                                
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest">
                                        <span>GST (10%)</span>
                                        <span className="text-white">₹{tax.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-400 text-[10px] font-black uppercase tracking-widest border-t border-slate-800 pt-4">
                                        <span className="text-slate-500">Total Payable</span>
                                        <span className="text-3xl font-black italic tracking-tighter flex items-center text-white">
                                            <IndianRupee size={22} strokeWidth={3} />{total.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                </div>

                                <Link to="/checkout" className="block">
                                    <button className="w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest text-xs shadow-lg shadow-red-900/20">
                                        Proceed to Checkout
                                    </button>
                                </Link>

                                <div className="mt-8 pt-6 border-t border-slate-800 flex justify-center gap-4 opacity-30 grayscale">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4" alt="visa" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-6" alt="mastercard" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" className="h-6" alt="upi" />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;