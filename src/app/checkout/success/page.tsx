'use client';

import React, { useEffect, useState, Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Globe, Mail, Shield, Receipt, IndianRupee } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { trackPurchase, isEventTracked, markEventTracked, getPurchaseEventId } from '@/extensions/meta-pixel';
import { sendOrderNotification } from '@/extensions/slack-notification';
import { getUTMData } from '@/extensions/utm-tracker';

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const [orderDetails, setOrderDetails] = useState({
        orderId: '',
        paymentId: '',
        amount: 0,
        domain: '',
        email: '',
        plan: '3 Year (Price Lock)',
    });

    useEffect(() => {
        // Get payment details from URL params
        const paymentId = searchParams.get('payment_id') || '';
        const orderId = searchParams.get('order_id') || '';
        const planParam = searchParams.get('plan') || '3';

        // Calculate amount based on plan
        const planPrices: Record<string, number> = {
            '1': 999,
            '2': 1998,
            '3': 2999
        };

        const savedData = localStorage.getItem('checkout_form');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                setOrderDetails({
                    orderId: orderId || `ORD-${Date.now()}`,
                    paymentId: paymentId,
                    amount: planPrices[planParam] || 2697,
                    domain: data.domain || '',
                    email: data.email || '',
                    plan: planParam === '1' ? '1 Year Plan' :
                        planParam === '2' ? '2 Year Plan' : '3 Year (Price Lock)',
                });
            } catch {
                // Ignore parse errors
            }
        } else {
            setOrderDetails(prev => ({
                ...prev,
                orderId: orderId || `ORD-${Date.now()}`,
                paymentId: paymentId,
                amount: planPrices[planParam] || 2697,
                plan: planParam === '1' ? '1 Year Plan' :
                    planParam === '2' ? '2 Year Plan' : '3 Year (Price Lock)',
            }));
        }
    }, [searchParams]);

    // Track Purchase event (only once per payment_id)
    const hasTrackedPurchase = useRef(false);
    useEffect(() => {
        if (hasTrackedPurchase.current) return;

        const paymentId = searchParams.get('payment_id');
        if (!paymentId) return;

        // Check if already tracked using payment_id as unique key
        const eventId = getPurchaseEventId(paymentId);
        if (isEventTracked(eventId)) {
            console.log('[Meta] Purchase already tracked for:', paymentId);
            return;
        }

        // Get ALL user data for Advanced Matching
        const savedData = localStorage.getItem('checkout_form');
        let userData = {
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        };

        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                userData = {
                    email: data.email || '',
                    phone: data.phone || '',
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    city: data.city || '',
                    state: data.state || '',
                    zip: data.zip || '',
                    country: data.country || '',
                };
            } catch {
                // Ignore
            }
        }

        // Get plan value
        const planParam = searchParams.get('plan') || '3';
        const planPrices: Record<string, number> = {
            '1': 999,
            '2': 1998,
            '3': 2999
        };
        const value = planPrices[planParam] || 2999;

        // Track Purchase with ALL user data for max matching
        trackPurchase(value, paymentId, userData).then(() => {
            markEventTracked(eventId);
            hasTrackedPurchase.current = true;
            console.log('[Meta] Purchase tracked with full matching:', {
                paymentId,
                value,
                hasEmail: !!userData.email,
                hasPhone: !!userData.phone,
                hasName: !!userData.firstName,
                hasCity: !!userData.city
            });

            // Send Slack notification with full order details
            const utmData = getUTMData();
            const checkoutData = savedData ? JSON.parse(savedData) : {};

            sendOrderNotification({
                // Payment
                paymentId,
                amount: value,
                plan: planParam === '1' ? '1 Year Plan' :
                    planParam === '2' ? '2 Year Plan' : '3 Year (Price Lock)',

                // Customer
                firstName: checkoutData.firstName || '',
                lastName: checkoutData.lastName || '',
                email: checkoutData.email || '',
                phone: checkoutData.phone || '',
                domain: checkoutData.domain || '',

                // Billing
                address: checkoutData.address || '',
                city: checkoutData.city || '',
                state: checkoutData.state || '',
                zip: checkoutData.zip || '',
                country: checkoutData.country || '',
                isCompany: checkoutData.isCompany || false,
                companyName: checkoutData.companyName || '',
                gstin: checkoutData.gstin || '',

                // UTM Attribution
                utmSource: utmData?.utm?.utm_source,
                utmMedium: utmData?.utm?.utm_medium,
                utmCampaign: utmData?.utm?.utm_campaign,
                utmTerm: utmData?.utm?.utm_term,
                utmContent: utmData?.utm?.utm_content,
                landingPage: utmData?.landingPage,
                referrer: utmData?.referrer,

                // Device
                browser: utmData?.device?.browser,
                os: utmData?.device?.os,
                deviceType: utmData?.device?.deviceType,
                ip: utmData?.device?.ip,

                // Timestamp
                timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            });
        });
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
                            {/* Payment ID */}
                            <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a]">
                                <div className="flex items-center gap-3 text-[#888]">
                                    <Receipt className="w-4 h-4" />
                                    <span className="text-sm font-bold">Payment ID</span>
                                </div>
                                <span className="text-sm font-bold text-[#CCFF00] font-mono">{orderDetails.paymentId || 'Processing...'}</span>
                            </div>

                            {/* Amount Paid */}
                            <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a]">
                                <div className="flex items-center gap-3 text-[#888]">
                                    <IndianRupee className="w-4 h-4" />
                                    <span className="text-sm font-bold">Amount Paid</span>
                                </div>
                                <span className="text-sm font-bold text-[#F2F2F2]">₹{orderDetails.amount.toLocaleString('en-IN')}</span>
                            </div>

                            {/* Domain */}
                            <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a]">
                                <div className="flex items-center gap-3 text-[#888]">
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm font-bold">Domain</span>
                                </div>
                                <span className="text-sm font-bold text-[#F2F2F2]">{orderDetails.domain || 'Not specified'}</span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center justify-between py-3 border-b border-[#1a1a1a]">
                                <div className="flex items-center gap-3 text-[#888]">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-bold">Email</span>
                                </div>
                                <span className="text-sm font-bold text-[#F2F2F2]">{orderDetails.email || 'Not specified'}</span>
                            </div>

                            {/* Plan */}
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
