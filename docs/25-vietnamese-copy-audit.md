# 25 · Rà soát chữ tiếng Việt trên site (14/11/2026)

> Báo cáo audit cho issue #79, lát 1 (chữ trên site). Đây là **bản chờ duyệt**: mọi câu đổi ở mục 4 là chữ mới theo `AGENTS.md` §3, chỉ merge sau khi chủ dự án duyệt. Báo cáo ghi rõ điều đã xác minh, điều suy ra và điều chưa làm. Chữ của bốn bài trong `editorial/` (bản nháp, chưa lên site) **không nằm trong lát này**; xem mục 7.

## 1. Cách đọc và độ bao phủ

**Đã làm (xác minh):**

- Dựng `main` (`919edb1`), lấy danh sách route từ build: **23 trang**. Trích mọi nút chữ hiển thị và ẩn, `aria-label`, `title`, `alt`, `placeholder` và metadata của từng trang ở khổ 1920×1080 (script tạm, không nằm trong repo).
- Đọc **trực tiếp nguồn** của toàn bộ chữ tiếng Việt: `content/parts.ts` (năm phần, mười Lens, prompt), `work-types.ts`, `practice.ts` (ba bài thực hành), sáu cảnh trang chủ (`Intro`, `Spark`, `Journey`, `Harness`, `Run`, `Finale`), `index.astro`, `Hud` (menu, hộp thoại Lens), `SiteFooter`, `PartNav`, `LensBlock`, `FilterBar`, `ContextMeter`, `SurfaceTabs`, các trang `thuc-hanh`, `c02`, `[part]`, `[ch]`, `404`, `articles/index`, `config.ts`, `Base.astro`, và chữ trạng thái trong `design-system/components/bundle.js`.
- Đối chiếu với `docs/16-writing-guide.md` **bản của PR #78** (đã gỡ các giới hạn hình thức cứng) và `editorial/VIETNAMESE-NATURAL-VOICE.md` của PR #78.

**Chưa làm hoặc không xác minh được:**

- Chưa so với site đã deploy (không dùng mạng ngoài trong lát này); chỉ so với build từ `main`.
- Các trang khung `c00` đến `c10` (noindex, "đang viết lại") dùng chung một mẫu ngắn; đã đọc một trang, suy ra các trang còn lại.
- Chữ của `components/ds/*` (bản xem trước hệ thiết kế, hơn một nửa không hiện trên route nào) chỉ đọc lướt; không sửa.
- Không xác minh lại nguồn của các câu trích và con số: lát này **không đổi claim, con số hay nguồn**.

## 2. Mô hình bối cảnh (T1)

| Mục | Trạng thái | Ảnh hưởng tới lát này |
|---|---|---|
| Issue #79 | Mở, do chủ dự án giao; là phạm vi thực thi | Phạm vi chính |
| PR #77 (nháp) | Chỉ đổi 5 file trong `editorial/` (bản nháp bài 01, 02, 07, thêm bài 08, thêm file voice). Không đụng `site/src` | Không chặn chữ trên site; ảnh hưởng lát bài viết |
| PR #78 (nháp, nằm trên nhánh của #77) | Sửa `docs/16` và file voice | `docs/16` trên `main` còn luật cứng ("đoạn ≤ 4 câu", "câu đầu là ý chính"); #78 gỡ. Tôi theo bản #78 |
| Phạm vi bài 07 và bài 08 trong #77 | Mở rộng bài 07 thành bài vận hành agent, thêm bài 08 | Trái với D81, D84, D61, D65; chưa có số D mới. **Chờ chủ dự án quyết** |
| `docs/16` và "em nó" | Không có luật nào nói về "em nó"; luật có là "*nó* chỉ Claude khi chủ thể đã rõ" | #79 yêu cầu giảm lạm dụng |
| Các PR #18, #19 | Nháp, của bên đánh giá, không liên quan | Không đụng |

Thứ tự ưu tiên khi hai nguồn mâu thuẫn: quyết định của chủ dự án (#79) > `AGENTS.md` > D-number > `docs/16` bản #78 > file voice > phán đoán biên tập.

## 3. Nguyên nhân gốc: các pattern lặp lại

| # | Pattern | Biểu hiện | Vì sao nghe không tự nhiên |
|---|---|---|---|
| P1 | **Đại từ biến thành thương hiệu**: "em nó" thay "Claude" | 31 lần: 28 ở `parts.ts`, 1 ở `Intro`, 2 ở `index.astro` (một chỗ là meta description) | Lặp quá dày thành giọng nhân vật; `docs/16` chỉ cho "nó" khi chủ thể đã rõ; trộn "Claude", "nó", "em nó" trong cùng đoạn làm người đọc phải đoán |
| P2 | **Từ ghép dịch sát**, không phải cách nói của người Việt | "context sạch sẽ" (2), "đang biết tới đâu", "một cây gồm nhiều file ngắn", "việc số" (`config.ts`), "bắt tay vào làm" kèm chủ thể mơ hồ | Giữ nguyên trật tự và kết hợp từ tiếng Anh (*clean context*, *a tree of files*, *digital work*) |
| P3 | **Câu cụt, thiếu quan hệ** | "Có hai yêu cầu chỏi nhau. Claude hỏi bạn." | Hai câu ngắn đứng cạnh nhau nhưng không nói vì sao cái này dẫn tới cái kia |
| P4 | **Chú giải thừa trong ngoặc** | "Chat là nơi bạn đã quen (trò chuyện, tức chat, trên claude.ai…)" | Giải nghĩa một từ bằng chính nó; người đọc phải đọc ngoặc mới hiểu câu |
| P5 | **Liên từ dịch sát** | "Bởi một reviewer đã được nhờ… thì…", "Nếu bạn trả lời sai, tức là… đủ để duyệt nó" | *Because…, then…* và *enough to approve it* bê sang |
| P6 | **Câu dồn thứ tự điều kiện** | "Quy tắc khớp trước thì thắng, theo thứ tự chặn, rồi hỏi, rồi cho phép, nên…" | Ba quan hệ (thứ tự xét, khớp đầu thắng, hệ quả) gói trong một mệnh đề |
| P7 | **Lỗi dàn chữ làm hỏng chữ** | `<strong>phút đầu</strong> tiên` cắt đôi từ "đầu tiên"; tên phần 03 "Cứ để em nó làm" nhưng liên kết quay lại ghi "Để nó làm" | Không phải lỗi câu mà là lỗi nguồn chữ: một chữ, hai cách viết |
| P9 | **Dòng cuối chỉ còn một từ** | 112 chỗ ở hai khổ nghiệm thu (không kể nhãn nguồn) | Đúng chữ nhưng làm hỏng nhịp đọc; sửa bằng typography (`text-wrap: pretty`), không ép xuống dòng |
| P8 | **Nháy thẳng trong văn xuôi** | `"không phải vậy, thử lại"` ở `/c02/` (cảnh báo `punctuation` của `type-check`) | Trái `docs/16` §6 |

## 4. Bảng findings đã sửa trong lát này

Mức độ: P1 = người đọc thấy ngay, ở đầu trang hoặc trong metadata; P2 = trong thân bài; P3 = chi tiết.

| ID | Nơi | Hiện tại | Sửa | Loại | Mức |
|---|---|---|---|---|---|
| F01 | `index.astro` (meta), `index.astro` (tuyên ngôn), `Intro.astro` | "…giao trọn phần thực thi **cho em nó**." | "…giao trọn phần thực thi **cho nó**." (*nó* chỉ Claude vừa nhắc ở vế trước; giữ độ dài câu để canvas mặt nước không đổi kích thước, xem mục 8) | P1 | P1 |
| F02 | `parts.ts` tóm tắt 00 | "Thứ em nó còn thiếu là những điều chỉ có bạn mới biết." | "Claude cần ít lời dặn hơn bạn nghĩ nhiều, nhưng vẫn thiếu những điều chỉ có bạn mới biết." | P1 | P1 |
| F03 | `parts.ts` tóm tắt 01 và cụm nhấn | "…trước khi em nó bắt tay vào làm." | "…trước khi nó bắt tay vào làm." (cụm nhấn đổi theo) | P1 | P1 |
| F04 | `parts.ts` tên phần 03 (1 chỗ); `practice.ts`, `c02` (liên kết quay lại) | "Cứ để em nó làm" · "Để nó làm" | "Cứ để Claude làm" ở cả ba chỗ | P7, P1 | P1 |
| F05 | `parts.ts` tóm tắt 03, 04, câu chốt 03 và 04, hai dòng chặng (`PHASES`), 9 chỗ | "…cầm lái khi em nó đi lệch", "đòi em nó đưa bằng chứng", "để em nó chạy" | "…khi nó đi lệch", "đòi bằng chứng", "để nó chạy"; ở chỗ nhiều chủ thể thì gọi tên "Claude" | P1 | P1 |
| F06 | `parts.ts` thân bài 00 đến 04 (15 chỗ) | "Việc càng dài thì em nó càng gặp nhiều chỗ phải đoán như thế." và các câu tương tự | "Việc càng dài thì Claude càng phải đoán ở nhiều chỗ." Mỗi chỗ chọn *Claude*, *nó* hoặc lược chủ thể tuỳ mạch | P1 | P2 |
| F07 | `parts.ts` 01, "ba cách" | "Hãy kể cho Claude nghe bạn là ai và đang biết tới đâu" | "Hãy cho Claude biết bạn làm nghề gì và đã biết tới đâu về mảng này" | P2 | P2 |
| F08 | `parts.ts` 01 | "Người giao việc giỏi thì vẫn có điều chưa biết như ai. Họ chỉ khác ở chỗ luôn tính trước là thế nào cũng có…" | "Người giao việc giỏi cũng có những điều chưa biết. Điểm khác là họ luôn tính trước rằng thế nào cũng có…" | P2 | P2 |
| F09 | `parts.ts` 01 và 03 | "Phiên ấy bắt đầu với context sạch sẽ, cùng một định nghĩa…" · "Phiên mới có context (ngữ cảnh) sạch sẽ, lại mang theo…" | "Phiên ấy không mang theo những lần trao đổi cũ, nhưng đã có sẵn spec cùng một định nghĩa…" · "Phiên mới bắt đầu với context (ngữ cảnh) trống, nhưng vẫn mang theo…" | P2 | P2 |
| F10 | `parts.ts` 03 | "Chia nhỏ ra thành một cây gồm nhiều file ngắn." | "Chia hướng dẫn thành các file nhỏ, mỗi file lo một việc." | P2 | P2 |
| F11 | `parts.ts` 00 | "Chat là nơi bạn đã quen (trò chuyện, tức chat, trên claude.ai hoặc app Claude)." | "Chat là nơi bạn đã quen: trò chuyện với Claude trên claude.ai hoặc trong app Claude." | P4 | P2 |
| F12 | `parts.ts` 03 | `<b>phút đầu</b> tiên` | `<b>phút đầu tiên</b>` (nhấn trọn cụm) | P7 | P2 |
| F13 | `parts.ts` 04 | "Bởi một reviewer đã được nhờ đi tìm lỗi thì kiểu gì cũng sẽ tìm ra…" | "Reviewer đã được nhờ đi tìm lỗi thì kiểu gì cũng tìm ra…" | P5 | P2 |
| F14 | `parts.ts` 04 | "Quy tắc khớp trước thì thắng, theo thứ tự chặn, rồi hỏi, rồi cho phép, nên luật chặn không bị…" | "Khi nhiều quy tắc cùng khớp, Claude Code xét theo thứ tự chặn, hỏi trước rồi cho phép, và quy tắc khớp đầu tiên sẽ thắng, nên luật chặn không bị…" (cùng nội dung, tách ba quan hệ) | P6 | P2 |
| F15 | `parts.ts` 04 | "Nếu bạn trả lời sai, tức là bạn chưa hiểu thay đổi này đủ để duyệt nó." | "Trả lời sai nghĩa là bạn chưa hiểu thay đổi này đủ rõ để duyệt." | P5 | P3 |
| F16 | `parts.ts` 03 và 04, hàng Lens `spec` và `design` | "Có hai yêu cầu chỏi nhau. Claude hỏi bạn." · "…thiếu trạng thái báo lỗi. Claude hỏi bạn." | "Hai yêu cầu trong SPEC chỏi nhau, nên Claude dừng lại hỏi bạn chọn bên nào." · "…, nên Claude hỏi bạn muốn xử lý thế nào." | P3 | P3 |
| F17 | `config.ts` (`descriptionVi`) | "giao trọn việc số cho Claude Code…" | "giao trọn công việc cho Claude Code…" | P2 | P2 |
| F18 | `c02/index.astro` | `"không phải vậy, thử lại"` | `“không phải vậy, thử lại”` | P8 | P3 |
| F19 | `layouts/Base.astro` (CSS) | Đoạn văn tự xuống dòng, nhiều đoạn kết thúc bằng một từ lẻ (112 dòng như vậy trên `main` ở hai khổ nghiệm thu) | Thêm `text-wrap: pretty` cho `p`, `li`, `dd`, `figcaption` trong `main`; không áp cho khối tách bằng SplitText (`data-reveal` lines, words, fill). Không dùng `<br>` | P9 | P2 |
| F20 | `tools/make-brand-assets.js`, `site/public/og.png` | Ảnh chia sẻ in sẵn "…giao trọn phần thực thi cho em nó." | "…giao trọn phần thực thi cho nó." (dựng lại ảnh, cùng câu với meta description và tuyên ngôn) | P1 | P1 |

## 5. Quyết định biên tập có chủ đích, **không** sửa

- **"chỏi nhau"** (6 chỗ): từ có sắc thái miền Nam nhưng người đọc cả nước hiểu, và không có luật nào cấm. Giữ; hỏi chủ dự án nếu muốn đổi đồng loạt.
- **Ba câu khẩu hiệu "Bạn giao kết quả. Claude tự làm. Bạn duyệt."** (tiêu đề cảnh Run): đúng ý, ngắn, là hook đã duyệt. Giữ.
- **Khung bảng Lens** ("Cách tìm: Nhờ Claude rà điểm mù về…, rồi để Claude phỏng vấn bạn…" lặp 8 lần): đây là khuôn có chủ đích để người đọc so các nghề; lặp cấu trúc là dụng ý, không phải lỗi. Giữ.
- **Tên "Vào ngó chút bạn mình nhỉ?"**: câu của chính chủ dự án (`docs/16` §9). Giữ.
- **Đoạn dài ở phần 04 (5 câu, ~110 chữ về phép kiểm)**: một mạch lập luận liên tục, tách ra sẽ mất quan hệ giữa các ví dụ. Giữ, nhưng đánh dấu để rà lại sau khi đọc to.

## 6. Việc chưa làm trong lát này và vì sao

- ~~Chữ trong ảnh chia sẻ (`og.png`)~~: **đã xác minh và sửa** (F20): ảnh có câu "…giao trọn phần thực thi cho em nó." nằm trong ảnh, lệch với meta description mới. Đã đổi trong `tools/make-brand-assets.js` rồi dựng lại bằng `node tools/make-brand-assets.js`; chỉ đoạn cuối câu đổi, `favicon.svg` không đổi (đã xem ảnh).
- **Chữ trong `components/ds/*`**: bản xem trước hệ thiết kế, phần lớn không hiện trên route nào; lát sau nếu bạn muốn.
- **Bố cục hai khổ 1920×1080 và 428×926** là hai khổ mới so với các bộ kiểm hiện có (1440×900, 390×844); kết quả ở mục 8, kiểm bằng script tạm ngoài repo.

## 7. Bài viết (bài 01, 02, 03, 07, 08)

**Chưa làm, có chủ ý.** Lý do và điều cần quyết:

1. Các bản trong #77 là tham chiếu, không phải bản duyệt; bốn bài trên `main` đều ở `status: draft`, chỉ tác giả đặt `approved`.
2. #77 mở rộng bài 07 thành bài vận hành agent và thêm bài 08. Điều này trái với phạm vi bạn đã chốt (D81, D84: bài lẻ, chỉ dẫn thực hành) và chưa có số D mới. **Cần bạn quyết** trước khi tôi viết lại 07 hoặc 08.
3. Bài viết nằm trong `editorial/`, nên cần nền là nhánh #78 (chồng lên #77) để có file voice và bài 08; tôi giữ nguyên topology của #77 và #78.
4. Bài 03 chưa được viết lại trong #77 và phải được đánh giá riêng; việc đó cần đối chiếu lại các nguồn trong sổ `ledger.md`, tốn thời gian mở nguồn.

## 8. Kết quả kiểm (đã chạy thật, trên đúng cây mã của commit này)

**Bộ kiểm của repo** (máy làm việc, dựng sạch bằng `npm run build`, `NB_BASE=/no_babysitting_anymore/`):

| Phép kiểm | Kết quả |
|---|---|
| `npm run build` | qua |
| `check.cjs` (23 trang, 3 khổ, liên kết, lỗi JS, cuộn ngang, giảm chuyển động, axe) | qua, 245 giây |
| `type-check.cjs --selftest` | qua |
| `type-check.cjs` | 0 lỗi, 43 cảnh báo (`main` cùng máy: 0 lỗi, 42). Luật `punctuation` hết cảnh báo ở `/c02/` (F18). Cảnh báo tăng một nhóm: `text-wrap: pretty` (F19) làm dòng ở khối `.why` dài thêm 1 đến 3 ký tự nên luật `measure` (mức khuyến nghị ≤ 80 ký tự, chỉ cảnh báo) nay chỉ ra 82 và 83 ký tự ở `/01/` và `/03/`; không phải lỗi |
| `design-check.cjs` | qua, 202 giây |
| `art-check.cjs` | **2 mảnh đỏ trên máy làm việc: `hero-logo@phone` (palette Δ 13,8) và `menu-art@phone` (Δ 9,2)**. Đây là hai mảnh đã khoá bằng số đo của CI (PR #75, vì chúng khác nhau giữa CI và máy làm việc từ trước). Trên `main` cùng máy cho **đúng hai kết quả y hệt**, nên không phải do lát này. Trên CI chúng xanh (đã kiểm ở PR #75). `water@desktop` xanh: lần đầu sửa chữ tôi làm câu tuyên ngôn ngắn đi một dòng và canvas mặt nước thành 1440×663 so với khoá 1440×709; tôi đã đổi lại câu để giữ nguyên số dòng (xem F01) và đo lại 1440×709 và 390×858 như khoá |

**QA đáp ứng** (script tạm ngoài repo, Chromium của Playwright, **khổ 1920×1080 và 428×926**, 23 route × 2 khổ × 2 chế độ (giảm chuyển động và bật chuyển động) = 92 tổ hợp, cuộn từng bước 0,8 chiều cao khung nhìn):

| Chỉ số | `main` | Sau sửa chữ, chưa có CSS | Bản này |
|---|---|---|---|
| Tổ hợp tràn ngang | 0 | 0 | 0 |
| Phần tử chữ bị cắt bởi hộp hoặc ellipsis | 0 | 0 | 0 |
| Dòng cuối chỉ còn một từ (không kể nhãn nguồn S1…) | 112 | 118 | **16** |

Có 30 phần tử vượt mép phải khung nhìn, **giống hệt trên `main`** (`li.panel` 14, `span.meta` 12, `span.go` 4, ở trang chủ và `/library/` là bản chuyển hướng về trang chủ). Tôi suy ra đó là dải cuộn ngang của cảnh Lộ trình (chủ đích, ghim và cuộn dọc), chưa xác minh từng phần tử.

**Trạng thái tương tác** (cùng hai khổ, giảm chuyển động): menu mở ở trang chủ, hộp thoại Lens mở ở `/00/`, bấm một lựa chọn trong khối hỏi đáp ở `/01/`, khối prompt ở `/04/`: 0 tràn ngang, 0 chữ bị cắt ở cả tám trạng thái. Đã xem ảnh chụp của `/00/` và hộp thoại Lens ở 428×926 (cụm nhấn "ít lời dặn hơn", "chỉ có bạn mới biết" còn khớp).

**Chưa làm, nói rõ:**

- Chưa chụp và xem từng route ở cả hai khổ (chỉ đo hình học bằng trình duyệt thật và xem một số ảnh); chưa kiểm trạng thái khi bật chuyển động ở các cảnh ghim (Run, Journey) sau khi bấm; chưa kiểm khổ 320 và 375 (các bộ kiểm của repo đã có 320, 375, 390).
- Chưa kiểm trên trình duyệt khác ngoài Chromium; `text-wrap: pretty` bị trình duyệt chưa hỗ trợ bỏ qua, không hỏng gì.
- Chưa so với site đã deploy.

## Phụ lục A · Danh sách đầy đủ trước và sau (sinh từ `git diff`, mỗi dòng là một chỗ đổi, kèm 45 ký tự ngữ cảnh mỗi bên)

Tổng cộng 39 dòng nguồn có đổi chữ. Nhãn nguồn (S1…S19) **không đổi**.

| # | File | Trước | Sau |
|---|---|---|---|
| 1 | `content/parts.ts` | …ry: 'Claude cần ít lời dặn hơn bạn nghĩ nhiều. Thứ em nó còn thiếu là những điều chỉ có bạn mới biết.',… | …ry: 'Claude cần ít lời dặn hơn bạn nghĩ nhiều, nhưng vẫn thiếu những điều chỉ có bạn mới biết.',… |
| 2 | `content/parts.ts` | …('không tự thấy')} được. Phần còn lại, cứ để em nó tự phán đoán.ˋ,… | …('không tự thấy')} được. Phần còn lại, cứ để nó tự phán đoán.ˋ,… |
| 3 | `content/parts.ts` | …'<b>Chat</b> là nơi bạn đã quen (trò chuyện, tức chat, trên claude.ai hoặc app Claude). Bắt đầu ở đây nếu bạn chỉ cần hỏi, soạn, bàn bạc.',… | …'<b>Chat</b> là nơi bạn đã quen: trò chuyện với Claude trên claude.ai hoặc trong app Claude. Bắt đầu ở đây nếu bạn chỉ cần hỏi, soạn thảo hay bàn bạc.',… |
| 4 | `content/parts.ts` | …y để Claude giúp bạn tìm ra chúng, trước khi em nó bắt tay vào làm.',… | …y để Claude giúp bạn tìm ra chúng, trước khi nó bắt tay vào làm.',… |
| 5 | `content/parts.ts` | …phải đoán xem bạn muốn gì. Việc càng dài thì em nó càng gặp nhiều chỗ phải đoán như thế. Tác giả bài gốc kể rằng Claude Fable là mod… | …phải đoán xem bạn muốn gì. Việc càng dài thì Claude càng phải đoán ở nhiều chỗ. Tác giả bài gốc kể rằng Claude Fable là mod… |
| 6 | `content/parts.ts` | …p', src: ['S2'], html: 'Người giao việc giỏi thì vẫn có điều chưa biết như ai. Họ chỉ khác ở chỗ luôn tính trước là thế nào cũng có, rồi chủ động đi tìm: trước… | …p', src: ['S2'], html: 'Người giao việc giỏi cũng có những điều chưa biết. Điểm khác là họ luôn tính trước rằng thế nào cũng có, rồi chủ động đi tìm: trước… |
| 7 | `content/parts.ts` | …ta đã làm những gì, hay ổ gà nằm ở đâu. Hãy kể cho Claude nghe bạn là ai và đang biết tới đâu, rồi nhờ em nó ${G('rà điểm mù')} giúp. Trong prompt, tá… | …ta đã làm những gì, hay ổ gà nằm ở đâu. Hãy cho Claude biết bạn làm nghề gì và đã biết tới đâu về mảng này, rồi nhờ nó ${G('rà điểm mù')} giúp. Trong prompt, tá… |
| 8 | `content/parts.ts` | …a chốt, hãy để Claude ${G('phỏng vấn')} bạn. Em nó sẽ hỏi từng câu một, mỗi câu kèm sẵn vài lựa chọn, cho tới khi đủ để viết thành một ${T('spec', 'bản đặc tả công việc')}. Có spec rồi thì bạn mở một phiên mới để làm. Phiên ấy bắt đầu với context sạch sẽ, cùng một định nghĩa “thế nào là xong” đã được viết ra hẳn hoi.ˋ,… | …a chốt, hãy để Claude ${G('phỏng vấn')} bạn. Claude sẽ hỏi từng câu một, mỗi câu kèm sẵn vài lựa chọn, cho tới khi đủ để viết thành một ${T('spec', 'bản đặc tả công việc')}. Có spec rồi thì bạn mở một phiên mới để làm. Phiên ấy không mang theo những lần trao đổi cũ, nhưng đã có sẵn spec cùng một định nghĩa “thế nào là xong” được viết ra hẳn hoi.ˋ,… |
| 9 | `content/parts.ts` | …chiếu: nó cho Claude biết thế nào là tốt, để em nó tự đối chiếu lấy.ˋ },… | …chiếu: nó cho Claude biết thế nào là tốt, để Claude tự đối chiếu lấy.ˋ },… |
| 10 | `content/parts.ts` | …hase: 'Trong', en: 'LET IT WORK', vi: 'Cứ để em nó làm', minutes: 5,… | …hase: 'Trong', en: 'LET IT WORK', vi: 'Cứ để Claude làm', minutes: 5,… |
| 11 | `content/parts.ts` | …những điều đáng nhớ. Bạn chỉ cần cầm lái khi em nó đi lệch.',… | …những điều đáng nhớ. Bạn chỉ cần cầm lái khi nó đi lệch.',… |
| 12 | `content/parts.ts` | …chỗ mà kế hoạch không lường trước. Bạn muốn em nó dừng lại hỏi, hay cứ tự quyết rồi báo lại sa… | …chỗ mà kế hoạch không lường trước. Bạn muốn Claude dừng lại hỏi, hay cứ tự quyết rồi báo lại sa… |
| 13 | `content/parts.ts` | …y mở một phiên mới để bắt đầu làm. Phiên mới có ${T('context', 'ngữ cảnh')} sạch sẽ, lại mang theo được mọi thứ bạn đã gom góp trong… | …y mở một phiên mới để bắt đầu làm. Phiên mới bắt đầu với ${T('context', 'ngữ cảnh')} trống, nhưng vẫn mang theo được mọi thứ bạn đã gom góp trong… |
| 14 | `content/parts.ts` | …khi gặp chỗ buộc phải ${G('lệch kế hoạch')}, em nó sẽ chọn phương án an toàn hơn, ghi lại vào m… | …khi gặp chỗ buộc phải ${G('lệch kế hoạch')}, Claude sẽ chọn phương án an toàn hơn, ghi lại vào m… |
| 15 | `content/parts.ts` | …now: ˋChia nhỏ ra thành một cây gồm nhiều file ngắn. Claude sẽ ${G('mở dần')} từng file, đúng cá… | …now: ˋChia hướng dẫn thành các file nhỏ, mỗi file lo một việc. Claude sẽ ${G('mở dần')} từng file, đúng cá… |
| 16 | `content/parts.ts` | …hói quen làm việc của bạn, những lần bạn sửa em nó, các quyết định của dự án, và nơi tìm thông tin. Em nó tự ghi những điều ấy thành các file ghi chú,… | …hói quen làm việc của bạn, những lần bạn sửa lại Claude, các quyết định của dự án, và nơi tìm thông tin. Claude tự ghi những điều ấy thành các file ghi chú,… |
| 17 | `content/parts.ts` | …aude không ghi, và cũng không phải phiên nào em nó cũng ghi. Muốn chắc chắn thì bạn cứ nói thẳn… | …aude không ghi, và cũng không phải phiên nào Claude cũng ghi. Muốn chắc chắn thì bạn cứ nói thẳn… |
| 18 | `content/parts.ts` | …src: ['S3'], html: ˋHãy xem kỹ ${G('phút đầu')} tiên. Thấy lệch hướng thì bấm phím Esc: Claude sẽ… | …src: ['S3'], html: ˋHãy xem kỹ ${G('phút đầu tiên')}. Thấy lệch hướng thì bấm phím Esc: Claude sẽ… |
| 19 | `content/parts.ts` | …hình thanh toán còn thiếu trạng thái báo lỗi. Claude hỏi bạn.']],… | …hình thanh toán còn thiếu trạng thái báo lỗi, nên Claude hỏi bạn muốn xử lý thế nào.']],… |
| 20 | `content/parts.ts` | …spec: [['Chuyện xảy ra', 'Có hai yêu cầu chỏi nhau. Claude hỏi bạn.']],… | …spec: [['Chuyện xảy ra', 'Hai yêu cầu trong SPEC chỏi nhau, nên Claude dừng lại hỏi bạn chọn bên nào.']],… |
| 21 | `content/parts.ts` | …ng bước. Việc của bạn là cầm ${G('lái')} khi em nó đi lệch, và đọc lại những gì em nó đã ghi.ˋ,… | …ng bước. Việc của bạn là cầm ${G('lái')} khi Claude đi lệch, và đọc lại những gì nó đã ghi.ˋ,… |
| 22 | `content/parts.ts` | …summary: 'Hãy cho Claude một phép kiểm, đòi em nó đưa bằng chứng, rồi hỏi vặn lại cho ra lẽ. Sau đó mới tới lúc để em nó chạy, và vài lần chạy đầu của việc mới th… | …summary: 'Hãy cho Claude một phép kiểm, đòi bằng chứng, rồi hỏi vặn lại cho ra lẽ. Sau đó mới tới lúc để nó chạy, và vài lần chạy đầu của việc mới th… |
| 23 | `content/parts.ts` | …i ấy, chính bạn sẽ thành người kiểm thay cho em nó.', src: ['S3'],… | …i ấy, chính bạn sẽ thành người kiểm thay cho Claude.', src: ['S3'],… |
| 24 | `content/parts.ts` | …rc: ['S3'], html: ˋHãy cho Claude một thứ mà em nó tự chạy được, và kết quả chỉ có hai đường: đạt, hoặc không đạt. Một khi đã có ${G('phép kiểm')} như thế, Claude thường sẽ tự làm tiếp cho tới khi qua được. Nhưng ở những lần chạy dài, có lúc em nó dừng sớm và báo một bản tóm tắt tiến độ trong khi vẫn còn việc dở. Với việc chạy mà không có ai ngồi xem, hãy dùng lệnh <code>/goal</code> hoặc Stop hook để kéo em nó làm tiếp. Tài liệu chính thức đưa ra vài ví… | …rc: ['S3'], html: ˋHãy cho Claude một thứ mà Claude tự chạy được, và kết quả chỉ có hai đường: đạt, hoặc không đạt. Một khi đã có ${G('phép kiểm')} như thế, Claude thường sẽ tự làm tiếp cho tới khi qua được. Nhưng ở những lần chạy dài, có lúc Claude dừng sớm và báo một bản tóm tắt tiến độ trong khi vẫn còn việc dở. Với việc chạy mà không có ai ngồi xem, hãy dùng lệnh <code>/goal</code> hoặc Stop hook để kéo Claude làm tiếp. Tài liệu chính thức đưa ra vài ví… |
| 25 | `content/parts.ts` | …i tính đúng sai, và bỏ qua chuyện văn phong. Bởi một reviewer đã được nhờ đi tìm lỗi thì kiểu gì cũng sẽ tìm ra được một cái gì đó.ˋ },… | …i tính đúng sai, và bỏ qua chuyện văn phong. Reviewer đã được nhờ đi tìm lỗi thì kiểu gì cũng tìm ra được một cái gì đó.ˋ },… |
| 26 | `content/parts.ts` | …'], html: '“Giao trọn” không có nghĩa là cho em nó mọi quyền. Với mỗi việc Claude có thể làm, h… | …'], html: '“Giao trọn” không có nghĩa là cho Claude mọi quyền. Với mỗi việc Claude có thể làm, h… |
| 27 | `content/parts.ts` | …hép) và <b>chặn</b> (Claude không được làm). Quy tắc khớp trước thì thắng, theo thứ tự chặn, rồi hỏi, rồi cho phép, nên luật chặn không bị luật cho phép nào lá… | …hép) và <b>chặn</b> (Claude không được làm). Khi nhiều quy tắc cùng khớp, Claude Code xét theo thứ tự chặn, hỏi trước rồi cho phép, và quy tắc khớp đầu tiên sẽ thắng, nên luật chặn không bị luật cho phép nào lá… |
| 28 | `content/parts.ts` | …why: 'Nếu bạn trả lời sai, tức là bạn chưa hiểu thay đổi này đủ để duyệt nó.' },… | …why: 'Trả lời sai nghĩa là bạn chưa hiểu thay đổi này đủ rõ để duyệt.' },… |
| 29 | `content/parts.ts` | …e làm rõ công việc, giao trọn phần thực thi, cho em nó một phép kiểm, rồi yên tâm ${G('buông')}… | …e làm rõ công việc, giao trọn phần thực thi, đưa cho nó một phép kiểm, rồi yên tâm ${G('buông')}… |
| 30 | `content/parts.ts` | …{ label: 'Trong lúc chạy', line: 'Cứ để em nó tự tìm, tự nhớ. Bạn chỉ cầm lái khi em nó đi lệch.', parts: ['03'] },… | …{ label: 'Trong lúc chạy', line: 'Cứ để Claude tự tìm, tự nhớ. Bạn chỉ cầm lái khi nó đi lệch.', parts: ['03'] },… |
| 31 | `content/parts.ts` | …{ label: 'Sau khi xong', line: 'Cho em nó một phép kiểm, hỏi vặn lại kết quả, rồi mới… | …{ label: 'Sau khi xong', line: 'Cho Claude một phép kiểm, hỏi vặn lại kết quả, rồi mới… |
| 32 | `content/parts.ts` | …tới', 'chính bạn chưa nghĩ tới', 'trước khi em nó bắt tay vào làm'],… | …tới', 'chính bạn chưa nghĩ tới', 'trước khi nó bắt tay vào làm'],… |
| 33 | `content/practice.ts` | …back: [{ href: '03/', label: '03 · Để nó làm' }, { href: '04/', label: '04 · Kiểm, hỏ… | …back: [{ href: '03/', label: '03 · Cứ để Claude làm' }, { href: '04/', label: '04 · Kiểm, hỏ… |
| 34 | `components/scenes/Intro.astro` | …ass="nb-hl">giao trọn</em> phần thực thi cho em nó.</p>… | …ass="nb-hl">giao trọn</em> phần thực thi cho nó.</p>… |
| 35 | `pages/index.astro` | …õ công việc, rồi giao trọn phần thực thi cho em nó. Hướng dẫn không chính thức.">… | …õ công việc, rồi giao trọn phần thực thi cho nó. Hướng dẫn không chính thức.">… |
| 36 | `pages/index.astro` | …õ công việc, rồi giao trọn phần thực thi cho em nó.', 'one')} />… | …õ công việc, rồi giao trọn phần thực thi cho nó.', 'one')} />… |
| 37 | `pages/c02/index.astro` | …vừa viết hỏng phần phân tích 2 lần. Bạn nhắn "không phải vậy, thử lại". Lần thứ 3 sẽ tốt hơn hay tệ&nbsp;hơn?</h2>… | …vừa viết hỏng phần phân tích 2 lần. Bạn nhắn “không phải vậy, thử lại”. Lần thứ 3 sẽ tốt hơn hay tệ&nbsp;hơn?</h2>… |
| 38 | `pages/c02/index.astro` | …"><a class="nb-btn" href={url('03/')}>← 03 · Để nó làm</a><a class="nb-btn is-solid" data-sweep… | …"><a class="nb-btn" href={url('03/')}>← 03 · Cứ để Claude làm</a><a class="nb-btn is-solid" data-sweep… |
| 39 | `config.ts` | …c hành, không chính thức, giúp bạn giao trọn việc số cho Claude Code như giao cho một đồng nghiệp giỏi: brief rõ, context gọn, quyền đúng chỗ, kết quả được kiểm chứng.',… | …c hành, không chính thức, giúp bạn giao trọn công việc cho Claude Code như giao cho một đồng nghiệp giỏi: brief rõ, context gọn, quyền đúng chỗ, kết quả có kiểm chứng.',… |
