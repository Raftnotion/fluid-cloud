# Script Injector Extension

Third-party scripts ko head, body, aur footer mein inject karne ke liye.

## Version: 1.1.0

## Features
- ✅ Global scripts (all pages)
- ✅ **Include pages** - sirf specific pages pe load
- ✅ **Exclude pages** - specific pages pe load na ho

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Config & types |
| `utils.ts` | `shouldLoadScript()` helper |
| `HeadScripts.tsx` | `<head>` mein scripts |
| `BodyScripts.tsx` | `<body>` start mein |
| `FooterScripts.tsx` | `</body>` ke pehle |

## Usage Examples

### Global Script (All Pages)
```ts
googleAnalytics: {
  enabled: true,
  id: 'G-XXXXXXX',
}
```

### Exclude Specific Pages
```ts
googleAnalytics: {
  enabled: true,
  id: 'G-XXXXXXX',
  excludePages: ['/checkout', '/checkout/success'],
}
```
→ Won't load on `/checkout`, `/checkout/success`, `/checkout/failed`

### Include Specific Pages Only
```ts
promoPopup: {
  enabled: true,
  includePages: ['/', '/pricing'],
}
```
→ Only loads on `/` and `/pricing`

## How to Use

```tsx
// HeadScripts.tsx
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { scriptConfig, shouldLoadScript } from './index';

export function HeadScripts() {
  const pathname = usePathname();

  return (
    <>
      {shouldLoadScript(scriptConfig.head.googleAnalytics, pathname) && (
        <Script src={`https://...`} />
      )}
    </>
  );
}
```
