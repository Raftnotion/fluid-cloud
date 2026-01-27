"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Shield, Zap, CreditCard, ArrowRight, ExternalLink, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const CATEGORIES = [
    {
        id: "getting-started",
        title: "Getting Started",
        icon: <Zap className="w-6 h-6" />,
        description: "Protocols for initial deployment and account synchronization.",
        articleCount: 5,
        color: "#CCFF00"
    },
    {
        id: "infrastructure",
        title: "Infrastructure",
        icon: <Book className="w-6 h-6" />,
        description: "Deep dive into the Fluid Fabric, Edge Nodes, and scaling logic.",
        articleCount: 12,
        color: "#333"
    },
    {
        id: "security",
        title: "Security & Privacy",
        icon: <Shield className="w-6 h-6" />,
        description: "Encryption standards, DDoS mitigation, and data integrity.",
        articleCount: 8,
        color: "#CCFF00"
    },
    {
        id: "billing",
        title: "Account & Billing",
        icon: <CreditCard className="w-6 h-6" />,
        description: "Pricing structure, 3-year lock policy, and invoice management.",
        articleCount: 4,
        color: "#333"
    }
];

const RECENT_ARTICLES = [
    { title: "Configuring Edge Caching Protocols", category: "Infrastructure", slug: "edge-caching-protocols" },
    { title: "Zero-Downtime Migration Guide", category: "Getting Started", slug: "migration-guide" },
    { title: "Hardening your CMS deployment", category: "Security", slug: "hardening-deployment" },
    { title: "Understanding the Fluid Scaling Mesh", category: "Infrastructure", slug: "scaling-mesh" }
];

const KBHub = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-40 pb-32 px-8 max-w-7xl mx-auto">

                {/* Search Hero */}
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-black mb-6 block">Central Intelligence Hub</span>
                        <h1 className="text-6xl md:text-8xl font-bold font-['Clash_Display'] leading-none mb-12">
                            Knowledge <br />
                            <span className="text-white/20">Base.</span>
                        </h1>

                        <div className="relative group max-w-2xl mx-auto">
                            <div className="absolute inset-0 bg-[#CCFF00]/5 blur-2xl group-hover:bg-[#CCFF00]/10 transition-all rounded-full" />
                            <div className="relative flex items-center bg-[#0a0a0a] border border-white/5 p-2 rounded-2xl focus-within:border-[#CCFF00]/40 transition-all">
                                <div className="pl-6 pr-4">
                                    <Search className="w-5 h-5 text-[#333] group-focus-within:text-[#CCFF00] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search protocols, infrastructure, or billing..."
                                    className="w-full bg-transparent py-4 text-lg focus:outline-none placeholder:text-[#333]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className="hidden md:flex items-center gap-2 pr-4 text-[10px] font-mono text-[#333] uppercase">
                                    <span>Press</span>
                                    <kbd className="px-2 py-1 bg-[#111] border border-white/10 rounded">Enter</kbd>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
                    {CATEGORIES.map((category, idx) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group p-8 bg-[#0a0a0a] border border-white/5 rounded-[32px] hover:border-[#CCFF00]/20 transition-all cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-5 h-5 text-[#CCFF00]" />
                            </div>

                            <div className={`mb-8 p-4 rounded-2xl w-fit transition-colors ${category.color === "#CCFF00" ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 'bg-[#111] text-[#555] group-hover:text-[#CCFF00] group-hover:bg-[#CCFF00]/10'}`}>
                                {category.icon}
                            </div>

                            <h3 className="text-xl font-bold uppercase tracking-wide mb-4 text-[#F2F2F2]">{category.title}</h3>
                            <p className="text-[#555] text-sm leading-relaxed mb-8 group-hover:text-[#888] transition-colors">
                                {category.description}
                            </p>

                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#333] group-hover:text-[#CCFF00] transition-colors">
                                <span>{category.articleCount} Protocols</span>
                                <ChevronRight className="w-3 h-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Sections: Recent & Popular */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">

                    {/* Recent Protocols */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="h-[1px] w-12 bg-[#CCFF00]" />
                            <h2 className="text-2xl font-bold font-['Clash_Display'] uppercase">Recent Protocols</h2>
                        </div>

                        <div className="space-y-4">
                            {RECENT_ARTICLES.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/kb/${article.slug}`}
                                    className="block p-6 bg-[#080808] border border-white/5 rounded-2xl hover:bg-[#0c0c0c] hover:border-[#CCFF00]/20 transition-all group"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center border border-white/5 group-hover:bg-[#CCFF00]/10 group-hover:border-[#CCFF00]/20 transition-all">
                                                <FileText className="w-5 h-5 text-[#333] group-hover:text-[#CCFF00]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#F2F2F2] group-hover:text-[#CCFF00] transition-colors">{article.title}</h4>
                                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#333]">{article.category}</span>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-[#222] group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Support Sidebar Component */}
                    <div>
                        <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-[40px] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <HelpCircle className="w-24 h-24" />
                            </div>

                            <h3 className="text-2xl font-bold font-['Clash_Display'] mb-6 relative z-10">Need Live Help?</h3>
                            <p className="text-[#555] text-sm leading-relaxed mb-10 relative z-10">
                                If you can&apos;t find the protocol you&apos;re looking for, our human engineers are available 24/7.
                            </p>

                            <div className="space-y-4 relative z-10">
                                <Link href="/contact" className="flex items-center justify-between w-full p-5 bg-[#CCFF00] text-black rounded-2xl group/btn hover:scale-[1.02] transition-all">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Open Channel</span>
                                    <MessageSquare className="w-4 h-4" />
                                </Link>
                                <button className="flex items-center justify-between w-full p-5 bg-white/5 text-[#F2F2F2] border border-white/10 rounded-2xl hover:bg-white/10 transition-all">
                                    <span className="text-[10px] font-black uppercase tracking-widest">Live Chat</span>
                                    <Zap className="w-4 h-4 text-[#CCFF00]" />
                                </button>
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#333]">Average Response: 30s</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Disclaimer for KB */}
                <div className="mt-32 p-8 border-t border-white/5 text-center">
                    <p className="text-[#333] text-[9px] uppercase tracking-[0.3em] font-bold">
                        &copy; 2026 WPFYE TECHNOLOGY. ALL OPERATIONAL PROTOCOLS ARE SUBJECT TO THE GOVERNING LAW BLOCK.
                    </p>
                </div>

            </main>

            <Footer />
        </div>
    );
};

// Internal imports fix for the file
import { MessageSquare } from 'lucide-react';

export default KBHub;
