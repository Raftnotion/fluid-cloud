"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * HashScroller - Handles scrolling to hash anchors on page load/navigation
 * This fixes the issue where navigating from another page with a hash (e.g., /about -> /#pricing)
 * doesn't scroll to the target section.
 */
export function HashScroller() {
    const pathname = usePathname();

    useEffect(() => {
        // Function to scroll to hash
        const scrollToHash = () => {
            const hash = window.location.hash;
            if (hash) {
                // Small delay to ensure the page has rendered
                setTimeout(() => {
                    const element = document.querySelector(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            }
        };

        // Scroll on initial load
        scrollToHash();

        // Listen for hash changes
        window.addEventListener('hashchange', scrollToHash);

        return () => {
            window.removeEventListener('hashchange', scrollToHash);
        };
    }, [pathname]);

    return null;
}
