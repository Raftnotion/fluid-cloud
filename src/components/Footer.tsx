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
        <footer id="support" className="w-full pt-40 pb-12 px-8 flex flex-col items-center border-t border-white/5 bg-[#050505] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#CCFF00] rounded-sm flex items-center justify-center">
                                <span className="text-black font-black text-lg">W</span>
                            </div>
                            <span className="text-2xl font-bold font-['Clash_Display'] tracking-tight">WPFYE</span>
                        </Link>
                        <p className="text-[#555] max-w-sm text-sm leading-relaxed">
                            Complexity Removed. Power Unlimited. The world&apos;s first fluid cloud infrastructure built for the next generation of digital creators.
                        </p>
                        <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/5 rounded-2xl w-fit">
                            <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse shadow-[0_0_10px_#CCFF00]" />
                            <span className="text-[10px] text-[#888] font-bold uppercase tracking-[0.2em]">Operational — Global Edge Network</span>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-sm uppercase tracking-widest mb-4">Platform</h5>
                            <ul className="space-y-4">
                                <li><Link href="/#infrastructure" onClick={(e) => handleScroll(e, '/#infrastructure')} className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors flex items-center gap-1 group">Infrastructure <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                                <li><Link href="/#features" onClick={(e) => handleScroll(e, '/#features')} className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors flex items-center gap-1 group">Features <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                                <li><Link href="/#pricing" onClick={(e) => handleScroll(e, '/#pricing')} className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors flex items-center gap-1 group">Pricing <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-sm uppercase tracking-widest mb-4">Company</h5>
                            <ul className="space-y-4">
                                <li><Link href="/about" className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors">About Story</Link></li>
                                <li><Link href="/contact" className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors">Contact Hub</Link></li>
                                <li><Link href="/status" className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors flex items-center gap-2">System Status <Activity className="w-3 h-3 text-[#CCFF00]" /></Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h5 className="text-[#F2F2F2] font-bold text-sm uppercase tracking-widest mb-4">Support</h5>
                            <ul className="space-y-4">
                                <li><Link href="/kb" className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors">Knowledgebase</Link></li>
                                <li><Link href="/#faq" onClick={(e) => handleScroll(e, '/#faq')} className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors">Technical FAQ</Link></li>
                                <li><Link href="/legal" className="text-[#555] hover:text-[#CCFF00] text-sm transition-colors">Legal Protocol</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[10px] text-[#333] uppercase font-bold tracking-[0.2em]">
                            © 2026 WPFYE TECHNOLOGY (OPC) PVT LTD.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/legal#privacy" className="text-[10px] text-[#333] hover:text-[#555] uppercase font-bold tracking-[0.2em] transition-colors">Privacy</Link>
                            <Link href="/legal#terms" className="text-[10px] text-[#333] hover:text-[#555] uppercase font-bold tracking-[0.2em] transition-colors">Terms</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="#" className="p-2 bg-white/5 rounded-lg text-[#333] hover:text-[#CCFF00] hover:bg-white/10 transition-all">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg text-[#333] hover:text-[#CCFF00] hover:bg-white/10 transition-all">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="#" className="p-2 bg-white/5 rounded-lg text-[#333] hover:text-[#CCFF00] hover:bg-white/10 transition-all">
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-[9px] text-[#111] uppercase font-black tracking-[1em] select-none">
                        STEALTH LUXURY INFRASTRUCTURE
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
