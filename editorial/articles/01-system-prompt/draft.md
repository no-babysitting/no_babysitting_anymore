---
title: "80% system prompt: con số của Anthropic, không phải của bạn"
description: Anthropic nói họ bỏ hơn 80% system prompt của Claude Code. Con số đó đo cái gì, bài gốc không nói gì, và bạn làm được gì với CLAUDE.md của mình.
verifiedAt: 2026-11-14
art: default
related: ['02']
# publishedAt and order are filled when the article is published (docs/24 section 6). First of the cluster: series and order are set with articles 02 and 03.
---

Ngày 24/7/2026, Thariq Shihipar viết trên blog claude.dev một bài về <em lang="en">context engineering</em> (cách sắp xếp những gì model nhìn thấy) cho các model thế hệ Claude 5: [The new rules of context engineering for Claude 5 generation models](https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/). Trong bài có một con số rất dễ nhớ. Bài này đọc kỹ con số đó: nó đo cái gì, bài gốc không nói gì, và nó đòi gì ở bạn.

<aside aria-label="Câu gốc">

*“We removed over 80% of Claude Code’s system prompt for models like Claude Opus 5 and Claude Fable 5 with no measurable loss on our coding evaluations.”*

</aside>

## Con số này đo cái gì

Đây là system prompt của Claude Code, tức prompt của chính sản phẩm. Bài gọi tên hai model, Claude Opus 5 và Claude Fable 5, và nói thế với “những model như” hai tên đó; bài không nói gì về model khác.

“Không đo được sụt giảm” là trên các bài đánh giá code của Anthropic. Đó là số liệu hãng tự công bố, đo bằng bộ đánh giá của hãng.

Bài không nêu độ dài ban đầu của prompt, số token, số bài đánh giá hay cỡ mẫu, chi phí, độ trễ, và không nhắc prompt caching. Nên “hơn 80%” là một tỉ lệ mà bạn không biết tính trên bao nhiêu chữ.

## Con số này không phải lời khuyên cắt 80% của bạn

Prompt đó là thứ bạn không sửa. Bài viết rằng với Claude Code, bạn <em lang="en">likely never modify</em> nó; nó chỉ là chỗ để tốn công nếu bạn tự dựng một bộ khung chạy agent.

Thứ bạn sửa được là CLAUDE.md và skills, và với chúng bài nói khác, không kèm tỉ lệ nào:

- CLAUDE.md nên nhẹ: nói ngắn repo này để làm gì, và dành phần lớn chữ cho những chỗ dễ vấp trong code.
- Skills đừng ràng buộc quá tay, trừ những chỗ thật sự quan trọng.
- Với system prompt, skills và CLAUDE.md, bài viết rằng bạn “có thể cần đơn giản hoá, như chúng tôi đã làm”: một lời khuyên mềm, không phải “nên cắt”.
- Bài chỉ tới lệnh `/doctor` trong Claude Code để chỉnh cỡ skills và CLAUDE.md.

Điều bài kể về chính Anthropic là họ từng ràng buộc Claude Code quá tay, qua cả system prompt, CLAUDE.md lẫn skills. Việc cần làm là bớt ràng buộc không còn cần, chứ không phải bớt chỉ dẫn nói chung.

## “Bỏ” gồm hai việc

Bài kể system prompt cũ có chỉ dẫn chi tiết về review code và kiểm chứng. Sau đó họ chuyển hai thứ đó vào skills, để Claude Code gọi khi cần.

Bài không tách trong 80% bao nhiêu là bỏ hẳn, bao nhiêu là chuyển sang skills. Nên câu “80% prompt đã biến mất” không có căn cứ trong bài.

Với bạn, hệ quả cụ thể nhất là chuyện kiểm chứng: nếu bạn có nhiều chỉ dẫn riêng về cách kiểm tra việc đã làm, bài khuyên làm một skill kiểm chứng và dẫn tới nó từ CLAUDE.md.

<aside aria-label="Quan điểm của tôi">

Tôi đọc con số 80% như một câu nói về prompt của Anthropic, ở những model nhất định, đi kèm một lời khuyên nhẹ hơn cho bạn: đơn giản hoá, và chuyển chỉ dẫn sang chỗ nạp khi cần. Tôi không đọc nó như lời khuyên cắt 80% CLAUDE.md của bạn.

</aside>

## Bài gốc chưa nói

- Prompt dài bao nhiêu trước khi cắt, và cắt xuống còn bao nhiêu.
- Bao nhiêu bài đánh giá, cỡ mẫu nào.
- Chi phí và độ trễ đổi ra sao, và prompt caching có vai trò gì.
- Chuyện gì xảy ra với model khác Opus 5 và Fable 5.
- Bạn có nên tiếp tục dặn tường minh mục tiêu hay quyền không. Bài chỉ nói tới chỉ dẫn kiểm chứng.

Muốn biết bỏ bớt lời dặn của bạn có làm kết quả tệ đi không, bài gốc không trả lời được thay bạn. Cách duy nhất là thử trên việc của bạn: bỏ một lời dặn, chạy lại một việc đã có kết quả tốt, rồi so.

Các thay đổi về cách giao việc nằm ở Lộ trình chính, phần [Giao việc: nói ít thôi, và chỉ nói một lần](/02/). Bài này chỉ làm rõ một con số.

---

<!-- Phần dưới đây KHÔNG lên site; xoá khi đăng (docs/24 §6). Bản đồ đoạn → dòng trong ledger.md -->

## Bản đồ khẳng định → sổ nguồn (không đăng)

| Đoạn | Dòng ledger |
|---|---|
| Mở đầu: tác giả, ngày, tiêu đề, URL | 3, 4 |
| Câu gốc | 1 |
| Con số đo cái gì: prompt, hai model | 1 |
| "Không đo được sụt giảm", hãng tự công bố | 2 |
| Bài không nêu độ dài, token, cỡ mẫu, chi phí, độ trễ, caching | 6 |
| Prompt bạn không sửa ("likely never modify") | 9 |
| CLAUDE.md nhẹ, nói repo để làm gì, chữ dành cho chỗ dễ vấp | 10 |
| Skills đừng ràng buộc quá, trừ chỗ quan trọng | 19 |
| "may need to simplify just like we did"; `/doctor` | 12 |
| Không có tỉ lệ nào cho người dùng | 13 |
| Anthropic từng "overconstrain" qua system prompt, CLAUDE.md, skills | 5 |
| Review code và kiểm chứng chuyển vào skills | 7 |
| Không tách bỏ hẳn và chuyển | 8 |
| Skill kiểm chứng dẫn từ CLAUDE.md | 11 |
| Callout "Quan điểm của tôi" | Luận điểm do tác giả chọn 14/11/2026; là quan điểm, không cần dòng sổ; vế "đơn giản hoá, chuyển chỉ dẫn sang chỗ nạp khi cần" bám dòng 7, 11, 12 |
| "Bài gốc chưa nói": mục tiêu và quyền | 14 |
| "Bài gốc chưa nói": model khác | 1 (bài gọi tên hai model, "models like") |
| Cách tự thử (bỏ một lời dặn, chạy lại, so) | Lời khuyên của tác giả, không phải khẳng định về nguồn |
