# editorial/

Chỗ làm bài cho mục Bài viết của No Babysitting: ý tưởng, memo, sổ nguồn, bản nháp. **Chưa có gì ở đây lên site.** Một bài chỉ lên site khi tác giả duyệt, qua một PR riêng (`docs/24-articles-section-plan.md` §6).

Kế hoạch và quyết định: [`docs/24-articles-section-plan.md`](../docs/24-articles-section-plan.md) và `docs/08-kaizen-go-live.md` §1e (D57–D66). Cách làm cho agent: [`CLAUDE.md`](CLAUDE.md). Prompt bàn giao cho phiên viết bài: [`HANDOFF.md`](HANDOFF.md).

Thư mục này nằm trong `.ignore` ở gốc repo, nên Grep từ thư mục cha không thấy nó. Agent làm việc khác không cần đọc.

## Bảng trạng thái (cập nhật 13/11/2026)

Cụm 3 bài đầu, viết theo thứ tự này (D65). Cột "Chủ đề" là số trong danh sách của tác giả.

| # | Bài | Chủ đề | Trạng thái | Ghi chú |
|---|---|---|---|---|
| 01 | 80% system prompt: cái gì thực sự đổi | 6 | `memo` | Nguồn S1 đã ở trên site; còn URL chuẩn và số liệu kinh tế chưa kiểm |
| 02 | Memory: tin harness hay tự quản | 5 | `ledger` (một phần) | Đã đối chiếu 11 claim về Claude Code với docs ngày 13/11/2026; còn 4 dòng chưa xác nhận |
| 03 | Chọn model và effort | 4 | `memo` | Nhiều số chưa kiểm chứng; mâu thuẫn mức effort mặc định giữa brief và memo |

Ý nghĩa của từng trạng thái và ai đặt: [`CLAUDE.md`](CLAUDE.md).

## Sau khi xong cụm 3 bài

Xem lại (D61): quy trình có chạy không, nháp có làm agent chính tốn token không, bài có nói được điều docs chính thức chưa nói không, người đọc phản hồi ra sao. Từ đó quyết định tách repo biên tập, mở rộng nhịp, hay dừng.
