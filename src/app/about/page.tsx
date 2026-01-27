"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Globe, Shield, Zap, Cpu, ArrowRight, Building2, History } from 'lucide-react';

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
                                    Founded in <strong>2024</strong>, WPFYE was built on a single obsession: removing the friction between code and global deployment.
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
                                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070"
                                    alt="Industrial Server Room"
                                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
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

                {/* Core Philosophy */}
                <section className="px-8 max-w-7xl mx-auto mb-40">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-[40px] overflow-hidden">
                        {[
                            {
                                icon: <Cpu className="w-6 h-6" />,
                                title: "Technical Precision",
                                description: "Every line of our fabric is optimized for latency. We don't settle for 'fast enough'."
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: "Stealth Security",
                                description: "Protection that works in the background, invisible but impenetrable."
                            },
                            {
                                icon: <Zap className="w-6 h-6" />,
                                title: "Fluid Scaling",
                                description: "Infrastructure that breathes with your traffic. No human intervention required."
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-[#080808] p-12 hover:bg-[#0a0a0a] transition-all group">
                                <div className="mb-8 p-4 rounded-2xl bg-[#111] w-fit group-hover:bg-[#CCFF00]/10 transition-all text-[#333] group-hover:text-[#CCFF00]">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-wide mb-6">{item.title}</h3>
                                <p className="text-[#555] leading-relaxed group-hover:text-[#888] transition-colors">
                                    {item.description}
                                </p>
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
                                Our vision is simple: <br />
                                <span className="text-white/20 italic">Cloud without complexity.</span>
                            </h2>
                            <p className="text-[#888] text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
                                We believe that the best technology is the kind you never have to think about. It just works, global and resilient, from day one.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <div className="flex items-center gap-3 px-8 py-4 bg-[#111] border border-white/5 rounded-2xl">
                                    <Building2 className="w-4 h-4 text-[#CCFF00]" />
                                    <span className="text-[10px] uppercase font-black tracking-widest">Global HQ: Bengaluru, KA</span>
                                </div>
                                <div className="flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black rounded-2xl hover:scale-105 transition-all cursor-pointer">
                                    <span className="text-[10px] uppercase font-black tracking-widest">Partner with us</span>
                                    <ArrowRight className="w-4 h-4" />
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
