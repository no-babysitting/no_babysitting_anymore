# Memo 6 · Perplexity: 80% system prompt (nguyên văn)

> Nguồn: kết quả Perplexity cho prompt 6 (`02-chatgpt-prompts-4-5-6.md`), chủ dự án dán vào phiên Claude Code ngày 13/11/2026.
> Trạng thái: **nguyên văn, chưa chỉnh sửa. Mặc định mọi khẳng định là UNVERIFIED** cho tới khi có dòng trong `ledger.md` của bài 01. Các liên kết `[claude](…)` và `[platform.claude](…)` là citation do Perplexity gắn, chưa được mở và thẩm định. Đáng chú ý: mọi citation về bài gốc trỏ `claude.com/blog/...`, trong khi site đang dẫn `claude.dev/blog/...` (`docs/07` §1 mục 3 vẫn ghi mở).

---

# 6. The 80% System Prompt Reduction: What Actually Changed?

*Research memo — 13 November 2026.*

Anthropic’s original claim was narrower than “Claude needs 80% less prompting”: it said it removed **over 80%** of Claude Code’s system prompt for models “like Claude Opus 5 and Claude Fable 5,” with “no measurable loss on our coding evaluations.” The announcement concerns a product-owned prompt inside Claude Code—not all Claude prompts, all context, or an equivalent reduction in cost. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

The useful lesson is not to eliminate instructions. It is to remove obsolete behavioral scaffolding, resolve contradictions, and place information in the layer where it belongs.

## 1. Verification: the announcement and its limits

The primary source is *The new rules of context engineering for Claude 5 generation models*, published on 24 July 2026 by Thariq Shihipar, an Anthropic member of technical staff. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

| Question | What the original source establishes |
|---|---|
| Exact claim | “We removed over 80% of Claude Code’s system prompt for models like Claude Opus 5 and Claude Fable 5 with no measurable loss on our coding evaluations.” |
| What was reduced? | Claude Code’s product system prompt. The article also discusses reorganizing context into skills, tool descriptions, memory and references. |
| Which models? | Opus 5 and Fable 5 are explicitly named. The article does not establish an identical result for every Claude model. |
| Which product surface? | Claude Code. It offers lessons for custom API harnesses, but does not report the same experiment for Claude Chat, Cowork or every API application. |
| Comparison baseline | The earlier Claude Code system prompt. Exact baseline version, absolute token counts and full before/after prompts are not provided. |
| Performance measured | Anthropic’s coding evaluations. Task breakdown, sample size, confidence intervals and evaluation sensitivity are not disclosed in the article. |
| Economic measurement | No accompanying percentage reduction in total tokens, inference cost, latency or infrastructure usage is reported. |

All scope statements above come from the original announcement. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

### What cannot be concluded

“No measurable loss” does not mean:

- Performance was identical on every task.
- Quality improved because the prompt became shorter.
- Reliability, safety and approval compliance were unchanged across all environments.
- Users should delete 80% of their own `CLAUDE.md`.
- Total request context or task cost fell by 80%.

The article does not publish enough evaluation detail to reproduce the result independently. Commentary repeating the announcement is secondary interpretation, not independent replication. One later review explicitly notes the lack of a comparable public external ablation. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

A secondary article supplies approximately “800 tokens to 164,” but those absolute counts are absent from the primary announcement. They should not be treated as verified measurements of the complete system prompt. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

## 2. Technical: less scaffolding, different context architecture

Anthropic describes six changes. Some remove instructions; others relocate information rather than eliminate it. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

### Before/after conceptual comparison

| Earlier approach described by Anthropic | Newer approach | Responsibility that remains |
|---|---|---|
| Broad, rigid rules for avoiding older-model failures | Let the model use local context and judgment | Explicit requirements and genuine restrictions |
| Tool-use examples embedded in prompts | More expressive interfaces and schemas | Clear parameters, valid states and errors |
| Review and verification instructions loaded upfront | Load specialized skills when needed | Reliable skill discovery and acceptance criteria |
| Tool guidance repeated in several places | Put tool-specific guidance in tool descriptions | One coherent instruction source per concern |
| User manually saves accumulated knowledge into `CLAUDE.md` | Auto memory supplements durable context | Correcting stale or incorrect memory |
| Primarily Markdown plans/specifications | Rich references: tests, code, HTML artifacts and rubrics | Accurate, accessible references |

This table summarizes the vendor’s reported design changes, not universal replacements that have been independently proven superior. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

### Capability improvements versus architectural improvements

Anthropic attributes part of the reduction to better judgment in newer models. Its concrete example replaces absolute bans on comments and documentation with:

> “Write code that reads like the surrounding code: match its comment density, naming, and idiom.” [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

That compresses many generic rules into a contextual objective. It works only when surrounding conventions are available and appropriate.

The article also describes a different source of improvement: removing conflicts. Its internal transcripts contained overlapping messages such as “leave documentation as appropriate” and “DO NOT add comments” across system prompts, skills and user requests. Anthropic says resolving these conflicts required additional model reasoning. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

However, the announcement provides no ablation separating the contributions of:

- Better underlying model capability.
- Reduced contradiction.
- Removed repetition.
- Deferred loading.
- Better tool interfaces.
- Information moved into other context sources.

Therefore, “the model internalized 80% of the prompt” would be an unsupported interpretation.

### Internal reasoning: plausible explanation, limited measurement

The source reports that contradictory instructions make Claude “think more carefully” before acting. That supports the hypothesis that cleaner instructions can reduce unnecessary reasoning. It does not quantify reasoning-token savings or reveal a measured internal mechanism. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

The changing role of the system prompt is more concrete: Anthropic says it should define the product context and what the agent is doing. Specialized procedures can live elsewhere, provided the agent can find them when needed. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

## 3. Economics: prompt length is only one component

### Token consumption

A smaller always-loaded prompt can reduce repeated input. But task-level savings depend on what happens next:

- Some removed text may return through retrieved skills or tool definitions.
- Search and retrieval introduce their own calls.
- Better judgment might reduce retries—or allow longer exploration.
- Model output, tool results and accumulated history may outweigh the original prompt.

The announcement does not measure these downstream effects. The reduction applies to one component, not necessarily the entire workflow. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

### Prompt caching changes the arithmetic

Anthropic’s API caches reusable prefixes spanning tools, system instructions and messages. Cache reads are cheaper than ordinary input, but cache writes have a premium; exact-prefix matching, cache lifetime and configuration affect reuse. Cached content still counts as input context. Caching does not reduce output generation. [platform.claude](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

Consequently:

| Situation | Economic implication |
|---|---|
| Long prompt, cold requests | Removing unnecessary input may produce meaningful savings. |
| Long prompt, consistent cache hits | Marginal savings from shortening the prompt can be smaller. |
| Information moved into on-demand skills | Savings depend on how often those skills are loaded and retrieval overhead. |
| Short prompt, more retries | Total cost may increase despite lower initial input. |
| Prompt changes frequently | Cache invalidation can erode expected savings. |

These are implications of the documented caching mechanism, not measured outcomes of the 80% experiment. [platform.claude](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

### Latency and infrastructure

Less uncached input processing can plausibly improve time to first token and reduce resource demand. But an agent’s wall time also includes reasoning, tool execution, external services, retrieval and retries. Anthropic’s caching documentation supports reduced prefix-processing time; the prompt-reduction announcement supplies no specific latency or infrastructure result. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

### Business incentives: inference, not disclosed rationale

A provider could benefit from:

- Lower serving cost at scale.
- More useful work within subscription quotas.
- Easier maintenance of model-specific prompts.
- Fewer contradictory product behaviors.
- Better perceived responsiveness.

These are plausible business incentives. The original article does not establish them as the motivation for this particular change.

## 4. Practical performance: what changed, and what did not?

The measured claim is preservation of aggregate performance on undisclosed coding evaluations. The article also supplies concrete design examples, but does not publish customer-wide evidence that projects finished faster, required fewer interventions, or produced fewer regressions. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

What remains necessary:

| Still explicit | Why shortening prompts does not remove it |
|---|---|
| Objective and deliverable | The model cannot infer an unstated business goal reliably. |
| Acceptance criteria | “Looks good” and “meets requirements” are different standards. |
| Non-obvious project constraints | Local exceptions may not be inferable from surrounding code. |
| Authoritative context and current facts | Capability does not provide access to missing information. |
| Tools and environment | Instructions cannot substitute for actual access or execution. |
| Permissions and approval boundaries | Judgment does not create user authorization. |
| Verification requirements | Removing boilerplate is different from eliminating checks. |

These are recommended design requirements. Importantly, Anthropic did not describe abandoning verification: it moved review and verification into selectively loaded skills and discussed test suites and verifier rubrics as richer references. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

A useful distinction is:

- Redundant exhortation: “Be extremely careful; verify everything repeatedly.”
- Operational requirement: “Run the migration tests and report results. Do not modify production.”

The first is a candidate for simplification. The second defines observable completion and authority.

## 5. Likely direction of harness design

The following separates documented changes from forward-looking inference.

| Responsibility | Documented direction | Likely implication |
|---|---|---|
| Routine behavioral judgment | Greater reliance on model judgment | Less generic micromanagement |
| Tool operation | Guidance moved into tool definitions; schemas convey behavior | Better interfaces can replace some prose |
| Specialized procedures | Skills and deferred tool loading | Smaller always-loaded context, with discovery becoming critical |
| Personal/project continuity | Auto memory alongside instructions | Less manual note-taking, but a continuing need for correction |
| Task specifications | Code, tests, artifacts and rubrics | More executable or inspectable definitions of success |
| Permissions and accountability | Not evaluated by the 80% claim | Should remain enforced by the harness and explicit approval policy |
| Multi-agent orchestration | Not established by this experiment | Must be justified separately by measured workflow benefits |

The first five directions are described in the announcement. The implications and recommendations are analytical conclusions; the article does not prove a single optimal architecture. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

Progressive disclosure also creates a new failure mode: information no longer loaded upfront can be missed. A shorter prompt is successful only if relevant skills, references and restrictions remain discoverable and applied.

For No Babysitting, a sensible separation is:

```text
Model capability → routine judgment
Structured context → task-specific knowledge
Tools → execution and observable results
Memory → continuity, not authority
Harness → permissions, budgets, state and escalation
Human → consequential approval and unresolved value judgments
```

This is a proposed architecture, not a description of guarantees already provided by Claude Code.

## 6. Recommendations for ordinary users

### Simplify these habits

- Remove repeated generic commands such as “be smart,” “do not make mistakes” and “always be thorough.”
- Stop carrying forward every workaround developed for an older model.
- Avoid prescribing every intermediate step when only the outcome matters.
- Do not paste the entire project history when a current brief and relevant references suffice.
- Use examples when they clarify a real ambiguity—not merely because every prompt template includes examples.

These recommendations follow the article’s direction, but should be tested on the user’s actual tasks. The source does not show that examples or detailed procedures are universally harmful. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

### Keep these explicit

A compact working prompt can state:

```text
Goal:
Deliverable:
Relevant sources or files:
Constraints and non-obvious requirements:
Definition of done:
Allowed actions:
Actions requiring approval:
When to stop or ask:
```

For example:

> Fix the CSV import regression. Preserve the public API and support the documented file formats. Use the failing fixture and import tests as acceptance criteria. You may edit the working branch and run local tests; ask before adding dependencies or changing the schema. Report the changes, test results and unresolved risks.

That is concise because it avoids generic coaching—not because it omits requirements.

## 7. Recommendations for power users and agent builders

### Structure context by function

| Layer | Recommended contents |
|---|---|
| Stable system instructions | Product role, operating contract and essential boundaries |
| Tool definitions | Parameters, side effects, error semantics and valid usage |
| Repository instructions | Non-obvious conventions, critical commands and gotchas |
| Skills | Task-specific procedures loaded when relevant |
| References | Source documents, code, tests, designs and rubrics |
| Memory | Useful continuity with scope and correction mechanisms |
| Runtime state | Completed actions, pending approvals, budgets and recovery checkpoints |

This allocation extends Anthropic’s documented architecture into a practical design recommendation. It should not be interpreted as permission to defer critical restrictions into a file the agent might never read. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

### Simplify through controlled ablation

1. Establish a baseline on representative tasks.
2. Remove one category of instructions at a time.
3. Test quality, cost, wall time, intervention burden and permission compliance.
4. Inspect failures—not just aggregate pass rate.
5. Restore concise instructions for repeated, observed failures.
6. Repeat when changing the model, tools or harness.

Do not target an arbitrary 80% reduction. Target unnecessary instructions while preserving required behavior.

### Do not infer autonomy from a shorter prompt

Prompt reduction does not establish that an agent can:

- Detect all consequential mistakes.
- Reliably retrieve every needed instruction.
- Decide what the user would authorize.
- Operate safely with unrestricted tools.
- Replace independent evidence or human review.

The relevant No Babysitting principle is **less micromanagement, not less control**: reduce obsolete instructions about how to think, while keeping outcomes, evidence, permissions and escalation conditions explicit.

## Bottom line

Anthropic documented a substantial reduction in a particular Claude Code system prompt while retaining measured coding performance on its internal evaluations. It did not demonstrate an 80% reduction in all context, cost or need for guidance. [claude](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models)

The strongest practical conclusion is that context engineering is changing location and form: less repetitive prose, more coherent instructions, expressive tools, selectively loaded procedures and inspectable references. Prompting is not becoming obsolete; its job is becoming more precise.
