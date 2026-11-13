# editorial/ · chỉ đọc khi làm việc với Bài viết

Chỗ cho ý tưởng, memo, sổ nguồn và bản nháp của mục Bài viết. **Nội dung ở đây chưa lên site.** Việc của bạn không phải viết, kiểm chứng hoặc đăng một bài thì đừng đọc thêm file nào ở đây.

## Luật đã có, đọc ở chỗ gốc (đừng chép lại)

- Quyết định của mục này (trục Claude, giọng, chuẩn kiểm chứng, minh bạch, đăng bài): `docs/08-kaizen-go-live.md` §1e, D57–D66.
- Vai, quyền merge, duyệt chữ mới (gồm bản ghi duyệt và việc đối chiếu nguồn), không bịa số liệu: `AGENTS.md` §1–§3, §8, §9. Áp dụng nguyên cho bài viết.
- Giọng và chữ: `docs/16-writing-guide.md`. §1 có ngoại lệ xưng "tôi" cho Bài viết.
- Nguồn và ngày: `docs/06-sources-and-links.md` §1, mục 8 là chuẩn nhẹ cho Bài viết.

## Điều riêng của thư mục này

1. Không đưa gì sang `site/` khi bài chưa `status: approved`. Đăng bài theo `docs/24-articles-section-plan.md` §6.
2. Memo trong `articles/00-cluster/raw/` là lời của công cụ khác, mặc định `UNVERIFIED`. Chỉ đi vào bài qua `ledger.md`.
3. Sáu bước với tác giả: rút luận điểm · phản biện (giả định ẩn, góc nhìn ngược) · dựng mạch · giữ giọng tác giả · rà biên tập (đúng, sâu, mạch lạc) · bản sẵn đăng.
4. Với mỗi bài hỏi: điều gì ở đây không có trong docs và blog chính thức? Nếu không có thì bài chỉ là bản tóm tắt; nói thẳng với tác giả.
5. Làm memo trước, chưa viết bài trơn tru che mất chỗ chưa chắc.
6. Trước khi viết, làm blind spot pass trên brief và memo. Điều còn mơ hồ mà câu trả lời đổi cấu trúc bài thì hỏi tác giả từng câu một, kèm đề xuất của bạn; điều nhỏ thì tự quyết và ghi lại.

## Sổ nguồn (`ledger.md`, mẫu ở `_templates/`)

Nhãn: `VERIFIED` đã mở nguồn gốc, đối chiếu được · `VENDOR CLAIM` hãng tự công bố, ghi điều kiện · `INFERENCE` suy luận, không trình bày như thứ đã công bố · `UNVERIFIED` chưa xác nhận được · `MEASURED` tự đo, có cấu hình và log.

Vào bài như dữ kiện: `VERIFIED`, `VENDOR CLAIM` (nói rõ hãng công bố), `MEASURED`. `INFERENCE` vào bài chỉ khi bài nói rõ đó là suy luận. `UNVERIFIED` không vào bài.

Cột "Mở ngày" là `verifiedAt` của `docs/06`. `verifiedAt` của cả bài là ngày gần nhất trong cột đó, dạng `YYYY-MM-DD`.

## Trạng thái bài

Ở `status` trong frontmatter của `brief.md`: `idea` ý tưởng thô · `memo` có memo, chưa kiểm · `ledger` sổ nguồn đủ cho một bản nháp · `draft` có bản nháp · `review` đang rà biên tập · `approved` tác giả duyệt chữ (**chỉ tác giả đặt**) · `published` PR đăng bài đã merge.

Ba cổng, không gộp: chất lượng (sổ nguồn, rà biên tập), quyền (`approved`), đăng (PR và merge).

## Cấu trúc

```text
editorial/
├─ README.md                  bảng trạng thái các bài
├─ HANDOFF.md                 prompt cho phiên viết bài
├─ _templates/                brief.md, ledger.md
└─ articles/
   ├─ 00-cluster/             brief chung của cụm + raw/ (memo nguyên văn, chưa kiểm chứng)
   └─ NN-slug/                brief.md · ledger.md · draft.md · review/
```
