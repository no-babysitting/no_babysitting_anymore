# Tips and Tricks from claude-code-best-practice: research notes

Sources: `README.md` lines 201–394 and `tips/*.md`. All paths below are relative to `repos/claude-code-best-practice/`.

**Who said each tip** (taken from the README tag images):
- **B** = Boris Cherny (`boris-cherny`)
- **T** = Thariq (`thariq`, @trq212)
- **D** = Dex (`community-dex`, dexhorthy / humanlayer)
- **M** = Matt (`community-matt`, Matt Pocock video)
- **C** = Cat Wu (`cat-wu`)
- **L** = Lydia (`lydia`, @lydiahallie)
- **Doc** = official Claude docs (`claude` tag)
- **Dv** = davila7 (@dani_avila7)
- **S** = Shayan (`community-shayan`, no link)

**[NB]** marks a tip with the README's "🚫👶 = do not babysit" flag.

---

## 1. All tips by category (`README.md` L201–364)

**Count check:** the heading says **"(83)"**, but there are **82** tip rows. The category headers also add up to 82: 3+7+5+6+8+4+3+9+5+5+9+5+6+5+2. The README's claim is off by one. **13** tips carry [NB]. The 14th "🚫👶" in the file is the legend on L203.

### Prompting (3), all [NB]
- PR1 [NB] B — Challenge Claude: "grill me on these changes and don't make a PR until I pass your test" / "prove to me this works", with a diff of main vs branch.
- PR2 [NB] B — After a mediocre fix: "knowing everything you know now, scrap this and implement the elegant solution".
- PR3 [NB] B — Claude fixes most bugs alone. Paste the bug, say "fix", and don't micromanage how.

### Planning/Specs (7), 1 [NB]
- PS1 B — Always start in plan mode.
- PS2 T — Start from a minimal spec and have Claude interview you with the AskUserQuestion tool. Then run the spec in a **new session**.
- PS3 D — Make a phase-wise gated plan. Each phase gets several kinds of tests (unit, automation, integration).
- PS4 [NB] M — Break PRDs into vertical slices ("tracer bullets") that cross DB + service + UI. AI defaults to horizontal phasing, which delays end-to-end feedback. The idea comes from *The Pragmatic Programmer*.
- PS5 B — Have a second Claude review your plan as a staff engineer, or use the cross-model workflow.
- PS6 B — Write detailed specs and cut ambiguity. The more specific you are, the better the output.
- PS7 B — Prototype > PRD: build 20–30 versions, because building is cheap.

### Context (5), 2 [NB]
- CX1 T — Context rot starts around ~300–400k tokens on the 1M model. Don't drift past that on intelligence-sensitive work.
- CX2 D — The "dumb zone" starts around ~40% context. Newcomers should stay under 40% and think about wrapping up at 60%. Experienced users stay "aggressively" under 30%. Reset with `/compact` or `/clear`.
- CX3 [NB] T — Rewind > correct: double-Esc or `/rewind` to before the failed attempt, then re-prompt.
- CX4 T — `/compact` with a hint beats waiting for autocompact, because the model is at its least intelligent point when it auto-compacts.
- CX5 [NB] T — Use subagents to manage context. Ask "will I need this tool output again, or just the conclusion?"

### Session Management (6)
- SM1 T — Every turn is a branching point: Continue, /rewind, /clear, /compact, or Subagent.
- SM2 T — New task = new session. Related follow-ups (for example, docs) can reuse the session.
- SM3 T — Say "summarize from here" before rewinding, so Claude writes a handoff note from its "future self".
- SM4 T — `/compact` is lossy but keeps momentum. `/clear` + a brief is more work but exact; use it for high-stakes steps.
- SM5 B — Recaps summarize long sessions. Disable them in `/config`.
- SM6 C — `/rename` important sessions and `/resume` them later. Label each one when running several Claudes.

### CLAUDE.md + .claude/rules (8)
- CM1 B+D — Keep CLAUDE.md under 200 lines per file. humanlayer uses 60 lines, which is "still not 100% guaranteed".
- CM2 Doc — `.claude/rules/*.md` files auto-load. A `paths:` frontmatter glob lazy-loads them only when matching files are touched.
- CM3 D — Wrap domain-specific rules in `<important if="...">` tags so they aren't ignored as the file grows.
- CM4 B — In monorepos, use several CLAUDE.md files (ancestor + descendant loading).
- CM5 Doc — Use `.claude/rules/` to split large instructions.
- CM6 D — Any developer should be able to say "run the tests" and have it work the first time. If not, CLAUDE.md is missing setup/build/test commands.
- CM7 B — Keep the codebase clean and finish migrations. Half-migrated frameworks confuse the model.
- CM8 Dv — Put harness-enforced behavior in settings.json (for example, `attribution.commit: ""`), not as "NEVER…" lines in CLAUDE.md.

### Agents (4), 1 [NB]
- AG1 B — Use feature-specific subagents with skills (progressive disclosure), not generic "qa" or "backend engineer" agents.
- AG2 [NB] B — Say "use subagents" to throw more compute at a problem and keep the main context clean.
- AG3 B — Agent teams with tmux + git worktrees for parallel development.
- AG4 B — Test-time compute: separate context windows give better results. One agent causes a bug and another, same model, finds it.

### Commands (3)
- CO1 B — Use commands for workflows instead of subagents.
- CO2 B — Make a slash command for every "inner loop" workflow. They live in `.claude/commands/` and go into git.
- CO3 B — If you do something more than once a day, make it a skill or command (`/techdebt`, context-dump, analytics).

### Skills (9), 2 [NB]
- SK1 L — `context: fork` runs a skill in an isolated subagent. The `agent` field sets the subagent type.
- SK2 Doc — In monorepos, put skills in subfolders.
- SK3 T — A skill is a folder, not a file: `references/`, `scripts/`, `examples/`.
- SK4 T — Give every skill a Gotchas section. It is the highest-signal content.
- SK5 T — The description field is a trigger ("when should I fire?"), not a summary.
- SK6 [NB] T — Don't state the obvious. Write only what pushes Claude away from its defaults.
- SK7 [NB] T — Don't railroad Claude. Give goals and constraints, not step lists.
- SK8 T — Bundle scripts and libraries so Claude composes instead of rebuilding boilerplate.
- SK9 L — `!command` in SKILL.md injects shell output when the skill is invoked.

### Hooks (5), 1 [NB]
- HK1 T — On-demand hooks inside skills: `/careful` blocks destructive commands, `/freeze` blocks edits outside a directory.
- HK2 T — Measure skill usage with a PreToolUse hook.
- HK3 B — A PostToolUse hook auto-formats the "last 10%" so CI doesn't fail.
- HK4 [NB] B — A hook routes permission requests to Opus, which scans for attacks and auto-approves safe ones.
- HK5 B — A Stop hook nudges Claude to keep going or to verify its work.

### Workflows (5)
- WF1 C — `/model`, `/context`, `/usage`, `/extra-usage`, `/config`. Use Opus for plan mode and Sonnet for code.
- WF2 B — Turn thinking mode on and set the Output Style to Explanatory (★ Insight boxes).
- WF3 Doc — The `ultrathink` keyword asks for high-effort reasoning.
- WF4 B — `/focus` hides intermediate work and shows only the result.
- WF5 B — Effort slider for Opus 4.7 adaptive thinking: low · medium · high · xhigh · max.

### Workflows Advanced (9), 2 [NB]
- WA1 B — Use ASCII diagrams a lot to understand the architecture.
- WA2 B — `/loop` for local recurring runs ("up to 7 days"). `/schedule` for cloud runs that work while your machine is off.
- WA3 B — Ralph Wiggum plugin for long-running autonomous tasks.
- WA4 B — `/permissions` with wildcards (`Bash(npm run *)`, `Edit(/docs/**)`) instead of dangerously-skip-permissions.
- WA5 B+C — `/sandbox` (file + network isolation) cut permission prompts by 84% internally.
- WA6 T — Invest in product-verification skills (signup-flow-driver, checkout-verifier). They are worth a week of work.
- WA7 [NB] B — Auto mode: a classifier auto-approves safe commands and asks on risky ones. Shift+Tab cycles Ask → Plan → Auto.
- WA8 B — `/less-permission-prompts` scans your history and suggests an allowlist. **The tips file names it `/fewer-permission-prompts`.**
- WA9 [NB] B — A `/go` skill: (1) test end-to-end via bash, browser or computer use, (2) run `/simplify`, (3) open a PR.

### Git / PR (5), 1 [NB]
- GP1 B — Keep PRs small: p50 is 118 lines (141 PRs, 45K lines in a day).
- GP2 B — Always squash merge: linear history and easy revert/bisect.
- GP3 S — Commit at least once an hour, and as soon as a task is done.
- GP4 [NB] B — Tag @claude on a coworker's PR to auto-generate lint rules from recurring review feedback.
- GP5 B — `/code-review` runs a multi-agent PR analysis.

### Debugging (6)
- DB1 S — Share screenshots whenever you're stuck.
- DB2 Doc — Use MCP (Claude in Chrome, Playwright, Chrome DevTools) so Claude can read console logs.
- DB3 S — Have Claude run the terminal you want logs from as a background task.
- DB4 S — `/doctor` diagnoses install, auth and config problems.
- DB5 S — Use a second model for QA, for example Codex for plan and implementation review.
- DB6 B — Agentic search (glob + grep) beats RAG. Vector DBs were tried and dropped because of drift and permission complexity.

### Utilities (5)
- UT1 B — iTerm, Ghostty or tmux instead of an IDE terminal.
- UT2 B — `/voice` or Wispr Flow for voice prompting ("10x productivity").
- UT3 S — `claude-code-hooks` for feedback.
- UT4 B+S — A status line for context awareness and fast compacting.
- UT5 B — Explore settings.json features (Plans Directory, Spinner Verbs).

### Daily (2)
- DY1 S — Update Claude Code daily.
- DY2 S — Read the changelog every morning.

**Tips per person** (co-credits counted for each person, total 85 = 82 + 3 shared): B 41, T 18, S 9, D 5, Doc 5, C 3, L 2, M 1, Dv 1.

---

## 2. Underlying principles

| # | Principle | Supporting tips |
|---|---|---|
| P1 | **Give Claude a way to verify its work.** The repo calls this the most important tip. | PR1, PS3, AG4, HK5, WA6, WA9, GP5, DB2, CM6 |
| P2 | **Protect the context window.** Context is a budget that rots as it fills. | CX1–5, SM1–4, AG2, SK1, SK3, SK9, CM2 |
| P3 | **Plan and remove ambiguity before building.** | PS1, PS2, PS5, PS6, PR2 |
| P4 | **Delegate, don't babysit.** Trust the model with outcomes. | All 13 [NB] tips, WF4, WA7, PR3 |
| P5 | **Automate the inner loop.** Anything repeated becomes a command, skill, hook or loop. | CO1–3, SK8, HK3, WA2, WA3, WA9 |
| P6 | **Put deterministic rules in the harness, not the prompt.** | CM8, HK1–5, WA4, WA5, WA7, WA8 |
| P7 | **Parallelism and test-time compute.** More tokens and uncorrelated windows give better results. | AG2–4, SM6, PS5, DB5, UT1 |
| P8 | **Compounding memory.** Every mistake becomes a rule, a gotcha or a lint rule. | CM1–6, SK4, GP4 |
| P9 | **Small, reversible steps.** | GP1–3, PS4, PS7, CX3 |
| P10 | **Lean, high-signal instructions.** | CM1, CM3, CM7, SK5–7 |
| P11 | **Independent review from another viewpoint.** | PS5, AG4, DB5, GP5, PR1 |
| P12 | **Stay tool-fluent and current.** | DY1–2, DB4, UT1–5, WF1–5 |

---

## 3. Numbers worth visualising

| Figure | Value | Source |
|---|---|---|
| Context window | 1M tokens; rot at ~300–400k ("highly dependent on the task — not a fast rule") | `tips/claude-thariq-tips-16-apr-26.md`, README CX1 |
| Dumb zone | ~40%. Newcomers stay <40% and wrap up at 60%; experts stay <30% | README CX2 (Dex video t=1541) |
| What each option keeps | Fresh: "your brief only" → Compact: "lossy summary" → Subagent: "all + result" → Rewind: "prefix kept, tail cut" → Continue: "everything stays" | thariq-16-apr |
| Subagent cleanup | 20 file reads + 12 greps + 3 dead ends; only the report comes back | thariq-16-apr |
| CLAUDE.md size | <200 lines per file; humanlayer 60 | README CM1 |
| One day of PRs (Mar 24) | 266 contributions, 141 PRs, 45,032 lines. p50 **118**, p90 498, p99 2,978, min 2, max 10,459 | `tips/claude-boris-2-tips-25-mar-26.md` |
| Sandbox | 84% fewer permission prompts | README WA5 |
| Verification payoff | "2–3x the quality" (Jan 3); "now 4.7 is 2-3x what you get out of Claude" (Apr 16) | boris-13-tips, boris-6-tips |
| Code output per engineer | Up **200%** this year, which made review the bottleneck | `tips/claude-boris-2-tips-10-mar-26.md` |
| `/loop` limit | **3 days** (Mar 7, README article list) → "up to a week" (Mar 30, boris-15) → "up to 7 days" (README WA2). The limit changed over time. | README L380, boris-15 |
| Example loops | `/loop 5m /babysit`, `/loop 30m /slack-feedback`, `/loop 1h /pr-pruner`, `/loop /post-merge-sweeper` | boris-15 |
| Parallel sessions | 5 terminal tabs (numbered 1–5) + 5–10 on claude.ai/code; teams use 3–5 worktrees; Boris has "dozens of Claudes" running | boris-13, boris-10, boris-15 |
| `--bare` | Up to 10x faster SDK startup | boris-15 |
| Configurability | 37 settings, 84 env vars | boris-12 |
| Effort levels | 3 (Low/Medium/High, Feb 12) → 5 (low…max, Apr 16) | boris-12, boris-6 |
| Voice | "10x productivity" (README) vs "speak 3x faster than you type" (boris-10) | README UT2, boris-10 |
| Prototype count | 20–30 versions | README PS7 |
| Formatting hook | Handles "the last 10%" | boris-13 |
| Skills at Anthropic | "hundreds"; 9 categories; 9 authoring tips | `tips/claude-thariq-tips-17-mar-26.md` |
| SQL | Boris hasn't written SQL in 6+ months | boris-10 |
| Context dump | 7 days of Slack/GDrive/Asana/GitHub | boris-10 |

---

## 4. Extra detail in `tips/*.md` that the README table lacks

**`claude-boris-13-tips-03-jan-26.md`**
- His setup is "surprisingly vanilla".
- Plan mode is shift+tab twice. Iterate on the plan, then switch to auto-accept and Claude "can usually 1-shot it".
- After every mistake, add a rule to the shared CLAUDE.md; tagging @claude on a PR does this. He calls it "Compounding Engineering".
- Example command: `/commit-push-pr`. Example subagents: `code-simplifier` and `verify-app`.
- Exact hook JSON: `"matcher": "Write|Edit"`, `"command": "bun run format || true"`.
- MCP config goes in `.mcp.json` (Slack, `bq`, Sentry).
- Three ways to verify long-running tasks: a background agent, an agent Stop hook, or ralph-wiggum (credited to @GeoffreyHuntley).
- Model choice "Opus 4.5 with thinking for everything" conflicts with Cat's tip WF1 ("Opus for plan, Sonnet for code").

**`claude-boris-10-tips-01-feb-26.md`**
- Worktrees are "the single biggest productivity unlock". People use shell aliases `2a`/`2b`/`2c` and a dedicated "analysis" worktree.
- "Update your CLAUDE.md so you don't make that mistake again."
- When something goes sideways, re-plan. Use plan mode for verification steps too.
- Bug inputs to hand to Claude: a Slack bug thread, "Go fix the failing CI tests", docker logs.
- Learning tips: Explanatory/Learning output styles, HTML slide decks of unfamiliar code, ASCII diagrams, a spaced-repetition skill.

**`claude-boris-12-tips-12-feb-26.md`**
- Terminal setup: `/terminal-setup` for shift+enter, `/vim`, `/keybindings` (settings live-reload).
- `/plugin` and company marketplaces.
- Agent frontmatter can set name, color, tools, permission mode and model. `"agent"` in settings or `--agent` sets the default agent.
- The permission system combines prompt-injection detection, static analysis, sandboxing and human oversight.
- Config levels: codebase, sub-folder, personal, enterprise.

**`claude-boris-15-tips-30-mar-26.md`**
- Mobile app (Code tab); `--teleport` / `/teleport`; `/remote-control`.
- Cowork Dispatch.
- Chrome extension: building without a browser is like asking someone to build a website "but they aren't allowed to use a browser".
- Desktop app auto-starts servers and has a built-in browser.
- Forking: `/branch` or `claude --resume <id> --fork-session`.
- `/btw` side queries; `claude -w`; `WorktreeCreate` hook.
- `/batch` fans out to "dozens, hundreds, even thousands" of worktree agents.
- `--add-dir` and `additionalDirectories`; `claude --agent=<name>`; hold space for `/voice`.
- Hook events: SessionStart, PreToolUse (logging), PermissionRequest (routed to WhatsApp), Stop.

**`claude-boris-2-tips-10-mar-26.md`**
- Code Review is a "team of agents" that runs on every PR.
- "Multiple uncorrelated context windows" works like a coworker reviewing your code.

**`claude-boris-6-tips-16-apr-26.md`**
- Auto mode is for Max, Teams and Enterprise users.
- Includes a full sample recap text.
- Verification by task type: backend → run the server; frontend → the Chromium extension; desktop → Computer Use.
- His typical prompt is "Claude do blah blah /go".

**`claude-thariq-tips-16-apr-26.md`**
- Worked example of correcting vs rewinding:
  - Correct: "reads + 2 failed attempts + 2 corrections + the fix"
  - Rewind: "reads + one informed prompt + the fix"
- Example of a bad compact: the "bar.ts warning" gets dropped from the summary.
- Example `/clear` brief: "we're refactoring the auth middleware, the constraint is X…".
- Three example prompts for spinning up subagents.
- A five-row decision table: Situation → Reach for → Why. This makes a good interactive decision tree.

**`claude-thariq-tips-17-mar-26.md`**
- Nine skill types, each with examples:
  1. Library/API Reference
  2. Product Verification
  3. Data Fetching
  4. Business Process
  5. Scaffolding
  6. Code Quality
  7. CI/CD
  8. Runbooks
  9. Infra Ops
- Authoring tips not in the README:
  - Tip 5: Setup through `config.json` + AskUserQuestion.
  - Tip 7: Store memory in `${CLAUDE_PLUGIN_DATA}` (log, JSON or SQLite).
- `/careful` blocks `rm -rf`, `DROP TABLE`, force-push and `kubectl delete`.
- The frontend-design skill avoids "Inter font and purple gradients".
- Distribution: commit to `.claude/skills`, or use a plugin marketplace. Curation is organic: a sandbox folder first, then a PR once the skill gets traction.
- Skills compose by referencing each other by name.
- Most skills "began as a few lines and a single gotcha".

**Teaching hook:** tip PR1, "grill me", is the same technique the user asked for in this workflow.