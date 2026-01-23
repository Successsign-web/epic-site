import { Toaster } from "react-hot-toast";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Toaster position="top-center" />
      <div className="bg-gray-50 min-h-screen relative">
        <TopBar />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default App;
