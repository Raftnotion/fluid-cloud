"use client";

import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

// Enhanced particles for a richer atmospheric effect (50 particles)
const FIXED_PARTICLES = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 10,
    drift: (Math.random() - 0.5) * 40 // Horizontal drift
}));

const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 pt-20 overflow-hidden bg-black"
            style={{ willChange: 'transform' }}
        >
            {/* === OPTIMIZED BACKGROUND EFFECTS === */}

            {/* 1. Static Grid Overlay */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(204,255,0,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(204,255,0,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
                }}
            />

            {/* 2. Floating Particles - Enhanced Visibility & Drift */}
            {FIXED_PARTICLES.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size * 2,
                        height: particle.size * 2,
                        background: 'rgba(204,255,0,0.95)',
                        boxShadow: `0 0 ${particle.size * 10}px rgba(204,255,0,0.8), 0 0 ${particle.size * 20}px rgba(204,255,0,0.4)`,
                        willChange: 'transform, opacity',
                        z: 6, // Above the centerpiece image layers
                    }}
                    animate={{
                        y: ["110vh", "-10vh"],
                        x: [`${particle.x}%`, `${particle.x + particle.drift}%`],
                        opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* 3. Aurora / Wave Effect - Simplified */}
            <div className="absolute bottom-0 left-0 right-0 h-[30%] z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ x: ["-10%", "10%", "-10%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-[-10%] right-[-10%] h-full"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(204,255,0,0.18), transparent 75%)',
                        willChange: 'transform',
                    }}
                />
            </div>

            {/* === CONTENT SECTION === */}
            <div className="max-w-6xl w-full text-center z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-10 flex flex-col items-center"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-[1px] w-8 bg-[#CCFF00]/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#CCFF00]">
                            built for peak performance
                        </span>
                        <div className="h-[1px] w-8 bg-[#CCFF00]/50" />
                    </div>
                </motion.div>

                <h1
                    className="text-[12vw] md:text-[7.5vw] font-bold font-['Clash_Display'] leading-[0.8] mb-12 text-[#F2F2F2] relative"
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
                    className="max-w-2xl mx-auto"
                >
                    <p
                        className="text-lg md:text-xl text-[#F2F2F2] font-semibold leading-relaxed tracking-tight mb-12"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8), 0 10px 20px rgba(0,0,0,0.6)' }}
                    >
                        Engineered for high-intensity workloads. Our cloud fabric expands organically with your traffic, delivering peak performance without manual intervention.
                    </p>
                </motion.div>
            </div>

            {/* Enhanced Contrast Mask (Stronger at center for readability) */}
            <div
                className="absolute inset-0 z-[5] pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)'
                }}
            />

            {/* --- MULTI-LAYERED CINEMATIC BACKGROUND --- */}

            {/* Layer 1: Stealth Server Room Background */}
            <motion.div
                style={{ y: useTransform(scrollY, [0, 1000], [0, 200]) }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <img
                    src="/images/Image_202601242350.jpeg"
                    alt="Environment"
                    className="w-full h-full object-cover opacity-50 mix-blend-luminosity brightness-75 contrast-110"
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
                }}
            />

            {/* Layer 3: Floating Transparent Orb with Orbital Animation */}
            <motion.div
                style={{ y: yParallax }}
                className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none"
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.img
                        src="/images/center-orb.png"
                        alt="WPFYE Core"
                        className="w-[85%] md:w-[60%] lg:w-[45%] h-auto object-contain z-20"
                        initial={{ opacity: 1, scale: 1 }}
                        animate={{
                            rotate: 360
                        }}
                        transition={{
                            rotate: { duration: 60, repeat: Infinity, ease: "linear" }
                        }}
                    />
                </div>
            </motion.div>

        </section>
    );
};

export default Hero;
