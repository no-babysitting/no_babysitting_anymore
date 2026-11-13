# 24 · Mục Bài viết: khung và bàn giao (13/11/2026)

> Kết quả hai vòng hỏi chủ dự án ngày 13/11/2026. Đây là kế hoạch: **site chưa đổi gì**. Tài liệu này chỉ giữ những gì không có ở nơi khác (kiến trúc, cách chặn đọc nhầm, playbook đăng bài, spec cho coding agent). Luật nằm ở chỗ gốc của chúng; mục nào là con trỏ thì ghi rõ. Bản nháp và gói bàn giao ở `editorial/`.

## 0. Hiện trạng khi bắt đầu

Repo chưa có kế hoạch cho mục blog hay bài viết có tác giả:

- Phạm vi ở PRD §5 là Story, Library, Presenter, Starter Kit, Glossary. Menu hiện có Lộ trình chính, Thực hành, Nâng cao.
- D17 là quyết định duy nhất về tác giả: nêu biệt danh và GitHub, không nêu tên thật. Đó là dòng ghi công, không phải mục bài viết.
- Chữ "blog" trong repo luôn chỉ blog chính thức của Anthropic dùng làm nguồn.
- Site chưa có hạ tầng cho bài dài: nội dung nằm trong `parts.ts`, `chapters.json`, `matrix.yml`; chưa có markdown collection.

Ba chủ đề đầu trùng với kế hoạch hiện có: memory gần Nâng cao A2 và phần 03; model và effort gần A5 (c05b); 80% system prompt là six shifts, đã ở trang chủ (S1). Bài viết vì thế không dạy lại các mục đó. Nó là phân tích có tác giả, có ngày, và dẫn sang mục tương ứng.

## 1. Quyết định

Ở `08-kaizen-go-live.md` §1e (D57–D66). Không chép lại ở đây. Chờ chủ dự án xác nhận: D66 (một PR mỗi bài, chủ dự án duyệt rồi mới merge) và các mặc định sau: nhãn mục "Bài viết"; đường dẫn `/bai-viet/`; chỉ tiếng Việt (D1); ẩn mục khỏi menu cho tới khi có bài đầu tiên (cùng tinh thần D25).

## 2. Hai khối việc

**Khối A. Dựng mục Bài viết trên site.** Một PR code, giao cho coding agent chính khi bài đầu tiên được tác giả duyệt. Spec ở §8. Chữ mới trên giao diện (nhãn menu, câu của trang trống) cần chủ dự án duyệt (D13); phần code còn lại tự merge khi bộ kiểm xanh (D14).

**Khối B. Từng bài.** Mỗi bài đi hết vòng đời (§5), rồi một PR đăng bài theo §6. Phiên viết bài dùng `editorial/HANDOFF.md`.

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

Trạng thái, ba cổng (chất lượng, quyền, đăng) và ai đặt trạng thái nào: `editorial/CLAUDE.md`. Không chép lại ở đây.

## 6. Playbook đăng bài (cho coding agent chính)

Chạy khi tác giả nói "đăng bài NN" và `status: approved` ở `brief.md` của bài đó. Chỉ đọc thư mục của bài đó, `editorial/CLAUDE.md` và mục này.

1. Chuyển `draft.md` thành `site/src/content/articles/<slug>.md`, thêm frontmatter (§8). Không chép `ledger.md` lên site.
2. `verifiedAt` lấy từ ngày gần nhất trong cột "Mở ngày" của `ledger.md`. Dòng "Thông tin thu thập ngày …" hiện từ frontmatter, không viết tay (D63).
3. Mở mọi link trong bài; link chết thì báo tác giả, không tự thay.
4. Chạy `check.cjs`, `type-check.cjs` (kèm `--selftest`) và `design-check.cjs`.
5. Mở PR nháp, kèm một trang HTML xem trước ngắn: đã đổi gì, vì sao, rủi ro còn lại, vài câu để tác giả tự kiểm (theo `17` §1).
6. Tác giả duyệt chữ trên PR (D13) rồi mới merge.
7. Trong cùng PR: `status: published` và `publishedAt` ở `brief.md`; cập nhật bảng ở `editorial/README.md`; một mục ở `CHANGELOG.md`.

## 7. Chuẩn nội dung

Con trỏ, không phải luật: giọng và chữ ở `16-writing-guide.md` §1 (ngoại lệ xưng "tôi"); nguồn và ngày ở `06-sources-and-links.md` §1 mục 8; nhãn bằng chứng ở `editorial/CLAUDE.md`.

## 8. Spec khối A cho coding agent

Yêu cầu, không phải cách làm; agent tự chọn cách cài.

- **Route:** `/bai-viet/` (mục lục) và `/bai-viet/<slug>/`. Tĩnh. Có trong sitemap, `canonical` và OG đúng.
- **Nội dung:** markdown ở `site/src/content/articles/`. Frontmatter: `title`, `description`, `publishedAt`, `verifiedAt`, `order` (thứ tự trong cụm), `series` (tuỳ chọn). Hai trường ngày dùng lại tên của `SourceRef` (`06` §1 mục 4). Tác giả lấy từ `config.ts` (biệt danh và GitHub theo D17), không lặp ở từng bài.
- **Ngày thu thập:** hiện ở đầu bài từ `verifiedAt`. Đề xuất của agent, chờ xác nhận: thiếu `verifiedAt` hoặc sai dạng `YYYY-MM-DD` thì build fail, theo đúng cách `site/src/lib/matrix.ts` đã kiểm `verifiedAt` của `matrix.yml`. Đây là luật build duy nhất của mục này; không có luật nào về nguồn. Tuỳ chọn: dùng lại `ageDays` của `matrix.ts` để hiện nhãn "cần kiểm lại" khi quá 30 ngày, như trạng thái đã đặc tả ở `06` §2.
- **Bố cục:** dùng `Base.astro`, token và component hiện có. Không thêm ASCII art; `art-lock.json` không đổi. Độ rộng dòng đọc theo `type-rules.json`.
- **Chữ:** thuật ngữ tiếng Anh lần đầu in nghiêng, đánh `lang="en"` (cho phép HTML nội tuyến trong markdown). Dấu câu theo luật `punctuation` của `type-check`.
- **Menu:** thêm "Bài viết" chỉ khi có ít nhất một bài đã đăng. Nhãn và câu của trang trống cần chủ dự án duyệt (D13).
- **Bộ kiểm:** đưa trang mới vào danh sách trang của `check.cjs`, `type-check.cjs`, `design-check.cjs`. Một bài mẫu làm fixture, không vào `dist`.
- **Giữ nguyên:** disclaimer, nút phản hồi GoatCounter, dòng giấy phép CC BY-NC-SA ở chân trang.

## 9. Việc mở

1. **Sáu chủ đề, ba bài.** Tác giả có sáu chủ đề (A, B, C của brief và 4, 5, 6 có memo); cụm 3 bài lấy 4–6. A gộp vào bài 02, B vào bài 03. **C (Gemini Orchestrator) chưa có chỗ.** Xem `editorial/articles/00-cluster/README.md`.
2. **URL chuẩn của bài six shifts:** site dẫn `claude.dev/blog/...`, memo dẫn `claude.com/blog/...` (`07` §1 mục 3 vẫn mở). Bài 01 phải chốt.
3. **Memory của Chat và Cowork:** memo 5 và `05-surface-matrix.md` nói chưa khớp nhau (`02-memory/ledger.md` dòng 13).
4. **Ai rà ở bước `review`:** tác giả quyết ở bài đầu tiên.
5. **Tên cụm** và tên tiếng Việt của nó.
6. **`paths-ignore` cho CI:** chờ xác nhận quy tắc bảo vệ nhánh (§4).
7. **Xem lại sau cụm 3 bài (D61):** quy trình có chạy không; nháp có gây tốn token không; bài có nói được điều docs chưa nói không; số liệu GoatCounter và phản hồi. Từ đó quyết định tách repo, mở rộng nhịp, hay dừng.

## 10. Rủi ro

| Rủi ro | Giảm thiểu |
|---|---|
| Số hay đổi (giá, benchmark, mức mặc định) lỗi thời | `verifiedAt` hiện ở đầu bài và số kèm ngày trong câu (`06` §1 mục 8); bài 03 ra cuối vì đổi nhanh nhất |
| Memo chưa kiểm chứng bị chép thẳng vào bài | Nhãn `UNVERIFIED` trên mọi memo; hai luật không ngoại lệ (`17` §1); mọi số phải có dòng trong `ledger.md` |
| Bài chỉ là tóm tắt tài liệu chính thức | Câu hỏi "điều gì docs chưa nói" ở mọi brief; hỏi tác giả chuyện thật và số tự đo |
| Nháp làm agent chính tốn token | §4. Lối thoát: repo riêng |
| Giọng "tôi" lệch khỏi phần còn lại của site | Ngoại lệ có phạm vi ở `16` §1; mascot không xuất hiện trong bài |
| Chuẩn kiểm chứng nhẹ cho số sai lọt qua | Ngày kiểm chứng cho người đọc biết tuổi của số; sổ nguồn công khai trong repo để người khác kiểm |
| Coi mục Bài viết là chỗ đăng tin | Chỉ nhận bài có luận điểm riêng của tác giả; cụm 3 bài rồi xem lại |
