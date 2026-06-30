# Project Architecture

Shipyard is currently a static, local-first PWA.

## Files

- `index.html`: complete prototype UI, styles, and client-side logic
- `manifest.json`: PWA metadata
- `sw.js`: service worker cache
- `README.md`: project overview
- `CURRENT_PHASE.md`: active phase and rules
- `ROADMAP.md`: future phases

## Data Model

Browser localStorage key: `shipyard.local.v1`

State shape:

```json
{
  "tasks": [],
  "memory": [],
  "events": []
}
```

## Guardrails

- No API keys in browser code.
- No remote execution in Phase 0.
- No merge/deploy automation without Gate approval.
- MGP remains visible in build/version information.
