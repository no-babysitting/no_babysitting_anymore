# 14 · Kịch bản nội dung v4: Trước, Trong, Sau (08/11/2026)

> **Trạng thái: chờ chủ dự án duyệt** (D13). Bản này thay *lộ trình chính* của kịch bản v3 (`10-script-v3-proposal.md`). Mười hai phần của v3 thành phần **Nâng cao**, viết sau (§8). Các quyết định của phiên hỏi đáp ngày 08/11/2026 ghi ở `08-kaizen-go-live.md` §1b (D21–D42).
>
> Dấu nháy trong tài liệu này viết thẳng cho dễ sửa. Khi đưa chữ lên site, đổi thành “ ” (`16-writing-guide.md` §6).
>
> Đọc kèm: `15-typography-motion-v4.md` (chữ, hiệu ứng, art mở chương, mascot, điểm dừng) · `16-writing-guide.md` (văn phong tiếng Việt và tiếng Anh) · `17-handoff-prompt.md` (prompt giao cho coding agent).

## 0. Tóm tắt

- **Câu đỉnh của cả trang:** *Thôi cầm tay chỉ việc: cùng Claude làm rõ việc, rồi giao trọn cho nó.* Học xong, người đọc tự giao trọn được một việc nhiều bước cho Claude mà không phải ngồi trông.
- **Ba nhánh, theo vòng đời của một việc giao:**
  - *Trước*: làm rõ, rồi giao gọn.
  - *Trong*: để Claude tự tìm, tự nhớ; bạn chỉ lái khi nó lệch.
  - *Sau*: cho nó một phép kiểm, hỏi vặn kết quả, rồi mới buông.
- **Năm phần, khoảng 25 phút:** 00 Mở đầu · 01 Tìm điều chưa biết · 02 Giao việc · 03 Để nó làm · 04 No Babysitting.
- **Six shifts là nội dung chính.** Sáu dịch chuyển chia thành ba cặp, mỗi cặp nằm ở đúng chặng người đọc cần đến:
  - 01: *Bớt tả, đưa tham chiếu* và *Bớt ví dụ, thiết kế khuôn*;
  - 02: *Bớt luật, tin phán đoán* và *Bớt nhắc, nói một lần*;
  - 03: *Bớt nhồi, để nó mở dần* và *Để Claude tự nhớ*.
- **Phương pháp xuyên suốt** lấy từ bài *Finding your unknowns*: tìm điều chưa biết trước, trong và sau khi làm. Có hai chiều hỏi. Claude hỏi bạn qua phỏng vấn. Bạn hỏi Claude: nhờ nó rà điểm mù, hỏi vặn nó, bắt nó ra câu đố cho mình.
- **Một lõi chung, năm kính theo vai.** Kính chỉ đổi ví dụ và prompt mang đi thử, nguyên lý giữ nguyên. Mọi ví dụ nằm trong một câu chuyện chung: một studio nhỏ ra mắt khoá học online (hư cấu, §4).
- **Mỗi chương gồm ba hồi gọn**: Hook → Lõi → Kết, đọc trong 4–6 phút. Mỗi chương có ba điểm dừng, tối đa năm golden word, một hình ASCII mở chương và mascot ở bên lề.
- **Đợt này chưa làm mô phỏng.** Phần "thấy" tạm là chữ, typography và ASCII. Mô phỏng sẽ tinh chỉnh sau khi chữ đã chốt (§9).

## 1. Vì sao six shifts, và vì sao chia Trước, Trong, Sau

Thariq Shihipar (Anthropic) có hai bài đi thành cặp:

- *A field guide to Claude Fable 5: Finding your unknowns* (06/07/2026) [S2] nói về **cách làm việc**: làm rõ những gì mình chưa biết, trước, trong và sau khi Claude làm.
- *The new rules of context engineering for Claude 5 generation models* (24/07/2026) [S1] nói về **context đưa cho Claude**, qua sáu dịch chuyển từ "hồi đó" sang "bây giờ".

Bài thứ hai mở đầu bằng cách nhắc lại bài thứ nhất. Bài thứ nhất thì kết bằng lời mời đọc bài thứ hai. Cả hai cùng nói một điều: model mới phán đoán tốt hơn, nên người giao việc cần bớt ràng buộc thừa và làm rõ phần chỉ mình biết.

Bài field guide chia việc thành ba chặng: trước khi làm (*pre-implementation*), trong khi làm (*during*) và sau khi làm (*post implementation*). Vì thế lộ trình chính đi theo đúng ba chặng ấy. Mỗi cặp shift được đặt vào chặng mà người đọc dùng tới nó. Trang *Best practices* chính thức của Claude Code [S3] lo chặng Sau: phép kiểm, người duyệt mới, chạy khi bạn vắng.

Quyết định này đảo lại điểm 5 trong §8 của v3. Ngày 07/11, c10 đã dùng bảng 7 dòng *What you can stop doing* thay cho six shifts; bảng đó nay chỉ còn là nguồn phụ ở phần 04.

## 2. Kim tự tháp (Minto)

**Mở bài theo SCQA**, dùng ở trang chủ và phần 00:

| | Nội dung |
|---|---|
| *Tình huống* | Bạn đã quen giao việc cho Claude. |
| *Vướng mắc* | Nhưng bạn vẫn phải trông nó: dặn đi dặn lại, sửa từng bước. Trong khi đó Claude đã khác. Tháng 7/2026, Anthropic cho biết đã xoá hơn 80% chỉ dẫn hệ thống của Claude Code cho thế hệ model mới, và không đo được sụt giảm nào trên các bài đánh giá về code [S1]. Nhiều lời dặn cũ giờ thành vật cản. |
| *Câu hỏi* | Vậy giao việc thế nào để khỏi phải trông? |
| *Trả lời* | Cùng Claude làm rõ điều chưa biết trước khi làm, giao bằng tham chiếu và một định nghĩa "xong", rồi để nó tự làm, tự kiểm. Bạn chỉ giữ lại hai việc: quyết thế nào là xong, và duyệt những gì không hoàn tác được. |

**Mỗi phần có một câu đỉnh riêng**, và câu nào cũng đỡ cho câu đỉnh của cả trang:

| Phần | Chặng | Câu đỉnh của phần | Six shifts | Nguồn chính |
|---|---|---|---|---|
| 00 · WHY YOU STILL BABYSIT | Mở đầu | Claude cần ít lời dặn hơn bạn nghĩ. Thứ nó thiếu là điều chỉ bạn biết. | (cả sáu, xem trước) | S1, S3 |
| 01 · THE UNKNOWNS | Trước | Việc giao thường hỏng ở những chỗ chính bạn chưa nghĩ tới. Hãy để Claude giúp bạn tìm ra chúng trước khi nó bắt tay vào làm. | Simple specs → Rich references · Examples → Interfaces | S2, S1, S3 |
| 02 · THE HANDOFF | Trước | Nói kết quả và thế nào là xong. Phần cách làm, để Claude phán đoán. | Rules → Judgment · Repetition → Simple descriptions | S1, S3 |
| 03 · LET IT WORK | Trong | Claude tự mở đúng tài liệu, tự nhớ điều đáng nhớ. Bạn chỉ lái khi nó lệch. | Upfront → Progressive disclosure · CLAUDE.md memory → Auto-memory | S1, S2, S3, S4, S5 |
| 04 · NO BABYSITTING | Sau | Cho Claude một phép kiểm, đòi bằng chứng, hỏi vặn nó. Rồi để nó chạy. | (bảng tổng kết sáu shift) | S3, S2, S1 |

## 3. Khuôn chương: ba hồi gọn

| Hồi | Phần chữ | Độ dài | Điểm dừng | Mascot | Theo Gagné [P1] |
|---|---|---|---|---|---|
| **Hook** | Câu hỏi gây tò mò (Newsreader) + một dòng bắc cầu | Câu hỏi ≤ 30 âm tiết, dòng bắc cầu ≤ 30 âm tiết | ① giữ câu hỏi | Hỏi một câu | Gây chú ý, nói mục tiêu |
| **Lõi** | 2–4 khối. Một thẻ Then → Now chính và một thẻ phụ. Một khối ví dụ theo kính. Ghi chú bề mặt khi cần. | Phần chữ chung ≤ 550 âm tiết; mỗi biến thể kính ≤ 110 âm tiết | ② giữ thẻ Then → Now chính | Nhật ký hành động, 1–2 câu vui | Gợi lại điều đã biết, trình bày, hướng dẫn |
| **Kết** | Câu chốt nối về câu đỉnh + một prompt mang đi thử (đổi theo kính) + nút sang phần sau | Câu chốt ≤ 40 âm tiết; prompt ≤ 80 âm tiết | ③ giữ câu chốt | Hỏi một câu | Cho làm thử, giúp nhớ và áp dụng |

Bỏ so với v3 (D30): nhịp *Đoán* (`PredictPrompt`) và nhịp *Nhớ* (`GrillCard`) không dùng ở lộ trình chính. Việc tự nhớ lại chuyển sang prompt mang đi thử, và sang kỹ thuật "quiz me" ở phần 04: người đọc học cách bắt Claude ra đề kiểm tra mình.

**Khuôn dữ liệu của một phần** (gợi ý; agent đổi tên trường được nếu có lý do, miễn giữ đủ nghĩa):

```
id          '01'                       ổn định, không phụ thuộc thứ tự
slug        '01'                       URL /01/
phase       'mo-dau' | 'truoc' | 'trong' | 'sau'
en, vi      'THE UNKNOWNS', 'Tìm điều chưa biết'
summary     câu đỉnh của phần (1–2 câu)
minutes     5
art         'map'                      id của hình mở chương (15 §5)
hook        { question, bridge, ask }  ask = câu hỏi của mascot
core[]      khối: text | grid4 | ways | thenNow | lens | surface | note
close       { line, prompt: { chung, dev, ba, design, mkt, ops }, next }
gold[]      ≤ 5 golden word, đánh dấu ngay trong chữ
mascot[]    { at: id khối, kind: 'ask' | 'log' | 'joke', text }
sources[]   id nguồn ở §10
later[]     chỗ chờ mô phỏng (§9), không render
```

## 4. Kính theo vai và câu chuyện chung

**Câu chuyện chung** (hư cấu; nói rõ ngay ở khối kính đầu tiên của phần 00). Studio **Nắng Sớm** ra mắt khoá học online *Chụp đẹp bằng điện thoại*: 12 bài video ngắn, dạy người bán hàng online chụp ảnh sản phẩm bằng điện thoại. Khoá học bán trên trang web của studio, và cả nhóm có bốn tuần. Người đọc nhận một phần việc trong đó, tuỳ kính đã chọn.

| id | Kính | Phần việc của bạn trong câu chuyện |
|---|---|---|
| `chung` | Chung *(mặc định)* | Chủ studio: lo trang giới thiệu khoá học, giữ cho cả nhóm ra mắt đúng hẹn |
| `dev` | Dev & engineer | Trang thanh toán, mở khoá bài học ngay sau khi học viên trả tiền |
| `ba` | BA & PM | Spec cho phần học: tiến độ, bài kiểm tra cuối khoá, điều kiện cấp chứng nhận |
| `design` | Designer & sáng tạo | Video giới thiệu, bộ ảnh bìa cho 12 bài |
| `mkt` | Marketing & sales | Email cho danh sách chờ, bài đăng ra mắt, gói bán cho các shop online |
| `ops` | Quản lý & vận hành | Kế hoạch bốn tuần, báo cáo tiến độ mỗi thứ Hai, hộp thư hỏi đáp của học viên |

**Chọn kính** (D27). Người đọc chỉ chọn kính trong khối ví dụ. Lần đầu gặp khối kính (thường ở phần 00), khối hiện hàng chip "Bạn làm việc gì?". Bỏ qua thì dùng kính Chung. Sau đó đổi kính bằng nút trên header. Trang chủ không hỏi gì về kính.

**Mạch của mỗi kính qua năm phần:**

| Kính | 01 · Trước: làm rõ | 02 · Trước: giao | 03 · Trong | 04 · Sau |
|---|---|---|---|---|
| Chung | Chưa biết trang bán khoá học cần gì → rà điểm mù, phỏng vấn | Brief 3 dòng thay cho 14 lời dặn | Claude hỏi lại: học thử mấy bài? | Mỗi khối của trang có trong SPEC, quiz trước khi đăng |
| Dev | Chưa từng tích hợp cổng thanh toán → rà điểm mù trên codebase | CLAUDE.md: lệnh chạy test và một gotcha thay cho các dòng "LUÔN/KHÔNG BAO GIỜ" | Cổng không hỗ trợ hoàn tiền một phần → chọn hướng an toàn, ghi lệch #1 | Test và webhook test xanh, reviewer mới đối chiếu SPEC, quiz trước khi merge |
| BA & PM | Để Claude phỏng vấn tới khi đủ viết SPEC | "Be ambitious": gồm cả trạng thái lỗi, trạng thái trống | Hai yêu cầu chỏi nhau → Claude hỏi | Reviewer đối chiếu SPEC với ghi chú phỏng vấn |
| Designer & sáng tạo | Video trông nhạt, chưa biết color grading → nhờ Claude dạy unknown unknowns, xin 4 hướng ảnh bìa | "Giống bộ ảnh bìa đang có" thay cho 20 luật | Phụ đề theo lời nói hay đã biên tập → Claude hỏi | Mỗi clip ≤ 60 giây, dọc 9:16, phụ đề khớp giờ; ảnh chụp so với bản nháp |
| Marketing & sales | Giọng của studio khó tả → xin 3 giọng để phản ứng, gom thành thang chấm | Viết theo giọng fanpage hiện tại; nói một lần trong hướng dẫn dự án | Một con số trong email chưa có nguồn → Claude hỏi | Số nào cũng có nguồn; bài đăng chờ bạn duyệt |
| Quản lý & vận hành | Chưa từng ra mắt khoá học → rà điểm mù, phỏng vấn về nguồn lực | Báo cáo tuần: "xong là khi mỗi mục có link nguồn" | Slack và bảng việc lệch nhau về hạn → ghi lại rồi hỏi | 5 câu hỏi trước khi cho báo cáo tự chạy 08:00 thứ Hai; vài lần đầu bạn đọc trước khi gửi |

**Bề mặt** (D29). Claude Code là bề mặt chính: ứng dụng desktop (tab Code) hay claude.ai/code đều không cần biết code, còn terminal thì tuỳ người [S10]. Kỹ thuật nào chỉ là prompt (rà điểm mù, phỏng vấn, xin bản nháp, quiz) thì gắn nhãn *Dùng được cả ở Claude app và Cowork*. Tính năng chỉ Claude Code có (auto memory, `/memory`, `/clear`, Esc, `/goal`, hook) thì ghi rõ và kèm ngày kiểm chứng.

## 5. Trang chủ: chữ hoàn chỉnh, chờ duyệt

Thứ tự trên trang (D34): **Hero → Kim tự tháp (trên nền mặt nước) → Lộ trình 5 phần → Finale**. Bỏ: Hai lần tung đồng xu, Vòng giao việc 7 bước, 6 loại việc, tuyên ngôn 3 câu hỏi (§9).

### Hero

| Vai | Chữ |
|---|---|
| Dòng nhỏ phía trên (mono) | Từ vibe đến agentic. |
| Câu lớn (Newsreader) | Claude khôn hơn rồi, sao bạn vẫn phải trông trẻ? |
| Dòng trả lời | Cùng Claude làm rõ việc, rồi giao trọn cho nó. |
| Dòng thông tin (mono) | Khoảng 25 phút · 5 phần ngắn · Không cần biết code · Miễn phí, có ví dụ cho từng nghề |
| Nút chính | Bắt đầu → *(tới 00)* |
| Nút phụ | Xem lộ trình ↓ *(tới kim tự tháp)* |
| Góc dưới (giữ nguyên) | Dự án cộng đồng độc lập · không phải trang chính thức của Anthropic |

Câu lớn là câu của chủ dự án. "Trông trẻ" là nghĩa đen của *babysitting*, nên câu này giải nghĩa luôn tên trang. Vế "khôn hơn rồi" có căn cứ: bài six shifts viết rằng model mới phán đoán tốt hơn, và Anthropic đã bỏ hẳn nhiều luật cứng [S1].

### Kim tự tháp (thay phần tuyên ngôn, giữ nền mặt nước)

- Nhãn: `Cả trang trong một câu`
- Câu đỉnh (sáng dần khi được giữ): **Thôi cầm tay chỉ việc: cùng Claude làm rõ việc, rồi giao trọn cho nó.**
- Bằng chứng (số lớn Archivo, đếm từ 0): **80%**. Chú thích: *Theo bài viết của Anthropic tháng 7/2026: hơn 80% chỉ dẫn hệ thống của Claude Code đã được xoá cho Claude Opus 5 và Claude Fable 5, và không đo được sụt giảm nào trên các bài đánh giá về code.* [S1]
- Ba nhánh (ba cột trên desktop, xếp dọc trên điện thoại; các hàng thẳng nhau):

| Nhãn | Câu | Dẫn tới |
|---|---|---|
| Trước | Làm rõ cùng Claude, rồi giao gọn. | 01 Tìm điều chưa biết · 02 Giao việc |
| Trong | Để nó tự tìm, tự nhớ. Bạn chỉ lái khi nó lệch. | 03 Để nó làm |
| Sau | Cho nó một phép kiểm, hỏi vặn kết quả, rồi mới buông. | 04 No Babysitting |

### Lộ trình (Journey, 5 panel)

| Số | Tên (EN) | Tên (VI) | Một dòng | Thời lượng |
|---|---|---|---|---|
| 00 | WHY YOU STILL BABYSIT | Vì sao bạn vẫn phải trông | Claude cần ít lời dặn hơn bạn nghĩ. Thứ nó thiếu là điều chỉ bạn biết. | 4 phút |
| 01 | THE UNKNOWNS | Tìm điều chưa biết | Việc giao thường hỏng ở những chỗ chính bạn chưa nghĩ tới. | 5 phút |
| 02 | THE HANDOFF | Giao việc: nói ít, nói một lần | Nói kết quả và thế nào là xong. Phần cách làm, để Claude phán đoán. | 5 phút |
| 03 | LET IT WORK | Để nó làm | Claude tự mở đúng tài liệu, tự nhớ điều đáng nhớ. Bạn chỉ lái khi nó lệch. | 5 phút |
| 04 | NO BABYSITTING | Kiểm, hỏi vặn, rồi buông | Cho Claude một phép kiểm, đòi bằng chứng, hỏi vặn nó. Rồi để nó chạy. | 6 phút |

### Finale

- Bộ đếm: `05 / 05`
- Câu: **Việc vẫn chạy khi bạn đã về.** *(Phương án khác để chủ dự án chọn: "Giao xong rồi, giờ bạn làm việc của bạn.")*
- Nút chính: `Bắt đầu với 00 →` · nút phụ: `Nâng cao` · `Library`

### Header và menu

- Header gồm: logo · nút kính `Kính: Chung` · nút chuyển động · nút menu. Trên điện thoại, mặt mascot nằm cạnh nút kính. Ở khổ ≤ 360px, nút kính chỉ còn icon, kèm `aria-label="Đổi kính, đang chọn: Chung"`.
- Menu có ba nhóm:
  - **Lộ trình chính**: 00–04.
  - **Nâng cao**: chỉ những mục đã viết; hiện có A1 · Ngân sách ngữ cảnh.
  - **Library**.

## 6. Lộ trình chính

### 6.0 · Mở đầu · WHY YOU STILL BABYSIT · Vì sao bạn vẫn phải trông *(dàn ý và câu chính)*

- **Mở chương:** nhãn `Mở đầu` · câu đỉnh như §2 · `4 phút` · art `wall` (15 §5).
- **Hook ①**
  - Số lớn **80%** + dòng: *Tháng 7/2026, Anthropic cho biết đã xoá hơn 80% chỉ dẫn hệ thống của Claude Code.*
  - Câu hỏi: **Claude cần ít lời dặn đến thế, sao bạn vẫn phải ngồi trông?**
  - Mascot hỏi: *Mỗi lần giao việc, bạn dặn mình bao nhiêu điều?*
- **Lõi**
  - *Lời dặn chỏi nhau.* Khi đọc lại các phiên dùng Claude Code trong nội bộ, nhóm làm Claude Code thấy có những yêu cầu mang lời dặn ngược nhau: chỉ dẫn hệ thống bảo "để lại tài liệu khi cần", một skill bảo "KHÔNG thêm chú thích", còn người dùng thì bảo "cứ làm cho chạy như bản cũ". Claude vẫn đoán ra ý, nhưng phải nghĩ kỹ hơn để gỡ chỗ chỏi nhau [S1].
  - *Vì sao bỏ được.* Những lời dặn ấy từng cần, để tránh các tình huống tệ nhất như xoá nhầm file. Model mới **phán đoán** tốt hơn, nên nhóm Claude Code xoá bớt và để Claude dựa vào context xung quanh [S1].
  - **Thẻ Then → Now chính ②**
    - Hồi đó: *Càng dặn nhiều, càng an toàn.*
    - Bây giờ: *Chỉ dặn điều Claude không tự thấy. Phần còn lại, để nó phán đoán.*
    - Nguồn: S1; S3, mục *What you can stop doing*: "Every one of these was good advice when it was written."
  - *Điều chỉ bạn biết* [S3]: một quy trình chỉ nằm trong đầu một người · một file không bao giờ được mở · một phép kiểm phải qua thì mới tính là xong · một ngân sách không được vượt. Không mặc định nào biết những điều đó. Đây là chỗ bạn bỏ chút công.
  - *Ba chặng* (rail chữ, dẫn tới 01–04): Trước · Trong · Sau, mỗi chặng một dòng như ở trang chủ.
  - **Khối kính đầu tiên** (hiện hàng chip chọn kính), giới thiệu câu chuyện:
    - Chung với mọi kính: *Từ đây tới cuối, mọi ví dụ đi theo một việc: studio Nắng Sớm (hư cấu) ra mắt khoá học online "Chụp đẹp bằng điện thoại", 12 bài video ngắn dạy người bán hàng online chụp ảnh sản phẩm bằng điện thoại. Cả nhóm có bốn tuần.*
    - Chung: *Bạn là chủ studio. Bạn lo trang giới thiệu khoá học, và giữ cho cả nhóm ra mắt đúng hẹn.*
    - Dev: *Bạn lo trang thanh toán và việc mở khoá bài học ngay sau khi học viên trả tiền.*
    - BA & PM: *Bạn viết spec cho phần học: tiến độ, bài kiểm tra cuối khoá, điều kiện cấp chứng nhận.*
    - Designer & sáng tạo: *Bạn lo video giới thiệu và bộ ảnh bìa cho 12 bài.*
    - Marketing & sales: *Bạn lo email cho danh sách chờ, bài đăng ra mắt và gói bán cho các shop online.*
    - Quản lý & vận hành: *Bạn lo kế hoạch bốn tuần, báo cáo tiến độ mỗi thứ Hai và hộp thư hỏi đáp của học viên.*
    - Dòng cuối: *Ở mỗi phần, bạn sẽ thấy việc của mình đi qua đúng chặng đó.*
  - Ghi chú nối sang 04: *No babysitting không có nghĩa là bỏ mặc.* Phần 04 nói rõ bạn giữ lại những gì.
- **Kết ③**
  - Câu chốt: **Thôi cầm tay chỉ việc không có nghĩa là buông tay. Bạn đặt tay đúng hai chỗ: lúc làm rõ việc, và lúc duyệt kết quả.**
  - Prompt (Chung): *Đây là cách tôi hay giao việc cho bạn: [dán một yêu cầu bạn hay gửi]. Hãy chỉ ra: dòng nào bạn tự làm đúng mà không cần dặn, dòng nào chỏi nhau, và những điều chỉ tôi biết mà tôi chưa nói.*
  - Biến thể theo kính:
    - Dev dán CLAUDE.md;
    - BA & PM dán mẫu spec đang dùng;
    - Designer & sáng tạo dán brief thiết kế;
    - Marketing & sales dán brief nội dung;
    - Quản lý & vận hành dán mẫu báo cáo.
  - Nút: `01 · THE UNKNOWNS →`
- **Mascot**
  - Nhật ký: *Đọc 47 lời dặn… 3 dòng chỏi nhau*.
  - Câu vui: *Vừa "KHÔNG thêm chú thích" vừa "để lại tài liệu khi cần"… cho mình xin một phút.*
  - Hỏi ở Kết: *Điều gì chỉ bạn biết mà mình chưa biết?*
- **Golden word (4):** phán đoán · điều chỉ bạn biết · không tự thấy · đặt tay đúng hai chỗ.

### 6.1 · Phần 01 · THE UNKNOWNS · Tìm điều chưa biết *(chữ hoàn chỉnh: bài mẫu cho mọi phần khác)*

> Đây là tham chiếu về giọng văn, độ dài và cách dùng kính. Agent viết các phần còn lại theo đúng mức này. **Đậm** = golden word. *Nghiêng* = thuật ngữ tiếng Anh ở lần đầu xuất hiện.

**Mở chương**
- Nhãn: `Trước · 01`
- Tên: `THE UNKNOWNS` / Tìm điều chưa biết
- Câu đỉnh: Việc giao thường hỏng ở những chỗ chính bạn chưa nghĩ tới. Hãy để Claude giúp bạn tìm ra chúng, trước khi nó bắt tay vào làm.
- `5 phút` · art `map`

**Hồi 1 · Hook** (điểm dừng ①)

> **Brief đã rõ, Claude làm đúng từng chữ, vậy mà kết quả vẫn trật. Trật ở đâu?**
>
> Thường không phải ở Claude, mà ở những điều bạn chưa nói ra, vì chính bạn cũng chưa nghĩ tới.

Mascot hỏi: *Bạn đã kể cho mình biết bạn đang ở đâu trong việc này chưa?*

**Hồi 2 · Lõi**

*Khối 1: Bản đồ không phải là lãnh thổ*

Những gì bạn đưa cho Claude, gồm prompt, file và skill, là tấm bản đồ. Nơi việc thật diễn ra, với khách hàng thật, dữ liệu thật và ràng buộc thật, là lãnh thổ. Thariq Shihipar ở Anthropic gọi những chỗ bản đồ không khớp với lãnh thổ là *unknowns*, tạm dịch là **điều chưa biết**.

Gặp một điều chưa biết, Claude buộc phải đoán xem bạn muốn gì. Việc càng dài, nó càng gặp nhiều chỗ phải đoán. Tác giả kể rằng Claude Fable là model đầu tiên khiến chất lượng công việc bị giới hạn bởi khả năng làm rõ điều chưa biết của chính tác giả. [S2]

*Khối 2: Bốn loại điều chưa biết* (lưới 2 × 2, chữ thường, không mô phỏng)

Mỗi lần mang một việc tới Claude, tác giả chia những gì mình biết thành bốn ô:

| | |
|---|---|
| **Biết mình biết.** Điều đã có trong prompt: bạn muốn gì, bạn đã nói ra. | **Biết mình chưa biết.** Điều bạn biết là mình chưa nghĩ xong. |
| **Không biết mình biết.** Điều hiển nhiên tới mức bạn chẳng bao giờ viết ra, nhưng nhìn thấy là nhận ra ngay. | **Không biết mình không biết.** Điều bạn chưa từng nghĩ tới, kể cả việc kết quả có thể tốt tới mức nào. |

Người giao việc giỏi vẫn có điều chưa biết. Khác ở chỗ họ luôn tính trước là nó có, và đi tìm nó: trước, trong và sau khi làm. [S2]

Mascot nói vui: *Mình đọc nhanh thật, nhưng chưa đọc được suy nghĩ. Bạn cứ nói ra nhé.*

*Khối 3: Ba cách để Claude giúp bạn tìm*

1. **Chưa biết mình chưa biết gì? Nhờ Claude rà điểm mù.**
   Ở một mảng còn lạ, bạn thường không biết nên hỏi gì, thế nào là tốt, trước đây đã có những gì, hay ổ gà nằm ở đâu. Hãy kể cho Claude bạn là ai và đang biết tới đâu, rồi nhờ nó **rà điểm mù**. Tác giả dùng nguyên văn hai cụm *blind spot pass* và *unknown unknowns* trong prompt; bạn cứ giữ nguyên hai cụm ấy.
   `Tôi không biết color grading là gì nhưng cần chỉnh màu video này. Hãy dạy tôi những unknown unknowns về color grading, để tôi biết cách nhờ bạn cho đúng.`
   Mascot (nhật ký): *Đang rà điểm mù… thấy 7 điều bạn chưa hỏi.*

2. **Thấy rồi mới biết mình muốn gì? Xin vài bản nháp để phản ứng.**
   Có những tiêu chí bạn chỉ nói được sau khi nhìn thấy: một bố cục, một giọng văn, một bảng màu. Đừng cố tả. Hãy xin vài hướng thật khác nhau trên cùng một trang HTML, rồi chọn cái làm bạn gật đầu. Sửa lúc này rẻ hơn nhiều so với sửa khi đã làm xong. [S2, S6]
   `Tôi cần một trang giới thiệu khoá học nhưng không có mắt thẩm mỹ. Làm cho tôi một trang HTML với 4 hướng thiết kế thật khác nhau để tôi chọn.`

3. **Biết còn chỗ mơ hồ? Để Claude phỏng vấn bạn.**
   Khi đã có hướng mà vẫn còn chỗ chưa chốt, hãy để Claude **phỏng vấn** bạn. Nó hỏi từng câu, mỗi câu kèm vài lựa chọn, tới khi đủ để viết thành một bản đặc tả (*spec*). Có spec rồi thì mở một phiên mới để làm: phiên đó bắt đầu với context sạch và một định nghĩa "xong" đã được viết ra. [S3, S2]
   `Phỏng vấn tôi từng câu một về mọi chỗ còn mơ hồ. Hỏi trước những câu mà câu trả lời làm đổi cách làm. Khi đủ, viết lại thành SPEC.md.`
   Mascot (hỏi, minh hoạ một câu phỏng vấn): *Câu 1/6: trang này bán cho ai?*

Nhãn bề mặt: `Dùng được cả ở Claude app và Cowork`. Ba cách này chỉ là prompt, nên ở đâu có Claude là dùng được.

*Khối 4: Thẻ Then → Now chính* (điểm dừng ②)

**Bớt tả, đưa tham chiếu** · `Simple specs → Rich references`
- Hồi đó: Viết spec thành một file markdown để Claude đọc.
- Bây giờ: Đưa thứ thật: một bản nháp HTML, một file mẫu, một bộ test, một thang chấm.
- Vì sao: Claude giờ đọc được những **tham chiếu** phức tạp hơn nhiều so với một file markdown. Bài gốc viết rằng một bản mockup HTML thường cho kết quả tốt hơn lời tả thiết kế hay một ảnh chụp màn hình. Thang chấm (*rubric*) cũng là tham chiếu: nó cho Claude biết thế nào là tốt, để Claude tự đối chiếu. [S1]

*Khối 5: Thẻ Then → Now phụ*

**Bớt ví dụ, thiết kế khuôn** · `Give Claude examples → Design interfaces`
- Hồi đó: Đưa vài ví dụ để Claude làm theo.
- Bây giờ: Nói rõ cái **khuôn**: việc gồm những phần nào, mỗi phần nhận những giá trị nào.
- Vì sao: Với model mới, ví dụ dễ kéo Claude về quanh đúng vùng của ví dụ. Anthropic đã rút phần mô tả công cụ ghi danh sách việc của Claude Code từ khoảng 9.100 ký tự, toàn danh sách "khi nào dùng" và ví dụ, xuống còn một câu, ba trạng thái `pending`, `in_progress`, `completed`, và một luật: mỗi lúc chỉ có một việc đang làm. Chính cái khuôn đã gợi cho Claude cách dùng công cụ. [S1]
- Nhãn `Diễn giải của trang`: Bài gốc nói về công cụ của Claude Code. Với việc của bạn, khuôn là khung của thứ cần giao: các phần, các trường, các trạng thái. Muốn giữ giọng văn thì đưa thang chấm, đừng đưa ba bài mẫu để chép. Ví dụ vẫn đúng chỗ khi bạn thật sự muốn Claude làm y hệt, như chép lại cách một đoạn code đang chạy. [S1, S2]

*Khối 6: Ở phần việc của bạn* (khối kính; mỗi biến thể có ba dòng: Điều chưa biết · Cách tìm · Đưa cho Claude)

- **Chung.** Trang giới thiệu khoá học.
  - *Điều chưa biết:* Bạn chưa từng bán khoá học online, nên không biết trang bán khoá học thường cần gì: chính sách hoàn tiền, bài học thử, câu hỏi thường gặp.
  - *Cách tìm:* Nhờ Claude rà điểm mù trước, rồi để nó phỏng vấn bạn về người học.
  - *Đưa cho Claude:* Trang của một khoá học bạn từng mua và thích, lưu thành file HTML. Kèm khuôn: lời hứa · dành cho ai · 12 bài · học thử · câu hỏi thường gặp.
- **Dev & engineer.** Trang thanh toán và mở khoá bài học.
  - *Điều chưa biết:* Bạn chưa từng tích hợp cổng thanh toán này. Webhook đến trễ thì sao? Hoàn tiền thì sao? Hoá đơn xuất lúc nào?
  - *Cách tìm:* Rà điểm mù trên chính codebase và tài liệu của cổng thanh toán.
  - *Đưa cho Claude:* Code mẫu của cổng thanh toán. Kèm khuôn trạng thái đơn hàng: chờ thanh toán · đã thanh toán · đã hoàn tiền, và mỗi đơn chỉ ở một trạng thái tại một thời điểm.
- **BA & PM.** Spec cho phần học.
  - *Điều chưa biết:* Học viên được xem lại bài trong bao lâu? Bỏ dở giữa chừng thì tiến độ tính sao? Rớt bài kiểm tra thì có được thi lại không?
  - *Cách tìm:* Để Claude phỏng vấn bạn từng câu, hỏi trước những câu làm đổi phạm vi.
  - *Đưa cho Claude:* File câu hỏi của học viên khoá trước. Kèm khuôn của một yêu cầu: mã · mô tả · tiêu chí chấp nhận · ngoài phạm vi.
- **Designer & sáng tạo.** Video giới thiệu và bộ ảnh bìa.
  - *Điều chưa biết:* Video quay xong trông hơi nhạt. Bạn đoán là do màu, nhưng chưa biết color grading là gì, nên cũng chưa biết thế nào là "đẹp".
  - *Cách tìm:* Nhờ Claude dạy bạn những unknown unknowns về color grading trước, rồi xin 4 hướng ảnh bìa thật khác nhau trên một trang HTML. (Tác giả bài gốc cũng gặp đúng chuyện này khi dựng video ra mắt Claude Fable bằng Claude Code: thử xin vài biến thể trước, rồi nhận ra mình không biết thế nào là đẹp, nên nhờ Claude dạy về color grading. [S2])
  - *Đưa cho Claude:* File HTML nhận diện của studio. Kèm thông số đầu ra: dọc 9:16 · tối đa 60 giây · có phụ đề.
- **Marketing & sales.** Email cho danh sách chờ.
  - *Điều chưa biết:* Giọng của studio. Bạn nhận ra ngay khi đọc thấy, nhưng không tả ra được.
  - *Cách tìm:* Xin 3 bản email theo 3 giọng thật khác nhau, chọn một, rồi để Claude hỏi bạn vì sao chọn.
  - *Đưa cho Claude:* Một thang chấm cho email tốt của studio (một lợi ích rõ, một lời mời, không hứa quá), thay cho ba email cũ để chép. Kèm khuôn: tiêu đề tối đa 50 ký tự · lợi ích · lời mời.
- **Quản lý & vận hành.** Kế hoạch ra mắt bốn tuần.
  - *Điều chưa biết:* Bạn chưa từng ra mắt khoá học. Duyệt video mất mấy ngày? Tuần đầu ai trả lời học viên? Việc nào phải xong trước việc nào?
  - *Cách tìm:* Rà điểm mù trước, rồi để Claude phỏng vấn bạn về nguồn lực và hạn chót.
  - *Đưa cho Claude:* Bảng kế hoạch của dự án trước. Kèm khuôn của một đầu việc: người làm · hạn · trạng thái (chưa làm, đang làm, xong).

**Hồi 3 · Kết** (điểm dừng ③)

> **Mỗi bài giải thích, mỗi lần brainstorm, mỗi buổi phỏng vấn, mỗi bản nháp và mỗi tham chiếu đều là một cách rẻ để biết điều mình chưa biết, trước khi sửa nó trở nên đắt.** [S2]
>
> Làm rõ xong rồi mới giao. Phần sau nói chuyện giao thế nào để khỏi phải dặn đi dặn lại.

Mascot hỏi: *Giờ mình phỏng vấn bạn được chưa?*

Prompt mang đi thử (gõ dần, có nút Chép):

| Kính | Prompt |
|---|---|
| Chung | Tôi sắp làm [việc]. Tôi đã biết [điều bạn biết] nhưng chưa từng làm [phần còn lạ]. Hãy làm một blind spot pass: chỉ ra những unknown unknowns của tôi. Sau đó phỏng vấn tôi từng câu một về những chỗ còn mơ hồ, hỏi trước câu nào làm đổi cách làm. Khi đủ, viết lại thành SPEC.md. |
| Dev & engineer | Tôi cần tích hợp [cổng thanh toán] vào repo này nhưng chưa biết gì về phần thanh toán của codebase. Hãy làm một blind spot pass để chỉ ra những unknown unknowns của tôi, rồi giúp tôi viết prompt cho bạn tốt hơn. |
| BA & PM | Tôi muốn viết spec cho [tính năng] nhưng chưa nghĩ kỹ. Phỏng vấn tôi từng câu một cho tới khi bạn đủ thông tin để viết spec, ưu tiên những câu làm đổi phạm vi. Xong thì ghi vào SPEC.md. |
| Designer & sáng tạo | Tôi không biết [kỹ thuật] là gì nhưng cần [làm việc này]. Hãy dạy tôi những unknown unknowns về nó để tôi biết cách nhờ bạn cho đúng. Sau đó làm một trang HTML với 4 hướng thật khác nhau để tôi chọn. |
| Marketing & sales | Viết 3 bản [email] theo 3 giọng thật khác nhau, cùng một nội dung. Tôi sẽ chọn một bản. Sau đó hỏi tôi vì sao chọn nó, rồi gom các câu trả lời thành một thang chấm giọng văn để dùng cho lần sau. |
| Quản lý & vận hành | Tôi chưa từng [làm việc này]. Hãy làm một blind spot pass: những việc người làm lần đầu hay quên, những chỗ hay trễ. Sau đó phỏng vấn tôi từng câu một về nguồn lực và hạn chót. |

Nút: `02 · THE HANDOFF →`

**Golden word (5):** điều chưa biết · rà điểm mù · phỏng vấn · tham chiếu · khuôn.
**Mascot:** 3 lần hỏi (Hook, cách 3, Kết) · 1 nhật ký · 1 câu vui. Có thể thêm câu vui thứ hai ở cách 2: *Bốn hướng. Bạn chọn cái nào mình cũng không giận.*
**Chỗ chờ mô phỏng:** `sim:interview` (một buổi phỏng vấn nhiều lựa chọn, kiểu AskUserQuestion).
**Nguồn:** S2 (toàn bộ khung và câu chốt), S1 (hai shift, 9.100 ký tự, mockup HTML, rubric), S3 (phỏng vấn → SPEC.md → phiên mới), S6 (HTML cho bản nháp).

### 6.2 · Phần 02 · THE HANDOFF · Giao việc: nói ít, nói một lần *(dàn ý và câu chính)*

- **Mở chương:** nhãn `Trước · 02` · câu đỉnh như §2 · `5 phút` · art `compass`.
- **Hook ①**
  - Câu hỏi: **Bạn viết "TUYỆT ĐỐI KHÔNG" in hoa ba lần. Claude sẽ nghe lời hơn, hay làm quá tay hơn?**
  - Bắc cầu: *Theo docs của Claude Code: làm quá tay hơn.* (S3: "piling on emphasis mostly makes Claude over-apply the rule")
  - Mascot: mặt `[@_@]` khi gặp chữ in hoa; câu vui: *Mình nghe rõ mà, không cần hét đâu.*
- **Lõi**
  - *Một brief tốt có ba thứ:* **kết quả** bạn muốn · điều Claude không tự thấy · **thế nào là xong**. Muốn bản đầy đủ thì nói "be ambitious": đó là nói về phạm vi, thứ chỉ bạn biết, chứ không phải bảo nó nghĩ kỹ hơn [S3]. Dùng bảng "Thay vì / Hãy thử" của docs, đổi theo kính.
  - **Thẻ Then → Now chính ②** · **Bớt luật, tin phán đoán** · `Give Claude rules → Let Claude use judgement`
    - Hồi đó: *Mặc định không viết chú thích. Không bao giờ viết khối chú thích nhiều dòng.* (chỉ dẫn hệ thống cũ, dịch sát)
    - Bây giờ: *Viết sao cho giống phần đã có xung quanh: cùng độ dày chú thích, cách đặt tên, lối viết.* (chỉ dẫn mới, dịch sát)
    - Vì sao: luật cứng từng cần để tránh tình huống tệ nhất, nhưng sai với một phần yêu cầu (người dùng có sở thích riêng; có đoạn code phức tạp cần chú thích dài). Model mới tự phán đoán được [S1].
    - `Diễn giải của trang`: với việc của bạn, "giống phần đã có" là giọng của fanpage, bộ ảnh bìa đang dùng, mẫu báo cáo tuần trước. Đó là những thứ Claude tự đọc được, thay cho hai mươi luật.
  - **Thẻ phụ** · **Bớt nhắc, nói một lần** · `Repeat yourself → Simple tool descriptions`
    - Hồi đó: *Nhắc cùng một điều ở nhiều chỗ, in hoa cho chắc.*
    - Bây giờ: *Nói **một lần**, bằng lời thường, ở **đúng chỗ** nó được dùng.*
    - Vì sao: model cũ đôi khi cần được nhắc lại, và hay nghe lời dặn ở cuối context hơn ở đầu [S1]. Model bây giờ làm theo một dòng viết bình thường; nhấn mạnh chồng chất làm nó áp luật quá tay. Một dòng bị lạc trong file dài nghĩa là file cần ngắn lại [S3].
    - Ghi chú: luật không được phép sai (gửi email cho khách, xoá dữ liệu) thì không đặt trong lời dặn. Nó phải là quyền hoặc hook (Nâng cao A6) [S3].
  - *Nói một lần thì nói ở đâu* (ghi chú bề mặt):
    - Claude Code: `CLAUDE.md` gọn, chủ yếu là gotcha, tức những điều Claude không tự đọc ra từ thư mục [S1, S3]. Quy trình dài thì đưa vào skill (dẫn sang 03).
    - Cowork: hướng dẫn của project. Đây là hệ thống khác, nên ghi ngày kiểm chứng.
  - *Khối kính:* brief "trước" (danh sách lời dặn) và brief "sau" (ba dòng) cho phần việc của từng kính, theo bảng ở §4.
- **Kết ③**
  - Câu chốt: **Nói ít không phải là nói thiếu. Là nói đúng điều chỉ bạn biết, một lần, rồi để Claude lo phần còn lại.**
  - Prompt (Chung): *Đây là danh sách lời dặn tôi hay dùng: [dán]. Viết lại thành tối đa 5 dòng: giữ điều chỉ tôi biết, bỏ điều bạn tự làm đúng, gộp những dòng nhắc lại. Dòng nào là luật không được phép sai thì đánh dấu riêng, vì nó nên là quyền hoặc hook, không phải lời dặn.*
  - Nút: `03 · LET IT WORK →`
- **Mascot**
  - Hỏi ở ②: *Thế nào thì coi là xong?*
  - Nhật ký: *Đọc CLAUDE.md… 12 dòng, 3 dòng mình tự biết rồi.*
- **Golden word (5):** kết quả · thế nào là xong · phán đoán · một lần · đúng chỗ.
- **Chỗ chờ mô phỏng:** `sim:trim` (tỉa một bộ lời dặn, mỗi dòng bị bỏ gắn với shift tương ứng; kế thừa ý S8 của v3).

### 6.3 · Phần 03 · LET IT WORK · Để nó làm *(dàn ý và câu chính)*

- **Mở chương:** nhãn `Trong · 03` · câu đỉnh như §2 · `5 phút` · art `tree`.
- **Hook ①**
  - Câu hỏi: **Đang làm giữa chừng, Claude gặp một chỗ kế hoạch không lường trước. Bạn muốn nó dừng lại hỏi, hay tự quyết rồi báo lại?**
  - Bắc cầu: *Cả hai, tuỳ chỗ. Mẹo là nói trước cho nó biết chỗ nào thì hỏi.*
- **Lõi**
  - *Mở phiên mới, mang theo spec* [S2, S3]: phiên mới có context sạch, cùng mọi thứ đã gom được lúc làm rõ.
  - *Ghi chú triển khai* [S2]: Claude giữ một file `implementation-notes.md`. Gặp chỗ buộc phải **lệch kế hoạch**, nó chọn phương án an toàn hơn, ghi vào mục "Lệch kế hoạch" rồi làm tiếp. Lần sau đọc lại, cả bạn và Claude đều học được.
  - *Khi nào nó hỏi bạn:* gặp chỗ mơ hồ, Claude hỏi bằng câu hỏi nhiều lựa chọn [S3]. Bạn quy định trước: chỉ hỏi khi câu trả lời làm đổi kết quả cuối.
  - **Thẻ Then → Now chính ②** · **Bớt nhồi, để nó mở dần** · `Put it all upfront → Use progressive disclosure`
    - Hồi đó: *Dồn mọi hướng dẫn vào một file thật dài, để Claude khỏi bỏ sót.*
    - Bây giờ: *Chia thành một cây file nhỏ. Claude **mở dần**, đúng file vào đúng lúc.*
    - Vì sao: Claude Code đã giỏi nạp đúng context vào đúng lúc. Chính nhóm làm Claude Code đã tách phần rà code và phần kiểm chứng ra thành skill riêng, để Claude chỉ gọi khi cần [S1]. Với skill, Claude chỉ thấy sẵn phần mô tả ngắn; nội dung chỉ nạp khi dùng tới, nên tài liệu dài gần như không tốn gì cho tới lúc cần [S5].
  - **Thẻ phụ** · **Để Claude tự nhớ** · `Memory in CLAUDE.md files → Auto-memory`
    - Hồi đó: *Tự tay ghi mọi điều cần nhớ vào CLAUDE.md.*
    - Bây giờ: *Claude **tự nhớ** những điều đáng nhớ: vai và thói quen làm việc của bạn, những lần bạn sửa nó, quyết định của dự án, nơi tìm thông tin. Bạn xem lại và sửa bằng `/memory`.* [S4, S1]
    - Sự thật cần ghi [S4]:
      - auto memory bật sẵn ở các phiên chạy trên máy;
      - bộ nhớ nằm trên chính máy đó, không theo bạn sang máy khác hay lên cloud;
      - Claude không ghi những gì đọc lại được từ code;
      - muốn chắc thì nói thẳng "nhớ giúp tôi rằng…".
    - Nhãn bề mặt: Cowork có bộ nhớ riêng, là một hệ thống khác; ghi ngày kiểm chứng.
  - *Bạn lái thế nào* [S3]: xem **phút đầu**; thấy lệch thì bấm Esc (dừng ngay, giữ những gì đã làm); sửa hai lần vẫn sai thì `/clear` rồi viết một prompt mới gom điều vừa học, đừng sửa lần thứ ba. Muốn hiểu sâu hơn thì đọc Nâng cao A1 · Ngân sách ngữ cảnh (c02 đã viết).
  - *Khối kính:* chuyện xảy ra giữa chừng của từng kính, theo bảng ở §4.
- **Kết ③**
  - Câu chốt: **Trong lúc Claude làm, việc của bạn không phải là ngồi canh. Là lái khi nó lệch, và đọc lại những gì nó ghi.**
  - Prompt (Chung): *Giữ một file implementation-notes.md. Gặp chỗ buộc phải lệch kế hoạch, chọn phương án an toàn hơn, ghi vào mục "Lệch kế hoạch" rồi làm tiếp. Chỉ dừng lại hỏi tôi khi câu trả lời làm đổi kết quả cuối.* (theo prompt của S2)
  - Nút: `04 · NO BABYSITTING →`
- **Mascot**
  - Nhật ký: *Mở SPEC.md… Mở skill thanh-toan… Ghi: lệch kế hoạch #1* và *Đã lưu 2 điều cần nhớ* (giống dòng "Saved 2 memories" trong Claude Code [S4]).
  - Câu vui: *Mình ghi chép chăm lắm. Bạn chỉ cần đọc giúp mình một lần.*
  - Hỏi ở ②: *Chỗ này bạn muốn mình hỏi, hay tự quyết?*
- **Golden word (5):** lệch kế hoạch · mở dần · tự nhớ · phút đầu · lái.
- **Chỗ chờ mô phỏng:** `sim:tree` (cây file mở dần, MEMORY.md thêm dòng).

### 6.4 · Phần 04 · NO BABYSITTING · Kiểm, hỏi vặn, rồi buông *(dàn ý và câu chính)*

- **Mở chương:** nhãn `Sau · 04` · câu đỉnh như §2 · `6 phút` · art `city`.
- **Hook ①**
  - Câu hỏi: **Claude báo: "Xong rồi, mọi thứ đều chạy." Bạn tin câu đó tới đâu?**
  - Bắc cầu: *Không có gì để chạy thử thì "trông như xong" là tất cả những gì Claude có. Khi ấy, bạn thành người kiểm thay nó.* [S3]
  - Mascot: `[^_^]✓` + câu vui *Xong rồi! …nhưng bạn đừng tin mình ngay nhé.*
- **Lõi**
  - *Một **phép kiểm** trả về đạt hay không đạt* [S3]. Câu chính, dịch sát mẹo của docs: *Cho Claude thứ nó chạy được, trả về đạt hay không đạt. Có nó rồi, Claude tự làm tiếp, bạn không phải ngồi xem.*
    - Ví dụ của docs: file test, mã thoát của bản build, linter, script so kết quả với mẫu, ảnh chụp trình duyệt đặt cạnh mockup.
    - `Diễn giải của trang`, cho việc không phải code: tổng khớp file nguồn · số nào cũng có link · mỗi clip ≤ 60 giây · đúng khuôn đã giao.
  - *Đòi **bằng chứng**:* lệnh đã chạy kèm kết quả, hoặc ảnh chụp. Một câu "mọi test đều qua" không kèm gì thì gần như chẳng nói lên điều gì [S3].
  - *Một người duyệt chưa thấy cách làm:* reviewer ở một context mới, đối chiếu với SPEC. Dặn nó chỉ báo chỗ ảnh hưởng tới tính đúng và bỏ qua văn phong, vì một reviewer được nhờ tìm lỗi thì kiểu gì cũng tìm ra *một cái gì đó* [S3].
  - **Thẻ Then → Now chính ②** (từ bảng *What you can stop doing* [S3])
    - Hồi đó: *Dặn "làm tiếp đi, đừng lười, lặp tới khi xong".*
    - Bây giờ: *Cho nó một phép kiểm phải qua. Việc chạy mà không ai xem thì dùng `/goal` hoặc Stop hook.*
  - *Đảo vai: giờ bạn **hỏi vặn** Claude* [S2; cộng đồng S14]
    - Bắt Claude làm một báo cáo HTML về những gì đã đổi, cuối báo cáo có câu đố. Tác giả bài field guide chỉ merge khi trả lời đúng hết.
    - Mẹo của Boris Cherny trong repo cộng đồng: "grill me on these changes and don't make a PR until I pass your test", "prove to me this works".
    - Mascot đổi vai: bạn hỏi, mascot trả lời; câu vui *Câu 3 khó thế…*
  - *Trước khi để nó chạy một mình: 5 câu hỏi* [S3], danh sách đánh số, mascot hỏi lần lượt:
    1. Nó có biết thế nào là xong không?
    2. Nó tự kiểm được không?
    3. Nó được chạm vào đâu?
    4. Cái gì sẽ làm nó dừng?
    5. Kết quả đi đâu, và ai ký duyệt?
  - *No babysitting không phải là bỏ mặc* [S3]: phần còn lại của bạn là bắt đầu việc, quyết lần này "xong" là gì, và duyệt ở cuối. "Không cấu hình nào thay được việc xem phút đầu."
  - *Bảng six shifts* (tổng kết §7, mỗi hàng dẫn về chương có nó).
  - *Khối kính:* phép kiểm, câu đố và việc chạy một mình của từng kính, theo bảng ở §4.
- **Kết ③** (nhắc lại câu đỉnh của cả trang)
  - Câu chốt: **Thôi cầm tay chỉ việc: cùng Claude làm rõ việc, giao trọn, cho nó phép kiểm, rồi buông. Bạn chỉ giữ lại hai việc: quyết thế nào là xong, và duyệt những gì không hoàn tác được.**
  - Prompt (Chung, theo S2): *Tôi muốn chắc mình hiểu hết những gì vừa thay đổi. Làm cho tôi một báo cáo HTML: đã làm gì, vì sao, còn rủi ro gì. Cuối báo cáo là 5 câu hỏi; tôi phải trả lời đúng hết thì mới duyệt.*
  - Nút: `Nâng cao →` · `Về trang chủ`
- **Golden word (5):** phép kiểm · bằng chứng · hỏi vặn · buông · duyệt.
- **Chỗ chờ mô phỏng:** `sim:check` (vòng làm → kiểm → sửa → kiểm) · `sim:quiz` (báo cáo HTML có câu đố).

## 7. Bảng six shifts (dùng ở 04, ở Library và ảnh chia sẻ)

| # | Tên Việt (tiêu đề) | Tên gốc (nhỏ, giữ chính tả của nguồn) | Ở phần |
|---|---|---|---|
| 1 | Bớt luật, tin phán đoán | Give Claude rules → Let Claude use judgement | 02 |
| 2 | Bớt ví dụ, thiết kế khuôn | Give Claude examples → Design interfaces | 01 |
| 3 | Bớt nhồi, để nó mở dần | Put it all upfront → Use progressive disclosure | 03 |
| 4 | Bớt nhắc, nói một lần | Repeat yourself → Simple tool descriptions | 02 |
| 5 | Để Claude tự nhớ | Memory in CLAUDE.md files → Auto-memory | 03 |
| 6 | Bớt tả, đưa tham chiếu | Simple specs → Rich references | 01 |

Thứ tự 1–6 theo bài gốc. Câu chốt của bài gốc (*Try simplifying*): nhóm làm Claude Code đã đưa các thực hành này vào `/doctor`, để tự rà và tỉa skill và CLAUDE.md của bạn [S1]. Đưa câu này vào cuối bảng.

## 8. Nâng cao (chỉ dàn ý; viết sau khi lộ trình chính lên trang)

Mười hai phần của v3 gộp thành tám mục. Mục nào chưa viết thì không hiện trong menu. Các mục dùng lại mã chương v3 để link cũ không gãy.

| Mục | Mã | Nội dung (từ v3) | Nguồn thêm |
|---|---|---|---|
| A1 · Ngân sách ngữ cảnh | `c02` **đã viết, giữ nguyên** | Phiên tập trung, `/clear`, `/compact`, tua lại, phiên mới | S3 |
| A2 · Hồ sơ onboarding | `c04` | CLAUDE.md chỉ ghi điều Claude không tự tìm được, rules theo vùng, auto memory chi tiết, AGENTS.md | S4 |
| A3 · Skill và playbook | `c05` | Khi nào tạo skill, description viết cho model, mục Gotchas, skill là một thư mục | S5, S7 |
| A4 · Làm theo nhóm | `c08` | Subagent tốn gì, reviewer mới, chạy song song, dynamic workflows (fan-out, đối chiếu đối kháng, thang chấm) | S8 |
| A5 · Đúng mức nghĩ | `c05b` | Model và effort | S11 |
| A6 · Công cụ và chính sách | `c06` | Connector/MCP, chế độ quyền, deny rule, hook, sandbox, prompt injection | S3 |
| A7 · Rà soát trước khi bàn giao | `c07` | Stop hook, `/goal`, `/code-review`, `/verify`, review theo SPEC | S3, S13 |
| A8 · Việc định kỳ | `c09` | Lịch chạy, sự kiện, cloud, Slack, giới hạn chi tiêu, sổ ghi và dấu trang | S12 |

Phần c00, c01 và c10 của v3 đã nhập vào lộ trình chính (00 và 04).

## 9. Bỏ, cất, để sau

| Thứ | Xử lý |
|---|---|
| Hai lần tung đồng xu (`TwoFlips`) | Bỏ khỏi trang (D34) |
| Vòng giao việc 7 bước (`Run`) và 6 loại việc (`work-types.ts`) | Bỏ khỏi trang; 6 loại việc **viết lại sau** (việc tồn) |
| Tuyên ngôn 3 câu hỏi + 4 con số | Thay bằng kim tự tháp; giữ nền mặt nước |
| Journey 12 phần, bộ đếm `/ 12` | Thành 5 phần, `/ 05` |
| `StatusBoard` (báo cáo tuần) · `PredictPrompt` · `GrillCard` | Không dùng ở lộ trình chính |
| Mô phỏng phần "thấy" | Không làm mới. Mỗi phần ghi chỗ chờ (`sim:*`); dựng sau khi chữ đã chốt |
| Trang khung c00, c01, c03, c05, c05b, c06–c10 | Gỡ khỏi menu, sitemap và Journey. Mở link trực tiếp thì hiện trang ngắn "Phần này đang được viết lại", có link về lộ trình chính, `noindex` |
| Đề xuất câu chữ đợt C trước đây (nhãn công cụ, chữ nút StatusBoard, hai nút ở hero) | Không còn áp dụng: thành phần đã bỏ, hoặc đã thay bằng §5 |

## 10. Nguồn (đã đọc ngày 08/11/2026)

| Mã | Nguồn | Dùng cho |
|---|---|---|
| S1 | Thariq Shihipar, *The new rules of context engineering for Claude 5 generation models*, 24/07/2026. <https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/>. Link `claude.com/blog/…` chuyển hướng (308) sang đây; thêm `.md` vào cuối link để có bản markdown, kể cả chú thích hình | Six shifts, 80%, lời dặn chỏi nhau, TodoWrite 9.100 ký tự, mockup HTML, rubric, `/doctor` |
| S2 | Thariq Shihipar, *A field guide to Claude Fable 5: Finding your unknowns*, 06/07/2026. <https://claude.com/resources/articles/a-field-guide-to-claude-fable-finding-your-unknowns> | Bản đồ và lãnh thổ, bốn ô, rà điểm mù, bản nháp, phỏng vấn, tham chiếu, ghi chú triển khai, giải thích và quiz, video ra mắt Fable, câu chốt của 01 |
| S3 | *Best practices for Claude Code*. <https://code.claude.com/docs/en/best-practices> (thêm `.md` để có bản markdown) | Điều Claude không tự thấy, prompt cụ thể, be ambitious, phỏng vấn → SPEC.md, phép kiểm, bằng chứng, reviewer, lái phiên, 5 câu hỏi, *What you can stop doing* |
| S4 | *How Claude remembers your project*. <https://code.claude.com/docs/en/memory> | Auto memory: bốn loại ghi chú, bật sẵn ở phiên chạy trên máy, nằm trên máy, `/memory` |
| S5 | *Extend Claude with skills*. <https://code.claude.com/docs/en/skills> | Nội dung skill chỉ nạp khi dùng |
| S6 | Thariq Shihipar, *Using Claude Code: The unreasonable effectiveness of HTML*, 20/05/2026. <https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/> | Bản nháp và kế hoạch bằng HTML |
| S7 | Thariq Shihipar, *Lessons from building Claude Code: How we use skills*, 03/06/2026. <https://claude.dev/blog/lessons-from-building-claude-code-how-we-use-skills/> | Nâng cao A3 |
| S8 | Thariq Shihipar, Sid Bidasaria, *A harness for every task: dynamic workflows in Claude Code*, 02/06/2026. <https://claude.dev/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code/> | Nâng cao A4; thang chấm và agent đối chiếu |
| S9 | *How Claude Code works*. <https://code.claude.com/docs/en/how-claude-code-works> | Vòng làm việc của agent (nếu cần ở 00) |
| S10 | *Desktop application*. <https://code.claude.com/docs/en/desktop> | Claude Code là tab Code của ứng dụng desktop, không cần terminal |
| S11 | Thariq Shihipar, *Using Claude Code: Spending your effort*, 25/09/2026. <https://claude.dev/blog/spending-your-effort/> | Nâng cao A5 |
| S12 | Lance Martin, CJ Avilla, *Building effective agent automations*, 08/10/2026. <https://claude.dev/blog/building-effective-agent-automations/> | Nâng cao A8 |
| S13 | Addy Osmani, Morgan Westlee Lunt, Qing Wang, *How the Claude Code team does code review*, 15/10/2026. <https://claude.dev/blog/solving-code-review-at-anthropic/> | Nâng cao A7 |
| S14 | Repo cộng đồng `shanraisshan/claude-code-best-practice`. <https://github.com/shanraisshan/claude-code-best-practice> | Mẹo "grill me" và "prove to me this works" (Boris Cherny); phỏng vấn bằng AskUserQuestion rồi mở phiên mới (Thariq). Ghi rõ là nguồn cộng đồng |

Nguồn về cách dạy và cách viết (cho người viết, không hiện trên trang): xem `17-handoff-prompt.md` §3.

## 11. Thế nào là xong (cho đợt viết và dựng)

1. Trang chủ và năm phần có chữ đúng §5–§6, theo văn phong ở `16-writing-guide.md`. Chủ dự án đã duyệt từng PR nội dung (D13).
2. Con số, tên tính năng và câu trích nào cũng có nguồn bấm được. Chỗ nào là diễn giải của trang thì có nhãn. Nguồn nói khác kịch bản thì theo nguồn và ghi lại trong `implementation-notes.md`.
3. Mỗi phần có đủ ba hồi, ba điểm dừng, tối đa năm golden word, đủ sáu biến thể kính cho khối ví dụ và prompt, cùng một hình mở chương. Tất cả theo `15-typography-motion-v4.md`.
4. `<title>` có tiếng Việt trước (mục M8 của bản đánh giá độc lập).
5. Các bộ kiểm đang có đều xanh: `check.cjs`, `type-check.cjs` (kèm `--selftest`), `design-check.cjs`, ở mọi khổ đang đo. Có thêm phép đo cho các luật mới ở 15 §9.
6. Tắt chuyển động, hoặc bật reduced motion: mọi chữ hiện đủ, không ghim, không gõ dần.
7. `/c02/` vẫn chạy. Link cũ tới các trang khung không trả 404.
