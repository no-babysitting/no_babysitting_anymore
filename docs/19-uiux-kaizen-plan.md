# 19 · Kaizen UI/UX: cho người đọc thấy hệ thống (09/11/2026)

> **Trạng thái: đề xuất, chờ chủ dự án duyệt.** Đầu vào là bản nhận xét *ASCII & Motion Design Direction* do ChatGPT viết, chủ dự án dán vào ngày 09/11/2026. Bản nhận xét được đối chiếu với site đang chạy (`main` ở `8f9d746`) và các quyết định D1–D54 (`08-kaizen-go-live.md`). Prompt giao việc cho coding agent nằm ở `20-handoff-prompt-deepseek.md`.

## 0. Tóm tắt

**Nhận xét đi đúng hướng của dự án, và phần lớn đã có trên site.** Ba tầng chuyển động, ASCII mang nghĩa, hero đi từ nhiễu thành logo, finale đầy màu, mascot có trạng thái, reduced motion giữ đủ chữ: các ý đó đã thành luật và phép đo từ đợt K0 (`09-motion-script.md`). Nhận xét có một chỗ cũ: bảng 12 chương dựa trên kịch bản v3, nay đã gộp thành 5 phần cùng mục Nâng cao (D23, D25). §3 xếp lại các hình ẩn dụ của bảng đó theo cấu trúc mới.

Đối chiếu với site thật, có **năm chỗ hở** đáng làm:

1. **Art có thể bị sửa lẫn.** Một agent khác vào sửa trang chủ rất dễ đụng vào ASCII art vừa duyệt. Đã làm trong PR này: khoá art bằng một bộ kiểm chạy trong CI (§2, D55).
2. **Trang chủ ghim quá nhiều.** Đo ngày 09/11: 21,8 trong 29,2 màn cuộn ở desktop là cảnh bị ghim (75%), ở điện thoại là 20,0 trong 28,1. Nhận xét đòi *không ép xem*, nên phải có ngân sách ghim và nút bỏ qua (§6).
3. **Luật thiết kế bị chép ở nhiều nơi và đã lệch nhau.** Ví dụ: `docs/09` đã đổi luật thành "chỉ tầng N được lặp", nhưng `design-system/motion.md`, `design-system/README.md` và `docs/03` vẫn ghi "không gì lặp vô hạn". Mỗi luật cần một nơi gốc (§4).
4. **Chưa có cách chấm một cảnh trước khi dựng.** Nhận xét đề xuất bốn chiều chấm: ấn tượng, giá trị học, chuyển động có cần không, tải nhận thức. Thêm vào PR của mọi cảnh tầng C (§5).
5. **Chuyển động chưa ghi mục đích.** Mã M nói chuyển động *trông ra sao*, chưa nói nó *giúp gì*. Thêm cột mục đích lấy từ bảy mục đích của nhận xét (§4).

## 1. Đối chiếu từng ý

| Ý của nhận xét | Hiện trạng | Xử lý |
|---|---|---|
| ASCII là ngôn ngữ hình, phải mang nghĩa, không làm nền dày đè chữ | Đã có: vùng yên quanh chữ, nền đỡ chữ ở finale, trần số ô (`09` §2) | Giữ. Thêm khoá art (§2) |
| Hero: nhiễu hội tụ thành nhận diện | Đã có (logo khối, M11) | Giữ, khoá |
| Hình minh hoạ theo chương | Đã chốt 5 hình mở chương `wall`, `map`, `compass`, `tree`, `city` (D38, `15` §5), chưa dựng | Dựng ở đợt UX3. §3 thêm ẩn dụ cho phần "thấy" |
| Mascot `[•_•]` theo trạng thái: chờ, nghĩ, làm, bị chặn, rà, xong | Có 7 trạng thái (`idle`, `tracking`, `thinking`, `working`, `asking`, `overloaded`, `verified`) | Ánh xạ, chưa thêm trạng thái mới (§7) |
| Finale: từ ASCII đơn sắc sang đầy màu | Đã có (thành phố hoàng hôn), và cảnh Spark đầy màu ngay sau hero | Giữ, khoá |
| Ba tầng Primary / Secondary / Ambient | Đã có, tên là C / P / N (`09` §1) | Giữ. Gộp về một nơi gốc (§4) |
| Mỗi chuyển động phục vụ ít nhất một mục đích | Có mã M1–M17 nhưng chưa ghi mục đích | Thêm cột mục đích (§4) |
| Chỉ kể bằng cuộn ở vài khoảnh khắc lớn | Trang chủ đang ghim 75% quãng cuộn | Ngân sách ghim (§6) |
| Chuyển trạng thái cho thấy khái niệm: context đầy rồi nén, brief mơ hồ thành có cấu trúc, việc tách cho chuyên gia, quyền được cho hoặc bị chặn, đầu ra qua phép kiểm | Có `ContextMeter` ở A1 (c02). Lộ trình chính đã để chỗ chờ `sim:*` (`15` §10) | Xếp vào các chỗ chờ (§3). Dựng sau khi chữ đã chốt (D41) |
| Sáu nguyên tắc six shifts áp vào thiết kế | Luật đo được nằm ở `09`, `11`, `13`, `15`, SOURCE-OF-TRUTH; có chỗ chép lại và đã lệch | Một nơi gốc cho mỗi luật; studio HTML làm tham chiếu (§4) |
| Thước chất lượng: mục đích, một tiêu điểm, dễ đọc, người đọc làm chủ, a11y, hiệu năng, nhất quán | Đã đo được phần lớn (check, type-check, design-check) | Thêm: ngân sách ghim, chi phí lúc cuộn ở điện thoại, chấm bốn chiều (§5, §6) |
| Bàn phím và trình đọc màn hình | Có axe trong `check.cjs`; kiểm thật chưa làm (D20) | Giữ D20: chưa đăng rộng khi chưa kiểm thật |

**Không làm**, kèm lý do:
- Không dựng lại bảng 12 chương thành 12 cảnh điện ảnh. Lộ trình chính chỉ có 5 phần (D23); mục Nâng cao viết sau (D25).
- Không thêm chuyển động "cho đẹp" ở tầng P. Nhận xét cũng nói vậy, và ngữ pháp M đã chặn việc này.
- Không đổi palette hay logo. D18 vẫn giữ.

## 2. Khoá ASCII art (D55)

**Art đã duyệt được khoá.** `site/scripts/art-check.cjs` dựng site, đọc lại từng canvas thành một dấu vân tay thô: lưới 24×14 màu trung bình, cộng tỉ lệ điểm sáng. Rồi nó so với `design-system/art-lock.json`. Dấu vân tay thô là có chủ ý: nhiễu ngẫu nhiên và khác biệt khử răng cưa của font nằm dưới ngưỡng, còn đổi bảng màu, dời bố cục, mất cảnh hay đổi cú nổ thì vượt ngưỡng. Ảnh nguồn của Spark và mặt mascot được so bằng hash. Bộ kiểm chạy trong CI ở bước *Art lock*, ảnh từng mảnh nằm trong artifact `art-report`.

| Mảnh | Ở đâu | Khoá ở trạng thái |
|---|---|---|
| Logo khối hội tụ từ nhiễu | `Intro.astro` (`#intro-cv`) | Khung cuối (reduced motion) |
| Mặt nước ở phần tuyên ngôn, sau là kim tự tháp | `index.astro` (`#man-cv`), `NB.sources.terrain({ flow })` | Khung cuối |
| Thành phố hoàng hôn ở finale | `Finale.astro` (`#finale-cv`), `NB.sources.scene` | Khung cuối |
| Tranh xe đẩy gạch chéo trong menu | `Hud.astro` (`.mcv`) | Khi mở menu |
| Spark: bích hoạ, hai bàn tay, chùm sáng ASCII | `Spark.astro`, `public/art/*` | Khung tĩnh, và ở 20%, 80%, 92% quãng ghim |
| Mặt mascot | `NB.FACES` trong `bundle.js` | Hash |

Mỗi mảnh đo ở 1440×900 và 390×844. Ngưỡng hiện tại: màu lệch ≤ 8% so với độ nổi của art trên nền, tỉ lệ điểm sáng lệch ≤ 12%. Lần thử ngày 09/11: hai lần chạy liền nhau lệch 0%. Bỏ hệ số làm sáng màu của Spark thì cả 8 mảnh Spark đều bị bắt.

**Muốn đổi art** thì chạy `node scripts/art-check.cjs --update --shots art-report`, đưa ảnh trước và sau vào trang giải thích của PR, rồi chờ chủ dự án duyệt. Luật này đi cùng D13: PR nào đổi `art-lock.json` thì phải có chủ dự án duyệt.

**Không khoá** những thứ sẽ đổi theo kịch bản v4: số ở Journey (12 thành 5 panel), số trong "Một lần giao việc", nền địa hình ở opener chương (thay bằng 5 hình mở chương), các demo của design system. Khi 5 hình mở chương được duyệt, thêm chúng vào khoá.

## 3. Hình ẩn dụ theo phần

Bảng của nhận xét dựa trên 12 chương v3. Dưới đây là bản xếp lại theo cấu trúc v4. Hình mở chương đã chốt ở `15` §5; cột "thấy" là ý cho các chỗ chờ mô phỏng, dựng sau khi chữ chốt (D41).

| Phần | Hình mở chương (D38) | Phần "thấy" (chỗ chờ) | Lấy từ ý nào của nhận xét |
|---|---|---|---|
| 00 · Vì sao bạn vẫn phải trông | `wall`: tường lời dặn rã còn vài dòng | Không có mô phỏng. Một thẻ Then → Now | 00 Two Coin Flips (đã bỏ, D34), 01 The New Colleague |
| 01 · Tìm điều chưa biết | `map`: bản đồ lệch lãnh thổ, dấu `?` | `sim:interview`: ba câu hỏi, mỗi câu trả lời lấp một dấu `?` trên bản đồ | 03 The Brief (mơ hồ thành ý định) |
| 02 · Giao việc | `compass`: lời dặn in hoa co thành la bàn | `sim:trim`: một brief dài bị tỉa, mỗi dòng bỏ đi gắn với một shift; brief còn lại có cấu trúc | 03 The Brief |
| 03 · Để nó làm | `tree`: cây file mọc từ `SPEC.md` | `sim:tree`: tài liệu chỉ mở khi cần; MEMORY.md thêm dòng | 02 The Briefing Budget (context đầy rồi nén), 04 The Onboarding Doc |
| 04 · Kiểm, hỏi vặn, rồi buông | `city`: cửa sổ sáng dần như việc chạy khi bạn vắng | `sim:check`: làm → kiểm → bắt lỗi ✕ → sửa → ✓; `sim:quiz` | 07 Review Before Handoff, 10 No Babysitting |
| A1 · Ngân sách ngữ cảnh (c02, đã có) | Giữ | `ContextMeter` đang chạy | 02 The Briefing Budget |
| A2–A8 · Nâng cao | Mỗi mục một hình khi viết | A3: skill được nạp khi cần · A4: việc tách nhánh rồi hội tụ · A5: thang effort · A6: quyền được cho hoặc bị chặn · A7: phát hiện, sửa, kiểm, duyệt · A8: lịch chạy, sự kiện | 05, 05b, 06, 07, 08, 09 |

## 4. Một nơi gốc cho mỗi luật, và mục đích của chuyển động

**Nơi gốc.** Mỗi luật chỉ viết ở một chỗ; chỗ khác chỉ trỏ tới.

| Loại luật | Nơi gốc | Chỗ khác làm gì |
|---|---|---|
| Mã chuyển động M1–M17, tầng C/P/N, mục đích | `design-system/motion.md` | `docs/09` giữ kịch bản từng cảnh và ngân sách; `docs/03`, `design-system/README.md` trỏ tới |
| Vai chữ, token, component | `design-system/SOURCE-OF-TRUTH.md` | `docs/15` chỉ ghi phần thêm cho v4, rồi chép về nơi gốc khi đã duyệt (như đầu `15` đã hẹn) |
| Luật đo chữ | `docs/11-typography.md` + `type-rules.json` | |
| Luật đo trình bày | `docs/13-design-taste.md` §2 | |
| Khoá art | `docs/19` §2 + `art-lock.json` | |
| Quyết định | `docs/08` | |

**Mục đích của chuyển động.** Thêm một cột vào bảng mã M ở `motion.md`. Mỗi mã nhận một hay hai trong bảy mục đích của nhận xét: *định hướng*, *làm lộ ra*, *biến đổi*, *cho thấy nhân quả*, *phản hồi*, *nhấn*, *tạo không khí*. Một tween không chỉ ra được mục đích thì bỏ. Ví dụ: M1 (mũi tên tự vẽ) là cho thấy nhân quả; M11 (nhiễu hội tụ) là biến đổi; tầng N là tạo không khí.

**Tham chiếu sống.** Mỗi component đã có `preview.html`. Thêm một trang `design-system/studies/index.html` gom các mã M chạy thật cạnh nhau, để agent và chủ dự án nhìn thấy thay vì đọc mô tả.

## 5. Chấm một cảnh trước khi dựng

Mọi cảnh tầng C (cảnh ghim, cảnh nổ, mô phỏng) được chấm trong trang giải thích của PR, trước khi dựng và sau khi dựng. Thang 1–3:

| Chiều | 1 | 3 |
|---|---|---|
| Ấn tượng | Người xem không nhớ cảnh | Người xem kể lại được cảnh |
| Giá trị học | Bỏ cảnh đi thì bài vẫn dạy y như cũ | Cảnh cho thấy điều chữ khó nói |
| Chuyển động có cần không | Một hình tĩnh nói được y như vậy | Phải chuyển động mới thấy được thay đổi |
| Tải nhận thức (đảo chiều: 3 là nhẹ) | Cùng lúc phải đọc chữ và theo dõi hình | Một tiêu điểm, chữ đứng yên khi hình chạy |

Cảnh có *giá trị học* = 1 và *chuyển động có cần không* = 1 thì không dựng thành cảnh C; dùng hình tĩnh hoặc tầng P. Ngoại lệ là cảnh mở và cảnh kết của trang chủ (hero, Spark, finale): chúng làm nhiệm vụ tạo không khí, đã được chủ dự án chọn.

## 6. Ngân sách ghim

**Số đo ngày 09/11/2026** (trang chủ, `ScrollTrigger` có `pin`):

| Cảnh | Desktop (màn) | Điện thoại (màn) |
|---|---|---|
| Hero | 1,8 | 1,4 |
| Spark | 2,2 | 2,2 |
| Câu tuyên ngôn (hold) | 0,8 | 0,8 |
| Hai lần tung đồng xu | 2,3 | 2,3 |
| Một lần giao việc | 6,3 | 7,0 |
| Lộ trình | 6,8 | 4,7 |
| Finale | 1,6 | 1,6 |
| **Tổng / cả trang** | **21,8 / 29,2 (75%)** | **20,0 / 28,1 (71%)** |

**Đích đề xuất:** tổng ghim ≤ 12 màn và ≤ 50% chiều dài trang, ở cả hai khổ. Cách đạt, theo thứ tự ít đụng chạm nhất:
1. Kịch bản v4 bỏ "Hai lần tung đồng xu" (−2,3) và rút Lộ trình từ 12 xuống 5 panel.
2. Lộ trình ≤ 0,5 màn mỗi panel; "Một lần giao việc" ≤ 0,6 màn mỗi bước.
3. Cảnh nào ghim quá 3 màn thì có nút `Bỏ qua ↓` (nhảy tới cảnh sau, giữ được bằng bàn phím). Chữ của nút cần chủ dự án duyệt.
4. Spark và hero giữ nguyên độ dài (chủ dự án vừa chỉnh), trừ khi chủ dự án muốn rút.

**Đo:** thêm luật `pins` vào `design-check.cjs`: cộng độ dài các ghim trên trang chủ ở 1440×900 và 390×844, báo lỗi khi vượt đích. Thêm một phép đo chi phí khi cuộn qua Spark ở điện thoại (CPU chậm 4 lần): thời gian vẽ mỗi khung ≤ 16 ms ở trung vị.

## 7. Mascot: trạng thái của hệ thống

| Nhận xét gọi là | Trạng thái đang có | Ghi chú |
|---|---|---|
| Chờ | `idle` | |
| Đang nghĩ | `thinking` | |
| Đang làm | `working` | Dòng nhật ký chạy M4 |
| Bị chặn | `asking` khi cần người; `overloaded` khi context đầy | Một trạng thái `blocked` riêng (quyền bị từ chối) để tới khi viết A6 |
| Đang rà | `working` + nhật ký "đang kiểm…" | |
| Xong | `verified` | |

Mặt mascot nằm trong khoá art. Thêm mặt mới thì theo §2.

## 8. Các đợt

Mỗi đợt là một hay vài PR nhỏ. Cột "Ai duyệt": **code** thì merge khi mọi bộ kiểm xanh (D14, xem câu hỏi mở 1); **chữ** thì chủ dự án duyệt (D13); **art** thì chủ dự án duyệt (D55).

| Đợt | Làm gì | Xong khi | Ai duyệt |
|---|---|---|---|
| **UX0 · Khoá art** | `art-check.cjs`, `art-lock.json`, bước CI, tài liệu này | CI xanh có bước *Art lock* | Đã làm trong PR này |
| **UX1 · Một nơi gốc** | Dọn luật lặp và luật đã cũ (§4); thêm cột mục đích vào `motion.md`; trang `studies/index.html` | Không còn câu "không gì lặp vô hạn" nào trái với `09`; mọi mã M có mục đích | code |
| **UX2 · Ngân sách ghim** | Luật `pins`, đo chi phí cuộn Spark ở điện thoại; ghi số trước và sau vào CHANGELOG | Luật chạy trong CI, ban đầu chỉ cảnh báo; chuyển thành lỗi khi v4 lên trang chủ | code |
| **UX3 · Dựng v4** | Theo thứ tự của `17` §1: gỡ phần đã bỏ, khung 5 phần, trang chủ cùng 00 và 01, rồi 02, 03, 04; 5 hình mở chương sau khi chủ dự án chọn hướng | Đạt `14` §11; tổng ghim trang chủ đạt §6; art-check xanh | chữ + art |
| **UX4 · Mascot thường trực** | Rail bên lề, lời hỏi, nhật ký, câu vui (`15` §6), ánh xạ §7 | Luật `mascot` của `15` §9 xanh | code + chữ |
| **UX5 · Phần "thấy"** | Bốn mô phỏng ở §3, mỗi cái chấm bốn chiều trước khi dựng | Mỗi mô phỏng có điểm ≥ 2 ở giá trị học và chuyển động có cần không | chữ |
| **UX6 · Nâng cao** | Hình và mô phỏng cho A2–A8 khi viết từng mục | Theo từng mục | chữ |

Đợt UX4–UX6 chỉ bắt đầu khi UX3 đã lên trang.

## 9. Câu hỏi mở cho chủ dự án

1. **Agent mới có tự merge PR code không?** D14 cho Claude tự merge khi CI xanh. Đề xuất cho agent mới: **không tự merge** ở vài PR đầu; chủ dự án (hoặc một phiên Claude) xem rồi merge. Khi đã tin, mở lại D14 cho agent đó.
2. **Đích ghim 12 màn** có hợp không, hay bạn muốn giữ cảm giác "điện ảnh" dài hơn?
3. **Nút `Bỏ qua ↓`** ở cảnh ghim dài: đồng ý không?
