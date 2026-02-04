/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                    META PIXEL                                 ║
 * ║       Advanced Meta Ads Tracking (Pixel + CAPI)               ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * Version: 1.0.0
 * 
 * Features:
 * - Meta Pixel (Client-side tracking)
 * - Conversions API (Server-side tracking)
 * - Standard Events (PageView, ViewContent, Purchase, etc.)
 * - Advanced Matching (IP, UA, Email, Phone, fbclid)
 * - UTM Tracker Integration
 */

export { MetaPixel } from './MetaPixel';
export { useMetaEvent, trackEvent, trackPurchase, trackPageView, trackInitiateCheckout, trackViewContent, trackAddPaymentInfo } from './events';
export { sendCAPIEvent } from './capi';
export { isEventTracked, markEventTracked, getPurchaseEventId, getCheckoutEventId } from './utils';
export type { MetaEvent, MetaUserData, MetaEventData } from './types';

/**
 * Meta Pixel Configuration
 */
export const metaConfig = {
    /** Enable/disable Meta tracking */
    enabled: true,

    /** Meta Pixel ID (from environment) */
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',

    /** Access Token for CAPI (server-side only) */
    accessToken: process.env.META_ACCESS_TOKEN || '',

    /** Test Event Code (for debugging in Events Manager) */
    testEventCode: process.env.META_TEST_EVENT_CODE || '',

    /** Enable Conversions API (server-side) */
    enableCAPI: true,

    /** Enable Advanced Matching */
    enableAdvancedMatching: true,

    /** Auto track PageView on every page */
    autoPageView: true,

    /** Debug mode - log events to console */
    debug: process.env.NODE_ENV === 'development',

    /** Currency for purchase events */
    currency: 'INR',
};
