/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                    SCRIPT INJECTOR                            ║
 * ║      Third-party scripts ko head/body/footer mein inject      ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * Version: 1.1.0
 * 
 * Features:
 * - Global scripts (all pages)
 * - Include specific pages only
 * - Exclude specific pages
 */

export { HeadScripts } from './HeadScripts';
export { BodyScripts } from './BodyScripts';
export { FooterScripts } from './FooterScripts';
export { shouldLoadScript } from './utils';

/**
 * Script Configuration Type
 */
export interface ScriptConfig {
    enabled: boolean;
    /** Load only on these pages (if empty, loads on all) */
    includePages?: string[];
    /** Don't load on these pages */
    excludePages?: string[];
    /** Additional config like IDs */
    [key: string]: unknown;
}

/**
 * Script Registry
 * 
 * Usage:
 * ```
 * googleAnalytics: {
 *   enabled: true,
 *   id: 'G-XXXXXXX',
 *   excludePages: ['/checkout', '/checkout/success'],  // Don't track checkout
 * },
 * 
 * promoPopup: {
 *   enabled: true,
 *   includePages: ['/', '/pricing'],  // Only on home & pricing
 * },
 * ```
 */
export const scriptConfig = {
    head: {
        // googleAnalytics: { 
        //   enabled: false, 
        //   id: 'G-XXXXXXX',
        //   excludePages: ['/checkout/success'],  // Exclude specific pages
        // },
        // facebookPixel: { 
        //   enabled: false, 
        //   id: 'XXXXXXX',
        //   includePages: ['/', '/pricing'],  // Only on specific pages
        // },
    } as Record<string, ScriptConfig>,

    body: {
        // cookieConsent: { 
        //   enabled: false,
        //   excludePages: ['/legal'],  // Don't show on legal pages
        // },
    } as Record<string, ScriptConfig>,

    footer: {
        // crispChat: { 
        //   enabled: false, 
        //   id: 'XXXXXXX',
        //   excludePages: ['/checkout', '/checkout/success', '/checkout/failed'],
        // },
    } as Record<string, ScriptConfig>,
};
