StatusBoard là bảng trạng thái của kịch bản xuyên suốt "BÁO CÁO TUẦN": 4 tiêu chí chuyển dần từ `[ ]` sang `[✓]` qua các chương.

## Dùng khi

- Luôn hiện trong HUD (thu gọn thành 4 chấm ở góc dưới phải, mở ra khi hover hoặc focus). Hiện lớn ở cuối Mở đầu và ở chương 09.

## Người dùng cung cấp

- `criteria`: 4 tiêu chí cố định: ① Hiểu đúng yêu cầu (c03) · ② Đúng chuẩn trình bày của team (c04) · ③ Số liệu được kiểm chứng (c07) · ④ Lặp lại được và tự chạy (c05 → c08 → c09).
- `state`: trạng thái của từng tiêu chí, lấy từ tiến độ của người học.

## Quy tắc

- `[ ]` dùng `fg-subtle`, `[✓]` dùng `signal`, luôn có nhãn chữ "Chưa đạt / Đã đạt" đi kèm. Bộ đếm condensed `0 / 4`; dạng HUD thu gọn là `■■□□` ở góc.
- Khi một tiêu chí chuyển trạng thái: M9 (nháy `signal` một lần trong `dur-quick`).
- Khi đủ 4/4: một khoảnh khắc ăn mừng tiết chế, chỉ là một câu chữ. Không pháo hoa, không confetti.

## Không nên

- Dùng đỏ cho "Chưa đạt". Chưa đạt không có nghĩa là lỗi.

## Accessibility

- Là danh sách có trạng thái bằng chữ ("Chưa đạt" / "Đã đạt"). Thay đổi thông báo qua `aria-live`.
