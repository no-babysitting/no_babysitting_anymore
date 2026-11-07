ThenNowCard cho thấy một best practice đã đổi theo thế hệ model: cách cũ, vì sao nó từng hợp lý, cách mới, và câu hỏi để người học tự đánh giá.

## Dùng khi

- Beat **Then → Now** ở các chương 03–07, và bảng tổng kết six shifts ở chương 10.

## Người dùng cung cấp

- `then`: cách cũ (trích nguyên văn nếu có) + một câu "vì sao từng hợp lý".
- `now`: cách mới (trích nguyên văn nếu có).
- `guide`: câu hỏi dẫn, set bằng style `quote`.
- `durability`: một DurabilityTag.
- `interpretation` (tuỳ chọn): bật khi đây là diễn giải của trang chứ không phải của nguồn.

## Quy tắc

- Thẻ "Hồi đó" có eyebrow `HỒI ĐÓ`. Sau M6, nội dung mờ về 0.45 và có đường gạch `danger`.
- Mũi tên M1 nối hai thẻ là ký tự `─────▶` màu `accent`, gõ ra từng ký tự (`steps`). Ghost text "THEN" / "NOW" mờ 0.055 phía sau mỗi thẻ; thẻ "Bây giờ" nền `bg-raised`.
- Thẻ "Bây giờ" có eyebrow `BÂY GIỜ` màu `signal`, đậu vào bằng `ease-settle`. Tổng chuỗi ≤ 1,6s.
- Trên màn hẹp, hai thẻ xếp dọc và mũi tên quay xuống.
- Reduced motion: gạch tĩnh, mũi tên vẽ sẵn, thẻ đứng yên.

## Không nên

- Dùng để so sánh hai lựa chọn ngang hàng. Việc đó dành cho ContradictionNote.
- Bỏ phần "vì sao từng hợp lý": người học cần hiểu cách cũ không phải là "sai".

## Accessibility

- Hai thẻ là `<article>`, đọc theo thứ tự "Hồi đó… Bây giờ…". Mũi tên có `aria-hidden`.
