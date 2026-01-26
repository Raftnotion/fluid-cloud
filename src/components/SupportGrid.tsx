"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Ticket, PlaneTakeoff, BookOpen, Mail, Activity, ArrowRight } from 'lucide-react';

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
        cta: "Browse Docs"
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
        <section className="w-full py-24 px-8 bg-[#050505] border-t border-[#111]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#F2F2F2] mb-4">
                            Human Intelligence. <br />
                            <span className="text-[#CCFF00]">Always Online.</span>
                        </h2>
                        <p className="text-[#888] text-lg">
                            We don't believe in support bots. Every interaction is with a senior infrastructure engineer focused on your uptime.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-[#111] border border-[#222] rounded-full">
                        <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#F2F2F2]">Global Network Operational</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                            <button className="mt-auto flex items-center justify-between w-full px-5 py-3 bg-[#111] border border-[#222] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-[#F2F2F2] group-hover:border-[#CCFF00]/40 transition-all duration-300">
                                <span>{feature.cta}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#555] group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
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
