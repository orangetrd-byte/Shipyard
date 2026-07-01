# Shipyard - Controlled Build Room for Codex/Codi

**Tagline:** *Because talking is not building.*

Shipyard turns messy ideas into tracked build tasks, shows what Codex is doing,
manages approvals, saves workflows, keeps project memory, and works from phone
or desktop.

---

## Core Screens (phone + desktop)

**1. Inlet**
Where ideas land - paste code, voice note, screenshot, or typed intent.
Shipyard untangles it into structured task cards automatically.
No blank page. No "what do you mean?" from a chatbot.

**2. Floor**
Live build wall. Each Codex run shows:
- What it's touching
- Progress/status
- Live log tail
- Diff preview when it finishes

You watch the build happen in real time, not wait for an email.

**3. Gate**
Approval checkpoint. Every build stops here before merge/deploy:
- Side-by-side diff
- "Ship it / Tweak / Scrap" buttons
- Optional comment back to crew

No surprise 3 AM pushes.

**4. Hangar**
Saved workflows + project memory.
- Reusable task templates
- Decision log
- "Why we built it this way" notes
- Searchable by tag or date

This is the brain. Chat has no brain.

---

## User Flow (15 seconds)

```text
Messy idea -> Inlet -> auto-tangled into task
          -> Floor (Codex builds)
          -> Gate (you approve)
          -> Hangar (memory saved)
```

Loop back to Floor for changes or spawn a new task from Hangar.

---

## What makes it different from regular chat

| Chat | Shipyard |
|------|----------|
| Ephemeral messages | Persistent build state |
| You ask, assistant answers | You drop, crew builds |
| No approval gates | Mandatory Gate before ship |
| No workflow memory | Hangar remembers everything |
| One worker visible | Whole floor visible |
| Freeform, untamed | Structured, scannable |
| Good for questions | Good for shipping |

**Plain English:** Chat is a conversation. Shipyard is a construction site with a
foreman, a blueprint room, and a launch pad. You don't *talk* the ship into
existence - you drop the specs, watch it get built, approve the launch, and walk
away knowing it's in the Hangar next time you need it.

---

## Phase Plan - Throw Shit at the Wall Edition

### Phase 0: The Wall (Week 1)
**Goal:** Prove Codex can actually run as a managed build process.

- [ ] Hosted runner that spins up Codex on demand
- [ ] One shared task board (Trello/Notion/DB + UI)
- [ ] Codex posts status: `Started`, `Working`, `Done`, `Blocked`
- [ ] You approve or reject each task before merge

**Success metric:** You go to sleep and don't wake up to surprise commits on
your repo.

**If it sticks:** We build the rest.
**If it don't:** We're out maybe 4 hours of setup. No harm.

---

### Phase 1: Inlet (Week 2)
**Goal:** Capture messy ideas without a blank page.

- [ ] Quick-add form: title, rough notes, optional screenshot/paste
- [ ] Tag/label by type: `fix`, `feature`, `experiment`, `junk`
- [ ] Priority: `must`, `should`, `meh`
- [ ] One-tap from phone - works while you're walking to the machine

**Success metric:** You stop texting yourself ideas and just dump them in
Shipyard.

---

### Phase 2: Floor (Week 3)
**Goal:** See what Codex is doing *now*.

- [ ] Live terminal feed from the running Codex process
- [ ] File tree showing what it touched
- [ ] `Approve` / `Kill` / `Debug` buttons
- [ ] Status color: green (clean), yellow (stuck), red (fucked)

**Success metric:** You see a build drifting left while the crew is still right.

---

### Phase 3: Gate (Week 4)
**Goal:** Approvals that actually work.

- [ ] Diff preview before merge
- [ ] Comment thread on the diff
- [ ] `Ship It` / `Tweak` / `Scrap`
- [ ] Auto-merge only on explicit Ship It

**Success metric:** You stop waking up to "Pushed to main" texts from Codex at 3 AM.

---

### Phase 4: Hangar (Week 5-6)
**Goal:** Project memory that doesn't live in your head.

- [ ] Workflow: reusable task templates
- [ ] Decision log: why we built X this way
- [ ] Saved snippets, past diffs, reference links
- [ ] Search by keyword, tag, date

**Success metric:** Next time you ask "why did we do it that way?" - Shipyard answers in 10 seconds.

---

## Sticky Test (Ongoing)

Every phase gets:
1. **Build it in 1 session or less**
2. **Use it for 2 real tasks**
3. **Kill it if it doesn't save time**

No roadmap romance. If a phase feels like homework, it dies.

---

*Filed by Herman the worm under `Future Builds\herman-worm\`*
