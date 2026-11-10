/* Ba bài thực hành sau lộ trình chính (docs/23-learning-evidence-blueprint.md §6).
   Tình huống cố ý nằm ngoài câu chuyện studio và mọi ví dụ của 5 phần: người học phải tự chọn nguyên lý.
   Không chấm điểm. Phần "bài này cố ý gài gì" và thang tự soát chỉ mở sau khi người học đã làm. */
export const LEVELS = ['Rời rạc', 'Theo khuôn', 'Tự làm được', 'Linh hoạt'];
export interface Exercise {
  id: string; title: string; from: string; minutes: string;
  parts: { label?: string; scene: string; asks: string[] }[];
  traps: string[];
  rubric: { name: string; levels: [string, string, string, string] }[];
  back: { href: string; label: string }[];
}
export const EXERCISES: Exercise[] = [
  {
    id: 'bai-1', title: 'Đón sáu người mới', from: 'Luyện phần 00, 01 và 02: làm rõ rồi giao', minutes: '25 phút',
    parts: [{
      scene: 'Bạn phụ trách hành chính ở một công ty 40 người. Giám đốc nhắn: “Tháng sau có sáu người vào. Lần trước đón người mới lộn xộn quá, em lo lại chuyện này nhé.” Bạn định giao phần lớn việc này cho một agent (trợ lý AI tự làm việc). Trong thư mục chung có chín tài liệu: bản checklist (danh sách việc cần làm) đón người mới từ hai năm trước · sổ tay nhân viên bản mới nhất · bảng lương của sáu người mới · sơ đồ tổ chức đã cũ một quý · ba email phàn nàn của đợt trước · lịch phòng họp tháng sau · mẫu hợp đồng thử việc · danh sách thiết bị còn trong kho · slide giới thiệu công ty của phòng marketing.',
      asks: [
        'Những điều bạn còn chưa biết, xếp theo mức độ làm thay đổi cách làm. Với mỗi điều, bạn sẽ tìm ra bằng cách nào?',
        'Bản giao việc (brief) mà bạn sẽ gửi cho agent, dài tối đa 8 dòng.',
        'Trong chín tài liệu ấy, cái nào bạn sẽ đưa cho agent, cái nào không, và vì sao? Kể thêm một thứ chưa có trong thư mục mà bạn sẽ đi tìm.',
      ],
    }],
    traps: [
      'Lời nhắn của giám đốc không hề nói thế nào thì tính là xong.',
      'Hai tài liệu đã cũ: checklist và sơ đồ tổ chức.',
      'Bảng lương là tài liệu nhạy cảm và không cần cho việc này.',
      'Ba email phàn nàn là tham chiếu tốt nhất về “thế nào là lộn xộn”, nhưng dễ bị bỏ qua.',
    ],
    rubric: [
      { name: 'Tìm điều chưa biết', levels: ['Không nêu, hoặc bắt tay viết brief ngay.', 'Danh sách chung chung, đúng với mọi việc.', 'Điều chưa biết gắn với tình huống (sáu người vào cùng ngày hay rải ra? “lộn xộn” là gì?), mỗi điều có cách tìm hợp lý.', 'Tách điều phải hỏi giám đốc khỏi điều để agent phỏng vấn mình; nêu cả cách dò ra điều mình chưa nghĩ tới.'] },
      { name: 'Thế nào là xong', levels: ['Không có, hoặc là “làm cho tốt”.', 'Có, nhưng không kiểm được (“đón chu đáo”).', 'Kiểm được đạt hay không đạt, gắn với kết quả giám đốc cần.', 'Nêu thêm phần nào chưa định nghĩa được lúc này, và ai chốt.'] },
      { name: 'Bản giao việc', levels: ['Một danh sách bước phải làm theo.', 'Đúng khuôn ba phần, nhưng phần “điều agent không tự thấy” còn bỏ trống hoặc chép lại từ bài.', 'Nói kết quả, điều chỉ mình biết, thế nào là xong; để phần cách làm cho agent.', 'Thêm chỗ agent phải dừng lại hỏi, và lý do.'] },
      { name: 'Tài liệu đưa cho agent', levels: ['Đưa cả chín, hoặc không nêu lý do.', 'Chọn đúng một phần, lý do là “cho chắc” hoặc “cho gọn”.', 'Loại bảng lương và có lý do; nhận ra tài liệu cũ; dùng email phàn nàn làm tham chiếu.', 'Nêu cách xử lý tài liệu cũ (đưa kèm ghi chú hay bỏ), và thứ còn thiếu đáng đi kiếm.'] },
    ],
    back: [{ href: '01/', label: '01 · Tìm điều chưa biết' }, { href: '02/', label: '02 · Giao việc' }],
  },
  {
    id: 'bai-2', title: 'Agent dọn tủ hợp đồng', from: 'Luyện phần 02 và 04: đặt ranh giới trước khi buông', minutes: '20 phút',
    parts: [{
      scene: 'Nhóm pháp chế ba người có một thư mục dùng chung chứa khoảng 600 hợp đồng, tên file lộn xộn, nhiều bản trùng. Nhóm muốn có một agent (trợ lý AI tự làm việc) đặt lại tên và xếp hợp đồng vào thư mục theo đối tác, cập nhật bảng theo dõi ngày hết hạn, và nhắc đối tác gia hạn trước 30 ngày. Một đồng nghiệp đã soạn sẵn cấu hình. Theo đó, agent được: toàn quyền với thư mục chung của cả công ty · đọc và gửi email từ hộp thư của nhóm · sửa bảng theo dõi · tạo sự kiện lịch · tra web · đăng vào kênh chat của nhóm.',
      asks: [
        'Với từng khả năng trong cấu hình, chọn cho phép, hỏi trước mỗi lần, hoặc chặn. Mỗi lựa chọn kèm một dòng lý do.',
        'Bản cấu hình đang cấp thừa quyền ở những chỗ nào? Bạn sẽ thu hẹp lại ra sao?',
        'Hai điều mà bạn sẽ không ghi vào lời dặn, mà đặt hẳn thành rào chắn. Vì sao lại thế?',
        'Điều gì sẽ khiến agent phải dừng lại?',
      ],
    }],
    traps: [
      'Phạm vi thư mục rộng hơn việc cần: cả công ty, trong khi việc chỉ ở tủ hợp đồng.',
      'Xoá bản trùng không hoàn tác được. Việc đó không nằm trong yêu cầu, nhưng agent sẽ muốn làm.',
      'Gửi email cho đối tác là hành động ra ngoài công ty.',
      'Tra web không cần cho việc này.',
      'Đọc cả hộp thư rộng hơn mức cần.',
    ],
    rubric: [
      { name: 'Xếp theo rủi ro', levels: ['Cho phép hết hoặc chặn hết; không có lý do.', 'Xếp đúng ca giống ví dụ trong bài (gửi email), sai ở ca khác.', 'Lý do dựa trên hai câu hỏi: có hoàn tác được không, có ra ngoài không. Áp dụng nhất quán.', 'Nêu ca lưng chừng và cách xử lý, ví dụ: cho đổi tên nhưng giữ sổ ghi để đảo lại.'] },
      { name: 'Cắt quyền thừa', levels: ['Không thấy chỗ thừa.', 'Thấy một chỗ, sau khi đọc lại bài.', 'Thu hẹp thư mục về đúng tủ hợp đồng; bỏ tra web; thu hẹp hộp thư.', 'Chỉ ra quyền thừa nào nguy hiểm nhất và vì sao; bắt đầu hẹp rồi nới theo tín hiệu.'] },
      { name: 'Rào chắn hay lời dặn', levels: ['Dồn mọi thứ vào lời dặn, viết in hoa.', 'Nhắc lại được câu “luật không được phép sai thì phải là quyền hạn hoặc hook” nhưng không áp vào ca cụ thể nào.', 'Đặt đúng hai rào chắn (không xoá; email chỉ soạn nháp) và giải thích vì sao lời dặn không đủ.', 'Nêu cái giá của rào chắn (agent bị chặn giữa chừng) và cách giảm.'] },
      { name: 'Điểm dừng', levels: ['Không có.', 'Có, nhưng chung chung (“khi có vấn đề”).', 'Gắn với sự kiện cụ thể: hai bản hợp đồng chỏi nhau, không đọc được ngày hết hạn.', 'Tách chỗ agent tự quyết rồi ghi lại khỏi chỗ phải hỏi.'] },
    ],
    back: [{ href: '02/', label: '02 · Giao việc' }, { href: '04/', label: '04 · Kiểm, hỏi vặn, rồi buông' }],
  },
  {
    id: 'bai-3', title: 'Bản dịch bốn mươi trang', from: 'Luyện phần 03 và 04: lái, kiểm, bàn giao', minutes: '15 + 20 phút',
    parts: [
      { label: 'Lượt một · 15 phút',
        scene: 'Công ty bạn cần chuyển bộ hướng dẫn sử dụng 40 trang từ tiếng Anh sang tiếng Việt. Nhóm sản phẩm đã soạn một bảng thuật ngữ 120 mục. Bạn giao việc này cho một agent (trợ lý AI tự làm việc), và sẽ vắng mặt trong phần lớn thời gian.',
        asks: ['Công việc được chia ra thế nào, và làm theo thứ tự nào?', 'Agent sẽ dừng lại hỏi bạn ở những chỗ nào?', 'Agent tự chạy được những phép kiểm đạt hay không đạt nào?', 'Bạn sẽ xem những gì ở phút đầu tiên?'] },
      { label: 'Lượt hai · 20 phút · làm xong lượt một rồi mới đọc',
        scene: 'Hai tiếng sau bạn quay lại. Agent báo: “Xong 40/40, mọi thứ ổn.” Ghi chú của nó có một dòng: ở trang 12 nó thấy bảng thuật ngữ trái với cách gọi trên website đang chạy, đã tự chọn theo website, và đã quay lại sửa 11 trang trước cho thống nhất.',
        asks: ['Bạn sẽ làm gì tiếp theo, và theo thứ tự nào?', 'Từ phiên làm việc này, bạn giữ lại gì và bỏ đi gì?', 'Bạn sẽ gửi những gì cho trưởng nhóm tài liệu, người sẽ ký duyệt bản dịch?'] },
    ],
    traps: [
      'Việc này không có sẵn bộ bài kiểm nào. Bạn phải tự nghĩ ra phép kiểm cho một việc không phải viết code.',
      'Agent đã tự quyết một việc làm đổi kết quả cuối mà không hỏi.',
      'Lời báo “xong” không kèm bằng chứng.',
      'Chọn thuật ngữ nào không phải là quyết định của bạn.',
    ],
    rubric: [
      { name: 'Chia việc và điểm dừng', levels: ['Giao cả 40 trang một lượt, không điểm dừng.', 'Chia theo trang; điểm dừng chép từ bài (“chỉ hỏi khi đổi kết quả cuối”) mà không nói ở việc này là chỗ nào.', 'Làm trọn một phần nhỏ trước để duyệt; điểm dừng gắn với thuật ngữ chỏi nhau.', 'Lường trước chính loại xung đột ở lượt hai, hoặc xếp thứ tự để lỗi lộ ra sớm, lúc sửa còn rẻ.'] },
      { name: 'Phép kiểm', levels: ['“Đọc lại cho kỹ.”', 'Nêu ra phép kiểm của bài học nhưng không áp được ở đây, như chạy bài kiểm thử (test).', 'Ít nhất hai phép kiểm đạt hay không đạt cho việc dịch: thuật ngữ khớp bảng, không còn đoạn chưa dịch, số và đơn vị giữ nguyên.', 'Thêm một người duyệt ở context (ngữ cảnh) mới, và nói rõ phép kiểm nào không bắt được loại lỗi nào.'] },
      { name: 'Can thiệp khi lệch', levels: ['Tin lời báo, hoặc bỏ hết làm lại.', 'Biết phải làm gì đó, nhưng chọn theo luật thuộc lòng mà không xét còn dùng được gì.', 'Đòi bằng chứng trước; tách phần còn dùng được (29 trang sau) khỏi phần phải xem lại; nêu thứ mang sang phiên mới.', 'Nhận ra gốc rễ là bản giao việc thiếu luật về thuật ngữ, và sửa ngay ở bản giao việc chứ không chỉ sửa kết quả.'] },
      { name: 'Gói bàn giao', levels: ['Gửi bản dịch kèm câu “đã xong”.', 'Liệt kê việc đã làm, không có rủi ro còn lại.', 'Có bằng chứng kiểm, có mục rủi ro còn lại, nêu rõ quyết định về thuật ngữ đang chờ người có thẩm quyền.', 'Đưa cho người duyệt hai phương án, kèm cái giá của từng phương án.'] },
    ],
    back: [{ href: '03/', label: '03 · Để nó làm' }, { href: '04/', label: '04 · Kiểm, hỏi vặn, rồi buông' }],
  },
];
