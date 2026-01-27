"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, Zap, Globe, Cpu, LayoutGrid, Terminal, ShieldAlert } from 'lucide-react';

const features = [
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
        name: "Offloaded Email",
        wpfye: true,
        cpanel: false,
        desc: "Emails run on separate clusters to protect performance.",
        icon: <Globe className="w-5 h-5" />
    },
    {
        name: "WP Optimised stack",
        wpfye: true,
        cpanel: false,
        desc: "Fine-tuned runtimes specifically for WordPress core.",
        icon: <Zap className="w-5 h-5" />
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
        <section id="features" className="w-full py-40 px-6 sm:px-8 bg-black relative overflow-hidden">
            {/* Background Textures */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/10 to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 border border-[#CCFF00]/30 rounded-full mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                        <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-black">
                            Engineering Report #042
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-bold text-white leading-tight mb-8 font-['Clash_Display']"
                    >
                        Beyond the <span className="text-[#333]">cPanel Ceiling.</span>
                    </motion.h2>

                    {/* The "Why" Narrative */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto p-8 border border-[#111] bg-[#050505] rounded-2xl mb-16 relative overflow-hidden group text-left sm:text-center"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <ShieldAlert size={20} className="text-[#CCFF00]" />
                        </div>
                        <p className="text-sm md:text-lg text-[#888] leading-relaxed">
                            <span className="text-[#F2F2F2] font-bold">"Where is cPanel?"</span> It's a question we get often. The answer is simple: <span className="text-[#CCFF00]">Modern clouds shouldn't run on legacy software.</span> cPanel was built for single, static servers. To give you infinite autoscaling and ironclad security, we had to engineer a panel that speaks the language of the future.
                        </p>
                    </motion.div>
                </div>

                {/* --- Interactive Comparison Hub --- */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Toggle Switch */}
                    <div className="flex justify-center mb-16">
                        <div className="inline-flex p-1.5 bg-[#111] border border-[#222] rounded-2xl relative overflow-hidden">
                            <motion.div
                                className="absolute inset-y-1.5 rounded-xl bg-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.4)]"
                                initial={false}
                                animate={{
                                    x: view === 'wpfye' ? 0 : '100%',
                                    width: view === 'wpfye' ? '150px' : '170px'
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{ width: view === 'wpfye' ? '150px' : '170px' }}
                            />
                            <button
                                onClick={() => setView('wpfye')}
                                className={`relative z-10 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 w-[150px] ${view === 'wpfye' ? 'text-black' : 'text-[#555]'}`}
                            >
                                WPFYE Panel
                            </button>
                            <button
                                onClick={() => setView('cpanel')}
                                className={`relative z-10 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-colors duration-300 w-[170px] ${view === 'cpanel' ? 'text-black' : 'text-[#555]'}`}
                            >
                                Legacy cPanel
                            </button>
                        </div>
                    </div>

                    {/* Feature Matrix Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                        <AnimatePresence mode="popLayout">
                            {features.map((feature, idx) => (
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

                    {/* Bottom Industrial Note & Verdict */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 p-10 rounded-[32px] border border-[#111] bg-[#050505] flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-2 h-2 rounded-full transition-all duration-1000 ${view === 'wpfye' ? 'bg-[#CCFF00] shadow-[0_0_10px_#CCFF00] scale-125' : 'bg-[#333]'}`} />
                                <span className="text-[10px] font-mono text-[#444] uppercase tracking-[0.3em]">
                                    {view === 'wpfye' ? 'Architecture: Fluid Optimization Engaged' : 'Architecture: Legacy Virtualization Active'}
                                </span>
                            </div>
                            <p className="text-[11px] font-mono text-[#555] uppercase tracking-[0.2em] leading-loose">
                                {view === 'wpfye'
                                    ? "WPFYE Panel leverages proprietary isolated kernels to handle 1,000% traffic spikes in milliseconds."
                                    : "Traditional panels use shared kernels with hard limits, resulting in performance dips during traffic peaks."}
                            </p>
                        </div>

                        <div className={`p-10 rounded-[32px] border transition-all duration-500 flex flex-col items-center justify-center text-center ${view === 'wpfye' ? 'bg-[#CCFF00] text-black border-transparent shadow-[0_0_40px_rgba(204,255,0,0.15)]' : 'bg-[#111] text-[#444] border-[#222]'}`}>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-3">Verdict</span>
                            <span className="text-3xl font-bold font-['Clash_Display'] leading-[0.9]">
                                {view === 'wpfye' ? "Built to Lead." : "Built to Limit."}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
