/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                    UTM TRACKER                                ║
 * ║         Advanced UTM & Attribution Tracking                   ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * Version: 1.1.0
 * 
 * Features:
 * - Capture all UTM parameters
 * - Track referrer & landing page
 * - Device & Browser info capture
 * - First-touch / Last-touch attribution
 * - Configurable expiration
 * - Custom params support
 */

export { UTMTracker } from './UTMTracker';
export { useUTM } from './useUTM';
export { captureUTM, getUTMData, clearUTM, getUTMForAPI } from './utils';
export { getDeviceInfo, fetchIPAddress } from './device';
export type { UTMData, UTMConfig, DeviceInfo } from './types';

/**
 * UTM Tracker Configuration
 */
export const utmConfig: import('./types').UTMConfig = {
    /** Enable/disable UTM tracking */
    enabled: true,

    /** Storage key for localStorage */
    storageKey: 'wpfye_utm',

    /** Expiration in days (default: 30 days) */
    expirationDays: 30,

    /** 
     * Attribution model:
     * - 'first': Keep first UTM (first-touch attribution)
     * - 'last': Override with latest UTM (last-touch attribution)
     */
    attributionModel: 'first',

    /** Track document.referrer */
    trackReferrer: true,

    /** Track landing page URL */
    trackLandingPage: true,

    /** Track device & browser info */
    trackDevice: true,

    /** Custom params to capture (in addition to UTM) */
    customParams: ['ref', 'via', 'partner'],

    /** Debug mode - log to console */
    debug: false,
};
