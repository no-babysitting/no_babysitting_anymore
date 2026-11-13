# 24 · Mục Bài viết: khung và bàn giao (13/11/2026)

> Kết quả hai vòng hỏi chủ dự án ngày 13/11/2026 (tổng quan, rồi chi tiết). Quyết định ghi ở §1 và ở `08-kaizen-go-live.md` §1e (D57–D66). Đây là kế hoạch: **site chưa đổi gì**. Bản nháp và gói bàn giao nằm ở `editorial/`.

## 0. Hiện trạng khi bắt đầu

Repo chưa có kế hoạch cho mục blog hay bài viết có tác giả:

- Phạm vi ở PRD §5 là Story, Library, Presenter, Starter Kit, Glossary. Menu hiện có Lộ trình chính, Thực hành, Nâng cao.
- D17 là quyết định duy nhất về tác giả: nêu biệt danh và GitHub, không nêu tên thật. Đó là dòng ghi công, không phải mục bài viết.
- Chữ "blog" trong repo luôn chỉ blog chính thức của Anthropic dùng làm nguồn.
- Site chưa có hạ tầng cho bài dài: nội dung nằm trong `parts.ts`, `chapters.json`, `matrix.yml`; chưa có markdown collection.

Ba chủ đề đầu trùng với kế hoạch hiện có: memory gần Nâng cao A2 và phần 03; model và effort gần A5 (c05b); 80% system prompt là six shifts, đã ở trang chủ (S1). Bài viết vì thế không dạy lại các mục đó. Nó là phân tích có tác giả, có ngày, và dẫn sang mục tương ứng.

## 1. Quyết định (13/11/2026)

| # | Chủ đề | Quyết định | Nguồn quyết định |
|---|---|---|---|
| D57 | Vai trò | Mục **Bài viết** riêng, tách khỏi Lộ trình chính. Byline theo D17 (biệt danh và GitHub) | Chủ dự án chọn |
| D58 | Phạm vi | Trục Claude. OpenAI và Gemini chỉ đối chiếu ngắn, kèm nguồn của chính hãng | Chủ dự án chọn |
| D59 | Lưu trữ | **Chung repo.** Nháp ở `editorial/`, ngoài `site/`; không hiện lên site cho tới khi duyệt | Chủ dự án: "chung repo cũng được, chỉ cần không hiển thị lên site khi approve" |
| D60 | Chặn đọc nhầm | `.ignore` ở gốc repo, và `editorial/CLAUDE.md` chỉ nạp khi agent đọc file trong đó. Không dùng deny rule (§4) | Chủ dự án đồng ý nếu đặt được luật; cơ chế do agent chọn |
| D61 | Nhịp | Một cụm 3 bài rồi xem lại. Hạ tầng vừa đủ, chưa dựng cho dòng chảy chưa có | Chủ dự án chọn |
| D62 | Giọng | Bài viết xưng "tôi" (`16-writing-guide.md` §10) | Chủ dự án chọn |
| D63 | Kiểm chứng | Chuẩn nhẹ: **ghi ngày thu thập thông tin**. Nguồn dẫn ngay trong bài; không SourceButton bắt buộc, không build-fail vì thiếu nguồn. Sổ nguồn ở `editorial/` | Chủ dự án: "note thêm vào là thông tin thu thập ở ngày nào là ok" |
| D64 | Minh bạch | Chỉ ghi byline; bài không có hộp "cách bài được làm". Quy trình và sổ nguồn vẫn công khai trong repo | Chủ dự án chọn |
| D65 | Thứ tự | 01 system prompt → 02 memory → 03 model và effort | Chủ dự án chọn (theo chi phí kiểm chứng) |
| D66 | Đăng bài | Một PR mỗi bài, kèm trang xem trước. Chủ dự án duyệt chữ rồi mới merge (D13). Agent không tự merge bài | Mặc định đề xuất, chờ xác nhận |

Mặc định đề xuất khác, chờ xác nhận: nhãn mục "Bài viết"; đường dẫn `/bai-viet/`; chỉ tiếng Việt (D1); ẩn mục khỏi menu cho tới khi có bài đầu tiên (cùng tinh thần D25).

## 2. Hai khối việc

**Khối A. Dựng mục Bài viết trên site.** Một PR code, giao cho coding agent chính khi bài đầu tiên được tác giả duyệt. Spec ở §8. Chữ mới trên giao diện (nhãn menu, câu của trang trống) cần chủ dự án duyệt (D13); phần code còn lại tự merge khi bộ kiểm xanh (D14).

**Khối B. Từng bài.** Mỗi bài đi hết vòng đời ở §5, rồi một PR đăng bài theo §6. Phiên viết bài dùng `editorial/HANDOFF.md`.

Hai khối độc lập. Có thể viết cả ba bài mà chưa dựng khối A.

## 3. Lưu trữ khác hiển thị

```text
editorial/                            nháp. Công khai trong repo, KHÔNG nằm trong build của site
├─ articles/NN-slug/                  brief · ledger · draft · review
└─ articles/00-cluster/raw/           memo nguyên văn, chưa kiểm chứng

site/src/content/articles/<slug>.md   chỉ bài đã duyệt (khối A)
```

Site chỉ đọc `site/src/`. Nháp vì thế không thể hiện lên site nếu không có một PR đưa bài vào `site/src/content/articles/`. Sổ nguồn không đi theo bài lên site; nó ở lại `editorial/` để truy vết.

Repo có vẻ công khai (GitHub Pages miễn phí, README dẫn tới Issues); chưa kiểm bằng cài đặt repo. Nếu đúng, nháp và memo chưa kiểm chứng cũng công khai. Chủ dự án chấp nhận (D59). Nhãn `UNVERIFIED` trên mọi memo là lớp bảo vệ duy nhất; nếu sau này cần riêng tư thì chuyển nháp sang repo riêng (phương án B đã cân nhắc ở vòng 1).

## 4. Chặn agent chính đọc nhầm nháp

Chi phí token đến từ ba đường: kết quả tìm kiếm, agent tự quét thư mục, và chỉ dẫn nạp sẵn. Đã kiểm chứng ngày 13/11/2026:

| Cơ chế | Kết quả kiểm chứng | Quyết định |
|---|---|---|
| `.ignore` ở gốc, ghi `editorial/` | **Đã thử trong phiên:** Grep bỏ qua thư mục khi tìm từ thư mục cha; vẫn tìm được khi `path` trỏ thẳng vào `editorial/`; **Glob vẫn liệt kê tên file** | Dùng. Chỉ chặn tìm nội dung |
| `editorial/CLAUDE.md` | Docs `memory`: CLAUDE.md ở thư mục con nạp khi Claude đọc, ghi hoặc sửa file trong thư mục đó. Giới hạn 40.000 ký tự mỗi file nạp theo nhu cầu (cửa sổ 200K). Repo chưa có `CLAUDE.md` gốc nên agent chính không nạp gì thêm | Dùng. Giữ file dưới 8.000 ký tự |
| `Read(editorial/**)` deny | Docs `permissions`: áp cho Read; "best-effort" cho Grep và Glob; không chặn `grep -r` chạy trong thư mục; allow không đè được deny, nên chặn luôn phiên viết bài | **Không dùng**, trừ khi hai cơ chế trên không đủ |

Giới hạn cần biết:

- `.ignore` chỉ kiểm bằng công cụ Grep của Claude Code (dựa trên ripgrep). Agent khác (DeepSeek, Codex...) có thể không theo `.ignore`.
- `CLAUDE.md` là ngữ cảnh, không phải cưỡng chế (docs `memory`). Phần chặn thật chỉ là `.ignore`.
- Còn lại rủi ro nhỏ: agent chủ động mở một file trong `editorial/`. Không có cơ chế nào cấm mà không chặn luôn phiên viết bài.
- Nếu nháp vẫn gây tốn token: tách `editorial/` sang repo riêng (phương án B). Đây là lối thoát đã chuẩn bị, không phải phương án mặc định.
- Đã cân nhắc rồi bỏ: thêm `paths-ignore: editorial/**` vào hai workflow CI. Nếu `Check site` là required check của nhánh `main`, một PR chỉ đổi `editorial/` sẽ không bao giờ có check và bị kẹt. Chưa kiểm được quy tắc bảo vệ nhánh; để dành cho khi chủ dự án xác nhận.

## 5. Vòng đời bài

| Trạng thái | Nghĩa | Ai làm |
|---|---|---|
| `idea` | Ý tưởng thô, ghi chú | Tác giả |
| `memo` | Có memo nghiên cứu, chưa kiểm | Perplexity, ChatGPT, Claude |
| `ledger` | Sổ nguồn đủ cho một bản nháp | Claude mở nguồn gốc; mỗi dòng có nhãn |
| `draft` | Có bản nháp | Tác giả và Claude, theo sáu bước ở `editorial/CLAUDE.md` |
| `review` | Đang rà. Có thể qua Council (ChatGPT); quyết định ở bài đầu tiên | Council, tác giả |
| `approved` | Tác giả duyệt chữ | **Chỉ tác giả đặt** |
| `published` | PR đăng bài đã merge | Coding agent chính, tác giả merge |

Ba cổng, không gộp: *chất lượng* (sổ nguồn, rà biên tập), *quyền* (tác giả đặt `approved`), *đăng* (PR và merge). Bài qua cổng chất lượng không tự có quyền lên site.

## 6. Playbook đăng bài (cho coding agent chính)

Chạy khi tác giả nói "đăng bài NN" và `status: approved` ở `brief.md` của bài đó. Chỉ đọc thư mục của bài đó, `docs/16` và mục này.

1. Chuyển `draft.md` thành `site/src/content/articles/<slug>.md`, thêm frontmatter (§8). Không chép `ledger.md` lên site.
2. `collectedAt` lấy từ ngày mở nguồn gần nhất trong `ledger.md`. Dòng "Thông tin thu thập ngày …" hiện từ frontmatter, không viết tay (D63).
3. Mở mọi link trong bài; link chết thì báo tác giả, không tự thay.
4. Chạy `check.cjs`, `type-check.cjs` (kèm `--selftest`) và `design-check.cjs`.
5. Mở PR nháp, kèm một trang HTML xem trước ngắn: đã đổi gì, vì sao, rủi ro còn lại, vài câu để tác giả tự kiểm (theo `17` §1).
6. Tác giả duyệt chữ trên PR (D13) rồi mới merge.
7. Trong cùng PR: `status: published` và `publishedAt` ở `brief.md`; cập nhật bảng ở `editorial/README.md`; một mục ở `CHANGELOG.md`.

## 7. Chuẩn nội dung

- Giọng và chữ: `16-writing-guide.md` §1–§9, cùng §10 dành riêng cho Bài viết (xưng "tôi", ngày thu thập, nguồn trong câu).
- Nhãn trong sổ nguồn: `VERIFIED`, `VENDOR CLAIM`, `INFERENCE`, `UNVERIFIED`, `MEASURED` (định nghĩa ở `editorial/CLAUDE.md`). Chỉ `VERIFIED`, `VENDOR CLAIM` (nói rõ hãng công bố) và `MEASURED` vào bài như dữ kiện.
- Bài không lặp lại Lộ trình chính hay Nâng cao. Chỗ trùng chủ đề thì dẫn sang.
- Với mỗi bài hỏi: điều gì ở đây không có trong docs và blog chính thức? Không có thì bài chỉ là bản tóm tắt.

## 8. Spec khối A cho coding agent

Yêu cầu, không phải cách làm; agent tự chọn cách cài.

- **Route:** `/bai-viet/` (mục lục) và `/bai-viet/<slug>/`. Tĩnh. Có trong sitemap, `canonical` và OG đúng.
- **Nội dung:** markdown ở `site/src/content/articles/`. Frontmatter: `title`, `description`, `publishedAt`, `collectedAt`, `order` (thứ tự trong cụm), `series` (tuỳ chọn). Tác giả lấy từ `config.ts` (biệt danh và GitHub theo D17), không lặp ở từng bài.
- **Ngày thu thập:** hiện ở đầu bài từ `collectedAt`. Đề xuất của agent, chờ xác nhận: thiếu `collectedAt` thì build fail, để ghi chú ngày mà D63 yêu cầu không bị quên. Đây là luật build duy nhất của mục này; không có luật nào về nguồn.
- **Bố cục:** dùng `Base.astro`, token và component hiện có. Không thêm ASCII art; `art-lock.json` không đổi. Độ rộng dòng đọc theo `type-rules.json`.
- **Chữ:** thuật ngữ tiếng Anh lần đầu in nghiêng, đánh `lang="en"` (cho phép HTML nội tuyến trong markdown). Dấu câu theo luật `punctuation` của `type-check`.
- **Menu:** thêm "Bài viết" chỉ khi có ít nhất một bài đã đăng. Nhãn và câu của trang trống cần chủ dự án duyệt (D13).
- **Bộ kiểm:** đưa trang mới vào danh sách trang của `check.cjs`, `type-check.cjs`, `design-check.cjs`. Một bài mẫu làm fixture, không vào `dist`.
- **Giữ nguyên:** disclaimer, nút phản hồi GoatCounter, dòng giấy phép CC BY-NC-SA ở chân trang.

## 9. Việc mở

1. **Sáu chủ đề, ba bài.** Tác giả có sáu chủ đề (A, B, C của brief và 4, 5, 6 có memo); cụm 3 bài lấy 4–6. A gộp vào bài 02, B vào bài 03. **C (Gemini Orchestrator) chưa có chỗ.** Xem `editorial/articles/00-cluster/README.md`.
2. **URL chuẩn của bài six shifts:** site dẫn `claude.dev/blog/...`, memo dẫn `claude.com/blog/...` (`07` §1 mục 3 vẫn mở). Bài 01 phải chốt.
3. **Memory của Chat và Cowork:** memo 5 và `05-surface-matrix.md` nói chưa khớp nhau (`02-memory/ledger.md` dòng 13).
4. **Council:** bài nào qua ChatGPT trước khi tác giả duyệt. Quyết định ở bài đầu tiên.
5. **Tên cụm** và tên tiếng Việt của nó.
6. **`paths-ignore` cho CI:** chờ xác nhận quy tắc bảo vệ nhánh (§4).
7. **Xem lại sau cụm 3 bài (D61):** quy trình có chạy không; nháp có gây tốn token không; bài có nói được điều docs chưa nói không; số liệu GoatCounter và phản hồi. Từ đó quyết định tách repo, mở rộng nhịp, hay dừng.

## 10. Rủi ro

| Rủi ro | Giảm thiểu |
|---|---|
| Số hay đổi (giá, benchmark, mức mặc định) lỗi thời | Luôn kèm ngày thu thập (D63); bài 03 ra cuối vì đổi nhanh nhất |
| Memo chưa kiểm chứng bị chép thẳng vào bài | Nhãn `UNVERIFIED` trên mọi memo; hai luật cứng ở `editorial/CLAUDE.md`; mọi số phải có dòng trong `ledger.md` |
| Bài chỉ là tóm tắt tài liệu chính thức | Câu hỏi "điều gì docs chưa nói" ở mọi brief; hỏi tác giả chuyện thật và số tự đo |
| Nháp làm agent chính tốn token | §4. Lối thoát: repo riêng |
| Giọng "tôi" lệch khỏi phần còn lại của site | `16` §10 giới hạn trong mục Bài viết; mascot không xuất hiện trong bài |
| Chuẩn kiểm chứng nhẹ cho số sai lọt qua | Ngày thu thập cho người đọc biết tuổi của số; sổ nguồn công khai trong repo để người khác kiểm |
| Coi mục Bài viết là chỗ đăng tin | Chỉ nhận bài có luận điểm riêng của tác giả; cụm 3 bài rồi xem lại |
