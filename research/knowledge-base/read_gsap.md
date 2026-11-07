# GSAP rulebook for a scrollytelling learning site

Sources: `.../repos/gsap-skills/` (8 skills, examples, AGENTS.md) and `.../repos/GSAP/` (package.json, README, src/dist/esm/types). Both live under `repos/`. Items marked **[not in skills]** come only from GSAP source or types, or the skills don't cover them at all.

---

## 1. Version, package, plugins, imports, CDN, license

**Version and package** (`GSAP/package.json`, `GSAP/src/ScrollSmoother.js` header)
- Package `gsap`, version **3.15.1**. `"module": "esm/index.js"`, `"main": "dist/gsap.js"`, `"sideEffects": false`.
- The `exports` map sends `gsap/<Name>` to `./esm/<Name>.js` for import, `./dist/<Name>.js` for require, and `./types/<kebab>.d.ts` for types. It also exposes `gsap/dist/*`.
- React adapter: `@gsap/react`, which provides `useGSAP()` (`GSAP/README.md`, `skills/gsap-react/SKILL.md`).

**Plugin and core files** (`GSAP/dist/`, `GSAP/esm/`; each one has `.js`, `.min.js` and `.min.js.map` in dist):
`gsap` (core; `gsap-core.js` and `index.js` in esm), `all`, `CSSPlugin` (src/esm only, bundled in core), `CSSRulePlugin`, `CustomBounce`, `CustomEase`, `CustomWiggle`, `Draggable`, `DrawSVGPlugin`, `EasePack`, `EaselPlugin`, `Flip`, `GSDevTools`, `InertiaPlugin`, `MorphSVGPlugin`, `MotionPathHelper`, `MotionPathPlugin`, `Observer`, `Physics2DPlugin`, `PhysicsPropsPlugin`, `PixiPlugin`, `ScrambleTextPlugin`, `ScrollSmoother`, `ScrollToPlugin`, `ScrollTrigger`, `SplitText`, `TextPlugin`.

**ESM imports** (`GSAP/README.md`, `skills/gsap-plugins/SKILL.md`)
```js
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";       // or { ScrollTrigger }
import { SplitText } from "gsap/SplitText";
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText /* ... */);
```

**CDN**
- jsDelivr UMD (from `GSAP/README.md`): `https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js`. Plugins follow the dist file names, e.g. `.../gsap@3.15.1/dist/ScrollTrigger.min.js`, `.../dist/SplitText.min.js`.
- jsDelivr ESM (from `examples/vanilla/main.js`): `https://cdn.jsdelivr.net/npm/gsap@3.15.0/index.js` and `.../gsap@3.15.0/ScrollTrigger.js`. The example pins **3.15.0**, one patch behind the repo's 3.15.1.
- cdnjs: **neither repo documents it.** The usual pattern is `https://cdnjs.cloudflare.com/ajax/libs/gsap/<ver>/<File>.min.js`. Check that 3.15.1 exists there before relying on it.

**License**
- `GSAP/README.md`: "100% FREE including ALL of the bonus plugins like SplitText, MorphSVG … even for commercial use". It is GreenSock's "standard 'no charge' license" at https://gsap.com/standard-license (also in the `package.json` `license` field). The GSAP repo has no separate LICENSE file.
- `skills/gsap-plugins/SKILL.md`: no plugin needs a membership, license key or auth token. ❌ Don't generate an `.npmrc` with a token or use `npm.greensock.com`.
- The gsap-skills repo itself is MIT (`gsap-skills/LICENSE`, © 2026 GreenSock). Install it with `npx skills add https://github.com/greensock/gsap-skills`.

---

## 2. Core rules

Source: `skills/gsap-core/SKILL.md`, `skills/gsap-timeline/SKILL.md`, `examples/vanilla/main.js`.

**Tweens**
- Methods: `gsap.to`, `from`, `fromTo`, `set`. Write vars in camelCase. Default `duration` is 0.5 and the default ease is `"power1.out"`.
- `from()`/`fromTo()` default to `immediateRender: true`. When you stack several of them on the same property of the same element, set `immediateRender: false` on the later ones.

**Transforms and visibility**
- Prefer the transform aliases `x`, `y`, `z`, `xPercent`, `yPercent`, `scale(X/Y)`, `rotation(X/Y)`, `skewX/Y` and `transformOrigin` over raw `transform`. They apply in a fixed order: translate → scale → rotationX/Y → skew → rotation.
- For SVG, use `svgOrigin`, and never together with `transformOrigin`.
- Directional rotation suffixes: `"_short"`, `"_cw"`, `"_ccw"`.
- `autoAlpha` is preferred over `opacity`: at 0 it also sets `visibility:hidden`, so the element no longer receives pointer events.
- `clearProps` hands styling back to CSS. Clearing any transform prop clears the whole transform.
- CSS variables can be animated, e.g. `"--hue": 180`.

**Values, defaults, overwrite**
- Relative values: `+=`, `-=`, `*=`, `/=`.
- Function-based values `(i, target, targets) => ...` are evaluated once per target.
- Global defaults: `gsap.defaults({ duration: 0.6, ease: "power2.out" })`.
- `overwrite` accepts `false` (default), `true`, or `"auto"`.

**Stagger**
- A number such as `0.1`, or an object such as `{ amount: 0.3, from: "center" }` or `{ each: 0.1, from: "random" }`.
- `from` can be `"start"|"center"|"end"|"edges"|"random"|index`.

**Eases**
- Families: `none`, `power1–4`, `back`, `bounce`, `circ`, `elastic`, `expo`, `sine`, each with `.in`, `.out` or `.inOut`. Custom curves go through `CustomEase`.

**Timelines**
- Prefer timelines over `delay` chains. Pass `defaults` in the constructor.
- Position parameter: absolute `1`; relative `"+=0.5"` / `"-=0.2"`; a label `"intro"` or `"intro+=0.3"`; `"<"` (start of the previous tween), `">"` (end of the previous tween, the default), `"<0.2"`.
- Labels: `addLabel()`, `tl.play("outro")`, and `tl.tweenFromTo("intro","outro")`, which pauses the timeline and tweens its playhead.
- Nesting: `master.add(child, 0)`.
- Playback: `play`, `pause`, `reverse`, `restart`, `time()`, `progress()`, `kill()`.
- Timeline "duration" comes from its children, not from the constructor.

**gsap.matchMedia() and reduced motion** (3.11+)
```js
const mm = gsap.matchMedia();
mm.add({ isDesktop:"(min-width: 800px)", isMobile:"(max-width: 799px)",
         reduceMotion:"(prefers-reduced-motion: reduce)" }, (ctx) => {
  const { isDesktop, reduceMotion } = ctx.conditions;
  gsap.to(".box", { rotation: isDesktop ? 360 : 180, duration: reduceMotion ? 0 : 2 });
  return () => {/* optional cleanup */};
}, scopeEl);   // optional 3rd arg = selector scope
```
- Everything created inside a handler is reverted automatically when its query stops matching. `mm.revert()` reverts everything.
- `gsap.matchMediaRefresh()` re-runs the handlers, e.g. after an in-page "reduce motion" toggle.
- ❌ Don't nest `gsap.context()` inside matchMedia, because matchMedia already creates one.

**gsap.context() and cleanup** (`gsap-react`, `gsap-frameworks`)
- `const ctx = gsap.context(() => {...}, scope)` scopes selectors and collects every tween, ScrollTrigger and SplitText created in the callback. `ctx.revert()` kills them and restores inline styles.
- Utilities: `gsap.utils.selector(scope)` and `gsap.utils.toArray(".x", container)` for scoped queries (`skills/gsap-utils/SKILL.md`).
- `mapRange`, `clamp` and `normalize` work on numbers only. Use `getUnit`/`unitize` when units matter.

---

## 3. ScrollTrigger

Source: `skills/gsap-scrolltrigger/SKILL.md`, plus `GSAP/types/scroll-trigger.d.ts` where marked.

**Setup and placement**
- Call `gsap.registerPlugin(ScrollTrigger)` once.
- Attach ScrollTrigger to a **timeline or top-level tween only**: `gsap.timeline({ scrollTrigger:{...} }).to(...)`. ❌ Never put it on a child tween or nest ScrollTriggered animations inside a parent timeline.
- Shorthand `scrollTrigger: ".selector"` sets the trigger only.

**start / end**
- Format is `"triggerPos viewportPos"`, e.g. `"top center"`, `"bottom 80%"`, `"top top"`.
- A number means absolute scroll px. Relative values: `"+=300"`, `"+=100%"`. `"max"` is the maximum scroll.
- `"clamp(top bottom)"` (3.12+) keeps the value within page bounds. A function form is allowed.
- Defaults: start `"top bottom"` (`"top top"` when `pin:true`), end `"bottom top"`. Use `endTrigger` when the end depends on another element.

**Driving the animation**
- `scrub`: `true` locks progress to scroll. A number is the catch-up lag in seconds (`scrub: 1`, which the performance skill suggests for smoothing).
- `toggleActions` lists four actions for onEnter, onLeave, onEnterBack and onLeaveBack. Valid values: `play|pause|resume|reset|restart|complete|reverse|none`. Default `"play none none none"`.
- ❌ Don't combine scrub with toggleActions. If both are set, scrub wins.

**Pinning**
- `pin: true` (or an element) with `start:"top top"` and `end:"+=1000"`.
- `pinSpacing` defaults to `true`; it also accepts `false` or `"margin"`.
- Don't animate the pinned element itself. Animate its children, or pin a wrapper.

**Snap**
- A number (increments), an array, `"labels"`, a function, or `{ snapTo, duration, delay, ease }`.
- Types also allow `"labelsDirectional"` **[not in skills]**.

**Horizontal sections with containerAnimation**
1. Pin the section.
2. Tween the inner track's `x`/`xPercent` with **`ease:"none"`** (required).
3. Give that tween `pin` and `scrub`.
4. Child triggers set `containerAnimation: scrollTween` and use starts like `"left center"`.

Caveats:
- Pin and snap are **not available** on containerAnimation triggers. Don't move the trigger element itself.
- ⚠️ The skill's sample is buggy. It has the typo `Max.max(...)`, it feeds a pixel calculation to `xPercent`, and it omits `scrub` even though the steps call for it. Use `x: () => -(track.scrollWidth - window.innerWidth)` with `invalidateOnRefresh: true` instead. That fix is mine, not from the skill.

**ScrollTrigger.batch(targets, vars)**
- Creates one trigger per element and batches callbacks as `(elements, triggers)`.
- Options: `interval`, and `batchMax` (a number or function).
- Not allowed in vars: `trigger`, `animation`, `invalidateOnRefresh`, `onSnapComplete`, `onScrubComplete`, `scrub`, `snap`, `toggleActions`.
- Use it for card reveals, e.g. `onEnter: b => gsap.to(b,{autoAlpha:1,y:0,stagger:0.1,overwrite:true})`.

**Refresh**
- Resize triggers an automatic refresh, debounced 200ms. After fonts, images or dynamic content load, call `ScrollTrigger.refresh()` manually, debounced.
- Refresh runs in creation order. Create triggers top-to-bottom, or set `refreshPriority` (lower runs first, so the first section on the page gets the lowest number).

**Other options and helpers**
- `invalidateOnRefresh` exists in the types **[not explained in skills]**: it re-records function-based values on refresh.
- Also only in the types: `anticipatePin`, `fastScrollEnd`, `preventOverlaps`, `pinReparent`, `pinnedContainer`, `pinType`, `onRefreshInit`, `ScrollTrigger.normalizeScroll()`.
- `markers: true` is for development only.
- `once`, `id` with `ScrollTrigger.getById()`, `toggleClass`.
- Callbacks: `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`, `onUpdate(self.progress/direction)`, `onToggle`, `onRefresh`, `onScrubComplete`.
- `ScrollTrigger.create()` makes a standalone trigger, useful for progress bars or chapter nav state.
- `scrollerProxy` is only for third-party smooth scrollers; ScrollSmoother doesn't need it.

**Cleanup in SPAs**
- `ScrollTrigger.getAll().forEach(t => t.kill())`, or revert the context.

**Pinning flex children:** the skills don't mention this pitfall. It is a known community gotcha; pin a block-level wrapper instead.

---

## 4. Plugins for a teaching site

Source: `skills/gsap-plugins/SKILL.md`, plus `GSAP/types/*` where marked.

**SplitText**
- Create with `SplitText.create(target, { type:"words,chars"|"lines", ... })`. The instance exposes `.chars`, `.words`, `.lines`, and `.masks` when `mask` is set.
- `autoSplit: true` re-splits after fonts load or the width changes. **Create animations inside `onSplit(self)` and return them** so they are cleaned up and kept in sync (3.13.0+).
- `mask: "lines"|"words"|"chars"` wraps each unit in an `overflow:clip` element for reveal effects.
- `aria: "auto"` (default) puts an `aria-label` on the parent and `aria-hidden` on the pieces. `"hidden"` and `"none"` are the alternatives; with `"none"`, add a screen-reader-only duplicate when links or semantics must survive.
- Other options: `linesClass:"line++"`, `propIndex`, `ignore`, `smartWrap` (chars-only), `deepSlice`, `wordDelimiter`, `prepareText`, `reduceWhiteSpace`, `tag` (`"span"` can break transforms on inline elements).
- Gotchas:
  - Split only what you animate.
  - Use `document.fonts.ready` or `autoSplit`.
  - Set `font-kerning:none; text-rendering:optimizeSpeed` to stop kerning shifts.
  - Avoid `text-wrap: balance`.
  - SVG `<text>` is not supported.
  - Revert on unmount, or let the context do it.

**ScrambleTextPlugin**
- Example: `scrambleText:{ text, chars:"01", revealDelay:0.5 }`.
- The types also list `speed`, `delimiter`, `tweenLength`, `newClass`, `oldClass`, `rightToLeft`.
- Good for "terminal" headings such as command names.

**DrawSVGPlugin**
- The value is the **visible segment**, `"start end"`: `"0% 100%"` is the full stroke, and `0` is the same as `"0% 0%"`.
- The element needs `stroke` and `stroke-width`. It only affects stroke, not fill.
- Prefer single-segment paths. `<use>` contents can't be changed.
- `DrawSVGPlugin.getLength()` and `getPosition()` report stroke length and position.
- Ideal for scrubbed diagrams such as agent and hook flows.

**MorphSVGPlugin**
- Example: `morphSVG: "#id"` or `{ shape, type:"rotational", map, shapeIndex, smooth (3.14+), curveMode (3.14+), origin, precision, precompile, render, updateTarget }`.
- Run `MorphSVGPlugin.convertToPath()` on primitives first.
- Use `shapeIndex:"log"` once to fix twisted morphs.
- `precompile` only helps a slow first frame.

**MotionPathPlugin**
- Example: `motionPath:{ path, align, alignOrigin:[0.5,0.5], autoRotate, curviness }`.
- `MotionPathHelper` is a development-only editor.

**Flip**
- Pattern: `Flip.getState()`, change the DOM or classes, then `Flip.from(state, { absolute, nested, scale, simple, duration, ease })`.
- Use for grid ↔ detail views and filter or reorder of the best-practice cards.

**Observer**
- `Observer.create({ target, onUp/onDown/onLeft/onRight, tolerance:10, type:"touch,pointer"|"wheel" })` normalizes swipe, wheel and pointer input.
- Use it for gesture-driven, slide-like sections that aren't tied to scroll position.

**Draggable and InertiaPlugin**
- Example: `Draggable.create(el, { type:"x,y"|"rotation"|"scroll", bounds, inertia:true, edgeResistance })`.
- `inertia: true` needs InertiaPlugin registered. `InertiaPlugin.track()` with `inertia:{x:"auto"}` lets a tracked value glide to a stop.
- Use for quiz drag-to-match exercises and timeline scrubbers.

**ScrollSmoother**
- Requires ScrollTrigger and must be registered after it.
- Needs the `#smooth-wrapper > #smooth-content` DOM structure. `position:fixed` elements go **outside** the wrapper.
- Options from the types **[not in skills]**: `smooth`, `smoothTouch`, `effects` (`speed`, `lag`), `normalizeScroll`, `ignoreMobileResize`, `wrapper`, `content`.
- The skills give no further constraints. Consider skipping it when reduced motion is preferred.

**ScrollToPlugin**
- Example: `gsap.to(window, { scrollTo:{ y:"#section", offsetY:50 } })`. Also supports `x`/`y` `"max"`.
- Use for table-of-contents and chapter navigation.

**CustomEase**
- `CustomEase.create("name", ".17,.67,.83,.67")` or SVG path data. EasePack, CustomWiggle and CustomBounce are also available.

**TextPlugin [not in skills]**
- `text: string | { value, delimiter, speed, type, rtl, padSpace, newClass, oldClass, preserveSpaces }` (from the types). Useful for a typewriter terminal effect.

**GSDevTools**
- `GSDevTools.create({ animation: tl })` is for development only. ❌ Never ship it.

---

## 5. Performance and frameworks

Source: `skills/gsap-performance/SKILL.md`, `gsap-react`, `gsap-frameworks`, `examples/README.md`.

**Performance**
- Animate transforms and opacity. ❌ Don't animate `width`, `height`, `top`, `left`, `margin` or `padding`.
- Put `will-change: transform` only on elements that actually animate. Don't set `will-change` or `force3D` everywhere.
- Batch DOM reads before writes.
- Prefer `stagger` over many separate tweens. Virtualize or limit long lists. Reuse timelines; never create them per frame.
- Use `gsap.quickTo()` for mouse followers and other frequent updates.
- Pin only what's needed. Use a small numeric scrub.
- Debounce `refresh()`, and call it only when layout changes.
- Kill or pause off-screen animations. Test on low-end devices.

**Vanilla** (`examples/vanilla`)
- A `<script type="module">` that imports from the jsDelivr ESM build and registers plugins once.
- Hide initial states with CSS such as `opacity:0` and reveal with `autoAlpha`.

**React / Next**
- Install `npm install gsap @gsap/react`, then `gsap.registerPlugin(useGSAP)` before use.
- `useGSAP(fn, { scope: ref, dependencies:[...], revertOnUpdate:true })` cleans up automatically.
- Wrap event-handler animations in `contextSafe` and remove listeners in the returned cleanup.
- Fallback: `useEffect` with `gsap.context` and `return () => ctx.revert()`.
- Never run gsap during SSR.
- Register plugins at the top level, not in a component that re-renders.

**Vue / Nuxt**
- Vue: `onMounted` → `ctx = gsap.context(fn, container.value)`, then `onUnmounted` → `ctx?.revert()`.
- Nuxt 4: a `composables/useGSAP.ts` that registers ScrollTrigger and exposes `lazyLoadPlugin()`, which dynamically imports rarely used plugins such as SplitText and MorphSVG.
- Refresh after `nextTick` or after async content loads.
- ⚠️ The skill's Nuxt sample declares `type Plugins` twice, which won't compile as written.

**Svelte / SvelteKit**
- `onMount(() => { const ctx = gsap.context(fn, container); return () => ctx.revert(); })` with `bind:this={container}`.

**Astro:** no guidance in the skills beyond "framework-agnostic". The general principle applies: create after mount on the client, scope selectors, revert on teardown.

---

## 6. Do / Don't checklist

```
DO   npm i gsap (3.15.1) [+ @gsap/react]; all plugins free, no token/.npmrc
DO   gsap.registerPlugin(...) once at app level before any use
DO   Animate x/y/xPercent/scale/rotation + autoAlpha; transforms over layout props
DO   Build each chapter as one timeline w/ defaults, labels, position params
DO   Put scrollTrigger on the timeline/top-level tween only
DO   Choose scrub (numeric, e.g. 1) OR toggleActions, never both
DO   Pin a wrapper; animate its children; keep pinSpacing unless layout handled
DO   Horizontal sections: ease:"none" + containerAnimation for inner triggers
DO   Function values + invalidateOnRefresh for viewport-dependent distances
DO   Create triggers top-to-bottom or set refreshPriority in page order
DO   ScrollTrigger.refresh() after fonts/images/async content (debounced)
DO   ScrollTrigger.batch() for card/list reveals
DO   SplitText: autoSplit + build/return tween inside onSplit; mask for reveals
DO   Keep SplitText aria:"auto" (or "none" + sr-only copy for rich markup)
DO   gsap.matchMedia() with reduceMotion condition -> duration:0 / static state
DO   gsap.matchMediaRefresh() when an in-page motion toggle changes
DO   Scope selectors: gsap.context(fn, root) / useGSAP({scope}) / utils.selector
DO   Revert on teardown: ctx.revert(), mm.revert(), split.revert()
DO   quickTo for pointer-driven effects; stagger over manual delays
DO   Use markers/GSDevTools only in dev builds
DON'T nest ScrollTriggered tweens inside a parent timeline
DON'T stack from()/fromTo() on same prop without immediateRender:false (later ones)
DON'T use svgOrigin and transformOrigin together
DON'T animate the pinned element or the containerAnimation trigger itself
DON'T expect pin/snap on containerAnimation-based triggers
DON'T nest gsap.context() inside matchMedia handlers
DON'T run gsap/ScrollTrigger during SSR or before mount
DON'T apply will-change/force3D to everything
DON'T use text-wrap:balance on SplitText targets; don't split SVG <text>
DON'T ship markers:true, GSDevTools, or MotionPathHelper
```

**Gaps the parent design should resolve itself:** the cdnjs URL pattern, ScrollSmoother constraints beyond the DOM structure, pinning flex children, Astro specifics, and fuller TextPlugin and invalidateOnRefresh semantics. The skills don't document any of these.