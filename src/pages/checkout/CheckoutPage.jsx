import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, QrCode, Truck, ArrowLeft, ShieldCheck, 
  CheckCircle2, MapPin, Wallet, IndianRupee, Lock 
} from 'lucide-react';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({ fullName: '', addressLine1: '', city: '', zipCode: '' });
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const totalPrice = subtotal + tax;

  useEffect(() => {
    const storedUserString = localStorage.getItem('loggedInUser');
    if (storedUserString) {
        const loggedInUser = JSON.parse(storedUserString);
        const email = loggedInUser?.user?.email || loggedInUser?.email;
        if (email) {
            const cartKey = `cart_${email}`;
            const storedCartData = localStorage.getItem(cartKey);
            const storedCart = storedCartData ? JSON.parse(storedCartData) : [];
            if (Array.isArray(storedCart) && storedCart.length > 0) {
                setCartItems(storedCart);
            } else {
                navigate('/user/cart');
            }
        }
    }
  }, [navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // --- LOGIC TO SAVE ORDER TO MY ORDERS ---
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const loadToast = toast.loading("Verifying transaction...");

    setTimeout(() => {
      const storedUserString = localStorage.getItem('loggedInUser');
      if (storedUserString) {
        const loggedInUser = JSON.parse(storedUserString);
        const email = loggedInUser?.user?.email || loggedInUser?.email;
        
        if (email) {
          const cartKey = `cart_${email}`;
          const ordersKey = `orders_${email}`;
          
          // 1. Create New Order Object
          const newOrder = {
            orderId: `ORD-${Date.now()}`,
            orderDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
            items: cartItems,
            address: address,
            paymentMethod: paymentMethod,
            totalAmount: totalPrice,
            status: 'Confirmed'
          };

          // 2. Save to My Orders
          const existingOrders = JSON.parse(localStorage.getItem(ordersKey)) || [];
          localStorage.setItem(ordersKey, JSON.stringify([newOrder, ...existingOrders]));

          // 3. Clear Cart
          localStorage.removeItem(cartKey);
          
          // 4. Update Global State/Events
          window.dispatchEvent(new Event('cartUpdated'));
          window.dispatchEvent(new Event('ordersUpdated'));
          
          toast.dismiss(loadToast);
          setOrderPlaced(true);
          toast.success("Order Placed Successfully!");
        }
      }
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6 text-left">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-3xl font-black italic uppercase tracking-tight mb-3">Order Confirmed!</h1>
          <p className="text-gray-500 mb-8 text-sm font-medium">Your premium wedding selection has been placed. You can track it in 'My Orders'.</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => navigate('/user/profile')} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition-all">Go to My Orders</button>
            <button onClick={() => navigate('/')} className="text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-red-600">Back to Shopping</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10 border-b border-slate-100 pb-8 text-left">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest">
            <ArrowLeft size={16} /> Edit Cart
          </button>
          <div className="flex items-center gap-2 text-green-600 text-[10px] font-black uppercase tracking-widest">
            <Lock size={14} /> 256-bit SSL Secure
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Side: Forms */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Address */}
            <div>
              <h2 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3 mb-8">
                <MapPin size={22} className="text-red-600" /> Shipping Info
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" name="fullName" placeholder="" onChange={handleAddressChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 outline-none focus:border-red-600 focus:bg-white transition-all text-sm font-bold" required />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Street Address</label>
                  <input type="text" name="addressLine1" placeholder="" onChange={handleAddressChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 outline-none focus:border-red-600 focus:bg-white transition-all text-sm font-bold" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                  <input type="text" name="city" placeholder="" onChange={handleAddressChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 outline-none focus:border-red-600 focus:bg-white transition-all text-sm font-bold" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Zip Code</label>
                  <input type="text" name="zipCode" placeholder="" onChange={handleAddressChange} className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 outline-none focus:border-red-600 focus:bg-white transition-all text-sm font-bold" required />
                </div>
              </div>
            </div>

            {/* Payment Gateway */}
            <div>
              <h2 className="text-xl font-black uppercase italic tracking-tighter flex items-center gap-3 mb-8">
                <Wallet size={22} className="text-red-600" /> Payment Gateway
              </h2>
              <div className="border border-slate-100 rounded-[24px] overflow-hidden shadow-sm bg-white">
                <div className="flex border-b border-slate-100">
                  <button type="button" onClick={() => setPaymentMethod('Credit Card')} className={`flex-1 p-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${paymentMethod === 'Credit Card' ? 'bg-white border-b-2 border-red-600 text-red-600' : 'bg-slate-50 text-slate-400'}`}>Card</button>
                  <button type="button" onClick={() => setPaymentMethod('UPI')} className={`flex-1 p-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${paymentMethod === 'UPI' ? 'bg-white border-b-2 border-red-600 text-red-600' : 'bg-slate-50 text-slate-400'}`}>UPI</button>
                  <button type="button" onClick={() => setPaymentMethod('COD')} className={`flex-1 p-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all ${paymentMethod === 'COD' ? 'bg-white border-b-2 border-red-600 text-red-600' : 'bg-slate-50 text-slate-400'}`}>COD</button>
                </div>

                <div className="p-8">
                  {paymentMethod === 'Credit Card' && (
                    <div className="space-y-5 animate-in fade-in duration-500">
                      <div className="relative">
                        <input type="text" placeholder="CARD NUMBER" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm font-mono tracking-[0.2em] outline-none focus:border-slate-900" required />
                        <CreditCard size={18} className="absolute right-4 top-4 text-slate-300" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="MM / YY" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm outline-none font-bold" required />
                        <input type="password" placeholder="CVV" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm outline-none font-bold" required />
                      </div>
                    </div>
                  )}
                  {paymentMethod === 'UPI' && (
                    <div className="text-center py-6">
                      <QrCode size={60} className="mx-auto text-slate-200 mb-4" />
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scan QR Code on the next screen</p>
                    </div>
                  )}
                  {paymentMethod === 'COD' && (
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <Truck size={24} className="text-red-600" />
                      <p className="text-xs font-bold text-slate-600 uppercase tracking-tight">Pay with cash upon delivery</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5">
            <div className="border border-slate-100 rounded-[32px] p-8 shadow-sm sticky top-10 bg-white">
              <h3 className="text-xl font-black uppercase italic tracking-tighter mb-8 border-b border-slate-50 pb-6">Summary</h3>
              
              <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="leading-tight">
                        <p className="text-xs font-black uppercase italic truncate w-32">{item.name}</p>
                        <p className="text-slate-400 text-[10px] font-bold mt-1 uppercase">QTY: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-black italic text-sm tracking-tighter">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs font-bold uppercase tracking-widest border-t border-slate-50 pt-6 mb-8">
                <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between text-slate-400"><span>Shipping</span><span className="text-green-600">Free</span></div>
                <div className="flex justify-between text-lg font-black italic tracking-tighter border-t border-slate-100 pt-5 mt-3 text-slate-900">
                  <span>Total Payable</span>
                  <span className="flex items-center"><IndianRupee size={20} strokeWidth={3} />{totalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button type="submit" className="w-full bg-red-600 text-white font-black py-5 rounded-2xl hover:bg-red-700 transition-all uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-red-100 active:scale-95">
                Complete Payment
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">End-to-End Encrypted Payment</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;