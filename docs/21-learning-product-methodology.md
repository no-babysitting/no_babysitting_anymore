# 21 · Learning Product Methodology — Transfer-first

> **Status:** Product direction approved by the owner; framework and competency map are working hypotheses pending expert review and learner validation.  
> **Decision baseline:** Hybrid architecture · Transfer North Star · Expert review as the first validation gate.  
> **Audience baseline:** Knowledge workers and AI power users are primary hypotheses; developers are a deeper technical audience; leaders/managers are secondary. Validate this segmentation rather than treating it as established fact.

## 1. Purpose

No Babysitting is an Agentic Work field guide that uses Claude Code as its primary implementation platform and example. It should help people move from issuing isolated prompts to designing and operating reliable AI-agent workflows.

**North Star — capability transfer:** a learner can independently frame, delegate, orchestrate and verify an AI-agent workflow in a work situation that was not directly taught.

The product is not successful merely because learners:
- finish the lessons;
- remember terminology;
- enjoy the visual design;
- complete a guided simulator; or
- reproduce a prompt shown in the lesson.

Those are possible supporting signals. The central claim is that learners can recognize and apply relevant principles in a new situation.

### Product promise (working definition)

> No Babysitting helps knowledge workers move from using AI one prompt at a time to designing and operating agentic workflows: framing outcomes, providing context, decomposing work, setting boundaries, orchestrating execution and verifying results — including in situations they have not been shown step by step.

Treat this as a value proposition to validate, not a proven outcome.

## 2. Approved product decisions

| Decision | Current direction | Qualification |
|---|---|---|
| Product architecture | **Hybrid**: Learning Path + Knowledge System | Hybrid is a functional architecture, not merely two equal navigation tabs |
| North Star | **Transfer** | Measure independent performance on novel tasks |
| First validation | **Expert review** | Expert review assesses design quality; it cannot prove learner transfer |
| Positioning | Agentic Work field guide, Claude Code as platform/example | Keep principles portable beyond one vendor |
| Learning outcome | Understand, explain, execute and create usable artifacts | Prioritize observable work products where appropriate |
| Release strategy | Representative vertical slice | Select by learning archetype and competency coverage, not chapter order alone |
| Six Shifts | Design heuristics and content spine | Apply with judgment; do not turn them into rigid laws |
| Visual language | ASCII as identity and explanatory language; GSAP cinematic at selected moments | Visuals and motion must earn their cognitive cost |
| Glossary | Core Knowledge System component | Build useful retrieval and links before scaling entry count |

## 3. Methodological foundation

Use an integrated approach. Do not claim that this combination is one formally standardized methodology.

### Core

1. **Backward Design / Understanding by Design** — define desired capability and acceptable evidence before selecting lessons and activities.
2. **Evidence-Centered Design (ECD)** — connect claims about learner capability to observable evidence and tasks that elicit that evidence.

### Supporting methods

3. **Cognitive Load Theory and Cognitive Theory of Multimedia Learning** — manage intrinsic, extraneous and germane processing; use signaling, coherence, segmentation and meaningful visual-verbal alignment.
4. **Human-Centered Design** — understand learners, their real tasks, constraints and information-seeking behavior.
5. **Iterative prototyping / Design Science orientation** — build artifacts, inspect them against explicit criteria, test with users and revise.

These methods answer different questions:

- Backward Design: What should the learner be able to do?
- ECD: What evidence would justify that claim?
- Instructional design: What experience helps the learner develop that capability?
- Human-centered design: Does the experience fit real people and work?
- Iterative evaluation: What should change based on evidence?

## 4. Capability model — initial hypothesis

Use these six competencies as a starting point for expert review. They are not yet a validated occupational standard.

| Competency | Target capability | Observable evidence |
|---|---|---|
| 1. Task Framing | Convert an ambiguous request into an outcome, scope and acceptance criteria | A concise task brief with explicit definition of done |
| 2. Context Engineering | Select and organize the information an agent needs | A relevant context package with justified inclusions and exclusions |
| 3. Workflow Design | Decompose work and identify sequence, dependencies and human checkpoints | A feasible workflow with dependencies and decision points |
| 4. Tool & Permission Design | Select tools and permission boundaries proportionate to the task and risk | A defensible tool/permission plan; excessive access identified and reduced |
| 5. Orchestration & Recovery | Monitor execution, detect drift and recover from failure | A recovery plan and appropriate intervention in a changed scenario |
| 6. Verification & Handoff | Evaluate output against independent criteria and hand over responsibly | Verification evidence, unresolved-risk notes and a usable handoff package |

Do not elevate Prompt Engineering into a separate top-level competency by default. Prompting is a technique used within task framing, context engineering and orchestration. Revisit this only if evidence shows it deserves an independent competency.

### Proficiency levels

- **Understand:** explain a principle and recognize when it applies.
- **Execute:** apply it with a guide, scaffold or template.
- **Transfer:** independently select and adapt it in a novel situation.

Use four performance levels in assessment:

| Level | Descriptor |
|---|---|
| 1 — Fragmented | Misframes the problem or produces disconnected decisions |
| 2 — Guided | Can perform with prompts, templates or substantial hints |
| 3 — Independent | Produces a coherent, defensible solution in a new task |
| 4 — Adaptive | Adapts to constraints, trade-offs, exceptions and changing conditions |

Level 3 is a plausible v1 target for general knowledge workers. Level 4 may be appropriate for advanced workflow designers. Validate these thresholds with experts; do not assume every learner must reach Level 4 in every competency.

## 5. Evidence-Centered Design: claim → evidence → task

For each important learning outcome, specify:

1. **Claim:** what capability are we asserting?
2. **Evidence:** what observable behavior or artifact would support that claim?
3. **Task:** what situation gives the learner a fair opportunity to demonstrate it?

### Example: workflow design and verification

**Claim**  
The learner can independently design an agent workflow for a task they have not seen before.

**Evidence**
- frames the intended outcome and acceptance criteria;
- decomposes the task into sensible steps;
- identifies required context, tools and permissions;
- places verification checkpoints at meaningful risk boundaries;
- explains trade-offs and residual risks.

**Assessment task**  
Give the learner a new business scenario: design an agent-assisted process that gathers information from multiple sources and produces a decision-ready report for a business team. Do not provide the workflow, prompt or template. Ask the learner to produce the design and justify key decisions.

Assess the quality of the reasoning and artifact, not merely whether the final output looks polished.

### Assessment validity safeguards

- A multiple-choice quiz can assess recognition or recall; it does not establish independent workflow-design capability.
- A task copied closely from the lesson measures practice or near transfer, not necessarily far transfer.
- Use more than one task when making broad claims about capability.
- Provide anchor examples for each rubric level.
- Where feasible, have two reviewers independently score a sample and discuss disagreements.
- Separate the quality of the learner's decisions from incidental tool fluency or prior domain expertise.

## 6. Learning experience loop

Use this flexible learning loop where it serves the objective:

**Orient → Understand → Practice → Feedback → Retrieve → Transfer**

It is not a mandatory six-screen template. A short conceptual lesson may need only an explanation and retrieval prompt; a complex workflow lesson may need worked examples, simulation, feedback and a novel task.

Keep the existing **Hook → Core → Close** as a storytelling structure. It is not, by itself, a learning methodology.

Use:
- worked examples before asking novices to solve complex tasks unaided;
- progressively reduced scaffolding;
- retrieval practice for durable knowledge;
- delayed retrieval where retention matters;
- novel tasks for transfer;
- feedback that explains why a decision works or fails.

## 7. Hybrid information architecture

### Learning Path — progression system

Its job is to develop capability in a deliberate sequence:
- explicit outcomes and competency mapping;
- lessons and worked examples;
- guided practice and feedback;
- simulations where decisions and consequences matter;
- transfer tasks and self-assessment.

### Knowledge System — just-in-time support

Its job is to help people retrieve knowledge while working:
- **Glossary:** precise concepts and terminology;
- **Cookbook:** recipes, patterns and reusable procedures;
- **Reference:** commands, configuration, APIs and technical details;
- **Examples:** artifacts, case studies and anti-patterns.

The two systems must link in both directions. A lesson should link to relevant terms and recipes; a reference entry should point back to the lesson that explains the underlying mental model.

Do not assume that Hybrid means equal prominence in the navigation. Test whether people can both follow a learning journey and find an answer quickly.

### Glossary entry model

Each entry should include, where relevant:
- technical definition;
- plain-language explanation;
- why it matters in Agentic Work;
- example and/or anti-pattern;
- related concepts;
- source, version and last-verified date for volatile claims;
- optional memory hook (humor, ASCII or analogy) when it improves understanding or recall.

Start with a useful taxonomy and curated links. Do not build a complex knowledge graph before there is evidence that it solves a real retrieval problem.

## 8. Vertical-slice strategy

Do not select pilot chapters solely because they are first in the roadmap. Select representative learning archetypes and competencies.

Initial pilot hypothesis:

| Pilot module | Main purpose | Evidence |
|---|---|---|
| A. Agentic Work mental model | Distinguish prompting, task delegation and agentic workflow | Explain and choose an approach in an unfamiliar scenario |
| B. Context, tools and permissions | Design context and access boundaries | Produce and defend a context/permission plan; identify excessive access |
| C. Workflow, verification and handoff | Design and assess an end-to-end workflow | Produce a workflow, acceptance criteria, verification checklist and handoff |

Map these modules to actual repository chapters only after reviewing the current curriculum. Avoid duplicating content or inventing new chapters unnecessarily.

## 9. Evaluation sequence

### Gate 1 — Expert review (first)

Use distinct review lenses. One person may cover more than one lens if their expertise supports it.

| Reviewer lens | Review focus |
|---|---|
| Learning / Instructional Design | Outcomes, sequence, cognitive load, assessment validity and transfer potential |
| Agentic AI / Technical practitioner | Technical accuracy, feasibility, permissions, workflow and verification |
| Product / UX practitioner | Information architecture, findability, usability, accessibility and interaction cost |

Use a 1–4 scale:

- 1 — Critical issue;
- 2 — Significant revision needed;
- 3 — Meets the requirement;
- 4 — Strong example.

Review dimensions:
- technical validity;
- learning alignment;
- transfer potential;
- cognitive efficiency;
- practical relevance;
- UX and accessibility;
- knowledge quality and source governance.

Every score must include a concrete observation, location, consequence and suggested action. Do not average away critical safety or technical defects.

Finding severity:
- **Critical:** materially incorrect, misleading or unsafe;
- **Major:** blocks an important learning outcome or task;
- **Minor:** clarity, consistency or usability improvement;
- **Optional:** plausible idea without demonstrated value.

Expert review outputs:
1. revised competency model and measurable outcomes;
2. assessment blueprint and rubric critique;
3. technical/source issues and volatile claims to verify;
4. UX, accessibility and cognitive-load findings;
5. decision log: accept, reject or defer, with rationale.

Expert review is a design-quality gate. It is not proof that learners learn or transfer.

### Gate 2 — Usability testing

Observe representative learners completing realistic tasks. Record completion, errors, hesitation, navigation path and help required. Ask what they expected and why they acted as they did.

### Gate 3 — Learning assessment

Use explanations, scenario questions and practical artifacts to assess comprehension and execution. Do not rely on satisfaction scores as learning evidence.

### Gate 4 — Transfer assessment

Give learners a novel task with no step-by-step scaffold. Score the resulting artifact and decisions using the rubric. Start with near transfer; increase contextual distance only when the basic capability is demonstrated.

Where practical, include a delayed assessment to check whether capability persists beyond the immediate lesson.

## 10. Measurement model

| Layer | Question | Possible measures |
|---|---|---|
| Usability | Can learners use the product? | Task completion, errors, time-on-task, help requests |
| Comprehension | Do they understand the principles? | Explanation quality, scenario reasoning |
| Retention | Can they retrieve knowledge later? | Delayed recall or retrieval task |
| Transfer | Can they apply principles in a new task? | Novel-task rubric score, artifact quality, independence |

The North Star is transfer. The other layers diagnose why transfer succeeds or fails; they are not substitutes for it.

Do not invent a universal target score before baseline data exists. Establish baseline, define an initial success threshold with reviewers, then revise it after the first pilot.

## 11. Visual and interaction decision rules

Every visual or interaction should support at least one learning function: understanding, practice, feedback, retrieval or transfer.

| Element | Use when | Avoid when |
|---|---|---|
| ASCII | It clarifies structure, relationships, flow or state | It is merely terminal decoration |
| GSAP / motion | It reveals temporal change, dependency or cause and effect | Motion adds no information or blocks reading |
| Humor | It makes a relevant concept or anti-pattern easier to understand or remember | The joke distracts from the concept |
| Simulator | It lets learners make a decision and observe a meaningful consequence | It is interaction without useful feedback |
| Quiz | It checks recall, recognition or reasoning | It is used as proof of transfer |

For meaningful motion, provide an equivalent final/static state, respect reduced-motion preferences and avoid unnecessary scroll hijacking. Preserve semantic text for assistive technology; do not make essential learning content available only as decorative ASCII or animation.

## 12. Six Shifts as the way we work

The six shifts are design heuristics for how the team and its agents collaborate. They are not rigid rules and do not override safety, correctness or explicit owner decisions.

| Shift | Apply it to this project |
|---|---|
| **1. Bớt luật, tin phán đoán** — Give Claude rules → Let Claude use judgement | Give the agent the outcome, constraints, risk boundaries and definition of done. Let it choose implementation details and explain material trade-offs. |
| **2. Bớt ví dụ, thiết kế khuôn** — Give Claude examples → Design interfaces | Define schemas, competency tables, review rubrics, content models and acceptance interfaces rather than asking the agent to imitate a pile of examples. |
| **3. Bớt nhồi, để nó mở dần** — Put it all upfront → Use progressive disclosure | Keep task briefs concise. Point to the specific source documents and tell the agent when to read each one. |
| **4. Bớt nhắc, nói một lần** — Repeat yourself → Simple tool descriptions | Put durable project conventions in the appropriate repository guidance. Do not restate the same rule in every task prompt. |
| **5. Để Claude tự nhớ** — Memory in CLAUDE.md files → Auto-memory | Let the agent capture useful local learnings where the tooling supports it, but keep approved product decisions and source-of-truth documents explicit and reviewable. Never rely on unverified memory for project decisions. |
| **6. Bớt tả, đưa tham chiếu** — Simple specs → Rich references | Link to the exact repository documents, source pages, artifacts and line/section locations. Make the references inspectable and current. |

**Important:** Six Shifts describe a way to reduce unnecessary instruction and improve delegation. They do not mean removing acceptance criteria, review, permission boundaries or human accountability.

## 13. Evidence labels and decision governance

Every major recommendation or product decision must be labelled as one of:

- **Evidence-backed:** supported by relevant research or project data; state the limits and context.
- **Expert-informed:** supported by a qualified review; record the reviewer lens and rationale.
- **Product hypothesis:** plausible but not yet validated with target learners.
- **Design decision:** an intentional choice based on brand, constraints or strategy; record the trade-off.

Do not present these categories as having equal evidential strength. Record rejected alternatives and why they were rejected.

## 14. Six-stage operating loop

1. **Discover:** learner segments, real tasks, constraints and failure modes.
2. **Define:** competency map, observable outcomes and assessment blueprint.
3. **Design:** curriculum, knowledge model, content, examples and interactions.
4. **Prototype:** a small but representative working slice.
5. **Evaluate:** expert review, usability, learning and transfer evidence.
6. **Iterate:** prioritize changes by severity, evidence, expected learning impact and implementation cost.

This is iterative, not waterfall. Findings may send the team back to any earlier stage.

## 15. Immediate next actions

1. Create and maintain the Independent Evaluation Council workspace and review protocol.
2. Map the six proposed competencies to the existing chapters and current learning outcomes.
3. Select the smallest representative pilot slice without duplicating existing content.
4. Draft one assessment task and rubric per pilot competency.
5. Commission expert review before expanding content or animation.
6. Revise the design from review findings, then run a small learner usability and transfer pilot.

Do not expand the Glossary, simulations or motion inventory simply to increase feature count. Expand them when the learning model and evidence justify the cost.

## 16. References and methodological provenance

Use primary or authoritative sources where possible; verify current editions before making claims about tool behavior.

- Wiggins, G. & McTighe, J. — *Understanding by Design*: https://www.ascd.org/books/understanding-by-design-expanded-2nd-edition
- Mislevy, R. J., Steinberg, L. S. & Almond, R. G. — Evidence-Centered Assessment Design: https://www.ets.org/research/policy_research_reports/publications/report/2003/hwqz.html
- Mayer, R. E. — *Multimedia Learning*: https://www.cambridge.org/highereducation/books/multimedia-learning/9A7B5C5A0B6F3A5A7C7D4D8F9D8A2C8A
- Dunlosky et al. (2013) — Improving Students' Learning With Effective Learning Techniques: https://doi.org/10.1111/j.1539-6053.2013.01007.x
- W3C — Web Content Accessibility Guidelines (WCAG) 2.2: https://www.w3.org/TR/WCAG22/
- Design Council — The Double Diamond: https://www.designcouncil.org.uk/our-resources/the-double-diamond/

Research does not directly prove that this exact combination, the ASCII visual language, GSAP, or the Hybrid architecture will work for No Babysitting. Those are design choices and hypotheses to evaluate with this product's learners.
