# 11 · Typography: luật, cách đo, cách chạy

Trạng thái: kiểm chứng nguồn ngày 08/11/2026. Bộ kiểm chạy trong CI từ đợt này (`site/scripts/type-check.cjs`).
Luật và ngưỡng nằm ở một chỗ: `design-system/type-rules.json`. Tài liệu này giải thích *vì sao* mỗi luật có mặt và nó đến từ đâu.

## 1. Tóm tắt

- **Cái gì kiểm:** chữ *đã render* trên mọi trang, ở 1440px và 390px, với font thật đã nạp. Không đọc CSS rồi đoán: đo điểm ảnh, đo mực của từng ký tự, hỏi trình duyệt font nào thực sự vẽ chữ.
- **Ba lớp cơ chế:**
  1. *Tự động mỗi PR và mỗi lần deploy:* `node scripts/type-check.cjs`. Lỗi (8 luật) chặn merge; cảnh báo (16 luật) chỉ báo cáo.
  2. *Kiểm chính bộ kiểm:* `node scripts/type-check.cjs --selftest`. Một trang cố tình sai phải làm mỗi luật nổ đúng chỗ, một trang đúng phải im lặng. Nếu ai sửa bộ kiểm mà nó thôi bắt lỗi, CI đỏ.
  3. *Rà bằng mắt* những thứ máy không đo được (thứ bậc, cặp font, nhịp dòng, văn phong): skill `typography-check` (`.claude/skills/typography-check/SKILL.md`).
- **Kết quả lần đầu trên site:** 61 lỗi, 153 cảnh báo (một phần là lỗi của chính bộ kiểm, đã sửa). Sau khi sửa site: **0 lỗi, 15 cảnh báo** (§5). Còn lại là hai việc có chủ đích: cỡ chữ đang tính bằng px, và dấu nháy thẳng trong nội dung (§6).

## 2. Nguồn đã kiểm chứng

Chỉ ghi những gì trang nguồn thực sự nói. Chỗ nào ngưỡng là *quyết định của dự án* chứ không phải chuẩn bên ngoài, bảng §3 ghi rõ.

| Nguồn | Điều rút ra | Dùng cho luật |
|---|---|---|
| [WCAG 2.2 · 1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) | Chữ thường ≥ 4,5:1; chữ lớn ≥ 3:1. Chữ lớn là từ 18pt, hoặc 14pt đậm; trang ghi tương đương khoảng 24px và 18,5px. Chữ của thành phần không hoạt động và logo được miễn. | `contrast` |
| [WCAG 2.2 · 1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) và [F94](https://www.w3.org/WAI/WCAG22/Techniques/failures/F94) | Chữ phải phóng to được 200% mà không mất nội dung. Cỡ chữ đặt chủ yếu bằng đơn vị viewport (`vw`) là lỗi vì phóng to trang không làm nó to lên. F94 không nói gì về `clamp()` hay `calc()` trộn `vw` với `rem`, nên phải thử, không suy diễn. | `zoom`, `text-size-setting` |
| [Smashing · Fluid Type và khả năng tiếp cận](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/) | Cỡ chữ fluid đạt 1.4.4 trên trình duyệt hiện đại khi cỡ lớn nhất ≤ 2,5 × cỡ nhỏ nhất. Cách thử: phóng to tới 500% rồi *đo* xem chữ có to gấp đôi chưa; DevTools không hiện giá trị đã phóng. Safari phóng to khác Chrome và Firefox. | `zoom` |
| [WCAG 2.2 · 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) (AA) | Đặt khoảng dòng 1,5, cách đoạn 2×, giãn chữ 0,12em, giãn từ 0,16em (nhân với cỡ chữ) thì không được mất hay chồng nội dung. Lỗi điển hình: chữ bị cắt trong heading, hai heading chồng lên nhau (F104). | `text-spacing` |
| [WCAG 2.2 · 1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) (AAA) | Dòng ≤ 80 ký tự; không căn đều hai bên; khoảng dòng ≥ 1,5 trong đoạn; cách đoạn ≥ 1,5 × khoảng dòng. Đây là mức AAA và nói về *cơ chế để người dùng chỉnh*, không bắt nội dung tự đạt. | `leading`, `measure`, `justify` |
| [Apple HIG · Typography](https://developer.apple.com/design/human-interface-guidelines/typography) | Cỡ mặc định / tối thiểu: iOS 17 / 11pt, macOS 13 / 10pt, visionOS 17 / 12pt. Tránh nét Ultralight, Thin, Light. Font mảnh thì dùng cỡ lớn hơn khuyến nghị. Ít kiểu chữ. Từ ba dòng trở lên thì tránh khoảng dòng chặt. Cho người đọc chỉnh cỡ chữ (Dynamic Type). | `min-size`, `light-weight`, `leading`, `text-size-setting` |
| [Butterick · Practical Typography](https://practicaltypography.com/summary-of-key-rules.html) | Thân bài web 15–25px; khoảng dòng 120–145% cỡ chữ; dòng 45–90 ký tự; chữ hoa cần giãn thêm 5–12%. | `leading`, `measure`, `caps-tracking` |
| [Bringhurst qua webtypography.net 2.1.2](https://webtypography.net/2.1.2) | Một cột chữ, dòng 45–75 ký tự là dễ chịu; 66 là lý tưởng. Tính *ký tự*, gồm cả dấu cách. | `measure` |
| [MDN · text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap) | `balance` cho heading, caption; chỉ cân tối đa 6 dòng (Chromium) hoặc 10 dòng (Firefox). `pretty` cho thân bài, chậm hơn, giảm chữ mồ côi ở dòng cuối. | `orphan` |
| [MDN · font-synthesis](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis) | Khi font thiếu mặt đậm hoặc nghiêng, trình duyệt tự tổng hợp (mặc định bật). | `faux-style` |
| [web.dev · Font best practices](https://web.dev/articles/font-best-practices) | `preconnect` tới origin của font; `font-display` (`swap`, `optional`, `fallback`) và đánh đổi của từng loại; chia subset bằng `unicode-range`; ít font; `size-adjust` cho font dự phòng để giảm dịch chuyển bố cục. | `font-load`, §6 |
| [Butterick · Curly quotes](https://practicaltypography.com/straight-and-curly-quotes.html) và [Ellipses](https://practicaltypography.com/ellipses.html) | "Dấu nháy thẳng không bao giờ được xuất hiện trong văn bản của bạn." Ba dấu chấm gõ liền là xấp xỉ của dấu ba chấm: gõ liền thì các chấm quá sát, gõ cách thì quá xa; dùng ký tự `…`. | `punctuation` |
| [Vietnamese Typography](https://vietnamesetypography.com/design-challenges/) (Donny Trương) | "Chữ hoa có dấu gây khó cho khoảng dòng vì chỗ hẹp"; dấu thanh phải rõ và đậm ngang chữ gốc; dấu không được chạm chữ kề bên. Sách *không* cho con số khoảng dòng nào. | `collision`, `ink-clip`, `display-leading` |
| [WAI · Headings](https://www.w3.org/WAI/tutorials/page-structure/headings/) | Heading lồng theo cấp; "bỏ cấp nên tránh khi có thể", nhưng được phép bỏ cấp khi đóng mục con. Ví dụ của trang dùng một h1. Trang không đặt giới hạn số h1. | `headings` |

**Không dùng:** Material 3 (trang chính thức không tải được trong phiên này, chỉ có nguồn thứ cấp), APCA (nằm trong bản nháp WCAG 3, chưa là chuẩn; mức Lc 75/90 và bảng cỡ-độ đậm còn thay đổi giữa các bản). Cổng kiểm vẫn dùng tỉ lệ WCAG 2.

**Một khoảng trống thẳng thắn:** không nguồn nào ở trên cho con số khoảng dòng tối thiểu của tiếng Việt. Ngưỡng `display-leading ≥ 1,12` là luật của DS (README, mục Chữ), và bộ kiểm *đo va chạm thật* (`collision`) thay vì tin ngưỡng đó.

## 3. Luật → kiểm tra

Mức **lỗi** chặn merge. Loại: *Chuẩn* = WCAG AA; *Khuyến nghị* = AAA hoặc sách; *DS* = luật của design system này.

| Luật | Mức | Loại | Ngưỡng | Đo thế nào |
|---|---|---|---|---|
| `contrast` | lỗi | Chuẩn | 4,5:1; chữ lớn (≥ 24px, hoặc ≥ 18,5px đậm) 3:1 | Ẩn chữ, chụp ảnh nền sau từng dòng, lấy mẫu điểm ảnh, tính tỉ lệ ở phân vị thứ 10 của các điểm mẫu (gần chỗ tệ nhất, bỏ điểm lẻ do khử răng cưa). Tính cả `opacity`. Bỏ qua UI `inert` hoặc `disabled`. |
| `min-size` | lỗi | DS + HIG | ≥ 12px | Cỡ tính toán của mọi đoạn chữ nội dung. DS chọn 12px vì dấu chồng của tiếng Việt không đọc được nhỏ hơn; HIG đặt sàn 10–12pt. |
| `collision` | lỗi | DS | mực dòng trên chạm mực dòng dưới > 1px | Từng ký tự: đo mực lên và mực xuống bằng canvas (`actualBoundingBox`), cộng vị trí đường cơ sở, so từng cặp ký tự chồng nhau theo chiều ngang giữa hai dòng liền kề. |
| `ink-clip` | lỗi | DS | dấu bị `overflow` cắt > 1px | Mực của từng chữ so với khung `overflow: hidden/clip` bao quanh. |
| `glyph-fallback` | lỗi | Dự án | không chữ cái nào rơi sang font khác | Hỏi trình duyệt (DevTools Protocol) font nào vẽ từng đoạn; chữ cái nào font thương hiệu thiếu thì báo. |
| `text-spacing` | lỗi | Chuẩn | 1,5 · 0,12em · 0,16em · cách đoạn 2em | Chèn đúng CSS của WCAG, mở sẵn mọi `<details>`, so trước và sau: chữ mới bị khung cắt, hoặc chồng lên khối chữ khác thì lỗi. |
| `zoom` | lỗi | Chuẩn | ở ít nhất một mức phóng trong 1,5×–5×, chữ to ≥ 2× cỡ gốc | Mô phỏng zoom bằng viewport hẹp lại, nhân với cỡ chữ đo được. Chữ bị ẩn ở bố cục hẹp thì không tính. |
| `stray-markup` | lỗi | Dự án | không có `*x*`, `**x**`, `` `x` ``, `# `, `](` hiện nguyên ra chữ | Quét chữ hiển thị (bỏ qua mã). Lỗi hiển thị chứ không phải sở thích: người đọc thấy dấu sao thừa. |
| `symbol-fallback` | cảnh báo | Dự án | mũi tên, ✓, ■ có trong font | Như `glyph-fallback`, cho ký hiệu: mỗi hệ điều hành vẽ bằng một font khác nhau. |
| `text-size-setting` | cảnh báo | Khuyến nghị | to ≥ 1,5× khi người đọc đặt cỡ chữ trình duyệt gấp đôi | Đổi cỡ chữ mặc định của trình duyệt rồi so lại từng đoạn. Chữ tính bằng px thì không đổi. |
| `leading` | cảnh báo | Khuyến nghị | đoạn ≥ 3 dòng, chữ ≤ 20px: khoảng dòng ≥ 1,4 | Khoảng cách đường cơ sở giữa các dòng. 1,4 nằm trong khoảng 120–145% của Butterick và gần cỡ `small` của DS (1,45); WCAG AAA đòi 1,5, thân bài của site đã ở 1,55–1,65. |
| `display-leading` | cảnh báo | DS | chữ > 20px có dấu tiếng Việt: ≥ 1,12 | Khoảng dòng tính toán. |
| `measure` | cảnh báo | Khuyến nghị | ≤ 80 ký tự mỗi dòng | Đếm ký tự thật trên từng dòng, từ ngắt dòng của trình duyệt. DS nhắm 60–68. |
| `caps-tracking` | cảnh báo | DS + Butterick | nhãn viết hoa ≤ 18px: giãn ≥ 0,04em | Chỉ xét nhãn viết hoa toàn bộ, không xét từ viết tắt giữa câu. |
| `caps-vi` | cảnh báo | DS | tiếng Việt có dấu không viết hoa bằng `text-transform` | Dấu chồng ở chữ hoa là chỗ dễ chạm dòng nhất. |
| `faux-style` | cảnh báo | Dự án | không nghiêng/đậm giả | So kiểu và độ đậm đang dùng với các mặt chữ đã nạp (`document.fonts`). |
| `orphan` | cảnh báo | Khuyến nghị | heading nhiều dòng không kết bằng một từ lẻ | Từ cuối nằm một mình ở dòng cuối. |
| `justify` | cảnh báo | Khuyến nghị | không căn đều hai bên | `text-align: justify`. Trình duyệt không ngắt âm tiết tiếng Việt, căn đều chỉ tạo khoảng trắng loang. |
| `light-weight` | cảnh báo | HIG | độ đậm ≥ 400 dưới 24px | Độ đậm tính toán. |
| `headings` | cảnh báo | Khuyến nghị | một h1; không nhảy cấp xuống; không rỗng | Cây heading, kể cả heading chỉ dành cho trình đọc màn hình. |
| `role` | cảnh báo | DS | cỡ/độ đậm thuộc một vai chữ ở `SOURCE-OF-TRUTH.md` §2 | So (họ, cỡ, độ đậm, độ giãn) với bảng vai chữ trong `type-rules.json`. |
| `font-family` | cảnh báo | DS | chỉ 4 họ: Be Vietnam Pro, Newsreader, JetBrains Mono, Archivo | Họ chữ đầu tiên của từng đoạn. |
| `font-load` | cảnh báo | Khuyến nghị | có `preconnect` tới nơi chứa font; `font-display` không ẩn chữ | Đọc `<link>` và các `@font-face`. |
| `punctuation` | cảnh báo | Khuyến nghị | “ ” ‘ ’ thay cho `"` `'`; `…` thay cho ba dấu chấm; `–` thay cho `--` | Quét văn xuôi, gộp thành một mục mỗi trang. Bỏ qua mã và chữ mono (cờ dòng lệnh như `--model` là hợp lệ). |

**Bỏ qua có chủ đích:** chữ trang trí (`aria-hidden`, số khổng lồ `nb-cond`, ghost text `nb-ghost`) không bị đo, vì DS cho phép chúng tràn khung. Ngoại lệ khác ghi ở `exceptions` trong `type-rules.json`; mỗi mục bắt buộc có `rule`, `selector` và `reason`, thiếu một trong ba là bộ kiểm từ chối chạy.

## 4. Cách chạy

```bash
cd site
NB_BASE=/no_babysitting_anymore/ npm run build     # kiểm bản build giống production
node scripts/type-check.cjs                         # mọi trang trong dist/, hai khổ
node scripts/type-check.cjs --selftest              # kiểm chính bộ kiểm (khoảng 5 giây)
node scripts/type-check.cjs --url https://trang-khac.example/   # trang bất kỳ, lặp lại được; luật DS tắt, thêm --ds để bật
node scripts/type-check.cjs --pages ,c02/ --only phone           # một vài trang, một khổ
```

- Kết quả in ra màn hình theo luật, mỗi mục có *phần tử*, *đo được bao nhiêu*, *sửa thế nào*, *ở trang và khổ nào*. Cùng một lỗi lặp ở nhiều trang gộp thành một mục.
- Ghi `site/type-report/summary.md` (bảng tóm tắt, dán thẳng vào PR) và `report.json` (toàn bộ). Trong CI, bảng tóm tắt hiện ở trang tóm tắt của job và cả thư mục là artifact `type-report`.
- Mã thoát 0 nếu không có lỗi, 1 nếu có lỗi, 2 nếu cấu hình sai.
- Mất mạng hoặc font không nạp được: bộ kiểm báo `font-load` và bỏ hai luật phụ thuộc font (`collision`, `ink-clip`) thay vì báo sai.

**Khi một luật báo lỗi:** sửa nguyên nhân. Không nới ngưỡng để CI xanh. Nếu ngưỡng sai thật (như `--measure` ở §5), đổi ở `type-rules.json`, nêu lý do trong commit, và để chủ dự án thấy. Nếu một chỗ cố tình phá luật, thêm vào `exceptions` kèm lý do.

## 5. Lần chạy đầu: tìm thấy gì, sửa gì

Phạm vi: 14 trang × 2 khổ, khoảng 4.850 đoạn chữ, khoảng 80 giây. Lần đầu: 61 lỗi, 153 cảnh báo. Một phần là lỗi *của bộ kiểm* lộ ra khi đối chiếu với trang thật, và đã sửa trong bộ kiểm: `<details>` đóng làm chữ bên trong không được đo; UI bị phủ (`inert`) bị tính tương phản; từ dài ngắt ở dấu `-` hoặc `/` bị đếm vào dòng đầu; số trang trí bị tính như nội dung. Phần còn lại là lỗi thật của site:

| Luật | Tìm thấy | Đã sửa |
|---|---|---|
| `contrast` | Khối "Hồi đó" của `ThenNowCard` mờ bằng `opacity .5`: **2,76:1**. | Đổi sang màu `fg-subtle` (đã đo ≥ 4,7:1), không dùng `opacity`. Sửa ở `ThenNowCard/preview.html` rồi port lại. |
| `contrast`, hỗ trợ tiếp cận | Bảng context ở chương 02 nằm dưới màn che nhưng bàn phím vẫn Tab vào được các nút phía sau. | Bảng `inert` cho tới khi người đọc chốt dự đoán. |
| `min-size` | 10,5 đến 11,5px: nhật ký và nút của bảng context, mốc beat (`b1`…), nhãn cấp độ LOW/MEDIUM/HIGH/PRO, mã trong dòng nguồn (0,9em × 12px = 10,8px). | Tất cả ≥ 12px; mã trong dòng lấy `max(12px, .9em)`. |
| `collision` | Tiêu đề "Bạn giao kết quả. Claude tự làm. Bạn duyệt." viết hoa bằng Archivo, khoảng dòng 1,08: dấu của "Ạ" chạm "Ự" ở dòng dưới (chồng 1,1–1,2px). | Đổi sang vai `heading` của DS (Newsreader, viết thường như câu thường), khoảng dòng 1,16. |
| `text-spacing` | Ở Hành trình, từ tiếng Anh dài ("Specialists", "Babysitting") tràn ra panel bên cạnh khi giãn chữ. | `overflow-wrap: anywhere` cho tên chương; chỉ cắt (`overflow: hidden`) ở bố cục có chuyển động. |
| `stray-markup` | Câu hỏi chương 01 và đoạn beat b1 hiện nguyên dấu `*làm*`. Hai nguyên nhân: Hành trình và tiêu đề chương in câu hỏi thô; `inline()` không xử lý chữ nghiêng lồng trong chữ đậm (`**"… *làm* …"**`). | Câu hỏi đi qua `inline()`; regex chữ đậm cho phép dấu `*` lồng bên trong (`site/src/lib/matrix.ts`). |
| `faux-style` | Liên kết Google Fonts không xin mặt nghiêng của Be Vietnam Pro, Newsreader, JetBrains Mono, cũng không xin độ đậm 700/900: 23 chỗ nghiêng và đậm là do trình duyệt tự xiên và tự làm đậm. | Xin mặt nghiêng thật (`ital`). Đậm lấy 600, mặt nặng nhất đã nạp (`:where(.nb) b, strong` trong `bundle.css`, độ ưu tiên bằng 0 nên mọi luật khác vẫn thắng). |
| `symbol-fallback` | 54 chỗ: mũi tên, ✓, ■, ▍ và khối ░▒▓█ không có trong các subset Google gửi, nên mỗi máy vẽ bằng một font. | Cắt riêng 5 KB ký hiệu từ JetBrains Mono (giấy phép SIL OFL, ghi ở `THIRD_PARTY_NOTICES.md`), khai báo cho từng mặt chữ. Phải khai báo đúng họ, kiểu và độ đậm của từng mặt chữ Google thì trình duyệt mới ghép chung; thử khai báo một khoảng 100–900 thì Chrome không bao giờ dùng tới. |
| `measure` | `--measure: 66ch` cho tới **90 ký tự mỗi dòng** (đo ở chương 02): `ch` là bề rộng chữ số 0, rộng hơn chữ thường tiếng Việt khoảng 1,3 lần. Chỗ khác ghi cứng 62–70ch. | `--measure: 50ch` (66–68 ký tự), dùng chung cho các khối bị báo. |
| `leading` | 1,14 đến 1,3 ở các đoạn nhiều dòng (`guide` của ThenNowCard, câu hỏi ở Hành trình, mô tả Library, ghi chú). | 1,4 đến 1,5. |
| `orphan` | Câu hỏi mở chương kết bằng một từ lẻ ("không?", "hơn?"). Heading dùng SplitText nên không bật được `text-wrap: balance`. | `bindLast()` (`site/src/lib/typo.ts`) nối hai từ cuối bằng dấu cách không ngắt; chỗ không dùng SplitText thì `text-wrap: balance`. |
| `role` | 76px (DS: 72), 13–13,5px (DS: 14), 18px serif (DS: 19), tiêu đề Library 72px (DS: 64), tiêu đề bước của Vòng giao việc bằng sans 26px. | Đưa về DS; tiêu đề bước dùng Newsreader như mọi H2. |
| `font-load` | Chưa `preconnect` tới `fonts.gstatic.com`. | Thêm. |

**DS cần chủ dự án biết** (đã sửa trong DS, chờ duyệt cùng PR):
- `--measure` đổi 66ch → 50ch (README, `tokens.json`, `tokens.css`).
- Vai thân bài đổi 14,5–19px → 14–19px, khớp `small` = 14px trong `tokens.json`.
- Thêm vai "Dòng prompt (câu giao việc mẫu)": JetBrains Mono 500, 16–32px. Hero và Vòng giao việc đã dùng nó từ trước mà bảng vai chưa ghi.
- Mã trong đoạn văn: 0,9em của đoạn, tối đa 16px.

## 6. Còn lại và lộ trình

Hiện còn **15 cảnh báo, hai loại**.

**`text-size-setting` (14, mỗi trang một):** mọi cỡ chữ đang tính bằng px, nên khi người đọc đặt cỡ chữ mặc định lớn hơn trong trình duyệt, site không to lên. Phóng to cả trang (Ctrl và +) vẫn đạt WCAG 1.4.4 (kiểm bằng `zoom`), nên đây là cảnh báo chứ không phải lỗi.

**`punctuation` (1):** nội dung chương dùng dấu nháy thẳng (`"` và `'`, khoảng 325 ký tự trên toàn site, vì kịch bản gốc viết như vậy). Đổi sang dấu nháy cong là sửa glyph, không sửa chữ, nhưng phải làm đúng ở lớp render (không đụng vào thuộc tính HTML, mã, URL), nên để thành một đợt riêng.

Thứ tự đề xuất (mỗi việc là một đợt kaizen nhỏ, đo trước và sau):
1. **px → rem** cho cỡ chữ: đổi cơ học, giá trị mặc định giữ nguyên (16px = 1rem), rồi chạy `text-spacing` và `zoom` để bắt khung cố định chiều cao. Đóng 14 cảnh báo.
2. **Tự host font** (subset Vietnamese + Latin, WOFF2) với `font-display: swap` và font dự phòng khớp kích thước bằng `size-adjust`: bỏ phụ thuộc vào Google Fonts lúc chạy, giảm dịch chuyển bố cục (web.dev). Khi đó cũng bỏ được 5 KB ký hiệu rời.
3. **Dấu nháy cong** (kiểu SmartyPants) trong `inline()` và các chỗ in câu hỏi; đóng cảnh báo `punctuation`.
4. **`text-wrap: pretty`** cho thân bài (MDN: chậm hơn, chỉ cho đoạn dài).
5. **Ảnh chụp tham chiếu** cho chữ lớn có dấu (ba khổ × hai theme), vì `collision` chỉ bắt va chạm chứ không bắt xấu.
6. **Theme sáng:** bộ kiểm chạy theme mặc định của trang (tối). Khi site có công tắc theme, thêm một lượt chạy `data-theme="light"` cho `contrast`.

## 7. Giới hạn của bộ kiểm

- Đo trạng thái cuối của từng trang (`prefers-reduced-motion: reduce`). Trạng thái *giữa chừng* của chuyển động (ví dụ lúc chữ đang trượt vào) không được đo.
- Chữ nằm trong canvas ASCII hoặc ảnh không đo được (và DS đã đặt chúng `aria-hidden`).
- Tương phản lấy mẫu điểm ảnh, đã chống khử răng cưa bằng phân vị thứ 10; chữ nằm trên ảnh nền biến thiên mạnh có thể cần mắt người.
- `zoom` mô phỏng bằng viewport hẹp, không phải zoom thật của trình duyệt (Smashing lưu ý Safari phóng to khác).
- Chỉ thử trong Chromium. Font hệ thống dự phòng khác nhau giữa máy: `symbol-fallback` và `glyph-fallback` báo *có rơi font hay không*, không báo máy khác sẽ thấy gì.
- Bộ kiểm không đánh giá văn phong, thứ bậc hay cặp font. Việc đó là của skill `typography-check` và của mắt người.
