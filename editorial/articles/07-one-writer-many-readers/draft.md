---
title: "Xây dựng AI Agent đáng tin cậy: một người viết, nhiều người đọc"
description: Từ context, memory và model đến quyền thực thi, kiểm chứng và multi-agent: cách thiết kế một hệ agent có thể giao việc mà không phải trông từng bước.
verifiedAt: 2026-11-14
art: default
related: ['01', '02', '03', '08']
---

Một agent viết được code chưa có nghĩa là bạn có thể giao cho nó một công việc rồi yên tâm quay lại sau. Muốn giao việc mà không phải trông từng bước, bạn cần biết nó được cung cấp thông tin gì, được phép làm gì, kiểm tra kết quả bằng cách nào và ai chịu trách nhiệm khi có sai sót.

Đó là bài toán engineering, không phải bài toán chọn model. Model giỏi giúp agent phán đoán tốt hơn; nó không tự tạo ra ranh giới quyền hạn, nguồn sự thật hay bằng chứng rằng công việc đã hoàn tất.

## Một agent đáng tin cậy cần nhiều lớp

Tôi nhìn một hệ AI Agent qua bốn lớp. Chúng liên quan chặt chẽ nhưng không thay thế nhau.

| Lớp | Câu hỏi cần trả lời | Thành phần điển hình |
|---|---|---|
| Context và instructions | Agent cần biết gì để làm đúng việc? | System prompt, CLAUDE.md, skills, tài liệu và ví dụ |
| Memory và state | Điều gì cần được giữ qua phiên, và nguồn nào đáng tin? | Memory, state store, database nghiệp vụ, event log |
| Model và reasoning | Model nào đủ năng lực, cần suy nghĩ sâu đến đâu? | Model selection, effort, routing, escalation |
| Execution và verification | Agent được phép làm gì, và bằng chứng nào xác nhận kết quả? | Tools, permissions, sandbox, hooks, tests, CI, human review |

Chi phí chạy hệ thống đi xuyên cả bốn lớp. Đừng chỉ đo token; hãy đo chi phí để tạo ra một kết quả được chấp nhận, gồm cả thời gian người phải sửa, review và xử lý sự cố.

## Context phải đủ, nhưng không cần nhồi tất cả vào prompt

Agent chỉ có thể phán đoán từ những gì nó nhìn thấy và truy cập được. Nếu yêu cầu nằm trong một ticket, quy ước nằm trong repo, còn tiêu chí nghiệm thu chỉ được nói trong một cuộc họp, agent không thể tự ghép chúng thành một đặc tả hoàn chỉnh nếu bạn không đưa chúng vào đúng ngữ cảnh.

Không phải mọi thứ đều cần nằm trong system prompt. Chỉ dẫn chung nên ngắn và ổn định; kiến thức dự án đặt trong file chỉ dẫn; quy trình chuyên biệt có thể nạp qua skill; dữ liệu thay đổi thường xuyên nên được lấy từ nguồn có thẩm quyền.

Bài 01 phân tích vì sao giảm lời dặn không đồng nghĩa với giảm kiểm soát. Điểm mấu chốt là đặt thông tin vào đúng nơi, và không dùng prompt để thay thế một cơ chế thực thi.

## Memory không phải nguồn sự thật mặc định

Memory giúp giảm việc nhắc lại, nhưng có ba vấn đề khác nhau: thông tin có được lưu không, có được truy xuất đúng lúc không, và agent có dùng nó đúng không.

Sở thích cá nhân có thể giao cho harness ghi nhớ nếu người dùng xem và sửa được. Quy ước repo cần được ghi vào file có version control. Trạng thái nghiệp vụ như “đã thanh toán”, “đã gửi” hoặc “đã phê duyệt” cần được đọc từ hệ thống ghi nhận giao dịch, không lấy từ một câu agent nhớ lại.

Khi có nhiều agent, vấn đề còn rõ hơn. Hai agent có thể giữ hai phiên bản khác nhau của cùng một quyết định. Nếu không có nguồn sự thật chung và quy tắc cập nhật state, việc thêm agent có thể nhân bản sự không nhất quán thay vì tăng năng lực.

## Model và effort là núm năng lực, không phải núm quyền hạn

Model mạnh hơn hoặc effort cao hơn có thể giúp xử lý tác vụ phức tạp, nhiều trường hợp biên. Nhưng chúng không nên tự động kéo theo quyền truy cập rộng hơn.

Bắt đầu ở mặc định phù hợp của đúng model và bề mặt, sau đó đo trên các tác vụ đại diện. Nếu chất lượng tăng đủ để bù chi phí và độ trễ, mới nâng effort hoặc định tuyến sang model khác. Nếu một tác vụ chỉ đọc dữ liệu nhưng khó suy luận, có thể cần reasoning sâu mà không cần quyền ghi. Một thao tác xóa dữ liệu có thể rất đơn giản nhưng vẫn cần xác nhận và quyền hạn chế.

Nguyên tắc vận hành: **leo thang năng lực khi có bằng chứng; leo thang quyền hạn chỉ khi được cho phép rõ ràng.** Bài 03 đi sâu vào cách chọn model và effort.

## Quyền hạn cần được thiết kế ngoài lời dặn

Prompt có thể nói “không sửa production”, nhưng câu đó vẫn là hướng dẫn cho model. Một hệ thống đáng tin cậy cần những ranh giới được thực thi bởi harness và hạ tầng.

- Permissions xác định công cụ và tài nguyên agent được dùng.
- Sandbox giới hạn vùng agent có thể tác động khi chạy lệnh hoặc sửa file.
- Hooks thực thi các điều kiện tại những thời điểm xác định trong vòng đời agent.
- Branch protection và phê duyệt giữ quyền merge ở người có trách nhiệm.
- Secrets và credentials cần phạm vi tối thiểu, thời hạn phù hợp và không đưa vào context không cần thiết.

Không phải mọi rủi ro đều giải quyết bằng cùng một lớp. Permission rules không thay thế sandbox; sandbox không thay thế review; review không thay thế kiểm soát production.

## “Xong” phải có bằng chứng kiểm chứng được

Một agent nói “đã hoàn tất” chỉ là một báo cáo. Hãy định nghĩa đầu ra và điều kiện nghiệm thu trước khi giao việc: file nào cần thay đổi, hành vi nào phải đúng, test nào phải qua, điều gì không được làm và khi nào phải dừng để hỏi người.

Sau đó thiết kế các cổng kiểm tra theo mức độ:

1. **Trong phiên:** agent chạy test, typecheck, lint hoặc phép kiểm phù hợp và đọc kết quả.
2. **Tại điểm kết thúc:** Stop hook có thể chạy điều kiện bắt buộc hoặc yêu cầu agent xử lý khi phép kiểm thất bại.
3. **Trên pull request:** CI chạy lại các check trong môi trường repo, độc lập với lời tự báo cáo của agent.
4. **Trước merge:** branch protection yêu cầu các check bắt buộc đạt; reviewer kiểm tra diff, yêu cầu và rủi ro.
5. **Trước production:** quy trình triển khai, quyền truy cập và phê duyệt riêng cho môi trường có hậu quả thực tế.

CI xanh không chứng minh phần mềm hoàn toàn đúng. Nó chỉ chứng minh các check đã cấu hình đạt trong môi trường đã chạy. Test có thể thiếu; build có thể xanh nhưng sai yêu cầu; migration có thể qua test nhưng gây sự cố ở dữ liệu thật. Vì vậy cần kết hợp kiểm tra tự động với review theo rủi ro.

## Một người viết, nhiều người đọc

Đến đây mới nên hỏi có cần nhiều agent không. Multi-agent không phải chế độ mặc định cho mọi công việc. Nó là một cách phân bổ công việc, có lợi khi phần việc độc lập, có thể chạy song song và có đầu ra dễ hợp nhất.

Một nguyên tắc thực dụng là để một agent ghi vào một vùng code tại một thời điểm, còn agent khác làm việc đọc: tìm hiểu codebase, đề xuất phương án, rà yêu cầu, tìm lỗi hoặc review diff. Điều này giảm xung đột khi nhiều agent cùng sửa một file hoặc cùng quyết định những chi tiết ngầm như style và cấu trúc.

Nghiên cứu có kiểm soát của nhóm Google Research, Google DeepMind và MIT cho thấy phối hợp có thể cải thiện kết quả trên tác vụ chia nhỏ được, nhưng các biến thể multi-agent kém hơn trên tác vụ lập kế hoạch tuần tự. Đây không phải bằng chứng rằng một agent luôn tốt hơn; nó cho thấy lợi ích phụ thuộc cấu trúc công việc. Một nghiên cứu khác về agent coding trên PR công khai ghi nhận xung đột giữa các thay đổi song song, nhưng dữ liệu được thu thập trong giai đoạn 2024–2025 nên không thể coi là tỷ lệ hiện tại cho mọi công cụ.

Vụ ba PR cùng chèn đầu file CHANGELOG trong repo này là một ví dụ nhỏ về xung đột tích hợp. Nó không phải thử nghiệm multi-agent và không chứng minh cả ba PR do agent tạo ra. Nó chỉ cho thấy nhiều thay đổi độc lập vẫn có thể va vào cùng một điểm khi tích hợp.

Thêm agent thường hợp với:
- Tìm kiếm và nghiên cứu theo chiều rộng.
- Các giả thuyết debug độc lập.
- Review trong context sạch, chỉ đọc.
- Ticket độc lập, tách bằng worktree và có ranh giới file rõ.

Thêm agent thường không hợp với:
- Chuỗi công việc tuần tự có phụ thuộc chặt.
- Nhiều agent cùng sửa một file hoặc cùng một vùng dữ liệu.
- Refactor xuyên suốt cần một quyết định kiến trúc thống nhất.
- Công việc mà kết quả của agent này liên tục làm thay đổi giả định của agent kia.

Worktree tách thư mục làm việc, không tự giải quyết xung đột ngữ nghĩa, migration, database dùng chung hay merge. Bạn vẫn cần một người hoặc một agent tích hợp duy nhất, có trách nhiệm chạy lại phép kiểm sau mỗi lần merge.

## Reviewer độc lập hữu ích, nhưng không phải oracle

Agent tự review code của chính nó có thể bỏ qua lỗi mà nó vừa tạo ra. Một reviewer ở context sạch có cơ hội nhìn diff mà không bị neo vào lập luận trước đó. Reviewer khác model hoặc khác nhà cung cấp có thể bổ sung góc nhìn, nhất là với thay đổi rủi ro cao.

Tuy nhiên, không nên biến điều này thành nghi thức gọi thêm agent cho mọi pull request. Bằng chứng về lợi ích của reviewer khác model còn phụ thuộc nghiên cứu, loại lỗi và năng lực reviewer. Một reviewer yếu hoặc không có tiêu chí rõ ràng chỉ tạo thêm output để người khác đọc.

Hãy giao reviewer một nhiệm vụ hẹp: tìm lỗi có thể chỉ ra bằng file, dòng, điều kiện tái hiện và hậu quả. Reviewer chỉ đọc; agent sửa là người khác. Cuối cùng, test và người duyệt quyết định việc có chấp nhận thay đổi hay không.

## Đo chi phí trên kết quả được chấp nhận

Chi phí multi-agent không chỉ là giá token. Mỗi agent có thể cần system prompt, context, schema công cụ và kết quả trung gian. Một workflow nhanh hơn nhưng tạo nhiều lỗi, review lâu hơn hoặc cần người hợp nhất phức tạp chưa chắc rẻ hơn.

Tôi sẽ theo dõi ít nhất năm chỉ số:

- Tỷ lệ task được chấp nhận ngay lần đầu.
- Số lỗi nghiêm trọng lọt qua review hoặc test.
- Thời gian từ lúc giao đến lúc kết quả được chấp nhận.
- Tổng chi phí model, công cụ và hạ tầng.
- Thời gian con người dành cho điều phối, sửa và duyệt.

Chỉ số quan trọng nhất là **cost per accepted outcome**: tổng chi phí để có một kết quả được chấp nhận, không phải giá của một lượt gọi model. Nếu thêm agent làm tăng token nhưng giảm đáng kể thời gian chờ và lỗi, nó có thể đáng tiền. Nếu chỉ tạo thêm báo cáo và merge conflict, hãy bỏ.

## Năm mặc định để bắt đầu

1. Một agent thực thi; agent khác chủ yếu đọc, tìm kiếm hoặc review.
2. Chỉ dẫn thường xuyên nằm trong file dự án; quy trình chuyên biệt nạp khi cần; dữ liệu nghiệp vụ lấy từ nguồn có thẩm quyền.
3. Quyền tối thiểu, sandbox phù hợp và không cho agent tự merge hoặc chạm production nếu chưa được cấp quyền rõ ràng.
4. “Xong” có phép kiểm cụ thể; CI và branch protection giữ cổng độc lập với lời tự báo cáo.
5. Chỉ bật multi-agent khi công việc độc lập, lợi ích đo được và có cách tích hợp kết quả.

## Điều gì sẽ khiến tôi đổi ý?

Tôi sẽ thay đổi các mặc định này nếu có bằng chứng trên repo và workflow tương tự cho thấy multi-agent cải thiện đồng thời chất lượng, thời gian và tổng chi phí; nếu cơ chế chia sẻ state giảm được xung đột ngữ nghĩa; hoặc nếu các công cụ kiểm chứng và quyền hạn mới thay đổi đáng kể chi phí điều phối.

Hiện tại, tôi không xem “nhiều agent” là mục tiêu. Mục tiêu là một hệ thống có thể giao việc, kiểm tra được kết quả và giới hạn được hậu quả khi agent sai. Một người viết, nhiều người đọc là mặc định hữu ích để bắt đầu, không phải quy luật cho mọi bài toán.

## Ghi chú về bằng chứng

Bài này kết hợp tài liệu sản phẩm, nghiên cứu học thuật, báo cáo từ nhà cung cấp và ví dụ từ repo. Các số liệu từ nghiên cứu chỉ có ý nghĩa trong điều kiện, benchmark và phiên bản mà nguồn công bố. Một số nguồn trong sổ nghiên cứu trước đây chưa được mở lại độc lập; các số liệu chưa xác minh không được dùng làm cơ sở cho kết luận định lượng trong bản này. Trước khi xuất bản, cần đối chiếu lại từng nguồn gốc và cập nhật ngày xác minh.

## Nguồn tham khảo

- [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- [Claude Code memory](https://code.claude.com/docs/en/memory)
- [Claude Code model configuration](https://code.claude.com/docs/en/model-config)
- [Google Research / Google DeepMind / MIT multi-agent study](https://arxiv.org/abs/2512.08296)
- [Anthropic: Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- [Cognition: Multi-agents working](https://cognition.com/blog/multi-agents-working)
- [Agent PR conflict study](https://arxiv.org/abs/2607.04697)
- [MAST: Multi-Agent Systems Failure Taxonomy](https://arxiv.org/abs/2503.13657)
