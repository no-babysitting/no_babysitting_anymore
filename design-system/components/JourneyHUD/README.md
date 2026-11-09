JourneyHUD là thanh trên cao 48px, dính ở đầu trang Story (FR-08). Nó trả lời bốn câu hỏi trong một cái liếc: *mình đang ở cấp độ nào*, *đã hiểu phần nào của harness*, *báo cáo tuần đã đạt mấy tiêu chí*, *đang ở chương nào*. Bấm `[ Chi tiết ]` để mở bảng đầy đủ.

## Dùng khi

- Mọi trang Story. Ẩn trong Presenter (PresenterHUD thay thế) và trong Library.

## Người dùng cung cấp

- `progress`: số chương đã hoàn thành (0–12) và chương hiện tại.
- `harness`: **6 phần**, đúng mental model ở mục tiêu G1 của PRD: *context* (c02) · *kế hoạch* (c03) · *trí nhớ* (c04) · *khối xây dựng* (c05, gồm cả 05b) · *rào chắn* (c06) · *kiểm chứng* (c07). Mỗi phần mở khi xong chương tương ứng.
- `criteria`: 4 tiêu chí của BÁO CÁO TUẦN (giống StatusBoard).

## Quy tắc

- Thứ tự từ trái sang phải: wordmark · cấp độ · harness · báo cáo tuần · vị trí chương · `[ Chi tiết ]`. Ngăn cách bằng hairline `control`, không có khe.
- **Cấp độ:** 4 ô `level-1…4` (ordinal, một tông màu) + nhãn chữ `LOW / MEDIUM / HIGH / PRO`. Cấp độ theo *phần* của chương hiện tại (Phần I Low, II Medium, III High, IV và Kết Pro). Lên cấp không có chuyển động riêng (không có mục nào trong M1–M17 mang nghĩa này); ô mới đổi màu tức thì và được đọc qua `aria-live`.
- **Harness:** 6 ô vuông 11px; ô đã mở đặc `fg`, chưa mở chỉ có viền. Không dùng accent.
- **Báo cáo tuần:** `■■□□` bằng mono, giống dạng thu gọn của StatusBoard.
- **Vị trí:** `c03 · 4/12`. Không có thanh phần trăm cho cả khoá.
- Bảng chi tiết: cột trái là bản đồ harness (✓ `signal` + chữ `fg` cho phần đã mở, `·` + chữ `fg-subtle` cho phần chưa mở), cột phải là 4 tiêu chí.
- Mobile (≤ 760px): ẩn wordmark, harness, báo cáo tuần ở thanh; chúng vẫn có trong `[ Chi tiết ]`.

## Không nên

- Dùng accent ở HUD. HUD luôn hiện, nên nếu có accent nó sẽ tranh chỗ với hành động trong trang.
- Gọi các phần là "10 trụ". Bản cũ của design system §7 nhắc "10 trụ harness" nhưng không định nghĩa ở đâu; nguồn duy nhất có định nghĩa là PRD G1 (6 phần).
- Khoá chương dựa vào HUD. HUD chỉ phản ánh, không chặn.

## Accessibility

- Thanh là `<header aria-label="Tiến độ học">`. Cấp độ là `role="progressbar"` với `aria-valuetext` "MEDIUM, chương 4 trên 12".
- Harness và báo cáo tuần là `role="img"` có `aria-label` bằng chữ ("Harness: đã mở 2 trên 6 phần").
- `[ Chi tiết ]` có `aria-expanded` + `aria-controls`. Thay đổi tiến độ đọc qua `aria-live="polite"`.
