# Bàn giao: phiên viết bài cho mục Bài viết (13/11/2026)

> Chủ dự án dán phần §1 vào một phiên Claude Code mới, mở trên repo này. §2 là trạng thái bàn giao. §3 là những bước đầu tiên. Luật và cách làm nằm ở `editorial/CLAUDE.md`, không lặp ở đây.

## 1. Prompt

```text
Bạn tiếp quản việc viết cụm 3 bài đầu tiên cho mục Bài viết của No Babysitting (repo no-babysitting/no_babysitting_anymore), cùng tác giả là chủ dự án (biệt danh taiseixx, viết tiếng Việt). Mục Bài viết chưa có trên site; bản nháp nằm ở editorial/ và không lên site tới khi tác giả duyệt.

Mục tiêu: cùng tác giả đưa ba chủ đề (80% system prompt, memory, model và effort), theo thứ tự đó, từ memo thô thành ba bài đáng đăng. Bài đáng đăng nói được điều docs và blog chính thức chưa nói, bằng quan điểm của chính tác giả, với số liệu có ngày và có nguồn.

Bắt đầu từ editorial/CLAUDE.md: nó chỉ ra những gì cần đọc, luật và cách làm. Rồi editorial/articles/00-cluster/README.md và brief của bài 01.

Một bài xong khi: tác giả chọn và phản biện qua luận điểm; mọi số và khẳng định có dòng trong ledger.md; tác giả đọc to một lượt không vấp; tác giả đặt status: approved.

Với mỗi bài, hỏi tác giả điều họ có mà docs không có: chuyện thật, số tự chạy, lập trường.
```

## 2. Trạng thái bàn giao

**Đã chốt:** `docs/08` §1e (D57–D66). Đừng hỏi lại.

**Đã kiểm chứng:** 11 claim về Claude Code auto memory, CLAUDE.md và rules, đối chiếu docs ngày 13/11/2026: `articles/02-memory/ledger.md`.

**Chưa kiểm chứng:** hầu hết còn lại; xem mục "Cần kiểm chứng" trong từng `brief.md`.

**Chưa làm:** bản nháp nào, luận điểm nào được tác giả duyệt, và mục Bài viết trên site (`docs/24` §2 khối A, giao cho coding agent chính khi bài đầu được duyệt).

**Việc mở của cả cụm:** tên cụm; chủ đề C (Gemini Orchestrator) đi đâu; ai rà ở bước `review`. Xem `articles/00-cluster/README.md`.

## 3. Bước đầu tiên gợi ý

1. Blind spot pass trên bài 01: bài này nói được gì mà trang chủ và Lộ trình chính chưa nói?
2. Mở bài gốc của Anthropic, chốt URL chuẩn (`claude.dev` hay `claude.com`), trích nguyên văn câu 80%, lập `01-system-prompt/ledger.md` từ `_templates/ledger.md`.
3. Hỏi tác giả câu đầu tiên: luận điểm của họ cho bài 01, kèm đề xuất của bạn.
4. Chuyển `status` của bài 01 sang `ledger` khi sổ nguồn đủ cho một bản nháp.
