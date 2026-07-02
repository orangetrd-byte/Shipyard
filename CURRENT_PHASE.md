# Current Phase

## Active Phase

Phase 1.14: Core intake and board lifecycle stable

## Current Focus

- Keep the first build static, mobile-friendly, and local-first.
- Keep the core board understandable before adding more integrations.
- Use clear Drop Idea actions:
  - `Create Codi issue` creates a real GitHub issue through the bridge/fallback.
  - `Keep on board` creates a browser-local Shipyard card only.
- Keep GitHub issue cards visually distinct from local cards.
- Preserve the board lifecycle: Dropped -> Waiting -> Being Built -> You're OK -> Saved Stuff.
- Save approved cards into Hangar/Saved Stuff with a short trail.
- Keep refreshed GitHub issues blended into Workshop Waiting without duplicate local placeholders.
- Keep Telegram and Cloudflare work parked for future updates unless deliberately pulled back in.
- Preserve explicit approval flow before any future merge/deploy automation.
- Keep MGP visible in version/build information.

## Next Actions

- Retest the hosted PWA after cache update and confirm it shows MGP v1.14.
- Close or label any future smoke-test GitHub issues immediately after testing.
- Decide the next core Shipyard need before reopening Telegram or Cloudflare work.
- Improve the real build Floor only after the intake/approval loop keeps feeling useful.

## Latest Smoke Test

- Bridge `/health`: PASS.
- `shipyard-bridge.mjs` syntax: PASS.
- `sw.js` syntax: PASS.
- `manifest.json` parse: PASS.
- `index.html` manifest/service-worker references: PASS.
- Live GitHub issue POST: PASS. Test issue `#25` was created, then closed as `not planned`.
- Ad-hoc verification script: PASS, `problems: []`.

## Permanent Version Rule

- Every version/build update must keep the letters MGP visible in the app's build or version information.
- MGP cannot be removed, hidden, renamed, or replaced during future updates.







