'use client';

/**
 * useUTM Hook
 * 
 * React hook to access UTM data in components
 */

import { useEffect, useState } from 'react';
import { UTMData } from './types';
import { getUTMData, captureUTM } from './utils';
import { utmConfig } from './index';

/**
 * Hook to get current UTM data
 * 
 * @param autoCapture - Automatically capture UTM on mount (default: false)
 * @returns UTMData or null
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const utm = useUTM();
 *   
 *   console.log(utm?.utm.utm_source);
 *   console.log(utm?.referrer);
 * }
 * ```
 */
export function useUTM(autoCapture: boolean = false): UTMData | null {
    const [utmData, setUtmData] = useState<UTMData | null>(null);

    useEffect(() => {
        if (!utmConfig.enabled) return;

        if (autoCapture) {
            const captured = captureUTM();
            setUtmData(captured);
        } else {
            setUtmData(getUTMData());
        }
    }, [autoCapture]);

    return utmData;
}
