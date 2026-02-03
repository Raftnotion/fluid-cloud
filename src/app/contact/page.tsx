"use client";

import React, { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, ShieldCheck, Globe, Building2, MessageCircle, Ticket, PlaneTakeoff, BookOpen, ArrowRight, Phone, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

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

const ContactPage = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isHQExpanded, setIsHQExpanded] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormState({ name: '', email: '', subject: '', message: '' });
            // Reset success after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
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

            <main className="relative z-10 pt-24 md:pt-40 pb-32 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto">

                {/* Mobile: Form First, Info Below | Desktop: Side by Side */}
                <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-20">

                    {/* Left Sidebar: Contact Info & Corporate HQ */}
                    <aside className="lg:w-1/3 flex flex-col gap-6">

                        {/* Header - Hidden on mobile, shown on desktop */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:block"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-12 bg-[#CCFF00]" />
                                <span className="text-[#CCFF00] text-[11px] uppercase tracking-[0.3em] font-bold font-['Satoshi']">Communication Hub</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-bold font-['Clash_Display'] leading-none text-[#F2F2F2] mb-4 md:mb-8">
                                Get In <br />
                                <span className="text-white/20">Touch.</span>
                            </h1>
                            <p className="text-[#888] text-sm md:text-lg max-w-sm leading-relaxed mb-8">
                                For deployment inquiries, infrastructure support, or corporate partnerships.
                            </p>
                        </motion.div>

                        {/* Quick Action Chips - Tap to Call/Email */}
                        <div className="flex flex-col gap-3">
                            <a
                                href="mailto:hello@wpfye.com"
                                className="flex items-center gap-4 p-4 bg-[#0a0a0a] border border-white/5 rounded-2xl active:scale-[0.98] active:bg-[#0c0c0c] hover:border-[#CCFF00]/20 transition-all duration-200"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-[#CCFF00]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[11px] uppercase tracking-wider text-[#666] font-bold">Email Us</p>
                                    <p className="text-base font-medium text-[#F2F2F2]">hello@wpfye.com</p>
                                </div>
                                <ArrowRight className="w-4 h-4 text-[#333]" />
                            </a>


                        </div>

                        {/* Corporate HQ Block - Always Visible for Trust */}
                        <div className="p-4 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                                    <Building2 className="w-4 h-4 text-[#CCFF00]" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#F2F2F2]">Corporate Headquarters</p>
                                    <p className="text-[11px] text-[#555]">Verified Business Entity</p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <MapPin className="w-4 h-4 text-[#444] shrink-0 mt-0.5" />
                                    <p className="text-[#888] text-sm leading-relaxed">
                                        HD-105 WeWork Cinnabar Hills,<br />
                                        Embassy Golf Links Business Park,<br />
                                        Challaghatta, Bengaluru, KA 560071
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-2 font-mono text-[11px] text-[#666] bg-[#080808] rounded-xl p-3">
                                    <div className="flex justify-between">
                                        <span className="text-[#444]">CIN</span>
                                        <span className="text-[#888]">U63112KA2024OPC193341</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#444]">GSTIN</span>
                                        <span className="text-[#888]">29AADCW9345A1Z7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Side: Contact Form - Shows First on Mobile */}
                    <div className="flex-1">
                        {/* Mobile Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:hidden mb-6"
                        >
                            <h1 className="text-3xl font-bold font-['Clash_Display'] leading-none text-[#F2F2F2] mb-2">
                                Get In Touch
                            </h1>
                            <p className="text-[#666] text-sm">
                                Send us a message and we'll respond within hours.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="p-5 md:p-12 bg-[#080808] border border-[#111] rounded-2xl md:rounded-[32px] relative shadow-2xl"
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#CCFF00]/50 to-transparent" />

                            {/* Success State */}
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="py-16 flex flex-col items-center justify-center text-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.1 }}
                                            className="w-16 h-16 rounded-full bg-[#CCFF00]/10 flex items-center justify-center mb-6"
                                        >
                                            <CheckCircle2 className="w-8 h-8 text-[#CCFF00]" />
                                        </motion.div>
                                        <h3 className="text-xl font-bold text-[#F2F2F2] mb-2">Message Sent!</h3>
                                        <p className="text-[#666] text-sm">We'll get back to you within a few hours.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            {/* Name Input - iOS Style */}
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold px-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formState.name}
                                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] text-base
                                                             focus:outline-none focus:border-[#CCFF00]/40 focus:ring-2 focus:ring-[#CCFF00]/10 focus:scale-[1.01]
                                                             transition-all duration-200 placeholder:text-[#333]"
                                                />
                                            </div>
                                            {/* Email Input */}
                                            <div className="space-y-2">
                                                <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold px-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formState.email}
                                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                    placeholder="john@company.com"
                                                    className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] text-base
                                                             focus:outline-none focus:border-[#CCFF00]/40 focus:ring-2 focus:ring-[#CCFF00]/10 focus:scale-[1.01]
                                                             transition-all duration-200 placeholder:text-[#333]"
                                                />
                                            </div>
                                        </div>

                                        {/* Subject Input */}
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold px-1">Subject</label>
                                            <input
                                                type="text"
                                                required
                                                value={formState.subject}
                                                onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                                placeholder="Infrastructure Inquiry"
                                                className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] text-base
                                                         focus:outline-none focus:border-[#CCFF00]/40 focus:ring-2 focus:ring-[#CCFF00]/10 focus:scale-[1.01]
                                                         transition-all duration-200 placeholder:text-[#333]"
                                            />
                                        </div>

                                        {/* Message Textarea */}
                                        <div className="space-y-2">
                                            <label className="text-[11px] uppercase tracking-wider text-[#666] font-bold px-1">Message</label>
                                            <textarea
                                                required
                                                rows={5}
                                                value={formState.message}
                                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                                placeholder="Tell us about your project..."
                                                className="w-full bg-[#0d0d0d] border border-white/5 rounded-xl px-4 py-4 text-[#F2F2F2] text-base
                                                         focus:outline-none focus:border-[#CCFF00]/40 focus:ring-2 focus:ring-[#CCFF00]/10
                                                         transition-all duration-200 placeholder:text-[#333] resize-none"
                                            />
                                        </div>

                                        {/* Submit Button with Loading State */}
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-[#CCFF00] text-black font-bold uppercase tracking-wider text-sm rounded-xl 
                                                     hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 
                                                     flex items-center justify-center gap-3 disabled:opacity-70 disabled:scale-100
                                                     shadow-[0_0_20px_rgba(204,255,0,0.15)]"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send className="w-4 h-4" />
                                                </>
                                            )}
                                        </button>

                                        {/* Security Badges */}
                                        <div className="pt-4 flex items-center justify-center gap-6 text-[#444]">
                                            <div className="flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" />
                                                <span className="text-[11px] uppercase tracking-wider">TLS 1.3</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                <span className="text-[11px] uppercase tracking-wider">Edge Network</span>
                                            </div>
                                        </div>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>

                {/* Support Channels Grid */}
                <div className="mt-16 md:mt-32">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-16 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-[1px] w-8 bg-[#CCFF00]" />
                                <span className="text-[#CCFF00] text-[11px] uppercase tracking-[0.2em] font-bold">Operational Channels</span>
                            </div>
                            <h2 className="text-2xl md:text-5xl font-bold text-[#F2F2F2] font-['Clash_Display']">
                                Support <span className="text-white/20">Protocols.</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#222] rounded-full">
                            <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F2F2F2]">Engineers Online</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                        {SUPPORT_CHANNELS.map((channel, idx) => (
                            <motion.div
                                key={channel.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                className="group p-4 md:p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl active:scale-[0.98] active:bg-[#0c0c0c] hover:border-[#CCFF00]/20 transition-all duration-200 relative overflow-hidden cursor-pointer"
                            >
                                {/* Badge */}
                                <div className="absolute top-2 right-2 md:top-3 md:right-3">
                                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#CCFF00]/10 text-[#CCFF00] rounded-full">
                                        {channel.badge}
                                    </span>
                                </div>

                                {/* Icon */}
                                <div className="mb-3 md:mb-4 p-2.5 md:p-3 bg-[#111] rounded-xl w-fit group-hover:bg-[#CCFF00]/10 transition-colors">
                                    {channel.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xs md:text-base font-bold text-[#F2F2F2] mb-1 md:mb-2">{channel.title}</h3>

                                {/* Description - Hidden on mobile */}
                                <p className="hidden md:block text-[#555] text-sm leading-relaxed mb-4 group-hover:text-[#888] transition-colors">
                                    {channel.description}
                                </p>

                                {/* CTA Arrow - Always visible */}
                                <div className="flex items-center gap-1 text-[#444] group-hover:text-[#CCFF00] mt-2 md:mt-0">
                                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider">{channel.cta}</span>
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Floating Chat Button - Mobile Only */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", damping: 10 }}
                className="md:hidden fixed bottom-6 right-4 w-14 h-14 bg-[#CCFF00] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.3)] active:scale-95 transition-transform z-50"
                style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
                <MessageCircle className="w-6 h-6 text-black" />
            </motion.button>

            <Footer />
        </div>
    );
};

export default ContactPage;
