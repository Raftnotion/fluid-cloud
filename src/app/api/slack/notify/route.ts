/**
 * Slack Webhook API Route
 * 
 * POST /api/slack/notify
 * Sends order notifications to Slack
 */

import { NextRequest, NextResponse } from 'next/server';
import { OrderNotificationData, SlackMessage, SlackBlock } from '@/extensions/slack-notification/types';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

/**
 * Build Slack message blocks for order notification
 */
function buildOrderMessage(data: OrderNotificationData): SlackMessage {
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
        { type: 'divider' },
        // Payment Details
        {
            type: 'section',
            text: { type: 'mrkdwn', text: '*💳 PAYMENT DETAILS*' }
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
            text: { type: 'mrkdwn', text: '*👤 CUSTOMER INFO*' }
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
            text: { type: 'mrkdwn', text: '*🏢 BILLING ADDRESS*' }
        },
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `${data.address}\n${data.city}, ${data.state} ${data.zip}\n${data.country}${data.isCompany && data.companyName ? `\n\n*Company:* ${data.companyName}` : ''}${data.gstin ? `\n*GSTIN:* ${data.gstin}` : ''}`
            }
        },
    ];

    // Attribution section
    if (data.utmSource || data.utmMedium || data.utmCampaign) {
        blocks.push(
            { type: 'divider' },
            {
                type: 'section',
                text: { type: 'mrkdwn', text: '*📊 ATTRIBUTION*' }
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

    // Device info
    if (data.browser || data.os || data.ip) {
        blocks.push(
            { type: 'divider' },
            {
                type: 'section',
                text: { type: 'mrkdwn', text: '*🖥️ DEVICE INFO*' }
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

export async function POST(request: NextRequest) {
    try {
        if (!SLACK_WEBHOOK_URL) {
            console.error('[Slack] SLACK_WEBHOOK_URL not configured');
            return NextResponse.json(
                { error: 'Slack webhook not configured' },
                { status: 500 }
            );
        }

        const body = await request.json();

        // Check if custom message or order data
        let slackMessage: SlackMessage;
        if (body.customMessage) {
            slackMessage = body.customMessage;
        } else {
            slackMessage = buildOrderMessage(body as OrderNotificationData);
        }

        // Send to Slack
        const response = await fetch(SLACK_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(slackMessage)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Slack] Webhook error:', errorText);
            return NextResponse.json(
                { error: 'Slack webhook failed', details: errorText },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[Slack] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
