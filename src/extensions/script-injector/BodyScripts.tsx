'use client';

/**
 * Body Scripts - Scripts for start of <body>
 * 
 * Examples: Cookie Consent, Banner Widgets, Overlays, etc.
 * 
 * Supports:
 * - includePages: Load only on specific pages
 * - excludePages: Don't load on specific pages
 */

// import { usePathname } from 'next/navigation';
// import { scriptConfig, shouldLoadScript } from './index';

export function BodyScripts() {
    // const pathname = usePathname();

    return (
        <>
            {/* 
        Example with page filtering:
        
        {shouldLoadScript(scriptConfig.body.cookieConsent, pathname) && (
          <CookieConsentBanner />
        )}
        
        Config example:
        cookieConsent: {
          enabled: true,
          excludePages: ['/legal'],  // Don't show on legal pages
        }
      */}
        </>
    );
}
