# 01 · Research brief: memory, Fable/Opus, Gemini (nguyên văn)

> Nguồn: tài liệu chủ dự án dán vào phiên Claude Code ngày 13/11/2026, tự ghi "tổng hợp từ cuộc trao đổi, KHÔNG phải bài nghiên cứu đã kiểm chứng độc lập". Là "3 nội dung ý tưởng" chủ dự án lên cùng Perplexity (chủ đề A, B, C).
> Trạng thái: **nguyên văn, chưa chỉnh sửa. Mặc định mọi số và khẳng định là UNVERIFIED.** Không trích trực tiếp vào bài.
> Dưới dòng này là nguyên văn, bắt đầu bằng tiêu đề gốc.

---

# Research brief: Memory, model effort và multi-model orchestration trong coding agents

> Mục đích: tài liệu bàn giao cho agent nghiên cứu và hỗ trợ viết blog phân tích.
> Ngày tổng hợp: 13/11/2026.
> Trạng thái: bản tổng hợp từ cuộc trao đổi, KHÔNG phải bài nghiên cứu đã kiểm chứng độc lập.
> Ngôn ngữ bài dự kiến: tiếng Việt, giữ thuật ngữ kỹ thuật khi cần.

## 0. Chỉ dẫn quan trọng cho agent nhận tài liệu

Tài liệu gom ba chủ đề:
1. Memory management của Claude Chat/Cowork và Claude Code.
2. Hiệu quả tương đối của Fable 5.2 và Opus 5.5 theo effort, đặc biệt trong Claude Code.
3. Gemini Carbon/Argon/Hydrogen, Orchestrator và chiến lược hệ sinh thái coding/agentic workflow của Google.

Đừng biến các phát biểu trong cuộc trao đổi thành sự thật đã được xác nhận. Các phản hồi trước có nhiều con số cụ thể nhưng không lưu đầy đủ nội dung nguồn, điều kiện benchmark và phương pháp đo. Một số citation dùng tiền tố không nhất quán (`page:` thay vì `web:`). Link có thể là điểm bắt đầu tìm kiếm, không phải bằng chứng đủ dùng để xuất bản.

Đặc biệt, hãy xác thực danh tính, khả dụng và ngày ra mắt của các model trước khi phân tích. Nếu không tìm được tài liệu chính thức truy cập được, đánh dấu chưa xác minh; không tự sửa tên model thành một model khác. Không tiếp tục lan truyền con số benchmark hoặc giá chưa kiểm chứng.

Phân loại phát biểu khi nghiên cứu:
- VERIFIED: nguồn gốc đáng tin cậy, có thể đọc và đối chiếu.
- VENDOR CLAIM: hãng tự công bố; ghi rõ benchmark và điều kiện.
- INFERENCE: suy luận của người viết, không trình bày như tính năng đã công bố.
- UNVERIFIED: thông tin từ trao đổi chưa xác nhận được.
- MEASURED: kết quả tự đo trên repo, có cấu hình và log.

## 1. Mục tiêu và góc nhìn người viết

### Câu hỏi xuyên suốt

Làm thế nào một coding agent hoàn thành công việc đúng với ít sự giám sát nhất, thay vì chỉ tạo câu trả lời thông minh hoặc có giá token thấp?

### Những điều người dùng thực sự quan tâm

- Hiểu vì sao memory của ứng dụng chat khác memory gắn với repo.
- Biết auto memory của Claude Code hoạt động thế nào, có tự bật không và cần quản trị bao nhiêu.
- Chọn model và effort theo chất lượng, chi phí và mức độ tự chủ.
- Hiểu sweet spot Google hướng tới khi kết hợp model reasoning với model thực thi hiệu quả.
- Phân tích sản phẩm/hệ sinh thái, không chỉ so leaderboard.
- Giảm babysitting: số lần phải nhắc lại, sửa hướng, phát hiện agent chưa kiểm chứng hoặc xử lý hậu quả.

### Luận đề làm việc — cần kiểm chứng

Đơn vị cạnh tranh đang dịch chuyển từ model đơn lẻ sang hệ thống gồm memory, context selection, reasoning, tool use, orchestration và verification. Chi phí đáng tối ưu là chi phí để có kết quả được chấp nhận, bao gồm thời gian của con người.

Đây là giả thuyết biên tập, chưa phải kết luận thực nghiệm.

## 2. Chủ đề A — Memory: nhớ người dùng hay nhớ môi trường làm việc?

### Câu hỏi gốc

Người dùng nhận thấy Claude Chat/Cowork dùng memory tích hợp trong app, còn Claude Code dựa vào repo/local folder. Sự khác biệt có đến từ định hướng sản phẩm không? Cost và hiệu quả khác nhau thế nào?

### Cách phân tích nên giữ

Tách ít nhất năm khái niệm thường bị gọi chung là memory:

| Thành phần | Vai trò | Không nên đánh đồng với |
|---|---|---|
| Context của phiên | Nội dung model đang thấy trong lượt/session | Trí nhớ bền vững giữa các phiên |
| Lịch sử hội thoại và truy xuất lịch sử | Tìm lại nội dung đã trao đổi | Mọi lịch sử luôn nằm trong context |
| Memory tóm tắt do hệ thống duy trì | Giữ preference, thông tin và quyết định dài hạn | Nguồn sự thật đầy đủ, luôn chính xác |
| Instruction files | Quy ước được người/team chủ động viết | Học tự động hoặc model được huấn luyện lại |
| Artifacts của dự án | Code, tests, ADR, tài liệu và trạng thái công việc | Chỉ một file memory |

### Các nội dung đã được thảo luận — cần xác minh

- Chat thiên về continuity theo người dùng và dự án.
- Cowork có thể khác nhau giữa cloud và local; không khẳng định mọi chế độ dùng cùng memory.
- Claude Code có instruction files như `CLAUDE.md` và có thể có auto memory theo project.
- File trong repo có lợi thế review/version control/chia sẻ team; ghi chú cá nhân có thể nằm ngoài repo.
- Không mặc định memory Chat đồng bộ vào Claude Code.
- Memory chỉ có tác dụng khi được truy xuất/nạp đúng lúc; lưu nhiều không đồng nghĩa nhớ hiệu quả.

### Các chi tiết cần kiểm tra trước khi đưa vào bài

1. Phạm vi memory theo account, project, máy và repository.
2. Auto memory có bật mặc định không; phụ thuộc phiên bản, plan hay môi trường nào?
3. Đường dẫn lưu thực tế và cách xác định project/worktree.
4. `/memory`, settings và biến môi trường nào đang được hỗ trợ?
5. File nào tự nạp, khi nào nạp, bao nhiêu dòng/token, file nào đọc theo nhu cầu?
6. Quan hệ giữa `CLAUDE.md`, rules, local instructions và `AGENTS.md`; không giả định mọi file được hỗ trợ trực tiếp.
7. Khả năng sửa/xóa/xuất memory và chính sách dữ liệu.
8. Prompt caching có làm thay đổi chi phí nạp instruction lặp lại không?

### Các phát biểu trước cần đặc biệt cẩn trọng

- Giới hạn “200 dòng hoặc 25KB”.
- Auto memory “bỏ qua kiến trúc, đường dẫn file và debug fixes”.
- Auto memory không chạy ở background session.
- Các loại memory cố định `user`, `feedback`, `project`, `reference`.
- Sự tồn tại/cách dùng `/doctor prompt-audit` và `CLAUDE.local.md`.

Không coi các chi tiết này là đã xác nhận chỉ vì chúng xuất hiện trong câu trả lời trước.

### Góc phân tích chi phí

Không dùng “cloud tiện, local rẻ” làm kết luận đơn giản. Tách:
- Token nạp memory/instructions và chi phí retrieval.
- Khả năng cache.
- Công duy trì, sửa memory sai/lỗi thời.
- Chi phí nhắc lại vì không nhớ.
- Rủi ro cross-project contamination và thông tin nhạy cảm.
- Lợi ích team khi quy ước trở thành artifact có version.

### Giả thuyết cho bài

Memory tốt không phải memory lớn nhất, mà là memory có phạm vi đúng, nguồn gốc rõ và có cơ chế sửa. Phân biệt “nhớ tôi” với “biết cách làm việc trong repo này”.

## 3. Chủ đề B — Fable 5.2 và Opus 5.5: model × effort × task

### Câu hỏi gốc

So sánh hiệu quả tương đối của hai model ở tất cả mức effort trong Claude Code, gồm chất lượng, tốc độ, cost và mức phải can thiệp.

### Những gì phản hồi trước đã khẳng định nhưng chưa đủ cơ sở kết luận

| Phát biểu đã xuất hiện | Cần xử lý khi nghiên cứu |
|---|---|
| Fable mạnh hơn Opus ở mọi effort | Không dùng như kết luận; cần ma trận đo đối chứng |
| Cả hai hỗ trợ low/medium/high/xhigh/max | Kiểm tra model, API và Claude Code riêng |
| Default effort của cả hai là medium | Kiểm tra theo surface và phiên bản |
| Fable high gần Opus max với nửa cost/task | Xác minh benchmark, harness, số mẫu và cách tính cost |
| Fable xhigh tốt nhất trong benchmark được nhắc | Không suy thành tốt nhất trên mọi repo |
| Giá Fable $8/$40 và Opus $4/$20 mỗi triệu token | Kiểm tra bảng giá hiện hành, caching và output thinking |
| Opus đủ cho 70–85% công việc | Đây không phải số đo được cung cấp; loại bỏ nếu không có dữ liệu |

### Các số đã được nêu trong trao đổi — chỉ để truy nguyên, không dùng trực tiếp

- FrontierCode 2.0: Fable high 45.3%, Opus max 45.5%, Fable xhigh 49.1%.
- Fable high chi phí/task khoảng một nửa Opus max.
- HLE: Fable low đạt mức tương đương đỉnh Opus với dưới 1/10 chi phí.
- BenchCAD 2.1: 83.5 so với 65.3.

Tất cả cần xác minh lại từ nguồn gốc. Không so các điểm thuộc benchmark khác nhau để tạo một thứ hạng chung.

### Khung so sánh đúng hơn

Không đồng nhất cùng tên effort với cùng compute budget. `high` ở hai model không nhất thiết có cùng token, latency hoặc hành vi tool use.

Tạo bảng model × effort cho từng nhóm task, để trống các ô chưa có số đo:

| Model/effort | Pass rate | Cost/task được chấp nhận | Wall time | Số can thiệp | Regression | Nguồn |
|---|---:|---:|---:|---:|---:|---|
| Fable low/medium/high/xhigh/max | TBD | TBD | TBD | TBD | TBD | TBD |
| Opus low/medium/high/xhigh/max | TBD | TBD | TBD | TBD | TBD | TBD |

Chỉ điền những effort thực sự được sản phẩm hỗ trợ.

### Giả thuyết cần thử

- Model mạnh hơn ở effort vừa có thể hiệu quả hơn model yếu hơn ở effort tối đa.
- Effort cao có diminishing returns, đặc biệt khi task rõ và acceptance tests tốt.
- Task mơ hồ hoặc cần root-cause có thể hưởng lợi từ reasoning mạnh hơn task sửa cơ học.
- Model mạnh có thể giảm số lần con người can thiệp nhưng cũng có thể over-explore.
- Không thể suy cost của thuê bao Claude Code trực tiếp từ giá API.

## 4. Chủ đề C — Gemini và sweet spot của hệ sinh thái agent

### Quan sát trực tiếp từ ảnh người dùng

Dropdown hiển thị:
- Gemini 4 Carbon — Medium — New.
- Gemini 4 Argon — Medium — New.
- Gemini 4 Hydrogen — Medium — New.
- Orchestrator (Carbon) — New, đang được chọn.
- Orchestrator (Argon) — New.

Ảnh xác nhận nhãn giao diện, không tự xác nhận model ID, backend, giá, benchmark hoặc quyền truy cập chung. Ảnh cũng không đủ để xác định chắc toàn bộ ngữ cảnh ứng dụng.

### Khung phân vai đã được thảo luận — cần xác minh nguồn

| Thành phần | Định vị được nêu | Điều không nên suy ra |
|---|---|---|
| Carbon | Reasoning sâu, task khó và dài | Luôn tốt nhất hoặc rẻ nhất cho mọi task |
| Argon | Cân bằng intelligence, latency và token | Medium ở Argon bằng medium ở Carbon |
| Hydrogen | Thực thi nhanh, worker/verifier hiệu quả | Chỉ là model yếu; luôn thay được Argon |
| Orchestrator Carbon | Phối hợp Carbon/Hydrogen trong một task | Chính xác thuật toán routing hoặc luôn đạt gần Carbon |
| Orchestrator Argon | Điều phối có Argon ở tầng cao | Có số tiết kiệm giống biến thể Carbon |

### Ý tưởng trung tâm

Phân biệt ba cơ chế:
1. Routing tĩnh: chọn model từ prompt đầu vào rồi chạy đến cuối.
2. Điều phối động: thay model khi trạng thái và độ khó thay đổi trong cùng task.
3. Multi-agent/swarm: chia nhánh công việc cho nhiều agent, có thể song song.

Chúng có thể kết hợp nhưng không phải một tính năng duy nhất. Một agent có thể đổi model; nhiều agent cũng có thể dùng cùng model.

### Workflow minh họa — là sơ đồ khái niệm, không phải spec đã xác nhận

```text
Hiểu yêu cầu + đọc code + lập kế hoạch
 ↓
Thực thi thay đổi + chạy test
 ↓
Có trở ngại hoặc phát hiện bất nhất?
 ↙ Có ↘ Không
Reasoning lại / sửa plan Kiểm chứng cuối
 ↓ ↓
Tiếp tục thực thi Bàn giao bằng chứng
```

### Các số/chi tiết đã nêu — bắt buộc xác minh lại

- Hydrogen và Orchestrator ra mắt 12/11/2026; Carbon mở rộng 10/11/2026.
- Orchestrator gần Carbon nhưng giảm 24% quota, nhanh hơn 19%.
- Hai nguồn được mô tả là ghi Terminal-Bench 4.0 và 4.1 không nhất quán.
- Hydrogen AA Intelligence Index 51 ở high, 54 ở xhigh; Argon 50.
- Carbon/Argon có low, medium, high; Hydrogen thêm xhigh.
- Giá hiện tại Carbon/Argon $2 input, $10 output; Hydrogen $1.50/$7.50.
- Giá Carbon/Argon dự kiến tăng $4/$20 từ 01/12/2026.
- Quyền truy cập Orchestrator theo Pro/Ultra.

Không dùng các số trên nếu không đọc được nguồn trực tiếp. Không chuyển “quota giảm” thành “USD API giảm” hoặc suy từ một benchmark sang mọi repo.

### Hệ sinh thái cần lập bản đồ

- Antigravity App, CLI, IDE extensions: các surface người dùng.
- Agent harness/runtime: tools, state, context, execution loop.
- Background/remote agents, worktrees: task dài và cô lập thay đổi.
- Orchestrator: chọn model theo giai đoạn.
- Swarm/subagents: chia vai và song song hóa.
- SDK/automation: pipeline, lịch chạy, CI/CD.
- MCP/skills/hooks/plugins: tích hợp công cụ và hành vi.
- Browser/UI verification: bằng chứng ngoài unit test.
- Cloud/Firebase/Android/Flutter/Workspace: workflow nối code với môi trường sử dụng.
- Approval, sandbox, logging và policy: điều kiện để tăng mức tự chủ an toàn.

Cần kiểm tra từng khả năng theo đúng sản phẩm, phiên bản, trạng thái preview/GA và plan. Không gom mọi sản phẩm Google thành một hệ thống tích hợp hoàn chỉnh nếu tài liệu không chứng minh.

### Giả thuyết chiến lược

Google có thể đang tối ưu “phán đoán đắt, thực thi hiệu quả”: model mạnh dùng tại điểm cần ra quyết định, worker nhanh xử lý phần còn lại, harness đảm nhiệm chuyển giao và kiểm chứng. Lợi thế tiềm năng nằm ở tích hợp hệ sinh thái, không chỉ leaderboard.

Đây là suy luận chiến lược cần kiểm tra bằng trải nghiệm và tài liệu, không phải tuyên bố chắc chắn về ý định nội bộ Google.

## 5. Nối ba chủ đề thành một lập luận

### Ba lớp quyết định khả năng tự chủ

1. Memory/context: agent mang theo thông tin gì và thông tin nào đáng tin?
2. Model/effort: agent dành bao nhiêu năng lực cho quyết định hiện tại?
3. Orchestration/verification: ai làm bước nào, khi nào đổi hướng và ai xác nhận hoàn tất?

Một model mạnh không sửa được instruction lỗi thời. Memory tốt không bù được công cụ thiếu quyền. Routing hiệu quả không đảm bảo task đúng nếu verifier yếu hoặc dùng cùng giả định sai với executor.

### Khung chi phí toàn phần đề xuất

```text
Tổng chi phí của một nhiệm vụ =
 model/tool/infrastructure spend
 + công thiết lập và duy trì memory/instructions
 + công giám sát và sửa hướng
 + công review/kiểm chứng
 + chi phí retry và rework
 + tổn thất do lỗi lọt qua
```

Không cộng trực tiếp USD và phút. Khi cần một con số chung, nêu rõ đơn giá thời gian và giả định quy đổi; nếu không, báo cáo từng chiều riêng biệt.

### Metric chính

- Accepted task rate: task đạt acceptance criteria sau review.
- Cost per accepted task: tổng spend của cả tập thử chia số task được chấp nhận; tính cả spend của lần thất bại.
- Time to accepted result: từ bắt đầu đến khi người review chấp nhận, gồm retry.
- Human interventions: số lần thay đổi hướng/phải sửa yêu cầu; phân biệt approval thường lệ.
- Review burden: phút review và mức độ khó phát hiện lỗi.
- Regression rate và severity: không chỉ số test pass.
- Reproducibility: mức dao động giữa các lần chạy.

Không nên gộp thành một điểm “autonomy score” nếu chưa công bố trọng số.

## 6. Thiết kế thử nghiệm cho blog

### Bộ task

1. Bug cục bộ, acceptance test rõ.
2. Feature nhiều file với spec tương đối đầy đủ.
3. Root-cause mơ hồ, cần đọc code và tái hiện lỗi.
4. Migration/refactor có nguy cơ regression.
5. UI flow cần kiểm chứng trên browser.
6. Task dài có checkpoint, dependency hoặc thông tin mới giữa chừng.

### Các biến cần kiểm soát

- Repo, commit xuất phát và dependency cố định.
- Cùng mục tiêu và acceptance criteria, không rò đáp án.
- Model ID, version, effort và ngày chạy.
- Harness, tools, quyền, network và sandbox.
- Memory/instructions đầu vào; ghi rõ on/off và không để memory học từ lượt thử trước gây rò rỉ.
- Context window, compaction, cache và warm/cold start.
- Giới hạn wall time/token/cost.
- Lặp nhiều lần, không chọn riêng lần đẹp nhất.
- Random hóa thứ tự chạy; reviewer không biết cấu hình nếu có thể.

### So sánh theo từng lớp, tránh quá nhiều biến cùng lúc

A. Memory: giữ model/effort/harness, thay cấu hình memory.
B. Effort: giữ model/harness/task, thay effort.
C. Model: giữ điều kiện gần tương đương, ghi rõ chỗ không thể khớp.
D. Orchestration: so model đơn với orchestrator trong cùng nền tảng.
E. Sản phẩm: so end-to-end Claude Code và Antigravity; không gọi đây là benchmark thuần model.

## 7. Dàn ý blog đề xuất

### Tiêu đề làm việc

- Coding agent giỏi chưa đủ: ai đang giảm chi phí babysitting?
- Từ memory đến orchestration: cuộc đua thật của coding agents.
- Đừng chỉ hỏi model nào mạnh hơn: hãy hỏi ai hoàn thành việc ít cần bạn hơn.

### Dàn bài

1. Mở bài bằng trải nghiệm: agent thông minh nhưng vẫn cần nhắc lại và giám sát.
2. Memory: tại sao nhớ người dùng khác nhớ codebase; giới hạn của persistent instructions.
3. Model × effort: vì sao model đắt hơn chưa chắc task đắt hơn, nhưng effort cao cũng chưa chắc tốt hơn.
4. Google: từ ba model sang danh mục vai trò, rồi sang Orchestrator.
5. Hệ sinh thái: harness, tools, verification và governance quyết định mức tự chủ.
6. Phép đo: cost per accepted task và human intervention thay cho leaderboard đơn lẻ.
7. Kết luận có điều kiện: chọn hệ thống theo failure modes của công việc, không chỉ chọn model theo danh tiếng.

### Điều cần tránh

- Không biến bài thành bảng marketing hoặc dự đoán hãng thắng chắc.
- Không dùng “local” đồng nghĩa riêng tư tuyệt đối: inference có thể vẫn gửi context ra cloud.
- Không nhầm persistent memory với training/fine-tuning.
- Không suy benchmark coding thành hiệu quả agentic knowledge work.
- Không gọi một workflow “tự chủ” nếu còn che giấu nhiều can thiệp thủ công.
- Không dùng tên effort như đơn vị đo compute chuẩn hóa.

## 8. Nguồn để bắt đầu xác minh

Các URL sau xuất hiện trong lượt nghiên cứu trước. Đây là danh mục truy nguyên, chưa phải danh sách tài liệu đã thẩm định cho bài viết. Agent phải mở lại, kiểm tra nội dung, tác giả/ngày cập nhật và khả năng truy cập.

### Memory và Claude Code

- https://code.claude.com/docs/en/memory
- https://code.claude.com/docs/en/memory.md
- https://support.claude.com/en/articles/11817273-use-claude-s-chat-search-and-memory-to-build-on-previous-context
- https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork

### Model và effort Claude

- https://code.claude.com/docs/en/model-config
- https://platform.claude.com/docs/en/build-with-claude/effort
- https://platform.claude.com/docs/en/models/fable-5-2/overview
- https://platform.claude.com/docs/en/models/opus-5-5/overview
- https://www.anthropic.com/claude-fable-and-mythos-5-2
- https://www.anthropic.com/claude/fable

### Gemini và Antigravity

- https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-carbon-now-available/
- https://blog.google/intl/en-in/products/introducing-gemini-4-hydrogen/
- https://antigravity.google/blog/gemini-4-hydrogen-in-google-antigravity
- https://antigravity.google/docs/overview
- https://antigravity.google/docs/changelog/
- https://aistudio.google.com/docs/whats-new-gemini-4-argon
- https://ai.google.dev/gemini-api/docs/models

### Mẫu evidence ledger

| Claim | Nhãn trạng thái | Nguồn trực tiếp | Ngày truy cập | Model/surface/version | Điều kiện và giới hạn |
|---|---|---|---|---|---|
| ... | VERIFIED / VENDOR CLAIM / INFERENCE / UNVERIFIED / MEASURED | ... | ... | ... | ... |

## 9. Prompt bàn giao cho agent tiếp theo

Bạn là research editor giúp tôi phát triển blog tiếng Việt về memory, effort và orchestration trong coding agents.

Hãy đọc tài liệu này như một research brief chưa kiểm chứng, không phải nguồn sự thật. Làm theo thứ tự:

1. Xác minh sự tồn tại, tên chính thức và khả dụng của các model/sản phẩm được nhắc. Nếu không xác minh được, nói rõ và dừng suy diễn các số liên quan.
2. Lập evidence ledger cho các claim quan trọng; ưu tiên tài liệu chính thức có thể đọc trực tiếp.
3. Tách dữ liệu hãng công bố khỏi số đo độc lập và suy luận biên tập.
4. Sửa hoặc loại các phát biểu quá mức, nhất là “mạnh hơn ở mọi effort”, tỷ lệ tiết kiệm, bảng giá và khả năng đồng bộ memory.
5. Đề xuất luận đề và dàn bài dựa trên phần đã xác minh, lấy “chi phí hoàn thành đúng và số lần phải can thiệp” làm trục chính.
6. Nêu những câu hỏi chỉ có thể giải bằng benchmark trên repo thực; đề xuất thử nghiệm gọn, có thể tái lập.
7. Trước tiên trả lại research memo: điều đã xác minh, điều bị bác bỏ, điều chưa biết và tác động đến luận điểm. Chưa viết một bài blog trơn tru che mất sự bất định.
