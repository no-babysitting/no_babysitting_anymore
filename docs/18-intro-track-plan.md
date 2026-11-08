# 18 · Kế hoạch track Nhập môn Claude (outline, 08/11/2026)

> **Trạng thái: outline đã chốt hướng, chưa viết kịch bản chi tiết.** Viết ngay sau khi lộ trình six shifts (`14-content-script-v4.md`) lên trang. Quyết định của phiên hỏi đáp 10 câu: `08-kaizen-go-live.md` §1c (D43–D54). Câu chữ trên site vẫn duyệt ở từng PR (D13). Văn phong theo `16-writing-guide.md`; chữ và hiệu ứng theo `15-typography-motion-v4.md`.

## 0. Vì sao có track này

Chủ dự án thấy rất nhiều người chưa biết setup AI để dùng: họ đã chat với Claude, nhưng chưa từng tạo dự án, chưa biết Claude tự nhớ gì và mình phải tự lo gì, chưa biết skill hay connector để làm gì. Lộ trình six shifts giả định người đọc đã có những thứ đó. Nhập môn lấp chỗ trống này.

**Câu đỉnh của track:** *Trước khi giao việc cho đồng nghiệp AI, hãy cho nó một chỗ làm việc: một dự án, vài dòng hướng dẫn, và một prompt đầu tiên để nó hỏi lại bạn.*

## 1. Khung đã chốt

| Mục | Quyết định |
|---|---|
| Vị trí (D45) | Track riêng. Hero có dòng `Mới dùng AI? Bắt đầu ở Nhập môn →`; người đã dùng đi thẳng vào six shifts. Menu có ba nhóm: **Nhập môn** · **Lộ trình chính** · **Nâng cao** |
| Người đọc (D47) | Đã chat với AI, chưa từng setup. Bỏ phần "AI là gì" |
| Bề mặt (D48) | **Hai bề mặt song song**: mỗi bước có hai tab, *Claude app* (Projects) và *Claude Code* (ứng dụng desktop, tab Code). Nhớ lựa chọn tab như kính |
| Khuôn bài (D49) | 3 hồi gọn như six shifts, nhưng Kết là **một việc làm thật** có checklist đánh dấu (lưu trong trình duyệt). Giao diện vẽ giản lược bằng ASCII, không dùng ảnh chụp UI có thương hiệu |
| Độ sâu kỹ thuật (D50) | Mỗi thứ một thẻ: *là gì · để làm gì · dấu hiệu bạn cần nó · một prompt nhờ Claude tự cài*. Cách làm chi tiết nằm ở Nâng cao |
| Quan hệ với Nâng cao (D51) | Nhập môn nói "là gì, khi nào cần"; Nâng cao làm sâu. Mỗi thẻ có link `Đào sâu →`. Không viết một ý ở hai nơi |
| Gu và design system (D52) | Cả hai: một bài chung "gu là thứ chỉ bạn có" cho mọi vai, và một mục Nâng cao mới cho UI/UX design system |
| Thế nào là xong (D53) | Học xong, người đọc có **một dự án thật đã setup** cho công việc của mình: hướng dẫn dự án ngắn, một prompt đầu tiên có yêu cầu grill me, một artifact đầu ra, và biết khi nào cần thêm skill, connector, hook. Sau đó vào six shifts |
| Kính | Dùng chung 10 kính với six shifts (Chung + 9 nhóm việc của "Một lần giao việc") |

## 2. Outline các bài

Mã `N0`–`N12` tạm thời; thứ tự là thứ tự học. Mỗi bài 4–6 phút. Cột "Việc làm thật" là phần Kết.

| Mã | Bài | Ý chính (câu đỉnh của bài) | Nội dung | Việc làm thật |
|---|---|---|---|---|
| N0 | **Đồng nghiệp AI** | Claude không chỉ trả lời câu hỏi; nó nhận việc, làm, rồi báo lại. | Khác nhau giữa *hỏi* và *giao việc*; lợi ích (làm nhanh việc nhiều bước, làm khi bạn vắng); giới hạn (có thể sai mà vẫn tự tin, không tự biết điều chỉ bạn biết) | Viết ra một việc bạn muốn giao trong tuần này |
| N1 | **Claude làm được gì** | Đọc, viết, tra cứu, phân tích, dựng, và tạo gần như mọi loại file. | Tra web và *deep research* trên Claude app; tạo file Word, Excel, PowerPoint, PDF, HTML; artifacts; viết và chạy code; làm việc với file trên máy (Claude Code) | Nhờ Claude làm một file thật từ dữ liệu của bạn |
| N2 | **Chọn đúng sản phẩm** | Mỗi kiểu việc có một chỗ hợp nhất. | Chat, Cowork, Claude Code, Claude in Chrome, Slack: việc nào hợp chỗ nào (theo bảng của Cowork product guide và docs) | Chọn bề mặt cho việc ở N0 |
| N3 | **Gói, giới hạn, chi phí** | Biết mình đang dùng gì, để khỏi bất ngờ giữa chừng. | Gói nào dùng được tính năng nào; hạn mức dùng; vì sao phiên dài và effort cao tốn hơn; giữ phiên tập trung | Xem gói của mình có những gì (checklist) |
| N4 | **Tạo dự án đầu tiên** | Một dự án là chỗ làm việc riêng của đồng nghiệp AI. | Vì sao phải có dự án (context không phải giải thích lại mỗi lần, file và hướng dẫn ở một chỗ); tab Claude app: Projects, hướng dẫn và tài liệu của project; tab Claude Code: một thư mục là một dự án, lệnh khởi tạo và CLAUDE.md đầu tiên | **Tạo dự án** cho việc ở N0 |
| N5 | **Prompt đầu tiên, có grill me** | Đừng bắt đầu bằng mệnh lệnh; bắt đầu bằng việc để Claude hỏi lại bạn. | Ví dụ thực tế: init dự án và nội dung prompt đầu tiên; yêu cầu "phỏng vấn tôi từng câu một, kèm đề xuất"; **giả lập grill me câu 1/3** (15 §11) | **Gửi prompt đầu tiên** và trả lời 3 câu hỏi |
| N6 | **Context: Claude tự lo gì, bạn lo gì** | Claude tự quản phần lớn trí nhớ làm việc; bạn chỉ lo phần nó không tự thấy. | Có sẵn: auto memory (Claude Code), bộ nhớ của Claude app và Cowork (hệ thống riêng), tự nén hội thoại, mở dần skill và file. Bạn tự quản: hướng dẫn dự án ngắn, phiên tập trung, `/clear` giữa các việc, xem lại điều Claude đã nhớ | Đọc lại điều Claude đã nhớ về bạn và sửa một dòng |
| N7 | **Model và effort** | Effort là nút chính; model là chọn ai làm. | Các model hiện có và effort; việc nào dùng mức nào (lấy từ docs và bài *Spending your effort*); không viết cứng tên model trong chữ, đọc từ `models.yml` | Thử cùng một việc ở hai mức effort |
| N8 | **Vòng làm việc với đồng nghiệp AI** | Sáu điều chỉ bạn quyết được trước khi giao; phần thực thi để Claude lo. | **Bản "chỉ có Now" của six shifts**: tin phán đoán · thiết kế khuôn · để nó mở dần · nói một lần · để nó tự nhớ · đưa tham chiếu. Mỗi điểm: lợi ích, ý nghĩa, một ví dụ theo kính. Dẫn sang lộ trình six shifts để hiểu "vì sao" | Viết khuôn và một tham chiếu cho việc ở N0 |
| N9 | **Artifacts và docs** | Đầu ra không chỉ là đoạn chat; nó là thứ bạn mở, sửa, chia sẻ. | Artifact là trang sống, chia sẻ được; tài liệu cộng tác (docs) để nhiều người cùng sửa; khi nào xin HTML, khi nào xin file Office | **Tạo một artifact** đầu ra của việc ở N0 |
| N10 | **Nghiên cứu sâu và workflow** | Việc lớn thì để Claude tự chia việc cho nhiều agent. | *Deep research* trên Claude app; dynamic workflows trong Claude Code (từ khoá `ultracode`, xem tiến độ bằng `/workflows`); khi nào đáng dùng, tốn hơn bao nhiêu | Chạy một nghiên cứu sâu nhỏ |
| N11 | **Đồ nghề, mỗi thứ một thẻ** | Đừng cài hết từ đầu; thêm khi có tín hiệu. | Thẻ: CLAUDE.md · skill · plugin · connector/MCP · GitHub · Hugging Face · hook · loop (`/loop`, `/goal`). Mỗi thẻ: là gì, để làm gì, dấu hiệu bạn cần (theo bảng *Build your setup over time* của docs), prompt nhờ Claude tự cài, `Đào sâu →` | Đánh dấu thứ bạn cần lúc này (thường là 0–1 thứ) |
| N12 | **Kiểm lại đầu ra, và gu của bạn** | AI làm nhanh; thế nào là đúng và đẹp vẫn do bạn quyết. | Kiểm đầu ra: AI có thể sai mà vẫn tự tin, đòi nguồn và bằng chứng (cầu sang phần 04). Gu: biến gu thành tham chiếu (design system, thang chấm, bản nháp nhiều hướng); chính trang này dùng bộ kiểm gu làm ví dụ | Viết thang chấm 3 dòng cho đầu ra của việc ở N0, rồi vào six shifts |

**Hết track:** checklist tổng (dự án · hướng dẫn · prompt đầu tiên · artifact · thứ đồ nghề cần thêm) và nút `Vào lộ trình six shifts →`.

## 3. Nâng cao thêm một mục

| Mục | Nội dung |
|---|---|
| A9 · Design system với Claude (D52) | Dựng design system cùng Claude: token, component, preview HTML; dùng design system làm tham chiếu cho mọi lần giao việc UI; bộ kiểm gu (như `13-design-taste.md`) |

## 4. Đề xuất thêm (chưa chốt, hỏi lại khi viết kịch bản chi tiết)

- Làm việc qua nhiều phiên: đặt tên phiên, quay lại phiên cũ, chạy song song.
- Dùng trên điện thoại và điều khiển từ xa.
- Chia sẻ dự án cho đồng đội; dùng chung skill trong nhóm.
- Lịch chạy việc định kỳ (cầu sang Nâng cao A8).
- Bảng thuật ngữ Nhập môn (dùng chung Glossary của site).
- Mỗi kính một "bộ khởi động": dự án mẫu, hướng dẫn mẫu, prompt đầu tiên mẫu.

## 5. Nguồn phải đọc trước khi viết

Chưa đọc trong phiên này; agent viết kịch bản chi tiết phải đọc nguyên văn và ghi ngày kiểm chứng:
- Trợ giúp Claude app về Projects, memory, artifacts, research, tạo file.
- Docs Claude Code: desktop quickstart, memory, skills, plugins, MCP, hooks, `/loop` và `/goal`, dynamic workflows (`code.claude.com/docs/en/workflows`, đã đối chiếu tên `ultracode` và `/workflows` ngày 08/11/2026), model và effort.
- Trang gói và giá chính thức.
- *The Claude Cowork product guide* (05/06/2026) cho bảng chọn sản phẩm.
- Kết nối GitHub và Hugging Face (connector/MCP chính thức).
- Đã đọc, dùng lại: six shifts, *Finding your unknowns*, Best practices, *Spending your effort* (xem `14` §10, `17` §3).

## 6. Thứ tự làm

1. Lộ trình six shifts lên trang (`14`, `17`).
2. Hỏi đáp lại những điểm ở §4, rồi viết kịch bản chi tiết Nhập môn (tài liệu `19`).
3. Dựng track theo cùng khuôn dữ liệu của `14` §3, thêm trường `tabs` (Claude app / Claude Code) và `task` (việc làm thật + checklist).
