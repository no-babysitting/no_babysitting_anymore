# Implementation Plan & SAD (4+2) · No Babysitting

> Kiến trúc và kế hoạch triển khai. Đi kèm `01-PRD.md` (bản 2.0), `02-pedagogical-script.md`, `03-design-system.md` và `05-surface-matrix.md`.
> **Cách hiểu "4+2"** trong tài liệu này: 4 view của Kruchten (Logical · Process · Development · Physical), cộng 2 view bổ trợ là **Scenarios** (thường gọi là "+1") và **Data/Content**. View Data/Content được tách riêng vì sản phẩm này về bản chất là một *hệ thống nội dung có động lực học*.

---

## 1. Bối cảnh & ràng buộc

| Loại | Ràng buộc |
|---|---|
| Kiến trúc | Static site, **không backend**. Mọi trạng thái người học lưu cục bộ trên trình duyệt |
| Công nghệ | **Astro** (output static) + **TypeScript strict** + **GSAP 3.15.x** (npm `gsap`; mọi plugin đều miễn phí, kể cả dùng thương mại). Pin `3.15.0` (phát hành 13/04/2026). Bản `3.15.1` mới phát hành 04/11/2026, nên chỉ nâng sau khi đã đủ ≥ 2 tuần |
| Nội dung | Nguồn upstream (MIT) thay đổi hằng ngày. Ma trận bề mặt App thay đổi theo từng release |
| Ngôn ngữ | Tiếng Việt; font phải có subset `vietnamese` |
| Chất lượng | WCAG 2.2 AA; Lighthouse mobile Perf ≥ 90; JS ≤ 150 KB gzip mỗi trang |
| Pháp lý | Giữ notice MIT; không dùng logo hay mascot Anthropic; mockup UI trung tính |

---

## 2. View Scenarios (+1)

| # | Kịch bản | Thành phần tham gia | Thuộc tính chất lượng được kiểm |
|---|---|---|---|
| SC1 | Hà tự học Chương 02 trên laptop: predict → xem context meter → làm S2 → Grill me | StoryPage, ScrollDriver, PredictPrompt, S1/S2, LearningStore | Mượt (≥ 55 fps khi scrub), gate không chặn cuộn |
| SC2 | Lan trình chiếu workshop: bấm `P`, đi bằng clicker (PageDown), mở cửa sổ notes ở màn hình thứ hai | PresenterDriver, NotesWindow, BroadcastChannel | Đúng beat, không lệch giữa hai cửa sổ, chạy được offline |
| SC3 | Tìm "dumb zone" trong Library, lọc "Phụ thuộc model", mở chi tiết | LibraryPage, SearchIndex, Flip | Tìm không dấu; < 50 ms mỗi lần gõ |
| SC4 | Người dùng iPhone bật Reduce Motion đọc Chương 05 | StaticDriver, matchMedia | Đủ nội dung; không pin; simulator vẫn dùng được |
| SC5 | Upstream thêm một tip mới; CI tự mở PR có diff; maintainer duyệt bản dịch | Ingest, DiffReporter, GitHub Actions | Không mất ID cũ; build đỏ nếu thiếu overlay ở chế độ release |
| SC6 | Hà chuyển sang tab CLI ở Chương 04; mọi khối "Cách làm" trên trang đổi theo | SurfaceTabs, PreferenceStore | Đồng bộ toàn trang, nhớ lựa chọn |
| SC7 | Một hướng dẫn App đã quá 30 ngày chưa kiểm chứng | SurfaceMatrix, cron hằng tháng | Tạo issue "re-verify", khối hiện nhãn "Cần kiểm chứng lại" |
| SC8 | Mở deep link `#c04-b5` từ Slack | Router (hash), driver hiện hành | Cuộn hoặc nhảy đúng beat, timeline ở đúng trạng thái |

---

## 3. View Logical

```
┌──────────────────────────── Shell ─────────────────────────────┐
│ HUD (JourneyHUD · ChapterRail · StatusBoard) · Theme/Motion    │
│ PresenterController ─── BroadcastChannel ─── NotesWindow       │
└───────────┬───────────────────────┬─────────────────────┬──────┘
            │                       │                     │
┌───────────▼──────────┐ ┌──────────▼─────────┐ ┌─────────▼────────┐
│ Story                │ │ Library            │ │ Learning         │
│ ChapterPage (MDX)    │ │ SearchIndex        │ │ LearningStore    │
│ BeatRegistry         │ │ Facets · Flip list │ │ (predict, grill, │
│ SurfaceTabs ◄────────┼─┤ UseCaseCards       │ │  progress, tests)│
└───────────┬──────────┘ └──────────┬─────────┘ └─────────▲────────┘
            │                       │                     │
┌───────────▼──────────────────────────────────┐          │
│ Motion                                       │──────────┘
│ tokens · grammar(M1–M10) · ChapterTimeline   │
│ Drivers: Scroll | Presenter | Static         │
└───────────┬──────────────────────────────────┘
┌───────────▼──────────┐   ┌──────────────────────────────────┐
│ Simulators S1–S11     │   │ Content (build-time)             │
│ Custom Elements      │   │ upstream JSON + VI overlay       │
│ DnD engine + keyboard│   │ surface matrix · six shifts      │
└──────────────────────┘   │ story MDX · glossary · starter kit│
                           └──────────────────────────────────┘
```

### 3.1 Giao diện chính

```ts
// Một chương: một timeline, nhiều beat
interface ChapterModule {
  id: `c${string}`;                         // "c04"
  beats: BeatMeta[];                        // trùng với bảng beat trong Pedagogical Script
  build(ctx: BuildContext): gsap.core.Timeline; // timeline có label "c04:b3"; tạo trong gsap.matchMedia
  plugins?: Array<() => Promise<unknown>>;  // nạp lười: MorphSVG chỉ ở c10…
}
interface BeatMeta { id: string; phase: 'ask'|'predict'|'observe'|'explain'|'thennow'|'apply'|'recall';
                     gate?: { predictId: string };  // chặn tiến timeline cho tới khi đã predict
                     frameSummary: string; }        // "Tóm tắt khung hình" cho a11y và reduced motion
interface Driver { attach(tl: gsap.core.Timeline, beats: BeatMeta[]): void;
                   goTo(beatId: string): void; detach(): void; }
interface LearningStore { get<T>(k: string): T|undefined; set<T>(k: string, v: T): void; } // try/catch, rơi về bộ nhớ RAM
interface SurfacePref { surface: 'cowork'|'app'|'cli'; }  // mặc định 'app'
```

### 3.2 Trách nhiệm module

| Module | Trách nhiệm | Không làm |
|---|---|---|
| **Motion** | Token, ngữ pháp M1–M10 dạng hàm thuần (`drawArrow(el, opts)`), dựng timeline, 3 driver | Không biết gì về nội dung |
| **Story** | Render MDX; khai báo beat; gắn simulator; SurfaceTabs | Không tự viết tween |
| **Simulators** | 8 custom element độc lập; engine kéo thả có bàn phím dùng chung (S3, S4, S5, Lắp dàn nhạc, AFK) | Không phụ thuộc framework UI |
| **Library** | Chỉ mục tìm kiếm, facet, danh sách Flip, trang chi tiết | Không fetch lúc runtime |
| **Learning** | Lưu predict, grill, tiến độ, Diagnostic/Re-test; xuất Markdown | Không gửi dữ liệu đi đâu (trừ analytics opt-in) |
| **Shell** | HUD, theme, motion toggle, presenter, router hash | — |

---

## 4. View Process

### 4.1 Vòng đời trang Story (runtime)

```
load ─► fonts.ready ─► Shell.init (theme, motion pref, HUD)
     ─► IntersectionObserver: chương cách viewport ≤ 1 màn hình
          ─► import(chapter module) + plugin nạp lười
          ─► gsap.matchMedia({ desktop, tablet, mobile, reduce }) ─► module.build()
          ─► Driver.attach(tl)   // Scroll | Presenter | Static
          ─► ScrollTrigger.refresh() (debounce 150ms, refreshPriority theo thứ tự chương)
     ─► hash có beat? ─► Driver.goTo(beatId)
```

### 4.2 Máy trạng thái chế độ

```
            ┌──── P ────┐                ┌── OS/nút Motion ──┐
   [Scroll] ◄──── Esc ──► [Presenter]    [Full] ◄──────────► [Reduced]
       │                                     │
       └─ (Reduced bật) ─► Driver = Static ◄─┘   gsap.matchMediaRefresh()
```

- **Scroll → Presenter:** `ScrollTrigger.getAll().forEach(t => t.disable(false))`; bật layout `presenting` (stage chiếm toàn màn hình, script phủ lên); `tl.tweenFromTo(labelHiệnTại, labelKế)`.
- **Presenter → Scroll:** `enable()`, `refresh()`, cuộn tới vị trí của beat hiện tại.
- **Gate predict ("gate, don't trap"):** trong `onUpdate` của ScrollTrigger, nếu chưa predict thì kẹp `tl.progress` tại label khoá. Trang vẫn cuộn tiếp bình thường. Khi người học đã predict, tween tới vị trí cuộn hiện tại.

### 4.3 Đồng bộ Presenter

`BroadcastChannel('nb-presenter')` mang các message `{type:'beat', id}` · `{type:'timer', t}` · `{type:'notes-ready'}`. NotesWindow là một route tĩnh `/presenter-notes`; nếu `window.open` bị chặn thì hiện notes ngay trong trang (panel dưới).

### 4.4 Pipeline build và nội dung (CI)

```
[cron Thứ Hai 02:17 UTC] ─► fetch upstream HEAD ─► ingest ─► validate (Zod)
   ─► diff với id-map ─► (có thay đổi) ─► mở PR: bảng new/changed/removed + overlay rỗng
[mỗi PR] ─► lint · typecheck · unit · build · Playwright e2e · axe · Lighthouse CI · visual snapshot
[merge main] ─► deploy static
[cron ngày 1 hằng tháng] ─► quét surface-matrix: verifiedAt > 30 ngày ─► mở issue "re-verify"
```

---

## 5. View Development

### 5.1 Cấu trúc repo

```
no-babysitting/
├─ CLAUDE.md                     # ≤ 60 dòng, chủ yếu là gotcha (xem §5.4)
├─ .claude/                      # skills, agents, hooks, settings cho chính dự án
├─ astro.config.ts
├─ content/
│  ├─ upstream/                  # SINH TỰ ĐỘNG, không sửa tay
│  │  ├─ upstream.lock.json      # { repo, sha, fetchedAt }
│  │  └─ units.json              # ≈ 255 mục dòng README + đơn vị mức bài viết (ước tính tổng 350–450, chốt sau lần ingest đầu)
│  ├─ overlay/<type>/<id>.yml    # lớp tiếng Việt: tiêu đề, tóm tắt, cấp độ, nguyên lý, độ bền, chương
│  ├─ id-map.json                # fingerprint → ID ổn định
│  ├─ external/six-shifts.yml    # nguồn chính: Thariq 24/07/2026
│  ├─ surfaces/matrix.yml        # ma trận tính năng × bề mặt (+ verifiedAt, docs URL)
│  ├─ usecases/*.yml             # 6 thẻ ca sử dụng
│  ├─ glossary.yml · starter-kit/*
│  └─ story/c00.mdx … c10.mdx
├─ scripts/ingest/               # parse README (remark + gfm), diff, báo cáo
├─ src/
│  ├─ motion/ (gsap.ts · tokens.ts · grammar/*.ts · drivers/*.ts)
│  ├─ ascii/ (atlas.ts · grid.ts · renderer.ts · scenes/{hero,wipe,lens,finale}.ts · colleague.ts · state.ts)
│  ├─ chapters/c00.ts … c10.ts   # ChapterModule
│  ├─ sims/s1-context-meter.ts … s8-prune.ts · dnd/
│  ├─ library/ (search.ts · facets.ts · list.ts)
│  ├─ learning/store.ts
│  ├─ components/*.astro         # QuestionCard, PredictPrompt, AgentWindow, SurfaceTabs…
│  └─ pages/ (index · c/[id] · library · library/[id] · kit · glossary · about · presenter-notes)
└─ tests/ (unit · e2e · visual · a11y)
```

### 5.2 Quyết định công nghệ

| Hạng mục | Chọn | Lý do |
|---|---|---|
| Framework | Astro, output static, **không dùng ClientRouter** cho Story | HTML tĩnh tốt cho SEO và LCP; tránh vòng đời ScrollTrigger phức tạp khi chuyển trang kiểu SPA |
| UI tương tác | **Custom Elements + TS thuần** | Hợp với GSAP vanilla, không tốn runtime framework |
| GSAP | `gsap@3.15.0` (pin chính xác) từ npm, đăng ký plugin một lần trong `src/motion/gsap.ts` | Theo gsap-skills: registerPlugin một lần ở cấp app. Quy tắc chuỗi cung ứng: chỉ dùng bản đã phát hành ≥ 2 tuần |
| Plugin dùng | ScrollTrigger · SplitText · ScrambleText · DrawSVG · MorphSVG (chỉ c10) · MotionPath · Flip · Draggable · ScrollTo · CustomEase · TextPlugin · Observer (vuốt trong Presenter) | Mỗi plugin ứng với một mục trong ngữ pháp chuyển động |
| Không dùng | **ScrollSmoother** | Đổi cấu trúc DOM, xung đột với HUD `position: fixed` và với cuộn bằng bàn phím/a11y; không cần thiết |
| Chỉ dùng khi dev | GSDevTools, `markers`, MotionPathHelper | Không bao giờ ship |
| Tìm kiếm | **MiniSearch**, có `processTerm` bỏ dấu (NFD → bỏ dấu kết hợp, `đ` → `d`) | Khoảng 260 mục, chạy client-side, kết quả tức thì |
| Font | Fontsource (self-host) chỉ với subset `latin`, `latin-ext`, `vietnamese` | Nhanh, riêng tư, đúng dấu tiếng Việt |
| Kiểm thử | Vitest · Playwright (`--trace off`) · axe-core · Lighthouse CI · ảnh snapshot | |
| Định dạng | Biome (lint + format) | Một công cụ, nhanh |
| Gói | pnpm · Node LTS hiện hành | |

### 5.3 Luật GSAP cho dự án (rút từ gsap-skills, kèm sửa lỗi đã phát hiện)

```
DO   Mỗi chương = 1 timeline, có defaults, label = ID beat; scrollTrigger chỉ gắn ở timeline gốc
DO   Tween scrub luôn dùng ease "none"; chọn scrub HOẶC toggleActions, không dùng cả hai
DO   Pin một wrapper dạng block (không pin con của flex); animate con của phần tử pin
DO   Horizontal (chỉ desktop, c06): x: () => -(track.scrollWidth - innerWidth), ease "none",
     scrub, invalidateOnRefresh; trigger con dùng containerAnimation
     (KHÔNG chép mẫu trong skill: có lỗi Max.max và dùng nhầm xPercent)
DO   SplitText.create(..., { autoSplit: true, mask: "words", onSplit(self){ return tween } })
DO   gsap.matchMedia() với điều kiện reduce → StaticDriver; gsap.matchMediaRefresh() khi bấm nút Motion
DO   Tạo trigger theo thứ tự trên → dưới, hoặc đặt refreshPriority; refresh() sau khi font sẵn sàng
DO   Revert khi teardown: mm.revert(), split.revert(); kiểm tra không còn ScrollTrigger rò rỉ
DON'T lồng tween có ScrollTrigger vào timeline cha; không nest gsap.context trong matchMedia
DON'T animate width/height/top/left/filter khi scrub; không gắn will-change đại trà
DON'T dùng text-wrap: balance trên phần tử có SplitText; không split SVG <text>
```

### 5.4 Làm dự án này bằng Claude Code (dogfooding)

Dự án tự áp dụng đúng những gì nó dạy:

- **CLAUDE.md (≤ 60 dòng).** Gồm: mục đích repo (1 dòng); lệnh `pnpm dev`, `test`, `e2e`, `ingest`; và các gotcha:
  - "Không sửa `content/upstream/*` bằng tay"
  - "Tween scrub luôn dùng ease none"
  - "Chuỗi test dấu tiếng Việt: Ữ Ỗ Ẫ Ậ Ặ Ỹ"
  - "Hướng dẫn App phải có verifiedAt và docs URL"
  - "Copy theo Phụ lục C của Pedagogical Script"
- **Skills cài sẵn:** `greensock/gsap-skills`, qua `/plugin marketplace add greensock/gsap-skills` hoặc `npx skills add https://github.com/greensock/gsap-skills`.
- **Skills của dự án:**
  - `chapter-scaffold`: đọc bảng beat của chương trong Pedagogical Script, sinh MDX + ChapterModule + e2e test khung.
  - `verify-chapter`: Playwright ở 3 bề rộng × 2 theme × 2 mức motion; screenshot; chạy axe; kiểm tra dấu tiếng Việt; kiểm tra không rò rỉ ScrollTrigger.
  - `overlay-writer`: soạn overlay tiếng Việt từ diff ingest, theo quy tắc copy.
  - `surface-verify`: mở docs URL trong ma trận, đối chiếu, cập nhật `verifiedAt`.
- **Hook:** PostToolUse `Write|Edit` → `pnpm biome format --write`. Stop → nhắc chạy `verify-chapter` nếu có thay đổi trong `src/chapters/`.
- **Permissions:** allow `Bash(pnpm *)`, `Bash(npx playwright *)`. Deny `Bash(git push --force*)` và `Edit(content/upstream/**)`.
- **Subagents:**
  - `content-fact-checker`: đối chiếu copy với nguồn upstream, six shifts và ma trận bề mặt.
  - `a11y-reviewer`.
- **Nhịp làm việc mỗi chương:** plan mode → làm một lát dọc → `/verify-chapter` → `/code-review` → PR nhỏ, squash merge.

### 5.5 Chiến lược kiểm thử

| Tầng | Kiểm cái gì |
|---|---|
| Unit (Vitest) | Parser ingest (mỗi section README ra đúng số mục: 17 + 30 feature, 82 tip…); so khớp fingerprint và fuzzy; chuẩn hoá tìm kiếm bỏ dấu; LearningStore khi không có localStorage |
| Component | Từng simulator: chấm điểm đúng, thao tác bàn phím, `aria-live` |
| E2E (Playwright) | SC1–SC8; deep link; gate predict không chặn cuộn; Presenter đi hết beat; đổi SurfaceTabs đồng bộ toàn trang |
| Visual | 3 bề rộng (390 / 1024 / 1440) × 2 theme × motion đầy đủ/giảm; trang chứa chuỗi dấu tiếng Việt |
| A11y | axe = 0 vi phạm; thứ tự focus; cuộn bằng bàn phím qua cảnh pin |
| Hiệu năng | Lighthouse CI (Perf ≥ 90, CLS < 0.05); bundle-size budget; trace cuộn (không có frame > 50 ms trên mô phỏng CPU 4×); renderer ASCII ≤ 4 ms/frame, cảnh ngoài viewport phải dừng (đo bằng `performance.mark`) |
| Nội dung | Mọi mục Library có overlay, nguồn, độ bền; mọi khối "Cách làm" có `verifiedAt` ≤ 30 ngày lúc release |

---

## 6. View Physical (triển khai)

```
GitHub repo ──► GitHub Actions ──► (PR) Vercel Preview  ◄── link preview gắn vào PR
                     │
                     └─► (main) Vercel Production (static, CDN)  ── hoặc GitHub Pages
Không server · Không DB · Font và asset tự host · Analytics (Plausible) chỉ bật khi được duyệt
```

- Cache: HTML `max-age=0, must-revalidate`; asset có hash thì `immutable, 1 năm`.
- Header bảo mật: CSP chỉ cho phép `self` (cộng domain analytics nếu bật); `Referrer-Policy: strict-origin-when-cross-origin`.
- **Lựa chọn mặc định: Vercel**, vì có preview cho từng PR, giúp review chuyển động trực quan. GitHub Pages là phương án dự phòng (câu hỏi mở số 2 trong PRD).

---

## 7. View Data/Content

### 7.1 Schema (Zod, rút gọn)

```ts
ContentUnit {
  id: string                // "tip:context-02", "feature:hot-dynamic-workflows", "shift:s3"
  type: 'feature'|'tip'|'workflow'|'workflow-other'|'cross-model'|'skill-collection'
      | 'agent-collection'|'video'|'report'|'bp-doc'|'impl-doc'|'tip-article'
      | 'tip-item'|'bp-section'|'cli-tip'|'startup'|'official'
      | 'question'|'shift'|'powerup'|'glossary'|'usecase'
  upstream?: { path: string; anchor?: string; text: string; links: string[]; tags: string[];
               persons: string[]; noBabysit?: boolean; beta?: boolean }
  provenance: { repo: string; sha: string; fetchedAt: string } | { url: string; date: string }
}
Overlay {
  id: string; titleVi: string; summaryVi: string
  level: 'low'|'medium'|'high'|'pro'
  principles: Array<'P1'|...|'P12'>
  durability: 'timeless'|'model-sensitive'|'superseded'|'contested'
  chapters: string[]          // ["c02:b4"]
  contradictions?: Array<{ claimA: Ref; claimB: Ref; note: string }>
  roles?: string[]            // chỉ cho usecase
  verifiedAt: string
}
SurfaceEntry {
  featureId: string           // "plan-mode", "project-memory", "skills"…
  availability: Record<'cowork'|'desktop'|'web'|'mobile'|'cli', 'yes'|'partial'|'no'|'unknown'>
  tabs: {                     // 3 tab của SurfaceTabs; tab vắng mặt → hiện "Chưa có ở đây" + fallback
    cowork?:  { stepsVi: string[] }
    codeApp?: { stepsVi: string[] }   // Desktop Code tab · claude.ai/code · mobile Code tab
    cli?:     { steps: string[]; snippet?: string }
  }
  fallbackVi?: { text: string; interpretation: boolean } // interpretation = gợi ý của trang, không phải docs
  status: 'ga'|'beta'|'research-preview'|'experimental'|'unknown'
  plans?: string[]            // ["Team","Enterprise"]; bỏ trống nếu docs không nêu
  renamedFrom?: string        // "Routines", "Claude Code in Slack"…
  docs: string[]; verifiedAt: string
}
Beat { id; phase; questionVi?; options?: Option[]; correct?: number; misconceptionRefs?: string[];
       frameSummaryVi: string; speakerNotesVi?: string; surfaceRefs?: string[]; sources: string[] }
```

### 7.2 Quy tắc ingest

- Parse README bằng `remark-parse` + `remark-gfm` thành mdast. Định vị section theo **heading đã chuẩn hoá** (bỏ emoji, bỏ hoa thường): `concepts`, `hot`, `tips and tricks`, `development workflows`…
- Trong các bảng, đọc *alt* của badge (`beta`, `best-practice`, `implemented`) và tên file ảnh nguồn (`boris-cherny.svg` → `Boris`); nhận diện cờ 🚫👶.
- **Đơn vị nội dung (quyết định 06/11/2026):** mỗi dòng bảng README; mỗi tip lẻ trong các bài `tips/*.md` (`tip-item`, giữ link về bài gốc `tip-article`); mỗi mục H2/H3 của `best-practice/*.md` (`bp-section`); mỗi tip trích từ CLI binary (`reports/claude-spinner-verbs-and-tips.md`, `cli-tip`). Phần nào bỏ thì ghi vào `excluded.yml` kèm lý do.
- **Loại trường dễ đổi khỏi fingerprint** (số sao GitHub, ngày "Last Updated", số phiên bản trong badge) trước khi băm, để cron hằng tuần không mở PR "đã đổi" giả.
- **ID ổn định:** lần đầu sinh ID từ category + thứ tự, lưu fingerprint (hash của văn bản đã chuẩn hoá) vào `id-map.json`. Các lần sau:
  - khớp fingerprint chính xác → *không đổi*;
  - không khớp nhưng độ tương đồng (token-set) ≥ 0,85 trong cùng category → *đã đổi*, giữ ID;
  - không khớp mục nào → *mới*;
  - mục cũ không còn trong upstream → *đã xoá*: lưu trữ, gắn nhãn, không xoá cứng.
- **Kiểm tra số lượng:** test cảnh báo khi số tip lệch so với tiêu đề README (hiện README ghi 83, đếm thực tế 82). Dùng số **đếm được**, và hiện ContradictionNote.
- Mục *external* (six shifts, ma trận bề mặt) có provenance là URL + ngày, không có SHA.

### 7.2b Dữ liệu model/effort, nguồn chính thức và danh sách loại trừ

- **`SourceRef = { url, title, kind: 'docs'|'repo'|'blog'|'video'|'site-note', author?, publishedAt?, verifiedAt, quote? }`**; `Beat` và `ContentUnit` có `sources: SourceRef[]` bắt buộc. Build fail nếu rỗng (trừ nhãn "Diễn giải của trang"). CI hằng tháng chạy link checker. Giao diện: `SourceButton` (tài liệu 06 §2).
- `content/models/models.yml`: mỗi mục `{ alias, family, defaultEffort?, effortLevels, minClaudeCode?, status, plans?, fastMode?: { supported, note }, docs: string[], verifiedAt }`. **Tên model, mức effort mặc định và lịch gỡ Fast mode chỉ nằm ở đây**; chương 05b đọc từ file, không viết cứng trong MDX. CI hằng tháng nhắc kiểm chứng lại mục quá 30 ngày (như ma trận bề mặt).
- `content/official-sources.yml`: `{ url, title, publishedAt?, kind: 'docs'|'blog'|'platform-docs', mappedChapters: string[], verifiedAt }` cho trang Best practices chính thức và các bài blog tháng 10/2026; CI hằng tháng nhắc rà nguồn mới.
- `content/excluded.yml`: `{ upstreamPath, anchor?, reason }` cho phần repo cố ý không đưa vào (Subscribe, Star History, Sponsor, Extras, ghi chú video không được README liên kết, `tutorial/`, `agent-teams/`, `presentation/` trừ khi Story trích). Test fail nếu có đơn vị upstream vừa không có overlay vừa không nằm trong `excluded.yml`: đây là cách kiểm chứng tuyên bố "phủ 100%".

### 7.3 Ánh xạ nội dung ↔ trải nghiệm

`Beat.sources` → `SourceBadge` · `Overlay.durability` → `DurabilityTag` · `Overlay.chapters` → "Đào sâu" và liên kết hai chiều Story ↔ Library · `Beat.surfaceRefs` → `SurfaceTabs` lấy dữ liệu từ `surfaces/matrix.yml` · `Overlay.contradictions` → `ContradictionNote`.

---

## 8. ADR (tóm tắt)

| # | Quyết định | Phương án bị loại | Lý do |
|---|---|---|---|
| ADR-01 | Astro static, không backend | Next.js; SPA | Site nội dung, cần LCP tốt, không có dữ liệu người dùng phía server |
| ADR-02 | GSAP vanilla + Custom Elements | React + useGSAP | Không tốn runtime; tránh rủi ro cleanup và SSR |
| ADR-03 | Một timeline, ba driver | Code animation riêng cho mỗi chế độ | Một nguồn, không lệch giữa scroll, presenter và reduced motion |
| ADR-04 | Không dùng ScrollSmoother | Dùng ScrollSmoother cho cảm giác "mượt" | Bảo toàn cuộn native, HUD fixed và a11y |
| ADR-05 | Gate, không trap | Khoá cuộn tới khi người học predict | Không chặn người dùng bàn phím/screen reader; vẫn giữ giá trị POE |
| ADR-06 | Ma trận bề mặt là dữ liệu, có `verifiedAt` | Viết hướng dẫn App thẳng trong MDX | UI App đổi nhanh; cần kiểm chứng định kỳ và cập nhật một chỗ |
| ADR-07 | Ingest lúc build + PR hằng tuần | Fetch lúc runtime; snapshot tay | Ổn định, có kiểm duyệt bản dịch, không phụ thuộc rate-limit |
| ADR-08 | MiniSearch bỏ dấu | Pagefind | Ít mục, cần facet và Flip tức thì phía client |
| ADR-09 | Giữ Terminal Editorial, diễn giải thành "bàn làm việc của agent" | Light-first Workspace; mô phỏng UI app | Quyết định của chủ sản phẩm; rủi ro "chỉ cho dev" được giảm bằng AgentWindow trung tính + App mặc định |
| ADR-10 | Self-host font (Fontsource) | Google Fonts CDN | Hiệu năng, riêng tư, kiểm soát subset tiếng Việt |
| ADR-11 | **ASCII bằng Canvas 2D tự viết** (glyph atlas, buffer typed array, một `gsap.ticker`; GSAP điều khiển *trạng thái* của cảnh) | Animate hàng nghìn `<span>` bằng GSAP; WebGL/Three.js | DOM không chịu nổi hơn 10k ô; WebGL vượt phạm vi v1. Canvas đủ cho 4 khoảnh khắc chữ ký và có fallback frame cuối |
| ADR-12 | **`asciify-engine` chỉ dùng lúc build** để chuyển ảnh/video cinematic thành JSON (ký tự + màu), pin bản đã phát hành ≥ 2 tuần | Chạy asciify ở runtime | MIT, nhưng thay đổi rất nhanh (174 bản từ 02/2026; bản 4.33.0 phát hành 06/11/2026) và kéo theo nhiều dependency. Build-time giữ bundle nhỏ và ổn định |
| ADR-13 | **Docs chính thức là chuẩn khi mâu thuẫn; dữ liệu phụ thuộc phiên bản tách khỏi nội dung** | Tip repo là chuẩn; hiện song song | Tên model và mức effort mặc định đổi theo thế hệ model; để trong `models.yml` có `verifiedAt` thì chỉ sửa một chỗ, và nhãn độ bền cho phép giữ tip cũ trong Library mà không dạy sai |

---

## 9. Kế hoạch triển khai: lát dọc, có cổng chất lượng

Mỗi mốc là một **lát dọc** đi xuyên qua nội dung → chuyển động → tương tác → kiểm thử → deploy, theo đúng tip "tracer bullet" mà site dạy.

### M0 · Tracer bullet (khoảng 1,5 tuần)
- Khung Astro, tokens CSS (2 theme), font, lưới, HUD tối thiểu, ThemeToggle, MotionToggle.
- `src/ascii`: atlas + renderer + cảnh **ASCII Hero "Noise → Order"** (M11) + The Colleague (M14), vì đây là khoảnh khắc 'wow' đầu tiên và rủi ro hiệu năng lớn nhất, nên phải làm sớm.
- `src/motion`: tokens, M1/M2/M5/M7, ba driver (Scroll, Presenter, Static).
- **Mở đầu + Chương 02** đầy đủ beat; **S1 Context Meter**, **S2 Ngã ba**; `AgentWindow`; `SurfaceTabs` với dữ liệu thật cho các tính năng của c02 (xem ma trận §2).
- Ingest tối thiểu (bảng tips) → Library tối thiểu (tìm kiếm + 2 facet).
- Presenter: phím ←/→, `F`, notes ngay trong trang.
- CI: lint, unit, build, 1 e2e (SC1), axe, Lighthouse; deploy preview.
- **Cổng:** SC1, SC2 (rút gọn), SC4 đạt; Lighthouse ≥ 90; reduced motion đầy đủ cho c02.

### M1 · Phần I–II (khoảng 2 tuần)
- Chương 01, 03, 04; S3, S4; ngữ pháp M3/M4/M6/M8; ThenNowCard; DurabilityTag; ContradictionNote.
- Ingest đầy đủ theo đơn vị mức bài viết (§7.2) + `excluded.yml` + id-map + DiffReporter + cron PR hằng tuần; **kiểm chứng tay các ô "?" của Cowork** trong ma trận (§4 của tài liệu 05).
- `surfaces/matrix.yml` cho các tính năng của c01–c04; cron re-verify.
- **Cổng:** SC5, SC6, SC8; ảnh visual với chuỗi dấu tiếng Việt; parser trả đúng số mục.

### M2 · Phần III (khoảng 3 tuần)
- Chương 05, **05b**, 06, 07; S5, S6, S7, **S9**; `models.yml` + `official-sources.yml`; engine kéo thả dùng chung có bàn phím; horizontal rail ở c06 (desktop).
- Starter Kit (App + CLI); GlossaryTerm.
- **Cổng:** mọi simulator đạt test bàn phím; không rò rỉ ScrollTrigger khi đổi chế độ 20 lần liên tiếp.

### M3 · Phần IV + Kết (khoảng 2,5 tuần)
- Chương 08, 09, 10; S8, S10, S11; MorphSVG (nạp lười); **cảnh ASCII còn lại** (wipe chuyển Phần, lens M12, CinematicAscii finale + bước build ảnh → ký tự, FloatingOps); Re-test và biểu đồ trước/sau; kế hoạch 7 ngày.
- 6 thẻ ca sử dụng; NotesWindow qua BroadcastChannel; Recap xuất Markdown.
- **Cổng:** SC2 đầy đủ; SC3; SC7.

### M4 · Library & Presenter (khoảng 2 tuần)
- Tóm tắt tiếng Việt, cấp độ, nguyên lý, nhãn độ bền cho mọi mục Library (viết bằng Claude Code, người duyệt từng lô); speaker notes cho mọi beat; NotesWindow hoàn chỉnh.
- **Cổng:** 100% đơn vị upstream có overlay hoặc nằm trong `excluded.yml`; mọi beat có `speakerNotesVi`.

### M5 · Hoàn thiện (khoảng 1,5 tuần)
- Kiểm chứng toàn bộ nội dung (subagent fact-checker + người duyệt); kiểm chứng lại toàn bộ ma trận bề mặt.
- Tối ưu hiệu năng trên thiết bị yếu; audit a11y thủ công (VoiceOver, NVDA).
- Trang About/Attribution; disclaimer; ảnh OG cho từng chương.
- **Cổng:** toàn bộ Definition of Done; Lighthouse ≥ 90 trên mọi trang; `verifiedAt` ≤ 30 ngày.

### 9.1 Definition of Done cho một chương
- [ ] Đủ beat theo Pedagogical Script; label timeline trùng ID beat; deep link hoạt động
- [ ] Chạy đúng ở cả ba driver; không rò rỉ trigger khi chuyển chế độ
- [ ] Mọi khối "Cách làm" có tab App/CLI, huy hiệu khả dụng, `verifiedAt`, docs URL
- [ ] Reduced motion: dạng tương đương tĩnh cho từng mục ngữ pháp đã dùng
- [ ] Bàn phím: mọi tương tác; focus nhìn thấy; axe 0 vi phạm
- [ ] Visual snapshot: 3 bề rộng × 2 theme; dấu tiếng Việt không bị cắt
- [ ] Mọi con số, trích dẫn, tip và bước có `SourceButton` với link bấm được (`sources: SourceRef[]`, xem `06-sources-and-links.md`); mọi chỗ nguồn mâu thuẫn có ContradictionNote; link checker sạch
- [ ] Lighthouse mobile ≥ 90; JS của chương ≤ ngân sách
- [ ] Fact-checker không còn phát hiện mở

---

## 10. Rủi ro kỹ thuật

| Rủi ro | Giảm thiểu |
|---|---|
| Nhiều pin và scrub làm giật trên mobile | Mobile không pin ngang; stagger tối đa 24 phần tử; khởi tạo timeline lười |
| SplitText + mask cắt dấu tiếng Việt | Padding cho mask; test visual riêng; `autoSplit` + `fonts.ready` |
| Đổi chế độ làm rò rỉ trigger | Mỗi chương build trong một `matchMedia` context riêng; `revert()` khi rời; e2e đổi chế độ 20 lần |
| Upstream đổi cấu trúc README | Định vị theo heading đã chuẩn hoá; test số lượng mục; build không vỡ, chỉ mở PR cảnh báo |
| Ma trận bề mặt sai hoặc lỗi thời | Nguồn chính thức + `verifiedAt` + cron + skill `surface-verify` |
| `window.open` bị chặn (NotesWindow) | Rơi về panel notes ngay trong trang |
