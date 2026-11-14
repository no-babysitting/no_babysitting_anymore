# Council Review #1 — Integrated V4 (PR #17)

- **Review date:** 2026-11-12 (Asia/Bangkok)
- **Status:** Reported
- **Product:** No Babysitting, Integrated V4 learning path and homepage experience
- **Target under review:** PR #17 head `f43931fbadddb22ab7b9927c06898975c01cc323`
- **Merged as:** `4d036fb78040e814944fe0ffc00bde9e6e914629` (PR #17; repository recent-commit result identifies this as latest `main` commit at review time)
- **PR:** https://github.com/no-babysitting/no_babysitting_anymore/pull/17
- **Live site inspected:** https://no-babysitting.github.io/no_babysitting_anymore/
- **Evaluator:** ChatGPT acting in the AI Independent Evaluation Council role

> This is the first Council review of the Integrated V4 experience, not the repository’s first external evaluation. It is a time-bounded AI evaluation, not institutional independence, a credentialed specialist sign-off, or certification. The evaluator previously contributed to product recommendations and methodology; this creates a confirmation-bias risk. Earlier recommendations were rechecked against the repository and live evidence and are not treated as validated merely because the evaluator authored them.

## Executive summary

PR #17 is merged, and the live homepage visibly presents the five-part V4 path and the revised motion-led scenes. The repository’s workflow says merges to `main` build, check, and publish to GitHub Pages. The live page could not be tied to an exact deployment SHA: GitHub returned no workflow runs or combined status for merge commit `4d036fb…`, and the live page exposes no commit identifier.

Within the inspected evidence, the learning architecture has a coherent progression from framing work through execution and verification. The practice page adds three scenarios outside the lesson examples and supplies four-level self-check rubrics. This is well aligned with the transfer-first direction. However, the page explicitly says nobody grades the exercises; there is no learner-performance evidence in the inspected artifacts. The product’s transfer promise therefore remains a hypothesis, consistent with the methodology’s own caveat.

No Critical or Major defect was established from the available evidence. The primary recommendation is to run a small learner pilot and record performance on novel tasks before making outcome claims. Accessibility and runtime behavior also need direct verification beyond this review’s limited browser and repository inspection.

## Commissioning brief and scope

- **Purpose:** Evaluate whether the Integrated V4 preview is coherent and reviewable across learning design, content, information architecture, UI/UX, motion, accessibility considerations, and technical integrity; identify decisions that need evidence before stronger product claims.
- **Audience/context:** The methodology identifies knowledge workers and AI power users as primary audience hypotheses, with developers as a deeper technical audience and leaders/managers secondary. These segments are not yet validated.
- **Inspected surfaces:** PR #17 metadata/diff and changed-file list; methodology and Council protocol; V4 content source; homepage, practice-page, and motion/interaction source; live homepage accessibility tree.
- **Not inspected:** Every live chapter and practice interaction end-to-end; a production build; CI execution; real mobile hardware; Safari; a real screen reader; learner performance; analytics or usability-study data.
- **Environment:** GitHub repository connector; live site opened in the Codex in-app browser. One homepage accessibility-tree snapshot was reviewed. No viewport dimensions, physical-device use, or assistive-technology session were recorded.
- **Relevant criteria:** `docs/independent-evaluation-council/review-protocol.md` §§2–10; `docs/21-learning-product-methodology.md` §§1–7 and 11–15; approved V4 script `docs/14-content-script-v4.md`.
- **Exclusions:** No product implementation changes, product acceptance decision, merge, or certification.

## Evaluation

### Learning architecture and practice — Meets direction; transfer remains unvalidated

The five-part path is presented as an integrated progression. The content model includes work-specific examples, prompts, and interactive choice points. The standalone practice page provides three unfamiliar scenarios, asks learners to produce written work, withholds self-check details until disclosure, and uses four performance levels. These are meaningful design choices aligned with the methodology’s claim → evidence → task approach.

The limit is explicit in the product: the practice page says nobody grades the responses and labels itself a trial with no model answers. A self-check rubric can support reflection, but it cannot establish independent performance or broad transfer. This is not a defect in a preview; it is an evidence boundary that must remain visible.

### Content and research integrity — Generally well traceable in inspected examples

The inspected homepage’s “over 80%” statement links to the primary Anthropic engineering article. The article supports the claim for Claude Opus 5 and Claude Fable 5 and says the change produced no measurable loss on Anthropic’s coding evaluations; the site’s visible claim includes those qualifications. The “unknowns” framework links to Anthropic’s field guide, which supports the map/territory framing, four categories, and before/during/after pattern. The course also labels its central story as fictional in the source content.

This source check covered the inspected claims, not every claim across all five chapters. Technical product behavior can change, so volatile instructions should continue to show source and verification dates.

### Product UX, navigation, and motion — Coherent preview; direct usability evidence is limited

The live homepage exposes a skip link, main landmark, named controls, five chapter destinations, a reduced-motion control, and navigation to practice and reference areas. Its accessibility tree exposes the seven-step workflow as text and controls rather than as canvas-only content. PR #17 narrows pinned scroll distances, adds scene autoplay after a pause, and describes immediate hand-back on user input. The source also disables the autoplay system when reduced motion is active.

These source-level choices are promising, but they do not establish that the motion is comfortable or predictable for target users. The PR description reports Playwright checks at 1440×900 and iPhone 13 emulation, with no console errors, and says Safari was not tested. Those are implementation-reported results, not independently repeated tests in this review.

### Accessibility and technical integrity — Not fully verified

The repository’s deployment workflow defines build, link/JavaScript/overflow/reduced-motion checks, typography checks, and design checks before publication. No matching workflow run or commit status was returned for the merge commit. I did not run a build or test suite. The live homepage’s accessibility tree provides useful evidence of semantic content, but it is not a screen-reader test. No physical device or Safari test was performed.

## Findings and recommendations

### R-01 — Validate transfer with learner performance before making outcome claims

- **Type/severity:** Recommendation (no demonstrated defect)
- **Confidence:** High that the current materials do not establish learner transfer; no conclusion about eventual learner effectiveness.
- **Affected area:** Practice page and transfer-first product promise.
- **Evidence:** [Methodology §1](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/docs/21-learning-product-methodology.md#1-purpose) says completion, enjoyment, and guided practice do not prove transfer. [Methodology §5](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/docs/21-learning-product-methodology.md#5-evidence-centered-design-claim--evidence--task) requires a claim, evidence, and task chain. [Practice page source](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/site/src/pages/thuc-hanh/index.astro) states that nobody grades the exercises and describes a self-check rubric. [Practice scenarios and rubrics](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/site/src/content/practice.ts) include three novel situations and four levels.
- **Observed:** Practice asks learners to solve unfamiliar work scenarios and compare their responses against explicit criteria; the check is self-administered.
- **Expected:** Any public claim that learners can independently transfer the capability should be supported by observed learner work on novel tasks, not inferred from completion or self-rating.
- **Reproduction:** Open the practice page, complete one scenario before expanding “Làm xong rồi · mở phần tự soát,” then inspect the page’s stated scoring conditions and rubric.
- **Impact:** Without learner evidence, the team cannot yet tell whether the tasks elicit independent Level 3 performance or whether rubric language is interpreted consistently.
- **Recommendation:** Pilot the three scenarios with representative knowledge workers. Preserve anonymized task responses, note where participants need hints, and consider a second reviewer on a sample. Report the result as a pilot, not proof of broad transfer.
- **Limitations:** No learner sessions or response data were available. The Council cannot determine effectiveness from the content artifact alone.

### R-02 — Complete direct accessibility and motion verification on target environments

- **Type/severity:** Recommendation (verification pending; no specific accessibility failure established)
- **Confidence:** High that verification is incomplete in this review; low regarding whether an undiscovered defect exists.
- **Affected area:** Homepage scenes, pinned workflow, chapter interactions, and practice disclosure controls.
- **Evidence:** [PR #17](https://github.com/no-babysitting/no_babysitting_anymore/pull/17) reports Chromium desktop and iPhone 13 emulation checks and explicitly says Safari was not tested. [Motion source](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/site/src/scripts/motion.ts) implements reduced-motion and autoplay behavior. [Council protocol §3](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/docs/independent-evaluation-council/review-protocol.md#3-evidence-requirements) prohibits claiming physical-device or screen-reader testing without evidence.
- **Observed:** The live homepage accessibility tree exposes semantic page structure and textual workflow steps. Repository source includes a reduced-motion path and keyboard focus handling for the pinned workflow.
- **Expected:** Reading order, focus, control names, scene hand-back, and static/reduced-motion states remain usable with keyboard and assistive technology on supported browsers and real devices.
- **Reproduction/follow-up:** On a physical iPhone with Safari and on at least one desktop browser, follow the home-to-chapter-to-practice path with keyboard only; repeat with OS reduced motion enabled; then test with a real screen reader. Record browser/device, settings, steps, and evidence.
- **Impact:** A source review and DOM/accessibility snapshot cannot establish the actual experience for people using assistive technology or motion-sensitive users.
- **Recommendation:** Run and document these checks before treating accessibility as verified. Use a qualified accessibility reviewer if a release decision depends on specialist sign-off.
- **Limitations:** No physical device, Safari, or screen reader was used for this review; no CI run was independently confirmed.

## Strengths

- The V4 homepage makes the learning path, duration, chapter count, and primary entry points legible at a glance.
- Practice scenarios are deliberately outside the lesson story, require written decisions, and expose a four-level rubric only after the learner attempts the task.
- The visible source links lead to primary materials for the checked claims; the central fictional case is identified as fictional.
- The motion implementation has an explicit reduced-motion branch and documents the intended user-control behavior.
- PR #17 addresses concrete feedback and includes a scoped test description, while openly disclosing the missing Safari check.

## Limits and unresolved questions

- Exact deployment commit is **not verified**. The live homepage visibly corresponds to the V4 experience, but the deployment workflow produced no run/status in the available connector response and the site has no visible build SHA.
- The live homepage was observed in an in-app browser accessibility tree only; the full site was not traversed and no screenshot evidence was recorded.
- No local checkout of this repository was available in the workspace. Review relied on GitHub-hosted source and PR records.
- No build, automated check, physical-device session, screen-reader session, or learner study was performed by this evaluator.
- The Council is operated by ChatGPT, has prior involvement in the product methodology, and is not a qualified human specialist panel.
- Claims about transfer, accessibility conformance, and production readiness remain outside what this review establishes.

## Overall conclusion

**Review-ready for structured product feedback; not independently validated for learner transfer or fully verified for accessibility/runtime behavior.** PR #17’s merge commit is identified, and the live homepage shows the Integrated V4 experience. The owner retains all product and release decisions. Keep the transfer promise framed as a hypothesis until learner performance evidence exists, and record environment-specific accessibility checks before marking those areas verified.

## Evidence appendix

1. [PR #17 — changes, test description, and Safari limitation](https://github.com/no-babysitting/no_babysitting_anymore/pull/17)
2. [PR #17 head commit — `f43931fbadddb22ab7b9927c06898975c01cc323`](https://github.com/no-babysitting/no_babysitting_anymore/commit/f43931fbadddb22ab7b9927c06898975c01cc323)
3. [Merge commit — `4d036fb78040e814944fe0ffc00bde9e6e914629`](https://github.com/no-babysitting/no_babysitting_anymore/commit/4d036fb78040e814944fe0ffc00bde9e6e914629)
4. [Live Integrated V4 homepage](https://no-babysitting.github.io/no_babysitting_anymore/)
5. [Council review protocol](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/docs/independent-evaluation-council/review-protocol.md)
6. [Transfer-first methodology](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/docs/21-learning-product-methodology.md)
7. [V4 content script](https://github.com/no-babysitting/no_babysitting_anymore/blob/f43931fbadddb22ab7b9927c06898975c01cc323/docs/14-content-script-v4.md)
8. [Practice page and exercise content](https://github.com/no-babysitting/no_babysitting_anymore/tree/f43931fbadddb22ab7b9927c06898975c01cc323/site/src)
9. [Deployment workflow](https://github.com/no-babysitting/no_babysitting_anymore/blob/4d036fb78040e814944fe0ffc00bde9e6e914629/.github/workflows/deploy.yml)

---

Original evaluator report. Owner decisions, remediation, and closure verification should be recorded separately under the Council protocol.