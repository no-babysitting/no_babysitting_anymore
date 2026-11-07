# Pedagogical Script · No Babysitting

> Kịch bản sư phạm cho phần Story và Presenter mode. Bản 2.0, tái cấu trúc cho đối tượng *người dùng Claude và Claude Code mức trung bình đến cao*. App là mặc định; Claude Code không chỉ để code.
> Mỗi beat có ID `cNN:bM`. ID này dùng chung cho deep link (`#c04-b3`), timeline label của GSAP và bước của Presenter mode.
> Các bước "Cách làm" trên từng bề mặt **không viết ở đây** mà tham chiếu theo **feature ID** tới `05-surface-matrix.md`, vì đó là dữ liệu đã kiểm chứng và có `verifiedAt`.

---

## 0. Phương pháp luận

### 0.1 Vì sao kết hợp các phương pháp này

| Thành phần | Vai trò trong trang | Cơ sở |
|---|---|---|
| **Socratic questioning** | Mỗi chương mở bằng một câu hỏi có mâu thuẫn thật, người đã dùng Claude trả lời được bằng kinh nghiệm | Buộc người học dựng mô hình của chính mình trước khi nghe giải thích |
| **Predict → Observe → Explain** | Chọn đáp án trước, animation mới mở, rồi mới giải thích | Đưa hiểu lầm ra ánh sáng; cú "sai" do chính mình dự đoán tạo động lực học |
| **Refutation text** | Mỗi phương án nhiễu là một hiểu lầm có nguồn (Billion-Dollar Questions, tips, thảo luận cộng đồng) | Nêu thẳng hiểu lầm rồi bác bỏ hiệu quả hơn chỉ trình bày điều đúng |
| **Worked example → faded → simulator** | Ví dụ mẫu (báo cáo tuần) → bài làm có gợi ý → simulator tự làm | Giảm tải nhận thức (Sweller) |
| **Concreteness fading** | Cảnh cụ thể (cửa sổ agent) → sơ đồ → nguyên lý → "Cách làm" trên bề mặt của bạn | Đi từ cụ thể đến trừu tượng giúp chuyển giao kiến thức |
| **Dual coding + Mayer** | Chuyển động minh hoạ *cơ chế*, chữ nêu *ý nghĩa*; chia nhỏ theo beat; báo hiệu bằng màu ngữ nghĩa | Lý do của quy tắc "motion-as-explanation" |
| **Retrieval practice** | Thẻ "Grill me" cuối chương; Diagnostic ở đầu, Re-test ở cuối | Testing effect |

**Điều chỉnh cho người đã có kinh nghiệm:** không dạy lại kiến thức nhập môn. Câu hỏi mở đầu chạm vào *trải nghiệm đã có* ("bạn từng thấy…"). Phần nền tảng (LLM, token, cài đặt) chỉ đặt trong ngăn "Đào sâu".

### 0.2 Nguyên tắc meta: trang dạy đúng điều nó thực hành

- **Progressive disclosure**: Story giữ phần lõi; "Đào sâu" và Library chứa chi tiết, mở ra khi cần.
- **Thiết kế giao diện thay vì đưa ví dụ**: simulator cho người học *thao tác*.
- **Rich references**: Starter Kit là file copy được, không phải mô tả văn xuôi.
- **Nguyên lý trước, bề mặt sau**: mỗi best practice phát biểu độc lập công cụ, sau đó mới đến "Cách làm" theo tab App | CLI.
- **Grill me**: quy trình thiết kế chính trang này bắt đầu bằng một phiên grill có đáp án khuyến nghị.

### 0.3 Vòng beat: HỎI → ĐOÁN → THẤY → HIỂU → LÀM → NHỚ

| Pha | Quy tắc | Thành phần UI |
|---|---|---|
| **HỎI** | Một câu hỏi, tối đa 25 từ, gắn với kịch bản báo cáo tuần hoặc một con số gây ngạc nhiên | `QuestionCard` |
| **ĐOÁN** | 3 phương án; phương án nhiễu là hiểu lầm có nguồn. Phải chọn hoặc "Bỏ qua" | `PredictPrompt` |
| **THẤY** | Animation hoặc simulator phơi bày cơ chế. Mỗi cảnh tối đa khoảng 12 giây hoặc scrub | `ObserveStage` + `AgentWindow` |
| **HIỂU** | Tối đa 120 từ + badge nguồn + "Đào sâu" | `ExplainBlock` |
| **CÁCH LÀM** | 3 tab: **Cowork** · **Claude Code app** (Desktop/Web/Mobile; mặc định) · **CLI**. Kèm huy hiệu khả dụng, trạng thái, gói. Dữ liệu lấy từ ma trận bề mặt. Tính năng không có ở tab đang chọn thì hiện "Chưa có ở đây" + cách thay thế | `SurfaceTabs` |
| **Then → Now** | "Hồi đó" (vì sao từng hợp lý) → "Bây giờ" + câu hỏi dẫn + nhãn độ bền | `ThenNowCard` |
| **LÀM** | Simulator hoặc template áp dụng ngay vào việc của bạn | `SimulatorFrame`, Starter Kit |
| **NHỚ** | 2–3 câu nhớ lại; đáp án khuyến nghị hiện sau khi tự trả lời | `GrillCard` |

### 0.4 Kịch bản xuyên suốt: BÁO CÁO THỊ TRƯỜNG HẰNG TUẦN

Hà phụ trách **báo cáo thị trường cà phê hằng tuần** cho ban giám đốc. Thư mục `bao-cao-tuan/` gồm: `ban-hang-T10.xlsx`, `gia-doi-thu.csv`, `ghi-chu-hop.md`, báo cáo tuần trước `bao-cao-W44.html`, và một số nguồn web về giá. Đầu ra mỗi tuần: `bao-cao-W45.md` + 5 slide + một đoạn tóm tắt đăng lên Slack.

HUD hiện **bảng trạng thái BÁO CÁO TUẦN** với 4 tiêu chí, chuyển dần từ ❌ sang ✅:

| Tiêu chí | Đạt ở chương |
|---|---|
| ① Hiểu đúng yêu cầu | 03 |
| ② Đúng chuẩn trình bày của team | 04 |
| ③ Số liệu được kiểm chứng | 07 |
| ④ Lặp lại được & tự chạy | 05 (một nửa) → 08 → 09 |

**Thẻ ca sử dụng** (trong Library, gắn ở cuối các chương liên quan): Marketing · Tài chính · Vận hành · Nghiên cứu · PM · Dev. Chúng cho thấy *cùng nguyên lý* áp dụng cho việc khác, kể cả code.

### 0.5 Bốn cấp độ

**Low** (Phần I) → **Medium** (Phần II) → **High** (Phần III) → **Pro** (Phần IV). Lấy từ framework *vibe-to-agentic* của repo, mở rộng từ "vibe coding" thành *làm việc theo cảm hứng*: mỗi yêu cầu là một lần tung đồng xu. Cấp độ cao nhất là *làm việc kiểu agentic*: có hệ thống, lặp lại được, tự kiểm chứng.

### 0.6 Nhãn độ bền

| Nhãn | Tiêu chí | Ví dụ |
|---|---|---|
| **Bền vững** | Nguyên lý không phụ thuộc thế hệ model | Cho Claude cách tự kiểm chứng; bảo vệ context; rào chắn tất định cho kịch bản xấu nhất |
| **Phụ thuộc model** | Con số hoặc chiến thuật gắn với một thế hệ model hay phiên bản | Dumb zone khoảng 40%; `ultrathink`; "PROACTIVELY"; thẻ `<important if>`; tuổi thọ của plan mode |
| **Đã thay thế** | Đã có cơ chế mới thay hẳn | Phím `#` ghi memory → auto-memory; TodoWrite → Tasks |
| **Chưa thống nhất** | Các nguồn mâu thuẫn nhau | CLAUDE.md < 150 hay < 200 dòng; các ngưỡng context khác nhau |

### 0.7 Presenter mode

- Mỗi beat là một bước. Pha **ĐOÁN** có thanh Thảo luận (think–pair–share: nghĩ 30 giây, trao đổi theo cặp 60 giây, giơ tay chọn A/B/C).
- Tổng thời gian: khoảng **118 phút tự học** và **142 phút trình chiếu** (đã gồm 05b). **Lộ trình rút gọn (khoảng 93 phút):** Mở đầu → 01 → 02 → 04 → 05 → 05b → 07 → 10. Tiêu chí ④ của bảng trạng thái chỉ đạt một nửa trên lộ trình này; thêm c09 (+12') nếu muốn đạt đủ.

### 0.8 Diagnostic (Mở đầu) và Re-test (Chương 10)

| Khái niệm | Diagnostic | Re-test |
|---|---|---|
| K1 Context stack | Bạn nhắn "làm báo cáo tuần này". Claude thực sự *thấy* gì? ① **Câu của bạn, chỉ dẫn hệ thống, hướng dẫn dự án, mô tả công cụ** ② Đúng câu bạn vừa nhắn, cộng với toàn bộ cuộc trò chuyện trước đó ③ Câu của bạn cùng mọi file trong thư mục dự án đang mở trên máy | Bạn kết nối thêm 5 công cụ. Điều gì xảy ra với *mọi* phiên? → **mô tả công cụ chiếm chỗ trong context** (trừ khi được nạp hoãn) |
| K2 Ngân sách context | Cửa sổ context rất lớn. Khi nào nên dọn? ① Khi thanh context đã gần như đầy hẳn ② Khi Claude đã tự động nén hội thoại lần đầu ③ **Giữa các việc không liên quan với nhau** | Phiên đã có 2 lần viết hỏng phần phân tích. Bước tốt nhất? → **tua lại về trước lần thử hỏng (hoặc `/clear`), yêu cầu lại kèm điều đã học** |
| K3 Tất định | Muốn Claude *không bao giờ* gửi email thay bạn. Cách chắc nhất? ① Ghi IN HOA trong hướng dẫn dự án rằng tuyệt đối không được gửi ② **Chặn bằng quyền: không cấp công cụ gửi email, hoặc đặt deny** ③ Nhắc lại ở đầu mỗi yêu cầu rằng không được tự ý gửi email đi | Không bao giờ được xoá file trong `du-lieu-goc/`. → **quyền chỉ đọc / deny rule / hook** |
| K4 Hướng dẫn dự án | Hướng dẫn dự án tốt chứa gì nhiều nhất? ① danh sách file và mô tả thư mục ② **gotcha và quy ước riêng của team** ③ mọi quy tắc có thể cần | Dòng "Thư mục có các file Excel sau: …". → **xoá: Claude tự thấy được** |
| K5 Khối xây dựng | Việc làm mỗi tuần theo cùng một quy trình nên đóng gói thành? ① subagent ② **skill / command** ③ một đoạn dài trong hướng dẫn dự án | Đọc 40 bài báo, chỉ cần kết luận. → **subagent (cô lập context)** |
| K6 Overconstraint | Với model mới, thêm thật nhiều ví dụ và quy tắc vào chỉ dẫn sẽ? ① luôn tốt hơn ② không ảnh hưởng ③ **có thể làm kết quả tệ đi** | Chọn giữa "Không bao giờ viết đoạn quá 3 câu" và "Viết giống văn phong các báo cáo trước". → **câu thứ hai** |

### 0.10 Lớp ASCII trong Story (xem Design System §12)

- **The Colleague** (nhân vật ASCII) phản ánh trạng thái *thật* của cảnh: `[°_°]…` khi Claude đọc hoặc lập kế hoạch (c03), `[>_<]≡` khi AgentWindow chạy, `[•_•]?` khi xin quyền (c06), `[@_@]` khi context vượt 40% (c02), `[^_^]✓` khi kiểm chứng xong (c07, c09).
- **Bốn khoảnh khắc chữ ký:**
  - Mở đầu: ASCII Hero "Noise → Order", hiện thực hoá chính lời hứa *từ vibe đến agentic*.
  - Level Wipe ở ranh giới giữa các Phần.
  - Lens kiểm chứng ở c07.
  - Finale full-color ở c10.
- Pha **ĐOÁN** không bao giờ có ASCII động, để người học tập trung suy nghĩ.

### 0.9 Mã tham chiếu

**Tip:** `PR` Prompting · `PS` Planning · `CX` Context · `SM` Session · `CM` CLAUDE.md · `AG` Agents · `CO` Commands · `SK` Skills · `HK` Hooks · `WF`/`WA` Workflows · `GP` Git/PR · `DB` Debugging · `UT` Utilities · `DY` Daily. Theo README upstream @ `722071c`.
**Shift:** `S1` Rules → Judgment · `S2` Examples → Interfaces · `S3` Upfront → Progressive disclosure · `S4` Repetition → Simple tool descriptions · `S5` CLAUDE.md memory → Auto-memory · `S6` Simple specs → Rich references (Thariq Shihipar, 24/07/2026).
**Feature ID** (dùng cho `SurfaceTabs`, chi tiết trong `05-surface-matrix.md`): viết dạng `⟨plan-mode⟩`.

---

### 0.11 Nguồn chính thức làm khung đối chiếu (bổ sung 06/11/2026)

Ngoài bài six shifts, mỗi chương được đối chiếu với **trang Best practices chính thức của Claude Code** và các bài blog chính thức tháng 10/2026. Khi tip trong repo mâu thuẫn với nguồn chính thức mới hơn, **docs chính thức là chuẩn**: tip cũ giữ nguyên trong Library, gắn nhãn *Đã thay thế* hoặc *Phụ thuộc model*, và hiện dạng Then → Now (FR-14).

| Mục của trang Best practices (đã đối chiếu danh sách đầy đủ 07/11/2026) | Chương |
|---|---|
| Tell Claude what it can't see → Write a specific prompt · Brainstorm with Claude first | 03 |
| Tell Claude what it can't see → Keep CLAUDE.md short · Scope rules to one part of the codebase | 04 |
| Tell Claude what it can't see → Put team procedures in skills | 05 |
| Tell Claude what it can't see → Connect the tools Claude needs | 06 |
| Give Claude a check to run → Review against your spec · Enforce the check with a Stop hook | 07 |
| Enforce the rules that can't have exceptions → hooks · permission rules and sandbox · Choose who a rule applies to | 06 (hook, sandbox: Đào sâu và tab CLI) |
| Change a default → Change the permission mode | 06 |
| Change a default → Change the model and effort · Know what subagents cost | 05b |
| Change a default → Keep cost and context down · Steer the session | 02 |
| Let Claude run without you → Run sessions in parallel | 08 |
| Let Claude run without you → Run Claude from a script · Start runs on a schedule or an event | 09 |
| What you can stop doing (bảng 7 dòng) | 10 và từng chương, xem dưới |

**"What you can stop doing"** mở đầu bằng câu "Every one of these was good advice when it was written" (cùng tinh thần six shifts). Cột trái của bảng 7 dòng đã đọc nguyên văn; cột giải thích mới đọc ở dòng về effort ("Effort is the control for that…"). Ánh xạ đề xuất: *"The context window is your main constraint, manage it aggressively"* → c02 (**phải đọc phần giải thích trước khi viết c02**, xem ghi chú ở c02) · *"Add IMPORTANT or ALL CAPS…"* → c04, c06 (S4, S8) · *"Use subagents to protect your context window"* và *"Delegate to a subagent for a better answer"* → c05 · *"`think hard`, `be thorough`…"* → c05b · *"Tell Claude to keep going, loop until done, don't be lazy"* → c09 (⟨goal⟩) và c10 · *"Describe your architecture and file layout in `CLAUDE.md`"* → c04 (S4). Các bài blog chính thức tháng 10/2026: *How the Claude Code team does code review* (c07), *Building effective agent automations* và *Claude Code in the cloud: a field guide to cloud sessions* (c09), *Getting started with Claude Code mods* (Library và *Đào sâu* của c06). Quy trình: mỗi tháng rà blog và docs chính thức một lượt, cập nhật `official-sources.yml` (SAD §7.2b); bài mới thì gắn vào chương hoặc Library. *Fable field guide* **không** đưa vào v1 (quyết định 06/11/2026).

---

## Mở đầu · Two Coin Flips (Hai lần tung đồng xu)
`c00` · 6'/8'

**Mục tiêu:** (1) Nhận ra tính không nhất quán của cách làm "theo cảm hứng". (2) Biết hành trình 4 cấp độ. (3) Làm Diagnostic.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Cùng một yêu cầu 'làm báo cáo thị trường tuần này', chạy hai lần. Hai bản có giống nhau không?"** | SplitText (mask: words) |
| b2 | ĐOÁN | ① Giống hệt ② Gần giống ③ **Có thể khác hẳn** | `PredictPrompt` |
| b3 | THẤY | Hai `AgentWindow` chạy song song. Lần 1: báo cáo 3 trang, giá lấy từ kỳ cũ, không có biểu đồ. Lần 2: báo cáo 7 trang, cấu trúc khác, số liệu lấy từ nguồn khác. Giữa hai bên là một đồng xu lật. | Đồng xu `rotationY`; nhật ký hành động hiện theo stagger; hai bản kết quả lệch nhau |
| b4 | HIỂU | Karpathy gọi kiểu làm này là *vibe coding* (2/2025): nó *nâng mặt bằng chung*, nhưng mỗi yêu cầu vẫn là một lần tung đồng xu. Điều này đúng với **mọi loại việc**, không riêng code. Bản *agentic* của báo cáo theo đúng mẫu tuần trước, số liệu được đối chiếu, có slide và tự chạy mỗi thứ Hai. Model không đổi; thứ thay đổi là **harness** bạn dựng quanh nó. **Giải nghĩa nhanh:** *vibe* = giao kiểu tuỳ hứng rồi phải ngồi trông từng bước (*babysitting*); *agentic* = giao như cho một đồng nghiệp giỏi, rồi yên tâm làm việc khác. Đó là lý do trang có tên **No Babysitting**, và Chương 10 sẽ quay lại cái tên này. | ScrambleText "theo cảm hứng" → "có hệ thống"; Flip hai bản kết quả vào **bảng BÁO CÁO TUẦN** (4 × ❌) |
| b5 | LÀM | **Diagnostic 6 câu** (§0.8): "Không chấm điểm, để dành so sánh ở cuối." | Form, lưu cục bộ |
| b6 | — | Giới thiệu HUD: thanh cấp độ, bản đồ harness, và câu hỏi **"Bạn làm việc với Claude chủ yếu ở đâu?"** gồm 3 lựa chọn: *Claude app (Cowork)* · *Claude Code trên Desktop/Web* (chọn sẵn) · *Terminal*. Lựa chọn này đặt tab mặc định cho mọi khối "Cách làm" | Các trụ chớp một lần; lựa chọn lưu cục bộ |

🎙 *"Ai từng giao cùng một việc hai lần và nhận về hai kết quả khác nhau? Hôm nay ta biến đồng xu thành một quy trình."*
**Nguồn:** framework vibe-to-agentic; video script *1-video-workflow* (hai thẻ thời tiết khác nhau); video Karpathy (02/05/2026).

---

## 01 · The New Colleague (Đồng nghiệp mới)
`c01` · Low · 7'/9'

**Mục tiêu:** (1) Giải thích *Claude Code = model + harness*. (2) Thấy Claude Code là **agent đa năng**: code chỉ là một ứng dụng. (3) Kể tên các lớp của context stack và các bề mặt dùng chung một harness.
**Hiểu lầm → Sự thật:** "Claude Code là công cụ cho lập trình viên" → Đó là một agent làm việc với file, công cụ, web và dữ liệu của bạn. Anthropic làm ra Cowork chính vì thấy người dùng đem Claude Code đi làm cả những việc không phải code *(latent demand, Boris)*. "Prompt là thứ tôi gõ" → Thứ bạn gõ chỉ khoảng 6–60 token; thứ model thấy là khoảng 5k–50k+ token do harness lắp.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Cùng một model, trong khung chat và trong Claude Code. Vì sao Claude Code *làm* được nhiều hơn hẳn?"** | SplitText |
| b2 | ĐOÁN | ① Claude Code dùng model mạnh hơn ② **Claude Code có thêm "cơ thể": công cụ, file, bộ nhớ, vòng lặp** ③ Claude Code có một chỉ dẫn hệ thống bí mật rất dài *(giữ lại, Chương 10 sẽ quay về)* | Lưu lựa chọn ③ để gọi lại ở c10:b1 |
| b3 | THẤY | **Đồng nghiệp mới và bàn làm việc của họ.** Model là một đồng nghiệp rất giỏi nhưng mới đến, chưa biết gì về công việc của bạn. **Harness** (thuật ngữ của Anthropic) là toàn bộ những gì bạn dựng quanh người đó, được vẽ ra lần lượt: *Quy trình làm việc* = vòng điều khiển · *Quyền dùng công cụ* = danh sách tool được phép · *Hồ sơ trên bàn* = quản lý context (thấy gì, không thấy gì) · *Người duyệt* = bộ đánh giá "xong chưa" · *Sổ bàn giao* = lưu trạng thái giữa các lượt. | DrawSVG từng phần của "bàn làm việc" theo scrub; nhãn hiện khi nét vẽ xong |
| b4 | HIỂU | **Vòng agentic:** thu thập (đọc file, tra web) → hành động (viết, sửa, chạy) → kiểm (đối chiếu, xem kết quả). **Context stack** (Thariq, 07/2026): yêu cầu của bạn → *references* (file, mẫu, trang web, artifact) → chỉ dẫn hệ thống · hướng dẫn dự án (CLAUDE.md) · skills · memory. **Một kiến trúc agent, nhiều cửa vào:** *Claude app (Cowork)*: "uses the same agentic architecture that powers Claude Code", không cần terminal · *Claude Code app*: tab Code trên Desktop, claude.ai/code, Code tab trên mobile · *Slack* (Claude Tag) · *Chrome* · *CLI* · IDE ⟨surfaces⟩. | MotionPath chấm chạy vòng Thu thập → Làm → Kiểm; các lớp stack xếp chồng; DrawSVG nối các bề mặt vào một harness |
| b5 | HIỂU | **Không chỉ để code.** Lưới 6 thẻ ca sử dụng (nghiên cứu, phân tích dữ liệu, tài liệu & slide, làm việc với file, tự động hoá theo lịch, code), mỗi thẻ có nguồn ⟨usecases⟩. | Flip lưới thẻ; mỗi thẻ link sang Library |
| b6 | NHỚ | **Grill me:** ① *"Quyền dùng công cụ" của đồng nghiệp ứng với gì trong Claude Code?* → các công cụ và quyền mà Claude được phép dùng (permissions, connectors). ② *Ai quyết định model thấy gì?* → harness: hướng dẫn dự án, skills, công cụ, lịch sử, file. | `GrillCard` |

**Đào sâu:** deck gốc của repo dùng ẩn dụ *con ngựa và bộ yên cương* (dây cương, hàm thiếc, miếng che mắt…). Trang giữ lại nó như một cách nhìn thứ hai cho người thích góc kỹ thuật. Thêm: model không có trạng thái; sinh token kế tiếp ("Bầu trời màu ___": xanh 62% · quang 14% · tối 8% · rơi 0,3%, số liệu minh hoạ từ deck gốc); tool calling: một *lượt* gồm nhiều lần suy luận.
🎙 Câu hỏi từ deck gốc: *"GPT khác ChatGPT ở đâu?"* → ChatGPT = GPT + harness.
**Nguồn:** deck *claude-code-best-practice* (slide 8–22); `reports/why-harness-is-important.md`; Thariq 07/2026; Boris tại YC & Lenny (latent demand, Cowork); kết quả nghiên cứu ⟨surfaces⟩ ⟨usecases⟩.

---

## 02 · The Briefing Budget (Ngân sách ngữ cảnh)
`c02` · Low · 10'/12'

**Đã viết lại theo khung mới (07/11/2026, chủ dự án duyệt; áp dụng "docs chính thức là chuẩn").** Trang Best practices xếp "manage the context window aggressively" vào *What you can stop doing*: cửa sổ 1M token và tự nén nên hết context hiếm khi là vấn đề; `/clear` giữa các việc vẫn đáng làm vì context tập trung cho câu trả lời tốt hơn và rẻ hơn (nguyên văn đã đọc: *"you'll rarely run out of context"*). **Trước khi viết nội dung chương: mở trang và đọc nguyên văn bảng này** (phần giải thích mới đọc qua bản tóm tắt). Tên chương giữ "Briefing Budget" vì ẩn dụ vẫn đúng ở nghĩa *chi phí và độ tập trung*, không còn nghĩa *cạn kiệt*.

**Mục tiêu:** (1) Hiểu vì sao hội thoại *tập trung* cho kết quả tốt hơn và rẻ hơn, dù hết context hiếm khi xảy ra. (2) Chọn đúng hành động sau mỗi lượt: tiếp tục · `/clear` giữa các việc · `/compact` có trọng tâm · tua lại · phiên mới + brief. (3) Biết xem, nén, tua lại và mở phiên mới trên bề mặt của mình.
**Hiểu lầm → Sự thật:** "Cửa sổ lớn thì cứ nhồi" / "phải canh từng phần trăm" → Hết context hiếm khi là vấn đề, nhưng *mỗi bản hỏng và lời sửa vẫn nằm lại trong hội thoại*; phiên tập trung cho câu trả lời tốt hơn và rẻ hơn.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Claude vừa viết hỏng phần phân tích 2 lần. Bạn nhắn 'không phải vậy, thử lại'. Lần thứ 3 sẽ tốt hơn hay tệ hơn?"** | SplitText |
| b2 | ĐOÁN | ① Tốt hơn, vì Claude đã có thêm thông tin về điều bạn muốn ② Như cũ, vì mỗi lần thử Claude đều bắt đầu lại từ đầu phiên ③ **Dễ tệ hơn: hai bản hỏng vẫn nằm trong cuộc trò chuyện** | `PredictPrompt` |
| b3 | THẤY | **S1 Nhiễu tích tụ** (pin): mỗi lượt thêm khối vào hội thoại: 12 file Excel, 6 trang web, 2 bản nháp hỏng, 2 lời sửa. Hai chỉ số (**số minh hoạ**): *độ tập trung* (giảm khi có bản hỏng và nội dung không liên quan) và *chi phí mỗi lượt* (tăng theo độ dài). Không có vùng đỏ cố định. Mốc 1M token và tự nén hiện như vạch mờ ở rất xa, ghi "hiếm khi chạm tới". | Pinned scrub; `--fill` cho hai chỉ số; The Colleague `[°_°]…` khi độ tập trung thấp |
| b4 | HIỂU | Context là bộ nhớ làm việc, xoá ở mỗi phiên. Thứ ăn context: file đã đọc, kết quả tra web, mô tả công cụ, hướng dẫn dự án. **Chính thức:** hầu hết model có cửa sổ 1M và tự nén; phiên bỏ không dùng lâu được nén trước khi bộ nhớ đệm hết hạn; `/clear` giữa các việc không liên quan là miễn phí và việc sau không phải trả tiền cho lịch sử của việc trước. **Ngưỡng cũ (Phụ thuộc model, Chưa thống nhất):** Dex khoảng 40%; Matt khoảng 100K; Thariq: context rot khoảng 300–400k trên cửa sổ 1M, "tuỳ tác vụ"; **trang chính thức không nêu ngưỡng phần trăm**. Hiện dưới dạng ContradictionNote, không phải quy tắc. | Các nguồn xếp cạnh nhau, kèm `SourceButton` |
| b5 | CÁCH LÀM | Xem mức dùng context ⟨context-usage⟩ · Nén có gợi ý ⟨compact⟩ · Phiên mới kèm brief ⟨new-session⟩ · Tua lại ⟨rewind⟩ · Tiếp tục hoặc rẽ nhánh phiên cũ ⟨sessions⟩ | `SurfaceTabs` |
| b6 | THẤY | **Sửa tiếp hay tua lại** (Thariq): *Sửa tiếp* = đọc + 2 lần hỏng + 2 lời sửa + bản đúng. *Tua lại* = đọc + 1 yêu cầu đã rút kinh nghiệm + bản đúng. Khớp lời khuyên chính thức: sau hai lần sửa không được, `/clear` rồi viết lại prompt tốt hơn. | Flip, cột "Tua lại" co ngắn lại |
| b7 | LÀM | **S2 Ngã ba sau mỗi lượt**: 5 tình huống của báo cáo tuần, mỗi tình huống chọn Tiếp tục / Tua lại / Phiên mới / Nén / Giao subagent. Phản hồi theo bảng của Thariq, kèm lưu ý chính thức: subagent hợp để chạy song song, tách đầu ra ồn, rà soát độc lập, nhưng mỗi thứ tốn thêm token. | Cây quyết định + Flip giải thích |
| b8 | NHỚ | **Grill me:** ① *Khi nào phiên mới + brief tốt hơn nén?* → khi bước tiếp quan trọng và cần kiểm soát chính xác những gì mang theo. ② *Có nên giao subagent?* → "Mình còn cần các bước trung gian, hay chỉ cần kết luận? Và có đáng tốn thêm token không?" ③ *Vì sao `/clear` giữa các việc vẫn đáng làm?* → hội thoại tập trung cho kết quả tốt hơn và rẻ hơn. | `GrillCard` |

🎙 *"Ai từng thấy Claude 'ngốc dần' về cuối buổi? Thường là do hội thoại đã chứa quá nhiều bản hỏng và lời sửa, không phải model bị nerf."*
**Nguồn:** CX1–5, SM1–6; `tips/claude-thariq-tips-16-apr-26.md`; video Dex, Matt Pocock; `reports/llm-day-to-day-degradation.md`; trang Best practices (*Keep cost and context down*, *Steer the session*, *What you can stop doing*). Link: `06-sources-and-links.md`.

---

## 03 · The Brief (Brief trước khi giao)
`c03` · Medium · 10'/12'

**Mục tiêu:** (1) Dùng plan mode và để Claude phỏng vấn mình nhằm giảm mơ hồ. (2) Cắt việc theo lát dọc. (3) Đưa *rich reference* (mẫu, rubric) thay cho mô tả dài.
**Hiểu lầm → Sự thật:** "Mô tả càng dài càng tốt" → Một *mẫu chính xác* (báo cáo tuần trước, bảng tính mẫu, rubric "báo cáo tốt") tốt hơn nhiều đoạn văn mô tả. Mơ hồ nên được giảm qua phỏng vấn.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Để Claude làm đúng báo cáo ngay lần đầu, bạn sẽ đưa nó thứ gì?"** | SplitText |
| b2 | ĐOÁN | ① Một câu yêu cầu ngắn gọn, rồi sửa dần qua từng lần Claude làm ② **Báo cáo mẫu, tiêu chí đúng và kế hoạch Claude lập sau khi hỏi bạn** ③ Một bản mô tả dài ba trang, viết thật kỹ mọi chi tiết ngay từ lúc đầu | `PredictPrompt` |
| b3 | THẤY | `AgentWindow` vào **plan mode**: Claude đọc thư mục, hỏi lại bằng các thẻ câu hỏi (kỳ báo cáo? thị trường nào? ai đọc?), đưa ra kế hoạch → bạn duyệt → thực thi ở *phiên mới*. | Thẻ câu hỏi lật vào; bản kế hoạch được "đóng dấu" duyệt |
| b4 | HIỂU | Plan mode thực chất chỉ là *một câu*: "please don't write any code yet" (Boris). Với việc không phải code, nghĩa của nó là *"chưa làm gì, hãy lập kế hoạch trước"*. Chốt kế hoạch trước giúp bắt hiểu sai từ sớm, khi sửa còn rẻ (nguồn không đưa con số định lượng; con số 2–3 lần trong repo là của *kiểm chứng*, xem c07). Quy trình: yêu cầu tối thiểu → Claude phỏng vấn → thực thi ở phiên mới (Thariq); kế hoạch chia pha, mỗi pha có tiêu chí kiểm (Dex); nhờ một Claude khác rà soát kế hoạch (Boris). **Tranh luận:** "Làm nhanh 20–30 bản nháp" (Boris) hay "tài liệu căn chỉnh ngắn" (Dex, Matt)? **Phụ thuộc model:** plan mode "có lẽ có tuổi thọ hữu hạn" (Boris). | Hai thẻ tranh luận ngang hàng |
| b5 | CÁCH LÀM | Bật plan mode ⟨plan-mode⟩ · Để Claude hỏi lại ⟨clarifying-questions⟩ · Đính kèm mẫu và tài liệu ⟨references⟩. **Docs Cowork không nhắc plan mode** (chỉ liệt kê Manual, Auto, Skip). Cách thay thế (gắn nhãn "Diễn giải"): chọn Manual và yêu cầu "lập kế hoạch, hỏi tôi những gì còn mơ hồ, chờ tôi duyệt rồi mới làm" | `SurfaceTabs` |
| b6 | LÀM | **S3 Cắt lát**: kéo 6 việc từ *lát ngang* (thu thập dữ liệu 5 thị trường → phân tích cả 5 → viết cả 5) sang *lát dọc* (một thị trường trọn vẹn: dữ liệu → phân tích → viết → slide → rồi nhân ra). Phản hồi: "lát dọc cho bạn một mẫu trọn vẹn để duyệt ngay từ đầu". | Draggable + Flip |
| b7 | Then→Now | **S6.** *Hồi đó:* plan mode dựa vào một file kế hoạch markdown. *Bây giờ:* **rich references**: báo cáo tuần trước dạng HTML làm mẫu, bảng tính mẫu, rubric "thế nào là báo cáo tốt" cho một agent rà soát dùng. *"A HTML mockup of a design will generally produce better results than a description of the design or a screenshot."* **Câu hỏi dẫn:** "Có tài liệu mẫu chính xác nào thay được đoạn mô tả này không?" | MorphSVG biểu tượng văn bản → khung báo cáo mẫu và checklist rubric |
| b8 | NHỚ | **Grill me:** ① *Vì sao AI hay chia việc theo pha ngang, và hệ quả?* → phải đợi đến cuối mới thấy một kết quả trọn vẹn. ② *Tham chiếu tốt nhất cho báo cáo tuần?* → báo cáo tuần trước đã được duyệt + rubric. | `GrillCard` |

BÁO CÁO TUẦN: ① **Hiểu đúng yêu cầu ✅**.
🎙 Meta: *"Trang này được thiết kế bắt đầu từ một phiên 'grill me'. Thử ngay: 'Hãy phỏng vấn tôi thật kỹ về kế hoạch này cho tới khi ta hiểu nhau; với mỗi câu, đưa ra đáp án bạn khuyến nghị.'"* (theo skill grill-me của Matt Pocock).
**Nguồn:** PS1–7, PR1–2; video Matt Pocock, Dex; Boris tại Lenny's; Thariq 07/2026 (S6).

---

## 04 · The Onboarding Doc (Tài liệu onboarding)
`c04` · Medium · 11'/13'

**Mục tiêu:** (1) Viết hướng dẫn dự án (CLAUDE.md) gọn, tập trung vào gotcha. (2) Nắm cách các hướng dẫn được nạp theo thư mục. (3) Đặt mỗi chỉ dẫn đúng chỗ: hướng dẫn dự án, rules, skill, quyền hay hook. (4) Hiểu các hệ memory và auto-memory.
**Hiểu lầm → Sự thật:** "Viết PHẢI in hoa thì Claude sẽ tuân theo" *(Billion-Dollar Question #4)* → Chỉ dẫn chỉ là một phần context; file càng dài thì tín hiệu càng loãng. Việc *bắt buộc* thì giao cho harness; *sở thích* thì để Claude tự phán đoán; hướng dẫn dự án dành cho gotcha.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Tuần nào bạn cũng phải nhắc: 'đơn vị nghìn tấn, giá USD/tấn, biểu đồ theo màu công ty'. Vì sao Claude không nhớ?"** | SplitText |
| b2 | ĐOÁN | ① **Mỗi phiên bắt đầu trống; điều cần nhớ phải ghi vào hướng dẫn dự án** ② Claude vốn không có trí nhớ nên mỗi tuần mình đành nhắc lại từ đầu thôi ③ Quy ước chỉ được nhớ khi viết thật dài, thật mạnh vào mỗi yêu cầu | `PredictPrompt` |
| b3 | THẤY | Cây thư mục `bao-cao-tuan/`. Con trỏ đi vào `thi-truong-eu/` → hướng dẫn của **thư mục cha** sáng lên ngay lúc khởi động; hướng dẫn của **thư mục con** chỉ sáng khi Claude chạm vào file trong đó; thư mục **anh em** `thi-truong-my/` không sáng. | Highlight theo stagger; con trỏ chạy theo MotionPath |
| b4 | HIỂU | **Nên:** nói ngắn dự án dùng để làm gì; dành phần lớn cho **gotcha** ("số liệu T9 trong `ban-hang.xlsx` đã điều chỉnh, dùng cột *Điều chỉnh*"); ghi rõ cách chạy những bước không hiển nhiên. **Không nên:** liệt kê thứ Claude tự thấy được (danh sách file, mô tả thư mục). Quy tắc theo phạm vi dùng rules; hành vi bắt buộc dùng thiết lập/quyền. **Độ dài (Chưa thống nhất):** < 200 dòng (docs, Boris) · < 150 (deck vibe) · 60 (humanlayer). CLAUDE.md cá nhân của Boris chỉ có 2 dòng: "delete your CLAUDE.md and just start fresh" khi nó đã phình. | Thẻ Nên/Không nên; thanh độ dài 2 / 60 / 150 / 200 |
| b5 | CÁCH LÀM | Hướng dẫn dự án ⟨project-memory⟩ · Rules theo phạm vi ⟨rules⟩ · Memory ⟨auto-memory⟩. **Hai hệ khác nhau, không trộn:** Claude Code dùng *CLAUDE.md* + *auto-memory*; Cowork dùng *Project Instructions* + *Project memory* (có công tắc "Use account memory"). Nguyên lý giống nhau (gọn, chủ yếu gotcha) nhưng nơi đặt khác nhau | `SurfaceTabs` + ContradictionNote "cùng khái niệm, hai cơ chế" |
| b6 | Then→Now | **S1.** *Hồi đó (trích nguyên văn system prompt cũ):* "In code: default to writing no comments. Never write multi-paragraph docstrings… one short line max." Rule cứng giúp model đời cũ tránh kịch bản xấu nhất. *Bây giờ:* "Write code that reads like the surrounding code: match its comment density, naming, and idiom." **Áp dụng cho báo cáo:** thay "Không bao giờ viết đoạn quá 3 câu" bằng "Viết giống văn phong các báo cáo đã duyệt". Bằng chứng overconstraint: "leave documentation as appropriate" và "DO NOT add comments" va nhau trong cùng một request. **Câu hỏi dẫn:** "Quy tắc này chặn một rủi ro thật, hay đang mã hoá cứng một sở thích Claude tự suy ra được?" | SplitText: rule cũ rơi rụng từng chữ, câu principle lắp lại |
| b7 | Then→Now | **S5.** *Hồi đó:* phím `#` để ghi memory vào CLAUDE.md. *Bây giờ:* "Claude now automatically saves memories that are relevant to the work and to you." Bảng **các hệ memory**: hướng dẫn dự án (bạn viết) · auto-memory (Claude tự ghi) · memory của agent. **Chưa thống nhất:** cộng đồng lo về sự đồng ý và độ tin cậy; nên định kỳ xem lại những gì đã được lưu. | Thẻ lật; bảng hiện theo stagger |
| b8 | LÀM | **S4 Linter hướng dẫn dự án**: xếp 12 dòng vào *Giữ* / *Xoá* / *Chuyển → (quyền/thiết lập · skill · rules · hook)* (§Phụ lục A). | Draggable vào 3 khay; điểm số + nguồn cho từng dòng |
| b9 | NHỚ | **Grill me:** ① *Hướng dẫn ở thư mục anh em có được nạp không?* → không. ② *"Không bao giờ gửi email cho khách" đặt ở đâu?* → quyền hoặc thiết lập (không cấp công cụ gửi, hoặc deny), không đặt trong hướng dẫn. ③ *Sau mỗi lỗi Claude mắc?* → thêm một gotcha, rồi định kỳ tỉa lại. | `GrillCard` |

BÁO CÁO TUẦN: ② **Đúng chuẩn trình bày của team ✅**.
🎙 *"Hướng dẫn dự án của bạn có bao nhiêu dòng mà Claude tự suy ra được từ chính các file?"*
**Nguồn:** CM1–8; `best-practice/claude-memory.md`; `reports/claude-agent-memory.md`; Billion-Dollar Questions (Memory 1–4); Boris tại YC; Thariq 07/2026 (S1, S5, *Applying this to your context*).

---

## 05 · Playbooks & Specialists (Playbook và chuyên gia)
`c05` · High · 12'/14'

**Mục tiêu:** (1) Phân biệt command, skill và subagent. (2) Thiết kế skill như một *thư mục*: description đóng vai trigger, có mục Gotchas. (3) Giải thích progressive disclosure. (4) Thiết kế *interface* thay vì nhồi ví dụ.
**Hiểu lầm → Sự thật:** "Nhiều agent thì tốt hơn" / "Skill chỉ là một prompt lưu sẵn" → Subagent tốn một context riêng; đáng giá khi cần cô lập. Skill chỉ nạp *description* trước, nội dung khi dùng, và có thể kèm file mẫu, script.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Bạn có 30 skill. Vì sao Claude không bị ngộp bởi 30 tài liệu đó ở mỗi phiên?"** | SplitText |
| b2 | ĐOÁN | ① Claude đọc hết rồi tự tóm tắt ② **Lúc đầu chỉ nạp phần mô tả; nội dung nạp khi dùng** ③ Skill chỉ chạy khi bạn gọi tên | `PredictPrompt` |
| b3 | THẤY | Thanh context lúc mở phiên: hướng dẫn dự án nạp *toàn bộ*; skill và agent chỉ là *chip mô tả*. Khi làm báo cáo, chip `report-style` **nở ra** thành `SKILL.md` + `templates/` + `scripts/`. | Flip chip → panel; `--fill` tăng đúng lượng nạp |
| b4 | HIỂU | **Command:** điểm vào bạn gọi chủ động (`/bao-cao-tuan`); "làm hơn một lần mỗi ngày thì đóng gói lại". **Skill:** là thư mục; *Gotchas* là phần giá trị nhất; *description là trigger chứ không phải bản tóm tắt*; đừng nói điều hiển nhiên; đừng dắt tay từng bước; kèm script và mẫu. Có 9 loại skill (Thariq), trong đó nhiều loại không phải code: tra cứu dữ liệu, quy trình nghiệp vụ, runbook. **Subagent:** context riêng; trả về *kết luận* (ví dụ `market-researcher` tra từng thị trường). Thứ tự với câu "Mấy giờ rồi?": skill chạy inline → agent → command (chỉ khi bạn gọi). **Chưa thống nhất:** command và skill đã hội tụ frontmatter. | Bảng so sánh hiện theo cột |
| b5 | CÁCH LÀM | Tạo và dùng skill ⟨skills⟩ · Lệnh tắt / command ⟨commands⟩ · Subagent ⟨subagents⟩ | `SurfaceTabs` |
| b6 | ĐÀO SÂU · Then→Now | *(Mặc định đóng, thuộc "Đào sâu": chủ yếu hữu ích cho người xây agent; lộ trình chính bỏ qua.)* **S2.** *Hồi đó:* mô tả công cụ TodoWrite dài khoảng **9.100 ký tự** gồm danh sách khi-nào-dùng và ví dụ. *Bây giờ:* "Create and update a task list for the current session" + trạng thái `pending · in_progress · completed` + một luật: chỉ một việc `in_progress` tại một thời điểm. **Áp dụng cho skill của bạn:** một mẫu báo cáo có các mục rõ ràng nói nhiều hơn năm ví dụ. **Câu hỏi dẫn:** "Chỉ nhìn cấu trúc và tham số, công cụ đã tự nói cách dùng chưa?" **Phụ thuộc model:** báo cáo *Advanced Tool Use* (02/2026) từng ghi nhận ví dụ tăng độ chính xác từ 72% lên 90% ở thế hệ trước. | Bộ đếm 9.100 → ~55 ký tự; các chip trạng thái bật vào |
| b7 | Then→Now | **S3 + S4.** *Hồi đó:* hướng dẫn rà soát và kiểm chứng nằm sẵn trong chỉ dẫn hệ thống; cách dùng công cụ bị lặp ở nhiều nơi. *Bây giờ:* chúng thành **skill** được gọi khi cần; mỗi chỉ dẫn chỉ nằm ở một chỗ. **Câu hỏi dẫn:** "Chỉ dẫn này cần ở *mọi* yêu cầu, hay chỉ khi gặp một loại việc?" · "Nó có bị lặp ở chỗ khác không?" | Hai thẻ Then/Now + mũi tên |
| b8 | LÀM | **S5 Chọn khối**: xếp 8 tình huống vào Command / Skill / Subagent / Hook (§Phụ lục B). | Draggable vào 4 khay |
| b9 | NHỚ | **Grill me:** ① *Viết description cho skill thế nào?* → như một trigger: *khi nào* nên dùng. ② *Phần đáng giá nhất của skill?* → Gotchas. ③ *Khi nào subagent là quá nặng?* → việc nhỏ làm ngay được. | `GrillCard` |

BÁO CÁO TUẦN: ④ **Lặp lại được: một nửa ✅** (đã có `/bao-cao-tuan` và `report-style`).
**Thẻ ca sử dụng liên quan:** Vận hành (runbook thành skill) · Dev (skill quy ước code).
**Nguồn:** CO1–3, AG1–4, SK1–9; `reports/claude-agent-command-skill.md`; `best-practice/claude-{subagents,commands,skills}.md`; `tips/claude-thariq-tips-17-mar-26.md`; `reports/claude-advanced-tool-use.md`; Thariq 07/2026 (S2–S4).

---

## 05b · The Right Colleague (Đúng đồng nghiệp, đúng mức nghĩ)
`c05b` · High · 9'/11' · *đánh số lại thành c06…c11 khi bắt đầu viết code; trong tài liệu dùng `05b` để khỏi đụng các tham chiếu đang có*

**Mục tiêu:** (1) Phân biệt *model* (giao việc cho ai) với *effort* (họ nghĩ bao lâu trước khi làm). (2) Bắt đầu từ mặc định và chỉnh effort trước khi đổi model. (3) Biết các đòn bẩy ngoài hai núm vặn (`opusplan`, subagent dùng model nhẹ, Fast mode, Advisor) và việc nào cần gói hoặc quyền admin. (4) Biết đặt model và effort ở bề mặt của mình, hoặc biết rằng docs chưa nói.
**Hiểu lầm → Sự thật:** "Model mạnh nhất, effort cao nhất thì luôn chắc ăn" / "Viết *hãy nghĩ thật kỹ* vào yêu cầu là tăng độ sâu" → Effort là *tín hiệu hành vi*, không phải ngân sách token cứng; mức `max` dễ "nghĩ quá" với việc thường. Lời hối thúc chỉ nhích trong mức effort đang có, không nâng vượt nó.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Người giỏi nhất công ty có nên làm cả việc đổi tên file, và có nên 'nghĩ hết sức' cho việc đó không?"** | SplitText |
| b2 | ĐOÁN | Báo cáo tuần có 6 việc; bạn muốn nhanh, rẻ mà vẫn đúng. ① Chọn model mạnh nhất, effort cao nhất cho cả 6 việc để khỏi sót ② **Giữ mặc định cho cả 6 việc, chỉ nâng effort ở bước khó rồi hạ lại** ③ Giữ effort thấp và viết "hãy nghĩ thật kỹ" vào mỗi yêu cầu | `PredictPrompt` (3 phương án cùng độ dài, theo Phụ lục C) |
| b3 | THẤY | **Hai núm vặn trên bàn làm việc.** `AgentWindow` chạy 6 việc; cạnh mỗi dòng có thanh *mức nghĩ* `░▒▓█` (5 nấc: low → max) và tên model. Việc *đổi tên file* chạy nhanh ở nấc thấp; việc *đối chiếu 14 số liệu* được nâng một nấc, chạy lâu hơn, The Colleague đổi `[>_<]≡` → `[°_°]…`; xong thì hạ lại. Đồng hồ và số token là **số minh hoạ**. | M4 cho dòng việc; M2 (`--fill`) cho thanh mức nghĩ; M14 cho The Colleague |
| b4 | HIỂU | **Hai núm vặn khác nhau.** *Model* = giao cho ai (Haiku · Sonnet · Opus · Fable). *Effort* = họ nghĩ bao lâu (`low · medium · high · xhigh · max`). Trên Pro, Max, Ultra, Team, Enterprise và API, `default` là Opus 5.5 ở effort `medium` (trong Claude Code); docs nói mức này "plenty for everyday feature work with a clear scope". Mức mặc định **khác nhau giữa Claude Code và API trực tiếp** (ví dụ Sonnet 5.5: medium trong Claude Code, high trên API), nên đọc từ `models.yml`, đừng nhớ số. **Nguyên tắc chính thức:** *"Tuning effort is often a better lever than switching models."* **Quy trình:** bắt đầu từ mặc định → nếu bước khó còn hụt, nâng effort *ở bước đó* → chỉ đổi model khi bộ ví dụ kiểm tra của bạn vẫn hụt ở effort cao. *"Having a good evaluation set is the most important step"*: với việc văn phòng, đó là 5 yêu cầu mẫu mà bạn đã biết đáp án. **Ví dụ của docs:** low cho brainstorm, bản phác đầu, đổi tên; high cho lỗi trong code bạn không viết; max cho việc kiểu săn lỗ hổng bảo mật, và `max` "dễ nghĩ quá" với việc thường. *(Diễn giải cho báo cáo tuần: đổi tên file → low · viết nháp theo mẫu → medium · đối chiếu số liệu → high · max hiếm khi cần.)* Trong Claude Code, thinking không tắt được trên Opus 5.5, Sonnet 5.5, Haiku 5.5 và các model Fable, nên không còn "bật thinking" (qua API thì mỗi model xử lý khác nhau). `ultrathink` "asks for deeper reasoning on that single turn without touching your effort setting". Các cụm như `think hard`, `be thorough` là văn bản thường: chỉ nhích trong mức effort đang có, không nâng vượt nó. | Ba thẻ; nhãn "Diễn giải" cho phần ánh xạ báo cáo tuần |
| b5 | HIỂU | **Bốn đòn bẩy ngoài hai núm vặn** (mỗi cái kèm `PlanPill`): **`opusplan`**: Opus lúc lập kế hoạch, Sonnet lúc thực hiện. **Subagent nhẹ**: giao việc đơn giản cho Haiku; docs lưu ý đổi sang Opus *trước khi* giao việc thì việc đó cũng chạy bằng Opus (tốn hơn). **Fast mode**: *không phải model khác*, là cấu hình chạy nhanh tới 2,5 lần cho Opus với giá mỗi token cao hơn; hợp với lặp nhanh và gỡ lỗi trực tiếp, *không* hợp việc tự chạy dài hay chạy hàng loạt; trên gói thuê bao chỉ tính bằng usage credits, Team/Enterprise cần Owner bật. **Advisor** (đang thử nghiệm, cần Anthropic API): model nhẹ làm việc chính, Opus tư vấn ở bước then chốt; hợp với việc dài nhiều bước mà *chất lượng kế hoạch* quyết định kết quả. Fable phải chọn tay, không là mặc định ở gói nào. | Bốn thẻ nhỏ + `PlanPill`; tên model và lịch gỡ Fast mode đọc từ `models.yml`, không viết cứng |
| b6 | CÁCH LÀM | Chọn model và effort ⟨model-effort⟩ · Fast mode ⟨fast-mode⟩ · Advisor ⟨advisor⟩. **CLI:** `/model`, `/effort` (không đối số mở thanh trượt), `--model`, `--effort`, `effortLevel` trong settings, `effort:` trong frontmatter của skill/subagent, `ultrathink` trong prompt. **Claude Code app (Desktop/Web/Mobile):** docs nói rõ Fast mode bật/tắt ở menu model trên claude.ai/code, và effort chọn từ điện thoại hoặc trình duyệt trong phiên Remote Control sẽ áp dụng vào phiên trên máy bạn (nếu đã ghim bằng biến môi trường thì bị từ chối); *bộ chọn model/effort trên Desktop: chưa có trong docs, **cần kiểm chứng tay***. **Thứ tự ưu tiên khi nhiều nơi cùng đặt effort:** biến môi trường `CLAUDE_CODE_EFFORT_LEVEL` → lựa chọn trong phiên (`/effort`, `/model`) → `--effort` → settings → mặc định của model; `effortLevel` trong settings không nhận `max` (max chỉ áp dụng cho phiên hiện tại). **Cowork / Claude app:** docs chưa nêu; quản trị viên có thể ẩn model bằng allowlist. | `SurfaceTabs`; ô chưa kiểm chứng hiện "Cần kiểm chứng", không tự viết UI |
| b7 | Then→Now | *Hồi đó (tip trong repo: nhóm WF1–WF5 và `opusplan`):* "Dùng Opus cho mọi việc" · "bật thinking" · "thêm ultrathink" · "Opus lập kế hoạch, Sonnet viết". *Bây giờ (docs chính thức, 06/11/2026):* bắt đầu từ mặc định; chỉnh effort trước; thinking luôn bật trên model 5.5; đổi model khi đo thấy cần. Các tip cũ **không bị xoá** khỏi Library; gắn nhãn *Phụ thuộc model* (mặc định đổi theo thế hệ model) hoặc *Chưa thống nhất* (Opus mọi việc ↔ `opusplan`). **Câu hỏi dẫn:** "Mặc định này đã đủ cho việc của tôi chưa? Tôi đã thử nâng effort ở đúng bước khó trước khi đổi model chưa?" | ThenNowCard |
| b8 | LÀM | **S9 Giao đúng người, đúng mức nghĩ:** 6 việc của báo cáo tuần (đổi tên 12 file nguồn · tóm tắt 12 file Excel · viết bản nháp theo `report-style` · đối chiếu 14 số liệu · rà soát độc lập bản nháp · đăng tóm tắt #thi-truong). Chọn model và effort cho từng việc (radio, dùng được bằng bàn phím); có công tắc `opusplan` và Fast mode. Phản hồi: ba thanh *tốc độ · chi phí · độ tin cậy* (**số minh hoạ**) + kiểm theo quy tắc: bước đối chiếu không thấp hơn mặc định · không việc nhỏ nào ở `xhigh/max` · không đổi model khi chưa thử effort. Nhãn "Mô phỏng đơn giản hoá". | Thanh `░▒▓█` dịch từng nấc; The Colleague đổi mặt theo mức tải |
| b9 | NHỚ | **Grill me:** ① *Nên chỉnh núm nào trước, model hay effort?* → effort (docs). ② *Vì sao viết "hãy nghĩ thật kỹ" không thay được effort?* → chỉ nhích trong mức hiện có, không nâng vượt nó. ③ *Khi nào đáng đổi model?* → khi bộ ví dụ kiểm tra của bạn vẫn hụt ở effort cao. | `GrillCard` |

BÁO CÁO TUẦN: không đổi tiêu chí; từ chương này `AgentWindow` có thêm dòng *mức nghĩ* ở bước đối chiếu (hỗ trợ ③).
**Thẻ ca sử dụng liên quan:** Tài chính (đối soát cần effort cao ở bước đối chiếu) · Marketing (thu thập đối thủ bằng model nhẹ).
**Đã đối chiếu nguyên văn ngày 07/11/2026** (docs `model-config`, `fast-mode`, `remote-control`, platform `effort`, trang Best practices): thinking không tắt được (Claude Code) · `ultrathink` · thứ tự ưu tiên effort · `effortLevel` không nhận `max` · effort qua Remote Control · Fast mode và lịch gỡ Opus 4.8 (deprecated 30/10/2026, gỡ 30/11/2026) · `default` theo gói · `opusplan`. **Còn mở:** bộ chọn model/effort trên Desktop và Cowork · hành vi thinking của Fable ở mức API (effort page không nêu) · phạm vi của yêu cầu phiên bản v2.1.311 (câu trong docs đứng sau đoạn về `ultrathink` ở terminal, chưa rõ có áp dụng mọi bề mặt) · mức effort mặc định của Opus 4.7 (docs Claude Code ghi `xhigh`, trang API ghi `high`).
**Nguồn:** docs `model-config`, `fast-mode`, `advisor`; platform docs `choosing-a-model` và `effort`; trang Best practices (mục *Change the model and effort*, *Know what subagents cost*, *Keep cost and context down*); blog *The advisor strategy* (09/04/2026; số liệu thuộc thế hệ 4.6); tip WF1–WF5 trong README. Tất cả đã đọc ngày 06/11/2026.

---

## 06 · Tools & Policies (Công cụ và chính sách)
`c06` · High · 11'/13'

**Đường chính (app-first, quyết định 06/11/2026):** dạy các rào chắn người dùng app và Cowork tự đặt được (permission mode, kết nối chỉ-đọc, thư mục được phép, auto mode). Hook, quy tắc quyền và sandbox chưa có UI trên App theo docs: chuyển vào *Đào sâu* và tab CLI. Soát lại câu K3 của Re-test cho khớp với những gì đường chính đã dạy.

**Mục tiêu:** (1) Mở rộng Claude bằng connector, MCP và plugin mà không làm phình context. (2) Phân biệt *rào chắn tất định* (quyền, thiết lập, hook) với *lời dặn*. (3) Chọn permission mode phù hợp.
**Hiểu lầm → Sự thật:** "Kết nối càng nhiều công cụ càng mạnh" → *"Went overboard with 15 MCP servers… Ended up using only 4 daily."* Mỗi công cụ tốn context. "Chế độ tự động nghĩa là bỏ qua mọi kiểm tra" → auto mode có bộ phân loại an toàn và quay về hỏi khi bị chặn nhiều lần.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Bạn dặn Claude 'đừng bao giờ gửi email cho khách hàng'. Như vậy đã đủ an toàn chưa?"** | SplitText |
| b2 | ĐOÁN | ① Đủ rồi, vì Claude luôn làm theo điều bạn đã dặn rõ từ đầu phiên ② **Chưa đủ: cần rào chắn, như không cấp công cụ gửi hay chặn quyền** ③ Đủ nếu viết IN HOA và nhắc lại ở nhiều chỗ trong hướng dẫn dự án | `PredictPrompt` |
| b3 | THẤY | **Cổng quyền:** các hành động của agent (đọc `bao-cao-tuan/`, sửa `bao-cao-W45.md`, tra web, xoá `du-lieu-goc/`, gửi email cho khách, đăng Slack) lần lượt đi qua ba cổng *chặn → hỏi → cho phép*. Desktop có thêm **đường ray sự kiện** (bắt đầu phiên → trước khi dùng công cụ → sau khi dùng công cụ → kết thúc lượt), nơi hook có thể gắn vào. | Token đi qua cổng; horizontal rail + containerAnimation (chỉ desktop) |
| b4 | HIỂU | *"Don't use prompts for control flow if you can use control flow for control flow."* (Dex) **Nguyên tắc:** kịch bản xấu nhất (mất dữ liệu, lộ thông tin, gửi nhầm ra ngoài) giao cho harness; sở thích giao cho phán đoán. **Quyền:** cho phép / hỏi / chặn; *chặn luôn được xét trước*. **Mode:** hỏi mỗi lần · tự nhận sửa file · lập kế hoạch · tự động có bộ phân loại an toàn. Sandbox giảm 84% lời hỏi quyền (số nội bộ Anthropic). **Công cụ:** connector/MCP là "cổng USB-C cho AI"; mỗi cái tốn context (ví dụ 13,7k–19k token cho một công cụ trình duyệt); nạp hoãn giúp tiết kiệm khoảng 85%. Plugin đóng gói skill, command, agent và hook. | Thanh chi phí context theo `scaleX` |
| b5 | CÁCH LÀM | Kết nối connector/MCP ⟨connectors-mcp⟩ · Plugin ⟨plugins⟩ · Permission mode ⟨permission-modes⟩ (Cowork: Manual/Auto/Skip; tab Code: Manual/Accept edits/Plan/Auto/Bypass) · Quy tắc quyền ⟨permission-rules⟩ · Sandbox ⟨sandbox⟩ · Hook ⟨hooks⟩. Hook, quy tắc quyền và sandbox **chưa có UI trên App theo docs**; chúng là file cấu hình, và hook trong file vẫn chạy ở Desktop và cloud. Khối hiện "Chưa có tài liệu về UI" kèm link sang tab CLI và Starter Kit, không ghi là "không làm được" | `SurfaceTabs` |
| b6 | Then→Now | *(Diễn giải của trang, nối S1 với chương này)* *Hồi đó:* rule cứng trong chỉ dẫn để chặn kịch bản xấu nhất. *Bây giờ:* kịch bản xấu nhất do **harness** chặn; chỉ dẫn dành cho phán đoán. **Câu hỏi dẫn:** "Nếu Claude phán đoán sai ở đây, hậu quả có đảo ngược được không?" Nếu không → đưa vào harness. | ThenNowCard có nhãn "Diễn giải" |
| b7 | LÀM | **S6 Cổng quyền**: chọn mode và sửa quy tắc, rồi xem 6 hành động ra *Cho phép / Hỏi / Chặn*. Có nhãn "Mô phỏng đơn giản hoá". | Token qua cổng; kết quả hiện theo stagger |
| b8 | NHỚ | **Grill me:** ① *Quy tắc nào được xét trước?* → chặn. ② *Vì sao một thư mục/dự án không tự cấp được quyền cho chính nó?* → để tránh bị lợi dụng; quyền do bạn cấp. ③ *Muốn bớt bị hỏi quyền mà vẫn an toàn?* → cho phép theo mẫu, sandbox, auto mode. Không tắt hết kiểm tra. | `GrillCard` |

BÁO CÁO TUẦN: ④ thêm điều kiện "chạy an toàn khi không có người trông".
**Thẻ ca sử dụng liên quan:** Tài chính (chỉ đọc dữ liệu gốc, cấm gửi ra ngoài).
**Nguồn:** HK1–5, WA4–5, WA7–8, CM8; `best-practice/claude-settings.md`; `best-practice/claude-mcp.md`; `reports/claude-in-chrome-v-chrome-devtools-mcp.md`; `reports/claude-advanced-tool-use.md`; video Dex.

---

## 07 · Review Before Handoff (Rà soát trước khi bàn giao)
`c07` · High · 10'/12'

**Nguồn chính thức bổ sung (06/11/2026):** trang Best practices (mục *Give Claude a check to run*, *Review against your spec*, *Enforce the check with a Stop hook*) và blog *How the Claude Code team does code review* (15/10/2026). Cần đọc và trích khi viết chương; chưa đối chiếu nội dung bài blog.

**Mục tiêu:** (1) Thiết kế vòng kiểm chứng hợp với loại việc. (2) Dùng một context độc lập để rà soát. (3) Biến tiêu chuẩn chất lượng thành rubric.
**Hiểu lầm → Sự thật:** "Model giỏi thì không cần kiểm" / "Hỏi lại 'chắc chưa?' là đủ" → Kiểm chứng là tip quan trọng nhất, giúp chất lượng tăng khoảng 2–3 lần (Boris). Một context độc lập bắt được lỗi mà context đã gây ra lỗi không thấy.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Bạn giao báo cáo rồi đi họp. Quay lại, làm sao biết số liệu đúng?"** | SplitText |
| b2 | ĐOÁN | ① Hỏi lại Claude "chắc chưa?" rồi tin hẳn vào câu trả lời mà nó đưa ra thôi ② Tự tay dò lại từng con số một trước khi gửi báo cáo đi cho sếp xem qua ③ **Cho Claude cách tự kiểm: so nguồn, reviewer riêng, xem bản trình bày** | `PredictPrompt` |
| b3 | THẤY | **Vòng kiểm chứng**: Viết → Đối chiếu → Xem → Sửa. Những con số sai (chấm đỏ) chạy quanh vòng; mỗi trạm bắt một loại lỗi: *đối chiếu nguồn* bắt sai số, *reviewer độc lập* bắt suy luận yếu, *mở bản trình bày* bắt lỗi hiển thị. | MotionPath; trạm bắt lỗi nháy `--signal` |
| b4 | HIỂU | **Theo loại việc:** số liệu → đối chiếu từng con số với nguồn, ghi rõ nguồn; tài liệu và slide → mở ra xem bằng trình duyệt hoặc preview, chụp màn hình; quy trình → chạy thử trọn vòng. Một skill **kiểm-rồi-mới-giao** kiểu `/go`: kiểm → rà soát → bàn giao (Boris). Skill kiểm chứng sản phẩm đáng để đầu tư cả tuần (Thariq). **Context không tương quan:** reviewer là một subagent *không* thấy quá trình viết. Với việc khó, có thể chạy 3–5 reviewer song song. **Claude tự tìm kiếm** (đọc, lọc, tìm như bạn) thay vì tra một kho chỉ mục dựng sẵn: *"agentic search just outperformed everything"*. | Thẻ theo loại việc |
| b5 | CÁCH LÀM | Kiểm tra bằng trình duyệt ⟨browser-verify⟩ · Preview ⟨preview⟩ · Computer use ⟨computer-use⟩ · Code review (cho dev) ⟨code-review⟩ | `SurfaceTabs` |
| b6 | Then→Now | **S3 + S6.** *Hồi đó:* chỉ dẫn kiểm chứng nằm trong chỉ dẫn hệ thống, kiểu "double-check your answer". *Bây giờ:* kiểm chứng là **skill** được gọi khi liên quan; **rubric** ("báo cáo tốt trông thế nào") làm tham chiếu cho *agent kiểm chứng*. **Câu hỏi dẫn:** "Tiêu chuẩn chất lượng của bạn đã được viết thành rubric chưa?" | ThenNowCard |
| b7 | LÀM | **S7 Vòng kiểm chứng**: bật/tắt 4 lớp (đối chiếu nguồn, reviewer độc lập, mở bản trình bày, kiểm tra cuối lượt) rồi xem tỷ lệ lỗi bị bắt và thời gian. Link template `verify-numbers` trong Starter Kit. | Toggle; vòng chạy lại |
| b8 | NHỚ | **Grill me:** ① *Vì sao reviewer nên ở context khác?* → nó không mang giả định và thiên kiến của context đã viết. ② *Kiểm tra slide thế nào?* → mở ra xem bằng trình duyệt hoặc preview, chụp màn hình, đối chiếu rubric. | `GrillCard` |

BÁO CÁO TUẦN: ③ **Số liệu được kiểm chứng ✅**.
🎙 *"Nếu chỉ nhớ một điều hôm nay: cho Claude cách tự kiểm chứng công việc của nó."*
**Nguồn:** WA6, WA9, HK5, AG4, GP5, DB1–6; `tips/claude-boris-6-tips-16-apr-26.md`; Boris tại YC, Pragmatic Engineer; Thariq 07/2026.

---

## 08 · The Team (Làm theo nhóm)
`c08` · Pro · 10'/12'

**Đường chính (app-first, quyết định 06/11/2026):** mở bằng *quy trình làm việc* (Nghiên cứu → Kế hoạch → Làm → Rà soát → Bàn giao) thay cho danh sách framework xếp theo sao GitHub. Các framework của cộng đồng chuyển vào *Đào sâu* và Library, gắn nhãn "Cho người dùng dev". Mô phỏng ở b7 là **S10**.

**Mục tiêu:** (1) Giải thích mẫu **Command → Agent → Skill**. (2) Nhận ra khung hội tụ **Nghiên cứu → Kế hoạch → Làm → Rà soát → Bàn giao**, áp dụng cho mọi loại việc. (3) Lắp quy trình báo cáo tuần từ các khối.
**Hiểu lầm → Sự thật:** "Phải chọn đúng framework xịn nhất" → 12 workflow nổi tiếng nhất của cộng đồng (vốn sinh ra cho dev) hội tụ về cùng một khung. Khung ấy dùng được cho báo cáo, nghiên cứu, vận hành.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"12 quy trình làm việc với AI nổi tiếng nhất, mỗi cái hàng chục nghìn sao. Chúng khác nhau đến đâu?"** | SplitText |
| b2 | ĐOÁN | ① Mỗi cái một triết lý ② **Gần như cùng một khung** ③ Không so sánh được | `PredictPrompt` |
| b3 | THẤY | 12 làn badge **co về 5 cột** Research → Plan → Execute → Review → Ship; sub-loop quay thành vòng nhỏ. Sau đó 5 cột được gắn nhãn tiếng Việt và ví dụ báo cáo tuần. | Flip (nested); sub-loop `rotation` |
| b4 | THẤY | **Quy trình báo cáo tuần:** command `/bao-cao-tuan` hỏi kỳ báo cáo → 5 subagent `market-researcher` chạy song song (mỗi thị trường một con) trả về kết luận → skill `report-style` viết báo cáo và slide → subagent reviewer đối chiếu theo rubric → bàn giao. Hai kiểu skill: *được gọi* (report-style) và *nạp sẵn vào agent* (cách tra nguồn giá). | DrawSVG vẽ luồng; nhãn ở từng nút |
| b5 | HIỂU | Ví dụ cộng đồng: *grill-me → to-spec → … → pr* (Matt Pocock); bước **compound** của Compound Engineering: biến bài học thành tri thức dùng lại. Quy trình chéo model; **dynamic workflows** (chạy nhiều agent theo kịch bản) ⟨dynamic-workflows⟩. **Lab gốc của repo:** `/weather-orchestrator` (tab CLI). | Bảng 12 workflow trong "Đào sâu" |
| b6 | CÁCH LÀM | Dynamic workflows ⟨dynamic-workflows⟩ · Agent teams ⟨agent-teams⟩ | `SurfaceTabs` |
| b7 | LÀM | **Lắp dàn nhạc:** kéo các mảnh ghép thành quy trình báo cáo tuần; hệ thống kiểm tra thứ tự R → P → E → Rv → S. | Engine Draggable dùng lại |
| b8 | NHỚ | **Grill me:** ① *Vì sao tra cứu ở subagent nhưng viết ở skill?* → subagent cô lập phần tra cứu dài; skill viết ngay trong context chính. ② *Bước "compound" là gì?* → đưa bài học vào hướng dẫn hoặc skill để lần sau dùng lại. | `GrillCard` |

BÁO CÁO TUẦN: ④ **Lặp lại được ✅**.
**Nguồn:** README *Development Workflows* (12 + Others); `orchestration-workflow/orchestration-workflow.md`; `development-workflows/rpi`, `cross-model-workflow`; Hot: Dynamic Workflows, Agent Teams.

---

## 09 · Recurring Duties (Việc định kỳ)
`c09` · Pro · 10'/12'

**Nguồn chính thức bổ sung (06/11/2026):** blog *Building effective agent automations* (08/10/2026), *Claude Code in the cloud: a field guide to cloud sessions* (06/10/2026) và mục *Run Claude from a script* / *Start runs on a schedule or an event* của trang Best practices. Cần đọc và trích khi viết chương; chưa đối chiếu nội dung. Mô phỏng ở b6 là **S11**. Chương trình bày cả Claude Tag (Team/Enterprise) lẫn scheduled tasks cá nhân, mỗi bước gắn `PlanPill`.

**Mục tiêu:** (1) Chạy song song nhiều phiên. (2) Tự động hoá theo lịch và theo điều kiện. (3) Đưa kết quả tới nơi người cần (Slack, mobile). (4) Biết việc nào giao hẳn cho agent, việc nào cần người trong vòng.
**Hiểu lầm → Sự thật:** "Tự động nghĩa là buông hết" → Tự động đứng trên nền kiểm chứng (c07) và rào chắn (c06). Con người giữ yêu cầu, gu và quyền duyệt (Karpathy).

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | **"Báo cáo phải chạy mỗi thứ Hai lúc 8 giờ, kể cả khi máy bạn tắt. Cần những gì?"** | SplitText |
| b2 | ĐOÁN | ① **Quy trình đóng gói, tự kiểm chứng và lịch cloud có connector** ② Để máy luôn bật, rồi tự nhắc mình chạy báo cáo đúng giờ mỗi sáng ③ Viết một yêu cầu thật dài để Claude làm hết trong một lần duy nhất | `PredictPrompt` |
| b3 | THẤY | Một `AgentWindow` **nhân thành 5** (mỗi thị trường một phiên), chạy song song. Một dải lịch tuần cho thấy *mỗi thứ Hai 8:00 → chạy → kiểm → đăng Slack → thông báo lên điện thoại*. | Stagger `from: "center"`; dải lịch scrub |
| b4 | HIỂU | **Song song:** nhiều phiên cùng lúc, mỗi phiên một phần việc (Boris chạy khoảng 5 agent; với dev là mỗi phiên một worktree). **Theo lịch:** lịch chạy cục bộ (chỉ khi app mở và máy thức) và lịch chạy trên cloud (kể cả khi máy tắt). **Bẫy quan trọng:** task trên cloud là một bản sao mới, *không thấy file trên máy bạn*. Báo cáo tự chạy trên cloud phải lấy dữ liệu qua connector (ví dụ Drive), hoặc chạy lịch Local trên Desktop. **Theo điều kiện:** "làm tiếp cho tới khi mọi số liệu đã được đối chiếu" ⟨goal⟩. **Ở mọi nơi:** gọi Claude trong Slack; theo dõi và tiếp tục trên điện thoại. **Đừng trông trẻ:** giao kết quả, đừng giao từng bước; đặt tên cho phiên; đọc phần tóm tắt khi quay lại. | Thẻ "AFK" và "có người trong vòng" |
| b5 | CÁCH LÀM | Chạy song song ⟨parallel-sessions⟩ · Chạy nền / Dispatch ⟨background⟩ · Lịch chạy: *Desktop* Scheduled (Local hoặc Cloud) ⟨scheduled-desktop⟩, *Cloud scheduled tasks* (tên cũ "Routines", research preview) ⟨scheduled-cloud⟩, *Cowork* scheduled tasks ⟨scheduled-cowork⟩, `/loop` trong phiên (CLI) ⟨loop⟩ · Chạy tới khi đạt điều kiện ⟨goal⟩ · Điện thoại qua Remote Control ⟨remote-mobile⟩ (lưu ý: *teleport* không phải truy cập từ điện thoại) · Slack qua **Claude Tag** (chỉ Team/Enterprise, public beta) ⟨slack⟩ · GitHub (cho dev) ⟨github-actions⟩ | `SurfaceTabs` + nhãn gói và trạng thái |
| b6 | LÀM | **Giao việc cho đội agent:** xếp 6 việc của báo cáo vào *AFK* hoặc *Cần người trong vòng* (Matt). Phản hồi: việc cần gu và quyết định yêu cầu thì cần người; việc đã có tiêu chí và kiểm chứng thì giao hẳn. | Engine Draggable |
| b7 | NHỚ | **Grill me:** ① *Lịch cục bộ khác lịch trên cloud thế nào?* → lịch cục bộ cần máy và phiên đang mở; lịch cloud chạy kể cả khi máy tắt. ② *Vì sao nên giao những phần nhỏ, kiểm được?* → dễ duyệt, dễ quay lại khi sai; người duyệt mới là nút thắt khi lượng việc tăng mạnh. | `GrillCard` |

BÁO CÁO TUẦN: ④ **Tự chạy ✅**. Cả bảng xanh, một khoảnh khắc ăn mừng tiết chế.
**Đào sâu cho dev (tab CLI):** git worktrees, `/batch`, PR nhỏ (p50 = 118 dòng), squash merge, tag `@claude` trên PR.
**Thẻ ca sử dụng liên quan:** Marketing (quét đối thủ mỗi tuần) · PM (gom feedback mỗi tối).
**Nguồn:** AG2–3, WA2–3, WA9, GP1–5, SM5–6; `tips/claude-boris-{10,15}-tips-*.md`; video Matt (AFK), Karpathy; các mục Hot: Scheduled Tasks, Routines, Goal, Remote Control, Slack, Agent View.

---

## 10 · No Babysitting (Thôi cầm tay chỉ việc)
`c10` · Kết · 12'/14'

**Mục tiêu:** (1) Phát biểu 6 dịch chuyển và lý do (overconstraint). (2) Đánh giá lại hướng dẫn và skill của chính mình. (3) Lập kế hoạch 7 ngày. (4) Làm Re-test.
**Hiểu lầm → Sự thật:** "Càng nhiều chỉ dẫn càng an toàn; best practice là bất biến" → Best practice trôi theo năng lực model. Anthropic đã cắt **hơn 80%** system prompt của Claude Code cho Claude Opus 5 và Claude Fable 5 mà *"no measurable loss on our coding evaluations"*.

| Beat | Pha | Nội dung | Chuyển động / tương tác |
|---|---|---|---|
| b1 | HỎI | (Gọi lại c01:b2-③) **"Có thể bạn đã đoán sức mạnh của Claude Code nằm ở một chỉ dẫn hệ thống bí mật rất dài. Nếu cắt 80% chỉ dẫn đó, chuyện gì xảy ra?"** | Hiện lại lựa chọn của người học ở Chương 1 |
| b2 | ĐOÁN | ① Chất lượng sụp ② Giảm nhẹ ③ **Không giảm, đo được** | `PredictPrompt` |
| b3 | THẤY | **Sáu mũi tên** vẽ ra lần lượt; mỗi dòng "Hồi đó" bị gạch rồi mờ, mỗi dòng "Bây giờ" hiện đậm. Sau đó, trên "bàn làm việc" của Chương 1, đường can thiệp dày đặc (mỗi lần bạn chen vào nhắc, sửa, duyệt) **dãn thành một đường thẳng** chỉ còn một trạm rà soát ở cuối. | DrawSVG ×6; MorphSVG đường zig-zag → đường thẳng có một trạm ✓ |
| b4 | HIỂU | Bảng 6 shift + câu hỏi dẫn + *nơi đã gặp* (S1, S5 ở c04 · S2–S4 ở c05 · S6 ở c03 và c07). **Áp dụng cho context của bạn:** *hướng dẫn dự án*: gọn, chủ yếu là gotcha · *skill*: hướng dẫn gọn, mang quan điểm riêng của bạn và team · *tham chiếu*: ưu tiên tài liệu mẫu cụ thể · *chỉ dẫn hệ thống*: chỉ đáng đầu tư nếu bạn tự xây agent. Dùng **`/doctor`** để rightsize skill và CLAUDE.md. *"Never bet against the model."* · *"Build for the model six months from now."* (Boris) | Bảng 6 hàng, mỗi hàng link quay lại beat cũ |
| b5 | HIỂU | **Cân bằng (Chưa thống nhất):** phản hồi cộng đồng (thảo luận HN, do bên thứ ba tổng hợp) gồm lo ngại lock-in; phán đoán sai *khó phát hiện hơn*; auto-memory và vấn đề đồng ý. **Lập trường của trang:** ***No babysitting ≠ no supervision.*** Rào chắn (c06) và kiểm chứng (c07) vẫn giữ nguyên; thứ bỏ đi là việc cầm tay chỉ việc, tức các *sở thích* đã bị mã hoá thành luật và các lần chen vào không cần thiết. | Hai thẻ cân bằng |
| b6 | LÀM | **S8 Tỉa hướng dẫn:** bộ hướng dẫn 14 dòng kiểu cũ của dự án báo cáo; xoá hoặc viết lại từng dòng; đồng hồ "độ ràng buộc" giảm; mỗi dòng gắn shift tương ứng. Sau đó mở checklist *Audit hướng dẫn và skill của bạn* gồm 6 câu hỏi dẫn, kèm nút lọc Library theo "Phụ thuộc model". | Dòng bị xoá rơi xuống bằng SplitText; đồng hồ chạy theo `quickTo` |
| b7 | NHỚ | **Re-test 6 câu** → so sánh với Diagnostic → recap toàn bộ lựa chọn predict. | Biểu đồ trước/sau |
| b8 | — | **Kế hoạch 7 ngày:** N1 viết hướng dẫn dự án cho một việc lặp lại của bạn (≤ 20 dòng, chủ yếu gotcha) · N2 dùng plan mode + để Claude phỏng vấn cho một việc thật · N3 đóng gói việc đó thành command hoặc skill · N4 thêm mục Gotchas từ các lỗi đã gặp · N5 rà quyền: chặn những gì không đảo ngược được · N6 thêm bước kiểm chứng (đối chiếu nguồn hoặc reviewer độc lập) · N7 lên lịch cho nó tự chạy + đọc changelog. | Danh sách 7 mục, tick lưu cục bộ |

🎙 *"Mọi thứ hôm nay đều có hạn sử dụng. Kỹ năng bền nhất là biết hỏi: 'Chỉ dẫn này còn cần không?'"*
**Nguồn:** Thariq Shihipar, *The New Rules of Context Engineering for Claude 5 Generation Models* (claude.com/blog, 24/07/2026); phản hồi cộng đồng do bên thứ ba tổng hợp (ghi rõ); Boris tại YC và Ryan Peterman; README *How to Use*.

---

## Phụ lục A · S4 Linter hướng dẫn dự án: 12 dòng và đáp án

| # | Dòng | Đáp án | Lý do và nguồn |
|---|---|---|---|
| 1 | "Dự án: báo cáo thị trường cà phê hằng tuần cho ban giám đốc." | Giữ (1 dòng) | Nói ngắn dự án dùng để làm gì (Thariq 07/2026) |
| 2 | Danh sách toàn bộ file trong thư mục | Xoá | Claude tự thấy được |
| 3 | "Số liệu T9 trong `ban-hang.xlsx` đã điều chỉnh: dùng cột *Điều chỉnh*, không dùng cột *Gốc*." | Giữ | Gotcha điển hình |
| 4 | "LUÔN xuất thêm bản PDF sau khi sửa báo cáo." | Chuyển → hook (CLI) hoặc một bước trong skill/command | HK3; tất định |
| 5 | "KHÔNG BAO GIỜ gửi email cho khách hàng." | Chuyển → quyền/thiết lập (không cấp công cụ gửi, hoặc deny) | K3; c06 |
| 6 | "Không bao giờ viết đoạn văn quá 3 câu." | Xoá hoặc viết lại thành principle ("Viết giống văn phong các báo cáo đã duyệt") | S1 |
| 7 | "Giá lấy theo USD/tấn, khối lượng theo nghìn tấn; nguồn giá ưu tiên: [tên nguồn]." | Giữ | Quy ước không hiển nhiên |
| 8 | Quy trình rà soát báo cáo dài 40 dòng | Chuyển → skill | S3, progressive disclosure |
| 9 | Mô tả từng cột trong `gia-doi-thu.csv` | Xoá | Suy ra được từ file |
| 10 | "Từ W40 đổi mẫu báo cáo: chỉ dùng `mau-moi.html`." | Giữ (và nên xoá hẳn mẫu cũ) | CM7: hoàn tất chuyển đổi |
| 11 | Quy ước riêng cho thị trường EU (đơn vị EUR, nguồn riêng) | Chuyển → hướng dẫn trong `thi-truong-eu/` hoặc rules có phạm vi | CM2, CM4 |
| 12 | "IMPORTANT: hãy suy nghĩ thật kỹ và kiểm tra lại trước khi trả lời." | Xoá | S1/S4: model mới tự làm điều này; lời dặn này chỉ thêm ràng buộc |

## Phụ lục B · S5 Chọn khối: 8 tình huống và đáp án

| # | Tình huống | Đáp án |
|---|---|---|
| 1 | Mỗi thứ Hai làm báo cáo theo cùng một quy trình | Command (hoặc skill bạn tự gọi) |
| 2 | Đọc 40 bài báo để tìm 3 xu hướng, chỉ cần kết luận | Subagent |
| 3 | Văn phong và mẫu biểu đồ của team, Claude tự áp dụng khi viết báo cáo | Skill (tự kích hoạt) |
| 4 | Luôn xuất thêm bản PDF mỗi khi file báo cáo được sửa | Hook (hoặc một bước cố định trong command) |
| 5 | Rà soát độc lập bản nháp trước khi gửi | Subagent (context sạch) |
| 6 | Cách dùng API dữ liệu nội bộ, kèm script | Skill (thư mục có `scripts/`) |
| 7 | Chặn mọi thao tác xoá trong `du-lieu-goc/` | Hook / quyền |
| 8 | Hỏi kỳ báo cáo → lấy dữ liệu → vẽ biểu đồ → ghép slide | Command điều phối subagent + skill (dẫn sang c08) |

## Phụ lục C · Quy tắc viết copy

- Xưng "bạn"; câu ngắn, chủ động. Thuật ngữ và tên UI tiếng Anh giữ nguyên, lần đầu xuất hiện thì giải nghĩa.
- Ví dụ mặc định là công việc văn phòng; code chỉ xuất hiện ở thẻ ca sử dụng Dev và tab CLI.
- **Mọi con số, trích dẫn, tip và bước kèm link nguồn bấm được qua `SourceButton`** (xem `06-sources-and-links.md`; không có link thì không đăng). Mọi con số kèm nguồn và ngày. Số liệu do người phát biểu trong phỏng vấn thì ghi "theo lời [người], [ngày]".
- Không mô tả UI App nếu ma trận bề mặt chưa kiểm chứng; diễn đạt theo *khả năng* ("bật plan mode") hơn là vị trí nút.
- Diễn giải riêng của trang được gắn nhãn "Diễn giải". Phương án nhiễu phải hợp lý.
- **Câu ĐOÁN:** ba phương án có độ dài chênh nhau ≤ 15%; phương án đúng không được là phương án dài nhất hay nhiều hạn định nhất; mỗi phương án sai xuất phát từ một ngộ nhận có nguồn (`misconceptionRefs`). Các câu ĐOÁN hiện có ở c03, c04, c06, c07, c09 và câu K1, K3 của Diagnostic đã được viết lại theo quy tắc này (07/11/2026; vị trí đáp án đúng đã xáo: ① ② ③ xen kẽ; c09 b2 nay nêu connector nên khớp b4). Phương án sai lấy từ ngộ nhận có nguồn trong repo và docs; vẫn cần rà lại khi viết nội dung chương.
- **Nhãn gói:** mọi bước phụ thuộc gói, quyền admin hoặc điều kiện kỹ thuật (Fast mode, Advisor, Claude Tag, cloud session…) gắn `PlanPill`; không viết như thể ai cũng dùng được.
- **Dữ liệu phụ thuộc phiên bản** (tên model, mức effort mặc định, ngưỡng số) không viết cứng trong chương; lấy từ `models.yml` hoặc gắn nhãn *Phụ thuộc model* kèm ngày kiểm chứng.
