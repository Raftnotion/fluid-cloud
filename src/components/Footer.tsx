"use client";

import Link from 'next/link';
import { Mail, Github, Twitter, Linkedin, ShieldCheck, Activity, ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

const Footer: React.FC = () => {
    const pathname = usePathname();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith('/#') && pathname === '/') {
            e.preventDefault();
            const id = href.replace('/#', '');
            const element = document.getElementById(id);
            if (element) {
                const navHeight = 80; // Compensate for fixed header
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                window.history.pushState(null, '', href);
            }
        }
    };
    return (
        <footer id="support" className="w-full pt-16 md:pt-40 pb-8 md:pb-12 px-4 md:px-8 flex flex-col items-center border-t border-white/5 bg-[#050505] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[200px] md:h-[300px] bg-[#CCFF00]/5 blur-[100px] md:blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 mb-12 md:mb-32">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-5 md:space-y-8">
                        <Link href="/" className="flex items-center gap-2.5 md:gap-3">
                            <img src="/images/wpfye_favicon.svg" alt="WPFYE Logo" className="w-7 h-7 md:w-8 md:h-8" />
                            <span className="text-xl md:text-2xl font-bold font-['Clash_Display'] tracking-tight">WPFYE</span>
                        </Link>
                        <p className="text-[#555] max-w-sm text-xs md:text-sm leading-relaxed">
                            Complexity Removed. Power Unlimited. The world&apos;s first fluid cloud infrastructure.
                        </p>
                        <div className="flex items-center gap-2.5 md:gap-3 p-3 md:p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl w-fit">
                            <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse shadow-[0_0_10px_#CCFF00]" />
                            <span className="text-[9px] md:text-[10px] text-[#888] font-bold uppercase tracking-widest">Operational</span>
                        </div>
                    </div>

                    {/* Links Grid - Horizontal scroll on mobile */}
                    <div className="lg:col-span-8 grid grid-cols-3 gap-6 md:gap-12">
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-[10px] md:text-sm uppercase tracking-widest mb-3 md:mb-4">Platform</h5>
                            <ul className="space-y-2.5 md:space-y-4">
                                <li><Link href="/#infrastructure" onClick={(e) => handleScroll(e, '/#infrastructure')} className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">Infrastructure</Link></li>
                                <li><Link href="/#features" onClick={(e) => handleScroll(e, '/#features')} className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">Features</Link></li>
                                <li><Link href="/#pricing" onClick={(e) => handleScroll(e, '/#pricing')} className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-[10px] md:text-sm uppercase tracking-widest mb-3 md:mb-4">Company</h5>
                            <ul className="space-y-2.5 md:space-y-4">
                                <li><Link href="/about" className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">About</Link></li>
                                <li><Link href="/contact" className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">Contact</Link></li>
                                <li><Link href="/status" className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors flex items-center gap-1.5">Status <Activity className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#CCFF00]" /></Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-[10px] md:text-sm uppercase tracking-widest mb-3 md:mb-4">Support</h5>
                            <ul className="space-y-2.5 md:space-y-4">
                                <li><Link href="/kb" className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">Knowledgebase</Link></li>
                                <li><Link href="/#faq" onClick={(e) => handleScroll(e, '/#faq')} className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">FAQ</Link></li>
                                <li><Link href="/legal" className="text-[#555] hover:text-[#CCFF00] text-xs md:text-sm transition-colors">Legal</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
                        <p className="text-[9px] md:text-[10px] text-[#333] uppercase font-bold tracking-widest">
                            © 2026 WPFYE TECHNOLOGY (OPC) PVT LTD.
                        </p>
                        <div className="flex items-center gap-4 md:gap-6">
                            <Link href="/legal#privacy" className="text-[9px] md:text-[10px] text-[#333] hover:text-[#555] uppercase font-bold tracking-widest transition-colors">Privacy</Link>
                            <Link href="/legal#terms" className="text-[9px] md:text-[10px] text-[#333] hover:text-[#555] uppercase font-bold tracking-widest transition-colors">Terms</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        <a href="#" className="p-2 bg-white/5 rounded-lg text-[#333] hover:text-[#CCFF00] hover:bg-white/10 transition-all active:scale-95">
                            <Twitter className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg text-[#333] hover:text-[#CCFF00] hover:bg-white/10 transition-all active:scale-95">
                            <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg text-[#333] hover:text-[#CCFF00] hover:bg-white/10 transition-all active:scale-95">
                            <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
