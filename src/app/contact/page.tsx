"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, ShieldCheck, Globe, Building2, Fingerprint, MessageCircle, Ticket, PlaneTakeoff, BookOpen, ArrowRight } from 'lucide-react';

const ContactPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const SUPPORT_CHANNELS = [
        {
            icon: <MessageCircle className="w-5 h-5 text-[#CCFF00]" />,
            title: "24/7 Live Chat",
            description: "Instant response times from human engineers.",
            badge: "Avg: 30s",
            cta: "Start Chat"
        },
        {
            icon: <Ticket className="w-5 h-5 text-[#CCFF00]" />,
            title: "Expert Tickets",
            description: "Deep technical assistance for complex setups.",
            badge: "24/7 Live",
            cta: "Open Ticket"
        },
        {
            icon: <PlaneTakeoff className="w-5 h-5 text-[#CCFF00]" />,
            title: "Free Migration",
            description: "Zero-downtime white-glove migration services.",
            badge: "Free",
            cta: "Request Move"
        },
        {
            icon: <BookOpen className="w-5 h-5 text-[#CCFF00]" />,
            title: "Knowledgebase",
            description: "Documentation and architectural best practices.",
            badge: "Docs",
            cta: "Browse"
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            alert("Inquiry received. Our protocols will respond shortly.");
            setIsSubmitting(false);
            setFormState({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-40 pb-32 px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Left Sidebar: Contact Info & Corporate HQ */}
                    <aside className="lg:w-1/3 flex flex-col gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-12 bg-[#CCFF00]" />
                                <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-medium font-['Satoshi']">Communication Hub</span>
                            </div>
                            <h1 className="text-6xl md:text-7xl font-bold font-['Clash_Display'] leading-none text-[#F2F2F2] mb-8">
                                Get In <br />
                                <span className="text-white/20">Touch.</span>
                            </h1>
                            <p className="text-[#888] text-lg max-w-sm leading-relaxed mb-12">
                                For deployment inquiries, infrastructure support, or corporate partnerships, reach out to our global edge team.
                            </p>
                        </motion.div>

                        <div className="space-y-8">
                            {/* Contact Method */}
                            <div className="group p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-[#CCFF00]/20 transition-all duration-500">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#111] flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                        <Mail className="w-5 h-5 text-[#CCFF00]" />
                                    </div>
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-[#F2F2F2]">Direct Email</h3>
                                </div>
                                <a href="mailto:hello@wpfye.com" className="text-[#888] hover:text-[#CCFF00] transition-colors text-lg font-medium">
                                    hello@wpfye.com
                                </a>
                            </div>

                            {/* Corporate HQ Block */}
                            <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Building2 className="w-24 h-24" />
                                </div>
                                <h3 className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-medium font-['Satoshi'] mb-6">Corporate Headquarters</h3>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin className="w-5 h-5 text-[#333] shrink-0" />
                                        <p className="text-[#F2F2F2]/80 text-sm leading-relaxed">
                                            HD-105 WeWork Cinnabar Hills,<br />
                                            Embassy Golf Links Business Park,<br />
                                            Challaghatta, Bengaluru, KA 560071
                                        </p>
                                    </div>

                                    <div className="pt-6 border-t border-white/5 grid grid-cols-1 gap-4 font-mono text-[10px] text-[#555] uppercase tracking-widest">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[#333]">Company ID (CIN)</span>
                                            <span className="text-[#888] selection:bg-[#CCFF00] selection:text-black">U63112KA2024OPC193341</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[#333]">Tax ID (GSTIN)</span>
                                            <span className="text-[#888]">29AADCW9345A1Z7</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Side: Contact Form */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="p-8 md:p-12 bg-[#080808] border border-[#111] rounded-[32px] relative shadow-2xl"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#CCFF00]/50 to-transparent" />

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold px-1">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] focus:outline-none focus:border-[#CCFF00]/40 transition-all placeholder:text-[#333]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold px-1">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            placeholder="john@company.com"
                                            className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] focus:outline-none focus:border-[#CCFF00]/40 transition-all placeholder:text-[#333]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold px-1">Subject</label>
                                    <input
                                        type="text"
                                        required
                                        value={formState.subject}
                                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                        placeholder="Infrastructure Inquiry"
                                        className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] focus:outline-none focus:border-[#CCFF00]/40 transition-all placeholder:text-[#333]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#555] font-bold px-1">Message</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="Tell us about your project requirements..."
                                        className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] focus:outline-none focus:border-[#CCFF00]/40 transition-all placeholder:text-[#333] resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Transmitting Data...' : 'Dispatch Message'}
                                    <Send className="w-4 h-4" />
                                </button>

                                <div className="pt-6 flex items-center justify-center gap-6 text-[#333]">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span className="text-[10px] uppercase tracking-widest">Secure TLS 1.3</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-[10px] uppercase tracking-widest">Global Edge Nodes</span>
                                    </div>
                                </div>
                            </form>
                        </motion.div>

                        <div className="mt-12 flex items-center gap-4 text-[#333]">
                            <div className="h-[1px] flex-1 bg-[#111]" />
                            <span className="text-white/10 text-[10px] uppercase tracking-[0.5em] font-medium italic">End of Ingress Channel</span>
                            <div className="h-[1px] w-12 bg-[#111]" />
                        </div>
                    </div>
                </div>

                {/* Unified Support Channels Grid */}
                <div className="mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-12 bg-[#CCFF00]" />
                                <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-medium font-['Satoshi']">Operational Channels</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#F2F2F2] font-['Clash_Display']">
                                Support <span className="text-white/20">Protocols.</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-3 bg-[#111] border border-[#222] rounded-full">
                            <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#F2F2F2]">Engineers Online</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {SUPPORT_CHANNELS.map((channel, idx) => (
                            <motion.div
                                key={channel.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                className="group p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl hover:border-[#CCFF00]/20 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-[#333] group-hover:text-[#CCFF00] transition-colors">
                                        {channel.badge}
                                    </span>
                                </div>
                                <div className="mb-6 p-3 bg-[#111] rounded-xl w-fit group-hover:bg-[#CCFF00]/10 transition-colors">
                                    {channel.icon}
                                </div>
                                <h3 className="text-lg font-bold text-[#F2F2F2] mb-3 uppercase tracking-wide">{channel.title}</h3>
                                <p className="text-[#555] text-sm leading-relaxed mb-8 group-hover:text-[#888] transition-colors">
                                    {channel.description}
                                </p>
                                <button className="flex items-center justify-between w-full px-4 py-3 bg-[#111] border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] text-[#F2F2F2] group-hover:border-[#CCFF00]/40 transition-all">
                                    <span>{channel.cta}</span>
                                    <ArrowRight className="w-3 h-3 text-[#333] group-hover:text-[#CCFF00] group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
