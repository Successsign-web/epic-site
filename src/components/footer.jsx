import React from 'react';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Send, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter,
  Heart,
  Search,
  CheckCircle,
  MapPin,
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import logo from "../assets/logo/epic-logo.webp"
import { Link } from "react-router-dom" // Remove useNavigate



const cities = [
  "Bangalore", "Delhi NCR", "Hyderabad", "Indore", "Jaipur", "Kolkata",
  "Mumbai", "Ahmedabad", "Amritsar", "Chandigarh", "Chennai", "Goa",
  "Kerala", "Lucknow", "Pondicherry", "Pune", "Allahabad", "Bhopal",
  "Bhubaneswar", "Nagpur", "Patna","Noida"
];

// सभी categories with exact slugs
const categories = [
  { name: "Wedding Venues", slug: "wedding-venues" },
  { name: "Planning & Decoration", slug: "planning-and-decoration" },
  { name: "Wedding Photographers", slug: "wedding-photographer" },
  { name: "Bridal Mehendi", slug: "bridal-mehendi" },
  { name: "Bridal Makeup", slug: "bridal-makeup-artist" },
  { name: "Wedding Caterers", slug: "wedding-caterers" }
];

// Vendor Cities (full list)
const vendorCities = [
  "Kolkata","Hyderabad","Bangalore","Delhi NCR","Noida","Mumbai","Jaipur","Patna","Nagpur",
  "Chandigarh","Lucknow","Indore","Bhubaneswar","Pune","Kerala","Chennai","Mangalore",
  "Raipur","Mysore","Ahmedabad","Bhopal","Udaipur","Goa","Ludhiana","Coimbatore",
  "Ujjain","Surat","Ranchi","Amritsar","Jalandhar","Singapore","Dubai","Jammu",
  "Jodhpur","Italy","Pushkar","Allahabad","Patiala","Gorakhpur","Pondicherry","Agra"
];

// Quick Links
const quickLinks = [
  { text: "About Us", url: "about-us" },
  { text: "Privacy Policy", url: "privacy-policy" },
  { text: "Terms & Conditions", url: "terms-conditions" },
  { text: "Vendor Reviews", url: "vendor-reviews" },
  { text: "Customer Reviews", url: "customer-reviews" },
  { text: "Testimonial", url: "testimonial" },
  { text: "Sitemap", url: "site-maps" },
  { text: "Career", url: "career" },
  { text: "Contact Us", url: "contact-us" }
];

const getCitySlug = (city) => city.toLowerCase().replace(/ /g, '-').replace('ncr', 'ncr');


const Footer = () => {
  return (
    <>
     {/* ====== FINAL CTA ====== */}
      <section className="py-24 btngradiant text-white">
        <div className="container mx-auto px-4 mb-10 text-center">
          <h2 className="text-5xl font-bold mb-4">
            Ready to Plan Your Epic Wedding?
          </h2>
          <p className="text-md mb-4 max-w-2xl mx-auto">
            Join 50,000+ happy couples who planned their dream wedding with us.
          </p>
          <a
            href="/register"
            className="inline-block px-7 py-3 rounded-full bg-white text-rose-600 font-bold text-md transition"
          >
            Start Planning for FREE
          </a>
        </div>
      </section>
    <footer className="border-t border-gray-300 relative text-gray-800 pt-20 ">

      {/* Top Call Section */}
      <div className="">
        <div className="max-w-7xl mx-auto bg-white rounded-4xl py-6 px-10 absolute top-[-90px] left-[4%] right-[4%]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-2">
                Talk to a Wedding Expert for Free
              </h3>
              <p className="text-base text-gray-600">
                Available 7 days a week • 10:00 am – 6:30 pm
              </p>

              <div className="flex justify-center lg:justify-start gap-3 mt-3">
                <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-red-50 transition">
                  <Facebook className="w-4 h-4 text-gray-700" />
                </a>
                <a href="https://instagram.com/epicofficial" className="p-3 bg-gray-100 rounded-full hover:bg-red-50 transition">
                  <Instagram className="w-4 h-4 text-gray-700" />
                </a>
                <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-red-50 transition">
                  <Youtube className="w-4 h-4 text-gray-700" />
                </a>
                <a href="#" className="p-3 bg-gray-100 rounded-full hover:bg-red-50 transition">
                  <Twitter className="w-4 h-4 text-gray-700" />
                </a>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left Side */}
          <div className="border-r border-gray-300">
            <img src={logo} className="w-28 mb-3" alt="footer logo" />

            <p className="text-gray-600 text-md leading-relaxed mb-10">
              India's trusted online wedding portal to find verified venues, photographers, makeup artists, mehendi, caterers, decorators & more in just 3 simple steps.
            </p>

            {/* SEARCH → SELECT → BOOK */}
            <div className="">
              <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide">

                <div className="flex flex-col items-center min-w-[120px]">
                  <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-3">
                    <Search className="w-9 h-9 text-red-600" />
                  </div>
                  <span className="text-lg font-bold text-red-600 whitespace-nowrap">SEARCH</span>
                </div>

                <ArrowRight className="w-10 h-10 text-gray-300 flex-shrink-0" />

                <div className="flex flex-col items-center min-w-[120px]">
                  <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center mb-3">
                    <CheckCircle className="w-9 h-9 text-yellow-700" />
                  </div>
                  <span className="text-lg font-bold text-yellow-700 whitespace-nowrap">SELECT</span>
                </div>

                <ArrowRight className="w-10 h-10 text-gray-300 flex-shrink-0" />

                <div className="flex flex-col items-center min-w-[120px]">
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-3">
                    <CalendarCheck className="w-9 h-9 text-orange-600" />
                  </div>
                  <span className="text-lg font-bold text-orange-600 whitespace-nowrap">BOOK</span>
                </div>
              </div>
            </div>
          </div>

          {/* Get In Touch */}
          <div className="bg-gray-50 rounded-3xl p-6"> {/* Changed py-3 to p-6 for better spacing */}
            <h3 className="text-2xl font-bold text-start mb-3">Get In Touch</h3>
            <p className="text-start text-gray-600 text-sm mb-6">
              Subscribe for latest wedding ideas & exclusive offers
            </p>

            <form className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-5 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-red-500"
                  required
                />
                <button className="px-7 py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white rounded-full text-sm font-semibold hover:shadow-md transition">
                  Subscribe
                </button>
              </div>
            </form>

            <div className="space-y-5 text-center sm:text-left flex gap-7">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                  <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <a href="mailto:info@wedplanners.in" className="text-sm font-medium text-red-600">
                    info@wedplanners.in                    </a>
                  </div>
                </div>


              </div>


            </div>
          </div>

        </div>
      </div>

      {/* Links Section */}
      <div className="bg-gray-50 border-t border-gray-300 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {categories.map((cat) => (
              <div key={cat.slug}>
                <h4 className="font-bold gradient-text text-xl pb-3 border-dashed border-b border-red-600 mb-4">{cat.name}</h4>
                <ul className="space-y-3">
                  {cities.map((city) => (
                    <li key={`${cat.slug}-${city}`}>
                      <Link
                        to={`/listing?city=${getCitySlug(city)}&category=${cat.slug}`}
                        className="text-sm pb-1 text-gray-600 hover:text-red-600 transition block leading-tight"
                      >
                        {cat.name.includes("Wedding") ? cat.name.replace("Wedding ", "") : cat.name.replace("Bridal ", "")} in {city}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="font-bold gradient-text text-xl pb-3 border-dashed border-b border-red-600 mb-4">Vendor Cities</h4>
              <div className="columns-2">
                {vendorCities.map((city) => (
                  <Link
                    key={city}
                    to={`/listing?city=${getCitySlug(city)}`}
                    className="text-sm pb-1 text-gray-600 hover:text-red-600 block transition"
                  >
                    {city}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold gradient-text text-xl pb-3 border-dashed border-b border-red-600 mb-4">Quick Links</h4>
              <div className="grid">
                {quickLinks.map((link) => (
                  <Link
                    key={link.text}
                    to={`/${link.url}`}
                    className="text-sm pb-1 text-gray-600 hover:text-red-600 block transition"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white border-t border-gray-300 py-6 mt-4">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-gray-600">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-red-600" />
              <a href="mailto:info@wedplanners.in">info@wedplanners.in</a>

            </div>
            <div className="hidden md:block">•</div>

          </div>

          <p className="mt-4">
            © 2025 wedplanners.in | All Rights Reserved 
            <Heart className="w-4 h-4 inline mx-1 text-red-500" /> 
            Made in India
          </p>
        </div>
      </div>

    </footer>
    </>
  );
};

export default Footer;
