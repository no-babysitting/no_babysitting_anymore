LibraryCard là thẻ của một mục trong Library (khoảng 350–450 mục: tip, tính năng, workflow, báo cáo, shift, ca sử dụng). Bấm vào thẻ thì nó **mở chi tiết ngay tại chỗ** bằng Flip (M3 · tái cấu trúc): thẻ chiếm cả hàng, phần chi tiết hiện bên phải. Không chuyển trang, nên người học không mất vị trí trong danh sách đã lọc.

## Dùng khi

- Lưới kết quả của Library (cùng `FilterBar`), ngăn "Đào sâu" trong chương, và "Mục liên quan" ở cuối beat.

## Người dùng cung cấp (từ `ContentUnit` + `Overlay`, SAD §7.1)

- `type` → eyebrow mono: `TIP`, `WORKFLOW`, `Tính năng`, `Báo cáo`… (từ tiếng Anh viết hoa, tiếng Việt viết thường theo quy tắc nhãn micro) + nhóm viết thường (`context`, `plan`).
- `titleVi`, `summaryVi` (đúng **một** câu, tối đa khoảng 120 ký tự).
- `sources: SourceRef[]` → dòng `who` thu gọn ở chân thẻ (loại · người hoặc ngày) và nút `[ Nguồn · n ↗ ]` trong chi tiết.
- `durability` → `DurabilityTag`. Với `superseded`: tiêu đề chuyển `fg-muted`, thay câu tóm tắt bằng dòng `→ nay làm thế nào`, và chi tiết có mục "Thay bằng".
- `level` → thanh 4 ô `level-1…4` + nhãn chữ `LOW / MEDIUM / HIGH / PRO`.
- `chapters` → mã chương ở góc phải eyebrow và link "Chương" trong chi tiết.
- Chi tiết: đoạn giải thích, bề mặt (`AvailabilityBadges` dạng pill), trạng thái phát hành (`StatusPill`), `PlanPill` nếu docs nêu gói, ngày kiểm chứng.

## Quy tắc

- Lưới không có khe: các thẻ chung viền 1px `control` như một bảng. Không bóng, không bo góc.
- Hover: nền `bg-raised`. Focus: viền focus 2px *bên trong* thẻ (link phủ cả thẻ nên focus phải bao cả thẻ).
- **Không dùng accent trong thẻ.** Accent chỉ ở nút hành động khi thẻ đang mở (nếu có CTA chính) và ô ■ ở nhãn góc.
- Mở: thẻ được đưa lên đầu lưới và chiếm cả hàng; thẻ khác giữ thứ tự. Đóng bằng `[ Đóng · Esc ]` hoặc phím Esc, focus quay về tiêu đề thẻ.
- Flip `dur-base` (0,48s), `power2.inOut`. Reduced motion: đổi bố cục tức thì.

## Không nên

- Đặt nhiều link trong thẻ đóng: cả thẻ chỉ là **một** link (link phủ bằng `::after`). Link phụ chỉ xuất hiện khi thẻ mở.
- Cắt tiêu đề bằng dấu "…". Tiêu đề dài thì xuống dòng.
- Ẩn mục `superseded` khỏi kết quả mặc định. Người học cần nhận ra mẹo cũ khi gặp lại; dùng bộ lọc độ bền để ẩn nếu muốn.

## Accessibility

- Thẻ là `<article aria-labelledby>`; tiêu đề là `<h3>` chứa link có `aria-expanded` và `aria-controls` trỏ tới phần chi tiết.
- Thanh cấp độ là `role="img"` có `aria-label` "Cấp độ Medium, 2 trên 4".
- Mở và đóng được thông báo qua vùng `aria-live="polite"`.
- `DurabilityTag` *Đã thay thế* có gạch ngang và ký hiệu ✕, không chỉ dựa vào màu.
