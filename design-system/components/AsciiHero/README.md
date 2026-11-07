AsciiHero là cảnh mở đầu chữ ký: một trường ký tự hỗn loạn (vibe) hội tụ thành một khối điêu khắc ký tự đối xứng (agentic), có nhúng bốn từ chỉ đường *Brief · Onboard · Verify · Handoff*.

## Học từ reference

- **Aino**: khối điêu khắc ở giữa màn hình, ký tự mật độ giảm dần từ trái sang phải, chữ điều hướng nhúng ngay trong các dòng ký tự, nhãn bám theo con trỏ.
- **WRDLSS, Artefakt**: ramp mật độ dùng chính chữ cái của tên thương hiệu (`N B A Y S I T G`); metadata mono neo ở các góc.

## Người dùng cung cấp

- `source`: `NoBabysitting.sources.sculpture({ lobes, amp, words })`, hoặc `sources.text([...])` nếu muốn wordmark.
- `state.order` (0 → 1), do ScrollTrigger scrub điều khiển trên trang thật. Trong preview, thanh trượt đóng vai trò cuộn trang.

## Quy tắc

- Renderer dùng chung `NoBabysitting.ascii`: Canvas 2D, glyph atlas (ký tự × màu token), một `gsap.ticker`, giới hạn 30 fps, dừng khi ra khỏi viewport, dựng lại khi đổi theme.
- Màu mang nghĩa: noise `fg-subtle`; đầu vệt hội tụ `accent`; hình đã thành theo ramp `level-2…4` rồi `fg`; chữ nhúng `fg`; lens `signal`.
- Wordmark là HTML thật (`h1`, Archivo kéo giãn), không vẽ vào canvas.
- The Colleague ở góc phải phản ánh trạng thái thật: `idle`, `tracking` khi con trỏ vào khung, `working` khi đang hội tụ, `verified` khi xong.
- Reduced motion: vẽ frame cuối một lần; không có nhãn bám con trỏ.

## Không nên

- Đặt chữ cần đọc vào canvas.
- Chạy cùng lúc hai cảnh ASCII toàn khung.
- Để noise lấp lánh sau khi đã thành hình: trật tự thì phải tĩnh.

## Accessibility

- Canvas `aria-hidden`, có mô tả `nb-sr`. Thanh trượt có `aria-label`. The Colleague có `role="img"` với nhãn thay đổi theo trạng thái.
