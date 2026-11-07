DurabilityTag cho biết một best practice bền tới đâu khi model thay đổi: Bền vững, Phụ thuộc model, Đã thay thế, hoặc Chưa thống nhất. Từ 07/11/2026 nó là một **ô đánh dấu 9px + chữ mono trung tính**, không khung viền, không chữ màu.

## Dùng khi

- Trên mọi mục Library, trong ThenNowCard, cạnh con số trong chương, và trên chip lọc của Library (ô đánh dấu đứng một mình: `.nb-mk`).

## Người dùng cung cấp

- `kind`: `timeless` · `model-sensitive` · `superseded` · `contested`.

## Quy tắc

- **Hình mang nghĩa, màu chỉ nhấn.** Ô đánh dấu là cùng một hình vuông 9px viền 1,5px; bốn mức khác nhau ở *cách tô*, nên vẫn phân biệt được khi in đen trắng hay với người mù màu:

  | kind | Nhãn | Ô đánh dấu | Màu ô |
  |---|---|---|---|
  | `timeless` | Bền vững | ô đặc | `signal` |
  | `model-sensitive` | Phụ thuộc model | nửa trái đặc | `warn` |
  | `superseded` | Đã thay thế | gạch chéo, chữ gạch ngang (`<s>`, gạch màu `danger`) | `danger` |
  | `contested` | Chưa thống nhất | ô rỗng có chấm giữa | `info` |

- **Chữ luôn là `fg`** (mono 600, 12px, giãn 0,04em, tiếng Việt viết thường). Không tô chữ bằng màu trạng thái, không khung, không nền.
- Cỡ lớn `.is-lg` (13px, ô 11px) chỉ dùng cạnh số condensed lớn.
- Đây cũng là ngôn ngữ chung của mọi `.nb-tag` trong hệ (trạng thái tiêu chí, bề mặt có/chưa rõ, cần kiểm chứng lại): đặc = có/đã chắc, nửa = một phần/còn tuỳ, gạch chéo = bị thay/bị chặn, chấm = chưa rõ/chưa ngã ngũ, rỗng = chưa có.

## Không nên

- Quay lại kiểu khung viền màu + chữ màu: bốn màu trạng thái to ngang nhau biến trang thành đèn giao thông.
- Thêm ký hiệu chữ (◆ ◐ ✕ ⇄) vào trước nhãn: ô đánh dấu đã làm việc đó.
- Gắn nhiều hơn một nhãn độ bền cho một mục.

## Accessibility

- Ô đánh dấu là trang trí (`::before` hoặc `aria-hidden`); **chữ của nhãn phải tự đủ nghĩa**. Khi chữ chưa đủ (ví dụ nhãn bề mặt "Desktop"), thêm chữ ẩn `<span class="nb-sr">: có</span>`.
- Tương phản: chữ `fg` ≥ 14:1; ô đánh dấu là đồ hoạ không chứa chữ, các màu trạng thái đều ≥ 3:1 trên `bg` và `bg-raised`.
