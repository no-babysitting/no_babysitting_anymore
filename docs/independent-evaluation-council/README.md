# Independent Evaluation Council

> Workspace for independent reviews of No Babysitting. The council evaluates the product; it does not own the product roadmap or approve changes on behalf of the owner.

## Purpose

Maintain a durable, inspectable record of independent evaluations, evidence, findings, responses and follow-up verification for No Babysitting.

The external evaluation repository currently associated with the project is:

- https://github.com/no-babysitting/independance-evaluation-council

The external repository's slug uses the spelling `independance`; this folder uses the standard English spelling `independent`.

## Independence principles

1. **Separate evaluator and owner.** Evaluators should be able to report findings without the owner rewriting or suppressing them.
2. **Evidence before opinion.** Every material finding should include a reproducible observation, location, environment and impact.
3. **Declare scope and limits.** State what was and was not inspected, including devices, browsers, assistive technology, data and versions.
4. **Disclose conflicts.** Record relevant financial, professional or personal relationships and any constraints on independence.
5. **No false certification.** A review is a time-bounded assessment, not a permanent guarantee or certification unless a recognized scheme explicitly applies.
6. **Owner response is separate.** Preserve the original finding; record the owner's response and implementation decision alongside it.
7. **Verify closure.** A fix is not closed merely because code changed. Re-test the original failure condition and record the result.

## What belongs here

- Council charter, scope and review protocol.
- Reviewer profiles and declared conflicts, with only information necessary for transparency.
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

The council's review can assess:
- technical validity and source integrity;
- accessibility and usability;
- learning alignment and assessment design;
- practical relevance and transfer potential;
- quality of the Knowledge System.

The council may challenge the competency model and proposed assessments. It cannot prove learner transfer through expert opinion alone. Learner evidence is required for that claim.

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
