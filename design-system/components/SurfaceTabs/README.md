SurfaceTabs hiện phần "Cách làm" của một best practice theo ba bề mặt: Cowork, Claude Code app và CLI. Dữ liệu lấy từ ma trận bề mặt đã kiểm chứng.

## Dùng khi

- Pha **CÁCH LÀM**, ngay sau phần nguyên lý ("Hiểu").

## Người dùng cung cấp

- `featureId`: khoá trong `content/surfaces/matrix.yml` (ví dụ `plan-mode`).
- Component tự đọc từ ma trận: các bước cho từng tab, `availability` (Cowork · Desktop · Web · Mobile · CLI), `status`, `plans`, `verifiedAt`, `docs`, `fallbackVi`.

## Quy tắc

- Ba tab theo thứ tự **Cowork · Claude Code app · CLI**. Tab mặc định theo lựa chọn ở Mở đầu (đặt sẵn là Claude Code app). Lựa chọn được đồng bộ trên toàn trang và lưu cục bộ.
- Tab đang chọn có gạch chân `accent` 2px.
- Bước làm diễn đạt theo *khả năng* ("chọn Plan trong bộ chọn mode"), hạn chế tả vị trí nút.
- Hàng AvailabilityBadges dùng icon + chữ: ✓ có · ◐ một phần · — không · ? chưa có tài liệu. `?` **không** được hiểu là "không có".
- Tab không có tính năng: hiện "Chưa có tài liệu ở đây" và cách thay thế. Nếu cách thay thế là gợi ý của trang, gắn nhãn "Diễn giải".
- Chân khối: "Kiểm chứng dd/mm/yyyy" (`fg-subtle`) + link docs. Quá 30 ngày thì thêm nhãn "Cần kiểm chứng lại" (`warn`).
- StatusPill (viền `info`) chỉ hiện khi tính năng chưa GA. PlanPill chỉ hiện khi docs nêu rõ gói.

## Không nên

- Viết bước App khi ma trận chưa kiểm chứng.
- Dùng màu làm kênh duy nhất cho trạng thái khả dụng.
- Chép ảnh chụp màn hình UI.

## Accessibility

- `role="tablist"` / `tab` / `tabpanel`. Phím ←/→, Home, End để chuyển tab; `aria-selected`; panel có `aria-labelledby`.
