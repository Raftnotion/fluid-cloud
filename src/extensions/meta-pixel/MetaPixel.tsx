'use client';

/**
 * Meta Pixel Component
 * 
 * Injects Meta Pixel script and handles client-side tracking.
 * Add this to your layout to enable Meta tracking.
 */

import Script from 'next/script';
import { useEffect } from 'react';
import { metaConfig } from './index';
import { getFbclid } from './utils';

// Declare fbq for TypeScript
declare global {
    interface Window {
        fbq: (...args: unknown[]) => void;
        _fbq: (...args: unknown[]) => void;
    }
}

/**
 * Meta Pixel Component
 * 
 * Renders the Meta Pixel script and initializes tracking.
 * 
 * @example
 * ```tsx
 * // In layout.tsx
 * <MetaPixel />
 * ```
 */
export function MetaPixel() {
    useEffect(() => {
        if (!metaConfig.enabled || !metaConfig.pixelId) return;

        // Store fbclid for later use
        getFbclid();

        if (metaConfig.debug) {
            console.log('[Meta Pixel] Initialized with ID:', metaConfig.pixelId);
        }
    }, []);

    // Don't render if not enabled or no pixel ID
    if (!metaConfig.enabled || !metaConfig.pixelId) {
        return null;
    }

    return (
        <>
            {/* Meta Pixel Base Code */}
            <Script
                id="meta-pixel-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        
                        fbq('init', '${metaConfig.pixelId}'${metaConfig.enableAdvancedMatching ? ', {}' : ''});
                        ${metaConfig.autoPageView ? "fbq('track', 'PageView');" : ''}
                    `,
                }}
            />

            {/* NoScript fallback */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: 'none' }}
                    src={`https://www.facebook.com/tr?id=${metaConfig.pixelId}&ev=PageView&noscript=1`}
                    alt=""
                />
            </noscript>
        </>
    );
}
