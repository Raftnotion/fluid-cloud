"use client";

import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

// Increased particles for a richer visual effect (22 particles)
const FIXED_PARTICLES = [
    { id: 0, x: 5, size: 2, duration: 12, delay: 0 },
    { id: 1, x: 15, size: 2.5, duration: 10, delay: 1.5 },
    { id: 2, x: 25, size: 1.8, duration: 14, delay: 3 },
    { id: 3, x: 35, size: 3, duration: 9, delay: 0.5 },
    { id: 4, x: 45, size: 2.2, duration: 12, delay: 2 },
    { id: 5, x: 55, size: 2.8, duration: 10, delay: 4 },
    { id: 6, x: 65, size: 1.5, duration: 15, delay: 2.5 },
    { id: 7, x: 75, size: 2.5, duration: 11, delay: 1 },
    { id: 8, x: 85, size: 2, duration: 13, delay: 5 },
    { id: 9, x: 95, size: 2.2, duration: 12, delay: 1.2 },
    { id: 10, x: 12, size: 1.5, duration: 16, delay: 0.8 },
    { id: 11, x: 28, size: 2.8, duration: 10, delay: 3.5 },
    { id: 12, x: 42, size: 2, duration: 11, delay: 2.2 },
    { id: 13, x: 58, size: 2.5, duration: 14, delay: 1.8 },
    { id: 14, x: 72, size: 1.8, duration: 12, delay: 4.2 },
    { id: 15, x: 88, size: 3, duration: 9, delay: 0.3 },
    { id: 16, x: 3, size: 2.5, duration: 11, delay: 2.7 },
    { id: 17, x: 97, size: 1.5, duration: 15, delay: 5.5 },
    { id: 18, x: 50, size: 2, duration: 13, delay: 1.1 },
    { id: 19, x: 20, size: 2.2, duration: 12, delay: 3.9 },
    { id: 20, x: 80, size: 1.8, duration: 14, delay: 0.4 },
    { id: 21, x: 40, size: 2.5, duration: 10, delay: 2.1 },
];

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

            {/* 1. Static Grid Overlay (no animation = better perf) */}
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

            {/* 2. Floating Particles - Reduced & GPU optimized */}
            {FIXED_PARTICLES.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full z-0 pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size * 1.5,
                        height: particle.size * 1.5,
                        background: 'rgba(204,255,0,0.9)',
                        boxShadow: `0 0 ${particle.size * 6}px rgba(204,255,0,0.7)`,
                        willChange: 'transform, opacity',
                        z: 5, // Above the centerpiece image
                    }}
                    animate={{
                        y: ["100vh", "-10vh"],
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

                <h1 className="text-[12vw] md:text-[7.5vw] font-bold font-['Clash_Display'] leading-[0.8] mb-12 text-[#F2F2F2]">
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
                        style={{ textShadow: '0 0 40px rgba(204,255,0,0.3)' }}
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
                    <p className="text-lg md:text-xl text-[#888888] font-medium leading-relaxed tracking-tight mb-12">
                        Engineered for high-intensity workloads. Our cloud fabric expands organically with your traffic, delivering peak performance without manual intervention.
                    </p>
                </motion.div>
            </div>

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
