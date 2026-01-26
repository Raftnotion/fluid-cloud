"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Ticket, PlaneTakeoff, ShieldCheck } from 'lucide-react';

const FEATURES = [
    {
        icon: <MessageCircle className="w-8 h-8 text-[#CCFF00]" />,
        title: "24/7 Live Chat",
        description: "Instant response times from human engineers who understand your infrastructure.",
        badge: "Average wait: 30s"
    },
    {
        icon: <Ticket className="w-8 h-8 text-[#CCFF00]" />,
        title: "Expert Ticket Support",
        description: "Deep technical assistance for complex architectural inquiries, available around the clock.",
        badge: "24/7 Coverage"
    },
    {
        icon: <PlaneTakeoff className="w-8 h-8 text-[#CCFF00]" />,
        title: "Free Migration",
        description: "Zero-downtime white-glove migration. We move your entire stack while you sleep.",
        badge: "Included Free"
    }
];

export default function SupportGrid() {
    return (
        <section className="w-full py-24 px-8 bg-[#050505] border-t border-[#111]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
                    <div className="max-w-2xl">
                        <h2 className="text-4xl md:text-6xl font-bold text-[#F2F2F2] mb-6 tracking-[-0.04em] leading-[0.9]">
                            Human Intelligence. <br />
                            <span className="text-[#CCFF00]">Always Online.</span>
                        </h2>
                        <p className="text-[#888] text-lg md:text-xl leading-relaxed max-w-xl">
                            We don't believe in support bots. Every interaction is with a senior infrastructure engineer focused on your uptime.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 px-6 py-3 bg-[#111] border border-[#222] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse shadow-[0_0_10px_#CCFF00]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F2F2F2]">Global Network Operational</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {FEATURES.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group p-10 bg-[#0a0a0a] border border-[#222] rounded-[2rem] hover:border-[#CCFF00]/20 hover:bg-[#0c0c0c] transition-all duration-500 relative overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 right-0 p-6">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#444] group-hover:text-[#CCFF00] transition-colors">
                                    {feature.badge}
                                </span>
                            </div>

                            <div className="mb-8 p-5 bg-[#111] rounded-2xl w-fit group-hover:bg-[#CCFF00]/10 transition-all duration-500">
                                {feature.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-[#F2F2F2] mb-4 group-hover:text-[#CCFF00] transition-colors uppercase tracking-[-0.02em]">
                                {feature.title}
                            </h3>
                            <p className="text-[#888] text-base leading-loose font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
