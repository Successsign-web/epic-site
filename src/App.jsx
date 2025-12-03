import { Toaster } from "sonner";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/footer";
import { Outlet, useLocation } from "react-router-dom"; // Removed useNavigation
import { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const location = useLocation();
  
  // State to control loader visibility, incorporating a minimum display time
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Always scroll to top on route change
    window.scrollTo(0, 0);

    // Show loader immediately when location.pathname changes
    setShowLoader(true);

    // Set a timeout to hide the loader after a short delay
    // This creates a minimum visible duration for the loader
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 400); // Loader visible for 400ms

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);

  }, [location.pathname]); // Re-run effect whenever the URL (pathname) changes


  return (
    <div className="bg-gray-50 min-h-screen relative">
      <Toaster richColors />
      {showLoader && <LoadingSpinner />}
      <TopBar />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
