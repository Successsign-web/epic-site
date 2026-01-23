import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, ChevronDown, Check, MessageCircle, ArrowRight, Gem, ShieldCheck, Heart } from 'lucide-react';

const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200/60 py-7 group">
            <button
                className="w-full flex justify-between items-center text-left outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`text-xl font-medium tracking-tight transition-all duration-300 ${isOpen ? 'text-amber-600 translate-x-2' : 'text-gray-800'}`}>
                    {question}
                </span>
                <div className={`p-2 rounded-full transition-all duration-500 ${isOpen ? 'bg-amber-600 text-white rotate-180' : 'bg-gray-50 text-gray-400 group-hover:bg-amber-50'}`}>
                    <ChevronDown size={20} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -10 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden font-sans"
                    >
                        <p className="text-gray-500 pt-5 pb-2 leading-relaxed text-lg max-w-2xl">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const Wedmate = () => {
    const packages = [
        {
            name: "Classic Heritage",
            price: "1,50,000",
            tag: "Essential",
            icon: <Heart className="w-6 h-6" />,
            desc: "Perfectly curated planning for local luxury celebrations.",
            features: ["Venue Selection & Audit", "5 Elite Vendor Mapping", "Timeline Coordination", "Budget Optimization", "Dedicated Remote Concierge"]
        },
        {
            name: "Elite Signature",
            price: "3,50,000",
            tag: "Most Preferred",
            isPopular: true,
            icon: <Gem className="w-6 h-6" />,
            desc: "The gold standard for high-end destination weddings.",
            features: ["Global Venue Sourcing", "Unlimited Vendor Curation", "Decor & Theme Design", "2 In-Person Strategy Meets", "3-Day On-Ground Lead Team"]
        },
        {
            name: "Royal Bespoke",
            price: "6,00,000",
            tag: "Ultra-Luxury",
            icon: <ShieldCheck className="w-6 h-6" />,
            desc: "A white-glove service for an effortless, royal experience.",
            features: ["Full Hospitality & RSVP", "Artist & Celebrity Liaison", "Logistics & Fleet Management", "Personal Bride/Groom Shadows", "Premium Gifting Solutions"]
        }
    ];

    return (
        <div className="bg-[#FFFDF9] font-serif text-[#1a1a1a] selection:bg-amber-100 overflow-x-hidden">
            
            {/* --- Hero Section --- */}
            <div className="relative pt-24 pb-32 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-amber-100 text-amber-700 text-sm font-sans tracking-widest uppercase mb-10"
                    >
                        <Sparkles size={16} className="animate-pulse" />
                        <span>India's Premier Wedding Concierge</span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-9xl font-bold tracking-tighter mb-10 leading-[0.9]"
                    >
                        Crafting <span className="italic font-light text-amber-600">Legendary</span> <br /> Celebrations.
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-14 font-sans font-light leading-relaxed"
                    >
                        Beyond planning. We design experiences that resonate for a lifetime. Connect with our master genies today.
                    </motion.p>

                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row justify-center gap-6 font-sans"
                    >
                        <a href="#" className="flex items-center justify-center gap-3 bg-gray-900 text-white px-12 py-6 rounded-2xl text-lg font-bold shadow-2xl hover:bg-black transition-all hover:scale-105 active:scale-95">
                            <MessageCircle size={22} className="text-green-400" />
                            Consult on WhatsApp
                        </a>
                        <button className="flex items-center justify-center gap-2 border border-gray-200 bg-white px-12 py-6 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all shadow-sm">
                            View Portfolio <ArrowRight size={20} className="text-amber-600" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* --- Packages Grid --- */}
            <section className="py-32 px-6 bg-white relative">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#FFFDF9] to-white" />
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold mb-4 italic">Investment Packages</h2>
                        <p className="font-sans text-gray-400 tracking-widest uppercase text-sm">Transparent Pricing for Extraordinary Results</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {packages.map((pkg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className={`relative flex flex-col p-12 rounded-[3rem] border transition-all duration-500 ${pkg.isPopular ? 'border-amber-400 bg-[#FFFDF9] shadow-[0_30px_60px_-15px_rgba(217,119,6,0.15)] scale-105 z-10' : 'border-gray-100 bg-white hover:border-amber-200'}`}
                            >
                                {pkg.isPopular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-600 text-white px-6 py-2 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase shadow-lg">
                                        The Signature Choice
                                    </div>
                                )}
                                
                                <div className="mb-8 flex justify-between items-start">
                                    <div className="p-4 rounded-2xl bg-amber-50 text-amber-600">
                                        {pkg.icon}
                                    </div>
                                    <span className="text-amber-600 font-bold text-[10px] tracking-[0.2em] uppercase pt-2">{pkg.tag}</span>
                                </div>

                                <h3 className="text-4xl font-bold mb-4 leading-tight">{pkg.name}</h3>
                                <p className="text-gray-500 font-sans text-sm mb-10 leading-relaxed min-h-[40px]">{pkg.desc}</p>
                                
                                <div className="mb-12 border-y border-gray-50 py-6">
                                    <span className="text-xs text-gray-400 uppercase font-sans tracking-widest block mb-1">Starting from</span>
                                    <span className="text-5xl font-black tracking-tighter">₹{pkg.price}</span>
                                </div>

                                <ul className="space-y-6 mb-12 flex-grow font-sans">
                                    {pkg.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-4 text-gray-700 text-[15px]">
                                            <div className="mt-1 bg-amber-600 text-white p-0.5 rounded-full ring-4 ring-amber-50"><Check size={10} strokeWidth={4} /></div>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-6 rounded-2xl font-bold font-sans tracking-widest uppercase text-xs transition-all ${pkg.isPopular ? 'bg-amber-600 text-white hover:bg-amber-700 shadow-xl shadow-amber-200' : 'bg-gray-900 text-white hover:bg-black'}`}>
                                    Begin Planning
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FAQ Section --- */}
            <section className="py-32 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-5 gap-16">
                        <div className="md:col-span-2">
                            <h2 className="text-5xl font-bold leading-tight italic text-gray-900 mb-6">Your Concerns, <br /> Clarified.</h2>
                            <p className="font-sans text-gray-500 leading-relaxed">Everything you need to know about partnering with India's most trusted planning team.</p>
                            <div className="mt-10 p-8 rounded-[2rem] bg-amber-50 border border-amber-100/50">
                                <p className="font-sans text-sm text-amber-800 font-medium italic">"They don't just plan weddings; they curate legacies."</p>
                                <p className="mt-4 font-sans text-xs uppercase tracking-widest text-amber-600">— Forbes India</p>
                            </div>
                        </div>
                        <div className="md:col-span-3">
                            <FaqItem 
                                question="How does the payment structure work?" 
                                answer="We follow a transparent 40-30-30 model. 40% to secure the dates, 30% midway through planning, and the final 30% two weeks before the first event." 
                            />
                            <FaqItem 
                                question="Can we customize the existing packages?" 
                                answer="Absolutely. While our packages are comprehensive, we can tailor every service to match your specific guest count and cultural requirements." 
                            />
                            <FaqItem 
                                question="What is the 'On-Ground' team size?" 
                                answer="For Signature weddings, we deploy a lead planner plus 4 category specialists. For Bespoke weddings, the team scales up to 12 members." 
                            />
                            <FaqItem 
                                question="Do you handle vendor payments?" 
                                answer="To ensure 100% transparency, you pay vendors directly. We manage the contracts, vetting, and negotiations to ensure you get the 'WedMate Exclusive' rates." 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- High-End App CTA --- */}
            <section className="pb-32 px-6">
                <div className="max-w-6xl mx-auto bg-[#1a1a1a] rounded-[4rem] p-12 md:p-24 flex flex-col items-center text-center text-white shadow-3xl relative overflow-hidden">
                    {/* Abstract Background Decoration */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 blur-[100px] rounded-full" />
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="relative z-10"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter italic">Elegance in your pocket.</h2>
                        <p className="text-gray-400 text-lg md:text-xl font-sans max-w-2xl mx-auto mb-16 leading-relaxed">
                            Manage your guest list, track RSVPs, and oversee your budget with the <span className="text-white font-medium">WedMate Private Suite</span>. Available exclusively for our clients.
                        </p>
                        
                        <div className="w-full max-w-lg mx-auto bg-white/5 backdrop-blur-xl p-3 rounded-3xl border border-white/10 flex flex-col sm:flex-row gap-3">
                            <input 
                                type="tel" 
                                placeholder="Enter mobile for invite link" 
                                className="bg-transparent flex-grow px-6 py-5 text-white placeholder:text-gray-500 outline-none font-sans" 
                            />
                            <button className="bg-amber-600 text-white px-10 py-5 rounded-2xl font-bold font-sans hover:bg-amber-500 transition-all shadow-xl shadow-amber-900/20">
                                Get Invite
                            </button>
                        </div>
                        <p className="mt-8 text-xs font-sans text-gray-500 tracking-[0.3em] uppercase">iOS • Android • Web Portal</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Wedmate;