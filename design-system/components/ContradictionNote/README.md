ContradictionNote `⇄` đặt các nguồn nói khác nhau **cạnh nhau, ngang hàng**, mỗi bên kèm nguồn của mình. Nó dùng khi các nguồn đáng tin bất đồng (ngưỡng context, mẹo cũ so với docs mới) và khi số liệu tự đếm lệch với số được công bố.

## Dùng khi

- Pha HIỂU của chương có nhãn độ bền *Chưa thống nhất* (ví dụ c02 · b4: ngưỡng context).
- Cạnh con số trong Library khi số đếm của ingest lệch với upstream (README ghi 83, đếm được 82).
- Trong chi tiết LibraryCard khi `Overlay.contradictions` có dữ liệu.

## Người dùng cung cấp

- `question`: câu hỏi mà các nguồn trả lời khác nhau, viết dạng câu hỏi (không viết dạng kết luận).
- `sides`: 2–3 bên, mỗi bên `{ value?, claim, who, kind, date?, sources }`. `value` là con số condensed nếu có; `claim` là trích dẫn hoặc diễn giải ngắn.
- `note`: một câu về bối cảnh (ví dụ "phụ thuộc model và tác vụ"), và nơi học kỹ hơn.

## Quy tắc

- **Ngang hàng:** các cột cùng độ rộng, cùng cỡ chữ, cùng màu. Không đặt bên nào lên trên, không in đậm bên nào, không có ✓.
- **Thứ tự:** theo ngày công bố (cũ trước), rồi theo tên. Docs chính thức không tự động đứng đầu; nó chỉ là một bên có ghi rõ "docs".
- Viền ngoài đứt nét `info` (cùng ngôn ngữ với nhãn *Chưa thống nhất*); ký hiệu `⇄` nằm trên đường chia giữa các cột.
- `claim` dùng serif. **Chỉ lời nguyên văn đã đối chiếu** mới có ngoặc kép và in nghiêng; ý tóm tắt lại thì viết thẳng, không ngoặc kép, và dòng nguồn ghi `diễn giải`. Không bao giờ đặt ngoặc kép quanh câu mà ta chưa đọc tận mắt ở nguồn. Phần nguồn dùng mono.
- Mỗi bên có `SourceButton` riêng. Bên không có link ngoài (ví dụ nhật ký ingest) dùng nút trỏ tới trang nội bộ.
- Câu chân: nêu bối cảnh, **không kết luận** thay người học. Câu "Trang không chọn bên nào" là bắt buộc khi có từ 2 nguồn bên ngoài.

## Không nên

- Dùng màu `danger`/`signal` để ngầm báo bên nào đúng.
- Gộp các bên thành một câu "các nguồn cho rằng…". Mỗi bên phải đọc được riêng, có người và ngày.
- Dùng cho chuyện đã ngã ngũ. Mẹo đã bị docs thay hẳn thì dùng `DurabilityTag` *Đã thay thế* + ThenNowCard, không dùng ContradictionNote.

## Accessibility

- Khối là `<aside aria-labelledby>` trỏ tới câu hỏi `<h3>`.
- Các bên là danh sách (`role="list"` / `listitem`) để screen reader đọc "danh sách 3 mục".
- Con số condensed là `aria-hidden` vì `claim` đã chứa cùng thông tin bằng chữ.
- Ký hiệu `⇄` là trang trí (CSS `::before`); nhãn chữ "Chưa thống nhất" ở header mới là thông tin.
