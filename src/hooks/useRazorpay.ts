'use client';

import { useState, useCallback, useEffect } from 'react';

declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: Record<string, string>;
    theme?: {
        color?: string;
    };
    handler: (response: RazorpayResponse) => void;
    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpayInstance {
    open: () => void;
    close: () => void;
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface PaymentDetails {
    amount: number;
    currency?: string;
    name: string;
    email: string;
    phone?: string;
    description: string;
    notes?: Record<string, string>;
}

interface UseRazorpayReturn {
    isLoading: boolean;
    error: string | null;
    initiatePayment: (details: PaymentDetails) => Promise<boolean>;
}

export function useRazorpay(): UseRazorpayReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Load Razorpay script
    useEffect(() => {
        if (typeof window !== 'undefined' && !window.Razorpay) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            script.onerror = () => setError('Failed to load payment gateway');
            document.body.appendChild(script);
        } else if (window.Razorpay) {
            setScriptLoaded(true);
        }
    }, []);

    const initiatePayment = useCallback(async (details: PaymentDetails): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // Wait for script to load if not already
            if (!scriptLoaded && !window.Razorpay) {
                throw new Error('Payment gateway not loaded');
            }

            // Create order on backend
            const orderResponse = await fetch('/api/razorpay/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: details.amount,
                    currency: details.currency || 'INR',
                    notes: details.notes,
                }),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const orderData = await orderResponse.json();

            if (!orderData.success || !orderData.order) {
                throw new Error(orderData.error || 'Failed to create order');
            }

            // Open Razorpay checkout
            return new Promise((resolve) => {
                const options: RazorpayOptions = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                    amount: orderData.order.amount,
                    currency: orderData.order.currency,
                    name: 'WPFYE - The Fluid Cloud',
                    description: details.description,
                    order_id: orderData.order.id,
                    prefill: {
                        name: details.name,
                        email: details.email,
                        contact: details.phone,
                    },
                    notes: details.notes,
                    theme: {
                        color: '#CCFF00',
                    },
                    handler: async (response: RazorpayResponse) => {
                        try {
                            // Verify payment on backend
                            const verifyResponse = await fetch('/api/razorpay/verify', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                }),
                            });

                            const verifyData = await verifyResponse.json();

                            if (verifyData.success) {
                                setIsLoading(false);
                                resolve(true);
                            } else {
                                setError('Payment verification failed');
                                setIsLoading(false);
                                resolve(false);
                            }
                        } catch {
                            setError('Payment verification failed');
                            setIsLoading(false);
                            resolve(false);
                        }
                    },
                    modal: {
                        ondismiss: () => {
                            setError('Payment was cancelled');
                            setIsLoading(false);
                            resolve(false);
                        },
                    },
                };

                const razorpay = new window.Razorpay(options);
                razorpay.open();
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Payment failed';
            setError(message);
            setIsLoading(false);
            return false;
        }
    }, [scriptLoaded]);

    return { isLoading, error, initiatePayment };
}
