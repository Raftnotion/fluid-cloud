"use client";

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Infinity, Zap, Terminal, Shield } from 'lucide-react';

const BentoBox: React.FC<{ icon: React.ReactNode, title: string, desc: string, index: number }> = ({ icon, title, desc, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            className="group relative p-10 border border-[#333333] bg-[#0a0a0a] rounded-xl hover:border-[#CCFF00]/40 transition-colors overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(204, 255, 0, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative z-10">
                <div className="mb-8 w-14 h-14 flex items-center justify-center border border-[#333333] bg-black/50 rounded-lg group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/5 transition-all">
                    <div className="text-[#888888] group-hover:text-[#CCFF00] transition-colors scale-125">
                        {icon}
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#F2F2F2] font-['Clash_Display']">{title}</h3>
                <p className="text-base text-[#888888] leading-relaxed font-medium">{desc}</p>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-[#CCFF00] rounded-full" />
            </div>
        </motion.div>
    );
};

const PlanPhilosophy: React.FC = () => {
    return (
        <section id="platform" className="w-full py-40 px-8 flex flex-col items-center">
            <div className="max-w-7xl w-full p-[1px] bg-gradient-to-br from-[#333333] via-[#1a1a1a] to-[#333333] rounded-[32px] overflow-hidden shadow-2xl">
                <div className="p-16 md:p-24 bg-[#050505] rounded-[31px]">
                    <div className="text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#CCFF00] text-[10px] uppercase tracking-[0.5em] font-black mb-6 block"
                        >
                            The Paradigm Shift
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-8xl font-bold mb-8 text-[#F2F2F2] tracking-tighter leading-[0.9]"
                        >
                            The Only Plan <br /> <span className="text-[#333333]">You'll Ever Need.</span>
                        </motion.h2>
                        <p className="text-[#888888] max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                            We've stripped away the noise of tiered pricing. One industrial-grade architecture,
                            unlocked for every project you dream of.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <BentoBox
                            index={0}
                            icon={<Infinity className="w-6 h-6" />}
                            title="Uncapped Bandwidth"
                            desc="Scale your content globally without worrying about monthly transfer limits."
                        />
                        <BentoBox
                            index={1}
                            icon={<Zap className="w-6 h-6" />}
                            title="Edge Caching"
                            desc="Proprietary object caching stored on SSD nodes at the internet's edge."
                        />
                        <BentoBox
                            index={2}
                            icon={<Terminal className="w-6 h-6" />}
                            title="WP/Linux Hybrid"
                            desc="Optimized PHP runtimes alongside standard Linux environments."
                        />
                        <BentoBox
                            index={3}
                            icon={<Shield className="w-6 h-6" />}
                            title="Fortified Stack"
                            desc="Wildcard SSL and multi-layered CDN security provided out of the box."
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanPhilosophy;
