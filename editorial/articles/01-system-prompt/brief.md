---
status: draft
topic: 6
order: 1
slug:
working_title: 80% system prompt: cái gì thực sự đổi?
verifiedAt: 2026-11-14
---

# 80% system prompt: cái gì thực sự đổi?

Nguồn: memo 6 (Perplexity) ở `../00-cluster/raw/memo-6-system-prompt.md`. Chưa có sổ nguồn.

## Luận điểm ứng viên (tác giả chưa duyệt)

- Tuyên bố hẹp hơn nhiều so với cách người ta nhắc: "hơn 80% system prompt của Claude Code, cho các model như Opus 5 và Fable 5, không đo được sụt giảm trên các bài đánh giá code". Không phải "Claude cần ít prompt hơn 80%".
- Prompt không lỗi thời; việc của nó chính xác hơn: bớt chỉ dẫn lỗi thời, giữ mục tiêu, phép kiểm, quyền.
- Câu gọn của memo 6: *less micromanagement, not less control*.

Cả ba là INFERENCE. Chọn luận điểm của tác giả trước.

## Trong repo đã có gì (đừng dạy lại)

Đây là xương sống của site, nên phần chồng lấn lớn nhất ở bài này:

- Trang chủ, `site/src/pages/index.astro:28`: câu 80% kèm nguồn S1.
- `site/src/content/parts.ts:20`: S1 trỏ `claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/`.
- `docs/14-content-script-v4.md`: số 80% làm bằng chứng của hero; S1 ở bảng nguồn. `README.md` dòng 26.
- `docs/08-kaizen-go-live.md` §2 (dòng "Câu 80%"): đã đúng phạm vi, trích nguyên văn, không chỗ nào khuyên cắt 80% CLAUDE.md.
- Six shifts là nội dung chính của Lộ trình chính. Bài này không dạy lại six shifts; chỉ dẫn sang.

## Blind spot pass (14/11/2026, sau khi mở bài gốc)

Sổ nguồn: `ledger.md` (dòng số trong ngoặc). Điều bài gốc nói mà brief và site chưa nói, hoặc nói khác:

1. **80% là của prompt Anthropic, không phải lời khuyên cắt 80% prompt của bạn** (9, 13). Bài gốc nói với người dùng Claude Code rằng bạn "likely never modify" system prompt; việc người dùng làm được là CLAUDE.md và skills (10, 12).
2. **Một phần "removed" thực ra là chuyển chỗ** (7, 8): review code và kiểm chứng ra khỏi system prompt, vào skills nạp khi cần. Bài không tách phần bỏ và phần chuyển, nên "80% biến mất" là đọc quá.
3. **Bài gốc không nói điều brief đang gán cho nó** (14): "giữ mục tiêu, phép kiểm, quyền" là suy luận của memo; riêng kiểm chứng thì bài có nói (11).
4. **Điều bài không công bố** (6): baseline, token, cỡ mẫu, chi phí, độ trễ, caching. Nên bài của ta viết "không nêu", không viết "không có".
5. **Bằng chứng từ repo này** (15, MEASURED): chỉ dẫn từ ba prompt dán tay (25.925 byte) sang một file nạp tự động (7.899 byte) cộng file nạp khi cần. Không phải phép đo "không mất chất lượng"; chỉ là chuyện thật về chỗ chỉ dẫn nằm. Tác giả quyết có dùng hay không.
6. **Chưa có**: chuyện thật của tác giả (đã thử bỏ lời dặn chưa, kết quả ra sao). Brief hỏi từ đầu; đó là thứ bài gốc không có.

Hệ quả cho luận điểm ứng viên 2 ("prompt không lỗi thời, việc của nó chính xác hơn"): bài gốc ủng hộ được nửa đầu qua việc chuyển chỉ dẫn sang skills và CLAUDE.md nhẹ; vế "giữ mục tiêu, phép kiểm, quyền" là của tác giả, phải nói rõ là suy luận.

## Quyết định của tác giả (14/11/2026, hộp hỏi lựa chọn)

- **Luận điểm đã chọn:** "80% là của prompt Anthropic, không phải lời khuyên cắt 80% của bạn." Đây là luận điểm của tác giả; hai luận điểm ứng viên còn lại của brief không dùng.
- **Chuyện cá nhân:** tác giả chọn "Không dùng chuyện cá nhân". Bài không kể chuyện tự thử bỏ lời dặn, và không dùng số đo từ repo (`ledger.md` dòng 15). Rủi ro đã nêu: bài gần với một bản đọc kỹ bài gốc; giá trị của nó là phạm vi chính xác của con số và danh sách điều bài gốc không nói.
- Còn mở: người đọc là ai (người dùng thường hay sâu), và tên cụm. Bản nháp viết cho người dùng Claude Code có CLAUDE.md; tác giả sửa nếu khác.

## Bản nháp đầu (14/11/2026)

`draft.md`: do agent viết theo luận điểm trên, **chưa phải giọng của tác giả** (bước "giữ giọng tác giả" chưa làm). Mọi khẳng định bám `ledger.md`; cuối file có bản đồ đoạn sang dòng sổ (không đăng). Mục "Bài gốc chưa nói" và câu "cách duy nhất là thử trên việc của bạn" là lập luận của bài, không phải khẳng định về nguồn. Chưa có người đối chiếu thứ hai; chưa mở lại bài gốc bằng trình duyệt.

## Điều gì bài này có thể nói mà site chưa nói (cần tác giả xác nhận)

- Phạm vi chính xác của tuyên bố và những gì bài gốc không công bố (baseline, số token tuyệt đối, cỡ mẫu eval, chi phí, độ trễ): memo 6 nói vậy, cần mở bài gốc để xác nhận.
- Góc kinh tế: prompt caching đổi phép tính (đọc cache rẻ, ghi có phí, đổi prefix thì mất cache); prompt ngắn chưa chắc rẻ hơn cả tác vụ. Chỉ viết khi đã mở tài liệu caching.
- Cái gì vẫn phải nói tường minh: mục tiêu, thế nào là xong, quyền, phép kiểm.
- Cách tự thử bỏ bớt lời dặn (ablation) cho người dùng.

## Cần kiểm chứng trước khi viết

1. Mở bài gốc, trích nguyên văn câu "We removed over 80% of Claude Code's system prompt…". **URL chuẩn:** site đang dẫn `claude.dev/blog/...`, memo dẫn `claude.com/blog/...`; `docs/07` §1 mục 3 vẫn ghi mở.
2. Ngày 24/07/2026 và tác giả Thariq Shihipar: `docs/14` đã ghi; mở lại để xác nhận.
3. Những gì bài gốc không công bố: kiểm bằng cách đọc bài, không dựa memo.
4. "Khoảng 800 → 164 token" (memo dẫn một bài thứ cấp): UNVERIFIED. Không dùng nếu không mở được nguồn.
5. Tài liệu prompt caching: <https://platform.claude.com/docs/en/build-with-claude/prompt-caching>. Mở và trích khi viết phần kinh tế.
6. Mọi chỗ memo nói về động cơ kinh doanh của hãng là INFERENCE; ghi rõ hoặc bỏ.
7. Bài thứ cấp, bình luận cộng đồng: chỉ dùng như bình luận, không như bằng chứng.

## Câu hỏi mở cho tác giả

- Bạn đã tự thử bỏ bớt lời dặn trong CLAUDE.md hoặc prompt của mình chưa? Kết quả của bạn là điều bài gốc không có.
- Người đọc là người dùng thường hay người dùng sâu? Memo 6 có khuyến nghị riêng cho từng nhóm.
- Bài mở cụm: có kể bằng chính quá trình dựng site này (D13, docs/17 theo six shifts) không?
