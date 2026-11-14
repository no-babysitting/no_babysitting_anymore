---
title: "Memory: “nhớ tôi” khác “biết cách làm việc trong repo này”"
description: Chữ memory gom hai việc khác nhau. Bài này tách chúng ra theo tài liệu hiện hành của Claude Code và Claude app, và chỉ ra điều gì tự lưu, điều gì phải do bạn viết.
verifiedAt: 2026-11-14
art: default
related: ['02']
# publishedAt, order and series are filled when the article is published (docs/24 section 6); it is second in the cluster after article 01.
---

Khi nói “Claude có memory không”, người ta gom hai câu hỏi vào một chữ. Câu thứ nhất: Claude có nhớ **tôi** không, tức cách tôi thích làm việc và những lần tôi đã sửa nó? Câu thứ hai: Claude có biết **cách làm việc trong repo này** không, tức lệnh build, quy ước, những chỗ dễ vấp? Tài liệu hiện hành của Claude Code và Claude app trả lời hai câu bằng hai cơ chế khác nhau. Bài này tách chúng ra, theo tài liệu đọc ngày 14/11/2026, và nói điều gì tự lưu, điều gì vẫn phải do bạn viết.

## Trong Claude Code: một file bạn viết, một bộ ghi chú Claude tự lưu

**`CLAUDE.md` là file bạn viết.** Mỗi `CLAUDE.md` nạp lúc khởi động được nạp trọn. `CLAUDE.md` ở thư mục con chỉ nạp khi Claude đọc, ghi hoặc sửa file trong thư mục đó. `AGENTS.md` mặc định chỉ được đọc khi không có `CLAUDE.md` ở thư mục làm việc hoặc phía trên. Tài liệu nói rõ đây là context, không phải cấu hình cưỡng chế: muốn chặn một hành động thì dùng hook hoặc permissions.

**Auto memory là ghi chú Claude tự lưu.** Có bốn loại: `user`, `feedback`, `project`, `reference`. Lúc bắt đầu, Claude nạp phần đầu của `MEMORY.md` (200 dòng đầu hoặc 25 KB đầu, cái nào tới trước); các file chủ đề chỉ được đọc khi cần. Nó nằm trên máy của bạn, theo git repo, và không chia sẻ giữa máy hay môi trường cloud. Nó không được nạp vào subagent, trừ khi subagent được tạo bằng fork.

Điểm đáng chú ý nằm ở một câu của tài liệu: auto memory bỏ qua điều suy ra được từ code (kiến trúc, đường dẫn file, cách sửa lỗi) và điều `CLAUDE.md` đã nói. Nói cách khác, chính tài liệu đã tách hai việc: phần “biết cách làm việc trong repo” không phải là việc của auto memory.

## Trong Claude app: memory theo chủ đề và theo project

Memory của Chat lưu thành từng chủ đề trong lúc bạn trò chuyện, không tóm tắt hội thoại sau khi kết thúc, và mỗi project có memory riêng. Bạn xem, sửa hoặc xoá qua mục Topics, hoặc nhờ Claude ngay trong chat. Xoá một hội thoại không xoá memory sinh ra từ nó.

Với Cowork, tài liệu chia hai trường hợp: khi Cowork chạy trên cloud thì dùng chung memory với Chat; khi chạy trên máy của bạn thì không dùng memory. Có thể tắt memory cho một việc ở Cowork, nhưng phải tắt trước tin nhắn đầu tiên và không đổi lại được. Bài hỗ trợ về memory của Chat không nói gì về việc memory đó có được chia sẻ với Claude Code hay không; hai hệ nằm ở hai chỗ khác nhau.

<aside aria-label="Quan điểm của tôi">

Tôi chia theo loại điều cần nhớ. Điều **“nhớ tôi”** thì tin harness tự lưu, miễn là bạn biết nó lưu ở đâu, xem được và xoá được. Điều **“cách làm việc trong repo này”** thì tự viết ra file của mình, vì auto memory cố ý không giữ nó, và vì `CLAUDE.md` là context chứ không phải luật cưỡng chế. Tài liệu không viết thành hai quy tắc như vậy; đó là cách tôi đọc.

</aside>

## Bài này chưa nói

- Memory của các hãng khác (ChatGPT, Gemini): ngoài trục của mục này.
- Nó nhớ đúng lúc đến đâu, nhớ sai hay nhớ thừa ra sao: bài không đo, và tài liệu không đưa số.
- Một điều tôi bỏ khỏi bài vì không tìm được câu nào nói thẳng: việc auto memory có chạy hay không ở phiên nền. Tài liệu chỉ nói công tắc `/memory` không bật lại được nó ở phiên nền và ở phiên do một phiên Claude Code khác khởi động.

## Nguồn

- [How Claude remembers your project](https://code.claude.com/docs/en/memory), tài liệu Claude Code, mở ngày 13/11/2026.
- [Use Claude’s chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273), trung tâm trợ giúp Claude, mở ngày 14/11/2026.
- [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190), trung tâm trợ giúp Claude, mở ngày 14/11/2026.

---

<!-- Phần dưới đây KHÔNG lên site; xoá khi đăng (docs/24 §6). Bản đồ đoạn → dòng trong ledger.md -->

## Bản đồ khẳng định → sổ nguồn (không đăng)

| Đoạn | Dòng ledger |
|---|---|
| `CLAUDE.md` nạp lúc khởi động trọn; thư mục con nạp khi đọc, ghi, sửa file trong đó | 1 (giới hạn 4 MiB, không nêu trong bài), 9 |
| `AGENTS.md` chỉ đọc khi không có `CLAUDE.md` | 10 |
| Context, không phải cưỡng chế; dùng hook hoặc permissions | 8 |
| Bốn loại auto memory | 2 |
| `MEMORY.md` 200 dòng hoặc 25 KB; file chủ đề đọc khi cần | 1, 7 |
| Lưu trên máy, theo git repo, không chia sẻ giữa máy hay cloud | 5 |
| Không nạp vào subagent trừ fork | 7 |
| Auto memory bỏ qua điều suy ra được từ code và điều `CLAUDE.md` đã nói | 3 |
| Memory của Chat theo chủ đề; project có memory riêng; xem, sửa, xoá | 16, 17 |
| Xoá hội thoại không xoá memory sinh ra từ nó | 17 |
| Cowork trên cloud dùng chung memory với Chat; Cowork trên máy thì không | 13 |
| Tắt memory cho một việc ở Cowork | 18 |
| Bài hỗ trợ không nói về chia sẻ với Claude Code | 19 |
| Callout "Quan điểm của tôi" | Luận điểm do tác giả chọn 14/11/2026; quan điểm, nêu rõ trong bài là cách đọc của tôi |
| "Chưa nói": ChatGPT, Gemini | 14 (UNVERIFIED, không dùng) |
| "Chưa nói": đo nhớ đúng lúc | Không có dòng; là điều bài không làm |
| Auto memory ở phiên nền, đã bỏ | 12 |
