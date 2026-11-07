FloatingOps là bố cục nhiều panel nổi, cho thấy một agent đang thật sự vận hành: trạng thái, danh sách việc, nhật ký, bộ đếm số liệu và thông báo, tất cả do một máy trạng thái điều khiển.

## Học từ reference

- **Video Polsia**: panel nổi nhiều lớp, nhật ký hoạt động, chữ decode, số liệu chạy. Chuyển động phải kể được "hệ thống đang làm gì".
- **Artefakt**: nền chấm (dot-matrix) và nhãn mono.

## Người dùng cung cấp

- Kịch bản dạng máy trạng thái: `idle → pending → processing → verifying → done`, cùng danh sách task, các dòng log và số liệu đích.

## Quy tắc

- Mỗi thay đổi hình ảnh ứng với một thay đổi trạng thái thật:
  - task chuyển `[ ]` → `[~]` (`accent`) → `[✓]` (`signal`);
  - log thêm dòng (decode M4);
  - bộ đếm chạy;
  - The Colleague đổi mặt.
- Panel: góc vuông, viền `control`, nền `bg-raised`, `shadow-overlay` (đây là lớp nổi). Parallax tối đa khoảng 16px theo `data-depth`.
- Log giữ tối đa 6 dòng; dòng mới nhất màu `fg`, các dòng cũ `fg-muted`.
- Mobile: các panel xếp dọc, không parallax.
- Reduced motion: hiện thẳng trạng thái cuối.

## Không nên

- Dùng chuyển động ngẫu nhiên hoặc lặp vô hạn.
- Để panel che tiêu đề hoặc CTA.
- Có nhiều hơn 5 panel cùng lúc.

## Accessibility

- Log có `aria-live="polite"`. Trạng thái được ghi bằng chữ (`state`). The Colleague có nhãn.
