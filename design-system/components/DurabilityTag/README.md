DurabilityTag cho biết một best practice bền tới đâu khi model thay đổi: Bền vững, Phụ thuộc model, Đã thay thế, hoặc Chưa thống nhất.

## Dùng khi

- Trên mọi mục Library, trong ThenNowCard, và trên chip lọc của Library.

## Người dùng cung cấp

- `kind`: `timeless` · `model-sensitive` · `superseded` · `contested`.

## Quy tắc

- Mỗi nhãn là viền + icon + chữ, không bao giờ chỉ dựa vào màu:
  - **Bền vững**: viền `signal`, icon ◆. Nguyên lý không phụ thuộc thế hệ model (ví dụ: cho Claude cách tự kiểm chứng).
  - **Phụ thuộc model**: viền `warn`, icon ◐. Con số hoặc chiến thuật gắn với một thế hệ model (ví dụ: dumb zone khoảng 40%).
  - **Đã thay thế**: viền `danger`, icon ✕, chữ gạch ngang. Đã có cơ chế mới (ví dụ: phím `#` → auto-memory).
  - **Chưa thống nhất**: viền **đứt nét** `info`, icon ⇄. Các nguồn mâu thuẫn (ví dụ: CLAUDE.md < 150 hay < 200 dòng).
- Góc vuông (`r-pill` = 0, Terminal Brutalism), chữ mono 12px; có thể bọc ngoặc vuông: `[◆ Bền vững]`.

## Không nên

- Dùng màu của nhãn cho chữ thân bài xung quanh.
- Gắn nhiều hơn một nhãn độ bền cho một mục.

## Accessibility

- Chữ của nhãn đọc được bằng screen reader. Icon có `aria-hidden`.
