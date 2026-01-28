"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const PriceLock: React.FC = () => {
    const [tier, setTier] = useState<number>(2); // 0, 1, 2 corresponds to 1, 2, 3 years

    const plans = [
        { price: 999, original: 1299, label: '1 Year', savings: 300, bonus: 7500 },
        { price: 1998, original: 2598, label: '2 Years', savings: 600, bonus: 15000 },
        { price: 2999, original: 3897, label: '3 Years (Locked)', savings: 898, bonus: 22500 }
    ];

    return (
        <section id="pricing" className="w-full py-32 px-8 flex flex-col items-center bg-[#050505] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl w-full text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F2F2F2]">Freeze Time.</h2>
                <p className="text-[#888888] mb-12 text-lg">Hosting prices inflate every quarter. Lock your legacy rate with our 3-year plan.</p>

                <div className="bg-[#0a0a0a] border border-[#333333] p-2 rounded-xl inline-flex gap-2 mb-16">
                    {plans.map((p, idx) => (
                        <button
                            key={p.label}
                            onClick={() => setTier(idx)}
                            className={`relative px-6 py-3 rounded-lg text-sm font-bold transition-all duration-300 ${tier === idx ? 'text-black' : 'text-[#888888] hover:text-[#F2F2F2]'
                                }`}
                        >
                            <span className="relative z-10">{p.label}</span>
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
                    <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#222] rounded-[32px] p-8 md:p-12 relative overflow-hidden">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/5 blur-[80px] -mr-32 -mt-32 rounded-full" />

                        <motion.div
                            key={tier}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative z-10"
                        >
                            {/* Header Info */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#1a1a1a]">
                                <div className="text-left">
                                    <span className="text-[#CCFF00] text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Selected Configuration</span>
                                    <h3 className="text-3xl font-bold text-[#F2F2F2]">{plans[tier].label} Plan</h3>
                                    <p className="text-[#555] text-xs font-bold uppercase tracking-widest mt-1">Billed {tier === 0 ? "Annually" : `every ${tier + 1} years`}</p>
                                </div>
                                <div className="text-left md:text-right">
                                    <div className="flex items-center md:justify-end gap-3 mb-1">
                                        <span className="text-lg font-bold text-[#333] line-through">₹{plans[tier].original}</span>
                                        <span className="px-2 py-0.5 bg-[#FF3333]/10 text-[#FF3333] text-[9px] font-black uppercase tracking-widest border border-[#FF3333]/20 rounded">-{Math.round((plans[tier].savings / plans[tier].original) * 100)}% Off</span>
                                    </div>
                                    <div className="flex items-end md:justify-end gap-2">
                                        <span className="text-6xl font-black text-[#F2F2F2] leading-none tracking-tighter">₹{plans[tier].price}</span>
                                        <span className="text-[#555] text-lg font-bold mb-1">{tier === 0 ? "/yr" : `/${tier + 1}yr`}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Values Stack */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                                {/* Hosting Value */}
                                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-black border border-[#222] flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5 text-[#CCFF00]" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-black text-[#CCFF00] uppercase tracking-widest block mb-0.5">Hosting Value</span>
                                        <p className="text-sm font-bold text-[#F2F2F2]">₹{plans[tier].savings} Instant Savings</p>
                                        <p className="text-[10px] text-[#555] font-bold uppercase tracking-widest">Applied to first term</p>
                                    </div>
                                </div>

                                {/* Elementor Bonus */}
                                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-black border border-[#222] flex items-center justify-center shrink-0">
                                        <img src="/images/elemntor.png" alt="Elementor" className="w-6 h-6 object-contain" />
                                    </div>
                                    <div className="text-left">
                                        <span className="text-[10px] font-black text-[#CCFF00] uppercase tracking-widest block mb-0.5">Stealth Bonus</span>
                                        <p className="text-sm font-bold text-[#F2F2F2]">Worth ₹{plans[tier].bonus.toLocaleString()}+</p>
                                        <p className="text-[10px] text-[#555] font-bold uppercase tracking-widest">Elementor Pro ({tier + 1} {tier === 0 ? 'Year' : 'Years'})</p>
                                    </div>
                                </div>

                                {/* Renewal/Lock Info */}
                                <div className="md:col-span-2 p-5 bg-[#CCFF00]/5 border border-[#CCFF00]/10 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-black border border-[#CCFF00]/20 flex items-center justify-center shrink-0">
                                            <Lock className="w-5 h-5 text-[#CCFF00]" />
                                        </div>
                                        <div className="text-left">
                                            <span className="text-[10px] font-black text-[#CCFF00] uppercase tracking-widest block mb-0.5">Renewal Protocol</span>
                                            {tier === 2 ? (
                                                <p className="text-sm font-bold text-[#F2F2F2]">Lifetime Price Locked at ₹2,999</p>
                                            ) : (
                                                <p className="text-sm font-bold text-[#F2F2F2]">Renews at Standard ₹{plans[tier].original}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="hidden sm:block">
                                        <span className="px-3 py-1 bg-[#CCFF00] text-black text-[9px] font-black uppercase tracking-widest rounded-full">
                                            {tier === 2 ? 'Guaranteed' : 'Transparent'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Total Savings & Call to Action */}
                            <div className="flex flex-col items-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="h-px w-8 bg-[#222]" />
                                    <span className="text-[11px] font-black text-[#888] uppercase tracking-[0.4em]">Total Value Unlocked: ₹{(plans[tier].savings + plans[tier].bonus).toLocaleString()}</span>
                                    <div className="h-px w-8 bg-[#222]" />
                                </div>

                                <Link
                                    href={`/checkout?plan=${tier + 1}`}
                                    className="group relative w-full h-16 bg-[#CCFF00] rounded-2xl flex items-center justify-center gap-3 overflow-hidden shadow-[0_20px_40px_rgba(204,255,0,0.15)] hover:shadow-[0_25px_50px_rgba(204,255,0,0.25)] transition-all duration-300"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                    <span className="text-black font-black text-xl uppercase tracking-wider">DEPLOY NOW</span>
                                    <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
                                </Link>

                                <p className="text-[#444] text-[9px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Lock className="w-3 h-3" />
                                    Secure Industrial Payment Protocol
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
