# Nguồn sự thật · No Babysitting design system

> Trang ngắn để tra nhanh. Khi trang này và tài liệu dài (`docs/03-design-system.md`) nói khác nhau, **trang này đúng**, rồi sửa tài liệu dài cho khớp. Cập nhật lần cuối: 07/11/2026.

## 1. Token màu

Giá trị gốc ở `tokens.json`; CSS sinh ra bằng `python3 tools/tokens2css.py design-system/tokens.json design-system/tokens.css`. Tương phản đo bằng `python3 tools/contrast.py design-system/tokens.json --fail` (hiện 0 cặp dưới ngưỡng).

| Token | Dark | Light | Dùng cho | Tương phản trên `bg` / `bg-raised` (dark · light) |
|---|---|---|---|---|
| `fg` | `#ede6da` | `#1a1714` | Chữ chính | 15,1 / 14,1 · 15,6 / 17,0 |
| `fg-muted` | `#ada395` | `#575047` | Chữ phụ, nhãn micro | 7,5 / 7,0 · 6,9 / 7,6 |
| `fg-subtle` | `#8d8376` | `#6b6257` | Meta, số đếm, mốc sắp tới | 5,0 / 4,7 · 5,2 / 5,7 |
| `accent` | `#d97a4a` | `#a0461f` | **Chỉ hành động và hiện tại** (xem §3) | 6,1 / 5,7 · 5,4 / 5,9 |
| `signal` | `#8cc084` | `#3a7034` | Ô đặc: đạt, đã kiểm chứng, *Bền vững* | ≥ 5,2 |
| `warn` | `#e2b04a` | `#8a5d00` | ◐ cần cân nhắc, *Phụ thuộc model*, quá giờ | ≥ 5,0 |
| `danger` | `#ee7a66` | `#ae3524` | ✕ bị chặn, *Đã thay thế* | ≥ 5,5 |
| `info` | `#8fb3d9` | `#2c5a87` | ⇄ *Chưa thống nhất*, chưa GA (viền đứt nét) | ≥ 6,3 |
| `control` | `#756a5e` | `#857c70` | Viền control, hairline của khung | ≥ 3,3 (không phải chữ) |
| `chart-1` / `chart-2` | `#5a8fd8` / `#cc6c3e` | `#2e64b0` / `#a0461f` | Chuỗi dữ liệu | — |
| `level-1…4` | ramp cam một tông | ramp cam một tông | Cấp độ Low → Pro, luôn kèm nhãn chữ | — |

`bg-sunken` chỉ mang chữ `fg`.

## 2. Vai chữ

| Vai | Họ | Cỡ | Quy tắc |
|---|---|---|---|
| **Logo** | Bitmap Blocks (Newsreader 800 lấy mẫu, 139×18 / 104×14) | ≥ 36px / 28px | Không phải font: dùng `NB.logoSVG()` hoặc `assets/Logo/`; phóng theo bội số nguyên |
| Tên chương tiếng Anh | Archivo 125%, 800 | 15–64px | Viết hoa |
| Số lớn (chương, bộ đếm, điểm) | Archivo 62%, 800 | 48–300px | `tabular-nums`; số lớn **không** dùng accent |
| Câu hỏi Socratic, trích dẫn | Newsreader | 19–72px | Serif chỉ ở đây. Ngoặc kép + nghiêng **chỉ** cho lời nguyên văn đã đối chiếu |
| Thân bài, UI | Be Vietnam Pro | 14,5–19px | 17px / 1,65 cho thân bài, tối đa 66ch |
| Nhãn micro, eyebrow, nút, tag, chip | JetBrains Mono 600 | **≥ 12px** | Giãn 0,04–0,06em, **không `text-transform`**. Tiếng Việt viết thường; tiếng Anh, mã, số viết hoa sẵn hoặc `.nb-caps`. Tên component (`SourceButton`) và mã (`c04:b3`) giữ nguyên |
| Hành động agent, code | JetBrains Mono 400–500 | 12,5–14px | Tiếng Việt viết thường ("Đọc", "Tra web") |

## 3. Quy tắc đã chốt (07/11/2026)

1. **Accent = hành động + hiện tại.** CTA và nút chính, focus, tab/mốc/beat hiện tại, agent đang làm (`working`), con trỏ ▍, ô ■ ở nhãn góc. Không cho số lớn, mã M, mũi tên, gạch ngang, tiêu đề, chip lọc, HUD. **Ngoại lệ duy nhất: logo** (nhận diện), và không đặt logo accent sát một nút accent.
2. **Nhãn (`.nb-tag`) = ô đánh dấu 9px + chữ mono `fg`**, không khung, không chữ màu. Hình của ô mang nghĩa: đặc (có, đã chắc) · nửa (một phần, còn tuỳ) · gạch chéo (bị thay, bị chặn) · chấm (chưa rõ, chưa ngã ngũ) · rỗng (chưa có). Chữ phải tự đủ nghĩa.
3. **M4 (decode) chỉ cho hành động của agent**: động từ và dòng nhật ký agent, tên lệnh trong tab CLI. Mọi đổi chữ khác dùng `NB.say` (fade `dur-quick`). Bộ ký tự xáo trộn `NB.SCRAMBLE` không có dấu.
4. **Không có chuyển động ngoài M1–M14.** Thứ gì không có nghĩa trong ngữ pháp (ví dụ lên cấp ở HUD) thì đổi tức thì.
5. **The Colleague:** cấm *hình* kiểu mascot (con vật, nhân vật khối pixel), không cấm *màu*. Logo Blocks là *chữ*, không phải nhân vật. Lưu ý: chữ khối màu cam trong khung terminal gợi tới banner của chính Claude Code; ổn khi dùng nội bộ, nhưng nếu công khai thì xem lại cùng việc đổi accent (todo P0 số 5). `working` dùng accent. `overloaded` không gắn với ngưỡng context.
6. **Context (S1):** hai chỉ số *độ tập trung* và *chi phí mỗi lượt*, không có vùng đỏ hay ngưỡng cố định; ngưỡng của từng nguồn nằm trong ContradictionNote.
7. **Harness có 6 phần** theo PRD G1: context · kế hoạch · trí nhớ · khối xây dựng · rào chắn · kiểm chứng. Không dùng "10 trụ".
8. **Mobile (≤ 520px):** nhãn góc phải ẩn; thông tin bắt buộc (ví dụ "mô phỏng") phải có trong thân component.
9. **Không đoán dữ liệu.** Gói, bề mặt, trạng thái lấy từ `matrix.yml`; ô chưa rõ hiện `?`.

## 4. Trạng thái component

Kiểm tra tự động (`tools/check.js … all 1000,360`): **27/27 không lỗi JS và không cuộn ngang ở 1000px và 360px, cả hai theme** (07/11/2026). Chưa chạy: axe, screen reader thật, đo hiệu năng canvas trên máy yếu.

| Component | Nhóm | Preview + README | Trạng thái có trong preview | Ghi chú |
|---|---|---|---|---|
| QuestionCard | Story | ✓ | vào cảnh (M5) | |
| PredictPrompt | Story | ✓ | chưa chọn · đã chọn · đã chốt · quan sát | |
| ThenNowCard | Story | ✓ | trước · M6 → M1 → settle | |
| GrillCard | Story | ✓ | ẩn · nhắc · hiện · đã tự chấm | |
| AgentWindow | Sân khấu | ✓ | chạy · chờ quyền · xong; app / cli | |
| SurfaceTabs | Cách làm | ✓ | 3 tab · chưa có ở đây | Cần gắn PlanPill/StatusPill thật |
| SourceButton | Nhãn | ✓ | thường · mở · có mâu thuẫn · quá 30 ngày | Cần duyệt rồi áp đại trà |
| SourceBadge | Nhãn | ✓ | — | Dạng thu gọn của SourceButton |
| DurabilityTag | Nhãn | ✓ **làm lại** | 4 loại · chú giải hình · trong danh sách · cạnh số | Kiểu chung của mọi `.nb-tag` |
| Logo | Thương hiệu | ✓ **mới** | gõ → biên dịch · chính · đơn sắc · đảo màu · bản nhỏ · bản văn bản | Bitmap ở `assets/Logo/` |
| ContradictionNote | Nhãn | ✓ **mới** | 3 bên · 2 bên (số đếm lệch) | |
| PlanPill (+ StatusPill, AvailabilityBadges) | Nhãn | ✓ **mới** | 4 trạng thái phát hành · gói của tôi · 4 trạng thái bề mặt | |
| StatusBoard | HUD | ✓ | 0/4 → 4/4 | |
| JourneyHUD | HUD | ✓ **mới** | thu gọn · chi tiết · 12 chương | |
| PresenterHUD | HUD | ✓ **mới** | 8 beat · thảo luận · quá giờ · phím tắt | NotesWindow chưa có |
| ChapterRail | Điều hướng | ✓ **mới** | qua · hiện tại · sắp tới · dải 12 ô | |
| LibraryCard | Library | ✓ **mới** | thường · hover · mở · đã thay thế | |
| FilterBar (+ SearchBox) | Library | ✓ **mới** | tìm không dấu · lọc 5 chiều · rỗng | Chưa có chip nguồn, chương, nguyên lý |
| SimulatorFrame | Simulator | ✓ **mới** | chờ ▍ · đang làm · hoàn tất | Ví dụ S4 |
| ContextMeter | Simulator | ✓ **làm lại** | 2 chỉ số · tua lại · nén · phiên mới | Khung S1 mới |
| MotionGrammar | Chuyển động | ✓ | M1–M10 | |
| AsciiHero | ASCII | ✓ | noise → order · lens | Tượng chưa nói lên ý gì (việc kế) |
| ChapterOpener | ASCII | ✓ | vào cảnh | |
| CinematicAscii | ASCII | ✓ | — | Nên dựng từ ảnh thật lúc build (việc kế) |
| FloatingOps | ASCII | ✓ | idle → done | |
| TheColleague | ASCII | ✓ | 7 trạng thái | |
| Cover | Bìa | preview, chưa README | — | Chỉ để chụp bìa |

**Trong §7 nhưng chưa có preview (9):** ObserveStage · ExplainBlock · DeepDive · CommandBlock · UseCaseCard · GlossaryTerm · NotesWindow · ThemeToggle/MotionToggle · StarterTemplate. Độ phủ §7: 19/28 mục (trước 07/11/2026: khoảng 9).

## 5. Việc kế tiếp của design system

1. Hero: tượng ASCII có nghĩa (ví dụ hỗn loạn → mũi tên hoặc bàn làm việc); CinematicAscii dựng từ ảnh thật lúc build.
2. Font: cắt subset Archivo chỉ còn chữ Latin hoa, số và ký hiệu (nó chỉ dùng cho tên tiếng Anh và số); thử canvas ASCII trên máy yếu (≤ 4k ô, 30 fps).
3. 9 component còn thiếu ở trên, ưu tiên CommandBlock, DeepDive, UseCaseCard.
4. axe + screen reader + snapshot 3 bề rộng × 2 theme trong CI.
