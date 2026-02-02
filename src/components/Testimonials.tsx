"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, ArrowUpRight } from 'lucide-react';

const testimonials = [
    {
        name: "Marcus Thorne",
        role: "Head of Infrastructure, NexaFlow",
        content: "The autoscaling isn't just a marketing buzzword—it's invisible. We saw a 300% traffic surge during our launch and WPFYE didn't drop a single packet. It's the most stable stack we've ever deployed.",
        rating: 5,
        initials: "MT",
        color: "#6366F1"
    },
    {
        name: "Elena Vance",
        role: "Director of Ops, Catalyst Agency",
        content: "Transitioning from cPanel was the best decision we made this year. The performance gains are measurable, and the 'Fluid' approach to resources means we never worry about hitting a wall.",
        rating: 5,
        initials: "EV",
        color: "#EC4899"
    },
    {
        name: "David Chen",
        role: "SaaS Founder, CloudScale",
        content: "WPFYE's support is actually composed of engineers, not script-readers. Combined with the lifetime price lock, it's a foundation we can actually build a business on without fear of surprise costs.",
        rating: 5,
        initials: "DC",
        color: "#14B8A6"
    }
];

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);

    // Autoplay functionality
    useEffect(() => {
        const startAutoplay = () => {
            autoplayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonials.length);
            }, 5000);
        };

        startAutoplay();

        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, []);

    // Scroll to active card on mobile
    useEffect(() => {
        if (scrollRef.current) {
            const cards = scrollRef.current.children;
            if (cards.length > 0) {
                const firstCard = cards[0] as HTMLElement;
                // Card width + gap (16px = gap-4)
                const cardWidth = firstCard.offsetWidth + 16;
                scrollRef.current.scrollTo({
                    left: activeIndex * cardWidth,
                    behavior: 'smooth'
                });
            }
        }
    }, [activeIndex]);


    // Handle manual scroll
    const handleScroll = () => {
        if (scrollRef.current) {
            const cards = scrollRef.current.children;
            if (cards.length > 0) {
                const firstCard = cards[0] as HTMLElement;
                const cardWidth = firstCard.offsetWidth + 16;
                const scrollPosition = scrollRef.current.scrollLeft;
                const newIndex = Math.round(scrollPosition / cardWidth);
                if (newIndex !== activeIndex && newIndex >= 0 && newIndex < testimonials.length) {
                    setActiveIndex(newIndex);
                    // Reset autoplay on manual interaction
                    if (autoplayRef.current) clearInterval(autoplayRef.current);
                    autoplayRef.current = setInterval(() => {
                        setActiveIndex((prev) => (prev + 1) % testimonials.length);
                    }, 5000);
                }
            }
        }
    };


    return (
        <section id="platform" className="w-full py-16 md:py-40 px-4 md:px-8 bg-black relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#CCFF00]/[0.02] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#CCFF00]/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header - Mobile optimized */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-20 gap-6 md:gap-8">
                    <div className="max-w-2xl">
                        <span className="text-[#CCFF00] text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] font-bold mb-3 md:mb-6 block">Expert Validation</span>
                        <h2 className="text-3xl md:text-6xl font-bold text-[#F2F2F2] font-['Clash_Display'] leading-[0.95]">
                            Infrastructure<br />Built on Trust.
                        </h2>
                    </div>

                    {/* Badge Container - Hidden on mobile, shown below cards */}
                    <div className="hidden md:flex flex-col sm:flex-row items-center gap-6 md:gap-12">
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            src="/images/HA-logo.png"
                            alt="HostAdvice"
                            className="h-16 md:h-24 w-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-500"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-[#111] border border-[#222] p-6 rounded-2xl flex flex-col items-center gap-2 group hover:border-[#CCFF00]/30 transition-colors"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-white font-bold text-xl">HostAdvice</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-[#CCFF00] text-[#CCFF00]" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-black text-[#CCFF00]">9.8</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] text-[#888] uppercase tracking-widest font-bold">Overall</span>
                                    <span className="text-[10px] text-[#888] uppercase tracking-widest font-bold">Excellent</span>
                                </div>
                            </div>
                            <div className="mt-2 flex items-center gap-1.5 px-3 py-1 bg-[#CCFF00]/10 rounded-full">
                                <CheckCircle2 className="w-3 h-3 text-[#CCFF00]" />
                                <span className="text-[9px] text-[#CCFF00] font-bold uppercase tracking-widest">Verified 2026</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile: Horizontal Swipeable Carousel */}
                <div className="md:hidden">
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {testimonials.map((t, idx) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="flex-shrink-0 w-[85vw] snap-center bg-[#0a0a0a] border border-[#1a1a1a] p-5 rounded-3xl relative"
                            >
                                {/* Avatar + Stars Row */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        {/* Avatar Placeholder */}
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                                            style={{ backgroundColor: t.color }}
                                        >
                                            {t.initials}
                                        </div>
                                        <div>
                                            <p className="text-[#F2F2F2] font-bold text-base">{t.name}</p>
                                            <p className="text-[11px] text-[#555] uppercase tracking-wider font-semibold">{t.role.split(',')[0]}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <Star key={i} className="w-3 h-3 fill-[#CCFF00] text-[#CCFF00]" />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-[#888] text-sm leading-relaxed font-medium">
                                    "{t.content}"
                                </p>

                                <Quote className="absolute bottom-4 right-4 w-8 h-8 text-[#1a1a1a]" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Dot Indicators */}
                    <div className="flex justify-center gap-2 mt-4">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === activeIndex
                                    ? 'bg-[#CCFF00] w-6'
                                    : 'bg-[#333]'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Mobile Badge - Prominent HostAdvice Trust Signal */}
                    <div className="mt-8 flex flex-col items-center gap-3">
                        {/* HostAdvice Logo - Prominent */}
                        <img
                            src="/images/HA-logo.png"
                            alt="HostAdvice"
                            className="h-12 w-auto"
                        />
                        {/* Trust Badge */}
                        <div className="flex items-center gap-3 px-4 py-2 bg-[#111] border border-[#222] rounded-2xl">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-black text-[#CCFF00]">9.8</span>
                                <span className="text-[10px] text-[#666] uppercase tracking-wider font-bold">Rating</span>
                            </div>
                            <div className="w-px h-8 bg-[#222]" />
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-[#CCFF00] text-[#CCFF00]" />
                                    ))}
                                </div>
                                <span className="text-[10px] text-[#888] font-semibold">Verified on HostAdvice</span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Desktop: Grid Layout */}
                <div className="hidden md:grid grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 rounded-2xl relative group hover:border-[#333] transition-all"
                        >
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-[#1a1a1a] group-hover:text-[#CCFF00]/5 transition-colors" />

                            {/* Avatar + Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                                    style={{ backgroundColor: t.color }}
                                >
                                    {t.initials}
                                </div>
                                <div>
                                    <p className="text-[#F2F2F2] font-bold font-['Clash_Display'] text-xl">{t.name}</p>
                                    <p className="text-[#444] text-xs uppercase tracking-widest font-bold group-hover:text-[#CCFF00] transition-colors">
                                        {t.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#CCFF00] text-[#CCFF00]" />
                                ))}
                            </div>

                            <p className="text-[#888] text-lg leading-relaxed font-medium">
                                "{t.content}"
                            </p>

                            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-[#CCFF00]/20 transition-all rounded-tr-2xl" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-transparent group-hover:border-[#CCFF00]/20 transition-all rounded-bl-2xl" />
                        </motion.div>
                    ))}
                </div>

                {/* Read More Link */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 md:mt-16 flex justify-center"
                >
                    <a
                        href="https://hostadvice.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-[#888] hover:text-[#CCFF00] transition-colors font-bold text-xs md:text-sm uppercase tracking-[0.15em] md:tracking-[0.2em]"
                    >
                        Read more reviews on HostAdvice
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;

