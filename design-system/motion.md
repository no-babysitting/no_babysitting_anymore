# Chuyển động

Chuyển động ở No Babysitting là **một phần của lời giải thích**, không phải trang trí. Mỗi chuyển động trong ngữ pháp dưới đây mang đúng một nghĩa, và mỗi nghĩa chỉ có một hình thức. Xem trực tiếp ở thành phần **MotionGrammar**.

> **Nơi gốc.** Tệp này là chỗ duy nhất định nghĩa mã chuyển động **M1–M17**, mục đích của từng mã và các luật chung của chúng (`docs/19` §4). `docs/09-motion-script.md` giữ ba tầng C/P/N, kịch bản từng cảnh và ngân sách; `docs/03-design-system.md` §6 và `design-system/README.md` chỉ trỏ về đây. Khi sửa một mã hay một luật, sửa ở đây rồi để chỗ khác trỏ tới.

## Ngữ pháp M1–M17

**Mục đích** lấy từ bảy mục đích của bản nhận xét *ASCII & Motion Design Direction* (09/11/2026, `docs/19` §4): *định hướng* · *làm lộ ra* · *biến đổi* · *cho thấy nhân quả* · *phản hồi* · *nhấn* · *tạo không khí*. Mỗi mã nhận một hay hai mục đích. Một tween không chỉ ra được mục đích thì bỏ.

| # | Nghĩa | Hình ảnh | Kỹ thuật | Mục đích | Dùng ở | Dạng tĩnh (reduced motion) |
|---|---|---|---|---|---|---|
| M1 | Dẫn tới / chuyển thành | Mũi tên tự vẽ | DrawSVG `0% → 100%` | cho thấy nhân quả | Then → Now, six shifts, các bước của một kế hoạch | Mũi tên vẽ sẵn |
| M2 | Tiêu hao | Thanh đầy dần | `scaleX` hoặc biến `--fill` | làm lộ ra | Ngân sách context, chi phí mỗi lượt, thanh tiến độ của một việc | Thanh ở giá trị cuối, kèm số |
| M3 | Tái cấu trúc | Cùng phần tử, bố cục mới | Flip | biến đổi | Bảng việc chạy, danh sách đổi thứ tự, khung đổi theo lựa chọn | Bố cục cuối; mục vừa đổi có viền `accent` |
| M4 | Agent đang xử lý | Ký tự xáo trộn | ScrambleText (chỉ chữ mono, bộ ký tự `NB.SCRAMBLE` không dấu). **Chỉ** cho động từ hành động và dòng nhật ký của agent; nhãn góc, con dấu, tiêu đề, chữ trạng thái dùng `NB.say` | phản hồi | Nhật ký của agent và The Colleague | Chữ cuối |
| M5 | Câu hỏi bước vào | Từ trồi lên khỏi mask | SplitText `words` + `mask` | nhấn | Hook của mỗi phần, câu hỏi Socratic | Chữ thường |
| M6 | Lỗi thời | Gạch ngang rồi mờ đi | `scaleX` đường gạch + autoAlpha 0.45 | biến đổi | Câu “Hồi đó” của thẻ Then → Now | Gạch tĩnh, vẫn đọc được |
| M7 | Tới lượt bạn | Con trỏ ▍ nhấp nháy 3 chu kỳ | `repeat: 5, yoyo, ease: steps(1)` | định hướng | Chỗ người đọc phải tự quyết hoặc tự viết | Khối đặc |
| M8 | Đi qua một vòng / luồng | Chấm chạy theo đường | MotionPath | cho thấy nhân quả | Một việc đi qua các bước, subagent chạy song song | Các trạm đánh số 1 → n |
| M9 | Đã kiểm chứng | Nháy `signal` một lần + ✓ | Tween màu `dur-quick` | phản hồi | Một tiêu chí vừa đạt trong phép kiểm | ✓ tĩnh |
| M10 | Bớt can thiệp | Đường zig-zag dãn thành đường thẳng có một trạm ✓ | MorphSVG | biến đổi | Chỗ kết luận “giao xong, rà một lần” | Hình cuối + chú thích “chỉ còn một trạm rà soát” |
| M11 | Từ vibe đến agentic | Ký tự noise hội tụ thành chữ hoặc hình; đầu vệt `accent` | Canvas; GSAP điều khiển `state.order` (scrub) | biến đổi | Hero, ảnh mở chương, finale | Frame cuối |
| M12 | Nhìn vào bên trong | Lens theo con trỏ lộ lớp bên dưới | `gsap.quickTo` | làm lộ ra | Soi một con số ra nguồn của nó, soi một file ra nội dung | Nút “Xem lớp nguồn” |
| M13 | Chuyển trạng thái đứt đoạn | Glitch ≤ 300 ms, tối đa 1 lần/chương | Timeline ngắn | nhấn | Một lỗi bị bắt rồi được sửa | Cắt cảnh thẳng |
| M14 | Biểu cảm của đồng nghiệp | The Colleague đổi mặt | ScrambleText trên khuôn mặt | phản hồi | The Colleague đổi trạng thái theo việc thật | Đổi tức thì |
| M15 | Hồi đó thành Bây giờ | Câu “Hồi đó” bị gạch (M6) và mờ còn 0,55 nhưng vẫn đọc được; một lớp canvas `aria-hidden` lấy các ký tự của nó rã thành khối ` ░▒▓`, trôi về phía câu “Bây giờ” rồi hội tụ thành câu đó (giống M11, 0,9s); xong thì chữ thật của câu “Bây giờ” hiện lên; mũi tên `→` vẽ bằng M1 | Timeline + canvas phụ; chạy theo thời gian, **không** scrub | cho thấy nhân quả · biến đổi | Thẻ Then → Now chính và phụ | Câu “Hồi đó” gạch tĩnh, câu “Bây giờ” hiện sẵn, mũi tên vẽ sẵn |
| M16 | Điều cần nhớ | Gạch chân vẽ tay + cam khi đang được đọc | DrawSVG + tween màu | nhấn | Golden word trong thân bài và câu chốt | Nét vẽ sẵn, chữ `fg`, không cam |
| M17 | Câu để bạn mang đi | Prompt gõ từng ký tự, 35–45 ms mỗi ký tự, tối đa 2,4s (prompt dài thì gõ dòng đầu rồi hiện phần còn lại), con trỏ ▍ nháy 5 lần rồi đứng yên (M7) | Text + lớp che `aria-hidden` | làm lộ ra · nhấn | Khối “một prompt mang đi thử” ở cuối mỗi phần | Hiện đủ chữ, con trỏ đặc |

**Chi tiết của ba mã mới** (đặc tả đầy đủ: `docs/15-typography-motion-v4.md` §2, §4):
- **M15** chạy một lần, theo thời gian, khi điểm dừng ② bắt đầu giữ; thẻ phụ chạy khi lên 40% khung nhìn (`NB.seen`). Bộ ký tự rã chỉ gồm khối và dấu chấm (` ░▒▓·`), vì `NB.SCRAMBLE` không có dấu.
- **M16:** mỗi phần tối đa 5 golden word, không nằm trong tiêu đề; cam chỉ hiện *trong lúc đang được đọc*; gạch chân đặt khoảng 0,32 em dưới đường cơ sở để không chạm dấu nặng của tiếng Việt.
- **M17:** chữ đầy đủ luôn có trong DOM, nút `Chép` dùng được ngay từ đầu và chép đủ câu.

## Ba tầng C / P / N

Tầng nói chuyển động **to và dày tới đâu**; mã M nói nó **nghĩa là gì**. Mọi tween phải ứng với một mã M và thuộc đúng một tầng.

| Tầng | Gồm | Số lượng | Easing | Thời lượng | Reduced motion |
|---|---|---|---|---|---|
| **C · Chính** (Primary) | Hero, cảnh mở chương, cảnh ghim, mô phỏng, chuyển chương, finale | Mỗi cảnh một khoảnh khắc chính; mỗi lúc chỉ một cảnh C chạy trên màn | Scrub: `none`. Chạy theo thời gian: `power3.out` khi vào, `power2.inOut` khi đổi bố cục, `nb-settle` khi đậu vào chỗ | Pin ≤ 220% vh mỗi cảnh. Riêng vòng giao việc: ≤ 100% vh mỗi bước | Hiện trạng thái cuối, không pin |
| **P · Phụ** (Secondary) | Reveal chữ, thẻ, điều hướng, metadata, hover, phản hồi khi bấm | Stagger chỉ khi thứ tự có nghĩa (danh sách bước, câu hỏi) | `power2.out` cho reveal, `power1.out` cho UI nhỏ | 0,12–0,48s; dịch chuyển ≤ 24px | Hiện thẳng |
| **N · Nền** (Ambient) | ASCII nền ở hero và finale; **mặt nước ở phần tuyên ngôn** (từ 08/11) | ≤ 2 canvas thở cùng lúc; mọi canvas khác đứng yên khi không cuộn | `sine.inOut` | Chu kỳ 6–12s; ≤ 4% số ô đổi mỗi giây (hero, finale); mặt nước trôi liên tục, chỉ vẽ ô đổi glyph, ≈ 3k ô/giây ở desktop | Đứng yên ở frame cuối |

Không dùng `back.out`: độ nảy không hợp giọng điềm tĩnh, và chỗ “tới lượt bạn” đã có M7.

## Luật

- Không dùng một mục ngữ pháp vào việc trang trí. Không parallax nền.
- **Lặp:** luật cũ “không gì lặp vô hạn” đã bị thay (08/11/2026). Nay **chỉ tầng N được lặp**, với ba điều kiện: có nút Motion để tắt (WCAG 2.2.2), dừng khi canvas ra khỏi màn hình, dừng khi tab bị ẩn. Ba tầng và danh sách chỗ lặp: `docs/09-motion-script.md` §1. Ngoài tầng N, con trỏ vẫn chỉ nhấp nháy 3 chu kỳ rồi đứng yên.
- Mỗi chương tối đa **một khoảnh khắc lớn**; phần còn lại yên tĩnh.
- Chỉ animate `transform`, `opacity`, `stroke-dashoffset` và biến CSS. Không animate `width`, `height`, `top`, `left`, `filter` khi scrub.
- Tween scrub dùng ease `none`. Chọn scrub *hoặc* toggleActions, không dùng cả hai.
- `scrollTrigger` chỉ gắn ở timeline gốc của chương, không gắn ở tween con.
- M13 dùng tối đa 1 lần mỗi chương, chỉ khi trạng thái thật sự đổi, không bao giờ trên chữ cần đọc. Không gì nhấp nháy quá 3 lần/giây (WCAG 2.3.1).

## Biên đạo theo pha beat

| Pha | Chuyển động | Ràng buộc |
|---|---|---|
| HỎI | M5 | Một lần mỗi chương; tổng ≤ 1,2s |
| ĐOÁN | M7; các phương án vào theo stagger 0,06s | Stage bị khoá bằng lớp phủ `bg` 70% (không blur). Chỉ khoá *animation*, không khoá cuộn trang |
| THẤY | Timeline chính của chương | Desktop pin tối đa +200% chiều cao viewport mỗi cảnh |
| HIỂU | Reveal đơn giản qua `ScrollTrigger.batch` | Không thêm hiệu ứng khác |
| Then → Now | M6 → M15 (M1 cho mũi tên) → thẻ “Bây giờ” đậu vào bằng `ease-settle` | Tổng ≤ 1,6s |
| LÀM | Phản hồi tức thì (`dur-quick`); M3 khi sắp xếp lại | Kéo thả luôn có thay thế bàn phím |
| NHỚ | M7 trên ô trả lời; M17 ở prompt mang đi | — |

## Một timeline, ba driver

Mỗi chương xuất **một** `gsap.timeline({ paused: true })` có label trùng ID beat (`c04:b3`). Ba driver điều khiển cùng timeline đó:

- **ScrollDriver** (mặc định): ScrollTrigger scrub + pin, snap theo label.
- **PresenterDriver**: tắt ScrollTrigger; phím → gọi `tl.tweenFromTo(labelHiệnTại, labelKế)`.
- **StaticDriver** (reduced motion): nhảy thẳng tới cuối mỗi beat theo label, không pin, không scrub.

## Khoảnh khắc lớn của từng chương

Mở đầu: đồng xu lật, hai bản báo cáo khác nhau · 01: bàn làm việc của đồng nghiệp mới tự dựng lên; các bề mặt nối vào một harness · 02: nhiễu tích tụ, độ tập trung giảm và chi phí mỗi lượt tăng (S1) · 03: lưới việc Flip từ lát ngang sang lát dọc · 04: rule cũ rơi rụng thành một principle · 05: mô tả TodoWrite co từ 9.100 ký tự xuống một dòng · 06: hành động đi qua cổng quyền · 07: con số sai bị bắt ở các trạm · 08: 12 làn workflow co về 5 cột · 09: một cửa sổ agent nhân thành năm · 10: sáu mũi tên tự vẽ; đường can thiệp zig-zag dãn thành một trạm rà soát.
