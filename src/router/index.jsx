import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import ListingPage from "../pages/listing/ListingPage";
import ListingDetailPage from "../pages/listing/ListingDetailPage";
import AboutUs from "../pages/quick-links/AboutUs";
import PrivacyPolicy from "../pages/quick-links/PrivacyPolicy";
import TermsAndConditions from "../pages/quick-links/TermsAndConditions";
import VendorReviews from "../pages/quick-links/VendorReviews";
import CustomerReviews from "../pages/quick-links/CustomerReviews";
import Testimonial from "../pages/quick-links/Testimonial";
import Sitemap from "../pages/quick-links/Sitemap";
import Career from "../pages/quick-links/Career";
import ContactUs from "../pages/quick-links/ContactUs";
import VendorLogin from "../pages/vendor/VendorLogin";
import VendorSignup from "../pages/vendor/VendorSignup";
import VendorDashboard from "../pages/vendor/VendorDashboard";
import MyPackages from "../pages/vendor/MyPackages";
import AddPackage from "../pages/vendor/AddPackage";
import VendorProfile from "../pages/vendor/VendorProfile";
import EditProfile from "../pages/vendor/EditProfile";
import Leads from "../pages/vendor/Leads";
import Wallet from "../pages/vendor/Wallet";
import VendorLayout from "../pages/vendor/VendorLayout";
import BlogPage from "../pages/blog/BlogPage";
import BlogDetailPage from "../pages/blog/BlogDetailPage";
import WaitingApproval from "../pages/vendor/WaitingApproval";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/listing",
        element: <ListingPage />,
      },
      {
        path: "/listing/:id",
        element: <ListingDetailPage />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/vendor-reviews",
        element: <VendorReviews />,
      },
      {
        path: "/customer-reviews",
        element: <CustomerReviews />,
      },
      {
        path: "/testimonial",
        element: <Testimonial />,
      },
      {
        path: "/site-maps",
        element: <Sitemap />,
      },
      {
        path: "/career",
        element: <Career />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetailPage />,
      },
    ],
  },
  {
    path: "/vendor/login",
    element: <VendorLogin />,
  },
  {
    path: "/vendor/signup",
    element: <VendorSignup />,
  },
  {
    path: "/vendor",
    element: <VendorLayout />,
    children: [
      {
        path: "dashboard",
        element: <VendorDashboard />,
      },
      {
        path: "packages",
        element: <MyPackages />,
      },
      {
        path: "packages/add",
        element: <AddPackage />,
      },
      {
        path: "profile/edit",
        element: <EditProfile />,
      },
      {
        path: "leads",
        element: <Leads />,
      },
      {
        path: "wallet",
        element: <Wallet />,
      },
       {
    path: "/vendor/:id",
    element: <VendorProfile />,
  },
    ],
  },
 
  {
    path: "/vendor/waiting-approval",
    element: <WaitingApproval />,
  }
]);

export default router;
