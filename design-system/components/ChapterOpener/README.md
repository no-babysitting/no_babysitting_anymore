ChapterOpener là màn mở mỗi chương: số chương condensed khổng lồ tràn khỏi khung, tên chương tiếng Anh expanded, địa hình ASCII mờ phía trên, metadata mono neo ở bốn góc.

## Học từ reference

- **WRDLSS**: chữ condensed khổng lồ cắt mép khung; địa hình ASCII; đồng hồ sống ở header.
- **DEIFIED**: tên lớn kiểu expanded; nhãn micro giãn chữ rộng; ô vuông accent ■; ghost text mờ phía sau.
- **Artefakt**: metadata neo bốn góc, dạng `02 / 10`.

## Người dùng cung cấp

- `index` (02), `part` (Phần I · Low), `titleEn` (THE BRIEFING BUDGET), `subtitleVi`, `ghost` (một từ khoá tiếng Anh), `beats`, `minutes`.

## Quy tắc

- Số chương: `index-cond` (Archivo 62%, 800), màu `fg`, `aria-hidden`.
- Tên chương: `wordmark` (Archivo 125%, viết hoa). Phụ đề tiếng Việt dùng sans `fg-muted`, tối đa 44ch.
- Địa hình ASCII: tông `fg-muted`, chỉ chiếm 60% phía trên, lấp lánh rất nhẹ. Lens dùng `accent`, vì "nhìn vào" là hành động.
- Ghost text ở opacity 0.055, không bao giờ chứa nội dung cần đọc.
- Chuỗi vào cảnh: số → tên → đường kẻ → phụ đề; tổng ≤ 1,4s. Nhãn góc dùng decode (M4).
- Mobile: tên chương xuống toàn chiều rộng, số chương thu nhỏ còn 200px.

## Không nên

- Đặt câu hỏi Socratic ở đây; câu hỏi thuộc về QuestionCard.
- Dùng màu accent cho địa hình.

## Accessibility

- `h2` là tên chương. Canvas, ghost text và số chương đều `aria-hidden`.
