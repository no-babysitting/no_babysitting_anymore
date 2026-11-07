QuestionCard mở mỗi chương bằng một câu hỏi Socratic có mâu thuẫn thật, người học trả lời được bằng kinh nghiệm của chính mình.

## Dùng khi

- Pha **HỎI** ở beat đầu tiên của chương. Mỗi chương đúng một lần.

## Người dùng cung cấp

- `eyebrow`: chương + pha, ví dụ `CHƯƠNG 04 · HỎI`.
- `question`: tối đa 25 từ, gắn với kịch bản báo cáo tuần hoặc một con số gây bất ngờ.

## Quy tắc

- Câu hỏi dùng style `question` (họ `display`), màu `fg`. Eyebrow dùng `eyebrow`, màu `fg-muted`.
- Chuyển động M5: `SplitText.create(el, { type: "words", mask: "words" })` rồi `gsap.from(split.words, {...})` sau `document.fonts.ready``. Stagger 0.04, thời lượng `dur-base`, ease `ease-out`. Tạo tween *trong* `onSplit` và return nó, để khi font nạp xong hoặc khổ đổi thì animation được dựng lại.
- Mask có thêm padding dọc 0.12em để dấu chồng không bị cắt.
- Reduced motion: chữ hiện thẳng, không tách.

## Không nên

- Dùng cho tiêu đề phụ hay đoạn giải thích.
- Thêm hình minh hoạ hay emoji cạnh câu hỏi.
- Đặt `text-wrap: balance` trên câu hỏi (xung đột với SplitText).

## Accessibility

- Câu hỏi là `<h2>`. SplitText giữ `aria: "auto"`, nên screen reader đọc nguyên câu.
