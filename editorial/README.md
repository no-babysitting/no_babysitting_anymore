# editorial/

Chỗ làm bài cho mục Bài viết của No Babysitting: ý tưởng, memo, sổ nguồn, bản nháp. **Chưa có gì ở đây lên site.** Một bài chỉ lên site khi tác giả duyệt, qua một PR riêng (`docs/24-articles-section-plan.md` §6).

Kế hoạch và quyết định: [`docs/24-articles-section-plan.md`](../docs/24-articles-section-plan.md) và `docs/08-kaizen-go-live.md` §1e (D57–D66). Cách làm cho agent: [`CLAUDE.md`](CLAUDE.md). Prompt bàn giao cho phiên viết bài: [`HANDOFF.md`](HANDOFF.md).

Thư mục này nằm trong `.ignore` ở gốc repo, nên Grep từ thư mục cha không thấy nó. Agent làm việc khác không cần đọc.

## Bảng trạng thái (cập nhật 13/11/2026)

Cụm 3 bài đầu, viết theo thứ tự này (D65). Cột "Chủ đề" là số trong danh sách của tác giả.

| # | Bài | Chủ đề | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 01 | 80% system prompt: cái gì thực sự đổi | 6 | `published` | Luận điểm tác giả chọn 14/11/2026; bản nháp đầu của agent, chưa phải giọng tác giả; chờ tác giả đọc và phản biện. Caching chưa kiểm, không vào bài |
| 02 | Memory: tin harness hay tự quản | 5 | `published` | Luận điểm tác giả chọn 14/11/2026 ("nhớ tôi" khác "biết cách làm việc trong repo này"); bản nháp đầu của agent, chưa phải giọng tác giả; chờ tác giả đọc và phản biện. Dòng 12 (phiên nền) đã bỏ |
| 03 | Chọn model và effort | 4 | `published` | Luận điểm tác giả chọn 14/11/2026; agent đã thu hẹp "effort vừa" thành "mặc định của model" sau khi mở docs (cần tác giả xác nhận); bản nháp đầu, chưa phải giọng tác giả. Giá và benchmark không dùng |

Bài lẻ, ngoài cụm (ra khi sẵn sàng, không đổi thứ tự cụm):

| # | Bài | Chủ đề | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 07 | Một người viết, nhiều người đọc (multi-agent coding) | 7 (mới, ngoài sáu chủ đề đầu) | `published` | Issue #57. Nguồn là báo cáo của tác giả; tác giả quyết không mở lại nguồn, ngoại lệ ghi ở `ledger.md` |
| 08 | Một AI agent đáng tin cậy cần những gì (tổng quan) | tổng quan cho cụm bài vận hành agent | `published` | D86, Refs #79. Không có sổ nguồn vì không trích nguồn ngoài; trỏ về 01, 02, 03, 07; từ 21/11/2026 đứng đầu loạt "Giao việc cho AI agent" (D87) |

Bài hướng dẫn đi kèm `problem2outcome` (21/11/2026, soạn dưới chế độ "yolo"; chưa phải giọng tác giả):

| # | Bài | Chủ đề | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 09 | Từ chưa có gì đến việc đầu tiên với problem2outcome | 9 (mới) | `draft` | Theo F-L4-01, F-L5-02, F-L5-04 của đánh giá độc lập PR #4. Có sổ nguồn; ba điều chưa kiểm không vào bài (dòng 11 đến 13). Chưa đăng được trước khi repo `problem2outcome` công khai |

Ý nghĩa của từng trạng thái và ai đặt: [`CLAUDE.md`](CLAUDE.md).

## Sau khi xong cụm 3 bài

Xem lại (D61): quy trình có chạy không, nháp có làm agent chính tốn token không, bài có nói được điều docs chính thức chưa nói không, người đọc phản hồi ra sao. Từ đó quyết định tách repo biên tập, mở rộng nhịp, hay dừng.
