"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Zap, TrendingUp } from 'lucide-react';
import LiveTerminal from './LiveTerminal';

interface AutoscaleDemoProps {
    trafficScale: number;
    setTrafficScale: (val: number) => void;
}

const AutoscaleDemo: React.FC<AutoscaleDemoProps> = ({ trafficScale, setTrafficScale }) => {
    const cpuPercentage = (10 + trafficScale * 85).toFixed(0);
    const ramPercentage = (5 + trafficScale * 90).toFixed(0);
    const trafficLoad = (trafficScale * 100).toFixed(0);

    return (
        <section id="infrastructure" className="w-full py-16 md:py-40 px-4 md:px-8 flex flex-col items-center bg-[#050505]">
            <div className="max-w-6xl w-full">
                {/* Mobile: Stacked Layout | Desktop: Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-start lg:items-center">

                    {/* Content Section */}
                    <div className="order-2 lg:order-1">
                        <span className="text-[#CCFF00] text-[9px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] font-bold mb-4 md:mb-6 block">
                            Real-time Stress Test
                        </span>
                        <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8 text-[#F2F2F2] font-['Clash_Display'] leading-[0.95]">
                            Adaptive Pulse<br />Technology
                        </h2>
                        <p className="text-[#888] text-base md:text-xl mb-6 md:mb-12 leading-relaxed font-medium">
                            Watch how our infrastructure reacts to a massive traffic influx. Instead of failing, the core expands to accommodate every single user.
                        </p>

                        {/* Mobile: Static 2-column grid | Desktop: Stacked cards */}
                        <div className="md:hidden grid grid-cols-2 gap-2 mb-4">
                            <div className="px-3 py-2.5 border border-[#222] rounded-xl bg-[#0a0a0a]/80 flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#CCFF00] shrink-0" />
                                <span className="text-xs font-semibold text-[#F2F2F2]">Dynamic Capacity</span>
                            </div>
                            <div className="px-3 py-2.5 border border-[#222] rounded-xl bg-[#0a0a0a]/80 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-[#CCFF00] shrink-0" />
                                <span className="text-xs font-semibold text-[#F2F2F2]">Instant Mitigation</span>
                            </div>
                        </div>

                        {/* Desktop: Full cards */}
                        <div className="hidden md:block space-y-6">
                            <div className="p-8 border border-[#333333] rounded-xl bg-[#0a0a0a]/50 flex items-start gap-6 group hover:border-[#CCFF00]/30 transition-colors">
                                <Users className="w-8 h-8 text-[#CCFF00]" />
                                <div>
                                    <h4 className="font-bold text-xl text-[#F2F2F2] mb-1">Dynamic Capacity</h4>
                                    <p className="text-[#888] leading-relaxed">Handles every visitor automatically. Whether you have a few users or a huge crowd, your site stays online 24/7.</p>
                                </div>
                            </div>
                            <div className="p-8 border border-[#333333] rounded-xl bg-[#0a0a0a]/50 flex items-start gap-6 group hover:border-[#CCFF00]/30 transition-colors">
                                <Zap className="w-8 h-8 text-[#CCFF00]" />
                                <div>
                                    <h4 className="font-bold text-xl text-[#F2F2F2] mb-1">Instant Mitigation</h4>
                                    <p className="text-[#888] leading-relaxed">Auto-injection of RAM and CPU resources in milliseconds as traffic scales.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terminal Card - Full width on mobile, feels like a native app card */}
                    <div className="order-1 lg:order-2 relative p-4 md:p-6 bg-[#0a0a0a] border border-[#222] md:border-[#333333] rounded-3xl md:rounded-[32px] shadow-2xl overflow-hidden min-h-[420px] md:min-h-[600px] flex flex-col">
                        {/* Terminal Header */}
                        <div className="flex justify-between items-center mb-3 md:mb-4">
                            <div className="flex flex-col">
                                <span className="text-[8px] md:text-[10px] uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#555] font-bold">Cluster Monitor</span>
                                <span className="text-[#F2F2F2] font-bold text-sm md:text-base">WPFYE-LON-042</span>
                            </div>
                            <TrendingUp className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-500 ${trafficScale > 0.8 ? 'text-red-500 animate-pulse' : 'text-[#CCFF00]'}`} />
                        </div>

                        {/* Live Terminal */}
                        <div className="flex-1 mb-4 md:mb-6 min-h-[180px]">
                            <LiveTerminal trafficScale={trafficScale} />
                        </div>

                        {/* Controls - Native app style slider */}
                        <div className="bg-[#050505]/90 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-[#222] md:border-[#333]">
                            <div className="mb-4 md:mb-6">
                                <label className="block text-[10px] md:text-sm uppercase tracking-widest text-[#666] mb-3 md:mb-4 font-bold">
                                    Simulate Traffic Load
                                </label>
                                {/* Touch-friendly slider */}
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.01"
                                    value={trafficScale}
                                    onChange={(e) => setTrafficScale(parseFloat(e.target.value))}
                                    className="w-full h-2 md:h-3 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#CCFF00] touch-manipulation"
                                    style={{ WebkitAppearance: 'none' }}
                                />
                                <div className="flex justify-between mt-2 md:mt-3">
                                    <span className="text-[9px] md:text-[10px] font-bold text-[#444] uppercase">Idle</span>
                                    <span className="text-base md:text-lg font-black text-[#CCFF00] font-['Clash_Display']">{trafficLoad}% Load</span>
                                    <span className="text-[9px] md:text-[10px] font-bold text-[#444] uppercase">Peak</span>
                                </div>
                            </div>

                            {/* Compact stat bars */}
                            <div className="grid grid-cols-2 gap-3 md:gap-4">
                                <div className="space-y-1.5 md:space-y-2">
                                    <div className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                        <span className="text-[#666]">CPU</span>
                                        <span className="text-[#CCFF00]">{cpuPercentage}%</span>
                                    </div>
                                    <div className="h-1.5 md:h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#222] md:border-[#333]">
                                        <motion.div
                                            className="h-full bg-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                                            animate={{ width: `${10 + (trafficScale * 85)}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <div className="flex justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-wider">
                                        <span className="text-[#666]">RAM</span>
                                        <span className="text-[#CCFF00]">{ramPercentage}%</span>
                                    </div>
                                    <div className="h-1.5 md:h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#222] md:border-[#333]">
                                        <motion.div
                                            className="h-full bg-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                                            animate={{ width: `${5 + (trafficScale * 90)}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AutoscaleDemo;

