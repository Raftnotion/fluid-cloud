"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        question: "Why do you only offer a single plan?",
        answer: "Because luxury shouldn't be complicated. Our single 'Fluid' plan is engineered to scale from zero to millions of visitors without you ever having to click 'upgrade'. You get our best performance from day one, with no artificial limits or tiered features."
    },
    {
        question: "Is this shared hosting? Do I get a dedicated IP?",
        answer: "This is next-gen containerized infrastructure. Unlike shared hosting where neighbors drain your power, your resources are isolated and guaranteed. We use a high-performance shared IP pool—the industry standard for modern cloud scaling—to ensure your site remains agile and protected under our global edge network."
    },
    {
        question: "Do you offer call support?",
        answer: "We prioritize deep technical resolution over hold music. By focusing on Live Chat and Expert Tickets, our senior engineers can analyze logs and share code in real-time. This ensures you're always talking to a specialist who can actually fix your stack, not just a service agent on a phone."
    },
    {
        question: "Is the 'Free Migration' truly zero-downtime?",
        answer: "Every single time. Our experts handle the heavy lifting while you sleep. We setup a staging environment, sync your data, and only flip the switch when performance is 100% verified. Your visitors will never see a flicker."
    },
    {
        question: "How does the '10 Million+' scaling really work?",
        answer: "It's automatic. Our Adaptive Pulse technology detects incoming traffic spikes in milliseconds and auto-injects CPU and RAM. Your site expands organically as your success grows, then contracts when things quiet down—all without you lifting a finger."
    },
    {
        question: "Why don't you offer cPanel?",
        answer: "cPanel is legacy technology that creates unnecessary overhead. To deliver our 'Fluid' autoscaling speed, we've built a custom, lightweight control environment. It’s cleaner, faster, and allows our infrastructure to breathe without the constraints of 20-year-old software."
    },
    {
        question: "Where are your servers located? Do I need a local data center?",
        answer: "Our core clusters are US-based for maximum security and hardware power. However, distance is irrelevant with our built-in Global Edge CDN. With 20+ edge locations—including Tokyo, Singapore, London, and Frankfurt—your site is served from the user's nearest city automatically. No extra setup, no Cloudflare needed."
    }
];

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border-b border-[#222]">
            <button
                onClick={onClick}
                className="w-full py-8 flex items-center justify-between text-left group"
            >
                <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${isOpen ? 'text-[#CCFF00]' : 'text-[#F2F2F2] group-hover:text-[#CCFF00]/70'}`}>
                    {question}
                </h3>
                <div className={`flex-shrink-0 ml-4 p-2 rounded-full border transition-all duration-300 ${isOpen ? 'border-[#CCFF00] bg-[#CCFF00] text-black' : 'border-[#333] text-[#555] group-hover:border-[#555]'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-[#888] text-lg leading-relaxed max-w-4xl">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="w-full py-32 px-8 bg-[#050505]">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-black mb-4 block">Common Inquiries</span>
                    <h2 className="text-5xl md:text-6xl font-bold text-[#F2F2F2] font-['Clash_Display'] leading-none">
                        Questions? <br />
                        <span className="text-[#333]">Answers.</span>
                    </h2>
                </div>

                <div className="flex flex-col">
                    {FAQS.map((faq, idx) => (
                        <FAQItem
                            key={idx}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === idx}
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        />
                    ))}
                </div>

                <div className="mt-16 p-8 bg-[#0a0a0a] border border-[#111] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
                    <div>
                        <h4 className="text-[#F2F2F2] font-bold text-xl mb-1">Still have questions?</h4>
                        <p className="text-[#555]">Our engineers are standing by 24/7 to help you out.</p>
                    </div>
                    <button className="px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform">
                        Chat With Us
                    </button>
                </div>
            </div>
        </section>
    );
}
