"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck } from 'lucide-react';

const PriceLock: React.FC = () => {
    const [tier, setTier] = useState<number>(2); // 0, 1, 2 corresponds to 1, 2, 3 years

    const prices = [1299, 1099, 899];
    const labels = ['1 Year', '2 Years', '3 Years'];

    return (
        <section className="w-full py-32 px-8 flex flex-col items-center bg-[#050505] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl w-full text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#F2F2F2]">Freeze Time.</h2>
                <p className="text-[#888888] mb-12 text-lg">Hosting prices inflate every quarter. With WPFYE, you lock your rate for life.</p>

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
                                    Best Value
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
                        <span className="text-[#333333] text-sm uppercase tracking-[0.4em] mb-4 block">Starting from</span>
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-7xl font-bold text-[#F2F2F2]">₹{prices[tier]}</span>
                            <span className="text-[#888888] mb-3 text-xl">/yr</span>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {tier === 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-10 flex items-center gap-3 px-6 py-3 bg-[#CCFF00]/5 border border-[#CCFF00]/20 rounded-full"
                            >
                                <Lock className="w-4 h-4 text-[#CCFF00]" />
                                <span className="text-[#CCFF00] text-sm font-bold">Inflation Protection Active</span>
                                <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default PriceLock;
