import React from 'react';
import { 
  Eye, MessageSquare, Briefcase, Star, TrendingUp, Calendar, Bell
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Data same rahega
const monthlyData = [
  { month: 'Jan', views: 12000, inquiries: 420, bookings: 85 },
  { month: 'Feb', views: 19000, inquiries: 580, bookings: 120 },
  { month: 'Mar', views: 15000, inquiries: 490, bookings: 98 },
  { month: 'Apr', views: 28000, inquiries: 720, bookings: 165 },
  { month: 'May', views: 32000, inquiries: 890, bookings: 210 },
  { month: 'Jun', views: 42000, inquiries: 1200, bookings: 320 },
];

const serviceData = [
  { name: 'Candid Photography', value: 45, color: '#c084fc' },
  { name: 'Full Wedding', value: 30, color: '#818cf8' },
  { name: 'Pre-Wedding', value: 15, color: '#34d399' },
  { name: 'Cinematography', value: 10, color: '#fbbf24' },
];

const VendorDashboard = () => {
  const stats = [
    { name: 'Total Views', stat: '71,897', change: '+28.4%', icon: Eye },
    { name: 'Total Inquiries', stat: '5,816', change: '+18.2%', icon: MessageSquare },
    { name: 'Total Bookings', stat: '1,245', change: '+35.7%', icon: Briefcase },
    { name: 'Overall Rating', stat: '4.8', change: '', icon: Star },
  ];

  const recentInquiries = [
    { name: 'Anjali & Rohan', date: '15 Jan', service: 'Candid Photography', status: 'Pending', new: true },
    { name: 'Priya & Sameer', date: '12 Jan', service: 'Full Wedding', status: 'Confirmed' },
    { name: 'Sneha & Vikram', date: '10 Jan', service: 'Pre-Wedding', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <item.icon className="h-5 w-5 text-purple-600" />
              </div>
              {item.change && (
                <span className="text-xs font-semibold text-green-600 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {item.change}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 font-medium">{item.name}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{item.stat}</p>
          </div>
        ))}
      </div>


  {/* Performance Chart - Full Width */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          Performance Overview (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
            <XAxis dataKey="month"month stroke="#666" style={{ fontSize: '12px' }} />
            <YAxis stroke="#666" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
            />
            <Line type="monotone" dataKey="views" stroke="#c084fc" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="inquiries" stroke="#818cf8" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="bookings" stroke="#34d399" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-6">
        {/* Quick Actions */}
        <div className="space-y-4">
          <button className="w-full py-7 px-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
            <MessageSquare className="h-8 w-8 mb-3" />
            <p className="font-semibold">Reply to Messages</p>
            <p className="text-xs opacity-90">3 pending</p>
          </button>
          <button className="w-full py-7 px-5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
            <Briefcase className="h-8 w-8 mb-3" />
            <p className="font-semibold">Manage Bookings</p>
          </button>
          {/* NEW CARD - Update Availability */}
  <button className="w-full py-7 px-5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col items-center">
    <Calendar className="h-8 w-8 mb-3" />
    <p className="font-semibold">Update Availability</p>
    <p className="text-xs opacity-90">Block dates • Set prices</p>
  </button>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Services Booked</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {serviceData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Recent Inquiries
            </h3>
          </div>
          <div className="p-4 space-y-3">
            {recentInquiries.map((inq) => (
              <div key={inq.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {inq.name[0]}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-800">{inq.name}</p>
                    <p className="text-xs text-gray-500">{inq.date} • {inq.service}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    inq.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    inq.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {inq.status}
                  </span>
                  {inq.new && <p className="text-xs text-red-500 font-bold mt-1">New!</p>}
                </div>
              </div>
            ))}
            <button className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold rounded-lg hover:shadow-md transition">
              View All Inquiries →
            </button>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default VendorDashboard;