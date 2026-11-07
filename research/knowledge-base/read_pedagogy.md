# Existing teaching material and presentation assets: shanraisshan/claude-code-best-practice

Root path: `repos/claude-code-best-practice/` (written as `$R` below).

---

## 1. Learning arcs already in the repo

### 1a. Tutorial: Day 0 to Day 1
Sources: `$R/tutorial/day0/README.md`, `mac.md`, `windows.md`, `linux.md`, `$R/tutorial/day1/README.md`

**Day 0, "Claude Code Setup"**
- **Step 1: Install.** Each OS has its own guide:
  - macOS: Homebrew, then `brew install --cask claude-code`.
  - Windows: Node.js LTS `.msi`, then `npm install -g @anthropic-ai/claude-code`. If you get a permission error, run as Administrator.
  - Linux: needs Node v18 or higher. Three options:
    - Option A: fnm, marked "Recommended". Commands: `curl -fsSL https://fnm.vercel.app/install | bash`, then `fnm install 24`.
    - Option B: distro package manager (apt/dnf/pacman).
    - Option C: NodeSource `setup_lts.x`.
  - Linux also covers fixing npm permissions with a `~/.npm-global` prefix, and notes on WSL and PATH.
- **Step 2: Verify.** `node --version` (v18.x or higher) and `claude --version`.
- **Step 3: Login.** Screenshot at `tutorial/day0/assets/login.png`. Three methods:
  - Method 1: Subscription (Claude Pro / Max), via "Claude.ai account" in the browser.
  - Method 2a: API Key (Team Invite). Invite email, then the key is auto-generated.
  - Method 2b: API Key (You have the key). Paste a key that starts with `sk-ant-`. It is stored permanently.

**Day 1, "Your First Conversation with Claude Code"**: three levels, framed as "Think of it like hiring someone":
1. **Prompting** = "asking a stranger on the street for directions".
   - Analogy: texting a friend who knows a lot.
   - Demo prompt: `what is the weather in Karachi?`
   - The point: the method is unpredictable (training data, web search, or a guess).
2. **Agents** = "hiring a specialist who always does things a certain way".
   - Analogy: a restaurant kitchen with a **Pasta Chef**.
   - Repo example: `weather-agent`, which always uses the Open-Meteo API for Dubai (lat: 25.2, lon: 55.3).
   - A table compares Prompting and Agent on Source, Location, Format and Consistency.
   - Takeaway: agents give **predictability**. They are not smarter, they are **consistent**.
3. **Skills** = "that specialist having specific training for specific tasks".
   - Analogy: a new employee's training manual.
   - Second analogy: "**Shayan** has many skills" (Engineering, Gaming, Reading).
   - Repo example: the `weather-fetcher` skill.
   - Why keep them separate: one agent can have many skills, and one skill can serve many agents. Example: a `daily-report-agent` using `weather-fetcher`, `calendar-reader` and `email-summarizer`.
- **Wrap-up:**
  - An ASCII diagram of Levels 1–3.
  - A control table: Prompting controls "The question" (best for quick one-off questions). Agents add "who answers" (repeatable tasks). Skills add "how they do it" (critical workflows).
  - "What's Next": stay at Level 1 for now.

### 1b. The "Vibe Coding to Agentic Engineering" framework
Source: `$R/.claude/skills/presentation/vibe-to-agentic-framework/SKILL.md`

**Definitions**
- **Vibe Coding (Low level):** using Claude Code with no structure, so "every prompt is a coin flip". The codebase drifts toward entropy.
- **Agentic Engineering (High level):** a fully configured system made of:
  - CLAUDE.md (architecture)
  - Rules (scoped conventions)
  - Skills (on-demand expertise)
  - Agents (specialized workers)
  - Commands (multi-step workflows)
  - Hooks (lifecycle automation)
  - MCP Servers (external tools)
- The skill says the journey is "**incremental and cumulative**".

**The 4-level journey**

| Level | Color (journey bar) | Bar | Meaning |
|---|---|---|---|
| Low | `hsl(0, 70%, 45%)` red/orange | 25% | Vibe coding territory, no structure |
| Medium | `hsl(40, 70%, 45%)` yellow | 50% | Structured workflows, some automation |
| High | `hsl(80, 70%, 45%)` light green | 75% | Domain knowledge, skills, custom agents |
| Pro | `hsl(120, 70%, 45%)` deep green | 100% | Full agentic engineering, multi-agent teams |

The deck stops at **High**. Pro appears as a tick mark (the "theoretical ceiling") but the bar never fills to it.

**Part order and levels**

| Part | Topic | Level |
|---|---|---|
| Part 0 | Introduction | none |
| Part 1 | Prerequisites | none |
| Part 2 | Better Prompting: good vs bad prompts, `@files` context, context window & `/compact`, `/plan` | Low |
| Part 3 | Project Memory: CLAUDE.md & `/init`, what to include, Rules | Medium |
| Part 4 | Structured Workflows: task lists, model selection (Opus architecture / Sonnet implementation / Haiku quick) | Medium |
| Part 5 | Domain Knowledge: Skills, progressive disclosure, `frontend-conventions` skill, frontmatter, `context: fork` | High |
| Part 6 | Agentic Engineering: agents, frontend/backend engineer agents, Commands & orchestration (`/add-feature`), Hooks & MCP, "Command → Agent → Skills" | High |
| Appendix | Reference material | none |

Note that the "first session IS vibe coding", on purpose.

**Running example: the TodoApp monorepo**
- Stack: `backend/` FastAPI and `frontend/` Next.js.
- The skill shows a before tree and an after tree. The after tree adds `.claude/{agents,skills,commands,hooks,rules,settings.json,settings.local.json}`, a `CLAUDE.md` in each of backend and frontend, `.mcp.json`, and a root `CLAUDE.md`.
- Pain example: "add a notes feature".
  - Vibe result: a random `/api/notes` endpoint, no sidebar nav, no tests.
  - Agentic result: follows `routes/todos.py`, uses `Sidebar.tsx`, and writes tests in `test_todos.py` style.

**Editing rules the skill gives**
- Always show the before/after.
- Never reference a concept before its own section.
- Use the TodoApp.

### 1c. Other arcs
- **Canonical deck arc** (see §2.2): a problem-driven narrative built on one running problem, the "weather reporter". The problem is "Fetch weather of Karachi — Single source of truth — Repetitively". Arc: Model → Harness → Agents → CLAUDE.md → Skills → Context → Workflow. Source: `$R/reports/learning-journey-weather-reporter-redesign.md` is referenced by the claude-gemini agent; I did not read it.
- **Video 1 script** (`$R/!/video-presentation-transcript/1-video-workflow.md`, about 5 minutes):
  - INTRO: The Problem
  - PART 1: The Ad-Hoc Way. The same Dubai weather + SVG prompt is run twice and the cards look different.
  - PART 2: The Workflow Way, using `/weather-orchestrator`.
  - PART 3: How It Works: Command → Agent → Skill. Covers the agent skill (preloaded `weather-fetcher`) and the invoked skill (`weather-svg-creator`), with a flow diagram.
  - Per the framework skill, the matching `1-video-workflow.html` deck caps at Medium.
- **Repo-level summary**: `$R/CLAUDE.md`
  - Weather System is described as the **Command → Agent → Skill** example.
  - "Workflow Best Practices":
    - CLAUDE.md under 200 lines
    - manual `/compact` at ~50%
    - start with plan mode
    - feature-specific subagents with skills (progressive disclosure)
    - subtasks under 50% context
  - Lists the hook events ("33 events total").
  - Has a config hierarchy with 6 entries, starting from Managed.

---

## 2. The decks: slide sequences and explanatory devices

All three decks are single-file HTML with inline CSS/JS. Each `.slide[data-slide=N]` is shown or hidden on arrow keys, Space or swipe. Every deck has a 4px top `.progress` bar and a slide counter.

### 2.1 `presentation/vibe-coding-to-agentic-engineering/index.html`
- `<title>`: "Claude Code — From Vibe Coding to Agentic Engineering". 76 slides.
- Has a right-rail **journey bar**:
  - Ticks: Pro / High / Med / Low
  - JS `LEVELS` map with the HSL colors above
  - `.level-badge` injected by JS

**Slide sequence**
1. Title ("A journey through every best practice — with a real project")
2. The Example Project: TodoApp
3. What is Vibe Coding?
4. The Journey (6-part clickable TOC)
5–9. Prerequisites: Installing; Login Option A: Subscription; Login Option B: API Key; Your First Session; The Interface
10. **Part 2: Better Prompting** (low)
11–17. Your First Prompt; Good vs Bad Prompts; Providing Context; Context Window & /compact; /plan — Plan Before Code; Plan Mode in Practice; Prompting Best Practices
18. **Part 3: Project Memory** (medium)
19–24. CLAUDE.md & /init; What to Include in CLAUDE.md; **Keep It Under 150 Lines**; Rules (.claude/rules/); /memory & Memory Hierarchy; Memory Best Practices
25. **Part 4: Structured Workflows**
26–28. Task Lists; /model — Model Selection; Workflow Best Practices
29. **Part 5: Domain Knowledge** (high)
30–33. What Are Skills?; Creating Skills: TodoApp Frontend; Skill Frontmatter & Invocation; Skills Summary
34. **Part 6: Agentic Engineering** (high)
35–43. What Are Agents?; Frontend Engineer Agent; Backend Engineer Agent; Agent Frontmatter; Agent Tools & Skills; Subagents via Task Tool; Commands & Orchestration; Hooks & MCP Servers; Command → Agent → Skills (ASCII box diagram: `/add-feature` → backend-engineer / frontend-engineer → backend-patterns / frontend-conventions)
44. 🎉 High — Agentic Engineering (celebration)
45–46. Agent Memory; Agents Summary
47. **Appendix: Reference**
48–76. How Claude Uses Tools; File Operations; Bash Commands & Search; /help; /model — Effort Level; /fast; /context & /cost; /clear & /rewind; /resume; /doctor; /config; /permissions; /sandbox; Commands Cheat Sheet; The Commit Workflow; The PR Workflow; Setting a Default Agent; settings.json Overview; Spinner Verbs; Status Line; Output Styles; Keybindings; Terminal Setup & Vim Mode; Customization Summary; Debugging Tips; **The Golden Rules**; Resources; Your Next Steps; Thank You!

**The Golden Rules (slide 73)**
1. Always start with plan mode
2. Keep CLAUDE.md under 150 lines
3. Manual /compact at ~50%
4. Commit after each subtask
5. One task at a time
6. Be specific about files

**Devices used in this deck**
- Bad/good `.two-col` cards: "Vibe Coding" vs "Professional" prompts.
- `.trigger-box` for key concepts.
- Hierarchy line: "CLAUDE.md (always loaded, <150 lines) → Rules (path-scoped) → Skills (on-demand)".
- ASCII architecture diagram.
- TodoApp code trees.

> **Conflict to flag:** this deck and the framework skill say **150 lines** for CLAUDE.md. The canonical deck and `$R/CLAUDE.md` say **200 lines**.

### 2.2 `presentation/claude-code-best-practice/index.html` (canonical, event-agnostic)
- `<title>`: "Claude Code Best Practice". **56 slides** in the current parse. The agent's learnings last recorded 55.
- **No journey bar.** It uses `LEVEL_LABELS` badges only: `agents`, `skills`, `context`, `claude-md`, `commands` (unused), `workflow`.
- Source for structure: `$R/.claude/agents/presentation-claude-code.md`

**Slide sequence**
- **1–3.** Title: "Practical patterns for Claude Code". Speaker intro (Shayan Rais). GitHub stars image.
- **4. 🚨 Problem Statement:** "Fetch weather of Karachi / Single source of truth / Repetitively".
- **5. Jargon sticker wall + glossary.** Terms: agentic engineering, progressive disclosure, orchestration, dumb zone, agentic workflows, harness, compaction, context window, ralph wiggum loop, MCP, hooks, context rot, prompt engineering, AI slop, inference, hallucination, context bloat, one-shot prompting, token burn, vibe coding. Each has a one-line plain-English definition.
- **6.** "Difference between GPT and ChatGPT?" (discuss)
- **7.** Boris Cherny GIF: "There is no single 'correct' way."
- **8. What is Claude Code?** = **Model (Brain 🧠) + Harness (Body 💪)**
- **9.** Horse teaser: "A horse. A model. The model is the horse. Raw power, no direction."
- **10–13. LLM mechanics, as animated SVGs:**
  - 10: autoregressive generation (`llm-basic.svg`)
  - 11: `tokens.jpg`
  - 12: BPE tokenization (`llm-advanced.svg`, "same color = same word")
  - 13: integer token IDs (`llm-animation-tokenids.svg`, "the comma is always ID 11")
- **14. 💬 Models are stateless.** Chat-bubble diagram: "My name is Shayan" → "What is my name?" → "I don't know".
- **15. 🦜 "Stochastic Parrots".** "The sky is ___": blue 62% / clear 14% / dark 8% / falling 0.3%. Cites Bender et al. 2021.
- **16. 🌡️ temperature = 0 isn't deterministic.** Qwen3-235B: 80 unique completions out of 1,000 → 1 with the fix (batch-invariant kernels). Cites Thinking Machines 2025.
- **17–18. Models and their limits.**
  - 17: what models can and can't answer, and the knowledge cut-off.
  - 18: "no internet, no files, no clock".
- **19. Horse-harness analogy.** Each part of a real harness maps to one part of the model's harness:

  | Horse harness | Model harness | Role |
  |---|---|---|
  | Reins | Control loop | decides the next call |
  | Bit | Tool allowlist | constrains what it can do |
  | Blinders | Context management | narrows what it sees |
  | Driver | Evaluator | decides when done |
  | Traces | State persistence | carries work forward |

  Etymology footnote: Old French *harneis*.
- **20. ⚡ Tool Calling.** `tool-calling.png`. Defines "Turn × 1 · Inference × 2".
- **21–22. 💪 "Harness — the body around the brain"**, a 10-card taxonomy:
  - 🧑‍💼 Agents: the specialists
  - 🎯 Skills: the know-how
  - 📘 Workflows: the instruction manual ("like an AC install guide")
  - 📝 CLAUDE.md: your memory
  - 💭 Context: the working memory
  - ✋ Tools: the hands
  - 🔌 MCP: the adapters ("USB-C for AI")
  - 🛡️ Permissions: the guardrails
  - 🪝 Hooks: the reflexes
  - 📝 System Prompt
- **23.** "🎉 Yayyyyy! Problem solved with harness"
- **24–27. The twist.**
  - 24: "Really?"
  - 25: Non-determinism — doesn't always use its tools
  - 26: Tools can fail (403, then fallback)
  - 27: Problem Statement with ❌ on both goals
- **28–30. Vibe coding framing.**
  - 28: Vibe Coding, Andrej Karpathy (X, Feb 3, 2025)
  - 29: Uncle Bob ("novices using power tools lose fingers")
  - 30: Vibe Coding vs Agentic Engineering (TodoApp before/after trees)
- **31–39. 👤 Agents.**
  - `/agents`
  - Demo video (`agent-creation.mov`)
  - "Problem solved with agents"
  - "Not so fast..."
  - Problem Statement: ✅ single source of truth, ❌ repetitively
  - Agent frontmatter table. Column "Enforced by": harness vs prompt.
  - Two Tips & Tricks screenshots
- **40–44. 📝 CLAUDE.md.** `/init`, the real file, tips, "keep it under 200 lines".
- **45–48. 🎯 Skills.** Create your first skill (by prompting, or with Anthropic's `skill-creator`), a real one, frontmatter table.
- **49–52. 💭 Context.**
  - 50: 🧠 Claude's Brain. About 1M tokens ≈ 750,000 words, and it empties each chat.
  - 51: What Loads at Session Start. Full CLAUDE.md, plus *descriptions only* for skills and agents. This is "progressive disclosure".
  - 52: 📄 Lost in the Middle (Liu et al., arXiv:2307.03172). "The middle is the dumb zone."
- **53–55. 📘 Workflow.** `.claude/commands/`, the orchestration diagram, and "Workflow in action" GIF.
- **56.** 🙏 Thank you!

**Signature devices**
- One running problem with ✅/❌ status that updates after each section.
- A persistent **`.pillar-footer`** strip of 5 mini-cards on 25 slides: Agents / CLAUDE.md / Skills / Context / Workflows, with an `.inactive` variant. It acts as a "you are here" map.
- `.analogy-box`. The agent file says analogies are this deck's "signature voice": weather reporter, "Claude's brain", "pocket rulebook". Its rule is "analogy first, then the term".
- Folder-tree snippets for each concept.
- Frontmatter tables with "Enforced by: harness / prompt".

### 2.3 `presentation/2026-04-25-gdg-kolachi-cli-claude-code-gemini/index.html`
- `<title>`: "Claude Code & Gemini CLI". 52 slides.
- Same arc as 2.2. It is the source the canonical deck was forked from on 2026-04-30.
- Differences:
  - The title is "Agentic Engineering in the CLI", with both the Claude and Gemini mascots.
  - It has a co-presenter slide (Syed Umaid Ahmed).
  - It has no Uncle Bob, LLM-SVG, stateless or temperature slides.
  - Its tail adds ⚖️ Comparison: File structure; Model & context window; Gemini Orchestration Workflow (`gemini-orchestration-workflow.svg`).
- **Stale doc:** `$R/.claude/agents/presentation-claude-gemini.md` still describes a 6-level journey bar. The HTML now uses only `LEVEL_LABELS` badges.

---

## 3. Styling conventions and visual identity

### 3.1 Presentation styling
Sources: `$R/.claude/skills/presentation/presentation-styling/SKILL.md`, presentation-structure SKILL.md, and the deck CSS.

**Base type and layout**
- Fonts: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` for text. Code uses `'SF Mono', Monaco, 'Courier New', monospace`. No web fonts.
- Page: white background, text `#1a1a1a`, line-height 1.6.
- `.slide`: padding 60px 80px, max-width 1200px.
- Headings:
  - h1: 2.5rem/600 with a 2px `#e5e5e5` bottom rule
  - title h1: 3.5rem/700
  - section h1: 3rem/700
  - `.section-number`: uppercase, letter-spacing 3px, `#999`
- Monochrome UI chrome: black progress bar, round 50px nav buttons with a 2px black border.

**Semantic callout boxes** (all use a 4px left border; h4 labels are uppercase, 0.9rem, letter-spacing 1px)

| Class | Background | Border | Use |
|---|---|---|---|
| `.trigger-box` | `#f8f9fa` | `#1a1a1a` | key concept |
| `.analogy-box` | `#f3e5f5` | `#9c27b0` | analogy |
| `.how-to-trigger` | `#e8f5e9` | `#4caf50` | Try This |
| `.warning-box` | `#fff3e0` | `#ff9800` | gotcha |
| `.info-box` | `#e3f2fd` | `#2196f3` | info |

**Other components**
- `.col-card.good` uses a `#4caf50` border; `.col-card.bad` uses `#f44336`. Used in `.two-col` with a 24px gap.
- `.code-block`: `#1a1a1a` background, `#e5e5e5` text, 8px radius. Token spans:
  - `.comment` `#6a9955`
  - `.key` `#9cdcfe`
  - `.string` `#ce9178`
  - `.cmd` `#dcdcaa`
  - `.claude-file` `#ff5252`
- `.level-badge`: green pill (`#e8f5e9` / `#2e7d32`), injected by JS and never hardcoded.
- Also: `.use-cases` / `.use-case-item` (emoji plus text), `.hiring-steps .level-N`, `.field-row`, `.matcher-tag`, `.pillar-mini-card`.
- Dominant accents (by count in the canonical deck): `#2e7d32`, `#c62828`, `#3f51b5`, `#ef6c00`, `#9c27b0`, `#009688`, `#1565c0`, and `#C0392B` for count annotations.

**Rules**
- Renumber `data-slide` sequentially.
- Keep `goToSlide()` TOC links in sync.
- `totalSlides` is computed from the DOM.
- Stale references to check:
  - The structure skill still names `presentation/index.html` and `.weight-badge`/`data-weight`. These are legacy.
  - The rules file (`$R/.claude/rules/presentation.md`) says presentation edits must go through the per-deck agents.

### 3.2 Mascots and badges (`$R/!/`)

**Mascots**: animated pixel-block SVGs with CSS `@keyframes` inside
- `claude-jumping.svg`: Claude Orange `#E07C4C` block body with black eyes. Jump (0.5s loop), arm wave, ear bounce, shadow scale. Used as the favicon, the fixed top-left `.header-logo` (100×65), and on title slides.
- `claude-speaking.svg`: bob, talk (mouth open/close), ear tilt, sound waves, floating music notes.
- `codex-jumping.svg` / `codex-speaking.svg`: purple (`#A78BFA`/`#8B5CF6`/`#4C1D95`) character with a "purple-to-cyan body gradient".
- `gemini-jumping.svg` / `gemini-speaking.svg`: blue/red Google palette (`#8AB8FF`, `#4285F4`, `#EA4335`, `#F08070`).

**Tags** (`$R/!/tags/`): pill badges used 156 times in `README.md`
- Lettermarks: `a.svg`, `c.svg`, `s.svg` are black rounded squares with a white A, C or S, meaning Agents, Commands, Skills.
- Status badges:
  - best-practice (red `#e3342f`)
  - implemented / how-to-use / how-to-implement / official (green `#2ea44f`, `-hd` variants)
  - orchestration-workflow (blue `#3b82f6`)
  - video (`#e74c3c`)
  - beta (`#f6b93b`)
- People/source tags, Claude terracotta `#CC7C5E`: claude, boris-cherny, cat-wu, thariq, lydia.
- Community tags, yellow `#f1c40f`: community, community-karpathy/-dex/-matt/-davila7/-shayan.
- Promo banners: anthropic-academy, claude-certified-architect, claude-community-ambassador, claude-for-oss, developed-by, whatsapp-claude-pakistan (`#25D366`), sponsor-heart (`#db61a2`), polar, billion-dollar-questions, click-badges.

**Other folders**
- `$R/!/root/`: boris-slider.gif (+ .psd), github-trending(.png / -day.svg), supported-claudekit / -disrupt / -label.svg.
- `$R/!/thumbnail/`: 50k-stars.html and daily-workflows.html (both use the **'Press Start 2P'** pixel font from Google Fonts), plus presentation-1.png, video-1/2.png, video.psd.

### 3.3 `presentation/assets/`

| Folder | Files | Notes |
|---|---|---|
| `llm/` | `llm-basic.svg` | SMIL `<animate>` opacity sequence, 18s loop. "What is the capital of Japan" → "Tokyo", with a feedback loop. Panels: INPUT / LLM black box / OUTPUT. |
| | `llm-advanced.svg` | Colored BPE subwords: "Does Chat|GPT … Anth|ropic … Ll|ama … Mist|ral … Gem|ini". |
| | `llm-animation-tokenids.svg` | Integer IDs, e.g. 28133, 17554, 11. |
| | `tokens.jpg` | |
| `concepts/` | vibe-coding.jpg, vibe-coding-uncle-bob.png | |
| | agents/: agent-created.png, agent-creation.mov, agent-tips-1/2.png | |
| | claudemd/: claudemd.png, -tips.png, -problem.png | |
| | context/: context-window.jpeg, context.jpg, lost-in-the-middle.png | |
| | skills/: skill-created.jpg | |
| | workflow/: gemini-orchestration-workflow.svg | Static. |
| `harness/` | model-limitation.jpg, tool-calling.png, harness-limitation-1/2/3.jpg | Terminal screenshots. |
| `hallucination/` | hallucinations-opus-strawperry.jpg, hallucinations-opus-year.jpg | Not referenced by the canonical deck. |
| `introduction/` | Shayan/ and Umaid/ | Portraits, uni/company logos, github-stars, trending. |
| `logo/` | gemini.svg, github.svg | |

- The Claude orchestration visuals live outside this folder, in `$R/orchestration-workflow/` (`orchestration-workflow.svg`, `.gif`, `weather.svg`).
- **Missing:** `presentation/assets/concepts/thank-you.jpg` is referenced by two decks but is not in the download.

---

## 4. What to reuse for a GSAP scrollytelling site

### Reusable: narrative and content
- **The spine.** Combine the canonical problem-driven arc (weather reporter, ✅/❌ problem status) with the 4-level Low→Medium→High(→Pro) framework. The level map becomes a scroll progress or journey rail.
- **Analogies, ready to animate:**
  - Brain + Body
  - The horse-harness mapping (5 labeled parts, ideal for a pinned SVG reveal)
  - Stranger → Specialist → Training (Day 1)
  - Pasta Chef
  - Claude's Brain / dumb zone
  - USB-C for MCP
  - Hooks as reflexes
  - Workflow as an AC install guide
- **Diagrams to rebuild as scroll-scrubbed timelines:**
  - Autoregressive loop, BPE coloring and token IDs. The existing SMIL SVGs show the step order and data, for example "comma = ID 11".
  - Stateless chat bubbles
  - Stochastic probability bars (62/14/8/0.3%)
  - Lost-in-the-middle U-curve
  - Session-start loading (progressive disclosure)
  - Command → Agent → Skill flow
  - TodoApp tree before/after morph
- **Text content:**
  - The jargon glossary (20 terms with one-liners)
  - Frontmatter tables with "Enforced by harness/prompt"
  - Golden Rules
  - Appendix command list (vibe deck 48–75) as a reference section
- **Persistent device:** the 5-card `.pillar-footer`, which becomes a sticky "you are here" HUD.
- **Visual identity:**
  - Callout box semantics (analogy = purple, try = green, warning = orange, info = blue, concept = grey)
  - VS Code-like code token colors
  - The level hue ramp HSL 0→120
  - The animated `claude-jumping`/`claude-speaking` mascots as guide characters. They are already CSS-keyframe SVGs, easy to drive or replace with GSAP.
  - Lettermark tags A/C/S

### Talk-specific (drop or adapt)
- Speaker and co-presenter bios, GitHub-stars and trending slides, the Boris GIF framing.
- "Discuss" prompts ("GPT vs ChatGPT?", "Really?"). These could become interactive questions instead.
- The GDG/Gemini comparison section and the Codex/Gemini mascots, unless you want a multi-CLI comparison.
- Install/login slides. Fold the Day 0 content into a compact setup section.
- Terminal screenshots (`harness/*.jpg`, `agent-tips-*.png`, `claudemd-*.png`) and the `.mov` demo. These are tied to a specific UI version, so recreate them as HTML terminal mockups.
- Slide mechanics (`goToSlide`, `data-slide` renumbering, keyboard nav).

### Consistency issues to settle before writing content
- **CLAUDE.md line limit:** 150 (vibe deck, framework skill) vs 200 (canonical deck, repo `CLAUDE.md`).
- **Context sizes:**
  - "about 1 million tokens" (slide 50)
  - "20% of 1M tokens" (slide 21)
  - the canonical deck says compact at ~50%
  - the repo `CLAUDE.md` says ~50% context and subtasks under 50%
- **Model and version claims** (Opus 4.7 cut-off on slide 17) may be out of date.

### Licensing
- `$R/LICENSE` is **MIT License, "Copyright (c) 2025-2026 Shayan Rais"**. Reuse is allowed if the copyright and permission notice are kept.
- **Caveats (my judgment, not legal advice):**
  - The MIT grant probably does not cover third-party material embedded in the assets:
    - Karpathy and Uncle Bob screenshots
    - Boris Cherny tweets/GIF
    - the Lost in the Middle figure (Liu et al.)
    - the Thinking Machines data
    - Anthropic/Google/GitHub logos and the Gemini/Codex likenesses
    - university/company logos and personal portraits
  - Cite these or recreate them.
  - The Claude-orange mascot looks like Anthropic's Claude Code pixel mascot, so trademark status is uncertain.
  - Anthropic-branded promo tags (Academy, Certified Architect, etc.) should not be repurposed as branding.