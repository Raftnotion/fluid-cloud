/**
 * UTM Tracker Types
 */

/**
 * Standard UTM Parameters
 */
export interface UTMParams {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
}

/**
 * Complete UTM Data stored in localStorage
 */
export interface UTMData {
    /** Standard UTM params */
    utm: UTMParams;

    /** Custom params (ref, via, partner, etc.) */
    custom: Record<string, string>;

    /** Document referrer */
    referrer?: string;

    /** First landing page URL */
    landingPage?: string;

    /** Device & Browser info */
    device?: DeviceInfo;

    /** Timestamp when UTM was captured */
    capturedAt: number;

    /** Timestamp when UTM expires */
    expiresAt: number;
}

/**
 * Device & Browser Information
 */
export interface DeviceInfo {
    /** Raw user agent string */
    userAgent: string;

    /** Parsed browser name (Chrome, Firefox, Safari, etc.) */
    browser: string;

    /** Browser version */
    browserVersion: string;

    /** Operating system (Windows, macOS, iOS, Android, Linux) */
    os: string;

    /** OS version */
    osVersion: string;

    /** Device type (desktop, mobile, tablet) */
    deviceType: 'desktop' | 'mobile' | 'tablet';

    /** Platform from navigator */
    platform: string;

    /** Screen resolution */
    screenResolution: string;

    /** Language preference */
    language: string;

    /** Timezone */
    timezone: string;

    /** IP Address (from server) */
    ip?: string;

    /** Timestamp of capture */
    timestamp: number;
}

/**
 * UTM Tracker Configuration
 */
export interface UTMConfig {
    /** Enable/disable tracking */
    enabled: boolean;

    /** localStorage key */
    storageKey: string;

    /** Expiration in days */
    expirationDays: number;

    /** Attribution model */
    attributionModel: 'first' | 'last';

    /** Track referrer */
    trackReferrer: boolean;

    /** Track landing page */
    trackLandingPage: boolean;

    /** Track device & browser info */
    trackDevice: boolean;

    /** Custom params to capture */
    customParams: string[];

    /** Debug mode */
    debug: boolean;
}
