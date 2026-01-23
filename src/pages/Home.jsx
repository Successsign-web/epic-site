import React from 'react';
import Hero from '../components/home/hero';
import DreamWeddingHub from '../components/home/WeddingToolkitSection';
import ServicesSection from '../components/home/ServicesSection';
import PopularVenuesCarousel from '../components/home/PopularVenuesCarousel';
import CategoriesGrid from '../components/home/CategoriesGrid';
import BecomeVendorSection from '../components/home/BecomeVendorSection';
import HowItWorks from '../components/home/Howitworks';
import SuccessSection from '../components/home/SuccessStory';
import RealWedding from '../components/home/RealWedding';
import Blogs from "../components/home/BlogSection"
import PremiumServices from '../components/home/PremiumServices'; 
import PopularServices from '../components/home/PopularServices';
import MarketPlaceSection from '../components/home/MarketPlaceSection';
import WeddingPopup from '../components/home/WeddingPopup'; // Import WeddingPopup


const Home = () => {
    return (
        <div>
            <Hero />
            <DreamWeddingHub />

            <PopularVenuesCarousel />
              <PremiumServices />
            <CategoriesGrid />
            <ServicesSection />

            <PopularServices />
            <MarketPlaceSection />
            
            <BecomeVendorSection />
            <HowItWorks />
            <SuccessSection />
            <RealWedding />
            <Blogs/>
           
            {/* <TestimonialsSection /> */}
            <WeddingPopup /> {/* Render WeddingPopup */}
        </div>
    );
};
export default Home;
