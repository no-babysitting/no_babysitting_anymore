GrillCard là câu hỏi nhớ lại ở cuối chương: người học tự trả lời trước, rồi mới mở đáp án khuyến nghị.

## Dùng khi

- Pha **NHỚ** ở cuối mỗi chương, 2–3 thẻ.

## Người dùng cung cấp

- `question`: hỏi về *cơ chế* hoặc *quyết định*, không hỏi định nghĩa.
- `answer`: đáp án khuyến nghị, 1–2 câu, có lý do.

## Quy tắc

- Định dạng lấy từ skill grill-me: một câu hỏi và một đáp án khuyến nghị.
- Label ô trả lời là nhãn micro `› Câu trả lời của bạn` kèm bộ đếm ký tự; ô nhập mono, caret màu `accent`.
- Nút `[ Xem đáp án khuyến nghị ]` (`aria-expanded`). Gate, don't trap: ô còn trống thì nhắc một lần, bấm lần nữa vẫn mở. Đáp án mở dưới một nét `fg` 2px ở đầu khối (accent chỉ cho hành động), kèm tự chấm `[ Trúng ] [ Gần đúng ] [ Chưa ]`. Không chấm điểm câu trả lời tự do.
- Câu trả lời được lưu cục bộ cho phần recap.

## Không nên

- Hỏi kiểu đúng/sai.
- Hiện đáp án trước.

## Accessibility

- `<label for>` cho ô trả lời; nút mở có `aria-expanded` + `aria-controls`; nút tự chấm dùng `aria-pressed`.
