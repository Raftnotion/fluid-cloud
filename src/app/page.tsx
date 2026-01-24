"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AutoscaleDemo from "@/components/AutoscaleDemo";
import ComparisonSection from "@/components/ComparisonSection";
import Testimonials from "@/components/Testimonials";
import PlanPhilosophy from "@/components/PlanPhilosophy";
import PriceLock from "@/components/PriceLock";
import GiftSection from "@/components/GiftSection";
import Footer from "@/components/Footer";
import TrustCloud from "@/components/TrustCloud";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    const [trafficScale, setTrafficScale] = useState(0.1);

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black">
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#CCFF00] origin-left z-[100]"
                style={{ scaleX }}
            />

            <Header />

            <main className="relative z-10">
                <Hero />
                <TrustCloud />

                <AutoscaleDemo
                    trafficScale={trafficScale}
                    setTrafficScale={setTrafficScale}
                />

                <ComparisonSection />

                <Testimonials />

                <PlanPhilosophy />

                <PriceLock />

                <GiftSection />
            </main>

            <Footer />
        </div>
    );
}
