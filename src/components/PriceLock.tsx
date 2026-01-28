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
                    <motion.div
                        key={tier}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                    >
                        <span className="text-[#333333] text-sm uppercase tracking-[0.3em] mb-4 block">
                            {tier === 0 ? "Billed Annually" : `Billed every ${tier + 1} years`}
                        </span>
                        <div className="flex flex-col items-center gap-1 mb-2 relative">
                            <div className="flex items-center gap-3 text-[#333] mb-1">
                                <span className="text-xl font-bold line-through opacity-50">₹{plans[tier].original}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-[#FF3333]/10 text-[#FF3333] border border-[#FF3333]/20 rounded">-{Math.round((plans[tier].savings / plans[tier].original) * 100)}% Instant Off</span>
                            </div>
                            <div className="flex items-end justify-center gap-2">
                                <span className="text-8xl font-black text-[#F2F2F2] tracking-tighter">₹{plans[tier].price}</span>
                                <span className="text-[#888888] mb-4 text-xl font-bold">{tier === 0 ? "/yr" : ` for ${tier + 1} yrs`}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-3 mt-4">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-black text-[11px] font-black uppercase tracking-[0.2em] px-6 py-2 bg-[#CCFF00] rounded-full shadow-[0_0_20px_rgba(204,255,0,0.3)]"
                            >
                                You Save ₹{plans[tier].savings + plans[tier].bonus} Total Value
                            </motion.div>
                            <div className="flex items-center gap-4 text-[#555] text-[10px] font-black uppercase tracking-[0.3em]">
                                {tier === 2 ? (
                                    <>
                                        <span className="text-[#CCFF00]">Host Price Locked</span>
                                        <div className="w-1 h-1 rounded-full bg-[#CCFF00]" />
                                        <span className="text-[#CCFF00]">No Hidden Renewal Hikes</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-[#888]">Renews at ₹{plans[tier].original}</span>
                                        <div className="w-1 h-1 rounded-full bg-[#222]" />
                                        <span>Standard Renewal</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <div className="mt-12 flex flex-col items-center gap-6">
                        {/* Enhanced Universal Bonus Callout */}
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#CCFF00]/0 via-[#CCFF00]/20 to-[#CCFF00]/0 blur-md opacity-0 group-hover:opacity-100 transition-all" />
                            <div className="relative flex items-center gap-5 px-10 py-5 bg-[#0a0a0a] border border-[#222] rounded-3xl shadow-2xl">
                                <motion.div
                                    animate={{
                                        boxShadow: ["0 0 0px rgba(204,255,0,0)", "0 0 20px rgba(204,255,0,0.2)", "0 0 0px rgba(204,255,0,0)"]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-12 h-12 bg-[#CCFF00] rounded-2xl flex items-center justify-center overflow-hidden"
                                >
                                    <img src="/images/elemntor.png" alt="Elementor" className="w-9 h-9 object-contain" />
                                </motion.div>
                                <div className="text-left">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-black text-[#CCFF00] uppercase tracking-[0.2em] px-2 py-0.5 bg-[#CCFF00]/10 rounded-md">Bonus Included</span>
                                        <span className="text-[11px] font-black text-black uppercase tracking-wider px-2 py-0.5 bg-[#CCFF00] rounded-md shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                                            Worth ₹7,500+
                                        </span>
                                    </div>
                                    <p className="text-[#F2F2F2] font-bold text-lg leading-tight">Elementor Pro License</p>
                                    <p className="text-[#888] text-xs mt-0.5">Automated deployment on your domain</p>
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
                                        Your renewal price is fixed at ₹2999 every 3 years forever. Protect yourself from future inflation.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Link
                            href={`/checkout?plan=${tier + 1}`}
                            className="group relative mt-4 px-12 py-5 bg-[#CCFF00] rounded-2xl flex items-center gap-3 overflow-hidden shadow-[0_20px_40px_rgba(204,255,0,0.15)] hover:shadow-[0_25px_50px_rgba(204,255,0,0.25)] transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                            <span className="text-black font-black text-xl uppercase tracking-wider">BUY NOW</span>
                            <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex items-center gap-2 mt-4 text-[#444] text-[10px] uppercase tracking-widest font-bold">
                            <Lock className="w-3 h-3" />
                            <span>Secure Encrypted Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PriceLock;
