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
    return (
        <section id="infrastructure" className="w-full py-40 px-8 flex flex-col items-center bg-[#050505]">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div>
                    <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-bold mb-6 block">Real-time Stress Test</span>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[#F2F2F2] font-['Clash_Display'] leading-[0.9]">
                        Adaptive Pulse <br />Technology
                    </h2>
                    <p className="text-[#888888] text-xl mb-12 leading-relaxed font-medium">
                        Watch how our infrastructure reacts to a massive traffic influx. Instead of failing, the core expands to accommodate every single user.
                    </p>

                    <div className="space-y-6">
                        <div className="p-8 border border-[#333333] rounded-xl bg-[#0a0a0a]/50 flex items-start gap-6 group hover:border-[#CCFF00]/30 transition-colors">
                            <Users className="w-8 h-8 text-[#CCFF00]" />
                            <div>
                                <h4 className="font-bold text-xl text-[#F2F2F2] mb-1">Dynamic Capacity</h4>
                                <p className="text-[#888888] leading-relaxed">From 10 visitors to 10 Million+. Absolute stability during massive viral spikes. No manual upgrades required.</p>
                            </div>
                        </div>
                        <div className="p-8 border border-[#333333] rounded-xl bg-[#0a0a0a]/50 flex items-start gap-6 group hover:border-[#CCFF00]/30 transition-colors">
                            <Zap className="w-8 h-8 text-[#CCFF00]" />
                            <div>
                                <h4 className="font-bold text-xl text-[#F2F2F2] mb-1">Instant Mitigation</h4>
                                <p className="text-[#888888] leading-relaxed">Auto-injection of RAM and CPU resources in milliseconds as traffic scales.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative p-6 bg-[#0a0a0a] border border-[#333333] rounded-[32px] shadow-2xl overflow-hidden min-h-[600px] flex flex-col">
                    {/* Terminal Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#555] font-bold">Cluster Monitor</span>
                            <span className="text-[#F2F2F2] font-bold">WPFYE-LON-042</span>
                        </div>
                        <TrendingUp className={`w-6 h-6 transition-colors duration-500 ${trafficScale > 0.8 ? 'text-red-500 animate-pulse' : 'text-[#CCFF00]'}`} />
                    </div>

                    {/* Live Terminal */}
                    <div className="flex-1 mb-6">
                        <LiveTerminal trafficScale={trafficScale} />
                    </div>

                    {/* Controls */}
                    <div className="bg-[#050505]/80 backdrop-blur-xl p-6 rounded-2xl border border-[#333]">
                        <div className="mb-6">
                            <label className="block text-sm uppercase tracking-widest text-[#888888] mb-4 font-bold">
                                Simulate Traffic Load
                            </label>
                            <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.01"
                                value={trafficScale}
                                onChange={(e) => setTrafficScale(parseFloat(e.target.value))}
                                className="w-full h-3 bg-[#1a1a1a] rounded-lg appearance-none cursor-pointer accent-[#CCFF00]"
                            />
                            <div className="flex justify-between mt-3">
                                <span className="text-[10px] font-bold text-[#444] uppercase">Idle</span>
                                <span className="text-lg font-black text-[#CCFF00] font-['Clash_Display']">{(trafficScale * 100).toFixed(0)}% Load</span>
                                <span className="text-[10px] font-bold text-[#444] uppercase">Peak</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                                    <span className="text-[#888888]">CPU</span>
                                    <span className="text-[#CCFF00]">{(10 + trafficScale * 85).toFixed(0)}%</span>
                                </div>
                                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]">
                                    <motion.div
                                        className="h-full bg-[#CCFF00] shadow-[0_0_10px_rgba(204,255,0,0.5)]"
                                        animate={{ width: `${10 + (trafficScale * 85)}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
                                    <span className="text-[#888888]">RAM</span>
                                    <span className="text-[#CCFF00]">{(5 + trafficScale * 90).toFixed(0)}%</span>
                                </div>
                                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#333]">
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
        </section>
    );
};

export default AutoscaleDemo;
