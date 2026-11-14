---
title: "Memory: “nhớ tôi” khác “biết cách làm việc trong repo này”"
description: Chữ memory gom nhiều cơ chế khác nhau. Bài này phân biệt điều harness tự ghi nhớ, chỉ dẫn của dự án và những gì bạn vẫn phải kiểm soát.
verifiedAt: 2026-11-14
art: default
related: ['01', '03', '07', '08']
---

Khi hỏi Claude có memory không, bạn có thể đang hỏi hai chuyện khác nhau. Claude có nhớ cách bạn thích làm việc, những lần bạn sửa nó và bối cảnh cá nhân không? Hay Claude có biết quy ước, lệnh build và cách nhóm làm việc trong repo này?

Hai câu hỏi đó không nhất thiết có cùng câu trả lời. Một hệ thống có thể ghi nhớ sở thích cá nhân nhưng không biết quy trình triển khai của dự án. Nó cũng có thể đọc được repo rất tốt mà không nhớ bạn muốn nhận báo cáo theo định dạng nào.

## Trong Claude Code, có chỉ dẫn bạn viết và ghi chú Claude tự lưu

CLAUDE.md là chỉ dẫn bạn chủ động viết cho một dự án. Nó có thể chứa lệnh kiểm tra, quyết định chưa thể suy ra từ code, quy ước quan trọng và những điểm dễ vấp mà Claude cần biết khi làm việc.

Auto memory là ghi chú Claude tự lưu trong quá trình làm việc. Tài liệu Claude Code mô tả các nhóm ghi chú như thông tin về người dùng, phản hồi, dự án và tài liệu tham chiếu. Claude nạp phần đầu của MEMORY.md theo giới hạn được tài liệu quy định; các file chủ đề có thể được đọc khi cần. Cách lưu này gắn với môi trường làm việc, không tự động trở thành một bộ chỉ dẫn dùng chung trên mọi máy hay mọi phiên cloud.

Hai cơ chế có thể bổ sung cho nhau, nhưng không nên đánh đồng chúng. Auto memory có thể ghi lại một số thông tin dự án. Điều đó không có nghĩa nó thay thế được những quy ước và yêu cầu mà nhóm muốn áp dụng ổn định.

## Memory không phải nơi đặt mọi sự thật của repo

Tài liệu Claude Code nói auto memory tránh lưu những điều có thể suy ra từ code và những điều đã có trong CLAUDE.md. Nhưng đừng diễn giải điều đó thành “auto memory không bao giờ chứa thông tin dự án”. Chính tài liệu có nhóm ghi chú project.

Cách phân chia thực tế hơn là:

- Điều Claude có thể tự tìm bằng cách đọc repo: cấu trúc thư mục, cách một component đang được viết, tên test framework. Đừng chép lại tất cả vào memory.
- Điều dự án muốn Claude áp dụng ổn định: lệnh kiểm tra chính xác, quyết định kiến trúc, quy trình release, vùng code không được sửa. Đặt trong file chỉ dẫn có version control.
- Điều thay đổi theo từng người: cách nhận báo cáo, sở thích về cách trao đổi, phản hồi đã lặp lại. Có thể để auto memory hỗ trợ, nhưng cần biết nó lưu gì và có cách sửa khi sai.

CLAUDE.md cũng chỉ là context, không phải cơ chế cưỡng chế. Nếu Claude không được phép đọc .env, hoặc luôn phải chạy một bước kiểm tra trước khi kết thúc, đừng chỉ viết câu đó trong file. Dùng permission rules, hooks hoặc CI phù hợp. Phần này được phân tích ở bài 01 và bài 07.

## Trong Claude app, memory được tổ chức theo chủ đề và project

Claude app có cơ chế memory riêng, khác với auto memory của Claude Code. Tài liệu hỗ trợ mô tả memory theo chủ đề trong Chat và memory riêng cho project. Người dùng có thể xem, sửa hoặc xóa các ghi chú qua giao diện tương ứng. Xóa một cuộc hội thoại không đồng nghĩa với việc mọi ghi chú memory được tạo từ đó cũng biến mất.

Cowork có những khác biệt theo nơi chạy. Tài liệu hỗ trợ được đối chiếu cho biết Cowork chạy trên cloud dùng chung memory với Chat, trong khi Cowork chạy trên máy không dùng cơ chế memory đó. Không nên từ đây suy ra Claude Code cũng đọc được các ghi chú của Claude app: hai hệ thống có cách lưu và phạm vi riêng.

Những chi tiết này có thể đổi theo phiên bản và bề mặt sản phẩm. Nếu bạn đang cấu hình một môi trường cụ thể, hãy kiểm tra tài liệu đúng sản phẩm và ngày sử dụng, thay vì lấy một quy tắc của Chat áp sang Claude Code.

## Tin memory đến đâu?

Tôi chia theo mức độ quan trọng và khả năng sửa sai.

Với sở thích cá nhân và cách trao đổi, có thể để harness tự ghi nhớ, miễn là bạn biết nơi xem, sửa và xóa những gì nó lưu. Nếu một ghi chú sai, việc sửa nó không nên đòi hỏi bạn phải dựng lại toàn bộ hệ thống.

Với quy ước repo, quyết định kỹ thuật và quy trình ảnh hưởng tới cả nhóm, hãy ghi thành file có version control. Đừng trông chờ memory tự hình thành đúng, được nạp đúng lúc và được mọi môi trường chia sẻ.

Với trạng thái có hậu quả thực tế, memory dạng câu chữ thường chưa đủ. “Đã gửi báo cáo” yếu hơn một bản ghi có mã gửi, người nhận, thời điểm và trạng thái từ hệ thống nguồn. Nếu cần biết giao dịch đã xảy ra hay chưa, hãy đọc hệ thống giao dịch; đừng tin một câu agent nhớ lại.

## Ba câu hỏi trước khi giao việc cho memory

1. Thông tin này thuộc về cá nhân, một repo hay một hệ thống nghiệp vụ?
2. Nếu ghi sai hoặc không được nạp đúng lúc, hậu quả là gì?
3. Ai có quyền sửa và nguồn nào được coi là sự thật cuối cùng?

Memory tiện ở chỗ giảm việc nhắc lại. Nhưng khả năng lưu thông tin không đồng nghĩa với khả năng truy xuất đúng lúc, hiểu đúng và hành động đúng. Càng gần dữ liệu có hậu quả, càng cần nguồn có thẩm quyền và cơ chế kiểm chứng.

## Bài này chưa nói

- Memory của mọi hãng AI: phạm vi bài này là Claude Code và Claude app.
- Tỷ lệ memory nhớ đúng, nhớ sai hoặc được gọi ra đúng lúc: tài liệu đã đọc không cung cấp phép đo để kết luận.
- Một kiến trúc memory ngoài cho nhiều agent: chỉ nên dựng khi có yêu cầu về chia sẻ, quyền truy cập, kiểm toán hoặc tính liên tục mà harness hiện tại không đáp ứng.

## Nguồn

- [How Claude remembers your project](https://code.claude.com/docs/en/memory), tài liệu Claude Code, đối chiếu ngày 14/11/2026.
- [Use Claude’s chat search and memory to build on previous context](https://support.claude.com/en/articles/11817273), trung tâm trợ giúp Claude, đối chiếu ngày 14/11/2026.
- [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190), trung tâm trợ giúp Claude, đối chiếu ngày 14/11/2026.
