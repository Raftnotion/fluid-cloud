"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Shield, Zap, Globe, Cpu, LayoutGrid, Terminal, ShieldAlert } from 'lucide-react';

const features = [
    { name: "Disk space", wpfye: "Unlimited", cpanel: "Hardware restricted", icon: <Zap className="w-4 h-4" /> },
    { name: "Bandwidth", wpfye: "Unlimited", cpanel: "Hardware restricted", icon: <Zap className="w-4 h-4" /> },
    { name: "Autoscaling RAM", wpfye: true, cpanel: false, icon: <Zap className="w-4 h-4" /> },
    { name: "Redundant web servers", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Failover clustering", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Global CDN", wpfye: true, cpanel: false, icon: <Globe className="w-4 h-4" /> },
    { name: "Acceleration Suite", wpfye: true, cpanel: false, icon: <Zap className="w-4 h-4" /> },
    { name: "Anti-DDoS (1 Tbps+)", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Web App Firewall", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Isolated storage/FTP", wpfye: true, cpanel: false, icon: <Cpu className="w-4 h-4" /> },
    { name: "Offloaded Email", wpfye: true, cpanel: false, icon: <Globe className="w-4 h-4" /> },
    { name: "WP Optimised stack", wpfye: true, cpanel: false, icon: <Zap className="w-4 h-4" /> },
];

const ComparisonSection: React.FC = () => {
    const [view, setView] = useState<'wpfye' | 'cpanel'>('wpfye');

    return (
        <section className="w-full py-32 px-6 sm:px-8 bg-black relative overflow-hidden">
            {/* Background Textures */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
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
                        className="max-w-3xl mx-auto p-6 border border-[#222] bg-[#111]/30 rounded-2xl mb-12 relative overflow-hidden group text-left sm:text-center"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <ShieldAlert size={20} className="text-[#CCFF00]" />
                        </div>
                        <p className="text-sm md:text-base text-[#888] leading-relaxed">
                            <span className="text-[#F2F2F2] font-bold">"Where is cPanel?"</span> It's a question we get often. The answer is simple: <span className="text-[#CCFF00]">Modern clouds shouldn't run on legacy software.</span> cPanel was built for single, static servers. To give you infinite autoscaling and ironclad security, we had to engineer a panel that speaks the language of the future.
                        </p>
                    </motion.div>
                </div>

                {/* --- Interactive Comparison Hub --- */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Toggle Switch */}
                    <div className="flex justify-center mb-12">
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
                        <AnimatePresence mode="popLayout">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={`${view}-${feature.name}`}
                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                                    className={`relative p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${view === 'wpfye'
                                        ? 'bg-[#CCFF00]/[0.01] border-[#CCFF00]/10 hover:border-[#CCFF00]/30'
                                        : 'bg-[#111]/20 border-[#222]/50 grayscale opacity-40'
                                        }`}
                                >
                                    {/* System Identifier Overlay */}
                                    <div className="absolute -top-6 -right-6 opacity-[0.03] rotate-12 pointer-events-none">
                                        {view === 'wpfye' ? <Terminal size={80} /> : <LayoutGrid size={80} />}
                                    </div>

                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-2 rounded-lg border transition-colors ${view === 'wpfye' ? 'bg-[#CCFF00]/5 border-[#CCFF00]/15 text-[#CCFF00]' : 'bg-[#111] border-[#222] text-[#333]'}`}>
                                            {feature.icon}
                                        </div>
                                        <div>
                                            {view === 'wpfye' ? (
                                                typeof feature.wpfye === 'boolean' ? (
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#CCFF00] uppercase tracking-widest bg-[#CCFF00]/5 px-2 py-0.5 rounded border border-[#CCFF00]/10">
                                                        <Check size={10} strokeWidth={4} /> FLUID
                                                    </div>
                                                ) : (
                                                    <span className="text-[#CCFF00] font-bold uppercase text-[9px] tracking-widest">{feature.wpfye}</span>
                                                )
                                            ) : (
                                                typeof feature.cpanel === 'boolean' ? (
                                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#881111]/40 uppercase tracking-widest bg-[#881111]/5 px-2 py-0.5 rounded border border-[#881111]/10">
                                                        <X size={10} strokeWidth={4} /> LEGACY
                                                    </div>
                                                ) : (
                                                    <span className="text-[#333] font-bold uppercase text-[9px] tracking-widest">{feature.cpanel}</span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                    <h4 className={`text-sm font-bold uppercase tracking-wider transition-colors ${view === 'wpfye' ? 'text-white' : 'text-[#444]'}`}>
                                        {feature.name}
                                    </h4>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Industrial Note & Verdict */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 p-8 rounded-2xl border border-[#1a1a1a] bg-[#050505]/30 flex flex-col justify-center">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-1000 ${view === 'wpfye' ? 'bg-[#CCFF00]' : 'bg-[#222]'}`} />
                                <span className="text-[10px] font-mono text-[#444] uppercase tracking-[0.3em]">
                                    {view === 'wpfye' ? 'System Integrity: Optimal' : 'System Integrity: Legacy Constraints Active'}
                                </span>
                            </div>
                            <p className="text-xs font-mono text-[#555] uppercase tracking-widest leading-loose">
                                {view === 'wpfye'
                                    ? "WPFYE Panel is architected to handle 1,000% traffic spikes in seconds. No resource throttling, no legacy bottlenecks."
                                    : "cPanel uses LVE limits that throttle your CPU/RAM when you need it most. Built for static hosts, not dynamic clouds."}
                            </p>
                        </div>

                        <div className={`p-8 rounded-2xl border transition-all duration-500 flex flex-col items-center justify-center text-center ${view === 'wpfye' ? 'bg-[#CCFF00]/5 text-[#CCFF00] border-[#CCFF00]/20' : 'bg-[#111] text-[#222] border-[#222]'}`}>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 opacity-30">The Verdict</span>
                            <span className="text-xl font-bold font-['Clash_Display'] leading-none">
                                {view === 'wpfye' ? "Engineered to Lead." : "Designed to Limit."}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
