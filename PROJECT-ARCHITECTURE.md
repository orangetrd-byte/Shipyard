# Project Architecture

Shipyard is currently a static, local-first PWA with a working GitHub intake path.

Current app build: MGP v1.14.

## Files

- `index.html`: complete prototype UI, styles, and client-side logic
- `manifest.json`: PWA metadata
- `sw.js`: service worker cache
- `README.md`: project overview
- `CURRENT_PHASE.md`: active phase and rules
- `ROADMAP.md`: future phases
- `shipyard-bridge.mjs`: local GitHub issue bridge
- `start-shipyard-bridge.ps1`: starts the local bridge
- `install-shipyard-bridge-startup.ps1`: optional bridge-at-login helper
- `telegram/`: parked future-update prototype work

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

Task cards may include:

```json
{
  "id": "uuid",
  "title": "string",
  "note": "string",
  "type": "feature|fix|experiment|junk",
  "priority": "must|should|meh",
  "status": "inlet|queued|working|gate",
  "source": "This device",
  "created": "timestamp",
  "updated": "timestamp",
  "diff": "string",
  "history": []
}
```

## Working Intake Path

```text
Phone/PWA -> Create Codi issue -> shipyard-bridge.mjs -> GitHub issue
Phone/PWA -> Refresh issues -> GitHub open issues -> Workshop Waiting
Phone/PWA -> Keep on board -> localStorage task only
```

Latest smoke test created GitHub issue `#25`; it was closed afterward as `not planned`.

## Parked Integrations

- Telegram/Hermes prototype files exist but are not the active build lane.
- Cloudflare bridge work is future always-online work, not required for the current core PWA loop.

## Guardrails

- No API keys in browser code.
- No remote execution in the current core board.
- No merge/deploy automation without Gate approval.
- MGP remains visible in build/version information.
