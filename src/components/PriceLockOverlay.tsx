'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface PriceLockOverlayProps {
    isVisible: boolean;
    onComplete: () => void;
}

export const PriceLockOverlay: React.FC<PriceLockOverlayProps> = ({ isVisible, onComplete }) => {
    const [status, setStatus] = useState<'locking' | 'unlocked'>('locking');

    useEffect(() => {
        if (isVisible) {
            setStatus('locking');
            const timer = setTimeout(() => {
                setStatus('unlocked');
            }, 2000);

            const closeTimer = setTimeout(() => {
                onComplete();
            }, 6000);

            return () => {
                clearTimeout(timer);
                clearTimeout(closeTimer);
            };
        }
    }, [isVisible, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all duration-500"
                >
                    {/* Background Grid/Noise */}
                    <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.1)_0%,transparent_70%)]" />

                    <div className="relative text-center px-6 max-w-lg w-full">
                        {/* Lock Animation Container */}
                        <div className="relative mb-12 flex justify-center">
                            <motion.div
                                initial={{ scale: 0.5, rotate: -45, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                transition={{ type: 'spring', damping: 12 }}
                                className="relative z-10 w-32 h-32 flex items-center justify-center bg-[#CCFF00] rounded-full shadow-[0_0_80px_rgba(204,255,0,0.3)]"
                            >
                                <div className="relative w-16 h-16">
                                    {/* Lock Body */}
                                    <svg viewBox="0 0 24 24" className="w-full h-full text-black fill-black">
                                        <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" />
                                    </svg>

                                    {/* Animated Shackle */}
                                    <motion.div
                                        initial={{ y: -6 }}
                                        animate={{ y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.2, // Wait a bit before locking
                                            type: "spring",
                                            bounce: 0.4
                                        }}
                                        className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                    >
                                        <svg viewBox="0 0 24 24" className="w-full h-full text-black">
                                            <path
                                                d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Outer Rings */}
                            {[1, 2, 3].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{
                                        scale: [0.8, 1.5],
                                        opacity: [0.4, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.4,
                                        ease: "easeOut"
                                    }}
                                    className="absolute inset-0 border border-[#CCFF00]/40 rounded-full"
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black font-['Clash_Display'] text-[#F2F2F2] uppercase tracking-wide mb-4 leading-tight">
                                    LIFETIME PRICE <span className="text-[#CCFF00]">LOCKED</span>
                                </h1>
                                <p className="text-[#888] font-bold text-sm uppercase tracking-widest">Protocol Activation Complete</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left h-full flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="h-8 w-8 flex items-center justify-start mb-2">
                                            <ShieldCheck className="w-6 h-6 text-[#CCFF00]" />
                                        </div>
                                        <p className="text-xs font-black text-[#F2F2F2] uppercase tracking-wide">Forever Rate</p>
                                    </div>
                                    <p className="text-[10px] text-[#888] font-bold uppercase tracking-wider mt-1">Never pay more than ₹2,999</p>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="p-6 bg-white/5 border border-white/10 rounded-2xl text-left h-full flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="h-8 w-8 flex items-center justify-start mb-2">
                                            <Sparkles className="w-6 h-6 text-[#CCFF00]" />
                                        </div>
                                        <p className="text-xs font-black text-[#F2F2F2] uppercase tracking-wide">Max Bonuses</p>
                                    </div>
                                    <p className="text-[10px] text-[#888] font-bold uppercase tracking-wider mt-1">Premium assets unlocked</p>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="flex items-center justify-center gap-2 text-[#555] text-[10px] font-black uppercase tracking-[0.4em]"
                            >
                                <Zap className="w-3 h-3 fill-current" /> Initializing Infrastructure...
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Scanning Line Effect */}
                    <motion.div
                        animate={{ y: ['0%', '1000%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-0 left-0 right-0 h-1 bg-[#CCFF00]/10 blur-[2px] z-50 pointer-events-none"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
