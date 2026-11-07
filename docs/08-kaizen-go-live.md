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
  - CPU lúc đứng yên dưới ngân sách (`09-motion-script.md` §5).
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
