import React from 'react';
import { Mail, Lock, LogIn, Check, Users } from 'lucide-react';
import epicLogo from '../../assets/logo/epic-logo.webp';
import toast from "react-hot-toast";
import api from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const VendorLogin = () => {
  const backgroundImage = 'https://images.unsplash.com/photo-1520854221256-17452cc33155?w=1200';

  const [rememberMe, setRememberMe] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    emailOrPhone: '',
    password: '',
  });


   useEffect(() => {
   const token = localStorage.getItem("vendorToken"); 
  const vendor = JSON.parse(localStorage.getItem("vendor"));

  if (token && vendor?.status === "active") {
    navigate("/vendor/dashboard");
  }
}, []);


  // Load remembered credentials on mount
  React.useEffect(() => {
    const saved = localStorage.getItem("rememberLogin");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Toast based on vendor status
  const showStatusToast = (status) => {
    switch (status) {
      case "active":
        toast.success("Welcome back! You're now logged in 🎉");
        break;
      case "pending":
        toast("Your account is under review ⏳\nWe'll notify you once approved.");
        break;
      case "inactive":
        toast("Account is inactive ⚠️\nPlease contact support to reactivate your account.");
        break;
      case "rejected":
        toast.error("Registration rejected ❌\nYour application was not approved.");
        break;
      case "blocked":
        toast.error("Access denied 🚫\nYour account has been blocked.");
        break;
      default:
        toast.error("Unknown status\nPlease contact support.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload (email or phone)
    let payload = {};
    if (/^\d{10}$/.test(formData.emailOrPhone.trim())) {
      payload.phone = formData.emailOrPhone.trim();
    } else {
      payload.email = formData.emailOrPhone.trim();
    }
    payload.password = formData.password;

    setLoading(true);

    try {
      const res = await api.post("/vendor/login", payload);

      if (!res.data?.success) {
        toast.error(res.data?.message || "Invalid email/phone or password ❌");
        setLoading(false);
        return;
      }

      const { vendor, token } = res.data.data;
      const status = vendor.status;

      // Save auth data
      localStorage.setItem("vendorToken", token);
      localStorage.setItem("vendor", JSON.stringify(vendor));

      // Remember me
      if (rememberMe) {
        localStorage.setItem("rememberLogin", JSON.stringify({
          emailOrPhone: formData.emailOrPhone,
          password: formData.password // Note: Storing password is not ideal in production
        }));
      } else {
        localStorage.removeItem("rememberLogin");
      }

      // Show appropriate toast
      showStatusToast(status);

      // Navigate based on status
      const routeMap = {
        active: "/vendor/dashboard",
        pending: "/vendor/waiting-approval",
        inactive: "/vendor/inactive",
        rejected: "/vendor/rejected",
        blocked: "/vendor/login",
      };

      const destination = routeMap[status] || "/vendor/login";

      // Clear token if blocked
      if (status === "blocked") {
        localStorage.removeItem("token");
        localStorage.removeItem("vendor");
      }

      // Small delay for toast to be visible
      setTimeout(() => {
        navigate(destination);
      }, 800);

    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex">
      {/* LEFT SIDE - HERO IMAGE */}
      <div
        className="hidden lg:block w-1/2 bg-cover bg-center transition-all duration-700 ease-in-out relative"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-red-900/60 backdrop-blur-sm"></div>
        <div className="relative h-full flex flex-col justify-center px-12 py-10">
          <div className="text-white text-center mb-10">
            <h1 className="text-5xl font-bold mb-2 leading-tight">Your Dashboard Awaits</h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              Manage your listings, connect with couples, and grow your business.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="bg-red-500 rounded-lg p-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold">Verified Platform</h3>
                  <p className="text-sm text-gray-300">Trusted by 10,000+ vendors</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="bg-red-500 rounded-lg p-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-white">
                  <h3 className="font-semibold">Wide Reach</h3>
                  <p className="text-sm text-gray-300">Connect with thousands of couples</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 overflow-y-auto">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <img src={epicLogo} alt="Epic Wedding Logo" className="mx-auto h-20 w-auto" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-2 text-sm text-gray-600">Sign in to access your vendor dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
            {/* Email or Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Email or Phone Number *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                  placeholder="you@example.com or 9876543210"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="/vendor/forgot-password" className="text-sm font-medium text-red-600 hover:text-red-500">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-xl shadow-lg transform transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/vendor/signup" className="font-bold text-red-600 hover:text-red-500">
                Create one now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;          