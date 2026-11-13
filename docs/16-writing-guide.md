# 16 · Văn phong tiếng Việt và tiếng Anh (08/11/2026)

> Ai viết chữ cho site, dù là người hay agent, đọc file này **trước khi viết câu đầu tiên**. Mục tiêu: chữ trên trang nghe như một đồng nghiệp người Việt đi trước đang nói với bạn. Không như bản dịch, không như chữ máy viết. Mỗi luật đều có ví dụ *trước → sau*. Phần mẫu để đối chiếu là phần 01 trong `14-content-script-v4.md` §6.1.

## 1. Người đọc và giọng

- **Người đọc:** người đi làm, đã dùng Claude, thuộc đủ vai (dev, BA, designer, marketing, sales, quản lý, người làm sáng tạo). Họ thông minh, bận, không cần được dỗ dành, cũng không cần được khen.
- **Xưng hô:** gọi người đọc là "bạn". Người kể không xưng: không "tôi", không "mình", không "chúng ta". Mascot cũng gọi người đọc là "bạn" và tự xưng "mình". **Ngoại lệ có phạm vi:** trong mục Bài viết (D62), tác giả xưng "tôi" khi nêu quan điểm hay trải nghiệm của mình; người đọc vẫn là "bạn", vẫn không "mình" hay "chúng ta", và mascot không xuất hiện.
- **Giọng:** thẳng và thực dụng. Có chút tinh nghịch ở tiêu đề và câu hook ("sao bạn vẫn phải trông trẻ?"). Thân bài thì nghiêm túc và có nguồn. Không cường điệu, không doạ, không tâng bốc.
- **Ý chính đi trước** (Minto [P5], kim tự tháp ngược [P3]): câu đầu của đoạn nói ý chính, các câu sau đưa lý do hoặc ví dụ. Người chỉ đọc câu đầu của mỗi đoạn vẫn phải nắm được bài.

## 2. Hư từ: nhóm lỗi nhiều nhất

Động từ tiếng Việt không chia. Thời gian, việc đã xong hay chưa, mức độ, phạm vi đều nằm ở hư từ. Thiếu hư từ, câu vẫn đúng ngữ pháp nhưng trơ như bản dịch máy. Thừa hư từ, câu nặng và lặp. **Luật:** đặt hư từ khi nó mang một nghĩa mà người đọc cần (mốc thời gian, xong hay chưa, mạnh hay nhẹ, có ngoại lệ không). Bỏ khi ngữ cảnh đã nói rõ.

### 2.1 Thời và thể: *đã, đang, sẽ, vừa, mới, sắp, rồi, xong, chưa, từng*

- *Đang, đã, sẽ* chỉ có nghĩa khi có **một điểm mốc** để quy chiếu. Ngược lại, hễ dùng chúng là người đọc đi tìm điểm mốc (Huỳnh Thanh Triều, Tạp chí Khoa học ĐHSP TP.HCM, số 9/2006, dẫn Cao Xuân Hạo [V1]). Mốc mặc định của site là *lúc người đọc đang đọc*. Sự kiện có ngày thì ghi ngày, để chữ không sai theo thời gian:
  - ✗ *Anthropic vừa xoá 80% chỉ dẫn hệ thống.* (vài tháng sau, "vừa" thành sai)
  - ✓ *Tháng 7/2026, Anthropic cho biết đã xoá hơn 80% chỉ dẫn hệ thống của Claude Code.* (bài đăng tháng 7; ngày xoá thì bài không nói, nên viết “cho biết đã”)
- *Đã … rồi*, *xong rồi*: nhấn rằng việc đã xong. Lời nói tự nhiên hay dùng:
  - ✗ *Claude chạy test. Bạn đọc kết quả.*
  - ✓ *Claude chạy test rồi, bạn chỉ cần đọc kết quả.*
- *Chưa* trong câu hỏi, khi hỏi về việc có thể đã xảy ra:
  - ✗ *Bạn có nói thế nào là xong không?*
  - ✓ *Bạn đã nói thế nào là xong chưa?*
- *Vừa, mới*: chỉ dùng cho việc thật sự vừa xảy ra trong mạch kể (*Claude vừa sửa hỏng lần thứ hai*).
- *Từng* cho kinh nghiệm: *Nếu bạn chưa từng tích hợp cổng thanh toán…*
- *Sẽ* không cần có mặt ở cả hai vế của câu điều kiện:
  - ✗ *Nếu bạn sẽ đưa phép kiểm, Claude sẽ tự chạy lại.*
  - ✓ *Có phép kiểm thì Claude tự chạy lại.*
- **Trình tự** thường cần *rồi*, *mới*, *trước khi*, *sau khi*:
  - ✗ *Làm rõ, giao.*
  - ✓ *Làm rõ xong rồi mới giao.*

### 2.2 *Bị* và *được*: sắc thái, và ai làm

- *Bị* dùng cho điều bất lợi (*file bị xoá*). *Được* dùng cho điều có lợi hoặc trung tính (*lời dặn thừa được bỏ*). Dùng ngược là sai sắc thái:
  - ✗ *Phép kiểm bị chạy mỗi lần.*
  - ✓ *Phép kiểm chạy mỗi lần.*
- Lỗi lớn nhất của chữ dịch là bê nguyên câu bị động của tiếng Anh sang. Tiếng Việt chuộng câu chủ động, có người làm rõ ràng:
  - ✗ *Bản đặc tả được viết bởi Claude.*
  - ✓ *Claude viết bản đặc tả.*
- *Được* đặt sau động từ thì có nghĩa là *có thể*: *Claude đọc được file HTML*. Đừng nhầm với bị động.
- **Luôn rõ ai làm.** Site có ba chủ thể, và không được lẫn:
  - **bạn**;
  - **Claude**, tức model, người làm việc;
  - **Claude Code**, tức phần mềm bao quanh model (*harness*).

  Ví dụ: *Claude chạy phép kiểm* (Claude quyết), nhưng *Claude Code chặn lệnh* (hook là phần mềm ép, Claude không quyết được).
  - ✗ *Lệnh nguy hiểm sẽ được chặn.*
  - ✓ *Hook của Claude Code chặn lệnh đó, dù Claude có muốn chạy.*

### 2.3 Mức độ: *rất, khá, hơi, quá, lắm, cực*

- Chỉ dùng khi thật sự có so sánh. "Rất quan trọng" gần như không thêm nghĩa gì; thay bằng lý do.
  - ✗ *Phép kiểm rất quan trọng.*
  - ✓ *Không có phép kiểm thì bạn thành người kiểm thay Claude.*
- *Quá* trong site mang nghĩa *vượt mức*: *làm quá tay*, *dặn quá nhiều*.
- *Hơi* cho lời nhẹ, tự nhiên: *video trông hơi nhạt*.
- Không chồng hai từ mức độ: ✗ *rất cực kỳ*, ✗ *vô cùng rất*.

### 2.4 Phạm vi và số lượng: *cả, mọi, các, những, mỗi, từng, đều, chỉ, riêng*

- *Cả*: gồm luôn thứ người đọc có thể không ngờ tới. *Dùng được cả ở Cowork*; *kể cả việc kết quả có thể tốt tới mức nào*.
- *Mọi* hay đi với *đều*: *mọi khẳng định đều có nguồn*.
- *Các* chỉ toàn bộ một tập đã xác định; *những* chỉ một phần, hoặc khi liệt kê: *những điều bạn chưa nói*.
- *Mỗi* nhìn từng đơn vị như nhau; *từng* nhấn vào chuyện lần lượt: *phỏng vấn từng câu một*.
- *Chỉ* giới hạn rõ ràng, và rất hay bị rơi mất khi dịch "only":
  - ✗ *Dặn điều Claude không tự thấy.*
  - ✓ *Chỉ dặn điều Claude không tự thấy.*

### 2.5 Tiếp diễn, đối lập, nối: *vẫn, còn, cũng, lại, nữa, mà, chứ, thì, thôi*

- *Vẫn*: điều không đổi dù điều kiện thay đổi. *Model giỏi hơn, bạn vẫn phải duyệt những việc không hoàn tác được.*
- *Còn*: phần chưa hết. *Còn chỗ nào bạn phải đoán?*
- *Cũng*: giống điều nói trước đó. Đừng rải *cũng* vô cớ.
- *Lại*: lặp lại, hoặc ngược với mong đợi. *Dặn rồi mà nó lại làm quá tay.*
- *Thì*: nối điều kiện với kết quả trong văn nói. *Sửa hai lần vẫn sai thì `/clear`.*
- *Mà*: đối lập nhẹ, rất tự nhiên. *Brief đã rõ mà kết quả vẫn trật.*
- *Thôi*: dừng, hoặc giới hạn. *Thôi cầm tay chỉ việc*; *một câu thôi*.

### 2.6 Tiểu từ cuối câu: *nhé, nha, đấy, đâu, mà, à*

- Trong thân bài: hạn chế. Dùng cho prompt mẫu và lời mascot để nghe tự nhiên (*Bạn cứ nói ra nhé*).
- *Nha* mang sắc thái thân mật vùng Nam Bộ. Không dùng trong thân bài; mascot thỉnh thoảng dùng được.
- Không dùng *ạ*: quá kính cẩn so với giọng đồng nghiệp.

## 3. Đúng chữ, đúng sắc thái, đúng chủ thể

| Chữ | Dùng khi | Đừng nhầm với |
|---|---|---|
| **giao** (việc) | Trao cả trách nhiệm về kết quả | *dặn*: nói trước điều cần chú ý · *nhắc*: nói lại · *ra lệnh*: không dùng |
| **lời dặn** | *Instruction* trong prompt, CLAUDE.md, skill | *luật*: chỉ dùng khi nói về shift "Bớt luật" hoặc luật phải ép bằng quyền/hook |
| **phép kiểm** | *Check*: thứ chạy được, trả về đạt hay không đạt | *kiểm chứng*: đối chiếu với nguồn · *duyệt*: người có quyền đồng ý · *rà*: đọc để tìm lỗi |
| **xong** | *Done*, như trong "thế nào là xong" | *hoàn thành*: trang trọng hơn, ít dùng |
| **phán đoán** | *Judgement*: quyết khi đã có đủ context | *đoán*: khi thiếu context, Claude buộc phải đoán |
| **tham chiếu** | *Reference*: thứ thật để đối chiếu hoặc làm theo | *ví dụ*: thứ để bắt chước · *mẫu* (template): khung để điền |
| **khuôn** | *Interface*, theo diễn giải của site: các phần, trường, trạng thái của thứ cần giao | Lần đầu xuất hiện phải giải thích |
| **điều chưa biết** | *Unknowns* | *ẩn số*: nghe như toán |
| **rà điểm mù** | *Blind spot pass* (trong prompt thì giữ cụm gốc) | |
| **thang chấm** | *Rubric* | *tiêu chí*: chỉ là một dòng của thang chấm |
| **bản nháp** | *Prototype*, *mockup* | *bản demo*: hàm ý đã hoàn chỉnh |

- **Thuần Việt trước Hán Việt** khi hai từ cùng nghĩa: *dùng* thay *sử dụng*, *làm* thay *thực hiện*, *để* thay *nhằm*, *chắc* thay *đảm bảo* (trong lời nói thường), *cần* thay *yêu cầu phải*, *bắt đầu* thay *khởi tạo*.
- **Mỗi câu một chủ thể rõ**, nhất là câu nói về hành động:
  - ✗ *Cần phải kiểm tra kết quả.*
  - ✓ *Bạn kiểm kết quả.* hoặc *Claude chạy phép kiểm.*
- **Đại từ "nó"** chỉ Claude, khi chủ thể đã rõ. Trong cùng một đoạn, đừng để "nó" lúc là Claude, lúc là file, lúc là skill. Gọi tên thay vào.

## 4. Dấu hiệu của chữ máy viết, và cách sửa

| Dấu hiệu | Ví dụ ✗ | Sửa ✓ |
|---|---|---|
| Mở bài sáo rỗng | *Trong thời đại AI bùng nổ…* · *Hãy cùng khám phá…* · *Bạn có bao giờ tự hỏi…* | Vào thẳng ý hoặc vào thẳng câu hỏi hook |
| "Không chỉ… mà còn…" | *Claude không chỉ viết mà còn kiểm.* | *Claude viết, rồi tự kiểm.* |
| Bộ ba tính từ | *nhanh chóng, hiệu quả và tiện lợi* | Một ý, kèm bằng chứng |
| Danh từ hoá | *việc thực hiện việc kiểm tra* | *kiểm* |
| "Một cách + tính từ" | *giao việc một cách hiệu quả* | *giao việc*, kèm cách cụ thể |
| Từ đệm Hán Việt | *đóng vai trò quan trọng*, *mang tính*, *tiến hành*, *nhằm mục đích*, *đảm bảo rằng*, *đáng chú ý là*, *điều này cho thấy* | Động từ thường; hoặc bỏ hẳn |
| Đoạn kết tóm tắt lại | *Tóm lại, …* · *Như vậy, có thể thấy…* | Bỏ. Câu chốt của mỗi phần đã có chỗ riêng |
| Gạch ngang dài chen giữa câu | *Claude — một agent đa năng — có thể…* | Dấu phẩy, dấu hai chấm, hoặc tách thành hai câu |
| Câu hỏi tu từ dồn dập | *Vì sao? Làm sao? Điều gì?* | Tối đa một câu hỏi, đặt ở hook |
| Khen người đọc | *Tuyệt vời!* · *Câu hỏi hay!* | Không |
| Thổi phồng | *thay đổi cuộc chơi*, *đột phá*, *mạnh mẽ* | Một con số hoặc một ví dụ |
| Viết hoa kiểu tiếng Anh | *Bốn Loại Điều Chưa Biết* | Chỉ viết hoa chữ đầu câu và tên riêng |
| Dịch nguyên thành ngữ tiếng Anh | *ở cuối ngày*, *mang lên bàn* | Bỏ, hoặc dùng cách nói của người Việt |
| Gạch đầu dòng cho mọi thứ | Năm gạch đầu dòng nối nhau bằng "vì" | Văn xuôi, khi các ý nối với nhau bằng lý do |
| "Bạn" ở mọi câu | *Bạn hãy… Bạn nên… Bạn sẽ…* | Câu mệnh lệnh không cần chủ ngữ: *Đưa thứ thật.* |
| Kết câu bằng "nhé" khắp nơi | *Hãy thử nhé. Đọc tiếp nhé.* | Chỉ dùng ở lời mascot và prompt mẫu |

**Phép thử đọc to.** Đọc to cả đoạn. Chỗ nào vấp, hoặc nghe như đang đọc văn bản hành chính, thì viết lại câu đó như đang nói với một đồng nghiệp ngồi bên cạnh.

## 5. Tiếng Anh trong bài tiếng Việt

- **Giữ nguyên tiếng Anh:**
  - tên sản phẩm và tính năng: Claude Code, Cowork, Claude app, plan mode, auto memory, skill, subagent, hook;
  - lệnh, tên file, nút trên giao diện: `CLAUDE.md`, `SPEC.md`, `/clear`, `/memory`, Esc;
  - vài từ dân làm nghề vẫn nói hằng ngày: prompt, context, agent, spec.
- **Việt hoá mọi thứ khác.** Khái niệm nào có từ Việt tự nhiên thì dùng từ Việt (bảng §3): điều chưa biết, rà điểm mù, tham chiếu, thang chấm, bản nháp, phỏng vấn.
- **Lần đầu xuất hiện trong mỗi phần**, thuật ngữ tiếng Anh in nghiêng, đánh `lang="en"`, kèm giải nghĩa ngắn. Ví dụ: *context* (mọi thứ Claude đang thấy trong phiên). Từ lần thứ hai trở đi thì viết chữ đứng.
- **Không chia, không ghép tiếng Anh.** Danh từ tiếng Anh đứng trong câu tiếng Việt như danh từ tiếng Việt:
  - ✓ *hai skill*, *mỗi subagent*;
  - ✗ *các skills*, *deploy cái app*, *prompting*.
- **Viết hoa đúng như nguồn:** *auto memory*, *plan mode* viết thường theo docs. Tên phần tiếng Anh viết hoa sẵn (`THE UNKNOWNS`), không dùng `text-transform`.
- **Trích nguyên văn:**
  - câu tiếng Anh đặt trong ngăn nguồn, nằm trong “ ”, chữ nghiêng (Newsreader);
  - thân bài dùng bản dịch tiếng Việt sát nghĩa;
  - không trích dài bằng tiếng Anh ngay trong thân bài.
- **Prompt mẫu viết bằng tiếng Việt**, nhưng giữ nguyên các cụm mà nguồn khuyên dùng nguyên văn: *blind spot pass*, *unknown unknowns*, *be ambitious*. Tên file cũng giữ nguyên.
- **Six shifts:** tên tiếng Việt làm tiêu đề (*Bớt luật, tin phán đoán*); tên gốc nhỏ ở dưới, giữ đúng chính tả của nguồn (*Give Claude rules → Let Claude use judgement*).

## 6. Câu, đoạn, nhịp, con số

- **Câu** trung bình 15–25 âm tiết; câu dài nhất ≤ 40 âm tiết. Mỗi câu một ý.
- **Đoạn** ≤ 4 câu; câu đầu là ý chính.
- **Tiêu đề khối** là một mệnh đề trọn ý (*Bản đồ không phải là lãnh thổ*) hoặc một câu hỏi thật. Không dùng nhãn chung chung như *Giới thiệu*, *Tổng quan*.
- **Danh sách** chỉ dùng khi các mục song song. Mỗi mục tối đa một dòng trên desktop.
- **Số:**
  - đếm thì viết bằng chữ số (*5 phần*, *4 hướng*); riêng "một" trong văn kể thì viết bằng chữ (*một phép kiểm*);
  - thập phân dùng dấu phẩy (0,6), hàng nghìn dùng dấu chấm (9.100);
  - phần trăm viết liền (80%);
  - ngày dd/mm/yyyy, giờ 08:00.
- **Dấu câu:** nháy cong “ ” ‘ ’; dấu ba chấm là một ký tự …; khoảng số dùng gạch nối ngắn – (4–5 phút). Không dùng nháy thẳng trong văn xuôi (`type-check` có luật `punctuation`).

## 7. Câu vui của mascot

- Mỗi phần 1–2 câu, ≤ 15 âm tiết, và **luôn đúng ý của đoạn**. Người đọc cười vì nhận ra điều đó, không phải vì một trò chơi chữ vô nghĩa.
- Tự trào về Claude. Không chế người đọc, không hạ thấp nghề nào.
- Không meme, không tiếng lóng dễ cũ, không emoji.
- Không nói điều sai sự thật về Claude: không "mình mệt", không "mình buồn".
- Đạt:
  - *Mình nghe rõ mà, không cần hét đâu.* (khi đoạn văn nói về lời dặn in hoa)
  - *Mình đọc nhanh thật, nhưng chưa đọc được suy nghĩ.*
  - *Xong rồi! …nhưng bạn đừng tin mình ngay nhé.*
- Không đạt:
  - *Haha, bạn đúng là sếp khó tính!* (chế người đọc)
  - *AI cũng biết mệt đó nha 😅* (sai sự thật, có emoji)

## 8. Kiểm trước khi gửi duyệt

- [ ] Câu đầu của mỗi đoạn là ý chính; đọc riêng các câu đầu vẫn hiểu bài.
- [ ] Mỗi câu nói về hành động có chủ thể rõ: bạn, Claude hay Claude Code.
- [ ] Sự kiện có ngày khi dùng *đã/vừa*; không có *vừa* cho chuyện đã cũ.
- [ ] Không còn chữ nào trong bảng §4.
- [ ] Thuật ngữ tiếng Anh lần đầu có in nghiêng và giải nghĩa; không có tiếng Anh bị chia hay ghép.
- [ ] Mọi con số và câu trích có nguồn; chỗ diễn giải có nhãn `Diễn giải của trang`.
- [ ] Đã đọc to một lượt và viết lại những chỗ vấp.
- [ ] Không quá 5 golden word mỗi phần; câu hook ≤ 30 âm tiết; câu chốt ≤ 40 âm tiết.
- [ ] `type-check.cjs` không còn cảnh báo `punctuation` trên trang mới.

## 9. Chữ trên giao diện: bài học từ các lần chủ dự án sửa (11/11/2026)

Nhãn, nút và tên tính năng là chữ ngắn nhất trên trang nên dễ sai nhất: người viết biết ngữ cảnh, người đọc thì không. Mỗi lần chủ dự án sửa một chữ, ghi lại ở đây thành luật để lần sau không lặp lại.

| Chữ đã bị sửa | Vì sao hỏng | Luật rút ra |
| --- | --- | --- |
| "Trước", "Trong", "Sau" đứng một mình | Thiếu vế sau nên tối nghĩa: trước cái gì? | Nhãn phải tự đứng được khi tách khỏi ngữ cảnh. Viết đủ cụm: "Trước khi chạy", "Trong lúc chạy", "Sau khi xong". |
| "Vào phần →" | Dịch từng chữ từ "Enter section"; người Việt không nói vậy | Nút viết theo điều người đọc nhận được hoặc lời mời tự nhiên: "Tìm hiểu ngay", "Vào ngó chút bạn mình nhỉ?". Câu vui chỉ dùng một lần trên một màn hình; chỗ lặp lại dùng câu gọn. |
| "Kính" | Từ tự đặt, dịch từ "lens", người đọc không đoán ra | Tên tính năng: nếu chữ Việt phải giải thích mới hiểu thì giữ chữ Anh quen tai ("Lens"), và không đặt tên gợi sai việc (ví dụ "Role-play" khi không có ai đóng vai). |
| Câu chốt hiện đều đều một màu | Người đọc không biết đâu là ý chính | Câu tóm tắt nào cũng đánh dấu 2 đến 3 cụm chủ chốt (class `nb-hl`, khai ở `HL` trong `parts.ts`); cụm sáng lên sau khi cả câu đã hiện. |
| Văn cụt, thiếu hư từ, giọng dịch | Xem §2 và §4 | Đọc to thành tiếng: nếu không ai nói câu đó với đồng nghiệp thì viết lại. |
| Thuật ngữ tiếng Anh để trần trong thân bài | Người không rành tiếng Anh bị bỏ lại | Lần đầu xuất hiện trong bài học, bài thực hành và hero: kèm nghĩa tiếng Việt trong ngoặc. Tên phần giữ nguyên. |
| Prompt mẫu chỉ đẹp văn | Người đọc sẽ chép và dùng thật | Prompt phải đúng cách làm được khuyên (kết quả cần có, thế nào là xong, ngữ cảnh chỉ người dùng biết), rồi mới tới văn phong. |

Trước khi gửi duyệt một nhãn hay một nút mới, hỏi ba câu: (1) tách khỏi trang, chữ này còn hiểu được không; (2) có ai nói câu này bằng miệng không; (3) chữ này hứa đúng điều sẽ xảy ra khi bấm không.

## Nguồn

- [V1] Huỳnh Thanh Triều, "Hình ảnh của thời gian trong ngôn ngữ", *Tạp chí Khoa học ĐHSP TP.HCM*, số 9/2006, tr. 71–. <https://journal.hcmue.edu.vn/index.php/hcmuejos/article/download/1272/1263/1273>
- [P3] Nielsen Norman Group, *Inverted Pyramid: Writing for Comprehension*. <https://www.nngroup.com/articles/inverted-pyramid/>
- [P5] Barbara Minto, *The Pyramid Principle: Logic in Writing and Thinking*.
- Luật dấu câu và vai chữ của chính dự án: `11-typography.md`, `design-system/SOURCE-OF-TRUTH.md`.
