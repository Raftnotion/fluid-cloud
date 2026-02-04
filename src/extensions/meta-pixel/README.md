# Meta Pixel Extension

Advanced Meta Ads Tracking with Pixel + Conversions API.

## Version: 1.0.0

## Features
| Feature | Status |
|---------|--------|
| Meta Pixel (Client) | ✅ |
| Conversions API (Server) | ✅ |
| Standard Events | ✅ |
| Advanced Matching | ✅ |
| UTM Integration | ✅ |
| useMetaEvent Hook | ✅ |

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Config & exports |
| `types.ts` | TypeScript interfaces |
| `utils.ts` | Hashing, cookies, helpers |
| `MetaPixel.tsx` | Pixel script component |
| `events.ts` | Event tracking functions |
| `capi.ts` | CAPI client helper |

## Environment Variables

```env
# Required
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
META_ACCESS_TOKEN=EAAxxxxxxxxxxxxxxx

# Optional (for testing)
META_TEST_EVENT_CODE=TEST12345
```

## Quick Start

### 1. Add MetaPixel to Layout

```tsx
// layout.tsx
import { MetaPixel } from '@/extensions/meta-pixel';

<body>
  <MetaPixel />
  {children}
</body>
```

### 2. Track Purchase (Success Page)

```tsx
import { trackPurchase } from '@/extensions/meta-pixel';

// On payment success
await trackPurchase(
  2697,                    // value
  'order_12345',           // order ID
  'customer@email.com',    // email (for matching)
  '+919876543210'          // phone (for matching)
);
```

### 3. Use Hook in Components

```tsx
import { useMetaEvent } from '@/extensions/meta-pixel';

function CheckoutPage() {
  const { trackInitiateCheckout } = useMetaEvent();
  
  useEffect(() => {
    trackInitiateCheckout(2697, ['plan_1'], 1);
  }, []);
}
```

## Standard Events

| Event | Function | When |
|-------|----------|------|
| PageView | `trackPageView()` | Auto on load |
| ViewContent | `trackViewContent(id, name)` | View product |
| InitiateCheckout | `trackInitiateCheckout(value)` | Start checkout |
| Purchase | `trackPurchase(value, orderId)` | Payment success |
| Lead | `trackLead(email)` | Form submit |

## Advanced Matching

Automatically includes:
- IP Address (from UTM Tracker)
- User Agent (from UTM Tracker)
- fbclid (from URL)
- _fbp (from cookie)
- Email/Phone (hashed with SHA256)

## Config

```ts
export const metaConfig = {
  enabled: true,
  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  accessToken: process.env.META_ACCESS_TOKEN,
  enableCAPI: true,
  enableAdvancedMatching: true,
  autoPageView: true,
  currency: 'INR',
  debug: false,
};
```
