---
status: draft
topic: 5
order: 2
slug:
working_title: Memory: tin harness hay tự quản?
verifiedAt: 2026-11-14
---

# Memory: tin harness hay tự quản?

Nguồn: memo 5 (Perplexity) và chủ đề A của brief 01, đều ở `../00-cluster/raw/`. Sổ nguồn: [`ledger.md`](ledger.md).

## Luận điểm ứng viên (tác giả chưa duyệt)

- Memory tốt không phải memory lớn nhất mà là memory có phạm vi đúng, nguồn rõ và có cách sửa (brief 01 §2).
- "Nhớ tôi" khác "biết cách làm việc trong repo này" (brief 01 §2).
- Câu gọn của memo 5: *remember automatically, establish truth explicitly*.

Cả ba là INFERENCE của công cụ nghiên cứu. Việc đầu tiên với tác giả là chọn luận điểm của chính họ.

## Quyết định của tác giả (14/11/2026, hộp hỏi lựa chọn)

- **Luận điểm đã chọn:** "Nhớ tôi" khác "biết cách làm việc trong repo này". Hai luận điểm ứng viên còn lại không dùng.
- **Chuyện cá nhân và số tự đo:** tác giả chọn "Không dùng chuyện cá nhân ở cả hai, như bài 01". Bài không kể chuyện auto memory nhớ sai hay nhớ thừa, và không chạy sáu phép thử của memo 5 (nên không có nhãn MEASURED).
- **Phạm vi:** bản nháp gồm cả Claude Code và Claude app (Chat, Cowork). Chủ đề của #39 (bài 04) trùng với luận điểm này; chờ tác giả quyết gộp (câu F).

## Bản nháp đầu (14/11/2026)

`draft.md`: do agent viết theo luận điểm trên, **chưa phải giọng của tác giả**. Mọi khẳng định bám `ledger.md` (bản đồ cuối file, không đăng). Callout "Quan điểm của tôi" là cách đọc của tác giả, nêu rõ trong bài là không có trong tài liệu. Dòng 12 (phiên nền) đã bỏ khỏi bài. Chưa có người đối chiếu thứ hai; ba trang nguồn mở bằng công cụ tải trang, cần mở lại bằng trình duyệt trước khi đăng.

## Trong repo đã có gì (đừng dạy lại)

- Phần 03 của Lộ trình chính đã viết lại auto memory theo đúng trang docs này (CHANGELOG, 11/11/2026).
- Nâng cao A2 *Hồ sơ onboarding* (`docs/14` §8): CLAUDE.md, rules theo vùng, auto memory chi tiết, AGENTS.md.
- `docs/05-surface-matrix.md`, các hàng `project-memory` và `auto-memory`: Cowork memory và Claude Code auto memory là hai hệ riêng; Cowork không đọc `~/.claude`.
- `docs/18-intro-track-plan.md` N6: Claude tự lo gì, bạn lo gì về trí nhớ.

Bài này phải thêm điều gì đó ngoài những chỗ trên, không nhắc lại.

## Điều gì bài này có thể nói mà docs chưa nói (cần tác giả xác nhận)

- Cách chọn: tin memory có sẵn, tự quản bằng file, hay dựng lớp ngoài, theo rủi ro và chi phí sửa sai. Memo 5 có bảng quyết định theo ca dùng; đó là INFERENCE.
- Phân biệt *lưu* với *nhớ đúng lúc*: có trong database chưa chắc được lấy ra, lấy ra chưa chắc được dùng đúng.
- Sổ ghi trạng thái ("báo cáo đã gửi") yếu hơn bản ghi có mã gửi, người nhận, thời điểm.

## Cần kiểm chứng trước khi viết

Đã làm ngày 13/11/2026 cho Claude Code: xem `ledger.md` dòng 1–11. Còn lại:

1. ~~Dòng 12: auto memory ở phiên nền~~ **Xong 14/11/2026:** trang `agent-view` không có câu nói auto memory không chạy ở phiên nền (đọc 100.000 ký tự đầu của 148.008). Bỏ claim khỏi bài.
2. ~~Dòng 13: memory của Chat và Cowork~~ **Xong 14/11/2026:** hai bài support.claude.com khớp nhau ở phần cloud; bài 11817273 nói Cowork chạy trên máy không dùng memory (ledger dòng 13, 16 đến 19). `docs/05` chưa sửa: ghi Cowork có Project memory, không mâu thuẫn nhưng nên rà lại.
3. Phần OpenAI, Gemini: chỉ mở nếu bài cần đối chiếu ngắn (D58).
4. ~~Memo 5 nói "xoá hội thoại không xoá memory sinh ra từ nó"~~ **Xong 14/11/2026:** đúng với trải nghiệm memory hiện hành của Chat (ledger dòng 17); memory kiểu cũ thì ngược lại.

## Câu hỏi mở cho tác giả

- Bạn đã tự dùng auto memory đủ lâu để có chuyện thật (nó nhớ sai, nhớ thừa, nhớ cũ) chưa? Chuyện thật là thứ docs không có.
- Sáu phép thử trong memo 5: muốn tự chạy thử rồi kể kết quả (MEASURED), hay để bài ở mức khung?
- Người đọc chính là dev dùng Claude Code, hay người dùng Claude app nói chung? Hai nhóm có hai hệ memory khác nhau.
