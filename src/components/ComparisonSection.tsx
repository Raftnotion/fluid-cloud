"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Shield, Zap, Globe, Cpu } from 'lucide-react';

const features = [
    { name: "Disk space", wpfye: "Unlimited", cpanel: "Hardware restricted", icon: <Zap className="w-4 h-4" /> },
    { name: "Bandwidth", wpfye: "Unlimited", cpanel: "Hardware restricted", icon: <Zap className="w-4 h-4" /> },
    { name: "Autoscaling RAM", wpfye: true, cpanel: false, icon: <Zap className="w-4 h-4" /> },
    { name: "Redundant web servers", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Built-in replication & failover", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Global CDN", wpfye: true, cpanel: false, icon: <Globe className="w-4 h-4" /> },
    { name: "Website Acceleration Suite", wpfye: true, cpanel: false, icon: <Zap className="w-4 h-4" /> },
    { name: "Anti-DDoS protection", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Built-in Web Application Firewall", wpfye: true, cpanel: false, icon: <Shield className="w-4 h-4" /> },
    { name: "Isolated web, MySQL, FTP & Panel", wpfye: true, cpanel: false, icon: <Cpu className="w-4 h-4" /> },
    { name: "E-mail offloaded from storage", wpfye: true, cpanel: false, icon: <Globe className="w-4 h-4" /> },
    { name: "WordPress optimised stack", wpfye: true, cpanel: false, icon: <Zap className="w-4 h-4" /> },
    { name: "WordPress staging environments", wpfye: true, cpanel: false, icon: <Zap className="w-4 h-4" /> },
    { name: "Google DNS integration", wpfye: true, cpanel: false, icon: <Globe className="w-4 h-4" /> },
];

const ComparisonSection: React.FC = () => {
    return (
        <section className="w-full py-40 px-6 sm:px-8 bg-black relative overflow-hidden">
            {/* 1. Industrial Background Scanlines */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 50%, #CCFF00 50%)',
                    backgroundSize: '100% 4px',
                }}
            />

            {/* Background Grid Pattern */}
            <div
                className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#CCFF00 0.5px, transparent 0.5px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 border border-[#CCFF00]/30 rounded-full mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                        <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-black">
                            Comparative Analysis v4.2
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.85] mb-8 font-['Clash_Display']"
                    >
                        Beyond the <br /> <span className="text-[#333333]">cPanel Ceiling.</span>
                    </motion.h2>
                    <p className="text-[#888888] max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                        Legacy panels were built for single, static servers. We engineered a custom control system
                        for <span className="text-[#F2F2F2]">fluid infrastructure</span>, turning legacy constraints into limitless power.
                    </p>
                </div>

                {/* Comparison Table Container with Corner Brackets */}
                <div className="relative group">
                    {/* Corner Brackets */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#CCFF00]/20 group-hover:border-[#CCFF00]/50 transition-colors pointer-events-none" />
                    <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-[#CCFF00]/20 group-hover:border-[#CCFF00]/50 transition-colors pointer-events-none" />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-[#CCFF00]/20 group-hover:border-[#CCFF00]/50 transition-colors pointer-events-none" />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#CCFF00]/20 group-hover:border-[#CCFF00]/50 transition-colors pointer-events-none" />

                    <div className="rounded-2xl border border-[#222] bg-[#050505]/80 backdrop-blur-sm overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)]">
                        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#222]">
                            <div className="p-8 hidden md:flex items-center">
                                <span className="text-[10px] font-mono text-[#444] uppercase tracking-widest">Feature Matrix</span>
                            </div>
                            <div className="p-8 bg-[#CCFF00]/5 border-x border-[#222] flex flex-col items-center justify-center gap-4 relative">
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#CCFF00] shadow-[0_0_15px_#CCFF00]" />
                                <div className="px-3 py-1 bg-[#CCFF00] text-black text-[9px] font-black rounded uppercase tracking-widest">
                                    ADVANCED
                                </div>
                                <h3 className="text-3xl font-bold text-[#CCFF00] uppercase flex flex-col md:flex-row items-center gap-x-3 tracking-tighter leading-none">
                                    <span>WPFYE</span>
                                    <span>panel</span>
                                </h3>
                            </div>
                            <div className="p-8 flex flex-col items-center justify-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500 underline-offset-8 decoration-[#881111]/30 decoration-2 gap-4">
                                <div className="px-3 py-1 bg-[#1a1a1a] text-[#888] text-[9px] font-black rounded uppercase tracking-widest border border-[#333]">
                                    Traditional
                                </div>
                                <h3 className="text-2xl font-bold text-[#F2F2F2] uppercase tracking-tight">cPanel</h3>
                            </div>
                        </div>

                        <div className="divide-y divide-[#111]">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={feature.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03, duration: 0.5 }}
                                    className="grid grid-cols-1 md:grid-cols-3 group/row transition-all duration-300"
                                >
                                    <div className="p-6 md:p-8 flex items-center gap-6 border-r border-[#111]">
                                        <div className="w-10 h-10 rounded-lg border border-[#222] flex items-center justify-center text-[#444] group-hover/row:text-[#CCFF00] group-hover/row:border-[#CCFF00]/20 group-hover/row:bg-[#CCFF00]/5 transition-all duration-300">
                                            {feature.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold tracking-tight text-sm md:text-base group-hover/row:text-[#CCFF00] transition-colors">
                                                {feature.name}
                                            </span>
                                            <span className="text-[9px] font-mono text-[#333] uppercase tracking-widest mt-1">
                                                ID: {(idx + 101).toString(16).toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* WPFYE Column */}
                                    <div className="p-6 md:p-8 bg-[#CCFF00]/[0.01] border-x border-[#111] flex items-center justify-center relative overflow-hidden">
                                        {/* Subtle row hover glow */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#CCFF00]/[0.02] to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity" />

                                        {typeof feature.wpfye === 'boolean' ? (
                                            feature.wpfye ? (
                                                <div className="w-7 h-7 rounded-md bg-[#CCFF00] flex items-center justify-center shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                                                    <Check className="w-5 h-5 text-black stroke-[4px]" />
                                                </div>
                                            ) : (
                                                <X className="w-7 h-7 text-[#222]" />
                                            )
                                        ) : (
                                            <span className="text-[#CCFF00] font-black uppercase text-xs tracking-[0.2em] font-mono">
                                                {feature.wpfye}
                                            </span>
                                        )}
                                    </div>

                                    {/* Legacy Column */}
                                    <div className="p-6 md:p-8 flex items-center justify-center opacity-50 contrast-50 grayscale hover:grayscale-0 hover:opacity-100 items-center justify-center transition-all duration-500">
                                        {typeof feature.cpanel === 'boolean' ? (
                                            feature.cpanel ? (
                                                <Check className="w-6 h-6 text-[#333]" />
                                            ) : (
                                                <X className="w-7 h-7 text-[#881111]/30" />
                                            )
                                        ) : (
                                            <span className="text-[#333] font-bold uppercase text-[10px] tracking-widest font-mono">
                                                {feature.cpanel}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-16 border-t border-[#111] bg-black/80 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 rounded-full bg-[#CCFF00] shadow-[0_0_10px_#CCFF00] animate-pulse" />
                                <span className="text-[11px] font-mono text-[#F2F2F2] uppercase tracking-[0.3em]">Hardware Abstraction Layer v2.0</span>
                            </div>
                            <div className="h-px flex-1 bg-[#1a1a1a] hidden md:block mx-8" />
                            <p className="text-[10px] font-mono text-[#555] uppercase tracking-widest leading-loose text-center md:text-right">
                                WPFYE Panel runs on proprietary isolated kernels <br />
                                <span className="text-[#333]">Architected for extreme stability and infinite scale.</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Graphic Accents */}
                <div className="mt-20 flex justify-between items-center px-4">
                    <div className="flex items-end gap-1 mb-2">
                        {[40, 60, 30, 80, 50].map((h, i) => (
                            <div key={i} className="w-1 bg-[#CCFF00]/20 group-hover:bg-[#CCFF00]/50 transition-colors" style={{ height: `${h}px` }} />
                        ))}
                    </div>
                    <div className="text-center px-8 border-x border-[#1a1a1a]">
                        <span className="text-[10px] font-mono text-[#CCFF00] uppercase tracking-[0.5em] animate-pulse">Integrity Nominal</span>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-2 h-2 rounded-full border border-[#CCFF00]/30" />
                        <div className="w-2 h-2 rounded-full bg-[#CCFF00]/30" />
                        <div className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
