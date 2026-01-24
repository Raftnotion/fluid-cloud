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
    // Duplicate brands for seamless loop
    const duplicatedBrands = [...BRANDS, ...BRANDS];

    return (
        <div className="w-full py-12 bg-transparent relative z-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#333]">
                    Infrastructural Partners
                </span>
            </div>

            <div className="relative flex overflow-hidden">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="flex items-center gap-16 md:gap-24 whitespace-nowrap"
                >
                    {duplicatedBrands.map((brand, idx) => (
                        <div
                            key={`${brand.name}-${idx}`}
                            className="flex items-center justify-center grayscale brightness-200 contrast-0 opacity-20 hover:opacity-100 transition-all duration-500"
                        >
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-6 md:h-8 w-auto object-contain"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TrustCloud;
