# 20 · Prompt giao cho coding agent (DeepSeek v4.1 Flash): giữ art, kaizen UI/UX, dựng v4 (09/11/2026)

> **Trạng thái (13/11/2026): hết hiệu lực.** DeepSeek v4.1 Flash chưa từng làm việc trên repo này; Claude làm các đợt UX và dựng v4 (chủ dự án xác nhận 13/11). Giữ để tham khảo lịch sử. Còn đúng và đã được `AGENTS.md` giữ lại: khoá art (D55), không nới phép kiểm, khuôn mô tả PR ở §1. "Không tự merge" ở §1 bước 5 không còn áp dụng (D67).

> Chủ dự án dán phần §1 vào phiên đầu tiên của agent, mở trên repo này. §2 giải thích vì sao prompt này chặt hơn prompt cũ (`17-handoff-prompt.md`). Prompt cũ vẫn là nơi gốc của danh sách nguồn (`17` §3) và thứ tự dựng v4 (`17` §1).

## 1. Prompt

```text
Bạn làm tiếp site No Babysitting: repo no-babysitting/no_babysitting_anymore. Site Astro nằm trong site/, design system trong design-system/, tài liệu trong docs/. Trang đang chạy: https://no-babysitting.github.io/no_babysitting_anymore/. Chủ dự án là taiseixx, viết tiếng Việt; hãy trả lời bằng tiếng Việt.

Việc của bạn, theo thứ tự:
1. Giữ nguyên ASCII art đã duyệt. Danh sách và cách kiểm ở docs/19 §2.
2. Làm các đợt kaizen UI/UX ở docs/19 §8, lần lượt UX1 → UX2 → UX3. Không bắt đầu UX4 trở đi khi chủ dự án chưa bảo.
3. Trong đợt UX3, dựng nội dung v4 theo thứ tự ở docs/17 §1 (phần "Thứ tự gợi ý").

Đọc gì, khi nào. Đọc đúng phần cần cho việc đang làm, đừng đọc hết một lượt:
- Trước mọi việc: docs/19 (toàn bộ), docs/08 §1, §1b, §1c (các quyết định D1–D56).
- Khi sửa chuyển động: design-system/motion.md, docs/09.
- Khi sửa chữ hay bố cục: design-system/SOURCE-OF-TRUTH.md, docs/11, docs/13, docs/15.
- Khi viết câu chữ tiếng Việt: docs/16 (toàn bộ), rồi kịch bản ở docs/14.
- Khi cần biết một tính năng của Claude hay Claude Code: chỉ dùng nguồn ở docs/14 §10 và docs/17 §3.
- Code đang chạy là tham chiếu tốt nhất cho cách dự án này làm. Trước khi viết một component mới, mở một component cùng loại và làm giống nó.

Những thứ không được đụng:
- ASCII art bị khoá: logo hero (Intro.astro), mặt nước (#man-cv ở index.astro), thành phố ở Finale.astro, tranh trong menu (Hud.astro), cả file Spark.astro, ảnh trong site/public/art/, NB.FACES và các nguồn NB.sources.terrain, NB.sources.scene, NB.sources.bitmap trong design-system/components/bundle.js. Được sửa chữ HTML nằm cạnh canvas (ví dụ chữ hero theo docs/14 §5), không được sửa cách vẽ.
- design-system/art-lock.json: chỉ đổi khi chủ dự án đã đồng ý đổi art, theo docs/19 §2.
- Màu nhấn, font, logo (D18). Không thêm font, không thêm thư viện chuyển động.

Mỗi thay đổi là một PR nhỏ, làm theo năm bước:
1. Tạo nhánh từ main mới nhất, tên ux/<đợt>-<việc>, ví dụ ux/ux1-motion-purpose.
2. Sửa. Mỗi PR chỉ một việc của docs/19 §8 hoặc một bước của docs/17 §1.
3. Chạy trong site/ (mọi lệnh cần NB_BASE):
   npm ci
   NB_BASE=/no_babysitting_anymore/ npm run build
   NB_BASE=/no_babysitting_anymore/ node scripts/check.cjs
   NB_BASE=/no_babysitting_anymore/ node scripts/type-check.cjs --selftest
   NB_BASE=/no_babysitting_anymore/ node scripts/type-check.cjs
   NB_BASE=/no_babysitting_anymore/ node scripts/design-check.cjs
   NB_BASE=/no_babysitting_anymore/ node scripts/art-check.cjs
   art-check chỉ để báo: nếu nó báo lệch một mảnh art mà bạn không đụng tới, ghi vào PR và đính ảnh art-report; nếu bạn có đụng tới, hoàn lại thay đổi đó. Các bộ còn lại đỏ thì sửa tới khi xanh. Không tắt, không nới, không bỏ qua một phép kiểm để cho xanh. Phép kiểm sai thật thì dừng và báo.
4. Ghi một dòng vào CHANGELOG.md: đổi gì, đo được gì (số trước và sau nếu có).
5. Mở PR (hoặc push nhánh và báo, nếu bạn không mở được PR). Không tự merge. Chủ dự án duyệt và merge.

Nội dung PR, theo đúng khuôn này:
- Đã làm: 3–5 gạch đầu dòng.
- Kết quả bộ kiểm: dán dòng cuối của từng bộ.
- Lệch tài liệu: chỗ nào bạn phải làm khác docs, vì sao. Không có thì ghi "Không".
- Với cảnh tầng C (cảnh ghim, cảnh nổ, mô phỏng): bảng chấm bốn chiều của docs/19 §5, kèm ảnh 1440 và 390.
- Với PR có câu chữ mới: câu chữ trước và sau, và kết quả tự rà theo docs/16 §8.
- Câu hỏi cho chủ dự án, nếu có.

Dừng lại và hỏi chủ dự án khi:
- art-check báo đổi một mảnh art, mà bạn không định đổi art;
- tài liệu nói hai điều trái nhau, hoặc nói khác code đang chạy, và cách hiểu nào cũng đổi cấu trúc trang;
- bạn cần một câu chữ mà docs/14 chưa có;
- bạn cần một thông tin về Claude không có trong nguồn đã liệt kê.
Mỗi lần hỏi một câu, kèm đề xuất của bạn và lý do. Việc nhỏ thì tự quyết rồi ghi vào phần "Lệch tài liệu" của PR.

Hai điều không có ngoại lệ:
- Không bịa. Không thêm con số, tên tính năng hay câu trích nào không có trong nguồn đã liệt kê.
- Câu chữ mới trên site chỉ lên main khi chủ dự án đã duyệt.

Những lỗi hay gặp ở repo này:
- Link nội bộ phải đi qua url() trong site/src/lib/url.ts, vì site chạy dưới /no_babysitting_anymore/.
- Mọi cảnh gọi NB.reduce() để biết có tắt chuyển động không, và khi tắt thì hiện trạng thái cuối.
- Sau khi thêm ScrollTrigger có pin, gọi ScrollTrigger.sort() rồi refresh().
- Chữ tiếng Việt không dùng text-transform: uppercase; chữ in hoa thì gõ sẵn.
- Trong văn xuôi dùng nháy cong “ ” và ‘ ’, không dùng nháy thẳng.
- Màu và cỡ chữ lấy từ token trong design-system/tokens.css, không gõ mã màu mới.
```

## 2. Vì sao prompt này chặt hơn prompt cũ

Prompt cũ (`17`) viết cho Claude theo six shifts: nói mục tiêu, tin agent phán đoán, để chi tiết trong cây tài liệu. Bài six shifts viết cho các model Claude thế hệ 5; nó không hứa điều tương tự cho model khác. Agent lần này là một model khác, chạy nhanh, nên prompt đổi bốn chỗ:

| Đổi | Vì sao |
|---|---|
| **Rào bằng phép kiểm, không chỉ bằng lời.** "Giữ art" thành `art-check.cjs` chạy trong CI (hiện chỉ báo, không chặn); "đừng ghim quá nhiều" thành luật `pins` (đợt UX2) | Một model không phải Claude 5 dễ bỏ sót một câu dặn trong tài liệu dài. Phép kiểm đỏ thì không bỏ sót được |
| **Thứ tự cố định, mỗi PR một việc** | Việc nhỏ dễ kiểm và dễ revert. Chủ dự án duyệt từng bước thay vì một PR lớn |
| **Đọc theo việc**, mỗi việc chỉ vài file | Giữ context gọn; tài liệu của repo đã hơn 4.000 dòng |
| **Khuôn PR cố định và danh sách điểm dừng** | Chủ dự án đọc nhanh; agent biết lúc nào phải hỏi thay vì tự đoán |
| **Không tự merge** | Chưa có lịch sử làm việc với agent này (câu hỏi mở 1 ở `19` §9) |

Những gì giữ từ prompt cũ: mỗi điều nói một lần, không in hoa, không "QUAN TRỌNG"; hai luật không ngoại lệ (không bịa, duyệt chữ); hỏi từng câu một kèm đề xuất; code đang chạy là tham chiếu.

## 3. Cách dùng

1. Merge PR chứa `19` và `20` vào `main`, để agent đọc được.
2. Dán §1 vào phiên đầu tiên. Nếu harness của agent có file hướng dẫn cố định (kiểu `AGENTS.md`), có thể dán §1 vào đó thay vì dán mỗi phiên.
3. Sau mỗi PR, xem trang PR theo khuôn ở §1. Nếu thấy agent lặp một lỗi, thêm lỗi đó vào mục "Những lỗi hay gặp", hoặc tốt hơn, thêm một phép kiểm.
