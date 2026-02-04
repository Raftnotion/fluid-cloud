/**
 * Meta Pixel Types
 */

/**
 * Standard Meta Events
 */
export type MetaEventName =
    | 'PageView'
    | 'ViewContent'
    | 'Search'
    | 'AddToCart'
    | 'AddToWishlist'
    | 'InitiateCheckout'
    | 'AddPaymentInfo'
    | 'Purchase'
    | 'Lead'
    | 'CompleteRegistration'
    | 'Contact'
    | 'CustomizeProduct'
    | 'Donate'
    | 'FindLocation'
    | 'Schedule'
    | 'StartTrial'
    | 'SubmitApplication'
    | 'Subscribe';

/**
 * User Data for Advanced Matching
 * All values should be hashed (SHA256) before sending
 */
export interface MetaUserData {
    /** Email (will be hashed) */
    em?: string;
    /** Phone number (will be hashed) */
    ph?: string;
    /** First name (will be hashed) */
    fn?: string;
    /** Last name (will be hashed) */
    ln?: string;
    /** City (will be hashed) */
    ct?: string;
    /** State (will be hashed) */
    st?: string;
    /** Zip/Postal code (will be hashed) */
    zp?: string;
    /** Country code */
    country?: string;
    /** External ID (your user ID, will be hashed) */
    external_id?: string;
    /** Client IP address */
    client_ip_address?: string;
    /** Client user agent */
    client_user_agent?: string;
    /** Facebook click ID (fbclid from URL) */
    fbc?: string;
    /** Facebook browser ID (from _fbp cookie) */
    fbp?: string;
}

/**
 * Event data for custom parameters
 */
export interface MetaEventData {
    /** Value of the event */
    value?: number;
    /** Currency (default: INR) */
    currency?: string;
    /** Content IDs (product IDs) */
    content_ids?: string[];
    /** Content type */
    content_type?: 'product' | 'product_group';
    /** Content name */
    content_name?: string;
    /** Content category */
    content_category?: string;
    /** Number of items */
    num_items?: number;
    /** Order ID */
    order_id?: string;
    /** Search string */
    search_string?: string;
    /** Any custom data */
    [key: string]: unknown;
}

/**
 * Complete Meta Event
 */
export interface MetaEvent {
    /** Event name */
    event_name: MetaEventName | string;
    /** Event time (Unix timestamp in seconds) */
    event_time: number;
    /** Event ID for deduplication */
    event_id: string;
    /** Event source URL */
    event_source_url: string;
    /** Action source */
    action_source: 'website';
    /** User data for matching */
    user_data: MetaUserData;
    /** Custom data / parameters */
    custom_data?: MetaEventData;
}

/**
 * CAPI Request payload
 */
export interface CAPIRequest {
    event_name: MetaEventName | string;
    user_data?: Partial<MetaUserData>;
    custom_data?: MetaEventData;
    event_id?: string;
}
