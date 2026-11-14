---
status: draft
topic: 4
order: 3
slug:
working_title: Chọn model và effort: trí thông minh đúng chỗ
verifiedAt: 2026-11-14
---

# Chọn model và effort: trí thông minh đúng chỗ

Nguồn: memo 4 (Perplexity) và chủ đề B, C của brief 01, đều ở `../00-cluster/raw/`. Chưa có sổ nguồn.

## Luận điểm ứng viên (tác giả chưa duyệt)

- Bắt đầu bằng một model đủ mạnh ở effort vừa, có kiểm chứng bằng công cụ và leo thang có giới hạn. Chỉ thêm routing khi đo được lợi.
- Đo chi phí cho mỗi kết quả được chấp nhận (gồm cả công của người), không đo giá token.
- Câu gọn của memo 4: *escalate intelligence automatically; escalate authority explicitly*. Khớp với *No babysitting ≠ no supervision* ở PRD §0.

Cả ba là INFERENCE. Chọn luận điểm của tác giả trước.

## Quyết định của tác giả (14/11/2026, hộp hỏi lựa chọn)

- **Luận điểm đã chọn:** "Bắt đầu bằng model đủ mạnh ở effort vừa, có kiểm chứng và leo thang có giới hạn." (luận điểm ứng viên đầu của brief, kèm "chỉ thêm routing khi đo được lợi").
- **Chuyện cá nhân và số tự đo:** tác giả chọn "Không dùng chuyện cá nhân ở cả hai". Bài 03 không có nhãn MEASURED; ghi rõ là cách đọc chỉ dẫn, không phải kết quả thử.

## Điều agent đã thu hẹp khi viết bản nháp, tác giả cần xác nhận

Sau khi mở docs (ledger dòng 4 đến 18), "effort vừa" **không phải khuyến nghị chung**: docs API khuyên bắt đầu ở `high` với Fable 5.2, Fable 5.1, Fable 5 và Opus 5; `xhigh` với Opus 4.7 và 4.8; `medium` với Opus 5.5 và Haiku 5.5. Mặc định của Claude Code thì `medium` cho Fable 5.2, Opus 5.5, Sonnet 5.5, Haiku 5.5 (ledger dòng 6). Nên bản nháp nói: "bắt đầu ở **mặc định của model**, nâng khi có bằng chứng, chỉ thêm định tuyến khi đo được", và giới hạn "bắt đầu ở medium" cho Claude Code. Đây là thu hẹp của luận điểm tác giả chọn; tác giả xác nhận hoặc nói muốn giữ nguyên "effort vừa".

Mâu thuẫn "mức mặc định" giữa brief 01 và memo 4 đã giải: mỗi bên đúng với một bề mặt (ledger dòng 8). Đây cũng là điều bài nói mà docs chưa nói rõ: so sánh hai bề mặt.

## Bản nháp đầu (14/11/2026)

`draft.md`: do agent viết, **chưa phải giọng của tác giả**. Mọi khẳng định bám `ledger.md` (bản đồ cuối file, không đăng). Không dùng giá, benchmark, "70 đến 85%", chủ đề C (Gemini Orchestrator; chờ #41). Chưa mở trang pricing và chưa mở mức mặc định ở ứng dụng Claude. Chưa có người đối chiếu thứ hai; ba trang nguồn mở bằng công cụ tải trang, cần mở lại bằng trình duyệt trước khi đăng.

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
