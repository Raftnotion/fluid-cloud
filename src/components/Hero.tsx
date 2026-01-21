"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import FluidSphere from './FluidSphere';

// Fixed particles to avoid hydration mismatch (no Math.random on server)
const FIXED_PARTICLES = [
    { id: 0, x: 5, size: 2, duration: 10, delay: 0 },
    { id: 1, x: 15, size: 3, duration: 12, delay: 1 },
    { id: 2, x: 25, size: 1.5, duration: 8, delay: 2 },
    { id: 3, x: 35, size: 2.5, duration: 11, delay: 0.5 },
    { id: 4, x: 45, size: 2, duration: 9, delay: 3 },
    { id: 5, x: 55, size: 3.5, duration: 13, delay: 1.5 },
    { id: 6, x: 65, size: 1.8, duration: 10, delay: 4 },
    { id: 7, x: 75, size: 2.8, duration: 8.5, delay: 2.5 },
    { id: 8, x: 85, size: 2.2, duration: 11.5, delay: 0.8 },
    { id: 9, x: 95, size: 3, duration: 9.5, delay: 3.5 },
    { id: 10, x: 10, size: 1.6, duration: 12.5, delay: 1.2 },
    { id: 11, x: 30, size: 2.4, duration: 7.5, delay: 4.5 },
    { id: 12, x: 50, size: 3.2, duration: 10.5, delay: 2.2 },
    { id: 13, x: 70, size: 1.9, duration: 9, delay: 0.3 },
    { id: 14, x: 90, size: 2.6, duration: 11, delay: 3.8 },
];

const Hero: React.FC = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    const { scrollY } = useScroll();
    const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

    // Magnetic Button Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 20, stiffness: 200 });
    const springY = useSpring(mouseY, { damping: 20, stiffness: 200 });

    // Track mouse position for spotlight effect
    const handleContainerMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((e.clientX - centerX) * 0.35);
        mouseY.set((e.clientY - centerY) * 0.35);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const lineReveal = {
        hidden: { y: "100%", rotate: 5 },
        visible: {
            y: 0,
            rotate: 0,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleContainerMouseMove}
            className="relative w-full min-h-screen flex flex-col items-center justify-center px-8 pt-20 overflow-hidden bg-black"
        >
            {/* === ENHANCED BACKGROUND EFFECTS === */}

            {/* 1. Animated Grid Overlay */}
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

            {/* Grid Pulse Effect */}
            <motion.div
                animate={{
                    opacity: [0.02, 0.08, 0.02],
                    scale: [1, 1.02, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(204,255,0,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204,255,0,0.05) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                    maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 60%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 60%)',
                }}
            />

            {/* 2. Floating Particles */}
            {FIXED_PARTICLES.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full z-0 pointer-events-none"
                    style={{
                        left: `${particle.x}%`,
                        width: particle.size,
                        height: particle.size,
                        background: 'rgba(204,255,0,0.6)',
                        boxShadow: `0 0 ${particle.size * 3}px rgba(204,255,0,0.5)`,
                    }}
                    animate={{
                        y: ["100vh", "-10vh"],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1, 0.5],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}

            {/* 5. Aurora / Wave Effect at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[40%] z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        x: ["-20%", "20%", "-20%"],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-[-20%] right-[-20%] h-full"
                    style={{
                        background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(204,255,0,0.08), transparent 60%)',
                    }}
                />
                <motion.div
                    animate={{
                        x: ["20%", "-20%", "20%"],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-[-20%] right-[-20%] h-full"
                    style={{
                        background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(204,255,0,0.05), transparent 50%)',
                    }}
                />
            </div>


            {/* === CONTENT SECTION === */}
            <div className="max-w-6xl w-full text-center z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="mb-10 flex flex-col items-center"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <motion.div
                            animate={{ scaleX: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-[1px] w-8 bg-[#CCFF00]/50"
                        />
                        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#CCFF00]">
                            System Status: Fluid
                        </span>
                        <motion.div
                            animate={{ scaleX: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="h-[1px] w-8 bg-[#CCFF00]/50"
                        />
                    </div>
                </motion.div>

                <h1 className="text-[14vw] md:text-[9vw] font-bold font-['Clash_Display'] leading-[0.8] mb-12 text-[#F2F2F2] tracking-tighter">
                    <div className="overflow-hidden inline-block py-2">
                        <motion.span
                            variants={lineReveal}
                            initial="hidden"
                            animate="visible"
                            className="block"
                        >
                            Infrastructure
                        </motion.span>
                    </div>
                    <br />
                    <div className="overflow-hidden inline-block py-2">
                        <motion.span
                            variants={lineReveal}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                            className="block text-[#CCFF00] drop-shadow-[0_0_30px_rgba(204,255,0,0.3)]"
                        >
                            <motion.span
                                animate={{
                                    opacity: [0.8, 1, 0.8],
                                    textShadow: [
                                        "0 0 30px rgba(204,255,0,0.3)",
                                        "0 0 60px rgba(204,255,0,0.5)",
                                        "0 0 30px rgba(204,255,0,0.3)"
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                That Breathes.
                            </motion.span>
                        </motion.span>
                    </div>
                </h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <p className="text-lg md:text-xl text-[#888888] font-medium leading-relaxed tracking-tight mb-12">
                        Engineered for high-intensity workloads. Our cloud fabric expands organically with your traffic, delivering peak performance without manual intervention.
                    </p>
                </motion.div>
            </div>

            {/* Sphere with parallax */}
            <motion.div
                style={{ y: yParallax }}
                className="absolute inset-0 z-0 flex items-center justify-center opacity-50 mix-blend-screen"
            >
                <FluidSphere ambient={true} trafficScale={0.15} />
            </motion.div>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 z-20 flex flex-col items-center gap-8"
            >
                <motion.button
                    ref={buttonRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                    className="group relative px-16 py-8 bg-[#CCFF00] text-black font-black text-xl rounded-full overflow-hidden transition-all shadow-[0_0_50px_rgba(204,255,0,0.2)] hover:shadow-[0_0_80px_rgba(204,255,0,0.4)]"
                >
                    <span className="relative z-10 flex items-center gap-3 tracking-tighter">
                        INITIATE DEPLOYMENT
                    </span>
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    />
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
