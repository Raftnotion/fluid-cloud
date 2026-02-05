/**
 * Slack Notification Types
 */

/**
 * Order notification data structure
 */
export interface OrderNotificationData {
    // Payment
    paymentId: string;
    amount: number;
    plan: string;

    // Customer
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    domain: string;

    // Billing
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isCompany: boolean;
    companyName?: string;
    gstin?: string;

    // Attribution (UTM)
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
    landingPage?: string;
    referrer?: string;

    // Device
    browser?: string;
    os?: string;
    deviceType?: string;
    ip?: string;

    // Timestamp
    timestamp?: string;
}

/**
 * Slack configuration options
 */
export interface SlackNotificationConfig {
    enabled: boolean;
    webhookUrl: string;
    debug: boolean;
}

/**
 * Slack block types (simplified)
 */
export interface SlackBlock {
    type: string;
    text?: {
        type: string;
        text: string;
        emoji?: boolean;
    };
    fields?: Array<{
        type: string;
        text: string;
    }>;
    elements?: Array<{
        type: string;
        text: string;
    }>;
}

/**
 * Slack message payload
 */
export interface SlackMessage {
    text?: string;
    blocks?: SlackBlock[];
    attachments?: Array<{
        color?: string;
        blocks?: SlackBlock[];
    }>;
}
