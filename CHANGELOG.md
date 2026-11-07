# Changelog

Mỗi đợt kaizen ghi một mục: đã đổi gì, đo được gì. Kế hoạch: `docs/08-kaizen-go-live.md`.

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
