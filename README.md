# No Babysitting · Gói handoff (cập nhật 07/11/2026)

*An unofficial guide to Claude Code best practices.* "Từ vibe đến agentic, giao việc cho Claude như giao cho một đồng nghiệp giỏi."

Đây là toàn bộ đầu ra **trước khi phát triển**: PRD, kịch bản sư phạm, design system (tài liệu + token + 17 component có bản xem trước), kế hoạch triển khai (SAD 4+2), ma trận bề mặt đã kiểm chứng, cùng tư liệu nghiên cứu và công cụ kiểm tra. Chưa có dòng code nào của site thật.

## Cập nhật sau review (06/11/2026): đọc phần này trước

Tài liệu trong `docs/` đã được sửa theo 10 quyết định của chủ dự án (zip này gồm bản đã sửa):

- **Thêm chương 05b "The Right Colleague"** (model & effort, theo hướng dẫn chính thức; giữa c05 và c06) + simulator S9 + dữ liệu `models.yml`. Mốc đánh số lại c06…c11 khi bắt đầu code.
- **Docs chính thức là chuẩn** khi tip trong repo mâu thuẫn (ví dụ "bật thinking", "Opus cho mọi việc", ultrathink): tip cũ giữ trong Library với nhãn độ bền; danh sách mâu thuẫn ở `docs/05-surface-matrix.md` §3b.
- **Library tính theo đơn vị mức bài viết** (dòng README, tip lẻ trong bài tip, mục của `best-practice/*.md`, tip từ CLI binary) + `excluded.yml` có lý do (SAD §7.2, §7.2b).
- **Nguồn chính thức bổ sung:** trang Best practices của Claude Code và 4 bài blog tháng 10/2026; không dùng Fable field guide (script §0.11).
- **Giữ nguyên:** tab mặc định *Claude Code app*; palette và định vị (dùng nội bộ, không thương mại hoá); gói của người học trộn lẫn, gắn `PlanPill`.
- **Lịch 12–13 tuần** (M0–M5) thay cho 7–8 tuần; đường chính app-first (phần dành cho dev chuyển vào "Đào sâu"/CLI/Library).
- **Đã viết lại các câu ĐOÁN** c02, c03, c04, c06, c07, c09, 05b, K1–K3 (đáp án không còn dài nhất, vị trí xen kẽ); **chưa rà** c00, c01, c05, c08, c10, K4–K6. Các ý model/effort đã đối chiếu nguyên văn 07/11; còn mở vài điểm (xem todo).
- **c02 và S1 đã viết lại (07/11/2026)** theo trang Best practices: "hết context hiếm khi là vấn đề; `/clear` giữa các việc vẫn đáng làm"; ngưỡng 40% thành *Phụ thuộc model / Chưa thống nhất*. Cần đọc nguyên văn bảng *What you can stop doing* khi viết.
- **Quy tắc nguồn bắt buộc:** mọi nội dung có link bấm được để người học tự đối chiếu; nút `SourceButton` phải được thiết kế đẹp. Toàn bộ link repo, docs, blog và research ở **`docs/06-sources-and-links.md`**.
- **SourceButton đã có preview** (`design-system/components/SourceButton/`). ContextMeter vẫn cần đổi trục theo S1 mới. Chi tiết mọi việc còn lại: `docs/07-todo-handoff.md`.

## Đọc theo thứ tự này

1. `docs/01-PRD.md`: sản phẩm là gì, cho ai, phạm vi v1, quyết định đã chốt (§11), mốc (§12), **câu hỏi mở (§13)**.
2. `docs/02-pedagogical-script.md`: phương pháp (Socratic + Predict–Observe–Explain + simulator), kịch bản "Báo cáo thị trường hằng tuần", nội dung từng chương c00–c10.
3. `docs/03-design-system.md`: token, chữ, chuyển động M1–M14, thành phần, hệ ASCII (§12), khảo sát reference (§12.11), runtime dùng chung (§12.12).
4. `docs/04-implementation-plan-SAD.md`: kiến trúc 4+2 view, cây repo, ADR-01…12, mốc, Definition of Done.
5. `docs/05-surface-matrix.md`: tính năng nào có trên Cowork / Claude Code app / CLI, kèm ngày kiểm chứng.
6. `docs/06-sources-and-links.md`: **mọi link nguồn đã dùng + quy tắc bắt buộc về link nguồn + đặc tả nút SourceButton.**
7. **`docs/07-todo-handoff.md`: danh sách việc còn lại theo mức ưu tiên (P0 chặn việc kế tiếp). Đọc ngay sau README này.**
8. Mở `previews/index.html` để xem 26 component chạy thật (cần mạng: font Google và GSAP từ jsDelivr). Tra nhanh token, vai chữ, quy tắc và trạng thái từng component ở **`design-system/SOURCE-OF-TRUTH.md`**.

## Cấu trúc gói

```
README.md                      ← file này
docs/                          7 tài liệu chính (07 = todo handoff) (Markdown, tiếng Việt)
design-system/                 nguồn của design system (giống bản đã publish)
  README.md                    hướng dẫn dùng hệ thiết kế
  SOURCE-OF-TRUTH.md           trang ngắn: token, vai chữ, quy tắc đã chốt, trạng thái từng component
  tokens.json                  token nguồn (2 theme dark/light)
  tokens.css                   token đã biên dịch ra CSS custom properties
  design-system.json           metadata của artifact
  motion.md                    ngữ pháp chuyển động M1–M14 (một chuyển động, một nghĩa)
  components/bundle.css        khung dùng chung (.nb-*)
  components/bundle.js         runtime dùng chung (window.NoBabysitting)
  components/<Tên>/            preview.html + README.md cho từng component
previews/                      bản xem trước độc lập (đã nhúng token + bundle), mỗi component × 2 theme
  index.html                   trang mục lục
screenshots/components/        ảnh chụp cuối của từng component, dark và light
screenshots/references/        ảnh chụp 5 site reference đã khảo sát
research/knowledge-base/       ghi chú đọc 3 repo nguồn (concepts, tips, workflows, voices, pedagogy, GSAP); đường dẫn `repos/…` trong ghi chú là bản clone của các repo ở mục Nguồn
research/surface-verification/ dữ liệu nghiên cứu bề mặt + vòng kiểm chứng (JSON) và bản tóm tắt (TXT)
tools/                         tokens2css.py · contrast.py (tương phản WCAG) · check.js (render-test, nhiều bề rộng) · build-previews.py · shoot-references.js
```

## Trạng thái

| Hạng mục | Trạng thái |
|---|---|
| PRD, kịch bản sư phạm, SAD 4+2, ma trận bề mặt | Xong. Đã tự rà soát (đối chiếu chéo, kiểm tra thuật ngữ); vòng review đa agent chưa chạy lại vì giới hạn quota |
| Design system: token, 2 theme, chữ, chuyển động | Xong |
| 26 component (preview + README) | 8 component mới và đợt sửa chữ nhỏ, accent, M4 ngày 07/11/2026. Render-test 2 theme × 2 bề rộng (1000px, 360px): không lỗi JS, không cuộn ngang. Chưa chạy axe, screen reader thật. Độ phủ danh sách §7: 19/28 |
| Artifact design system | Đã publish (bản 9): https://claude.ai/artifact/9M5HYXuu1vwQvsonXsPYUs · **đang ở chế độ riêng tư**: người nhận chỉ mở được sau khi chủ sở hữu chia sẻ qua menu Share của trang |
| Code của site (Astro + GSAP) | Chưa bắt đầu; mốc M0 là bước kế tiếp |

## Quyết định chính (chi tiết ở PRD §11)

- **Đối tượng v1:** người dùng Claude và Claude Code ở mức trung bình đến cao, nhiều vai trò, không chia nhánh. Claude Code là agent đa năng; code chỉ là một ứng dụng.
- **Cấu trúc:** Story 11 phần (c00–c10) + Library phủ toàn bộ best practice (khoảng 260 mục). Tự học, có Presenter mode.
- **"Cách làm" theo 3 tab:** Cowork · Claude Code app (mặc định, xem câu hỏi mở 5) · CLI, đọc từ ma trận bề mặt có `verifiedAt`.
- **Six shifts** của Anthropic là sợi chỉ xuyên suốt, gắn nhãn độ bền (Bền vững / Phụ thuộc model / Đã thay thế / Chưa thống nhất); chương kết "No babysitting ≠ no supervision".
- **Visual:** Terminal Brutalism × Cinematic ASCII. Góc vuông; metadata mono neo bốn góc; nút `[ NHÃN ]`; Archivo expanded/condensed cho tên và số; serif chỉ cho câu hỏi Socratic. Ký tự mang màu ngữ nghĩa; full-color chỉ ở Mở đầu và finale. Nhân vật ASCII "The Colleague" phản ánh trạng thái thật. Không dùng WebGL ở v1.
- **Stack:** Astro (static) + GSAP 3.15.0 (pin bản này; mọi plugin GSAP đều miễn phí, kể cả dùng thương mại), Custom Elements, MiniSearch, Fontsource. asciify-engine (MIT) chỉ dùng lúc build và phải pin bản đã phát hành ít nhất 2 tuần (thư viện ra bản mới rất dày).

## Câu hỏi mở cần chủ dự án trả lời (PRD §13)

1. Domain và handle cho "No Babysitting" (trung tính, không chứa "claude"); chưa kiểm tra.
2. Hosting: Vercel (preview mỗi PR) hay GitHub Pages?
3. Có bật analytics ẩn danh (opt-in) để đo mục tiêu G1, G2 không?
4. v2: cá nhân hoá theo vai trò, hay làm bản tiếng Anh trước?
5. ✅ Đã chốt: tab mặc định là *Claude Code app*.
6. ✅ Đã chốt: gói của người học trộn lẫn, gắn nhãn theo gói (`PlanPill`).

## Bước tiếp theo đề xuất

1. Chốt 6 câu hỏi mở ở trên.
2. **M0 · Tracer bullet (khoảng 1,5 tuần):** khung Astro + token + `bundle.css/js` chuyển thành module; SurfaceTabs đọc `matrix.yml`; Mở đầu + Chương 02 + simulator S1/S2; Library tối thiểu; Presenter cơ bản (SAD §Development view).
3. Trước khi viết nội dung chương nào, chạy lại kiểm chứng các mục của chương đó trong `05-surface-matrix.md` (quá 30 ngày thì coi là cần kiểm chứng lại).
4. Tổng ước lượng M0–M5 khoảng 12–13 tuần cho 1 người làm cùng Claude Code (PRD §12).

## Xem và kiểm tra component

- **Xem nhanh:** mở `previews/index.html`. Mỗi file preview đã nhúng sẵn token và runtime, chỉ cần mạng để tải font và GSAP.
- **Sửa rồi kiểm tra lại:**
  ```bash
  python3 tools/tokens2css.py design-system/tokens.json design-system/tokens.css   # sau khi sửa token
  python3 tools/contrast.py design-system/tokens.json --fail                         # tương phản WCAG
  mkdir -p tools/shots && cp design-system/tokens.css tools/tokens.css
  node tools/check.js "$PWD/design-system" "$PWD/tools" all 1000,360                # hoặc Comp1,Comp2
  python3 tools/build-previews.py                                                    # sinh lại previews/
  ```
  `check.js` cần Playwright + Chromium. Đối số thứ 3 là danh sách component (hoặc `all`), thứ 4 là các bề rộng. Nó chụp mỗi component ở cả 2 theme (trước và sau khi bấm mọi nút đang hiện, nhấn Esc sau mỗi lần bấm), báo lỗi JS và cuộn ngang, ghi ảnh vào `tools/shots/`.
- **Quy ước khi thêm component:** dựng từ `bundle.css` / `bundle.js`; mọi tween phải ứng với một mục M1–M14; có trạng thái tĩnh tương đương cho reduced motion; chữ cần đọc luôn là HTML, canvas ASCII luôn `aria-hidden`; nhãn mono ≥ 12px, tiếng Việt viết thường; accent chỉ cho hành động và hiện tại (xem `design-system/SOURCE-OF-TRUTH.md`).

## Hạn chế đã biết

- Cảnh full-color (CinematicAscii) đang dùng ảnh dựng bằng code: đã có kết cấu, nhưng mặt trời chưa thành hình tròn rõ. Bản thật nên render sẵn lúc build từ một ảnh tự chụp (không dùng ảnh stock hoặc ảnh có thương hiệu).
- Các kiểm tra hiển thị chạy trên bản local; chưa mở lại artifact đã publish bằng trình duyệt sau lần publish cuối.
- Một số mốc thời gian và trích dẫn (ví dụ ngưỡng context 40% theo Dex) là quan điểm của nguồn, đã gắn nhãn "Chưa thống nhất" nơi có ý kiến khác.

## Nguồn

- Best practice: https://github.com/shanraisshan/claude-code-best-practice
- GSAP: https://github.com/greensock/GSAP · Agent skills: https://github.com/greensock/gsap-skills
- Six shifts (Anthropic): https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
- Docs Claude Code: https://code.claude.com/docs · Trung tâm hỗ trợ: https://support.claude.com
- Reference thị giác (chỉ học quy tắc, không chép): https://aino.agency/ · https://wrdlss.club/ · https://elvas.studio/work/deified-brand-identity-website-and-motion/ · https://asciify.org/ · https://artefakt.mov/ · video Polsia do chủ dự án cung cấp

No Babysitting là dự án cộng đồng độc lập, không phải sản phẩm hay trang chính thức của Anthropic.
