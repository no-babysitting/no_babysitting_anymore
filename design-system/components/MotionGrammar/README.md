MotionGrammar là trang trình diễn mười chuyển động M1–M10 của No Babysitting. Mỗi chuyển động mang đúng một nghĩa, có dạng tĩnh tương đương khi giảm chuyển động. Bảy mã còn lại (M11–M17) chạy ở `design-system/studies/index.html`; bảng đầy đủ, kèm mục đích, ở `design-system/motion.md`.

## Dùng khi

- Tham chiếu cho người làm animation của từng chương. Mỗi tween trong code phải ứng với một mục ở đây.

## Người dùng cung cấp

- Không có gì. Đây là trang tham chiếu; mỗi hàng có nút "Chạy".

## Quy tắc

- Thời lượng theo `dur-*`, ease theo `ease-*` (xem mục Chuyển động).
- Khi bật reduced motion, nút "Chạy" đưa thẳng về trạng thái cuối, và mỗi hàng ghi dạng tĩnh tương đương.
- GSAP 3.15.0 cùng các plugin miễn phí: DrawSVG, Flip, ScrambleText, SplitText, MotionPath, MorphSVG.

## Không nên

- Thêm một chuyển động mới mà không đặt cho nó một nghĩa riêng.
- Dùng hai mục ngữ pháp cho cùng một nghĩa.

## Accessibility

- Mỗi nút "Chạy" có `aria-label` nêu tên chuyển động. Không có gì tự chạy lặp lại.
