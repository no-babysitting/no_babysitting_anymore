# PRD · No Babysitting

> **No Babysitting**: *Từ vibe đến agentic, giao việc cho Claude như giao cho một đồng nghiệp giỏi.*
> *An unofficial, practical guide to delegating digital work to Claude Code.*
> **Phiên bản 2.3 · 07/11/2026** · Go live công khai cho mọi người. Các quyết định D1–D16 (ngôn ngữ, câu mô tả, kịch bản khái quát hơn, trang chủ, màu, hosting, đo lường, giấy phép, quy trình duyệt) ở `08-kaizen-go-live.md`; chỗ nào khác với PRD này thì tài liệu đó đúng.
> Phiên bản 2.1 · 06/11/2026 · Định vị lại: tên tiếng Anh, ẩn dụ "giao việc cho đồng nghiệp", dự án cộng đồng độc lập. Kế thừa bản 2.0: *người dùng Claude nói chung, App là mặc định, Claude Code không chỉ để code.*
> **Phiên bản 2.2 · 06/11/2026** · Cập nhật sau review tổng thể: thêm chương 05b (model & effort) và S9; Library tính theo từng mục bài viết; nguồn chính thức bổ sung; kế hoạch 12–13 tuần; đường chính app-first; nhãn gói. Chi tiết ở §11–§13.
> Nguồn: `shanraisshan/claude-code-best-practice` @ `722071c` (06/11/2026); bài *The New Rules of Context Engineering for Claude 5 Generation Models* (Thariq Shihipar, Anthropic, 24/07/2026); docs chính thức về các bề mặt App, kiểm chứng ngày 06/11/2026 (xem `05-surface-matrix.md`).

---

## 0. Định vị & thương hiệu

**Câu định vị.** Dành cho *người dùng Claude và Claude Code ở mức trung bình đến cao, thuộc nhiều vai trò*, những người vẫn giao việc cho Claude theo kiểu "vibe": mỗi lần một kiểu, phải trông chừng từng bước. **No Babysitting** là *một trang học tương tác bằng tiếng Việt, độc lập*, giúp họ **giao trọn một việc nhiều bước cho Claude như giao cho một đồng nghiệp giỏi**, rồi nhận về kết quả đáng tin mà không phải ngồi canh. Khác với README tiếng Anh của repo gốc hay docs chính thức tách theo từng bề mặt, trang này *dạy nguyên lý trước*, chỉ *cách làm trên đúng bề mặt bạn dùng*, và *gắn nhãn những gì sẽ đổi* khi model mạnh lên.

| Lớp | Nội dung |
|---|---|
| **Tên** (EN) | **No Babysitting** |
| **Tagline** (VI) | *Từ vibe đến agentic, giao việc cho Claude như giao cho một đồng nghiệp giỏi.* |
| **Descriptor** (EN) | *An unofficial, practical guide to delegating digital work to Claude Code.* (từ 07/11/2026, D2; trước đó: *An unofficial guide to Claude Code best practices*). Luôn đi kèm tên, để rõ đây không phải trang chính thức |
| **Lời hứa** | Từ vibe đến agentic. Bám tagline của repo gốc; "vibe" và "agentic" được giải nghĩa ngay ở Mở đầu cho người không phải dev |
| **Ẩn dụ trung tâm** | **Giao việc cho đồng nghiệp mới**: brief → tài liệu onboarding → playbook và chuyên gia → công cụ và chính sách → rà soát trước khi bàn giao → làm theo nhóm → việc định kỳ → thôi cầm tay chỉ việc |
| **Danh nghĩa** | Dự án cộng đồng độc lập; ghi công repo gốc (MIT) và từng nguồn; không dùng logo, mascot hay nhận diện của Anthropic |
| **Thị trường** | Tên tiếng Anh; nội dung tiếng Việt ở v1; kiến trúc chừa sẵn i18n cho bản tiếng Anh ở v2 |

**Vì sao là "No Babysitting".** Tên lấy từ nhãn 🚫👶 *"do not babysit"* mà repo gốc gắn cho 13 tip (giao kết quả, không giao từng bước). Nó nối ba lớp nội dung lại với nhau. Với *ẩn dụ*, đó là cách bạn đối xử với một đồng nghiệp giỏi. Với *lời hứa*, vibe là việc phải trông chừng, agentic là việc giao xong thì yên tâm. Với *six shifts*, đó là bớt luật, tin vào phán đoán. Tên này cũng là **tên chương kết**, và chương kết nói rõ ranh giới: ***No babysitting ≠ no supervision***. Rào chắn (chương 06) và kiểm chứng (chương 07) vẫn giữ nguyên; chỉ việc *cầm tay chỉ việc* là bỏ đi.

**Giọng thương hiệu:** thẳng, thực dụng, hơi tinh nghịch ở tên và tiêu đề; nghiêm túc và có nguồn ở nội dung. Không cường điệu, không emoji trang trí.

## 1. Vấn đề

1. **Claude Code bị hiểu là "công cụ cho dev".** Thực tế Claude Code là một **agent đa năng**: đọc và sửa file, gọi công cụ, tra web, phân tích dữ liệu, tạo tài liệu và slide, tự chạy theo lịch. Viết code chỉ là một trong các ứng dụng. Nó cũng không còn gắn với terminal: Desktop, Web, Mobile, Cowork, Slack và Chrome đều đưa được khả năng này tới người không gõ lệnh.
2. **Người dùng đã quen Claude vẫn dùng nó như chat.** Họ giao từng câu hỏi lẻ thay vì giao *việc*. Kết quả là chất lượng thất thường, phiên dài thì Claude "ngốc dần", và mỗi tuần lại phải giải thích lại từ đầu.
3. **Nguồn best practice đầy đủ nhất** (repo trên: 47 feature, 82 tips, 12 workflow) là một README tiếng Anh, viết cho dev và CLI, có vài chỗ tự mâu thuẫn. Một phần tip đã **lỗi thời với Claude 5**: Anthropic đã cắt hơn 80% system prompt của Claude Code mà không giảm điểm eval.

## 2. Mục tiêu

| # | Mục tiêu | Đo bằng |
|---|---|---|
| G1 | Người học có **mental model đúng** về harness: context, kế hoạch, trí nhớ, khối xây dựng, rào chắn, kiểm chứng | ≥ 70% người hoàn thành có điểm Re-test cao hơn Diagnostic |
| G2 | Người học **dựng được một quy trình agentic cho chính công việc của mình** | ≥ 40% người hoàn thành copy ít nhất 1 template trong Starter Kit (hướng dẫn dự án, skill, lịch chạy) |
| G3 | **Phủ 100% các đơn vị đã định nghĩa** của repo nguồn (dòng README, tip lẻ trong bài tip, mục của `best-practice/*.md`, tip từ CLI binary; danh sách loại trừ có lý do được công bố), không lỗi thời | Library khớp upstream; độ trễ đồng bộ ≤ 7 ngày; mỗi hướng dẫn App có ngày kiểm chứng |
| G4 | Dùng được cho **workshop 90 phút** | Presenter mode chạy trọn lộ trình rút gọn khoảng 82 phút (7 phần) chỉ bằng bàn phím |
| G5 | Chất lượng kỹ thuật | Lighthouse mobile: Perf ≥ 90, A11y = 100, CLS < 0.05; reduced motion đầy đủ tương đương |

**Non-goals (v1):** không cá nhân hoá Story theo vai trò. Không dạy toàn bộ hệ sinh thái Claude (Projects, Research…) ngoài phần giao với Claude Code. Không phải trang chính thức của Anthropic. Không có tài khoản hay backend. Không có bản nội dung tiếng Anh (tên và descriptor là tiếng Anh; nội dung tiếng Việt). Không có sandbox chạy thật.

## 3. Người dùng (v1: một đối tượng chung, không chia nhánh)

**Người dùng Claude và Claude Code ở mức trung bình đến cao.** Họ dùng Claude hằng ngày và đã thử giao việc nhiều bước, nhưng chưa có *hệ thống*. Họ thuộc nhiều vai trò khác nhau, nhưng v1 phục vụ chung bằng một kịch bản ai cũng hiểu.

| Persona (minh hoạ) | Bối cảnh | Việc cần làm (JTBD) |
|---|---|---|
| **Hà**, chuyên viên phân tích *(chính)* | Dùng Claude app mỗi ngày; đã chạy Claude Code trên Desktop để xử lý file Excel | "Giúp tôi biến việc làm báo cáo tuần thành một quy trình Claude chạy ổn định, không phải giải thích lại mỗi tuần." |
| **Lan**, trưởng nhóm *(chính)* | Cần nâng trình độ dùng Claude cho cả team (có cả dev lẫn non-dev) | "Cho tôi một nguồn để trình chiếu 90 phút, rồi gửi link cho team tự học tiếp." |
| **Minh**, dev *(phụ)* | Dùng Claude Code CLI | "Tôi muốn bản CLI của cùng nguyên lý đó, có lệnh và cấu hình copy được." Phục vụ qua tab **CLI** |

## 4. Định vị & nguyên tắc nội dung

- **Nguyên lý trước, bề mặt sau.** Mỗi best practice được phát biểu như một nguyên lý không phụ thuộc công cụ. Phần **"Cách làm"** có **3 tab**, vì nghiên cứu (06/11/2026) cho thấy "App" thực chất là hai trải nghiệm có cơ chế khác nhau:
  - **Claude app (Cowork):** dùng cho việc văn phòng ("built for non-coding knowledge work"). Có *Project Instructions* và *Project memory*; skill, connector và plugin nằm trong *Customize*; có lịch chạy và Dispatch. Mode gồm Manual, Auto, Skip; docs *không nhắc* plan mode. Từ 16/09/2026, Cowork đã gộp vào trải nghiệm Claude thống nhất.
  - **Claude Code app (tab Code trên Desktop, claude.ai/code, mobile):** toàn bộ engine Claude Code mà không cần terminal. Có plan mode, `/context`, `/compact`, CLAUDE.md, auto-memory và lịch chạy Local/Cloud. Docs ghi rõ nó làm việc được với "notes and non-code folders".
  - **CLI:** đầy đủ nhất, dành cho dev.

  Ở Mở đầu, người học chọn bề mặt chính; **mặc định là Claude Code app** vì phủ đủ tính năng nhất mà không cần terminal. Tính năng nào không có trên tab đang chọn thì ghi "Chưa có ở đây", kèm cách thay thế. **Hai hệ thống không được trộn lẫn:** *Cowork memory* và *Claude Code auto-memory* là hai hệ riêng (docs nói rõ).
- **Nhãn trạng thái và gói:** mỗi khối "Cách làm" ghi trạng thái (GA · Beta · Research preview · Experimental) và gói cần có (ví dụ Claude Tag trong Slack: Team/Enterprise; Dispatch, computer use: Pro/Max/Ultra).
- **Code chỉ là một ứng dụng.** Ví dụ xuyên suốt là công việc văn phòng. Code xuất hiện trong thẻ ca sử dụng và trong tab CLI.
- **Độ sâu cho người đã có kinh nghiệm.** Phần nhập môn (cài đặt, LLM là gì) chỉ ở mức nhắc lại hoặc đặt trong ngăn "Đào sâu".

## 5. Phạm vi v1

```
No Babysitting
├─ STORY (12 phần · ~118' tự học · ~142' trình chiếu · lộ trình rút gọn ~93')
│   Kịch bản xuyên suốt: "BÁO CÁO THỊ TRƯỜNG HẰNG TUẦN"
│   Mở đầu  Two Coin Flips ............... Hai lần tung đồng xu: vibe vs agentic + Diagnostic
│   PHẦN I · Hiểu cách Claude làm việc (Low)
│     01  The New Colleague ............... Đồng nghiệp mới: model + harness; agent đa năng; các bề mặt
│     02  The Briefing Budget ............. Ngân sách ngữ cảnh: độ tập trung và chi phí, ngã ba sau mỗi lượt
│   PHẦN II · Giao việc có cấu trúc (Medium)
│     03  The Brief ....................... Brief trước khi giao: plan, để Claude phỏng vấn, cắt lát, rich references
│     04  The Onboarding Doc .............. Tài liệu onboarding: hướng dẫn dự án (CLAUDE.md), rules, memory
│   PHẦN III · Trang bị cho đồng nghiệp (High)
│     05  Playbooks & Specialists ......... Playbook và chuyên gia: skill · command · subagent
│     05b The Right Colleague ............. Đúng đồng nghiệp, đúng mức nghĩ: model, effort, Fast mode, Advisor
│     06  Tools & Policies ................ Công cụ và chính sách: connector/MCP, quyền, hook
│     07  Review Before Handoff ........... Rà soát trước khi bàn giao: đối chiếu số liệu, reviewer độc lập
│   PHẦN IV · Làm việc kiểu agentic (Pro)
│     08  The Team ........................ Làm theo nhóm: Nghiên cứu → Kế hoạch → Làm → Rà soát → Bàn giao
│     09  Recurring Duties ................ Việc định kỳ: chạy song song, lịch tự chạy, Slack, mobile
│   Kết  10  No Babysitting ................. Thôi cầm tay chỉ việc: six shifts + Re-test + kế hoạch 7 ngày
├─ LIBRARY (ước tính 350–450 mục, chốt sau lần ingest đầu ở M1: mỗi dòng README + tip lẻ trong bài tip + mục của best-practice/*.md + tip từ CLI binary, trừ danh sách loại trừ công bố; + 6 shift + 6 thẻ ca sử dụng)
├─ PRESENTER MODE (dùng chung nội dung với Story)
├─ STARTER KIT (template copy được cho App và CLI)
└─ GLOSSARY + ATTRIBUTION + MA TRẬN BỀ MẶT
```

**Thẻ ca sử dụng v1 (6 thẻ, gắn nhãn vai trò, không cá nhân hoá Story):** Marketing: quét đối thủ hằng tuần · Tài chính: đối soát và giải thích chênh lệch · Vận hành: runbook xử lý sự cố · Nghiên cứu: tổng hợp tài liệu thành brief · PM: gom feedback thành đề xuất · Dev: từ bug report đến PR. Mỗi thẻ ghi bề mặt phù hợp và các chương liên quan.

## 6. Yêu cầu chức năng

| ID | Yêu cầu | Ưu tiên |
|---|---|---|
| FR-01 | Mỗi chương là chuỗi **beat** theo vòng *Hỏi → Đoán → Thấy → Hiểu → Làm → Nhớ*. Mỗi beat có deep link (`#c04-b3`). | Must |
| FR-02 | **Predict prompt**: phải chọn đáp án (hoặc "Bỏ qua") thì animation mới mở. Lựa chọn lưu cục bộ để làm recap. | Must |
| FR-03 | **11 mini-simulator** (S1–S11), dùng được bằng bàn phím (§8). | Must 5 / Should 6 |
| FR-04 | Beat **Then → Now** ở các chương 03–07 và 05b. **Nhãn độ bền** cho mọi mục Library: Bền vững · Phụ thuộc model · Đã thay thế · Chưa thống nhất. | Must |
| FR-05 | **SurfaceTabs "Cách làm"** gồm 3 tab: Claude app (Cowork) · Claude Code app (Desktop/Web/Mobile; mặc định) · CLI. Lựa chọn được nhớ và đồng bộ trên toàn trang. Mỗi khối hiện huy hiệu khả dụng, trạng thái phát hành, gói cần có, ngày kiểm chứng và link docs. | Must |
| FR-06 | **Library**: tìm kiếm không dấu, lọc theo loại, nhóm, nguồn, cấp độ, nguyên lý, độ bền, chương, **bề mặt**, **vai trò** (cho thẻ ca sử dụng). Card mở thành chi tiết bằng Flip, có deep link, link upstream, SHA và ngày kiểm chứng. | Must |
| FR-07 | **Presenter mode** (`P`): ←/→ theo beat, `F` fullscreen, `N` mở speaker notes ở cửa sổ thứ hai (`BroadcastChannel`), đồng hồ, thanh Thảo luận ở pha ĐOÁN. | Must / Should (cửa sổ notes) |
| FR-08 | **HUD**: thanh cấp độ Low → Pro, bản đồ harness, mục lục chương, **bảng trạng thái BÁO CÁO TUẦN**. | Must |
| FR-09 | Theme Dark (mặc định) / Light / System; nút giảm chuyển động trong trang. | Must |
| FR-10 | **Starter Kit** theo bề mặt. *Cowork:* Project Instructions mẫu cho dự án báo cáo + prompt cho scheduled task. *Claude Code app:* CLAUDE.md mẫu (≤ 20 dòng, chủ yếu gotcha) + skill `report-style` (có Gotchas) + skill `verify-numbers` + prompt cho scheduled task. *CLI:* `settings.json` (permissions + hook) + command `/bao-cao-tuan`. | Should |
| FR-11 | **Glossary** tooltip: thuật ngữ EN kèm giải nghĩa VI, đánh dấu `lang="en"`. | Should |
| FR-12 | **Ingest pipeline**: lúc build, parse repo nguồn thành JSON, ghép với lớp metadata tiếng Việt. CI hằng tuần mở PR khi có mục mới, đổi hoặc bị xoá. | Must |
| FR-13 | **Ma trận bề mặt** (dữ liệu riêng, có `verifiedAt`): tính năng × bề mặt. CI hằng tháng nhắc kiểm chứng lại các mục quá 30 ngày. | Must |
| FR-14 | **Contradiction note**: khi nguồn mâu thuẫn, hiện cả hai kèm trích dẫn. | Must |
| FR-15 | **Attribution**: notice MIT, nguồn từng tip, license GSAP, disclaimer "không phải trang chính thức". | Must |
| FR-16 | Recap và tiến độ: chương đã xong, lựa chọn predict, kết quả "Grill me"; xuất ra Markdown. | Could |
| FR-17 | **Chương 05b Model & Effort** và dữ liệu `models.yml` (có `verifiedAt`, CI nhắc kiểm chứng lại mục quá 30 ngày). Tên model, mức mặc định, lịch gỡ Fast mode không viết cứng trong chương. | Must |
| FR-18 | **PlanPill**: mọi bước phụ thuộc gói, quyền admin hoặc điều kiện kỹ thuật (Fast mode cần usage credits, Advisor cần API, Claude Tag cần Team/Enterprise…) gắn nhãn rõ. | Must |
| FR-19 | **Ingest theo đơn vị mức bài viết** (SAD §7.2) và `excluded.yml`; test fail khi có đơn vị upstream không có overlay và không nằm trong danh sách loại trừ. | Must |
| FR-20 | **Nguồn chính thức** (`official-sources.yml`): trang Best practices + blog chính thức; CI hằng tháng nhắc rà nguồn mới. | Should |
| FR-21 | **Link nguồn cho mọi nội dung** (`SourceButton`): mọi con số, trích dẫn, tip, bước "Cách làm", nhãn độ bền có nguồn bấm được để người học tự đối chiếu; bảng nguồn có loại, người, ngày, `verifiedAt`, trích nguyên văn, mở bản gốc, sao chép link. Nút phải được thiết kế đẹp và duyệt như một component. Build fail nếu thiếu nguồn; CI kiểm tra link chết hằng tháng. Quy tắc và đặc tả: `06-sources-and-links.md`. | Must |

## 7. Yêu cầu phi chức năng

- **Hiệu năng:** LCP < 2.5s trên 4G, CLS < 0.05, JS mỗi trang ≤ 150 KB gzip (đã gồm GSAP).
- **Accessibility:** đạt WCAG 2.2 AA. Không thông tin nào chỉ truyền qua chuyển động. Mọi simulator dùng được bằng bàn phím. Focus luôn nhìn thấy.
- **Reduced motion:** nhảy thẳng tới trạng thái cuối của beat; không pin, không scrub.
- **Responsive:** từ 360px trở lên. Mobile dùng timeline đơn giản hoá.
- **Ngôn ngữ:** tiếng Việt; thuật ngữ và tên UI giữ tiếng Anh, đặt trong `<span lang="en">`. Font có subset tiếng Việt.
- **Độ chính xác:** mọi hướng dẫn App có link docs và ngày kiểm chứng. Không mô tả UI chưa được nguồn chính thức xác nhận.
- **Riêng tư:** mặc định không tracking; analytics chỉ bật khi được duyệt.
- **Bảo trì:** nội dung tách khỏi code; mỗi chương gồm 1 MDX và 1 module timeline; ma trận bề mặt là dữ liệu.
- **Pháp lý:** không dùng logo, mascot hay ảnh chụp UI có thương hiệu Anthropic. Mockup giao diện là bản giản lược, trung tính.

## 8. Simulator

| # | Simulator | Ch. | Học được gì (trên kịch bản báo cáo tuần) |
|---|---|---|---|
| S1 | **Nhiễu tích tụ**: đọc 12 file dữ liệu, tra web, 2 lần viết hỏng; hai chỉ số độ tập trung và chi phí mỗi lượt (số minh hoạ) | 02 | Hội thoại tập trung cho kết quả tốt hơn, rẻ hơn; chọn `/clear`, nén, tua lại, phiên mới |
| S2 | **Ngã ba sau mỗi lượt**: Tiếp tục / Tua lại / Phiên mới / Nén / Giao cho subagent | 02 | Mỗi lượt là một điểm rẽ nhánh |
| S3 | **Cắt lát**: "thu thập hết → phân tích hết → viết hết" so với "làm trọn một thị trường trước" | 03 | Lát dọc cho kết quả end-to-end sớm |
| S4 | **Linter hướng dẫn dự án**: phân loại 12 dòng vào Giữ / Xoá / Chuyển | 04 | Hướng dẫn gọn; principle tốt hơn rule cứng |
| S5 | **Chọn khối**: xếp 8 tình huống vào Command / Skill / Subagent / Hook | 05 | Chọn đúng khối cho từng việc |
| S6 | **Cổng quyền**: đọc thư mục, sửa file, gửi email, xoá thư mục, đăng Slack, tra web đi qua các permission mode | 06 | Phân biệt rào chắn tất định với lời dặn |
| S7 | **Vòng kiểm chứng**: bật/tắt đối chiếu số liệu, reviewer độc lập, kiểm tra bằng browser | 07 | Cho Claude cách tự kiểm chứng |
| S8 | **Tỉa hướng dẫn**: một bộ hướng dẫn kiểu cũ; xoá hoặc viết lại từng dòng | 10 | Six shifts: overconstraint có thật |
| S9 | **Giao đúng người, đúng mức nghĩ**: gán model + effort cho 6 việc của báo cáo tuần; xem tốc độ, chi phí, độ tin cậy (số minh hoạ) | 05b | Chỉnh effort trước khi đổi model; việc khó đáng nghĩ lâu, việc nhỏ thì không |
| S10 | **Lắp dàn nhạc**: kéo các mảnh thành quy trình báo cáo tuần theo thứ tự Nghiên cứu → Kế hoạch → Làm → Rà soát → Bàn giao | 08 | Quy trình nhiều bước có thứ tự |
| S11 | **Giao việc cho đội agent**: xếp 6 việc vào *AFK* hoặc *Cần người trong vòng* | 09 | Việc nào giao hẳn được, việc nào cần người |

## 9. Đo lường

- **Learning gain:** Diagnostic 6 câu ở Mở đầu, Re-test 6 câu ở Chương 10 (cùng khái niệm, khác tình huống). Tính tại máy người học.
- **Hành vi:** tỷ lệ hoàn thành chương, tỷ lệ chọn tab App/CLI, số lần copy template, tỷ lệ tìm kiếm Library không có kết quả, số phiên Presenter.
- **Chất lượng:** Lighthouse CI + axe trên mỗi PR; tuổi trung bình của `verifiedAt` trong ma trận bề mặt.

## 10. Rủi ro & giảm thiểu

| Rủi ro | Giảm thiểu |
|---|---|
| **Giao diện App đổi nhanh**, hướng dẫn sai | Hướng dẫn App lưu dạng dữ liệu, có `verifiedAt` và link docs; diễn đạt theo *khả năng* ("bật plan mode") hơn là vị trí nút; CI nhắc kiểm chứng lại sau 30 ngày |
| **Tính năng khác nhau giữa các bề mặt và gói** | Huy hiệu khả dụng, trạng thái và gói trên từng khối; ghi rõ "Chưa có ở đây" kèm cách thay thế |
| **Tên sản phẩm đổi** (Cowork gộp vào Claude 16/09/2026; "Routines" đổi thành "scheduled tasks"; bot Slack cũ thay bằng Claude Tag từ 05/10/2026) | Hướng dẫn theo *mục đích công việc* hơn là nhãn UI; tên cũ được gắn nhãn "Đã thay thế" trong Library; mỗi khối có `verifiedAt` |
| **Nhầm lẫn giữa hai hệ thống App** (Cowork và Claude Code) | Tab riêng cho mỗi hệ; ContradictionNote khi cùng một khái niệm có hai cơ chế (memory, hướng dẫn dự án, plan) |
| **Visual "terminal" khiến người dùng App nghĩ trang chỉ dành cho dev** *(đã chấp nhận khi giữ Terminal Editorial)* | Diễn giải lại terminal thành "bàn làm việc của agent"; mono dùng cho *hành động của agent* (đọc file, tra web), không mặc định là lệnh shell; ví dụ và copy đều là công việc văn phòng; tab App là mặc định |
| Nội dung repo lỗi thời hoặc tự mâu thuẫn | Ingest hằng tuần; nhãn độ bền; contradiction note |
| Quá tải chuyển động | Mỗi chuyển động phải mang một nghĩa; mỗi chương tối đa 1 khoảnh khắc lớn |
| Phình phạm vi (vai trò, bề mặt) | v1 một kịch bản chung, 6 thẻ ca sử dụng; Story cố định 12 phần |
| Dữ liệu phụ thuộc phiên bản (tên model, effort mặc định) lỗi thời | `models.yml` có `verifiedAt` + CI nhắc; nhãn *Phụ thuộc model*; chương không viết cứng tên model |
| **Tên "No Babysitting" bị hiểu là "buông mặc"**, hoặc nghe suồng sã trong bối cảnh đào tạo trang trọng | Luôn đi kèm descriptor *"An unofficial guide to Claude Code best practices"* và tagline tiếng Việt; chương kết nói rõ *No babysitting ≠ no supervision*; Presenter mode có slide mở đầu trung tính (tên + descriptor) |
| **ASCII làm giảm khả năng đọc, giật trên mobile** | ASCII chỉ là đồ hoạ (canvas `aria-hidden`), chữ cần đọc luôn là HTML; ≤ 12k ô desktop / 4k mobile; tối đa 2 canvas động; dừng khi ra khỏi viewport; reduced motion hiện frame cuối |
| **Nhân vật The Colleague bị hiểu là mascot chính thức** | Gương mặt ký tự trung tính `[•_•]`, không hình con vật, không khối pixel màu cam; không có lời thoại riêng |
| **Bị hiểu là trang chính thức** của Anthropic | Không có "Claude" trong tên; chữ "unofficial" trong descriptor; disclaimer ở footer; không dùng logo hay nhận diện của Anthropic |

## 11. Quyết định đã chốt

| Chủ đề | Quyết định |
|---|---|
| **Tên** | **No Babysitting** (tiếng Anh, không chứa "Claude") + descriptor "An unofficial guide to Claude Code best practices" |
| **Lời hứa** | Từ vibe đến agentic |
| **Ẩn dụ** | Giao việc cho đồng nghiệp mới (thay cho ngựa và yên cương) |
| **Thị trường** | Tên tiếng Anh, nội dung tiếng Việt ở v1, chừa i18n |
| **Danh nghĩa** | Dự án cộng đồng độc lập |
| Đối tượng | Người dùng Claude và Claude Code mức trung bình đến cao, nhiều vai trò; **v1 không chia nhánh** |
| Định vị | Claude Code là agent đa năng; code chỉ là một ứng dụng |
| Phạm vi | Claude Code và các bề mặt App (Desktop, Web, Mobile, Cowork, Slack, Chrome, Routines) |
| Bề mặt | Nguyên lý trước; "Cách làm" theo 3 tab: Cowork · Claude Code app (mặc định) · CLI |
| Ví dụ | Một kịch bản chung "Báo cáo thị trường hằng tuần" + 6 thẻ ca sử dụng theo vai trò |
| Cấu trúc | Story khoảng 10 chương + Library phủ 100% |
| Bối cảnh dùng | Tự học, kèm Presenter mode |
| Ngôn ngữ | Tiếng Việt, giữ thuật ngữ gốc tiếng Anh |
| Visual | **Terminal Brutalism × Cinematic ASCII**: giữ token và hai theme của Terminal Editorial; thêm ASCII làm ngôn ngữ đồ hoạ (màu mang nghĩa, hai cảnh full-color), bố cục brutalist (góc vuông, lưới lộ), nhân vật **The Colleague**, 4 khoảnh khắc chữ ký trên nền tĩnh; không WebGL ở v1 (Design System §12) |
| Sư phạm | Socratic + Predict–Observe–Explain + mini-simulator |
| Six shifts | Sợi chỉ xuyên suốt + chương kết + nhãn độ bền |
| Stack | Astro (static) + GSAP 3.15 vanilla |
| Nội dung | Story viết tay + Library ingest + ma trận bề mặt kiểm chứng định kỳ |
| **Model & effort** *(06/11/2026)* | Chương ngắn riêng **05b "The Right Colleague"** (giữa 05 và 06) + simulator S9; tên model và mức mặc định nằm trong `models.yml` có `verifiedAt` |
| **Nguồn chuẩn khi mâu thuẫn** *(06/11/2026)* | Docs chính thức là chuẩn; tip repo cũ giữ trong Library với nhãn *Đã thay thế* / *Phụ thuộc model* / *Chưa thống nhất* (ví dụ "bật thinking", "Opus cho mọi việc", ultrathink) |
| **Độ phủ repo** *(06/11/2026)* | Đơn vị = dòng README + tip lẻ trong bài tip + mục của `best-practice/*.md` + tip từ CLI binary; công bố danh sách loại trừ có lý do |
| **Nguồn chính thức bổ sung** *(06/11/2026)* | Trang Best practices của Claude Code + 4 bài blog tháng 10/2026 (code review, agent automations, cloud sessions, mods); rà nguồn chính thức mỗi tháng. Không đưa Fable field guide vào v1 |
| **Tab mặc định** *(06/11/2026)* | *Claude Code app* (giữ nguyên). Các ô "?" của Cowork xử lý theo `05-surface-matrix.md` §4 |
| **Phạm vi & lịch** *(06/11/2026)* | Đủ phạm vi, **12–13 tuần** (M0–M5, §12) |
| **Nội dung dev** *(06/11/2026)* | Đường chính app-first: phần dành cho dev chuyển vào *Đào sâu*, tab CLI và Library; c05 b6 (TodoWrite) → Đào sâu; c06 dạy rào chắn người dùng app tự đặt được; c08 mở bằng quy trình, không bằng danh sách framework |
| **Gói của người học** *(06/11/2026)* | Trộn lẫn: mỗi bước/tính năng phụ thuộc gói hoặc quyền admin gắn `PlanPill` (FR-18) |
| **Màu sắc & định vị** *(06/11/2026, cập nhật 07/11/2026)* | Sản phẩm **go live công khai** (08 · D9–D16). Chủ dự án quyết định **giữ palette cam** và thêm disclaimer rõ ở hero và chân mọi trang (08 · D7) |

## 12. Mốc

| Mốc | Nội dung | Ước lượng* |
|---|---|---|
| M0 · Tracer bullet | Khung, tokens, SurfaceTabs, Mở đầu + Chương 02 + S1/S2, Library tối thiểu, Presenter cơ bản, ASCII Hero | 1,5 tuần |
| M1 · Phần I–II | Chương 01, 03, 04 + S3/S4 + ingest đầy đủ theo đơn vị mới + ma trận bề mặt c01–c04 + kiểm chứng tay các ô "?" của Cowork | 2 tuần |
| M2 · Phần III | Chương 05, **05b**, 06, 07 + S5–S7, **S9** + Starter Kit + `models.yml` + `official-sources.yml` | 3 tuần |
| M3 · Phần IV + Kết | Chương 08–10 + S8, S10, S11 + Re-test + 6 thẻ ca sử dụng + cảnh ASCII còn lại (wipe, lens, finale, FloatingOps) | 2,5 tuần |
| M4 · Library & Presenter | Tóm tắt tiếng Việt + nhãn độ bền cho mọi mục Library; speaker notes cho mọi beat; NotesWindow | 2 tuần |
| M5 · Hoàn thiện | A11y, hiệu năng, kiểm chứng nội dung, launch | 1,5 tuần |

\*Giả định: 1 người làm full-stack cùng Claude Code. Tổng khoảng 12–13 tuần (bản 2.1 ước 7–8 tuần nhưng chưa tính viết tóm tắt Library, speaker notes, các cảnh ASCII còn lại và chương 05b).

## 13. Câu hỏi mở

1. **Domain và handle** cho "No Babysitting": chưa kiểm tra tình trạng domain. Cần chọn một domain trung tính (không chứa "claude") rồi kiểm tra trước khi công bố.
2. Hosting: Vercel (có preview cho mỗi PR) hay GitHub Pages?
3. Bật analytics ẩn danh (opt-in) để đo G1, G2?
4. v2: cá nhân hoá Story theo vai trò, hay mở rộng sang bản tiếng Anh trước?
5. ✅ **Đã chốt (06/11/2026): tab mặc định là *Claude Code app*.** Bằng chứng ngược lại (docs Desktop: việc văn phòng ở lại Cowork) vẫn ghi ở `05-surface-matrix.md` §3.
6. ✅ **Đã chốt (06/11/2026): gói của người học trộn lẫn**, gắn nhãn theo gói (FR-18); chương 09 trình bày cả Claude Tag (Team/Enterprise) lẫn scheduled tasks cá nhân.

**Ghi chú 06/11/2026:** sản phẩm dùng nội bộ, không thương mại hoá. **Cập nhật 07/11/2026:** chuyển sang go live công khai; câu 2 → GitHub Pages (D10), câu 3 → analytics không cookie + nút phản hồi (D11), câu 1 (domain) làm sau; câu 4 → tiếng Việt trước, tiếng Anh là đợt sau (D1).
7. ✅ **Đã chốt (07/11/2026): viết lại c02 và S1** theo khung "context tập trung → tốt hơn, rẻ hơn"; ngưỡng 40% thành *Phụ thuộc model / Chưa thống nhất*. Còn việc: ContextMeter, trạng thái `overloaded` của The Colleague và c10 cần cập nhật theo; đọc nguyên văn bảng *What you can stop doing* khi viết.

**Nguồn và liên kết:** repo https://github.com/shanraisshan/claude-code-best-practice · toàn bộ link nghiên cứu và quy tắc nguồn ở `06-sources-and-links.md`.
