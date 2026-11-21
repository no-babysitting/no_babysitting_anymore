---
status: draft
topic: 9 (mới: bài hướng dẫn đi kèm problem2outcome)
order: 6
slug: bat-dau-problem2outcome
working_title: Từ chưa có gì đến việc đầu tiên với problem2outcome
verifiedAt: 2026-11-21
---

# Từ chưa có gì đến việc đầu tiên với problem2outcome

Bài hướng dẫn bằng lời thường, theo hai kết luận của đánh giá độc lập về PR #4 của `problem2outcome` (F-L4-01, F-L5-02, F-L5-04): người đọc mới chưa có Claude Code hay Codex; lời hứa "mọi thứ agent nhớ nằm trong `me.md` và `tasks/`" quá tay; Codex chưa được thử.

Soạn ngày 21/11/2026 dưới chế độ "yolo" của chủ dự án (agent tự quyết, ghi lại). **Chưa phải giọng tác giả, chưa ai duyệt, chưa lên site.** Chỉ tác giả đặt `approved`.

## Luận điểm (tác giả duyệt)

Rào cản đầu tiên của người không rành kỹ thuật là chính công cụ chứ không phải phương pháp. Bài đi từ "chưa có gì" tới "việc đầu tiên, có tiêu chí xong", nói thật điều chưa chắc: Codex chưa thử, lịch sử của công cụ nằm ngoài thư mục.

## Người đọc, và việc họ làm được sau bài

Người đi làm không viết code, chưa cài Claude Code hay Codex. Sau bài họ cài được một trong hai, mở đúng thư mục, và biết `problem2outcome` chỉ ghi gì vào thư mục, còn công cụ giữ gì ở ngoài.

## Trong repo đã có gì (đừng dạy lại)

- README của `problem2outcome` có ba bước bắt đầu; bài này mở rộng bước 2.
- Các bài 01 (system prompt), 02 (memory), 03 (model và effort) giải thích khái niệm. Bài này dẫn sang bài 02 cho phần bộ nhớ, không giải thích lại.

## Điều gì bài này nói mà docs và blog chính thức chưa nói

Docs của hai hãng nói cách cài từng công cụ, không nói cho người chưa từng mở terminal đi qua bước nào trước, và không nói gì về việc một phương pháp bên thứ ba chỉ kiểm soát được thư mục của nó. Phần giá trị của bài là hai chỗ đó, cộng lời nói thẳng về Codex. Nếu tác giả thấy chưa đủ, đây là tài liệu hướng dẫn, không phải bài luận; có thể để ở README thay vì Bài viết.

## Cần kiểm chứng trước khi viết

Xem `ledger.md`. Còn thiếu: lệnh cài Codex cho Windows, npm và Homebrew; gói ChatGPT nào dùng được Codex; cách xem hay tắt lịch sử phiên của Claude Code và Codex ở bản đang dùng; cách mở thư mục trong app Claude trên máy tính.

## Trước khi đăng (agent đã chạy thử như một bài thật ngày 21/11/2026)

Thử bằng cách đặt tạm bài vào `site/src/content/articles/` (không commit): build qua; `check.cjs` qua; `type-check` 0 lỗi (chỉ nhóm cảnh báo `measure` như các bài khác); chụp 1440 và 390: bắt được một lỗi là chú thích dùng địa chỉ trần gây cuộn ngang trên điện thoại (`check.cjs` không báo), đã sửa bằng liên kết có tên. Frontmatter gợi ý: `series: "Giao việc cho AI agent"`, `order: 6`, `art: dusk` hoặc một tranh mới, `related: ["00"]`.

Còn chặn đăng:
1. Repo `problem2outcome` phải công khai (bài dẫn người đọc tải thư mục về).
2. Dòng 14 của sổ nguồn: đánh giá độc lập chưa công bố; hoặc công bố, hoặc bỏ câu "trong các lần chạy thử... chưa lần nào nhận kết quả thay họ".
3. Mở lại ba trang docs gốc và so lại lệnh (đã đọc qua công cụ tải trang).
4. Tác giả đọc, sửa giọng và đặt `approved`.

## Đoạn ngắn cho README của `problem2outcome` (để luồng README dán vào khi bài đã đăng)

> **Chưa có Claude Code hay Codex?** Đọc [Từ chưa có gì đến việc đầu tiên](LINK-KHI-BÀI-ĐĂNG): cài, mở đúng thư mục, và điều phương pháp này lưu hay không lưu. Mới thử trên Claude Code; Codex chưa được kiểm.

## Câu hỏi mở cho tác giả

1. ~~Để ở Bài viết hay README?~~ Đã chốt 21/11/2026 (điều phối, yolo): Bài viết; README chỉ có đoạn trỏ sang.
2. Link tới repo `problem2outcome`: repo còn riêng tư, bài giữ `draft` cho tới khi repo công khai.
3. Có cho người đọc lệnh `curl ... | bash` không, hay chỉ dẫn tới trang cài của hãng? (Đề xuất: chép đúng lệnh của hãng kèm dòng nhắc nên đọc trang gốc.)

## Nguồn để bắt đầu (chưa thẩm định)

- https://code.claude.com/docs/en/setup
- https://learn.chatgpt.com/docs/codex/cli (developers.openai.com/codex/cli chuyển về đây)
- https://learn.chatgpt.com/codex/customization/memories
- `findings.md` của đánh giá PR #4 (mục F-L4-01, F-L5-02, F-L5-04)
