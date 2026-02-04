/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                    WPFYE EXTENSIONS                           ║
 * ║                     Main Registry                             ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * Version: 1.0.0
 * 
 * Extension System Structure:
 * extensions/
 * ├── script-injector/     ← Third-party scripts
 * ├── google-analytics/    ← (future)
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

// Future extensions will be exported here:
// export { GoogleAnalytics } from './google-analytics';
// export { CrispChat } from './crisp-chat';
