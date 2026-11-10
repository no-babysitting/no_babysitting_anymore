# Independent Evaluation Council — Review Protocol

## 1. Commissioning brief

Every review starts with a written brief containing:

- product/version/commit and review date;
- review purpose and decisions the review should inform;
- target audience and usage context;
- exact scope and explicit exclusions;
- relevant standards, source documents and acceptance criteria;
- environments, devices, browsers and assistive technologies available;
- evaluator identity/role and conflict-of-interest declaration;
- deliverables, format and expected date.

The owner may explain product intent and answer factual questions. The owner must not prescribe findings or require favorable conclusions.

## 2. Review lenses

Choose only the lenses relevant to the commissioned scope:

| Lens | Typical questions |
|---|---|
| Learning / instructional design | Are outcomes observable? Do activities teach them? Does assessment measure the intended capability? |
| Agentic AI / technical practice | Are claims accurate and current? Are workflows feasible? Are permissions, verification and failure handling sound? |
| Product / UX | Can target users find and complete tasks? Is the architecture coherent? Are interactions understandable? |
| Accessibility | Is content perceivable, operable and understandable with relevant assistive technology and settings? |
| Content / research integrity | Are claims sourced, versioned and distinguished from hypotheses or opinion? |

A reviewer should not claim expertise outside their demonstrated scope. Use multiple reviewers when one person cannot credibly cover the required lenses.

## 3. Evidence requirements

For each finding, record:

- unique ID;
- severity;
- affected URL, file, chapter, component or line/section;
- environment and version;
- exact steps to reproduce;
- expected behavior;
- observed behavior;
- evidence (screenshot, recording, DOM/ARIA snapshot, output, source or test log);
- impact on the learner or product;
- confidence and limitations;
- recommended correction, if known.

Distinguish direct observation from inference. Label uncertain findings and state what would resolve the uncertainty.

## 4. Severity

- **Critical:** materially false, unsafe, inaccessible in a blocking way, or creates a serious risk.
- **Major:** blocks an important task or learning outcome, or causes substantial misunderstanding.
- **Minor:** limited clarity, consistency, discoverability or usability issue.
- **Observation:** useful evidence or design note without a demonstrated defect.
- **Recommendation:** optional improvement whose value still needs validation.

Do not inflate severity to increase influence. Do not average away Critical findings with positive scores.

## 5. Review scoring

When a score is useful, use a 1–4 anchored scale:

1. Fails / serious issue.
2. Partially meets; significant revision required.
3. Meets the stated criterion.
4. Strong and repeatable example.

Every score must be supported by findings or explicit evidence. A score without an explanation is not actionable.

## 6. Independence and conflicts

Reviewers disclose relevant:
- employment, consulting or financial relationships;
- ownership or contribution to the reviewed work;
- close personal relationships with decision-makers;
- incentives tied to a particular outcome;
- limitations imposed on access or reporting.

A conflict does not automatically disqualify a reviewer, but it must be visible and managed. Where material, use a second reviewer or narrow the review scope.

## 7. Reporting

A report should contain:

1. executive summary;
2. scope, method and environment;
3. what was inspected and not inspected;
4. findings ordered by severity;
5. strengths and effective practices;
6. limitations and unresolved questions;
7. recommended next steps;
8. evidence appendix and reproducibility details.

Preserve the evaluator's original report. Do not silently edit it after delivery.

## 8. Owner response

For each finding, the owner records one decision:

- **Accept:** will address it.
- **Partially accept:** agrees with part of the finding; explain the boundary.
- **Reject:** explain the evidence or product decision supporting rejection.
- **Defer:** retain it with rationale, risk and a review trigger.

Record:
- decision owner;
- rationale;
- planned action or reason for no action;
- linked issue/PR/commit;
- verification method;
- status and date.

The owner's response must not overwrite the evaluator's original finding.

## 9. Closure and re-evaluation

A finding can be marked Closed only when:
- the correction is identifiable;
- the original reproduction steps have been re-run;
- the relevant environment is recorded;
- the result is evidenced;
- any residual limitation is documented.

If the original environment is unavailable, mark the finding as partially verified or verification blocked — not closed.

Re-evaluate after material changes to the relevant product surface, content, technical behavior or target audience.

## 10. Learning-product review addendum

For learning-related reviews, inspect the chain:

**Competency → Learning outcome → Learning activity → Evidence → Assessment task → Rubric**

Ask:
- Is the outcome observable?
- Does the activity give the learner a chance to develop it?
- Does the task elicit the intended behavior?
- Does the rubric distinguish guided execution from independent performance?
- Is the task genuinely new, or does it reproduce the lesson example?
- Are claims about transfer stronger than the evidence allows?

Expert review can assess the quality of this chain. Only learner performance on appropriate tasks can provide direct evidence of transfer.
