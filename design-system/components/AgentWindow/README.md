AgentWindow là sân khấu chính của trang: một nhật ký trung tính về bề mặt, cho thấy agent thu thập thông tin, hành động, xin quyền và kiểm chứng.

## Dùng khi

- Pha **THẤY** của hầu hết các chương, và mọi lúc cần cho thấy "Claude đang làm gì".

## Người dùng cung cấp

- `title`: tên dự án hoặc thư mục (ví dụ `bao-cao-tuan`).
- `chrome`: `app` (mặc định; khung cửa sổ giản lược, không logo) hoặc `cli` (dấu nhắc `›`).
- `entries`: danh sách gồm tin nhắn của bạn (sans) và hành động của agent (mono). Mỗi hành động có loại: `doc` (đọc), `web` (tra web), `edit` (sửa), `ask` (xin quyền), `check` (kiểm chứng).
- `result`: dòng kết quả cuối.

## Quy tắc

- Hành động của agent dùng style `action`; tên hành động (*Đọc, Tra web, Sửa, Xin quyền, Kiểm*) màu `fg-muted`, đối tượng màu `fg`.
- Trạng thái ở thanh tiêu đề: *đang chạy* (màu `accent`), *chờ quyền* (`warn`), *xong* (`signal` + ✓).
- Chuyển động: các dòng vào theo stagger 0.12; tên hành động dùng M4 (ScrambleText) khi xuất hiện.
- Khung `app` chỉ là cửa sổ giản lược: tên dự án ở nhãn góc trên trái, trạng thái + The Colleague ở góc trên phải, ô nhập `Trả lời Claude… [ gửi ]`; không logo, không chép bố cục UI thật. Khung `cli` (dấu nhắc `>`, con trỏ khối accent) chỉ dùng trong tab CLI.
- Nhật ký là log mono đánh số `01 02 …`; dòng xin quyền có viền `warn` nét đứt và dấu `[ chờ ]` → `[ đã cho phép ]`; kết quả đóng khung `signal`.
- Reduced motion: toàn bộ nhật ký hiện ngay.

## Không nên

- Dùng lệnh shell trong khung `app`.
- Thêm "ba chấm cửa sổ" hay màu đèn giao thông.
- Mô phỏng một sản phẩm cụ thể bằng tên hay logo.

## Accessibility

- Nhật ký là `<ol>`; trạng thái đổi được thông báo qua `aria-live="polite"`.
