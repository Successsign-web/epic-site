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
// import TestimonialsSection from '../components/home/Testimonial';


const Home = () => {
    return (
        <div>
            <Hero />
            <DreamWeddingHub />
            
            <PopularVenuesCarousel />
            <CategoriesGrid />
            <ServicesSection />
            <BecomeVendorSection />
            <HowItWorks />
            <SuccessSection />
            <RealWedding />
            <Blogs/>
            {/* <TestimonialsSection /> */}
        </div>
    );
};

export default Home;
