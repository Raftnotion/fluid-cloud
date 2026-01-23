"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import FluidSphere from './FluidSphere';

// Reduced particles for better performance (8 instead of 15)
const FIXED_PARTICLES = [
    { id: 0, x: 10, size: 2, duration: 12, delay: 0 },
    { id: 1, x: 25, size: 2.5, duration: 10, delay: 1.5 },
    { id: 2, x: 40, size: 2, duration: 11, delay: 3 },
    { id: 3, x: 55, size: 3, duration: 9, delay: 0.5 },
    { id: 4, x: 70, size: 2.2, duration: 12, delay: 2 },
    { id: 5, x: 85, size: 2.8, duration: 10, delay: 4 },
    { id: 6, x: 30, size: 2, duration: 11, delay: 2.5 },
    { id: 7, x: 60, size: 2.5, duration: 10, delay: 1 },
];

const Hero: React.FC = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

    // Magnetic Button Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
    const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((e.clientX - centerX) * 0.3);
        mouseY.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

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
                        width: particle.size,
                        height: particle.size,
                        background: 'rgba(204,255,0,0.5)',
                        boxShadow: `0 0 ${particle.size * 2}px rgba(204,255,0,0.4)`,
                        willChange: 'transform, opacity',
                    }}
                    animate={{
                        y: ["100vh", "-10vh"],
                        opacity: [0, 0.8, 0.8, 0],
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
                        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(204,255,0,0.06), transparent 60%)',
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

                <h1 className="text-[14vw] md:text-[9vw] font-bold font-['Clash_Display'] leading-[0.8] mb-12 text-[#F2F2F2]">
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

            {/* Optimized Three.js Globe */}
            <motion.div
                style={{ y: yParallax }}
                className="absolute inset-0 z-0 flex items-center justify-center opacity-40"
            >
                <FluidSphere ambient={true} trafficScale={0.15} />
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-4 z-20 flex flex-col items-center gap-8"
            >
                <motion.button
                    ref={buttonRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                    className="group relative px-16 py-8 bg-[#CCFF00] text-black font-black text-xl rounded-full overflow-hidden transition-shadow shadow-[0_0_50px_rgba(204,255,0,0.2)] hover:shadow-[0_0_80px_rgba(204,255,0,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-3 tracking-tighter">
                        INITIATE DEPLOYMENT
                    </span>
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
