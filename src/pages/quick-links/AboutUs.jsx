import React from "react";
import bannertop from "../../assets/banner/aboutbanner.jpg";
import aboutshortone from "../../assets/about/shortone.jpg";
import aboutshorttwo from "../../assets/about/shorttwo.jpg";
import Headingicon from "../../assets/icons/title-img.webp";

import { 
  Heart, Users, MapPin, Star, Sparkles, HeartHandshake, 
  BadgeCheck, ScrollText, Wallet, Clock, Gift, 
  Shield, IndianRupee, Trophy 
} from "lucide-react";

import CountUp from "react-countup";
import { motion } from "framer-motion";
import SuccessSection from "../../components/home/SuccessStory";

const AboutUs = () => {
  return (
    <>
      {/* ====== HERO SECTION WITH FULL BACKGROUND IMAGE ====== */}
      <section
        className="relative h-[500px] flex items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${bannertop})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="text-white/80 text-sm md:text-base tracking-widest uppercase mb-4 font-light">
            India’s Most Trusted Wedding Planning Platform
          </p>

          <h1 className="text-5xl md:text-8xl font-bold text-white leading-tight">
            <span className="bg-clip-text text-white">Epic Wedding</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed">
            Plan your dream wedding with verified vendors, best prices,
            and a personal wedding manager — all completely free.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
            <a
              href="/listing"
              className="px-8 py-3 bg-white text-red-600 font-semibold rounded-full hover:bg-rose-50 transform hover:scale-105 transition shadow-2xl text-md"
            >
              Explore Vendors
            </a>
            <a
              href="/contact-us"
              className="px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white/10 backdrop-blur-sm transition text-md"
            >
              Talk to an Expert
            </a>
          </div>
        </div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ====== WHO WE ARE + IMAGES ====== */}
      <section className="py-20 bg-white catgorybox">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold gradient-text mb-1">Who We Are</h2>
              <img src={Headingicon} alt="decoration" className="w-56 mb-2"/>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Epic Wedding is India’s most trusted online wedding planning portal. Launched in
                2025, we’ve already helped over <strong>50,000+ couples</strong> plan their dream
                wedding without stress.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                From luxurious venues to top photographers, makeup artists, decorators — we handpick
                and verify every vendor so you only get the best.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our mission is simple: Make wedding planning <strong>simple, transparent, and fun</strong>.
              </p>
            </div>

            <div className="order-1 lg:order-2">
              <div className="flex justify-between gap-3 w-full">
                <div className="w-[50%] flex flex-col gap-3 justify-center items-center">
                  <img
                    src={aboutshorttwo}
                    alt="Wedding Decor"
                    className="rounded-[150px] w-full shadow-2xl object-cover h-[400px] transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="w-[50%]">
                  <img
                    src={aboutshortone}
                    alt="Bride & Groom"
                    className="rounded-[150px] w-full shadow-2xl object-cover h-[600px] transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== OUR JOURNEY - STATS ====== */}
      <section className="py-24 overflow-hidden bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center flex flex-col items-center mb-16"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Our Journey So Far
            </h2>
            <img src={Headingicon} alt="decoration"/>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Thousands of love stories began here — and we’re just getting started 
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              { num: 50000, suffix: "+", label: "Happy Couples", icon: Heart, color: "from-rose-500 to-pink-600" },
              { num: 8000, suffix: "+", label: "Verified Vendors", icon: Users, color: "from-purple-500 to-pink-600" },
              { num: 300, suffix: "+", label: "Cities Covered", icon: MapPin, color: "from-indigo-500 to-purple-600" },
              { num: 4.9, suffix: "★", label: "Average Rating", icon: Star, color: "from-amber-400 to-orange-500" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative"
              >
                <div className="relative p-8 bg-white/90 backdrop-blur-lg rounded-3xl transition-all duration-500 border border-pink-100 hover:-translate-y-3 ">
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  <div className="flex justify-center mb-5">
                    <div className={`p-4 rounded-full bg-gradient-to-br ${item.color} shadow-xl text-white`}>
                      <item.icon className="w-10 h-10" />
                    </div>
                  </div>
                  <h3 className="text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    <CountUp end={item.num} duration={3.5} suffix={item.suffix} decimals={item.num % 1 !== 0 ? 1 : 0} enableScrollSpy scrollSpyOnce />
                  </h3>
                  <p className="mt-4 text-gray-700 font-semibold text-center">{item.label}</p>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SuccessSection />

      {/* ====== NEW: WHY COUPLES LOVE EPIC WEDDING ====== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Why Couples Choose Epic Wedding
            </h2>
            <img src={Headingicon} alt="decoration" className="mx-auto mb-6 w-56" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don’t just list vendors — we make wedding planning joyful, transparent, and stress-free.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { icon: HeartHandshake, title: "Personal Wedding Manager", desc: "Your dedicated expert from day one till the big day" },
              { icon: BadgeCheck, title: "100% Verified Vendors", desc: "Every vendor personally reviewed & trusted" },
              { icon: ScrollText, title: "Real Reviews Only", desc: "Authentic feedback from real couples" },
              { icon: Wallet, title: "Best Price Guarantee", desc: "We negotiate so you save thousands" },
              { icon: Clock, title: "Save 100+ Hours", desc: "No endless calls, site visits, or confusion" },
              { icon: Gift, title: "Free Tools & Gifts", desc: "Checklist, budget planner, honeymoon deals & more" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-8 rounded-3xl border border-pink-200 hover:shadow-2xl hover:border-pink-300 transition-all duration-500">
                  <div className="w-14 h-14 btngradiant rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== NEW: BECOME A VERIFIED VENDOR SECTION ====== */}
      <section className="py-24 bg-gradient-to-b catgorybox from-white to-rose-50">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Grow Your Wedding Business With Us
            </h2>
            <img src={Headingicon} alt="decoration" className="mx-auto mb-6 w-56" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join India’s fastest-growing wedding platform and get high-quality leads from couples who are ready to book.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {[
              { title: "100% Verified Leads", desc: "Only genuine couples actively planning their wedding", icon: Shield, gradient: "from-emerald-500 to-teal-600" },
              { title: "Zero Commission", desc: "Keep 100% of what you earn — no hidden charges", icon: IndianRupee, gradient: "from-amber-500 to-orange-600" },
              { title: "Premium Visibility", desc: "Featured listings, priority support & marketing boost", icon: Trophy, gradient: "from-purple-500 to-pink-600" },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-pink-100 hover:-translate-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}>
                    <item.icon className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="/vendor/register"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-rose-500/50 transform hover:scale-105 transition"
            >
              <Sparkles className="w-6 h-6" />
              Become a Verified Vendor Today
            </a>
            <p className="mt-4 text-gray-600 text-lg">Limited premium spots available</p>
          </div>
        </div>
      </section>

      {/* ====== MEET OUR TEAM ====== */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet The Team Behind the Magic</h2>
          <p className="text-xl text-gray-600 mb-12">Passionate experts making your big day perfect</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {["Priya Sharma", "Arjun Mehta", "Neha Kapoor", "Rohan Singh"].map((name) => (
              <div key={name}>
                <div className="w-40 h-40 mx-auto bg-gradient-to-br from-rose-200 to-pink-200 rounded-full shadow-xl overflow-hidden border-4 border-white">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="mt-6 font-semibold text-lg">{name}</h4>
                <p className="text-gray-600">Wedding Expert</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </>
  );
};

export default AboutUs;