"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Cpu, ArrowRight, Building2, History, Layers, Activity, Lock, Cloud } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-40 pb-32">

                {/* Hero / Genesis Section */}
                <section className="px-8 max-w-7xl mx-auto mb-40">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="h-[1px] w-12 bg-[#CCFF00]" />
                                    <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-black">Brand Genesis</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-bold font-['Clash_Display'] leading-[0.9] text-[#F2F2F2] mb-12">
                                    Invisible <br />
                                    <span className="text-white/20">Power.</span>
                                </h1>
                                <p className="text-[#888] text-xl leading-relaxed max-w-xl mb-12">
                                    Founded in <strong>2024</strong>, WPFYE was built on a single obsession: removing the friction between code and global deployment. We don't just provide hosting; we provide the **Fluid Fabric** for the digital future.
                                </p>
                                <div className="flex items-center gap-8">
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-bold text-white tracking-tight">2024</span>
                                        <span className="text-[10px] uppercase tracking-widest text-[#333] font-black">Foundation Year</span>
                                    </div>
                                    <div className="w-[1px] h-12 bg-white/5" />
                                    <div className="flex flex-col">
                                        <span className="text-4xl font-bold text-white tracking-tight">100%</span>
                                        <span className="text-[10px] uppercase tracking-widest text-[#333] font-black">Uptime Target</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2 }}
                                className="relative rounded-[40px] overflow-hidden border border-white/5 aspect-square lg:aspect-video group"
                            >
                                <img
                                    src="/images/about-hero.png"
                                    alt="Global Infrastructure"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                                <div className="absolute bottom-10 left-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <History className="w-5 h-5 text-[#CCFF00]" />
                                        <span className="text-[10px] uppercase font-black tracking-widest text-[#F2F2F2]">Operating since '24</span>
                                    </div>
                                    <h3 className="text-2xl font-bold font-['Clash_Display'] text-white">Built for the <span className="text-[#CCFF00]">long haul.</span></h3>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* The Fluid Mesh Section */}
                <section className="px-8 max-w-7xl mx-auto mb-40">
                    <div className="flex flex-col md:flex-row gap-20">
                        <div className="md:w-1/3">
                            <h2 className="text-3xl font-bold font-['Clash_Display'] uppercase mb-8">The Fluid <br /><span className="text-white/20">Mesh.</span></h2>
                            <p className="text-[#555] leading-relaxed">
                                Our infrastructure is not a collection of individual servers. It is a unified, self-healing mesh that identifies the most efficient path for every request.
                            </p>
                        </div>
                        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="p-8 bg-[#080808] border border-white/5 rounded-3xl group hover:border-[#CCFF00]/20 transition-all">
                                <Layers className="w-6 h-6 text-[#333] group-hover:text-[#CCFF00] mb-6 transition-colors" />
                                <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Multi-Layer Caching</h4>
                                <p className="text-xs text-[#555] leading-relaxed">Content is stored at the edge, in regional hubs, and core data centers to ensure zero latency.</p>
                            </div>
                            <div className="p-8 bg-[#080808] border border-white/5 rounded-3xl group hover:border-[#CCFF00]/20 transition-all">
                                <Activity className="w-6 h-6 text-[#333] group-hover:text-[#CCFF00] mb-6 transition-colors" />
                                <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Real-time Optimization</h4>
                                <p className="text-xs text-[#555] leading-relaxed">Our AI-driven mesh reroutes traffic instantly if a node experiences even a millisecond of lag.</p>
                            </div>
                            <div className="p-8 bg-[#080808] border border-white/5 rounded-3xl group hover:border-[#CCFF00]/20 transition-all">
                                <Lock className="w-6 h-6 text-[#333] group-hover:text-[#CCFF00] mb-6 transition-colors" />
                                <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Quantum Security</h4>
                                <p className="text-xs text-[#555] leading-relaxed">DDoS mitigation and encryption layers that anticipate threats before they reach your app.</p>
                            </div>
                            <div className="p-8 bg-[#080808] border border-white/5 rounded-3xl group hover:border-[#CCFF00]/20 transition-all">
                                <Cloud className="w-6 h-6 text-[#333] group-hover:text-[#CCFF00] mb-6 transition-colors" />
                                <h4 className="font-bold mb-4 uppercase text-sm tracking-widest">Cloud-Agnostic Core</h4>
                                <p className="text-xs text-[#555] leading-relaxed">Built to integrate with any major provider while maintaining the premium WPFYE edge experience.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Milestones / Timeline */}
                <section className="px-8 max-w-7xl mx-auto mb-40">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="h-[1px] w-12 bg-[#CCFF00]" />
                        <h2 className="text-2xl font-bold font-['Clash_Display'] uppercase">Brand Evolution</h2>
                    </div>
                    <div className="space-y-1px bg-white/5 rounded-[40px] border border-white/5 overflow-hidden">
                        {[
                            { year: "2024 (Q1)", event: "WPFYE Protocol Concept", detail: "Initial architecture design for the Fluid Fabric in Bengaluru." },
                            { year: "2024 (Q3)", event: "Alpha Deployment", detail: "First 5 global edge nodes go live (London, Virginia, Mumbai, Singapore, Frankfurt)." },
                            { year: "2025 (Q2)", event: "The Fluid Cloud launch", detail: "WPFYE transitions from internal tool to public cloud provider." },
                            { year: "2026 (Now)", event: "Global Scale", detail: "Expanded to 20+ nodes with 100% operational integrity record." }
                        ].map((m, i) => (
                            <div key={i} className="flex flex-col md:flex-row items-baseline gap-8 p-10 bg-[#080808] hover:bg-[#0a0a0a] transition-all group">
                                <span className="text-[#CCFF00] font-bold text-xl font-['Clash_Display'] min-w-[120px]">{m.year}</span>
                                <div className="space-y-2">
                                    <h4 className="font-bold uppercase tracking-wider text-[#F2F2F2]">{m.event}</h4>
                                    <p className="text-[#555] text-sm group-hover:text-[#888] transition-colors">{m.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Brand Vision Section */}
                <section className="relative px-8 py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-[#CCFF00]/5 blur-[120px] rounded-full translate-y-1/2 opacity-20" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-bold font-['Clash_Display'] mb-8">
                                Complexity <br />
                                <span className="text-white/20 italic">is the enemy of scale.</span>
                            </h2>
                            <p className="text-[#888] text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                                We believe that the best technology is the kind you never have to think about. At WPFYE, we build the bridges so you can build the future.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <div className="flex items-center gap-3 px-8 py-4 bg-[#111] border border-white/5 rounded-2xl">
                                    <Building2 className="w-4 h-4 text-[#CCFF00]" />
                                    <span className="text-[10px] uppercase font-black tracking-widest text-[#F2F2F2]">Global HQ: Bengaluru, KA</span>
                                </div>
                                <div className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-[#555] rounded-2xl">
                                    <Globe className="w-4 h-4" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Global Node Network active</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
