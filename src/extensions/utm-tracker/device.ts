/**
 * Device Detection Utility
 * 
 * Parse user agent and detect device, browser, OS info
 */

import { DeviceInfo } from './types';

/**
 * Check if code is running in browser
 */
function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Parse browser info from user agent
 */
function parseBrowser(ua: string): { name: string; version: string } {
    const browsers = [
        { name: 'Edge', regex: /Edg\/(\d+[\.\d]*)/ },
        { name: 'Chrome', regex: /Chrome\/(\d+[\.\d]*)/ },
        { name: 'Firefox', regex: /Firefox\/(\d+[\.\d]*)/ },
        { name: 'Safari', regex: /Version\/(\d+[\.\d]*).*Safari/ },
        { name: 'Opera', regex: /OPR\/(\d+[\.\d]*)/ },
        { name: 'IE', regex: /MSIE\s(\d+[\.\d]*)/ },
    ];

    for (const browser of browsers) {
        const match = ua.match(browser.regex);
        if (match) {
            return { name: browser.name, version: match[1] || '' };
        }
    }

    return { name: 'Unknown', version: '' };
}

/**
 * Parse OS info from user agent
 */
function parseOS(ua: string): { name: string; version: string } {
    const osPatterns = [
        { name: 'Windows', regex: /Windows NT (\d+[\.\d]*)/ },
        { name: 'macOS', regex: /Mac OS X (\d+[_\.\d]*)/ },
        { name: 'iOS', regex: /iPhone OS (\d+[_\.\d]*)/ },
        { name: 'Android', regex: /Android (\d+[\.\d]*)/ },
        { name: 'Linux', regex: /Linux/ },
    ];

    for (const os of osPatterns) {
        const match = ua.match(os.regex);
        if (match) {
            const version = match[1] ? match[1].replace(/_/g, '.') : '';
            return { name: os.name, version };
        }
    }

    return { name: 'Unknown', version: '' };
}

/**
 * Detect device type from user agent
 */
function detectDeviceType(ua: string): 'desktop' | 'mobile' | 'tablet' {
    const mobileRegex = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet/i;

    if (tabletRegex.test(ua)) {
        return 'tablet';
    }
    if (mobileRegex.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

/**
 * Get complete device information
 */
export function getDeviceInfo(): DeviceInfo | null {
    if (!isBrowser()) {
        return null;
    }

    const ua = navigator.userAgent;
    const browser = parseBrowser(ua);
    const os = parseOS(ua);

    return {
        userAgent: ua,
        browser: browser.name,
        browserVersion: browser.version,
        os: os.name,
        osVersion: os.version,
        deviceType: detectDeviceType(ua),
        platform: navigator.platform || 'Unknown',
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language || 'Unknown',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        timestamp: Date.now(),
    };
}

/**
 * Fetch IP address from server
 * Returns null if fetch fails
 */
export async function fetchIPAddress(): Promise<string | null> {
    try {
        const response = await fetch('/api/ip');
        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data.ip || null;
    } catch {
        return null;
    }
}
