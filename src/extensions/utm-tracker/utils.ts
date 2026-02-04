/**
 * UTM Tracker Utilities
 * 
 * Core functions for capturing, storing, and retrieving UTM data
 */

import { UTMData, UTMParams } from './types';
import { utmConfig } from './index';
import { getDeviceInfo } from './device';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Parse UTM params from URL search params
 */
function parseUTMFromURL(): { utm: UTMParams; custom: Record<string, string> } {
    if (!isBrowser()) {
        return { utm: {}, custom: {} };
    }

    const params = new URLSearchParams(window.location.search);
    const utm: UTMParams = {};
    const custom: Record<string, string> = {};

    // Capture standard UTM params
    for (const param of UTM_PARAMS) {
        const value = params.get(param);
        if (value) {
            utm[param] = value;
        }
    }

    // Capture custom params
    for (const param of utmConfig.customParams) {
        const value = params.get(param);
        if (value) {
            custom[param] = value;
        }
    }

    return { utm, custom };
}

/**
 * Check if UTM data has any actual values
 */
function hasUTMData(data: { utm: UTMParams; custom: Record<string, string> }): boolean {
    return Object.keys(data.utm).length > 0 || Object.keys(data.custom).length > 0;
}

/**
 * Get stored UTM data from localStorage
 */
export function getUTMData(): UTMData | null {
    if (!isBrowser()) {
        return null;
    }

    try {
        const stored = localStorage.getItem(utmConfig.storageKey);
        if (!stored) {
            return null;
        }

        const data: UTMData = JSON.parse(stored);

        // Check if expired
        if (Date.now() > data.expiresAt) {
            if (utmConfig.debug) {
                console.log('[UTM Tracker] Data expired, clearing...');
            }
            clearUTM();
            return null;
        }

        return data;
    } catch {
        return null;
    }
}

/**
 * Save UTM data to localStorage
 */
function saveUTMData(data: UTMData): void {
    if (!isBrowser()) return;

    try {
        localStorage.setItem(utmConfig.storageKey, JSON.stringify(data));

        if (utmConfig.debug) {
            console.log('[UTM Tracker] Saved:', data);
        }
    } catch (e) {
        console.error('[UTM Tracker] Failed to save:', e);
    }
}

/**
 * Capture UTM from current URL
 * 
 * Call this on page load to capture UTM params
 */
export function captureUTM(): UTMData | null {
    if (!isBrowser() || !utmConfig.enabled) {
        return null;
    }

    const { utm, custom } = parseUTMFromURL();
    const existingData = getUTMData();

    // No new UTM data in URL
    if (!hasUTMData({ utm, custom })) {
        // If no existing data and we should track landing page
        if (!existingData && utmConfig.trackLandingPage) {
            const newData: UTMData = {
                utm: {},
                custom: {},
                referrer: utmConfig.trackReferrer ? document.referrer || undefined : undefined,
                landingPage: window.location.href,
                device: utmConfig.trackDevice ? getDeviceInfo() || undefined : undefined,
                capturedAt: Date.now(),
                expiresAt: Date.now() + (utmConfig.expirationDays * 24 * 60 * 60 * 1000),
            };
            saveUTMData(newData);
            return newData;
        }
        return existingData;
    }

    // First-touch: Keep existing data if present
    if (utmConfig.attributionModel === 'first' && existingData) {
        if (utmConfig.debug) {
            console.log('[UTM Tracker] First-touch: Keeping existing data');
        }
        return existingData;
    }

    // Create new UTM data
    const newData: UTMData = {
        utm,
        custom,
        referrer: utmConfig.trackReferrer ? document.referrer || undefined : undefined,
        landingPage: existingData?.landingPage || window.location.href,
        device: utmConfig.trackDevice ? getDeviceInfo() || undefined : undefined,
        capturedAt: Date.now(),
        expiresAt: Date.now() + (utmConfig.expirationDays * 24 * 60 * 60 * 1000),
    };

    saveUTMData(newData);

    if (utmConfig.debug) {
        console.log('[UTM Tracker] Captured:', newData);
    }

    return newData;
}

/**
 * Clear stored UTM data
 */
export function clearUTM(): void {
    if (!isBrowser()) return;

    localStorage.removeItem(utmConfig.storageKey);

    if (utmConfig.debug) {
        console.log('[UTM Tracker] Cleared');
    }
}

/**
 * Get UTM data for API/checkout (flat object)
 * 
 * Returns a simple object that can be sent to backend
 */
export function getUTMForAPI(): Record<string, string> {
    const data = getUTMData();
    if (!data) return {};

    return {
        ...data.utm,
        ...data.custom,
        ...(data.referrer && { referrer: data.referrer }),
        ...(data.landingPage && { landing_page: data.landingPage }),
    };
}

/**
 * Update device IP address in stored UTM data
 * 
 * Called after IP is fetched from server
 */
export function updateDeviceIP(ip: string): void {
    if (!isBrowser()) return;

    const data = getUTMData();
    if (!data) return;

    // Add IP to device info
    if (data.device) {
        data.device.ip = ip;

        // Save updated data
        try {
            localStorage.setItem(utmConfig.storageKey, JSON.stringify(data));

            if (utmConfig.debug) {
                console.log('[UTM Tracker] IP updated:', ip);
            }
        } catch (e) {
            console.error('[UTM Tracker] Failed to update IP:', e);
        }
    }
}
