/**
 * Slack Notification Functions
 */

import { OrderNotificationData, SlackMessage, SlackBlock } from './types';

/**
 * Build Slack message blocks for order notification
 */
export function buildOrderMessage(data: OrderNotificationData): SlackMessage {
    const blocks: SlackBlock[] = [
        // Header
        {
            type: 'header',
            text: {
                type: 'plain_text',
                text: '🎉 NEW ORDER - WPFYE Fluid Cloud',
                emoji: true
            }
        },
        // Divider
        { type: 'divider' },
        // Payment Details
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*💳 PAYMENT DETAILS*'
            }
        },
        {
            type: 'section',
            fields: [
                { type: 'mrkdwn', text: `*Payment ID:*\n\`${data.paymentId}\`` },
                { type: 'mrkdwn', text: `*Amount:*\n₹${data.amount.toLocaleString()}` },
                { type: 'mrkdwn', text: `*Plan:*\n${data.plan}` },
                { type: 'mrkdwn', text: `*Status:*\n✅ Success` }
            ]
        },
        { type: 'divider' },
        // Customer Info
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*👤 CUSTOMER INFO*'
            }
        },
        {
            type: 'section',
            fields: [
                { type: 'mrkdwn', text: `*Name:*\n${data.firstName} ${data.lastName}` },
                { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
                { type: 'mrkdwn', text: `*Phone:*\n${data.phone}` },
                { type: 'mrkdwn', text: `*Domain:*\n${data.domain}` }
            ]
        },
        { type: 'divider' },
        // Billing Address
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*🏢 BILLING ADDRESS*'
            }
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `${data.address}\n${data.city}, ${data.state} ${data.zip}\n${data.country}${data.isCompany && data.companyName ? `\n\n*Company:* ${data.companyName}` : ''}${data.gstin ? `\n*GSTIN:* ${data.gstin}` : ''}`
            }
        },
    ];

    // Attribution section (if UTM data available)
    if (data.utmSource || data.utmMedium || data.utmCampaign) {
        blocks.push(
            { type: 'divider' },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*📊 ATTRIBUTION (Where Sale Came From)*'
                }
            },
            {
                type: 'section',
                fields: [
                    { type: 'mrkdwn', text: `*Source:*\n${data.utmSource || 'Direct'}` },
                    { type: 'mrkdwn', text: `*Medium:*\n${data.utmMedium || '-'}` },
                    { type: 'mrkdwn', text: `*Campaign:*\n${data.utmCampaign || '-'}` },
                    { type: 'mrkdwn', text: `*Term:*\n${data.utmTerm || '-'}` }
                ]
            }
        );

        if (data.landingPage || data.referrer) {
            blocks.push({
                type: 'section',
                fields: [
                    { type: 'mrkdwn', text: `*Landing:*\n${data.landingPage ? data.landingPage.substring(0, 50) + '...' : '-'}` },
                    { type: 'mrkdwn', text: `*Referrer:*\n${data.referrer || 'Direct'}` }
                ]
            });
        }
    }

    // Device info section
    if (data.browser || data.os || data.ip) {
        blocks.push(
            { type: 'divider' },
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '*🖥️ DEVICE INFO*'
                }
            },
            {
                type: 'section',
                fields: [
                    { type: 'mrkdwn', text: `*Browser:*\n${data.browser || '-'}` },
                    { type: 'mrkdwn', text: `*OS:*\n${data.os || '-'}` },
                    { type: 'mrkdwn', text: `*Device:*\n${data.deviceType || '-'}` },
                    { type: 'mrkdwn', text: `*IP:*\n${data.ip || '-'}` }
                ]
            }
        );
    }

    // Timestamp
    blocks.push(
        { type: 'divider' },
        {
            type: 'context',
            elements: [
                { type: 'mrkdwn', text: `🕐 ${data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}` }
            ]
        }
    );

    return {
        text: `New Order: ₹${data.amount} from ${data.firstName} ${data.lastName}`,
        blocks
    };
}

/**
 * Send order notification to Slack
 */
export async function sendOrderNotification(data: OrderNotificationData): Promise<boolean> {
    try {
        const response = await fetch('/api/slack/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('[Slack] Notification failed:', await response.text());
            return false;
        }

        console.log('[Slack] Order notification sent');
        return true;
    } catch (error) {
        console.error('[Slack] Error sending notification:', error);
        return false;
    }
}

/**
 * Send custom notification to Slack
 */
export async function sendSlackNotification(message: SlackMessage): Promise<boolean> {
    try {
        const response = await fetch('/api/slack/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customMessage: message })
        });

        return response.ok;
    } catch (error) {
        console.error('[Slack] Error:', error);
        return false;
    }
}
