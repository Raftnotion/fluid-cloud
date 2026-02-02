"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PriceLockOverlay } from './PriceLockOverlay';

const plans = [
    { price: 999, original: 1299, label: '1 Year', savings: 300, bonus: 7500 },
    { price: 1998, original: 2598, label: '2 Years', savings: 600, bonus: 15000 },
    { price: 2999, original: 3897, label: '3 Years (Locked)', savings: 898, bonus: 22500 }
];

const PriceLock: React.FC = () => {
    const [tier, setTier] = useState<number>(0); // 0, 1, 2 corresponds to 1, 2, 3 years
    const [showOverlay, setShowOverlay] = useState(false);

    const handleTierChange = (idx: number) => {
        if (idx === 2 && tier !== 2) {
            setShowOverlay(true);
        }
        setTier(idx);
    };

    return (
        <section id="pricing" className="w-full py-16 md:py-32 px-4 md:px-8 flex flex-col items-center bg-[#050505] relative overflow-hidden">
            {showOverlay && (
                <PriceLockOverlay
                    isVisible={showOverlay}
                    onComplete={() => setShowOverlay(false)}
                />
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[200px] md:h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl w-full text-center relative z-10">
                {/* Header - Mobile Optimized */}
                <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-[#F2F2F2]">Simple Pricing. Full Power.</h2>
                <p className="text-[#888888] mb-8 md:mb-12 text-base md:text-lg">One plan. Three durations. All features included.</p>

                {/* Plan Selector - Full Width on Mobile */}
                <div className="bg-[#0a0a0a] border border-[#333333] p-1.5 md:p-2 rounded-xl flex md:inline-flex gap-1 md:gap-2 mb-8 md:mb-16 w-full md:w-auto">
                    {plans.map((p, idx) => (
                        <button
                            key={p.label}
                            onClick={() => handleTierChange(idx)}
                            className={`relative flex-1 md:flex-none px-3 md:px-6 py-3 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 ${tier === idx ? 'text-black' : 'text-[#888888] hover:text-[#F2F2F2]'
                                }`}
                        >
                            <span className="relative z-10">{p.label.replace(' (Locked)', '')}</span>
                            {tier === idx && (
                                <motion.div
                                    layoutId="price-switch"
                                    className="absolute inset-0 bg-[#CCFF00] rounded-lg shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                            {idx === 2 && (
                                <span className="absolute -top-2.5 md:-top-3 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:-right-2 px-1.5 md:px-2 py-0.5 bg-[#333333] text-[7px] md:text-[8px] text-[#CCFF00] rounded uppercase tracking-tighter border border-[#444]/50 whitespace-nowrap">
                                    Best Value
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Price Card - Mobile Optimized */}
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#222] rounded-3xl md:rounded-[32px] p-5 md:p-12 relative overflow-hidden">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-[#CCFF00]/5 blur-[80px] -mr-24 md:-mr-32 -mt-24 md:-mt-32 rounded-full" />

                        <motion.div
                            key={tier}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10"
                        >
                            {/* Price Display - Compact on Mobile */}
                            <div className="flex flex-col items-center mb-6 md:mb-8 pb-6 md:pb-8 border-b border-[#1a1a1a]">
                                {/* Discount Badge */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-base md:text-lg font-bold text-[#333] line-through">₹{plans[tier].original}</span>
                                    <span className="px-2 py-0.5 bg-[#FF3333]/10 text-[#FF3333] text-[8px] md:text-[9px] font-black uppercase tracking-wider border border-[#FF3333]/20 rounded">
                                        -{Math.round((plans[tier].savings / plans[tier].original) * 100)}% Off
                                    </span>
                                </div>
                                {/* Main Price */}
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl md:text-6xl font-black text-[#F2F2F2] leading-none tracking-tighter">₹{plans[tier].price}</span>
                                    <span className="text-[#555] text-base md:text-lg font-bold mb-1">{tier === 0 ? "/yr" : `/${tier + 1}yr`}</span>
                                </div>
                                {/* Plan Label */}
                                <p className="text-[#666] text-xs font-bold uppercase tracking-widest mt-2">
                                    {plans[tier].label} Plan • Billed {tier === 0 ? "Annually" : `every ${tier + 1} years`}
                                </p>
                            </div>

                            {/* Values - Both Visible on Mobile */}
                            <div className="grid grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-8">
                                {/* Hosting Value */}
                                <div className="p-3 md:p-5 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-black border border-[#222] flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-[#CCFF00]" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[8px] md:text-[10px] font-black text-[#CCFF00] uppercase tracking-wider block mb-0.5">Savings</span>
                                        <p className="text-sm md:text-base font-bold text-[#F2F2F2]">₹{plans[tier].savings} Off</p>
                                    </div>
                                </div>

                                {/* Elementor Bonus - Main Selling Point */}
                                <div className="p-3 md:p-5 bg-[#92003B]/10 border border-[#92003B]/20 rounded-xl md:rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-black border border-[#222] flex items-center justify-center shrink-0">
                                        <img src="/images/elemntor.png" alt="Elementor" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[8px] md:text-[10px] font-black text-[#FF6B9D] uppercase tracking-wider block mb-0.5">Free Bonus</span>
                                        <p className="text-sm md:text-base font-bold text-[#F2F2F2]">₹{plans[tier].bonus.toLocaleString()}+</p>
                                        <p className="text-[9px] md:text-[10px] text-[#888] font-semibold">Elementor Pro</p>
                                    </div>
                                </div>
                            </div>


                            {/* Renewal Info - Compact */}
                            <div className="p-4 md:p-5 bg-[#CCFF00]/5 border border-[#CCFF00]/10 rounded-2xl flex items-center justify-between mb-6 md:mb-8">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-black border border-[#CCFF00]/20 flex items-center justify-center shrink-0">
                                        <Lock className="w-4 h-4 md:w-5 md:h-5 text-[#CCFF00]" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[9px] md:text-[10px] font-black text-[#CCFF00] uppercase tracking-wider block">Renewal</span>
                                        {tier === 2 ? (
                                            <p className="text-xs md:text-sm font-bold text-[#F2F2F2]">Price Locked Forever</p>
                                        ) : (
                                            <p className="text-xs md:text-sm font-bold text-[#F2F2F2]">₹{plans[tier].original} at renewal</p>
                                        )}
                                    </div>
                                </div>
                                <span className="px-2 md:px-3 py-1 bg-[#CCFF00] text-black text-[8px] md:text-[9px] font-black uppercase tracking-wider rounded-full">
                                    {tier === 2 ? '🔒 Locked' : 'Standard'}
                                </span>
                            </div>

                            {/* CTA - Full Width, Touch Friendly */}
                            <div className="flex flex-col items-center gap-4 md:gap-6">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="h-px w-6 md:w-8 bg-[#222]" />
                                    <span className="text-[10px] md:text-[11px] font-black text-[#888] uppercase tracking-[0.2em] md:tracking-[0.4em]">
                                        Total Value: ₹{(plans[tier].savings + plans[tier].bonus).toLocaleString()}
                                    </span>
                                    <div className="h-px w-6 md:w-8 bg-[#222]" />
                                </div>

                                <Link
                                    href={`/checkout?plan=${tier + 1}`}
                                    className="group relative w-full h-14 md:h-16 bg-[#CCFF00] rounded-2xl flex items-center justify-center gap-2 md:gap-3 overflow-hidden shadow-[0_20px_40px_rgba(204,255,0,0.15)] hover:shadow-[0_25px_50px_rgba(204,255,0,0.25)] transition-all duration-300 active:scale-[0.98]"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    <span className="text-black font-black text-lg md:text-xl uppercase tracking-wider">BUY NOW</span>
                                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <p className="text-[#444] text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-2">
                                    <Lock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                    Secure Payment
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default PriceLock;
