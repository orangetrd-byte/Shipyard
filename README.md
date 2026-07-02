# Shipyard

**Controlled build room for Codi/Codex work.**  
**Tagline:** Because talking is not building.

Shipyard turns messy ideas into tracked build tasks, shows what the crew is doing, requires Boss approval before shipping, saves decisions, and works from phone or desktop.

## North Star

The Boss should be able to run the build crew from anywhere:

```text
Drop messy idea
Hermes catches it
Shipyard tracks it
Codi/Codex builds it
Gate asks Boss for approval
Hangar remembers why
```

Shipyard is not supposed to be another chat thread. It is a small construction site with a front desk, floor, approval gate, and memory.

## Team

| Role | Name | Job |
|---|---|---|
| Boss | User | Final authority, priorities, approvals, taste, ship/kill decisions |
| Hermes | Herman the worm /  | Mobile front desk and coordinator |
| Codi/ `` | Build brain, coding worker, GitHub handoff |
| Shipyard | This app | Control room: Inlet, Floor, Gate, Hangar |
| GitHub | Repo/issues/commits | Ledger and source of truth for code history |
| Cloudflare | Worker/bridge | Always-online doorway for mobile workflows |

Core rule:

```text
Boss decides.
Hermes coordinates.
Codi builds.
Shipyard tracks.
GitHub records.
```

## Current Status

| Area | Status | Notes |
|---|---|---|
| Static PWA | Working | MGP v1.14; `index.html`, `manifest.json`, `sw.js`, icons |
| Local board | Working | Browser `localStorage` key: `shipyard.local.v1`; card lifecycle and trails work |
| GitHub intake | Working | `Create Codi issue` created real issue `#25` during smoke test |
| Local bridge | Working | `/health` passed with repo `orangetrd-byte/Shipyard` |
| Mobile install | Working | PWA shell and phone layout exist |
| Hermes Telegram | Parked prototype | Future-update lane; not part of current core build |
| Codi Telegram | Parked | Do not build further until Telegram lane is active again |
| Cloudflare bridge | Parked | Future always-online doorway; local/core board comes first |
| Approval model | Working locally | Cards stop in You're OK; Saved Stuff only after Looks Good |
| Runner visibility | Not built yet | Logs, touched files, diff preview are future |
| Test issue cleanup | Done | Test issue `#25` closed as `not planned` |

## Active Phase

Current phase from `CURRENT_PHASE.md`:

```text
Phase 1.14: Core intake and board lifecycle stable
```

Current practical focus:

- Keep the app local-first and mobile-friendly.
- Keep MGP visible in version/build information.
- Keep Boss approval explicit before future merge/deploy automation.
- Keep `Create Codi issue` and `Keep on board` impossible to confuse.
- Keep Telegram and Cloudflare parked until they are deliberately active again.
- Improve the core Shipyard board before adding more doorways.

## Product Sections

### Inlet

Where rough ideas land.

Inputs may be typed notes, voice-note summaries, screenshots, pasted code, or quick mobile thoughts. The point is no blank page and no lost idea.

Current:

- `Keep on board` creates a local card on this device.
- `Create Codi issue` creates a real GitHub issue through the bridge or fallback.
- GitHub issue bodies now use real line breaks.
- Smoke test issue `#25` proved the intake path and was closed.

Target:

- Every mobile idea becomes a visible Shipyard card.
- Screenshots/attachments become task context.
- Future always-online inlet can use Telegram/Cloudflare when that lane is reopened.

### Floor

Where active work is visible.

Current:

- Board has lanes.
- GitHub issues can blend into Workshop Waiting.
- Local cards show `Source: This device`.
- Refreshed GitHub cards show as GitHub issues.
- Local cards can move Waiting -> Being Built -> You're OK.

Target:

- Show Codi/Codex status.
- Show touched files.
- Show live logs.
- Show whether work is clean, blocked, or ready for Gate.

### Gate

Approval checkpoint.

Current:

- Shipyard UI has You're OK approval area.
- Local cards stop for Boss approval.
- `Looks Good` saves to Hangar/Saved Stuff.
- `Needs Changes` sends work back to Waiting.
- `Toss It` removes the card and logs the decision.

Target:

- Side-by-side diff.
- Boss buttons: Ship It / Tweak / Scrap.
- Auto-merge only after explicit Ship It.
- Comment back to Codi/Codex when tweak is requested.

### Hangar

Project memory.

Current:

- Local Saved Stuff exists.
- Approved local cards save a short decision trail.
- Telegram history JSON exists but is parked future work.

Target:

- Decision log.
- Reusable workflow templates.
- Saved diffs/snippets/reference links.
- Search by keyword, tag, date.

## Parked Bot Split

Telegram is parked as future-update work. Keep this section for context, but do not treat it as the active build lane.

Use two separate bots and two separate tokens.

| Bot | Telegram | Env Var | Purpose |
|---|---|---|---|
| Hermes | `@Professor_Hermbot` | `HERMES_TELEGRAM_TOKEN` | Mobile front desk, coordination, Inlet/Floor/Gate/Hangar |
| Codi | `@CodiShipyardBot` | `CODI_TELEGRAM_TOKEN` | Build handoff, GitHub issue creation, Codex dispatch |

Do not use the old generic token name anymore:

```powershell
[Environment]::SetEnvironmentVariable("TELEGRAM_BOT_TOKEN",$null,"User")
```

Do not paste real tokens into chat or repo files.

## Local Commands

Start Hermes local polling prototype:

```powershell
cd C:\Users\Dad\Documents\GitHub\Shipyard
.\start-hermes.ps1
```

Start the local Codi/GitHub bridge:

```powershell
cd C:\Users\Dad\Documents\GitHub\Shipyard
.\start-shipyard-bridge.ps1
```

Install local Codi bridge at login:

```powershell
cd C:\Users\Dad\Documents\GitHub\Shipyard
.\install-shipyard-bridge-startup.ps1
```

## Telegram Commands

Hermes prototype commands:

```text
/inlet <text>   Create a rough item
/floor          List active items
/hangar [query] Search or list archived items
```

Current button:

```text
Promote to Gate
```

Codi commands are not built yet. Proposed:

```text
/issue <text>   Create tracked GitHub/Codex task
/status         Check bridge/build status
/help           List commands
```

## Architecture

Current repo shape:

```text
Shipyard/
  index.html
  manifest.json
  sw.js
  icons/
  shipyard-bridge.mjs
  start-shipyard-bridge.ps1
  install-shipyard-bridge-startup.ps1
  start-hermes.ps1
  telegram/
    bot.js
    state.js
    bridge.js
    commands/
      inlet.js
      floor.js
      gate.js
      hangar.js
```

Browser state:

```json
{
  "tasks": [],
  "memory": [],
  "events": []
}
```

Browser storage key:

```text
shipyard.local.v1
```

Telegram state files:

```text
telegram/telegram_inbox.json
telegram/telegram_approvals.json
telegram/telegram_history.json
```

## Guardrails

- Boss approval is required before future merge/deploy automation.
- No API keys or bot tokens in browser code.
- No secrets committed to repo.
- Keep local-first behavior working.
- Keep `shipyard.local.v1` compatible unless a migration is deliberate.
- Keep MGP visible in build/version information.
- Do not collapse Hermes and Codi into one token or one job.
- Do not make mobile use depend permanently on PowerShell polling.

## Plan Of Action

### Step 1: Stabilize Core Intake

Status: done

- [x] Phone/PWA can create a real GitHub issue.
- [x] Bridge `/health` passes.
- [x] `manifest.json`, `sw.js`, and `index.html` smoke checks pass.
- [x] GitHub issue body formatting uses real line breaks.
- [x] Test issue `#25` was closed after verification.

### Step 2: Stabilize Board Lifecycle

Status: in progress

- [x] Rename Drop Idea actions to `Create Codi issue` and `Keep on board`.
- [x] Show source on local cards.
- [x] Keep GitHub issue cards visually separate.
- [x] Move local cards through Waiting, Being Built, You're OK, and Saved Stuff.
- [x] Save approved cards with a short trail.
- [ ] Decide whether old/local test cards should have an archive/cleanup path.
- [ ] Decide whether GitHub issue cards need board actions or should stay read-only links.

### Step 3: Real Build Floor

Status: future

- [ ] Show Codex/Codi run status.
- [ ] Show touched files.
- [ ] Show live log tail.
- [ ] Show diff preview.
- [ ] Require Gate approval before merge/deploy.

### Step 4: Reopen Telegram/Cloudflare

Status: parked

- [ ] Hermes `/inlet` items appear in Shipyard Inlet/Workshop
- [ ] Gate promotions appear in You're OK
- [ ] Hangar decisions sync into Saved Stuff
- [ ] Avoid duplicate cards between Telegram JSON, localStorage, and GitHub issues

## Open Questions

- Should `@Professor_Hermbot` keep the visible name Herman, Hermes, or Herman/Hermes?
- Should Codi create GitHub issues directly or queue them for Boss approval first?
- Should Hangar live in localStorage, repo docs, GitHub issues, or all three?
- What is the first real task that proves this saves time instead of creating homework?

## Sticky Test

Every phase must pass this:

1. Build it in one session or less.
2. Use it for two real tasks.
3. Kill it if it does not save time.

No roadmap romance. If it feels like homework, it dies.
