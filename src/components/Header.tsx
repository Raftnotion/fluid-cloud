"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
    const pathname = usePathname();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            const id = href.replace('/#', '');
            const element = document.getElementById(id);
            if (element) {
                const navHeight = 80; // Approximate header height
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update hash in URL without jumping
                window.history.pushState(null, '', href);
            }
        }
    };

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
                {['Infrastructure', 'Features', 'Pricing', 'Support', 'FAQ', 'About'].map((item) => {
                    const href = item === 'About' ? '/about' : `/#${item.toLowerCase()}`;
                    return (
                        <Link
                            key={item}
                            href={href}
                            onClick={(e) => handleScroll(e, href)}
                            className="text-sm font-medium text-[#888888] hover:text-[#F2F2F2] transition-colors"
                        >
                            {item}
                        </Link>
                    )
                })}
            </nav>

            <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-[#F2F2F2] hover:text-[#CCFF00] transition-colors">
                    Login
                </button>
                <Link
                    href="/#pricing"
                    onClick={(e) => handleScroll(e, '/#pricing')}
                    className="px-6 py-2 bg-[#CCFF00] text-black text-sm font-bold rounded-md hover:bg-[#b8e600] transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.3)] inline-block"
                >
                    Get Started
                </Link>
            </div>
        </motion.header>
    );
};

export default Header;
