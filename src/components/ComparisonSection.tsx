"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <section
            onMouseMove={handleMouseMove}
            className="w-full py-40 px-6 sm:px-8 bg-black relative overflow-hidden group/section"
        >
            {/* 1. Dynamic Background Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Moving Scanlines */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(0deg, transparent 50%, #CCFF00 50%)',
                        backgroundSize: '100% 4px',
                    }}
                />

                {/* Mouse-Follow Radial Glow */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover/section:opacity-100 transition-opacity duration-1000"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                800px circle at ${mouseX}px ${mouseY}px,
                                rgba(204, 255, 0, 0.03),
                                transparent 80%
                            )
                        `,
                    }}
                />

                {/* Animated Grid */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `radial-gradient(#CCFF00 0.5px, transparent 0.5px)`,
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 border border-[#CCFF00]/30 rounded-full mb-8 bg-black/50 backdrop-blur-md"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse shadow-[0_0_8px_#CCFF00]" />
                        <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-black">
                            Operational Intel v2.08
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold text-white leading-[0.85] mb-12 font-['Clash_Display']"
                    >
                        Beyond the <span className="text-[#333] transition-colors group-hover/section:text-[#1a1a1a]">cPanel Ceiling.</span>
                    </motion.h2>

                    {/* Enhanced Narrative Callout */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto p-8 border border-[#222] bg-[#0a0a0a]/80 backdrop-blur-xl rounded-3xl mb-16 relative overflow-hidden group/intel"
                    >
                        {/* Corner Brackets for Callout */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#CCFF00]/30 rounded-tl-3xl opacity-50" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#CCFF00]/30 rounded-br-3xl opacity-50" />

                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover/intel:opacity-20 transition-opacity">
                            <ShieldAlert size={32} className="text-[#CCFF00]" />
                        </div>

                        <p className="text-base md:text-lg text-[#888] leading-relaxed relative z-10">
                            <span className="text-[#F2F2F2] font-black italic tracking-wide">"Where is cPanel?"</span> It's a question we get often. The answer is simple: <span className="text-[#CCFF00] font-bold">Modern clouds shouldn't run on legacy software.</span> cPanel was built for single, static servers. To give you infinite autoscaling, we engineered a panel that speaks the language of the future.
                        </p>

                        {/* Tech Stamps */}
                        <div className="mt-6 pt-6 border-t border-[#1a1a1a] flex gap-4 justify-center md:justify-start">
                            <div className="flex items-center gap-2 grayscale opacity-30">
                                <span className="text-[10px] font-mono uppercase tracking-widest bg-[#222] px-2 py-0.5 rounded">STATUS: OPTIMAL</span>
                                <span className="text-[10px] font-mono uppercase tracking-widest bg-[#222] px-2 py-0.5 rounded">KERNEL: ISOLATED</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* --- Interactive Comparison Hub --- */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Toggle Switch */}
                    <div className="flex justify-center mb-16">
                        <div className="inline-flex p-1.5 bg-[#0a0a0a] border border-[#222] rounded-2xl relative overflow-hidden shadow-2xl">
                            <motion.div
                                className="absolute inset-y-1.5 rounded-xl bg-[#CCFF00] shadow-[0_0_30px_rgba(204,255,0,0.5)]"
                                initial={false}
                                animate={{
                                    x: view === 'wpfye' ? 0 : '100%',
                                    width: view === 'wpfye' ? '160px' : '180px'
                                }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                style={{ width: view === 'wpfye' ? '160px' : '180px' }}
                            />
                            <button
                                onClick={() => setView('wpfye')}
                                className={`relative z-10 px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 w-[160px] ${view === 'wpfye' ? 'text-black' : 'text-[#444]'}`}
                            >
                                WPFYE OS
                            </button>
                            <button
                                onClick={() => setView('cpanel')}
                                className={`relative z-10 px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition-colors duration-500 w-[180px] ${view === 'cpanel' ? 'text-black' : 'text-[#444]'}`}
                            >
                                LEGACY CPANEL
                            </button>
                        </div>
                    </div>

                    {/* Feature Matrix Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative">
                        <AnimatePresence mode="popLayout">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={`${view}-${feature.name}`}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                                    className={`relative p-8 rounded-3xl border transition-all duration-700 overflow-hidden group/card ${view === 'wpfye'
                                            ? 'bg-[#0a0a0a] border-[#CCFF00]/20 hover:border-[#CCFF00]/60 shadow-[0_0_40px_rgba(0,0,0,1)]'
                                            : 'bg-[#050505] border-[#222] grayscale-[0.8] opacity-40'
                                        }`}
                                >
                                    {/* Glass Grain Texture */}
                                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay bg-white saturate-0 contrast-100" />

                                    {/* Industrial Corner Brackets for Card */}
                                    <div className={`absolute top-0 right-0 w-8 h-8 border-t border-r transition-colors duration-500 rounded-tr-3xl ${view === 'wpfye' ? 'border-[#CCFF00]/20 group-hover/card:border-[#CCFF00]/60' : 'border-transparent'}`} />
                                    <div className={`absolute bottom-0 left-0 w-8 h-8 border-b border-l transition-colors duration-500 rounded-bl-3xl ${view === 'wpfye' ? 'border-[#CCFF00]/20 group-hover/card:border-[#CCFF00]/60' : 'border-transparent'}`} />

                                    {/* System Identifier Overlay */}
                                    <div className="absolute -top-6 -right-6 opacity-[0.02] rotate-12 pointer-events-none group-hover/card:rotate-45 transition-transform duration-1000">
                                        {view === 'wpfye' ? <Terminal size={100} /> : <LayoutGrid size={100} />}
                                    </div>

                                    <div className="flex flex-col h-full relative z-10">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className={`p-3 rounded-xl border mb-4 shadow-lg transition-all duration-500 ${view === 'wpfye'
                                                    ? 'bg-[#CCFF00]/10 border-[#CCFF00]/30 text-[#CCFF00] group-hover/card:scale-110 group-hover/card:shadow-[#CCFF00]/10'
                                                    : 'bg-[#1a1a1a] border-[#333] text-[#555]'
                                                }`}>
                                                {feature.icon}
                                            </div>
                                            <span className="text-[9px] font-mono text-[#333] uppercase tracking-[0.4em] mt-1">
                                                ID: {(idx + 101).toString(16).toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="mt-auto">
                                            {view === 'wpfye' ? (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-[#CCFF00] uppercase tracking-[0.2em] mb-1">
                                                        <Check size={14} strokeWidth={4} />
                                                        {typeof feature.wpfye === 'boolean' ? "FLUID ACCESS" : feature.wpfye}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-[#881111]/60 uppercase tracking-[0.2em] mb-1">
                                                        <X size={14} strokeWidth={4} />
                                                        {typeof feature.cpanel === 'boolean' ? "LEGACY LIMIT" : feature.cpanel}
                                                    </div>
                                                </div>
                                            )}
                                            <h4 className={`text-sm md:text-base font-bold uppercase tracking-widest transition-colors duration-500 ${view === 'wpfye' ? 'text-white group-hover/card:text-[#CCFF00]' : 'text-[#444]'}`}>
                                                {feature.name}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Hover Shine Effect for WPFYE cards */}
                                    {view === 'wpfye' && (
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-1000" />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Industrial Note & Verdict */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                        {/* Decorative Line Accents */}
                        <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-8 h-px bg-[#CCFF00]/20 hidden lg:block" />
                        <div className="absolute -right-12 top-1/2 -translate-y-1/2 w-8 h-px bg-[#CCFF00]/20 hidden lg:block" />

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="md:col-span-2 p-10 rounded-3xl border border-[#1a1a1a] bg-[#050505]/80 backdrop-blur-md flex flex-col justify-center relative overflow-hidden group/note"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#CCFF00]/[0.02] blur-[60px] rounded-full" />

                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-1000 shadow-lg ${view === 'wpfye' ? 'bg-[#CCFF00] shadow-[#CCFF00]/40 scale-125 pulse' : 'bg-[#333]'}`} />
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] font-mono text-[#F2F2F2] uppercase tracking-[0.5em] mb-1">
                                        System Analysis
                                    </span>
                                    <span className="text-[9px] font-mono text-[#444] uppercase tracking-widest">
                                        {view === 'wpfye' ? 'Status: Efficiency Optimal' : 'Status: Technical Debt Detected'}
                                    </span>
                                </div>
                            </div>
                            <p className="text-sm font-mono text-[#888] uppercase tracking-[0.15em] leading-[2] group-hover/note:text-[#F2F2F2] transition-colors duration-500">
                                {view === 'wpfye'
                                    ? "Proprietary WPFYE Kernel architected to bypass traditional LVE throttling. 1.2ms propagation for real-time resource expansion. Seamless global redundancy."
                                    : "Legacy cPanel infrastructure relies on shared resource pools. LVE restrictions intentionally throttle high-traffic nodes to protect monolithic neighbors."}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className={`p-10 rounded-3xl border transition-all duration-700 flex flex-col items-center justify-center text-center relative overflow-hidden ${view === 'wpfye'
                                    ? 'bg-[#CCFF00] text-black border-transparent shadow-[0_0_60px_rgba(204,255,0,0.3)] hover:scale-[1.02]'
                                    : 'bg-[#0a0a0a] text-[#444] border-[#222]'
                                }`}
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] mb-4 relative z-10">Final Verdict</span>
                            <span className="text-3xl font-bold font-['Clash_Display'] leading-[0.8] uppercase relative z-10">
                                {view === 'wpfye' ? "Engineered <br/> to Lead." : "Designed <br/> to Limit."}
                            </span>

                            {/* Verdict Pulse Background */}
                            {view === 'wpfye' && (
                                <div className="absolute inset-0 bg-white opacity-0 animate-pulse mix-blend-overlay" />
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
