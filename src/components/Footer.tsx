import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full pt-32 pb-12 px-8 flex flex-col items-center border-t border-[#1a1a1a]">
            <div className="max-w-6xl w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-20">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#CCFF00] rounded-sm flex items-center justify-center">
                                <span className="text-black font-bold text-xs">W</span>
                            </div>
                            <span className="text-xl font-bold font-['Clash_Display']">WPFYE</span>
                        </div>
                        <p className="text-[#888888] max-w-sm text-sm">
                            Complexity Removed. Power Unlimited. The world's first fluid cloud infrastructure built for the next generation of digital creators.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                            <span className="text-[10px] text-[#888888] uppercase tracking-[0.3em]">Operational — Global Edge Network</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-sm mb-4 uppercase tracking-widest">Platform</h5>
                            <ul className="space-y-3 text-sm text-[#888888]">
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Managed WP</a></li>
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Linux Servers</a></li>
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-sm mb-4 uppercase tracking-widest">Company</h5>
                            <ul className="space-y-3 text-sm text-[#888888]">
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">System Status</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-[#F2F2F2] font-bold text-sm mb-4 uppercase tracking-widest">Support</h5>
                            <ul className="space-y-3 text-sm text-[#888888]">
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-[#CCFF00] transition-colors">Privacy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center pt-12 border-t border-[#1a1a1a] gap-6 text-[10px] text-[#333333] uppercase tracking-[0.3em]">
                    <p>© 2024 WPFYE Technology Group. All Rights Reserved.</p>
                    <p>Powered by 20i Global Edge Network</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-[#888888] transition-colors">Twitter</a>
                        <a href="#" className="hover:text-[#888888] transition-colors">GitHub</a>
                        <a href="#" className="hover:text-[#888888] transition-colors">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
