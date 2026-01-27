"use client";

import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Share2, MessageSquare, ChevronRight, FileText, Info } from 'lucide-react';
import Link from 'next/link';

const KBArticle = ({ params }: { params: { slug: string } }) => {
    // Dummy content map for demonstration
    const contentMap: Record<string, any> = {
        "edge-caching-protocols": {
            title: "Configuring Edge Caching Protocols",
            category: "Infrastructure",
            updated: "Jan 24, 2026",
            readTime: "6 min read",
            content: `
                <p>WPFYE utilizes a multi-layer edge caching architecture designed to minimize Time to First Byte (TTFB) on a global scale. By leveraging the Fluid Mesh, content is dynamically cached at the nearest node to the visitor.</p>
                
                <h3>1. Cache Hierarchy</h3>
                <p>Our network uses a three-tier hierarchy:</p>
                <ul>
                    <li><strong>L1 - Browser Cache:</strong> Instructs the client browser via granular headers.</li>
                    <li><strong>L2 - Regional Edge:</strong> High-speed NVMe storage at our 20+ global nodes.</li>
                    <li><strong>L3 - Core Origin:</strong> Persistent storage at our US Central cluster.</li>
                </ul>

                <h3>2. Purge Protocols</h3>
                <p>When you deploy changes, the Fluid Fabric sends a global invalidation signal. This typically clears the entire edge cache in less than 400ms globally.</p>

                <div class="p-6 bg-[#CCFF00]/5 border border-[#CCFF00]/20 rounded-2xl my-8">
                    <p class="text-[#CCFF00] text-sm font-bold flex items-center gap-2 mb-2">
                        <Info class="w-4 h-4" /> Technical Insight
                    </p>
                    <p class="text-sm text-[#888] italic">We recommend setting your Static Asset TTL to 1 year (31536000 seconds) for optimal performance. Our edge handles versioning automatically.</p>
                </div>
            `
        },
        "migration-guide": {
            title: "Zero-Downtime Migration Guide",
            category: "Getting Started",
            updated: "Jan 12, 2026",
            readTime: "10 min read",
            content: `
                <p>Moving your site to WPFYE is a white-glove experience. Our engineers handle the entire transfer to ensure your site never goes offline during the transition.</p>
                
                <h3>Step 1: Protocol Initiation</h3>
                <p>Fill out the Migration Request form in your dashboard. We'll need access to your current hosting provider or a full site backup.</p>

                <h3>Step 2: Staging Synchronization</h3>
                <p>We build a mirror of your site on our Fluid Infrastructure. You'll receive a secure staging URL to verify that everything works perfectly before we proceed.</p>

                <h3>Step 3: The Flip</h3>
                <p>Once you approve, we coordinate the DNS update. Because of our Global Anycast network, users are routed to the new infrastructure almost instantly.</p>
            `
        }
    };

    const article = contentMap[params.slug] || {
        title: "Protocol Documentation",
        category: "General",
        updated: "Jan 20, 2026",
        readTime: "5 min read",
        content: "<p>This protocol documentation is being synchronized from our core intelligence hub. Please check back shortly for full details.</p>"
    };

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            <main className="relative z-10 pt-40 pb-32 px-8 max-w-5xl mx-auto">

                {/* Back to Hub */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link href="/kb" className="inline-flex items-center gap-2 text-[#555] hover:text-[#CCFF00] transition-colors group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-inherit">Back to Intelligence Hub</span>
                    </Link>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Article Content */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest text-[#CCFF00]">
                                    {article.category}
                                </span>
                                <div className="flex items-center gap-2 text-[10px] text-[#333] font-bold uppercase tracking-widest">
                                    <Clock className="w-3 h-3" />
                                    {article.readTime}
                                </div>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold font-['Clash_Display'] leading-[1.1] mb-8">
                                {article.title}
                            </h1>

                            <div className="flex items-center gap-6 mb-16 pb-8 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#111] to-[#222] border border-white/10" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#F2F2F2]">Engineering Team</p>
                                        <p className="text-[9px] text-[#333] uppercase">Last Updated {article.updated}</p>
                                    </div>
                                </div>
                                <button className="ml-auto p-2 hover:bg-white/5 rounded-full transition-all text-[#333] hover:text-[#CCFF00]">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Main Body */}
                            <div
                                className="prose prose-invert prose-headings:font-['Clash_Display'] prose-headings:font-bold prose-p:text-[#888] prose-p:leading-relaxed prose-li:text-[#888] max-w-none
                                           prose-h3:text-2xl prose-h3:text-[#F2F2F2] prose-h3:mt-12 prose-h3:mb-6
                                           prose-strong:text-[#F2F2F2]"
                                dangerouslySetInnerHTML={{ __html: article.content }}
                            />

                            <div className="mt-20 p-10 bg-[#080808] border border-white/5 rounded-3xl text-center">
                                <h4 className="text-xl font-bold mb-4">Did this resolve your inquiry?</h4>
                                <div className="flex items-center justify-center gap-4">
                                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Yes</button>
                                    <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">No</button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar: Related & Actions */}
                    <aside className="lg:w-1/4 space-y-12">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#333] mb-8">Related Protocols</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <h4 className="text-sm font-bold text-[#F2F2F2] group-hover:text-[#CCFF00] transition-colors mb-2">Protocol ADM-Sync-{i}04</h4>
                                        <p className="text-[10px] text-[#555] uppercase tracking-widest">Infrastructure / Cache</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl">
                            <h4 className="text-[#F2F2F2] font-bold text-lg mb-4">Unresolved?</h4>
                            <p className="text-[#555] text-xs leading-relaxed mb-8">
                                If the technical documentation is insufficient, contact our core team.
                            </p>
                            <Link href="/contact" className="flex items-center justify-between w-full p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-[#CCFF00] transition-all group">
                                <span>Support Channel</span>
                                <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </Link>
                        </div>
                    </aside>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default KBArticle;
