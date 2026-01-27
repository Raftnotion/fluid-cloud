"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Globe, User, CreditCard, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSearchParams } from 'next/navigation';

const CheckoutPage = () => {
    const searchParams = useSearchParams();
    const planParam = searchParams.get('plan') || '3'; // Default to 3 years

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        domain: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'India',
        paymentMethod: 'razorpay'
    });

    const plans = {
        '1': { name: '1 Year Plan', price: 899, term: 'Annually' },
        '2': { name: '2 Year Plan', price: 1798, term: 'every 2 years' },
        '3': { name: '3 Year (Price Lock)', price: 2697, term: 'every 3 years' }
    };

    const selectedPlan = plans[planParam as keyof typeof plans] || plans['3'];
    const taxAmount = selectedPlan.price * 0.18;
    const totalAmount = selectedPlan.price + taxAmount;

    const steps = [
        { id: 1, title: 'Domain', icon: <Globe className="w-4 h-4" /> },
        { id: 2, title: 'Identity', icon: <User className="w-4 h-4" /> },
        { id: 3, title: 'Billing', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 4, title: 'Payment', icon: <CreditCard className="w-4 h-4" /> }
    ];

    return (
        <div className="relative min-h-screen bg-[#050505] text-[#F2F2F2] font-['Satoshi'] selection:bg-[#CCFF00] selection:text-black">
            <Header />

            <main className="pt-32 pb-40 px-8 relative z-10">
                {/* Background Accent */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">

                    {/* Left Side: Checkout Flow */}
                    <div className="flex-1">
                        {/* Progress Stepper */}
                        <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
                            {steps.map((s, idx) => (
                                <React.Fragment key={s.id}>
                                    <div className={`flex items-center gap-3 shrink-0 ${step >= s.id ? 'text-[#CCFF00]' : 'text-[#333]'}`}>
                                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors duration-500 ${step >= s.id ? 'border-[#CCFF00] bg-[#CCFF00]/10' : 'border-[#222]'}`}>
                                            {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">{s.title}</span>
                                    </div>
                                    {idx < steps.length - 1 && (
                                        <div className={`h-px w-8 ${step > s.id ? 'bg-[#CCFF00]' : 'bg-[#222]'}`} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-12"
                                >
                                    <section>
                                        <h2 className="text-2xl md:text-3xl font-bold font-['Clash_Display'] mb-3 uppercase tracking-wider">Domain Configuration</h2>
                                        <p className="text-sm text-[#888] mb-10">Enter the domain you wish to point to WPFYE Fluid platform.</p>
                                        <div className="relative group max-w-lg">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CCFF00]/0 via-[#CCFF00]/20 to-[#CCFF00]/0 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all" />
                                            <input
                                                type="text"
                                                placeholder="yourdomain.com"
                                                value={formData.domain}
                                                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                                                className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-5 text-lg font-bold text-[#F2F2F2] outline-none focus:border-[#CCFF00]/50 transition-all relative z-10"
                                            />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <Globe className="w-5 h-5 text-[#333] group-focus-within:text-[#CCFF00] transition-colors" />
                                            </div>
                                        </div>
                                        <p className="mt-4 text-[9px] text-[#444] uppercase tracking-widest font-bold">
                                            * You can also configure this later in the dashboard
                                        </p>
                                    </section>

                                    <button
                                        onClick={() => setStep(2)}
                                        className="flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
                                    >
                                        Next Protocol <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <section>
                                        <div className="flex items-center gap-4 mb-4">
                                            <button onClick={() => setStep(1)} className="p-2 border border-[#222] rounded-lg text-[#555] hover:text-[#CCFF00] transition-colors">
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <h2 className="text-2xl md:text-3xl font-bold font-['Clash_Display'] uppercase tracking-wider">Personal Identity</h2>
                                        </div>
                                        <p className="text-sm text-[#888] mb-10">Provide your contact details for system orchestration.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">First Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                        </div>
                                    </section>

                                    <button
                                        onClick={() => setStep(3)}
                                        className="flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
                                    >
                                        Proceed to Billing <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <section>
                                        <div className="flex items-center gap-4 mb-4">
                                            <button onClick={() => setStep(2)} className="p-2 border border-[#222] rounded-lg text-[#555] hover:text-[#CCFF00] transition-colors">
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <h2 className="text-2xl md:text-3xl font-bold font-['Clash_Display'] uppercase tracking-wider">Billing Console</h2>
                                        </div>
                                        <p className="text-sm text-[#888] mb-10">Configure your professional billing address for compliance.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">Street Address</label>
                                                <input
                                                    type="text"
                                                    placeholder="126 Franklin Ave"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">City</label>
                                                <input
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">State / Province</label>
                                                <input
                                                    type="text"
                                                    value={formData.state}
                                                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">ZIP / Postal Code</label>
                                                <input
                                                    type="text"
                                                    value={formData.zip}
                                                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-[#555]">Country</label>
                                                <select
                                                    value={formData.country}
                                                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                                    className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2] appearance-none"
                                                >
                                                    <option value="India">India</option>
                                                    <option value="USA">USA</option>
                                                    <option value="UK">UK</option>
                                                </select>
                                            </div>
                                        </div>
                                    </section>

                                    <button
                                        onClick={() => setStep(4)}
                                        className="flex items-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
                                    >
                                        Review & Pay <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-10"
                                >
                                    <section>
                                        <div className="flex items-center gap-4 mb-4">
                                            <button onClick={() => setStep(3)} className="p-2 border border-[#222] rounded-lg text-[#555] hover:text-[#CCFF00] transition-colors">
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <h2 className="text-2xl md:text-3xl font-bold font-['Clash_Display'] uppercase tracking-wider">Payment Verification</h2>
                                        </div>
                                        <p className="text-sm text-[#888] mb-10">Select your preferred transaction protocol. Secure via Razorpay.</p>

                                        <div className="p-8 border border-[#CCFF00]/20 bg-[#CCFF00]/5 rounded-2xl max-w-2xl">
                                            <div className="flex items-center justify-between mb-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2">
                                                        <img src="/images/upi.png" alt="Razorpay" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg">Razorpay Secured</h4>
                                                        <p className="text-[#555] text-[10px] font-black uppercase tracking-widest">Global Payment Gateway</p>
                                                    </div>
                                                </div>
                                                <div className="w-6 h-6 rounded-full border-2 border-[#CCFF00] flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-[#CCFF00] rounded-full" />
                                                </div>
                                            </div>

                                            <button
                                                className="group relative flex items-center justify-center gap-3 w-full px-12 py-5 bg-[#CCFF00] text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(204,255,0,0.1)] hover:scale-[1.01] active:scale-[0.98] transition-all"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                <Lock className="w-4 h-4" />
                                                AUTHORIZE & PAY NOW
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </button>
                                        </div>
                                    </section>

                                    <div className="flex items-center gap-6 text-[#333] text-[8px] font-black uppercase tracking-[0.3em]">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-2.5 h-2.5 text-[#CCFF00]" />
                                            PCI-DSS COMPLIANT
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Lock className="w-2.5 h-2.5 text-[#CCFF00]" />
                                            256-BIT ENCRYPTION
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:w-[400px] shrink-0">
                        <div className="p-8 bg-[#0a0a0a] border border-[#222] rounded-[32px] sticky top-32 space-y-8">
                            <div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#555] mb-6">Order Summary</h3>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-black text-xl text-[#F2F2F2] uppercase">{selectedPlan.name}</p>
                                            <p className="text-xs text-[#555] font-bold">Fluid Cloud Infrastructure</p>
                                        </div>
                                        <p className="font-black text-xl text-[#F2F2F2]">₹{selectedPlan.price}</p>
                                    </div>

                                    <div className="flex justify-between items-center py-4 border-y border-[#1a1a1a]">
                                        <span className="text-xs text-[#888] font-bold uppercase tracking-widest">Billing cycle</span>
                                        <span className="text-xs text-[#F2F2F2] font-black uppercase tracking-widest">Billed {selectedPlan.term}</span>
                                    </div>

                                    {/* Bonuses */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                            <span className="text-[#CCFF00]">Stealth Bonus Included</span>
                                            <span className="px-2 py-0.5 bg-[#CCFF00] text-black rounded">Activated</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center p-1.5 border border-[#222]">
                                                <img src="/images/elemntor.png" alt="Elementor" className="w-full h-full object-contain" />
                                            </div>
                                            <span className="text-xs font-bold text-[#888]">Elementor Pro ({selectedPlan.name.split(' ')[0]} Year)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-[#555] font-bold uppercase tracking-widest">Base Price</span>
                                    <span className="text-sm font-bold text-[#F2F2F2]">₹{selectedPlan.price}.00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-[#555] font-bold uppercase tracking-widest">GST (18%)</span>
                                    <span className="text-sm font-bold text-[#F2F2F2]">₹{taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="pt-6 border-t border-[#222] flex justify-between items-center">
                                    <span className="text-lg font-black text-[#F2F2F2] uppercase tracking-[0.2em]">Total</span>
                                    <div className="text-3xl font-black text-[#CCFF00] flex items-baseline">
                                        <span>₹{Math.floor(totalAmount)}</span>
                                        <span className="text-sm">.{totalAmount.toFixed(2).split('.')[1]}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-[#CCFF00]/5 border border-[#CCFF00]/10 rounded-2xl">
                                <p className="text-[10px] text-[#CCFF00] font-black uppercase tracking-widest flex items-center gap-2 mb-2">
                                    <Zap className="w-3 h-3 fill-current" /> Instant Deployment
                                </p>
                                <p className="text-[11px] text-[#555] leading-relaxed">
                                    Your environment will be automatically provisioned within <span className="text-[#888] font-bold">120 seconds</span> of successful transaction authorization.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default CheckoutPage;
