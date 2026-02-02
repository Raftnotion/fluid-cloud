"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, Zap, Globe, Cpu, LayoutGrid, Terminal, ShieldAlert } from 'lucide-react';

const FEATURES = [
    {
        name: "Disk space",
        wpfye: "Unlimited",
        cpanel: "Hardware restricted",
        desc: "High-performance storage that scales with your data needs.",
        icon: <Zap className="w-5 h-5" />
    },
    {
        name: "Bandwidth",
        wpfye: "Unlimited",
        cpanel: "Hardware restricted",
        desc: "Uncapped data transfer across our global edge network.",
        icon: <Zap className="w-5 h-5" />
    },
    {
        name: "Autoscaling RAM",
        wpfye: true,
        cpanel: false,
        desc: "Real-time resource injection during traffic surges.",
        icon: <Zap className="w-5 h-5" />
    },
    {
        name: "Failover clustering",
        wpfye: true,
        cpanel: false,
        desc: "Automatic migration to healthy nodes if hardware fails.",
        icon: <Shield className="w-5 h-5" />
    },
    {
        name: "Global CDN",
        wpfye: true,
        cpanel: false,
        desc: "Built-in content delivery from the closest edge node.",
        icon: <Globe className="w-5 h-5" />
    },
    {
        name: "Acceleration Suite",
        wpfye: true,
        cpanel: false,
        desc: "Edge-level optimizations for speed and delivery.",
        icon: <Zap className="w-5 h-5" />
    },
    {
        name: "Anti-DDoS (1 Tbps+)",
        wpfye: true,
        cpanel: false,
        desc: "Enterprise-grade mitigation against all attack vectors.",
        icon: <Shield className="w-5 h-5" />
    },
    {
        name: "Web App Firewall",
        wpfye: true,
        cpanel: false,
        desc: "Layer 7 security to block malicious traffic patterns.",
        icon: <Shield className="w-5 h-5" />
    },
    {
        name: "Isolated storage",
        wpfye: true,
        cpanel: false,
        desc: "Dedicated IO paths for storage, FTP, and MySQL.",
        icon: <Cpu className="w-5 h-5" />
    },
    {
        name: "Isolated Kernels",
        wpfye: true,
        cpanel: false,
        desc: "Proprietary stack isolation for unbeatable stability.",
        icon: <Terminal className="w-5 h-5" />
    },
];

const ComparisonSection: React.FC = () => {
    const [view, setView] = useState<'wpfye' | 'cpanel'>('wpfye');

    return (
        <section id="comparison" className="w-full py-16 md:py-40 px-4 md:px-8 bg-black relative overflow-hidden">
            {/* Background Textures */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/10 to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header - Mobile Optimized */}
                <div className="text-center mb-8 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-2.5 py-1 border border-[#CCFF00]/30 rounded-full mb-4 md:mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                        <span className="text-[#CCFF00] text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-black">
                            Engineering Report
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-7xl font-bold text-white leading-tight mb-4 md:mb-8 font-['Clash_Display']"
                    >
                        Beyond the <span className="text-[#333]">cPanel Ceiling.</span>
                    </motion.h2>

                    {/* Narrative - Compact on Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto p-4 md:p-8 border border-[#111] bg-[#050505] rounded-xl md:rounded-2xl mb-8 md:mb-16 relative overflow-hidden text-left"
                    >
                        <div className="absolute top-3 right-3 md:top-4 md:right-4 opacity-30">
                            <ShieldAlert size={16} className="text-[#CCFF00]" />
                        </div>
                        <p className="text-xs md:text-lg text-[#888] leading-relaxed">
                            <span className="text-[#F2F2F2] font-bold">"Where is cPanel?"</span> Modern clouds shouldn't run on legacy software. <span className="text-[#CCFF00]">We engineered a panel for infinite autoscaling.</span>
                        </p>
                    </motion.div>
                </div>

                {/* Toggle Switch - Flexible Width */}
                <div className="flex justify-center mb-8 md:mb-16">
                    <div className="inline-flex p-1 md:p-1.5 bg-[#111] border border-[#222] rounded-xl md:rounded-2xl relative overflow-hidden w-full max-w-xs md:max-w-none md:w-auto">
                        <motion.div
                            className="absolute inset-y-1 md:inset-y-1.5 rounded-lg md:rounded-xl bg-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                            initial={false}
                            animate={{
                                x: view === 'wpfye' ? 0 : '100%',
                                width: '50%'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            style={{ width: '50%' }}
                        />

                        {/* VS Badge - Centered */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-7 h-7 md:w-8 md:h-8 rounded-full bg-black border border-[#333] flex items-center justify-center">
                            <span className="text-[8px] md:text-[9px] font-black text-white">VS</span>
                        </div>

                        <button
                            onClick={() => setView('wpfye')}
                            className={`relative z-10 flex-1 md:flex-none px-4 md:px-6 py-2.5 flex items-center justify-center gap-1.5 transition-all duration-300 md:w-[150px]`}
                        >
                            <Image
                                src="/images/wpfye_favicon.svg"
                                alt="WPFYE"
                                width={24}
                                height={24}
                                className={`w-4 h-4 md:w-5 md:h-5 transition-all ${view === 'wpfye' ? 'brightness-0' : 'opacity-50'}`}
                            />
                            <span className={`text-[10px] md:text-xs font-black uppercase tracking-wide transition-all ${view === 'wpfye' ? 'text-black' : 'text-[#555]'}`}>
                                WPFYE
                            </span>
                        </button>
                        <button
                            onClick={() => setView('cpanel')}
                            className={`relative z-10 flex-1 md:flex-none px-4 md:px-6 py-2.5 flex items-center justify-center transition-all duration-300 md:w-[150px]`}
                        >
                            <Image
                                src="/images/cp.png"
                                alt="cPanel"
                                width={80}
                                height={24}
                                className={`h-5 md:h-6 w-auto transition-all ${view === 'cpanel' ? 'brightness-0' : 'opacity-50 grayscale'}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile: Compact 2-column grid */}
                <div className="md:hidden grid grid-cols-2 gap-2">
                    <AnimatePresence mode="popLayout">
                        {FEATURES.map((feature, idx) => (
                            <motion.div
                                key={`mobile-${view}-${feature.name}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, delay: idx * 0.02 }}
                                className={`p-3 rounded-xl border transition-all ${view === 'wpfye'
                                    ? 'bg-[#050505] border-[#222]'
                                    : 'bg-[#080808] border-[#111] opacity-40'
                                    }`}
                            >
                                <div className={`mb-2 ${view === 'wpfye' ? 'text-[#CCFF00]' : 'text-[#333]'}`}>
                                    {React.cloneElement(feature.icon, { className: "w-4 h-4" })}
                                </div>
                                <h4 className={`text-xs font-bold mb-1 ${view === 'wpfye' ? 'text-white' : 'text-[#444]'}`}>
                                    {feature.name}
                                </h4>
                                <p className={`text-[9px] leading-relaxed line-clamp-2 ${view === 'wpfye' ? 'text-[#666]' : 'text-[#333]'}`}>
                                    {view === 'wpfye' ? feature.desc : "Limited by legacy software."}
                                </p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Desktop: Original Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    <AnimatePresence mode="popLayout">
                        {FEATURES.map((feature, idx) => (
                            <motion.div
                                key={`${view}-${feature.name}`}
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4, delay: idx * 0.03 }}
                                className={`relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden min-h-[180px] flex flex-col justify-center ${view === 'wpfye'
                                    ? 'bg-[#050505] border-[#111] hover:border-[#CCFF00]/30'
                                    : 'bg-[#080808] border-[#111] grayscale opacity-40'
                                    }`}
                            >
                                <div className="flex items-start gap-5 mb-4">
                                    <div className={`p-0 transition-colors ${view === 'wpfye' ? 'text-[#CCFF00]' : 'text-[#333]'}`}>
                                        {feature.icon}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h4 className={`text-xl font-bold font-['Clash_Display'] leading-none transition-colors ${view === 'wpfye' ? 'text-white' : 'text-[#444]'}`}>
                                            {feature.name}
                                        </h4>
                                    </div>
                                </div>
                                <p className={`text-sm leading-relaxed transition-colors font-medium ${view === 'wpfye' ? 'text-[#888]' : 'text-[#222]'}`}>
                                    {view === 'wpfye'
                                        ? feature.desc
                                        : "Restricted by single-server software limitations and legacy LVE kernel throttling."}
                                </p>

                                {/* Corner Accent */}
                                <div className={`absolute top-0 right-0 p-4 transition-opacity ${view === 'wpfye' ? 'opacity-10' : 'opacity-0'}`}>
                                    <div className="w-1 h-1 bg-[#CCFF00] rounded-full" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Bottom Section - Stacked on Mobile */}
                <div className="mt-8 md:mt-16 flex flex-col md:grid md:grid-cols-3 gap-4 md:gap-6">
                    {/* Tech Note */}
                    <div className="md:col-span-2 p-5 md:p-10 rounded-2xl md:rounded-[32px] border border-[#111] bg-[#050505]">
                        <div className="flex items-center gap-3 mb-3 md:mb-4">
                            <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${view === 'wpfye' ? 'bg-[#CCFF00] shadow-[0_0_10px_#CCFF00]' : 'bg-[#333]'}`} />
                            <span className="text-[8px] md:text-[10px] font-mono text-[#444] uppercase tracking-widest">
                                {view === 'wpfye' ? 'Fluid Optimization' : 'Legacy Mode'}
                            </span>
                        </div>
                        <p className="text-[10px] md:text-[11px] font-mono text-[#555] uppercase tracking-wider leading-loose">
                            {view === 'wpfye'
                                ? "Proprietary isolated kernels handle 1,000% traffic spikes in milliseconds."
                                : "Shared kernels with hard limits cause performance dips during peaks."}
                        </p>
                    </div>

                    {/* Verdict */}
                    <div className={`p-5 md:p-10 rounded-2xl md:rounded-[32px] border transition-all duration-500 flex flex-col items-center justify-center text-center ${view === 'wpfye' ? 'bg-[#CCFF00] text-black border-transparent shadow-[0_0_40px_rgba(204,255,0,0.15)]' : 'bg-[#111] text-[#444] border-[#222]'}`}>
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-2 md:mb-3">Verdict</span>
                        <span className="text-2xl md:text-3xl font-bold font-['Clash_Display'] leading-[0.9]">
                            {view === 'wpfye' ? "Built to Lead." : "Built to Limit."}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
