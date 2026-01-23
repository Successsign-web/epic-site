import { Navigate ,Outlet } from "react-router-dom";

const VendorProtectedRoute = () => {

const token = localStorage.getItem("vendorToken");
  const vendor = JSON.parse(localStorage.getItem("vendor")); 

    if (!token || !vendor) {
        return <Navigate to="/vendor/login" replace />;
    }
   
  if (vendor.status !== "active") {
    const statusRoutes = {
      pending: "/vendor/waiting-approval",
      inactive: "/vendor/support",
      rejected: "/vendor/rejected",
      blocked: "/vendor/login",
    };


   return <Navigate to={statusRoutes[vendor.status] || "/vendor/login"} replace />;

}

return <Outlet />;

}


export default VendorProtectedRoute;