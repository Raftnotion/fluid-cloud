"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    {
        question: "How does the autoscaling actually work?",
        answer: "Our system monitors your CPU and RAM usage every millisecond. When it detects a spike, it instantly injects additional resources into your container. You don't have to click anything; it's completely 'fluid'."
    },
    {
        question: "Is the 'Free Migration' truly zero-downtime?",
        answer: "Yes. Our migration experts setup a staging environment first, sync your data, and only when everything is perfect do we flip the DNS. Your visitors won't notice a thing."
    },
    {
        question: "What happens if I need help at 3 AM?",
        answer: "We don't go to sleep. Our senior engineers are available 24/7/365 via live chat and tickets. You'll always talk to a human, never a bot."
    },
    {
        question: "Can I upgrade or downgrade my plan later?",
        answer: "Of course. Fluid Cloud is built for flexibility. You can adjust your plan or commitment period anytime through your dashboard with pro-rated adjustments."
    },
    {
        question: "What kind of hardware do you use?",
        answer: "We only use Tier-4 data centers with latest Gen NVMe storage and high-frequency processors to ensure your site is always fast, no matter the load."
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
