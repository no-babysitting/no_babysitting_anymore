# Vietnamese natural voice reference

> Tài liệu tham chiếu cho Claude khi viết và biên tập bài tiếng Việt trong editorial. Mục tiêu không phải bắt chước nguyên xi giọng của một người, mà là tạo văn xuôi tiếng Việt tự nhiên, có nhịp nói, rõ chủ thể và chính xác về ý.
>
> **Thứ tự ưu tiên:** tuân thủ `docs/16-writing-guide.md` và các quyết định biên tập đã được chủ dự án chốt trước. Tài liệu này bổ sung hướng dẫn về độ tự nhiên của tiếng Việt, đặc biệt là hư từ, cú pháp và nhịp câu; không ghi đè quy định về xưng hô, cấu trúc, thuật ngữ, mascot hay thiết kế. Nếu hai tài liệu có vẻ mâu thuẫn, giữ quy tắc của writing guide và dùng tài liệu này để cải thiện cách diễn đạt trong phạm vi cho phép.

## 1. Nguyên tắc cốt lõi

**Đây là tài liệu tham khảo, không phải bộ luật định dạng câu chữ.** Không có độ dài câu, số câu mỗi đoạn hay tỷ lệ câu ngắn/câu dài nào tự nó làm văn bản trở nên tự nhiên. Chỉ giữ một nguyên tắc nếu nó giúp người đọc hiểu đúng và dễ theo dõi hơn trong ngữ cảnh cụ thể. Khi một quy tắc hình thức xung đột với cách diễn đạt tự nhiên, ưu tiên cách diễn đạt tự nhiên, miễn là không vi phạm yêu cầu về độ chính xác, xưng hô hoặc thiết kế đã được chốt.

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

## 4.1. Mốc tham khảo và trade-off khi biên tập

Các mốc dưới đây là **điểm bắt đầu để tự rà**, không phải chuẩn đúng/sai, mục tiêu phải đạt hay điều kiện để duyệt bài. Đừng đếm máy móc rồi sửa câu chỉ để khớp con số. Hãy nhìn vào vai trò của câu trong đoạn, độ phức tạp của ý và trải nghiệm đọc liền mạch.

| Thành phần | Mốc tham khảo ban đầu | Trade-off và khi nên phá lệ |
|---|---|---|
| Độ dài câu | Khoảng 15–25 tiếng có thể là một vùng dễ đọc để bắt đầu rà. | Câu ngắn giúp nhấn mạnh và tạo nhịp, nhưng nhiều câu ngắn liên tiếp dễ thành văn cụt hoặc checklist. Câu dài giữ được quan hệ giữa các vế, nhưng nhiều tầng bổ nghĩa khiến người đọc phải đọc lại. Giữ câu dài nếu các vế thực sự gắn nhau; tách khi có nhiều ý độc lập hoặc chủ thể đổi. |
| Độ dài đoạn | 2–4 câu thường là một điểm bắt đầu hợp lý cho đoạn giải thích. | Đoạn một câu có thể tạo nhấn mạnh hoặc làm câu chuyển. Đoạn dài hơn phù hợp với một lập luận liên tục. Đừng tách đoạn chỉ để tạo nhiều khoảng trắng; cũng đừng gom nhiều ý khác nhau vào một khối. |
| Cách mở đoạn | Thường đưa ý quan trọng lên sớm. | Mở bằng tình huống, câu hỏi, dữ kiện hoặc mâu thuẫn khi chúng giúp người đọc hiểu vì sao vấn đề đáng quan tâm. Không ép mọi đoạn phải có câu chủ đề theo cùng một khuôn. |
| Chủ động và bị động | Ưu tiên câu chủ động khi biết ai thực hiện hành động. | Dùng bị động khi tác nhân không rõ, không quan trọng hoặc muốn tập trung vào kết quả. Đừng đổi sang chủ động nếu phải bịa ra chủ thể. |
| Từ nối | Dùng từ nối để chỉ rõ quan hệ giữa hai ý. | Từ nối giúp người đọc theo lập luận, nhưng lặp “tuy nhiên”, “bên cạnh đó”, “do đó” khiến văn nặng và công thức. Nếu quan hệ đã rõ, có thể bỏ. |
| Hư từ và khẩu ngữ | Dùng hư từ khi chúng mang nghĩa về thời, thể, trình tự, phạm vi hoặc sắc thái. | Lược quá tay khiến câu giống bản dịch; thêm quá nhiều khiến câu rườm rà hoặc suồng sã. Văn phân tích, lời hướng dẫn và prompt mẫu có mức khẩu ngữ khác nhau. |
| Danh sách và văn xuôi | Dùng danh sách cho các mục song song, độc lập hoặc cần quét nhanh. | Nếu các ý giải thích, dẫn đến hoặc phụ thuộc lẫn nhau, văn xuôi thường giữ được mạch suy nghĩ tốt hơn. Đừng biến mọi đoạn thành bullet chỉ vì dễ trình bày. |

Khi áp dụng một mốc, hãy tự hỏi bốn điều:

1. **Mặc định:** Đây có phải lựa chọn hợp lý để bắt đầu không?
2. **Lý do:** Nó giúp người đọc hiểu, định hướng hoặc ghi nhớ điều gì?
3. **Trade-off:** Nếu áp dụng quá tay, văn bản sẽ mất điều gì?
4. **Ngoại lệ:** Có ngữ cảnh cụ thể nào khiến lựa chọn khác tốt hơn không?

Một con số chỉ có ích khi nó giúp phát hiện vấn đề. Chẳng hạn, một câu dài hơn vùng tham khảo không tự động là câu khó đọc; nhưng nếu cả đoạn liên tục có câu nhiều tầng mệnh đề, đó là tín hiệu nên đọc lại. Tương tự, đoạn năm câu không mặc nhiên quá dài; điều cần kiểm tra là nó có đang chứa nhiều hơn một mạch ý hay không.

**Nguyên tắc quyết định:** tối ưu trải nghiệm đọc của cả đoạn và cả bài, không tối ưu từng câu đứng riêng lẻ.


Đoạn văn cần có mạch suy nghĩ, nhưng không có một công thức cố định cho mọi đoạn. Có lúc nên nêu kết luận trước; có lúc cần kể tình huống, đặt câu hỏi hoặc đưa bằng chứng lên trước để người đọc hiểu vấn đề. Đừng ép đoạn nào cũng đi theo nhịp “nhận định → giải thích → ví dụ → kết luận”.

Câu sau cần nối được với câu trước bằng quan hệ có thật: tiếp diễn, bổ sung, đối lập, nguyên nhân, hệ quả, điều kiện hoặc chuyển góc nhìn. Nếu quan hệ đã rõ, không cần chèn từ nối cho đủ. Nếu người đọc phải tự đoán mối liên hệ, hãy viết lại.

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

## 5.1. Kết hợp từ tự nhiên (collocation)

Một câu có thể đúng ngữ pháp nhưng vẫn nghe lạ vì các từ đứng cạnh nhau không phải cách người Việt thường diễn đạt ý đó. Đừng chỉ sửa cấu trúc câu; hãy kiểm tra cả cụm từ và động từ đi với bổ ngữ nào.

- Không hỏi riêng “từ này có nghĩa đúng không?”, mà hỏi “người Việt có thường kết hợp những từ này theo cách đó không?”.
- Ưu tiên động từ đi cùng đối tượng cụ thể: “làm rõ yêu cầu”, “đối chiếu nguồn”, “chạy phép kiểm”, “duyệt pull request”, “gỡ vướng mắc”.
- Tránh bê nguyên kết hợp từ tiếng Anh sang tiếng Việt, kể cả khi từng từ đều có nghĩa đúng.
- Không thay từ chỉ để thuần Việt hơn. Thuật ngữ quen dùng trong nghề có thể tự nhiên và chính xác hơn một cách Việt hóa gượng ép.

Ví dụ:

| Câu nghe gượng | Cách diễn đạt tự nhiên hơn |
|---|---|
| “Model mạnh hơn, bạn vẫn phải duyệt những việc không hoàn tác được.” | “Model mạnh hơn, nhưng những thao tác không thể hoàn tác vẫn cần bạn phê duyệt.” |
| “Kể cả việc kết quả có thể tốt tới mức nào.” | “Dù kết quả có tốt đến đâu, bạn vẫn cần kiểm tra.” |
| “Đưa ra một quyết định về hướng đi tiếp theo.” | “Quyết định bước tiếp theo.” |
| “Tạo ra sự rõ ràng cho yêu cầu.” | “Làm rõ yêu cầu.” |

Đây là ví dụ để nhận ra sắc thái, không phải bảng thay thế máy móc. Chọn cách nói phù hợp với chủ thể, ngữ cảnh và mức độ trang trọng của đoạn văn.

## 5.2. Đăng ký ngôn ngữ và giọng kể

Giọng của site là giọng một đồng nghiệp có kinh nghiệm đang giải thích vấn đề nghề nghiệp: gần gũi nhưng không suồng sã, có chính kiến nhưng không lên lớp. “Tự nhiên” không đồng nghĩa với đưa khẩu ngữ vào mọi chỗ.

- **Văn phân tích:** rõ, bình tĩnh, có căn cứ. Dùng khẩu ngữ vừa đủ; tránh “kiểu như”, “nói chung là”, “thực ra thì” nếu chúng không thêm nghĩa.
- **Lời hướng dẫn:** trực tiếp, gọi đúng người cần hành động. Có thể dùng cách nói gần lời nói hằng ngày, nhưng không biến mọi câu thành mệnh lệnh.
- **Hook và tiêu đề:** có thể tinh nghịch hoặc gợi tò mò; không được cường điệu điều thân bài không chứng minh.
- **Prompt mẫu và lời mascot:** có thể gần văn nói hơn thân bài, nhưng vẫn theo quy định xưng hô của writing guide.
- **Thuật ngữ kỹ thuật:** giữ cách gọi quen thuộc nếu Việt hóa làm câu khó hiểu hoặc sai nghĩa.

Đừng cố tạo “chất riêng” bằng tiếng lóng, câu đùa, thành ngữ hoặc từ địa phương. Chỉ dùng khi nó hợp người nói, người đọc và tình huống.

## 5.3. Ví dụ ở cấp đoạn: đúng ngữ pháp chưa đủ

**Đoạn đúng chữ nhưng rời và giống bản dịch:**

“Agent có khả năng truy cập nhiều nguồn dữ liệu. Tuy nhiên, nó không tự xác định được nguồn có độ tin cậy cao nhất. Điều này dẫn đến khả năng kết quả đầu ra không chính xác. Người dùng cần thực hiện việc xác minh.”

**Đoạn tự nhiên và rõ quan hệ hơn:**

“Agent có thể đọc nhiều nguồn dữ liệu, nhưng không phải lúc nào cũng biết nguồn nào đáng tin hơn. Nếu không chỉ rõ nguồn cần ưu tiên, nó có thể lấy nhầm một bản ghi cũ rồi kết luận sai. Vì vậy, hãy quy định nguồn nào được xem là căn cứ và kiểm tra lại những kết luận quan trọng.”

**Đoạn ngắn nhưng bị chặt vụn:**

“Prompt đưa ra lời dặn. Hook thực thi quy tắc. CI chạy phép kiểm. Reviewer duyệt.”

**Đoạn có nhịp và phân vai rõ hơn:**

“Prompt cho agent biết cần làm gì, còn hook có thể chặn một hành động ngay lúc nó xảy ra. CI kiểm tra lại thay đổi trong môi trường của repo. Reviewer xem diff và bằng chứng trước khi quyết định có merge hay không.”

Đừng sao chép cấu trúc của các đoạn mẫu. Hãy nhìn vào điều làm chúng tự nhiên hơn: quan hệ giữa các ý được nói rõ, từ đi với từ hợp nghĩa, và người đọc không phải tự nối những bước suy luận còn thiếu.

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
6. **Nhịp và giọng:** Đọc thành tiếng. Chỗ nào nghe như báo cáo hành chính, bản dịch, checklist hoặc cố tỏ ra thân mật thì viết lại. Xen kẽ câu ngắn và câu dài theo mạch ý; đừng cố làm mọi câu cùng độ dài.
7. **Độ chính xác:** Đừng thêm hư từ để tạo cảm giác chắc chắn nếu nguồn không nói vậy. “Có thể”, “thường”, “trong trường hợp này” phải phản ánh đúng mức độ của bằng chứng.
8. **Đọc lại như độc giả:** Đọc liền cả đoạn, không chỉ từng câu riêng lẻ. Mạch suy nghĩ có tự nhiên không? Có chỗ nào lặp ý, chuyển ý đột ngột hoặc bắt người đọc tự nối logic không?

### Chỉ dẫn ngắn để đưa vào prompt

> Viết tiếng Việt tự nhiên, không dịch cú pháp hay kết hợp từ tiếng Anh. Ưu tiên chủ thể rõ, động từ cụ thể và cách kết hợp từ người Việt thường dùng. Dùng hư từ đúng nghĩa; không lược chúng chỉ để câu ngắn, cũng không thêm vào cho có vẻ thân mật. Giữ giọng thẳng, bình tĩnh, có chính kiến; gần gũi nhưng không suồng sã. Đọc lại cả đoạn thành tiếng để kiểm tra mạch suy nghĩ, sắc thái và nhịp văn. Những ví dụ và nguyên tắc trong tài liệu này chỉ để tham khảo; đừng biến chúng thành công thức viết mới.
