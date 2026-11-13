# Independent Evaluation Council · file trỏ

> **Bản gốc duy nhất** của hiến chương nằm ở repo đánh giá: [`no-babysitting/independance-evaluation-council`](https://github.com/no-babysitting/independance-evaluation-council) (`README.md`). Repo đó **private**; chủ dự án mở cho người cần xem. Nếu file này khác bản gốc thì **bản gốc thắng**. Bản hiến chương cũ ở file này (ghi ChatGPT là người vận hành) nằm trong lịch sử git, commit `4d036fb`.
>
> Quyết định: 13/11/2026, DEC-01…07 trong `decisions.md` của repo đánh giá. Phần dưới đây là **tóm tắt không có hiệu lực**, để người đọc repo này biết hội đồng làm việc thế nào mà không cần mở repo kia.

## Hội đồng là gì

Một chức năng đánh giá và thách thức sản phẩm, tách bạch với quyết định của chủ dự án. **Không** phải một cơ quan có tư cách pháp lý hay nhóm chuyên gia có chứng chỉ; không cấp chứng nhận. Mọi đánh giá là phân tích của AI, có giới hạn thời gian. Chủ dự án giữ quyền quyết định sản phẩm và phát hành.

## Ai làm gì (13/11/2026)

| Vai | Ai |
|---|---|
| Chủ dự án | `taiseixx`: quyết định, duyệt chữ (D13), phản hồi từng phát hiện |
| Người vận hành hội đồng (đánh giá black-box) | Claude, ở một phiên riêng, không dùng chung ngữ cảnh với agent dựng |
| Đối chiếu chéo | Một model khác họ Claude (ví dụ ChatGPT), cho tài liệu do Claude viết và kết luận mức Major trở lên |
| Coding agent chính | Claude Code (phiên dựng) |

ChatGPT từng được ghi là người vận hành; `docs/23` quyết định 6 đã hạ xuống "chỉ tham khảo". Báo cáo đánh giá web (08/11, 13/11) do Claude thực hiện.

**Xung đột lợi ích đã khai báo:** người vận hành cùng họ model với agent dựng và agent viết `docs/14`, `docs/23`; và đánh giá nội dung về sản phẩm của Anthropic bằng tài liệu của Anthropic. Giảm nhẹ bằng đối chiếu chéo, trích nguyên văn nguồn, và ghi "không xác minh được".

## Cách đánh giá

- **Black-box là mặc định:** bên đánh giá chỉ xem bản live và bản brief, **không đọc repo này**, để không bị neo vào cách nghĩ của người làm. **White-box** (có đọc repo) chỉ khi cần, và bằng chứng được gắn nhãn `[WB]`.
- Mức nghiêm trọng: Critical · Major · Minor · Observation · Recommendation.
- Chỉ bên đánh giá đóng một phát hiện, sau khi **phép đo độc lập** (ở repo đánh giá, ngoài quyền ghi của agent) chạy lại trên bản live và qua, và một người đã đọc lại phần sửa.

## Phát hiện nằm ở đâu

- **Issue của repo này**, nhãn `finding`: nội dung đầy đủ, công khai; mỗi issue có các bước tái hiện và tiêu chí nghiệm thu. Issue chỉ được tạo sau khi chủ dự án duyệt danh sách, nên **hiện chưa có issue nào**.
- Phản hồi của chủ dự án (chấp nhận, một phần, từ chối, hoãn) ghi ở comment của issue; quyết định sản phẩm có mã D ở `docs/08-kaizen-go-live.md`.
- Coding agent xử lý bằng PR (`Refs #n`, không `Closes #n`); không đóng phát hiện.
- Phát hiện loại bảo mật không đi qua issue công khai.

## Các đợt đã có

| Đợt | Báo cáo | Tóm tắt phản hồi |
|---|---|---|
| 08/11/2026 | repo đánh giá, `reports/2026-11-08-no-babysitting/` (commit `68d9bb3`) | `docs/12-independent-evaluation-1.md` |
| 13/11/2026 | repo đánh giá, `reports/2026-11-13-v4/` | chưa có |
| 13/11/2026 (WB, quản trị agent) | repo đánh giá, `reports/2026-11-13-agent-governance/` | chưa có |

## Giới hạn

Chưa có thử trên thiết bị thật, trình đọc màn hình thật, Safari/Firefox, hay quan sát người học. Những mục này được ghi "không xác minh được". Nhận định pháp lý (nhãn hiệu, giấy phép, dữ liệu cá nhân) cũng không xác minh được và cần luật sư.

## Tham chiếu từ tài liệu khác

`docs/21`, `docs/22`, `docs/23` trích `review-protocol.md` §6 (độc lập, xung đột) và §10 (phụ lục sản phẩm học tập). Hai mục này giữ nguyên số trong bản gốc. `docs/21` §2 và §9 còn ghi hội đồng (ChatGPT) là cổng đầu tiên, khác `docs/23` quyết định 6: chủ dự án cần chọn một (xem F-013 ở repo đánh giá).
