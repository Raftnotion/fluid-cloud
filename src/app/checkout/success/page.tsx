'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Globe, Mail, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const [orderDetails, setOrderDetails] = useState({
        domain: '',
        email: '',
        plan: '3 Year (Price Lock)',
    });

    useEffect(() => {
        const savedData = localStorage.getItem('checkout_form');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                setOrderDetails({
                    domain: data.domain || '',
                    email: data.email || '',
                    plan: searchParams.get('plan') === '1' ? '1 Year Plan' :
                        searchParams.get('plan') === '2' ? '2 Year Plan' : '3 Year (Price Lock)',
                });
            } catch {
                // Ignore parse errors
            }
        }
    }, [searchParams]);

    return (
        <div className="relative min-h-screen bg-[#050505] text-[#F2F2F2] font-['Satoshi'] selection:bg-[#CCFF00] selection:text-black">
            <Header />

            {/* Background Accent */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

            <main className="pt-32 pb-40 px-4 md:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 mx-auto bg-[#CCFF00]/10 border-2 border-[#CCFF00] rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-[#CCFF00]" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold font-['Clash_Display'] uppercase tracking-wider mb-4"
                    >
                        Payment Successful
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[#888] text-lg mb-12"
                    >
                        Your Fluid Cloud is being deployed. You&apos;ll receive setup instructions shortly.
                    </motion.p>

                    {/* Order Details Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 md:p-8 mb-8 text-left"
                    >
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#666] mb-6">Order Details</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a]">
                                <div className="flex items-center gap-3 text-[#888]">
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm font-bold">Domain</span>
                                </div>
                                <span className="text-sm font-bold text-[#F2F2F2]">{orderDetails.domain || 'Not specified'}</span>
                            </div>

                            <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a]">
                                <div className="flex items-center gap-3 text-[#888]">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-bold">Email</span>
                                </div>
                                <span className="text-sm font-bold text-[#F2F2F2]">{orderDetails.email || 'Not specified'}</span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-3 text-[#888]">
                                    <Shield className="w-4 h-4" />
                                    <span className="text-sm font-bold">Plan</span>
                                </div>
                                <span className="text-sm font-bold text-[#CCFF00]">{orderDetails.plan}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Next Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-5 bg-[#CCFF00]/5 border border-[#CCFF00]/10 rounded-xl mb-8"
                    >
                        <p className="text-xs text-[#CCFF00] font-bold uppercase tracking-wider flex items-center justify-center gap-2 mb-2">
                            <Zap className="w-3 h-3 fill-current" /> What&apos;s Next
                        </p>
                        <p className="text-sm text-[#888]">
                            Check your email for DNS configuration instructions. Your server will be auto-provisioned in <span className="text-[#999] font-bold">10 minutes</span>.
                        </p>
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] active:scale-[0.97] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
                        >
                            Back to Home <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const SuccessPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-[#CCFF00]/20 border-t-[#CCFF00] rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#555]">Loading...</p>
                </div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
};

export default SuccessPage;
