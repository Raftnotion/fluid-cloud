# UTM Tracker Extension

Advanced UTM & Attribution Tracking with Device Info.

## Version: 1.1.0

## Features
| Feature | Status |
|---------|--------|
| 5 UTM params | ✅ |
| Referrer & Landing Page | ✅ |
| First/Last touch | ✅ |
| 30-day expiration | ✅ |
| Custom params | ✅ |
| **User Agent** | ✅ |
| **Device Type** | ✅ |
| **Browser/OS** | ✅ |
| **Platform** | ✅ |
| **Screen Resolution** | ✅ |
| **Timezone** | ✅ |
| **IP Address** | ✅ (via API) |

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Config & exports |
| `types.ts` | TypeScript interfaces |
| `utils.ts` | Capture/store functions |
| `device.ts` | Browser/OS detection |
| `useUTM.ts` | React hook |
| `UTMTracker.tsx` | Auto-capture component |

## Device Info Captured

```ts
{
  userAgent: "Mozilla/5.0...",
  browser: "Chrome",
  browserVersion: "120.0",
  os: "macOS",
  osVersion: "14.0",
  deviceType: "desktop",  // 'desktop' | 'mobile' | 'tablet'
  platform: "MacIntel",
  screenResolution: "1920x1080",
  language: "en-US",
  timezone: "Asia/Kolkata",
  ip: "192.168.1.1"  // from /api/ip
}
```

## Usage

```tsx
import { useUTM, getUTMForAPI } from '@/extensions';

// Get all data
const utm = useUTM();
console.log(utm?.device?.browser);  // "Chrome"
console.log(utm?.device?.deviceType);  // "desktop"

// For API/checkout
const data = getUTMForAPI();
```

## Config

```ts
export const utmConfig = {
  enabled: true,
  trackReferrer: true,
  trackLandingPage: true,
  trackDevice: true,  // ✨ NEW
  expirationDays: 30,
  attributionModel: 'first',
  customParams: ['ref', 'via', 'partner'],
  debug: false,
};
```
