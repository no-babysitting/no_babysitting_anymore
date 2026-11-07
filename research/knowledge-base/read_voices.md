# Research digest: videos, reports, and community/business sections

Base path for all sources: `repos/claude-code-best-practice/`

The transcripts don't label speakers. Quotes below are copied as they appear in the files, including transcription spellings like "quad code", "cloud MD" and "Enthropic".

---

## 1. Videos (8 files in `videos/`)

**Boris Cherny, Every (Oct 29 2025)**, `claude-cat-every-29-oct-25.md`. Guests "Cat & Boris"; the transcript doesn't say who speaks when.
- Claude Code grew out of a terminal prototype ("Clyde" came before it). Internally "over I think 70 or 80% of ants" use it daily. The team calls this "ant fooding".
- "Everything is dual use": slash commands such as `/commit` can be run by the human and by Claude.
- Plan mode "can like two 3x success rates" when you agree on the plan first. The point where you need it moves outward with each model, and they say plan mode may be un-shipped one day.
- They dropped vector embeddings for agentic search. Reasons given: re-indexing, stale indexes, security surface. "You can get to the same accuracy level with agentic search." For semantic search, add it through MCP.
- Power-user tip: check `settings.json` into the repo to pre-allow or block commands.
- "Docs to demos": "internally, our currency is actually demos". Latent demand also comes up, as does a habit some people have of writing a diary or memory entry for each task.
- Quotes: "plan mode, it can like two 3x success rates pretty easily if you like land on the plan first" (speaker not labeled). "internally, our currency is actually demos" (speaker not labeled).

**Boris Cherny, Ryan Peterman (Dec 15 2025)**, `claude-boris-ryan-peterman-15-dec-25.md`. Mostly about his career at Meta.
- Anthropic tripled in size, yet "productivity per engineer has grown like almost 70%".
- His advice: "Don't build for the model of today. Build for the model 6 months from now."
- The team applies the same quality bar to model-written and human-written code. New users "ask it to do stuff that's a little bit too big."
- Other themes: latent demand, side quests, hiring generalists, "unshipping" features, "use common sense".
- Quotes: "we have the same exact bar regardless of whether the code was written by the model or by a human" (Boris). "Latent demand I think is the single most important principle in product" (Boris).

**Boris Cherny, Y Combinator Light Cone (Feb 17 2026)**, `claude-boris-y-combinator-17-feb-26.md`
- CLAUDE.md came from latent demand: users were already writing markdown files for the model to read.
- His personal CLAUDE.md is two lines: enable automerge on PRs, and post each PR to the team stamps channel. If yours gets bloated, "delete your quadmd and just start fresh."
- Favourite rule: "for every plan decide whether it's overengineered, underengineered, or perfectly engineered and why."
- "Uncorrelated context windows": throwing more context at a problem acts as test-time compute. For hard bugs he asks for 3, 5 or 10 subagents in parallel.
- "I think plan mode probably has a limited lifespan." The team keeps a framed copy of The Bitter Lesson on the wall ("never bet against the model"). No part of Claude Code is more than about 6 months old.
- Numbers: productivity per engineer +150%; "90% of the code" prediction confirmed (his own is 100%); 4% of public commits (SemiAnalysis); 70% of startups (Mercury); Cowork built in about 10 days.
- Quotes: "never bet against the model" (Boris). "We build for the model six months from now" (Boris).

**Boris Cherny, Lenny's Podcast (Feb 19 2026)**, `claude-boris-lennys-podcast-19-feb-26.md`
- 100% of his code is written by Claude Code. He ships 10–30 PRs a day with about 5 agents running. Productivity per engineer +200%.
- Tip 1: use the most capable model (Opus 4.6, maximum effort). A cheaper model "takes more tokens in the end."
- Tip 2: start about 80% of tasks in plan mode. Plan mode is just "one sentence" injected: "please don't write any code yet."
- Build principles: give engineers lots of tokens, underfund projects slightly, go faster, and "don't try to box the model in". Give it tools and a goal, not strict step workflows.
- Cowork was built in 10 days. It came from latent demand and passed 48 of 50 tasks in a PM's evaluation.
- Quotes: "I have not edited a single line by hand since November." (Boris). "Coding is largely solved." (Boris).

**Boris Cherny, The Pragmatic Engineer (Mar 4 2026)**, `claude-boris-pragmatic-engineer-04-mar-26.md`
- The switch to 100% came "instant[ly]" with Opus 4.5. Almost every technical employee at Anthropic uses it daily.
- RAG history: first a local vector DB, then recursive indexing, then glob/grep. "It turned out that agentic search just outperformed everything."
- Code review: he used to tally repeated comments in a spreadsheet and write a lint rule after 3–4 occurrences. Now he tags @claude on the PR to write the lint rule. Deterministic checks: type checkers, linters, the build.
- Workflow: parallel Claudes, git worktrees, iterate in plan mode. Use the "explanatory" output style when new to a codebase.
- "We don't really write stuff. We just we show." Agent teams (swarms) went through hundreds of prototypes, and plugins were "fully built with swarms."
- Analogy: printing press and scribes.
- Quotes: "agentic search just outperformed everything" (Boris). "on our team the culture is we don't really write stuff. We just we show." (Boris).

**Dexter Horthy (HumanLayer), MLOps Community (Mar 24 2026)**, `claude-dex-mlops-community-24-mar-26.md`
- What RPI got wrong: users had to say "magic words." The fix is in the tool.
- Instruction budget: frontier LLMs follow about 150–200 instructions consistently. The 85-instruction mega-prompt was split into prompts of under 40 each.
- RPI became CRISPY: Questions, Research, Design, Structure outline, Plan, (work tree), Implement, PR. Research runs in a fresh context that never sees the ticket, so it returns "facts, not opinions."
- Reversal: "don't read the plans. Please read the code." A 1,000-line plan comes to about 1,000 lines of code. Review a roughly 200-line design discussion and a 2-page outline (like C header files) instead.
- Plans should be vertical, not horizontal. Aim for 2–3x speed, not 10x slop. Dumb zone starts around 40% of 168k usable tokens: "keep it under 40", and at 60 think about wrapping up.
- Quotes: "don't use prompts for control flow if you can use control flow for control flow" (Dex). "mind your instruction budget" (Dex).

**Matt Pocock, conference workshop (~2h, Apr 24 2026)**, `claude-matt-pocock-24-apr-26.md`
- Two constraints: the smart zone vs dumb zone (he puts it at "about 100K", whether the window is 1M or 200k), and "LLMs are like the guy from Memento" (clear vs compact).
- `grill-me` skill: "Interview me relentlessly about every aspect of this plan until we reach a shared understanding… For each question, provide your recommended answer." This builds a shared "design concept" (Brooks). He argues against "specs to code".
- Two documents: the destination (PRD, including an out-of-scope section) and the journey (a Kanban of independently grabbable vertical-slice / tracer-bullet issues). He does not read the PRD.
- Human-in-the-loop vs AFK tasks. The Ralph loop (`once.sh`, AFK in Docker sandbox), TDD red-green-refactor, manual QA to apply your own taste.
- Deep vs shallow modules (Ousterhout). The `improve-codebase-architecture` skill.
- Push vs pull for coding standards: push to the reviewer, let the implementer pull. Sand Castle is his TypeScript library for parallel AFK loops (planner, implementers, reviewer, merger).
- Quotes: "bad code bases make bad agents" (Matt). "design the interface for these modules, but then delegate the implementation" (Matt).

**Andrej Karpathy, conference fireside chat (May 2 2026)**, `claude-karpathy-ai-engineer-02-may-26.md`. Note: the README labels this "AI Engineer".
- December was a sharp transition: "I can't remember the last time I corrected it."
- Software 3.0: the context window is "your lever over the interpreter." Examples: the OpenClaw install is a paste-to-agent skill; MenuGen is an "app that shouldn't exist."
- Verifiability leads to jagged intelligence. Opus 4.7 refactors 100k-line codebases but says to walk to a car wash 50m away.
- Vibe coding raises the floor; agentic engineering keeps the quality bar. Top people get "a lot more" than 10x. Hiring should be big projects, not puzzles.
- Humans own spec, taste and oversight. "I actually don't even like the plan mode." Docs should be agent-native ("what should I copy paste to my agent?").
- Quotes: "vibe coding is about raising the floor for everyone" (Karpathy). "You can outsource your thinking but you can't outsource your understanding." (a tweet Karpathy quotes, not his own words).

**Data inconsistency:** Dex's X handle is `@daborhey` in the video file, `x.com/daborhyde` in the README videos table, and `x.com/dexhorthy` in Subscribe.

---

## 2. Reports (9 in scope, `reports/`)

**`why-harness-is-important.md`**. Thesis: features are not "just prompts." The harness builds prompts, executes deterministically, and lays out context.
- 10 capabilities a prompt can't give you: context isolation (N subagents give about N× context), enforced tool restrictions, lazy `paths:` rules, blocking hooks, model routing, parallelism, cross-session persistence, 110+ modular prompt fragments, `skills:` preloading, `auto` permission classifier.
- Two meanings of "prompt": (a) what the user typed, about 6–60 tokens; (b) what the model sees, about 5k–50k+ tokens.
- `Output quality = f(effective context, model capability, iteration loop)`. Analogy: recipe vs kitchen.

**`llm-day-to-day-degradation.md`**. Thesis: "frozen weights ≠ frozen behavior." The degradation is real but misattributed, not nerfing.
- Nine layers of the inference stack sit above the weights.
- Anthropic's Sept 2025 postmortem found 3 bugs: context-routing (peak 16% of Sonnet 4 requests, about 30% of Claude Code users hit at least one degraded message), TPU corruption, and an XLA:TPU top-k miscompile.
- MoE/batch variance (Scale AI): ±8–14% day to day; one jailbreak score went 77% → 63%.
- Stanford 2023 result (97.6% → 2.4%) is confounded by temperature 0.0 vs 1.0. A "Weekend Claude" effect is not supported.
- Most actionable advice: `/compact` or start a fresh session. A second section (Codex 5.3, Mar 5 2026) ranks "provider incident + rollback" as the most likely cause and recommends pinning snapshots and running canary suites.

**`claude-agent-sdk-vs-cli-system-prompts.md`** (dated Feb 3 2026). Thesis: the CLI uses a modular system prompt; the SDK default is minimal. Neither gives deterministic output.
- CLI: about 269-token base, 110+ fragments, 18+ tools, security review prompt about 2,610 tokens.
- SDK `preset: "claude_code"` still needs `settingSources: ["project"]` to load CLAUDE.md.
- There is no seed parameter, and even `temperature=0` is non-deterministic (issue #3370).

**`claude-advanced-tool-use.md`**. Thesis: four API features, generally available Feb 18 2026, cut tokens and errors.
- Programmatic Tool Calling: about 37% fewer tokens. Uses `allowed_callers: ["code_execution_20250825"]`; container lives about 4.5 minutes.
- Dynamic Filtering: 24% fewer input tokens. BrowseComp for Opus 4.6 goes 45.3% → 61.6%.
- Tool Search: about 85% saving (77K → 8.7K). Claude Code has had MCPSearch auto mode since v2.1.7 (`ENABLE_TOOL_SEARCH=auto:N`).
- Tool Use Examples: accuracy 72% → 90%.

**`claude-in-chrome-v-chrome-devtools-mcp.md`** (Dec 19 2025). Thesis: use Playwright MCP as the main tool, Chrome DevTools MCP for performance and network work, and Claude in Chrome for logged-in visual checks.
- Context cost: Playwright 13.7k (6.8%) with 21 tools, Claude in Chrome 15.4k (7.7%) with 16 tools, DevTools 19.0k (9.5%) with 26 tools.
- Claude in Chrome attack success rate is 23.6%, or 11.2% with mitigations.

**`claude-skills-for-larger-mono-repos.md`**. Thesis: skills don't load up the directory tree like CLAUDE.md does. Nested `.claude/skills/` are found on demand.
- Only descriptions load up front; full content loads when invoked. Description budget defaults to 15,000 characters (`SLASH_COMMAND_TOOL_CHAR_BUDGET`).
- Priority: Enterprise > Personal > Project. Plugins are namespaced. Use `disable-model-invocation: true` for dangerous skills.

**`claude-usage-and-rate-limits.md`**. Covers `/usage`, `/extra-usage`, `/cost`.
- Limits reset every 5 hours. Extra usage is billed at API rates, capped at $2,000/day.
- `/fast` is always billed to extra usage. API flags: `--max-budget-usd`, `--max-turns`. The `/extra-usage` CLI was undocumented as of Feb 2026.

**`claude-spinner-verbs-and-tips.md`**. Taken from v2.1.121: 179 spinner verbs (e.g. "Clauding", "Flibbertigibbeting") and 42 tips (e.g. worktrees, double-esc rewind, `/rename`, `/statusline`, plan mode). Good material for loading screens and micro-copy.

**`learning-journey-weather-reporter-redesign.md`**. An internal plan to reorder a 37-slide deck around one running example, the weather reporter. Order: Agents ("the person") → Skills → Context → CLAUDE.md → Commands + Workflow, with a journey progress bar. It isn't linked in the README Reports section, but it's directly reusable as a teaching-arc template.

---

## 3. Narrative threads across videos and reports

- **The harness matters.** The model only sees tokens, but the harness decides which tokens, adds determinism through hooks, and isolates work in subagents (why-harness). Boris supports this from the other side: "the model just wants to use tools"; give it tools and a goal and don't box it in.
- **Context rot and the dumb zone.** Dex puts the limit around 40%, Matt around 100K. The 1M window doesn't move it. The degradation report calls context pollution the most common reason "Claude got dumber." The fixes are the same everywhere: `/compact` or `/clear`, subagents, and static artifacts you can resume from.
- **Agentic search beats RAG.** Both Boris interviews and Cat give the same history: vector DB, then glob/grep. RAG was dropped because of staleness, security and deployment cost.
- **Prototype over PRD, demos over docs.** "We just show," hundreds of agent-team prototypes, a 20-version prototype day. There's tension worth teaching: Matt and Dex still write short alignment documents (PRD, design discussion), but read code, not plans.
- **Alignment before code.** Plan mode (2–3x success), grill-me, CRISPY design discussion, Karpathy's "you are in charge of the spec." The counter-thread is that plan mode is temporary scaffolding (Boris, Karpathy).
- **Bitter Lesson and scaffolding decay.** Build for the model six months out; Claude Code's code is about 2 months old; CLAUDE.md should stay minimal. This also explains why best practices expire.
- **Quality vs slop.** Same bar for model and human code (Boris), "please read the code" with 2–3x as the target (Dex), TDD and deep modules (Matt), agentic engineering preserves the bar (Karpathy).
- **Degradation myths.** Infrastructure bugs and variance are real, deliberate nerfing is not. A good topic for a myth-vs-fact interaction.
- **Productivity numbers rise over time.** About 70% (Dec 2025), 150% (YC, Feb 17), 200% (Lenny, Feb 19), with 100% of Boris's code written by Claude. Present these as claims made in interviews.

---

## 4. README sections (lines 395–600)

- **Videos/Podcasts:** 8 entries matching the 8 files. 5 feature Boris; also Dex, Matt and Karpathy.
- **Subscribe:** 3 subreddits; 11 X accounts for Anthropic and the Claude team; 15 community X accounts with their projects (Superpowers, ECC, gstack, HumanLayer, Compound Eng, OpenSpec, BMAD, GSD, Matt's Skills, CC Templates, Every, AutoResearch, OpenClaw, claw-code, oh-my-claudecode); 1 Anthropic YouTube channel; 6 podcast YouTube channels.
- **Startups/Businesses ("☠️"):** 11 Claude features, each listed as "replacing" competitors, 26 named products plus "YC AI wrapper startups". Examples: Code Review → Greptile, CodeRabbit and others; Agent SDK → LangChain, CrewAI and others; Design → Figma, v0 and others. This is an opinionated competitive list. If used at all, reframe it as a "native feature map" and avoid kill-list framing and third-party brand claims.
- **Billion-Dollar Questions:** 13 open questions (Memory 4, Agents/Skills 6, Specs 3). These work well as Socratic prompts.
- **Does code matter?:** a link to `shanraisshan/agentic-engineering` only.
- **Reports:** 11 badges. `learning-journey…` isn't one of them.
- **How to Use:** 7 steps (read as a course; learn the primitives; run `/weather-orchestrator`; hook sounds; Hot topics and the Ralph loop; apply the tips to your CLAUDE.md; subscribe), plus 2 author videos and 1 presentation (GDG Kolachi, 2026-04-25). This is core material for the onboarding path.
- **Other repos:** 5 (Claude Code Hooks, Codex CLI Best Practice and Hooks, Gemini CLI Best Practice and Hooks).
- **Developed by:** 8 maintenance `/workflows:*` commands. This is meta material.
- **Extras:** 5 badges (Claude for OSS, Community Ambassador, Certified Architect, Anthropic Academy, WhatsApp Claude Pakistan).
- **Likely out of scope for a teaching site:** Sponsor (Polar), header placements, Star History and Trending, WhatsApp, the Developed-by workflows, the Codex and Gemini repos (beyond a footer link), and the Startups "replaced" table (or reframe it as described above).