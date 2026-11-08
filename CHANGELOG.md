# Changelog

Mỗi đợt kaizen ghi một mục: đã đổi gì, đo được gì. Kế hoạch: `docs/08-kaizen-go-live.md`.

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
