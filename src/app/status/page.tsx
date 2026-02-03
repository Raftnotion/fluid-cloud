"use client";

import React, { useState, useEffect, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Globe, Zap, Database, Server, Timer, ShieldCheck, AlertCircle, Bell, CheckCircle2, Clock, ChevronDown, RefreshCw } from 'lucide-react';

const systems = [
    { name: "Fluid Fabric Network", status: "Operational", uptime: 99.99, icon: <Zap className="w-4 h-4" /> },
    { name: "Google Public DNS", status: "Operational", uptime: 100, icon: <Globe className="w-4 h-4" /> },
    { name: "API & Control Plane", status: "Operational", uptime: 99.98, icon: <Server className="w-4 h-4" /> },
    { name: "Object Storage Cluster", status: "Operational", uptime: 99.99, icon: <Database className="w-4 h-4" /> },
    { name: "Database Nodes (SQL)", status: "Operational", uptime: 99.95, icon: <Database className="w-4 h-4" /> },
    { name: "Edge Caching Layers", status: "Operational", uptime: 100, icon: <Activity className="w-4 h-4" /> },
];

const regions = [
    { code: "US-VA", location: "Virginia", latency: "12ms", status: "Operational" },
    { code: "EU-LN", location: "London", latency: "28ms", status: "Operational" },
    { code: "AS-MB", location: "Mumbai", latency: "8ms", status: "Operational" },
    { code: "AS-SG", location: "Singapore", latency: "45ms", status: "Operational" },
    { code: "EU-FR", location: "Frankfurt", latency: "32ms", status: "Operational" },
    { code: "JP-TY", location: "Tokyo", latency: "58ms", status: "Operational" },
];

const incidents = [
    {
        date: "Jan 24, 2026",
        title: "Planned Edge Optimization",
        description: "We successfully completed routine optimization on our EU-West nodes. No impact was recorded.",
        status: "resolved"
    },
    {
        date: "Jan 12, 2026",
        title: "Fluid Network Expansion",
        description: "Provisioned 400 additional redundant core routes to the US-East cluster. Bandwidth increased by 40%.",
        status: "resolved"
    }
];

// Perfect 90-day uptime grid
const days = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    status: 'up',
    date: new Date(Date.now() - (89 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}));

// Calculate overall uptime
const overallUptime = (systems.reduce((acc, s) => acc + s.uptime, 0) / systems.length).toFixed(2);

const StatusPage = () => {
    const [currentTime, setCurrentTime] = useState<string>("");
    const [showStickyStatus, setShowStickyStatus] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [expandedIncident, setExpandedIncident] = useState<number | null>(null);
    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    // Live clock
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Sticky status bar on scroll
    useEffect(() => {
        const handleScroll = () => {
            setShowStickyStatus(window.scrollY > 250);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Simulate pull-to-refresh
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Sticky Mini Status Bar - Mobile */}
            <AnimatePresence>
                {showStickyStatus && (
                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -60, opacity: 0 }}
                        className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5"
                    >
                        <div className="px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                                <span className="text-sm font-bold text-[#F2F2F2]">All Systems Operational</span>
                            </div>
                            <span className="text-xs font-mono text-[#666]">{currentTime}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-24 md:pt-40 pb-32 md:pb-32 px-4 md:px-8 max-w-7xl mx-auto">

                {/* Pull to Refresh Button - Mobile */}
                <div className="lg:hidden flex justify-center mb-4">
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-white/5 rounded-full text-xs font-bold text-[#888] active:scale-95 transition-all"
                    >
                        <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#CCFF00]' : ''}`} />
                        {isRefreshing ? 'Refreshing...' : 'Pull to Refresh'}
                    </button>
                </div>

                {/* Big Status Summary Card - Mobile First */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 md:mb-16"
                >
                    {/* Mobile: Big Status Card */}
                    <div className="lg:hidden p-6 bg-gradient-to-br from-[#0a0a0a] to-[#080808] border border-white/5 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#CCFF00]/5 blur-[60px]" />

                        <div className="relative z-10 flex items-center gap-6">
                            {/* Health Ring */}
                            <div className="relative w-24 h-24 shrink-0">
                                <svg className="w-full h-full -rotate-90">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="42"
                                        stroke="#111"
                                        strokeWidth="8"
                                        fill="none"
                                    />
                                    <motion.circle
                                        cx="48"
                                        cy="48"
                                        r="42"
                                        stroke="#CCFF00"
                                        strokeWidth="8"
                                        fill="none"
                                        strokeLinecap="round"
                                        initial={{ strokeDasharray: "0 264" }}
                                        animate={{ strokeDasharray: `${(parseFloat(overallUptime) / 100) * 264} 264` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-lg font-bold text-[#CCFF00]">{overallUptime}%</span>
                                    <span className="text-[9px] text-[#666] uppercase">Uptime</span>
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 bg-[#CCFF00] rounded-full animate-pulse" />
                                    <span className="text-[#CCFF00] text-sm font-bold">All Operational</span>
                                </div>
                                <h1 className="text-2xl font-bold font-['Clash_Display'] text-[#F2F2F2] mb-1">
                                    System Status
                                </h1>
                                <p className="text-[11px] text-[#666] font-mono">
                                    Last check: {currentTime} UTC+5:30
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats Row */}
                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div className="p-3 bg-white/5 rounded-xl text-center">
                                <p className="text-lg font-bold text-[#F2F2F2]">{systems.length}</p>
                                <p className="text-[10px] text-[#666] uppercase">Systems</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl text-center">
                                <p className="text-lg font-bold text-[#F2F2F2]">{regions.length}</p>
                                <p className="text-[10px] text-[#666] uppercase">Regions</p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl text-center">
                                <p className="text-lg font-bold text-[#CCFF00]">0</p>
                                <p className="text-[10px] text-[#666] uppercase">Issues</p>
                            </div>
                        </div>
                    </div>

                    {/* Desktop: Original Hero */}
                    <div className="hidden lg:flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-full mb-8">
                            <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-ping" />
                            <span className="text-[#CCFF00] text-[11px] uppercase tracking-[0.3em] font-bold">All Systems Operational</span>
                        </div>

                        <h1 className="text-8xl font-bold font-['Clash_Display'] leading-none text-[#F2F2F2] mb-6">
                            System <span className="text-white/20">Status.</span>
                        </h1>

                        <p className="text-[#555] font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                            System Heartbeat:
                            <span className="text-[#CCFF00] min-w-[80px] inline-block font-bold">
                                {currentTime}
                            </span>
                            <span className="text-[#333]">/ UTC+5:30</span>
                        </p>
                    </div>
                </motion.div>

                {/* Horizontal Scrollable Region Chips - Mobile */}
                <div className="lg:hidden mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold text-[#F2F2F2] flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#CCFF00]" />
                            Edge Regions
                        </h3>
                        <span className="text-[10px] text-[#666] font-mono">{regions.length} nodes active</span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
                        {regions.map((region) => (
                            <div
                                key={region.code}
                                className="shrink-0 p-3 bg-[#0a0a0a] border border-white/5 rounded-xl min-w-[120px] active:scale-95 transition-transform"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 bg-[#CCFF00] rounded-full" />
                                    <span className="text-xs font-mono font-bold text-[#888]">{region.code}</span>
                                </div>
                                <p className="text-sm font-bold text-[#F2F2F2] mb-1">{region.location}</p>
                                <p className="text-[#CCFF00] text-xs font-mono">{region.latency}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">

                    {/* Component Health List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold font-['Clash_Display'] flex items-center gap-2">
                                <Server className="w-5 h-5 text-[#CCFF00]" />
                                Core Infrastructure
                            </h2>
                            <span className="text-[10px] text-[#666] font-mono uppercase tracking-wider">Live Status</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {systems.map((system) => (
                                <motion.div
                                    key={system.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="p-4 bg-[#0a0a0a] border border-white/5 rounded-xl active:bg-[#0c0c0c] active:scale-[0.99] hover:border-[#CCFF00]/20 transition-all"
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#111] flex items-center justify-center text-[#CCFF00]">
                                                {system.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-[#F2F2F2]">{system.name}</h3>
                                                <p className="text-[10px] text-[#CCFF00] uppercase font-bold tracking-wider">{system.status}</p>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                                    </div>

                                    {/* Mini Progress Bar */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-1.5 bg-[#111] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[#CCFF00]"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${system.uptime}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                        <span className="text-xs font-mono text-[#888]">{system.uptime}%</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop: Regions & Protection - Hidden on Mobile (shown as chips above) */}
                    <aside className="hidden lg:block space-y-8">
                        <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden">
                            <h3 className="text-[#CCFF00] text-[11px] uppercase tracking-[0.2em] font-bold mb-8 flex items-center gap-3">
                                <Globe className="w-4 h-4" />
                                Edge Topology
                            </h3>

                            <div className="space-y-6">
                                {regions.map((region) => (
                                    <div key={region.code} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-[#111] border border-white/5 flex items-center justify-center text-[11px] font-mono text-[#666] group-hover:text-[#CCFF00] transition-colors">
                                                {region.code}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-[#F2F2F2]">{region.location}</p>
                                                <p className="text-[11px] text-[#666] uppercase tracking-wider leading-none mt-1">{region.status}</p>
                                            </div>
                                        </div>
                                        <span className="text-[#CCFF00] text-xs font-mono">{region.latency}</span>
                                    </div>
                                ))}
                            </div>

                            <motion.div
                                className="mt-12 p-4 bg-white/5 border border-white/10 rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
                                    <span className="text-[11px] uppercase font-bold text-[#F2F2F2]">Protection Active</span>
                                </div>
                                <p className="text-[11px] text-[#666] leading-relaxed">
                                    Global DDoS mitigation nodes are active across the fluid fabric. No active threats detected.
                                </p>
                            </motion.div>
                        </div>
                    </aside>
                </div>

                {/* DDoS Protection Card - Mobile */}
                <div className="lg:hidden mt-6 p-4 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#CCFF00]/10 flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5 text-[#CCFF00]" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-[#F2F2F2]">DDoS Protection Active</p>
                        <p className="text-[11px] text-[#666]">No threats detected</p>
                    </div>
                    <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-pulse" />
                </div>

                {/* 90 Day Uptime History */}
                <section className="mt-12 md:mt-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-12">
                        <div>
                            <h2 className="text-xl md:text-3xl font-bold font-['Clash_Display'] text-[#F2F2F2] mb-1">Uptime History</h2>
                            <p className="text-[#666] text-xs md:text-sm">Last 90 days availability</p>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] md:text-[11px] uppercase tracking-wider font-bold">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#CCFF00] rounded-sm" />
                                <span className="text-[#888]">Operational</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-white/10 rounded-sm" />
                                <span className="text-[#666]">Maintenance</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl md:rounded-3xl">
                        <div className="flex flex-wrap gap-1">
                            {days.map((day) => (
                                <motion.button
                                    key={day.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: day.id * 0.003 }}
                                    onClick={() => setSelectedDay(selectedDay === day.id ? null : day.id)}
                                    className={`w-[calc((100%-89*4px)/90)] min-w-[6px] md:min-w-[10px] h-8 md:h-12 rounded-[2px] transition-all active:scale-110 ${day.status === 'up' ? 'bg-[#CCFF00] opacity-30 hover:opacity-100' :
                                        day.status === 'slow' ? 'bg-white/10 hover:bg-white/20' :
                                            'bg-red-500/30 hover:bg-red-500/60'
                                        } ${selectedDay === day.id ? 'opacity-100 ring-2 ring-[#CCFF00]' : ''}`}
                                />
                            ))}
                        </div>

                        {/* Selected Day Tooltip */}
                        <AnimatePresence>
                            {selectedDay !== null && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-4 p-3 bg-white/5 rounded-xl flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
                                        <span className="text-sm text-[#F2F2F2]">{days[selectedDay].date}</span>
                                    </div>
                                    <span className="text-xs font-mono text-[#CCFF00]">100% Uptime</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between mt-4 text-[10px] md:text-[11px] text-[#666] font-mono uppercase tracking-wider">
                            <span>90 Days Ago</span>
                            <span className="text-[#CCFF00] font-bold">Today: 100%</span>
                        </div>
                    </div>
                </section>

                {/* Incident Feed - Timeline Style */}
                <section className="mt-12 md:mt-32">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl md:text-3xl font-bold font-['Clash_Display'] text-[#F2F2F2]">Recent Updates</h2>
                        <span className="text-[10px] text-[#666] font-mono uppercase">{incidents.length} entries</span>
                    </div>

                    <div className="space-y-3">
                        {incidents.map((incident, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setExpandedIncident(expandedIncident === idx ? null : idx)}
                                    className="w-full p-4 flex items-center justify-between active:bg-[#0c0c0c] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#CCFF00]/10 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-[#F2F2F2]">{incident.title}</p>
                                            <p className="text-[10px] text-[#666] font-mono">{incident.date}</p>
                                        </div>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: expandedIncident === idx ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-[#444]" />
                                    </motion.div>
                                </button>

                                <AnimatePresence>
                                    {expandedIncident === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 pt-2 border-t border-white/5">
                                                <p className="text-[#888] text-sm leading-relaxed">{incident.description}</p>
                                                <div className="mt-3 flex items-center gap-2">
                                                    <span className="text-[10px] text-[#CCFF00] uppercase font-bold px-2 py-1 bg-[#CCFF00]/10 rounded-full">Resolved</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
};

export default StatusPage;
