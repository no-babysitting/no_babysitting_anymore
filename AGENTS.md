# AGENTS.md · chỉ dẫn cố định cho agent làm việc trong repo này

Đọc file này trước mọi việc. Nó là **nơi duy nhất** nói ai làm gì, ai được merge gì, ai được sửa gì (quyết định D67–D74 và D76–D84 ở `docs/08` §1f, 13/11/2026). Nó không chép lại luật chi tiết: mỗi luật có một chỗ ở `docs/`, file này chỉ trỏ tới. Không cần dán prompt vào phiên; mở repo là đủ. `CLAUDE.md` chỉ nạp file này.

Chủ dự án: `taiseixx`, viết tiếng Việt; trả lời bằng tiếng Việt.

**Ngôn ngữ (D76):** code, tên file, route, tên trường, comment và commit viết bằng tiếng Anh. Chữ cho người đọc (giao diện, `docs/`, bài viết), mô tả PR và comment trên issue viết bằng tiếng Việt. Chỉ áp dụng cho phần mới viết; không dịch lại phần cũ.

## 1. Vai trò

| Vai | Ai | Được làm | Không được làm |
|---|---|---|---|
| Chủ dự án | `taiseixx` | Quyết định sản phẩm; duyệt chữ mới; đồng ý đổi art; quyết định vai trò | |
| Agent chính | Claude, mọi phiên Claude Code trên repo này | Viết và dựng code, nội dung, tài liệu; mở PR; tự merge theo §2; chịu trách nhiệm chính | Tự duyệt chữ mới; đổi art đã khoá; nới phép kiểm (§4); đóng issue của bên đánh giá |
| Bên đánh giá | Phiên Claude khác, không dùng chung ngữ cảnh (đánh giá black-box); model khác họ đối chiếu chéo tài liệu do Claude viết và kết luận từ Major trở lên (D71) | Mở issue, kiểm lại sau triển khai, đóng issue của mình | Sửa code hay nội dung; chọn cơ chế sửa |
| Agent khác | ChatGPT chỉ cho góp ý tham khảo, không chặn (`docs/23` QĐ6). DeepSeek v4.1 Flash chưa từng làm việc trên repo (chủ dự án xác nhận 13/11) | | Merge, đẩy lên `main` |

Chi tiết về bên đánh giá: `docs/independent-evaluation-council/` và repo đánh giá (private).

## 2. Ai merge gì

`main` được bảo vệ: thay đổi vào `main` đi qua PR. Không force-push `main`, không viết lại lịch sử nhánh của người khác. PR của người khác (ngoài agent chính) chỉ merge khi chủ dự án nhờ.

| Loại thay đổi | Ai merge | Điều kiện |
|---|---|---|
| Code, chuyển động, hạ tầng, CI, tài liệu quy trình, **không có chữ mới** | Agent chính tự merge | CI `check` xanh trên đúng commit cuối; PR đủ khuôn §6. Ngoại lệ duy nhất: commit chỉ gộp `main` vào nhánh để giải xung đột `CHANGELOG.md` thì không cần chờ CI chạy lại (tốc độ là ưu tiên) |
| Chữ mới trên site | Agent chính merge **sau khi** chủ dự án duyệt | Bản ghi §3 |
| ASCII art đã khoá (8 mảnh đã duyệt, mặt mascot), `design-system/art-lock.json` | Chủ dự án phải đồng ý đổi art trước | `docs/19` §2, D55; ảnh trước và sau trong PR. Tranh mới của Bài viết **ngoài khoá** theo mặc định (D77): cổng là ngân sách đã đo; chủ dự án vẫn chọn hướng từ bản nháp HTML |
| Quyết định sản phẩm mới | Chủ dự án quyết; agent ghi vào `docs/08` | Số D tiếp theo |

## 3. Duyệt chữ mới (D13)

Chữ mới là mọi chữ người đọc thấy mà chưa nằm trên site: câu, nhãn, nút, meta, `alt`, `aria-label`. **Xoá chữ không phải chữ mới.**

1. PR có chữ mới có mục **"Chữ chờ duyệt"**: câu trước, câu sau, nguồn bấm được (`docs/06`, `docs/17` §3).
2. Chủ dự án duyệt trong phiên Claude Code, hoặc bằng comment trên PR; được sửa câu rồi duyệt.
3. Trước khi merge, agent ghi **bản ghi duyệt** vào comment của PR và vào CHANGELOG: ngày, hình thức, và trích nguyên câu duyệt của chủ dự án. Bản ghi này do agent viết, không phải chủ dự án; người đọc sau phải biết điều đó. Không viết "đã duyệt" khi chưa có câu duyệt.
4. Mục CHANGELOG ghi "chờ duyệt" mà đã nằm trên `main` nghĩa là chưa có bản ghi duyệt.

## 4. Phép kiểm và art không được tự nới

- Không nới ngưỡng, tắt hay bỏ qua một bước, đặt `continue-on-error` cho bộ chặn merge. Phép kiểm sai thật thì dừng, đưa bằng chứng vào issue hay PR (cách `docs/12` đã làm), chờ chủ dự án quyết.
- PR đụng `site/scripts/`, `design-system/art-lock.json`, `design-system/type-rules.json` hoặc `.github/workflows/` phải nêu trong mục "Lệch tài liệu" đổi gì và vì sao. Bước CI **"Phép kiểm đã đổi"** in danh sách file và các dòng đổi vào Job Summary của PR.
- **Ngoại lệ do chủ dự án quyết (D74, 13/11/2026):** `Deploy site` chỉ chạy `check.cjs`; PR chỉ đổi tài liệu bỏ qua các bộ kiểm site. Mọi nới khác vẫn cần chủ dự án quyết và một số D mới.
- **Ngoại lệ do chủ dự án quyết (D83, 14/11/2026):** thay đổi về **phạm vi và chi phí CI** (bước nào chạy khi nào, trang nào được kiểm) chỉ cần chủ dự án đồng ý trong phiên; agent ghi vào PR và CHANGELOG, không cần số D mới. Ngưỡng và luật chất lượng người đọc (tap, tương phản, `type-rules.json`, axe, cuộn ngang, ngân sách ô và CPU) vẫn cần số D.
- Đó là **chứng cứ để phát hiện, không phải ngăn chặn**: agent và chủ dự án dùng chung một tài khoản GitHub nên cài đặt không tách được hai bên. Điều ngăn là quy ước này và việc bên đánh giá đọc Job Summary (D69).

## 5. Chỉ dẫn nằm ở đâu

| Cần biết | Đọc |
|---|---|
| Quyết định đã chốt (D1–D84) | `docs/08` |
| Nội dung và nguồn | `docs/14`, `docs/17` §3 (nguồn chính thức), `docs/06` |
| Văn phong, chữ trên giao diện | `docs/16` |
| Chữ, chuyển động, design system | `docs/09`, `docs/11`, `docs/13`, `docs/15`, `design-system/SOURCE-OF-TRUTH.md` |
| Kế hoạch UI/UX và khoá art | `docs/19` |
| Phương pháp học | `docs/21`, `docs/23` |
| Bài viết (nháp, sổ nguồn, đăng bài) | `docs/24`; `editorial/CLAUDE.md` (chỉ nạp khi làm bài viết) |
| Chạy kiểm | `README.md`, "Chạy local" |

Prompt giao việc cũ: `docs/17` đã dùng xong (nguồn ở §3 vẫn dùng); `docs/20` hết hiệu lực; `docs/22` đã thực hiện (kết quả là `docs/23`). Mỗi file có dòng trạng thái ở đầu. Chỗ hai tài liệu nói khác nhau: theo `docs/08` §1f, rồi theo ngày mới hơn.

## 6. Mỗi PR

Một PR một việc. Tham chiếu issue bằng `Refs #n`, không `Closes #n` (chỉ bên đánh giá đóng issue). Một dòng CHANGELOG: đổi gì, đo được gì. Khuôn mô tả (`docs/20` §1): **Đã làm · Kết quả bộ kiểm · Lệch tài liệu · Câu hỏi cho chủ dự án**; PR có chữ mới thêm **Chữ chờ duyệt**. Gặp chỗ lệch kế hoạch thì ghi vào `implementation-notes.md`, mục "Lệch kế hoạch".

## 7. Truy vết

Mỗi commit có hai dòng cuối: `Co-Authored-By: Claude <model>` và `Claude-Session: <đường dẫn phiên>`. Mô tả PR kết thúc bằng đường dẫn phiên. Khi squash merge, truyền các dòng đó vào `commit_message` để commit trên `main` còn truy được về agent, model và phiên (D72).

## 8. Người viết, người duyệt, người đánh giá

Cả ba hiện cùng một họ model nên ghi rõ ai làm gì (D13, D71): **viết** là agent chính; **duyệt chữ** là chủ dự án; **đối chiếu nguồn** (D13, "reviewer độc lập") là một phiên Claude khác hoặc model khác họ, PR ghi là ai. Chưa có thì PR ghi **"Ngoại lệ D13: chưa có reviewer độc lập; chủ dự án là người đối chiếu duy nhất"**. **Đánh giá** là bên đánh giá, phiên khác với phiên viết.

## 9. Không tự làm

Không gửi gì ra ngoài repo (email, bài đăng), không nêu tên thật của chủ dự án (D17: chỉ biệt danh và GitHub), không bịa số liệu, tên tính năng hay câu trích (`docs/14` §10, `docs/17` §3).
