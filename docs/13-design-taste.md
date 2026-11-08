# 13 · Gu trình bày thành luật đo được (08/11/2026)

Chủ dự án xem trang trên iPhone thật và gửi tám nhóm nhận xét về *cách trình bày*: chữ lệch, khoảng trống, hiệu ứng chạy hết trước khi ai kịp nhìn, nút nhỏ, chữ bị cắt. Một máy kiểm thông thường không thấy những thứ này, vì không có ngoại lệ nào ném ra và mọi liên kết đều sống. Tài liệu này ghi cách biến mỗi nhận xét thành **một phép đo**, để nó không quay lại mà không ai hay.

## 1. Hai công cụ, hai việc khác nhau

| Công cụ | Làm gì | Khi nào dùng |
| --- | --- | --- |
| `site/scripts/shots.cjs` + `sheet.py` | Cuộn trang như người đọc, chụp một khung ở mỗi điểm dừng, ghép tám khung một tờ kèm vị trí cuộn. Có `--scene "#run" --steps 7 --mid 1` để chụp giữa từng bước của một cảnh ghim, `--vp phone\|small\|tiny\|desktop`, `--motion off`. | Khi *tạo* hoặc *sửa* một cảnh: nhìn bằng mắt, vì "đẹp" không đo được. |
| `site/scripts/design-check.cjs` | Đo hình học của trang đã build ở mọi khổ và chặn merge khi vi phạm (§2). Chạy trong `Check site` và `Deploy site`. | Mỗi PR: giữ cho những lỗi đã sửa không quay lại. |

Giới hạn, nói thẳng: cả hai chạy trên **Chromium** (Playwright). Không có WebKit nên không bắt được lỗi riêng của Safari iOS (thanh công cụ co giãn làm `svh` ngắn hơn vùng nhìn thấy; đã gặp một lần). Ảnh chụp màn hình của chủ dự án trên iPhone thật vẫn là chuẩn cuối cùng; theo D20, kiểm thử trên thiết bị thật và trình đọc màn hình chưa làm, ghi là rủi ro đã chấp nhận.

## 2. Nhận xét → luật → phép đo

| Nhận xét của chủ dự án | Luật | Phép đo (`design-check.cjs`) |
| --- | --- | --- |
| Hero: nhãn góc làm rối, thông điệp bị đẩy xuống | Một màn hình đầu chỉ có một thông điệp; tuyên bố miễn trừ ở đáy | `overlap` ở 320, 375, 390: hai khối chữ không được đè nhau (đã bắt "không chính thức" đè "cuộn ↓" ở 320px) |
| "03" bị cắt đôi, Finale đè lên Journey | Không có chữ nào bị chính khung chứa nó cắt | `clip`: chữ nằm một phần trong, một phần ngoài hộp `overflow: hidden/clip` (chip cuộn ngang được miễn: đó là gợi ý có chủ đích) |
| Cột Vibe và Agentic lệch hàng ("rất phèn") | Hai cột song song dùng chung các hàng | `align`: đầu mỗi cặp hàng (tiêu đề, lần 1, đồng xu, lần 2, kết luận) lệch quá 1,5px là lỗi |
| Khoảng trống lớn ở trang câu hỏi | Không có dải trống quá 62% chiều cao nhìn thấy | `gap`: dải trống lớn nhất giữa header và đáy màn hình (ghi chú từ 45%) |
| Cuộn một cái là tuột qua câu hỏi, tuyên ngôn | Câu cần đọc thì đứng yên lúc được đọc | `hold`: mọi `[data-ask]` và `[data-reveal="fill"]` phải nằm trong `[data-held]` (tiện ích `data-hold` ở `motion.ts`) |
| Mô phỏng app/CLI chạy xong trước khi người xem tới | Mô phỏng chờ được nhìn thấy, rồi chạy đủ chậm để đọc | `demo`: lúc tải trang ở trạng thái `idle`; bắt đầu khi lên màn hình; chạy tối thiểu 4 giây (hiện 5,5–12 giây) |
| Nút nhỏ, điểm kiểm không bấm được | Mọi điều khiển cao tối thiểu 40px trên điện thoại (mục tiêu 44px) | `tap` ở 320, 375, 390 |
| Nút "chương kế" phải nổi, mục lục nhấp nháy như con trỏ | Chuyển động tạm thời chỉ có khi bật chuyển động | `cta`: có canvas quét khối và marker `nb-blink` khi bật chuyển động; không có khi tắt |
| Cảnh ghim cắt nội dung ở máy ngắn (iPhone SE) | Bảy bước của Vòng giao việc vẫn nằm đủ trong một sân khấu 375×667 và 320×640 | `clip` + `overlap` ở giữa mỗi bước của các cảnh ghim (`#flips`, `#run`, `#journey`, `#finale`) |

Đo thử vào bản trước đợt này (commit `914e5a5`, dựng ở thư mục riêng): ở 390px bắt `align` 3 chỗ, `hold` 4 chỗ (tuyên ngôn trang chủ và câu hỏi c00, c02, c03), `demo` 4 mô phỏng chạy trước khi ai thấy, `cta` 2 chỗ, `tap` 192 lượt; ở 320px còn thêm `overlap` ("không chính thức" đè "cuộn ↓") và `clip` (cột Agentic bị cắt), 128 nút nhỏ. Bản này qua cả bốn khổ, không vi phạm nào. Phần còn lại do chủ dự án nhìn bằng mắt, và phép đo chưa có cho: "đẹp", nhịp đọc có thoải mái không, căn trái của số có hợp mắt không. Những thứ đó vẫn qua filmstrip và qua mắt chủ dự án.

## 3. Quy ước khi viết cảnh mới

1. **Số lớn căn trái**, ghép từ nhiều ký tự nhỏ (ô 4×7 trên điện thoại, 5×9 trên desktop). `NB.sources.text(…, { align: 'left', padX: 0 })`.
2. **Bản mô phỏng không chạy lúc tải.** Dùng `NB.seen(el, fn)`: chạy khi được thấy một nửa, một lần; hiện trạng thái `data-demo = idle | playing | done`. "Phát lại" luôn có. Nhịp: khoảng một giây mỗi dòng.
3. **Câu cần đọc thì giữ.** `data-hold="<số màn hình>"` trên khối bao quanh; khối cao hơn màn hình thì bỏ qua, không cắt chữ. Hết giữ thì buông, không giam người đọc.
4. **Hai bên của một phép so sánh dùng chung hàng.** Grid nhiều hàng với `display: contents`, không để từng cột tự xếp.
5. **Điều khiển ≥ 44px** (`.nb-btn`, `.nb-chip` tự lên 44px khi chạm hoặc màn hẹp). Điểm kiểm, thẻ, dòng mục lục là điều khiển thật khi chúng nhận thao tác.
6. **Hoạt cảnh vòng lặp chỉ ở tầng N** (xem `docs/09` §1) và tắt cùng công tắc chuyển động: quét khối ở nút (`data-sweep`), con trỏ nhấp nháy ở mục lục (`html.motion` + `nb-blink`, 1,1 giây, `steps(1)`).
7. **Không để một nội dung cắt ở máy ngắn.** Mọi cảnh ghim phải chạy được ở 375×667 và 320×640; dưới 720px chiều cao dùng khối `@media (max-height: 720px)` hạ cỡ chữ và khoảng cách thay vì cuộn trong khung.
8. **Mọi nhận xét mới của chủ dự án về trình bày** → thêm một luật vào bảng này và một phép đo vào `design-check.cjs` nếu đo được; nếu không đo được, ghi vào đây là "chỉ mắt".

## 4. Chạy

```
cd site
NB_BASE=/no_babysitting_anymore/ npm run build
NB_BASE=/no_babysitting_anymore/ node scripts/design-check.cjs                 # tất cả: phone, se, tiny, desktop
NB_BASE=/no_babysitting_anymore/ node scripts/design-check.cjs --only se --sections 2 --shots /tmp/dc   # một khổ, chỉ cảnh ghim, lưu ảnh khung vi phạm
NB_BASE=/no_babysitting_anymore/ node scripts/shots.cjs --page "" --vp phone --scene "#run" --steps 7 --mid 1
```

Mỗi vi phạm in ra khổ, trang, vị trí cuộn, tên luật và hai khối chữ liên quan; với `--shots`, khung đó được lưu thành ảnh để nhìn lại.
