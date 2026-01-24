"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, ArrowUpRight } from 'lucide-react';

const testimonials = [
    {
        name: "Marcus Thorne",
        role: "Head of Infrastructure, NexaFlow",
        content: "The autoscaling isn't just a marketing buzzword—it's invisible. We saw a 300% traffic surge during our launch and WPFYE didn't drop a single packet. It's the most stable stack we've ever deployed.",
        rating: 5
    },
    {
        name: "Elena Vance",
        role: "Director of Ops, Catalyst Agency",
        content: "Transitioning from cPanel was the best decision we made this year. The performance gains are measurable, and the 'Fluid' approach to resources means we never worry about hitting a wall.",
        rating: 5
    },
    {
        name: "David Chen",
        role: "SaaS Founder, CloudScale",
        content: "WPFYE's support is actually composed of engineers, not script-readers. Combined with the lifetime price lock, it's a foundation we can actually build a business on without fear of surprise costs.",
        rating: 5
    }
];

const Testimonials: React.FC = () => {
    return (
        <section id="platform" className="w-full py-40 px-8 bg-black relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/[0.02] blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#CCFF00]/[0.02] blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Expert Validation</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#F2F2F2] font-['Clash_Display'] leading-[0.9]">
                            Infrastructure <br />Built on Trust.
                        </h2>
                    </div>

                    {/* Badge and Logo Container */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-12">
                        {/* HostAdvice Side Logo */}
                        <motion.img
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            src="/images/HA-logo.png"
                            alt="HostAdvice"
                            className="h-16 md:h-24 w-auto drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 transition-transform duration-500"
                        />

                        {/* HostAdvice Badge Placeholder */}
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
                                <span className="text-[9px] text-[#CCFF00] font-bold uppercase tracking-widest">Verified 2024</span>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 rounded-2xl relative group hover:border-[#333] transition-all"
                        >
                            <Quote className="absolute top-6 right-8 w-10 h-10 text-[#1a1a1a] group-hover:text-[#CCFF00]/5 transition-colors" />

                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#CCFF00] text-[#CCFF00]" />
                                ))}
                            </div>

                            <p className="text-[#888] text-lg leading-relaxed mb-8 font-medium">
                                "{t.content}"
                            </p>

                            <div className="mt-auto">
                                <p className="text-[#F2F2F2] font-bold font-['Clash_Display'] text-xl">{t.name}</p>
                                <p className="text-[#444] text-xs uppercase tracking-widest font-bold mt-1 group-hover:text-[#CCFF00] transition-colors">
                                    {t.role}
                                </p>
                            </div>

                            {/* Industrial corner accent */}
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
                    className="mt-16 flex justify-center"
                >
                    <a
                        href="https://hostadvice.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-[#888] hover:text-[#CCFF00] transition-colors font-bold text-sm uppercase tracking-[0.2em]"
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
