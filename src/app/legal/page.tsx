"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, Cookie, RefreshCcw, ArrowRight, Hash, AlertTriangle, Database, Mail, Globe, Clock, Copyright, Gavel, Box, Key } from 'lucide-react';

const SECTIONS = [
    {
        id: "terms",
        title: "Terms of Service",
        icon: <FileText className="w-4 h-4" />,
        docId: "WPF-TOS-2026.01",
        version: "v2.4.0",
        lastRevised: "Jan 20, 2026",
        content: `
            Welcome to WPFYE. These terms and conditions outline the rules and regulations for the use of WPFYE TECHNOLOGY (OPC) Pvt Ltd's Website, located at wpfye.com. By accessing this website we assume you accept these terms and conditions. Do not continue to use WPFYE if you do not agree to take all of the terms and conditions stated on this page.

            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
        `
    },
    {
        id: "aup",
        title: "Acceptable Use Policy",
        icon: <AlertTriangle className="w-4 h-4" />,
        docId: "WPF-AUP-2026.01",
        version: "v1.0.0",
        lastRevised: "Jan 26, 2026",
        content: `
            Our Acceptable Use Policy (AUP) ensures that our high-intensity infrastructure remains optimized for all users. Violation of these terms may result in immediate service suspension or termination.

            PROHIBITED CONTENT: Hosting of phishing sites, copyrighted material without authorization, and adult (18+) content is strictly prohibited on any WPFYE infrastructure.

            RESOURCE USAGE: While we offer generous and unmetered web space, this space is strictly intended for live, website-related content only. The use of our servers for storing personal files, backups, archives, or large amounts of non-web-related data is strictly prohibited. Any such usage is considered a direct violation of this AUP.

            DATABASE LIMITS: Users may create unlimited databases. However, each individual database is capped at a maximum storage limit of 1GB. This limit is absolute and cannot be increased to maintain peak I/O performance across our fluid fabric.

            EMAIL SPECIFICATIONS: Unlimited email accounts are supported. Each individual mailbox is allocated a maximum storage capacity of 10GB.
        `
    },
    {
        id: "privacy",
        title: "Privacy Policy",
        icon: <Shield className="w-4 h-4" />,
        docId: "WPF-PP-2026.01",
        version: "v1.8.2",
        lastRevised: "Jan 22, 2026",
        content: `
            Your privacy is important to us. It is WPFYE's policy to respect your privacy regarding any information we may collect from you across our website, https://wpfye.com, and other sites we own and operate.

            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.

            We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
        `
    },
    {
        id: "cookies",
        title: "Cookie Policy",
        icon: <Cookie className="w-4 h-4" />,
        docId: "WPF-CP-2026.01",
        version: "v1.2.0",
        lastRevised: "Jan 15, 2026",
        content: `
            We use cookies to help improve your experience of https://wpfye.com. This cookie policy is part of WPFYE's privacy policy, and covers the use of cookies between your device and our site.

            If you do not wish to accept cookies from us, you should instruct your browser to refuse cookies from https://wpfye.com, with the understanding that we may be unable to provide you with some of your desired content and services.
        `
    },
    {
        id: "refund",
        title: "Refund Policy",
        icon: <RefreshCcw className="w-4 h-4" />,
        docId: "WPF-RP-2026.01",
        version: "v1.1.0",
        lastRevised: "Jan 26, 2026",
        content: `
            We strive for total customer satisfaction. Our refund policy is designed to be fair while protecting the integrity of our premium licensed resources.

            REFUND WINDOW: We offer a 24-hour money-back guarantee for all new 'Fluid' plan subscriptions. If you are not satisfied with our infrastructure within the first 24 hours of purchase, you are eligible for a full refund.

            PREMIUM ADDONS (ELEMENTOR): To prevent the misuse of our premium licensed resources, please note that free premium addons, including but not limited to Elementor Addons, will be provisioned to your account only after the initial 24-hour refund window has passed. License validity for these addons is strictly tied to your active hosting status; licenses will be deactivated immediately upon service termination or cancellation.

            EXCEPTIONS: Refunds are not provided for recurring billing cycles or for services where violations of our Acceptable Use Policy (AUP) have occurred. All refund requests are processed within 3-5 business days.
        `
    },
    {
        id: "sla",
        title: "Service Level Agreement",
        icon: <Clock className="w-4 h-4" />,
        docId: "WPF-SLA-2026.01",
        version: "v1.0.0",
        lastRevised: "Jan 27, 2026",
        content: `
            Our Service Level Agreement (SLA) outlines our commitment to maintaining the highest standards of reliability for your infrastructure.

            UPTIME GUARANTEE: WPFYE guarantees a 99.9% network uptime on a monthly basis. Our fluid fabric is engineered for high availability with automated failover systems.

            SERVICE CREDITS: In the event that we fail to meet our 99.9% uptime guarantee, customers may be eligible to receive service credits. These credits are applied to the next billing cycle and are calculated based on the duration of the qualified downtime.

            MAINTENANCE: Scheduled maintenance windows are not counted as downtime. We provide at least 24 hours notice for all non-emergency maintenance that may affect service availability.
        `
    },
    {
        id: "dmca",
        title: "Abuse & DMCA",
        icon: <Copyright className="w-4 h-4" />,
        docId: "WPF-ADM-2026.01",
        version: "v1.1.0",
        lastRevised: "Jan 27, 2026",
        content: `
            WPFYE maintains a zero-tolerance policy towards infrastructure abuse. This section outlines how to report both copyright infringement and general service abuse.

            REPORTING ABUSE: To report phishing, malware, spam, or any other violation of our Acceptable Use Policy (AUP), please email report@wpfye.com. Include the IP address or domain name involved, along with supporting evidence.

            DMCA & COPYRIGHT: If you believe content on our network infringes your copyright, send a formal DMCA notice to legal@wpfye.com. Include a signature, identification of the work, and your contact details.

            COUNTER-NOTICES: We review all counter-notices regarding removed content and may restore it if no legal action is pursued by the complainant.
        `
    },
    {
        id: "disclaimer",
        title: "Disclaimer",
        icon: <Gavel className="w-4 h-4" />,
        docId: "WPF-DL-2026.01",
        version: "v1.0.0",
        lastRevised: "Jan 27, 2026",
        content: `
            LIMITATION OF LIABILITY: Under no circumstances shall WPFYE TECHNOLOGY (OPC) Pvt Ltd be held liable for any direct, indirect, incidental, or consequential damages, including but not limited to loss of business, data, or profits, arising from the use or inability to use our services.

            "AS IS" SERVICE: Our infrastructure and services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Users use our services at their own risk.

            MODIFICATIONS: We reserve the right to modify these protocols at any time. Significant changes will be communicated via email or through our platform. Continued use of the service constitutes acceptance of the new terms.
        `
    },
    {
        id: "governing-law",
        title: "Governing Law",
        icon: <Globe className="w-4 h-4" />,
        docId: "WPF-GL-2026.01",
        version: "v1.0.0",
        lastRevised: "Jan 27, 2026",
        content: `
            JURISDICTION: These terms and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.

            COURTS: Any legal action or proceeding related to your access to, or use of, the Site shall be instituted in a state or federal court in New Delhi, India. You and WPFYE agree to submit to the jurisdiction of, and agree that venue is proper in, these courts in any such legal action or proceeding.

            CORPORATE IDENTITY: 
            CIN: U63112KA2024OPC193341
            GSTIN: 29AADCW9345A1Z7

            OFFICE ADDRESS: HD-105 WeWork Cinnabar Hills, Embassy Golf Links Business Park, Challaghatta, Bengaluru, Karnataka 560071, India.
        `
    },
    {
        id: "data-policy",
        title: "Data & Backups",
        icon: <Database className="w-4 h-4" />,
        docId: "WPF-DBP-2026.01",
        version: "v1.0.0",
        lastRevised: "Jan 27, 2026",
        content: `
            BACKUP RESPONSIBILITY: While we perform routine infrastructure-level backups, these are for disaster recovery purposes only. The primary responsibility for backing up website data, databases, and emails lies solely with the User.

            RETENTION: We retain user data only as long as an account is active. Upon service termination, all hosted data is purged from our production servers within 30 days.

            RECOVERY: We do not guarantee the ability to restore data for individual accounts from our system backups. Users are encouraged to maintain off-site backups of their critical business data.
        `
    },
    {
        id: "third-party",
        title: "Third-Party Software",
        icon: <Box className="w-4 h-4" />,
        docId: "WPF-TPS-2026.01",
        version: "v1.0.0",
        lastRevised: "Jan 27, 2026",
        content: `
            PROVISIONING: WPFYE may provide access to third-party software, including but not limited to Elementor Pro and various WordPress addons, as part of our service offerings.

            NO WARRANTY: We provide these tools "as is" and do not guarantee their continued availability, functionality, or compatibility with future software versions. WPFYE is not responsible for bugs, security vulnerabilities, or performance issues within third-party software.

            COMPLIANCE: Users must adhere to the End User License Agreements (EULA) of these respective third-party providers. We reserve the right to remove or replace these tools at our discretion without prior notice.
        `
    },
    {
        id: "account-security",
        title: "Account Security",
        icon: <Key className="w-4 h-4" />,
        docId: "WPF-SEC-2026.01",
        version: "v1.0.0",
        lastRevised: "Jan 27, 2026",
        content: `
            USER RESPONSIBILITY: You are solely responsible for maintaining the confidentiality of your account credentials, including passwords and API keys. Any activity occurring under your account is your responsibility.

            CREDENTIAL PROTECTION: We strongly recommend the use of two-factor authentication (2FA) where available. WPFYE will never ask for your password via email or chat.

            UNAUTHORIZED ACCESS: You must notify us immediately at compliance@wpfye.com if you suspect any unauthorized use of your account. WPFYE is not liable for any loss or damage arising from your failure to protect your login credentials.
        `
    }
];

const LegalPage = () => {
    const [activeSection, setActiveSection] = useState("terms");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-15% 0px -75% 0px', // Detects section when it enters the top 15% of the viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        SECTIONS.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="relative min-h-screen selection:bg-[#CCFF00] selection:text-black bg-[#050505] text-[#F2F2F2] font-['Satoshi']">
            <Header />

            {/* Background Grid Accent */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </div>

            <main className="relative z-10 pt-40 pb-32 px-8 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Desktop Side Navigation */}
                    <aside className="hidden lg:block w-72 shrink-0">
                        <div className="sticky top-40 space-y-8">
                            <div>
                                <h3 className="text-[#CCFF00] text-[11px] uppercase tracking-[0.4em] font-medium font-['Satoshi'] mb-6">Directory</h3>
                                <nav className="space-y-1">
                                    {SECTIONS.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg group ${activeSection === section.id
                                                ? 'bg-[#111] text-[#CCFF00] border-l-2 border-[#CCFF00]'
                                                : 'text-[#555] hover:text-[#888] hover:translate-x-1'
                                                }`}
                                        >
                                            <span className={`${activeSection === section.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
                                                {section.icon}
                                            </span>
                                            {section.title}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="pt-8 border-t border-[#111] space-y-4">
                                <div className="p-4 bg-[#0a0a0a] border border-[#111] rounded-xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center border border-[#222]">
                                        <Shield className="w-5 h-5 text-[#CCFF00]" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-[#555] uppercase tracking-wider font-medium font-['Satoshi'] mb-1">Global Standard</p>
                                        <p className="text-xs font-bold text-[#F2F2F2]">GDPR Compliant</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-24"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-[1px] w-12 bg-[#CCFF00]" />
                                <span className="text-[#CCFF00] text-[11px] uppercase tracking-[0.4em] font-medium font-['Satoshi']">Contractual Framework</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-bold font-['Clash_Display'] leading-none text-[#F2F2F2]">
                                Legal <br />
                                <span className="text-white/20">Protocols.</span>
                            </h1>
                        </motion.div>

                        <div className="space-y-32">
                            {SECTIONS.map((section, index) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7 }}
                                    className="relative scroll-mt-40"
                                >
                                    {/* Section Header with Metadata */}
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#111]">
                                        <div>
                                            <div className="flex items-center gap-2 text-[#CCFF00] mb-2">
                                                <Hash className="w-3 h-3" />
                                                <span className="text-[11px] uppercase tracking-widest font-mono font-bold">{section.docId}</span>
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-bold font-['Clash_Display'] text-[#F2F2F2]">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <div className="flex gap-8 font-mono text-[11px] text-[#555] uppercase tracking-widest">
                                            <div>
                                                <p className="mb-1 text-[#333]">Version</p>
                                                <p className="text-[#888]">{section.version}</p>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-[#333]">Last Audit</p>
                                                <p className="text-[#888]">{section.lastRevised}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="font-['Satoshi'] text-[#888] text-lg leading-relaxed space-y-6 max-w-3xl">
                                        {section.content.trim().split('\n\n').map((paragraph, i) => (
                                            <p key={i} className="font-medium text-[#888]">
                                                {paragraph.trim()}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Footer Section Accent */}
                                    <div className="mt-12 flex items-center gap-4 text-[#333]">
                                        <div className="h-[1px] flex-1 bg-[#111]" />
                                        <span className="text-[11px] tracking-[0.2em] uppercase font-mono italic">End of Section {index + 1}</span>
                                        <div className="h-[1px] w-12 bg-[#111]" />
                                    </div>
                                </motion.section>
                            ))}
                        </div>

                        {/* Final Contact Callout */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="mt-40 p-12 bg-[#080808] border border-[#111] rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10">
                                <h3 className="text-[#F2F2F2] font-bold text-3xl mb-4 font-['Clash_Display']">Legal Inquiries</h3>
                                <p className="text-[#555] mb-6 max-w-xl text-lg">
                                    Our documentation is designed for transparency. If you require clarification on specific clauses or data processing protocols, our legal team is available.
                                </p>
                                <div className="mb-10 p-6 bg-white/5 border border-white/10 rounded-2xl inline-block">
                                    <p className="text-xs text-[#CCFF00] uppercase tracking-widest font-bold mb-3 font-['Satoshi']">Registered HQ & Identity</p>
                                    <p className="text-base text-[#F2F2F2]/90 leading-relaxed max-w-[400px] mb-4 font-medium">
                                        HD-105 WeWork Cinnabar Hills, Embassy Golf Links Business Park, Challaghatta, Bengaluru, Karnataka 560071, India
                                    </p>
                                    <div className="pt-4 border-t border-white/10 font-mono text-xs text-[#888] space-y-2">
                                        <p className="flex justify-between gap-8"><span>CIN</span> <span className="text-[#F2F2F2]">U63112KA2024OPC193341</span></p>
                                        <p className="flex justify-between gap-8"><span>GSTIN</span> <span className="text-[#F2F2F2]">29AADCW9345A1Z7</span></p>
                                    </div>
                                </div>
                                <br />
                                <a
                                    href="mailto:legal@wpfye.com"
                                    className="inline-flex items-center gap-4 px-10 py-5 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(204,255,0,0.15)] group"
                                >
                                    Contact Compliance
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LegalPage;
