---
status: memo
topic: 6
order: 1
slug:
working_title: 80% system prompt: cái gì thực sự đổi?
collectedAt:
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
