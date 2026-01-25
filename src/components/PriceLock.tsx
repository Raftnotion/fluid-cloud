"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';

const PriceLock: React.FC = () => {
    const [tier, setTier] = useState<number>(2); // 0, 1, 2 corresponds to 1, 2, 3 years

    const prices = [899, 1798, 2697];
    const labels = ['1 Year', '2 Years', '3 Years (Locked)'];

    return (
        <section id="pricing" className="w-full py-32 px-8 flex flex-col items-center bg-[#050505] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl w-full text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F2F2F2]">Freeze Time.</h2>
                <p className="text-[#888888] mb-12 text-lg">Hosting prices inflate every quarter. Lock your legacy rate with our 3-year plan.</p>

                <div className="bg-[#0a0a0a] border border-[#333333] p-2 rounded-xl inline-flex gap-2 mb-16">
                    {labels.map((label, idx) => (
                        <button
                            key={label}
                            onClick={() => setTier(idx)}
                            className={`relative px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${tier === idx ? 'text-black' : 'text-[#888888] hover:text-[#F2F2F2]'
                                }`}
                        >
                            <span className="relative z-10">{label}</span>
                            {tier === idx && (
                                <motion.div
                                    layoutId="price-switch"
                                    className="absolute inset-0 bg-[#CCFF00] rounded-lg shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            {idx === 2 && (
                                <span className="absolute -top-3 -right-2 px-2 py-0.5 bg-[#333333] text-[8px] text-[#CCFF00] rounded uppercase tracking-tighter border border-[#444]/50">
                                    Lifetime Lock
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col items-center">
                    <motion.div
                        key={tier}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <span className="text-[#333333] text-sm uppercase tracking-[0.3em] mb-4 block">
                            {tier === 0 ? "Billed Annually" : `Billed every ${tier + 1} years`}
                        </span>
                        <div className="flex items-end justify-center gap-2 mb-2 relative">
                            {/* Floating Gift Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="absolute -right-24 top-0 hidden lg:flex flex-col items-start p-3 bg-[#CCFF00] rounded-lg rotate-12 shadow-[0_10px_30px_rgba(204,255,0,0.2)]"
                            >
                                <span className="text-[10px] font-black text-black uppercase leading-none mb-1">FREE Bonus</span>
                                <span className="text-sm font-black text-black leading-none">Elementor Pro</span>
                            </motion.div>

                            <span className="text-7xl font-bold text-[#F2F2F2]">₹{prices[tier]}</span>
                            <span className="text-[#888888] mb-3 text-xl">{tier === 0 ? "/yr" : ` for ${tier + 1} yrs`}</span>
                        </div>
                    </motion.div>

                    <div className="mt-12 flex flex-col items-center gap-6">
                        {/* Universal Bonus Callout */}
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#CCFF00]/0 via-[#CCFF00]/20 to-[#CCFF00]/0 blur-md opacity-0 group-hover:opacity-100 transition-all" />
                            <div className="relative flex items-center gap-4 px-8 py-4 bg-[#111] border border-[#333] rounded-2xl">
                                <div className="w-10 h-10 bg-[#CCFF00] rounded-xl flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                                    <img src="/images/elemntor.png" alt="Elementor" className="w-8 h-8 object-contain" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest mb-0.5">Free with your plan</p>
                                    <p className="text-[#F2F2F2] font-bold">Elementor Pro License <span className="text-[#888] font-medium ml-1">(Worth ₹4000+)</span></p>
                                </div>
                            </div>
                        </div>

                        <AnimatePresence mode="wait">
                            {tier === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex flex-col items-center gap-2"
                                >
                                    <div className="flex items-center gap-3 px-6 py-3 bg-[#CCFF00]/5 border border-[#CCFF00]/20 rounded-full">
                                        <Lock className="w-4 h-4 text-[#CCFF00]" />
                                        <span className="text-[#CCFF00] text-sm font-bold uppercase tracking-tight">3-Year Price Lock Active</span>
                                        <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
                                    </div>
                                    <p className="text-[#888888] text-xs font-medium max-w-sm mt-1 text-center">
                                        Your renewal price is fixed at ₹2697 every 3 years forever. Protect yourself from future inflation.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceLock;
