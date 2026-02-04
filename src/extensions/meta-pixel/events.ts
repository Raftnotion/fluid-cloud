'use client';

/**
 * Meta Pixel Events
 * 
 * Client-side event tracking functions
 */

import { MetaEventName, MetaEventData, MetaUserData, CAPIRequest } from './types';
import { metaConfig } from './index';
import {
    generateEventId,
    getCurrentUrl,
    getFbc,
    getFbp,
    isBrowser,
    hashValue,
    normalizeEmail,
    normalizePhone
} from './utils';

// Import UTM Tracker for automatic data
import { getUTMData } from '../utm-tracker';

/**
 * Get user data from UTM Tracker for Advanced Matching
 */
function getUserDataFromUTM(): Partial<MetaUserData> {
    const utmData = getUTMData();
    if (!utmData?.device) return {};

    return {
        client_ip_address: utmData.device.ip,
        client_user_agent: utmData.device.userAgent,
        fbc: getFbc(),
        fbp: getFbp(),
    };
}

/**
 * Track a standard event (client-side only)
 * 
 * @param eventName - Standard Meta event name
 * @param eventData - Optional event parameters
 * @param userData - Optional user data for advanced matching
 */
export function trackEvent(
    eventName: MetaEventName | string,
    eventData?: MetaEventData,
    userData?: Partial<MetaUserData>
): string | null {
    if (!isBrowser() || !metaConfig.enabled) return null;

    const eventId = generateEventId();

    try {
        if (typeof window.fbq === 'function') {
            // If user data provided, use Advanced Matching
            if (userData && metaConfig.enableAdvancedMatching) {
                window.fbq('track', eventName, eventData || {}, {
                    eventID: eventId,
                });
            } else {
                window.fbq('track', eventName, eventData || {}, {
                    eventID: eventId,
                });
            }

            if (metaConfig.debug) {
                console.log('[Meta Pixel] Event tracked:', eventName, eventData);
            }
        }
    } catch (e) {
        console.error('[Meta Pixel] Track error:', e);
    }

    // Also send to CAPI for better match rate
    if (metaConfig.enableCAPI) {
        sendToCAPI({
            event_name: eventName,
            user_data: { ...getUserDataFromUTM(), ...userData },
            custom_data: eventData,
            event_id: eventId,
        });
    }

    return eventId;
}

/**
 * Track PageView event
 */
export function trackPageView(): string | null {
    return trackEvent('PageView');
}

/**
 * Track ViewContent event
 * 
 * @param contentId - Product/content ID
 * @param contentName - Product/content name
 * @param value - Optional value
 */
export function trackViewContent(
    contentId: string,
    contentName: string,
    value?: number
): string | null {
    return trackEvent('ViewContent', {
        content_ids: [contentId],
        content_name: contentName,
        content_type: 'product',
        value,
        currency: metaConfig.currency,
    });
}

/**
 * Track InitiateCheckout event
 * 
 * @param value - Cart value
 * @param contentIds - Product IDs in cart
 * @param numItems - Number of items
 */
export function trackInitiateCheckout(
    value: number,
    contentIds?: string[],
    numItems?: number
): string | null {
    return trackEvent('InitiateCheckout', {
        value,
        currency: metaConfig.currency,
        content_ids: contentIds,
        num_items: numItems,
        content_type: 'product',
    });
}

/**
 * User data for Purchase tracking (Advanced Matching)
 */
export interface PurchaseUserData {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
}

/**
 * Track Purchase event
 * 
 * @param value - Purchase value
 * @param orderId - Order ID
 * @param userData - Customer data for Advanced Matching
 */
export async function trackPurchase(
    value: number,
    orderId: string,
    userData?: PurchaseUserData
): Promise<string | null> {
    if (!isBrowser() || !metaConfig.enabled) return null;

    const eventId = generateEventId();

    // Prepare user data with hashed PII
    const matchingData: Partial<MetaUserData> = {
        ...getUserDataFromUTM(),
    };

    // Hash all PII fields for Advanced Matching
    if (userData?.email) {
        matchingData.em = await hashValue(normalizeEmail(userData.email));
    }
    if (userData?.phone) {
        matchingData.ph = await hashValue(normalizePhone(userData.phone));
    }
    if (userData?.firstName) {
        matchingData.fn = await hashValue(userData.firstName.toLowerCase().trim());
    }
    if (userData?.lastName) {
        matchingData.ln = await hashValue(userData.lastName.toLowerCase().trim());
    }
    if (userData?.city) {
        matchingData.ct = await hashValue(userData.city.toLowerCase().trim());
    }
    if (userData?.state) {
        matchingData.st = await hashValue(userData.state.toLowerCase().trim());
    }
    if (userData?.zip) {
        matchingData.zp = await hashValue(userData.zip.trim());
    }
    if (userData?.country) {
        matchingData.country = userData.country.toLowerCase().trim();
    }

    const eventData: MetaEventData = {
        value,
        currency: metaConfig.currency,
        order_id: orderId,
        content_type: 'product',
    };

    try {
        if (typeof window.fbq === 'function') {
            window.fbq('track', 'Purchase', eventData, {
                eventID: eventId,
            });

            if (metaConfig.debug) {
                console.log('[Meta Pixel] Purchase tracked:', { value, orderId });
            }
        }
    } catch (e) {
        console.error('[Meta Pixel] Purchase track error:', e);
    }

    // Send to CAPI for server-side tracking
    if (metaConfig.enableCAPI) {
        await sendToCAPI({
            event_name: 'Purchase',
            user_data: matchingData,
            custom_data: eventData,
            event_id: eventId,
        });
    }

    return eventId;
}

/**
 * Track Lead event
 * 
 * @param email - Lead email
 * @param value - Optional lead value
 */
export async function trackLead(
    email?: string,
    value?: number
): Promise<string | null> {
    const userData: Partial<MetaUserData> = {
        ...getUserDataFromUTM(),
    };

    if (email) {
        userData.em = await hashValue(normalizeEmail(email));
    }

    return trackEvent('Lead', { value, currency: metaConfig.currency }, userData);
}

/**
 * Send event to CAPI (Conversions API)
 */
async function sendToCAPI(request: CAPIRequest): Promise<void> {
    if (!metaConfig.enableCAPI) return;

    try {
        const response = await fetch('/api/meta/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            console.error('[Meta CAPI] Failed:', await response.text());
        } else if (metaConfig.debug) {
            console.log('[Meta CAPI] Event sent:', request.event_name);
        }
    } catch (e) {
        console.error('[Meta CAPI] Error:', e);
    }
}

/**
 * React Hook for Meta Event Tracking
 * 
 * @example
 * ```tsx
 * const { track, trackPurchase } = useMetaEvent();
 * 
 * // Track custom event
 * track('Lead', { value: 100 });
 * 
 * // Track purchase
 * await trackPurchase(2697, 'order_123', 'user@email.com');
 * ```
 */
export function useMetaEvent() {
    return {
        track: trackEvent,
        trackPageView,
        trackViewContent,
        trackInitiateCheckout,
        trackPurchase,
        trackLead,
    };
}
