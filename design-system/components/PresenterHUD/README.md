PresenterHUD là thanh dưới ở chế độ trình chiếu (Presenter mode). Người trình bày cần biết bốn điều mà không phải nhìn notes: *đang ở beat nào và pha nào*, *chương đã chạy bao lâu so với dự kiến*, *còn bao lâu cho thảo luận*, và *phím tắt*.

## Dùng khi

- Chỉ ở Presenter mode. Thay JourneyHUD; ChapterRail ẩn.

## Người dùng cung cấp

- `beat`: id `c02:b2` và pha (`hỏi · đoán · thấy · hiểu · cách làm · làm · nhớ`, cộng `then → now`).
- `beats`: số beat của chương (để vẽ dải ô).
- `plannedMinutes`: thời lượng trình chiếu dự kiến của chương (Script: `10'/12'` → 12 phút).
- `discussionSeconds`: thời gian thảo luận mặc định ở pha đoán (preview: 90 giây).

## Quy tắc

- **Bố cục cố định, trái sang phải:** beat + pha + dải ô beat · đồng hồ chương · thanh *Thảo luận* · nút (← → Notes ?). Nền `bg-raised`, viền trên 1px `fg` để tách khỏi sân khấu.
- **Dải ô beat:** ô đã qua `fg-muted`, ô hiện tại **accent** (vị trí hiện tại), ô sắp tới chỉ có viền.
- **Đồng hồ chương:** số condensed, `tabular-nums`, kèm `/ 12:00`. Quá giờ thì đổi sang `◐ +00:42` màu `warn` (ký hiệu + chữ, không chỉ màu). Không nhấp nháy, không âm thanh.
- **Thảo luận:** chỉ bật ở pha *đoán*; các pha khác thanh mờ (`fg-subtle`) và nút bị tắt. Thanh khối `█░` đếm ngược (M2 · tiêu hao). Hết giờ chỉ hiện một thông báo ngắn "Hết giờ thảo luận".
- Đổi beat: tên pha và câu trên sân khấu đổi; câu hỏi vào bằng fade + trượt 8px `dur-base`. Site thật gọi `tl.tweenFromTo(nhãnHiệnTại, nhãnKế)` của timeline chương (PresenterDriver).
- **Phím tắt** (bảng mở bằng `?`): `→`/`Space` beat sau · `←` beat trước · `D` thảo luận · `N` cửa sổ notes · `B` màn hình tối · `Esc` đóng bảng, nhấn lần nữa để thoát. Phím không chạy khi focus đang ở ô nhập.
- Tên pha viết thường theo quy tắc nhãn micro ("pha đoán"), không viết "ĐOÁN".

## Không nên

- Đặt speaker notes trong HUD. Notes ở cửa sổ thứ hai (NotesWindow, đồng bộ qua `BroadcastChannel`).
- Tự chuyển beat khi hết giờ. Người trình bày quyết định.
- Dùng `danger` khi quá giờ: quá giờ là thông tin, không phải lỗi.

## Accessibility

- Thanh là `<footer aria-label="Điều khiển trình chiếu">`. Nút ← → có `aria-label` "Beat trước/sau".
- Đồng hồ là `role="timer"` (không đọc lại mỗi giây). Câu trên sân khấu nằm trong vùng `aria-live="polite"`.
- Bảng phím tắt là `role="dialog"`; mở thì focus vào bảng, đóng thì focus về nút `?`.
