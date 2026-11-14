# Vietnamese natural voice reference

> Tài liệu tham chiếu cho Claude khi viết và biên tập bài tiếng Việt trong editorial. Mục tiêu không phải bắt chước nguyên xi giọng của một người, mà là tạo văn xuôi tiếng Việt tự nhiên, có nhịp nói, rõ chủ thể và chính xác về ý.
>
> **Thứ tự ưu tiên:** tuân thủ `docs/16-writing-guide.md` và các quyết định biên tập đã được chủ dự án chốt trước. Tài liệu này bổ sung hướng dẫn về độ tự nhiên của tiếng Việt, đặc biệt là hư từ, cú pháp và nhịp câu; không ghi đè quy định về xưng hô, cấu trúc, thuật ngữ, mascot hay thiết kế. Nếu hai tài liệu có vẻ mâu thuẫn, giữ quy tắc của writing guide và dùng tài liệu này để cải thiện cách diễn đạt trong phạm vi cho phép.

## 1. Nguyên tắc cốt lõi

Viết như đang giải thích một vấn đề nghề nghiệp cho đồng nghiệp thông minh: thẳng, bình tĩnh, có chính kiến, không lên lớp và không cố tỏ ra sâu sắc.

- Viết tiếng Việt trước, đừng dựng câu tiếng Anh rồi dịch từng chữ.
- Nêu ý chính sớm. Sau đó mới giải thích vì sao, đưa ví dụ hoặc chỉ ra ngoại lệ.
- Ưu tiên động từ và chủ thể rõ ràng. Đừng biến hành động thành chuỗi danh từ trừu tượng.
- Dùng hư từ để thể hiện đúng thời, thể, quan hệ logic và sắc thái. Không lược sạch hư từ chỉ để câu ngắn.
- Mỗi câu phải làm một việc. Câu dài được phép nếu quan hệ giữa các vế rõ và đọc lên không vấp.
- Chỉ dùng thuật ngữ tiếng Anh khi đó là tên sản phẩm, tên tính năng hoặc từ chuyên môn mà người trong nghề thực sự dùng.

## 2. Hư từ: dùng đúng nghĩa, không dùng cho đủ câu

Hư từ là một phần của ngữ pháp tiếng Việt, không phải chữ trang trí. Khi biên tập, kiểm tra xem câu có đang thiếu mốc thời gian, trình tự, đối lập, giới hạn hoặc sắc thái không.

### Thời và thể

| Từ | Dùng khi | Ví dụ tự nhiên |
|---|---|---|
| đã | Sự việc xảy ra trước mốc đang nói hoặc đã hoàn tất | “Anthropic đã công bố thay đổi này vào tháng 7.” |
| đang | Sự việc diễn ra tại mốc đang nói | “Agent đang xử lý ticket.” |
| sẽ | Sự việc ở tương lai, có lý do để xác định là tương lai | “CI sẽ chạy lại các check khi có pull request.” |
| vừa | Sự việc mới xảy ra trong mạch kể | “Claude vừa sửa xong file đó.” Tránh dùng “vừa” cho tin cũ hoặc sự kiện không rõ ngày. |
| mới | Điều kiện hoặc trình tự cần đạt trước khi việc sau xảy ra | “Làm rõ tiêu chí nghiệm thu rồi mới giao việc.” |
| rồi | Việc trước đã xong, hoặc chuyển sang bước tiếp | “Claude chạy test rồi, giờ đọc kết quả.” |
| chưa | Hỏi hoặc khẳng định một việc vẫn chưa xảy ra/đạt tới | “Bạn đã kiểm tra nguồn gốc con số này chưa?” |
| từng | Kinh nghiệm hoặc sự việc đã có ít nhất một lần | “Nếu bạn từng vận hành workflow này…” |

Không nhồi “đã/sẽ/đang” vào mọi động từ. Chỉ dùng khi mốc thời gian hoặc trạng thái đó có ý nghĩa. Khi sự kiện có ngày cụ thể, ghi ngày thay vì dựa vào “vừa”, “mới đây”.

### Trình tự và điều kiện

Những từ như “rồi”, “mới”, “trước khi”, “sau khi”, “thì”, “nếu” giúp người đọc hiểu thứ tự và quan hệ giữa các bước.

- Cụt: “Làm rõ yêu cầu, giao cho agent.”
- Tự nhiên: “Làm rõ yêu cầu xong rồi mới giao cho agent.”
- Dịch máy: “Nếu bạn sẽ thêm phép kiểm, Claude sẽ chạy nó.”
- Tự nhiên: “Có phép kiểm thì Claude chạy được và đọc kết quả.”

### Đối lập và tiếp diễn

| Từ | Sắc thái | Ví dụ |
|---|---|---|
| vẫn | Điều không đổi dù có yếu tố khác | “Model mạnh hơn, bạn vẫn phải duyệt thao tác không thể hoàn tác.” |
| còn | Phần chưa hết hoặc vấn đề tiếp theo | “Còn một điểm cần kiểm tra: CI đang chạy trên môi trường nào?” |
| cũng | Bổ sung điều tương tự; chỉ dùng khi thật sự có quan hệ | “CI cũng cần chạy migration check.” |
| lại | Lặp lại hoặc trái với điều người đọc chờ đợi | “Đã có hướng dẫn mà agent lại sửa nhầm file.” |
| mà | Đối lập nhẹ, thường tự nhiên trong tiếng Việt | “Yêu cầu đã rõ mà kết quả vẫn sai.” |
| thì | Nối điều kiện với hệ quả, hoặc chuyển trọng tâm | “Nếu check thất bại thì chưa được merge.” |
| chỉ | Giới hạn phạm vi; rất dễ bị rơi khi dịch “only” | “Chỉ đưa vào prompt điều agent không thể tự tìm.” |
| cả/kể cả | Nhấn phạm vi bao gồm điều có thể bị bỏ sót | “Cách này áp dụng cả khi chạy trong CI.” |

### Tiểu từ cuối câu

“Nhé”, “nha”, “đấy”, “đâu”, “mà”, “à” làm thay đổi sắc thái câu. Dùng chúng khi đang nói trực tiếp, đưa lời nhắc nhẹ hoặc viết prompt mẫu. Không rải “nhé” vào cuối mọi câu trong bài phân tích.

- Tự nhiên trong lời nhắc: “Bạn kiểm tra lại nguồn này nhé.”
- Không phù hợp trong văn phân tích: “CI chạy trên pull request nhé. Reviewer duyệt nhé.”

## 3. Câu tiếng Việt tự nhiên thay vì câu dịch

Ưu tiên câu chủ động và nói rõ ai làm gì.

| Tránh | Nên viết |
|---|---|
| “Kết quả được kiểm tra bởi CI.” | “CI kiểm tra kết quả.” |
| “Cần phải tiến hành xác minh.” | “Hãy kiểm tra lại.” hoặc “Reviewer cần đối chiếu nguồn.” |
| “Việc triển khai cơ chế kiểm soát…” | “Thiết lập cơ chế kiểm soát…” |
| “Trong trường hợp mà agent không thể…” | “Nếu agent không thể…” |
| “Điều này cho phép người dùng có thể…” | “Nhờ vậy, người dùng có thể…” |
| “Không chỉ giảm chi phí mà còn tăng hiệu quả.” | Nói rõ hai kết quả: “Cách này giảm số lượt gọi model và rút ngắn thời gian review.” |
| “Tại thời điểm hiện tại…” | “Hiện tại…” |
| “Ở cuối ngày…” | “Cuối cùng…” hoặc bỏ nếu không cần |
| “Đưa lên bàn…” | Dùng động từ đúng việc: “đưa ra”, “trình bày”, “đề xuất”, “xem xét” |

Không phải câu bị động nào cũng sai. Dùng bị động khi người thực hiện không quan trọng hoặc chưa biết. Nhưng nếu người làm đã rõ, ưu tiên gọi đúng tên chủ thể.

## 4. Nhịp câu và cách nối ý

Một đoạn văn tự nhiên thường có nhịp: nêu nhận định → giải thích → ví dụ hoặc giới hạn → chốt hệ quả. Không cần biến mọi đoạn thành công thức, nhưng người đọc phải thấy vì sao câu sau nối với câu trước.

Ví dụ:

- Cụt, thiếu quan hệ: “CI chạy test. Agent báo xong. Reviewer xem diff.”
- Có trình tự: “Agent chạy test trong phiên để bắt lỗi sớm. Khi mở pull request, CI chạy lại các check trong môi trường của repo. Reviewer xem diff và kết quả rồi mới quyết định merge.”

Dùng từ nối theo đúng quan hệ:
- Bổ sung: “ngoài ra”, “đồng thời”, “thêm một điểm”.
- Đối lập/giới hạn: “nhưng”, “tuy vậy”, “dù thế”, “ngược lại”.
- Hệ quả: “vì vậy”, “do đó”, “nhờ vậy”.
- Làm rõ: “nói cách khác”, “cụ thể”, “điểm này có nghĩa là”.
- Chuyển tầng: “ở đây”, “đến bước này”, “vấn đề nằm ở chỗ”.

Không cần mở mọi đoạn bằng “Tuy nhiên”, “Bên cạnh đó”, “Điều này cho thấy”. Đôi khi bỏ từ nối sẽ tự nhiên hơn. Đừng lặp cùng một từ nối ở nhiều câu liên tiếp.

## 5. Chọn từ: cụ thể hơn, ít hành chính hơn

Ưu tiên:
- “dùng” thay “sử dụng” khi văn cảnh không cần trang trọng;
- “làm” thay “thực hiện”;
- “để” thay “nhằm”;
- “cần” thay “có nhu cầu cần phải”;
- “bắt đầu” thay “khởi tạo” nếu không phải thuật ngữ kỹ thuật;
- “giúp” thay “hỗ trợ cho việc”;
- “kiểm tra” hoặc “đối chiếu” thay “tiến hành xác minh”;
- “được chấp nhận” thay “đạt được sự chấp thuận”;
- “việc này” hoặc gọi tên sự việc thay cho “điều này” lặp lại.

Không máy móc Việt hóa thuật ngữ đã quen trong nghề. Giữ nguyên tên model, Claude Code, Cowork, prompt, context, agent, skill, hook, CI, API, pull request, branch protection khi cần. Lần đầu dùng thuật ngữ ít phổ biến, giải thích ngắn ngay trong câu.

## 6. Những dấu hiệu cần biên tập lại

- Mở bài sáo rỗng: “Trong thời đại AI phát triển mạnh mẽ…”, “Hãy cùng khám phá…”.
- Liên tục dùng cấu trúc “không chỉ… mà còn…”.
- Bộ ba tính từ chung chung: “nhanh chóng, hiệu quả và tối ưu”.
- Danh từ hóa: “việc triển khai việc kiểm tra”, “tiến hành thực hiện”.
- Câu nào cũng bắt đầu bằng “Bạn cần…”, “Bạn nên…”.
- Dùng “rất”, “cực kỳ”, “vô cùng” thay cho lý do hoặc bằng chứng.
- Câu hỏi tu từ nối tiếp nhau.
- Tóm tắt lại toàn bộ bài ở cuối bằng “Tóm lại”, “Như vậy, có thể thấy”.
- Gạch ngang dài chen giữa câu quá thường xuyên.
- Lạm dụng dấu hai chấm, ngoặc đơn hoặc bullet để né việc viết thành câu.
- Câu ngắn liên tiếp nhưng không có từ chỉ trình tự hay quan hệ khiến văn bản giống checklist.
- Dịch sát cú pháp tiếng Anh, đặc biệt là câu bị động và danh từ hóa.

## 7. Ví dụ về sắc thái

**Câu quá cụt:**

“Prompt là lời dặn. Hook là cơ chế. CI chạy lại. Reviewer duyệt.”

**Câu tự nhiên hơn:**

“Prompt chỉ đưa ra lời dặn, còn hook có thể thực thi một điều kiện bắt buộc. Khi có pull request, CI chạy lại các phép kiểm trong môi trường của repo. Reviewer xem diff và bằng chứng trước khi quyết định merge.”

**Câu hành chính:**

“Việc lựa chọn mô hình cần được thực hiện dựa trên các tiêu chí về hiệu năng và chi phí.”

**Câu tự nhiên hơn:**

“Chọn model theo chất lượng và chi phí trên chính tác vụ của bạn. Đừng lấy benchmark của một bài toán khác làm mặc định.”

**Câu dịch máy, thiếu hư từ:**

“Agent có thể truy cập dữ liệu. Nó không có nguồn sự thật. Kết quả có thể sai.”

**Câu tự nhiên hơn:**

“Agent có thể truy cập được dữ liệu mà vẫn không biết nguồn nào là bản mới nhất. Nếu không chỉ rõ nguồn sự thật, nó có thể dùng một bản ghi cũ rồi đưa ra kết luận sai.”

## 8. Quy trình tự biên tập cho Claude

Sau khi viết xong, đừng chỉ yêu cầu “make it more natural”. Hãy tự rà theo thứ tự:

1. **Ý:** Mỗi đoạn đang nói một ý gì? Câu đầu đã nói thẳng ý đó chưa?
2. **Chủ thể:** Ai đang làm hành động này: người dùng, model, harness, hook, CI hay reviewer?
3. **Hư từ:** Có thiếu “đã”, “rồi”, “mới”, “vẫn”, “chỉ”, “cũng”, “thì” làm câu sai sắc thái hoặc sai quan hệ không? Có từ nào đang thừa?
4. **Cú pháp:** Câu có đang đi theo trật tự tiếng Anh không? Có thể viết chủ động và gọi đúng người làm không?
5. **Từ ngữ:** Có từ Hán Việt hoặc từ hành chính nào có thể thay bằng từ đời thường mà vẫn chính xác không?
6. **Nhịp:** Đọc thành tiếng. Chỗ nào nghe như báo cáo hành chính, bản dịch hoặc checklist thì viết lại.
7. **Độ chính xác:** Đừng thêm hư từ để tạo cảm giác chắc chắn nếu nguồn không nói vậy. “Có thể”, “thường”, “trong trường hợp này” phải phản ánh đúng mức độ của bằng chứng.
8. **Đọc lại như độc giả:** Nếu người đọc chỉ xem tiêu đề, câu đầu mỗi đoạn và câu chốt, họ có hiểu đúng lập luận không?

### Chỉ dẫn ngắn để đưa vào prompt

> Viết tiếng Việt tự nhiên, không dịch cú pháp tiếng Anh. Ưu tiên câu chủ động, chủ thể rõ, động từ cụ thể. Dùng hư từ đúng nghĩa để thể hiện thời, thể, trình tự, đối lập và giới hạn; không lược chúng chỉ để câu ngắn, cũng không rải chúng cho có vẻ thân mật. Đọc to để phát hiện câu cụt, câu hành chính và câu không ai nói với đồng nghiệp. Giữ giọng thẳng, bình tĩnh, có chính kiến; không sáo rỗng, không tâng bốc, không cường điệu. Sau bản nháp, tự rà chủ thể, hư từ, cú pháp, từ ngữ và nhịp câu trước khi gửi.
