# Design System · No Babysitting

> Hệ thiết kế cho phần nhìn và chuyển động của trang. Mỗi quyết định đều trả lời câu hỏi *"nó phục vụ việc học điều gì?"*
> Đi kèm `01-PRD.md` và `02-pedagogical-script.md`. Bản trực quan có token và preview chuyển động chạy thật được xuất bản thành artifact *Design System*.

---

## 0. Ý đồ thiết kế

### 0.0 Thương hiệu

- **Tên:** *No Babysitting*. **Logo (chốt 07/11/2026):** chữ "No babysitting" dạng **Blocks**: Newsreader 800 lấy mẫu xuống lưới pixel thô (bản lớn 139×18, bản nhỏ 104×14), màu accent hoặc đơn sắc `fg`. Bitmap là bản gốc (`design-system/assets/Logo/`, component `Logo`); không gõ lại bằng font. Khi xuất hiện lần đầu, logo là một dòng code chữ trắng được gõ ra rồi biên dịch thành chữ khối (họ M11). Tên chương tiếng Anh vẫn dùng Archivo expanded (§2.1); serif dạng chữ chỉ dành cho câu hỏi Socratic và trích dẫn. Luôn đi kèm descriptor *"An unofficial guide to Claude Code best practices"* (`small`, `fg-muted`).
- **Ẩn dụ "giao việc cho đồng nghiệp mới"** khớp với khung "bàn làm việc của agent" ở §0.1: bàn làm việc chính là nơi đồng nghiệp mới làm việc, và harness là những gì bạn đặt lên bàn đó (công cụ, hồ sơ, quyền, người duyệt).
- **Không dùng** logo, mascot hay bảng màu nhận diện của Anthropic. "Nhân vật" của trang là **The Colleague**, một gương mặt ASCII trung tính (§12.6), cố ý không giống mascot chính thức nào.

> **Cập nhật 06/11/2026: tiến hoá thành *Terminal Brutalism × Cinematic ASCII*.** Token màu, hai theme, ba giọng chữ và ngữ pháp M1–M10 được giữ nguyên. Có ba thay đổi: (1) **ASCII** trở thành ngôn ngữ đồ hoạ chính, xem §12; (2) cấu trúc **brutalist**: góc vuông, viền cứng, lưới lộ ra, số chương mono cỡ lớn; (3) nhân vật **The Colleague** thay con trỏ ▍ làm "nhân vật" của trang. Con trỏ ▍ vẫn mang nghĩa *tới lượt bạn*.

### 0.1 Ý tưởng: **Terminal Editorial**, đọc lại thành "bàn làm việc của agent"

Ở đây "terminal" **không** có nghĩa là "trang dành cho người gõ lệnh". Nó là thẩm mỹ của **bàn làm việc của một agent**: nơi Claude đọc file, tra web, gọi công cụ, viết báo cáo, và mọi hành động hiện ra thành một nhật ký rõ ràng. Hình ảnh này đúng cho mọi bề mặt (Desktop, Web, Cowork, Mobile, CLI), vì ở đâu Claude Code cũng làm việc theo cùng một cách: *thấy → làm → kiểm*. Trang phối hai thế giới:

- **Bàn làm việc (dark, mặc định).** Là nơi agent hành động: context đầy dần, file được đọc, quyền được hỏi, số liệu được đối chiếu. Nền tối ấm, không đen tuyền, để đọc lâu không mỏi.
- **Bản vẽ (giấy kẻ ô, light).** Là nơi quy trình được phác ra. Màu giấy và lưới lấy cảm hứng từ hình minh hoạ *six shifts* bạn gửi: mũi tên mảnh, chữ grotesk đậm nhạt xen kẽ. Hai theme dùng **cùng một lưới ô 40px**. Light là "giấy dưới ánh đèn", dark là "cùng tờ giấy ấy khi tắt đèn và bàn làm việc của agent sáng lên".

**Để người dùng App không thấy trang "chỉ cho dev":** khung cảnh mặc định là `AgentWindow` trung tính, không phải cửa sổ shell. Mono thể hiện *hành động của agent* ("Đọc `doanh-thu-T10.xlsx`", "Tra web: giá đối thủ"), không mặc định là lệnh. Lệnh shell chỉ xuất hiện trong tab **CLI**. Ví dụ và copy đều là công việc văn phòng.

### 0.2 Ba giọng nói, ba kiểu chữ

| Giọng | Vai trò sư phạm | Kiểu chữ |
|---|---|---|
| **Giọng Socratic**: hỏi, gợi | Câu hỏi mở chương, câu trích (tên chương thuộc giọng cấu trúc: §2.1 `--font-wide`) | Serif biên tập **Newsreader** |
| **Giọng giải thích**: hiểu | Thân bài, UI, chú thích | Grotesk **Be Vietnam Pro** |
| **Giọng agent**: chứng minh | Hành động của agent, tên file, số liệu, tên tính năng và UI (`Plan mode`, `/compact`), lệnh trong tab CLI, nhãn | Mono **JetBrains Mono** |

Quy tắc: *serif hỏi, mono chứng minh, sans giải thích.* Không đổi vai giữa các giọng. Người học vì thế biết ngay khi nào mình đang bị hỏi, khi nào đang được giải thích, và khi nào đang nhìn bằng chứng.

### 0.3 Ba motif mang nghĩa (không phải trang trí)

| Motif | Nghĩa | Xuất hiện ở |
|---|---|---|
| **Mũi tên →** (nét mảnh, đầu nhọn mở) | *chuyển thành / dẫn tới*: Then → Now, Command → Agent → Skill, R → P → E → Rv → S | Mọi beat Then→Now, sơ đồ luồng, six shifts |
| **Con trỏ khối ▍** | *tới lượt bạn* | `PredictPrompt`, `GrillCard`, simulator đang chờ thao tác |
| **Thanh ngân sách █░** | *tiêu hao có giới hạn* | Context meter, chi phí MCP, tiến độ chương |

### 0.4 Sáu nguyên tắc

1. **Mỗi chuyển động mang một nghĩa.** Nếu không gọi tên được nó giải thích điều gì thì bỏ nó đi.
2. **Bằng chứng trước trang trí.** Mỗi con số đi kèm `SourceBadge`. Không ảnh stock, không minh hoạ chung chung.
3. **Đứng yên vẫn đầy đủ.** Ở trạng thái nghỉ (reduced motion, ảnh chụp, link preview), mọi nội dung đều đọc được. Không phần tử nào bị bỏ ở `opacity: 0` để chờ scroll.
4. **Màu ngữ nghĩa chỉ dành cho trạng thái.** Accent cam đất là *hành động / tiêu điểm*. Xanh lá, amber, đỏ chỉ dùng cho *trạng thái*.
5. **Tiết chế.** Mỗi chương tối đa một "khoảnh khắc lớn" (xem §6.6). Phần còn lại yên tĩnh.
6. **Trang dạy điều nó làm.** Progressive disclosure trong UI (ngăn "Đào sâu"), interface thay ví dụ (simulator), rich references (code copy được).

---

## 1. Màu

Tất cả là CSS custom properties. Dark là theme gốc, khai báo trên `:root`. Light ghi đè trong `@media (prefers-color-scheme: light)` với `:root:not([data-theme="dark"])`, và một lần nữa trên `:root[data-theme="light"]`. Thành phần UI chỉ dùng token, không dùng màu literal.

### 1.1 Bề mặt & mực

| Token | Dark (Terminal) | Light (Giấy) | Dùng cho |
|---|---|---|---|
| `--bg` | `#14120F` | `#F2EFE9` | Nền trang |
| `--bg-raised` | `#1C1916` | `#FBF9F5` | Terminal window, panel, card mở |
| `--bg-sunken` | `#0F0D0B` | `#E8E4DC` | Code block, khay simulator |
| `--grid` | `#1F1C18` | `#E3DED5` | Lưới ô 40px (trang trí, không mang thông tin) |
| `--line` | `#2E2924` | `#D3CCC0` | Hairline phân tách |
| `--control` | `#756A5E` | `#857C70` | Viền input/nút/khay kéo thả (≥ 3:1 theo WCAG 1.4.11) |
| `--fg` | `#EDE6DA` | `#1A1714` | Chữ chính |
| `--fg-muted` | `#ADA395` | `#575047` | Chữ phụ, chú thích |
| `--fg-subtle` | `#8D8376` | `#6B6257` | Meta. Đạt ≥ 4,5:1 trên `--bg` và `--bg-raised` ở cả hai theme (dark trước 07/11/2026 là `#857B6F`, chỉ 4,2:1 trên `bg-raised`). Không dùng trên `--bg-sunken` |

### 1.2 Accent & ngữ nghĩa

| Token | Dark | Light | Nghĩa (cố định) |
|---|---|---|---|
| `--accent` | `#D97A4A` | `#A0461F` | **Chỉ hành động và hiện tại:** CTA và nút chính, viền focus, vị trí hiện tại (tab, mốc chương, beat), agent đang làm, con trỏ ▍ tới lượt bạn, ô ■ ở nhãn góc. **Không** dùng cho số lớn, mã M1–M14, mũi tên, gạch ngang, nhãn tiêu đề, chip lọc, HUD |
| `--on-accent` | `#14120F` | `#FBF9F5` | Chữ trên nền accent |
| `--signal` | `#8CC084` | `#3A7034` | Đã kiểm chứng · đạt · "Bây giờ" · nhãn *Bền vững* |
| `--warn` | `#E2B04A` | `#8A5D00` | Dumb zone · cần cân nhắc · nhãn *Phụ thuộc model* |
| `--danger` | `#EE7A66` | `#AE3524` | Thất bại · bị chặn · nhãn *Đã thay thế* |
| `--info` | `#8FB3D9` | `#2C5A87` | Tham chiếu · "Đào sâu" · nhãn *Chưa thống nhất* |

**Tương phản đo được** (WCAG 2, chữ trên `--bg`): fg 15,1 / 15,6 · muted 7,5 / 6,9 · accent 6,1 / 5,4 · signal 8,9 / 5,2 · warn 9,4 / 5,0 · danger 6,8 / 5,5 · info 8,6 / 6,3 · subtle 5,0 / 5,2 (trên `--bg-raised`: 4,7 / 5,7). Tất cả ≥ 4,5:1. Kiểm lại bằng `python3 tools/contrast.py design-system/tokens.json --fail`. *Quy tắc:* chữ màu ngữ nghĩa chỉ đặt trên `--bg` hoặc `--bg-raised`. Trên `--bg-sunken` dùng `--fg` kèm icon.

### 1.3 Màu dữ liệu (đã chạy validator dataviz)

| Token | Dark | Light | Vai trò |
|---|---|---|---|
| `--chart-1` | `#5A8FD8` | `#2E64B0` | Chuỗi dữ liệu đơn (histogram PR, chi phí MCP, xác suất token) |
| `--chart-2` | `#CC6C3E` | `#A0461F` | Chuỗi thứ hai (Re-test so với Diagnostic) |
| `--level-1…4` | `#7A4A33 · #A9603A · #D97A4A · #F2A57A` | `#D29373 · #C9774B · #A85428 · #7E3814` | **Ordinal** Low → Medium → High → Pro (một tông màu, độ sáng đơn điệu) |

- Cặp chart-1/chart-2: ΔE (CVD) khoảng 22, normal khoảng 25; đạt ở cả hai theme.
- Ramp cấp độ đạt cả 4 kiểm tra ordinal (đơn điệu, ΔL ≥ 0,06, đầu nhạt ≥ 2:1, một tông).
- **Vì sao không dùng dải đỏ → xanh lá như deck gốc:** dải đó là cầu vồng, và người mù màu đỏ–lục không phân biệt được Low với Pro. Thanh cấp độ còn mã hoá bằng **độ dài** (25/50/75/100%) và **nhãn chữ**, nên màu không phải kênh duy nhất.
- Context meter (S1, khung mới 07/11/2026) **không dùng màu trạng thái và không có ngưỡng**: *độ tập trung* vẽ bằng `--fg`, *chi phí mỗi lượt* là chuỗi dữ liệu `--chart-1`. Ngưỡng của từng nguồn nằm trong ContradictionNote.
- Chữ trong biểu đồ dùng token chữ (`--fg`, `--fg-muted`), không dùng màu của chuỗi.

### 1.4 Nhãn độ bền & nguồn

| Nhãn | Hình thức: ô đánh dấu 9px + chữ mono `fg`, không khung, không chữ màu (07/11/2026) |
|---|---|
| **Bền vững** | ô đặc `--signal` |
| **Phụ thuộc model** | nửa trái ô đặc `--warn` |
| **Đã thay thế** | ô gạch chéo `--danger`, chữ gạch ngang |
| **Chưa thống nhất** | ô rỗng có chấm giữa `--info` |

Hình của ô mang nghĩa, màu chỉ nhấn thêm; cùng ngôn ngữ cho mọi `.nb-tag` (đặc = có/đã chắc, nửa = một phần, gạch chéo = bị thay/bị chặn, chấm = chưa rõ, rỗng = chưa có).

`SourceBadge` (Boris · Thariq · Dex · Matt · Cat · Lydia · Karpathy · Docs · Community · Shayan) là chip mono chữ nhỏ trung tính (`--fg-muted` trên `--bg-raised`). **Không dùng màu riêng cho từng người** để tránh biến nguồn thành "chuỗi dữ liệu", và không dùng ảnh chân dung.

---

## 2. Chữ

### 2.1 Họ chữ (đều có subset tiếng Việt, đã kiểm tra trên Google Fonts)

| Token | Họ | Trọng lượng | Fallback |
|---|---|---|---|
| `--font-display` | **Newsreader** (trục `opsz` 6–72) | 400, 500, italic 400 | `"Iowan Old Style", "Times New Roman", serif` |
| `--font-text` | **Be Vietnam Pro** | 400, 500, 600 | `system-ui, "Segoe UI", Roboto, sans-serif` |
| `--font-mono` | **JetBrains Mono** | 400, 500, 600 | `ui-monospace, "SF Mono", Menlo, Consolas, monospace` |
| `--font-wide` | **Archivo** (trục `wdth` 62–125) | 800, 900 | `"Arial Black", system-ui, sans-serif` |

`--font-wide` là "giọng cấu trúc" học từ WRDLSS, DEIFIED và Artefakt: **125% (expanded)** cho wordmark và tên chương viết hoa (style `wordmark`); **62% (condensed)** cho số chương khổng lồ, bộ đếm và ghost text (style `index-cond`). Archivo có subset tiếng Việt, nhưng chỉ dùng cho tên tiếng Anh, số và từ khoá; thân bài tiếng Việt vẫn là Be Vietnam Pro.

Self-host qua Fontsource, chỉ nạp subset `latin` + `latin-ext` + `vietnamese`, `font-display: swap`. Preload hai file quan trọng nhất là Newsreader 400 và Be Vietnam Pro 400.

### 2.2 Thang chữ (fluid)

| Token | Giá trị | Dùng cho | Line-height |
|---|---|---|---|
| `--step-q` | `clamp(2.5rem, 1.6rem + 4.2vw, 4.5rem)` | Câu hỏi Socratic (`QuestionCard`) | 1.14 |
| `--step-4` | `clamp(2.125rem, 1.5rem + 2.8vw, 3.25rem)` | Tiêu đề mục (H2) | 1.16 |
| `--step-3` | `clamp(1.625rem, 1.35rem + 1.2vw, 2.125rem)` | H2 trong beat | 1.22 |
| `--step-2` | `1.375rem` | H3, câu trích | 1.3 |
| `--step-1` | `1.1875rem` | Lead, phương án Predict | 1.5 |
| `--step-0` | `1.0625rem` (17px) | Thân bài | 1.65 |
| `--step--1` | `0.875rem` | Chú thích, badge | 1.45 |
| `--step--2` | `0.75rem` (12px, sàn tuyệt đối) | Nhãn mono: eyebrow, micro, nút, tag | 1.3–1.4 |

### 2.3 Quy tắc chữ tiếng Việt

- **Line-height của display ≥ 1.12.** Chữ có dấu chồng ("Ữ", "Ỗ", "Ẫ", "Ậ") cần khoảng trống phía trên và dưới.
- **Letter-spacing của display không âm quá −0,01em**, để dấu không chạm nhau.
- **Mask của SplitText** (`mask: "words"`) có thêm `padding-block: 0.12em` và `margin-block: -0.12em` để dấu không bị cắt. Có test visual bằng chuỗi `"Ữ Ỗ Ẫ Ậ Ặ Ỹ"`.
- Không dùng `text-wrap: balance` trên phần tử có SplitText (gây lệch dòng). Các heading khác thì dùng.
- Thuật ngữ tiếng Anh đặt trong `<span lang="en">` để screen reader đọc đúng giọng. Ở thân bài để cùng font, không in nghiêng.
- Độ dài dòng thân bài: 60–68ch. Số liệu và cột số dùng `font-variant-numeric: tabular-nums`.
- **Nhãn micro, eyebrow, nút, tag (quyết định 07/11/2026):** mono 12px trở lên, `letter-spacing` 0,04–0,06em, **không `text-transform`**. Phần tiếng Việt viết thường (hoa chữ đầu câu); phần tiếng Anh, mã và số viết hoa sẵn trong nguồn hoặc bọc `.nb-caps`. Ví dụ: `Phần II · MEDIUM · 11 phút`, `Chương 04 · hỏi`, `S4 · CLAUDE.MD LINTER`. Tên component và mã định danh (`SourceButton`, `c04:b3`) giữ nguyên cách viết. Lý do: dấu chồng của chữ hoa tiếng Việt (Ư, Ể, Ậ) ở cỡ 10–11px giãn chữ rộng gần như không đọc được.

---

## 3. Không gian, lưới, bố cục

### 3.1 Khoảng cách (gốc 4px)

`--space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-5` 24 · `-6` 32 · `-7` 48 · `-8` 64 · `-9` 96 · `-10` 128 (px). Khoảng giữa các nhóm anh em dùng `gap` của flex/grid, không dùng margin lẻ.

### 3.2 Lưới trang

| Breakpoint | Cột | Gutter | Bố cục Story |
|---|---|---|---|
| ≥ 1200px | 12 | 24px, tối đa 1320px | **Script (cột 1–5) | Stage (cột 6–12, pinned)** |
| 768–1199px | 8 | 20px | Stage sticky ở trên (55vh), Script cuộn bên dưới |
| < 768px | 4 | 16px + safe-area | Một cột. Stage nằm *inline*, không pin. Simulator full-width |

- **Story beat:** cột Script chứa `QuestionCard`, `PredictPrompt` và `ExplainBlock`. Cột Stage chứa `ObserveStage` và `SimulatorFrame`. Trên mobile, thứ tự là *Hỏi → Đoán → Stage → Hiểu*.
- **Lưới ô 40px** là `background-image` hai `linear-gradient` 1px màu `--grid`, gắn vào `body` (cố định theo trang, không theo viewport). Tắt khi in.
- Gutter hai bên luôn là `max(16px, env(safe-area-inset-*))`. Trang không bao giờ cuộn ngang. Bảng, code và sơ đồ rộng cuộn trong khung riêng.

### 3.3 HUD

- **Trên (sticky, cao 48px):** logo Blocks bản nhỏ, đơn sắc `fg` + `JourneyHUD` (thanh cấp độ) + nút Tìm, Library, Theme, Motion, Presenter.
- **Trái (desktop ≥ 1200px):** `ChapterRail` dọc với 12 mốc (Mở đầu, 01–10 và 05b). Mốc hiện tại tô `--accent`, mốc đã qua dùng `--fg-muted`.
- **Dưới phải:** `StatusBoard` BÁO CÁO TUẦN thu gọn thành 4 chấm, mở ra khi hover hoặc focus.
- Trên mobile, HUD gộp vào một thanh dưới cùng có `padding-bottom: env(safe-area-inset-bottom)`.

---

## 4. Hình khối, viền, độ nổi

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--r-1` | **0** | Chip, input, khay (Terminal Brutalism: góc vuông) |
| `--r-2` | **0** | AgentWindow, panel, simulator |
| `--r-pill` | **0** | Badge nguồn, pill gói và trạng thái phát hành: góc vuông. Nhãn độ bền không có khung (§1.4) |
| `--border-hard` | `1px solid var(--control)` | Khung cấu trúc brutalist: viền panel, đường chia cột |
| `--shadow-overlay` | `0 12px 32px -8px rgb(0 0 0 / .45)` (dark) · `0 12px 32px -12px rgb(26 23 20 / .18)` (light) | **Chỉ** dùng cho tooltip, dialog, cửa sổ notes |

- Viền và bóng được dùng *theo vai trò*. Card trong Library chỉ có hairline `--line`, không bóng. `AgentWindow` có thanh tiêu đề mono và ba chấm xám, không dùng màu đèn giao thông. Khung `app` là bản giản lược trung tính: không logo, không sao chép bố cục UI thật của sản phẩm nào.
- Không có "accent bar" bên cạnh card. Muốn nhấn mạnh thì dùng một nét `--accent` 2px ở **đầu** khối, đúng một chỗ.

---

## 5. Biểu tượng

- **Glyph mono** thay cho emoji: `→` dẫn tới · `▍` tới lượt bạn · `█░` ngân sách · `✕` chặn · `⇄` hai nguồn đối nhau (ContradictionNote) · `✓` đạt · `⟲` vòng lặp · `↳` đào sâu. Nhãn trạng thái và độ bền dùng ô đánh dấu (§1.4), không dùng glyph.
- **Icon nét** (khi glyph không đủ): nét 1,5px, đầu tròn, khung 20px, màu `currentColor`.
- **Mũi tên chuẩn:** thân nét 1,5px, đầu nhọn **mở** 45°, dài 8px. Vẽ bằng SVG `<path>` một đoạn duy nhất để DrawSVG chạy mượt.
- **Không dùng logo hay mascot Anthropic.** "Nhân vật" của trang là **The Colleague** (§12.6); con trỏ ▍ vẫn mang nghĩa *tới lượt bạn*.

---

## 6. Chuyển động

### 6.1 Token

| Token | Giá trị | Dùng cho |
|---|---|---|
| `dur.instant` | 0,12s | Phản hồi hover/press |
| `dur.quick` | 0,24s | Đổi trạng thái, nháy "đã kiểm chứng" |
| `dur.base` | 0,48s | Reveal phần tử, Flip nhỏ |
| `dur.slow` | 0,9s | Flip bố cục lớn, MorphSVG |
| `dur.narrative` | 1,6s | Sequence của "khoảnh khắc lớn" (khi chạy theo thời gian) |
| `ease.out` | `power3.out` | Phần tử đi vào |
| `ease.inOut` | `power2.inOut` | Đổi bố cục (Flip) |
| `ease.settle` | `CustomEase "nb-settle"`: `0.22,1,0.36,1` | Phần tử "đậu" vào vị trí (thẻ Then → Now) |
| `ease.scrub` | `none` | Mọi tween scrub theo scroll (bắt buộc với containerAnimation) |
| `stagger.chars / words / items / cards` | 0,02 · 0,04 · 0,06 · 0,08 | |
| `scrub.default` | 0,6 | Scrub có độ trễ nhẹ |
| `scrub.meter` | 0,3 | Đồng hồ cần bám sát scroll |
| `move.sm / md / lg` | 8 · 24 · 64px | Biên độ dịch chuyển tối đa khi reveal |

Token được export ở `src/motion/tokens.ts` và gọi `gsap.defaults({ duration: 0.48, ease: "power3.out" })` một lần.

### 6.2 Ngữ pháp chuyển động: một chuyển động, một nghĩa

| # | Nghĩa | Hình ảnh | Kỹ thuật GSAP | Ở đâu |
|---|---|---|---|---|
| M1 | *Dẫn tới / chuyển thành* | Mũi tên tự vẽ | DrawSVG `0% → 100%` | Then → Now, C → A → S, R → P → E → Rv → S, six shifts |
| M2 | *Tiêu hao* | Thanh đầy dần | `scaleX` hoặc biến CSS `--fill` | Context meter, chi phí MCP, histogram PR |
| M3 | *Tái cấu trúc* | Cùng phần tử, bố cục mới | **Flip** (`absolute`, `nested`) | Cắt lát, 12 workflow hội tụ, chip → panel, lọc Library |
| M4 | *Agent đang xử lý* | Ký tự xáo trộn | **ScrambleText** (chỉ chữ mono; bộ ký tự `NB.SCRAMBLE` không dấu) | **Chỉ** động từ hành động của agent và dòng nhật ký agent (`Đọc`, `Kiểm tra`, `Tra web`), tên lệnh trong tab CLI. **Không** dùng cho nhãn góc, con dấu, tiêu đề bảng, chữ trạng thái: những chỗ đó dùng `NB.say` (fade `dur-quick`) |
| M5 | *Câu hỏi bước vào* | Từ trồi lên khỏi mask | **SplitText** `type: "words"`, `mask: "words"` | Chỉ `QuestionCard` |
| M6 | *Lỗi thời* | Gạch ngang rồi mờ đi | Đường gạch `scaleX` + `autoAlpha: 0.45` | Thẻ "Hồi đó", S8 |
| M7 | *Tới lượt bạn* | Con trỏ ▍ nhấp nháy | `repeat: 5, yoyo, ease: "steps(1)"` rồi đứng yên | `PredictPrompt`, `GrillCard` |
| M8 | *Đi qua một vòng / luồng* | Chấm chạy theo đường | **MotionPath** | Vòng agentic, vòng kiểm chứng, đường ray hook |
| M9 | *Đã kiểm chứng* | Nháy `--signal` một lần + `✓` | Tween màu 0,24s | StatusBoard, simulator đạt |
| M10 | *Bớt can thiệp* | Đường zig-zag (mỗi lần chen vào nhắc, sửa, duyệt) dãn thành đường thẳng chỉ còn một trạm rà soát ✓ | **MorphSVG** | Chỉ ở Chương 10 (No Babysitting) |

**Luật:** không dùng một mục ngữ pháp vào việc trang trí. Không parallax nền. Không có gì lặp vô hạn. Con trỏ chỉ nhấp nháy 3 chu kỳ (dưới 5 giây, theo WCAG 2.2.2) rồi đứng yên.

### 6.3 Biên đạo theo pha beat

| Pha | Chuyển động | Ràng buộc |
|---|---|---|
| HỎI | M5. Các từ trồi lên lần lượt | Một lần cho mỗi chương; tổng ≤ 1,2s |
| ĐOÁN | M7. Các phương án vào theo `stagger.items` | Stage *bị khoá* bằng lớp phủ `--bg` 70% (không blur) cho tới khi người học chọn hoặc bỏ qua. Việc này chỉ chặn *animation*, không chặn cuộn trang ("gate, don't trap") |
| THẤY | Timeline chính của chương; scrub hoặc bước theo label | Desktop pin tối đa `+=200%` chiều cao viewport mỗi cảnh |
| HIỂU | Reveal đơn giản (`y: move.sm`, autoAlpha) qua `ScrollTrigger.batch` | Không có hiệu ứng nào khác |
| Then→Now | M6 lên thẻ "Hồi đó" → M1 mũi tên → thẻ "Bây giờ" đậu vào bằng `ease.settle` | Tổng ≤ 1,6s |
| LÀM | Phản hồi tức thì (`dur.quick`); Flip khi sắp xếp lại | Mọi thao tác kéo thả đều có thay thế bằng bàn phím |
| NHỚ | M7 trên ô trả lời; đáp án mở ra (height auto qua Flip) | |

### 6.4 Một timeline, ba driver

Mỗi chương xuất ra **một** `gsap.timeline({ paused: true })` có label trùng ID beat (`c04:b3`). Có ba driver điều khiển cùng timeline đó:

- **ScrollDriver** (mặc định): `ScrollTrigger` với `scrub` và `pin` gắn vào timeline. Snap tới label.
- **PresenterDriver:** tắt ScrollTrigger; phím → gọi `tl.tweenFromTo(labelHiệnTại, labelKế)`.
- **StaticDriver** (reduced motion): `tl.progress()` nhảy thẳng tới cuối mỗi beat theo label. Không pin, không scrub.

Nhờ vậy mọi chế độ dùng chung một nguồn, và không có nội dung nào chỉ tồn tại trong một chế độ.

### 6.5 Reduced motion: dạng tương đương tĩnh

| Ngữ pháp | Khi giảm chuyển động |
|---|---|
| M1 mũi tên | Vẽ sẵn toàn bộ |
| M2 thanh | Ở giá trị cuối, có số liệu bằng chữ |
| M3 Flip | Bố cục cuối, mục vừa đổi có viền `--accent` 1 lần |
| M4 Scramble | Hiện chữ cuối |
| M5 Split | Chữ thường, không tách |
| M6 Gạch | Gạch tĩnh |
| M7 Con trỏ | Khối đặc, không nhấp nháy |
| M8 Chấm theo đường | Các trạm được đánh số 1 → n |
| M10 Morph | Hình cuối, kèm chú thích "chỉ còn một trạm rà soát" |

Có hai nguồn kích hoạt: `prefers-reduced-motion` (OS) và nút **Motion** trong trang. Nút này lưu vào `localStorage` và gọi `gsap.matchMediaRefresh()`.

### 6.6 "Khoảnh khắc lớn" của từng chương

| Chương | Khoảnh khắc |
|---|---|
| Mở đầu | Đồng xu lật; hai bản báo cáo khác nhau bay vào bảng BÁO CÁO TUẦN |
| 01 | Bàn làm việc của đồng nghiệp mới tự dựng lên (quy trình, quyền dùng công cụ, hồ sơ, người duyệt, sổ bàn giao); các bề mặt (Desktop, Web, Mobile, Slack, CLI) cùng nối vào một harness |
| 02 | Nhiễu tích tụ: mỗi bản hỏng làm độ tập trung giảm, chi phí mỗi lượt tăng; tua lại thì cả hai hồi lại (S1) |
| 03 | Lưới việc Flip từ lát ngang (thu thập hết, phân tích hết…) sang lát dọc (một thị trường trọn vẹn) |
| 04 | Rule cũ rơi rụng từng chữ, thành một câu principle |
| 05 | Chip mô tả `report-style` nở ra thành thư mục `SKILL.md` + `templates/` + `scripts/` (ví dụ TodoWrite chuyển vào "Đào sâu") |
| 05b | Thanh mức nghĩ `░▒▓█` dịch từng nấc khi việc chuyển từ đổi tên file sang đối chiếu số liệu; The Colleague đổi `[>_<]≡` → `[°_°]…` |
| 06 | Các hành động của agent đi qua cổng quyền: cho phép / hỏi / chặn |
| 07 | Con số sai bị bắt ở các trạm kiểm chứng |
| 08 | 12 làn workflow co về 5 cột |
| 09 | Một cửa sổ agent nhân thành năm; lịch chạy mỗi thứ Hai |
| 10 | Sáu mũi tên tự vẽ; đường can thiệp zig-zag dãn thành một đường thẳng có một trạm ✓ |

### 6.7 Hiệu năng chuyển động

- Chỉ animate `transform`, `opacity`, `stroke-dashoffset` (DrawSVG) và biến CSS. Không animate `width`, `height`, `top`, `left`, `filter: blur` khi scrub.
- `will-change: transform` chỉ được gắn trong lúc phần tử đang chạy, qua `onStart`/`onComplete`.
- Timeline của chương được **khởi tạo lười** khi chương còn cách viewport khoảng 1 màn hình, rồi `ScrollTrigger.refresh()` có debounce.
- Mobile: không dùng horizontal pin, không dùng containerAnimation. Flip dùng `simple: true`. Số phần tử stagger tối đa 24.

---

## 7. Thành phần

Mỗi thành phần ghi: mục đích · cấu tạo · trạng thái · chuyển động · a11y.

| Thành phần | Mục đích & cấu tạo | Trạng thái | Chuyển động | A11y |
|---|---|---|---|---|
| **QuestionCard** | Câu hỏi Socratic. Eyebrow mono (`Chương 04 · hỏi`) + câu hỏi bằng `--step-q` serif | — | M5 | `<h2>`; SplitText `aria: "auto"` |
| **PredictPrompt** | 3 phương án `[A] [B] [C]` dạng hàng, chọn thì **đảo màu** (fg/bg); `[ Chốt dự đoán ]` khoá form và ghi giờ chốt ở góc; pha Quan sát dùng thanh khối `█░` theo lượt thử | chưa chọn · đã chọn · đã mở (đúng ✓ / chưa đúng → giải thích) | M7; đáp án mở bằng Flip | `fieldset` + `legend`; phím mũi tên; không ai bị đánh dấu "sai" trước lớp |
| **ObserveStage** | Khung stage pinned chứa SVG/HTML của cảnh | khoá (trước khi predict) · chạy · xong | Timeline chương | Có "Tóm tắt khung hình" (text) gắn bằng `aria-describedby`; nút dừng/tiếp |
| **ExplainBlock** | Thân bài ≤ 120 từ + `SourceBadge` + `DeepDive` | — | Batch reveal | Heading theo cấp |
| **DeepDive** `↳` | Ngăn "Đào sâu" nạp nội dung từ Library | đóng · mở | Flip chiều cao | `<details>`/`<summary>` |
| **SourceBadge** | Chip mono: người · ngày · link (dạng thu gọn của SourceButton) | — | — | Link có tên mô tả đầy đủ |
| **SourceButton** *(cần thiết kế và duyệt preview trước khi áp dụng đại trà)* | Nút `[ Nguồn · n ↗ ]` mở bảng nguồn (popover/bottom sheet): loại, tiêu đề, người · ngày, `verifiedAt`, trích nguyên văn, `[ MỞ BẢN GỐC ↗ ]`, `[ SAO CHÉP LINK ]`. Phải đẹp, luôn nhìn thấy, đúng hệ brutalist. Đặc tả đầy đủ ở `06-sources-and-links.md` §2 | thường · hover · focus · mở · link chết · quá 30 ngày | M4 + fade `dur-quick` | `aria-expanded`, Esc đóng, link báo "mở tab mới" |
| **DurabilityTag** | Ô đánh dấu 9px + chữ mono `fg`, không khung (§1.4) | 4 loại | — | Chữ tự đủ nghĩa; ô đánh dấu là trang trí |
| **ThenNowCard** | Hai thẻ "Hồi đó" / "Bây giờ" nối bằng mũi tên, kèm câu hỏi dẫn (serif italic) và nhãn độ bền | — | M6 → M1 → `ease.settle` | Đọc tuần tự "Hồi đó… Bây giờ…" |
| **ContradictionNote** `⇄` | Hai trích dẫn ngang hàng, mỗi bên một nguồn | — | — | Không ngầm chọn bên nào |
| **AgentWindow** | Sân khấu chính, trung tính về bề mặt. Thanh tiêu đề (tên dự án hoặc thư mục) + nhật ký: tin nhắn của bạn (sans), hành động của agent (mono, có icon: đọc · tra web · sửa · hỏi quyền · kiểm), kết quả. Biến thể *chrome*: `app` (khung cửa sổ giản lược, không logo) và `cli` (dấu nhắc `>`) | đang chạy · chờ quyền · xong | M4 cho tên hành động; M8 cho luồng | Nhật ký là `<ol>`; trạng thái đọc qua `aria-live` |
| **SurfaceTabs** "Cách làm" | 3 tab: **Cowork** · **Claude Code app** (mặc định) · **CLI**. Mỗi tab gồm các bước (diễn đạt theo khả năng, ít phụ thuộc vị trí nút), `AvailabilityBadges`, `StatusPill`, `PlanPill`, "Kiểm chứng: dd/mm/yyyy", link docs. Tab đánh số `01 02 03`, tab chọn đảo màu, vạch `accent` 3px trượt dưới tab. Lựa chọn tab đồng bộ toàn trang | có · "Chưa có ở đây" (kèm cách thay thế, nhãn "Diễn giải" nếu là gợi ý của trang) · "Cần kiểm chứng lại" (quá 30 ngày) | Vạch accent trượt 0,36s; nội dung crossfade 0,3s | `role="tablist"`; phím mũi tên; lưu lựa chọn |
| **AvailabilityBadges** | Hàng chip: Cowork · Desktop · Web · Mobile · CLI; mỗi chip ở trạng thái có / một phần / chưa / chưa rõ | 4 trạng thái | — | Trạng thái bằng icon + chữ (`✓` `◐` `—` `?`), không chỉ màu |
| **StatusPill / PlanPill** | Trạng thái phát hành: GA · Beta · Research preview · Experimental. Gói: ví dụ "Team/Enterprise", "Pro/Max/Ultra" | — | — | Chữ đầy đủ; viền `--info` cho trạng thái chưa GA |
| **CommandBlock** | Chỉ dùng trong tab CLI và Starter Kit: thanh tiêu đề (tên file) + code mono + nút Copy | thường · đã copy ✓ | M4 cho tên lệnh | Nút Copy có `aria-live` "Đã copy" |
| **UseCaseCard** | Thẻ ca sử dụng: vai trò (eyebrow) · việc · bề mặt phù hợp · các chương liên quan · prompt mẫu | — | Flip khi mở | `<article>` |
| **SimulatorFrame** | Tiêu đề (`S4 · CLAUDE.md Linter`) + mục tiêu học + khu thao tác + phản hồi + nút "Làm lại" | chờ ▍ · đang làm · hoàn tất | M3/M9 | Kéo thả luôn có thay thế bàn phím (Space nhặt, mũi tên di chuyển, Enter thả); `aria-live` cho phản hồi |
| **GrillCard** | Câu hỏi → ô tự trả lời (mono, đếm ký tự) → `[ Xem đáp án khuyến nghị ]` → tự chấm `[ Trúng ] [ Gần đúng ] [ Chưa ]`. Gate, don't trap: ô trống thì nhắc một lần, bấm lần nữa vẫn xem được | ẩn · nhắc · hiện · đã tự chấm | M4 cho nhãn đáp án | Nút có `aria-expanded`/`aria-pressed` |
| **StatusBoard** | BÁO CÁO TUẦN với 4 tiêu chí `[ ]` → `[✓]` + nhãn "Chưa đạt/Đã đạt", bộ đếm condensed `0 / 4`, dạng HUD thu gọn `■■□□` | chưa đạt · đã đạt | M9 khi đổi trạng thái | Danh sách có trạng thái bằng chữ |
| **JourneyHUD** | Thanh trên 48px: cấp độ 4 nấc (`--level-1…4`, ô + nhãn chữ) · bản đồ harness **6 phần theo PRD G1** (context, kế hoạch, trí nhớ, khối xây dựng, rào chắn, kiểm chứng) · báo cáo tuần `■■□□` · vị trí `c03 · 4/12` · `[ Chi tiết ]` | phần đã mở / chưa mở | không có (lên cấp đổi tức thì) | `progressbar` + `aria-valuetext` "Medium, chương 4/10" |
| **ChapterRail** | 11 mốc dọc | qua · hiện tại · sắp tới | ScrollToPlugin khi bấm | `<nav>` + `aria-current` |
| **LibraryCard** | Loại (mono eyebrow) + tiêu đề + 1 dòng VI + nguồn + nhãn độ bền + cấp độ | thường · hover · mở | Flip card → detail | Card là `<article>`; toàn bộ là một link |
| **FilterBar / SearchBox** | Một hàng: tìm kiếm + chip lọc (loại, nhóm, nguồn, cấp độ, nguyên lý, độ bền, chương) + đếm kết quả | — | Flip khi danh sách đổi | Kết quả cập nhật qua `aria-live="polite"` |
| **GlossaryTerm** | Thuật ngữ gạch chân chấm; tooltip EN + VI | — | Fade nhanh | Mở bằng focus; Esc đóng |
| **PresenterHUD** | Beat `c04:b3`, đồng hồ chương, thanh *Thảo luận* (ở pha ĐOÁN) | — | — | Phím tắt có hướng dẫn (`?`) |
| **NotesWindow** | Cửa sổ thứ hai: speaker notes + beat kế + đồng hồ; đồng bộ qua `BroadcastChannel` | — | — | — |
| **ThemeToggle / MotionToggle** | 3 trạng thái: System / Dark / Light; Motion: Đầy đủ / Giảm | — | — | `aria-pressed` |
| **StarterTemplate** | TerminalBlock có nhãn file + nguồn + "Vì sao từng dòng" | — | — | — |

---

## 8. Biểu đồ trong trang

Tất cả vẽ bằng SVG tự viết, không dùng thư viện chart. Scale tính bằng code từ dữ liệu.

| Biểu đồ | Hình thức | Ghi chú |
|---|---|---|
| Context meter (S1) | Hai thanh khối: độ tập trung (`--fg`, 0–100) và chi phí mỗi lượt (`--chart-1`, trục tới 1M) | Không có dải ngưỡng; mốc 1M là vạch đứt mờ "hiếm khi chạm tới". Ngưỡng của từng nguồn (Dex 40% · Matt ~100K · Thariq 300–400k/1M) nằm trong ContradictionNote |
| Xác suất token (c01, ngăn "Đào sâu") | Thanh ngang, một chuỗi `--chart-1` | Có nhãn giá trị trên từng thanh vì chỉ có 4 thanh; ghi "số liệu minh hoạ" |
| Chi phí context của công cụ (c06) | Thanh ngang, một chuỗi | Đơn vị: nghìn token và % context; nguồn: report 19/12/2025 |
| Kích thước PR (Library / tab CLI của c09) | Các mốc phân vị p50/p90/p99 trên **trục log** có nhãn rõ | Một chuỗi; ghi chú "1 ngày, 141 PR". Không đưa vào Story chính vì là chỉ số riêng của dev |
| Diagnostic vs Re-test (c10) | Cặp thanh cho từng khái niệm K1–K6 | `--chart-1` / `--chart-2`; có legend + nhãn trực tiếp; có bảng thay thế |

Quy cách mark theo skill dataviz: mark mảnh, đầu dữ liệu bo 4px neo ở baseline, khoảng hở 2px giữa các fill, lưới và trục nhạt. Tooltip khi hover hoặc focus cho từng mark. Mỗi biểu đồ có **bảng dữ liệu thay thế** trong ngăn `<details>`.

---

## 9. Checklist accessibility

- [ ] Tương phản chữ ≥ 4,5:1, control ≥ 3:1 ở cả hai theme (§1)
- [ ] Mọi animation có "Tóm tắt khung hình" bằng text; không thông tin nào chỉ có trong chuyển động
- [ ] Reduced motion (OS và nút trong trang) đầy đủ tương đương (§6.5)
- [ ] Không gì nhấp nháy quá 5 giây; không quá 3 lần nháy mỗi giây
- [ ] Mọi simulator dùng được chỉ bằng bàn phím; focus luôn nhìn thấy (`outline: 2px solid var(--accent)`, offset 2px)
- [ ] SplitText giữ `aria: "auto"`; thuật ngữ EN có `lang="en"`
- [ ] Nhãn độ bền và status luôn có icon + chữ
- [ ] Pin/scrub không chặn được việc cuộn bằng bàn phím (Space / PageDown đi qua cảnh pinned bình thường)
- [ ] Presenter: phím tắt không xung đột với screen reader (chỉ bật khi đã vào mode)

---

## 10. Giọng văn UI (microcopy)

| Ngữ cảnh | Copy |
|---|---|
| Nút predict | "Chốt dự đoán" · "Bỏ qua" |
| Sau predict | "Xem điều gì xảy ra ↓" |
| Đào sâu | "↳ Đào sâu: {tên mục}" |
| Copy | "Copy" → "Đã copy ✓" |
| Simulator xong | "Xong. Bạn đúng {n}/{m}. Xem giải thích từng mục ↓" |
| Contradiction | "Các nguồn chưa thống nhất" |
| Diễn giải riêng | "Diễn giải của trang" |
| Footer | "Trang cộng đồng, không phải trang chính thức của Anthropic. Nội dung dựa trên shanraisshan/claude-code-best-practice (MIT)." |

Nguyên tắc: gọi tên theo cách người dùng nhận ra; nút nói đúng việc nó làm; không xin lỗi, không cường điệu, không dùng emoji làm đầu mục.

---

## 11. Cấu trúc token (CSS)

```css
/* Lưới ô 40px chung cho hai theme · Script | Stage 5/7 · dark-first */
:root {
  color-scheme: dark;
  --bg:#14120F; --bg-raised:#1C1916; --bg-sunken:#0F0D0B; --grid:#1F1C18;
  --line:#2E2924; --control:#756A5E;
  --fg:#EDE6DA; --fg-muted:#ADA395; --fg-subtle:#857B6F;
  --accent:#D97A4A; --on-accent:#14120F;
  --signal:#8CC084; --warn:#E2B04A; --danger:#EE7A66; --info:#8FB3D9;
  --chart-1:#5A8FD8; --chart-2:#CC6C3E;
  --level-1:#7A4A33; --level-2:#A9603A; --level-3:#D97A4A; --level-4:#F2A57A;
  --font-display:"Newsreader","Iowan Old Style","Times New Roman",serif;
  --font-text:"Be Vietnam Pro",system-ui,"Segoe UI",Roboto,sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace;
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme="dark"]) {
    color-scheme: light;
    --bg:#F2EFE9; --bg-raised:#FBF9F5; --bg-sunken:#E8E4DC; --grid:#E3DED5;
    --line:#D3CCC0; --control:#857C70;
    --fg:#1A1714; --fg-muted:#575047; --fg-subtle:#6B6257;
    --accent:#A0461F; --on-accent:#FBF9F5;
    --signal:#3A7034; --warn:#8A5D00; --danger:#AE3524; --info:#2C5A87;
    --chart-1:#2E64B0; --chart-2:#A0461F;
    --level-1:#D29373; --level-2:#C9774B; --level-3:#A85428; --level-4:#7E3814;
  }
}
:root[data-theme="light"] { /* lặp lại đúng các giá trị light ở trên */ }
body { background: var(--bg); color: var(--fg); }
```

---

## 12. ASCII System: Terminal Brutalism × Cinematic ASCII

> Cảm hứng từ các reference (Aino, WRDLSS, DEIFIED, Asciify, Artefakt, video Polsia), nhưng không sao chép website nào. Một nguyên tắc xuyên suốt: **mọi cảnh ASCII lớn đều kể cùng một câu chuyện, từ hỗn loạn tới trật tự (vibe → agentic).**

### 12.1 Vai trò: ký tự vừa là nội dung, vừa là pixel

- **Dùng ASCII cho:** hero, chuyển giữa các Phần, kết cấu nền tĩnh, nhân vật The Colleague, lens kiểm tra, hai cảnh cinematic full-color (Mở đầu, Chương 10).
- **Không dùng ASCII cho:** thân bài, CTA, nhãn chức năng, số liệu cần đọc chính xác. Nội dung cần đọc luôn là **HTML thật**. Canvas ASCII luôn `aria-hidden`.

### 12.2 Bộ ký tự (glyph ramps): font JetBrains Mono

| Ramp | Ký tự | Dùng cho |
|---|---|---|
| `density` | ` ·:-=+/<>!?1ITN3S5YG8BA#@` (25 mức, nhẹ → đặc) | Mật độ, ảnh, hội tụ. Ramp mang **chính các chữ của tên** (N B A Y S I T G), như WRDLSS và Artefakt dựng mật độ từ tên thương hiệu |
| `structure` | `─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼` | Khung, lưới, sơ đồ luồng |
| `blocks` | `  ░ ▒ ▓ █` | Ngân sách (context meter), wipe chuyển Phần |
| `signal` | `✓ ◆ ◐ ✕ ⇄ → ▍ ?` | Trạng thái; giữ nguyên nghĩa ở §5 |
| `noise` | `! ? / \ \| < > { } [ ] ~ ^ $ & %` | Trạng thái "vibe": hỗn loạn, chưa có cấu trúc |

Chữ trong ASCII art dùng **chữ Latin viết hoa không dấu** (ví dụ wordmark `NO BABYSITTING`), vì dấu tiếng Việt làm lệch ô lưới. Chữ tiếng Việt luôn nằm trong HTML.

### 12.3 Màu ký tự: màu mang nghĩa

| Lớp ký tự | Token | Nghĩa |
|---|---|---|
| Noise, nền | `fg-subtle` (alpha 0.35–0.6) | Chưa có cấu trúc (vibe) |
| Khung `structure` | `control` | Cấu trúc, lưới |
| Hình đã thành | `fg` | Trật tự (agentic) |
| Đầu vệt hội tụ, lens, ký tự đang đổi | `accent` | Agent đang hành động |
| Ô đã kiểm chứng | `signal` | ✓ |
| Vùng quá tải / dumb zone | `warn` | ◐ |
| Ô sai, bị chặn | `danger` | ✕ |
| Mật độ, cấp độ | `level-1…4` theo `density` | Ramp ordinal |

- Mỗi cảnh dùng **tối đa 3 màu ngữ nghĩa** cùng lúc (không tính cảnh full-color).
- **Full-color** chỉ ở hai cảnh cinematic: hero mở đầu và finale. Màu được lấy từ ảnh nguồn và render sẵn lúc build. Màu từng ô được *clamp độ sáng* để đạt ≥ 3:1 so với `bg` (WCAG 1.4.11, vì đây là đồ hoạ). Ảnh nguồn phải tự chụp hoặc tự dựng: không dùng ảnh stock có bản quyền, không dùng ảnh có thương hiệu.

### 12.4 Renderer

| Quyết định | Chi tiết |
|---|---|
| Công nghệ | **Canvas 2D tự viết** (`src/ascii/`). Mỗi cảnh một canvas. Không dùng WebGL hay Three.js ở v1 |
| Glyph atlas | Mỗi cặp (ký tự × màu token) được vẽ sẵn **một lần** vào offscreen canvas; mỗi frame chỉ `drawImage` các ô, không tạo string mới |
| Lưới | Desktop ô 10×18px (tối đa khoảng 12k ô); mobile ô 9×16px, tối đa 4k ô; DPR tối đa 2 |
| Bộ đệm | `Uint8Array` glyph, `Uint8Array` màu, `Float32Array` noise/target; chỉ vẽ lại ô thay đổi (dirty flag) |
| Vòng lặp | **Một** `gsap.ticker` cho cả trang. Cảnh nền giới hạn 30 fps. Dừng khi ra khỏi viewport (IntersectionObserver) hoặc khi tab ẩn |
| GSAP điều khiển *trạng thái*, không điều khiển DOM | `gsap.to(scene.state, { order: 1, scrollTrigger: { scrub: 0.6 } })`; renderer đọc `state` mỗi tick. Con trỏ dùng `gsap.quickTo(state, "px")` |
| Trạng thái tương tác dùng chung | `pointerX`, `pointerY`, `pointerVelocity`, `scrollProgress`, `lensRadius`, `distortion`, `colleagueState`, `processingProgress` |
| Asciify | `asciify-engine` (MIT) **chỉ dùng lúc build** để chuyển ảnh/video cinematic thành lưới JSON (ký tự + màu), không đưa vào runtime. Pin một bản đã phát hành ≥ 2 tuần: bản 4.33.0 phát hành 06/11/2026, và package có 174 bản kể từ 02/2026, tức thay đổi rất nhanh |
| Ngân sách | ≤ 4 ms/frame cho phần render trên máy tầm trung; tối đa 2 canvas ASCII động cùng lúc |
| Fallback | Không có canvas hoặc đang reduced motion → vẽ **frame cuối** một lần, hoặc dùng `<pre aria-hidden>` snapshot render sẵn |

### 12.5 Ngữ pháp chuyển động bổ sung: M11–M14

| # | Nghĩa | Hình ảnh | Kỹ thuật | Reduced motion |
|---|---|---|---|---|
| M11 | **Từ vibe đến agentic** | Ký tự noise hội tụ thành chữ hoặc hình; đầu vệt hội tụ màu `accent` | `state.order` 0 → 1 (scrub); mỗi ô có ngưỡng noise riêng | Frame cuối |
| M12 | **Nhìn vào bên trong** | Lens theo con trỏ làm lộ lớp bên dưới (ví dụ báo cáo → nguồn của từng số liệu) | `quickTo` vị trí, `lensRadius` | Nút "Xem lớp nguồn" |
| M13 | **Chuyển trạng thái đứt đoạn** | Glitch ≤ 300 ms: dòng ký tự lệch ngang + tách 3 lớp màu token | Timeline ngắn | Cắt cảnh thẳng |
| M14 | **Biểu cảm của đồng nghiệp** | The Colleague đổi mặt | ScrambleText trên đúng 5 ký tự của khuôn mặt | Đổi tức thì |

Luật: M13 dùng tối đa **1 lần mỗi chương**, chỉ khi trạng thái thật sự đổi, không bao giờ trên chữ cần đọc. Không gì nhấp nháy quá 3 lần/giây (WCAG 2.3.1).

### 12.6 The Colleague: nhân vật ASCII

| Trạng thái | Mặt | Màu | Khi nào (gắn với trạng thái thật của cảnh) |
|---|---|---|---|
| idle | `[•_•]` | `fg-muted` | Chờ việc |
| tracking | `[ •_•]` / `[•_• ]` | `fg-muted` | Con trỏ đến gần: mắt dịch 1 ô theo hướng con trỏ |
| thinking | `[°_°]…` | `info` | Đang đọc hoặc lập kế hoạch |
| working | `[>_<]≡` | `accent` | Nhật ký AgentWindow đang chạy |
| asking | `[•_•]?` | `warn` | Xin quyền / hỏi lại |
| overloaded | `[@_@]` | `warn` | Quá nhiều việc song song (c09, FloatingOps). **Không** gắn với ngưỡng context: S1 dùng `thinking` khi hội thoại còn từ 2 bản hỏng trở lên |
| verified | `[^_^]✓` | `signal` | Kiểm chứng xong |

- Có mặt ở HUD (cạnh StatusBoard) và trong AgentWindow. Được giới thiệu lớn ở c01 (The New Colleague).
- **Không** dùng hình con vật hay hình khối pixel kiểu mascot, để tránh giống mascot chính thức. Quy tắc này cấm *hình*, không cấm *màu* (chốt 07/11/2026): `working` vẫn dùng `accent` vì accent nghĩa là "đang hành động". Không có lời thoại riêng: "lời" của nó là nhật ký hành động.
- `role="img"` với `aria-label` đổi theo trạng thái ("Đồng nghiệp: đang làm việc"); thông báo qua `aria-live="polite"`.

### 12.7 Bốn khoảnh khắc chữ ký

| Khoảnh khắc | Vị trí | Mô tả |
|---|---|---|
| **ASCII Hero "Noise → Order"** | Mở đầu, b1–b4 | Khoảng 8k ký tự noise màu `fg-subtle`. Khi scroll, M11 hội tụ chúng thành wordmark `NO BABYSITTING` trong khung `structure`, đầu vệt `accent`. Sau đó The Colleague xuất hiện `[•_•]` |
| **Level Wipe** | Ranh giới Phần I → II → III → IV | Dải `blocks` quét ngang 600 ms, đổi màu theo `level-1…4`: báo hiệu lên cấp |
| **Lens kiểm chứng** | c07 | Báo cáo tuần được render ASCII; lens theo con trỏ lộ lớp nguồn của từng số liệu: số đúng `signal`, số sai `danger`. Mobile: chạm để xem |
| **Finale full-color** | c10, b3 | Ảnh cinematic một bàn làm việc trống (người đã đi, việc vẫn chạy), render ASCII full-color. Đường can thiệp zig-zag tan thành một trạm ✓; The Colleague `[^_^]✓` |

### 12.8 FloatingOps: giao diện AI "đang vận hành thật"

- 3–5 panel nổi theo lớp: **AgentStatus** (có The Colleague) · **TaskList** (pending → processing → done) · **ActivityLog** · **MetricCounter** ("số liệu đã đối chiếu 0 → 14", dùng ScrambleText) · **Notification** ("Đã đăng tóm tắt lên #thi-truong").
- Được điều khiển bởi **máy trạng thái của kịch bản báo cáo tuần** (idle → pending → processing → verifying → done), không có chuyển động ngẫu nhiên.
- Chiều sâu: mỗi lớp lệch tối đa 24px theo scroll. Vào cảnh bằng stagger 0.08.
- Dùng ở: Mở đầu b3 (hai lần chạy), c08, c09.
- Góc vuông, `border-hard`, nhãn mono. Không che tiêu đề hay CTA. Mobile: gộp thành một log dọc.

### 12.9 Luật bố cục brutalist

- **Lưới lộ ra:** đường chia cột 1px `line`; số chương mono cỡ rất lớn (style `index`) đặt lệch lề như một khối đồ hoạ.
- **Tên chương tiếng Anh** viết hoa bằng Archivo expanded (style `wordmark`); số chương bằng Archivo condensed khổng lồ, tràn khỏi khung (style `index-cond`); phụ đề tiếng Việt bằng sans. **Serif chỉ dành cho câu hỏi Socratic**, tạo tương phản "giọng người" giữa thế giới ký tự máy.
- Bố cục bất đối xứng 5/7. Mỗi chương **phá lưới một lần** (ASCII tràn lề).
- Góc vuông, không bóng (trừ lớp nổi), viền `border-hard`.
- Metadata kỹ thuật (`c04:b3`, `verifiedAt`, số token) hiện như chú thích kỹ thuật bằng mono `fg-subtle`. Đây là một phần của thẩm mỹ.

### 12.10 Accessibility & hiệu năng của lớp ASCII

- [ ] Canvas `aria-hidden`; mọi thông tin đều có bản HTML.
- [ ] Reduced motion: M11 hiện frame cuối, M12 thay bằng nút, M13 tắt, ASCII nền đứng yên.
- [ ] Mobile: không có hover → lens chuyển thành chạm để xem; ≤ 4k ô; 30 fps.
- [ ] Ký tự mang thông tin ≥ 3:1 so với nền; chữ cần đọc là HTML ≥ 4.5:1.
- [ ] Không nhấp nháy quá 3 lần/giây; glitch không đặt trên chữ cần đọc.

### 12.11 Khảo sát reference → quy tắc (mở trực tiếp từng site, 06/11/2026)

| Reference | Quan sát được | Thành quy tắc của No Babysitting |
|---|---|---|
| **Aino** | Nền sáng ấm; ASCII "điêu khắc" đối xứng ở giữa; mật độ giảm dần theo hàng `AAAA8888…::::----`; chữ điều hướng nằm **ngay trong** hàng ký tự; nhãn con trỏ "CLICK" | `AsciiHero`: tượng ký tự 2 thuỳ, các từ BRIEF / ONBOARD / VERIFY / HANDOFF nhúng vào hàng; nhãn con trỏ `[ soi lớp trật tự ]` |
| **WRDLSS** | Địa hình ASCII; chữ condensed khổng lồ cắt mép khung; đồng hồ sống; nút dạng `[ ● ]` | `ChapterOpener`: địa hình `fg-muted` ở 60% trên, số chương condensed tràn khung, đồng hồ ở góc; **mọi nút là `[ NHÃN ]`** |
| **DEIFIED** | Nền tối; chữ expanded lớn; nhãn micro giãn chữ; **một** ô vuông accent ■; ghost text mờ | `.nb-wide` cho tên; `.nb-micro` cho metadata; `.nb-sq` là dấu accent duy nhất; ghost text opacity 0.055 |
| **Asciify** | Chế độ "characters, source color": ký tự mang màu ảnh gốc | `CinematicAscii` (`mode: color`), chỉ ở Mở đầu và finale; màu được kẹp độ sáng tối thiểu để đọc được |
| **Artefakt** | Nền đen tuyền; metadata neo **bốn góc**; tiêu đề wide; kết cấu chấm; bộ đếm `02 / 05` | `.nb-corner` tl/tr/bl/br trên mọi khung; `.nb-dots`; bộ đếm `02 / 10` |
| **Video Polsia** | Panel nổi nhiều lớp, log chạy, số liệu đếm, thông báo trượt vào | `FloatingOps`: ≤ 5 panel, mọi thay đổi hình ứng với một trạng thái thật |

Điều **không** lấy: font thương hiệu riêng của các site (Wesker, Druk, Univers…), hiệu ứng WebGL, chuyển động lặp vô hạn, nền trắng tinh.

### 12.12 Runtime dùng chung cho component

Mọi preview (và sau này là site) dùng chung hai file, không import, không mạng:

- **`bundle.css`** · khung chung: `.nb` `.nb-frame` `.nb-dots` · vai chữ `.nb-micro` `.nb-wide` `.nb-cond` `.nb-q` `.nb-mono` `.nb-ghost` · `.nb-corner.tl/.tr/.bl/.br` (có nền `bg` để không bị ASCII đè) · `.nb-btn` (ngoặc vuông, hover đảo màu, `.is-solid` accent, `aria-pressed/selected` đảo màu) · `.nb-tag` (`.is-signal/.is-warn/.is-danger/.is-info/.is-muted`) · `.nb-sq` · `.nb-cursor` · `.nb-sr`.
- **`bundle.js`** → `window.NoBabysitting`: `ascii(canvas, opt)` (renderer: `order` 0→1, `sweep`, `lens`, `mode: 'color'`, 30 fps, tự dừng khi ra khỏi màn hình, đổi theme tự vẽ lại) · `sources.text / sculpture / terrain / scene` · `colleague(el, state)` · `decode(el, text)` (M4, chỉ cho hành động của agent) · `say(el, text)` (đổi chữ thường, fade `dur-quick`) · `clock(el)` · `cursorLabel(host, text)` · `blocks(v, width)` (thanh `█░`) · `reduce()`.

Tween nào cũng phải ứng với một mục M1–M14; component không tự định nghĩa easing riêng ngoài `nb-settle`.

### 12.13 Bộ component sau đợt restyle

| Nhóm | Component | Điểm nhận diện mới |
|---|---|---|
| ASCII | **AsciiHero** | Tượng ký tự kiểu Aino + từ khoá nhúng; thanh trượt `[ VIBE ] ──── [ AGENTIC ]` |
| ASCII | **ChapterOpener** | Số condensed tràn khung + tên expanded + địa hình + ghost word + metadata bốn góc |
| ASCII | **CinematicAscii** | Cảnh full-color tự dựng (thành phố lúc hoàng hôn), tiêu đề và `dl` metadata kiểu khung phim |
| ASCII | **FloatingOps** | Máy trạng thái `idle → pending → processing → verifying → done`, 5 panel, parallax ≤ 16px |
| ASCII | **TheColleague** | Mặt lớn như chân dung ký tự + lưới 7 trạng thái; con trỏ đến gần thì chuyển `tracking` |
| Story | QuestionCard · PredictPrompt · ThenNowCard · GrillCard | Khung + nhãn góc; serif chỉ ở câu hỏi; mũi tên `─────▶` gõ từng ký tự; lựa chọn đảo màu |
| Sân khấu | AgentWindow | Log mono đánh số, dòng xin quyền viền `warn` nét đứt, kết quả viền `signal`, ô nhập kiểu app/CLI |
| Simulator | ContextMeter | Hai chỉ số condensed (độ tập trung · chi phí mỗi lượt) + thanh khối 32 ô; mốc 1M là vạch đứt mờ "hiếm khi chạm tới"; không có vùng đỏ |
| Simulator | SimulatorFrame | Khung chung S1–S11: mã condensed + mục tiêu + trạng thái chờ ▍ / đang làm / hoàn tất + phản hồi ✓ Khớp / ◐ Khuyến nghị |
| Library | LibraryCard · FilterBar | Lưới thẻ chung viền, mở chi tiết tại chỗ bằng Flip; tìm không dấu, chip lọc 5 chiều, đếm kết quả condensed |
| Điều hướng | ChapterRail · JourneyHUD · PresenterHUD | Rail 12 mốc (hiện tại ■ accent) + dải 12 ô; HUD trên 48px không accent; HUD trình chiếu với đồng hồ chương và thanh Thảo luận |
| Nhãn | ContradictionNote · PlanPill | Các bên ngang hàng trong khung đứt nét `info`; pill trạng thái, gói, bề mặt kèm bộ chọn "gói của tôi" |
| Thương hiệu | Logo | Chữ Blocks (bitmap 139×18 và 104×14); dòng code trắng được gõ rồi biên dịch thành khối, vệt sau chuyển sang accent |
| Nhãn | DurabilityTag · SourceBadge | Ô đánh dấu 9px theo hình (đặc, nửa, gạch chéo, chấm) + chữ mono trung tính; SourceBadge đặt cạnh một con số condensed lớn |

> **Đã xử lý 07/11/2026:** ContextMeter vẽ theo khung S1 mới (hai chỉ số, không ngưỡng); `overloaded` không còn gắn với ngưỡng context. Trạng thái từng component xem `design-system/SOURCE-OF-TRUTH.md`.
