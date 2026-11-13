# Cụm 3 bài đầu: brief chung

Cập nhật 13/11/2026. Quyết định của chủ dự án: D57–D66 (`docs/08` §1e, `docs/24`).

## Cụm này là gì

Ba bài về ba quyết định mà người giao việc cho agent phải đưa ra, và vì sao mỗi quyết định không còn là chuyện "viết prompt hay hơn":

| Bài | Câu hỏi | Chủ đề (danh sách của tác giả) |
|---|---|---|
| 01 | Điều gì phải dặn tường minh, điều gì giao cho model và harness? | 6 · 80% system prompt |
| 02 | Agent cần biết gì, và tin bộ nhớ nào? | 5 · Memory |
| 03 | Ai nên nghĩ, nghĩ bao nhiêu, và khi nào cần người duyệt? | 4 · Model và effort |

Tên cụm ứng viên: **The Architecture of No Babysitting** (ChatGPT đề xuất, tác giả chưa duyệt; chưa có tên tiếng Việt).

Ba câu chốt ứng viên, mỗi bài một câu (từ ba memo; đều là INFERENCE, tác giả chưa duyệt):

- Bài 01: less micromanagement, not less control.
- Bài 02: remember automatically, establish truth explicitly.
- Bài 03: escalate intelligence automatically; escalate authority explicitly.

Sợi chung: bớt dặn cách nghĩ, giữ rõ mục tiêu, bằng chứng, quyền và chỗ dừng.

## Thứ tự và vì sao (D65)

01 → 02 → 03, theo chi phí kiểm chứng. Bài 01 đã có nguồn S1 trên site và đặt khung cho hai bài sau. Bài 02 đã đối chiếu xong phần Claude Code với docs ngày 13/11/2026. Bài 03 cuối vì nhiều số nhất, đổi nhanh nhất, và `models.yml` của site chưa có.

## Sáu chủ đề của tác giả và ba bài

Tác giả có sáu chủ đề: ba trong brief 01 (A, B, C) và ba đánh số 4–6 có memo riêng. Cụm 3 bài lấy 4–6. Ánh xạ đề xuất, chưa duyệt:

| Chủ đề | Nội dung | Đi đâu |
|---|---|---|
| A (brief 01) | Memory của Chat, Cowork, Claude Code | Gộp vào bài 02 |
| B (brief 01) | Fable 5.2 và Opus 5.5 theo effort | Gộp vào bài 03 |
| C (brief 01) | Gemini, Orchestrator, hệ sinh thái Google | **Chưa có chỗ.** Ngoài trục Claude (D58). Ví dụ ngắn trong bài 03, hoặc bài thứ tư sau khi xem lại cụm, hoặc bỏ |
| 4 | Chọn model và effort (Perplexity) | Bài 03 |
| 5 | Memory: tin harness hay tự quản | Bài 02 |
| 6 | 80% system prompt | Bài 01 |

## Nguyên văn đã nhận (`raw/`)

Tất cả là lời của công cụ khác hoặc của tác giả, chưa kiểm chứng. Không trích từ đây vào bài; đi qua `ledger.md` của bài.

| File | Gì | Ghi chú |
|---|---|---|
| `raw/00-chatgpt-framing.md` | ChatGPT: khung cộng tác sáu bước; tin nhắn của tác giả với sáu chủ đề | ChatGPT nói chưa thấy bằng chứng mục blog đã chốt, khớp kết quả đọc repo |
| `raw/01-research-brief-ABC.md` | Research brief 13/11/2026: memory, Fable và Opus, Gemini | Tự ghi là chưa kiểm chứng; có nhiều số cần xác minh |
| `raw/02-chatgpt-prompts-4-5-6.md` | ChatGPT: ba prompt cho Perplexity và ý "cụm bài" | |
| `raw/memo-4-model-selection.md` | Perplexity: memo chủ đề 4 | Đã tự sửa mức effort mặc định của Fable thành `high` |
| `raw/memo-5-memory.md` | Perplexity: memo chủ đề 5 | Phần Claude Code đã đối chiếu một phần, xem `02-memory/ledger.md` |
| `raw/memo-6-system-prompt.md` | Perplexity: memo chủ đề 6 | Tự nhận không có số đo kinh tế |

## Việc mở của cả cụm

- Tên cụm và tên tiếng Việt.
- Chủ đề C đi đâu.
- Bài nào qua Council (ChatGPT) trước khi tác giả duyệt: quyết định ở bài đầu tiên.
- Brief 01 §7 có dàn bài cho một bài tổng hợp (memory, model, Google). Cụm 3 bài thay nó; giữ làm tham chiếu.
