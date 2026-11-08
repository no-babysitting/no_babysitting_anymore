# 12 · Đánh giá độc lập lần 1 và cách đáp lại

Bản đánh giá: repo `no-babysitting/independance-evaluation-council`, `reports/2026-11-08-no-babysitting/README.md` (commit `68d9bb3`, 08/11/2026). Người đánh giá không truy cập repo nguồn, dùng Chromium giả lập phone, axe-core 4.10.2 và đối chiếu nguồn chính thức.
Tài liệu này ghi từng phát hiện: đã kiểm lại thế nào, kết luận, và việc đã làm hay sẽ làm. Quyết định của chủ dự án nằm ở `08-kaizen-go-live.md` (D17–D20).

## 1. Kết luận của bên đánh giá và quyết định

**Công bố hạn chế (soft launch 20–50 người) sau khi sửa 5 lỗi chặn; chưa đăng rộng.** Chủ dự án chấp nhận hướng này (D19). Cổng đăng rộng: c03 và c07 viết xong, thử trên thiết bị thật và trình đọc màn hình, 5 buổi quan sát người dùng, không còn lỗi mức Cao. Phần thiết bị thật và quan sát chưa làm (D20), nên **chưa đăng rộng**.

## 2. Từng phát hiện

Cột "Kiểm lại": cách mình đối chiếu, trên bản live ngày 08/11/2026 và trên mã nguồn.

| # | Phát hiện | Kiểm lại | Kết luận | Việc làm |
|---|---|---|---|---|
| H1 | Đoạn văn tách chữ biến mất với trình đọc màn hình | Chromium báo tên đoạn từ `aria-label`, nhưng ảnh chụp cây ARIA của Playwright cho `p.big` và `c02 p.body` chỉ là `- paragraph`, không có chữ. Heading dùng `aria-label` vẫn có tên. Bộ kiểm cũ chạy ở reduced motion nên không thấy | **Đúng** | PR-A: chữ thật nằm trong bản ẩn cho trình đọc màn hình, chỉ phần hình bị tách. Thêm kiểm tự động (cây truy cập, 64 đoạn chữ, 15 trang); trên site cũ kiểm này bắt được 6/8 đoạn ở trang chủ và 1/3 ở c02 |
| (mở rộng H1) | Nội dung "hiện khi cuộn tới" đặt `visibility: hidden` nên vắng khỏi cây truy cập tới khi cuộn | 16 phần tử ở trang chủ lúc vừa tải | **Đúng** | PR-A: đổi sang `opacity`, thêm `pointer-events` và chuyển pin theo focus bàn phím cho Run, Finale |
| H2 | Chương khung lộ thuật ngữ nội bộ | Có, kể cả ở c02 ("ContradictionNote", "(Dex)", "(Matt)") | **Đúng** | PR-C |
| H3 | Cửa vào chính dẫn tới chương rỗng; phone phải cuộn lâu | Câu giá trị đầu ở màn hình 4,4 (không phải 10); ba câu hỏi ở màn hình 4,8; Vòng giao việc ở 9,4 (iPhone 13, 390px) | **Đúng hướng, số liệu phóng đại** | PR-C (CTA, tóm tắt) và PR-B (hero) |
| H4 | 14 mục Library là link chết | `href="#"` | **Đúng** | PR-A: bỏ thẻ `a`; thêm luật CI cấm link không có đích |
| H5 | Không có tác giả | Đúng | **Đúng** | PR-C theo D17 |
| M1 | Đếm chương không nhất quán | "12 phần", "/ 10", "Phần 12 / 12", "3/12" | **Đúng** | PR-B |
| M2 | Màu nhấn gợi Claude | — | Quyết định | D18: giữ nguyên, chấp nhận rủi ro |
| M3 | Tràn ngang 320px | `scrollWidth` 331 / 320, do header | **Đúng** | PR-B (header mới) |
| M4 | Tương phản chữ nhỏ | axe đo lúc chữ đang hiện dần; bộ kiểm typography đo chữ ở trạng thái cuối: 0 lỗi trên 28 lượt | **Phần lớn sai** | Không đổi. Còn lại hai chỗ làm mờ có chủ đích (số trang trí, chữ tuyên ngôn chưa đọc tới) |
| M5 | Thiếu `<main>`, skip link; landmark trùng ở c10 | Trang chủ thiếu `<main>`; trang chương đã có; skip link thiếu ở mọi trang; c10 có hai vùng cùng tên "No Babysitting" | **Đúng một nửa** | PR-A |
| M6 | Font tải từ Google, tuyên bố riêng tư chưa nói | Đúng | **Đúng** | Sau PR-B: tự host font |
| M7 | Nguồn không truy được | Tên riêng không link, mã nguồn nội bộ | **Đúng** | PR-C |
| M8 | `<title>` và tên chương tiếng Anh | Đúng | **Đúng** | PR-C: `<title>` tiếng Việt trước |
| M9 | Hai nhãn Library dễ sai | "Hook … phụ thuộc model" và "Opus … đã thay thế" | **Đúng** | PR-C, đối chiếu lại docs |
| M10 | `aria-live` đọc lặp | Có ở AgentWindow, FloatingOps, mặt Run | **Đúng** | PR-A: bỏ ở phần tự chạy; giữ ở phần người dùng bấm (bảng context, đếm Library, StatusBoard, TheColleague) |
| L1 | Cảnh báo GSAP `target not found` | `gsap.set` trên danh sách rỗng khi trang không có phần tử `data-reveal` nào cùng loại | **Đúng** | PR-A: chỉ gọi khi danh sách không rỗng |
| L2 | Không có sitemap, 404 mặc định | Đúng | **Đúng** | PR-A: `sitemap.xml`, `404.html` |
| L3 | Dấu ✓ cho chương khung | — | Đúng | PR-C |
| L4 | Đồng hồ ở hero | — | Đồng ý | PR-B |
| L5 | "1 simulator chạy thật" | — | Đúng | PR-C |
| L6 | "Routines" đã đổi tên | Cần đối chiếu docs trước khi sửa | Chờ | PR-C |

Nội dung về Claude Code và Cowork: bên đánh giá đối chiếu và thấy khớp. Hai khẳng định cần sửa: c09 "kể cả khi máy bạn tắt" thiếu ngoại lệ khi việc cần file hoặc app trên máy (PR-C); các khẳng định ở c01 và c08 chưa có nguồn truy được (PR-C).

## 3. Ghi chú về phương pháp

- Bài học cho bộ kiểm của mình: kiểm ở reduced motion cho thấy trạng thái cuối nhưng bỏ sót những gì chuyển động làm mất. Từ nay `check.cjs` chạy thêm một lượt với chuyển động bật (axe-core, cây truy cập, link không đích).
- Cây truy cập: đừng kiểm bằng "tên" của nút, vì Chromium vẫn trả tên từ `aria-label` trên đoạn văn. Dùng ảnh chụp ARIA (Playwright `ariaSnapshot`), vì nó theo luật ARIA như trình đọc màn hình.
- Chưa có bằng chứng từ trình đọc màn hình thật hay Safari thật ngoài iPhone của chủ dự án (D20).
