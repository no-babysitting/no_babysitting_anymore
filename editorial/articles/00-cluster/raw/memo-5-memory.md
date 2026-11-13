# Memo 5 · Perplexity: memory, tin harness hay tự quản (nguyên văn)

> Nguồn: kết quả Perplexity cho prompt 5 (`02-chatgpt-prompts-4-5-6.md`), chủ dự án dán vào phiên Claude Code ngày 13/11/2026.
> Trạng thái: **nguyên văn, chưa chỉnh sửa. Mặc định mọi khẳng định là UNVERIFIED** cho tới khi có dòng trong `ledger.md` của bài 02. Các liên kết dạng `[help.openai](…)` là citation do Perplexity gắn, chưa được mở và thẩm định.
> Phần Claude Code đã đối chiếu một phần với docs ngày 13/11/2026: xem `../../02-memory/ledger.md`. Phần Claude Chat/Cowork, ChatGPT, Gemini, Codex, Gemini CLI chưa kiểm.

---

# 5. AI Memory Management: Trust the Harness or Manage Memory Yourself?

*Research memo — 13 November 2026. Product behavior varies by plan, rollout, platform, and workspace policy.*

The best default is a hybrid: trust built-in memory for low-risk personalization, explicitly maintain durable project knowledge, and add an external memory layer only when you need capabilities the product cannot reliably provide—such as cross-agent continuity, access control, auditability, or recoverable long-running state.

For No Babysitting, the goal is not to remember everything. It is to make relevant knowledge available without repeatedly asking the user, while keeping decisions, permissions, and consequential facts traceable.

## 1. First distinguish five different things

“Memory” is an umbrella term, not one technical mechanism.

| Layer | What it is | What it does not guarantee |
|---|---|---|
| Session context and conversation history | Context is what the model receives for the current response. History is a stored transcript that may be resumed, summarized, or searched. | A stored transcript is not necessarily inside the current context or retrieved accurately. |
| Persistent user memory | Preferences, personal context, recurring relationships and other details carried across sessions. | Exact recall, complete coverage, or current truth. |
| Project/repository memory and instructions | Project briefs, conventions, build commands, decisions, and files such as `CLAUDE.md`, `AGENTS.md`, or `GEMINI.md`. | Instructions are not equivalent to enforced permissions. |
| Retrieved knowledge and artifacts | Documents, databases, connected applications, code, reports and other sources read when relevant. | Everything in a connected source is not automatically “remembered.” |
| Agent-generated versus user-managed memory | A distinction about who writes and maintains the information. Either can exist in files, summaries, or databases. | Agent-written memory is not necessarily correct; user-written memory can also become stale. |

These distinctions appear directly in product implementations: ChatGPT separates saved memories from history; Claude distinguishes chat search, account/project memory, instructions and auto memory; Gemini CLI loads instructional files separately from saved conversation checkpoints. [help.openai](https://help.openai.com/articles/8590148-memory-faq)

Persistent memory is also not model training. For example, ChatGPT exposes memory controls separately from its model-improvement controls; business-workspace training policies differ from personal-account settings. Turning memory off is therefore not a universal training opt-out or deletion request. [help.openai](https://help.openai.com/articles/8590148-memory-faq)

## 2. Provider comparison: chat and agentic work environments

### Claude Chat, Projects and Cowork

| Dimension | Documented behavior |
|---|---|
| Automatic storage and updates | The newer experience saves individual memory topics as conversations happen; users can also explicitly request remembering, changing or forgetting information. |
| Retrieval | Chat search is a separate RAG-based capability. It can retrieve prior conversations within documented project boundaries. |
| Scope | Projects have their own memory, but are not automatically isolated from account memory. Disable “Use account memory” for full project-memory separation. |
| Cowork | Cloud Cowork shares memory with Chat. Local Cowork sessions do not use that account-memory feature. |
| Inspection and editing | Settings exposes topics that users can read, edit and delete; conversational corrections are also supported. |
| Export and deletion | Memory is included in data exports. In the newer experience, deleting a conversation does not automatically remove memories generated from it. Pause and reset are different operations. |

These are current vendor-documented behaviors, not measured recall guarantees. [support.claude](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)

A consequential version difference: some organizations still have legacy memory based on periodically updated synthesis. Its deletion behavior differs from the newer topic-based experience. Advice such as “delete the source chat and the memory disappears” is therefore not universally correct even within Claude. [support.claude](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)

Also, starting a Claude chat with memory off does not make it private or unsearchable forever: the chat remains in history and may be found by chat search from other conversations. Incognito is a different mode, and enterprise retention/export rules can still apply. [support.claude](https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context)

### ChatGPT: memory, projects and Work/Codex

| Dimension | Documented behavior |
|---|---|
| Automatic storage and updates | ChatGPT may save useful details and update information inferred from history. Improved Memory maintains a broader evolving summary; legacy saved memories are more explicit items. |
| Retrieval | Depending on plan and region, relevant context can come from history, saved memories, custom instructions, saved files and connected apps. It does not search history for every answer. |
| Scope | Projects support default or project-only memory. Shared projects use project-only memory and exclude members’ outside personal context. |
| Inspection and editing | Users can inspect available summaries/items and correct them. “Sources” may identify contributing context, but neither Sources nor the summary is guaranteed to show everything. |
| Deletion | Saved memory, source chats, files and connected sources may require separate cleanup. Disconnecting an app stops future access, not information already present in conversations. |
| Temporary chats | Current documentation distinguishes personalized from unpersonalized temporary chats. They do not create/update memories while temporary, but personalized ones can use existing memory. |

Controls vary by account and rollout; do not assume an older screenshot or tutorial describes every account. [help.openai](https://help.openai.com/articles/8590148-memory-faq)

For portability, distinguish a general account-data export from a complete, importable memory backup. This review verified inspection and correction controls, but did not establish a lossless export of all personalization state, retrieval behavior and connected-source context. Do not promise that capability.

### Gemini Apps

| Dimension | Documented behavior |
|---|---|
| Persistent personalization | Google documents saved information/instructions, personalization from past chats, and an available memory summary. These are related but distinct controls. |
| Automatic retrieval | Past-chat personalization depends on eligibility and settings; connected applications provide additional retrievable information. |
| Inspection and editing | Saved info can be viewed, edited and deleted. Where available, the memory summary can also be edited or deleted. |
| Forgetting | To stop personalization from a past chat, delete that chat; propagation may take time. Removing connected-app information can require both deleting affected chats and disconnecting the app. |
| Retention | Activity has its own deletion schedule. Saved instructions persist until deleted. Activity deletion is not identical to deletion of every separately retained record. |

Google’s documentation varies across feature rollouts, so check the controls actually present in the account rather than treating “Saved info,” “Memory,” and “Personal Intelligence” as one universal interface. [support.google](https://support.google.com/gemini/answer/16413516)

The Privacy Hub explicitly describes retention exceptions: some human-reviewed data is retained separately from activity deletion. This illustrates why “the assistant forgot it” and “the provider has erased every copy” are different claims. [support.google](https://www.support.google.com/gemini?p=pn_past_chats)

As with ChatGPT, this review did not establish a lossless export/import route for all Gemini personalization state.

## 3. Coding agents: more inspectable, not automatically more reliable

### Claude Code

Claude Code combines explicit instructions with agent-written auto memory:

- Instructions can be scoped to user, organization, project and local preferences.
- Auto memory is repository-scoped and machine-local; worktrees share it, but separate machines/cloud environments do not automatically share it.
- A `MEMORY.md` index is loaded at session start; topic files are read when needed.
- The first 200 lines or 25KB of that index—whichever comes first—are loaded automatically. This is an index limit, not a limit on all stored memory.
- Files remain until edited or deleted; session-transcript cleanup does not automatically remove them. [code.claude](https://code.claude.com/docs/en/memory)

Users can inspect/edit the files, back them up, and manage memory through `/memory`. Current versions also support `AGENTS.md`, but loading rules and version requirements matter; simply placing multiple instruction files in a repo does not guarantee all are loaded. [code.claude](https://code.claude.com/docs/en/memory)

Most importantly, Anthropic explicitly says instruction files are context, not enforced configuration. Permissions, sandbox settings and hooks are the appropriate enforcement layer. [code.claude](https://code.claude.com/docs/en/memory)

### Codex

Codex supports repository instructions through `AGENTS.md`, plus a separate Memories feature where available. The CLI documents `/memories` controls for whether existing memories are used and whether new memories are generated. [developers.openai](https://developers.openai.com/codex/cli/reference?trk=article-ssr-frontend-pulse_little-text-block)

Its configuration also exposes a default 32KB budget for embedded `AGENTS.md` content. OpenAI recommends concise and nested instructions to reduce unnecessary context consumption. [developers.openai](https://developers.openai.com/codex/config-sample?trk=article-ssr-frontend-pulse_little-text-block)

Do not assume ChatGPT account memory and Codex-generated memory are interchangeable. The reviewed documentation establishes separate controls, but does not justify a blanket claim that all user memory is synchronized across every ChatGPT/Codex surface.

### Gemini CLI and Antigravity

Gemini CLI documents durable Markdown memory at different scopes:

- Repository `GEMINI.md` for shared instructions.
- Private project notes for personal project context.
- Global `~/.gemini/GEMINI.md` for cross-project preferences.
- Agent edits persist facts into the appropriate files. [geminicli](https://geminicli.com/docs/tools/memory/)

`/memory show` exposes the combined loaded instructional context. Conversation checkpoints are managed separately from instructional memory. Commands and behavior have changed between documentation generations, so use the installed version’s help rather than assuming `refresh` and `reload` are interchangeable. [google-gemini.github](https://google-gemini.github.io/gemini-cli/docs/cli/commands.html)

Antigravity documents project rules, imported instructions and isolated subagent context. Those features do not establish that it shares Gemini Apps’ personal memory or implements the same retention/export behavior. That equivalence remains unverified in this review. [antigravity](https://antigravity.google/docs/getting-started?authuser=429&hl=it)

### Practical implication

File-based memory provides better inspectability and portability, but introduces maintenance work:

- Wrong notes can persist indefinitely.
- Multiple instruction files can conflict.
- Global preferences can leak into unrelated projects.
- Local storage does not mean local inference: material loaded into a cloud model’s context still crosses that inference boundary.

For Claude Code specifically, the documentation warns that conflicting instructions can lead to inconsistent behavior and that imports do not reduce context cost when all imported content is loaded together. [code.claude](https://code.claude.com/docs/en/memory)

## 4. Architecture trade-offs

The following is an architectural assessment, not a provider ranking.

| Approach | Strength | Main failure modes | Operational cost |
|---|---|---|---|
| Built-in personalization | Convenient; little setup; useful continuity | Opaque selection, incorrect inference, stale preferences, incomplete visibility | Low setup; occasional correction and privacy review |
| Explicit instructions/project brief | Predictable, reviewable and portable | Staleness, contradictions, excessive always-loaded context | Moderate editorial maintenance |
| Agent-generated files | Learns from corrections; inspectable in coding tools | Incorrect conclusions become durable; duplication and uncontrolled growth | Periodic diff/audit/pruning |
| Retrieval over canonical documents | Keeps detailed knowledge outside the prompt; preserves source documents | Relevant source missed, stale index, permissions mistakes, poor chunking | Indexing, access-control and retrieval evaluation |
| External structured state/memory service | Cross-agent continuity, provenance, lifecycle and transactional state | Engineering complexity, synchronization bugs, overcollection | Highest build/operate/governance cost |

The central distinction is between storage and recall. A fact can exist in a database yet never be retrieved; it can be retrieved but omitted from the usable context; or it can be present and still misinterpreted. ChatGPT explicitly states that memory does not retain every detail and that its visible summary is incomplete; Claude Code explicitly limits automatic index loading. [help.openai](https://help.openai.com/articles/8590148-memory-faq)

### What actually consumes context?

- Always-loaded instructions consume context every applicable session.
- Retrieved knowledge consumes context when selected and inserted.
- External storage alone does not occupy the model’s context.
- Repeated summaries and duplicated instructions can crowd out useful information.

Cache discounts may reduce billing, but they do not make irrelevant context useful. The cost comparison should include retrieval calls, summarization, write/consolidation steps, review and maintenance—not just storage.

## 5. Use-case decision matrix

These are recommended starting architectures, not universally optimal prescriptions.

| Use case | Recommended starting point | What to manage explicitly | When an external layer makes sense |
|---|---|---|---|
| Personal assistance | Built-in memory for stable, low-risk preferences | Sensitive facts, changing circumstances, items the assistant repeatedly misremembers | Multiple assistants need a shared profile or stronger privacy/portability controls |
| Recurring knowledge work | Project workspace plus a short maintained brief | Goals, terminology, current decisions, deadlines and authoritative sources | Large changing document collections, cross-tool workflows or fine-grained permissions |
| Software development | Versioned repo instructions, tests/docs as truth, auto memory for personal corrections | Build/test commands, architecture decisions, approval rules and recurring lessons | Many repos/agents need controlled shared knowledge or reliable cross-machine continuity |
| Team projects | Shared canonical documents and reviewed instructions | Ownership, permissions, decision records, project boundaries | Auditable retrieval, access controls, retention and cross-team coordination |
| Long-running autonomous agents | Durable task state and artifact references; memory only as supporting context | Completed actions, pending approvals, checkpoints, budgets and recovery state | Usually necessary when work must survive restarts or coordinate multiple agents |

For teams, personal assistant memory should not become the only record of a shared decision. For long-running agents, memory should not be treated as a transaction log.

A note saying “the report was sent” is weaker than a verified send result with message ID, recipient, timestamp and action status.

## 6. When to trust the harness—and when not to

### Trust built-in memory when

- The information is low-risk and easy to correct.
- Approximate personalization is sufficient.
- Scope boundaries match the work.
- The benefit is reduced repetition, not proof or accountability.
- You can tolerate an occasional missed recall.

Examples: preferred language, preferred answer length, recurring writing style.

### Manage memory explicitly when

- A fact must be exact or current.
- Several people rely on it.
- A wrong recollection would materially change the outcome.
- The information represents a decision rather than a preference.
- You need portability or reproducibility.

Examples: acceptance criteria, approved budget, contractual wording, architectural decisions and client-specific restrictions.

### Build external memory/state when

- Multiple agents/products must share controlled knowledge.
- You need provenance, versions, expiration and access policies.
- The workflow outlives a session or machine.
- Restart recovery and duplicate-action prevention matter.
- Built-in retrieval repeatedly fails on representative tasks.

Start with files or a small structured store. A vector database is an option for retrieval, not a prerequisite for memory and not a substitute for workflow state.

## 7. Lightweight memory-management guide

### 1. Assign information to the right home

Use this proposed division:

```text
Personal profile     → stable preferences, low-risk personalization
Project brief        → current objectives, constraints, definitions
Decision log         → approved decisions, rationale, owner, date
Canonical sources    → detailed facts, evidence, code and documents
Task state           → progress, tool results, pending actions, checkpoints
Agent scratch notes  → tentative observations, short retention
```

Do not force one growing `MEMORY.md` to perform all six jobs.

### 2. Preserve provenance for consequential facts

A lightweight record can be:

```yaml
statement: "Launch date is 20 December"
scope: project-alpha
source: "Planning decision, 13 November"
owner: "Project lead"
status: confirmed
last_verified: 2026-11-13
review_on: 2026-11-27
```

Use explicit statuses such as proposed, confirmed, superseded and disputed. Do not let an agent’s inference silently become a confirmed fact.

### 3. Automate harmless maintenance, review consequential changes

Let agents deduplicate routine notes, propose stale entries and update working summaries within scope.

Require review before changes to:

- Shared authoritative decisions.
- Sensitive personal records.
- Approval boundaries or permissions.
- Financial/legal commitments.
- Records whose deletion would destroy accountability.

Memory may remind an agent of authority; it must not create authority.

### 4. Use a correction protocol

When something changes:

1. Correct the canonical source.
2. Mark the old decision superseded.
3. Update summaries and instructions that repeat it.
4. Check retrieval in a fresh session.
5. Remove unnecessary duplicates.

A conversational “forget that” may affect personalization without deleting the underlying chats, files or connected data. Both OpenAI and Google document this multi-source deletion problem. [help.openai](https://help.openai.com/articles/8590148-memory-faq)

### 5. Audit on change, not constantly

Review memory when:

- A project enters a new phase.
- A repeated mistake occurs.
- A major decision changes.
- A team member or client changes.
- A tool/version migration happens.
- A privacy or retention requirement changes.

This minimizes babysitting without letting persistent errors compound.

### 6. Test memory behavior, not just its contents

Use a small recurring check:

| Test | What to look for |
|---|---|
| Recall | Does a fresh session find the relevant fact? |
| Correction | Does the newer fact replace the obsolete one? |
| Isolation | Does project A avoid using project B’s information? |
| Provenance | Can the agent identify the supporting source? |
| Abstention | Does it say “unknown” rather than invent missing history? |
| Deletion | Does the fact stop resurfacing from remaining sources? |

Track missed recall, stale recall, wrong-scope retrieval and correction effort. No comparative recall testing was performed for this memo, so provider documentation should not be interpreted as measured reliability.

## Bottom line

There is no universally best memory architecture. Built-in memory minimizes setup; explicit files improve control; retrieval keeps large knowledge collections usable; external state enables durable coordination. Each solves a different problem and creates a different maintenance burden.

The No Babysitting principle is **remember automatically, establish truth explicitly**: let the harness reduce repetition, but keep authoritative decisions, permissions, evidence and execution state in inspectable records. More stored information is useful only when the right information is retrieved, interpreted correctly, and allowed to influence the task.
