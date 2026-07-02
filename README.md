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
| Hermes | Herman the worm / `@Professor_Hermbot` | Mobile front desk and coordinator |
| Codi | ChatGPT / Codex / `@CodiShipyardBot` | Build brain, coding worker, GitHub/Codex handoff |
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
| Static PWA | Working | `index.html`, `manifest.json`, `sw.js`, icons |
| Local board | Working | Browser `localStorage` key: `shipyard.local.v1` |
| GitHub bridge | Working | Cloudflare bridge and local bridge paths exist |
| Mobile install | Working | PWA shell and phone layout exist |
| Hermes Telegram | Prototype working | `/inlet`, `/floor`, `/hangar`, Promote to Gate |
| Codi Telegram | Not built yet | Token exists, runner still needs deliberate build |
| Approval model | Partially working | Gate concept exists; diff/merge approval is future |
| Runner visibility | Not built yet | Logs, touched files, diff preview are future |
| Always-online bots | Not built yet | Local polling works for test, but mobile-first needs webhook |

## Active Phase

Current phase from `CURRENT_PHASE.md`:

```text
Phase 1.11: Clear team labels
```

Current practical focus:

- Keep the app local-first and mobile-friendly.
- Keep MGP visible in version/build information.
- Keep Boss approval explicit before future merge/deploy automation.
- Stop relying on one open PowerShell window for mobile control.
- Split Hermes and Codi cleanly instead of sharing one generic bot token.

## Product Sections

### Inlet

Where rough ideas land.

Inputs may be typed notes, voice-note summaries, screenshots, pasted code, or quick mobile thoughts. The point is no blank page and no lost idea.

Current:

- Web form can create local cards.
- Send to Codi can hand off through the GitHub bridge.
- Hermes `/inlet <text>` creates a Telegram-tracked item.

Target:

- Hermes always online.
- Every mobile idea becomes a visible Shipyard card.
- Screenshots/attachments become task context.

### Floor

Where active work is visible.

Current:

- Board has lanes.
- GitHub issues can blend into Workshop Waiting.
- Hermes `/floor` lists active Telegram-tracked items.

Target:

- Show Codi/Codex status.
- Show touched files.
- Show live logs.
- Show whether work is clean, blocked, or ready for Gate.

### Gate

Approval checkpoint.

Current:

- Hermes can promote an Inlet item to Gate.
- Shipyard UI has You're OK approval area.

Target:

- Side-by-side diff.
- Boss buttons: Ship It / Tweak / Scrap.
- Auto-merge only after explicit Ship It.
- Comment back to Codi/Codex when tweak is requested.

### Hangar

Project memory.

Current:

- Local Saved Stuff exists.
- Telegram history JSON exists.

Target:

- Decision log.
- Reusable workflow templates.
- Saved diffs/snippets/reference links.
- Search by keyword, tag, date.

## Bot Split

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

### Step 1: Stabilize Hermes

Status: in progress

- [x] Separate Hermes token as `HERMES_TELEGRAM_TOKEN`
- [x] `/inlet` creates an item
- [x] `/floor` lists items
- [x] Promote to Gate works
- [ ] Clear old test JSON state safely
- [ ] Verify no 409 conflicts after token reset
- [ ] Decide whether local polling remains only a dev tool

### Step 2: Build Codi Bot Separately

Status: not started

- [ ] Add `telegram/codi-bot.js`
- [ ] Add `start-codi.ps1`
- [ ] Use only `CODI_TELEGRAM_TOKEN`
- [ ] Add `/status`
- [ ] Add `/issue`
- [ ] Route Codi tasks through GitHub/bridge without touching Hermes token

### Step 3: Make Mobile Always-On

Status: planned

- [ ] Move Hermes from local polling to Cloudflare webhook
- [ ] Store no secrets in browser
- [ ] Make phone Telegram usable when PC is asleep
- [ ] Keep local bridge as build/shop tool, not doorway

### Step 4: Visible Board Bridge

Status: planned

- [ ] Hermes `/inlet` items appear in Shipyard Inlet/Workshop
- [ ] Gate promotions appear in You're OK
- [ ] Hangar decisions sync into Saved Stuff
- [ ] Avoid duplicate cards between Telegram JSON, localStorage, and GitHub issues

### Step 5: Real Build Floor

Status: future

- [ ] Show Codex/Codi run status
- [ ] Show touched files
- [ ] Show live log tail
- [ ] Show diff preview
- [ ] Require Gate approval before merge/deploy

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
