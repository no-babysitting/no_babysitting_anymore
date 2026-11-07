PredictPrompt buộc người học chốt một dự đoán trước khi animation mở ra. Đây là pha "Đoán" của vòng Predict → Observe → Explain.

## Dùng khi

- Pha **ĐOÁN**, ngay sau QuestionCard.

## Người dùng cung cấp

- `legend`: câu hỏi ngắn (có thể lặp lại câu hỏi chương).
- `options`: đúng 3 phương án. Mỗi phương án nhiễu là một **hiểu lầm có nguồn**, không phải phương án đùa.
- `correct`: chỉ số phương án đúng.
- `reveal`: một câu giải thích, hiện sau khi chốt.

## Quy tắc

- Mỗi phương án là một hàng `[A] [B] [C]`, viền `control`, các hàng dính nhau như bảng. Khi được chọn, hàng **đảo màu** (nền `fg`, chữ `bg`). Sau khi chốt: đáp án đúng viền `signal` + `[✓] đúng`; lựa chọn khác viền nét đứt + `→ xem vì sao`. Nhãn góc ghi giờ chốt.
- The Colleague `[°_°]…` đứng đầu legend (đang nghĩ cùng bạn). Pha Quan sát dùng thanh khối `█░` theo lượt thử (M2), ghi rõ "số liệu minh hoạ".
- Nút chính "Chốt dự đoán" nền `accent`, chữ `on-accent`. Nút phụ "Bỏ qua" viền `control`.
- Sau khi chốt: phương án đúng có ✓ màu `signal`. Phương án đã chọn nếu chưa đúng thì hiện "→ xem giải thích", **không** tô đỏ hay đánh dấu "sai". Mọi lựa chọn bị khoá.
- Stage bên cạnh bị khoá *animation* (lớp phủ `bg` 70%) tới khi chốt hoặc bỏ qua. Cuộn trang không bị khoá.
- Lựa chọn được lưu cục bộ để hiện lại ở phần recap.

## Không nên

- Cho xem đáp án trước khi chốt.
- Dùng quá 3 phương án.
- Khen chê người học ("Sai rồi!").

## Accessibility

- `fieldset` + `legend`; radio thật, đi bằng phím mũi tên. Phần giải thích thông báo qua `aria-live="polite"`.
