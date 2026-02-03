"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Building2, History, Layers, Activity, Lock, Cloud, ChevronUp } from 'lucide-react';

const AboutPage = () => {
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Show back-to-top button after scrolling
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Stagger animation for cards
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-20 md:pt-40 pb-24 md:pb-32" style={{ paddingBottom: 'max(6rem, env(safe-area-inset-bottom))' }}>

                {/* Hero / Genesis Section */}
                <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12 md:mb-40">
                    <div className="flex flex-col lg:flex-row gap-8 md:gap-20 items-center">
                        <div className="lg:w-1/2">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                                    <div className="h-[1px] w-6 md:w-12 bg-[#CCFF00]" />
                                    <span className="text-[#CCFF00] text-[11px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.4em] font-black">Brand Genesis</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold font-['Clash_Display'] leading-[0.9] text-[#F2F2F2] mb-6 md:mb-12">
                                    Invisible <br />
                                    <span className="text-white/20">Power.</span>
                                </h1>
                                <p className="text-[#888] text-base md:text-xl leading-relaxed max-w-xl mb-8 md:mb-12">
                                    Founded in <strong>2024</strong>, WPFYE was built on a single obsession: removing friction between code and deployment.
                                </p>
                                <div className="flex items-center gap-6 md:gap-8">
                                    <motion.div
                                        className="flex flex-col"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="text-2xl md:text-4xl font-bold text-white tracking-tight">2024</span>
                                        <span className="text-[11px] md:text-xs uppercase tracking-wider text-[#777] font-bold">Foundation</span>
                                    </motion.div>
                                    <div className="w-[1px] h-10 md:h-12 bg-white/10" />
                                    <motion.div
                                        className="flex flex-col"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="text-2xl md:text-4xl font-bold text-white tracking-tight">100%</span>
                                        <span className="text-[11px] md:text-xs uppercase tracking-wider text-[#777] font-bold">Uptime</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-1/2 relative w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                whileTap={{ scale: 0.98 }}
                                className="relative rounded-2xl md:rounded-[40px] overflow-hidden border border-white/5 aspect-video group cursor-pointer"
                            >
                                <img
                                    src="/images/about-hero.png"
                                    alt="Global Infrastructure"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-active:opacity-90 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />

                                <div className="absolute bottom-4 left-4 md:bottom-10 md:left-10">
                                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                                        <History className="w-4 h-4 md:w-5 md:h-5 text-[#CCFF00]" />
                                        <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-[#F2F2F2]">Since '24</span>
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold font-['Clash_Display'] text-white">Built for the <span className="text-[#CCFF00]">long haul.</span></h3>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* The Fluid Mesh Section */}
                <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12 md:mb-40">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-20">
                        <div className="md:w-1/3">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="text-2xl md:text-3xl font-bold font-['Clash_Display'] uppercase mb-3 md:mb-8"
                            >
                                The Fluid <br /><span className="text-white/20">Mesh.</span>
                            </motion.h2>
                            <p className="text-[#555] text-sm md:text-base leading-relaxed">
                                Our infrastructure is a unified, self-healing mesh.
                            </p>
                        </div>
                        <motion.div
                            className="md:w-2/3 grid grid-cols-2 gap-3 md:gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {[
                                { icon: Layers, title: "Multi-Layer Cache", desc: "Edge, regional, and core storage." },
                                { icon: Activity, title: "Real-time AI", desc: "Instant traffic rerouting." },
                                { icon: Lock, title: "Quantum Security", desc: "Threat anticipation." },
                                { icon: Cloud, title: "Cloud-Agnostic", desc: "Any provider integration." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    whileTap={{ scale: 0.97 }}
                                    className="p-4 md:p-8 bg-[#080808] border border-white/5 rounded-xl md:rounded-3xl group active:bg-[#0a0a0a] hover:border-[#CCFF00]/20 transition-all cursor-pointer"
                                >
                                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#555] group-hover:text-[#CCFF00] group-active:text-[#CCFF00] mb-3 md:mb-6 transition-colors" />
                                    <h4 className="font-bold mb-1.5 md:mb-4 uppercase text-[13px] md:text-sm tracking-wide md:tracking-widest">{item.title}</h4>
                                    <p className="text-xs md:text-sm text-[#777] leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Milestones / Timeline */}
                <section className="px-4 md:px-8 max-w-7xl mx-auto mb-12 md:mb-40">
                    <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-16">
                        <div className="h-[1px] w-6 md:w-12 bg-[#CCFF00]" />
                        <h2 className="text-xl md:text-2xl font-bold font-['Clash_Display'] uppercase">Evolution</h2>
                    </div>
                    <motion.div
                        className="space-y-px bg-white/5 rounded-xl md:rounded-[40px] border border-white/5 overflow-hidden"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {[
                            { year: "2024 Q1", event: "Protocol Concept", detail: "Architecture design in Bengaluru." },
                            { year: "2024 Q3", event: "Alpha Deploy", detail: "5 global edge nodes live." },
                            { year: "2025 Q2", event: "Cloud Launch", detail: "Public provider launch." },
                            { year: "2026", event: "Global Scale", detail: "20+ nodes, 100% uptime." }
                        ].map((m, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileTap={{ scale: 0.99, backgroundColor: 'rgba(204,255,0,0.02)' }}
                                className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 p-4 md:p-10 bg-[#080808] active:bg-[#0c0c0c] transition-all cursor-pointer"
                            >
                                <span className="text-[#CCFF00] font-bold text-base md:text-xl font-['Clash_Display'] md:min-w-[120px]">{m.year}</span>
                                <div className="space-y-1 md:space-y-2">
                                    <h4 className="font-bold uppercase tracking-wider text-[#F2F2F2] text-sm md:text-base">{m.event}</h4>
                                    <p className="text-[#777] text-xs md:text-sm">{m.detail}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Brand Vision Section */}
                <section className="relative px-4 md:px-8 py-12 md:py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-[#CCFF00]/5 blur-[120px] rounded-full translate-y-1/2 opacity-20" />
                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold font-['Clash_Display'] mb-4 md:mb-8">
                                Complexity <br />
                                <span className="text-white/20 italic">is the enemy.</span>
                            </h2>
                            <p className="text-[#888] text-sm md:text-lg leading-relaxed mb-6 md:mb-12 max-w-2xl mx-auto">
                                Best tech is invisible tech. We build bridges so you build futures.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 bg-[#111] border border-white/5 rounded-xl md:rounded-2xl cursor-pointer active:bg-[#1a1a1a] transition-colors"
                                >
                                    <Building2 className="w-4 h-4 text-[#CCFF00]" />
                                    <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest text-[#F2F2F2]">HQ: Bengaluru</span>
                                </motion.div>
                                <motion.div
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 bg-white/5 border border-white/10 text-[#555] rounded-xl md:rounded-2xl cursor-pointer active:bg-white/10 transition-colors"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="text-[9px] md:text-[10px] uppercase font-black tracking-widest">Global Network</span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </main>

            <Footer />

            {/* Floating Back to Top Button - Mobile */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 bg-[#CCFF00] text-black rounded-full flex items-center justify-center shadow-lg shadow-[#CCFF00]/20 active:shadow-sm transition-shadow"
                        style={{ bottom: 'max(24px, calc(env(safe-area-inset-bottom) + 16px))' }}
                        aria-label="Back to top"
                    >
                        <ChevronUp className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AboutPage;
