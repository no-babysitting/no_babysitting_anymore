# 09 · Kịch bản chuyển động theo tầng (07/11/2026)

> Ghép gợi ý *motion hierarchy* của bản review (Primary / Secondary / Ambient) với ngữ pháp M1–M14 của design system (`03-design-system.md` §6.2, §12.5). **Mã M nói chuyển động nghĩa là gì; tầng nói nó to và dày tới đâu.** Mọi tween vẫn phải ứng với một mã M. Quyết định nền: `08-kaizen-go-live.md` §1 (D5, D6, D8).

## 1. Ba tầng

| Tầng | Gồm | Số lượng | Easing | Thời lượng | Reduced motion |
|---|---|---|---|---|---|
| **C · Chính** (Primary) | Hero, vòng giao việc, simulator, chuyển chương, finale | Mỗi cảnh một khoảnh khắc chính; mỗi lúc chỉ một cảnh C chạy trên màn | Scrub: `none`. Chạy theo thời gian: `power3.out` khi vào, `power2.inOut` khi đổi bố cục, `nb-settle` khi đậu vào chỗ | Pin ≤ 220% vh mỗi cảnh. Riêng vòng giao việc: ≤ 100% vh mỗi bước | Hiện trạng thái cuối, không pin |
| **P · Phụ** (Secondary) | Reveal chữ, thẻ, điều hướng, metadata, hover, phản hồi khi bấm | Stagger chỉ khi thứ tự có nghĩa (danh sách bước, câu hỏi) | `power2.out` cho reveal, `power1.out` cho UI nhỏ | 0,12–0,48s; dịch chuyển ≤ 24px | Hiện thẳng |
| **N · Nền** (Ambient) | ASCII nền ở hero và finale; **mặt nước ở phần tuyên ngôn** (từ 08/11) | ≤ 2 canvas thở cùng lúc; mọi canvas khác đứng yên khi không cuộn | `sine.inOut` | Chu kỳ 6–12s; ≤ 4% số ô đổi mỗi giây (hero, finale); mặt nước trôi liên tục, chỉ vẽ ô đổi glyph, ≈ 3k ô/giây ở desktop | Đứng yên ở frame cuối |

Không dùng `back.out` (bản review gợi ý cho kiểu "playful"): độ nảy không hợp giọng brutalist điềm tĩnh, và chỗ "tới lượt bạn" đã có M7.

Luật cũ "không có gì lặp vô hạn" đổi thành: **chỉ tầng N được lặp**, với ba điều kiện:
- có nút Motion để tắt (WCAG 2.2.2);
- dừng khi canvas ra khỏi màn hình;
- dừng khi tab bị ẩn.

Ba thứ lặp mới (08/11), tất cả thuộc tầng N và theo ba điều kiện trên: **dải khối ASCII quét qua nút "chương kế"** (`NB.sweep`, `data-sweep`: 4,6 giây quét, 1,8 giây nghỉ, chỉ vẽ khi nút trên màn hình, không có canvas nào khi tắt chuyển động) và **dấu cam của chương hiện tại ở mục lục nháy như con trỏ terminal** (`nb-blink`, 1,1 giây, `steps(1)`, chỉ khi `html.motion`).

**Mặt nước ở phần tuyên ngôn** (chủ dự án yêu cầu 08/11): lớp địa hình ASCII sau đoạn tuyên ngôn và bốn con số, trước đây chỉ mọc lên theo cuộn rồi đứng yên, nay trôi chậm như mặt nước. Mỗi tầng nhiễu trôi một hướng riêng, các hình lớn đưa nhẹ theo một sóng sin chậm, có gợn mờ chạy chéo ở nửa dưới. Làm bằng `NB.sources.terrain({ flow })` và tuỳ chọn `flow` của `NB.ascii`: mỗi 1/7 giây tính lại độ phủ bằng bảng nhiễu (không dùng `sin` cho mỗi điểm), chỉ vẽ lại những ô đổi glyph, và chỉ 55% số ô đổi được vẽ ở mỗi bước, phần còn lại chờ bước sau nên mặt nước lấp lánh thay vì nhảy từng nấc. Dừng khi canvas ra khỏi màn hình, khi tab ẩn, khi tắt chuyển động. Đo ở Chromium không có GPU: ≈ 3.300 lần vẽ ô mỗi giây và +5% luồng chính ở desktop, ≈ 900 lần và +3% ở điện thoại, 0 khi ra khỏi màn hình. `check.cjs` mục 4 giữ hai đầu: dưới 300 lần/giây là nước đứng yên (hỏng), trên 6.000 là quá đắt.

## 2. Mật độ ASCII và vùng yên

- **Vùng yên (calm zone).** Không vẽ ký tự nhiễu trong hộp chữ cần đọc, cộng thêm 1 ô quanh hộp. Trong vòng 4 ô tiếp theo, nhiễu chỉ vẽ nhạt và thưa; càng ra rìa càng đậm. Khai báo bằng `calm: [phần tử…]` khi tạo canvas.
- **Chữ đặt trên nền dày** (finale): thêm nền đỡ chữ (gradient `bg` → trong suốt) dưới khối chữ, không dựa vào `text-shadow`.
- **Vẽ lại:** cả canvas chỉ vẽ lại khi trạng thái đổi (scrub, con trỏ, đổi theme). Tầng N chỉ vẽ lại những ô vừa đổi.
- **Trần ô:** desktop ≤ 12.000, phone ≤ 4.000 (DS §12.4).
- **Chữ ghost:** mỗi khung tối đa một chữ, không tràn sang khung bên cạnh.

## 3. Trang chủ (đích của K2)

ASCII đi một mạch: **nhiễu → logo** (hero), rồi **số** (brief), **địa hình** (khám phá), và cuối cùng là **full-color** (bàn giao và finale).

| Cảnh | Tầng | Diễn biến | Mã M |
|---|---|---|---|
| **0 · Hero** | C + N | Vào trang: dòng `No babysitting` chữ trắng được gõ, con trỏ nháy 3 lần. Cuộn: nhiễu hội tụ thành logo khối từ trái sang phải; câu hứa và disclaimer trồi lên (P). Khi đứng yên, rìa màn hình thở chậm (N); quanh chữ là vùng yên | M7, M11 |
| **1 · Ba câu hỏi** | P | *Giao được gì? · Làm sao để nó tự chạy? · Làm sao tin kết quả?* trồi lên lần lượt; mỗi câu có một dòng trả lời và đường dẫn. Đây là xương sống của mọi phần (bản review §1.3) | M5 |
| **2 · Hai lần tung đồng xu** | C | Yêu cầu đã gõ sẵn khi vào cảnh (không còn hai cột rỗng). Hai lần chạy kiểu vibe cho hai kết quả khác nhau, hai lần chạy agentic cho cùng một kết quả; rồi tới kết luận. Thẻ ≥ 14px trên phone | M3, M9 |
| **3 · Vòng giao việc** | C | Thanh chọn loại việc: Nghiên cứu · Dữ liệu · Marketing · Sáng tạo · Dựng sản phẩm · Vận hành. Bảy bước, mỗi bước khoảng một màn cuộn (bảng dưới). Dữ liệu lấy từ K1 | xem dưới |
| **4 · Hành trình** | C | Track ngang. Chỉ panel ở giữa màn hội tụ số ASCII; các panel khác đứng yên và nhạt đi. Tên chương phải nổi ngang hoặc hơn con số | M11 |
| **5 · Finale** | C + N | Cảnh full-color hội tụ; có nền đỡ chữ dưới lời kêu gọi; thở chậm khi đứng yên | M11 |

**Bảy bước của vòng giao việc** (cảnh 3):

| Bước | Hình | Mã M | Ghi chú |
|---|---|---|---|
| ① Brief | Kết quả, ràng buộc và tiêu chí hiện thành **số ASCII** hội tụ (số nguồn, số tiêu chí, hạn chót) | M11 | |
| ② Hiểu mục tiêu | The Colleague chuyển sang `thinking`; agent nhắc lại mục tiêu (decode trên động từ) và hỏi lại một câu | M14, M4, M7 | |
| ③ Khám phá | **Địa hình ASCII** của không gian làm việc (file, sheet, web, connector). Vệt quét accent đi qua, nguồn đã đọc chuyển sang `fg`; lens soi từng nguồn | M11, M12 | Ghi rõ nguồn nào cần connector hay MCP |
| ④ Kế hoạch và giao việc | Các bước nối bằng mũi tên tự vẽ; 2–3 subagent chạy theo đường | M1, M8 | |
| ⑤ Thực thi | Bảng việc chạy từ chờ → đang làm → xong (Flip); nhật ký hành động của agent | M3, M4 | Nhãn native / cần tích hợp |
| ⑥ Kiểm chứng | Các tiêu chí lần lượt được ✓. Một số sai bị bắt ✕ (glitch ≤ 300 ms, đúng một lần) rồi được sửa | M9, M13 | |
| ⑦ Bàn giao | Sản phẩm đậu vào chỗ. **Trạm người duyệt** (nút accent "Duyệt") đứng trước mọi hành động có hậu quả; sau đó chuyển sang finale | `nb-settle`, M9 | *No babysitting ≠ no supervision* |

Chọn loại việc thuộc tầng P: nội dung bước đổi ngay (Flip M3 cho khung, `NB.say` cho chữ), không chạy lại cả cảnh. Trên phone, mỗi bước là một màn dọc, không pin ngang.

## 4. Trang chương

| Phần | Tầng | Kịch bản |
|---|---|---|
| Opener | C | Số chương khổng lồ là lớp trang trí riêng, tràn mép đáy có chủ ý, nằm **dưới** tên chương. Khi rời khung, số trượt xuống và mờ dần, tên chương nâng lên. Không phóng to, không che chữ (D6) |
| Câu hỏi (b1) | P | M5; mờ dần khi cuộn qua |
| Đoán (b2) | P | Các phương án vào theo thứ tự, M7 khi tới lượt chọn. Khoá *animation*, không khoá cuộn |
| Thấy (b3, simulator) | C | Một timeline, mỗi bước một nhãn; cuộn đi qua từng nhãn. Số chạy mềm (`power2.out`, bỏ `steps`); chữ giải thích đổi bằng `NB.say`; dòng nhật ký mới vào bằng M4. Mỗi bước chỉ đổi một thứ chính |
| Hiểu, Nhớ | P | Reveal đơn giản |

## 5. Ngân sách và cách kiểm tra

| Chỉ số | Ngân sách | Đo bằng |
|---|---|---|
| CPU luồng chính khi đứng yên (desktop, đầu trang) | ≤ 8% | `site/scripts/check.mjs` (CDP `TaskDuration` trong 3 giây) |
| Ô canvas đổi mỗi giây khi đứng yên | ≤ 4% số ô ở hero và finale; mặt nước ở tuyên ngôn 300–6.000 lần vẽ/giây khi đang hiện; 0 ở các cảnh khác | đếm `drawImage` và `fillText` (`check.cjs` mục 4) |
| Canvas đang sống cùng lúc | ≤ 2 | |
| Lỗi JS / cuộn ngang | 0 / không có, ở 1440px, 390px và 320px | `check.cjs` |
| Reduced motion | Không chữ nào bị ẩn; mọi cảnh ở trạng thái cuối | |
| Trình bày: chữ đè nhau, chữ bị cắt, dải trống, nút < 40px, hai cột lệch hàng | 0, ở 390, 375×667, 320 và 1440 | `design-check.cjs` (luật và cách đo: `13-design-taste.md`) |
| Câu cần đọc có được giữ; mô phỏng chờ được thấy rồi chạy ≥ 4 giây | mọi `[data-ask]` và `[data-reveal="fill"]` nằm trong `[data-held]`; mọi `[data-demo]` bắt đầu ở `idle` | `design-check.cjs` mục 3 |

## 6. Kỹ thuật

- **Một chỗ quyết định giảm chuyển động:** `NB.reduce()` đọc cả `prefers-reduced-motion` lẫn nút Motion (`localStorage`, khoá `nb-motion`). Mọi cảnh gọi hàm này thay vì tự `matchMedia`.
- **Ticker:** một ticker GSAP cho cả trang. Lenis giữ như hiện tại (`motion.ts`).
- **Renderer** (`bundle.js`):
  - `breathe` thay cho `ambient`: mỗi tick đổi vài ô và chỉ vẽ lại đúng các ô đó;
  - `calm` để khai báo vùng yên;
  - vẽ lại cả canvas chỉ khi gọi `redraw()`.
- **Giữ lại để đọc** (`motion.ts`): `data-hold="<số màn hình>"` ghim khối ở giữa vùng nhìn thấy trong chừng đó chiều cao cuộn, rồi buông; khối cao hơn màn hình thì bỏ qua. `[data-reveal="fill"]` trong khối được giữ sáng chữ dần theo lúc giữ. Các lớp ghim phải làm mới từ trên xuống (`ScrollTrigger.sort()` trước `refresh()`).
- **Mô phỏng chờ được thấy** (`bundle.js`): `NB.seen(el, fn)` chạy `fn` một lần khi `el` lên màn hình được 40% (hoặc 40% chiều cao màn hình nếu `el` cao hơn); mô phỏng đặt `data-demo = idle | playing | done`.
- **Dọn dẹp:** site là MPA nên mỗi trang tự dọn khi rời đi. Khi resize, canvas tính lại lưới sau 150 ms; ScrollTrigger dùng `invalidateOnRefresh` cho các giá trị phụ thuộc kích thước.
