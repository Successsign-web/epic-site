import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, MapPin, CreditCard, CalendarDays, 
  Receipt, Trash2, Truck, ChevronRight, ShoppingBag 
} from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = () => {
    try {
      const userJSON = localStorage.getItem('loggedInUser');
      if (userJSON) {
        const parsedUser = JSON.parse(userJSON);
        if (parsedUser?.user?.email) {
          const ordersKey = `orders_${parsedUser.user.email}`;
          const storedOrders = localStorage.getItem(ordersKey);
          setOrders(storedOrders ? JSON.parse(storedOrders) : []);
        } else {
          setError("User email not found.");
        }
      } else {
        setError("User not logged in.");
      }
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    window.addEventListener('ordersUpdated', fetchOrders);
    return () => window.removeEventListener('ordersUpdated', fetchOrders);
  }, []);

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Delete this order from history?")) {
      const userJSON = localStorage.getItem('loggedInUser');
      const parsedUser = JSON.parse(userJSON);
      const ordersKey = `orders_${parsedUser.user.email}`;
      const updatedOrders = orders.filter(order => order.orderId !== orderId);
      localStorage.setItem(ordersKey, JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
      <p className="text-gray-500 font-medium">Fetching your orders...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-500 mt-1">Manage and track your recent purchases.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {orders.length === 0 ? (
          <div className="max-w-md mx-auto mt-20 text-center bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't made your first purchase. Let's change that!</p>
            <Link to="/" className="inline-flex items-center justify-center px-8 py-3 font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto space-y-6">
            {orders.map((order) => (
              <div key={order.orderId} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-hover hover:shadow-md duration-300">
                {/* Order Top Bar */}
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Order Placed</p>
                      <p className="text-sm font-semibold text-gray-700">{new Date(order.orderDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Total Amount</p>
                      <p className="text-sm font-bold text-indigo-600">₹{order.totalAmount?.toLocaleString()}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Order ID</p>
                      <p className="text-sm font-medium text-gray-600">#{order.orderId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      Processing
                    </span>
                    <button 
                      onClick={() => handleDeleteOrder(order.orderId)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Items List */}
                  <div className="lg:col-span-2 space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-3 rounded-xl border border-transparent hover:border-gray-100 hover:bg-gray-50/50 transition-all">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded-lg bg-gray-100 border border-gray-100" 
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                          <div className="flex justify-between items-end mt-1">
                            <p className="text-indigo-600 font-bold">₹{item.price?.toLocaleString()}</p>
                            <button className="text-xs font-semibold text-indigo-500 hover:underline flex items-center">
                              Buy it again <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info Card */}
                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-4">
                    <div>
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <MapPin size={14} className="text-indigo-500" /> Shipping To
                      </h5>
                      <p className="text-sm font-bold text-gray-800">{order.address?.fullName}</p>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                        {order.address?.addressLine1}, {order.address?.city}<br />
                        {order.address?.state} - {order.address?.zipCode}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <CreditCard size={14} className="text-indigo-500" /> Payment
                      </h5>
                      <p className="text-sm font-medium text-gray-700">{order.paymentMethod}</p>
                    </div>

                    <button 
                      onClick={() => alert("Tracking feature coming soon!")}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-white border border-gray-200 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm"
                    >
                      <Truck size={16} />
                      Track Shipment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;