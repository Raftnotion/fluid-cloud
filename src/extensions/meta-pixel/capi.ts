/**
 * Conversions API (CAPI) Client
 * 
 * Helper for sending events to CAPI via the server route
 */

import { CAPIRequest } from './types';
import { metaConfig } from './index';

/**
 * Send event to Conversions API
 * 
 * This function calls the /api/meta/track server route
 * which then forwards the event to Meta's CAPI.
 * 
 * @param request - Event data to send
 */
export async function sendCAPIEvent(request: CAPIRequest): Promise<boolean> {
    if (!metaConfig.enableCAPI) {
        return false;
    }

    try {
        const response = await fetch('/api/meta/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('[Meta CAPI] Request failed:', error);
            return false;
        }

        const result = await response.json();

        if (metaConfig.debug) {
            console.log('[Meta CAPI] Response:', result);
        }

        return true;
    } catch (error) {
        console.error('[Meta CAPI] Error:', error);
        return false;
    }
}
