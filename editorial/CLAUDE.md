# editorial/ · chỉ đọc khi làm việc với Bài viết

Thư mục này chứa ý tưởng, memo, sổ nguồn và bản nháp của mục Bài viết. **Nội dung ở đây chưa lên site.** Nếu việc của bạn không phải viết, kiểm chứng hoặc đăng một bài, đừng đọc thêm file nào trong thư mục này.

## Hai luật không có ngoại lệ

1. Không đưa gì từ đây vào `site/` khi bài chưa có `status: approved` do tác giả đặt. Đăng bài theo `docs/24-articles-section-plan.md` §6.
2. Không bịa, không lan truyền số chưa kiểm chứng. Memo trong `articles/00-cluster/raw/` là lời của công cụ khác (Perplexity, ChatGPT), mặc định là UNVERIFIED. Số và khẳng định chỉ vào bài khi đã có dòng trong `ledger.md` của bài, có nhãn và nguồn đã mở.

## Cách làm cùng tác giả

Tác giả là chủ dự án (biệt danh taiseixx, viết tiếng Việt). Quan điểm trong bài là của tác giả. Bạn là người cùng nghĩ, phản biện và biên tập.

- Trước khi viết, làm blind spot pass trên brief và memo. Điều gì còn mơ hồ mà câu trả lời đổi cấu trúc bài thì hỏi tác giả từng câu một, kèm đề xuất của bạn. Điều nhỏ thì tự quyết và ghi lại.
- Thứ tự: 1 rút luận điểm · 2 phản biện (giả định ẩn, góc nhìn ngược) · 3 dựng mạch · 4 giữ giọng tác giả · 5 rà biên tập (đúng, sâu, mạch lạc) · 6 bản sẵn đăng.
- Với mỗi bài, hỏi: điều gì ở đây không có trong docs và blog chính thức? Nếu không có thì bài chỉ là bản tóm tắt; nói thẳng với tác giả.
- Làm memo trước, chưa viết bài trơn tru, để bài không che mất chỗ chưa chắc.

## Nhãn trong sổ nguồn (`ledger.md`)

`VERIFIED` đã mở nguồn gốc, đối chiếu được · `VENDOR CLAIM` hãng tự công bố, ghi điều kiện · `INFERENCE` suy luận, không trình bày như thứ đã công bố · `UNVERIFIED` chưa xác nhận được · `MEASURED` tự đo, có cấu hình và log.

Mỗi dòng ghi nguồn, ngày mở (dd/mm/yyyy), và model hoặc bề mặt nếu liên quan.

## Giọng và chữ

Đọc `docs/16-writing-guide.md` trước khi viết câu đầu, gồm §10 (Bài viết xưng "tôi"). Số hay đổi luôn kèm ngày thu thập (D63). Bài không ghi cách bài được làm (D64).

## Trục

Trục là Claude. OpenAI và Gemini chỉ để đối chiếu ngắn, kèm nguồn của chính hãng đó (D58).

## Cấu trúc và trạng thái

```text
editorial/
├─ README.md                  bảng trạng thái các bài
├─ HANDOFF.md                 prompt cho phiên viết bài
├─ _templates/                brief.md, ledger.md
└─ articles/
   ├─ 00-cluster/             brief chung của cụm 3 bài + raw/ (memo nguyên văn, chưa kiểm chứng)
   └─ NN-slug/                brief.md · ledger.md · draft.md · review/
```

Trạng thái nằm ở `status` trong frontmatter của `brief.md`: `idea` → `memo` → `ledger` → `draft` → `review` → `approved` → `published`. Chỉ tác giả đặt `approved`.
