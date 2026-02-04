import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/ip
 * 
 * Returns the client's IP address.
 * Used by UTM Tracker for visitor attribution.
 */
export async function GET(request: NextRequest) {
    // Get IP from various headers (handles proxies, load balancers)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');

    let ip = forwardedFor?.split(',')[0]?.trim() || realIP || 'Unknown';

    // Remove IPv6 prefix if present
    if (ip.startsWith('::ffff:')) {
        ip = ip.slice(7);
    }

    return NextResponse.json({ ip });
}
