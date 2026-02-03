'use client';

import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const FailedContent = () => {
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan') || '3';

    return (
        <div className="relative min-h-screen bg-[#050505] text-[#F2F2F2] font-['Satoshi'] selection:bg-[#CCFF00] selection:text-black">
            <Header />

            {/* Background Accent */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

            <main className="pt-32 pb-40 px-4 md:px-8 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Failed Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="mb-8"
                    >
                        <div className="w-24 h-24 mx-auto bg-red-500/10 border-2 border-red-500 rounded-full flex items-center justify-center">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl md:text-5xl font-bold font-['Clash_Display'] uppercase tracking-wider mb-4"
                    >
                        Payment Failed
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-[#888] text-lg mb-12"
                    >
                        Something went wrong with your payment. Don&apos;t worry, no charges were made.
                    </motion.p>

                    {/* Error Info Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 md:p-8 mb-8"
                    >
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-[#666] mb-4">Common Reasons</h3>

                        <ul className="text-left text-sm text-[#888] space-y-3">
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-2 shrink-0" />
                                <span>Payment was cancelled or interrupted</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-2 shrink-0" />
                                <span>Insufficient funds or card limit exceeded</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-2 shrink-0" />
                                <span>Bank declined the transaction</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] mt-2 shrink-0" />
                                <span>Network or connection issues</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href={`/checkout?plan=${plan}&s=payment`}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] active:scale-[0.97] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
                        >
                            <RefreshCw className="w-4 h-4" /> Try Again
                        </Link>

                        <Link
                            href="/"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-[#333] text-[#888] font-black uppercase tracking-widest text-xs rounded-xl hover:border-[#555] hover:text-[#F2F2F2] active:scale-[0.97] transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back Home
                        </Link>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

const FailedPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#555]">Loading...</p>
                </div>
            </div>
        }>
            <FailedContent />
        </Suspense>
    );
};

export default FailedPage;
