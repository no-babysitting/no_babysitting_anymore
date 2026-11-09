# omp · UX1: nơi gốc của ngữ pháp chuyển động (09/11/2026)

> Thư mục `docs/omp/` là nơi **agent ghi chú lại những gì đã làm và những gì lệch tài liệu**. Theo yêu cầu của chủ dự án (09/11/2026): **không sửa bất kỳ tệp nào trong `docs/`**; mọi cập nhật đi vào đây.

## Luật mới

- `docs/` là **chỉ đọc** với coding agent. Cần ghi lại điều gì → tệp mới trong `docs/omp/`.
- Hệ quả cho “một nơi gốc cho mỗi luật” (`docs/19` §4): nơi gốc của **ngữ pháp chuyển động** dời từ `docs/` sang `design-system/motion.md` (đã là như vậy), và `docs/03` §6.2/§12.5, `docs/09` §1, `docs/README` vẫn giữ bản rút gọn cũ cho tới khi chủ dự án tự sửa `docs/`. Ghi chú này là chỗ nói rõ bản nào đúng khi hai nơi lệch.
- `CHANGELOG.md`, `design-system/**` vẫn được sửa bình thường (không nằm trong `docs/`).

## Vì sao có ghi chú này

PR UX1 đầu tiên sửa 4 tệp trong `docs/`. Sau khi chủ dự án đặt luật trên, 4 tệp đó đã được **hoàn nguyên về đúng `upstream/main`**, và mọi điều đáng ghi được chuyển vào đây.

## Những gì PR UX1 đã đổi (chỉ ngoài `docs/`)

| Tệp | Đổi gì |
|---|---|
| `design-system/motion.md` | Nơi gốc duy nhất của ngữ pháp **M1–M17**: bảng có cột **mục đích** (bảy mục đích của `docs/19` §4), M15–M17 vào bảng, bảng ba tầng **C/P/N** kèm toàn bộ ngân sách (pin ≤ 220% vh mỗi cảnh, vòng giao việc ≤ 100% vh mỗi bước, mặt nước ≈ 3k ô/giây), luật lặp “chỉ tầng N” với ba điều kiện, biên đạo theo pha, ba driver, khoảnh khắc lớn từng chương |
| `design-system/README.md` | Luật chuyển động trỏ `motion.md`; “không gì lặp vô hạn” → “chỉ tầng N được lặp”; mã M1–M17; MotionGrammar trỏ trang studies |
| `design-system/SOURCE-OF-TRUTH.md` | “Không có chuyển động ngoài M1–M17” |
| `design-system/components/MotionGrammar/README.md` | Trỏ `studies/index.html` cho M11–M17 |
| `design-system/components/JourneyHUD/README.md` | M1–M14 → M1–M17 |
| `design-system/tokens.json` | Mô tả `--accent`: “mã M1–M17” |
| `design-system/studies/index.html` | **Mới**: 17 hàng M1–M17 chạy thật cạnh nhau (tham chiếu sống của `docs/19` §4) |
| `CHANGELOG.md` | Một mục UX1 |

## Những chỗ tài liệu trong `docs/` nay đã cũ (chủ dự án sửa khi rảnh)

Các câu dưới đây **trái với `design-system/motion.md`**; `motion.md` là bản đúng. Ghi ở đây thay vì sửa `docs/`.

| Tệp · chỗ | Câu cũ | Nay đọc là |
|---|---|---|
| `docs/03` §6.2 (luật) | “Không có gì lặp vô hạn” | “Chỉ tầng N được lặp”, ba điều kiện ở `motion.md` §Luật và `docs/09` §1 |
| `docs/03` §6.2, §12.5 | Bảng M1–M10 và M11–M14 | Bảng đầy đủ M1–M17 (có mục đích) ở `motion.md` |
| `docs/03` §0.0 ghi chú, §1.2 `--accent`, §12.12 | “ngữ pháp M1–M10”, “mã M1–M14” | M1–M17 |
| `docs/09` §1 (bảng ba tầng) + dòng mở đầu | Bảng ba tầng là nơi gốc; “ngữ pháp M1–M14” | Bảng ba tầng nay ở `motion.md` §Ba tầng C/P/N (giữ nguyên mọi ngân sách); `docs/09` giữ kịch bản từng cảnh và ngân sách cảnh |
| `docs/README` (4 chỗ) | “M1–M14”, danh sách tệp thiếu `studies/` | M1–M17; thêm `design-system/studies/index.html` |
| `docs/04` §3.1, cây kiến trúc | “grammar(M1–M10)” | M1–M17 |
| `docs/08` D40 | “Giữ M1–M14, thêm M15–M17” | Vẫn đúng như một quyết định lịch sử; ngữ pháp hiện hành là M1–M17 |
| `docs/15` §4 | “Đổi luật: M1–M14 thành M1–M17” | Đã thực hiện ở `motion.md` |
| `docs/07` (ghi chép lịch sử 07/11) | “mã M1–M10” | Giữ nguyên: đây là biên bản cũ, không phải luật hiện hành |

## Đích ghim cho UX2 (chủ dự án chốt 09/11/2026)

Câu hỏi mở #2 của `docs/19` §9 đã có đáp án: **≤ 15 màn và ≤ 60% chiều dài trang chủ**, ở cả 1440×900 và 390×844.

- Giữ nguyên “cảm giác điện ảnh” lâu hơn phương án 12 màn của `docs/19` §6, nhưng vẫn buộc giảm so với hiện trạng (21,8/29,2 màn = 75% desktop; 20,0/28,1 = 71% điện thoại).
- Luật `pins` trong `site/scripts/design-check.cjs` so với 15 màn / 60%; ban đầu **chỉ cảnh báo**, chuyển thành lỗi khi v4 lên trang chủ (`docs/19` §8: “Luật chạy trong CI, ban đầu chỉ cảnh báo”).
- Hero, Spark, finale giữ nguyên độ dài; phần giảm đến từ v4 (bỏ “Hai lần tung đồng xu” −2,3 màn) và Lộ trình 12 → 5 panel.
