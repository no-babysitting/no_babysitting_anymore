# 22 · Handoff to Claude — Apply the Transfer-first methodology

You are continuing work in `no-babysitting/no_babysitting_anymore`.

## Outcome

Help the owner turn the approved product direction into an evidence-informed learning product. The North Star is **transfer**: learners should independently design and operate an AI-agent workflow in a work situation they were not directly taught.

The approved architecture is **Hybrid**:
- Learning Path develops capability in a deliberate progression.
- Knowledge System provides just-in-time retrieval through Glossary, Cookbook, Reference and Examples.

The first validation gate is **expert review**. Do not claim that expert approval proves learner transfer.

## Read progressively

Start with:
1. `docs/21-learning-product-methodology.md` — source of truth for this methodology and current hypotheses.
2. `docs/01-PRD.md` — product scope and decisions.
3. `docs/14-content-script-v4.md` — current approved content structure and Six Shifts.
4. `docs/16-writing-guide.md` — language and voice.
5. `docs/17-handoff-prompt.md` — existing content handoff conventions.
6. `docs/18-intro-track-plan.md` and `docs/19-uiux-kaizen-plan.md` — relevant plans; do not assume every proposal in them is approved.
7. `docs/independent-evaluation-council/README.md` and `review-protocol.md` — council workspace and review process.

Read other files only when the task requires them. Follow source links and verify current product behavior before editing technical claims.

## Your first assignment

Do not start by implementing UI, adding animations, expanding the Glossary or rewriting chapters.

First produce a concise **Learning Evidence Blueprint** for the current product:

1. Inspect the existing curriculum and identify where the six proposed competencies are already taught.
2. Map existing chapters and activities to:
   - competency;
   - observable learning outcome;
   - learner activity;
   - expected artifact or behavior;
   - current assessment/evidence;
   - gap or ambiguity.
3. Identify overlap, missing coverage and content that is not connected to an observable outcome.
4. Recommend a representative vertical slice that covers distinct learning archetypes. Do not select chapters merely because they come first in navigation.
5. Draft one novel assessment task for each selected pilot module and a 4-level scoring rubric.
6. Identify what an independent expert should review, and prepare a review packet with source references.
7. Propose a staged implementation plan that distinguishes approved decisions from hypotheses and open questions.

Deliver the blueprint as a Markdown document under `docs/` using the next available number. Do not overwrite existing files.

## Six Shifts — how to work

Apply the Six Shifts as heuristics, not rigid laws:

1. **Bớt luật, tin phán đoán:** understand the outcome, constraints, risk boundaries and definition of done; choose the method yourself and explain material trade-offs.
2. **Bớt ví dụ, thiết kế khuôn:** use competency maps, schemas, rubrics and acceptance interfaces instead of copying examples.
3. **Bớt nhồi, để nó mở dần:** keep this brief focused; read linked documents only when needed.
4. **Bớt nhắc, nói một lần:** use repository source-of-truth documents for durable conventions.
5. **Để Claude tự nhớ:** retain useful local learnings where supported, but never treat unreviewed memory as an approved product decision.
6. **Bớt tả, đưa tham chiếu:** cite exact files, sections, source URLs and evidence in your findings.

Do not confuse reduced instruction with reduced accountability. Preserve explicit acceptance criteria, permission boundaries, source verification and human review.

## Decision and evidence discipline

Label substantive statements and recommendations:
- **Evidence-backed**
- **Expert-informed**
- **Product hypothesis**
- **Design decision**

For each recommendation, state:
- the problem or opportunity;
- supporting evidence or rationale;
- expected effect on learner capability;
- cost and trade-off;
- how it could be tested;
- what result would make you change your mind.

Do not invent research support. Research on learning principles does not automatically validate this exact product design, audience, ASCII treatment, GSAP use or Glossary placement.

## Definition of done

The first assignment is complete when:
- the current curriculum has been mapped rather than guessed;
- every selected pilot outcome is observable;
- assessment tasks genuinely require application beyond copying a lesson example;
- the rubric distinguishes guided execution from independent transfer;
- the proposed expert review has clear scope and review criteria;
- open questions and assumptions are explicit;
- no code or UI has been changed without owner approval.

## Collaboration protocol

- Ask the owner only when a decision materially affects product direction, scope, risk or architecture.
- When a decision is reversible and low-risk, make a reasoned choice and record it.
- Do not silently turn a hypothesis or proposal into an approved requirement.
- Do not optimize for number of features, pages, animations or Glossary entries.
- Prefer the smallest reliable artifact that answers the question.
- Before finishing, perform a blind-spot pass: identify what you did not inspect, what remains uncertain and what evidence is still missing.
- Return a short executive summary, links to artifacts, key decisions, unresolved questions and the next recommended action.
