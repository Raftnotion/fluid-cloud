"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ExternalLink } from 'lucide-react';

const GiftSection: React.FC = () => {
    return (
        <section className="w-full py-32 px-8 flex flex-col items-center">
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                    <motion.div
                        initial={{ rotate: -5, y: 0 }}
                        whileHover={{ rotate: 0, y: -10 }}
                        className="absolute inset-0 bg-[#0a0a0a] border border-[#333333] rounded-2xl shadow-2xl flex flex-col p-12 overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/5 blur-3xl group-hover:bg-[#CCFF00]/20 transition-all" />

                        <div className="relative z-10 mb-auto">
                            <div className="w-16 h-16 bg-[#1a1a1a] rounded-xl flex items-center justify-center mb-8 border border-[#333333]">
                                <Gift className="w-8 h-8 text-[#CCFF00]" />
                            </div>
                            <div className="space-y-4">
                                <div className="w-2/3 h-2 bg-[#1a1a1a] rounded-full" />
                                <div className="w-full h-2 bg-[#1a1a1a] rounded-full" />
                                <div className="w-1/2 h-2 bg-[#1a1a1a] rounded-full" />
                            </div>
                        </div>

                        <motion.div
                            className="mt-auto p-6 bg-[#CCFF00] rounded-xl flex items-center justify-between"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-[#CCFF00] font-bold">E</div>
                                <div className="text-black">
                                    <p className="text-xs uppercase font-bold tracking-tighter leading-none">Original License</p>
                                    <p className="text-lg font-bold">Elementor Pro</p>
                                </div>
                            </div>
                            <ExternalLink className="w-5 h-5 text-black" />
                        </motion.div>

                        {/* Envelope flap aesthetic */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-[#CCFF00]/20" />
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <div>
                        <span className="text-[#CCFF00] font-bold uppercase tracking-[0.3em] text-xs mb-4 block">The Ultimate Bonus</span>
                        <h2 className="text-5xl font-bold text-[#F2F2F2] mb-6 leading-tight">We don't just host you. <br />We empower you.</h2>
                        <p className="text-[#888888] text-lg leading-relaxed">
                            Every WPFYE plan includes a genuine Elementor Pro license (Worth ₹4000+) for free.
                            Build beautiful, conversion-focused sites without the monthly subscription overhead.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-4 border border-[#333333] rounded-lg">
                            <p className="text-[#F2F2F2] font-bold mb-1">Lifetime Updates</p>
                            <p className="text-xs text-[#888888]">Straight from Elementor dashboard</p>
                        </div>
                        <div className="p-4 border border-[#333333] rounded-lg">
                            <p className="text-[#F2F2F2] font-bold mb-1">Premium Support</p>
                            <p className="text-xs text-[#888888]">Our experts help you build</p>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 text-[#CCFF00] font-bold hover:gap-4 transition-all">
                        Learn more about the bundle <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GiftSection;
