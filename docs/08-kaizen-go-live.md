# 08 · Kế hoạch kaizen tới go live (07/11/2026)

> Viết sau khi đối chiếu bản review của ChatGPT (*NO BABYSITTING — Product, Design & Engineering Context*) với site thật, rồi hỏi chủ dự án 4 vòng. Khi tài liệu này khác PRD 2.2, **tài liệu này đúng**; PRD được sửa dần cho khớp. Kịch bản chuyển động ở `09-motion-script.md`.

## 0. Mục tiêu

Đưa No Babysitting lên mạng cho mọi người: miễn phí, không cần đăng nhập, ra mắt **ngay** dưới dạng beta, rồi cải tiến theo từng đợt nhỏ có đo lường. Thước đo cuối cùng lấy từ §10 của bản review: người xem giao việc số cho agent tốt hơn, chứ không chỉ viết prompt hay hơn.

## 1. Quyết định đã chốt (07/11/2026)

| # | Chủ đề | Quyết định | Thay cho |
|---|---|---|---|
| D1 | Ngôn ngữ | Tiếng Việt trước, kiến trúc sẵn i18n; bản tiếng Anh là một đợt sau | giữ như PRD |
| D2 | Câu mô tả | *An unofficial, practical guide to delegating digital work to Claude Code* | *An unofficial guide to Claude Code best practices* |
| D3 | Kịch bản Story | **Khái quát hơn**, theo hướng bản review: giao việc số nói chung (nghiên cứu, dữ liệu, marketing, sáng tạo, dựng sản phẩm, vận hành), không xoay quanh một kịch bản | "Một kịch bản chung: Báo cáo thị trường hằng tuần" (PRD §5, §11) |
| D4 | Kiến trúc nội dung | **Đã chốt 07/11/2026** theo `10-script-v3-proposal.md`: trục 3 câu hỏi; giữ 12 phần và mã chương; ví dụ xoay vòng qua 6 loại việc; 5 trụ làm chiều lọc chính của Library, thay cho P1–P12 | "nguyên lý P1–P12" chưa từng được định nghĩa |
| D5 | Xương sống trang chủ | Vòng giao việc 7 bước, người xem chọn loại việc. ASCII đi từ số (brief) → địa hình (khám phá) → full-color (bàn giao) | logo → tuyên ngôn → đồng xu → hành trình → bàn làm việc → finale |
| D6 | Số chương khổng lồ | Vẫn tràn mép có chủ ý, nhưng là lớp trang trí tách khỏi luồng chữ và **không bao giờ đè chữ**. Bỏ cú phóng ×3,4 | phóng ×3,4 khi rời opener |
| D7 | Màu | **Giữ palette cam** (quyết định của chủ dự án), thêm disclaimer rõ ở hero và chân mọi trang. Rủi ro ở §6 | todo P0 #5 "đổi accent nếu công khai" |
| D8 | Tầng nền | Chỉ hero và finale "thở" rất chậm. Mọi canvas khác đứng yên khi người xem không cuộn. Tất cả dừng khi ra khỏi màn hình, khi tab ẩn, hoặc khi tắt Motion | mọi canvas nhấp nháy 30 lần/giây |
| D9 | Phạm vi beta | Trang chủ mới. Các phần khác hiện đúng trạng thái ("đang viết") | đủ 12 chương, Library, Presenter rồi mới ra mắt (PRD §12) |
| D10 | Hosting | GitHub Pages, deploy tự động khi merge vào `main`; domain riêng làm sau | câu hỏi mở ở PRD §13.1–2 |
| D11 | Đo lường | Analytics không cookie (GoatCounter) + nút phản hồi ở mỗi trang | "mặc định không tracking" (PRD §7) |
| D12 | Giấy phép | Code MIT, nội dung CC BY-NC-SA 4.0; giữ ghi công MIT của repo nguồn | chưa có |
| D13 | Nội dung | Claude viết từ nguồn chính thức và repo; một agent reviewer độc lập đối chiếu từng khẳng định; **chủ dự án duyệt trước khi lên site** | — |
| D14 | Phát hành | Claude tự merge vào `main` khi kiểm tra tự động đạt. Với nội dung mới thì phải có thêm duyệt của D13 | — |
| D15 | Bắt đầu | Làm song song: nền tảng (K0) và nghiên cứu cho kịch bản v3 (K1) | — |
| D16 | Mốc beta | **Ngay bây giờ**: K0 lên site trong phiên này | M5, tuần 12–13 |
| D17 | Tác giả (08/11) | Trang nêu **biệt danh + GitHub** của người duy trì, kèm ngày kiểm chứng và cách báo sai. Không nêu tên thật | "sẽ nêu tên" (nói với bên đánh giá độc lập) |
| D18 | Màu nhấn (08/11) | **Giữ nguyên** cam `#d97a4a`, không thêm nhãn cố định. Chấp nhận rủi ro nhầm thương hiệu; disclaimer vẫn ở hero, ảnh chia sẻ và chân trang. Nên có ý kiến luật sư trước khi đăng rộng | đề xuất đổi sắc hoặc thêm nhãn của bên đánh giá (M2) |
| D19 | Cửa vào (08/11) | Soft launch ngay sau khi sửa cửa vào: hai nút CTA trỏ về chương có thật, ghi "c03, c07 đang viết", thêm đoạn tóm tắt ngắn trên trang chủ. c03 và c07 viết sau | cổng "c03, c07 phải xong" chỉ áp dụng cho đăng rộng |
| D20 | Kiểm thử thật (08/11) | **Chưa làm**: thiết bị thật (đã có iPhone Safari của chủ dự án), trình đọc màn hình, 5 buổi quan sát. Rủi ro chấp nhận cho soft launch; **không đăng rộng** cho tới khi làm | cổng đăng rộng của bên đánh giá |
| D21 | Icon menu (08/11) | Chủ dự án xác nhận: nút menu là icon hamburger khi đóng, X khi mở; hình xe đẩy gạch chéo chỉ là tranh ASCII bên trong menu | "phần phác thảo có hai cách hiểu" (CHANGELOG, đợt B) |

## 1b. Quyết định cho kịch bản v4 (phiên hỏi đáp 08/11/2026)

Hỏi theo ba vòng: 5 câu tổng quan, 15 câu chi tiết, 4 câu bổ sung. Chi tiết và chữ cụ thể ở `14-content-script-v4.md` (nội dung), `15-typography-motion-v4.md` (chữ và hiệu ứng), `16-writing-guide.md` (văn phong), `17-handoff-prompt.md` (prompt giao việc). Câu chữ trên site vẫn duyệt ở từng PR (D13).

| # | Chủ đề | Quyết định | Thay cho |
|---|---|---|---|
| D22 | Ý định | Học xong, người đọc tự giao trọn được một việc cho Claude mà không phải trông. Câu đỉnh: *Thôi cầm tay chỉ việc: cùng Claude làm rõ việc, rồi giao trọn cho nó.* | trục 3 câu hỏi (D4) |
| D23 | Xương sống | Theo vòng đời một việc giao: Trước, Trong, Sau. **5 phần**: 00 Mở đầu · 01 Tìm điều chưa biết · 02 Giao việc · 03 Để nó làm · 04 No Babysitting. Mỗi chặng mang một cặp shift | 12 phần v3 cho lộ trình chính (D4) |
| D24 | Nội dung chính | **Six shifts** (Thariq, 24/07/2026), với phương pháp của bài *Finding your unknowns* (06/07/2026) và trang Best practices | điểm 5 ở §8 của v3: "c10 dùng bảng 7 dòng thay cho six shifts" |
| D25 | 12 phần v3 | Thành phần **Nâng cao**, gộp lại còn 8 mục, viết sau. Đợt này chỉ có dàn ý. c02 giữ nguyên làm mục A1. Trang khung chưa viết thì gỡ khỏi menu | giữ 12 phần trên lộ trình chính |
| D26 | Đối tượng | Một lõi chung + **5 kính**: Dev & engineer · BA & PM · Designer & sáng tạo · Marketing & sales · Quản lý & vận hành. Mặc định là Chung. Kính chỉ đổi ví dụ và prompt mang đi thử | "không cá nhân hoá theo vai" (PRD) |
| D27 | Chọn kính | Chỉ chọn trong khối ví dụ, ở lần đầu gặp khối kính; đổi bằng nút trên header. Trang chủ không hỏi | — |
| D28 | Câu chuyện chung | Một studio nhỏ ra mắt khoá học online (hư cấu). Mỗi kính là phần việc của một vai trong đó | 6 loại việc xoay vòng (D3) |
| D29 | Bề mặt | Claude Code là chính; ghi chú khi bề mặt khác. Kỹ thuật dùng được ở mọi nơi thì gắn nhãn | 3 tab bề mặt ở mọi khối |
| D30 | Khuôn chương | **3 hồi gọn**: Hook → Lõi → Kết, 4–6 phút, có ASCII art và mascot. Bỏ nhịp Đoán và nhịp tự kiểm | vòng 6 nhịp Hỏi → Đoán → Thấy → Hiểu → Làm → Nhớ |
| D31 | Kết chương | Câu chốt + 1 prompt mang đi thử (đổi theo kính) + nút sang phần sau. Không có quiz | GrillCard |
| D32 | Giọng | Gọi người đọc là "bạn", người kể không xưng | — |
| D33 | Tiếng Anh | Giữ tên riêng và vài từ dân nghề vẫn nói; lần đầu in nghiêng kèm giải nghĩa. Six shifts: tên Việt làm tiêu đề, tên gốc ở dưới | — |
| D34 | Trang chủ | Hero → Kim tự tháp (trên nền mặt nước) → Lộ trình 5 phần → Finale. **Bỏ** Hai lần tung đồng xu và Vòng giao việc 7 bước; bỏ 6 loại việc (viết lại sau) | D5 |
| D35 | Hero | Câu lớn của chủ dự án: *Claude khôn hơn rồi, sao bạn vẫn phải trông trẻ?* Dòng nhỏ phía trên: *Từ vibe đến agentic.* Thêm một dòng trả lời. Dòng thông tin: thời lượng, số phần, không cần biết code, miễn phí, có ví dụ theo nghề | *Từ vibe đến agentic.* làm câu lớn |
| D36 | Golden word | Gạch chân tự vẽ; chữ cam trong lúc đang được đọc rồi về màu chữ. Tối đa 5 mỗi phần. Đúng D18 | — |
| D37 | Mascot | The Colleague thường trực bên lề (desktop), nằm trong header (điện thoại). Nói bằng câu hỏi và nhật ký, thêm vài câu vui. Vẫn cấm hình con vật hay khối pixel | "không có lời thoại riêng" (DS §3.5) |
| D38 | Art mở chương | Mỗi phần một hình ASCII. Hình chạy ngay khi mở trang, không chờ cuộn, rồi thở nhẹ. Màu theo cảnh hoàng hôn ở Finale | số chương khổng lồ + nền địa hình |
| D39 | Điểm dừng | 3 điểm mỗi phần: hook, thẻ Then → Now chính, câu chốt | — |
| D40 | Hiệu ứng chữ | Giữ M1–M14, thêm M15 (Hồi đó rã thành Bây giờ), M16 (gạch chân tự vẽ), M17 (gõ prompt) | "không có chuyển động ngoài M1–M14" |
| D41 | Phần "thấy" | Chưa làm mô phỏng mới; mỗi phần ghi chỗ chờ. Mô phỏng tinh chỉnh sau khi chữ đã chốt | 11 simulator (PRD) |
| D42 | Đầu ra đợt này | Dàn ý toàn bộ, chữ hoàn chỉnh cho trang chủ và chương 01 (bài mẫu), đặc tả typography và hiệu ứng, văn phong, prompt giao cho coding agent | — |

## 1c. Quyết định bổ sung (08/11/2026, sau khi duyệt v4)

| # | Chủ đề | Quyết định | Thay cho |
|---|---|---|---|
| D43 | Một lần giao việc | **Giữ trên trang chủ**, sau kim tự tháp. Thêm 3 nhóm việc: Thiết kế · Bán hàng & khách hàng · Phân tích & yêu cầu (tổng 9) | D34 (bỏ Vòng giao việc và 6 loại việc) |
| D44 | Kính | Kính theo **nhóm việc** của "Một lần giao việc": Chung + 9 nhóm. Bộ chọn nhóm việc ở trang chủ dùng chung trạng thái với kính | D26 (5 kính theo vai), một phần D27 |
| D45 | Nhập môn: vị trí | Track riêng, viết ngay sau six shifts; cửa vào từ hero; menu ba nhóm Nhập môn · Lộ trình chính · Nâng cao | — |
| D46 | Giả lập grill me | Chỗ nào nhắc tới grill me / phỏng vấn / quiz thì có thẻ câu 1/3: câu hỏi, 3 lựa chọn, đề xuất ngắn, vì sao hỏi trước (`15` §11) | — |
| D47 | Nhập môn: người đọc | Đã chat với AI, chưa từng setup | — |
| D48 | Nhập môn: bề mặt | Hai tab song song: Claude app (Projects) và Claude Code | — |
| D49 | Nhập môn: khuôn | 3 hồi gọn; Kết là một việc làm thật có checklist | — |
| D50 | Nhập môn: độ sâu | Đồ nghề kỹ thuật: là gì, để làm gì, khi nào cần, prompt nhờ Claude tự cài | — |
| D51 | Nhập môn và Nâng cao | Nhập môn nói "là gì"; Nâng cao làm sâu; link `Đào sâu →` | — |
| D52 | Gu và design system | Một bài chung cho mọi vai + mục Nâng cao A9 về design system UI/UX | — |
| D53 | Nhập môn: xong là | Người đọc có một dự án thật đã setup (hướng dẫn, prompt đầu tiên có grill me, artifact) rồi vào six shifts | — |
| D54 | Nhập môn: chủ đề thêm | Deep research (Claude app) và dynamic workflows (Claude Code); gói, giới hạn, chi phí; kiểm lại đầu ra của AI; chọn đúng sản phẩm | — |

Outline: `18-intro-track-plan.md`.

## 1d. Quyết định ngày 09/11/2026

| # | Chủ đề | Quyết định | Thay cho |
|---|---|---|---|
| D55 | Khoá ASCII art | Art đã duyệt (logo hero, mặt nước, thành phố ở finale, tranh trong menu, Spark, mặt mascot) được khoá bằng `site/scripts/art-check.cjs` + `design-system/art-lock.json`, chạy trong CI. PR đổi `art-lock.json` cần chủ dự án duyệt, như D13 (`19` §2) | — |
| D56 | Kaizen UI/UX | Nhận xét *ASCII & Motion Design Direction* (ChatGPT, 09/11) được đối chiếu và chuyển thành các đợt UX0–UX6 (`19-uiux-kaizen-plan.md`). Prompt cho coding agent mới (DeepSeek v4.1 Flash): `20-handoff-prompt-deepseek.md`. *Đề xuất, chờ chủ dự án duyệt* | — |

## 2. Quan sát site ngày 07/11/2026

Đo trên bản build bằng Chromium headless, ở 1440×900 và ở chế độ giả lập iPhone 13 Pro Max (428×926). Số CPU chỉ mang tính tương đối (đo trên máy container), dùng để so trước và sau mỗi đợt.

| Nhận xét của bản review | Quan sát | Bằng chứng |
|---|---|---|
| 7.1 Nền ASCII quá dày | **Đúng** ở hero (nhiễu phủ đều toàn màn, cùng độ tương phản, ngay sau dòng chữ) và finale (câu kêu gọi nằm trên thành phố ký tự, chỉ đỡ bằng `text-shadow`). Ở Journey, chữ ghost của các panel chồng lên nhau. Manifesto thì ổn | ảnh hero lúc vào trang, finale cuối cảnh, Journey |
| 7.2 Thiếu khoảng thở | **Một phần.** Các cảnh pin vừa đúng một màn hình, nhưng bên trong bị dồn: thẻ đồng xu chữ 12,5px trên phone. Ngược lại, cảnh đồng xu lúc mới vào chỉ là hai cột rỗng | |
| 7.3 Chuyển động cứng | **Đúng** ở S1 (c02): số nhảy theo `steps(10)`, chữ giải thích và nhật ký đổi tức thì, một lần cuộn bấm nhiều nút cùng lúc | `ContextMeter.astro`, `c02/index.astro` |
| 7.4 Số lớn bị cắt, lấn tiêu đề | **Đúng về cảm nhận.** Số tràn đáy là chủ ý, nhưng khi rời opener số phóng ×3,4 thành mảng xám che tên chương. Ở Journey, số ASCII cam lấn át tên chương | |
| 7.5 Hiệu năng canvas | **Đúng, và nặng hơn dự đoán.** Đứng yên mà vẫn vẽ lại toàn bộ canvas 30 lần/giây: cờ `ambient` đặt `dirty` ở mỗi tick và renderer vẽ lại mọi ô. Desktop: đầu trang 38% luồng chính (83k `drawImage`/giây), finale 44% (thêm 120k `fillText`/giây), manifesto 27%. Phone: 22%, 21%, 9%. Ngân sách của chính hệ là ≤ 4 ms/frame (khoảng 12%). Lưới hero trên phone khoảng 6.100 ô, vượt trần 4.000 | `observe.js` |
| 7.5 Reduced motion | Nội dung đầy đủ, không chữ nào bị ẩn. Nhưng cảnh bàn làm việc đứng ở trạng thái đầu (0/4) thay vì trạng thái cuối. Không có nút Motion trong trang (FR-09), nên chuyển động nền kéo dài hơn 5 giây mà không dừng được (WCAG 2.2.2) | |
| 5.3 Lenis + ScrollTrigger | Đúng chuẩn: `lenis.on('scroll', ScrollTrigger.update)`, một ticker, `lagSmoothing(0)` | `motion.ts` |
| 5.2 Dọn dẹp | Site là MPA nên không rò listener giữa các trang. Nhưng chưa có tiện ích dùng chung: mỗi cảnh tự `start()` và tự kiểm reduced motion (12 chỗ) | |
| 8 Content integrity | Trang chủ hứa "11 simulator", "350+ mục Library có nguồn", "118 phút", nhưng mới có 1 simulator (S1), 14 mục mẫu, và 11/12 chương mới là khung trích từ kịch bản | `index.astro` |
| 9 Câu "80%" | Đã đúng phạm vi: nói về system prompt của Claude Code, có trích nguyên văn; không chỗ nào khuyên cắt 80% CLAUDE.md | `chapters.json`, c10 |
| 1.2 Đối tượng | Đã đa vai trò (PRD §3); đã nói Claude Code không chỉ để code; 3 tab Cowork / Claude Code app / CLI tách bạch. Nhưng mọi chương xoay quanh một kịch bản báo cáo tuần → D3 | |

## 3. Quy tắc làm việc

- **Mỗi đợt là một thay đổi đo được.** Ghi thước đo trước khi làm, đo trước và sau, rồi ghi vào `CHANGELOG.md`.
- **Phát hành.** Code, chuyển động, hạ tầng: Claude tự merge khi kiểm tra đạt (D14). Nội dung mới (kịch bản, chương, mô tả loại việc, câu chữ trang chủ): chủ dự án duyệt trước khi merge (D13).
- **Kiểm tra tự động trước khi merge** (`site/scripts/check.mjs`, chạy cả local lẫn trong CI):
  - build xanh;
  - 0 lỗi JS;
  - không cuộn ngang ở 1440px và 390px;
  - không chữ nào bị ẩn khi reduced motion;
  - CPU lúc đứng yên dưới ngân sách (`09-motion-script.md` §5);
  - typography đạt luật lỗi của `design-system/type-rules.json` (`site/scripts/type-check.cjs`, giải thích ở `11-typography.md`): tương phản, cỡ chữ tối thiểu, dấu tiếng Việt không chạm nhau, giãn chữ WCAG 1.4.12, phóng to 200%.
- **Không đoán.** Mọi khẳng định về Claude Code phải có nguồn bấm được và ngày kiểm chứng. Phân biệt rõ cái có sẵn (native) với cái cần connector, MCP, plugin, CLI ngoài, hoặc một sản phẩm khác (Cowork).

## 4. Các đợt

| Đợt | Nội dung | Xong khi | Phụ thuộc |
|---|---|---|---|
| **K0 · Beta ngay** | Renderer yên và nhẹ (D8), có vùng yên quanh chữ; finale có nền đỡ chữ; Journey bỏ chữ ghost; opener bỏ phóng ×3,4 (D6); nút Motion; trạng thái cuối khi reduced motion; số đếm đúng thực tế; câu mô tả D2; disclaimer và chân trang; nút phản hồi và móc GoatCounter; giấy phép D12; base path, 404, favicon, meta/OG; workflow deploy và kiểm tra | Site chạy trên GitHub Pages; CPU lúc đứng yên giảm ít nhất 3 lần | Chủ dự án bật Pages một lần |
| **K1 · Nguồn và kịch bản v3** | Đọc docs chính thức, blog engineering và repo best practice; lập bảng khẳng định → nguồn; đề xuất kịch bản khái quát (D3, D4): 3 câu hỏi cốt lõi, các trụ nội dung, danh sách chương; dữ liệu 6 loại việc cho vòng giao việc (mỗi loại 7 bước, ghi rõ native hay cần tích hợp) | Reviewer đối chiếu xong; chủ dự án duyệt | — |
| **K2 · Trang chủ mới** | Vòng giao việc 7 bước có chọn loại việc (D5), 3 câu hỏi, hành trình, finale, theo `09-motion-script.md` | Kiểm tra đạt; chủ dự án duyệt câu chữ | K1 |
| **K3 · Library thật** | Ingest repo và docs theo đơn vị bài viết; trục lọc theo K1; thêm loại "Quy trình" gồm 8 phần | Mọi mục có nguồn, ngày kiểm chứng, nhãn độ bền | K1 |
| **K4 · Chương** | Mở đầu và các chương theo kịch bản v3, mỗi đợt 1–2 chương có simulator; viết lại S1 cho chuyển động mềm (`09` §4) | Mỗi chương đạt DoD (SAD §9.1) và được duyệt | K1 |
| **K5 · Quy trình theo nghề** | 6 quy trình 8 phần, kèm template | Được duyệt | K1, K3 |
| **K6 · Mở rộng** | Presenter mode, bản tiếng Anh, domain riêng | | |

Có những việc làm liên tục chứ không thành đợt:
- mỗi tuần xem analytics và phản hồi, chọn ra một việc kaizen;
- kiểm chứng lại các mục quá 30 ngày;
- mỗi tháng rà docs và blog chính thức.

## 5. Thước đo

| Câu hỏi thành công (bản review §10) | Tín hiệu đo được |
|---|---|
| Người không phải dev có hiểu Claude Code làm được gì? | Tỷ lệ người chọn ít nhất một loại việc ở vòng giao việc; tỷ lệ cuộn tới bước 7; phản hồi "có ích" ở trang chủ |
| Có biết việc nào giao được? | Lượt mở quy trình theo nghề; số lần tìm trong Library không ra kết quả (để bổ sung) |
| Có biết cấp context mà không bó chặt agent? | Tỷ lệ hoàn thành chương context và brief; kết quả Re-test |
| Có dựng được quy trình lặp lại? | Lượt sao chép template |
| Có biết kiểm chứng và đặt quyền? | Tỷ lệ hoàn thành chương kiểm chứng và rào chắn |
| Hình ảnh có làm khái niệm dễ hiểu hơn? | Phản hồi theo trang; thời gian ở từng cảnh |
| Kiến thức có chính xác, dễ bảo trì? | Tuổi trung bình của `verifiedAt`; số link chết |
| Kỹ thuật | CPU lúc đứng yên; Lighthouse mobile: Perf ≥ 90, A11y = 100, CLS < 0,05 |

GoatCounter không dùng cookie và không lưu IP. **Đã bật từ 07/11/2026**, mã site `taisei` (`site/src/config.ts`); bảng số liệu ở https://taisei.goatcounter.com. Mỗi trang gửi sự kiện phản hồi `feedback-yes/<đường dẫn>` hoặc `feedback-no/<đường dẫn>`.

## 6. Rủi ro

| Rủi ro | Giảm thiểu |
|---|---|
| Palette cam và logo khối gần với nhận diện Claude/Claude Code (giữ theo D7) | Disclaimer ở hero và chân mọi trang: dự án độc lập, không liên kết với Anthropic; Claude và Claude Code là thương hiệu của Anthropic. Không dùng logo, mascot hay ảnh UI của Anthropic. Nếu có phản hồi nhầm đây là trang chính thức thì mở lại D7 |
| Bản beta mỏng nội dung | Nói thật trạng thái ở mọi chỗ; đợt ngắn; changelog công khai |
| Nội dung sai hoặc lỗi thời | Reviewer độc lập và bước duyệt (D13); `verifiedAt`; nguồn bấm được |
| Tự merge làm hỏng site | Kiểm tra tự động là bắt buộc; chỉ deploy từ `main`; revert một commit là quay lại được |
| Phạm vi phình ra khi khái quát hoá (D3) | Kịch bản v3 giữ tổng thời lượng và số simulator không vượt bản 2.2, trừ khi được duyệt |
