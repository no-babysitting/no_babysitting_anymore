Ba nhãn nhỏ đi cùng mọi bước "Cách làm" và mọi mục Library có tính năng: **StatusPill** (trạng thái phát hành), **PlanPill** (gói cần có) và **AvailabilityBadges** (bề mặt nào có). Cả ba đọc từ ma trận bề mặt (`matrix.yml`, có `verifiedAt`), không viết cứng trong nội dung.

## Dùng khi

- Trong SurfaceTabs, cạnh từng bước.
- Trong chi tiết LibraryCard.
- PlanPill cạnh tiêu đề beat khi cả beat chỉ áp dụng cho một số gói (ví dụ Claude Tag ở c09).

## Người dùng cung cấp

- `status`: `ga | beta | research-preview | experimental | unknown` (SAD §7.1 `SurfaceEntry.status`).
- `plans`: danh sách gói, **chỉ khi docs nêu rõ**. Docs không nêu thì để trống và không hiện PlanPill.
- `availability`: `cowork | desktop | web | mobile | cli` → `yes | partial | no | unknown`.

## Quy tắc

- Tất cả dùng `.nb-pill`: mono 12px, góc vuông, viền 1px, **không accent**.
- **StatusPill:** GA viền liền `signal`; mọi trạng thái chưa GA viền đứt nét `info` (đứt nét = "có thể đổi", cùng ngôn ngữ với nhãn *Chưa thống nhất*). `unknown` thì không hiện pill.
- **PlanPill:** tiền tố `◇` màu `fg-subtle`, tên gói nối bằng ` · `. Màu `fg-muted`, không đổi màu theo gói của người học.
- **"Gói của tôi":** chip chọn một gói (lưu `localStorage`, có try/catch). Mỗi bước có PlanPill hiện thêm một dòng: `✓ Có trong gói Pro của bạn` (`signal`) hoặc `— Gói Pro chưa có; cần Team hoặc Enterprise` (`fg-muted`). **Không ẩn bước nào** (quyết định: gói của người học trộn lẫn).
- **AvailabilityBadges:** hàng ô liền viền theo thứ tự cố định Cowork · Desktop · Web · Mobile · CLI. Ký hiệu + màu: `✓` signal, `◐` warn, `—` fg-subtle, `?` info. Chữ tên bề mặt luôn hiện.

## Không nên

- Đoán gói. Không có nguồn thì bỏ trống. Dữ liệu gói trong preview lấy từ ma trận bề mặt (06/11/2026): Claude Tag chỉ Team/Enterprise (public beta); computer use chỉ Pro/Max/Ultra.
- Dùng `danger` cho "chưa có trong gói của bạn": đó không phải lỗi.
- Dùng tên sản phẩm cũ. Nếu tính năng đổi tên, ghi tên mới; tên cũ vào `renamedFrom` và chỉ nhắc trong Library.

## Accessibility

- Ký hiệu `✓ ◐ — ?` là `aria-hidden`; trạng thái đọc bằng chữ ẩn (": có", ": chưa rõ").
- AvailabilityBadges là `role="list"` có `aria-label` nêu tính năng.
- Chip "Gói của tôi" có `aria-pressed`; danh sách bước là `aria-live="polite"` nên dòng "có/chưa có trong gói" được đọc lại sau khi đổi gói.
