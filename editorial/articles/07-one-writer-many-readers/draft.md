---
title: Một người viết, nhiều người đọc
description: Khi nào thêm agent cho việc code là có lời, “xong” nghĩa là gì và hóa đơn đi đâu: bằng chứng tháng 11/2026 về multi-agent coding.
verifiedAt: 2026-11-13
art: default
related: ['04']
# publishedAt and order are filled when the article is published (docs/24 section 6). Standalone article: no series.
---

Ngày 13/11/2026, GitHub báo PR [#35](https://github.com/no-babysitting/no_babysitting_anymore/pull/35) của tôi xung đột với `main`. Agent gộp `main` vào nhánh, giải quyết xong rồi đẩy lên. Ngay sau đó, PR xung đột lần nữa.

Cả hai lần chỉ có một file xung đột là `CHANGELOG.md`. Ba PR cùng thêm một mục mới ở đầu file: PR của tôi, [#42](https://github.com/no-babysitting/no_babysitting_anymore/pull/42) và [#46](https://github.com/no-babysitting/no_babysitting_anymore/pull/46). Git không biết mục nào đứng trước nên dừng lại hỏi. Agent giữ cả ba mục, rồi dời mục của PR tôi xuống dưới các mục cùng ngày để lần sau không ai chèn đúng chỗ đó.

Xung đột này vô hại: chỉ là một dòng nhật ký, không phải code. Nhưng nó là ví dụ nhỏ của kiểu va chạm mà các nghiên cứu về <em lang="en">multi-agent coding</em> (nhiều agent cùng làm một việc code) đo trên quy mô lớn. Ba PR ấy chạy song song trên cùng một repo, đúng tình huống đó. Quy ước của repo có hẳn một ngoại lệ cho việc này: commit chỉ gộp `main` để giải xung đột `CHANGELOG.md` không cần chờ CI chạy lại ([AGENTS.md](https://github.com/no-babysitting/no_babysitting_anymore/blob/main/AGENTS.md), mục 2).

Bài này gom bằng chứng tháng 11/2026 về chuyện thêm agent: khi nào có lời, “xong” nghĩa là gì, bạn nên đứng ở đâu và hóa đơn đi đâu. Kết luận trước: với việc code hằng ngày, hãy để một agent ghi và cho các agent khác đọc.

## Mặc định hợp lý là một agent ghi code

Với việc code hằng ngày, một agent ghi là mặc định hợp lý. Bằng chứng không ủng hộ ý nghĩ rằng càng nhiều agent thì càng tốt.

Nghiên cứu có kiểm soát lớn nhất mà bài này dựa vào là của nhóm Google Research, Google DeepMind và MIT ([arXiv 2512.08296](https://arxiv.org/abs/2512.08296), bản 3 ngày 8/4/2026). Họ chạy 260 cấu hình trên sáu bài đo (<em lang="en">benchmark</em>), với năm kiến trúc và ba họ model, giữ nguyên công cụ, prompt và ngân sách token. Phối hợp tập trung cải thiện kết quả 80,8% trên một tác vụ chia nhỏ được (Finance-Agent). Trên bài lập kế hoạch tuần tự (PlanCraft), mọi biến thể multi-agent đều kém hơn, từ 39% đến 70%.

Khi điểm của agent đơn đã vượt khoảng 45%, thêm phối hợp chỉ cho lợi ích giảm dần. Theo các bản tóm tắt thứ cấp, trên SWE-bench Verified mọi kiến trúc multi-agent đều kém hơn đôi chút. Lỗi cũng lan theo cấu trúc: agent độc lập khuếch đại lỗi lên 17,2 lần, còn khi có điều phối viên trung tâm thì 4,4 lần, theo một bản tóm tắt của bài báo.

Hai nguồn từ phía nhà sản xuất đi cùng hướng. Cognition viết (22/4/2026) rằng các nhận định cũ vẫn đúng với bầy nhiều agent cùng ghi code, và thứ chạy được là nhiều agent góp hiểu biết trong khi việc ghi vẫn đơn luồng. Tài liệu agent teams của Claude Code (tháng 11/2026) nói thẳng: với việc tuần tự, sửa chung file hoặc nhiều phụ thuộc, một phiên đơn hoặc một <em lang="en">subagent</em> (agent phụ, có context riêng) hiệu quả hơn.

Hai kết quả nữa đáng cân nhắc. Kết quả thứ nhất đến từ Anthropic (6/2025): hệ nghiên cứu multi-agent của họ tốt hơn 90,2% so với một Opus 4 đơn trên bộ đánh giá nội bộ. Riêng lượng token đã giải thích 80% phương sai hiệu năng trên BrowseComp. Đó là nghiên cứu web, không phải code, và con số 80% gợi ý rằng phần lớn lợi ích đến từ việc chi nhiều token hơn.

Kết quả thứ hai là một nghiên cứu của Stanford ([arXiv 2604.02460](https://arxiv.org/abs/2604.02460), 11/4/2026). Họ giữ cố định số token suy luận và thấy agent đơn luôn bằng hoặc hơn multi-agent trên bài suy luận nhiều bước. Họ thử trên Qwen3, DeepSeek-R1-Distill-Llama và Gemini 2.5.

Từ những số đo trên, tôi rút ra hai danh sách. Thêm agent có lời ở bốn chỗ: tìm kiếm và nghiên cứu theo chiều rộng, giả thuyết debug cạnh tranh, review với context sạch, và vài ticket thật sự độc lập. Với ticket độc lập, mỗi ticket chạy trong một <em lang="en">worktree</em> (thư mục làm việc git riêng cho từng nhánh). Thêm agent thua ở sửa chung file, chuỗi phụ thuộc, refactor xuyên suốt, và mọi việc mà các agent “ngầm quyết định” khác nhau về style hay edge case.

Song song hóa mua tốc độ bằng token. Theo Anthropic (6/2025), một agent đơn dùng khoảng 4 lần token so với chat, còn hệ multi-agent khoảng 15 lần. Một thử nghiệm của người dùng, không công bố phương pháp, đo được nhanh hơn khoảng 35% và tốn gần 3 lần token.

Worktree chỉ tách file, không tách merge. Nghiên cứu [arXiv 2607.04697](https://arxiv.org/abs/2607.04697) (7/2026) xem 33.596 PR của agent trên 2.807 repo và thấy 79,4% số PR chạy chồng thời gian với một PR khác. Xung đột văn bản xảy ra ở 19,8% cặp PR của cùng một agent và 41,7% cặp của hai agent khác nhau, và 84,4% file xung đột là mã nguồn. Dữ liệu lấy từ PR công khai năm 2024–2025, trước khi worktree thành mặc định ở nhiều công cụ, nên số hiện nay có thể thấp hơn.

Vụ `CHANGELOG.md` ở đầu bài thuộc phần còn lại, vô hại về nghĩa. Worktree cũng không tách cổng mạng, database dev hay dịch vụ dùng chung; đây là giai thoại của người dùng, chưa có số đo.

Bảng dưới xếp các mẫu thường gặp theo chi phí và độ chín.

| Mẫu | Hợp với | Chi phí so với một phiên | Độ chín |
|---|---|---|---|
| Một agent, kèm test và hook | Hầu hết việc code hằng ngày | 1 lần (mốc) | Cao |
| Subagent chỉ đọc (tìm kiếm, khám phá) | Codebase lạ, câu hỏi rộng | Tăng; thêm 74% đến 221% nếu ép dùng cho tìm kiếm thông thường | Cao |
| Reviewer ở context sạch | Mọi PR không tầm thường | Thêm một lượt review | Cao |
| Worktree song song, bạn là người điều phối | 2–4 ticket độc lập | Gần như tuyến tính theo số phiên | Cao |
| Điều phối viên và công nhân | Việc lớn chia được, có kiểm chứng tự động | 4–15 lần | Trung bình |
| Bầy tự do (<em lang="en">swarm</em>) | Không khuyến nghị | Rất cao | Thấp |

Về bầy tự do, nghiên cứu MAST (NeurIPS 2025; 1.642 trace, 7 framework) đo tỷ lệ thất bại từ 41% đến 86,7%.

## “Xong” phải là một lệnh trả về đạt hoặc không đạt

Agent tự review code do chính nó viết là lưới an toàn yếu. Nghiên cứu của các tác giả AWS ([arXiv 2605.21537](https://arxiv.org/abs/2605.21537), 5/2026) gọi 11 model thuộc 7 họ, tổng cộng 1.980 lần. Model sinh code âm thầm chấp thuận 31,7% (83 trên 262) trường hợp lệch ngữ nghĩa do chính nó tạo ra. Tỷ lệ bỏ sót theo từng model dao động từ 0% đến 100%.

Context sạch giúp ích. Cognition cho biết Devin Review tìm được trung bình 2 lỗi mỗi PR, khoảng 58% là nghiêm trọng, và hiệu quả nhất khi agent viết với agent review không chia sẻ context nào. Claude Code có `/code-review` chạy trong một subagent mới, chưa từng thấy hội thoại. Phần 04 của Lộ trình chính dạy đúng việc này: nhờ một <em lang="en">reviewer</em> (người duyệt, ở đây là một phiên agent khác) ở context mới.

Reviewer khác hãng cho kết quả tốt hơn trong một nghiên cứu. Song Tae-Eun ([arXiv 2610.01471](https://arxiv.org/abs/2610.01471), 6/10/2026) chạy 900 phiên review trên 150 lỗi cài sẵn. Với cùng hai lần gọi, một review context sạch cộng một review bằng model khác bắt được 56,7% lỗi, so với 42,7% của hai review context sạch cùng model (p = 0,006). Hai cách tìm ra các tập lỗi chỉ trùng một phần (chỉ số Jaccard 41,2%), và reviewer khác hãng nhưng là model nhẹ thì không tốt hơn.

Kết quả này có hai hạn chế. Ở hạng model cao nhất, reviewer khác hãng không khác biệt có ý nghĩa về F1 so với review cùng model ở phiên mới, và tác giả không tách được hiệu ứng “khác model” khỏi hiệu ứng “reviewer mạnh”. Đây cũng là một bản thảo chưa bình duyệt (<em lang="en">preprint</em>) của một tác giả, dùng lỗi cài sẵn.

Lặp review trong cùng một phiên còn phản tác dụng: một bản thảo trước của cùng tác giả thấy dương tính giả tăng 62%, với độ tin thấp. Cognition lập luận ngược lại: cùng một model vẫn review tốt vì nó “không có cái tôi”, còn thiên lệch chung đến từ huấn luyện.

Vì vậy tôi xếp thứ tự ưu tiên cho “xong” như sau:

1. Test và typecheck, chạy bằng <em lang="en">Stop hook</em> (hook chạy khi agent định dừng, để agent không báo xong sớm).
2. Một reviewer chỉ có quyền đọc, ở context sạch.
3. Một reviewer khác hãng, chỉ cho đường rủi ro cao như auth, thanh toán, migration và xóa dữ liệu.
4. Bạn duyệt merge.

Luôn đòi bằng chứng: lệnh đã chạy và output của nó. Đừng nhận câu “tất cả test đều qua”.

## Điểm duyệt của bạn nên là lúc merge, không phải từng lệnh

Quyền tự chủ của agent có hai lớp. Lớp phán đoán gồm bộ phân loại (<em lang="en">classifier</em>) và `CLAUDE.md`. Lớp tất định gồm quy tắc từ chối, <em lang="en">sandbox</em> (môi trường cô lập, agent có hỏng cũng không chạm ra ngoài), hook và bảo vệ nhánh. Tài liệu [best practices của Claude Code](https://code.claude.com/docs/en/best-practices) (tháng 11/2026) xếp câu hỏi “ai có tiếng nói cuối cùng” vào lớp tất định, gồm bảo vệ nhánh và một người duyệt merge.

Auto mode giảm số lần hỏi quyền nhưng không phải ranh giới an ninh. Tài liệu viết thẳng rằng nó không đảm bảo an toàn, dù từ Claude Code v2.1.283 đây là chế độ khởi đầu mặc định. Theo số đo nội bộ của Anthropic (20/10/2025), sandbox giảm 84% số lần hỏi quyền.

Một đánh giá độc lập ([arXiv 2604.04978](https://arxiv.org/abs/2604.04978), 4/2026) thấy auto mode chỉ mang lại lợi ích ròng khiêm tốn trên tác vụ mơ hồ. Trong đó, 36,8% hành động thay đổi trạng thái đi qua đường sửa file mà bộ phân loại không xét.

Duyệt kế hoạch cũng không tự động có nghĩa là có người duyệt. Trong agent teams, nếu một teammate chạy ở plan mode mà bạn chưa đổi permission mode của nó, kế hoạch được tự động chấp thuận (tài liệu Claude Code, tháng 11/2026).

Khi số luồng tăng, sự chú ý của bạn thành nút cổ chai. Codex app 26.224 (2/2026) thêm duyệt song song, và changelog của Codex CLI ghi rằng yêu cầu duyệt từ một luồng không hoạt động có thể hiện lên khi bạn đang xem luồng chính. Cognition cũng nêu đúng điểm này.

Khi bạn vắng mặt, dùng `/goal` hoặc Stop hook để agent không dừng sớm. Đặt `--max-turns` và `--max-budget-usd` khi chạy với cờ `-p`. Chạy trong container hoặc máy ảo khi bỏ hỏi quyền. Gom câu hỏi vào một file hoặc issue thay vì để agent chờ.

Quy tắc mặc định tôi đề xuất cho người không code toàn thời gian: agent làm mọi thứ trong sandbox và trên nhánh riêng, nhưng không tự merge vào `main` và không chạm production. Điểm duyệt của bạn là lúc merge PR, không phải từng lệnh.

## Hóa đơn đến từ số lượt và bộ đệm, không đến từ độ dài output

Phần lớn hóa đơn là context được gửi lại ở mỗi lượt. Weinberger và Hozez (PointFive; [arXiv 2607.12161](https://arxiv.org/abs/2607.12161), 7/2026) xem khoảng 5.500 lần chạy có hóa đơn thật. Việc ghi và đọc bộ đệm (<em lang="en">prompt cache</em>) chiếm khoảng 87% chi phí dựng lại, tức khoảng 80% hóa đơn thực, còn phần người dùng can thiệp được chỉ chiếm khoảng 6% chi phí.

Vì thế cắt token chưa chắc cắt tiền. Cùng nghiên cứu cho thấy nén output của công cụ giảm 38,4% token nhưng tăng 6,8% chi phí và giảm tỷ lệ hoàn thành. Nhiều công cụ “tiết kiệm token” đang được quảng cáo có thể phản tác dụng theo cách này.

Subagent có chi phí khởi động cố định: system prompt, `CLAUDE.md` và schema công cụ, khoảng 37.000 token theo một người dùng đo. Tài liệu Claude Code nói chi phí của subagent chủ yếu là token và khuyên xem `/usage` theo từng loại. Tài liệu Codex cũng ghi workflow subagent tốn token hơn chạy đơn tương đương.

Một thí nghiệm của người dùng, có đăng ký trước, thêm “use subagents” vào việc tìm kiếm code thông thường qua 216 lần chạy. Chi phí tăng 74–116% với Haiku 5.5 và 143–221% với Opus 5.5, còn tỷ lệ tìm thấy không đổi (97–100%). Chạy ở chế độ không giao diện (<em lang="en">headless</em>), kết quả của subagent có thể về muộn, nên script CI phải đọc mọi sự kiện kết quả.

Bộ đệm làm con số “15 lần token” bớt đáng sợ về tiền. Theo tài liệu prompt caching của Claude Platform (tháng 11/2026), đọc từ bộ đệm tính 0,1 lần giá input cơ bản, và chỉ 0,05 lần trên Claude Opus 5.5 và Sonnet 5.5 (0,025 lần trên Fable và Mythos 5.1–5.2). Một tổng hợp có dẫn nghiên cứu của PwC (hơn 500 phiên) báo cáo prompt caching giảm 41–80% chi phí.

Song song hóa vẫn có thể đáng tiền nếu giá trị của bạn nằm ở thời gian chờ chứ không ở token. Với gói thuê bao, thứ bạn tiêu là hạn mức 5 giờ và hạn mức tuần, không phải đô la, nên multi-agent đốt hạn mức nhanh hơn tương ứng.

Các việc đáng làm để cắt chi phí, theo thứ tự tiết kiệm trên công sức:

| Việc | Tiết kiệm đo được | Độ chắc của bằng chứng |
|---|---|---|
| Dùng một phiên khi chưa cần song song | Tránh 3–15 lần token (Anthropic, 6/2025; thử nghiệm của người dùng) | Số đo không công bố phương pháp; giai thoại |
| Không ép “use subagents” cho tìm kiếm thông thường | Tránh thêm 74–221% chi phí | Thí nghiệm của người dùng, không công bố phương pháp |
| Rút gọn `CLAUDE.md` và `AGENTS.md`, bỏ phần do LLM sinh | Trung bình hơn 20% chi phí suy luận ([arXiv 2602.11988](https://arxiv.org/abs/2602.11988)) | Nghiên cứu có công bố phương pháp |
| Giữ phần đầu prompt ổn định để cache còn hiệu lực: không bật tắt auto mode, không đổi model hay công cụ MCP giữa phiên | Mức tiết kiệm của cache: 41–80% so với không có cache | Số đo không công bố phương pháp |
| Dùng model rẻ cho subagent chỉ đọc (`model: haiku` trong frontmatter, hoặc `CLAUDE_CODE_SUBAGENT_MODEL`) | Chưa có số đo độc lập; theo bảng giá, bằng tỷ lệ giá giữa các hạng | Ước tính |
| Tắt MCP server không dùng | Chưa có số đo; tài liệu xác nhận schema chiếm context | Tài liệu của hãng |
| Theo dõi bằng `/usage` theo loại subagent; đặt `--max-budget-usd` cho chạy nền | Không tiết kiệm trực tiếp, giúp tìm chỗ rò | Tài liệu của hãng |
| Bỏ công cụ nén output trừ khi đo được chi phí trên mỗi lần thành công | Tránh thêm 6,8% chi phí ([arXiv 2607.12161](https://arxiv.org/abs/2607.12161)) | Nghiên cứu có công bố phương pháp |

## Năm mặc định để bắt đầu

Các mặc định dưới đây giả định bạn dùng Claude Code theo gói thuê bao, làm trên vài repo cỡ nhỏ đến vừa, có test ở mức cơ bản và dành vài giờ mỗi tuần để trông. Lĩnh vực này đổi hàng tháng, nên mọi mốc ở đây là của tháng 11/2026.

1. **“Xong” là một lệnh.** Mặc định là một lệnh test hoặc typecheck do Stop hook chạy. Không có kiểm chứng thì multi-agent chỉ nhân lỗi lên.
2. **Một người viết.** Nghiên cứu của Google và MIT, bài của Cognition và tài liệu Claude Code cùng chỉ về một hướng.
3. **Review ở context sạch, chỉ đọc,** cho mọi thay đổi không tầm thường. Thêm reviewer khác hãng cho auth, thanh toán, migration và xóa dữ liệu, nhưng nhớ rằng bằng chứng cho việc này mới là một bản thảo.
4. **Song song là tùy chọn, mặc định tắt.** Bật worktree khi có từ hai ticket độc lập trở lên, chia theo thư mục, merge lần lượt, chạy lại test sau mỗi lần merge, và để một phiên duy nhất xử lý xung đột.
5. **Ngân sách theo hạn mức.** Theo dõi `/usage`, đặt `--max-budget-usd` cho chạy nền, và chỉ dùng agent teams hay mẫu điều phối viên và công nhân sau khi đo được nhu cầu.

## Điều chưa ai đo, và điều sẽ làm tôi đổi ý

Chưa thấy thử nghiệm ngẫu nhiên nào so sánh multi-agent với agent đơn cho người làm một mình, trên repo thật, về thời gian, chất lượng và chi phí. Bằng chứng về năng suất của con người nói chung cũng yếu: METR (24/2/2026) công bố nghiên cứu tiếp nối và tự gọi kết quả là “không đáng tin”, vì 30–50% người tham gia né những tác vụ họ không muốn làm khi thiếu AI.

Bằng chứng cho reviewer khác hãng chỉ là một bản thảo của một tác giả, dùng lỗi cài sẵn. Dữ liệu xung đột merge lấy từ PR năm 2024–2025. Các số đo của Anthropic và Cognition đều là dữ liệu nội bộ.

Tôi sẽ đổi khuyến nghị nếu:

- agent teams rời trạng thái thử nghiệm, kèm bài đo công khai;
- có giao thức để các agent ghi song song chia sẻ quyết định ngầm của nhau, và nó giảm được xung đột về nghĩa;
- giá đọc bộ đệm hoặc hạn mức thuê bao đổi mạnh;
- có bằng chứng auto mode hoặc bộ phân loại chặn được prompt injection có chủ đích.

Bằng chứng còn thiếu ở hai chỗ nữa: chi phí duy trì dài hạn của hệ điều phối tự dựng, và tỷ lệ lỗi về nghĩa sau một lần merge sạch.

## Thêm agent là đổi chỗ trông, không phải bớt trông

Thêm agent không làm bạn bớt phải trông. Nó đổi chỗ bạn phải trông, từ từng lệnh sang merge, review và hạn mức. Một người viết, nhiều người đọc giữ chỗ đó ở một nơi. Đây là quan điểm của tôi: không nghiên cứu nào ở trên đo trực tiếp chuyện này.
