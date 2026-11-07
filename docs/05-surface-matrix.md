# Ma trận bề mặt · No Babysitting

> Dữ liệu nguồn cho mọi khối **"Cách làm"** (SurfaceTabs). Kiểm chứng ngày **06/11/2026**.
> **Phương pháp:** 5 nhóm nghiên cứu đọc docs chính thức (code.claude.com, claude.com/docs, support.claude.com, claude.com/blog), sau đó 5 agent *kiểm chứng đối kháng* đọc lại từng nguồn và bác bỏ mọi chỗ không xác nhận được. Tài liệu này chỉ giữ lại phần đã qua kiểm chứng.
> Khi build, file này được chuyển thành `content/surfaces/matrix.yml`. Mục nào quá 30 ngày chưa kiểm chứng lại sẽ bị CI mở issue.

**Ký hiệu**

| Ký hiệu | Nghĩa |
|---|---|
| ✓ | Có. Đã kiểm chứng trên docs |
| ◐ | Có một phần, hoặc có điều kiện |
| — | Không có (docs nói rõ) |
| ? | **Docs không nhắc tới.** Không được dạy là "không có"; trên trang hiện "Chưa có tài liệu" |
| † | Chi tiết UI lấy từ một lượt nghiên cứu, *chưa* kiểm chứng đối kháng. Cần thử tay trên app trước khi publish |

Cột: **Cowork** = Claude app (trải nghiệm thống nhất từ 16/09/2026) · **Desktop** = tab Code trong Claude Desktop · **Web** = claude.ai/code (cloud session) · **Mobile** = tab Code trong app Claude iOS/Android · **CLI**.

---

## 1. Các bề mặt

| Bề mặt | Là gì | Cần terminal? | Gói / điều kiện (đã kiểm chứng) | Trạng thái | Docs |
|---|---|---|---|---|---|
| **Claude app – Cowork** | "uses the same agentic architecture that powers Claude Code, accessible within Claude Desktop without opening the terminal". FAQ: *"built for non-coding knowledge work — research, analysis, document creation, and other multi-step tasks."* Từ 16/09/2026: "Cowork and chat are merging into one Claude" | Không | Mọi gói trả phí trên desktop. Từ 06/10/2026, task mới trên Pro/Max/Ultra chạy trên cloud | Một số phần ở beta | claude.com/docs/cowork/overview · claude.com/product/cowork · support 13345190, 15520349 |
| **Claude Code – tab Code trên Desktop** | Toàn bộ Claude Code "without using a terminal"; không cần cài CLI hay Node | Không | Pro, Max, Ultra, Team, Enterprise. macOS, Windows; Linux beta | Không ghi nhãn | code.claude.com/docs/en/desktop |
| **Claude Code on the web** (claude.ai/code) | Cloud session trong VM của Anthropic; vẫn chạy khi bạn gập máy | Không | Pro, Max, Ultra, Team; Enterprise cần premium seat hoặc Chat + Claude Code seat. **Cần git repo** (GitHub, hoặc upload bundle < 100 MB). Không có qua Bedrock/Vertex/Foundry, không có cho tổ chức ZDR/HIPAA/CMEK | Không ghi nhãn | …/claude-code-on-the-web |
| **Mobile** (tab Code trong app Claude) | Theo dõi và điều khiển cloud session, phiên Remote Control; Dispatch | Không | Theo gói của từng tính năng. `/plugin`, `/resume` không chạy trong app | — | …/mobile |
| **Slack – Claude Tag** | @Claude trong kênh; làm việc chung của team; có routines theo lịch | Không | **Chỉ Team/Enterprise**; Owner ghép workspace. Bot "Claude Code in Slack" cũ bị dừng từ 05/10/2026 ở mọi workspace đã nối Claude Tag | Public beta | claude.com/docs/claude-tag/overview |
| **Claude in Chrome** | Extension; Claude dùng trình duyệt *đã đăng nhập* của bạn; side panel mở thẳng một phiên Cowork | Không | Gói trả phí của Anthropic (Pro, Max, Ultra, Team, Enterprise); đăng nhập bằng tài khoản, không bằng API key; extension ≥ 1.0.36; không hỗ trợ WSL | — | …/chrome · support 12012173 |
| **Scheduled tasks trên cloud** (tên cũ **Routines**) | Chạy theo lịch, API hoặc sự kiện GitHub, kể cả khi máy tắt | Không | Pro, Max, Ultra, Team, Enterprise. Admin Team/Enterprise bật tắt ở mục "Scheduled tasks (Was Routines)" | Research preview | …/routines |
| **Remote Control** | Điều khiển một phiên *đang chạy trên máy bạn* từ điện thoại hoặc trình duyệt; file và MCP vẫn ở máy | Khởi động: Desktop gõ `/remote-control`; hoặc CLI | Pro → Enterprise; không dùng được với API key; Team/Enterprise cần Owner bật | — | …/remote-control |
| **CLI** | Đầy đủ nhất; nền cho script và Agent SDK | Có | Pro → Enterprise hoặc tài khoản Console; có Bedrock/Vertex/Foundry | — | …/quickstart |

**Lưu ý đặt tên:** *teleport* (`claude --teleport`) **không phải** truy cập từ điện thoại. Nó chỉ kéo một cloud session về terminal, một chiều. Truy cập từ điện thoại là **Remote Control**.

---

## 2. Ma trận tính năng theo chương

### c02 · Ngân sách ngữ cảnh

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `context-usage` | Xem mức dùng context | ? | ✓ | ✓ | ? | ✓ | Desktop: thẻ **Context** trong bảng chi tiết phiên, hoặc gõ `/context`. CLI: `/context` (`/context all` liệt kê cả file memory) |
| `compact` | Nén có gợi ý | ? | ? (chỉ ghi auto-compact) | ✓ | ? | ✓ | Web/CLI: `/compact <trọng tâm>`. CLI thêm `/autocompact`. Sau khi nén, CLAUDE.md ở gốc và auto-memory được nạp lại từ đĩa |
| `new-session` | Phiên mới + brief | ? | ✓ | ✓ | ? | ✓ | Desktop: **+ New** (Cmd/Ctrl+N). Web: `/clear` hoặc claude.ai/code/new. CLI: `/clear [tên]` (alias `/reset`, `/new`). `/clear` giữ nguyên project memory; hội thoại cũ vẫn resume được |
| `rewind` | Tua lại | ? | ? | ◐ | ? | ✓ | CLI: Esc Esc hoặc `/rewind`, gồm *Restore code and conversation · Restore conversation · Restore code · Summarize from here · Summarize up to here*. Không theo dõi thay đổi chỉ do lệnh Bash. Web: hành động "Rewind to here" trên tin nhắn |
| `sessions` | Tiếp tục / rẽ nhánh | ? | ✓ | ◐ | ✓ | ✓ | Desktop: danh sách phiên ở sidebar, đổi tên, Split view. Web: sidebar; *không* có `/resume`. CLI: `--continue`, `--resume`, `/rename`, `/branch`, `--fork-session`; `/btw` hỏi ngoài lề mà không ghi vào lịch sử |

### c03 · Nghĩ trước khi giao việc

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `plan-mode` | Plan mode | ? (docs chỉ liệt kê Manual, Auto, Skip) | ✓ | ✓ | ✓ | ✓ | Desktop: bộ chọn mode dưới ô nhập → **Plan** (chỉ cho phiên này); **Cmd/Ctrl+Shift+M**; Shift+Tab *không* đổi mode trên Desktop. Web: dropdown mode. Mobile: cloud session có Plan (đường dẫn menu †). CLI: Shift+Tab tới khi hiện "⏸ plan mode on", hoặc thêm `/plan` trước prompt, hoặc `--permission-mode plan`; Ctrl+G để sửa plan. **Cowork (Diễn giải):** chọn Manual, yêu cầu "lập kế hoạch, hỏi lại chỗ mơ hồ, chờ tôi duyệt" |
| `clarifying-questions` | Claude hỏi lại | ? | ◐ | ✓ | ✓ | ✓ | CLI: công cụ AskUserQuestion; trả lời bằng dòng *Other*; `askUserQuestionTimeout`. Câu hỏi mặc định chờ bạn, không tự đóng |
| `references` | Đính kèm, tham chiếu | ✓ | ✓ | ◐ | ◐ | ✓ | Cowork: đọc và ghi file cục bộ trực tiếp; nhận cả thư mục làm context. Desktop: **+** → Add files or photos, kéo thả, gõ `@tên-file`, hoặc chuột phải → Attach as context. CLI: `@đường/dẫn` (tới 25.000 token), dán ảnh. *Artifacts* (Output menu, tab Artifacts) chỉ được docs mô tả cho chat claude.ai |
| `artifacts` | Artifacts (trang HTML, tài liệu sống) | ? | ? | ? | ? | ? | Repo liệt kê Artifacts trong mục Hot; docs chính thức chưa được kiểm chứng cho từng bề mặt trên trang này (hiện chỉ biết claude.ai chat có Artifacts). Là phương tiện của shift S6 (rich references) nên **cần kiểm chứng trước khi viết c03** |

### c04 · Trí nhớ dự án — **hai hệ thống riêng, không trộn**

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `project-memory` | Hướng dẫn dự án | ✓ *Project Instructions* (nhãn UI †) | ✓ đọc CLAUDE.md (docs không mô tả UI sửa) | ? | ? | ✓ | CLI: `/init`; `CLAUDE.local.md`; `~/.claude/CLAUDE.md`; `@import`. Docs: file > 200 dòng có thể làm giảm mức tuân thủ; CLAUDE.md là *context*, không phải cấu hình bắt buộc |
| `rules` | Rules theo phạm vi | ? | ? | ? | ? | ✓ | `.claude/rules/*.md` + `paths:`. Rule có `paths:` chỉ nạp lại khi cần sau compaction |
| `auto-memory` | Memory | ✓ *Project memory* (công tắc "Use account memory") | ? | — (auto-memory nằm trên máy, không chia sẻ sang cloud) | ? | ✓ | CLI: bật/tắt trong `/memory`; `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`; nằm ở `~/.claude/projects/<project>/memory/MEMORY.md`. **Cowork memory và Claude Code auto-memory là hai hệ riêng.** Cowork không đọc `~/.claude` |

### c05 · Ba khối xây dựng

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `skills` | Skill | ✓ (*Customize*; skill gắn với tài khoản) | ✓ | ◐ (skill trong repo) | ? | ✓ | CLI: `~/.claude/skills/<tên>/SKILL.md` hoặc `.claude/skills/…`; gọi `/tên-skill`. Docs ghi skill `pdf`, `xlsx` đồng bộ từ claude.ai. Đường dẫn upload ZIP và giới hạn frontmatter khi upload: † |
| `commands` | Command | ? | ? | ◐ | ? | ✓ | Docs: command **đã gộp vào skill**; `.claude/commands/*.md` vẫn chạy; skill thắng nếu trùng tên. Trên App: tạo bằng skill |
| `subagents` | Subagent | ? | ◐ (pane **Background tasks** trong menu ⋮ của thanh tiêu đề hiện subagent đang chạy; tạo bằng file) | ◐ (`.claude/agents` trong repo tự nạp) | ? | ✓ | CLI: `.claude/agents/`, `--agents`, `@agent-tên`, `--agent`. Built-in: Explore, Plan, general-purpose |
| `plugins` | Plugin | ✓ (*Customize*) | ◐ † (**+** → Add plugins; phiên local/SSH) | ◐ (chỉ plugin do tổ chức quản lý) | ? | ✓ † | Plugin đóng gói skill, connector, slash command, subagent (blog Cowork plugins). Đọc kỹ trước khi cài vì plugin có thể chứa hook và MCP |

### c05b · Model & effort (chương mới, đọc docs ngày 06/11/2026)

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `model-effort` | Chọn model và effort | ? | ? | ◐ | ◐ | ✓ | CLI: `/model` (←/→ chỉnh effort), `/effort` (`/effort auto`), `--model`, `--effort`, `effortLevel`, `effort:` trong frontmatter skill/subagent, `ultrathink`. Web: docs chỉ nêu menu model ở ô nhập (nơi bật Fast mode). Mobile: effort chọn từ điện thoại/trình duyệt trong phiên Remote Control áp dụng vào phiên trên máy (đã đối chiếu nguyên văn 07/11/2026; nếu đã ghim bằng `CLAUDE_CODE_EFFORT_LEVEL` thì bị từ chối). Desktop và Cowork: docs không mô tả bộ chọn → **cần kiểm chứng tay**. Admin có thể ẩn model bằng allowlist ở claude.ai và Desktop |
| `fast-mode` | Fast mode (Opus chạy nhanh hơn) | ? | ? | ✓ | ? | ✓ | CLI: `/fast` hoặc `"fastMode": true`. Web: bật/tắt ở menu model trên claude.ai/code. Không phải model khác; Opus 5.5 / 5 / 4.8; tới 2,5 lần nhanh hơn, giá mỗi token cao hơn; gói thuê bao chỉ tính bằng usage credits (ngoài hạn mức thuê bao); Team/Enterprise cần Owner bật; không có trên Bedrock, Google Cloud, Foundry, Claude Platform on AWS. Nhạy phiên bản: Opus 4.8 có lịch gỡ 30/11/2026 |
| `advisor` | Advisor (model mạnh tư vấn) | ? | ? | ? | ? | ◐ | Thử nghiệm, **cần Anthropic API**: `/advisor`, `advisorModel`, `--advisor`; cặp gợi ý Sonnet hoặc Haiku làm chính + Opus tư vấn. Docs chưa nói về app |

### c06 · Tay chân & rào chắn

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `connectors-mcp` | Connector / MCP | ✓ (*Customize* → Connectors) | ✓ (**+** → connectors) | ? | ? | ✓ | CLI: `claude mcp add`, `/mcp`, `.mcp.json`. Mỗi connector tốn context |
| `permission-modes` | Permission mode | ✓ Manual · Auto · Skip (mặc định: Auto với Pro/Max/Ultra/Team; Manual với Enterprise) | ✓ Manual · Accept edits · Plan · Auto · Bypass | ✓ Accept edits · Plan · Auto | ✓ (cloud: Accept edits/Plan/Auto; Remote Control: thêm Manual) | ✓ | Desktop: Bypass cần bật "Allow bypass permissions mode" ở Settings > Code (Pro/Max/Ultra); Team/Enterprise do chính sách tổ chức. Auto cần model được hỗ trợ; có sẵn trên Team/Enterprise trừ khi admin tắt. CLI: Shift+Tab, `--permission-mode` |
| `permission-rules` | Quy tắc allow/ask/deny | ? (chưa có UI trong docs) | ◐ † (phiên local dùng chung file settings với CLI) | ◐ (một số thiết lập từ `.claude/settings.json` của repo) | ? | ✓ | Thứ tự ưu tiên giữa các file: † (repo nguồn có hai bảng khác nhau, xem ContradictionNote) |
| `sandbox` | Sandbox | ? | ? | (VM cách ly, cơ chế khác) | ? | ✓ | `/sandbox`; macOS, Linux, WSL2; không hỗ trợ Windows gốc. **Chỉ cách ly lệnh Bash**: Read/Edit/Write/WebFetch vẫn cần permission rule |
| `hooks` | Hook | ? (chưa có UI trong docs) | ◐ (hook trong file settings vẫn chạy) | ◐ (hook trong `.claude/settings.json` của repo) | ? | ✓ | 33 sự kiện; `/hooks` chỉ để xem. Docs có ví dụ không cần code: hook gửi thông báo desktop khi Claude chờ bạn |

### c07 · Tự kiểm chứng

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `browser-verify` | Claude in Chrome | ✓ (ghép Chrome; side panel mở phiên Cowork) | ◐ † | ? | ? | ✓ | CLI: `--chrome`, `/chrome`. Gặp trang đăng nhập hoặc CAPTCHA thì "pauses and asks you to handle it manually". Bật mặc định làm tốn thêm context |
| `preview` | Browser pane (Desktop) | ? | ✓ | ? | ? | — | **Cmd/Ctrl+Shift+B**: chụp màn hình, đọc DOM, bấm, điền form. Hợp với việc có server cục bộ, nên thiên về dev |
| `computer-use` | Computer use | ? | ✓ (macOS 14+, Windows) | — | ? | ◐ (chỉ macOS) | Pro/Max/Ultra; **research preview**; duyệt từng app |
| `code-review` | Code review (dev) | ? | ? | ◐ (Auto-fix cần GitHub App) | ? | ✓ | `/code-review` có trên mọi gói. Dịch vụ Code Review: Team/Enterprise qua GitHub App; không có với ZDR/HIPAA/CMEK |

### c08 · Dàn nhạc

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `dynamic-workflows` | Dynamic workflows | ? | ✓ (thẻ duyệt Once/Always/Deny; tiến độ ở Background tasks) | ◐ (kết quả lưu cùng hội thoại) | ◐ (từ khoá qua Remote Control) | ✓ | CLI: `/workflows`, từ khoá `ultracode`, `/effort ultracode`, `/deep-research` (cần WebSearch). Gói trả phí; Pro cần bật "Dynamic workflows" trong `/config`. Mặc định tối đa 16 agent chạy đồng thời, 1.000 agent mỗi lượt. Ví dụ non-code trong docs: *nghiên cứu ba đối thủ xử lý rate limiting thế nào qua docs và changelog công khai* |
| `agent-teams` | Agent teams | ? | ? | ◐ (biến môi trường) | ? | ✓ | **Experimental, tắt mặc định** (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`); tốn token theo số thành viên |

### c09 · Nhân bản chính mình

| ID | Tính năng | Cowork | Desktop | Web | Mobile | CLI | Cách làm & ghi chú |
|---|---|---|---|---|---|---|---|
| `parallel-sessions` | Chạy song song | ? | ✓ (+ New, Ctrl+Tab, Split view, công tắc Worktree trong git repo) | ✓ (mỗi phiên một VM; cần git repo) | ◐ | ✓ | CLI: `--worktree`, `--cloud`. Với việc *không phải code*: mỗi phiên một thư mục |
| `background` | Chạy nền | ✓ **Dispatch** (Pro/Max/Ultra; máy desktop phải mở, thức và online; lời xin duyệt không ai trả lời thì tự từ chối sau 10 phút) | ✓ pane Background tasks | ? | ◐ (giao Dispatch từ điện thoại) | ✓ agent view (research preview: `claude agents`, `--bg`, `/bg`) | Dispatch và agent view là **hai tính năng khác nhau** |
| `scheduled-desktop` | Lịch trên Desktop | — | ✓ | — | ? | — | Tab Code → **Scheduled** → New task; chọn Local ("Only on this computer": chỉ chạy khi app mở và máy thức, bù lần lỡ gần nhất trong 7 ngày) hoặc Cloud. Ví dụ trong docs: *"morning briefings that pull from your calendar and inbox"* |
| `scheduled-cloud` | Lịch trên cloud (Routines cũ) | — | ✓ (chọn Cloud) | ✓ claude.ai/code/routines | ? | ✓ `/schedule` | **Research preview.** Mỗi lượt chạy là một bản clone mới, **không thấy file trên máy bạn**: dữ liệu phải đến từ repo hoặc connector cấu hình cho task. Khoảng cách tối thiểu 1 giờ |
| `scheduled-cowork` | Lịch trong Cowork | ✓ (nút Schedule; gõ `/schedule` vẫn điền sẵn yêu cầu dù đã bị bỏ khỏi menu) | — | — | ? | — | Chi tiết nhãn †. Lời xin duyệt không ai trả lời có thể làm task treo |
| `loop` | `/loop` | ? | ? | ◐ | ? | ✓ | Chỉ chạy trong phiên đang mở; task lặp hết hạn sau 7 ngày; tối thiểu 1 phút; tối đa 50 task. Esc chỉ dừng được loop *tự định nhịp* |
| `goal` | `/goal` | ? | ✓ | ? | ◐ (qua Remote Control) | ✓ | `/goal <điều kiện>`, `/goal clear`. Mỗi phiên một goal; một model nhỏ đánh giá điều kiện sau mỗi lượt; điều kiện dài tối đa 4.000 ký tự. Nên ghi kèm điều kiện dừng ("hoặc dừng sau 20 lượt") |
| `remote-mobile` | Remote Control | ? | ✓ (`/remote-control`) | ✓ (vai trò client) | ✓ | ✓ | `claude remote-control`, `--rc`; `/mobile` hiện mã QR. Teleport ≠ điện thoại |
| `slack` | Claude Tag | — | ? | ? | ? | — | Team/Enterprise; public beta. Routine: @Claude trong kênh, mô tả lịch bằng lời; nếu không nêu múi giờ thì dùng múi giờ trong hồ sơ Slack của người gửi; tối đa 1 lần mỗi giờ |
| `github-actions` | GitHub Actions (dev) | — | — | — | ? | ✓ | `/install-github-app`; GitHub tự tắt lịch sau 60 ngày repo không hoạt động |

---

## 3. Nhận định rút ra (đã đưa vào PRD và Script)

1. **Claude app (Cowork) là nơi Anthropic đặt công việc văn phòng.** Docs Desktop ghi: *"Research, document editing, and spreadsheet work stay in Cowork."* Kịch bản báo cáo tuần vì thế có hai đường đều hợp lệ: Cowork (tự nhiên nhất cho người làm văn phòng) và tab Code trên Desktop (đủ tính năng Claude Code, làm việc trên một thư mục).
2. **Cùng một nguyên lý, hai cơ chế.** Hướng dẫn dự án (Project Instructions ↔ CLAUDE.md), memory (Project memory ↔ auto-memory) và skill/plugin (Customize ↔ `.claude/`) không dùng chung dữ liệu. Trang dạy nguyên lý một lần, rồi chỉ "đặt ở đâu" theo từng tab.
3. **Nhiều tính năng "rào chắn" của Claude Code chưa có UI trên App** (hook, permission rule, sandbox, tạo subagent, rules). Chúng chạy bằng file cấu hình. Trên App, trang hiện "Chưa có tài liệu về UI" và trỏ sang tab CLI hoặc Starter Kit. Không ghi là "không làm được".
4. **Cloud ≠ máy của bạn.** Cloud session cần git repo; scheduled task trên cloud không thấy file cục bộ. Muốn báo cáo tự chạy trên cloud thì dữ liệu phải đến từ connector (Drive…). Đây là một beat dạy học ở c09.
5. **Gói ảnh hưởng nội dung:** Claude Tag chỉ có ở Team/Enterprise; Dispatch và computer use chỉ có ở Pro/Max/Ultra; cloud session cho Enterprise cần seat đặc biệt. Mỗi khối có PlanPill.
6. **Tên đổi nhanh:** Cowork gộp vào Claude (16/09/2026) · Routines → scheduled tasks · bot Slack cũ → Claude Tag (05/10/2026). Nên dạy theo *mục đích công việc* hơn là nhãn nút.

### Bằng chứng non-coding (trích nguyên văn, đã kiểm chứng)

| Nguồn | Trích |
|---|---|
| claude.com/product/cowork (FAQ) | "Cowork is built for non-coding knowledge work — research, analysis, document creation, and other multi-step tasks." |
| code.claude.com/docs/en/desktop | "Research, document editing, and spreadsheet work stay in Cowork." |
| claude.com/docs/cowork/overview | "uses the same agentic architecture that powers Claude Code, accessible within Claude Desktop without opening the terminal" |
| code.claude.com/docs/en/desktop-scheduled-tasks | "morning briefings that pull from your calendar and inbox" |
| How Anthropic teams use Cowork (Finance) | PM hoặc sales hỏi data warehouse "without knowing SQL" |
| How Anthropic teams use Cowork (Sales) | "Thirty seconds versus three to five minutes" |
| How Anthropic teams use Claude Code (24/07/2025) | Các team không làm kỹ thuật dùng Claude Code: Legal, Growth Marketing, Product Design… |

*Ví dụ "weekly marketing readout" trên trang Cowork là **diễn giải lại**, không phải trích dẫn: lấy số liệu từ Amplitude, lưu vào Drive, rồi làm deck. Nếu đưa lên trang thì phải ghi là "theo mô tả của trang".*

---

## 3b. Mâu thuẫn repo ↔ docs chính thức (docs là chuẩn; tip repo giữ lại kèm nhãn)

1. **Thời hạn `/loop`:** README ghi "up to 3 days" (ngày 06/11/2026); docs chính thức ghi task lặp hết hạn sau 7 ngày (dòng `loop`). Hiện ContradictionNote, lấy docs.
2. **"Bật thinking" (WF2):** các model 5.5 và Fable không tắt được thinking trong Claude Code (đã đối chiếu nguyên văn 07/11/2026; qua API mỗi model khác nhau) → nhãn *Đã thay thế*.
3. **`ultrathink` (WF3):** effort level là núm chính; `ultrathink` chỉ nâng một lượt, không đổi cài đặt phiên (yêu cầu v2.1.311+; phạm vi áp dụng của yêu cầu phiên bản chưa rõ) → nhãn *Phụ thuộc model*.
4. **"Opus cho mọi việc" ↔ `opusplan`:** các tip repo nói khác nhau; docs: bắt đầu từ mặc định, chỉnh effort trước → nhãn *Chưa thống nhất*.
5. **Chuyển yêu cầu quyền sang Opus bằng hook (HK4):** auto mode đã làm việc này → nhãn *Đã thay thế* (cần kiểm chứng nguyên văn trước khi viết).
6. **"think hard / be thorough" và IN HOA (tip trong repo):** trang Best practices xếp vào "What you can stop doing": là văn bản thường, chỉ nhích trong mức effort → nhãn *Đã thay thế* hoặc *Phụ thuộc model*.
7. **"Quản lý context quyết liệt" và dùng subagent để cứu context:** trang Best practices (bảng *What you can stop doing*, nội dung theo bản tóm tắt) nói hết context hiếm khi là vấn đề; `/clear` giữa các việc vẫn đáng làm; subagent hợp để chạy song song, tách đầu ra ồn, rà soát độc lập, nhưng tốn thêm token. Ngưỡng 40% (Dex) → nhãn *Phụ thuộc model* / *Chưa thống nhất*.

## 4. Cần thử tay trước khi publish (`?` và `†` quan trọng nhất)

- [ ] Desktop và Cowork: bộ chọn model/effort nằm ở đâu, nhãn chính xác (chương 05b)
- [ ] Artifacts: bề mặt nào có, mở ở đâu (chương 03)
- [ ] Desktop: `/compact`, `/clear`, `/memory`, rewind có chạy trong tab Code không?
- [ ] Cowork: có cách xem hoặc nén context không; có tua lại không; nhãn chính xác của Project Instructions
- [ ] Đường dẫn upload skill (ZIP) và giới hạn frontmatter khi upload trên claude.ai
- [ ] Desktop: luồng **+ → Add plugins**; luồng bật Claude in Chrome trong Connectors
- [ ] Mobile: đường dẫn menu chọn Plan
- [ ] Yêu cầu gói của agent teams, agent view, `/goal`, `/loop`, Desktop scheduled tasks (docs không nêu)
- [ ] Thứ tự ưu tiên của permission rule (repo nguồn có hai bảng khác nhau)

**Người chịu trách nhiệm:** maintainer, kèm skill `surface-verify` (SAD §5.4). **Nhịp:** mỗi tháng, và mỗi khi changelog của Cowork hoặc Claude Code có mục liên quan.
