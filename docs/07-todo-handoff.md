# 07 · Danh sách việc còn lại (handoff, 07/11/2026)

> Đọc sau `README.md` của gói. Mục đích: người làm tiếp biết *chính xác* cái gì đã xong, cái gì còn mở, và phải làm gì trước khi viết nội dung hoặc code. Ký hiệu: **P0** = chặn việc kế tiếp · **P1** = làm trong mốc tương ứng · **P2** = cải thiện. Mỗi việc ghi nơi liên quan.

## 0. Trạng thái một dòng

Giai đoạn trước phát triển đã xong: PRD 2.2, Script (12 phần gồm 05b), Design system (**27 component có preview**, đợt sửa 07/11/2026 ở §5b), SAD 4+2, ma trận bề mặt, tài liệu nguồn. Site Astro đã có khung toàn site (M0). **Từ 07/11/2026 kế hoạch chạy theo `08-kaizen-go-live.md`** (go live ngay dạng beta, rồi các đợt K0–K6); chuyển động theo `09-motion-script.md`.

## 1. Việc chặn: làm trước khi viết nội dung chương (P0)

| # | Việc | Vì sao | Nơi |
|---|---|---|---|
| 1 | **Mở trang Best practices chính thức và đọc nguyên văn bảng *What you can stop doing* (7 dòng, cả cột giải thích).** Hiện mới đọc qua bản tóm tắt của công cụ (trang bị cắt ở khoảng 40.000/52.500 ký tự) | Dòng "manage the context window aggressively" đã khiến viết lại c02/S1; các dòng khác (subagent, ALL CAPS, "keep going", CLAUDE.md) ảnh hưởng c04, c05, c06, c08, c09, c10 | Script c02, §0.11; `06-sources-and-links.md` |
| 2 | **Tìm URL chuẩn và đọc 4 bài blog tháng 10/2026**: code review (15/10), agent automations (08/10), cloud sessions (06/10), mods (01/10). Hiện chỉ biết tiêu đề và ngày | Là nguồn bổ sung cho c07, c09, c06 (quyết định 06/11) | `06-sources-and-links.md` §4 |
| 3 | **Kiểm tra URL chuẩn của bài six shifts**: trang đã tải ghi "claude.dev Blog", tài liệu đang dẫn `claude.com/blog/...` | Nguồn của sợi chỉ xuyên suốt | `06-sources-and-links.md` §3 |
| 4 | **Kiểm chứng tay các ô "?" của ma trận bề mặt**: 22/36 tính năng trên Cowork chưa có tài liệu; `/compact`, `/memory`, rewind trên Desktop; đường dẫn upload skill; Add plugins; bật Chrome; menu Plan trên Mobile; **Artifacts ở từng bề mặt**; **bộ chọn model/effort trên Desktop và Cowork** | "Không mô tả UI chưa được nguồn xác nhận" (PRD §7); tab mặc định đã chốt là Claude Code app, nhưng Cowork là nơi docs đặt việc văn phòng | `05-surface-matrix.md` §4 |
| 5 | ✅ *Đã chốt 07/11/2026: go live công khai, giữ palette cam + disclaimer rõ (08 · D7, D10).* ~~**Chốt việc phân phối nội bộ.**~~ Sản phẩm dùng nội bộ, không thương mại hoá (chủ dự án, 07/11), nhưng PRD vẫn ghi "dự án cộng đồng độc lập", câu hỏi domain/hosting/analytics còn mở. Palette giữ nguyên giống màu Anthropic theo quyết định của chủ dự án; **nếu sau này công khai thì phải đổi accent và nền trước khi công bố** | Tránh nhầm là trang chính thức; PRD đang mâu thuẫn nhẹ với thực tế dùng nội bộ | PRD §0, §11, §13 |

## 2. Nội dung và sư phạm (P1)

- [ ] **Chương 05b (model & effort):** còn mở bốn điểm: bộ chọn trên Desktop/Cowork; thinking của Fable ở mức API; phạm vi yêu cầu phiên bản `ultrathink` (v2.1.311); mức effort mặc định của Opus 4.7 (docs Claude Code ghi `xhigh`, trang API ghi `high`). Tên model, mức mặc định, lịch gỡ Fast mode (Opus 4.8: gỡ 30/11/2026) **chỉ đặt trong `models.yml`**, có `verifiedAt`. Đánh số lại c06…c11 khi bắt đầu code.
- [ ] **Viết lại các câu ĐOÁN chưa rà.** Đã viết lại: c02, c03, c04, c06, c07, c09, 05b và Diagnostic K1, K2, K3. **Chưa rà theo Phụ lục C:** c00, c01, c05, c08, c10 và K4–K6. Quy tắc: ba phương án chênh ≤ 15% độ dài, đáp án đúng không phải phương án dài nhất, phương án sai là ngộ nhận có nguồn, vị trí đáp án xen kẽ.
- [ ] **c02 và S1 (đã viết lại theo khung mới) cần viết nội dung thật** sau khi xong việc P0 số 1; c10 (six shifts) cần khớp với khung "context tập trung" mới.
- [ ] **Lộ trình rút gọn (khoảng 93 phút)** chỉ đạt một nửa tiêu chí ④ của bảng trạng thái; thêm c09 (+12′) nếu cần đạt đủ. Kiểm tra lại c10 không dựa vào c06 khi người học đã bỏ qua nó (c06 nay dạy rào chắn người dùng app tự đặt được; hook/sandbox ở "Đào sâu").
- [ ] **Đường chính app-first:** chuyển c05 b6 (TodoWrite) vào "Đào sâu" (đã ghi trong Script, chưa viết); c08 mở bằng quy trình, framework cộng đồng vào "Đào sâu"/Library gắn nhãn "Cho người dùng dev".
- [ ] **Hai simulator không có trong danh sách cũ** (S10 Lắp dàn nhạc ở c08; S11 Giao việc cho đội agent ở c09) đã đánh số và đưa vào PRD §8; cần thiết kế chi tiết và đưa vào mốc M3.
- [ ] **Mục tiêu G1/G2 không đo được khi tắt tracking.** Chọn: analytics ẩn danh opt-in, tự báo cáo của người học, hoặc mục tiêu không bằng số (PRD §9, §13).
- [ ] **Speaker notes** cho mọi beat (`speakerNotesVi`) chưa viết; chưa có mốc nào trừ M4.
- [ ] **Số tip:** README ghi 83, đếm thực tế 82. Test ingest cảnh báo, dùng số đếm được và hiện ContradictionNote.

## 3. Library và ingest (P1, mốc M1 và M4)

- [ ] Ingest theo **đơn vị mức bài viết**: dòng README + tip lẻ trong bài tip + mục của `best-practice/*.md` + 42 tip từ CLI binary; ghi phần bỏ vào `excluded.yml` có lý do (SAD §7.2).
- [ ] Loại trường dễ đổi (số sao GitHub, ngày "Last Updated", số phiên bản trong badge) khỏi fingerprint để cron hằng tuần không mở PR giả.
- [ ] Đếm lại sau lần ingest đầu: ước tính **350–450 mục** (không còn là ≈260). Cập nhật PRD §5, SAD §7 theo số thực.
- [ ] Tóm tắt tiếng Việt, cấp độ, nguyên lý, nhãn độ bền cho mọi mục (M4). Tip cũ mâu thuẫn với docs chính thức giữ trong Library với nhãn *Đã thay thế* / *Phụ thuộc model* / *Chưa thống nhất* (danh sách ở `05-surface-matrix.md` §3b: `/loop` 3 so với 7 ngày, bật thinking, ultrathink, Opus cho mọi việc so với `opusplan`, hook chuyển quyền sang Opus, think hard/IN HOA, quản lý context quyết liệt).
- [x] ~~Filter bar thiếu bộ lọc bề mặt và vai trò~~ → FilterBar có đủ loại, cấp độ, độ bền, bề mặt, vai trò. Còn thiếu chip **nguồn, chương, nguyên lý** (nguyên lý chờ định nghĩa, xem §4).

## 4. Tài liệu còn mâu thuẫn chưa sửa (P1; phát hiện ở review 06/11)

- [ ] `05-surface-matrix.md` vẫn dùng **tên chương cũ** ở các tiêu đề c02–c09; đồng bộ với Script (The Briefing Budget, The Brief, …).
- [x] ~~The Colleague `working` màu accent so với lệnh cấm "khối pixel màu cam"~~ → **chốt 07/11/2026: cấm *hình*, không cấm *màu*.** Wordmark và tên chương thống nhất theo §2.1 (Archivo expanded; serif chỉ cho câu hỏi Socratic), đã sửa §0.0.
- [x] ~~"10 trụ harness" chưa định nghĩa~~ → JourneyHUD dùng **6 phần harness theo PRD G1** (đã sửa §7 và preview).
- [ ] **Nguyên lý P1–P12**: `Overlay.principles` (SAD §7.1) có trường này nhưng **không tài liệu nào định nghĩa 12 nguyên lý** (đã kiểm 07/11/2026). Định nghĩa danh sách, hoặc bỏ trường và chip lọc "nguyên lý" của FR-06.
- [ ] Mốc M0 ghi số tính năng của c02 khác ma trận (xem SAD §9); đối chiếu lại.
- [x] ~~Ngưỡng 40%/60% của `overloaded` và ContextMeter~~ → đã bỏ (07/11/2026).

## 5. Thiết kế và component (P1/P2)

- [ ] **SourceButton:** đã có preview và README (`design-system/components/SourceButton/`). Cần **duyệt thiết kế rồi áp vào mọi component có số liệu/trích dẫn** (QuestionCard, ThenNowCard, SurfaceTabs, mục Library…); `SourceBadge` thành dạng thu gọn. Đặc tả ở `06-sources-and-links.md` §2. Phải **đẹp và luôn nhìn thấy**.
- [x] ~~ContextMeter đổi trục~~ → đã làm lại: hai chỉ số *độ tập trung* và *chi phí mỗi lượt*, không vùng đỏ, mốc 1M ở xa (07/11/2026).
- [ ] **Cảnh/hình cho c05b** (thanh mức nghĩ `░▒▓█`, S9) chưa có preview.
- [ ] **CinematicAscii:** cảnh dựng bằng code, mặt trời chưa thành hình tròn rõ. Bản thật nên render sẵn lúc build bằng asciify-engine từ **ảnh tự chụp/tự dựng** (không ảnh stock, không ảnh có thương hiệu); ghim bản đã phát hành ≥ 2 tuần.
- [ ] **Component hiện là preview HTML tĩnh**, không phải module sản xuất: chuyển `bundle.js`/`bundle.css` thành module của Astro, cache glyph atlas, kiểm tra hiệu năng trên thiết bị yếu (≤ 4k ô, 30 fps), ngân sách JS ≤ 150 KB gzip mỗi trang.
- [ ] **Reduced motion, axe, screen reader thật, snapshot 3 bề rộng × 2 theme trong CI** chưa chạy. Đã có: render-test 27 component × 2 theme × 2 bề rộng (1000px, 360px), không lỗi JS, không cuộn ngang (07/11/2026).
- [ ] Palette giữ nguyên theo quyết định chủ dự án (xem P0 số 5).

## 5b. Đợt sửa design system 07/11/2026 (theo bản tự nhận xét 7/10)

Đã làm (chi tiết và trạng thái từng component: `design-system/SOURCE-OF-TRUTH.md`):

- **Chữ nhỏ tiếng Việt:** nhãn micro, nút, tag, chip lên ≥ 12px, giãn 0,04–0,06em, bỏ `text-transform`; tiếng Việt viết thường, tiếng Anh và số viết hoa (`.nb-caps`). Áp vào 18 component cũ.
- **`fg-subtle` dark** `#857b6f` → `#8d8376`: từ 4,2 lên 4,7:1 trên `bg-raised`. Thêm `tools/contrast.py` (0 cặp dưới ngưỡng).
- **Kỷ luật accent:** bỏ accent khỏi số lớn, mã M1–M10, mũi tên, gạch ngang, số bước, nhãn "Đáp án". **M4 chỉ cho hành động của agent**; 8 chỗ còn lại chuyển sang `NB.say`. Bộ ký tự xáo trộn không dấu.
- **8 component mới:** LibraryCard, FilterBar (+ SearchBox), ChapterRail, JourneyHUD, ContradictionNote, PlanPill (+ StatusPill, AvailabilityBadges), SimulatorFrame, PresenterHUD. Độ phủ §7: 19/28.
- **Sửa mâu thuẫn tài liệu:** wordmark, Colleague, ContextMeter, 10 trụ, ChapterRail 11 → 12 mốc, M4.
- **Mobile:** nhãn góc phải ẩn ở ≤ 520px (hai nhãn góc đè nhau ở 360px); `check.js` nhận bề rộng (`1000,360`) và bỏ qua nút ẩn.

**Bổ sung cùng ngày (theo yêu cầu chủ dự án):**

- **Logo Blocks:** chữ "No babysitting" dạng khối pixel (Newsreader 800 lấy mẫu, bản lớn 139×18, bản nhỏ 104×14), xuất hiện như một dòng code chữ trắng được gõ rồi biên dịch thành khối. Component `Logo`, file gốc ở `design-system/assets/Logo/`, công cụ `tools/make-logo.js`. Đã gắn vào Cover (bản lớn) và JourneyHUD (bản nhỏ, đơn sắc).
- **DurabilityTag và mọi `.nb-tag` làm lại:** bỏ khung viền màu và chữ màu; còn ô đánh dấu 9px mang nghĩa bằng hình (đặc, nửa, gạch chéo, chấm, rỗng) + chữ mono `fg`.
- [ ] Nếu công khai: chữ khối màu cam gợi tới banner của Claude Code; xem lại logo cùng việc đổi accent (P0 số 5).
- [ ] Favicon: chưa có (bitmap 104×14 quá rộng cho ô vuông); cần một monogram khối, ví dụ "Nb".

Còn lại của bản tự nhận xét (P2): tượng ASCII ở Hero có nghĩa; CinematicAscii từ ảnh thật; subset font Archivo; thử canvas trên máy yếu; 9 component §7 chưa có preview (ObserveStage, ExplainBlock, DeepDive, CommandBlock, UseCaseCard, GlossaryTerm, NotesWindow, ThemeToggle/MotionToggle, StarterTemplate).

## 6. Quy trình và chất lượng (P1)

- [ ] **Vòng review đa agent chưa chạy lại** sau các chỉnh sửa 06–07/11 vì giới hạn quota. Chạy lại một lượt (traceability, mâu thuẫn, độ chính xác, tính khả thi) trước M0; kiểm chứng mọi con số trong Script bằng người hoặc fact-checker.
- [ ] Mọi nội dung phải có **link nguồn bấm được** (`SourceButton`, `sources: SourceRef[]` bắt buộc; build fail nếu thiếu; link checker hằng tháng). Toàn bộ link đã dùng ở `06-sources-and-links.md`.
- [ ] CI nhắc kiểm chứng lại ma trận bề mặt, `models.yml`, `official-sources.yml` mỗi 30 ngày; rà blog và docs chính thức mỗi tháng.
- [ ] **Dogfood:** làm site bằng Claude Code theo chính các nguyên tắc của site (SAD §Dogfooding).

## 7. Việc đã làm nhưng nên biết giới hạn

- Artifact design system bản mới https://claude.ai/artifact/VmP9E4UDLaN5jpB2rZeRUH (07/11/2026, 27 component) đang **riêng tư**; chia sẻ qua menu Share nếu cần người khác xem. Bản cũ (`9M5HYXuu1vwQvsonXsPYUs`, version 9) báo "không tìm thấy" khi đọc từ tài khoản hiện tại.
- **Chưa đưa file lên Google Drive** (công cụ Drive không nhận file zip; cần tự tải lên).
- Các kiểm tra hiển thị chạy trên bản local; chưa mở lại artifact đã publish bằng trình duyệt sau lần publish cuối.
- Link npm của `asciify-engine` ghi theo trí nhớ, chưa mở lại kiểm tra.
- Mọi ý model/effort đã đối chiếu nguyên văn ngày 07/11/2026 trừ các điểm còn mở ở §2; ý trong bảng *What you can stop doing* chỉ qua bản tóm tắt.

## 8. Bước đầu tiên đề xuất

1. Làm hết **P0** (§1), đặc biệt đọc nguyên văn bảng *What you can stop doing*.
2. Sửa nhóm mâu thuẫn ở §4 (một buổi).
3. Bắt đầu **M0 · Tracer bullet** (PRD §12; SAD §9): khung Astro + token + `bundle` thành module, SurfaceTabs đọc `matrix.yml`, Mở đầu + Chương 02 (khung mới) + S1/S2, Library tối thiểu, Presenter cơ bản, **SourceButton ngay từ đầu**.
