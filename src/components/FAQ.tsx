"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Cpu, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

const CATEGORIES = [
    { id: 'philosophy', label: 'Core Philosophy', icon: Zap },
    { id: 'tech', label: 'Technical Supremacy', icon: Cpu },
];

const FAQS = [
    {
        category: 'philosophy',
        question: "Why do you only offer a single plan?",
        answer: "Because **luxury shouldn't be complicated**. Our single 'Fluid' plan is engineered to scale from zero to millions of visitors without you ever having to click 'upgrade'. You get our **best performance from day one**, with no artificial limits or tiered features."
    },
    {
        category: 'tech',
        question: "Is this shared hosting? Do I get a dedicated IP?",
        answer: "This is **next-gen containerized infrastructure**. Unlike shared hosting where neighbors drain your power, your **resources are isolated and guaranteed**. We use a high-performance shared IP pool—the industry standard for modern cloud scaling—to ensure your site remains agile and protected under our **global edge network**."
    },
    {
        category: 'philosophy',
        question: "Do you offer call support?",
        answer: "We prioritize **deep technical resolution** over hold music. By focusing on Live Chat and Expert Tickets, our senior engineers can analyze logs and share code in real-time. This ensures you're always talking to a **specialist who can actually fix your stack**, not just a service agent on a phone."
    },
    {
        category: 'tech',
        question: "Is the 'Free Migration' truly zero-downtime?",
        answer: "Every single time. Our experts handle the heavy lifting while you sleep. We setup a **staging environment**, sync your data, and only flip the switch when performance is **100% verified**. Your visitors will never see a flicker."
    },
    {
        category: 'tech',
        question: "How does the '10 Million+' scaling really work?",
        answer: "It's automatic. Our **Adaptive Pulse technology** detects incoming traffic spikes in milliseconds and auto-injects CPU and RAM. Your site **expands organically** as your success grows, then contracts when things quiet down—all without you lifting a finger."
    },
    {
        category: 'tech',
        question: "Why don't you offer cPanel?",
        answer: "cPanel is **legacy technology** that creates unnecessary overhead. To deliver our 'Fluid' autoscaling speed, we've built a **custom, lightweight control environment**. It’s cleaner, faster, and allows our infrastructure to breathe without the constraints of 20-year-old software."
    },
    {
        category: 'tech',
        question: "Where are your servers located?",
        answer: "Our core clusters are US-based for **maximum security and hardware power**. However, distance is irrelevant with our **built-in Global Edge CDN**. With 20+ edge locations—including Tokyo, Singapore, London, and Frankfurt—your site is served from the **user's nearest city automatically**."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    // Basic bolding logic for demonstration - in production you might use a markdown parser
    const formattedAnswer = answer.split('**').map((part, i) =>
        i % 2 === 1 ? <strong key={i} className="text-[#F2F2F2] font-bold">{part}</strong> : part
    );

    return (
        <div className={`group transition-all duration-500 border-b border-[#1a1a1a] ${isOpen ? 'bg-[#CCFF00]/[0.02]' : ''}`}>
            <button
                onClick={onClick}
                className="w-full py-8 flex items-center justify-between text-left"
            >
                <h3 className={`text-xl md:text-2xl font-bold transition-all duration-300 ${isOpen ? 'text-[#CCFF00] translate-x-2' : 'text-[#F2F2F2] group-hover:text-[#CCFF00]/70'}`}>
                    {question}
                </h3>
                <div className={`flex-shrink-0 ml-4 p-2 rounded-full border transition-all duration-500 ${isOpen ? 'border-[#CCFF00] bg-[#CCFF00] text-black rotate-180' : 'border-[#222] text-[#555] group-hover:border-[#CCFF00]/50'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 pl-2 text-[#888] text-lg leading-relaxed max-w-4xl">
                            {formattedAnswer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FAQ() {
    const [activeCategory, setActiveCategory] = useState('philosophy');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const filteredFaqs = FAQS.filter(f => f.category === activeCategory);

    return (
        <section id="faq" className="w-full py-40 px-8 bg-[#050505] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 -right-1/4 w-[500px] h-[500px] bg-[#CCFF00]/[0.03] rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                    <div className="max-w-2xl">
                        <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.5em] font-black mb-4 block">Knowledge Base</span>
                        <h2 className="text-6xl md:text-7xl font-bold text-[#F2F2F2] font-['Clash_Display'] leading-[0.9]">
                            Questions? <br />
                            <span className="bg-gradient-to-r from-[#222] to-[#444] bg-clip-text text-transparent italic">Sorted.</span>
                        </h2>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex bg-[#111] p-1.5 rounded-2xl border border-[#222]">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setOpenIndex(null);
                                }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${activeCategory === cat.id ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.3)]' : 'text-[#555] hover:text-[#888]'}`}
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col border-t border-[#1a1a1a]">
                    {filteredFaqs.map((faq, idx) => (
                        <FAQItem
                            key={`${activeCategory}-${idx}`}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === idx}
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        />
                    ))}
                </div>

                <div className="mt-20 p-10 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-[#1a1a1a] rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-10 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/5 blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:bg-[#CCFF00]/10 transition-colors duration-500" />

                    <div className="relative z-10 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-[#111] flex items-center justify-center">
                                        <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest">Live Support Active</span>
                        </div>
                        <h4 className="text-[#F2F2F2] font-bold text-3xl mb-2 font-['Clash_Display']">Still have questions?</h4>
                        <p className="text-[#666] text-lg max-w-md">Our senior cloud engineers are standing by 24/7 to solve your technical blocks.</p>
                    </div>

                    <button className="relative z-10 flex items-center gap-3 px-10 py-5 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(204,255,0,0.2)] hover:shadow-[0_15px_60px_rgba(204,255,0,0.4)]">
                        <MessageSquare className="w-5 h-5" />
                        Initiate Chat
                    </button>
                </div>
            </div>
        </section>
    );
}
