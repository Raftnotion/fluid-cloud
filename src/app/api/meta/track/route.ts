import { NextRequest, NextResponse } from 'next/server';
import { MetaEvent, CAPIRequest } from '@/extensions/meta-pixel/types';

/**
 * POST /api/meta/track
 * 
 * Server-side Conversions API (CAPI) endpoint.
 * Receives events from client and forwards to Meta's CAPI.
 */
export async function POST(request: NextRequest) {
    try {
        const body: CAPIRequest = await request.json();

        // Get config from env
        const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
        const accessToken = process.env.META_ACCESS_TOKEN;
        const testEventCode = process.env.META_TEST_EVENT_CODE;

        if (!pixelId || !accessToken) {
            console.error('[Meta CAPI] Missing PIXEL_ID or ACCESS_TOKEN');
            return NextResponse.json(
                { error: 'Meta Pixel not configured' },
                { status: 500 }
            );
        }

        // Get client IP and User Agent from request headers
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIP = request.headers.get('x-real-ip');
        const userAgent = request.headers.get('user-agent');

        let clientIP = forwardedFor?.split(',')[0]?.trim() || realIP || '';
        if (clientIP.startsWith('::ffff:')) {
            clientIP = clientIP.slice(7);
        }

        // Build the event
        const event: MetaEvent = {
            event_name: body.event_name,
            event_time: Math.floor(Date.now() / 1000),
            event_id: body.event_id || `${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
            event_source_url: request.headers.get('referer') || '',
            action_source: 'website',
            user_data: {
                ...body.user_data,
                client_ip_address: body.user_data?.client_ip_address || clientIP,
                client_user_agent: body.user_data?.client_user_agent || userAgent || '',
            },
            custom_data: body.custom_data,
        };

        // Build CAPI request payload
        const capiPayload = {
            data: [event],
            ...(testEventCode && { test_event_code: testEventCode }),
        };

        // Send to Meta CAPI
        const capiUrl = `https://graph.facebook.com/v18.0/${pixelId}/events`;

        const response = await fetch(`${capiUrl}?access_token=${accessToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(capiPayload),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('[Meta CAPI] Error:', result);
            return NextResponse.json(
                { error: 'CAPI request failed', details: result },
                { status: response.status }
            );
        }

        // Log in development
        if (process.env.NODE_ENV === 'development') {
            console.log('[Meta CAPI] Event sent:', {
                event_name: body.event_name,
                event_id: event.event_id,
                response: result,
            });
        }

        return NextResponse.json({
            success: true,
            event_id: event.event_id,
            events_received: result.events_received,
        });
    } catch (error) {
        console.error('[Meta CAPI] Server error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
