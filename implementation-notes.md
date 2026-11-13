# Ghi chú triển khai

Nơi ghi mọi chỗ **lệch kế hoạch**: chỗ làm khác tài liệu, khác đề xuất trong issue, hoặc khác điều đã nói trước đó, kèm lý do và PR. Quy ước ở `AGENTS.md` §6. Mới nhất ở trên.

## Lệch kế hoạch

### Đợt dọn dẹp theo `/skill-doctor` (13/11/2026)

- **Cache trình duyệt Playwright: thêm rồi gỡ (PR #55, PR D74).** Chủ dự án chọn mục này; tôi ước tính tiết kiệm nửa phút đến một phút mỗi lần chạy. Đo ở CI: bước cài Chromium 19 giây khi chưa có cache; có cache thì 4 giây khôi phục cộng 31 giây cài. Cache không giúp vì thời gian nằm ở `--with-deps` (apt), không ở tải trình duyệt. Gỡ khỏi hai workflow; giữ biến `PW_VERSION` và `concurrency`.
- **"paths-ignore" làm bằng bước nhận diện phạm vi, không bằng `paths-ignore`.** Chủ dự án chọn `paths-ignore`; nếu `main` bắt buộc status `check` thì PR tài liệu sẽ kẹt, nên job vẫn chạy và báo xanh, chỉ bỏ các bước nặng.
- **Số đo một lần chạy đủ bộ (không cache):** tổng 8 phút 11 giây; `check.cjs` 1 phút 54 giây, type-check 1 phút 42 giây, design-check 2 phút 53 giây, art-lock 58 giây, cài Chromium 19 giây. Bỏ type-check, tự kiểm và design-check khỏi deploy tiết kiệm khoảng 4 phút 40 giây mỗi lần.
- **Chưa làm theo lựa chọn của chủ dự án:** xoá nhánh đã merge, gỡ `screenshots/references`, ngừng theo dõi `previews/`, sửa skill `typography-check`; chủ dự án chỉ chọn gỡ `tools/__pycache__` (PR #54).

### Đợt xử lý 15 issue #20 đến #34 (13/11/2026)

- **#21, Library: chuyển hướng thay vì trang khung (PR #42).** Issue đề xuất ẩn khỏi menu và sitemap, hoặc sửa chữ nội bộ. Chủ dự án chọn giữ trang Nâng cao dùng được (c02) và ẩn trang chưa có nội dung. Tôi ẩn Library bằng chuyển hướng `/library/` về trang chủ, không dựng trang "đang viết lại", vì trang khung cần chữ mới phải chờ duyệt.
- **#21, một khẳng định sai trong bản đầu PR #42.** Tôi viết `ContradictionNote` không hiện ra ở c02; kiểm lại trên `dist/` thì có (chú thích ở `ContextMeter.astro`). Đã sửa trước khi merge, chỉ xoá chữ.
- **#21, sửa hai danh sách trang của bộ kiểm.** `check.cjs` và `design-check.cjs` bỏ `library/` vì trang không còn nội dung. Không nới ngưỡng nào.
- **#30, `robots.txt` không đạt đủ mục đích của issue (PR #45).** Trình thu thập chỉ đọc `robots.txt` ở gốc host; trang nằm dưới `/no_babysitting_anymore/`, nên tệp phục vụ ở `/no_babysitting_anymore/robots.txt`. Tệp ở gốc `no-babysitting.github.io` thuộc repo Pages của tổ chức, không thuộc repo này.
- **#30, chỉ bỏ nhãn vùng ở câu tuyên ngôn.** Nhiều vùng khác cũng có `aria-labelledby` trỏ tới tiêu đề của chính nó. Tôi chỉ đổi vùng có bằng chứng trong issue; bỏ nhãn ở mọi vùng làm mất mốc điều hướng theo vùng.
- **#28, font: bỏ Cyrillic và Hy Lạp (PR C).** Google Fonts trả thêm các bộ này; trang không dùng nên chỉ giữ latin, latin-ext và vietnamese. Trang xem trước trong `design-system/` vẫn tải từ Google Fonts; không phải bản live.
- **#33, `build.json` chỉ kiểm được sau merge.** Bước ghi tệp chạy trong `deploy.yml`, tức chỉ khi `main` nhận commit; trước merge tôi chỉ chạy được lệnh của bước đó.
- **Quy trình: PR #45 (và các PR sau) merge ngay sau commit gộp `main` chỉ giải xung đột CHANGELOG.** Mỗi PR thêm một mục lên đầu CHANGELOG nên mọi PR còn mở xung đột sau mỗi lần merge; chờ CI chạy lại sau mỗi lần gộp (8 phút) làm các PR nối đuôi nhau. Ngoại lệ này đã ghi vào `AGENTS.md` §2.
- **Quy trình: nhánh riêng cho từng PR.** Chủ dự án cho phép nhánh `claude/f-0NN-…` để mở PR song song (13/11), thay vì một nhánh tuần tự.
- **#32 và #34, hiến chương.** PR #19 (file trỏ thay hiến chương, sửa #34) chưa được merge và cần chủ dự án duyệt; D71 trong `docs/08` §1f đã ghi vai hội đồng khớp với nội dung PR đó.
