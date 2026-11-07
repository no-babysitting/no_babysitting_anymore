# Chuyển động

Chuyển động ở No Babysitting là **một phần của lời giải thích**, không phải trang trí. Mỗi chuyển động trong ngữ pháp dưới đây mang đúng một nghĩa, và mỗi nghĩa chỉ có một hình thức. Xem trực tiếp ở thành phần **MotionGrammar**.

## Ngữ pháp M1–M10

| # | Nghĩa | Hình ảnh | GSAP | Dạng tĩnh (reduced motion) |
|---|---|---|---|---|
| M1 | Dẫn tới / chuyển thành | Mũi tên tự vẽ | DrawSVG `0% → 100%` | Mũi tên vẽ sẵn |
| M2 | Tiêu hao | Thanh đầy dần | `scaleX` hoặc biến `--fill` | Thanh ở giá trị cuối, kèm số |
| M3 | Tái cấu trúc | Cùng phần tử, bố cục mới | Flip | Bố cục cuối; mục vừa đổi có viền `accent` |
| M4 | Agent đang xử lý | Ký tự xáo trộn | ScrambleText (chỉ chữ mono) | Chữ cuối |
| M5 | Câu hỏi bước vào | Từ trồi lên khỏi mask | SplitText `words` + `mask` | Chữ thường |
| M6 | Lỗi thời | Gạch ngang rồi mờ đi | `scaleX` đường gạch + autoAlpha 0.45 | Gạch tĩnh |
| M7 | Tới lượt bạn | Con trỏ ▍ nhấp nháy 3 chu kỳ | `repeat: 5, yoyo, ease: steps(1)` | Khối đặc |
| M8 | Đi qua một vòng / luồng | Chấm chạy theo đường | MotionPath | Các trạm đánh số 1 → n |
| M9 | Đã kiểm chứng | Nháy `signal` một lần + ✓ | Tween màu `dur-quick` | ✓ tĩnh |
| M10 | Bớt can thiệp | Đường zig-zag dãn thành đường thẳng có một trạm ✓ | MorphSVG | Hình cuối + chú thích "chỉ còn một trạm rà soát" |


### Bổ sung cho lớp ASCII

| # | Nghĩa | Hình ảnh | Kỹ thuật | Dạng tĩnh |
|---|---|---|---|---|
| M11 | Từ vibe đến agentic | Ký tự noise hội tụ thành chữ hoặc hình; đầu vệt `accent` | Canvas; GSAP điều khiển `state.order` (scrub) | Frame cuối |
| M12 | Nhìn vào bên trong | Lens theo con trỏ lộ lớp bên dưới | `gsap.quickTo` | Nút "Xem lớp nguồn" |
| M13 | Chuyển trạng thái đứt đoạn | Glitch ≤ 300 ms, tối đa 1 lần/chương | Timeline ngắn | Cắt cảnh thẳng |
| M14 | Biểu cảm của đồng nghiệp | The Colleague đổi mặt | ScrambleText trên khuôn mặt | Đổi tức thì |

## Luật

- Không dùng một mục ngữ pháp vào việc trang trí. Không parallax nền. Không gì lặp vô hạn.
- Mỗi chương tối đa **một khoảnh khắc lớn**; phần còn lại yên tĩnh.
- Chỉ animate `transform`, `opacity`, `stroke-dashoffset` và biến CSS. Không animate `width`, `height`, `top`, `left`, `filter` khi scrub.
- Tween scrub dùng ease `none`. Chọn scrub *hoặc* toggleActions, không dùng cả hai.
- `scrollTrigger` chỉ gắn ở timeline gốc của chương, không gắn ở tween con.

## Biên đạo theo pha beat

| Pha | Chuyển động | Ràng buộc |
|---|---|---|
| HỎI | M5 | Một lần mỗi chương; tổng ≤ 1,2s |
| ĐOÁN | M7; các phương án vào theo stagger 0,06s | Stage bị khoá bằng lớp phủ `bg` 70% (không blur). Chỉ khoá *animation*, không khoá cuộn trang |
| THẤY | Timeline chính của chương | Desktop pin tối đa +200% chiều cao viewport mỗi cảnh |
| HIỂU | Reveal đơn giản qua `ScrollTrigger.batch` | Không thêm hiệu ứng khác |
| Then → Now | M6 → M1 → thẻ "Bây giờ" đậu vào bằng `ease-settle` | Tổng ≤ 1,6s |
| LÀM | Phản hồi tức thì (`dur-quick`); M3 khi sắp xếp lại | Kéo thả luôn có thay thế bàn phím |
| NHỚ | M7 trên ô trả lời | — |

## Một timeline, ba driver

Mỗi chương xuất **một** `gsap.timeline({ paused: true })` có label trùng ID beat (`c04:b3`). Ba driver điều khiển cùng timeline đó:

- **ScrollDriver** (mặc định): ScrollTrigger scrub + pin, snap theo label.
- **PresenterDriver**: tắt ScrollTrigger; phím → gọi `tl.tweenFromTo(labelHiệnTại, labelKế)`.
- **StaticDriver** (reduced motion): nhảy thẳng tới cuối mỗi beat theo label, không pin, không scrub.

## Khoảnh khắc lớn của từng chương

Mở đầu: đồng xu lật, hai bản báo cáo khác nhau · 01: bàn làm việc của đồng nghiệp mới tự dựng lên; các bề mặt nối vào một harness · 02: context meter vượt 40% · 03: lưới việc Flip từ lát ngang sang lát dọc · 04: rule cũ rơi rụng thành một principle · 05: mô tả TodoWrite co từ 9.100 ký tự xuống một dòng · 06: hành động đi qua cổng quyền · 07: con số sai bị bắt ở các trạm · 08: 12 làn workflow co về 5 cột · 09: một cửa sổ agent nhân thành năm · 10: sáu mũi tên tự vẽ; đường can thiệp zig-zag dãn thành một trạm rà soát.
