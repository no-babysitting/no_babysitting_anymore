---
status: memo
topic: 4
order: 3
slug:
working_title: Chọn model và effort: trí thông minh đúng chỗ
collectedAt:
---

# Chọn model và effort: trí thông minh đúng chỗ

Nguồn: memo 4 (Perplexity) và chủ đề B, C của brief 01, đều ở `../00-cluster/raw/`. Chưa có sổ nguồn.

## Luận điểm ứng viên (tác giả chưa duyệt)

- Bắt đầu bằng một model đủ mạnh ở effort vừa, có kiểm chứng bằng công cụ và leo thang có giới hạn. Chỉ thêm routing khi đo được lợi.
- Đo chi phí cho mỗi kết quả được chấp nhận (gồm cả công của người), không đo giá token.
- Câu gọn của memo 4: *escalate intelligence automatically; escalate authority explicitly*. Khớp với *No babysitting ≠ no supervision* ở PRD §0.

Cả ba là INFERENCE. Chọn luận điểm của tác giả trước.

## Trong repo đã có gì (đừng dạy lại)

- Nâng cao A5 *Đúng mức nghĩ* (c05b): `docs/14` §8; nguồn ở `docs/02` mục c05b (docs `model-config`, `fast-mode`, `advisor`; platform `choosing-a-model`, `effort`).
- **S11: *Spending your effort*** (Thariq Shihipar, 25/09/2026), bài chính thức của Anthropic về effort (`docs/14` bảng nguồn). **Đọc trước.** Bài này không được lặp lại nó.
- `models.yml` (FR-17) chưa tồn tại. `docs/07` §2 còn bốn điểm mở về effort: bộ chọn trên Desktop và Cowork, thinking của Fable ở mức API, phạm vi `ultrathink`, mức mặc định của Opus 4.7.

## Điều gì bài này có thể nói mà docs chưa nói (cần tác giả xác nhận)

- Khung quyết định: độ phức tạp quyết định lượng suy nghĩ cần, rủi ro quyết định quyền và bằng chứng cần. Việc đơn giản vẫn có thể cần duyệt; việc khó mà chỉ đọc thì chạy tự động.
- Hợp đồng giao việc, ba cổng (chất lượng, quyền, nguồn lực), gói báo cáo khi leo thang. Đều là đề xuất của memo 4, INFERENCE.
- Bảng "việc nào, model nào, effort nào" chỉ là điểm xuất phát, không phải xếp hạng.

## Cần kiểm chứng trước khi viết

1. **Mâu thuẫn mức effort mặc định:** brief 01 ghi Fable và Opus đều mặc định medium; memo 4 ghi Fable `high`, Opus `medium` và nói đã "sửa lại". Mở <https://platform.claude.com/docs/en/build-with-claude/effort> và <https://code.claude.com/docs/en/model-config>, ghi riêng từng bề mặt (API, Claude Code, app).
2. Giá và danh sách model hiện hành (<https://platform.claude.com/docs/en/about-claude/pricing>): chỉ đặt trong khối có ngày.
3. Số benchmark trong brief 01 (FrontierCode 2.0, HLE, BenchCAD) và câu "Fable high ≈ Opus max với nửa chi phí mỗi tác vụ": UNVERIFIED, không dùng nếu không mở được nguồn gốc kèm điều kiện đo.
4. "Opus đủ cho 70–85% công việc": brief 01 yêu cầu loại bỏ vì không có số đo.
5. Haiku ở `low` bỏ qua tìm kiếm hoặc kiểm tra trong prompt dài (memo 4 dẫn docs effort): mở docs để xác nhận.
6. OpenAI và Gemini: ngoài trục (D58). Nếu cần đối chiếu ngắn thì mở trang của chính hãng đó.
7. Gemini Orchestrator (chủ đề C): VENDOR CLAIM (giảm 24% quota, nhanh hơn 19%, Terminal-Bench; brief 01 nói hai nguồn ghi 4.0 và 4.1 không nhất quán). Có thể làm ví dụ ngắn về routing động nếu ghi đủ điều kiện, hoặc bỏ.
8. Không so điểm của các benchmark khác nhau để dựng một thứ hạng chung.

## Câu hỏi mở cho tác giả

- Bạn đã tự chạy thử chưa (MEASURED)? Brief 01 §6 đề xuất bộ task và biến cần kiểm soát. Bài chờ có số đo, hay ra bản "khung và giả thuyết" trước?
- Chủ đề C (Gemini Orchestrator) nằm ở đâu: ví dụ ngắn trong bài này, một bài thứ tư sau khi xem lại cụm, hay bỏ?
- Bài này là bài nhiều số nhất và đổi nhanh nhất; tác giả chấp nhận khối "ảnh chụp ngày X" và một lần cập nhật sau khi đăng không?
