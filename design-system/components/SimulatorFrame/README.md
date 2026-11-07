SimulatorFrame là khung chung cho cả 11 simulator (S1–S11). Mỗi simulator chỉ thay **khu thao tác**; tiêu đề, mục tiêu học, trạng thái, phản hồi, nút `[ Kiểm tra ]` / `[ Làm lại ]` và dòng nguồn luôn giống nhau, để người học không phải học lại cách dùng ở mỗi chương.

## Dùng khi

- Pha LÀM (và một số pha THẤY) của mọi chương có simulator: S1 c02 · S2 c02 · S3 c03 · S4 c04 · S5 c05 · S9 c05b · S6 c06 · S7 c07 · S10 c08 · S11 c09 · S8 c10.

## Người dùng cung cấp

- `id` (`S4`), `titleEn` cho nhãn góc (`CLAUDE.MD LINTER`), `titleVi` (`Linter hướng dẫn dự án`), `chapter`, `goalVi` (một câu "Mục tiêu: …").
- `body`: khu thao tác của simulator đó.
- `evaluate()`: trả về số khớp và phản hồi cho từng mục. Mỗi phản hồi có **lý do** và gắn với nguồn.
- `sources`: dòng nguồn ở chân khung (và `SourceButton` nếu cần).

## Quy tắc

- **Đầu khung:** mã simulator condensed lớn (`S4`, `aria-hidden`) + tiêu đề tiếng Việt `h2` + một câu mục tiêu. Nhãn góc: `S4 · CLAUDE.MD LINTER` (tiếng Anh viết hoa) và `mô phỏng · c04 · pha làm` (tên pha tiếng Việt viết thường).
- **Ba trạng thái**, hiện ở ô góc phải, đọc qua `aria-live`:
  - *chờ*: "Chờ bạn ▍", con trỏ accent nhấp nháy 3 chu kỳ (M7 · tới lượt bạn), rồi đứng yên;
  - *đang làm*: "Đang làm · 3/6";
  - *hoàn tất*: "✓ Hoàn tất" màu `signal`, nháy `signal` một lần (M9).
- **Khu thao tác:** lựa chọn dạng thanh phân đoạn (radio thật, chọn thì đảo `fg`/`bg`). Kéo thả nếu có thì **luôn có thay thế bàn phím** (Space nhặt, mũi tên di chuyển, Enter thả).
- `[ Kiểm tra ]` là hành động chính (`is-solid`, accent), chỉ bật khi đã trả lời đủ. `[ Làm lại ]` luôn bật.
- **Phản hồi:** "✓ Khớp" (`signal`) hoặc "◐ Khuyến nghị: Xoá" (`warn`), kèm lý do. **Không dùng `danger` và không dùng chữ "sai"**: đáp án khác khuyến nghị là cơ hội đọc lý do, không phải lỗi.
- Điểm là số condensed `4 / 6`, không có phần trăm, không có xếp hạng.
- Số liệu minh hoạ (S1, S9) phải ghi "mô phỏng" ở nhãn góc.

## Không nên

- Khoá nút `[ Kiểm tra ]` mà không nói vì sao. Dòng hướng dẫn dưới khung ghi rõ "Chọn đủ 6 dòng rồi bấm Kiểm tra".
- Thêm đồng hồ đếm ngược hay âm thanh.
- Đổi bố cục khung giữa các simulator.

## Accessibility

- Khung là `<section aria-labelledby>` trỏ tới `h2`. Khu thao tác là `<form>`; mỗi dòng là `role="radiogroup"` có `aria-labelledby` trỏ tới nội dung dòng, nên phím mũi tên chọn được ngay.
- Sau khi kiểm tra, mỗi radio có `aria-describedby` trỏ tới phản hồi của dòng đó.
- Trạng thái và lời nhắn tổng là `aria-live="polite"`. Điểm condensed là `aria-hidden`; lời nhắn đã chứa "Khớp 4/6".
