# Memo 4 · Perplexity: chọn model và effort (nguyên văn)

> Nguồn: kết quả Perplexity cho prompt 4 (`02-chatgpt-prompts-4-5-6.md`), chủ dự án dán vào phiên Claude Code ngày 13/11/2026.
> Trạng thái: **nguyên văn, chưa chỉnh sửa. Mặc định mọi số, giá, model và khẳng định là UNVERIFIED** cho tới khi có dòng trong `ledger.md` của bài 03. Các liên kết dạng `[platform.claude](…)` là citation do Perplexity gắn, chưa được mở và thẩm định.
> Điểm cần lưu ý ngay: memo tự "sửa" mức effort mặc định của Fable thành `high`, trong khi brief 01 ghi `medium`. Phải mở docs để quyết.

---

# 4. Model Selection & Effort Orchestration: Intelligence at the Right Cost

*Research memo — 13 November 2026. Availability below means documented by the provider, not confirmed for every account, region, or workspace.*

The practical default is one capable model at moderate effort, with tool-based verification and bounded escalation. Add dynamic routing only when a workflow contains substantially different kinds of work and the savings exceed routing, handoff, and verification overhead.

For **No Babysitting**, the objective is not maximum autonomy. It is minimum unnecessary intervention within explicit user authority: agents handle reversible execution and recoverable problems; people retain consequential decisions, approval boundaries, and accountability.

## 1. Verified model landscape

Prices are standard API USD per million input/output tokens, before caching, tools, taxes, and other modifiers. Capability descriptions are vendor positioning—not independent rankings.

### Claude

| Current model | Documented positioning | API input / output | Effort controls and API default |
|---|---|---:|---|
| Haiku 5.5 | High-volume classification, extraction, routing and latency-sensitive work | $0.10 / $0.50 up to 100K prompt tokens; $0.50 / $2.50 above 100K | `low`, `medium`, `high`, `xhigh`, `max`; default `medium` |
| Sonnet 5.5 | Balance of speed and intelligence | $2 / $10 | Same five levels; default `high` |
| Opus 5.5 | Long-running agentic coding and knowledge work | $4 / $20 | Same five levels; default `medium` |
| Fable 5.2 | Demanding reasoning and long-horizon agentic work | $8 / $40 | Same five levels; default `high` |

These models, prices, and effort settings are listed in Anthropic’s current documentation. Opus and Fable have always-on adaptive thinking. Anthropic recommends Sonnet `medium` for well-specified agentic tasks and Fable `high` as its starting point; it reserves Fable `max` primarily for ceiling measurement or unusually cost-insensitive work. [platform.claude](https://platform.claude.com/docs/en/about-claude/pricing)

Important correction to the earlier discussion: Fable’s documented API default is `high`, not `medium`. Product defaults must be checked separately. Effort is a behavioral signal affecting thinking, responses, and tool calls—not a strict token budget. [platform.claude](https://platform.claude.com/docs/en/build-with-claude/effort)

### OpenAI / ChatGPT

| Current API model | Documented positioning | API input / output | Supported reasoning effort |
|---|---|---:|---|
| GPT-6 Luna | Focused, high-volume work | $0.10 / $0.50 | `none`, `low`, `medium`, `high`, `xhigh`, `max` |
| GPT-6.1 Terra | Visual reasoning, computer use and natural writing | $1 / $5 | `none`, `low`, `medium`, `high`, `xhigh`, `max` |
| GPT-6.1 Sol | Complex coding and professional work at lower cost than Astra | $2 / $10 | `low`, `medium`, `high`, `xhigh`, `max`; default `medium` |
| GPT-6 Astra | Most demanding reasoning, coding, research and document work | $10 / $50 | `low`, `medium`, `high`, `xhigh`, `max` |

The API catalog documents text/image input, text output, and tool capabilities for these models. Long-context requests can have higher rates: Astra and Sol documentation specifies pricing increases above 272K input tokens, so the headline rate is not always the effective rate. [developers.openai](https://developers.openai.com/api/docs/models)

ChatGPT is not a transparent mirror of the API catalog:

- ChatGPT’s GPT-6 picker uses Sol for Instant through Extra High, while Pro uses Astra.
- GPT-6.1 Sol is separately available in Work and Codex; GPT-6.1 Terra is available there but not in ordinary Chat.
- Availability, fallbacks, and allowances depend on plan and workspace. Chat, Work, and Codex have separate usage rules. [help.openai](https://help.openai.com/en/articles/20001354)

Consequently, “Pro” in ChatGPT can mean a different model—not merely more reasoning effort on the same model.

### Gemini

| Current model | Documented positioning | Standard API input / output | Thinking controls |
|---|---|---:|---|
| Gemini 4 Hydrogen | Everyday coding and agentic execution | $1.50 / $7.50 | `low`, `medium`, `high`, `xhigh`; default `high` |
| Gemini 4 Argon | Efficient frontier reasoning for coding and complex work | $2 / $10 through 30 Nov; $4 / $20 from 1 Dec | `low`, `medium`, `high`; default `medium` |
| Gemini 4 Carbon | Deep reasoning, difficult engineering and autonomous multi-step work | $2 / $10 through 30 Nov; $4 / $20 from 1 Dec | `low`, `medium`, `high`; default `medium` |

Google explicitly includes thinking tokens in output billing. Hydrogen has free API access subject to limits; Carbon and Argon do not. Free and paid data-use terms differ, making privacy a selection constraint rather than an afterthought. [aistudio.google](https://aistudio.google.com/docs/pricing)

Antigravity’s Orchestrator is a product-level orchestration mode, not another standalone model. Google documents bidirectional switching between Carbon and Hydrogen during a task. Access depends on subscription; this should not be assumed to be identical to a raw Gemini API call. [antigravity](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity)

### Product/API differences that change the decision

Compare three separate objects:

1. Model capability: what the underlying model can do.
2. Agent product: tools, memory, context management, sandbox, approvals and verification.
3. Commercial surface: subscription quota, credits, API tokens, runtime and tool charges.

API documentation exposes explicit effort controls and usage billing; ChatGPT and Antigravity add product-specific model selection, quotas, and workflows. Do not estimate subscription consumption directly from API token prices. Likewise, a model recommendation does not imply that every chat UI exposes that model or effort setting. [platform.claude](https://platform.claude.com/docs/en/about-claude/pricing)

## 2. Task-to-model selection matrix

The following is a proposed starting policy, not a benchmark-derived ranking. Alternatives in a row are candidates to evaluate—not claims of equivalent quality or compute. Model roles and supported controls are grounded in the documentation above. [platform.claude](https://platform.claude.com/docs/en/build-with-claude/effort)

| Task type | Starting candidates | Starting effort | Verification / escalation |
|---|---|---|---|
| Simple execution: tagging, extraction, formatting | Haiku; Luna; Hydrogen | Haiku/Luna `low`; test Hydrogen `low` | Schema, completeness, sampled accuracy. Use deterministic code instead where sufficient. |
| Routine coding: scoped bug, tests, small feature | Sonnet; Sol; Argon or Hydrogen | `medium` | Tests, lint, diff review. Raise effort if failures reveal reasoning gaps. |
| Difficult coding: root cause, architecture, migration | Opus/Fable; Astra; Carbon | Opus `medium`/`high`; Fable/Astra/Carbon `high` | Reproduction, integration tests, rollback plan. Escalate unresolved assumptions rather than repeatedly patching symptoms. |
| Research: collect and summarize sources | Sonnet; Sol; Argon | `medium`, with retrieval tools | Claim-to-source ledger, date checks and contradiction checks. Stronger reasoning cannot substitute for missing evidence. |
| Planning: dependencies, options, trade-offs | Opus; Sol/Astra; Argon/Carbon | `medium` or `high` according to ambiguity | Explicit assumptions, constraints and decision criteria. Human resolves preference/value conflicts. |
| Complex reasoning | Fable; Astra; Carbon | `high`; selectively test higher supported levels | Independent calculation, counterexamples or external evidence. Increase effort only if it improves accepted outcomes. |
| Verification | Deterministic checks first; then Sonnet/Sol/Argon or stronger reviewer | `medium` for bounded checks; `high` for consequential review | Reviewer receives acceptance criteria and artifacts, not just the executor’s explanation. |
| High-risk decisions | Capable model for analysis, not final authority | Usually `high`, but effort is secondary | Qualified human review, authoritative evidence and explicit approval before consequential action. |

Two distinctions matter:

- Complexity determines how much reasoning may be useful.
- Risk determines authority, required evidence, and approval.

A simple bank transfer can require approval; a difficult read-only analysis can run autonomously.

## 3. One model or dynamic routing?

### Prefer one capable model when

- The task is short or tightly coupled.
- Context continuity matters more than marginal token savings.
- Work does not separate naturally into different roles.
- Routing infrastructure would create another system to maintain.
- You have not measured an advantage from routing.

For individual knowledge workers, this is the best baseline: one generalist, moderate effort, a clear definition of done, and a bounded retry policy.

### Use dynamic routing when

- A long workflow alternates between difficult judgment and routine execution.
- Many independent items justify a cheaper worker.
- A specialist adds a demonstrated advantage, such as visual interaction.
- The system can detect failure and preserve state reliably.
- Data policy permits each destination model/provider.

A useful decision rule is:

\[
\text{Routing is worthwhile when expected savings and quality gains}
>
\text{routing, handoff, verification and failure costs}.
\]

This is a design criterion, not an empirically established threshold.

Google provides a concrete vendor example: Carbon explores and plans, Hydrogen executes, and Carbon returns when execution hits friction. Google reports near-Carbon success with 24% less quota and 19% faster completion on Terminal-Bench 4.1. Treat that as a vendor benchmark claim—not a general API-cost guarantee or independent finding. [antigravity](https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity)

Routing should respond to observable signals—failed checks, contradictions, repeated lack of progress—not merely the model saying it feels uncertain.

## 4. A No Babysitting orchestration policy

The following is a recommended governance design, not a claim that every product enforces it.

### Establish an execution contract

Before work starts, specify:

```text
Objective and acceptance criteria
Allowed data, tools, folders and destinations
Permitted reversible actions
Actions requiring approval
Cost and time ceiling
Retry and escalation limits
Required completion evidence
Named human owner
```

Standing authorization can cover routine, narrowly scoped work. It should not become blanket permission to publish, spend, delete, or change access.

### Separate three gates

| Gate | What it answers | Who controls it? |
|---|---|---|
| Quality gate | Is the result sufficiently correct? | Tests, evidence and reviewer |
| Authority gate | Is this action permitted? | User policy and approval |
| Resource gate | Is more time/spend justified? | Budget policy; human for exceptions |

Passing tests does not authorize deployment. A stronger model does not acquire broader permissions.

### Approval and autonomy boundaries

| Action class | Recommended policy |
|---|---|
| Read approved sources; analyze; draft; run sandbox tests | Autonomous within scope and budget |
| Edit a working copy; generate reports; prepare a patch | Autonomous when reversible, isolated and logged |
| Send email/messages; publish; submit applications; create commitments | Approve exact recipient, content and action before execution |
| Purchase; transfer funds; execute trades; sign contracts | Explicit transaction-specific approval; qualified review where appropriate |
| Delete originals; deploy to production; migrate live data; change permissions | Explicit approval with impact, backup/rollback and verification |
| Send sensitive data to a new provider or broaden tool access | Stop for authorization before disclosure/access |
| Medical, legal, financial or other consequential decisions | Agent supports analysis; accountable human or qualified professional decides |

“Mandatory” here means mandatory under the proposed No Babysitting policy. Legal obligations additionally depend on jurisdiction, sector, and organizational rules.

Approval should bind to the exact action. Changed recipients, amounts, content, scope, or permissions require renewed approval. Retries must not duplicate an already completed external action.

### Escalate without making the user debug the agent

Use two escalation channels:

- Technical escalation: improve evidence, change approach, raise effort or switch model within the existing authorization.
- Authority escalation: ask the user to resolve ambiguity, approve consequences, expand scope or increase budget.

A reasonable initial retry policy is one evidence-based retry, then one model/effort escalation; calibrate it to the task rather than treating it as universal.

An escalation packet should contain:

1. What has been completed and verified.
2. The precise blocker and supporting evidence.
3. Attempts already made.
4. Recommended next action and alternatives.
5. Incremental cost/risk.
6. The single decision required from the user.

Stop rather than silently lowering standards when budget, evidence, or permissions are insufficient.

## 5. Practical orchestration patterns

### Pattern A — Capable generalist with bounded escalation

Best for personal research, writing, spreadsheets and ordinary coding.

```text
Generalist at moderate effort
    → deterministic checks / evidence checks
    → accept
    OR targeted retry
    → stronger reasoning if justified
    → human only for unresolved judgment or approval
```

Start with Sonnet/Sol/Argon-class candidates; use Opus/Fable/Astra/Carbon when the task or measured failure rate justifies them. This is a selection proposal based on documented positioning, not a cross-vendor ranking. [platform.claude](https://platform.claude.com/docs/en/build-with-claude/effort)

### Pattern B — Planner, worker, verifier

Best for larger coding changes or repeated document/data work.

```text
Capable planner → explicit work packages
Efficient worker → edits / extraction / execution
Verifier → tests + acceptance criteria
Planner → re-plan only when a trigger fires
Human → approve consequential action
```

The handoff should preserve requirements, evidence, unresolved questions, artifact locations, permissions and remaining budget. Repeated full-context transfers can erase the savings.

### Pattern C — Batch triage with exception review

Best for inbox classification, document processing and issue queues.

- Rules handle obvious cases.
- An efficient model processes routine items.
- Ambiguous or failed-validation items go to a capable model.
- Humans see only consequential exceptions and periodic quality samples.

Do not use low effort merely because the worker is cheap: Anthropic explicitly warns that Haiku at `low` can skip searches or checks in long agent prompts. [platform.claude](https://platform.claude.com/docs/en/build-with-claude/effort)

### Pattern D — Research to draft to approved publication

Best for knowledge workers.

1. Collect sources within approved access.
2. Build a claim/evidence ledger.
3. Draft and check factual support.
4. Prepare the final publication artifact.
5. Obtain approval for exact content and destination.
6. Publish once; log the result.

The research and drafting loop can be autonomous. Publication is a separate authority boundary.

## 6. Evidence quality and economic measurement

### What the available evidence supports

| Evidence class | What it establishes | Limitation |
|---|---|---|
| Provider documentation | Model names, supported controls, published prices and product eligibility | Not proof of comparative quality |
| Vendor benchmarks | Performance under the vendor’s chosen evaluation conditions | Harness, task selection and cost assumptions may not match yours |
| Independent evaluations | External performance observations | Must inspect versions, tools, sample size and methodology |
| Your measured workflow | Actual success, cost and intervention burden for your work | Local results may not generalize |

One independent small-sample report tested three office tasks and ten hard-math problems and found Hydrogen’s default office-task cost higher than Argon despite cheaper tokens. That is a useful warning about token price versus task cost, but the sample and source are insufficient for a general ranking. [ranthis](https://ranthis.com/guides/gemini-4-hydrogen)

No workflow measurements were performed for this memo. Accordingly, there is no measured basis here to claim that any model wins at every effort level.

### Measure accepted outcomes, not output volume

Track:

- Accepted-task rate after review.
- API/tool/runtime spend per accepted task, including failed attempts.
- Time to accepted result.
- Human intervention count and review minutes.
- Escaped errors and severity.
- Approval-boundary violations, unauthorized disclosures and duplicate actions.

Keep human time separate from dollar spend unless you explicitly state a conversion rate.

For calibration, run representative tasks from the same starting state, vary one dimension at a time, repeat runs, and log model ID, effort, tools, context/memory, cache state and date. Compare a small number of plausible configurations before building a complex router.

## Bottom line

Adopt a three-tier policy: efficient execution, capable default, exceptional reasoning. Begin with one capable model and add routing where measured results justify it. Use explicit effort settings, because defaults differ; never treat identically named levels as equivalent compute—even between generations of the same family. Anthropic explicitly documents this calibration difference. [platform.claude](https://platform.claude.com/docs/en/build-with-claude/effort)

The core No Babysitting principle is: **escalate intelligence automatically; escalate authority explicitly**. Agents should solve recoverable execution problems without interruption, but they should never convert a model upgrade, successful test, or confident answer into permission to act.
