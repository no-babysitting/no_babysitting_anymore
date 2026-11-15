---
title: "80% system prompt: con số của Anthropic, không phải của bạn"
description: Anthropic nói họ bỏ hơn 80% system prompt của Claude Code. Con số đó đo cái gì, điều gì được chuyển đi, và vì sao kiểm soát không đồng nghĩa với viết thêm lời dặn.
verifiedAt: 2026-11-14
art: default
related: ['02', '07', '08']
---

Ngày 24/7/2026, Thariq Shihipar đăng bài *The new rules of context engineering for Claude 5 generation models* trên blog Claude. Một con số trong bài dễ bị biến thành lời khuyên: Anthropic đã bỏ hơn 80% system prompt của Claude Code mà không đo được suy giảm trên các bài đánh giá code.

Nhưng con số ấy nói về prompt của Anthropic, không phải prompt của bạn. Và điều đáng học không phải là cắt cho ngắn. Đó là đặt mỗi chỉ dẫn vào đúng nơi, rồi dùng cơ chế kiểm chứng để những điều quan trọng không phụ thuộc vào việc model có nhớ lời dặn hay không.

## 80% là con số của Claude Code

Câu gốc nói về system prompt của chính Claude Code, với các model được nêu là Claude Opus 5 và Claude Fable 5. Anthropic nói họ không đo được suy giảm trên bộ đánh giá code của mình. Đây là kết quả do hãng công bố; bài viết không cung cấp đủ chi tiết để người đọc tái lập phép đo.

Vì vậy, không thể suy ra rằng mọi model đều cần ít chỉ dẫn hơn 80%, hoặc file CLAUDE.md của bạn nên ngắn đi đúng tỷ lệ đó. System prompt của sản phẩm và file chỉ dẫn của một repo là hai thứ khác nhau.

Bài viết cũng không cho biết prompt ban đầu dài bao nhiêu, số token trước và sau khi thay đổi, số lượng bài đánh giá, cỡ mẫu, độ trễ hay chi phí. Không có những dữ liệu đó, 80% là một tỷ lệ đáng chú ý, nhưng chưa phải công thức tối ưu prompt.

## “Bỏ” không có nghĩa là vứt hết

Một phần thay đổi được Anthropic mô tả là chuyển hướng dẫn chi tiết về review code và kiểm chứng ra khỏi system prompt, đưa vào skills để Claude Code gọi khi cần. Bài không tách rõ trong 80% đó bao nhiêu nội dung bị loại bỏ hoàn toàn và bao nhiêu được chuyển sang nơi khác.

Đây mới là điểm đáng chú ý: không phải mọi chỉ dẫn đều cần xuất hiện trong mọi phiên. Quy tắc chung, kiến thức dự án, quy trình chuyên biệt và điều kiện bắt buộc có thể cần những cơ chế khác nhau.

- CLAUDE.md dành cho thông tin Claude cần biết thường xuyên nhưng không thể tự suy ra dễ dàng từ repo: lệnh kiểm tra, quyết định của nhóm, điểm dễ hiểu nhầm.
- Skills dành cho quy trình hoặc tri thức chỉ cần nạp khi công việc gọi đến.
- Hooks và permission rules dành cho những điều phải được thực thi, không thể chỉ trông vào việc Claude đọc rồi làm theo.

Đừng chuyển mọi thứ thành skill hoặc hook. Một sở thích có ngoại lệ không cần bị biến thành luật cứng. Ngược lại, một điều “không bao giờ được phép” không nên chỉ nằm trong một dòng CLAUDE.md.

## Lời dặn không phải là cơ chế kiểm soát

Best practices hiện hành của Claude Code phân biệt hai loại chỉ dẫn. Loại thứ nhất là không tất định: prompt, CLAUDE.md và skills đưa thông tin cho model, nhưng model vẫn quyết định cách làm. Loại thứ hai là tất định: hooks, deny rules, sandbox và managed settings được harness thực thi, bất kể model có muốn làm khác hay không.

Khác biệt này quan trọng nhất ở ba câu hỏi:

| Câu hỏi | Có thể giao cho Claude phán đoán | Nên cưỡng chế khi không được phép sai |
|---|---|---|
| Claude nên làm gì? | Prompt, CLAUDE.md, skills | Hook cho bước bắt buộc |
| Claude được chạm vào đâu? | Hướng dẫn và chế độ quyền có xét rủi ro | Permission rules, sandbox, deny rules |
| Khi nào được coi là xong? | Yêu cầu Claude chạy test và báo kết quả | Stop hook, CI, branch protection và người duyệt merge |

Một câu “hãy chạy test trước khi kết thúc” vẫn là lời dặn. Stop hook có thể chạy phép kiểm khi Claude định dừng. CI chạy lại phép kiểm trên thay đổi được đẩy lên repo. Branch protection có thể ngăn merge nếu các check bắt buộc chưa đạt. Đó là các lớp khác nhau, không thay thế hoàn toàn cho nhau.

## CI là nơi phép kiểm rời khỏi cuộc hội thoại

Claude cần một phép kiểm trả về kết quả có thể đọc được: test, typecheck, lint, build hoặc script so sánh đầu ra. Nếu repo đã có CI, những phép kiểm ấy có thể chạy tự động trên pull request thay vì phụ thuộc vào việc Claude nhớ chạy chúng.

Điều này tạo ra một chuỗi kiểm soát rõ ràng:

1. Claude sửa code và chạy phép kiểm trong phiên để tự sửa lỗi sớm.
2. Hook có thể chặn Claude kết thúc nếu một điều kiện bắt buộc chưa đạt.
3. CI chạy lại các check trên pull request trong môi trường của repo.
4. Branch protection giữ merge lại khi check bắt buộc chưa đạt.
5. Người có trách nhiệm xem diff, bằng chứng và quyết định merge.

CI không chứng minh phần mềm hoàn toàn đúng. Nó chỉ chứng minh những check đã cấu hình đạt trong điều kiện đã chạy. Test có thể thiếu, môi trường CI có thể khác production, và một build xanh không thay thế review yêu cầu hay đánh giá rủi ro. Nhưng CI tạo ra một cổng kiểm tra độc lập với lời tự báo cáo của agent.

Cũng đừng đưa mọi quy tắc vào CI. CI phù hợp với điều có thể kiểm tra lặp lại: test, kiểu dữ liệu, lint, build, migration check, secret scan. Những điều cần phán đoán như trải nghiệm người dùng, mức phù hợp với yêu cầu hay trade-off kiến trúc vẫn cần review.

## Đơn giản hóa prompt, không buông quyền kiểm soát

Nếu một dòng trong CLAUDE.md bị bỏ qua nhiều lần, viết hoa hay nhấn mạnh hơn chưa chắc giải quyết được vấn đề. Hãy hỏi: Claude thiếu thông tin, hay đây là điều không được phép phụ thuộc vào phán đoán của Claude?

Nếu thiếu thông tin, bổ sung đúng ngữ cảnh hoặc tạo skill. Nếu là điều bắt buộc, chuyển sang hook, permission rule, sandbox hoặc CI phù hợp. Nếu chỉ là sở thích có ngoại lệ, để model phán đoán thay vì dựng thêm một luật.

Tôi đọc tuyên bố 80% của Anthropic theo cách đó: nó không chứng minh prompt càng ngắn càng tốt. Nó nhắc rằng chỉ dẫn cần đúng chỗ, và quyền kiểm soát cần nằm ở cơ chế có thể thực thi.

## Bài gốc chưa trả lời

- Prompt cũ và mới dài bao nhiêu token?
- Có bao nhiêu bài đánh giá và cỡ mẫu nào?
- Bao nhiêu chỉ dẫn bị bỏ hẳn, bao nhiêu được chuyển sang skills?
- Chi phí và độ trễ thay đổi ra sao?
- Kết quả có giữ nguyên với model và loại công việc khác không?

Đừng lấy 80% làm mục tiêu cho CLAUDE.md. Hãy bỏ những dòng Claude có thể tự tìm ra, chuyển quy trình ít dùng sang skill, và đưa điều bắt buộc sang cơ chế thực thi. Sau đó kiểm tra xem hệ thống vẫn làm đúng việc cần làm.

Bài tiếp theo tách một vấn đề liên quan: Claude nhớ người dùng khác với việc Claude biết cách làm việc trong repo. Còn phần xây dựng phép kiểm, quyền và vận hành agent được mở rộng ở bài 07.

Nguồn: [The new rules of context engineering for Claude 5 generation models](https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/); [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices).
