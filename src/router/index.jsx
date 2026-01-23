import { createBrowserRouter } from "react-router-dom";
import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const App = lazy(() => import("../App"));
const ListingPage = lazy(() => import("../pages/listing/ListingPage"));
const ListingDetailPage = lazy(
  () => import("../pages/listing/ListingDetailPage"),
);
const ServiceListingPage = lazy(
  () => import("../pages/listing/ServiceListingPage"),
); // New Import
const ServiceDetailPage = lazy(
  () => import("../pages/listing/ServiceDetailPage"),
); // New Import
const AboutUs = lazy(() => import("../pages/quick-links/AboutUs"));
const PrivacyPolicy = lazy(() => import("../pages/quick-links/PrivacyPolicy"));
const TermsAndConditions = lazy(
  () => import("../pages/quick-links/TermsAndConditions"),
);
const VendorReviews = lazy(() => import("../pages/quick-links/VendorReviews"));
const CustomerReviews = lazy(
  () => import("../pages/quick-links/CustomerReviews"),
);
const Testimonial = lazy(() => import("../pages/quick-links/Testimonial"));
const Sitemap = lazy(() => import("../pages/quick-links/Sitemap"));
const Career = lazy(() => import("../pages/quick-links/Career"));
const ContactUs = lazy(() => import("../pages/quick-links/ContactUs"));
const VendorLogin = lazy(() => import("../pages/vendor/VendorLogin"));
const VendorSignup = lazy(() => import("../pages/vendor/VendorSignup"));
const VendorDashboard = lazy(() => import("../pages/vendor/VendorDashboard"));
const AddPackage = lazy(() => import("../pages/vendor/AddPackage"));
const AddServicePackage = lazy(
  () => import("../pages/vendor/AddServicePackage"),
);
const ManagePackages = lazy(() => import("../pages/vendor/ManagePackages"));
const VendorProfile = lazy(() => import("../pages/vendor/VendorProfile"));
const EditProfile = lazy(() => import("../pages/vendor/EditProfile"));
const Leads = lazy(() => import("../pages/vendor/Leads"));
const Wallet = lazy(() => import("../pages/vendor/Wallet"));
const VendorLayout = lazy(() => import("../pages/vendor/VendorLayout"));
const BlogPage = lazy(() => import("../pages/blog/BlogPage"));
const BlogDetailPage = lazy(() => import("../pages/blog/BlogDetailPage"));
const WaitingApproval = lazy(() => import("../pages/vendor/WaitingApproval"));
const VendorProtectedRoute = lazy(() => import("./VendorProtectedRoute"));
const Logout = lazy(() => import("../pages/vendor/Logout")); // Import the Logout component
const Inactive = lazy(() => import("../pages/vendor/Inactive")); // New import
const Rejected = lazy(() => import("../pages/vendor/Rejected")); // New import
const AllCategoriesPage = lazy(() => import("../pages/AllCategoriesPage")); // New import

// New View Details Pages
const VenuePackageDetails = lazy(
  () => import("../pages/vendor/VenuePackageDetails"),
);
const ServicePackageDetails = lazy(
  () => import("../pages/vendor/ServicePackageDetails"),
);
const EditVenuePackage = lazy(() => import("../pages/vendor/EditVenuePackage"));
const EditServicePackage = lazy(
  () => import("../pages/vendor/EditServicePackage"),
);

const CheckoutPage = lazy(() => import("../pages/checkout/CheckoutPage")); // New import
const Login = lazy(() => import("../pages/user/Login"));
const Signup = lazy(() => import("../pages/user/Signup"));
const Profile = lazy(() => import("../pages/user/Profile"));
const CartPage = lazy(() => import("../pages/checkout/CartPage"));
const ProductDetailPage = lazy(
  () => import("../pages/listing/ProductDetailPage"),
);
const AllItemsListingPage = lazy(() => import("../pages/AllItemsListingPage"));
const Orders = lazy(() => import("../pages/user/Orders")); // New import
const EInvites = lazy(() => import("../pages/EInvites"));
const Wedmate = lazy(() => import("../pages/Wedmate"));
const NewsDetailPage = lazy(() => import("../pages/News/NewsDetailPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/listing", element: <ListingPage /> },
      { path: "/items-listing/:type", element: <AllItemsListingPage /> }, // New route for all items listing
      { path: "/listing-services", element: <ServiceListingPage /> }, // New route for service listings
      { path: "/listing-services/:id", element: <ServiceDetailPage /> }, // New route for service details
      { path: "/listing/:id", element: <ListingDetailPage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-conditions", element: <TermsAndConditions /> },
      { path: "/vendor-reviews", element: <VendorReviews /> },
      { path: "/customer-reviews", element: <CustomerReviews /> },
      { path: "/testimonial", element: <Testimonial /> },
      { path: "/site-maps", element: <Sitemap /> },
      { path: "career", element: <Career /> },
      { path: "/contact-us", element: <ContactUs /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/blog/:slug", element: <BlogDetailPage /> },
      { path: "/news/:id", element: <NewsDetailPage /> }, // New route for News Detail Page
      { path: "/all-categories", element: <AllCategoriesPage /> }, // New route for all categories
      { path: "/checkout", element: <CheckoutPage /> }, // New route for checkout page
      { path: "/e-invites", element: <EInvites /> },
      { path: "/wedmate", element: <Wedmate /> },
      { path: "/user/login", element: <Login /> },
      { path: "/user/signup", element: <Signup /> },
      { path: "/user/profile", element: <Profile /> },
      { path: "/user/cart", element: <CartPage /> },
      { path: "/user/orders", element: <Orders /> }, // New route for user orders

      // Vendor Public Routes (for unauthenticated actions)
      { path: "/vendor/login", element: <VendorLogin /> },
      { path: "/vendor/signup", element: <VendorSignup /> },
      { path: "/logout", element: <Logout /> }, // Add this logout route

      // Protected Vendor Routes (requires authentication)
      {
        path: "/vendor",
        element: <VendorProtectedRoute />,
        children: [
          // Full-page status views (no VendorLayout)
          { path: "waiting-approval", element: <WaitingApproval /> },
          { path: "inactive", element: <Inactive /> }, // New
          { path: "rejected", element: <Rejected /> }, // New

          // Routes with VendorLayout
          {
            element: <VendorLayout />,
            children: [
              { path: "dashboard", element: <VendorDashboard /> },
              { path: "add-venue-package", element: <AddPackage /> },
              { path: "add-service-package", element: <AddServicePackage /> },
              { path: "manage-packages", element: <ManagePackages /> },
              { path: "edit-venue-package/:id", element: <EditVenuePackage /> },
              {
                path: "edit-service-package/:id",
                element: <EditServicePackage />,
              },

              // New View Details Routes
              {
                path: "venue-package-details/:id",
                element: <VenuePackageDetails />,
              },
              {
                path: "service-package-details/:id",
                element: <ServicePackageDetails />,
              },

              { path: "profile", element: <VendorProfile /> }, // Corrected path
              { path: "profile/edit", element: <EditProfile /> },
              { path: "leads", element: <Leads /> },
              { path: "wallet", element: <Wallet /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
