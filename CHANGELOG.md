# Changelog

Mỗi đợt kaizen ghi một mục: đã đổi gì, đo được gì. Kế hoạch: `docs/08-kaizen-go-live.md`.

## Sửa số đo chi phí của D82: trên CI là +134 giây, không phải +81 giây (14/11/2026)

**Site không đổi, không có chữ mới.** Số +81 giây tôi ghi ở PR #68 là đo trên máy làm việc; trên CI, bước `check.cjs` từ 112 giây lên 246 giây (+134 giây), và `Deploy site` chạy cùng `check.cjs` nên dài thêm tương ứng. Sửa ở mục D82 của CHANGELOG và `implementation-notes.md`. Việc bỏ mười trang bản cũ `c00` đến `c10` khỏi mục 2 vẫn là cách giảm chưa làm; chờ bạn quyết. Refs #43.

## Phép kiểm duyệt mọi trang đã dựng, và in trang chưa được xem (14/11/2026, D82)

**Site không đổi, không có chữ mới; đụng `site/scripts/`: chỉ thêm phạm vi kiểm, không nới ngưỡng.** `check.cjs` mục 2 (lỗi JS, cuộn ngang) không còn dùng danh sách viết cứng mà duyệt mọi trang đã dựng (hàm dùng chung `builtPages()` ở `serve-dist.cjs`); `design-check.cjs` giữ danh sách ngắn theo khổ nhưng in "trang đã dựng mà design-check không xem" ra console và Job Summary, chỉ hiện. Đo được trên bản dựng thật: `check.cjs` duyệt 23 trang ở mỗi trong ba khổ (trước: 8), vẫn xanh, **chậm hơn 81 giây trên máy làm việc (163 thành 244 giây) và 134 giây trên CI (112 thành 246 giây)**; `design-check.cjs` xanh, 182 giây, in 15 trang chưa xem, gồm **hai phần của lộ trình chính, `/02/` và `/03/`**. Refs #43.
## Bài 07: bốn việc còn mở của brief đã được quyết (14/11/2026, D84)

**Site không đổi, không có chữ mới** (`editorial/`). Chủ dự án chọn qua hộp hỏi lựa chọn: giữ `verifiedAt` 13/11/2026; phần mở bài "Đúng và đủ"; không nêu `/init` (mâu thuẫn với `docs/18` N4 để khi N4 được viết); và "Giữ nguyên theo báo cáo" cho bốn chỗ mà trang nguồn đã mở nói khác hoặc không có câu đó. Ghi ở `docs/08` D84 và `brief.md`; không đổi `draft.md`. Việc còn lại của bài 07 là mục 8 (PR đăng ghi đúng sự thật về đối chiếu nguồn, gồm bốn chỗ trên), chờ `status: approved` do tác giả đặt. Refs #57.

## Bài 07: gắn link còn thiếu, ghi bốn chỗ trang nói khác bài (14/11/2026)

**Site không đổi, không có chữ mới** (`editorial/`). Chủ dự án chọn "Agent tìm URL để gắn link, giữ nhãn UNVERIFIED" (14/11/2026, hộp hỏi lựa chọn). Gắn 12 link vào `draft.md` (Cognition, Anthropic ×2, docs Claude Code ×4, docs Codex ×2, prompt caching, MAST, METR); mọi dòng sổ vẫn `UNVERIFIED`. Mở trang để kiểm tồn tại, tiêu đề và ngày; thấy bốn chỗ bài nói khác trang hoặc trang không có câu đó (`/code-review` chạy trong subagent mới; bài Cognition không có câu về yêu cầu duyệt từ luồng nền; METR là thông báo đổi thiết kế và không thấy "30–50%"; số trace của MAST khác giữa các nguồn), ghi ở `ledger.md` để tác giả quyết. Refs #57.

## Quyết định cho danh sách trang của phép kiểm và ngoại lệ phạm vi, chi phí (14/11/2026, D82, D83)

**Site không đổi, không có chữ mới.** Chủ dự án chọn qua hộp hỏi lựa chọn, trả lời đề xuất của #43: "Đồng ý cả (a) và (b)" (D82: `check.cjs` mục 2 dùng danh sách trang dựng sẵn; `design-check.cjs` in "trang chưa xem" vào Job Summary) và "Đồng ý: loại phạm vi và chi phí không cần số D mới" (D83). `AGENTS.md` §4 thêm một dòng cho D83. Chọn "Chưa làm, để đấy" cho `art-check` đỏ trên `main`: không đổi gì. Chưa đổi mã kiểm; việc đó là PR sau, đo chi phí thêm. Refs #43.

## Quyết định cho backlog bài 04 đến 06 và quy tắc "không tự merge" của bài 07 (14/11/2026, D80, D81)

**Site không đổi, không có chữ mới.** Chủ dự án chọn qua hộp hỏi lựa chọn sau khi cụm 3 bài đã ở bản nháp: "Tách, viết sau cụm (D61)" cho #39; "Bài riêng, kèm ngoại lệ cho D58" cho #41 (Gemini Orchestrator); "Bản khung và giả thuyết, ghi rõ chưa đo" cho #40; "Giữ nguyên, đó chỉ là khuyến nghị cho người đọc" cho quy tắc "agent không tự merge vào `main`" của bài 07. Ghi ở `docs/08` D80 và D81; chưa viết gì cho #39 đến #41 (D61). Refs #39, #40, #41, #57.

## Bài 03: mở docs effort và model, sổ nguồn 22 dòng, bản nháp đầu (14/11/2026)

**Site không đổi, không có chữ mới** (`editorial/`). Mở bài *Spending your effort* (S11), docs *Effort* của nền tảng và *Model configuration* của Claude Code. Phát hiện chính: **mức effort mặc định khác nhau theo bề mặt**, nên mâu thuẫn trong brief giải được (brief 01 "Fable và Opus đều medium" đúng với Claude Code; memo 4 "Fable high, Opus medium" đúng với API); tên mức được chấm riêng cho từng model; mọi chỉ dẫn của docs đều dặn tự đo; `max` trong Claude Code chỉ áp cho phiên hiện tại. Tác giả chọn luận điểm "bắt đầu bằng model đủ mạnh ở effort vừa, có kiểm chứng và leo thang có giới hạn" và không dùng chuyện cá nhân (14/11/2026, hộp hỏi lựa chọn); vì docs không khuyên "medium" cho mọi model, bản nháp thu hẹp thành "mặc định của model" và ghi ở `brief.md` để tác giả xác nhận. Giá, benchmark, "70 đến 85%" không dùng. `status` của bài 03 từ `memo` sang `draft`. Refs #38.
## Mục Bài viết, lát 3: cơ chế tranh (banner, ảnh tĩnh ở thẻ), tranh tạm, phép đo ngân sách (14/11/2026, D77, D78, D79)

**Bản ghi duyệt tranh (do agent ghi, không phải chủ dự án), D55:** 14/11/2026, phiên Claude Code. Chủ dự án nhận trang nháp ba hướng (bình minh bảng màu hoàng hôn, bình minh đổi màu, mặt nước một sắc) và trả lời câu chọn hướng bằng câu hỏi "Theo nội dung bài được không", không chọn A, B hay C; tôi không coi đó là duyệt. Câu hỏi tiếp theo, hộp hỏi lựa chọn "Tranh dawn": chủ dự án chọn "Làm tranh tạm cho trang thử, tranh thật theo nội dung từng bài (Recommended)" (lựa chọn có sẵn, không phải câu tự viết). Vậy `dawn` (hướng A) chỉ là tranh tạm cho trang thử `/articles/sample/` và tranh dự phòng; tranh thật của từng bài theo nội dung bài, chọn từ bản nháp HTML riêng của bài đó (D79). Chiều cao banner: chủ dự án chọn "Giữ 160 đến 280px". Mỗi bài có một tranh qua `art`; tranh là dữ liệu trong `site/src/lib/article-art.ts` (nguồn vẽ của design system, tuỳ chọn, chế độ màu, mức "thở"), nên thêm tranh là thêm một mục; bảng màu hoàng hôn là mặc định và ghi đè qua tuỳ chọn. Nguồn vẽ mới `dawn` ở `design-system/components/bundle.js` (không sửa nguồn có sẵn). Trang bài có banner sống phía trên tiêu đề (hội tụ từ nhiễu 2,4 giây rồi thở; dừng khi ra khỏi màn hình hay tab ẩn; reduced motion hiện khung cuối ngay; `aria-hidden`); thẻ ở chỉ mục có ảnh tĩnh vẽ một lần khi thẻ gần màn hình, tối đa 1.500 ô, không vòng lặp. `check.cjs` thêm mục 4b đo trên `/articles/sample/`: số ô (≤12.000 desktop, ≤4.000 điện thoại), số canvas sống (≤2), chi phí lúc đứng yên (dưới ngưỡng ô vẽ của trang chủ và ≤8% luồng chính), không vẽ khi ra khỏi màn hình, và reduced motion có hình ngay. Đo được (bản dựng thật, tranh `dawn` mặc định): banner desktop 1.955 ô, 1 canvas sống, 14 lần vẽ ký tự mỗi giây lúc đứng yên, luồng chính bận 2,5%, 0 lần vẽ khi ra khỏi màn hình; điện thoại 351 ô, 9 lần vẽ mỗi giây, 2,5%; reduced motion 43.247 điểm ảnh đã vẽ sau 0,8 giây. `art-check.cjs` cho đúng kết quả như `main` (8 mảnh lệch có sẵn, không thêm). Cách thêm tranh ghi ở `docs/24` §6. Refs #44.
## Bài 02: đóng bốn việc kiểm chứng còn lại, bản nháp đầu (14/11/2026)

**Site không đổi, không có chữ mới** (`editorial/`). Mở trang `agent-view` của Claude Code và hai bài support.claude.com về memory của Chat và Cowork, bằng công cụ tải trang. Kết quả: không có câu nào nói auto memory không chạy ở phiên nền (bỏ claim khỏi bài); memory của Chat dùng chung với Cowork trên cloud, Cowork chạy trên máy thì không dùng; xoá hội thoại không xoá memory sinh ra từ nó (memory hiện hành), ngược với memory kiểu cũ. Sổ nguồn từ 15 lên 19 dòng. Tác giả chọn luận điểm "nhớ tôi" khác "biết cách làm việc trong repo này" và không dùng chuyện cá nhân (14/11/2026, hộp hỏi lựa chọn); có `draft.md` đầu tiên (agent viết, chưa phải giọng tác giả), `status` của bài 02 từ `ledger` sang `draft`. Refs #37.

## Bài 01: mở bài gốc, sổ nguồn 19 dòng, blind spot pass, bản nháp đầu (14/11/2026)

**Site không đổi, không có chữ mới** (bản nháp nằm ở `editorial/`). Mở bài gốc của Anthropic ngày 14/11/2026: URL chuẩn là `claude.dev/blog/...` (`claude.com` trả 308 sang đó), câu 80% ghi nguyên văn, tác giả và ngày khớp `docs/14`. Phát hiện chính: bài gốc nói một phần "removed" là chuyển review code và kiểm chứng sang skills nạp khi cần, không tách phần bỏ hẳn; con số 80% là của prompt Anthropic mà người dùng "likely never modify"; bài không nêu baseline, số token, cỡ mẫu, chi phí hay caching, và không nói người dùng phải dặn tường minh mục tiêu hay quyền (đó là suy luận của memo). Đo từ repo: ba prompt dán tay 25.925 byte so với `AGENTS.md` 7.899 byte, kèm lời rào rằng đây không phải phép đo giảm 80%. Tác giả chọn luận điểm "80% là của prompt Anthropic, không phải lời khuyên cắt 80% của bạn" và không dùng chuyện cá nhân (14/11/2026, hộp hỏi lựa chọn), nên dòng đo từ repo không vào bài. Có `draft.md` đầu tiên (agent viết, chưa phải giọng tác giả); `status` của bài 01 từ `memo` sang `draft`. `docs/07` mục 3 và `docs/24` §9 mục 2 (URL chuẩn) đóng. Refs #36.

## Mục Bài viết, lát 2: trang bài, trang chỉ mục, mục menu, gói chữ giao diện (13/11/2026, D78)

Vẫn chưa có bài nào được đăng: mục menu và nút trên thanh đầu chỉ hiện khi có ít nhất một bài (trang thử không tính), nên người đọc chưa thấy gì mới ngoài `/articles/` (chỉ có tiêu đề, noindex) và trang thử `/articles/sample/`. **Chữ mới:** gói chữ giao diện của mục Bài viết (nhãn menu, dòng ngày, loạt bài, mục lục, đọc thêm, báo sai, điều hướng, chú thích cuối). **Bản ghi duyệt (do agent ghi, không phải chủ dự án):** 13/11/2026, phiên Claude Code, hộp hỏi lựa chọn "Gói chữ", liệt kê từng chữ của gói; chủ dự án chọn "Duyệt tất cả như đề xuất (Recommended)", là lựa chọn có sẵn chứ không phải câu tự viết. Phần chữ thử thêm ở lát 2 (bảng, khung nhấn, khối prompt, chú thích cuối, alt ảnh trong `sample.md`) hộp chỉ nêu bằng tên tệp, chưa dán toàn văn; tôi coi lựa chọn gồm nó và nói rõ ở đây. Làm: `Article.astro` có tiêu đề, byline từ `config.ts`, dòng ngày kèm nhãn "Cần kiểm chứng lại · quá 30 ngày" tính lúc xem, nhãn loạt bài, mục lục (từ bốn H2; cột bên dính ở ≥1024px, `<details>` gập ở điện thoại, đánh dấu mục đang đọc), khung nhấn `<aside>`, nút Chép cho khối mã và prompt, chú thích cuối, ảnh và SVG, khối `related`, hộp báo sai điền sẵn issue, điều hướng trong loạt và theo ngày (bỏ dòng trùng). Bảng markdown thành thẻ trên điện thoại, mỗi ô mang nhãn cột, vẫn là `<table>` có vai trò ARIA. Link bắt đầu bằng `/` tự thêm đường dẫn gốc của site; link ngoài mở tab mới. Thêm trang chỉ mục `/articles/` (thẻ nhóm theo loạt, bài lẻ sau). Cú pháp viết bài ghi ở `docs/24` §6. Đo được: `design-check.cjs` lần đầu bắt 35 lỗi giao diện của chính lát này (mục tiêu chạm dưới 40px, nhãn cột chồng chữ, dòng mã dài tràn dưới mục lục), đã sửa ở CSS và chạy lại xanh; không đổi luật kiểm. Chưa có: tranh và ảnh tĩnh (lát 3). Refs #44.

## Mục Bài viết, lát 1: nền (collection, schema, route, trang thử, sitemap dựng từ dữ liệu) (13/11/2026, D78)

Chưa có bài nào được đăng, nên người đọc không thấy gì mới ngoài trang thử `/articles/sample/` (noindex, không liên kết, không có trong sitemap). Thêm collection `articles` (chỉ bài đã đăng) và `articleFixtures`, schema frontmatter, hai route `/articles/<slug>/` và `/articles/sample/`; `sitemap.xml` dựng từ `PARTS` và từ collection, không còn sửa tay cho bài mới. Build hỏng khi: frontmatter sai (kể cả ngày không tồn tại, ngày không đặt trong nháy, khoá lạ), `art` lạ, `related` không tìm thấy, tên file không đúng kebab-case hoặc là `sample`, ảnh hay SVG thiếu alt; không hỏng khi thiếu nguồn hay link ngoài chết. Đo được: 14 trường hợp sai đều làm `astro build` thoát mã 1 với đúng thông báo; 2 trường hợp đúng (kể cả cú pháp ảnh nằm trong khối mã) thì qua và bài hiện trong sitemap. **Bản ghi duyệt (do agent ghi, không phải chủ dự án):** 13/11/2026, phiên Claude Code, hộp hỏi lựa chọn "Gói chữ". Hộp liệt kê các chữ giao diện của lát 1 và 2 và nêu trang thử bằng đường dẫn `site/src/content/article-fixtures/sample.md`. Chủ dự án chọn "Duyệt tất cả như đề xuất (Recommended)", là lựa chọn có sẵn chứ không phải câu tự viết. `check.cjs` và `design-check.cjs` thêm `articles/sample/` vào danh sách trang. Chưa có: trang chỉ mục, byline, ngày, mục lục, bảng thành thẻ, nút Chép, tranh (lát 2 và 3). Refs #44.

## Tranh Bài viết ngoài khoá art, và #44 cắt thành ba PR (13/11/2026, D77, D78)

Không đổi site, không có chữ mới. Chủ dự án chọn trong phiên Claude Code, hộp hỏi lựa chọn: "Ba PR (Recommended)" cho cách cắt #44 và "Không, chỉ qua ngân sách đã đo (Recommended)" cho câu tranh Bài viết có vào khoá art không. Đây là lựa chọn có sẵn, không phải câu chủ dự án tự viết; bản ghi do agent viết. `AGENTS.md` §2 thêm một câu ở dòng art; `docs/08` §1f thêm D77 và D78. D77 chỉ nói về tranh Bài viết; hình mở chương vẫn theo `docs/19` §2. Refs #43, #44.

## Ngôn ngữ của code: tiếng Anh cho code và commit, tiếng Việt cho chữ người đọc, PR và issue (13/11/2026, D76)

Không đổi site, không có chữ mới. Chủ dự án chọn (13/11/2026, phiên Claude Code, hộp hỏi lựa chọn: "Ghi: code và commit tiếng Anh, PR/issue tiếng Việt"). Thêm một đoạn ở `AGENTS.md` và dòng D76 ở `docs/08` §1f; số D trong hai chỗ trỏ đã cập nhật. Sửa dòng "PR text in English" ở issue #44 cho khớp. Refs #44.

## Bớt chi phí CI theo lựa chọn của chủ dự án: deploy gọn hơn, PR chỉ đổi tài liệu bỏ qua bộ kiểm site (13/11/2026, D74)

Không đổi site, không có chữ mới. **Nới có chủ đích, do chủ dự án đồng ý rõ (13/11/2026, trong phiên Claude Code):** (1) `Deploy site` chỉ build và chạy `check.cjs`, không chạy lại type-check và design-check, vì PR đã qua đủ bộ và `main` được bảo vệ; (2) PR chỉ đổi tài liệu (`docs/`, `editorial/`, `.claude/`, `*.md` ở gốc, `LICENSE`, `.ignore`) bỏ qua các bước nặng của `Check site`. Chủ dự án chọn "paths-ignore"; tôi làm bằng một bước nhận diện phạm vi trong cùng job `check` thay vì `paths-ignore`, để job vẫn chạy và báo xanh: nếu `main` bắt buộc status `check` thì PR tài liệu không bị kẹt. Mọi PR đổi file khác vẫn chạy đủ bộ. Ghi ở `docs/08` §1f (D74), `AGENTS.md` §4, `docs/README.md`, `docs/13`. Đo sau lần chạy đầu: thời gian một PR chỉ đổi tài liệu và thời gian một lần deploy (trước đây mỗi lần khoảng 8 phút); số đo ghi ở mô tả PR.

## CI nhanh hơn: cache trình duyệt Playwright, huỷ lần chạy cũ (13/11/2026)

Không đổi site, không đổi phép kiểm nào, không có chữ mới. `check.yml` và `deploy.yml` có biến `PW_VERSION` dùng chung (trước đây số phiên bản viết cứng trong lệnh). Bản đầu của PR này còn cache `~/.cache/ms-playwright`; **đo thật cho thấy cache không giúp** (bước cài Chromium mất 19 giây khi chưa có cache, và 4 giây khôi phục cộng 31 giây cài khi có cache; tổng job 8 phút 11 giây so với 8 phút 29 giây), vì thời gian nằm ở phần cài thư viện hệ thống bằng `apt`, nên cache được gỡ ở PR D74; `check.yml` có `concurrency` huỷ lần chạy cũ khi đẩy commit mới lên cùng một PR (`deploy.yml` giữ nhóm `pages`, không huỷ). Đo được: chỉ còn huỷ lần chạy cũ là có tác dụng (mỗi lần đẩy thêm commit lên PR không còn chạy song song hai lần 8 phút). Phần nới phép kiểm chủ dự án đã đồng ý (deploy bớt bộ kiểm, PR chỉ đổi tài liệu bỏ qua bộ kiểm site) nằm ở PR riêng (D74).
## Dọn file bytecode Python bị theo dõi nhầm (13/11/2026)

Không đổi site, không có chữ mới. Gỡ `tools/__pycache__/contrast.cpython-313.pyc` khỏi git và thêm `.gitignore` ở gốc (`__pycache__/`, `*.pyc`), vì `tools/contrast.py` sinh lại tệp này mỗi lần chạy. Đo được: `git ls-files | grep -c pycache` từ 1 xuống 0. Các mục dọn khác của `/skill-doctor` (nhánh đã merge, ảnh tham khảo, `previews/`) chưa làm theo lựa chọn của chủ dự án.

## Thẻ chia sẻ theo thông điệp hiện hành: title, meta description, og.png (13/11/2026)

Refs #24 (F-005). **Duyệt chữ:** 13/11/2026, trong phiên Claude Code, chủ dự án trả lời "Duyệt tất cả như đề xuất" cho gói chữ F–J (bản ghi do agent viết, theo `AGENTS.md` §3). Trang chủ: thẻ `<title>` thành "No Babysitting · Giao trọn việc cho Claude, thôi cầm tay chỉ việc"; meta description (và `og:description`) thành "Claude đã khôn hơn rồi, sao bạn vẫn còn phải trông trẻ? Hãy cùng Claude làm rõ công việc, rồi giao trọn phần thực thi cho em nó. Hướng dẫn không chính thức." (chỉ ghép các câu hero đã có). `og.png` dựng lại bằng `tools/make-brand-assets.js` với hai dòng của hero và dòng "Dự án cộng đồng độc lập · không phải trang chính thức của Anthropic". Các trang khác giữ nguyên mô tả chung. Đo được: sha256 của `og.png` khác `2df0bcbc…32d2`; meta description chứa `trông trẻ`; `<title>` dài hơn "No Babysitting" và có dấu tiếng Việt.
## Chương 04 và Bài 2: lời hứa khớp nguồn, phép kiểm yếu, buông tay tới đâu (13/11/2026)

Refs #20 (F-001), #27 (F-008). **Duyệt chữ:** 13/11/2026, trong phiên Claude Code, chủ dự án trả lời "Duyệt tất cả như đề xuất" cho gói chữ F–J (bản ghi do agent viết, theo `AGENTS.md` §3). Chương 04: "Sau đó thì cứ yên tâm để em nó chạy" thành "Sau đó mới tới lúc để em nó chạy, và vài lần chạy đầu của việc mới thì vẫn nên xem kỹ"; "Claude sẽ tự làm tiếp cho tới khi qua được, còn bạn không phải ngồi xem nữa" thành "Claude thường sẽ tự làm tiếp… có lúc em nó dừng sớm… hãy dùng `/goal` hoặc Stop hook" (nguồn Best practices). Mục mới "Phép kiểm yếu cũng đánh lừa được bạn" (nguồn Prompting best practices) và mục mới "Buông tay tới đâu" (hai câu hỏi hoàn tác và đi ra ngoài; ba mức cho phép, hỏi trước, chặn; nguồn trang Permissions, thêm S16 và S17). Bài 2 có khối tự giới thiệu hai câu hỏi và ba mức, ngay trước mục "Viết ra". Giới hạn: tôi không tìm được nguồn chính thức cho việc Claude "sửa chính phép kiểm", nên mục phép kiểm yếu chỉ nói điều nguồn nói (Claude đôi khi làm cho bài kiểm qua hơn là giải đúng việc). Một chỗ khác bản đã duyệt: "Phép kiểm yếu, ví dụ…" thành "Một phép kiểm yếu, ví dụ…" (thêm chữ "Một") để cụm `phép kiểm yếu` có dạng chữ thường mà phép đo của #27 so khớp. Cụm này không là từ vàng vì `design-check` cho tối đa 5 từ vàng mỗi phần. Đo được: /04/ có `ra ngoài`, `cho phép`, `hỏi trước`, `chặn`, `phép kiểm yếu`; đề Bài 2 có `hoàn tác`, `ra ngoài` và ba mức trước mục "Viết ra".
## Người duy trì, ngày kiểm chứng, link giấy phép MIT ở chân trang (13/11/2026)

Refs #22 (F-003). **Duyệt chữ:** 13/11/2026, trong phiên Claude Code, chủ dự án trả lời "Duyệt tất cả như đề xuất" cho gói chữ F–J, và chọn "taiseixx" làm tên người duy trì; về ngày, "ghi ngày để biết bài được viết ngày nào là được, đừng làm quá lên" (bản ghi do agent viết, theo `AGENTS.md` §3). Mục "Về dự án" ở chân trang có thêm "Người duy trì: taiseixx (link github.com/taiseixx) · kiểm chứng ngày 13/11/2026. Thấy chỗ sai? Báo sai trên GitHub."; chữ "MIT" là link tới `LICENSE` của repo; ở chương 01 "Tác giả kể rằng" thành "Tác giả bài gốc kể rằng" (tác giả là ông Thariq Shihipar của bài nguồn, không phải người làm trang). Ngày và tên nằm ở `site/src/config.ts` (`SITE.verifiedAt`, `SITE.maintainer`). Giới hạn: ngày 13/11/2026 là ngày đối chiếu nguồn gần nhất cho chương 04, các câu về Cowork và nguồn chương 00; chủ dự án chọn không đối chiếu lại toàn bộ 00–03 trong đợt này. Đo được: chân trang có link `github.com/taiseixx`, chuỗi `kiểm chứng` kèm ngày, và "MIT" là link.
## Chương 00: hộp "Bạn đang ở đâu?" (13/11/2026)

Refs #26 (F-007). **Duyệt chữ:** 13/11/2026, trong phiên Claude Code, chủ dự án trả lời "Duyệt tất cả như đề xuất" cho gói chữ F–J (bản ghi do agent viết, theo `AGENTS.md` §3). Cuối chương 00 có mục "Bạn đang ở đâu?" với ba dòng cho chat, Cowork và Claude Code (nguồn: tổng quan Cowork và tổng quan Claude Code, thêm S18, S19) và một dòng chỉ đường cho người chưa biết chọn gì. Một chỗ khác bản đã duyệt: dòng chat có thêm ", tức chat," để cụm `chat` có dạng chữ thường mà phép đo của #26 so khớp. Chưa làm: đổi câu đố ở chương 04 sang tình huống không cần kiến thức kỹ thuật (phần thứ hai của đề xuất #26), chờ track Nhập môn. Đo được: chương 00 có `chat`, `Cowork`, `Claude Code` trong cùng một khối.
## Nguồn bấm được ngay trong đoạn; hai câu về Cowork đối chiếu lại (13/11/2026)

Refs #31 (F-012). **Duyệt chữ:** 13/11/2026, trong phiên Claude Code, chủ dự án trả lời "Duyệt tất cả như đề xuất" cho gói chữ F–J (bản ghi do agent viết, theo `AGENTS.md` §3). Nhãn nguồn ở cuối đoạn ("S2 · S14") trước đây là chữ thường; nay mỗi nhãn là link tới nguồn, mở tab mới, có tên đầy đủ cho trình đọc màn hình và vùng bấm rộng 40px trên điện thoại (không đổi chữ). Hai câu về Cowork đối chiếu với tài liệu Cowork (trang "Organize work with projects", thêm làm nguồn S15): bỏ "khác hẳn" vì tài liệu Claude Code nói phiên Cowork trên máy tính cũng nạp `~/.claude/CLAUDE.md`; câu về hướng dẫn thành "phần Instructions (hướng dẫn) của project (dự án), áp dụng cho mọi phiên trong project đó"; câu về bộ nhớ thành "Cowork cũng có bộ nhớ, tính riêng cho từng project và giữ lại giữa các phiên". Hai câu trích của Boris Cherny có trong README của claude-code-best-practice (mục Tips and Tricks, ghi nguồn từ Boris Cherny); chưa mở được bài đăng gốc trên X để xác minh. Đo được: đoạn chứa "Boris Cherny" có `<a>` trong cùng khối.

## Tự host font: không còn request tới Google (13/11/2026)

Refs #28 (F-009). Không có chữ mới. Archivo, Be Vietnam Pro, JetBrains Mono và Newsreader nay nằm ở `site/public/fonts/` (27 tệp `woff2`, 840 KB; trình duyệt chỉ tải tệp có ký tự trang cần nhờ `unicode-range`) kèm `fonts.css` với đường dẫn tương đối. Giữ đúng họ, độ đậm, trục và nghiêng thật như trước; chỉ giữ ba bộ ký tự dùng cho tiếng Việt (latin, latin-ext, vietnamese), bỏ Cyrillic và Hy Lạp vì trang không dùng. `tools/fetch-fonts.cjs` tải lại được. Bỏ hai `preconnect` và liên kết Google Fonts khỏi `Base.astro`. Dòng riêng tư ở chân trang vốn chỉ nhắc GoatCounter nên nay khớp thực tế. Đo được: tập host của mọi request trên các trang đã quét chỉ còn `localhost` (bản live: `no-babysitting.github.io`) và GoatCounter; bộ kiểm xanh (xem PR). Các trang xem trước trong `design-system/` vẫn tải từ Google Fonts; không phải bản live.
## Một nơi cho chỉ dẫn agent: AGENTS.md, quyết định D67–D73 (13/11/2026)

Refs #32 (F-013), #34 (F-015). Không có chữ mới trên site. Thêm `AGENTS.md` (vai trò, ai merge gì, duyệt chữ, phép kiểm không được tự nới, nơi đặt chỉ dẫn, truy vết, tách người viết, duyệt, đánh giá) và `CLAUDE.md` chỉ nạp nó. `docs/08` §1f ghi D67–D73; `docs/17` ghi đã dùng xong, `docs/20` hết hiệu lực, `docs/22` đã thực hiện; `docs/21` và `docs/23` nay cùng một phát biểu về vai hội đồng (D71); câu hỏi mở 1 ở `docs/19` §9 có trả lời. Thêm bước CI "Phép kiểm đã đổi" (vài giây, chỉ `git diff`, không bao giờ làm đỏ CI) in vào Job Summary các file phép kiểm đã đổi. Thêm `implementation-notes.md`. Giới hạn đã nêu trong `AGENTS.md` §4: bước CI là chứng cứ để phát hiện, không ngăn chặn. Chưa làm: hiến chương trong `docs/independent-evaluation-council/` (PR #19 chờ chủ dự án duyệt); mục "chờ duyệt" cũ trong CHANGELOG chưa có bản ghi duyệt.
## Lỗi tiếp cận nhỏ còn lại: hộp thoại Lens, nhãn vùng trùng, landmark, robots.txt (13/11/2026)

Refs #30 (F-011). Không có chữ mới. Hộp thoại Lens thành `<dialog>` mở bằng `showModal()` (có `aria-modal="true"`): phần còn lại của trang bị khoá khi mở, Tab quay vòng trong hộp, Esc đóng và trả focus về nút Lens, bấm ra ngoài thì đóng. Vùng chứa câu tuyên ngôn ở trang chủ bỏ `aria-labelledby` để câu không được đọc hai lần. Khối ghi chú của chương (`aside`) thành `div role="note"` để hết lỗi axe `landmark-unique` ở /01/ và /03/. Thêm `robots.txt` (cho phép tất cả, nêu sitemap). Giới hạn đã biết: trình thu thập chỉ đọc `robots.txt` ở gốc host, mà trang này nằm dưới `/no_babysitting_anymore/`, nên tệp nằm ở `/no_babysitting_anymore/robots.txt`; tệp ở gốc `no-babysitting.github.io` thuộc repo Pages của tổ chức. Đo được: phép thử bằng trình duyệt cho Lens (mở, Tab, Esc, bấm ngoài, chọn); bộ kiểm xanh (xem PR).
## Bản live cho biết đang chạy commit nào (13/11/2026)

Refs #33 (F-014). Không có chữ mới. Bước mới trong `deploy.yml`, ngay trước khi xuất bản, ghi `dist/build.json` với `sha` (đủ 40 ký tự hex), `short` (7 ký tự) và `built_at` (UTC). Đo được: sau triển khai, GET `/no_babysitting_anymore/build.json` trả 200 và `sha` bằng commit của lần triển khai (đối chiếu với `git rev-parse origin/main` tại thời điểm merge).


## Ẩn Library, gỡ chữ nội bộ khỏi trang Nâng cao (13/11/2026)

Refs #21 (F-002). Library chưa có nội dung thật nên ẩn tạm: không còn trong menu, nút Finale, trang 404 và sitemap; địa chỉ `/library/` chuyển ngay về trang chủ (noindex). Bốn nhãn `b1–b4` của trang Nâng cao thành comment trong mã, hai vùng `b2`, `b3` bỏ `aria-labelledby` vì nhãn không còn. Không có chữ mới: chỉ xoá hai chữ "ở b2" khỏi "Chốt dự đoán ở b2 để mở mô phỏng", vì nhãn b2 không còn hiện; và xoá "đặt trong ContradictionNote," (tên thành phần của design system) khỏi dòng chú thích của đồng hồ context. Hai danh sách trang của `check.cjs` và `design-check.cjs` bỏ `library/` vì trang không còn. Đo được: `dist/` không còn chữ `library` ở sitemap, trang chủ, 404; bộ kiểm xanh (xem PR).

## Khung mục Bài viết và gói bàn giao cho cụm 3 bài (13/11/2026)

**Site chưa đổi.** Đợt này chỉ chốt kế hoạch và đặt chỗ cho bản nháp.

- **Quyết định D57–D66 và D75** (`docs/08` §1e; đầy đủ ở `docs/24`): mục Bài viết riêng, trục Claude, nháp chung repo nhưng ngoài `site/`, giọng "tôi", chuẩn nguồn nhẹ (một `verifiedAt` cho cả bài), thứ tự 80% → memory → model và effort.
- **`editorial/`**: chỗ cho ý tưởng, memo, sổ nguồn và bản nháp. `.ignore` ở gốc repo cho Grep bỏ qua nó; `editorial/CLAUDE.md` chỉ nạp khi agent đọc file trong đó. Đã thử trong phiên: Grep bỏ qua đúng thư mục và vẫn tìm được khi chỉ đường dẫn thẳng; Glob vẫn liệt kê tên file.
- **Bàn giao**: brief, ba memo của Perplexity và hai phản hồi của ChatGPT lưu nguyên văn ở `editorial/articles/00-cluster/raw/`, đánh dấu chưa kiểm chứng. `editorial/HANDOFF.md` là prompt cho phiên viết bài.
- **Đối chiếu docs**: 11 claim về auto memory và CLAUDE.md của Claude Code đã kiểm với docs ngày 13/11/2026 (`editorial/articles/02-memory/ledger.md`). Claim "auto memory không chạy ở phiên nền" chưa xác nhận được.
- **Dùng lại luật có sẵn, không thêm phần luật mới**: xưng "tôi" là ngoại lệ có phạm vi ngay trong `docs/16` §1; chuẩn nguồn nhẹ là mục 8 trong `docs/06` §1, dùng lại `verifiedAt` thay vì thêm trường mới. Vai, quyền merge và duyệt chữ lấy từ `AGENTS.md` (D67–D73); `docs/24` và `editorial/` chỉ trỏ tới đó. Vòng đời bài và nhãn bằng chứng chỉ nằm ở `editorial/CLAUDE.md`; quyết định chỉ nằm ở `docs/08` §1e.
- **Issues**: #36–#41 (sáu bài), #44 (trang Bài viết, viết bằng tiếng Anh cho coding agent), #43 (rà các rule có thể quá cứng). Spec trang chỉ nằm ở #44; `docs/24` §8 trỏ tới đó.
- **Bài lẻ 07** (`editorial/articles/07-one-writer-many-readers/`, issue #57): bản nháp về multi-agent coding, dựng từ báo cáo nghiên cứu của tác giả. Tác giả quyết không mở lại nguồn; sổ nguồn ghi mọi dòng là `UNVERIFIED` kèm ngoại lệ. Chưa lên site.
- **Chưa làm**: mục Bài viết trên site (#44). Lo ngại về `paths-ignore` cho CI đã được D74 giải quyết.
- **Bản ghi duyệt (do agent ghi, không phải chủ dự án)**: 13/11/2026, trong phiên Claude Code, qua hộp hỏi lựa chọn. Chủ dự án chọn phương án "Merge luôn, sửa bằng PR nhỏ nếu cần (Recommended)" cho câu hỏi về PR này, gồm ba chỗ cần xem: `docs/06` §1 mục 8, dòng mới ở `AGENTS.md` §5, mặc định `/articles/` ẩn khỏi menu. Đây là lựa chọn có sẵn, không phải câu chủ dự án tự viết. Năm câu hỏi ở mô tả PR (mục 4 về quy tắc "agent không tự merge" của bài 07, mục 5 về Gemini) vẫn mở cho tới khi hỏi riêng. CI của lần chạy cuối trên PR này (chỉ đổi tài liệu, bộ kiểm site bị bỏ qua theo D74) hết 7 giây.

## Trang chủ tự chạy, hai bàn tay không chạm, cụm từ nhấn, hover một kiểu (11/11/2026, chờ duyệt)

Theo 6 góp ý của chủ dự án sau khi xem trên máy tính.

- **Cảnh tự chạy** (`motion.ts`, `nbAuto`): hero, hai bàn tay, câu chốt, "Một lần giao việc", Lộ trình và finale tự diễn theo nhịp nội dung khi người xem dừng lại trong cảnh; hero tự chạy ngay sau khi gõ xong dòng chữ. Cảnh vẫn đọc trạng thái từ vị trí cuộn nên tua tới, tua lui như cũ; bất kỳ thao tác nào (lăn chuột, chạm, phím) trả quyền điều khiển ngay. Quãng cuộn ghim rút ngắn: hero 180% → 110%, hai bàn tay 220% → 130%, giao việc 90% → 60% mỗi bước, finale 160% → 100%.
- **Hai bàn tay** (`Spark.astro`): hai ngón dừng cách nhau chừng hai ký tự, không bao giờ chạm. Tia sáng tụ ở khe hở, rồi hình tan chậm: chỉ khoảng một phần tư số ký tự bay ra, cùng một làn sóng ký tự chuyển màu từ vàng nhạt qua cam tới đỏ than, nhạt dần vào nền tối khi cảnh trôi đi. Bỏ đoạn nổ chạy theo đồng hồ; mọi khung hình giờ là hàm của vị trí cuộn.
- **Lộ trình:** sửa lỗi thẻ cuối (04) trên màn hình rộng không bao giờ sáng và số vẫn là nhiễu: thẻ hiện tại tính theo tiến độ của dải, không theo vị trí trên màn hình.
- **Cụm từ nhấn** (`nb-hl`): câu chốt, câu hero, câu tóm tắt của 5 phần, ba chặng và finale có 2 đến 3 cụm sáng màu cam kèm gạch chân, sau khi câu hiện xong.
- **Chữ:** "Kính" → "Lens"; "Vào phần" → "Tìm hiểu ngay" (thẻ 00: "Vào ngó chút bạn mình nhỉ?"); "Trước / Trong / Sau" → "Trước khi chạy / Trong lúc chạy / Sau khi xong". Bài học ghi ở `docs/16` §9.
- **Hover:** mọi nút và chip khi rê chuột đều thành chữ cam, viền cam trên nền trang (trước đây nút nền tối đổi thành chữ đen trên nền sáng).

## Sửa theo góp ý của chủ dự án sau khi test trên iPhone (11/11/2026, chờ duyệt chữ)

- **Lỗi "Một lần giao việc" chồng 7 bước lên nhau** (đổi nhóm việc giữa cảnh ghim): bỏ lệnh tính lại vị trí ở trang không có khối kính. Đã tái hiện và kiểm lại bằng Playwright ở 390×844.
- **Auto memory (phần 03) viết lại theo docs** (đọc lại `code.claude.com/docs/en/memory` ngày 11/11): chuyện Claude tự ghi nhớ và chuyện ghi chú nằm ở máy nào tách thành hai ý riêng.
- **Văn phong:** viết lại chữ của hero, kim tự tháp, finale, 5 phần và trang Thực hành theo lối nói của người Việt, đủ hư từ; "em nó" ở chỗ thân mật, "Claude" ở thân bài; thuật ngữ tiếng Anh lần đầu trong mỗi phần có nghĩa tiếng Việt trong ngoặc. Tên phần tiếng Việt đổi theo (04: "Kiểm kết quả, hỏi vặn lại, rồi từ đó tin tưởng").
- **Trang chủ:** ba chặng Trước, Trong, Sau thành một dòng thời gian liền mạch; bỏ hàng ASCII lặp số ở bước Brief; bỏ nhãn "FINALE · FULL-COLOR"; câu finale thành "Việc đã chạy xong khi bạn về."
- **Bỏ link tới mã nguồn** ở menu và chân trang (giữ nút Góp ý và dòng ghi công).
- **Khối kính và prompt:** viết lại ví dụ theo nghề của cả 5 phần và 10 prompt của phần 01 theo cùng lối văn. Prompt mang đi thử của 00, 02, 04 thêm phần còn thiếu theo chính bài học: mục đích, thế nào là xong, đòi bằng chứng, hỏi lại thay vì đoán.
- **Đo được:** `check.cjs`, `type-check.cjs`, `design-check.cjs` xanh trên máy làm việc.

## Lộ trình chính v4 lên site: 5 phần, kính, trang Thực hành (10/11/2026, chờ duyệt chữ)

Đợt UX3 của `docs/19`, theo thứ tự ở `docs/17` §1. Chữ mới chờ chủ dự án duyệt (D13); bản xem trước nằm trên artifact, chưa merge.

- **Trang chủ** theo `docs/14` §5: chữ hero mới, kim tự tháp thay phần tuyên ngôn (giữ mặt nước), bỏ "Hai lần tung đồng xu", Lộ trình còn 5 panel, finale `05 / 05`.
- **Năm phần 00–04** (`site/src/content/parts.ts`, trang `[part]`): Hook, Lõi, Kết; ba điểm dừng mỗi phần; tối đa 5 golden word; khối kính đủ 10 biến thể; prompt mang đi thử có nút Chép; giả lập grill me ở 01 và 04; danh sách nguồn bấm được ở cuối mỗi phần.
- **Kính:** nút trên header và hàng chip ở phần 00, lưu `nb-lens`, dùng chung lựa chọn với bộ chọn nhóm việc của "Một lần giao việc".
- **Trang Thực hành** (`/thuc-hanh/`): ba bài tự làm từ `docs/23` §6, phần tự soát đóng sẵn.
- **Menu:** Lộ trình chính · Thực hành · Nâng cao (A1 = c02). Mười một trang khung v3 thành trang ngắn "đang được viết lại", `noindex`, không còn trong sitemap; nội dung v3 vẫn ở `docs/02` và `chapters.json`.
- **Bộ kiểm:** `check.cjs` và `design-check.cjs` đo các trang mới; thêm luật `gold` và `hold-count` (`docs/15` §9), luật thẳng hàng cho ba nhánh kim tự tháp; bỏ cảnh `#flips`. Luật demo tạm không có trang nào để đo.
- **Đo được:** `check.cjs`, `type-check.cjs` (kèm `--selftest`), `design-check.cjs` đều xanh trên máy làm việc. `art-check.cjs` báo 2 mảnh: canvas mặt nước đổi kích thước (1440×616 so với 1440×747; 390×723 so với 390×880) vì phần chữ phía trên nó ngắn lại; cách vẽ không đổi. Chưa cập nhật `art-lock.json`, chờ chủ dự án xem.
- **Chưa làm ở đợt này** (chủ dự án chọn test chữ trước): 5 hình ASCII mở chương, mascot bên lề, hiệu ứng M15 và M17, 3 nhóm việc mới của "Một lần giao việc", luật `pins` (UX2), dọn luật lặp (UX1).

## Khoá ASCII art, kế hoạch kaizen UI/UX, prompt cho agent mới (09/11/2026)

- `site/scripts/art-check.cjs` + `design-system/art-lock.json`: khoá 8 mảnh art ở 1440 và 390 (logo hero, mặt nước, thành phố ở finale, tranh trong menu, Spark ở 4 thời điểm), ảnh nguồn của Spark và mặt mascot. Chạy trong CI ở chế độ chỉ báo, không chặn merge (bước *Art lock*, artifact `art-report`). Đo ba thứ: bố cục, bảng màu, lượng art; ngưỡng đặt trên mức lệch giữa máy làm việc và CI. Thử: bỏ hệ số làm sáng màu của Spark thì cả 8 mảnh Spark bị bắt (D55).
- `docs/19-uiux-kaizen-plan.md`: đối chiếu nhận xét *ASCII & Motion Design Direction* với site; đo được trang chủ đang ghim 21,8/29,2 màn ở desktop (75%), đề xuất ngân sách ≤ 12 màn; các đợt UX0–UX6.
- `docs/20-handoff-prompt-deepseek.md`: prompt cho coding agent DeepSeek v4.1 Flash. Chờ chủ dự án duyệt.

## Cảnh Spark, sửa theo góp ý (09/11/2026)

- Vào cảnh: bức tranh hiện dần từng ký tự ngay lúc hero cuộn đi, không còn khoảng đen.
- Điện thoại: bắt đầu thấy trọn bức tranh rồi mới zoom vào hai ngón tay; mật độ ký tự như máy tính (khoảng 150 cột trên mọi màn hình).
- Ánh sáng khi chạm và khi nổ dựng hoàn toàn bằng ký tự trên lưới ASCII (lõi có nhiễu, tia đứt quãng `- \ | /`, vòng ký tự lan ra), bỏ gradient và nét vẽ trơn. Sửa lỗi tính góc khiến nửa trên thành mảng '@' phẳng.
- Điểm chạm dời về 94% quãng ghim, ghim ngắn lại còn 220%: cú nổ diễn ra lúc sân khấu cuộn đi, bớt dải tối sau cảnh.
- Đã chạy `check.cjs`, `type-check.cjs`, `design-check.cjs`: không lỗi.

## Cảnh Spark: hai bàn tay chạm nhau rồi nổ (09/11/2026)

Theo yêu cầu của chủ dự án, ngay sau hero có thêm cảnh mới. Hai bàn tay lấy từ ảnh chủ dự án gửi (bích hoạ *Sáng tạo ra Adam* của Michelangelo, phạm vi công cộng), nền vữa được tách bỏ, phần còn lại dựng thành ASCII nhiều màu. Cuộn xuống: toàn cảnh bức bích hoạ zoom dần vào hai ngón tay, ký tự tan sang ảnh cận cảnh, rồi hai bàn tay xích lại; chạm nhau thì nổ (chớp cam, vòng sóng ký tự, các ký tự văng ra), rồi về nền tối và trang hiện phần tiếp theo. Chi tiết ở `docs/09` §1, ghi công ở `THIRD_PARTY_NOTICES.md`. Đã chạy `check.cjs`, `type-check.cjs`, `design-check.cjs`: không lỗi; lúc đứng yên cảnh không tốn gì.

## README mới (08/11/2026)

README chỉ còn phần cốt lõi: ảnh đầu (logo khối trên cảnh thành phố hoàng hôn ASCII), câu hứa, ba track, GIF mặt nước, thiết kế, tài liệu chính, cách chạy, giấy phép. Ảnh dựng bằng chính runtime ASCII của trang (`tools/readme-art.cjs`, ảnh ở `.github/readme/`). Phần README cũ chuyển sang `docs/README.md`, kèm mục lục tài liệu.

## Nhập môn: `/deep-research`, lệnh hay dùng và thuật ngữ (08/11/2026)

`docs/18`: bài N10 dùng lệnh `/deep-research` của Claude Code; thêm bài N13 và §2b, gồm bảng 20 lệnh hay dùng (`/init`, `/plan`, `/clear`, `/compact`, `/context`, `/rewind`, `/memory`, `/model`, `/effort`, `/advisor`, `/goal`, `/loop`, `/deep-research`, `/code-review`, `/doctor`…; đối chiếu trang Commands ngày 08/11) và bảng thuật ngữ AI/Claude hay gặp.

## Sửa v4 và kế hoạch track Nhập môn (08/11/2026)

Chỉ là tài liệu. Theo ý chủ dự án:
- "Một lần giao việc" ở lại trang chủ, thêm 3 nhóm việc (Thiết kế · Bán hàng & khách hàng · Phân tích & yêu cầu). Kính đổi theo 9 nhóm việc này, thay cho 5 kính theo vai; phần 01 viết lại đủ 10 biến thể (`docs/14`).
- Chỗ nào nhắc tới grill me thì có thẻ giả lập câu 1/3 kèm đề xuất (`docs/15` §11; ví dụ ở phần 01 và 04).
- Outline track **Nhập môn Claude** (13 bài, hai tab Claude app / Claude Code, mỗi bài kết bằng một việc làm thật), sau một vòng hỏi 10 câu: `docs/18-intro-track-plan.md`. Quyết định D43–D54 ở `docs/08` §1c.

## Kịch bản v4: Trước, Trong, Sau, xoay quanh six shifts (08/11/2026, đã duyệt)

Chủ dự án duyệt ngày 08/11: giữ câu hero của chủ dự án kèm dòng trả lời; studio hư cấu đổi tên thành “1 tỷ gói mè”.

Chỉ là tài liệu, chưa đổi gì trên site. Chủ dự án muốn viết lại nội dung cho mọi người học. Sau ba vòng hỏi đáp (5 câu tổng quan, 15 câu chi tiết, 4 câu bổ sung), có thêm bốn tài liệu:
- `docs/14-content-script-v4.md`: kịch bản nội dung. Gồm kim tự tháp Minto, trang chủ, năm phần, một câu chuyện chung và năm kính theo vai. Chương 01 đã viết đủ chữ để làm bài mẫu.
- `docs/15-typography-motion-v4.md`: vai chữ, golden word, ba điểm dừng mỗi phần, hiệu ứng M15–M17, art ASCII mở chương theo màu hoàng hôn của Finale, mascot có lời, kính, cách đo.
- `docs/16-writing-guide.md`: văn phong tiếng Việt và tiếng Anh. Gồm hư từ chỉ thời, thể, mức độ, phạm vi; *bị*/*được* và chủ thể; dấu hiệu chữ máy viết; cách trình bày tiếng Anh.
- `docs/17-handoff-prompt.md`: prompt giao cho coding agent, viết theo six shifts, kèm danh sách tham chiếu chính thức.

Quyết định ghi ở `docs/08` §1b (D21–D42). Mười hai phần của v3 thành phần Nâng cao, viết sau. Hai lần tung đồng xu, Vòng giao việc 7 bước và 6 loại việc sẽ bị gỡ khỏi trang. Kiểm lại link bài six shifts: `claude.com/blog/…` nay chuyển hướng (308) sang `claude.dev/blog/…`.

## Mặt nước chuyển động ở phần tuyên ngôn (08/11/2026)

Chủ dự án hỏi lớp ASCII phía sau đoạn tuyên ngôn và bốn con số có đúng ý không, và muốn nó chuyển động. Đó là lớp địa hình ASCII (đường đồng mức, cùng nguồn với phần mở chương), trước đây chỉ mọc lên theo cuộn rồi đứng yên; nhìn giống mặt nước vì nửa dưới dày dần thành các dải ngang. Nay nó **trôi chậm như mặt nước** (tầng N: mỗi tầng nhiễu một hướng, hình lớn đưa nhẹ theo sóng sin, gợn mờ ở nửa dưới), tắt cùng công tắc chuyển động, dừng khi ra khỏi màn hình hoặc tab ẩn. Chi phí đo được: ≈ 3.300 lần vẽ ô mỗi giây và +5% luồng chính ở desktop (≈ 900 và +3% ở điện thoại), 0 khi không hiện. `check.cjs` mục 4 thêm điểm đo thứ ba: dưới 300 lần/giây nghĩa là nước đứng yên (hỏng), trên 6.000 là quá đắt. Chi tiết kỹ thuật: `docs/09` §1.

## Đợt B · trình bày, theo tám nhận xét của chủ dự án trên iPhone (08/11/2026)

Chỉ đổi cách trình bày và chuyển động; **không đổi câu chữ** (phần câu chữ nằm ở đợt C, chờ duyệt theo D13). Luật rút ra và công cụ đo: `docs/13-design-taste.md`.

1. **Hero trên điện thoại.** Bỏ nhãn góc và đồng hồ; logo và câu hứa lên cao, căn trái theo logo; tuyên bố miễn trừ xuống đáy (ở 320px bỏ "cuộn ↓" vì hai dòng in đè nhau). **Header:** nút chuyển động thành icon pixel (tạm dừng / phát) và có nút menu mới; menu phủ cả trang, hình ASCII hội tụ khi mở và tan khi đóng. *Phần phác thảo của chủ dự án có hai cách hiểu. Chủ dự án đã xác nhận cách đang dùng (08/11, D21): icon hamburger trên nút, hình xe đẩy gạch chéo là tranh ASCII trong menu.* Menu khoá phần còn lại của trang (`inert`), Esc đóng, tiêu điểm quay về nút.
2. **Hành trình.** Số lớn căn trái, ghép từ ô nhỏ hơn (4×7 trên điện thoại); bỏ dòng "Hành trình · 12 phần" (chỉ còn bản cho trình đọc màn hình); đếm `01 / 12` theo panel; chương 10 tách khỏi Finale (nội dung ghim không còn bị chính khung ghim cắt).
3. **Vòng giao việc.** Ghim ở cả điện thoại: cuộn là chuyển bước, người đọc giữ nhịp; rail thành hàng 7 số. Bước *Khám phá* bỏ hiệu ứng địa hình vô nghĩa, thay bằng danh sách nguồn sáng lên lần lượt (đang đọc, đã đọc). *Thực thi* và *Kiểm chứng* chữ to hơn, dòng đang chạy và phép kiểm hỏng nổi bật. Co cỡ cho máy ngắn (iPhone SE 375×667, 320×640).
4. **Hai lần tung đồng xu.** Hai cột dùng chung năm hàng, mỗi cặp nằm trên một dòng dù chữ dài ngắn.
5. **Dừng lại để đọc.** `data-hold`: câu hỏi của chương và đoạn tuyên ngôn đứng yên ở giữa màn hình trong 0,6–0,8 màn hình cuộn (chữ của tuyên ngôn sáng dần trong lúc đó); khối cao hơn màn hình thì bỏ qua. Trang câu hỏi không còn là một màn hình trống.
6. **Mô phỏng chạy khi được thấy.** `NB.seen`: AgentWindow, FloatingOps, ThenNowCard, CinematicAscii chờ ở trạng thái `idle` tới khi lên màn hình, rồi chạy chậm hơn (khoảng 9 s, 12 s, 5,5 s, 6 s). "Phát lại" vẫn có. Tab CLI trên điện thoại hết vỡ cột.
7. **Điểm kiểm bấm được.** Mỗi tiêu chí của StatusBoard là một nút (`aria-pressed`), bấm bất kỳ thứ tự. *Chữ của nút lớn "Hoàn thành chương kế tiếp" chưa đổi (đợt C).*
8. **Nút chương kế và mục lục.** Nút có dải khối ASCII đổi màu quét chậm từ trái sang phải (`NB.sweep`, dừng khi tắt chuyển động); dấu cam của chương hiện tại ở mục lục (cuối chương và menu) nháy như con trỏ terminal (`nb-blink`, 1,1 s, chỉ khi bật chuyển động).

Kèm theo: **số đếm thống nhất** (M1 của bản đánh giá): mọi nơi đếm *vị trí trong lộ trình* trên 12 phần (HUD `c03 · 4/12`, góc phải dưới của phần mở chương `04 / 12`, Hành trình, Finale, cảnh kết ở c10 `12 / 12`), thay cho lẫn số chương với số thứ tự (`03 / 12`, `10 / 10`); mọi nút và chip cao tối thiểu 44px trên màn chạm hoặc hẹp (DS); `ScrollTrigger.sort()` để các lớp ghim làm mới từ trên xuống (một đoạn giữ nằm dưới hero từng bị tính vị trí trước hero); `check.cjs` thêm khổ 320px.

**Công cụ mới.** `scripts/shots.cjs` + `sheet.py` (chụp dải khung hình, ghép tờ có số thứ tự, vị trí cuộn) và `scripts/design-check.cjs` (đo đè chữ, chữ bị cắt, dải trống, nút nhỏ, hai cột lệch, câu cần đọc có được giữ không, mô phỏng có chờ được thấy không; ở 390, 375×667, 320 và 1440). Chạy thử vào bản trước đợt này: 3 chỗ lệch hàng, 4 chỗ thiếu giữ, 4 mô phỏng chạy trước khi ai thấy, 2 chỗ thiếu quét/nháy, 192 nút nhỏ ở 390px; ở 320px còn chữ đè nhau ở hero và cột Agentic bị cắt. Bản này qua cả bốn khổ, không vi phạm nào.

## Đánh giá độc lập lần 1 · đợt A: tiếp cận và hạ tầng (08/11/2026)

- **Trình đọc màn hình đọc được các đoạn tách chữ.** Bản đánh giá độc lập báo hiệu ứng tách chữ làm đoạn tuyên ngôn và đoạn giải thích của c02 biến mất. Đã kiểm lại: đúng (ảnh chụp ARIA chỉ có `- paragraph`). Chữ thật nay nằm trong bản chỉ dành cho trình đọc màn hình, phần hình tách chữ bị ẩn khỏi cây truy cập (`splitText` trong `motion.ts`).
- **Nội dung hiện khi cuộn không còn bị ẩn khỏi cây truy cập.** Trước đây GSAP đặt `visibility: hidden` tới khi cuộn tới (16 phần tử ở trang chủ). Nay chỉ giảm `opacity`; các cảnh ghim (Vòng giao việc, Finale) tắt `pointer-events` cho phần chưa hiện và dời pin theo focus bàn phím.
- **Library:** 14 mục không còn là link chết.
- **`<main>` ở trang chủ, skip link ở mọi trang, hai vùng trùng tên ở c10 đã đổi tên**, `role="img"` cho dải luồng song song.
- **Bỏ `aria-live` ở các phần tự chạy** (AgentWindow, FloatingOps, mặt của Vòng giao việc); giữ ở phần người dùng bấm.
- **Cảnh báo GSAP `target not found` ở 13/14 trang:** nguyên nhân là `gsap.set` trên danh sách rỗng; đã chặn.
- **`sitemap.xml` và `404.html`.**
- **Đo:** hai sự kiện GoatCounter không cookie ở c02 (`event-c02-predict` hoặc `event-c02-skip`, và `event-c02-sim-done`).
- **Kiểm tự động mới (`check.cjs`, mục 5):** axe-core với chuyển động bật trên 15 trang; mọi chữ có hiệu ứng hiện dần phải nằm trong cây truy cập (64 đoạn; trên site cũ bắt được 6/8 ở trang chủ); cấm link không có đích. `type-check.cjs` thêm 404.
- Bản phản hồi từng phát hiện: `docs/12-independent-evaluation-1.md`. Quyết định D17–D20: `docs/08`.

## Typography · bộ kiểm và đợt sửa đầu (chờ chủ dự án duyệt cùng K2)

- **Bộ kiểm** `site/scripts/type-check.cjs` đo chữ *đã render* ở 14 trang × 2 khổ (1440, 390): tương phản bằng điểm ảnh, cỡ tối thiểu, dấu tiếng Việt chạm nhau hoặc bị cắt, giãn chữ WCAG 1.4.12, phóng to 200%, nghiêng/đậm giả, ký hiệu rơi sang font khác, độ dài dòng, khoảng dòng, dấu markdown lộ ra, và vài luật nữa. 8 luật lỗi chặn merge, 16 luật cảnh báo. Luật ở `design-system/type-rules.json`; nguồn và cách đo ở `docs/11-typography.md`. Chạy trong `Check site` và `Deploy site`. `--selftest` kiểm chính bộ kiểm bằng hai trang mẫu (một trang sai cố ý, một trang đúng). Skill `typography-check` hướng dẫn phần phải rà bằng mắt.
- **Lần chạy đầu:** 61 lỗi, 153 cảnh báo (gồm cả lỗi của bộ kiểm, đã sửa). Sau đợt sửa: **0 lỗi, 15 cảnh báo** (14 × cỡ chữ tính bằng px, 1 × dấu nháy thẳng; cả hai nằm ở lộ trình, `docs/11` §6).
- **Đã sửa trên site:**
  - Tương phản 2,76:1 ở khối "Hồi đó" (mờ bằng `opacity`) → màu `fg-subtle`.
  - Chữ 10,5–11,5px → 12px.
  - Tiêu đề Vòng giao việc: dấu "Ạ" chạm "Ự" ở dòng dưới → Newsreader, viết thường, khoảng dòng 1,16.
  - Từ tiếng Anh dài tràn panel ở Hành trình khi giãn chữ.
  - Nghiêng và đậm giả (23 chỗ) → xin mặt nghiêng thật, đậm lấy 600.
  - 54 chỗ mũi tên, ✓, ■ vẽ bằng font hệ thống → 5 KB ký hiệu của JetBrains Mono.
  - `--measure: 66ch` cho tới 90 ký tự mỗi dòng → 50ch.
  - Khoảng dòng 1,14–1,3 ở đoạn nhiều dòng → 1,4–1,5; chữ mồ côi ở cuối câu hỏi; cỡ chữ lệch bảng vai chữ; dấu `*làm*` lộ ra ở chương 01; bảng context ở chương 02 `inert` khi còn màn che; `preconnect` tới font.
- **Design system (chờ duyệt):** `--measure` 50ch; vai thân bài 14–19px; thêm vai "dòng prompt"; đậm = 600; mã trong đoạn tối đa 16px.

## K2 · Trang chủ mới (chờ chủ dự án duyệt câu chữ)

- **Ba câu hỏi** dưới tuyên ngôn: *Giao được gì? · Làm sao để nó tự chạy? · Làm sao tin kết quả?*; mỗi câu có một dòng trả lời và một đường dẫn.
- **Vòng giao việc 7 bước** thay cho cảnh "bàn làm việc".
  - Người xem chọn 1 trong 6 loại việc (vận hành, marketing, nghiên cứu, dữ liệu, dựng sản phẩm, sáng tạo); nội dung lấy từ `docs/10` §5.
  - Từng bước: brief bằng số ASCII → Claude nhắc lại và hỏi một câu → khám phá trên địa hình ASCII, công cụ ghi rõ *có sẵn*, *cần connector/MCP*, *cần CLI ngoài*, *tiện ích trình duyệt* hay *hợp sản phẩm khác* → kế hoạch và các luồng song song → nhật ký thực thi → phép kiểm bắt được một lỗi rồi sửa (M13 đúng một lần) → bàn giao, có nút "Duyệt".
  - Desktop: pin, cuộn tới đâu bước chạy tới đó; rail đánh dấu bước hiện tại, kèm The Colleague.
  - Phone: các bước xếp dọc, mỗi bước chạy một lần khi cuộn tới.
  - Reduced motion: hiện thẳng trạng thái cuối.
- Kiểm tra (`check.cjs`, build giống production): tất cả đạt; lúc đứng yên 51 lệnh vẽ/giây ở đầu trang.

## K0.1 · Đo lường (07/11/2026)

- Bật GoatCounter (mã site `taisei`): đếm lượt xem ẩn danh, không cookie, không lưu IP. Chân trang ghi rõ điều này.
- Nút "Trang này có giúp được bạn không?" gửi một sự kiện ẩn danh `feedback-yes/…` hoặc `feedback-no/…` theo từng trang.
- Không đếm khi chạy local, trong CI hay trong artifact (GoatCounter tự bỏ qua localhost và trang trong frame; bản artifact gỡ hẳn script).

## K0 · Beta công khai (07/11/2026)

**Nền yên và nhẹ (D8)**
- Renderer ASCII chỉ vẽ lại khi trạng thái đổi. Hero và finale "thở" chậm, mỗi lần chỉ vẽ lại vài ô; các canvas khác đứng yên khi không cuộn, và dừng khi tab ẩn.
- Đo khi đứng yên, desktop 1440 (Chromium headless):

  | Vị trí | CPU luồng chính trước | CPU luồng chính sau | Lệnh vẽ/giây trước | Lệnh vẽ/giây sau |
  |---|---|---|---|---|
  | Đầu trang | 38,5% | 2,7% | 83.220 | 33 |
  | Finale | 44,3% | 2,3% | 152.580 | 55 |
  | Manifesto | 26,9% | 2,0% | 51.720 | 5 |

- Phone (giả lập iPhone 13 Pro Max): đầu trang 21,8% → 1,6%.

**Vùng yên quanh chữ**
- Hero không còn nhiễu đè lên dòng chữ và các nhãn góc; nhiễu nhạt dần quanh chữ và đậm hơn ở rìa.
- Lời kêu gọi ở finale nằm trên nền đỡ chữ.
- Journey bỏ chữ ghost chồng nhau; số của các chương không ở giữa màn thì mờ đi, tên chương to hơn.

**Số lớn không đè chữ (D6)**
- Khi rời opener, số chương trượt xuống và mờ dần, thay cho cú phóng ×3,4 che tên chương.

**Motion và reduced motion**
- Thêm nút "chuyển động" trên HUD (lưu `localStorage`, tải lại trang). Mọi cảnh hỏi chung một hàm `NB.reduce()`.
- Khi tắt chuyển động, cảnh bàn làm việc hiện trạng thái cuối (4/4, đã kiểm chứng).

**Nói thật**
- Trang chủ đếm đúng những gì đã có: 12 phần trong lộ trình, 1 chương viết đầy đủ, 1 simulator, 14 mục Library mẫu.
- Các chương khác ghi "đang viết"; nút chính dẫn tới chương 02.

**Danh nghĩa (D2, D7, D12)**
- Câu mô tả mới.
- Disclaimer ở hero và ở chân mọi trang.
- Chân trang có giấy phép, ghi công và nút góp ý; GoatCounter chỉ bật khi có mã site.

**Hạ tầng (D10, D14)**
- Base path cho GitHub Pages, favicon, ảnh chia sẻ, meta/OG.
- Workflow `Check site` (PR) và `Deploy site` (`main`).
- `site/scripts/check.cjs`: liên kết, lỗi JS, cuộn ngang, reduced motion, chi phí lúc đứng yên.
