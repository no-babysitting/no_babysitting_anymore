No Babysitting (*An unofficial guide to Claude Code best practices*) là trang học best practice Claude Code cho người dùng Claude ở mức trung bình đến cao, không chỉ dev. Hình ảnh trung tâm là **bàn làm việc của agent**: nơi Claude đọc file, tra web, xin quyền, đối chiếu số liệu, và mọi hành động hiện ra thành một nhật ký rõ ràng. Mọi quyết định thị giác phải trả lời được câu hỏi *"nó giúp người học hiểu điều gì?"*.

## Ý đồ

- **Terminal Brutalism × Cinematic ASCII.** ASCII là ngôn ngữ đồ hoạ chính: ký tự vừa là nội dung, vừa là pixel. Mọi cảnh ASCII lớn kể cùng một câu chuyện *từ hỗn loạn đến trật tự* (vibe → agentic). Chữ cần đọc luôn là HTML; ASCII nằm trên canvas `aria-hidden`. Bố cục brutalist: góc vuông (`r-*` = 0), viền `control` 1px, lưới lộ ra, số chương Archivo condensed khổng lồ tràn khung (`index-cond`), tên chương tiếng Anh Archivo expanded viết hoa (`wordmark`), metadata mono neo bốn góc khung, nút dạng `[ NHÃN ]` (hover đảo màu), một ô vuông accent ■ làm dấu nhấn, ghost text mờ 0.055 phía sau.
- **Màu ký tự mang nghĩa:** noise `fg-subtle` · khung `control` · hình đã thành `fg` và ramp `level-*` · agent đang hành động `accent` · kiểm chứng `signal` · quá tải `warn`. Full-color chỉ dùng ở hai cảnh cinematic (mở đầu, kết), render sẵn lúc build.
- **The Colleague** `[•_•]` là nhân vật ASCII của trang. Biểu cảm luôn phản ánh trạng thái thật của cảnh.
- **Hai mặt của cùng một tờ giấy.** Theme `dark` (mặc định) là *bàn làm việc*: nền `bg` tối ấm, chữ `fg`. Theme `light` là *bản vẽ*: giấy kẻ ô `bg` sáng. Cả hai dùng chung lưới ô `grid-cell` (40px) vẽ bằng `grid`.
- **Ba giọng + một giọng cấu trúc.** *Serif hỏi, sans giải thích, mono chứng minh, wide dựng khung.* Không đổi vai giữa các giọng.
  - Câu hỏi Socratic (và chỉ câu hỏi): họ `display` (Newsreader), style `question`.
  - Logo: chữ Blocks (bitmap, component `Logo`), không phải một font.
  - Tên chương, số chương, bộ đếm lớn: họ `wide` (Archivo, trục `wdth` 62–125), style `wordmark`, `index-cond`. Chỉ cho tên tiếng Anh, số, từ khoá.
  - Giải thích: họ `text` (Be Vietnam Pro), style `body`, `lead`.
  - Hành động của agent, tên file, tên tính năng, số liệu: họ `mono` (JetBrains Mono), style `action`, `eyebrow`. Lệnh shell (`code`) chỉ xuất hiện trong tab CLI.
- **Ba motif mang nghĩa.** Mũi tên → nghĩa là *dẫn tới / chuyển thành*. Con trỏ ▍ nghĩa là *tới lượt bạn*. Thanh █░ nghĩa là *ngân sách có hạn*. Không dùng chúng để trang trí.
- **Đứng yên vẫn đầy đủ.** Ở trạng thái nghỉ (reduced motion, ảnh chụp, link preview), mọi nội dung đều đọc được. Không để phần tử nào ở opacity 0 chờ cuộn tới.

## Giọng văn

- Viết tiếng Việt, xưng "bạn", câu ngắn và chủ động. Giữ nguyên thuật ngữ và tên UI tiếng Anh, đặt trong `<span lang="en">`, giải nghĩa ở lần đầu.
  - Đúng: "Bật `Plan mode` trước khi giao việc dài."
  - Sai: "Bật chế độ kế hoạch hoá trước khi…"
- Ví dụ mặc định là công việc văn phòng (báo cáo thị trường hằng tuần). Code chỉ xuất hiện ở thẻ ca sử dụng Dev và tab CLI.
- Mọi con số đi kèm nguồn và ngày (`SourceBadge`). Phát biểu trong phỏng vấn ghi "theo lời Boris, 19/02/2026".
- Phần diễn giải riêng của trang gắn nhãn "Diễn giải của trang". Khi các nguồn mâu thuẫn, hiện cả hai (ContradictionNote) và không chọn hộ người đọc.
- Không dùng emoji làm đầu mục, không dấu chấm than, không cường điệu. Nút nói đúng việc nó làm: "Chốt dự đoán", "Copy" → "Đã copy ✓".

## Màu

- Dùng `accent` (cam đất) **chỉ cho hành động và hiện tại**: CTA và nút chính, viền focus (`focus-ring`), vị trí hiện tại (tab, mốc chương, beat), agent đang làm, con trỏ ▍ tới lượt bạn, và ô ■ ở nhãn góc. **Không** dùng cho số lớn, mã M1–M14, mũi tên, gạch ngang, nhãn tiêu đề, chip lọc hay HUD. Chữ trên nền `accent` là `on-accent`, không bao giờ dùng trắng tinh.
- Dùng `signal`, `warn`, `danger` **chỉ cho trạng thái**, và luôn kèm icon + chữ:
  - `signal` (ô đặc): đã kiểm chứng, đạt, "Bây giờ", *Bền vững*.
  - `warn` (nửa ô): cần cân nhắc, *Phụ thuộc model*.
  - `danger` (ô gạch chéo): bị chặn, *Đã thay thế* (kèm gạch ngang).
  - Trong nhãn (`.nb-tag`), màu trạng thái chỉ nằm ở ô đánh dấu 9px; chữ luôn `fg`, không khung.
- Dùng `info` cho tham chiếu, "Đào sâu", *Chưa thống nhất* (viền đứt nét), và trạng thái chưa GA (Beta, Research preview).
- Chữ màu ngữ nghĩa chỉ đặt trên `bg` hoặc `bg-raised`. Trên `bg-sunken` dùng `fg` kèm icon.
- Viền control (input, radio-card, khay thả) dùng `control` (≥ 3:1). `line` chỉ là hairline trang trí.
- Biểu đồ: một chuỗi dùng `chart-1`; hai chuỗi dùng `chart-1` + `chart-2` (đã qua validator CVD). Chữ trong biểu đồ dùng `fg`/`fg-muted`, không dùng màu của chuỗi.
- Thanh cấp độ Low → Pro dùng ramp *ordinal* một tông `level-1`…`level-4`, luôn kèm độ dài (25/50/75/100%) và nhãn chữ. Không dùng dải đỏ → xanh lá.
- Tương phản đã đo (WCAG 2): `fg` ≥ 14:1; `fg-muted` ≥ 6,9:1; `fg-subtle` ≥ 4,7:1 trên cả `bg` và `bg-raised`; `accent` 6,1:1 (dark), 5,4:1 (light); mọi màu trạng thái ≥ 5:1 trên `bg` ở cả hai theme. Đo lại: `python3 tools/contrast.py design-system/tokens.json --fail`.

## Chữ

- Câu hỏi mở chương dùng `question` (fluid 40–72px), H2 dùng `heading`, trích dẫn và câu hỏi dẫn dùng `quote` (italic).
- Tên chương dùng `wordmark` (Archivo 125%, 800, viết hoa, line-height 0.92). Logo không gõ bằng font: dùng `NB.logoSVG()` hoặc file trong `assets/Logo/`. Số chương, bộ đếm, phần trăm lớn dùng `index-cond` (Archivo 62%, 800), được phép tràn khỏi khung. Metadata dùng nhãn micro (`.nb-micro`): mono 12px, giãn 0.06em, **không** `text-transform`.
- Thân bài dùng `body` (17px / 1.65), rộng tối đa `measure` (50ch ≈ 66–68 ký tự tiếng Việt; `ch` là bề rộng chữ số 0, rộng hơn chữ thường khoảng 1,3 lần, nên 66ch cho tới 90 ký tự mỗi dòng).
- Eyebrow, nhãn micro, nút, tag: mono ≥ 12px, giãn 0.04–0.06em. **Tiếng Việt viết thường** (hoa chữ đầu câu); tiếng Anh, mã và số viết hoa sẵn trong nguồn hoặc bọc `.nb-caps`. Ví dụ: `Phần II · MEDIUM · 11 phút`. Tên component và mã định danh (`SourceButton`, `c04:b3`) giữ nguyên cách viết.
- **Tiếng Việt:**
  - Line-height của display ≥ 1.12. Letter-spacing không âm quá −0.01em.
  - Mask của SplitText có thêm padding dọc 0.12em để dấu chồng ("Ữ Ỗ Ẫ Ậ") không bị cắt.
  - Không dùng `text-wrap: balance` trên phần tử có SplitText.
- Số liệu và cột số dùng `font-variant-numeric: tabular-nums`.

## Không gian và bố cục

- Khoảng cách theo thang `space-1`…`space-10` (gốc 4px). Nhóm anh em dùng `gap`, không dùng margin lẻ.
- Desktop ≥ 1200px: lưới 12 cột, tối đa `page-max`. Story chia **Script (cột 1–5) | Stage (cột 6–12, pinned)**.
- Tablet: Stage sticky phía trên. Mobile: một cột, Stage *inline*, không pin.
- Gutter hai bên luôn ≥ `space-4` cộng safe-area. Trang không bao giờ cuộn ngang; bảng, code và sơ đồ rộng cuộn trong khung riêng.
- HUD trên cao `hud-height`, gồm thanh cấp độ, tìm kiếm, theme, motion, presenter. `StatusBoard` thu gọn ở góc dưới phải.

## Hình khối, viền, bóng

- Góc vuông ở mọi nơi (Terminal Brutalism): `r-1`, `r-2`, `r-pill` đều bằng 0. Giữ token để sau này có thể đổi tập trung một chỗ.
- Card trong Library chỉ có hairline `line`, không bóng. `shadow-overlay` chỉ dành cho lớp nổi (tooltip, dialog, cửa sổ notes).
- Không dùng thanh accent dọc bên cạnh card. Muốn nhấn mạnh thì dùng một nét `accent` 2px ở **đầu** khối, đúng một chỗ.
- `AgentWindow` không có "ba chấm cửa sổ": tên dự án và trạng thái nằm ở nhãn góc. Khung `app` là bản giản lược trung tính: không logo, không chép bố cục UI thật của sản phẩm nào.

## Biểu tượng

- Ưu tiên glyph mono thay cho icon và emoji: `→` dẫn tới · `▍` tới lượt bạn · `█░` ngân sách · `✕` chặn · `⇄` hai nguồn đối nhau · `✓` đạt · `↳` đào sâu. Nhãn trạng thái và độ bền dùng ô đánh dấu `.nb-mk`, không dùng glyph.
- Khi cần icon nét: nét 1,5px, đầu tròn, khung 20px, `currentColor`.
- Mũi tên chuẩn: thân 1,5px, đầu nhọn mở 45°, dài 8px, vẽ bằng một `<path>` để DrawSVG chạy mượt.
- Không dùng logo hay mascot của Anthropic. "Nhân vật" của trang là con trỏ ▍.

## Chuyển động

Chi tiết ở mục **Chuyển động**. Tóm tắt:

- **Một chuyển động mang một nghĩa** (ngữ pháp M1–M10). Không gọi tên được nó giải thích điều gì thì bỏ.
- Mỗi chương tối đa một "khoảnh khắc lớn". Không parallax nền. Không gì lặp vô hạn; con trỏ chỉ nhấp nháy 3 chu kỳ rồi đứng yên.
- Thời lượng theo `dur-*`, ease theo `ease-*`. Tween scrub luôn dùng `ease-scrub` (none).
- Reduced motion (theo OS hoặc nút Motion trong trang): mỗi mục ngữ pháp có dạng tĩnh tương đương; nội dung không mất đi.

## Thành phần

| Thành phần | Dùng khi |
|---|---|
| QuestionCard | Mở chương bằng câu hỏi Socratic |
| PredictPrompt | Người học chốt dự đoán trước khi xem |
| ThenNowCard | Một best practice đổi theo thế hệ model (six shifts) |
| AgentWindow | Sân khấu chính: nhật ký hành động của agent |
| SurfaceTabs | "Cách làm" theo 3 tab: Cowork · Claude Code app · CLI |
| ContextMeter | Simulator S1 và mọi chỗ minh hoạ ngân sách context |
| Logo | Chữ Blocks "No babysitting": dòng code trắng biên dịch thành khối; bản lớn, bản nhỏ, bản văn bản |
| DurabilityTag, SourceBadge | Nhãn độ bền (ô đánh dấu theo hình + chữ trung tính) và nguồn trên mọi mục |
| SourceButton | Nút "Nguồn" luôn nhìn thấy: mở bảng nguồn (loại, người, ngày, verifiedAt, trích nguyên văn, mở bản gốc, sao chép link) để người học tự đối chiếu |
| GrillCard | Câu hỏi nhớ lại cuối chương |
| StatusBoard | Bảng trạng thái BÁO CÁO TUẦN |
| MotionGrammar | Trang trình diễn M1–M10 |
| AsciiHero | Hero: tượng ký tự kiểu Aino, từ khoá nhúng trong hàng; noise → order (M11), lens (M12) |
| ChapterOpener | Màn mở chương: số condensed tràn khung, tên expanded, địa hình ASCII, metadata bốn góc |
| CinematicAscii | Cảnh full-color duy nhất (finale, tuỳ chọn Mở đầu): ký tự mang màu ảnh tự dựng |
| FloatingOps | Agent "đang vận hành thật": ≤ 5 panel nổi do máy trạng thái điều khiển |
| TheColleague | Nhân vật ASCII với 7 trạng thái (M14) |
| LibraryCard | Thẻ mục Library: loại, tiêu đề, một dòng tóm tắt, nguồn, độ bền, cấp độ; mở chi tiết tại chỗ bằng Flip (M3) |
| FilterBar | Tìm (không dấu) + chip lọc loại, cấp độ, độ bền, bề mặt, vai trò + đếm kết quả + danh sách đổi bằng Flip |
| ChapterRail | Mục lục 12 mốc chia 4 phần; dải 12 ô cho mobile và HUD |
| JourneyHUD | Thanh trên 48px: cấp độ, bản đồ harness 6 phần, báo cáo tuần, vị trí chương |
| PresenterHUD | Thanh dưới khi trình chiếu: beat, pha, đồng hồ chương, thanh Thảo luận, phím tắt |
| SimulatorFrame | Khung chung cho S1–S11: mục tiêu, trạng thái, khu thao tác, phản hồi, Kiểm tra / Làm lại |
| ContradictionNote | Các nguồn bất đồng đặt ngang hàng, mỗi bên một nguồn; không chọn bên |
| PlanPill | StatusPill · PlanPill · AvailabilityBadges, kèm bộ chọn "gói của tôi" |

Mọi preview dùng chung `components/bundle.css` (khung, vai chữ, nút, nhãn) và `components/bundle.js` (`window.NoBabysitting`: renderer ASCII, nguồn hình, The Colleague, `decode` cho hành động của agent, `say` cho mọi đổi chữ khác, đồng hồ, thanh khối). Lớp dùng chung mới: `.nb-caps`, `.nb-pill`, `.nb-chip`, `.nb-input`. Trạng thái từng component: `SOURCE-OF-TRUTH.md`. Component mới phải dựng từ hai file này, không tự định nghĩa nút hay nhãn riêng.

## Học từ reference

Đã mở trực tiếp từng site và rút thành quy tắc, không chép: **Aino** → tượng ký tự + chữ nhúng + nhãn con trỏ · **WRDLSS** → chữ condensed tràn khung, địa hình ASCII, nút `[ ]`, đồng hồ sống · **DEIFIED** → expanded lớn, nhãn micro, một ■ accent, ghost text (giãn chữ rộng kiểu DEIFIED không dùng cho tiếng Việt có dấu) · **Asciify** → ký tự mang màu ảnh nguồn · **Artefakt** → metadata bốn góc, nền chấm, bộ đếm `02 / 10` · **Polsia** → panel nổi kể "hệ thống đang làm gì". Không dùng font thương hiệu của các site, không WebGL, không chuyển động lặp vô hạn.

## Accessibility

- Text ≥ 4,5:1; control và vòng focus ≥ 3:1 ở cả hai theme.
- Focus: `outline: 2px solid var(--focus-ring)` với offset 2px, luôn nhìn thấy.
- Mọi animation có "Tóm tắt khung hình" bằng chữ. Không thông tin nào chỉ có trong chuyển động.
- Kéo thả luôn có thay thế bằng bàn phím: Space nhặt, mũi tên di chuyển, Enter thả. Kết quả thông báo qua `aria-live`.
- Thuật ngữ tiếng Anh có `lang="en"`. SplitText giữ `aria: "auto"`.
