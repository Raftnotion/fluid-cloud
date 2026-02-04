/**
 * Meta Pixel Utilities
 * 
 * Helper functions for hashing, cookie handling, and event ID generation
 */

/**
 * Check if running in browser
 */
export function isBrowser(): boolean {
    return typeof window !== 'undefined';
}

/**
 * Generate unique event ID for deduplication
 */
export function generateEventId(): string {
    return `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Get current URL
 */
export function getCurrentUrl(): string {
    if (!isBrowser()) return '';
    return window.location.href;
}

/**
 * Hash value using SHA256 (for Advanced Matching)
 */
export async function hashValue(value: string): Promise<string> {
    if (!isBrowser() || !value) return '';

    // Normalize: lowercase, trim whitespace
    const normalized = value.toLowerCase().trim();

    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(normalized);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
        console.error('[Meta Pixel] Hashing failed');
        return '';
    }
}

/**
 * Get fbclid from URL or localStorage
 */
export function getFbclid(): string | undefined {
    if (!isBrowser()) return undefined;

    // Check URL params first
    const params = new URLSearchParams(window.location.search);
    const urlFbclid = params.get('fbclid');
    if (urlFbclid) {
        // Store for later use
        localStorage.setItem('_fbclid', urlFbclid);
        return `fb.1.${Date.now()}.${urlFbclid}`;
    }

    // Check localStorage
    const stored = localStorage.getItem('_fbclid');
    if (stored) {
        return `fb.1.${Date.now()}.${stored}`;
    }

    return undefined;
}

/**
 * Get _fbp cookie value
 */
export function getFbp(): string | undefined {
    if (!isBrowser()) return undefined;

    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === '_fbp') {
            return value;
        }
    }
    return undefined;
}

/**
 * Get _fbc cookie value
 */
export function getFbc(): string | undefined {
    if (!isBrowser()) return undefined;

    // First check cookie
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === '_fbc') {
            return value;
        }
    }

    // Fallback to generated fbc from fbclid
    return getFbclid();
}

/**
 * Get current timestamp in seconds (for Meta)
 */
export function getEventTime(): number {
    return Math.floor(Date.now() / 1000);
}

/**
 * Normalize phone number (remove spaces, dashes, etc.)
 */
export function normalizePhone(phone: string): string {
    return phone.replace(/[\s\-\(\)\.]/g, '');
}

/**
 * Normalize email (lowercase, trim)
 */
export function normalizeEmail(email: string): string {
    return email.toLowerCase().trim();
}

// ══════════════════════════════════════════════════════════════════
//                    DEDUPLICATION HELPERS
// ══════════════════════════════════════════════════════════════════

const TRACKED_EVENTS_KEY = 'wpfye_tracked_events';

interface TrackedEvents {
    [key: string]: number; // eventKey: timestamp
}

/**
 * Get tracked events from localStorage
 */
function getTrackedEvents(): TrackedEvents {
    if (!isBrowser()) return {};

    try {
        const stored = localStorage.getItem(TRACKED_EVENTS_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch {
        return {};
    }
}

/**
 * Save tracked events to localStorage
 */
function saveTrackedEvents(events: TrackedEvents): void {
    if (!isBrowser()) return;

    try {
        localStorage.setItem(TRACKED_EVENTS_KEY, JSON.stringify(events));
    } catch {
        // Ignore storage errors
    }
}

/**
 * Check if an event was already tracked
 * 
 * @param eventKey - Unique key for the event (e.g., "purchase_pay_xxx")
 * @returns true if already tracked
 */
export function isEventTracked(eventKey: string): boolean {
    const events = getTrackedEvents();
    return !!events[eventKey];
}

/**
 * Mark an event as tracked
 * 
 * @param eventKey - Unique key for the event
 */
export function markEventTracked(eventKey: string): void {
    const events = getTrackedEvents();
    events[eventKey] = Date.now();
    saveTrackedEvents(events);
}

/**
 * Generate purchase event ID from payment ID
 * This ensures both Pixel and CAPI use same ID for deduplication
 * 
 * @param paymentId - Razorpay payment ID
 */
export function getPurchaseEventId(paymentId: string): string {
    return `purchase_${paymentId}`;
}

/**
 * Generate checkout event ID
 * Prevents duplicate InitiateCheckout on page refresh
 */
export function getCheckoutEventId(): string {
    if (!isBrowser()) return '';

    // Check if we have existing checkout session
    let sessionId = sessionStorage.getItem('checkout_session_id');
    if (!sessionId) {
        sessionId = `checkout_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem('checkout_session_id', sessionId);
    }
    return sessionId;
}
