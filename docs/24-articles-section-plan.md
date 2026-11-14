# 24 · Mục Bài viết: khung và bàn giao (13/11/2026)

> Kết quả hai vòng hỏi chủ dự án ngày 13/11/2026. Đây là kế hoạch: **site chưa đổi gì**. Tài liệu này chỉ giữ những gì không có ở nơi khác (kiến trúc, cách chặn đọc nhầm, playbook đăng bài; spec của trang ở issue #44). Luật nằm ở chỗ gốc của chúng; mục nào là con trỏ thì ghi rõ. Bản nháp và gói bàn giao ở `editorial/`.

## 0. Hiện trạng khi bắt đầu

Repo chưa có kế hoạch cho mục blog hay bài viết có tác giả:

- Phạm vi ở PRD §5 là Story, Library, Presenter, Starter Kit, Glossary. Menu hiện có Lộ trình chính, Thực hành, Nâng cao.
- D17 là quyết định duy nhất về tác giả: nêu biệt danh và GitHub, không nêu tên thật. Đó là dòng ghi công, không phải mục bài viết.
- Chữ "blog" trong repo luôn chỉ blog chính thức của Anthropic dùng làm nguồn.
- Site chưa có hạ tầng cho bài dài: nội dung nằm trong `parts.ts`, `chapters.json`, `matrix.yml`; chưa có markdown collection.

Ba chủ đề đầu trùng với kế hoạch hiện có: memory gần Nâng cao A2 và phần 03; model và effort gần A5 (c05b); 80% system prompt là six shifts, đã ở trang chủ (S1). Bài viết vì thế không dạy lại các mục đó. Nó là phân tích có tác giả, có ngày, và dẫn sang mục tương ứng.

## 1. Quyết định

Ở `08-kaizen-go-live.md` §1e (D57–D66). Không chép lại ở đây. D66 (một PR mỗi bài) đã được `AGENTS.md` §2–§3 trả lời: chữ mới thì chủ dự án duyệt, agent chính ghi bản ghi duyệt rồi merge. Còn chờ chủ dự án xác nhận các mặc định sau: nhãn menu "Bài viết"; đường dẫn `/articles/` (tiếng Anh, theo chỉ dẫn 13/11/2026: mọi thứ trong code dùng tiếng Anh); chỉ tiếng Việt (D1); ẩn mục khỏi menu cho tới khi có bài đầu tiên (cùng tinh thần D25).

## 2. Hai khối việc

**Khối A. Dựng mục Bài viết trên site.** Giao cho một coding agent khác qua issue #44 (viết bằng tiếng Anh; spec đầy đủ nằm ở đó, chốt qua hai vòng hỏi ngày 13/11/2026). Không cần chờ bài đầu tiên được duyệt: mục ẩn khỏi menu cho tới khi có bài đã đăng. Chữ mới trên giao diện theo `AGENTS.md` §3 (chủ dự án duyệt); phần còn lại theo §2 (agent chính tự merge khi CI xanh).

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
| `editorial/CLAUDE.md` | Docs `memory`: CLAUDE.md ở thư mục con nạp khi Claude đọc, ghi hoặc sửa file trong thư mục đó. Giới hạn 40.000 ký tự mỗi file nạp theo nhu cầu (cửa sổ 200K). `CLAUDE.md` gốc chỉ nạp `AGENTS.md` (D70), nên agent chính chỉ nạp thêm khi đọc file trong `editorial/` | Dùng. Giữ file dưới 8.000 ký tự |
| `Read(editorial/**)` deny | Docs `permissions`: áp cho Read; "best-effort" cho Grep và Glob; không chặn `grep -r` chạy trong thư mục; allow không đè được deny, nên chặn luôn phiên viết bài | **Không dùng**, trừ khi hai cơ chế trên không đủ |

Giới hạn cần biết:

- `.ignore` chỉ kiểm bằng công cụ Grep của Claude Code (dựa trên ripgrep). Agent khác (DeepSeek, Codex...) có thể không theo `.ignore`.
- `CLAUDE.md` là ngữ cảnh, không phải cưỡng chế (docs `memory`). Phần chặn thật chỉ là `.ignore`.
- Còn lại rủi ro nhỏ: agent chủ động mở một file trong `editorial/`. Không có cơ chế nào cấm mà không chặn luôn phiên viết bài.
- Nếu nháp vẫn gây tốn token: tách `editorial/` sang repo riêng (phương án B). Đây là lối thoát đã chuẩn bị, không phải phương án mặc định.
- CI: D74 (`docs/08` §1f) cho PR chỉ đổi `docs/`, `editorial/` hoặc `.ignore` bỏ qua các bước nặng của `Check site`, và job `check` vẫn báo xanh nên không kẹt khi `main` được bảo vệ (D73). Không cần thêm `paths-ignore`.

## 5. Vòng đời bài

Trạng thái, ba cổng (chất lượng, quyền, đăng) và ai đặt trạng thái nào: `editorial/CLAUDE.md`. Không chép lại ở đây.

## 6. Playbook đăng bài (cho coding agent chính)

Chạy khi tác giả nói "đăng bài NN" và `status: approved` ở `brief.md` của bài đó. Chỉ đọc thư mục của bài đó, `editorial/CLAUDE.md` và mục này.

1. Chuyển `draft.md` thành `site/src/content/articles/<slug>.md`, thêm frontmatter (schema ở issue #44). Không chép `ledger.md` lên site.
   Tranh mở đầu của bài (`art`) đã được tác giả chọn hướng từ bản nháp HTML trước bước này; tranh nằm trong PR đăng bài.
2. `verifiedAt` lấy từ ngày gần nhất trong cột "Mở ngày" của `ledger.md`. Dòng "Thông tin thu thập ngày …" hiện từ frontmatter, không viết tay (D63).
3. Mở mọi link trong bài; link chết thì báo tác giả, không tự thay.
4. Chạy `check.cjs`, `type-check.cjs` (kèm `--selftest`) và `design-check.cjs`.
5. Mở PR nháp, kèm một trang HTML xem trước ngắn: đã đổi gì, vì sao, rủi ro còn lại, vài câu để tác giả tự kiểm. Mô tả PR theo khuôn ở `AGENTS.md` §6.
6. Chữ mới theo `AGENTS.md` §3: tác giả duyệt, agent chính ghi bản ghi duyệt rồi merge. Đối chiếu nguồn theo §8, và PR ghi đúng sự thật về việc đó (mẫu "chủ dự án là người đối chiếu duy nhất" không đúng cho bài 07: không ai đối chiếu nguồn gốc, tác giả quyết đăng theo báo cáo).
7. Trong cùng PR: `status: published` và `publishedAt` ở `brief.md`; cập nhật bảng ở `editorial/README.md`; một mục ở `CHANGELOG.md`.

### Cú pháp markdown của bài (đã dựng ở #44, lát 2)

Bài nằm ở `site/src/content/articles/<slug>.md`. Trang thử `/articles/sample/` (`site/src/content/article-fixtures/sample.md`) dùng mọi yếu tố dưới đây, nên là mẫu để chép.

- **Tên file** là slug: chữ thường, số và dấu `-`, không bắt đầu bằng số; `sample` dành riêng. Sai thì build hỏng.
- **Ngày** (`publishedAt`, `verifiedAt`) viết trong nháy: `"2026-11-13"`. Ngày không nháy bị từ chối vì YAML đổi nó thành `Date` và cuộn ngày không tồn tại.
- **`related`** là mảng chuỗi, id phần ở lộ trình hoặc `c02`: `related: ["01", "c02"]`. `00` không nháy là số 0, build báo lỗi.
- **Callout:** `<aside aria-label="Quan điểm của tôi">`, dòng trống, nội dung markdown, dòng trống, `</aside>`. Nhãn lấy từ `aria-label`.
- **Bảng:** bảng markdown thường; trên điện thoại thành thẻ, mỗi ô mang nhãn cột (cần hàng tiêu đề).
- **Khối mã và prompt:** hàng rào ``` thường; nút Chép gắn tự động.
- **Chú thích cuối:** `[^1]` và `[^1]: …`.
- **Ảnh:** `![alt](./ten-anh.svg)` với file nằm cạnh bài; alt bắt buộc, thiếu là build hỏng. SVG nhúng trực tiếp cần `aria-label` hoặc `<title>`.
- **Link:** `/01/` (bắt đầu bằng `/`) tự được thêm đường dẫn gốc của site; link `https://…` mở tab mới.
- **Chữ Anh xen giữa:** `<em lang="en">context window</em>`.
- **Mục lục** chỉ hiện khi bài có ít nhất bốn H2.

## 7. Chuẩn nội dung

Con trỏ, không phải luật: giọng và chữ ở `16-writing-guide.md` §1 (ngoại lệ xưng "tôi"); nguồn và ngày ở `06-sources-and-links.md` §1 mục 8; nhãn bằng chứng ở `editorial/CLAUDE.md`.

## 8. Spec khối A

Ở issue #44, viết bằng tiếng Anh cho coding agent. Không chép lại ở đây. Điểm đã đổi so với bản nháp đầu của mục này, vì chủ dự án chọn khác: mỗi bài có một tranh ASCII mở đầu (cơ chế tranh nằm trong cùng task); mục lục có ảnh tranh tĩnh nhóm theo cụm; TOC cố định bên lề; bảng xếp thành thẻ trên điện thoại; trang mẫu `/articles/sample/` nằm trong `dist` (noindex) để bộ kiểm quét được, thay cho ý "fixture không vào dist" ban đầu vốn không kiểm được gì.

## 9. Việc mở

1. **Sáu chủ đề, ba bài.** Tác giả có sáu chủ đề (A, B, C của brief và 4, 5, 6 có memo); cụm 3 bài lấy 4–6. A gộp vào bài 02, B vào bài 03. **C (Gemini Orchestrator) chưa có chỗ.** Xem `editorial/articles/00-cluster/README.md`.
2. ~~**URL chuẩn của bài six shifts**~~ **Đã chốt 14/11/2026:** `claude.dev/blog/...`; `claude.com/blog/...` trả 308 sang đó (`editorial/articles/01-system-prompt/ledger.md` dòng 4). Site đã dẫn đúng.
3. **Memory của Chat và Cowork:** memo 5 và `05-surface-matrix.md` nói chưa khớp nhau (`02-memory/ledger.md` dòng 13).
4. **Ai rà ở bước `review`:** tác giả quyết ở bài đầu tiên.
5. **Tên cụm** và tên tiếng Việt của nó.
6. **Xem lại sau cụm 3 bài (D61):** quy trình có chạy không; nháp có gây tốn token không; bài có nói được điều docs chưa nói không; số liệu GoatCounter và phản hồi. Từ đó quyết định tách repo, mở rộng nhịp, hay dừng.

## 10. Rủi ro

| Rủi ro | Giảm thiểu |
|---|---|
| Số hay đổi (giá, benchmark, mức mặc định) lỗi thời | `verifiedAt` hiện ở đầu bài và số kèm ngày trong câu (`06` §1 mục 8); bài 03 ra cuối vì đổi nhanh nhất |
| Memo chưa kiểm chứng bị chép thẳng vào bài | Nhãn `UNVERIFIED` trên mọi memo; `AGENTS.md` §3 và §9; mọi số phải có dòng trong `ledger.md` |
| Bài chỉ là tóm tắt tài liệu chính thức | Câu hỏi "điều gì docs chưa nói" ở mọi brief; hỏi tác giả chuyện thật và số tự đo |
| Nháp làm agent chính tốn token | §4. Lối thoát: repo riêng |
| Giọng "tôi" lệch khỏi phần còn lại của site | Ngoại lệ có phạm vi ở `16` §1; mascot không xuất hiện trong bài |
| Chuẩn kiểm chứng nhẹ cho số sai lọt qua | Ngày kiểm chứng cho người đọc biết tuổi của số; sổ nguồn công khai trong repo để người khác kiểm |
| Coi mục Bài viết là chỗ đăng tin | Chỉ nhận bài có luận điểm riêng của tác giả; cụm 3 bài rồi xem lại |
