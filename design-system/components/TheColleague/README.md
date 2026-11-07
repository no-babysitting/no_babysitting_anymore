The Colleague là nhân vật ASCII đại diện cho Claude trong vai người đồng nghiệp mới. Biểu cảm của nó luôn phản ánh trạng thái thật của cảnh, không bao giờ ngẫu nhiên.

## Dùng khi

- Trong HUD (cạnh StatusBoard), trong AgentWindow và trong FloatingOps. Được giới thiệu lớn ở chương 01, The New Colleague.

## Người dùng cung cấp

- `state`: `idle` · `tracking` · `thinking` · `working` · `asking` · `overloaded` · `verified`.

## Quy tắc

| Trạng thái | Mặt | Màu | Khi nào |
|---|---|---|---|
| idle | `[•_•]` | `fg-muted` | Chờ việc |
| tracking | `[ •_•]` / `[•_• ]` | `fg-muted` | Con trỏ đến gần (mắt dịch 1 ô) |
| thinking | `[°_°]…` | `info` | Đang đọc hoặc lập kế hoạch |
| working | `[>_<]≡` | `accent` | Nhật ký đang chạy |
| asking | `[•_•]?` | `warn` | Xin quyền hoặc hỏi lại |
| overloaded | `[@_@]` | `warn` | Quá nhiều việc song song (c09). Không gắn với ngưỡng context |
| verified | `[^_^]✓` | `signal` | Kiểm chứng xong |

- Chuyển trạng thái bằng M14: ScrambleText chỉ trên các ký tự của khuôn mặt, khoảng 0.35s.
- Mono 600; trong HUD cỡ 14px, ở hero cỡ 20–32px.

## Không nên

- Dùng hình con vật hoặc khối pixel màu cam (để tránh giống mascot chính thức).
- Cho nhân vật lời thoại riêng. "Lời" của nó là nhật ký hành động.
- Đổi trạng thái khi cảnh không đổi.

## Accessibility

- `role="img"` và `aria-label="Đồng nghiệp: …"`. Thay đổi trạng thái thông báo qua `aria-live="polite"`. Reduced motion: đổi tức thì.
