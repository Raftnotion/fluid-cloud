"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Ticket, PlaneTakeoff, BookOpen, Mail, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FEATURES = [
    {
        icon: <MessageCircle className="w-8 h-8 text-[#CCFF00]" />,
        title: "24/7 Live Chat",
        description: "Instant response times from human engineers who understand your infrastructure.",
        badge: "Average wait: 30s",
        cta: "Start Chat"
    },
    {
        icon: <Ticket className="w-8 h-8 text-[#CCFF00]" />,
        title: "Expert Ticket Support",
        description: "Deep technical assistance for complex architectural inquiries, available around the clock.",
        badge: "24/7 Coverage",
        cta: "Open Ticket"
    },
    {
        icon: <PlaneTakeoff className="w-8 h-8 text-[#CCFF00]" />,
        title: "Free Migration",
        description: "Zero-downtime white-glove migration. We move your entire stack while you sleep.",
        badge: "Included Free",
        cta: "Request Move"
    },
    {
        icon: <BookOpen className="w-8 h-8 text-[#CCFF00]" />,
        title: "Knowledgebase",
        description: "Deep documentation, tutorials, and architectural best practices at your fingertips.",
        badge: "Self-Service",
        cta: "Browse Docs",
        link: "/kb"
    },
    {
        icon: <Mail className="w-8 h-8 text-[#CCFF00]" />,
        title: "Email Support",
        description: "For less urgent inquiries, our team provides detailed responses via direct mail.",
        badge: "24h Response",
        cta: "Send Email"
    }
];

export default function SupportGrid() {
    return (
        <section id="support" className="w-full py-16 md:py-24 px-4 md:px-8 bg-[#050505] border-t border-[#111]">
            <div className="max-w-7xl mx-auto">
                {/* Header - Mobile Optimized */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4 md:gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-[#F2F2F2] mb-3 md:mb-4">
                            Human Intelligence.<br />
                            <span className="text-[#CCFF00]">Always Online.</span>
                        </h2>
                        <p className="text-[#888] text-sm md:text-lg">
                            No support bots. Every interaction is with a senior infrastructure engineer.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-[#111] border border-[#222] rounded-full">
                        <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-wider md:tracking-widest text-[#F2F2F2]">Network Operational</span>
                    </div>
                </div>

                {/* Mobile: Horizontal Scroll Cards */}
                <div className="md:hidden">
                    {/* Primary Features - Swipeable */}
                    <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
                        {FEATURES.slice(0, 3).map((feature, idx) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="flex-shrink-0 w-[80vw] snap-center p-5 bg-[#0a0a0a] border border-[#222] rounded-2xl"
                            >
                                {/* Icon + Badge Row */}
                                <div className="flex items-center justify-between mb-3">
                                    <div className="p-2.5 bg-[#111] rounded-xl">
                                        {React.cloneElement(feature.icon, { className: "w-6 h-6 text-[#CCFF00]" })}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-wider text-[#CCFF00] bg-[#CCFF00]/10 px-2.5 py-1 rounded-full">
                                        {feature.badge}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-base font-bold text-[#F2F2F2] uppercase tracking-wide mb-2">
                                    {feature.title}
                                </h3>

                                <p className="text-[#888] text-sm leading-relaxed mb-4">
                                    {feature.description}
                                </p>

                                <Link
                                    href={feature.link || "/contact"}
                                    className="flex items-center justify-between w-full px-4 py-2.5 bg-[#111] border border-[#222] rounded-xl text-[11px] font-black uppercase tracking-wider text-[#F2F2F2] active:scale-[0.98]"
                                >
                                    <span>{feature.cta}</span>
                                    <ArrowRight className="w-3 h-3 text-[#CCFF00]" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Secondary Features - 2 Column Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {FEATURES.slice(3).map((feature) => (
                            <Link
                                key={feature.title}
                                href={feature.link || "/contact"}
                                className="p-4 bg-[#0a0a0a] border border-[#222] rounded-2xl active:border-[#CCFF00]/30"
                            >
                                <div className="p-2 bg-[#111] rounded-lg w-fit mb-3">
                                    {React.cloneElement(feature.icon, { className: "w-5 h-5 text-[#CCFF00]" })}
                                </div>
                                <h3 className="text-sm font-bold text-[#F2F2F2] mb-1">{feature.title}</h3>
                                <span className="text-[10px] font-bold text-[#CCFF00] uppercase">{feature.badge}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Visual Card - Compact */}
                    <div className="relative h-48 rounded-2xl overflow-hidden border border-[#222]">
                        <img
                            src="/images/support-visual.png"
                            alt="Monitoring"
                            className="absolute inset-0 w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-5 w-full">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-wider text-[#CCFF00]">Live Monitoring</span>
                            </div>
                            <h3 className="text-lg font-bold text-[#F2F2F2] uppercase">Proactive Guard</h3>
                            <p className="text-[#888] text-xs">24/7 scanning for zero-day vulnerabilities.</p>
                        </div>
                    </div>
                </div>

                {/* Desktop: Original Grid */}
                <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group p-8 bg-[#0a0a0a] border border-[#222] rounded-3xl hover:border-[#CCFF00]/30 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#555] group-hover:text-[#CCFF00] transition-colors">
                                    {feature.badge}
                                </span>
                            </div>

                            <div className="mb-6 p-4 bg-[#111] rounded-2xl w-fit group-hover:bg-[#CCFF00]/10 transition-colors">
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold text-[#F2F2F2] mb-3 group-hover:text-[#CCFF00] transition-colors uppercase tracking-wide">
                                {feature.title}
                            </h3>
                            <p className="text-[#888] leading-relaxed mb-8">
                                {feature.description}
                            </p>

                            <Link
                                href={feature.link || "/contact"}
                                className="mt-auto flex items-center justify-between w-full px-5 py-3 bg-[#111] border border-[#222] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-[#F2F2F2] group-hover:border-[#CCFF00]/40 transition-all duration-300"
                            >
                                <span>{feature.cta}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#555] group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>
                        </motion.div>
                    ))}

                    {/* 6th Visual Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="group relative min-h-[300px] md:min-h-full rounded-3xl overflow-hidden border border-[#222] hover:border-[#CCFF00]/30 transition-all duration-300"
                    >
                        <img
                            src="/images/support-visual.png"
                            alt="Monitoring"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                        <div className="absolute bottom-0 left-0 p-8 w-full">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#CCFF00]">Live Monitoring</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[#F2F2F2] uppercase tracking-wide mb-2">Proactive Guard</h3>
                            <p className="text-[#888] text-sm leading-relaxed max-w-[240px]">
                                Automated systems scanning your stack 24/7 for zero-day vulnerabilities.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
