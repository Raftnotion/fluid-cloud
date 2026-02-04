'use client';

/**
 * Head Scripts - Scripts for <head> section
 * 
 * Examples: Google Analytics, Facebook Pixel, Hotjar, etc.
 * 
 * Supports:
 * - includePages: Load only on specific pages
 * - excludePages: Don't load on specific pages
 */

// import Script from 'next/script';
// import { usePathname } from 'next/navigation';
// import { scriptConfig, shouldLoadScript } from './index';

export function HeadScripts() {
  // const pathname = usePathname();

  return (
    <>
      {/* 
        Example with page filtering:
        
        {shouldLoadScript(scriptConfig.head.googleAnalytics, pathname) && (
          <Script 
            src={`https://www.googletagmanager.com/gtag/js?id=${scriptConfig.head.googleAnalytics.id}`}
            strategy="afterInteractive"
          />
        )}
        
        Config example:
        googleAnalytics: {
          enabled: true,
          id: 'G-XXXXXXX',
          excludePages: ['/checkout'],  // Won't load on /checkout/*
        }
      */}
    </>
  );
}
