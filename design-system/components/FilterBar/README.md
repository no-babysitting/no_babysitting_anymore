FilterBar là thanh tìm và lọc của Library: một ô tìm kiếm, các nhóm chip lọc, hàng "bộ lọc đang bật", bộ đếm kết quả cỡ lớn và danh sách kết quả. Library là nửa sản phẩm (khoảng 350–450 mục), nên đây là chỗ người học dành nhiều thời gian nhất ngoài Story.

## Dùng khi

- Trang Library. Dạng rút gọn (chỉ ô tìm + Loại) trong ngăn "Đào sâu" của chương.

## Người dùng cung cấp

- `items`: danh sách mục (từ `ContentUnit` + `Overlay`).
- `groups`: các chiều lọc. FR-06 yêu cầu: **loại, cấp độ, độ bền, bề mặt, vai trò** (đã có trong preview), cộng **nguồn, chương, nguyên lý** (thêm ở M4). *Nguyên lý P1–P12 chưa được định nghĩa ở tài liệu nào; chưa làm chip cho tới khi có danh sách.*

## Quy tắc

- **Tìm không dấu:** so khớp trên chuỗi đã bỏ dấu (`NFD` + bỏ dấu kết hợp + `đ → d`), nên gõ "tua lai" vẫn ra "Tua lại". Phần khớp được gạch chân 2px `fg-muted` (không tô nền màu).
- Phím `/` đưa focus vào ô tìm (chỉ khi focus chưa ở trong ô nhập nào).
- **Trong một nhóm là HOẶC, giữa các nhóm là VÀ.** Mỗi chip ghi số mục của riêng giá trị đó.
- Chip là nút bật/tắt (`.nb-chip`, `aria-pressed`). Bật thì đảo màu `fg`/`bg`, giống tab và lựa chọn ở PredictPrompt. **Không dùng accent** cho chip.
- Hàng "bộ lọc đang bật" lặp lại từng bộ lọc thành nút `[ Nhóm: giá trị ✕ ]` + `[ Xoá lọc ]`. Không có bộ lọc thì ghi "Chưa bật bộ lọc nào."
- Bộ đếm: số condensed lớn + "trên N mục". Đổi số không animate (tránh nhấp nháy khi gõ).
- Danh sách đổi bằng Flip `0,36s` (M3); mục mới fade vào, mục bị lọc fade ra. Reduced motion: đổi tức thì.
- Mục `superseded` vẫn hiện, tiêu đề màu `fg-muted`, kèm `✕ Đã thay thế`.
- Rỗng: "Không có mục nào khớp. Thử từ khác, hoặc `[ Xoá lọc ]`." Không dùng hình minh hoạ.
- Mobile (≤ 640px): các nhóm lọc nằm trong `<details>` đóng sẵn, tiêu đề "Bộ lọc · n đang bật".

## Không nên

- Lọc lại sau mỗi phím gõ mà không debounce (preview dùng 120ms).
- Ẩn số mục của từng chip: người học cần biết chiều nào còn nhiều mục.
- Dùng màu làm tín hiệu duy nhất của độ bền trong danh sách: luôn có ký hiệu `◆ ◐ ✕ ⇄` và chữ.

## Accessibility

- Ô tìm nằm trong `role="search"` và có `<label>`; `aria-describedby` trỏ tới bộ đếm.
- Bộ đếm là `aria-live="polite"`, nên số kết quả được đọc lên sau khi lọc.
- Mỗi nhóm là `<fieldset>` + `<legend>`. Chip có `aria-pressed`. Nút bỏ lọc có `aria-label` đầy đủ ("Bỏ lọc Cấp độ MEDIUM").
