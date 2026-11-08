# 15 · Typography và hiệu ứng cho kịch bản v4 (08/11/2026)

> **Trạng thái: đã duyệt ngày 08/11/2026** cùng `14-content-script-v4.md`. Tài liệu này *bổ sung* các luật đang có, không thay chúng:
> - vai chữ: `design-system/SOURCE-OF-TRUTH.md` §2;
> - ba tầng chuyển động C/P/N và ngân sách: `09-motion-script.md`;
> - luật đo chữ: `11-typography.md`;
> - luật đo trình bày: `13-design-taste.md`.
>
> Chỗ nào đổi một luật cũ thì ghi **đổi luật**. Khi đã duyệt, agent chép thay đổi đó về đúng tài liệu gốc.

## 0. Ba nguyên tắc

1. **Chữ là nhân vật chính.** Mỗi hiệu ứng phải trả lời được câu hỏi: nó giúp người đọc hiểu điều gì. Ba việc hiệu ứng được làm, theo các nguyên lý của Mayer [P2]:
   - *báo hiệu cấu trúc*: golden word, nhãn Hồi đó / Bây giờ;
   - *chia đoạn để người đọc tự giữ nhịp*: điểm dừng;
   - *bỏ thứ không phục vụ việc học*.

   Không trả lời được câu hỏi trên thì bỏ hiệu ứng.
2. **Mỗi khung nhìn một điểm nhìn.** Cùng lúc chỉ một thứ thuộc tầng C (chính) chuyển động trên màn hình.
3. **Tắt chuyển động vẫn đọc đủ.** Khi tắt bằng nút Motion hoặc bật reduced motion, trang hiện trạng thái cuối: không ghim, không gõ dần, không chữ nào bị ẩn.

## 1. Vai chữ cho các thành phần mới

Chỉ dùng bốn họ chữ đang nạp (Archivo, Be Vietnam Pro, Newsreader, JetBrains Mono) và các mặt chữ đã có. Be Vietnam Pro có nghiêng 400; Newsreader có nghiêng 400; JetBrains Mono có nghiêng 400 và 600. Không dùng nghiêng giả hay đậm giả (`faux-style`).

| Thành phần | Chữ | Ghi chú |
|---|---|---|
| Nhãn chặng (`Trước · 01`) | JetBrains Mono 600, 12–13px, giãn 0,06em, `fg-muted`, ô ■ 9px | Kiểu `.nb-tag`. Không `text-transform` |
| Tên phần tiếng Anh (`THE UNKNOWNS`) | Archivo 125% 800, viết hoa sẵn | Desktop 48–64px; điện thoại ≥ 28px (luật zoom: cỡ chữ co theo màn hình không được nhỏ hơn 21px) |
| Tên phần tiếng Việt | Be Vietnam Pro 500, 19–21px | |
| Câu đỉnh của phần (dưới tên) | Be Vietnam Pro 400, 17–19px | ≤ 3 dòng ở 390px |
| Câu hỏi hook | Newsreader 400, 44px desktop / 28px điện thoại, khoảng dòng 1,2, `text-wrap: balance` | Vai *câu hỏi Socratic* (19–72px) |
| Dòng bắc cầu | Be Vietnam Pro 400, 17–19px, `fg-muted` | |
| Thân bài | Be Vietnam Pro 400, 17px / 1,65, dòng ≤ 50ch | Như c02 |
| Thuật ngữ tiếng Anh lần đầu | Be Vietnam Pro **nghiêng** 400, `lang="en"` | Từ lần thứ hai: chữ đứng |
| Trích nguyên văn | Newsreader nghiêng 400, trong “ ” | Luật cũ giữ nguyên: chỉ dành cho câu đã đối chiếu |
| Golden word | Be Vietnam Pro **600** sẵn từ đầu + gạch chân tự vẽ (§2) | Không đổi độ đậm khi chạy, để chữ khỏi nhảy dòng |
| Tên shift tiếng Việt | Be Vietnam Pro 600, 21–24px | |
| Tên shift gốc | JetBrains Mono 400, 12–13px, `fg-muted`, `lang="en"`, mũi tên `→` | Giữ chính tả của nguồn (*judgement*) |
| Nhãn `Hồi đó` / `Bây giờ` | JetBrains Mono 600, 12px | |
| Câu "Hồi đó" | Be Vietnam Pro 400, `fg-muted`, gạch ngang (M6) | Gạch xong vẫn đọc được, để người đọc so sánh |
| Câu "Bây giờ" | Be Vietnam Pro 500, `fg` | |
| Prompt mang đi thử | JetBrains Mono 500, 16px điện thoại / 18px desktop, nền `bg-raised` | Vai *dòng prompt* (16–32px). Nút `Chép` mono 600, cao ≥ 44px |
| Bong bóng mascot | JetBrains Mono 400, 13–14px | Lời của agent dùng mono |
| Mặt mascot | JetBrains Mono 600, 14px (header) / 20–24px (lề) | |
| Khối kính | Nhãn mono 600 12px; tên vai Be Vietnam Pro 600 17px; ba dòng: nhãn mono 12px + thân 15–17px | |
| Nhãn `Diễn giải của trang` | `.nb-tag`, ô nửa (một phần, còn tuỳ) | |
| Nhãn bề mặt | `.nb-tag`, ô đặc (có) / ô rỗng (chưa có) | |

## 2. Golden word (M16, mới)

- **Đánh dấu:** `<strong class="nb-gold" data-gold>tham chiếu</strong>`. Mỗi phần tối đa 5 golden word, nằm ở thân bài hoặc câu chốt, không nằm trong tiêu đề.
- **Hình:**
  - Chữ 600 sẵn.
  - Một nét gạch chân vẽ tay: SVG `path` hơi lượn sóng, nét 2px, `currentColor`.
  - Nét nằm thấp hơn dấu nặng của tiếng Việt (*ạ, ặ, ậ, ẹ, ệ, ị, ọ, ộ, ợ, ụ, ự, ỵ*): đặt khoảng 0,32em dưới đường cơ sở. Phải đo lại bằng ảnh chụp các chữ "hiện tại", "lệch", "mục", "được".
- **Chuyển động:**
  - Khi khối chứa golden word thành *hiện tại* (điểm dừng của khối đang giữ, hoặc khối lên tới 40% chiều cao nhìn thấy nếu không có điểm dừng): nét vẽ từ trái sang phải (DrawSVG 0 → 100%, 0,6s, `power2.out`), chữ đổi từ `fg` sang `accent` (0,24s).
  - Khi khối thôi là hiện tại: chữ về `fg` (0,4s), nét gạch ở lại.
- **Màu cam:** cam chỉ xuất hiện *trong lúc đang được đọc*. Như vậy là đúng luật D18 (cam = hành động và mục hiện tại). **Làm rõ luật:** thêm "golden word đang được đọc" vào danh sách *hiện tại* ở SOURCE-OF-TRUTH §3.1.
- **Reduced motion:** nét vẽ sẵn, chữ `fg`, không cam.
- **Tiếp cận:** gạch chân chỉ để nhấn, không mang thông tin riêng. `<strong>` giữ nghĩa nhấn mạnh cho trình đọc màn hình.

## 3. Ba điểm dừng mỗi phần

| Điểm | Khối | `data-hold` | Trong lúc giữ |
|---|---|---|---|
| ① | Hook: câu hỏi + bắc cầu | 0,6 | Câu hỏi hiện theo từ (M5); mascot hỏi |
| ② | Thẻ Then → Now chính | 0,8 | M15 chạy một lần (§4); golden word của thẻ sáng lên |
| ③ | Câu chốt | 0,6 | Chữ sáng dần (`data-reveal="fill"`); mascot hỏi |

- Dùng cơ chế `holds()` đang có trong `motion.ts`: khối cao hơn khung nhìn trừ header thì không ghim. Tắt chuyển động thì không ghim.
- Mỗi điểm giữ không quá 0,8 màn hình cuộn. Không đảo chiều cuộn, không snap, không ghim liên tiếp hai khối. NN/g ghi nhận *scrolljacking* làm người đọc mất phương hướng, nhất là người đang muốn làm xong một việc [P4]. Ba điểm là trần.
- Trang chủ: một điểm dừng ở câu đỉnh của kim tự tháp (0,8, chữ sáng dần), như phần tuyên ngôn hiện nay.

## 4. Chữ xuất hiện và biến mất

Giữ toàn bộ ngữ pháp M1–M14 (`docs/03` §6, §12) và các kiểu `data-reveal` đang có (`up`, `lines`, `words`, `fill`, `count`, `rule`). **Đổi luật:** "không có chuyển động ngoài M1–M14" thành "M1–M17". Thêm ba mã:

| Mã | Nghĩa | Hình | Dùng ở | Reduced motion |
|---|---|---|---|---|
| **M15** | *Hồi đó thành Bây giờ* | Câu "Hồi đó" bị gạch (M6) và mờ còn 0,55, nhưng vẫn đọc được. Một lớp canvas `aria-hidden` lấy các ký tự của nó rã thành khối ` ░▒▓`, trôi về phía câu "Bây giờ" rồi hội tụ thành câu đó (giống M11, 0,9s). Xong thì chữ thật của câu "Bây giờ" hiện lên đúng chỗ (opacity 0 → 1). Mũi tên `→` vẽ bằng M1 | Thẻ Then → Now (chính và phụ) | Câu "Hồi đó" gạch tĩnh, câu "Bây giờ" hiện sẵn, mũi tên vẽ sẵn |
| **M16** | *Điều cần nhớ* | Gạch chân tự vẽ + cam khi đang đọc (§2) | Golden word | Nét vẽ sẵn, không cam |
| **M17** | *Câu để bạn mang đi* | Prompt gõ từng ký tự, 35–45ms mỗi ký tự, tối đa 2,4s (prompt dài thì gõ dòng đầu rồi hiện phần còn lại), con trỏ ▍ nháy 5 lần rồi đứng yên (M7) | Prompt mang đi thử | Hiện đủ chữ, con trỏ đặc |

- **M15 chạy một lần**, theo thời gian, khi điểm dừng ② bắt đầu giữ. Không chạy theo thanh cuộn (scrub), để khỏi giật khi người đọc cuộn nhanh. Thẻ phụ chạy khi lên 40% khung nhìn (`NB.seen`).
- **Bộ ký tự rã chỉ gồm khối và dấu chấm** (` ░▒▓·`). Không dùng chữ cái có dấu, vì `NB.SCRAMBLE` không có dấu.
- **M17:** chữ đầy đủ luôn có trong DOM. Phần "gõ" là một lớp che `aria-hidden`. Nút `Chép` dùng được ngay từ đầu và chép đủ câu.
- **Chữ rời khung không bay đi.** Câu hỏi hook mờ còn 0,5 khi cuộn qua (như M5 hiện nay). Các khối khác giữ nguyên, không có hiệu ứng thoát.
- **M4 (xáo chữ) vẫn chỉ dành cho hành động của agent**: dòng nhật ký của mascot. Không dùng cho chữ giải thích.

## 5. Art mở chương

**Chung cho cả năm hình** (D38):
- **Màu:** ASCII nhiều màu (`mode: 'color'`), cùng bảng màu hoàng hôn với cảnh thành phố ở Finale (`NB.sources.scene`). Theo yêu cầu của chủ dự án, màu phải hợp với art ở cuối trang chủ. Các mốc màu lấy từ `scene()`:
  - bầu trời: `#0e1034` → `#3a2668` → `#b24868` → `#f6a058`;
  - quầng sáng: `#ffbe78`;
  - cửa sổ: `#ffce8a`;
  - bóng nhà: `#120e22`;
  - mặt nước: `#2e1e4a` → `#0a0914`;
  - làm sáng `minLum` 0,34, để ký tự đọc được trên nền.
- **Chạy ngay khi mở trang, không chờ cuộn.** Font sẵn sàng và khung đầu đã vẽ (≤ 300ms) thì hình hội tụ từ nhiễu trong 2,4s (M11, `order` 0 → 1, `power2.out`). Sau đó hình "thở" nhẹ ở tầng N: `breathe` ≈ 0,02, ≤ 4% số ô đổi mỗi giây. Ra khỏi khung nhìn, tab ẩn hoặc tắt chuyển động thì dừng. Reduced motion: hiện ngay khung cuối.
- **Bố cục:**
  - Hình chiếm sân khấu mở chương, thay cho lớp số chương khổng lồ.
  - Chữ của phần mở chương (nhãn, tên EN, tên VI, câu đỉnh, thời lượng) nằm trong vùng yên (`calm`), ở góc dưới bên trái.
  - Trên điện thoại, hình nằm sau chữ, có nền đỡ chữ như Finale (`docs/09` §2).
- **Ngân sách:**
  - ≤ 12.000 ô ở desktop, ≤ 4.000 ô ở điện thoại;
  - ≤ 2 canvas sống cùng lúc;
  - sau khi hội tụ, CPU luồng chính lúc đứng yên ≤ 8%;
  - `check.cjs` thêm một điểm đo chi phí ở phần mở chương.

**Từng hình** (nguồn procedural mới trong `bundle.js`, hình tự vẽ, không dùng ảnh có sẵn):

| Phần | id | Hội tụ thành | Lúc "thở" |
|---|---|---|---|
| 00 | `wall` | Một bức tường lời dặn chữ nhỏ, nhuộm màu hoàng hôn. Khoảng 80% số dòng rã thành nhiễu và trôi đi, để lại vài dòng và biểu tượng xe đẩy gạch chéo của trang (`ICONS.noStroller`) | Vài ký tự nhiễu trôi rất chậm |
| 01 | `map` | Địa hình đồi lúc hoàng hôn (đường đồng mức), bên trên phủ một lưới bản đồ mảnh. Chỗ hai lớp lệch nhau thì hiện dấu `?` màu ấm | Từng dấu `?` sáng lên rồi mờ đi |
| 02 | `compass` | Các dòng lời dặn in hoa (`KHÔNG ĐƯỢC…`, `LUÔN LUÔN…`, `TUYỆT ĐỐI…`) co lại thành một chiếc la bàn | Kim la bàn lắc ±3° |
| 03 | `tree` | Một cây file (`├──`, `└──`) mọc dần từ `SPEC.md`; lá `MEMORY.md` có thêm một dòng | Con trỏ ở nút đang mở nháy (tầng N) |
| 04 | `city` | Chính thành phố của Finale, ở một giờ sớm hơn. Cửa sổ sáng lên từng ô, như những việc đang chạy khi bạn vắng; một dấu ✓ thành ngôi sao | Thỉnh thoảng một cửa sổ chớp. Finale ở trang chủ là cùng thành phố ấy, đã sáng hết đèn |

Chữ tiếng Việt in hoa bên trong canvas (hình 02) là chữ trang trí `aria-hidden`, vẽ sẵn bằng chữ hoa. Luật cấm `text-transform` cho tiếng Việt chỉ áp dụng cho chữ HTML.

## 6. Mascot The Colleague (đổi luật: có lời)

**Đổi luật** (D37). SOURCE-OF-TRUTH §3.5 và README của TheColleague nay ghi: *mascot không có lời riêng; lời của nó là nhật ký hành động*. Luật mới:
- mascot nói bằng ba loại lời: câu hỏi, nhật ký hành động, và 1–2 câu vui mỗi phần;
- vẫn cấm hình con vật hay nhân vật khối pixel, để khỏi giống mascot chính thức;
- vẫn đổi mặt bằng M14 (xáo 5 ký tự của khuôn mặt, 0,35s);
- vẫn dùng bảy trạng thái đang có: `idle`, `tracking`, `thinking`, `working`, `asking`, `overloaded`, `verified`.

**Chỗ đứng (thường trực bên lề, D37):**

| Khổ | Vị trí | Lời |
|---|---|---|
| ≥ 1100px | Một rail dính ở lề phải, ngoài cột chữ. Mascot trượt theo khối đang đọc (0,3s, `power2.out`) và luôn nằm trong khung nhìn | Bong bóng mở về phía cột chữ nhưng không đè lên chữ |
| 720–1099px | Góc dưới bên phải, chỉ có mặt; tính cả `safe-area-inset` | Bong bóng mở lên phía trên mặt |
| < 720px | Trong header, cạnh nút kính | Câu hỏi và câu vui hiện *ngay trong khối* (một dòng mono dưới khối), không nổi lên trên chữ. Nhật ký bị bỏ qua trên điện thoại |

**Phản ứng theo từng đoạn.**
- Mỗi khối mang `data-mascot="<trạng thái>"` và, nếu cần, `data-say="ask|log|joke"` cùng câu nói.
- Một `IntersectionObserver` duy nhất, với dải đọc ở giữa màn hình, đặt trạng thái khi một khối vào dải.
- Đoạn tả Claude đang làm thì `working`; đoạn chờ người đọc nghĩ thì `thinking`; điểm dừng có câu hỏi thì `asking`; câu chốt của phần 04 thì `verified`. Con trỏ chuột đến gần thì `tracking` (như bây giờ).

**Lời:**
- Câu hỏi (`ask`): tối đa 3 câu mỗi phần, mỗi điểm dừng một câu. Màu `warn` như trạng thái `asking`. Hiện trong lúc giữ, ẩn khi buông.
- Nhật ký (`log`): dòng mono; động từ đầu dòng chạy M4.
- Câu vui (`joke`): 1–2 câu mỗi phần, ≤ 15 âm tiết, theo luật ở `16-writing-guide.md` §7.
- Cùng lúc chỉ có một bong bóng. Cuộn đi thì bong bóng tắt. Bong bóng không bao giờ che chữ.

**Tiếp cận:**
- Mặt có `role="img"` và `aria-label="Đồng nghiệp: đang đọc"`. Đổi trạng thái thì không đọc to (không `aria-live`), để khỏi ồn.
- Câu hỏi của mascot là nội dung, nên có bản chữ thật nằm đúng thứ tự đọc trong khối (`<p class="nb-sr">Đồng nghiệp hỏi: …</p>`). Bong bóng nổi thì `aria-hidden`.
- Câu vui là trang trí: `aria-hidden`.

**Reduced motion và tắt chuyển động:** mặt đổi tức thì, rail nhảy thay vì trượt, bong bóng hiện không có hiệu ứng.

**Ngân sách:** chỉ dùng DOM, không có canvas. Không chạy vòng `requestAnimationFrame` nào khi đứng yên.

## 7. Kính

- **Nút trên header:**
  - Nhãn `Kính: Chung`, kèm icon pixel hình cặp kính (hai ô vuông nối nhau), cùng kiểu các icon trong `icons.ts`.
  - Bấm vào thì mở một popover có 6 lựa chọn (`radiogroup`).
  - Ở khổ ≤ 360px chỉ còn icon, kèm `aria-label`.
- **Lần đầu:**
  - Khối kính đầu tiên trên trang, khi chưa có lựa chọn nào được lưu, hiện hàng chip "Bạn làm việc gì?" với 6 chip. Chip Chung đứng đầu.
  - Chọn một chip thì lưu `nb-lens` (bọc `try/catch`), cập nhật mọi khối kính trên trang và nhãn trên header.
  - Không chọn mà cuộn qua thì khối hiện nội dung kính Chung, kèm link nhỏ `Đổi kính`.
- **Khối kính:**
  - Đủ 6 biến thể có sẵn trong DOM; các biến thể đang ẩn có `hidden`.
  - Đổi kính thì chữ đổi bằng `NB.say` (mờ nhanh). Chiều cao đổi bằng Flip (M3), để không có cú nhảy.
  - Prompt mang đi thử đổi theo cùng kính.
- **Không bắt chọn.** Không có màn chặn trước khi học. Trang chủ không hỏi gì về kính.

## 8. Trang chủ

- **Hero:** giữ cảnh logo biên dịch đang có. Chữ theo 14 §5:
  - dòng nhỏ phía trên: mono 13px, `fg-muted`;
  - câu lớn: Newsreader 32–56px, 2–3 dòng ở 390px, `balance`;
  - dòng trả lời: Be Vietnam Pro 19px;
  - dòng thông tin: mono 12–13px;
  - hai nút: `nb-btn`, nút chính màu accent, nút phụ dạng viền;
  - giữ dòng miễn trừ ở góc dưới.
- **Kim tự tháp:**
  - Thay chữ của phần tuyên ngôn, giữ lớp mặt nước.
  - Câu đỉnh `data-reveal="fill"` trong một điểm dừng 0,8.
  - Số `80%`: Archivo 62% 800, `data-reveal="count"`.
  - Ba nhánh dùng chung hàng như TwoFlips trước đây (grid nhiều hàng, `display: contents`), để luật `align` của `design-check` đo được.
- **Journey:** 5 panel, giữ cơ chế; bộ đếm `01 / 05`.
- **Finale:** cảnh thành phố, bộ đếm `05 / 05`, các nút theo 14 §5.
- **Gỡ khỏi trang và khỏi bộ kiểm:**
  - `TwoFlips` và `Run`, cùng CSS của chúng;
  - `work-types.ts`;
  - các mục `#flips`, `#run` trong `SCENES` của `design-check.cjs`.

## 9. Đo và kiểm (thêm vào bộ kiểm đang có)

| Luật mới | Đo thế nào | Ở đâu |
|---|---|---|
| `gold` | ≤ 5 `[data-gold]` mỗi phần; hộp của nét gạch không chạm mực của dòng dưới | `design-check.cjs` |
| `hold-count` | Mỗi trang của lộ trình chính có đúng 3 `[data-hold]` | `design-check.cjs` |
| `mascot` | Hộp của mascot và bong bóng không đè lên hộp chữ nào, ở 1440, 390, 375×667 và 320; cùng lúc ≤ 1 bong bóng | `design-check.cjs` |
| `art` | Bật chuyển động: hình đạt `order ≥ 0,98` trong 3,5s sau khi tải. Ra khỏi khung nhìn: 0 lần vẽ. Reduced motion: khung cuối ngay khi tải | `check.cjs` |
| `lens` | Đổi kính không lỗi JS; nhãn header đổi theo; tải lại thì nhớ lựa chọn | `check.cjs` |
| `prompt` | Chữ trong DOM khớp đúng chữ được chép; gõ xong ≤ 2,6s | `check.cjs` |

Các bộ kiểm đang có vẫn phải xanh trên mọi trang mới: `type-check.cjs` (độ tương phản của chữ cam ở golden word, va chạm dấu với nét gạch, font nghiêng có thật), `check.cjs` (link, lỗi JS, cuộn ngang ở 1440/390/320, reduced motion, chi phí lúc đứng yên, axe) và `design-check.cjs`. Luật mới nào đo được thì thêm vào bảng ở `13-design-taste.md` §2.

## 10. Phần "thấy" để sau

Không dựng mô phỏng mới ở đợt này. Mỗi phần ghi chỗ chờ trong dữ liệu (`later: ['sim:interview']`…), không render gì. Khi chữ đã chốt, đợt sau sẽ quyết chỗ nào đáng có mô phỏng:

| Phần | Chỗ chờ | Ý |
|---|---|---|
| 01 | `sim:interview` | Một buổi phỏng vấn nhiều lựa chọn |
| 02 | `sim:trim` | Tỉa một bộ lời dặn; mỗi dòng bị bỏ gắn với shift tương ứng |
| 03 | `sim:tree` | Cây file mở dần, MEMORY.md thêm dòng |
| 04 | `sim:check`, `sim:quiz` | Vòng làm → kiểm → sửa → kiểm; báo cáo HTML có câu đố |

Những mô phỏng đang có (AgentWindow, FloatingOps, ContextMeter…) vẫn ở c02 và Library, không đổi.
