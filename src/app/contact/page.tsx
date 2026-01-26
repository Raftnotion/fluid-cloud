"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Clock, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
    };

    return (
        <div className="relative min-h-screen bg-[#050505] selection:bg-[#CCFF00] selection:text-black">
            <Header />

            <main className="relative z-10 pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-8">
                    {/* Back Link */}
                    <Link href="/" className="inline-flex items-center gap-2 text-[#888] hover:text-[#CCFF00] transition-colors mb-12 group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left Side - Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-black mb-6 block">
                                Get In Touch
                            </span>
                            <h1 className="text-5xl md:text-7xl font-bold text-[#F2F2F2] font-['Clash_Display'] leading-[0.9] mb-8">
                                Let's Build <br />
                                <span className="text-[#333]">Something Great.</span>
                            </h1>
                            <p className="text-[#888] text-lg leading-relaxed mb-12 max-w-md">
                                Have questions about our infrastructure? Need a custom solution? Our engineering team is ready to help you scale.
                            </p>

                            {/* Contact Info Cards */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl group hover:border-[#CCFF00]/30 transition-colors">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[#111] border border-[#222] rounded-xl group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/5 transition-all">
                                        <Mail className="w-5 h-5 text-[#888] group-hover:text-[#CCFF00] transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Email Us</p>
                                        <p className="text-[#F2F2F2] font-bold">support@wpfye.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl group hover:border-[#CCFF00]/30 transition-colors">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[#111] border border-[#222] rounded-xl group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/5 transition-all">
                                        <MessageSquare className="w-5 h-5 text-[#888] group-hover:text-[#CCFF00] transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Live Chat</p>
                                        <p className="text-[#F2F2F2] font-bold">24/7 Available</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-6 bg-[#0a0a0a] border border-[#222] rounded-2xl group hover:border-[#CCFF00]/30 transition-colors">
                                    <div className="w-12 h-12 flex items-center justify-center bg-[#111] border border-[#222] rounded-xl group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/5 transition-all">
                                        <Clock className="w-5 h-5 text-[#888] group-hover:text-[#CCFF00] transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[#555] text-xs uppercase tracking-widest mb-1">Response Time</p>
                                        <p className="text-[#F2F2F2] font-bold">Under 30 minutes</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="p-[1px] bg-gradient-to-br from-[#333] via-[#1a1a1a] to-[#333] rounded-3xl">
                                <div className="p-10 bg-[#0a0a0a] rounded-3xl">
                                    {submitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-16"
                                        >
                                            <div className="w-20 h-20 mx-auto mb-6 bg-[#CCFF00]/10 rounded-full flex items-center justify-center">
                                                <Send className="w-8 h-8 text-[#CCFF00]" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-[#F2F2F2] mb-2">Message Sent!</h3>
                                            <p className="text-[#888]">We'll get back to you within 30 minutes.</p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-[#555] text-xs uppercase tracking-widest mb-3 font-bold">
                                                    Your Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-[#F2F2F2] placeholder-[#444] focus:border-[#CCFF00] focus:outline-none transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[#555] text-xs uppercase tracking-widest mb-3 font-bold">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-[#F2F2F2] placeholder-[#444] focus:border-[#CCFF00] focus:outline-none transition-colors"
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[#555] text-xs uppercase tracking-widest mb-3 font-bold">
                                                    Subject
                                                </label>
                                                <select
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-[#F2F2F2] focus:border-[#CCFF00] focus:outline-none transition-colors appearance-none cursor-pointer"
                                                >
                                                    <option value="" className="bg-[#111]">Select a topic...</option>
                                                    <option value="sales" className="bg-[#111]">Sales Inquiry</option>
                                                    <option value="support" className="bg-[#111]">Technical Support</option>
                                                    <option value="billing" className="bg-[#111]">Billing Question</option>
                                                    <option value="partnership" className="bg-[#111]">Partnership</option>
                                                    <option value="other" className="bg-[#111]">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[#555] text-xs uppercase tracking-widest mb-3 font-bold">
                                                    Message
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={5}
                                                    className="w-full px-5 py-4 bg-[#111] border border-[#222] rounded-xl text-[#F2F2F2] placeholder-[#444] focus:border-[#CCFF00] focus:outline-none transition-colors resize-none"
                                                    placeholder="Tell us about your project..."
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full py-5 bg-[#CCFF00] text-black font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#b8e600] transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(204,255,0,0.2)]"
                                            >
                                                {isSubmitting ? (
                                                    <span>Sending...</span>
                                                ) : (
                                                    <>
                                                        <span>Send Message</span>
                                                        <Send className="w-4 h-4" />
                                                    </>
                                                )}
                                            </motion.button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
