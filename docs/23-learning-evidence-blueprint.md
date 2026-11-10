# 23 · Learning Evidence Blueprint (10/11/2026)

> **Trạng thái: bản nháp chờ chủ dự án duyệt, chưa qua AI Council.** Tài liệu này thực hiện assignment ở `22-handoff-prompt-claude-learning-methodology.md` theo phương pháp ở `21-learning-product-methodology.md`. Không đổi code, UI, nội dung chương hay Glossary.
> **Đối tượng khảo sát:** `main` tại commit `49a210e` (10/11/2026).
> **Người viết:** Claude, trong vai agent thực thi. Phán đoán trong tài liệu là phân tích của AI, không phải ý kiến của chuyên gia có chứng chỉ.

## 0. Tóm tắt

1. **Curriculum hiện có ba lớp ở ba trạng thái khác nhau, và lớp đã duyệt chưa có trên site.** Kịch bản v4 (5 phần) đã duyệt nhưng mới là tài liệu; site vẫn chạy 12 chương v3, trong đó chỉ c02 có nội dung, và c02 mới dựng 4 trên 8 beat (§2).
2. **Không có hoạt động nào hiện tại cho ra bằng chứng Transfer.** Hoạt động của người học ở v4 là chép một prompt có chỗ trống rồi mang đi thử ngoài site. Mức cao nhất nó có thể chứng minh là Execute có khuôn, và site không quan sát được cả mức đó (§3).
3. **Độ phủ sáu năng lực lệch nhau.** Task Framing, Context Engineering và Verification được dạy kỹ. Workflow Design không có chương nào nhận. Tool & Permission Design chỉ có hai dòng ở lộ trình chính, phần còn lại nằm ở Nâng cao A6 chưa viết (§3.2).
4. **Hai thước đo của PRD đã mất chỗ bám.** G1 (Re-test cao hơn Diagnostic) và G2 (chép template Starter Kit) dựa trên những thứ v4 đã bỏ hoặc chưa từng dựng (§4.3).
5. **Đề xuất lát cắt thử nghiệm gồm ba module**, lấy từ 00–04 cùng A1 và một phần A6, kèm ba bài đánh giá trên tình huống mới và thang chấm bốn mức (§5, §6).
6. **Bốn quyết định cần chủ dự án duyệt** trước khi làm tiếp (§9).

### Nhãn dùng trong tài liệu

| Nhãn | Nghĩa | Độ mạnh |
|---|---|---|
| `[Quan sát]` | Đọc trực tiếp từ repo, có đường dẫn file | Kiểm lại được |
| `[Evidence-backed]` | Có nghiên cứu liên quan; ghi rõ giới hạn | Nguyên lý chung, không chứng minh cho sản phẩm này |
| `[Phán đoán AI]` | Suy luận của Claude từ quan sát và nguyên lý | Cần Council và người học kiểm |
| `[Product hypothesis]` | Hợp lý nhưng chưa thử với người học | Chưa kiểm |
| `[Design decision]` | Quyết định đã có của chủ dự án | Đã duyệt, ghi mã D hoặc mục |

Không có nhận định nào trong tài liệu này mang nhãn *Expert-informed* theo nghĩa của `21` §13, vì chưa có chuyên gia là người thật tham gia.

## 1. Phạm vi và cách làm

**Đã đọc trọn:** `21`, `22`, `14`, `17`, `18`, `independent-evaluation-council/README.md`, `review-protocol.md`, `site/src/content/chapters.json` (12 chương v3), `site/src/pages/index.astro`, `site/src/pages/[ch]/index.astro`, `site/src/lib/status.ts`.
**Đã đọc một phần:** `01-PRD.md` (§1–§3, §8, §9), `02-pedagogical-script.md` (§0.3, §0.8, phụ lục), `08-kaizen-go-live.md` (bảng quyết định, §5), `12`, `16` (mục lục), `19` (§0–§1), `site/src/pages/c02/index.astro`, `site/src/content/work-types.ts`, `CHANGELOG.md`.
**Chưa đọc:** xem §10.

Cách làm theo chuỗi của `review-protocol.md` §10: *Competency → Learning outcome → Learning activity → Evidence → Assessment task → Rubric*. Với mỗi đơn vị nội dung, tôi hỏi: người học **làm** gì, thứ gì **còn lại** sau khi làm, và **ai thấy** được thứ đó.

## 2. Curriculum thực tế đang ở đâu

| Lớp | Nội dung | Trạng thái | Căn cứ |
|---|---|---|---|
| **L1 · Đang chạy trên site** | Trang chủ (Intro, Spark, tuyên ngôn, Hai lần tung đồng xu, Một lần giao việc với 6 nhóm việc, Journey 12 phần, Finale) · c02 · 11 trang khung · Library 14 mục mẫu | c02 dựng beat b1–b4 (câu hỏi, đoán, mô phỏng S1, một đoạn giải thích). Chưa có b5–b8: Cách làm, S2, Grill me. Trang khung hiện nhãn "Khung · nội dung chưa viết" | `[Quan sát]` `site/src/pages/c02/index.astro` dòng 11–12, 19–51 · `site/src/lib/status.ts` (`LIVE.chapters = ['c02']`, `simulators = ['S1']`) · `site/src/pages/[ch]/index.astro` dòng 39 |
| **L2 · Lộ trình chính v4** | 5 phần: 00, 01, 02, 03, 04 | Đã duyệt (D13). Phần 01 viết đủ chữ; 00, 02, 03, 04 là dàn ý và câu chính. Chưa có gì trên site | `[Quan sát]` `14` dòng 3, §6.0–§6.4 · `CHANGELOG.md` mục v4: "Chỉ là tài liệu, chưa đổi gì trên site" |
| **L3 · Nâng cao** | A1–A8 (từ 12 chương v3), A9 | A1 = c02 (đang chạy một phần). A2–A9 là dàn ý. Mô phỏng S2–S11 chưa dựng | `[Quan sát]` `14` §8 · `18` §3 · `01-PRD.md` §8 |
| **L4 · Nhập môn** | N0–N13 | Outline đã chốt hướng, chưa viết kịch bản | `[Quan sát]` `18` dòng 3 |

**Hệ quả cho blueprint.** Bản đồ ở §3 lấy L2 làm trục chính vì đó là lộ trình đã duyệt, và đánh dấu riêng những gì người học thật sự gặp được hôm nay (L1). Mọi nhận định về L2–L4 là nhận định về *kịch bản*, chưa phải về trải nghiệm đã dựng.

## 3. Bản đồ năng lực

Sáu năng lực lấy nguyên từ `21` §4: **C1** Task Framing · **C2** Context Engineering · **C3** Workflow Design · **C4** Tool & Permission Design · **C5** Orchestration & Recovery · **C6** Verification & Handoff.

Cột *Mức cao nhất hoạt động cho phép* dùng thang của `21` §4: **U** Understand · **E** Execute có khuôn · **T** Transfer. Dấu `—` là không có hoạt động.

### 3.1 Từng đơn vị nội dung

| Đơn vị | Năng lực | Outcome đang ghi | Hoạt động của người học | Thứ còn lại sau khi làm | Bằng chứng hiện có | Mức | Chỗ hở hoặc mơ hồ |
|---|---|---|---|---|---|---|---|
| **Trang chủ · Một lần giao việc** (L1) | C3, C6, một phần C4 | Không ghi | Chọn nhóm việc, cuộn xem 7 bước | Không | Đếm lượt chọn nhóm việc, cuộn tới bước 7 (`08` §5) | U | Là minh hoạ, không phải luyện tập. Đây là nơi duy nhất cho thấy trọn một workflow, kể cả công cụ nào cần connector và bước nào phải duyệt (`work-types.ts`) |
| **00 · Vì sao bạn vẫn phải trông** (L2) | C1 | Chỉ có câu đỉnh, không có outcome | Đọc; chép prompt "chỉ ra dòng nào bạn tự làm đúng, dòng nào chỏi nhau, điều chỉ tôi biết" | Không, trừ khi tự chạy ngoài site | Không | U, E nếu tự chạy | `21` §8 muốn module A dạy phân biệt *prompting, task delegation, agentic workflow*. Phần 00 không dạy điều đó; nó dạy *điều Claude không tự thấy* |
| **01 · Tìm điều chưa biết** (L2, viết đủ) | C1, C2 | Câu đỉnh | Đọc 3 cách tìm, 2 thẻ Then → Now, ví dụ theo kính; xem thẻ tĩnh "grill me 1/3"; chép prompt | SPEC.md, nếu tự chạy ngoài site | Không | E | Ví dụ theo kính là worked example tốt. Chưa có bước nào giữa "xem ví dụ" và "tự làm": prompt mang đi thử có sẵn cấu trúc, người học chỉ điền chỗ trống |
| **02 · Giao việc** (L2) | C1, C2, chạm C4 | Câu đỉnh | Đọc brief trước và sau theo kính; chép prompt tỉa lời dặn | Bộ lời dặn đã tỉa, nếu tự chạy | Không | E | C4 chỉ là một ghi chú: luật không được phép sai thì là quyền hoặc hook, xem A6 (`14` dòng 409) |
| **03 · Để nó làm** (L2) | C5, C2 | Câu đỉnh | Đọc; chép prompt `implementation-notes.md` | File ghi chú, nếu tự chạy | Không | E | Dạy *luật lái* (phút đầu, Esc, sửa hai lần thì `/clear`) nhưng không có tình huống để người học tự quyết |
| **04 · Kiểm, hỏi vặn, rồi buông** (L2) | C6, chạm C3 và C4 | Câu đỉnh | Đọc; xem thẻ tĩnh câu đố; đọc 5 câu hỏi trước khi cho chạy một mình; chép prompt báo cáo HTML có câu đố | Báo cáo và câu đố, nếu tự chạy | Không | E | "Quiz me" kiểm việc người học hiểu *thay đổi Claude vừa làm*, không kiểm năng lực giao việc của người học. Hai thứ dễ bị gộp làm một khi đo |
| **A1 · c02 Ngân sách ngữ cảnh** (L1) | C5, C2 | 3 mục tiêu có động từ (`chapters.json` c02 `goals`) | Chọn 1 trong 3 dự đoán; chạy mô phỏng S1 | Không | Sự kiện `event-c02-predict`, `-skip`, `-sim-done` (`c02/index.astro` dòng 65–70) | U | Dự đoán không được chấm ("không có đáp án bị chấm sai"). S2, hoạt động ra quyết định duy nhất của chương, chưa dựng |
| **A2 · c04** | C2, C4 | 4 mục tiêu | S4: xếp 12 dòng vào Giữ, Xoá, Chuyển (chưa dựng) | Không | Không | E | Có đáp án cố định (`02` phụ lục A): đo nhận diện, không đo thiết kế |
| **A3 · c05** | C2, C3 | 4 mục tiêu | S5: xếp 8 tình huống (chưa dựng) | Không | Không | E | Như trên |
| **A4 · c08** | C3 | 3 mục tiêu | Lắp quy trình theo thứ tự cho sẵn (chưa dựng) | Không | Không | E | Kiểm *thứ tự*, không kiểm lý do chia việc |
| **A5 · c05b** | *Không khớp năng lực nào* | 4 mục tiêu | S9 (chưa dựng) | Không | Không | E | Chọn model và effort không có chỗ trong sáu năng lực |
| **A6 · c06** | C4 | 3 mục tiêu | S6: chọn mode, sửa quy tắc, xem 6 hành động (chưa dựng) | Không | Không | E | Nơi duy nhất dạy C4 đầy đủ, và nằm ngoài lộ trình chính |
| **A7 · c07** | C6 | 3 mục tiêu | S7: bật tắt 4 lớp kiểm (chưa dựng) | Không | Không | E | Trùng phần lớn với 04 |
| **A8 · c09** | C3, C5 | 4 mục tiêu | Xếp 6 việc vào AFK hoặc Cần người (chưa dựng) | Không | Không | E | Chỗ duy nhất luyện đặt điểm dừng cho người duyệt |
| **Nhập môn N0–N13** (L4) | C1, C2 mức nhập môn; N11 chạm C4; N12 chạm C6 | Câu đỉnh từng bài; D53 định nghĩa "xong" bằng sản phẩm | "Việc làm thật" có checklist tự đánh dấu, lưu trong trình duyệt | Một dự án đã setup: hướng dẫn, prompt đầu tiên, artifact (D53) | Checklist tự khai, nếu dựng | E | Là nơi duy nhất trong cả sản phẩm định nghĩa "xong" bằng **artifact của người học**. Chưa có cách nào xem chất lượng artifact |
| **Library** (L1 mẫu) · **Glossary** (chưa có) | Hỗ trợ tra cứu | G3: phủ 100% đơn vị của repo nguồn | Lọc, tìm | Không | Lượt tìm không ra kết quả (`08` §5) | — | G3 là thước đo độ phủ. `21` §15 dặn không mở rộng để tăng số lượng. Hai điều này kéo ngược nhau |

### 3.2 Độ phủ theo năng lực

| Năng lực | Lộ trình chính (L2) | Nâng cao (L3) | Nhận định `[Phán đoán AI]` |
|---|---|---|---|
| **C1 Task Framing** | 00, 01, 02: dày | c03 (đã nhập vào 01–02) | Phủ tốt. Là gốc của các năng lực khác |
| **C2 Context Engineering** | 01, 02, 03: dày nhất, vì six shifts chính là context engineering | A1, A2, A3 | Phủ tốt, có nguy cơ thừa (§4.1) |
| **C3 Workflow Design** | Không có chương nhận. Rải rác: "spec rồi mở phiên mới" (01, 03), "chỉ hỏi khi đổi kết quả cuối" (03), 5 câu hỏi (04) | A4, A8, S3 "cắt lát" của c03 | **Hở lớn nhất về cấu trúc.** Chia việc, thứ tự, phụ thuộc và điểm dừng cho người duyệt không được dạy như một kỹ năng ở lộ trình chính |
| **C4 Tool & Permission Design** | Hai chỗ: ghi chú ở 02 và câu hỏi 3 của 04 ("Nó được chạm vào đâu?") | A6 | **Hở lớn nhất về rủi ro.** Câu chốt của cả trang giữ lại việc "duyệt những gì không hoàn tác được", nhưng lộ trình chính không dạy cách nhận ra và chặn chúng |
| **C5 Orchestration & Recovery** | 03: vừa | A1 (đang chạy một phần), A8 | Có luật, thiếu tình huống để ra quyết định |
| **C6 Verification & Handoff** | 04: dày về kiểm chứng | A7 | Kiểm chứng phủ tốt. Phần *handoff* (gói bàn giao cho người khác, ghi rủi ro còn lại) chỉ có một dòng trong prompt của 04 |

### 3.3 Ba chỗ mô hình năng lực chưa khớp với nội dung

1. **"Handoff" đang có hai nghĩa.** `[Quan sát]` Phần 02 tên là THE HANDOFF và nói về *giao việc cho Claude* (`14` §6.2). Năng lực C6 dùng *handoff* cho việc *bàn giao kết quả cho người* (`21` §4). Người học và người chấm sẽ lẫn.
2. **C3 không có nhà.** Lộ trình chính đi theo vòng đời Trước, Trong, Sau. Sáu năng lực chia theo loại quyết định. C3 cắt ngang cả ba chặng nên không chương nào nhận.
3. **Model và effort (A5, N7) nằm ngoài sáu năng lực.** Hoặc đây là phạm vi cố ý bỏ, hoặc mô hình thiếu một mục về chọn nguồn lực và chi phí.

Ba điểm này đưa vào câu hỏi cho Council (§7), chưa đề xuất sửa mô hình.

## 4. Trùng lặp, thiếu, và nội dung chưa gắn với outcome

### 4.1 Trùng lặp

`[Quan sát]` `18` §1 (D51) đặt luật "Không viết một ý ở hai nơi". Các ý dưới đây xuất hiện ở ba nơi trở lên trong kịch bản:

| Ý | Xuất hiện ở | Nhận định `[Phán đoán AI]` |
|---|---|---|
| Tham chiếu và thang chấm thay cho lời tả | 01 khối 4, c03 b7, c07 b6, N8, N12 | Lặp có chủ đích thì nên ghi rõ mỗi lần thêm gì. Hiện chưa ghi |
| Luật không được phép sai thì là quyền hoặc hook | 02 ghi chú, 04 câu 3, c04 S4 dòng 5, c06, Diagnostic K3 | Nhắc nhiều, dạy ít: bốn nơi nhắc, một nơi dạy |
| Phỏng vấn → SPEC.md → phiên mới | 01 cách 3, 03, c03, N5 | N5 và 01 gần như cùng nội dung ở hai track |
| Sửa hai lần vẫn sai thì `/clear` | 03, c02, N6, N13 | Chấp nhận được nếu c02 là nơi gốc |
| Bảng six shifts | 00 (xem trước), 01–03 (từng cặp), 04 (bảng), N8 ("chỉ có Now"), c10 | N8 và 04 cần phân vai rõ |
| Kiểm chứng: phép kiểm, bằng chứng, reviewer mới | 04, A7, N12 | A7 cần nói rõ thêm gì so với 04 |

`[Evidence-backed, có giới hạn]` Gặp lại một ý sau một khoảng thời gian giúp nhớ lâu hơn, với điều kiện người học phải *tự nhớ lại* chứ không chỉ đọc lại (Dunlosky và cộng sự 2013, nguồn ở `21` §16). Các chỗ lặp ở trên đều là đọc lại. Tôi chưa đối chiếu lại bài báo trong phiên này.

### 4.2 Thiếu

| Thiếu | Căn cứ | Hệ quả |
|---|---|---|
| Outcome quan sát được cho 5 phần của v4 | `[Quan sát]` Khuôn dữ liệu ở `14` §3 có `summary` (câu đỉnh) nhưng không có trường outcome. Mục "Mục tiêu" của v3 không được chuyển sang | Không có gì để bài đánh giá bám vào |
| Bước giảm dần khuôn đỡ | `[Quan sát]` Mỗi phần đi thẳng từ ví dụ theo kính sang prompt có chỗ trống | Người học chưa bao giờ phải tự chọn nguyên lý |
| Phản hồi cho việc người học làm | `[Quan sát]` Prompt được chạy ngoài site; site không thấy kết quả | Vòng *Practice → Feedback* của `21` §6 bị đứt ở Feedback |
| Tự nhớ lại | `[Quan sát]` D30 bỏ nhịp Đoán và nhịp Nhớ ở lộ trình chính (`14` dòng 68) | Vòng `21` §6 thiếu Retrieve |
| Tình huống mới | `[Quan sát]` Mọi ví dụ nằm trong một câu chuyện chung (`14` §4) | Không có chỗ nào để thấy Transfer |
| C3 và C4 ở lộ trình chính | §3.2 | Lời hứa "khỏi phải trông" thiếu hai điều kiện để làm được an toàn |

### 4.3 Hai thước đo của PRD đã mất chỗ bám

`[Quan sát]` `01-PRD.md` §2 và §9:
- **G1** đo bằng "Re-test cao hơn Diagnostic". Diagnostic nằm ở c00, Re-test ở c10. Cả hai chương đã nhập vào 00 và 04 (`14` §8), và `14` §6.0, §6.4 không nhắc tới Diagnostic hay Re-test.
- **G2** đo bằng "chép ít nhất một template trong Starter Kit". Starter Kit chưa có trên site. Thứ gần nhất ở v4 là nút Chép của prompt mang đi thử.

`[Phán đoán AI]` Kể cả khi còn nguyên, hai thước đo này không đo Transfer: G1 là sáu câu trắc nghiệm (nhận diện), G2 là một lượt chép (ý định). Xem quyết định Q3 ở §9.

### 4.4 Nội dung chưa gắn với outcome quan sát được

| Nội dung | Chức năng học có thể có | Ghi chú |
|---|---|---|
| Spark, tuyên ngôn, Journey, Finale, Hai lần tung đồng xu | Orient | Hợp lệ theo `21` §11 nếu được coi là định hướng. `19` §0 đo được trang chủ ghim 75% quãng cuộn |
| Số 80% và vế "Hồi đó" của thẻ Then → Now | Understand: giải thích *vì sao* | `[Product hypothesis]` Vế "Hồi đó" có ích với người từng viết prompt kiểu cũ. Với người đọc của Nhập môn (D47), nó có thể chỉ là tải thêm. N8 đã tự xử lý bằng bản "chỉ có Now" |
| Mười biến thể kính cho mỗi khối ví dụ | Giảm khoảng cách tới việc thật | Nhân mười lượng chữ cần viết và duyệt. Chưa có bằng chứng rằng kính tăng Transfer; nó cũng có thể *giảm* vì người học chỉ thấy đúng nghề mình |
| Golden word, câu vui của mascot | Gợi nhớ | Không có hoạt động nào kiểm việc nhớ |
| A5 model và effort; N3 gói và chi phí; N13 lệnh | Tra cứu | Thuộc Knowledge System hơn là Learning Path |
| Library phủ 100% repo nguồn (G3) | Tra cứu | Xem §3.1 |

## 5. Lát cắt thử nghiệm đề xuất

### 5.1 Tiêu chí chọn

Chọn theo *kiểu học* và độ phủ năng lực (`21` §8), với ba ràng buộc thêm `[Phán đoán AI]`:
- không viết chương mới chỉ để thử;
- mỗi module cho ra một artifact chấm được;
- cả ba module cộng lại chạm đủ sáu năng lực.

### 5.2 Ba module

| Module | Kiểu học | Nội dung nguồn | Năng lực | Outcome quan sát được (đề xuất) |
|---|---|---|---|---|
| **P1 · Làm rõ và giao** | Khái niệm → gợi mở qua hội thoại → viết artifact | 00 · 01 · khối "một brief tốt có ba thứ" của 02 | C1, C2 | Từ một yêu cầu mơ hồ ở lĩnh vực chưa gặp, người học (a) liệt kê điều chưa biết và chọn cách tìm cho từng điều, (b) viết brief có kết quả, điều Claude không tự thấy, và định nghĩa "xong" kiểm được, (c) chọn và loại tài liệu đưa cho Claude, có lý do |
| **P2 · Đặt ranh giới** | Phân loại theo rủi ro, có hậu quả tất định | Ghi chú ở 02 · câu 3–5 trong "5 câu hỏi" của 04 · phần app-first của A6 (c06) | C4, một phần C3 | Với một agent và danh sách khả năng có thể cấp, người học (a) xếp từng khả năng vào cho phép, hỏi trước, chặn, kèm lý do về khả năng hoàn tác và mức lộ thông tin, (b) chỉ ra và cắt quyền thừa trong một cấu hình cho sẵn, (c) tách điều phải là rào chắn khỏi điều chỉ cần là lời dặn |
| **P3 · Lái, kiểm và bàn giao** | Phán đoán khi tình huống đổi → đánh giá | 03 · 04 · A1 (c02, đang chạy) | C5, C6, C3 | Với một việc dài, người học (a) đặt điểm dừng và phép kiểm đạt hay không đạt trước khi chạy, (b) khi tình huống đổi giữa chừng, chọn cách can thiệp và nêu thứ mang sang, (c) soạn gói bàn giao có bằng chứng, rủi ro còn lại và phần người phải duyệt |

**Vì sao không chọn theo thứ tự menu.** P2 lấy nội dung từ Nâng cao, P3 dùng chương duy nhất đang chạy. P1 trùng với hai phần đầu vì 01 là phần duy nhất đã viết đủ và C1 là điều kiện của mọi năng lực còn lại, không vì nó đứng trước.

**Khác với giả thuyết ở `21` §8.**
- Module A của `21` (mental model: phân biệt prompting, delegation, workflow) không thành module riêng. Lý do: lộ trình chính không dạy phép phân biệt đó (§3.1, hàng 00), và một module chỉ có khái niệm sẽ chỉ cho ra bằng chứng mức Understand. Nó thành câu hỏi mở đầu của P1.
- Module B của `21` gộp context với tools và permissions. Ở đây context đi với framing (P1), vì kịch bản dạy hai thứ đó cùng nhau, còn permissions đứng riêng (P2), vì đó là kiểu học khác và là chỗ hở lớn nhất.

### 5.3 Phiếu đề xuất

| Mục | Nội dung |
|---|---|
| Vấn đề | Chưa có đơn vị nội dung nào được nối trọn chuỗi năng lực → outcome → hoạt động → bằng chứng → bài đánh giá |
| Căn cứ | `[Quan sát]` §3.1 · `[Design decision]` `21` §2 (lát cắt dọc đại diện) |
| Tác động mong đợi | Biết được chuỗi nào đứng vững trước khi viết tiếp 4 phần còn lại và 13 bài Nhập môn |
| Chi phí và đánh đổi | P2 cần nội dung chưa nằm trong lộ trình chính đã duyệt (xem Q1). Ba module không đại diện cho Nhập môn |
| Cách thử | Council chấm chuỗi của từng module theo `review-protocol.md` §10; sau đó thử với 5–8 người học (§8) |
| Điều làm tôi đổi ý | Council chỉ ra một kiểu học quan trọng bị bỏ sót; hoặc người học thử cho thấy P1 và P3 không tách được khi chấm |

## 6. Bài đánh giá và thang chấm

### 6.1 Nguyên tắc thiết kế

1. **Tình huống nằm ngoài mọi ví dụ của bài học.** `[Quan sát]` Đã tránh: câu chuyện studio và mười kính (`14` §4), sáu nhóm việc ở trang chủ (`work-types.ts`), báo cáo thị trường hằng tuần của v3 (`chapters.json`), và ví dụ mẫu ở `21` §5.
2. **Không cần biết cú pháp của công cụ nào.** Người học trả lời bằng lời thường, để tách chất lượng quyết định khỏi độ quen tay với Claude Code (`21` §5, safeguard cuối).
3. **Lĩnh vực là việc văn phòng ai cũng hình dung được,** để giảm lợi thế của người có chuyên môn riêng.
4. **Đây là near transfer đến mức vừa:** nguyên lý giữ nguyên, lĩnh vực và bề mặt bài toán đổi, không có khuôn. Chưa phải far transfer (`21` §9, Gate 4).

`[Product hypothesis]` Ba bài dưới đây là bản nháp đầu. Chưa có bài nào được thử với người học, và chưa có ví dụ neo cho từng mức.

### 6.2 Cách tách "làm được khi có gợi ý" khỏi "tự làm được"

Mức 2 (Guided) ở `21` §4 được định nghĩa bằng *điều kiện làm bài*, không bằng sản phẩm. Chỉ nhìn artifact thì không phân biệt được với mức 3. Đề xuất hai cơ chế, dùng cùng nhau:

- **Thang gợi ý chuẩn hoá.** Bài được giao không kèm khuôn. Khi người học xin trợ giúp hoặc đứng yên quá thời gian quy định, người điều phối đưa lần lượt: **G1** nhắc tên nguyên lý liên quan · **G2** đưa khuôn hoặc prompt của bài học. Ghi lại gợi ý đã dùng cho từng tiêu chí. Đã dùng G2 thì tiêu chí đó không vượt mức 2.
- **Dấu hiệu trên artifact.** Mức 2 là khi câu trả lời lặp lại cấu trúc hay câu chữ của bài học mà không gắn với dữ kiện của tình huống. Ví dụ: viết "làm một blind spot pass" nhưng danh sách điều chưa biết đúng với mọi việc.

### 6.3 Định nghĩa chung của bốn mức

| Mức | Tên (`21` §4) | Dấu hiệu chung |
|---|---|---|
| 1 | Fragmented | Hiểu sai bài toán, hoặc các quyết định rời nhau và trái nhau |
| 2 | Guided | Đúng hướng khi có G2, hoặc lặp lại khuôn của bài học mà không khớp với dữ kiện |
| 3 | Independent | Không dùng G2. Lời giải nhất quán, bám dữ kiện của tình huống, bảo vệ được từng lựa chọn |
| 4 | Adaptive | Đạt mức 3, và xử lý được ràng buộc chỏi nhau, ngoại lệ hoặc điều kiện đổi; nêu được đánh đổi và điều mình chưa chắc |

Chấm **từng tiêu chí**, không cộng trung bình thành một điểm. Ngưỡng đạt chưa đặt: `21` §10 yêu cầu có số liệu nền trước.

### 6.4 Bài P1 · Đón sáu người mới

**Tình huống.** Bạn phụ trách hành chính ở một công ty 40 người. Giám đốc nhắn: "Tháng sau có sáu người vào. Lần trước đón người mới lộn xộn quá, em lo lại chuyện này nhé." Bạn định giao phần lớn việc này cho một agent AI. Trong thư mục chung có chín tài liệu: checklist đón người mới từ hai năm trước · sổ tay nhân viên bản mới nhất · bảng lương của sáu người mới · sơ đồ tổ chức đã cũ một quý · ba email phàn nàn của đợt trước · lịch phòng họp tháng sau · mẫu hợp đồng thử việc · danh sách thiết bị còn trong kho · slide giới thiệu công ty của phòng marketing.

**Yêu cầu.** Trong 25 phút, viết ra:
1. những điều bạn chưa biết, xếp theo mức làm đổi cách làm, và với mỗi điều: bạn sẽ tìm ra bằng cách nào;
2. bản brief sẽ gửi cho agent, tối đa tám dòng;
3. trong chín tài liệu, cái nào đưa, cái nào không, vì sao; và một thứ không có trong thư mục mà bạn sẽ đi kiếm thêm.

**Thứ bài này cố ý gài.** Yêu cầu không nói "xong" là gì. Hai tài liệu đã cũ. Một tài liệu nhạy cảm và không cần cho việc này. Ba email phàn nàn là tham chiếu tốt nhất về "thế nào là lộn xộn" nhưng dễ bị bỏ qua.

| Tiêu chí | 1 · Fragmented | 2 · Guided | 3 · Independent | 4 · Adaptive |
|---|---|---|---|---|
| **Tìm điều chưa biết** (C1) | Không nêu, hoặc bắt tay viết brief ngay | Danh sách chung chung, đúng với mọi việc; hoặc chỉ có sau G2 | Điều chưa biết gắn với tình huống (sáu người vào cùng ngày hay rải ra? "lộn xộn" là gì?), mỗi điều có cách tìm hợp lý | Phân biệt điều phải hỏi giám đốc với điều để agent phỏng vấn mình; nêu điều mình không biết là mình chưa biết và cách dò ra |
| **Định nghĩa "xong"** (C1) | Không có, hoặc là "làm cho tốt" | Có, nhưng không kiểm được ("đón chu đáo") | Kiểm được đạt hay không đạt, gắn với kết quả giám đốc cần | Nêu thêm phần nào chưa định nghĩa được lúc này và ai chốt |
| **Brief** (C1, C2) | Danh sách bước phải làm theo | Đúng khuôn ba phần nhưng phần "điều Claude không tự thấy" bỏ trống hoặc chép từ bài | Nói kết quả, điều chỉ mình biết, thế nào là xong; để phần cách làm cho agent | Thêm chỗ agent phải dừng lại hỏi, và lý do |
| **Gói context** (C2) | Đưa cả chín, hoặc không nêu lý do | Chọn đúng một phần, lý do là "cho chắc" hoặc "cho gọn" | Loại bảng lương và có lý do; nhận ra tài liệu cũ; dùng email phàn nàn làm tham chiếu | Nêu cách xử lý tài liệu cũ (đưa kèm ghi chú hay bỏ), và thứ còn thiếu đáng đi kiếm |

### 6.5 Bài P2 · Agent dọn tủ hợp đồng

**Tình huống.** Nhóm pháp chế ba người có một thư mục dùng chung chứa khoảng 600 hợp đồng, tên file lộn xộn, nhiều bản trùng. Nhóm muốn một agent (a) đặt lại tên và xếp vào thư mục theo đối tác, (b) cập nhật bảng theo dõi ngày hết hạn, (c) nhắc đối tác gia hạn trước 30 ngày. Một đồng nghiệp đã soạn sẵn cấu hình: agent được **toàn quyền** với thư mục chung của cả công ty, đọc và gửi email từ hộp thư của nhóm, sửa bảng theo dõi, tạo sự kiện lịch, tra web, đăng vào kênh chat của nhóm.

**Yêu cầu.** Trong 20 phút:
1. với từng khả năng trong cấu hình, chọn *cho phép*, *hỏi trước mỗi lần* hoặc *chặn*, kèm một dòng lý do;
2. chỉ ra chỗ cấu hình cấp thừa và bạn sẽ thu hẹp thế nào;
3. nêu hai điều bạn sẽ không ghi vào lời dặn mà đặt thành rào chắn, và vì sao;
4. nêu điều gì sẽ làm agent dừng lại.

**Thứ bài này cố ý gài.** Phạm vi thư mục rộng hơn việc cần. Xoá bản trùng không hoàn tác được và không nằm trong yêu cầu nhưng agent sẽ muốn làm. Gửi email cho đối tác là hành động ra ngoài. Tra web không cần cho việc này. Đọc cả hộp thư rộng hơn mức cần.

| Tiêu chí | 1 · Fragmented | 2 · Guided | 3 · Independent | 4 · Adaptive |
|---|---|---|---|---|
| **Xếp theo rủi ro** (C4) | Cho phép hết hoặc chặn hết; không có lý do | Xếp đúng những ca giống ví dụ trong bài (gửi email), sai ở ca khác | Lý do dựa trên hoàn tác được hay không và có ra ngoài hay không, áp dụng nhất quán | Nêu ca lưng chừng và cách xử lý (ví dụ: đổi tên thì cho phép nhưng giữ sổ ghi để đảo lại) |
| **Cắt quyền thừa** (C4) | Không thấy chỗ thừa | Thấy một chỗ sau G1 hoặc G2 | Thu hẹp thư mục về đúng tủ hợp đồng; bỏ tra web; thu hẹp hộp thư | Chỉ ra quyền thừa nào nguy hiểm nhất và vì sao; đề xuất bắt đầu hẹp rồi nới theo tín hiệu |
| **Rào chắn hay lời dặn** (C4) | Dồn mọi thứ vào lời dặn, viết in hoa | Nhắc lại "luật không được sai thì là quyền hoặc hook" nhưng không áp vào ca cụ thể | Đặt đúng hai rào chắn (không xoá; email chỉ soạn nháp), giải thích vì sao lời dặn không đủ | Nêu cái giá của rào chắn (agent bị chặn giữa chừng) và cách giảm |
| **Điểm dừng** (C3) | Không có | Có điểm dừng chung chung ("khi có vấn đề") | Điểm dừng gắn với sự kiện cụ thể: hai bản hợp đồng chỏi nhau, không đọc được ngày hết hạn | Phân biệt chỗ agent tự quyết rồi ghi lại với chỗ phải hỏi |

**Giới hạn đã biết.** Ca gửi email gần với ví dụ của bài (c06 b1, Diagnostic K3), nên riêng ca đó là luyện tập, không phải Transfer. Bốn ca còn lại thì mới.

### 6.6 Bài P3 · Bản dịch bốn mươi trang

Bài chia hai lượt. Lượt hai chỉ phát sau khi đã thu lượt một.

**Lượt một (15 phút).** Công ty bạn cần chuyển bộ hướng dẫn sử dụng 40 trang từ tiếng Anh sang tiếng Việt, có bảng thuật ngữ 120 mục do nhóm sản phẩm soạn. Bạn giao cho một agent và sẽ vắng mặt phần lớn thời gian. Viết ra: việc được chia thế nào và theo thứ tự nào · agent dừng lại hỏi ở đâu · phép kiểm đạt hay không đạt nào agent tự chạy được · bạn sẽ xem gì ở phút đầu.

**Lượt hai (20 phút).** Hai tiếng sau bạn quay lại. Agent báo: "Xong 40/40, mọi thứ ổn." Ghi chú của nó có một dòng: ở trang 12 nó thấy bảng thuật ngữ trái với cách gọi trên website đang chạy, đã tự chọn theo website, và đã quay lại sửa 11 trang trước cho thống nhất. Viết ra: bạn làm gì tiếp, theo thứ tự · bạn giữ gì và bỏ gì từ phiên này · bạn gửi gì cho trưởng nhóm tài liệu, người sẽ ký duyệt bản dịch.

**Thứ bài này cố ý gài.** Việc không có bộ test sẵn, nên người học phải tự nghĩ ra phép kiểm cho việc không phải code. Agent đã tự quyết một việc đổi kết quả cuối mà không hỏi. Lời báo "xong" không kèm bằng chứng. Quyết định chọn thuật ngữ không thuộc về người học.

| Tiêu chí | 1 · Fragmented | 2 · Guided | 3 · Independent | 4 · Adaptive |
|---|---|---|---|---|
| **Chia việc và điểm dừng** (C3) | Giao cả 40 trang một lượt, không điểm dừng | Chia theo trang, điểm dừng chép từ bài ("chỉ hỏi khi đổi kết quả cuối") mà không nói ở việc này là chỗ nào | Làm trọn một phần nhỏ trước để duyệt; điểm dừng gắn với thuật ngữ chỏi nhau | Lường trước chính loại xung đột ở lượt hai, hoặc nêu thứ tự để lỗi sớm thì rẻ |
| **Phép kiểm** (C6) | "Đọc lại cho kỹ" | Nêu phép kiểm của bài học không áp được ở đây (chạy test) | Ít nhất hai phép kiểm đạt hay không đạt cho việc dịch: thuật ngữ khớp bảng, không còn đoạn chưa dịch, số và đơn vị giữ nguyên | Thêm một người duyệt ở context mới, và nói rõ phép kiểm nào không bắt được loại lỗi nào |
| **Can thiệp khi lệch** (C5) | Tin lời báo, hoặc bỏ hết làm lại | Biết phải làm gì đó nhưng chọn theo luật thuộc lòng (`/clear`) mà không xét còn dùng được gì | Đòi bằng chứng trước; tách phần còn dùng được (29 trang sau) khỏi phần phải xem lại; nêu thứ mang sang phiên mới | Nhận ra gốc là brief thiếu luật về thuật ngữ, và sửa ở brief chứ không chỉ sửa kết quả |
| **Gói bàn giao** (C6) | Gửi bản dịch kèm "đã xong" | Liệt kê việc đã làm, không có rủi ro còn lại | Có bằng chứng kiểm, có mục rủi ro còn lại, nêu rõ quyết định về thuật ngữ đang chờ người có thẩm quyền | Đưa cho người duyệt hai phương án kèm cái giá của từng phương án |

### 6.7 Những gì thang chấm này chưa có

- **Ví dụ neo** cho từng ô. `21` §5 yêu cầu; cần bài làm thật hoặc bài làm giả định được Council soát.
- **Độ thống nhất giữa hai người chấm.** Chưa đo.
- **Bài thứ hai cho mỗi module.** `21` §5: không kết luận rộng từ một bài.
- **Bài sau một khoảng thời gian** để xem năng lực có còn.
- **Thời lượng** 15–25 phút là ước lượng, chưa thử.

## 7. Gói gửi AI Council (bản nháp commissioning brief)

Theo `review-protocol.md` §1. Trạng thái: **Planned**. Thư mục review có ngày chỉ tạo khi chủ dự án giao review (`independent-evaluation-council/README.md`, mục *Suggested structure*).

| Mục | Nội dung |
|---|---|
| Phiên bản | `main` tại `49a210e` cùng tài liệu này |
| Mục đích | Chấm chất lượng chuỗi năng lực → outcome → hoạt động → bằng chứng → bài đánh giá → thang chấm, trước khi viết tiếp nội dung hay dựng UI |
| Quyết định mà review phục vụ | Q1–Q4 ở §9; có sửa mô hình sáu năng lực hay không; ba bài ở §6 có đủ tốt để đem thử với người học không |
| Người học giả định | `01-PRD.md` §3: người đã dùng Claude cho việc nhiều bước. `21` ghi phân khúc là giả thuyết |
| Trong phạm vi | `21` §4, §5, §8 · `14` §3, §6.0–§6.4, §8 · `site/src/content/chapters.json` · tài liệu này §3–§6 |
| Ngoài phạm vi | Typography, chuyển động, ASCII art, hiệu năng, accessibility của site đang chạy; nội dung Nhập môn; Library |
| Lăng kính | Learning / instructional design (chính) · Agentic AI / technical practice (cho §6.5, §6.6) · Content / research integrity (cho các nhãn ở §4) |
| Môi trường | Chỉ đọc repo. Không có người học, không có thiết bị thật |
| Xung đột cần công bố | ChatGPT đã góp phần viết `21` và đề xuất sáu năng lực (`review-protocol.md` §6). Claude viết tài liệu này, và kịch bản `14` cũng do các phiên Claude trước viết (D13), nên có thiên kiến bênh kịch bản v4 |
| Sản phẩm cần nộp | Báo cáo theo `review-protocol.md` §7, điểm 1–4 theo §5, mỗi điểm kèm quan sát và vị trí |

### 7.1 Câu hỏi cho Council

1. **Mô hình năng lực.** C3 không có chương nhận và cắt ngang ba chặng (§3.3). Nên giữ sáu năng lực, hay đổi sang cấu trúc theo vòng đời? Chọn model và effort có cần một chỗ không?
2. **Tên gọi.** "Handoff" hai nghĩa (§3.3): đổi tên ở phía nào?
3. **Tính mới của bài.** Ba tình huống ở §6 có thật sự nằm ngoài ví dụ của bài học không? Hãy đối chiếu với `14` §4, §6.1 khối 6 và `work-types.ts`, đừng tin §6.1 của tài liệu này.
4. **Mức 2 và mức 3.** Cơ chế ở §6.2 có tách được hai mức không, hay chỉ đo việc người học có dám xin trợ giúp?
5. **Tính hợp lệ.** Mỗi tiêu chí có đo đúng năng lực nó ghi không? Chỗ nào đang đo kiến thức về lĩnh vực (nhân sự, pháp chế, dịch thuật) thay cho năng lực giao việc?
6. **Các điểm gài** ở mỗi bài: có công bằng với người chỉ học lộ trình chính không? P2 đòi kiến thức mà lộ trình chính mới nhắc hai dòng.
7. **Nhãn bằng chứng.** Có chỗ nào ở §4 tôi gắn nhãn mạnh hơn mức căn cứ cho phép?
8. **Thứ bị bỏ sót.** Có kiểu học hay năng lực nào quan trọng với lời hứa của sản phẩm mà lát cắt ba module không chạm tới?

### 7.2 Điều chưa chắc, nói trước

- Bản đồ ở §3 đọc từ kịch bản, không từ trải nghiệm đã dựng (trừ c02 và trang chủ).
- Cột "Mức" ở §3.1 là phán đoán của tôi về mức *tối đa hoạt động cho phép*. Chưa có dữ liệu người học nào.
- Tôi không mở được bảng GoatCounter, nên không biết các sự kiện ở c02 đang cho số nào.
- Các nguồn S1–S14 ở `14` §10 không được mở lại trong phiên này. Tôi không kiểm lại khẳng định kỹ thuật nào.
- Hai dẫn chiếu nghiên cứu (Dunlosky 2013; worked example và giảm dần khuôn đỡ) viết từ trí nhớ, chưa đối chiếu lại.

### 7.3 Việc cần người thật, Council không thay được

| Câu hỏi | Cần ai |
|---|---|
| Thang chấm có cho điểm ổn định giữa hai người chấm không | Hai người chấm độc lập trên bài làm thật |
| Bài đánh giá có hợp lệ về đo lường không | Người có chuyên môn đánh giá giáo dục hoặc đo lường |
| Tình huống P2 có đúng thực tế vận hành và pháp lý không | Người làm pháp chế hoặc quản trị hệ thống |
| Người học có thật sự chuyển giao được không | Người học thuộc nhóm đích, làm bài không có khuôn |
| Mười kính giúp hay cản Transfer | Thử có so sánh với người học thật |

## 8. Kế hoạch theo giai đoạn

| Giai đoạn | Việc | Sản phẩm | Cổng ra | Trạng thái |
|---|---|---|---|---|
| **0 · Duyệt** | Chủ dự án trả lời Q1–Q4 (§9) và duyệt lát cắt | Quyết định ghi vào `08` | Có câu trả lời | **Chờ chủ dự án** |
| **1 · AI Council (Gate 1)** | Giao review theo §7 | Báo cáo Council; phản hồi của chủ dự án để riêng | Không còn phát hiện Critical hay Major chưa có quyết định | `[Design decision]` `21` §2, §9 |
| **2 · Sửa và làm bộ thử** | Sửa mô hình, outcome, bài và thang chấm theo review. Viết ví dụ neo. Viết bài thứ hai cho mỗi module | Bộ thử: đề, thang gợi ý, phiếu chấm | Hai người chấm thử cùng một bài giả định và nói rõ chỗ lệch | `[Product hypothesis]` |
| **3 · Thử với người học (Gate 2–3)** | 5–8 người đọc nội dung P1–P3 rồi làm bài | Ghi chép quan sát; điểm theo tiêu chí; gợi ý đã dùng | Có số liệu nền cho từng tiêu chí | `[Product hypothesis]` Hình thức tuỳ Q2 và Q4 |
| **4 · Transfer và nhớ lâu (Gate 4)** | Bài thứ hai, tình huống xa hơn; làm lại sau 1–2 tuần | Điểm theo tiêu chí, so với giai đoạn 3 | Chủ dự án và Council đặt ngưỡng đầu tiên (`21` §10) | Câu hỏi mở: tuyển người và giữ người qua hai lần |
| **5 · Quyết định về sản phẩm** | Từ dữ liệu: dựng mô phỏng nào, mở rộng Glossary thế nào, kính giữ bao nhiêu | Cập nhật `14`, `18`, `19` | — | Câu hỏi mở; `21` §15 dặn không mở rộng trước khi có căn cứ |

**Việc không nằm trong kế hoạch này:** đưa v4 lên site (`17`), kaizen UI/UX (`19`). Hai việc đó chạy theo kế hoạch riêng. Điểm giao nhau duy nhất là Q1, vì nó có thể đổi chữ của 02 hoặc 04.

## 9. Bốn quyết định cần chủ dự án duyệt

### Q1 · Tool & Permission Design nằm ở đâu

| Phương án | Được | Mất |
|---|---|---|
| **a. Giữ ở Nâng cao A6** | Lộ trình chính vẫn 25 phút, không đổi kịch bản đã duyệt | Lời hứa Transfer phải ghi rõ là *không gồm C4*. Người học xong lộ trình chính được khuyến khích "buông" mà chưa học cách chặn việc không hoàn tác được |
| **b. Thêm một khối ngắn vào 04, quanh câu hỏi 3–5** *(đề xuất)* | C4 có mặt đúng lúc người học sắp cho agent chạy một mình. Khoảng 3–4 phút | Đổi kịch bản đã duyệt, cần duyệt chữ theo D13. Phần 04 đã dài nhất (6 phút) |
| **c. Thêm phần thứ sáu** | C4 và C3 có chỗ riêng | Phá cấu trúc Trước, Trong, Sau và bộ đếm `/ 05`; chi phí viết và dựng lớn nhất |

Căn cứ: §3.2. Điều làm tôi đổi ý: Council hoặc người học thử cho thấy người học lộ trình chính vẫn làm tốt bài P2.

### Q2 · Thu bằng chứng Transfer bằng cách nào

`[Quan sát]` PRD ghi non-goal: không tài khoản, không backend (`01-PRD.md` §2). Site không thu được bài làm.

| Phương án | Được | Mất |
|---|---|---|
| **a. Thử ngoài site, có người điều phối, hai người chấm** *(đề xuất cho giai đoạn 3–4)* | Không đổi sản phẩm. Bằng chứng hợp lệ nhất hiện có thể có | Mẫu nhỏ, tốn công, không lặp lại tự động |
| **b. Tự chấm trong site theo thang chấm, lưu trong trình duyệt** | Mọi người học đều gặp bài; đúng kiến trúc hiện tại | Tự chấm không đủ làm bằng chứng cho North Star. Là tính năng học, không phải phép đo |
| **c. Nộp bài, chấm bằng AI** | Mở rộng được | Cần backend, đi ngược non-goal; có dữ liệu cá nhân; chấm bằng AI chưa được kiểm |

Đề xuất làm (a) trước; (b) chỉ xét sau khi thang chấm đã ổn; (c) để sau.

### Q3 · Thay thước đo G1 và G2 của PRD

| Phương án | Được | Mất |
|---|---|---|
| **a. Thay G1, G2 bằng điểm theo tiêu chí trên bài tình huống mới** *(đề xuất)* | Thước đo khớp với North Star đã duyệt | Chưa có số trong sản phẩm cho tới khi thử xong. Phải sửa PRD |
| **b. Đưa Diagnostic và Re-test trở lại v4** | Có số tự động, sớm | Đảo D30. Sáu câu trắc nghiệm chỉ đo nhận diện (`21` §5) |
| **c. Giữ nguyên chữ trong PRD** | Không tốn gì | PRD ghi một thước đo không còn chỗ thu |

### Q4 · Thử với ai và trên bản nào

| Phương án | Được | Mất |
|---|---|---|
| **a. Người đã dùng Claude cho việc nhiều bước (PRD §3), đọc bản chữ trơn của 00–04** *(đề xuất)* | Thử được nội dung trước khi đầu tư dựng. Tách tác động của chữ khỏi tác động của hình và chuyển động | Phải viết xong chữ 00, 02, 03, 04 trước. Không nói được gì về ASCII và chuyển động |
| **b. Chờ v4 lên site rồi thử trên site** | Thử đúng trải nghiệm thật | Phát hiện về nội dung đến muộn, lúc sửa đã đắt |
| **c. Thử với người của Nhập môn (D47)** | Đúng nhóm chủ dự án thấy đông | Nhập môn chưa viết; ba bài ở §6 quá sức với nhóm này |

## 10. Rà điểm mù

**Chưa xem:**
- `02` (ngoài §0.3, §0.8, phụ lục), `03`, `04`, `05`, `09`, `10`, `11`, `13`, `15`. Vì thế chưa đối chiếu luật về điểm dừng, mascot và hiệu ứng với chức năng học.
- Site đã deploy trên trình duyệt. Mọi quan sát về L1 đọc từ mã nguồn.
- Báo cáo gốc trong repo `independance-evaluation-council`; chỉ đọc bản tóm tắt `12`.
- `research/`, `design-system/`, các bộ kiểm trong `site/scripts/`.
- Số liệu GoatCounter.

**Còn chưa chắc:**
- Việc ánh xạ một beat sang một năng lực có chỗ là phán đoán. Người khác có thể xếp 02 nặng về C2 hơn C1.
- Ba tình huống ở §6 được chọn để tránh ví dụ của bài học, nhưng các ví dụ đó cũng do Claude viết ở `14` (D13), nên tôi có thể không thấy chỗ trùng tinh vi.
- Thời lượng làm bài và độ khó chưa thử với ai.
- Chưa rõ phân khúc người học nào là chính: `01-PRD.md` §3, `21` (đầu tài liệu) và `18` (D47) tả ba nhóm khác nhau.

**Bằng chứng còn thiếu:**
- Bất kỳ dữ liệu nào từ người học.
- Ví dụ neo và độ thống nhất giữa người chấm.
- Căn cứ rằng kính, ASCII hay chuyển động làm tăng hoặc giảm Transfer ở sản phẩm này.
- Xác nhận rằng sáu năng lực là đúng và đủ.
