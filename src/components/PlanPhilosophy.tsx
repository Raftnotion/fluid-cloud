"use client";

import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import {
    Infinity, Zap, Terminal, Shield, HardDrive, Activity,
    Database, Mail, ShieldCheck, Scaling, Boxes, Globe,
    Layers, ShieldAlert, Search, ShoppingBag, Gauge, Network
} from 'lucide-react';

const BentoBox: React.FC<{ icon: React.ReactNode, title: string, desc: string, index: number }> = ({ icon, title, desc, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            className="group relative p-10 border border-[#333333] bg-[#0a0a0a] rounded-xl hover:border-[#CCFF00]/40 transition-colors overflow-hidden"
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(204, 255, 0, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative z-10">
                <div className="mb-8 w-14 h-14 flex items-center justify-center border border-[#333333] bg-black/50 rounded-lg group-hover:border-[#CCFF00] group-hover:bg-[#CCFF00]/5 transition-all">
                    <div className="text-[#888888] group-hover:text-[#CCFF00] transition-colors scale-125">
                        {icon}
                    </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#F2F2F2] font-['Clash_Display']">{title}</h3>
                <p className="text-base text-[#888888] leading-relaxed font-medium">{desc}</p>
            </div>

            {/* Decorative Corner Element */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-[#CCFF00] rounded-full" />
            </div>
        </motion.div>
    );
};

const FEATURES = [
    { icon: <Infinity className="w-6 h-6" />, title: "Unlimited Websites", desc: "Host as many projects as you need without any restrictions." },
    { icon: <HardDrive className="w-6 h-6" />, title: "Unlimited SSD Webspace", desc: "High-performance SSD storage cluster for extreme read/write speeds." },
    { icon: <Activity className="w-6 h-6" />, title: "Unlimited Bandwidth", desc: "No data caps. Our edge network handles any volume of traffic." },
    { icon: <Database className="w-6 h-6" />, title: "Unlimited MySQL", desc: "Deploy countless databases with optimized InnoDB engines." },
    { icon: <Mail className="w-6 h-6" />, title: "Business Emails", desc: "Create unlimited mailboxes with a 10GB storage limit per email account." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "FREE SSL Certificates", desc: "Automated Let's Encrypt Wildcard SSL for every domain." },
    { icon: <Scaling className="w-6 h-6" />, title: "Autoscaling Hosting", desc: "Resources expand in real-time based on your traffic load." },
    { icon: <Boxes className="w-6 h-6" />, title: "80+ One-Click Apps", desc: "Deploy WordPress, Magento, and more in a single click." },
    { icon: <Zap className="w-6 h-6" />, title: "Acceleration Suite", desc: "Integrated optimizations for PHP, images, and delivery." },
    { icon: <Globe className="w-6 h-6" />, title: "FREE CDN", desc: "Global edge presence to serve content from the nearest node." },
    { icon: <Layers className="w-6 h-6" />, title: "Edge Caching", desc: "Lightning fast object and page caching at the edge level." },
    { icon: <ShieldAlert className="w-6 h-6" />, title: "1 Tbps+ DDoS Protection", desc: "Enterprise-grade mitigation against the largest attacks." },
    { icon: <Search className="w-6 h-6" />, title: "Malware Scans", desc: "Real-time file monitoring and automatic threat removal." },
    { icon: <ShoppingBag className="w-6 h-6" />, title: "Ecommerce Optimised", desc: "Fine-tuned environments for WooCommerce and Magento." },
    { icon: <Gauge className="w-6 h-6" />, title: "No LVE Limits", desc: "Full CPU/RAM access without legacy resource throttling." },
    { icon: <Network className="w-6 h-6" />, title: "Edge Infrastructure", desc: "Global redundant network with 99.9% uptime guarantee." },
];

const PlanPhilosophy: React.FC = () => {

    return (
        <section id="features" className="w-full py-40 px-8 flex flex-col items-center">
            <div className="max-w-7xl w-full p-[1px] bg-gradient-to-br from-[#333333] via-[#1a1a1a] to-[#333333] rounded-[32px] overflow-hidden shadow-2xl">
                <div className="p-10 md:p-20 bg-[#050505] rounded-[31px]">
                    <div className="text-center mb-20">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-[#CCFF00] text-[10px] uppercase tracking-[0.3em] font-black mb-6 block"
                        >
                            The Paradigm Shift
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-4xl md:text-7xl font-bold mb-8 text-[#F2F2F2] leading-[0.9]"
                        >
                            The Only Plan <br /> <span className="text-[#333333]">You'll Ever Need.</span>
                        </motion.h2>
                        <p className="text-[#888888] max-w-2xl mx-auto text-lg font-medium leading-relaxed">
                            We've stripped away the noise of tiered pricing. One industrial-grade architecture,
                            unlocked for every project you dream of.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {FEATURES.map((feature, i) => (
                            <BentoBox
                                key={i}
                                index={i}
                                icon={feature.icon}
                                title={feature.title}
                                desc={feature.desc}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlanPhilosophy;
