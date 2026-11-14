---
title: "AI Agent đáng tin cậy: từ model đến hệ thống"
description: Một framework tổng quan để thiết kế AI Agent: context, memory, reasoning, execution, verification và trách nhiệm của con người.
verifiedAt: 2026-11-14
art: default
related: ['01', '02', '03', '07']
---

# AI Agent đáng tin cậy: từ model đến hệ thống

Một model có thể viết code, gọi công cụ, tìm kiếm tài liệu và hoàn thành nhiều bước liên tiếp. Nhưng khả năng làm được nhiều việc không đồng nghĩa với khả năng được giao việc mà không cần giám sát.

Độ tin cậy của AI Agent không nằm riêng trong model. Nó là thuộc tính của cả hệ thống: thông tin agent nhận được, trạng thái agent giữ lại, năng lực suy luận, quyền agent được cấp, cách kết quả được kiểm tra và người chịu trách nhiệm cuối cùng.

Bài này đưa ra một khung tổng quan để nhìn hệ thống đó. Các bài 01, 02, 03 và 07 đi sâu từng phần.

## Đừng bắt đầu từ câu hỏi chọn model nào

Khi một agent làm sai, phản xạ thường là đổi sang model mạnh hơn hoặc viết prompt dài hơn. Nhưng hai cách đó chỉ giải quyết được một phần nguyên nhân.

Agent có thể làm sai vì thiếu yêu cầu, đọc nhầm dữ liệu cũ, không có quyền gọi công cụ cần thiết, được cấp quyền quá rộng, không có phép kiểm phù hợp hoặc tự kết luận thành công dù thao tác thất bại. Mỗi nguyên nhân cần một lớp giải pháp khác nhau.

Một hệ agent có thể được nhìn qua bốn lớp:

| Lớp | Câu hỏi thiết kế | Năng lực cần có |
|---|---|---|
| Context & Instructions | Agent cần biết gì? | Yêu cầu, quy tắc, tài liệu, ví dụ và tiêu chí hoàn thành |
| Memory & State | Agent cần nhớ gì, và tin nguồn nào? | Memory có phạm vi, state có cấu trúc, nguồn sự thật có thẩm quyền |
| Model & Reasoning | Cần năng lực suy luận nào? | Chọn model, effort, routing và cơ chế leo thang |
| Execution & Verification | Agent được làm gì, và chứng minh kết quả ra sao? | Tools, permissions, sandbox, hooks, tests, CI và human review |

Bốn lớp không phải pipeline tuyến tính. Chúng tạo thành một vòng lặp: context định hướng hành động; memory cung cấp trạng thái; model chọn bước tiếp theo; execution tạo ra thay đổi; verification phản hồi kết quả và cập nhật state.

## 1. Context: nói đủ điều cần biết, không nhồi tất cả

Context là tập hợp thông tin agent có thể sử dụng trong một lượt làm việc: chỉ dẫn, yêu cầu, tài liệu, lịch sử hội thoại, kết quả tool và dữ liệu được truy xuất.

Một context tốt không phải context dài nhất. Nó phải giúp agent phân biệt mục tiêu, ràng buộc, nguồn tham chiếu và điều kiện hoàn thành. Thông tin ổn định có thể nằm trong system prompt hoặc file chỉ dẫn; quy trình chuyên biệt nên nạp khi cần; dữ liệu thay đổi cần được truy xuất từ nguồn hiện hành.

Nếu mọi thứ đều được đưa vào prompt, context phình to, thông tin quan trọng bị chìm và mỗi thay đổi nhỏ có thể làm hỏng tính ổn định của workflow. Nếu context quá ít, agent phải đoán những điều người giao việc biết nhưng chưa nói.

Câu hỏi thiết kế không phải “prompt dài bao nhiêu là đủ”, mà là: **điều gì agent không thể tự suy ra, và cần xuất hiện ở đâu để được dùng đúng lúc?**

Bài 01 đi sâu vào system prompt, CLAUDE.md, skills và sự khác nhau giữa lời dặn với cơ chế kiểm soát.

## 2. Memory và state: lưu không đồng nghĩa với biết

Memory thường được dùng để chỉ nhiều thứ: sở thích cá nhân, tri thức dự án, kết quả hội thoại, trạng thái một workflow hoặc dữ liệu nghiệp vụ. Nếu gom tất cả vào một kho nhớ, hệ thống dễ nhầm ghi chú với sự thật.

Có thể phân biệt ba nhóm:

- **Personal memory:** sở thích, cách giao tiếp và phản hồi của người dùng.
- **Project knowledge:** quy ước, kiến trúc, lệnh build, quyết định và tài liệu của repo.
- **Operational state:** trạng thái tác vụ, giao dịch, phê duyệt, lần chạy và kết quả từ hệ thống.

Personal memory có thể được harness tự ghi nhớ nếu người dùng có thể xem và sửa. Project knowledge cần nguồn có version control và được cập nhật theo repo. Operational state cần dữ liệu có cấu trúc từ hệ thống ghi nhận sự kiện, không dựa vào một câu agent nhớ lại.

Một hệ memory phải trả lời được bốn câu hỏi: lưu ở đâu, ai được đọc, khi nào được truy xuất và nguồn nào thắng khi có xung đột. Có dữ liệu trong kho chưa chắc agent lấy ra đúng lúc; lấy ra đúng chưa chắc agent diễn giải đúng.

Bài 02 phân tích ranh giới giữa “nhớ tôi” và “biết cách làm việc trong repo này”.

## 3. Model và reasoning: đủ năng lực cho tác vụ, không tự tăng quyền

Model quyết định một phần khả năng hiểu yêu cầu, suy luận và sử dụng công cụ. Effort có thể điều chỉnh mức độ suy nghĩ. Routing có thể chọn model khác nhau cho những nhóm tác vụ khác nhau.

Nhưng không có model tốt nhất cho mọi việc. Model nhẹ có thể đủ cho phân loại, trích xuất hoặc tác vụ có cấu trúc. Model mạnh hơn có thể phù hợp với phân tích nhiều bước, trường hợp biên hoặc quyết định có nhiều ràng buộc. Cấu hình cần được đánh giá trên dữ liệu và tiêu chí của chính workflow.

Đừng chỉ đo tỷ lệ hoàn thành. Hãy đo lỗi nghiêm trọng, tỷ lệ cần người sửa, thời gian tới khi được chấp nhận và chi phí. Nếu effort cao làm tăng chất lượng nhưng không đủ bù thời gian và chi phí, đó không phải mặc định tốt hơn.

Quan trọng hơn, **năng lực và quyền hạn là hai trục độc lập**. Model mạnh hơn không tự động được quyền truy cập thêm dữ liệu, ghi vào hệ thống hay triển khai production.

Bài 03 bàn về lựa chọn model, effort và cách leo thang dựa trên bằng chứng.

## 4. Execution và verification: hành động phải có ranh giới, kết quả phải có bằng chứng

Một agent có thể tạo ra thay đổi thật: sửa file, gọi API, gửi email, cập nhật CRM hoặc khởi chạy quy trình. Vì vậy, thiết kế tool không chỉ là thiết kế khả năng; đó còn là thiết kế quyền.

Cần xác định:
- Agent được gọi tool nào và với tham số nào?
- Dữ liệu nào được đọc, ghi hoặc xóa?
- Thao tác nào có thể hoàn tác?
- Khi nào phải xin xác nhận?
- Những điều kiện nào phải đạt trước khi kết thúc?

Prompt có thể hướng dẫn, nhưng không nên là lớp bảo vệ duy nhất. Permission rules, sandbox, secrets management và hooks tạo ra ranh giới thực thi. Với workflow code, tests và typecheck kiểm tra hành vi; CI chạy lại các check trên pull request; branch protection giữ merge lại nếu điều kiện bắt buộc chưa đạt; người có trách nhiệm duyệt những thay đổi có hậu quả.

Không một check nào chứng minh hệ thống hoàn toàn đúng. Test chỉ kiểm tra các trường hợp đã viết; CI chỉ chạy những gì được cấu hình; reviewer có thể bỏ sót. Mục tiêu là nhiều lớp kiểm tra có phạm vi rõ ràng, không phải một dấu tick tạo cảm giác an toàn.

## Multi-agent là lựa chọn kiến trúc, không phải cấp độ tiến hóa

Khi một agent đơn không đủ, ta có thể thêm subagent hoặc nhiều agent chuyên biệt. Nhưng nhiều agent không tự động tạo ra một hệ thống tốt hơn.

Multi-agent có lợi khi công việc có thể chia thành phần độc lập, mỗi phần có đầu ra rõ và có thể hợp nhất. Nó kém phù hợp với chuỗi phụ thuộc chặt, nhiều agent cùng sửa một tài nguyên hoặc các quyết định cần một nguồn sự thật thống nhất.

Một mặc định thực dụng là một agent ghi vào một vùng code tại một thời điểm; các agent khác có thể tìm kiếm, phân tích, kiểm tra hoặc review. Tách worktree giảm va chạm file nhưng không giải quyết xung đột ngữ nghĩa hay dữ liệu dùng chung. Hệ thống vẫn cần một điểm tích hợp và một người chịu trách nhiệm cuối.

Bài 07 đi sâu vào độ tin cậy khi vận hành agent, kiểm chứng, quyền hạn, multi-agent coding và kinh tế của việc thêm agent.

## Unit economics: đo chi phí của kết quả được chấp nhận

Giá token không phải toàn bộ chi phí. Một workflow còn tiêu tốn thời gian chờ, công cụ, hạ tầng, review, sửa lỗi, điều phối và xử lý sự cố.

Chỉ số nên quan tâm là **cost per accepted outcome**: tổng chi phí để tạo ra một kết quả được chấp nhận theo tiêu chí đã định. Một agent rẻ nhưng thường phải sửa nhiều có thể đắt hơn model mạnh hơn làm đúng ngay. Một hệ multi-agent nhanh hơn nhưng khiến con người tốn thời gian hợp nhất có thể không tạo ra lợi ích thực.

Vì thế, đo ít nhất bốn thành phần: chất lượng đầu ra, thời gian tới khi được chấp nhận, chi phí hệ thống và thời gian con người. Đừng tối ưu riêng token hoặc số lượng agent.

## Con người vẫn giữ trách nhiệm

No babysitting không có nghĩa là no supervision. Mục tiêu không phải con người biến mất khỏi quy trình; mục tiêu là con người không phải đứng cạnh agent để nhắc từng bước.

Con người nên tập trung vào những điểm có giá trị phán đoán cao: xác định mục tiêu, thiết kế ranh giới quyền, đặt tiêu chí nghiệm thu, xử lý ngoại lệ và chịu trách nhiệm cho quyết định cuối. Những việc lặp lại có thể kiểm tra được nên được tự động hóa; những việc không thể hoàn tác hoặc có hậu quả lớn cần cổng phê duyệt phù hợp.

Một hệ agent trưởng thành không phải hệ thống không bao giờ sai. Đó là hệ thống biết giới hạn điều nó được làm, phát hiện khi kết quả không đạt, đưa ra bằng chứng và dừng đúng lúc để con người quyết định.

## Bản kiểm tra thiết kế

Trước khi đưa một agent vào workflow thật, hãy trả lời:

1. **Context:** Yêu cầu, ràng buộc và tiêu chí hoàn thành có rõ và truy cập được không?
2. **Memory:** Điều gì được lưu, ai có thể sửa và nguồn nào là sự thật cuối cùng?
3. **Reasoning:** Model và effort đã được đánh giá trên tác vụ đại diện chưa?
4. **Execution:** Quyền có tối thiểu, có sandbox và có kiểm soát thao tác không thể hoàn tác không?
5. **Verification:** Có phép kiểm độc lập, log và bằng chứng để nghiệm thu không?
6. **Economics:** Chi phí trên mỗi kết quả được chấp nhận có tốt hơn quy trình hiện tại không?
7. **Accountability:** Ai chịu trách nhiệm khi agent sai hoặc workflow vượt khỏi dự kiến?

Nếu chưa trả lời được, đừng bắt đầu bằng cách thêm agent. Hãy sửa lớp đang thiếu trước.

## Kết luận

AI Agent không đáng tin cậy chỉ vì model thông minh. Độ tin cậy xuất hiện khi context đủ rõ, memory có nguồn, reasoning phù hợp, execution có ranh giới và verification tạo ra bằng chứng.

Model tạo ra khả năng. Engineering đặt giới hạn. Verification cung cấp bằng chứng. Con người giữ trách nhiệm.

Đó là nền tảng để giao việc cho agent mà không phải trông từng bước.
