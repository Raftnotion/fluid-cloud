"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center backdrop-blur-sm"
        >
            <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#CCFF00] rounded-sm flex items-center justify-center">
                    <span className="text-black font-bold text-lg">W</span>
                </div>
                <span className="text-xl font-bold font-['Clash_Display']">WPFYE</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
                {['Infrastructure', 'Features', 'Pricing', 'Support', 'FAQ', 'About'].map((item) => (
                    <Link
                        key={item}
                        href={item === 'About' ? '/about' : `/#${item.toLowerCase()}`}
                        className="text-sm font-medium text-[#888888] hover:text-[#F2F2F2] transition-colors"
                    >
                        {item}
                    </Link>
                ))}
            </nav>

            <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-[#F2F2F2] hover:text-[#CCFF00] transition-colors">
                    Login
                </button>
                <Link href="/#pricing" className="px-6 py-2 bg-[#CCFF00] text-black text-sm font-bold rounded-md hover:bg-[#b8e600] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.3)] inline-block">
                    Get Started
                </Link>
            </div>
        </motion.header>
    );
};

export default Header;
