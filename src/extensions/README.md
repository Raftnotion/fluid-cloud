# 🔌 WPFYE Extensions

A modular extension system for the WPFYE platform.

## Structure

```
extensions/
├── index.ts              # Main registry & exports
├── README.md             # This file
└── script-injector/      # Extension: Third-party scripts
    ├── index.ts          # Config & exports
    ├── HeadScripts.tsx   # <head> scripts
    ├── BodyScripts.tsx   # <body> start scripts
    ├── FooterScripts.tsx # Footer scripts
    └── README.md         # Extension docs
```

## How It Works

Har extension apne folder mein self-contained hai:

```
extensions/
├── script-injector/      ← Extension 1 (current)
├── google-analytics/     ← Extension 2 (future)
└── crisp-chat/           ← Extension 3 (future)
```

## Adding a New Extension

1. Create extension folder: `extensions/my-extension/`
2. Add `index.ts` with exports
3. Add to `extensions/index.ts` registry
4. Import in `layout.tsx` if needed

## Current Extensions

| Extension | Folder | Purpose |
|-----------|--------|---------|
| Script Injector | `script-injector/` | Third-party scripts injection |
