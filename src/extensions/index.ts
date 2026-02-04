/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                    WPFYE EXTENSIONS                           ║
 * ║                     Main Registry                             ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * Version: 1.1.0
 * 
 * Extension System Structure:
 * extensions/
 * ├── script-injector/     ← Third-party scripts
 * ├── utm-tracker/         ← UTM & attribution tracking
 * ├── meta-pixel/          ← Meta Ads tracking
 * └── crisp-chat/          ← (future)
 * 
 * Har extension apne folder mein self-contained hai.
 */

// ══════════════════════════════════════════════════════════════════
//                    EXTENSION EXPORTS
// ══════════════════════════════════════════════════════════════════

/**
 * Script Injector Extension
 * Third-party scripts ko head/body/footer mein inject karta hai.
 */
export { HeadScripts, BodyScripts, FooterScripts } from './script-injector';

/**
 * UTM Tracker Extension
 * Advanced UTM & attribution tracking.
 */
export { UTMTracker, useUTM, getUTMForAPI, captureUTM, clearUTM, getUTMData } from './utm-tracker';

/**
 * Meta Pixel Extension
 * Meta Ads tracking with Pixel + Conversions API.
 */
export { MetaPixel, useMetaEvent, trackEvent, trackPurchase, trackPageView } from './meta-pixel';

