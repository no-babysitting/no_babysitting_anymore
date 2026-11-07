ChapterRail là mục lục chương: 12 mốc (Mở đầu, 01–10 và 05b) chia theo 4 phần và cấp độ Low → Pro. Có hai dạng: **rail dọc** ở cạnh trái màn hình desktop, và **dải 12 ô** cho mobile và cho JourneyHUD.

## Dùng khi

- Rail dọc: cạnh trái trang Story ở desktop (≥ 1100px), mở ra khi hover hoặc focus nếu đang thu gọn.
- Dải 12 ô: thanh trên ở mobile, và trong JourneyHUD.

## Người dùng cung cấp

- `chapters`: `{ id, no, en, vi, part }` lấy từ cấu trúc Story (PRD §5). Tên tiếng Anh viết như nguồn và hiển thị viết hoa bằng CSS; phụ đề tiếng Việt viết thường.
- `current`, `beat`: chương và beat hiện tại (từ ScrollTrigger hoặc PresenterDriver).

## Quy tắc

- Ba trạng thái, mỗi trạng thái có **ký hiệu + màu + chữ cho screen reader**:
  - đã qua: `✓`, chữ `fg-muted`;
  - hiện tại: `■` **accent**, viền trái 3px accent, nền `bg-raised`, kèm 8 vạch beat (vạch đã qua màu `fg`);
  - sắp tới: `·`, chữ `fg-subtle` (đạt 4,5:1 trên cả `bg` và `bg-raised`).
- Accent chỉ đánh dấu **vị trí hiện tại**. Không tô accent cho chương đã xong.
- Tiêu đề phần là nhãn micro: "Phần II · giao việc có cấu trúc" bên trái, cấp độ `MEDIUM` bên phải.
- Dải 12 ô: ô đã qua đặc `fg-muted`, ô hiện tại đặc accent, ô sắp tới chỉ có viền `control`; giữa các phần có khe 6px.
- Bấm một mốc thì cuộn tới chương bằng ScrollToPlugin (`dur-slow`, `power2.inOut`); reduced motion thì nhảy thẳng.
- **Không khoá chương chưa học**: mọi mốc đều bấm được.

## Không nên

- Dùng thanh phần trăm hoàn thành cho cả khoá: tiến độ là theo chương, không phải theo điểm.
- Ẩn tên tiếng Việt ở rail dọc. Người học đọc tiếng Việt trước.

## Accessibility

- Mỗi dạng là một `<nav aria-label>`; danh sách `<ol>`; mốc hiện tại có `aria-current="step"`.
- Trạng thái được đọc bằng chữ ẩn ("đã học", "đang học, beat 3 trên 8"); ký hiệu `✓ ■ ·` là `aria-hidden`.
- Ô của dải thu gọn có `aria-label` "03 The Brief".
