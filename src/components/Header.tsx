"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const navItems = ['Infrastructure', 'Features', 'Pricing', 'Support', 'FAQ', 'About'];

    // Close menu on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);

    // Close menu on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current &&
                buttonRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside as EventListener);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside as EventListener);
        };
    }, [isMenuOpen]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            const id = href.replace('/#', '');
            const element = document.getElementById(id);
            if (element) {
                const navHeight = 60;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                window.history.pushState(null, '', href);
            }
        }
        setIsMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-3 md:py-5 flex justify-between items-center backdrop-blur-md bg-black/80 border-b border-white/5"
                style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src="/images/wpfye_favicon.svg" alt="WPFYE Logo" className="w-7 h-7 md:w-8 md:h-8" />
                    <span className="text-lg md:text-xl font-bold font-['Clash_Display']">WPFYE</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => {
                        const href = item === 'About' ? '/about' : `/#${item.toLowerCase()}`;
                        return (
                            <Link
                                key={item}
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                className="text-sm font-medium text-[#888888] hover:text-[#F2F2F2] transition-colors"
                            >
                                {item}
                            </Link>
                        )
                    })}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-sm font-medium text-[#F2F2F2] hover:text-[#CCFF00] transition-colors">
                        Login
                    </button>
                    <Link
                        href="/#pricing"
                        onClick={(e) => handleNavClick(e, '/#pricing')}
                        className="px-5 py-2 bg-[#CCFF00] text-black text-sm font-bold rounded-lg hover:bg-[#b8e600] transition-all active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    ref={buttonRef}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 active:bg-white/10 transition-colors"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <X className="w-5 h-5 text-[#F2F2F2]" />
                    ) : (
                        <Menu className="w-5 h-5 text-[#F2F2F2]" />
                    )}
                </button>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-30 bg-black/60 md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            ref={menuRef}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed left-0 right-0 z-40 md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
                            style={{ top: 'calc(52px + env(safe-area-inset-top, 0px))' }}
                        >
                            <nav className="flex flex-col p-4 gap-1 max-h-[70vh] overflow-y-auto">
                                {navItems.map((item, index) => {
                                    const href = item === 'About' ? '/about' : `/#${item.toLowerCase()}`;
                                    return (
                                        <motion.div
                                            key={item}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={href}
                                                onClick={(e) => handleNavClick(e, href)}
                                                className="block py-3 px-4 text-base font-medium text-[#F2F2F2]/80 hover:text-[#CCFF00] hover:bg-white/5 rounded-lg transition-all active:bg-white/10"
                                            >
                                                {item}
                                            </Link>
                                        </motion.div>
                                    )
                                })}

                                {/* Mobile CTA */}
                                <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                                    <button className="py-3 px-4 text-base font-medium text-[#F2F2F2]/80 hover:text-[#F2F2F2] rounded-lg transition-colors text-left active:bg-white/5">
                                        Login
                                    </button>
                                    <Link
                                        href="/#pricing"
                                        onClick={(e) => handleNavClick(e, '/#pricing')}
                                        className="py-3 px-4 bg-[#CCFF00] text-black text-base font-bold rounded-lg text-center active:scale-[0.98] transition-transform"
                                    >
                                        Get Started Now
                                    </Link>
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
