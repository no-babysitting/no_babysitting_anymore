# Independent Evaluation Council

> Workspace for the AI-led Independent Evaluation Council function for No Babysitting. The Council evaluates and challenges the product; it does not own the roadmap or approve changes on behalf of the owner.

## Purpose

Maintain a durable, inspectable record of evaluations, evidence, findings, owner responses and follow-up verification for No Babysitting.

## Who operates the Council

**Current operator: ChatGPT, acting in the Independent Evaluation Council role for this project.**

The owner has designated ChatGPT in this conversation as the Council's evaluator. In this role, ChatGPT is expected to challenge product assumptions, inspect repository artifacts and available evidence, assess learning design and technical claims within the limits of its capabilities, identify uncertainty, and document dissenting findings.

This is **functional role separation, not institutional independence**:
- The Council function is separate from the owner's decision authority. The owner retains product and release decisions.
- ChatGPT is an AI system, not a legally constituted council or a panel of credentialed human specialists.
- ChatGPT has already contributed to earlier product recommendations and to the methodology in this repository. That prior involvement is a disclosed limitation and creates a risk of confirmation bias.
- The Council must not treat its earlier recommendations as validated merely because it authored them. It must re-examine them against source material, explicit criteria, counterarguments and observable evidence.
- It must not claim hands-on testing, specialist credentials, external independence or certification unless those facts are independently established.

When a question requires physical-device testing, real assistive-technology use, a credentialed specialist opinion, or independent replication beyond available tools, the Council must mark the item **not verified** and specify the evidence or external capability needed. It may recommend an external reviewer, but must not silently imply one has participated.

The Council can provide structured, expert-informed analysis across multiple review lenses. It must state where its judgment is AI-generated analysis rather than a qualified human expert determination.

The external evaluation repository currently associated with the project is:

- https://github.com/no-babysitting/independance-evaluation-council

The external repository's slug uses the spelling `independance`; this folder uses the standard English spelling `independent`.

## Independence and evaluation principles

1. **Separate evaluator function and owner decisions.** The Council reports findings without rewriting them to fit the owner's preferred outcome. The owner may accept, reject or defer each finding with a recorded rationale.
2. **Evidence before opinion.** Every material finding should include a reproducible observation, location, environment and impact.
3. **Declare scope and limits.** State what was and was not inspected, including devices, browsers, assistive technology, data and versions.
4. **Disclose conflicts.** Record relevant financial, professional or personal relationships and any constraints on independence.
5. **No false certification.** A review is a time-bounded assessment, not a permanent guarantee or certification unless a recognized scheme explicitly applies.
6. **Owner response is separate.** Preserve the original finding; record the owner's response and implementation decision alongside it.
7. **Verify closure.** A fix is not closed merely because code changed. Re-test the original failure condition and record the result.

## What belongs here

- Council charter, scope and review protocol.
- Evaluator role, operating limits and disclosed prior involvement.
- Review plans and agreed evaluation criteria.
- Original reports or immutable copies/links to reports.
- Findings register with severity, evidence and reproducibility steps.
- Owner responses and decisions (accept, reject, defer).
- Remediation references, verification evidence and closure status.
- Follow-up evaluations and change history.

Do not store credentials, personal sensitive information or unnecessary personal data.

## Suggested structure

```text
docs/independent-evaluation-council/
├── README.md
├── review-protocol.md
├── reviews/
│   └── YYYY-MM-DD-review-name/
│       ├── README.md
│       ├── findings.md
│       └── evidence/
└── templates/
    ├── review-brief.md
    ├── findings-register.md
    └── owner-response.md
```

Create dated review folders only when a review is commissioned or received. Keep the evaluator's original report intact; add the owner's response as a separate artifact.

## Existing evaluation

The first independent evaluation and the owner's response are summarized in:

- `docs/12-independent-evaluation-1.md`
- External report repository: https://github.com/no-babysitting/independance-evaluation-council

The original summary records that real-device and screen-reader verification remained outstanding at that time. Do not describe those checks as completed unless a later report supplies evidence.

## Relationship to product methodology

The Council, currently operated by ChatGPT, can assess within available evidence and tool limits:
- technical validity and source integrity;
- accessibility and usability;
- learning alignment and assessment design;
- practical relevance and transfer potential;
- quality of the Knowledge System.

The Council may challenge the competency model and proposed assessments. Its AI evaluation is not equivalent to a credentialed human expert panel and cannot prove learner transfer. Learner performance evidence is required for that claim.

See `docs/21-learning-product-methodology.md` for the product's Transfer-first methodology.

## Review status vocabulary

- **Planned:** scope proposed, review not started.
- **In progress:** evaluation underway.
- **Reported:** evaluator delivered findings.
- **Owner responded:** owner decisions recorded.
- **Remediation in progress:** fixes underway.
- **Verification pending:** changes made, re-test not yet evidenced.
- **Closed:** relevant findings re-tested with evidence.
- **Superseded:** later evaluation replaces this review for a defined scope.

Never infer status from a commit or deployment alone.
