"use client";

import React from 'react';
import { motion } from 'framer-motion';

const BRANDS = [
    { name: 'AWS', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Google Cloud', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg' },
    { name: 'NVIDIA', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg' },
    { name: 'Cloudflare', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.svg' },
    { name: 'DigitalOcean', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/DigitalOcean_logo.svg' },
    { name: 'Microsoft Azure', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg' },
];

const TrustCloud: React.FC = () => {
    return (
        <section className="w-full py-20 bg-black border-y border-[#111] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #CCFF00 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <div className="h-px w-6 bg-[#CCFF00]/30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#444]">
                            Engineered on Trusted Infrastructure
                        </span>
                        <div className="h-px w-6 bg-[#CCFF00]/30" />
                    </motion.div>

                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-16 md:gap-x-20 opacity-40">
                        {BRANDS.map((brand, idx) => (
                            <motion.div
                                key={brand.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ opacity: 1, scale: 1.05 }}
                                className="grayscale hover:grayscale-0 transition-all duration-500 cursor-crosshair group"
                            >
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="h-6 md:h-8 w-auto object-contain brightness-[0.8] group-hover:brightness-100 transition-all"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrustCloud;
