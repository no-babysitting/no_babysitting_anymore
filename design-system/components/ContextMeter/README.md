ContextMeter cho thấy context là một ngân sách bị tiêu dần: mỗi lượt đổ thêm vào thanh, và chất lượng giảm từ khá sớm. Đây cũng là simulator S1 ở chương 02.

## Dùng khi

- Chương 02 (S1). Có thể dùng thu nhỏ ở chương 05, 06 để cho thấy chi phí context của skill, connector.

## Người dùng cung cấp

- `steps`: các hành động có nhãn và lượng tiêu (số minh hoạ, phải ghi rõ là "mô phỏng").
- `thresholds`: mặc định 40% (dumb zone) và 60% (nên kết thúc), ghi nguồn. Ngưỡng *chưa thống nhất* giữa các nguồn, nên đặt ContradictionNote bên cạnh.

## Quy tắc

- Rãnh thanh dùng `bg-sunken`; phần đã dùng là thanh M2 (`scaleX`, gốc bên trái).
- Màu là **trạng thái**, luôn kèm icon + chữ: < 40% `signal` "✓ Vùng an toàn"; 40–60% `warn` "◐ Dumb zone"; > 60% `danger` "✕ Nên kết thúc".
- Vạch ngưỡng vẽ bằng `fg-muted`; nhãn ngưỡng dùng style `small`.
- Có nút giảm (Tua lại, Phiên mới) để người học thấy cách lấy lại ngân sách.
- Số phần trăm hiển thị bằng chữ, dùng `tabular-nums`.

## Không nên

- Dùng dải màu liên tục đỏ → xanh.
- Trình bày ngưỡng như một sự thật tuyệt đối.

## Accessibility

- `role="meter"` với `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-valuetext` (ví dụ "46%, dumb zone"). Trạng thái thông báo qua `aria-live`.
