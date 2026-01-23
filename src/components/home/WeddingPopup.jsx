import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WeddingPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleRedirect = () => {
        navigate('/contact-us');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed left-6 bottom-6 z-[1000] animate-in fade-in zoom-in-95 duration-500">
            {/* Main Card: Sleek Glass Effect */}
            <div className="w-[260px] md:w-[280px] bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden">
                
                {/* Decorative Background Element */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full opacity-50 z-0"></div>
                
                <div className="relative p-6 z-10">
                    {/* Close Button: Subtle Circle */}
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 p-1 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-500 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex flex-col items-center text-center space-y-4">
                        {/* Elegant Icon Icon */}
                        <div className="w-12 h-12 bg-rose-600 flex items-center justify-center rounded-full shadow-lg shadow-rose-200">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-slate-900 text-xl font-serif font-medium">
                                Pure <span className="text-rose-600">Elegance</span>
                            </h2>
                            <p className="text-slate-500 text-[13px] leading-relaxed px-2">
                                Crafting moments that linger in your heart forever.
                            </p>
                        </div>

                        {/* CTA Button: High Contrast */}
                        <button
                            onClick={handleRedirect}
                            className="group relative w-full overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 transition-all duration-300 hover:bg-rose-600"
                        >
                            <span className="relative z-10 text-[12px] font-bold tracking-widest text-white uppercase flex items-center justify-center gap-2">
                                Book Consult
                                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                                </svg>
                            </span>
                        </button>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-slate-600 text-[11px] font-medium tracking-wide uppercase transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </div>

                {/* Subtle Progress-like Bar at Bottom */}
                <div className="h-1 w-full bg-slate-50 flex">
                    <div className="h-full bg-rose-500 w-1/3"></div>
                    <div className="h-full bg-rose-400 w-1/3 opacity-50"></div>
                    <div className="h-full bg-rose-300 w-1/3 opacity-25"></div>
                </div>
            </div>
        </div>
    );
};

export default WeddingPopup;