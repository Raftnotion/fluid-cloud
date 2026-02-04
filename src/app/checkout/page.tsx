"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Lock, Globe, User, CreditCard, ArrowRight, ArrowLeft, CheckCircle2, ChevronRight, Zap, Search, Check, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { countries } from '@/utils/countries';
import { PriceLockOverlay } from '@/components/PriceLockOverlay';
import { useLenis } from '@/components/LenisProvider';
import { useRazorpay } from '@/hooks/useRazorpay';

const SearchableCountrySelect = ({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: any[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(opt =>
        opt.name.toLowerCase().includes(search.toLowerCase())
    );

    const selectedOption = options.find(opt => opt.name === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-sm font-bold flex items-center justify-between cursor-pointer hover:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
            >
                <div className="flex items-center gap-2">
                    {selectedOption ? (
                        <>
                            <span>{selectedOption.flag}</span>
                            <span>{selectedOption.name}</span>
                        </>
                    ) : (
                        <span className="text-[#555]">Select Country</span>
                    )}
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''} text-[#555]`} />
            </div>

            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-[100] top-full mt-2 w-full bg-[#0d0d0d] border border-[#222] rounded-xl overflow-hidden shadow-2xl"
                    >
                        <div className="p-3 border-b border-[#222] bg-[#0a0a0a]">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#555]" />
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Search country..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-[#050505] border border-[#222] rounded-lg py-2 pl-9 pr-4 text-xs font-bold outline-none focus:border-[#CCFF00]/30 transition-all text-[#F2F2F2]"
                                />
                            </div>
                        </div>
                        <div
                            className="max-h-[250px] overflow-y-auto overscroll-contain py-1 custom-scrollbar"
                            data-lenis-prevent
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((opt) => (
                                    <div
                                        key={opt.code}
                                        onClick={() => {
                                            onChange(opt.name);
                                            setIsOpen(false);
                                            setSearch("");
                                        }}
                                        className={`px-4 py-3 text-xs font-bold flex items-center justify-between cursor-pointer transition-colors ${value === opt.name ? 'bg-[#CCFF00] text-black' : 'text-[#888] hover:bg-[#CCFF00]/10 hover:text-[#F2F2F2]'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-base leading-none">{opt.flag}</span>
                                            <span>{opt.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black ${value === opt.name ? 'text-black/50' : 'text-[#444]'}`}>{opt.dial_code}</span>
                                            {value === opt.name ? <Check className="w-3.5 h-3.5" /> : null}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-[#555] text-[10px] font-black uppercase tracking-widest">
                                    No territory found
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

// Hoisted static data
const stepMap: Record<string, number> = {
    'domain': 1,
    'identity': 2,
    'billing': 3,
    'payment': 4
};

const reverseStepMap: Record<number, string> = {
    1: 'domain',
    2: 'identity',
    3: 'billing',
    4: 'payment'
};

const plans = {
    '1': {
        name: '1 Year Plan',
        price: 999,
        original: 1299,
        term: 'Annually',
        savings: 300,
        bonus: 7500
    },
    '2': {
        name: '2 Year Plan',
        price: 1998,
        original: 2598,
        term: 'every 2 years',
        savings: 600,
        bonus: 15000
    },
    '3': {
        name: '3 Year (Price Lock)',
        price: 2999,
        original: 3897,
        term: 'every 3 years',
        savings: 898,
        bonus: 22500
    }
};

const steps = [
    { id: 1, title: 'Domain', icon: <Globe className="w-4 h-4" /> },
    { id: 2, title: 'Identity', icon: <User className="w-4 h-4" /> },
    { id: 3, title: 'Billing', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 4, title: 'Payment', icon: <CreditCard className="w-4 h-4" /> }
];

const CheckoutContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { isLoading: isPaymentLoading, error: paymentError, initiatePayment } = useRazorpay();

    const planParam = searchParams.get('plan') || '3';

    // Derive step from URL
    const stepName = searchParams.get('s') || 'domain';
    const step = stepMap[stepName] || 1;

    // Navigation Helper
    const goToStep = (targetStep: number) => {
        const params = new URLSearchParams(searchParams.toString());
        const name = reverseStepMap[targetStep] || 'domain';
        params.set('s', name);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };
    const [showPriceLockAnimation, setShowPriceLockAnimation] = useState(false);

    const handlePlanChange = (p: string) => {
        if (p === '3' && planParam !== '3') {
            setShowPriceLockAnimation(true);
        }
        const params = new URLSearchParams(searchParams.toString());
        params.set('plan', p);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

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
        countryCode: '+91',
        paymentMethod: 'razorpay',
        isCompany: false,
        companyName: '',
        gstin: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Validation functions
    const validateStep1 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.domain.trim()) {
            newErrors.domain = 'Domain is required';
        } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(formData.domain.trim())) {
            newErrors.domain = 'Enter a valid domain (e.g., example.com)';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Enter a valid email address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep3 = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (formData.isCompany) {
            if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
            if (!formData.gstin.trim()) newErrors.gstin = 'GSTIN is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = (currentStep: number) => {
        let isValid = false;
        if (currentStep === 1) isValid = validateStep1();
        else if (currentStep === 2) isValid = validateStep2();
        else if (currentStep === 3) isValid = validateStep3();
        else isValid = true;

        if (isValid) {
            goToStep(currentStep + 1);
        }
    };

    // Clear error when field is edited
    const handleFieldChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    // Load form data
    useEffect(() => {
        const savedData = localStorage.getItem('checkout_form');
        if (savedData) {
            try {
                setFormData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse saved checkout data", e);
            }
        }
    }, []);

    // Save form data to localStorage
    useEffect(() => {
        localStorage.setItem('checkout_form', JSON.stringify(formData));
        localStorage.setItem('checkout_step', step.toString());
    }, [formData, step]);

    // Initial redirect if no step in URL but session exists
    useEffect(() => {
        const hasStepInUrl = searchParams.get('s');
        if (!hasStepInUrl) {
            const savedStep = localStorage.getItem('checkout_step');
            if (savedStep) {
                goToStep(parseInt(savedStep));
            }
        }
    }, []);

    // Sync countryCode when country changes
    useEffect(() => {
        const found = countries.find(c => c.name === formData.country);
        if (found) {
            setFormData(prev => ({ ...prev, countryCode: found.dial_code }));
        }
    }, [formData.country]);

    // Scroll to top on step change
    const lenis = useLenis();
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [step, lenis]);

    const handleStepClick = (targetStep: number) => {
        // Only allow jumping back or to steps already "reached"
        // For simplicity, we can allow jumping to any step if data exists, 
        // but it's safer to only allow jumping back to edit.
        if (targetStep < step) {
            goToStep(targetStep);
        }
    };

    const plans = {
        '1': {
            name: '1 Year Plan',
            price: 999,
            original: 1299,
            term: 'Annually',
            savings: 300,
            bonus: 7500
        },
        '2': {
            name: '2 Year Plan',
            price: 1998,
            original: 2598,
            term: 'every 2 years',
            savings: 600,
            bonus: 15000
        },
        '3': {
            name: '3 Year (Price Lock)',
            price: 2999,
            original: 3897,
            term: 'every 3 years',
            savings: 898,
            bonus: 22500
        }
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
            {showPriceLockAnimation ? (
                <PriceLockOverlay
                    isVisible={showPriceLockAnimation}
                    onComplete={() => setShowPriceLockAnimation(false)}
                />
            ) : null}
            <Header />

            <main className="pt-20 md:pt-32 pb-24 md:pb-40 px-4 md:px-8 relative z-10" style={{ paddingBottom: 'max(6rem, env(safe-area-inset-bottom))' }}>
                {/* Background Accent */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#CCFF00]/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* Left Side: Checkout Flow */}
                    <div className="flex-1">
                        {/* Progress Stepper - Mobile: Compact Pills | Desktop: Full */}
                        <div className="mb-8 md:mb-16">
                            {/* Mobile Stepper: Compact current step + progress dots */}
                            <div className="md:hidden flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center ${step >= 1 ? 'border-[#CCFF00] bg-[#CCFF00]/10 text-[#CCFF00]' : 'border-[#222] text-[#333]'}`}>
                                        {steps[step - 1]?.icon}
                                    </div>
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-[#777] font-bold">Step {step} of 4</p>
                                        <p className="text-sm font-bold text-[#F2F2F2]">{steps[step - 1]?.title}</p>
                                    </div>
                                </div>
                                {/* Progress dots */}
                                <div className="flex items-center gap-2">
                                    {steps.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => handleStepClick(s.id)}
                                            disabled={step < s.id}
                                            className={`w-2.5 h-2.5 rounded-full transition-all active:scale-90 ${step === s.id
                                                ? 'bg-[#CCFF00] w-6'
                                                : step > s.id
                                                    ? 'bg-[#CCFF00]/50'
                                                    : 'bg-[#222]'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Desktop Stepper: Full horizontal layout */}
                            <div className="hidden md:flex items-center gap-4">
                                {steps.map((s, idx) => (
                                    <React.Fragment key={s.id}>
                                        <button
                                            onClick={() => handleStepClick(s.id)}
                                            disabled={step < s.id}
                                            className={`flex items-center gap-3 shrink-0 transition-all active:scale-95 ${step >= s.id ? 'text-[#CCFF00]' : 'text-[#333]'} ${step > s.id ? 'hover:opacity-70' : ''}`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors duration-500 ${step >= s.id ? 'border-[#CCFF00] bg-[#CCFF00]/10' : 'border-[#222]'}`}>
                                                {step > s.id ? <CheckCircle2 className="w-5 h-5" /> : s.icon}
                                            </div>
                                            <span className="text-xs font-bold uppercase tracking-[0.15em]">{s.title}</span>
                                        </button>
                                        {idx < steps.length - 1 && (
                                            <div className={`h-px w-8 ${step > s.id ? 'bg-[#CCFF00]' : 'bg-[#222]'}`} />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>
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
                                        <h2 className="text-xl md:text-3xl font-bold font-['Clash_Display'] mb-2 md:mb-3 uppercase tracking-wider">Domain Configuration</h2>
                                        <p className="text-sm text-[#888] mb-6 md:mb-10">Enter your domain to point to WPFYE Fluid.</p>
                                        <div className="relative group max-w-lg">
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CCFF00]/0 via-[#CCFF00]/20 to-[#CCFF00]/0 rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition-all" />
                                            <input
                                                type="text"
                                                placeholder="yourdomain.com"
                                                value={formData.domain}
                                                onChange={(e) => handleFieldChange('domain', e.target.value)}
                                                className={`w-full bg-[#0a0a0a] border rounded-xl p-4 md:p-5 text-base md:text-lg font-bold text-[#F2F2F2] outline-none transition-all relative z-10 ${errors.domain ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/50'}`}
                                            />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                                <Globe className="w-5 h-5 text-[#333] group-focus-within:text-[#CCFF00] transition-colors" />
                                            </div>
                                        </div>
                                        {errors.domain && <p className="mt-2 text-red-500 text-xs font-bold">{errors.domain}</p>}
                                        <p className="mt-3 md:mt-4 text-[11px] md:text-xs text-[#666] uppercase tracking-wide font-bold leading-relaxed">
                                            * Enter an existing domain. Purchase from GoDaddy or Namecheap first.
                                        </p>
                                    </section>

                                    <button
                                        onClick={() => handleNextStep(1)}
                                        className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] active:scale-[0.97] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
                                    >
                                        Next <ArrowRight className="w-4 h-4" />
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
                                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                                            <button onClick={() => goToStep(1)} className="p-2 border border-[#222] rounded-lg text-[#555] hover:text-[#CCFF00] active:scale-95 transition-all">
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <h2 className="text-xl md:text-3xl font-bold font-['Clash_Display'] uppercase tracking-wider">Personal Identity</h2>
                                        </div>
                                        <p className="text-sm text-[#888] mb-6 md:mb-10">Your contact details for system orchestration.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">First Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.firstName ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                />
                                                {errors.firstName && <p className="text-red-500 text-xs font-bold">{errors.firstName}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.lastName ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                />
                                                {errors.lastName && <p className="text-red-500 text-xs font-bold">{errors.lastName}</p>}
                                            </div>
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.email ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                />
                                                {errors.email && <p className="text-red-500 text-xs font-bold">{errors.email}</p>}
                                            </div>
                                        </div>
                                    </section>

                                    <button
                                        onClick={() => handleNextStep(2)}
                                        className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] active:scale-[0.97] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
                                    >
                                        Billing <ArrowRight className="w-4 h-4" />
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
                                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                                            <button onClick={() => goToStep(2)} className="p-2 border border-[#222] rounded-lg text-[#555] hover:text-[#CCFF00] active:scale-95 transition-all">
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <h2 className="text-xl md:text-3xl font-bold font-['Clash_Display'] uppercase tracking-wider">Billing Console</h2>
                                        </div>
                                        <p className="text-sm text-[#888] mb-6 md:mb-10">Your billing address for compliance.</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-2xl">
                                            <div className="md:col-span-2 mb-4 md:mb-6">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777] block mb-3 md:mb-4">Billing Type</label>
                                                <div className="bg-[#0a0a0a] border border-[#222] p-1.5 rounded-xl inline-flex gap-1.5 w-full md:w-fit">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleFieldChange('isCompany', false)}
                                                        className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${!formData.isCompany ? 'bg-[#CCFF00] text-black shadow-[0_4px_12px_rgba(204,255,0,0.15)]' : 'text-[#555] hover:text-[#888]'}`}
                                                    >
                                                        Individual
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleFieldChange('isCompany', true)}
                                                        className={`flex-1 md:flex-none px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${formData.isCompany ? 'bg-[#CCFF00] text-black shadow-[0_4px_12px_rgba(204,255,0,0.15)]' : 'text-[#555] hover:text-[#888]'}`}
                                                    >
                                                        Company
                                                    </button>
                                                </div>
                                            </div>

                                            {formData.isCompany && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 mb-2"
                                                >
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-[#777]">Company Name</label>
                                                        <input
                                                            type="text"
                                                            value={formData.companyName}
                                                            onChange={(e) => handleFieldChange('companyName', e.target.value)}
                                                            className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.companyName ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                        />
                                                        {errors.companyName && <p className="text-red-500 text-xs font-bold">{errors.companyName}</p>}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase tracking-wider text-[#777]">GSTIN</label>
                                                        <input
                                                            type="text"
                                                            placeholder="29AADCW9345A1Z7"
                                                            value={formData.gstin}
                                                            onChange={(e) => handleFieldChange('gstin', e.target.value)}
                                                            className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.gstin ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                        />
                                                        {errors.gstin && <p className="text-red-500 text-xs font-bold">{errors.gstin}</p>}
                                                    </div>
                                                </motion.div>
                                            )}
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">Street Address</label>
                                                <input
                                                    type="text"
                                                    placeholder="Street Address"
                                                    value={formData.address}
                                                    onChange={(e) => handleFieldChange('address', e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.address ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                />
                                                {errors.address && <p className="text-red-500 text-xs font-bold">{errors.address}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">City</label>
                                                <input
                                                    type="text"
                                                    value={formData.city}
                                                    onChange={(e) => handleFieldChange('city', e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.city ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                />
                                                {errors.city && <p className="text-red-500 text-xs font-bold">{errors.city}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">State / Province</label>
                                                <input
                                                    type="text"
                                                    value={formData.state}
                                                    onChange={(e) => handleFieldChange('state', e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.state ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                />
                                                {errors.state && <p className="text-red-500 text-xs font-bold">{errors.state}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">ZIP / Postal Code</label>
                                                <input
                                                    type="text"
                                                    value={formData.zip}
                                                    onChange={(e) => handleFieldChange('zip', e.target.value)}
                                                    className={`w-full bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.zip ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                />
                                                {errors.zip && <p className="text-red-500 text-xs font-bold">{errors.zip}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">Country / Region</label>
                                                <SearchableCountrySelect
                                                    value={formData.country}
                                                    onChange={(val) => handleFieldChange('country', val)}
                                                    options={countries}
                                                />
                                                {errors.country && <p className="text-red-500 text-xs font-bold">{errors.country}</p>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-wider text-[#777]">Phone Number</label>
                                                <div className="flex gap-2">
                                                    <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 text-base font-bold text-[#555] min-w-[70px] flex items-center justify-center">
                                                        {formData.countryCode}
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                                                        placeholder="Phone Number"
                                                        className={`flex-1 bg-[#0a0a0a] border rounded-xl p-4 text-base font-bold outline-none transition-all text-[#F2F2F2] ${errors.phone ? 'border-red-500' : 'border-[#222] focus:border-[#CCFF00]/30'}`}
                                                    />
                                                </div>
                                                {errors.phone && <p className="text-red-500 text-xs font-bold">{errors.phone}</p>}
                                            </div>
                                        </div>
                                    </section>

                                    <button
                                        onClick={() => handleNextStep(3)}
                                        className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#CCFF00] text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-[1.02] active:scale-[0.97] transition-all shadow-[0_10px_30px_rgba(204,255,0,0.1)]"
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
                                        <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-4">
                                            <button onClick={() => goToStep(3)} className="p-2 border border-[#222] rounded-lg text-[#555] hover:text-[#CCFF00] active:scale-95 transition-all">
                                                <ArrowLeft className="w-4 h-4" />
                                            </button>
                                            <h2 className="text-xl md:text-3xl font-bold font-['Clash_Display'] uppercase tracking-wider">Payment</h2>
                                        </div>
                                        <p className="text-sm text-[#888] mb-6 md:mb-10">Secure payment via Razorpay.</p>

                                        {paymentError && (
                                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                                                {paymentError}
                                            </div>
                                        )}

                                        <div className="p-5 md:p-8 border border-[#CCFF00]/20 bg-[#CCFF00]/5 rounded-xl md:rounded-2xl max-w-2xl">
                                            <div className="flex items-center justify-between mb-6 md:mb-8">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className="w-12 h-10 md:w-16 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center p-1.5 md:p-2 border border-white/10 shadow-sm">
                                                        <img src="/images/rzp.png" alt="Razorpay" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-base md:text-lg tracking-wide">Razorpay Secured</h4>
                                                        <p className="text-[#666] text-[10px] md:text-[11px] font-black uppercase tracking-wider">Global Gateway</p>
                                                    </div>
                                                </div>
                                                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-[#CCFF00] flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#CCFF00] rounded-full" />
                                                </div>
                                            </div>

                                            <button
                                                onClick={async () => {
                                                    const result = await initiatePayment({
                                                        amount: totalAmount,
                                                        currency: 'INR',
                                                        name: `${formData.firstName} ${formData.lastName}`,
                                                        email: formData.email,
                                                        phone: `${formData.countryCode}${formData.phone}`,
                                                        description: `WPFYE Fluid Cloud - ${selectedPlan.name}`,
                                                        notes: {
                                                            domain: formData.domain,
                                                            plan: selectedPlan.name,
                                                            billingType: formData.isCompany ? 'Company' : 'Individual',
                                                        },
                                                    });
                                                    if (result.success) {
                                                        localStorage.removeItem('checkout_step');
                                                        router.push(`/checkout/success?plan=${planParam}&order_id=${result.orderId || ''}&payment_id=${result.paymentId || ''}`);
                                                    } else {
                                                        router.push(`/checkout/failed?plan=${planParam}`);
                                                    }
                                                }}
                                                disabled={isPaymentLoading}
                                                className="group relative flex items-center justify-center gap-2 md:gap-3 w-full px-6 md:px-12 py-4 md:py-5 bg-[#CCFF00] text-black font-black uppercase tracking-[0.15em] md:tracking-[0.2em] text-sm rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(204,255,0,0.1)] hover:scale-[1.01] active:scale-[0.97] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                                {isPaymentLoading ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        PROCESSING...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lock className="w-4 h-4" />
                                                        PAY NOW
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </section>

                                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[#444] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-3 h-3 text-[#CCFF00]" />
                                            PCI-DSS
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Lock className="w-3 h-3 text-[#CCFF00]" />
                                            256-BIT SSL
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:w-[400px] shrink-0 order-first lg:order-last">
                        <div className="p-5 md:p-8 bg-[#0a0a0a] border border-[#222] rounded-2xl md:rounded-[32px] lg:sticky lg:top-32 space-y-6 md:space-y-8">
                            <div>
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#666]">Order Summary</h3>
                                    <div className="flex bg-black border border-[#222] p-1 rounded-lg gap-1">
                                        {['1', '2', '3'].map((p) => (
                                            <button
                                                key={p}
                                                onClick={() => handlePlanChange(p)}
                                                className={`px-2.5 md:px-3 py-1 text-[10px] md:text-xs font-black uppercase rounded-md transition-all active:scale-95 ${planParam === p ? 'bg-[#CCFF00] text-black' : 'text-[#888] hover:text-[#F2F2F2]'}`}
                                            >
                                                {p}Y
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-black text-lg md:text-xl text-[#F2F2F2] uppercase">{selectedPlan.name}</p>
                                            <p className="text-xs md:text-sm text-[#777] font-bold">Fluid Cloud</p>
                                        </div>
                                        <p className="font-black text-lg md:text-xl text-[#F2F2F2]">₹{selectedPlan.price}</p>
                                    </div>

                                    {formData.isCompany && formData.companyName && (
                                        <div className="py-3 md:py-4 border-y border-[#1a1a1a]">
                                            <span className="text-xs font-bold uppercase tracking-wider text-[#777] block mb-1">Billing Type</span>
                                            <div className="flex justify-between items-center text-xs font-bold text-[#F2F2F2]">
                                                <span>{formData.companyName}</span>
                                                {formData.gstin ? <span className="text-xs text-[#CCFF00] font-bold uppercase tracking-wider">GSTIN: {formData.gstin}</span> : null}
                                            </div>
                                        </div>
                                    )}


                                    {/* Bonuses */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                                            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center p-1.5 border border-[#222]">
                                                <img src="/images/elemntor.png" alt="Elementor" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-[#F2F2F2]">Elementor Pro</span>
                                                <span className="text-[11px] md:text-xs text-[#CCFF00] font-bold uppercase tracking-wider mt-0.5">₹{selectedPlan.bonus.toLocaleString()}+ Free</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {selectedPlan.name.includes('Price Lock') ? (
                                    <div className="flex justify-between items-center text-[#CCFF00] mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider">Price Lock Active</span>
                                        <span className="text-xs font-bold uppercase tracking-wider">₹{selectedPlan.price}/3Y</span>
                                    </div>
                                ) : selectedPlan.price !== selectedPlan.original && (
                                    <div className="flex justify-between items-center text-[#555] mb-2">
                                        <span className="text-[11px] font-black uppercase tracking-widest">Future Renewal Price</span>
                                        <span className="text-[11px] font-black uppercase tracking-widest text-[#888]">₹{selectedPlan.original}.00 / {selectedPlan.name.split(' ')[0]} {parseInt(selectedPlan.name.split(' ')[0]) > 1 ? 'Years' : 'Year'}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-[#555] font-bold uppercase tracking-widest">Base Price</span>
                                    <span className="text-sm font-bold text-[#F2F2F2]">₹{selectedPlan.price}.00</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-[#555] font-bold uppercase tracking-widest">GST (18%)</span>
                                    <span className="text-sm font-bold text-[#F2F2F2]">₹{taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="pt-4 md:pt-6 border-t border-[#222] flex justify-between items-center">
                                    <span className="text-base md:text-lg font-black text-[#F2F2F2] uppercase tracking-[0.15em] md:tracking-[0.2em]">Total</span>
                                    <div className="text-2xl md:text-3xl font-black text-[#CCFF00] flex items-baseline">
                                        <span>₹{Math.floor(totalAmount)}</span>
                                        <span className="text-xs md:text-sm">.{totalAmount.toFixed(2).split('.')[1]}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 md:p-4 bg-[#CCFF00]/5 border border-[#CCFF00]/10 rounded-xl md:rounded-2xl">
                                <p className="text-xs text-[#CCFF00] font-bold uppercase tracking-wider flex items-center gap-2 mb-1 md:mb-2">
                                    <Zap className="w-3 h-3 fill-current" /> Instant Deploy
                                </p>
                                <p className="text-xs md:text-sm text-[#777] leading-relaxed">
                                    Auto-provisioned in <span className="text-[#999] font-bold">10 minutes</span>.
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

const CheckoutPage = () => {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-[#CCFF00]/20 border-t-[#CCFF00] rounded-full animate-spin" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#555]">Initializing Protocol...</p>
                </div>
            </div>
        }>
            <CheckoutContent />
        </Suspense>
    );
};

export default CheckoutPage;
