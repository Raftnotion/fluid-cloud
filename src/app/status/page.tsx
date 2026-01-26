"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { Activity, Globe, Zap, Database, Server, Timer, ShieldCheck, AlertCircle } from 'lucide-react';

const StatusPage = () => {
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    useEffect(() => {
        // Set initial time on mount to avoid hydration mismatch
        setLastUpdated(new Date().toLocaleTimeString());

        const interval = setInterval(() => {
            setLastUpdated(new Date().toLocaleTimeString());
        }, 1000); // Sync every second for "heartbeat" feel
        return () => clearInterval(interval);
    }, []);

    const systems = [
        { name: "Fluid Fabric Network", status: "Operational", uptime: "99.99%" },
        { name: "Google Public DNS", status: "Operational", uptime: "100%" },
        { name: "API & Control Plane", status: "Operational", uptime: "99.98%" },
        { name: "Object Storage Cluster", status: "Operational", uptime: "99.99%" },
        { name: "Database Nodes (SQL)", status: "Operational", uptime: "99.95%" },
        { name: "Edge Caching Layers", status: "Operational", uptime: "100%" },
    ];

    const regions = [
        { code: "US-VA", location: "Virginia (Core HQ)", status: "Operational" },
        { code: "EU-LN", location: "London (Edge Node)", status: "Operational" },
        { code: "AS-MB", location: "Mumbai (Edge Node)", status: "Operational" },
        { code: "AS-SG", location: "Singapore (Edge Node)", status: "Operational" },
        { code: "EU-FR", location: "Frankfurt (Edge Node)", status: "Operational" },
        { code: "JP-TY", location: "Tokyo (Edge Node)", status: "Operational" },
    ];

    // Perfect 90-day uptime grid
    const days = Array.from({ length: 90 }, (_, i) => ({
        id: i,
        status: 'up'
    }));

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-40 pb-32 px-8 max-w-7xl mx-auto">
                {/* Hero Status Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 text-center flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-full mb-8">
                        <div className="w-2 h-2 bg-[#CCFF00] rounded-full animate-ping" />
                        <span className="text-[#CCFF00] text-[10px] uppercase tracking-[0.4em] font-black">All Systems Operational</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-bold font-['Clash_Display'] leading-none text-[#F2F2F2] mb-6">
                        System <span className="text-white/20">Status.</span>
                    </h1>

                    <p className="text-[#555] font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                        System Heartbeat:
                        <span className="text-[#888] min-w-[100px] inline-block">
                            {lastUpdated || "--:--:--"}
                        </span>
                        <span className="text-[#333]">/ UTC+5:30</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Component Health List */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold font-['Clash_Display'] flex items-center gap-3">
                                <Server className="w-5 h-5 text-[#CCFF00]" />
                                Core Infrastructure
                            </h2>
                            <span className="text-[10px] text-[#333] font-mono uppercase tracking-widest">Global Standard Health</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {systems.map((system) => (
                                <div key={system.name} className="p-6 bg-[#0a0a0a] border border-white/5 rounded-2xl group hover:border-[#CCFF00]/20 transition-all">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-bold text-[#F2F2F2]">{system.name}</h3>
                                        <span className="text-[10px] text-[#CCFF00] uppercase font-bold tracking-tighter">Operational</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-[#333] uppercase font-bold tracking-widest">Global Uptime</p>
                                            <p className="text-sm font-mono text-[#888]">{system.uptime}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Regions & Latency */}
                    <aside className="space-y-8">
                        <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden">
                            <h3 className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-3">
                                <Globe className="w-4 h-4" />
                                Edge Topology
                            </h3>

                            <div className="space-y-6">
                                {regions.map((region) => (
                                    <div key={region.code} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-[#111] border border-white/5 flex items-center justify-center text-[10px] font-mono text-[#555] group-hover:text-[#CCFF00] transition-colors">
                                                {region.code}
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-[#F2F2F2]">{region.location}</p>
                                                <p className="text-[10px] text-[#333] uppercase tracking-widest leading-none mt-1">{region.status}</p>
                                            </div>
                                        </div>
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
                                    <span className="text-[10px] uppercase font-bold text-[#F2F2F2]">Protection Active</span>
                                </div>
                                <p className="text-[10px] text-[#555] leading-relaxed">
                                    Global DDoS mitigation nodes are active across the fluid fabric. No active threats detected.
                                </p>
                            </motion.div>
                        </div>
                    </aside>
                </div>

                {/* 90 Day Uptime History */}
                <section className="mt-32">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold font-['Clash_Display'] text-[#F2F2F2] mb-2">Uptime History</h2>
                            <p className="text-[#555] text-sm">Historical availability grid for the last 90 deployment cycles.</p>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-[#CCFF00] rounded-sm" />
                                <span className="text-[#CCFF00]">Operational</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-white/10 rounded-sm" />
                                <span className="text-[#333]">Scheduled Maintenance</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl">
                        <div className="flex flex-wrap gap-1 md:gap-[3px]">
                            {days.map((day) => (
                                <motion.div
                                    key={day.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: day.id * 0.005 }}
                                    className={`w-2 h-8 md:w-[13px] md:h-12 rounded-[2px] cursor-help transition-all hover:scale-125 hover:z-10 ${day.status === 'up' ? 'bg-[#CCFF00] opacity-30 hover:opacity-100' :
                                        day.status === 'slow' ? 'bg-white/10 hover:bg-white/20' :
                                            'bg-red-500/30 hover:bg-red-500/60'
                                        }`}
                                    title={`Cycle ${90 - day.id}: ${day.status === 'up' ? '100% Uptime' : day.status === 'slow' ? 'Maintenance' : 'Degraded Performance'}`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-6 text-[10px] text-[#333] font-mono uppercase tracking-[0.2em]">
                            <span>90 Days Ago</span>
                            <span className="text-[#555] font-bold">Today: 100% Availability</span>
                        </div>
                    </div>
                </section>

                {/* Active Incidents / Maintenance */}
                <section className="mt-32 p-12 bg-[#080808] border border-[#111] rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />
                    <div className="relative z-10">
                        <h3 className="text-[#F2F2F2] font-bold text-3xl mb-8 font-['Clash_Display']">External Feed</h3>

                        <div className="space-y-6">
                            <div className="flex gap-6 pb-6 border-b border-white/5">
                                <span className="text-[10px] font-mono text-[#333] pt-1">JAN 24</span>
                                <div>
                                    <h4 className="text-[#F2F2F2] font-bold text-sm mb-2">Planned Edge Optimization</h4>
                                    <p className="text-[#555] text-sm leading-relaxed max-w-2xl">
                                        We successfully completed routine optimization on our EU-West nodes. No impact was recorded on active deployments across the fabric.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <span className="text-[10px] font-mono text-[#333] pt-1">JAN 12</span>
                                <div>
                                    <h4 className="text-[#F2F2F2] font-bold text-sm mb-2">Fluid Network Expansion</h4>
                                    <p className="text-[#555] text-sm leading-relaxed max-w-2xl">
                                        Provisioned 400 additional redundant core routes to the US-East cluster. Bandwidth capacity increased by 40% globally.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default StatusPage;
