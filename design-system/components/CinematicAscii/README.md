CinematicAscii là cảnh full-color duy nhất được phép, dùng cho finale (và tuỳ chọn cho Mở đầu). Ký tự lấy màu từ một ảnh nguồn; tiêu đề và metadata trình bày theo kiểu khung phim.

## Học từ reference

- **Asciify**: chế độ "characters, source color", tức ký tự mang màu của ảnh gốc.
- **Artefakt**: media full-bleed; tiêu đề expanded ở góc dưới trái; metadata dạng nhãn và giá trị (`CLIENTS · TYPE · DATE`); bộ đếm `10 / 10`.

## Người dùng cung cấp

- `source`: lưới màu render sẵn lúc build (asciify-engine, pin bản ≥ 2 tuần tuổi), hoặc `NoBabysitting.sources.scene()` như trong preview.
- Bộ metadata: người giao, chế độ, lịch chạy, số liệu đã đối chiếu.

## Quy tắc

- `mode: "color"`. Độ sáng của màu được kẹp tối thiểu (`minLum` 0.34) để ký tự vẫn đọc được trên `bg`.
- Đầu vệt hội tụ vẫn là `accent`; lens hiện lớp đơn sắc `fg` ("nhìn vào cấu trúc").
- Có một dải chuyển `bg` ở 46% dưới cùng để tiêu đề và metadata luôn đạt độ tương phản.
- Bộ đếm và The Colleague phản ánh trạng thái thật: `working` khi đang chạy, `verified` khi đủ 14/14.
- Ảnh nguồn phải tự chụp hoặc tự dựng: không dùng ảnh stock có bản quyền, không dùng ảnh có thương hiệu.

## Không nên

- Dùng full-color ở chương nào khác ngoài Mở đầu và finale.
- Để ký tự che mất tiêu đề.

## Accessibility

- Canvas `aria-hidden`, có mô tả `nb-sr`. Metadata là `dl` thật.
