"use client";

import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import { TiltButton } from 'react-tilt-button';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax & GPU Optimization
    const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);
    const bgParallax = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-[100svh] md:min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-16 pb-8 md:pt-20 md:pb-0 overflow-hidden bg-black"
            style={{ willChange: 'transform' }}
        >
            {/* === OPTIMIZED BACKGROUND EFFECTS === */}

            {/* 1. Static Grid Overlay */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(#CCFF00 1px, transparent 1px),
                        linear-gradient(90deg, #CCFF00 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 20%, transparent 80%)',
                }}
            />

            {/* === CONTENT SECTION === */}
            <div className="max-w-6xl w-full text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-4 md:mb-10 flex flex-col items-center"
                >
                    <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
                        <div className="h-[1px] w-4 md:w-8 bg-[#CCFF00]/50" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#CCFF00]">
                            built for peak performance
                        </span>
                        <div className="h-[1px] w-4 md:w-8 bg-[#CCFF00]/50" />
                    </div>
                </motion.div>

                <h1
                    className="text-[10vw] sm:text-[11vw] md:text-[7.5vw] font-bold font-['Clash_Display'] leading-[0.9] md:leading-[0.8] mb-6 md:mb-12 text-[#F2F2F2] relative"
                    style={{ textShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
                >
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="block"
                    >
                        Infrastructure
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="block text-[#CCFF00]"
                        style={{ textShadow: '0 0 40px rgba(204,255,0,0.3), 0 10px 30px rgba(0,0,0,0.6)' }}
                    >
                        That Breathes.
                    </motion.span>
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-xl md:max-w-2xl mx-auto px-2 md:px-0"
                >
                    <p
                        className="text-sm md:text-xl text-[#F2F2F2]/90 md:text-[#F2F2F2] font-medium md:font-semibold leading-relaxed tracking-tight mb-6 md:mb-10"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.6)' }}
                    >
                        Cloud infrastructure that expands with your traffic. Peak performance without manual intervention.
                    </p>

                    {/* Get Started CTA Button */}
                    <div
                        className="flex justify-center pricing-tilt-btn cursor-pointer"
                        onClick={() => {
                            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        <TiltButton
                            variant="solid"
                            surfaceColor="#CCFF00"
                            sideColor="#5A7A00"
                            textColor="#000000"
                            width={280}
                            height={56}
                            elevation={12}
                            pressInset={6}
                            tilt={1.8}
                            radius={14}
                            borderColor="rgba(0,0,0,0.15)"
                            borderWidth={1}
                        >
                            <span className="flex items-center justify-center gap-2 font-black text-base uppercase tracking-wider w-full">
                                GET STARTED NOW
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </TiltButton>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - Mobile Only */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{
                    opacity: { delay: 1, duration: 0.5 },
                    y: { delay: 1.5, duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 md:hidden"
            >
                <div className="flex flex-col items-center gap-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#F2F2F2]/50">Scroll</span>
                    <ChevronDown className="w-5 h-5 text-[#CCFF00]/70" />
                </div>
            </motion.div>
            <div
                className="absolute inset-0 z-[5] pointer-events-none overflow-hidden"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)',
                    transform: 'translateZ(0)'
                }}
            />

            {/* --- MULTI-LAYERED CINEMATIC BACKGROUND --- */}

            {/* Layer 1: Stealth Server Room Background - Optimized LCP */}
            <motion.div
                style={{ y: bgParallax, transform: 'translateZ(0)' }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <Image
                    src="/images/Image_202601242350.jpeg"
                    alt="Infrastructure"
                    fill
                    priority
                    className="object-cover opacity-50 mix-blend-luminosity brightness-75 contrast-110"
                    sizes="100vw"
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at center, transparent 10%, black 90%)'
                    }}
                />
            </motion.div>

            {/* Layer 2: Functional Grid Overlay */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(204,255,0,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(204,255,0,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                    transform: 'translateZ(0)'
                }}
            />

            {/* Layer 3: Floating Transparent Orb - Priority Loaded */}
            <motion.div
                style={{ y: yParallax, transform: 'translateZ(0)' }}
                className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none"
            >
                <div className="relative w-[90%] sm:w-[85%] md:w-[60%] lg:w-[45%] h-full flex items-center justify-center">
                    <motion.div
                        className="relative w-full aspect-square"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{ willChange: 'transform' }}
                    >
                        <Image
                            src="/images/center-orb.png"
                            alt="WPFYE Core"
                            fill
                            priority
                            className="object-contain"
                            sizes="(max-width: 768px) 85vw, (max-width: 1200px) 60vw, 45vw"
                        />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
