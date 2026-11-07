Logo của No Babysitting là chữ "No babysitting" dạng **Blocks**: chữ serif đậm lấy mẫu xuống một lưới pixel thô, nên trông như được dựng từ các ô của terminal. Khi xuất hiện lần đầu, nó là một **dòng code chữ trắng** được gõ ra, rồi được "biên dịch" từ trái sang phải thành chữ khối màu accent.

## Dùng khi

- Bìa (Cover), màn mở đầu, finale: bản lớn, màu accent. Hiệu ứng gõ → biên dịch chạy **đúng một lần** khi vào trang.
- Thanh HUD, chân trang: bản nhỏ, đơn sắc `fg` (HUD không dùng accent).
- README, banner CLI, ghi chú commit: bản văn bản bằng nửa khối `▀▄█`.

## File gốc

Bitmap là bản gốc của logo; không gõ lại bằng font. Mọi định dạng sinh từ cùng một bitmap (`tools/make-logo.js`, Newsreader 800):

| Bản | Lưới | Dùng khi cao | File |
|---|---|---|---|
| Lớn | 139 × 18 pixel, đường chân chữ ở hàng 14 | ≥ 36px | `assets/Logo/logo-blocks.svg` · `.json` · `.txt` |
| Nhỏ | 104 × 14 pixel, đường chân chữ ở hàng 11 | 28–35px (2px mỗi pixel) | `assets/Logo/logo-blocks-sm.svg` · `.json` · `.txt` |

Trong trang: `NB.logoSVG('lg' | 'sm')` trả về SVG một path, `fill: currentColor`; `NB.logo(el, { size, maxScale })` dựng hiệu ứng.

## Quy tắc

- **Màu:** accent (chính), `fg` (đơn sắc, lớp `.is-mono`), hoặc `bg` trên khối `fg` (đảo màu). Không màu nào khác. Logo là chỗ duy nhất accent được dùng làm *nhận diện* chứ không phải hành động; vì vậy không đặt logo accent sát một nút accent.
- **Kích thước:** phóng theo bội số nguyên của lưới (139 × n hoặc 104 × n). `NB.logo` tự làm tròn bề rộng về bội số gần nhất (tối đa `maxScale`, mặc định 5). Bản lớn không thu dưới 36px; dưới mức đó dùng bản nhỏ.
- **Khoảng trống:** ít nhất 4 pixel logo ở mọi phía.
- **Hiệu ứng (họ M11 · từ vibe đến agentic):**
  1. dòng code `No babysitting` chữ trắng (mono 500), cỡ chữ bằng bề rộng logo và nằm trên đúng đường chân chữ của logo, gõ từng ký tự (khoảng 0,055s mỗi ký tự) với con trỏ ▍;
  2. con trỏ nháy 2 lần rồi ẩn;
  3. vệt quét chạy từ trái sang phải trong 1,1s (`ease: none`): chữ trắng bị cắt đi, chỗ đó hiện pixel khối **trắng**, và 14 cột phía sau vệt chuyển dần sang **accent**.
  Reduced motion: hiện thẳng logo cuối. Không lặp; chỉ chạy lại khi người dùng bấm `[ Phát lại ]`.

## Không nên

- Gõ "No babysitting" bằng Newsreader, Archivo hay bất kỳ font nào rồi gọi là logo.
- Kéo giãn, viền, đổ bóng, gradient, làm tròn góc pixel.
- Thu bản lớn xuống cỡ HUD: nét serif vỡ thành nhiễu.
- Chạy hiệu ứng ở mọi trang hoặc mỗi lần cuộn tới.

## Accessibility

- SVG có `role="img"` và `aria-label="No babysitting"`. Dòng code trong hiệu ứng là `aria-hidden`, nên screen reader chỉ đọc tên một lần.
- Bản văn bản `▀▄█` đặt trong `<pre aria-label="No babysitting (chữ khối)">`.
