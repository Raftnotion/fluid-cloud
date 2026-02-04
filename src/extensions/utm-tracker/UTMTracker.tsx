'use client';

/**
 * UTM Tracker Component
 * 
 * Automatically captures UTM params and device info on page load.
 * Also fetches IP address in background.
 */

import { useEffect } from 'react';
import { captureUTM, updateDeviceIP } from './utils';
import { fetchIPAddress } from './device';
import { utmConfig } from './index';

/**
 * UTM Tracker Component
 * 
 * Renders nothing, just captures UTM data on mount.
 * IP address is fetched asynchronously in background.
 * 
 * @example
 * ```tsx
 * // In layout.tsx
 * <UTMTracker />
 * ```
 */
export function UTMTracker() {
    useEffect(() => {
        if (!utmConfig.enabled) return;

        // Capture UTM + Device info
        captureUTM();

        // Fetch IP address in background
        if (utmConfig.trackDevice) {
            fetchIPAddress().then(ip => {
                if (ip) {
                    updateDeviceIP(ip);
                    if (utmConfig.debug) {
                        console.log('[UTM Tracker] IP captured:', ip);
                    }
                }
            });
        }
    }, []);

    // Renders nothing
    return null;
}
