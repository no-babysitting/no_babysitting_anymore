# 10 · Kịch bản v3: đề xuất chờ duyệt (07/11/2026)

> **Trạng thái: đề xuất.** Theo `08-kaizen-go-live.md` D13, chủ dự án phải duyệt bản này trước khi viết lại chương và dựng trang chủ mới (K2). Phần cần duyệt nằm ở §8. Mọi khẳng định về sản phẩm đều có nguồn ở §1. Reviewer độc lập ghi kết quả ở §7.

## 0. Tóm tắt

- **Trục là 3 câu hỏi** (bản review §1.3): *Giao được gì? · Làm sao để nó tự chạy? · Làm sao tin kết quả?* Chương nào cũng trả lời một trong ba câu.
- **Khung lấy từ chính docs.**
  - Vòng làm việc của agent: *thu thập context → hành động → kiểm chứng kết quả*.
  - Trang Best practices liệt kê bốn lý do khiến một phiên đi sai:
    1. Claude thiếu điều nó không tự thấy;
    2. Claude không có phép kiểm để tự chạy;
    3. luật không có ngoại lệ lại để ở dạng lời dặn;
    4. mặc định tốn hơn mức cần.
  - Thêm 5 câu hỏi trước khi để Claude chạy một mình.
- **Ví dụ xoay vòng qua 6 loại việc** (nghiên cứu, dữ liệu, marketing, sáng tạo, dựng sản phẩm, vận hành) thay cho một kịch bản báo cáo tuần duy nhất (D3).
- **Giữ 12 phần và mã chương** (c00…c10, c05b), để không phá phần đã làm: c02 + S1, HUD, opener, Journey.
- **5 trụ của bản review** thành chiều lọc chính của Library, thay cho "nguyên lý P1–P12" chưa từng được định nghĩa (D4).

## 1. Nguồn đã đọc ngày 07/11/2026

| Nguồn | Loại | Dùng cho |
|---|---|---|
| [Best practices for Claude Code](https://code.claude.com/docs/en/best-practices) | Docs chính thức, đọc nguyên văn cả trang | Xương sống c03–c10; bảng *What you can stop doing* (7 dòng). Xong việc P0 #1 của handoff |
| [How Claude Code works](https://code.claude.com/docs/en/how-claude-code-works) | Docs chính thức | Vòng làm việc, model + harness, phạm vi truy cập, "Delegate, don't dictate" |
| [Extend Claude Code](https://code.claude.com/docs/en/features-overview) | Docs chính thức | Chọn CLAUDE.md / rules / skill / subagent / MCP / hook / plugin; bảng "dựng dần theo tín hiệu" |
| [Overview](https://code.claude.com/docs/en/overview) | Docs chính thức | Các bề mặt; "What you can do"; lịch chạy; làm việc từ mọi nơi |
| [How people are using Claude Cowork](https://claude.com/blog/how-people-are-using-claude-cowork) (07/07/2026) | Blog chính thức | Tỷ trọng loại việc thật; chọn và xếp thứ tự 6 loại việc |
| [The Claude Cowork product guide](https://claude.com/blog/the-claude-cowork-product-guide) (05/06/2026) | Blog chính thức | Ranh giới Cowork (việc tri thức, nhiều ứng dụng) với Claude Code (code) |
| Repo [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) @ `91dd43d` (07/11/2026) | Cộng đồng, thực chiến | Tip của Boris và Thariq (skills, quản lý phiên), báo cáo *Why harness is important*, bảng tip theo nhóm; dùng cho "Đào sâu" và Library, kèm nhãn độ bền khi lệch docs (§6) |

## 2. Những câu docs nói, dùng làm xương sống

| # | Nguyên văn (rút gọn) | Nguồn | Dùng ở |
|---|---|---|---|
| Q1 | *"Think of delegating to a capable colleague. Give context and direction, then trust Claude to figure out the details."* | How it works · Delegate, don't dictate | Ẩn dụ trung tâm, nay có nguồn chính thức (c01, c10) |
| Q2 | *"gather context, take action, and verify results"* | How it works · The agentic loop | Bảy bước của vòng giao việc trên trang chủ; c01 |
| Q3 | *"tell Claude what it can't see, give it a check to run, and enforce the rules that can't have exceptions"* | Best practices, mô tả trang | Ba nhóm chương II–III |
| Q4 | *"Give Claude something it can run that comes back pass or fail. Once it has that, it can keep going on its own and you don't have to watch."* | Best practices · Give Claude a check to run | Câu chủ đề của "No babysitting" (c07, trang chủ) |
| Q5 | *"Only write down what Claude can't find by reading the repo, or what it would otherwise spend time rediscovering every session."* + phép thử hai câu hỏi | Best practices · Tell Claude what it can't see | c04 |
| Q6 | Bảng *Build your setup over time*: sai một quy ước hai lần → CLAUDE.md; gõ lại cùng một prompt → skill; chép dữ liệu từ tab trình duyệt → MCP; việc phụ làm tràn hội thoại → subagent; muốn việc gì đó luôn xảy ra → hook; repo thứ hai cần cùng setup → plugin | Extend Claude Code | c05 (dựng harness dần theo tín hiệu, không dựng hết từ đầu) |
| Q7 | Bảng *non-deterministic (Claude decides)* / *deterministic (Claude Code enforces)* | Best practices · Deterministic and non-deterministic instructions | c06 |
| Q8 | *"Before a run goes unattended, make sure it knows what done looks like, can check its own work, and can only touch what it should. Give it a cap on turns or spend, and have a person approve the result at the end."* + 5 câu hỏi | Best practices · Let Claude run without you | c09; bước ⑦ "bạn duyệt" |
| Q9 | Bảng *What you can stop doing*, 7 dòng: context là ràng buộc chính · IN HOA/IMPORTANT · subagent để giữ context · subagent cho câu trả lời tốt hơn · "think hard" · "keep going/don't be lazy" · mô tả kiến trúc trong CLAUDE.md | Best practices | c10; nhãn *Đã thay thế* trong Library |
| Q10 | Cowork là *"knowledge work agent"*; bảng sản phẩm: *"Claude Code for coding, and Claude Cowork for cross-app knowledge work"* | Cowork product guide | Ghi rõ bề mặt phù hợp cho từng loại việc (bản review §9) |

## 3. Ba câu hỏi, 5 trụ, 12 phần

| Trụ (Library) | Trả lời câu | Chương | Phần docs tương ứng |
|---|---|---|---|
| **Hiểu agent** | Giao được gì? | c00, c01, c02 | How it works; Overview; Keep cost and context down |
| **Dựng harness** | Làm sao để nó tự chạy? | c03, c04, c05 | Tell Claude what it can't see; Extend Claude Code |
| **Thiết kế quy trình** | Làm sao để nó tự chạy? | c05b, c08, c09 | Change a default; Run sessions in parallel; Let Claude run without you |
| **Tin cậy và mở rộng** | Làm sao tin kết quả? | c06, c07 | Enforce the rules…; Give Claude a check to run |
| **Áp vào công việc** | Giao được gì? | 6 quy trình theo nghề (K5) và vòng giao việc ở trang chủ | Cowork guide; Overview · What you can do |

c10 tổng kết cả ba câu hỏi.

## 4. Story v3: 12 phần, giữ mã chương

Ví dụ xoay vòng để mỗi loại việc xuất hiện ít nhất hai lần. Thứ tự ưu tiên theo dữ liệu dùng Cowork: vận hành 33,4%, nội dung 16,4%, phát triển phần mềm 8,7%, nghiên cứu 6,4%, phân tích dữ liệu 5,8%.

| Mã | v3 (đề xuất) | Câu hỏi | Ví dụ chính | Thay đổi so với 2.2 | Simulator |
|---|---|---|---|---|---|
| c00 | **Hai lần tung đồng xu**: cùng một yêu cầu, chạy hai lần | cả ba | Người xem chọn loại việc | Yêu cầu đổi theo loại việc người xem chọn | — (Diagnostic giữ) |
| c01 | **Đồng nghiệp mới**: vòng *thu thập → làm → kiểm*; model + harness; nó chạm được vào đâu; Claude Code, Cowork hay chat | Giao được gì? | Vận hành: gom cập nhật rời rạc thành một báo cáo | Thêm phần "giao được gì" và ranh giới các sản phẩm (Q1, Q2, Q10) | **S11 dời về đây**, đổi thành "Giao được không?": xếp 8 việc vào *giao trọn* / *giao, có trạm duyệt* / *chưa nên giao* |
| c02 | **Ngân sách ngữ cảnh**: hội thoại tập trung cho kết quả tốt hơn, rẻ hơn; sửa hỏng hai lần thì `/clear` và viết prompt tốt hơn | Giao được gì? | Dữ liệu: phần phân tích bị viết hỏng hai lần | **Giữ nguyên** (đã viết, khớp *Steer the session* và *Keep cost and context down*) | S1 (giữ), S2 |
| c03 | **Brief**: kết quả, điều nó không tự thấy, thế nào là xong; để Claude phỏng vấn mình rồi viết SPEC; nói "be ambitious" khi muốn bản đầy đủ | Tự chạy | Marketing: bộ nội dung ra mắt sản phẩm | Ví dụ đổi sang marketing; thêm "phỏng vấn → SPEC → phiên mới" (Q3) | S3 (cắt lát) |
| c04 | **Hồ sơ onboarding**: CLAUDE.md chỉ ghi điều nó không tự tìm được (phép thử hai câu hỏi); rules theo vùng; auto memory | Tự chạy | Nghiên cứu: thư mục tài liệu của nhóm | Viết lại theo Q5; mục "mô tả kiến trúc" chuyển thành *Đã thay thế* | S4 (giữ, đổi 12 dòng theo Q5) |
| c05 | **Playbook và công cụ**: skill cho quy trình của nhóm; kết nối công cụ (CLI có sẵn, MCP/connector); dựng harness dần theo tín hiệu | Tự chạy | Sáng tạo: cắt video phỏng vấn thành clip có phụ đề (skill + CLI ngoài) | Lấy bảng *Build your setup over time* (Q6) làm khung | S5 (chọn khối) |
| c05b | **Đúng mức nghĩ**: effort là nút chính; model; subagent tốn gì | Tự chạy | Dựng sản phẩm | Theo *Change the model and effort*, *Know what subagents cost*; tên model và mức mặc định vẫn chỉ nằm trong `models.yml` | S9 |
| c06 | **Rào chắn không ngoại lệ**: Claude quyết hay harness ép; chế độ quyền (auto, manual…); deny rule, sandbox, hook; giữ bộ luật ép nhỏ | Tin kết quả | Vận hành: gửi email, cập nhật CRM | Khung theo Q7; auto mode là mặc định mới | S6 (cổng quyền) |
| c07 | **Một phép kiểm để tự chạy**: kiểm pass/fail, đòi bằng chứng, reviewer chưa thấy cách làm đối chiếu với SPEC | Tin kết quả | Dữ liệu: dashboard đối soát được với file nguồn | Khung theo Q4; thêm "kiểm cho việc không phải code" (tổng khớp, nguồn có link, số dòng, ảnh chụp so với mẫu) | S7 |
| c08 | **Làm theo nhóm**: subagent song song, workflow, phiên song song; mỗi cách tốn gì | Tự chạy | Nghiên cứu: 15 nguồn chia cho 3 subagent | Bỏ ý "subagent cho câu trả lời tốt hơn" (Q9); giữ "reviewer mới không thấy cách làm" | S10 |
| c09 | **Để nó chạy khi bạn vắng**: 5 câu hỏi; lịch chạy và sự kiện; kết quả đi đâu, ai ký duyệt | Tin kết quả | Vận hành: báo cáo mỗi thứ Hai | Khung theo Q8 | S11 thay bằng "5 câu hỏi trước khi để chạy một mình" |
| c10 | **Thôi cầm tay chỉ việc**: những điều có thể ngừng làm; *No babysitting ≠ no supervision*; kế hoạch 7 ngày; Re-test | cả ba | Tổng hợp 6 loại việc | Thay bảng six shifts bằng bảng chính thức 7 dòng (Q9); giữ M10 | S8 (tỉa hướng dẫn) |

Tổng số simulator vẫn là 11 (không vượt bản 2.2): S11 đổi vai, không thêm mới.

## 5. Sáu loại việc của vòng giao việc (dữ liệu cho K2)

Mỗi loại đi đủ 7 bước. Mức độ sẵn có của công cụ ghi theo 4 mức:
- **có sẵn**: công cụ tích hợp của Claude Code (file, tìm kiếm, terminal, web);
- **connector/MCP**: phải kết nối dịch vụ ngoài;
- **CLI ngoài**: công cụ dòng lệnh phải cài trên máy, Claude gọi qua terminal;
- **sản phẩm khác**: hợp với Cowork hơn.

Chi tiết ví dụ (con số, tên file) là minh hoạ, sẽ được ghi rõ "ví dụ" trên trang.

| Bước | Nghiên cứu | Dữ liệu | Marketing | Sáng tạo | Dựng sản phẩm | Vận hành |
|---|---|---|---|---|---|---|
| **Kết quả bạn giao** | Brief 2 trang về thị trường xe điện Đông Nam Á từ 15 nguồn, có trích dẫn | Dashboard hiệu quả chiến dịch tháng 10 từ 3 file CRM + sheet chi phí, kèm 5 nhận định | Bộ nội dung ra mắt: landing copy, 5 bài social, 3 email, đúng giọng thương hiệu | 24 clip dọc 30 giây có phụ đề từ 12 video phỏng vấn | Prototype web đặt lịch hẹn từ PRD 1 trang, có test | Báo cáo tuần gom từ Slack, Jira, email, gửi kênh điều hành mỗi thứ Hai |
| ① Brief (số ASCII) | 15 nguồn · 2 trang · 3 câu hỏi · hạn 09:00 | 3 file · 5 nhận định · lệch tổng < 0,5% | 9 mẩu · 3 kênh · 1 giọng | 12 video · 24 clip · 30 giây · 9:16 | 1 PRD · 4 màn · 0 thư viện mới | 3 nguồn · 1 báo cáo · thứ Hai 08:00 |
| ② Hiểu mục tiêu (hỏi lại một câu) | "Ưu tiên số liệu 2026 hay xu hướng 5 năm?" | "Doanh thu tính theo ngày chốt hay ngày tạo đơn?" | "Có claim nào pháp lý cấm không?" | "Phụ đề theo lời nói hay đã biên tập?" | "Đăng nhập có cần ở bản đầu không?" | "Việc trễ hạn tính theo Jira hay theo email?" |
| ③ Khám phá (địa hình) | Web *(có sẵn)*, PDF trong thư mục *(có sẵn)*, Drive *(connector/MCP)* | File CSV *(có sẵn)*, Google Sheets *(connector/MCP)* | Thư mục brand và chiến dịch cũ *(có sẵn)*, trang đối thủ *(có sẵn: web)* | Thư mục video *(có sẵn)*, ffmpeg *(CLI ngoài)*, nhận dạng giọng nói *(CLI ngoài)* | Repo, component sẵn có *(có sẵn)* | Slack, Jira, email *(connector/MCP)* |
| ④ Kế hoạch và giao việc | 3 subagent đọc song song theo nhóm nguồn | Làm sạch → ghép → tính chỉ số → vẽ → nhận định | Thông điệp chính → biến thể theo kênh → rà soát | Skill "cắt clip" với các bước cố định | Plan → từng lát dọc | Skill "báo cáo tuần" + lịch chạy |
| ⑤ Thực thi (nhật ký agent) | Tra web · Đọc 6 PDF · Ghi nguồn | Chạy script · Ghép bảng · Dựng dashboard | Viết nháp · Đối chiếu brand guide | Cắt · Tạo phụ đề · Xuất 9:16 | Sửa file · Chạy dev server · Chạy test | Đọc kênh · Lọc trùng · Viết nháp |
| ⑥ Kiểm chứng (pass/fail) | Số nào cũng có link · link còn sống · ✕ một số liệu từ nguồn cũ bị thay | Tổng khớp file nguồn · số dòng khớp · ✕ dòng trùng bị bắt | Reviewer đối chiếu brief · ✕ một claim thiếu căn cứ bị gỡ | Mỗi clip ≤ 30s, đúng 9:16, có phụ đề · ✕ một phụ đề lệch giờ được sửa | Test và build xanh · ảnh chụp so với mẫu · ✕ một test đỏ được sửa | Mỗi dòng có link nguồn · số trễ hạn khớp Jira · ✕ một mục tuần trước bị gỡ |
| ⑦ Bàn giao và **bạn duyệt** | `brief.md` + bảng nguồn; bạn duyệt trước khi gửi | Dashboard + script chạy lại được | Tài liệu + lịch đăng; **đăng bài cần bạn duyệt** | Thư mục clip + bảng mốc giờ | PR; bạn review và merge | Bản nháp; lần đầu bạn duyệt trước khi gửi |
| **Bề mặt hợp nhất** | Claude Code app hoặc Cowork | Claude Code app | Cowork hoặc Claude Code app | Claude Code app hoặc CLI (cần terminal) | Mọi bề mặt Claude Code | Cowork hoặc lịch chạy trên cloud của Claude Code |
| Chương liên quan | c08, c04 | c02, c07 | c03 | c05 | c05b, c07 | c06, c09 |

## 6. Repo cộng đồng lệch docs: nhãn độ bền cho Library

| Tip trong repo | Docs (07/11/2026) | Nhãn |
|---|---|---|
| "Dumb zone" khoảng 40% context; giữ dưới 40% | Hiếm khi hết context (cửa sổ 1M, tự nén); `/clear` giữa các việc vẫn nên làm để tập trung và rẻ | *Đã thay thế* (ngưỡng); ý "tập trung" là *Bền vững* |
| Dùng subagent để quản lý context | Nằm trong *What you can stop doing*; subagent vẫn tốt cho chạy song song, giấu output ồn, review độc lập | *Đã thay thế* |
| "Use Opus with Thinking for Everything" (Boris, 01/2026) | Effort là nút chính; mặc định Opus 5.5 ở mức medium | *Đã thay thế* |
| Thêm IMPORTANT, IN HOA, `<important if>` | Viết thẳng một dòng; nếu là luật cứng thì dùng hook hoặc deny rule; nếu dòng bị lẫn thì rút ngắn file | *Đã thay thế* / *Chưa thống nhất* (thẻ `<important if>`) |
| CLAUDE.md dưới 200 dòng | Docs cũng khuyên dưới 200 dòng | *Bền vững* |
| Phỏng vấn trước (AskUserQuestion) rồi mở phiên mới | Docs: *Brainstorm with Claude first* → SPEC.md → phiên mới | *Bền vững* |
| Cho Claude cách tự kiểm chứng (Boris #13) | Docs: *Give Claude a check to run* | *Bền vững* |

## 7. Kiểm chứng của reviewer

*(Điền sau khi agent reviewer độc lập đối chiếu từng dòng ở §2, §4–§6 với nguồn gốc.)*

## 8. Cần chủ dự án duyệt

1. **Giữ 12 phần và mã chương**, đổi nội dung theo §4, hay tái cấu trúc mạnh hơn (ví dụ bỏ c05b, gộp c08 vào c09)?
2. **Phân bổ ví dụ** theo §4: mỗi chương một loại việc, xoay vòng.
3. **Sáu ví dụ ở §5**: có loại việc nào muốn đổi không (ví dụ thay Sáng tạo bằng Xử lý tài liệu, vốn có tỷ trọng cao hơn trong dữ liệu Cowork)?
4. **S11 dời về c01** thành "Giao được không?"; c09 dùng "5 câu hỏi" thay thế.
5. **c10 dùng bảng chính thức 7 dòng** thay cho six shifts.
6. **5 trụ** làm chiều lọc chính của Library.
