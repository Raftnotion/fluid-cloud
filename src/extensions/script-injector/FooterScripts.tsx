'use client';

/**
 * Footer Scripts - Scripts for end of <body>
 * 
 * Examples: Crisp Chat, Tawk Chat, Intercom, etc.
 * 
 * Supports:
 * - includePages: Load only on specific pages
 * - excludePages: Don't load on specific pages
 */

// import Script from 'next/script';
// import { usePathname } from 'next/navigation';
// import { scriptConfig, shouldLoadScript } from './index';

export function FooterScripts() {
  // const pathname = usePathname();

  return (
    <>
      {/* 
        Example with page filtering:
        
        {shouldLoadScript(scriptConfig.footer.crispChat, pathname) && (
          <Script id="crisp-chat">
            {`window.$crisp=[];window.CRISP_WEBSITE_ID="${scriptConfig.footer.crispChat.id}";`}
          </Script>
        )}
        
        Config example:
        crispChat: {
          enabled: true,
          id: 'XXXXXXX',
          excludePages: ['/checkout'],  // No chat on checkout
          // OR
          includePages: ['/', '/contact', '/support'],  // Only on these pages
        }
      */}
    </>
  );
}
