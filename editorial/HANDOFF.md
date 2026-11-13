# Bàn giao: phiên viết bài cho mục Bài viết (13/11/2026)

> Chủ dự án dán phần §1 vào một phiên Claude Code mới, mở trên repo này. §2 là trạng thái bàn giao. §3 là những bước đầu tiên.

## 1. Prompt

```text
Bạn tiếp quản việc viết cụm 3 bài đầu tiên cho mục Bài viết của No Babysitting (repo no-babysitting/no_babysitting_anymore), cùng tác giả là chủ dự án (biệt danh taiseixx, viết tiếng Việt). Mục Bài viết chưa có trên site. Bản nháp nằm ở editorial/ và không lên site tới khi tác giả duyệt.

Mục tiêu: cùng tác giả đưa ba chủ đề (80% system prompt, memory, model và effort) từ memo thô thành ba bài đáng đăng, theo thứ tự đó. Bài đáng đăng là bài nói được điều docs và blog chính thức chưa nói, bằng quan điểm của chính tác giả, với số liệu có ngày và có nguồn.

Đọc khi cần, theo thứ tự này:
- editorial/CLAUDE.md: cách làm, nhãn nguồn, hai luật cứng. Tự nạp khi bạn đọc một file trong editorial/.
- editorial/articles/00-cluster/README.md: brief chung của cụm, ánh xạ sáu chủ đề, danh sách file nguyên văn.
- editorial/articles/01-system-prompt/brief.md: bài đầu tiên.
- docs/24-articles-section-plan.md: quyết định D57–D66, vòng đời, playbook đăng bài.
- docs/16-writing-guide.md, gồm §10 (Bài viết xưng "tôi"). Đọc trước khi viết câu nào.
- Các memo nguyên văn ở editorial/articles/00-cluster/raw/ chỉ để tra cứu. Không trích thẳng vào bài.

Thế nào là xong cho một bài:
- luận điểm do tác giả chọn và phản biện qua;
- mọi số và khẳng định trong bài có dòng trong ledger.md với nhãn và nguồn đã mở, số hay đổi kèm ngày thu thập;
- tác giả đọc bản đọc to một lượt và không còn chỗ vấp;
- tác giả đặt status: approved.

Hai việc không có ngoại lệ:
- Không đưa gì vào site/ khi chưa có approved. Đăng bài là một việc riêng, theo docs/24 §6.
- Không bịa và không lan truyền số chưa kiểm chứng. Memo của Perplexity và ChatGPT mặc định là chưa kiểm chứng; chỗ nào mâu thuẫn nguồn chính thức thì theo nguồn chính thức và ghi lại.

Cách làm với tác giả:
- Trước khi viết, làm một blind spot pass trên brief và memo.
- Điều gì còn mơ hồ mà câu trả lời đổi cấu trúc bài thì hỏi từng câu một, kèm đề xuất của bạn. Điều nhỏ thì tự quyết và ghi lại. Đừng hỏi lại những điều đã chốt ở D57–D66.
- Làm memo kiểm chứng trước, chưa viết bài trơn tru che mất chỗ chưa chắc: điều đã xác minh, điều bị bác bỏ, điều chưa biết, và tác động của chúng đến luận điểm.
- Với mỗi bài, hỏi tác giả điều họ có mà docs không có: chuyện thật, số đo tự chạy, lập trường.
```

## 2. Trạng thái bàn giao

**Đã chốt** (hai vòng hỏi ngày 13/11/2026): mục Bài viết riêng; trục Claude, hãng khác đối chiếu ngắn; chung repo, nháp ở `editorial/` ngoài `site/`; cụm 3 bài rồi xem lại; xưng "tôi"; chuẩn kiểm chứng nhẹ (ghi ngày thu thập); chỉ ghi byline; thứ tự 01 → 02 → 03. Chi tiết: `docs/24` §1.

**Đã kiểm chứng:** 11 claim về Claude Code auto memory, CLAUDE.md và rules, đối chiếu với docs ngày 13/11/2026: `editorial/articles/02-memory/ledger.md`.

**Chưa kiểm chứng:** hầu hết còn lại. Xem mục "Cần kiểm chứng" trong từng `brief.md`.

**Chưa làm:** bản nháp nào, luận điểm nào được tác giả duyệt, và mục Bài viết trên site (`docs/24` §2 khối A; giao cho coding agent chính khi bài đầu được duyệt).

**Việc mở của cả cụm:** tên cụm; chủ đề C (Gemini Orchestrator) đi đâu; bài nào qua Council. Xem `00-cluster/README.md`.

## 3. Bước đầu tiên gợi ý

1. Blind spot pass trên bài 01: bài này nói được gì mà trang chủ và Lộ trình chính chưa nói?
2. Mở bài gốc của Anthropic, chốt URL chuẩn (`claude.dev` hay `claude.com`), trích nguyên văn câu 80%, lập `01-system-prompt/ledger.md` từ mẫu `_templates/ledger.md`.
3. Hỏi tác giả câu đầu tiên: luận điểm của họ cho bài 01, kèm đề xuất của bạn.
4. Chuyển `status` của bài 01 sang `ledger` khi sổ nguồn đủ cho một bản nháp.
