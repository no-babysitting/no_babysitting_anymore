ContextMeter là simulator S1 ("Nhiễu tích tụ") ở chương 02. Nó cho thấy hai điều cùng lúc: mỗi bản hỏng và lời sửa **vẫn nằm lại trong hội thoại** làm giảm độ tập trung, và mỗi lượt gửi lại toàn bộ lịch sử nên lịch sử dài thì **lượt nào cũng đắt hơn**. Hết context thì hiếm khi xảy ra (docs chính thức: *"you'll rarely run out of context"*).

## Dùng khi

- Chương 02 (S1). Dạng thu nhỏ (chỉ hai thanh) có thể dùng ở chương 05 và 06 để cho thấy chi phí của skill và connector.

## Người dùng cung cấp

- `blocks`: các loại khối có thể thêm vào hội thoại, mỗi loại có `tok` (nghìn token) và `noise` (mức gây nhiễu). Đều là **số minh hoạ**, phải ghi rõ "mô phỏng".
- `actions`: các cách dọn hội thoại (Tua lại, Nén có trọng tâm, Phiên mới + brief).

## Quy tắc

- **Hai chỉ số, tính từ nội dung hội thoại**, không từ ngưỡng phần trăm:
  - *Độ tập trung* (0–100): giảm theo khối gây nhiễu, nhất là bản hỏng. Thanh màu `fg`.
  - *Chi phí mỗi lượt* (K token): tăng theo tổng độ dài lịch sử. Thanh màu `chart-1` (chuỗi dữ liệu, không phải trạng thái).
- **Không có vùng đỏ cố định**, không đổi màu theo ngưỡng. Lời giải thích dưới mỗi số nói *vì sao* (ví dụ "2 bản hỏng vẫn nằm trong hội thoại"), không nói "đã vượt X%".
- Mốc 1M token và tự nén là **vạch đứt mờ ở tận cùng bên phải** thanh chi phí, ghi "hiếm khi chạm tới".
- Ngưỡng của từng người (Dex khoảng 40%, Matt khoảng 100K, Thariq khoảng 300–400K) đặt trong **ContradictionNote** bên cạnh, kèm `SourceButton`. Tag `⇄ Ngưỡng % · chưa thống nhất` luôn hiện.
- The Colleague: `idle` khi phiên mới; `working` khi có việc; `thinking` `[°_°]…` khi còn từ 2 bản hỏng trở lên hoặc độ tập trung dưới 50. Không dùng `overloaded` cho S1.
- Nút "Phiên mới + brief" là hành động chính nên dùng `is-solid` (accent).
- Số dùng `tabular-nums`; chuyển số bằng `steps(10)` (M2, tiêu hao).

## Không nên

- Vẽ thước 40/60 hay vùng `warn`/`danger` trên thanh. Đó là khung cũ trước 07/11/2026.
- Dùng dải màu liên tục đỏ → xanh.
- Gợi ý rằng phải "canh từng phần trăm". Thông điệp là *giữ hội thoại tập trung*, không phải *sợ cạn*.

## Accessibility

- Hai `role="meter"`, mỗi cái có `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, và `aria-valuetext` chứa lời giải thích (ví dụ "58 trên 100. 2 bản hỏng và lời sửa vẫn nằm trong hội thoại…").
- Nhật ký hành động là `<ol aria-live="polite">`. Thanh khối `█░` là `aria-hidden`.
