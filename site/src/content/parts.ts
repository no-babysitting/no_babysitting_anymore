/* Lộ trình chính v4: năm phần Trước, Trong, Sau (docs/14-content-script-v4.md §6, đã duyệt 08/11/2026).
   Chữ ở đây theo kịch bản; chỗ kịch bản chỉ có dàn ý thì viết sát dàn ý và bảng mạch kính (14 §4).
   Không thêm con số, tên tính năng hay câu trích nào ngoài kịch bản. Nguồn: SOURCES bên dưới (14 §10). */

export type LensId = 'chung' | 'ops' | 'content' | 'research' | 'data' | 'build' | 'media' | 'design' | 'sales' | 'spec';
export const LENSES: { id: LensId; label: string }[] = [
  { id: 'chung', label: 'Chung' },
  { id: 'ops', label: 'Vận hành' },
  { id: 'content', label: 'Marketing' },
  { id: 'research', label: 'Nghiên cứu' },
  { id: 'data', label: 'Dữ liệu' },
  { id: 'build', label: 'Dựng sản phẩm' },
  { id: 'media', label: 'Sáng tạo' },
  { id: 'design', label: 'Thiết kế' },
  { id: 'sales', label: 'Bán hàng & khách hàng' },
  { id: 'spec', label: 'Phân tích & yêu cầu' },
];

export const SOURCES: Record<string, { label: string; href: string }> = {
  S1: { label: 'Anthropic · The new rules of context engineering for Claude 5 generation models (24/07/2026)', href: 'https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/' },
  S2: { label: 'Anthropic · A field guide to Claude Fable 5: Finding your unknowns (06/07/2026)', href: 'https://claude.com/resources/articles/a-field-guide-to-claude-fable-finding-your-unknowns' },
  S3: { label: 'Claude Code docs · Best practices', href: 'https://code.claude.com/docs/en/best-practices' },
  S4: { label: 'Claude Code docs · How Claude remembers your project', href: 'https://code.claude.com/docs/en/memory' },
  S5: { label: 'Claude Code docs · Extend Claude with skills', href: 'https://code.claude.com/docs/en/skills' },
  S6: { label: 'Anthropic · The unreasonable effectiveness of HTML (20/05/2026)', href: 'https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/' },
  S14: { label: 'Cộng đồng · shanraisshan/claude-code-best-practice', href: 'https://github.com/shanraisshan/claude-code-best-practice' },
};

export type Rows = Record<LensId, [string, string][]>;
export type Block =
  | { t: 'h'; text: string }
  | { t: 'p'; html: string; src?: string[] }
  | { t: 'list'; items: string[]; ordered?: boolean; src?: string[] }
  | { t: 'grid4'; cells: [string, string][]; src?: string[] }
  | { t: 'way'; no: string; title: string; html: string; prompt: string; src?: string[] }
  | { t: 'thenNow'; main?: boolean; vi?: string; en?: string; then: string; now: string; why: string; src: string[] }
  | { t: 'note'; tag: string; html: string; src?: string[] }
  | { t: 'grill'; q: string; options: { text: string; rec?: boolean; back: string }[]; why: string }
  | { t: 'lens'; title: string; intro?: string; rows: Rows; outro?: string; first?: boolean }
  | { t: 'phases' }
  | { t: 'shifts' };

export interface Part {
  id: string; phase: 'Mở đầu' | 'Trước' | 'Trong' | 'Sau'; en: string; vi: string; summary: string; minutes: number;
  hook: { stat?: [string, string]; question: string; bridge?: string; src?: string[] };
  core: Block[];
  close: { line: string; after?: string; prompt: Record<LensId, string>; src?: string[] };
  sources: string[];
}

const G = (s: string) => `<strong class="nb-gold" data-gold>${s}</strong>`;
const E = (s: string) => `<em lang="en">${s}</em>`;
const all = (f: (id: LensId) => string) => Object.fromEntries(LENSES.map((l) => [l.id, f(l.id)])) as Record<LensId, string>;

/* 00: cùng một prompt, mỗi kính dán một thứ khác (14 §6.0, Kết) */
const PASTE: Record<LensId, [string, string]> = {
  chung: ['cách tôi hay giao việc cho bạn', 'dán một yêu cầu bạn hay gửi'],
  ops: ['mẫu báo cáo tôi hay nhờ bạn làm', 'dán mẫu báo cáo'],
  content: ['brief nội dung tôi hay gửi cho bạn', 'dán brief nội dung'],
  research: ['câu hỏi nghiên cứu tôi hay gửi cho bạn', 'dán câu hỏi nghiên cứu'],
  data: ['yêu cầu phân tích tôi hay gửi cho bạn', 'dán yêu cầu phân tích'],
  build: ['file CLAUDE.md của dự án', 'dán CLAUDE.md'],
  media: ['brief video tôi hay gửi cho bạn', 'dán brief video'],
  design: ['brief thiết kế tôi hay gửi cho bạn', 'dán brief thiết kế'],
  sales: ['kịch bản chào hàng tôi đang dùng', 'dán kịch bản chào hàng'],
  spec: ['mẫu spec tôi đang dùng', 'dán mẫu spec'],
};

export const PARTS: Part[] = [
  {
    id: '00', phase: 'Mở đầu', en: 'WHY YOU STILL BABYSIT', vi: 'Vì sao bạn vẫn phải trông', minutes: 4,
    summary: 'Claude cần ít lời dặn hơn bạn nghĩ. Thứ nó thiếu là điều chỉ bạn biết.',
    hook: {
      stat: ['80%', 'Tháng 7/2026, Anthropic cho biết đã xoá hơn 80% chỉ dẫn hệ thống của Claude Code.'],
      question: 'Claude cần ít lời dặn đến thế, sao bạn vẫn phải ngồi trông?', src: ['S1'],
    },
    core: [
      { t: 'h', text: 'Lời dặn chỏi nhau' },
      { t: 'p', src: ['S1'], html: 'Khi đọc lại các phiên dùng Claude Code trong nội bộ, nhóm làm Claude Code thấy có những yêu cầu mang lời dặn ngược nhau. Chỉ dẫn hệ thống bảo “để lại tài liệu khi cần”. Một skill bảo “KHÔNG thêm chú thích”. Người dùng thì bảo “cứ làm cho chạy như bản cũ”. Claude vẫn đoán ra ý, nhưng phải nghĩ kỹ hơn để gỡ chỗ chỏi nhau.' },
      { t: 'h', text: 'Vì sao bỏ được' },
      { t: 'p', src: ['S1'], html: `Những lời dặn ấy từng cần, để tránh các tình huống tệ nhất như xoá nhầm file. Model mới ${G('phán đoán')} tốt hơn, nên nhóm Claude Code xoá bớt và để Claude dựa vào context xung quanh.` },
      { t: 'thenNow', main: true, src: ['S1', 'S3'],
        then: 'Càng dặn nhiều, càng an toàn.',
        now: `Chỉ dặn điều Claude ${G('không tự thấy')}. Phần còn lại, để nó phán đoán.`,
        why: 'Trang Best practices của Claude Code viết về những lời khuyên cũ: <q lang="en">Every one of these was good advice when it was written.</q>' },
      { t: 'h', text: 'Điều chỉ bạn biết' },
      { t: 'list', src: ['S3'], items: [
        'một quy trình chỉ nằm trong đầu một người;',
        'một file không bao giờ được mở;',
        'một phép kiểm phải qua thì mới tính là xong;',
        'một ngân sách không được vượt.',
      ] },
      { t: 'p', html: `Không mặc định nào biết những điều đó. ${G('Điều chỉ bạn biết')} là chỗ bạn bỏ chút công.` },
      { t: 'h', text: 'Ba chặng của một việc giao' },
      { t: 'phases' },
      { t: 'lens', first: true, title: 'Phần việc của bạn trong câu chuyện',
        intro: 'Từ đây tới cuối, mọi ví dụ đi theo một việc: studio “1 tỷ gói mè” (hư cấu) ra mắt khoá học online “Chụp đẹp bằng điện thoại”, 12 bài video ngắn dạy người bán hàng online chụp ảnh sản phẩm bằng điện thoại. Cả nhóm có bốn tuần.',
        outro: 'Ở mỗi phần, bạn sẽ thấy việc của mình đi qua đúng chặng đó.',
        rows: {
          chung: [['', 'Bạn là chủ studio. Bạn lo trang giới thiệu khoá học, và giữ cho cả nhóm ra mắt đúng hẹn.']],
          ops: [['', 'Bạn lo kế hoạch bốn tuần, báo cáo tiến độ mỗi thứ Hai và hộp thư hỏi đáp của học viên.']],
          content: [['', 'Bạn lo email cho danh sách chờ và các bài đăng ra mắt.']],
          research: [['', 'Bạn tìm hiểu thị trường: khoá tương tự giá bao nhiêu, người bán hàng online vướng gì khi chụp.']],
          data: [['', 'Bạn đặt giá khoá học từ dữ liệu danh sách chờ và khảo sát.']],
          build: [['', 'Bạn lo trang thanh toán và việc mở khoá bài học ngay sau khi học viên trả tiền.']],
          media: [['', 'Bạn dựng video giới thiệu khoá học.']],
          design: [['', 'Bạn thiết kế giao diện trang bán khoá học và bộ ảnh bìa cho 12 bài.']],
          sales: [['', 'Bạn soạn gói bán cho các shop online và trả lời khách hỏi trước khi mua.']],
          spec: [['', 'Bạn viết spec cho phần học: tiến độ, bài kiểm tra cuối khoá, điều kiện cấp chứng nhận.']],
        } },
      { t: 'p', html: 'No babysitting không có nghĩa là bỏ mặc. Phần 04 nói rõ bạn giữ lại những gì.' },
    ],
    close: {
      line: `Thôi cầm tay chỉ việc không có nghĩa là buông tay. Bạn ${G('đặt tay đúng hai chỗ')}: lúc làm rõ việc, và lúc duyệt kết quả.`,
      prompt: all((id) => `Đây là ${PASTE[id][0]}: [${PASTE[id][1]}]. Hãy chỉ ra: dòng nào bạn tự làm đúng mà không cần dặn, dòng nào chỏi nhau, và những điều chỉ tôi biết mà tôi chưa nói.`),
    },
    sources: ['S1', 'S3'],
  },

  {
    id: '01', phase: 'Trước', en: 'THE UNKNOWNS', vi: 'Tìm điều chưa biết', minutes: 5,
    summary: 'Việc giao thường hỏng ở những chỗ chính bạn chưa nghĩ tới. Hãy để Claude giúp bạn tìm ra chúng, trước khi nó bắt tay vào làm.',
    hook: {
      question: 'Brief đã rõ, Claude làm đúng từng chữ, vậy mà kết quả vẫn trật. Trật ở đâu?',
      bridge: 'Thường không phải ở Claude, mà ở những điều bạn chưa nói ra, vì chính bạn cũng chưa nghĩ tới.',
    },
    core: [
      { t: 'h', text: 'Bản đồ không phải là lãnh thổ' },
      { t: 'p', html: `Những gì bạn đưa cho Claude, gồm prompt, file và skill, là tấm bản đồ. Nơi việc thật diễn ra, với khách hàng thật, dữ liệu thật và ràng buộc thật, là lãnh thổ. Thariq Shihipar ở Anthropic gọi những chỗ bản đồ không khớp với lãnh thổ là ${E('unknowns')}, tạm dịch là ${G('điều chưa biết')}.` },
      { t: 'p', src: ['S2'], html: 'Gặp một điều chưa biết, Claude buộc phải đoán xem bạn muốn gì. Việc càng dài, nó càng gặp nhiều chỗ phải đoán. Tác giả kể rằng Claude Fable là model đầu tiên khiến chất lượng công việc bị giới hạn bởi khả năng làm rõ điều chưa biết của chính tác giả.' },
      { t: 'h', text: 'Bốn loại điều chưa biết' },
      { t: 'p', html: 'Mỗi lần mang một việc tới Claude, tác giả chia những gì mình biết thành bốn ô:' },
      { t: 'grid4', cells: [
        ['Biết mình biết.', 'Điều đã có trong prompt: bạn muốn gì, bạn đã nói ra.'],
        ['Biết mình chưa biết.', 'Điều bạn biết là mình chưa nghĩ xong.'],
        ['Không biết mình biết.', 'Điều hiển nhiên tới mức bạn chẳng bao giờ viết ra, nhưng nhìn thấy là nhận ra ngay.'],
        ['Không biết mình không biết.', 'Điều bạn chưa từng nghĩ tới, kể cả việc kết quả có thể tốt tới mức nào.'],
      ] },
      { t: 'p', src: ['S2'], html: 'Người giao việc giỏi vẫn có điều chưa biết. Khác ở chỗ họ luôn tính trước là nó có, và đi tìm nó: trước, trong và sau khi làm.' },
      { t: 'h', text: 'Ba cách để Claude giúp bạn tìm' },
      { t: 'way', no: '1', title: 'Chưa biết mình chưa biết gì? Nhờ Claude rà điểm mù.',
        html: `Ở một mảng còn lạ, bạn thường không biết nên hỏi gì, thế nào là tốt, trước đây đã có những gì, hay ổ gà nằm ở đâu. Hãy kể cho Claude bạn là ai và đang biết tới đâu, rồi nhờ nó ${G('rà điểm mù')}. Tác giả dùng nguyên văn hai cụm ${E('blind spot pass')} và ${E('unknown unknowns')} trong prompt; bạn cứ giữ nguyên hai cụm ấy.`,
        prompt: 'Tôi không biết color grading là gì nhưng cần chỉnh màu video này. Hãy dạy tôi những unknown unknowns về color grading, để tôi biết cách nhờ bạn cho đúng.' },
      { t: 'way', no: '2', title: 'Thấy rồi mới biết mình muốn gì? Xin vài bản nháp để phản ứng.', src: ['S2', 'S6'],
        html: 'Có những tiêu chí bạn chỉ nói được sau khi nhìn thấy: một bố cục, một giọng văn, một bảng màu. Đừng cố tả. Hãy xin vài hướng thật khác nhau trên cùng một trang HTML, rồi chọn cái làm bạn gật đầu. Sửa lúc này rẻ hơn nhiều so với sửa khi đã làm xong.',
        prompt: 'Tôi cần một trang giới thiệu khoá học nhưng không có mắt thẩm mỹ. Làm cho tôi một trang HTML với 4 hướng thiết kế thật khác nhau để tôi chọn.' },
      { t: 'way', no: '3', title: 'Biết còn chỗ mơ hồ? Để Claude phỏng vấn bạn.', src: ['S3', 'S2'],
        html: `Khi đã có hướng mà vẫn còn chỗ chưa chốt, hãy để Claude ${G('phỏng vấn')} bạn. Nó hỏi từng câu, mỗi câu kèm vài lựa chọn, tới khi đủ để viết thành một bản đặc tả (${E('spec')}). Có spec rồi thì mở một phiên mới để làm: phiên đó bắt đầu với context sạch và một định nghĩa “xong” đã được viết ra.`,
        prompt: 'Phỏng vấn tôi từng câu một về mọi chỗ còn mơ hồ. Hỏi trước những câu mà câu trả lời làm đổi cách làm. Khi đủ, viết lại thành SPEC.md.' },
      { t: 'grill', q: 'Trang này bán cho ai trước tiên?',
        options: [
          { text: 'Người mới mở shop online, tự chụp bằng điện thoại', rec: true, back: 'Nhóm này khớp nhất, vì khoá học dạy bằng điện thoại.' },
          { text: 'Shop đã có thợ chụp riêng', back: 'Đề xuất vẫn là nhóm đầu: khoá học dạy bằng điện thoại, mà nhóm này đã có thợ chụp.' },
          { text: 'Người chụp ảnh nghiệp dư muốn lên tay nghề', back: 'Đề xuất vẫn là nhóm đầu: khoá học dạy chụp ảnh sản phẩm để bán hàng.' },
        ],
        why: 'Câu trả lời làm đổi giọng văn, giá và bài học thử.' },
      { t: 'note', tag: 'Dùng được cả ở Claude app và Cowork', html: 'Ba cách này chỉ là prompt, nên ở đâu có Claude là dùng được.' },
      { t: 'thenNow', main: true, vi: 'Bớt tả, đưa tham chiếu', en: 'Simple specs → Rich references', src: ['S1'],
        then: 'Viết spec thành một file markdown để Claude đọc.',
        now: 'Đưa thứ thật: một bản nháp HTML, một file mẫu, một bộ test, một thang chấm.',
        why: `Claude giờ đọc được những ${G('tham chiếu')} phức tạp hơn nhiều so với một file markdown. Bài gốc viết rằng một bản mockup HTML thường cho kết quả tốt hơn lời tả thiết kế hay một ảnh chụp màn hình. Thang chấm (${E('rubric')}) cũng là tham chiếu: nó cho Claude biết thế nào là tốt, để Claude tự đối chiếu.` },
      { t: 'thenNow', vi: 'Bớt ví dụ, thiết kế khuôn', en: 'Give Claude examples → Design interfaces', src: ['S1'],
        then: 'Đưa vài ví dụ để Claude làm theo.',
        now: `Nói rõ cái ${G('khuôn')}: việc gồm những phần nào, mỗi phần nhận những giá trị nào.`,
        why: 'Với model mới, ví dụ dễ kéo Claude về quanh đúng vùng của ví dụ. Anthropic đã rút phần mô tả công cụ ghi danh sách việc của Claude Code từ khoảng 9.100 ký tự, toàn danh sách “khi nào dùng” và ví dụ, xuống còn một câu, ba trạng thái <code>pending</code>, <code>in_progress</code>, <code>completed</code>, và một luật: mỗi lúc chỉ có một việc đang làm. Chính cái khuôn đã gợi cho Claude cách dùng công cụ.' },
      { t: 'note', tag: 'Diễn giải của trang', src: ['S1', 'S2'], html: 'Bài gốc nói về công cụ của Claude Code. Với việc của bạn, khuôn là khung của thứ cần giao: các phần, các trường, các trạng thái. Muốn giữ giọng văn thì đưa thang chấm, đừng đưa ba bài mẫu để chép. Ví dụ vẫn đúng chỗ khi bạn thật sự muốn Claude làm y hệt, như chép lại cách một đoạn code đang chạy.' },
      { t: 'lens', title: 'Ở phần việc của bạn', rows: {
        chung: [['Việc', 'Trang giới thiệu khoá học.'],
          ['Điều chưa biết', 'Bạn chưa từng bán khoá học online, nên không biết trang bán khoá học thường cần gì: chính sách hoàn tiền, bài học thử, câu hỏi thường gặp.'],
          ['Cách tìm', 'Nhờ Claude rà điểm mù trước, rồi để nó phỏng vấn bạn về người học.'],
          ['Đưa cho Claude', 'Trang của một khoá học bạn từng mua và thích, lưu thành file HTML. Kèm khuôn: lời hứa · dành cho ai · 12 bài · học thử · câu hỏi thường gặp.']],
        ops: [['Việc', 'Kế hoạch ra mắt bốn tuần.'],
          ['Điều chưa biết', 'Bạn chưa từng ra mắt khoá học. Duyệt video mất mấy ngày? Tuần đầu ai trả lời học viên? Việc nào phải xong trước việc nào?'],
          ['Cách tìm', 'Rà điểm mù trước, rồi để Claude phỏng vấn bạn về nguồn lực và hạn chót.'],
          ['Đưa cho Claude', 'Bảng kế hoạch của dự án trước. Kèm khuôn của một đầu việc: người làm · hạn · trạng thái (chưa làm, đang làm, xong).']],
        content: [['Việc', 'Email cho danh sách chờ.'],
          ['Điều chưa biết', 'Giọng của studio. Bạn nhận ra ngay khi đọc thấy, nhưng không tả ra được.'],
          ['Cách tìm', 'Xin 3 bản email theo 3 giọng thật khác nhau, chọn một, rồi để Claude hỏi bạn vì sao chọn.'],
          ['Đưa cho Claude', 'Một thang chấm cho email tốt của studio (một lợi ích rõ, một lời mời, không hứa quá), thay cho ba email cũ để chép. Kèm khuôn: tiêu đề tối đa 50 ký tự · lợi ích · lời mời.']],
        research: [['Việc', 'Thị trường khoá học chụp ảnh sản phẩm.'],
          ['Điều chưa biết', 'Bạn chưa biết nên hỏi gì: khoá tương tự giá bao nhiêu, người học bỏ dở vì đâu, nguồn nào đáng tin.'],
          ['Cách tìm', 'Rà điểm mù về nghiên cứu thị trường khoá học, rồi để Claude phỏng vấn bạn để chốt 3 câu hỏi nghiên cứu.'],
          ['Đưa cho Claude', 'Danh sách nguồn bạn tin. Kèm khuôn của bản brief: câu hỏi · phát hiện · nguồn · mức chắc chắn.']],
        data: [['Việc', 'Đặt giá từ danh sách chờ và khảo sát.'],
          ['Điều chưa biết', 'Bạn chưa biết nên nhìn số nào: tỉ lệ đăng ký, mức giá người ta chọn trong khảo sát, hay nhóm nào hay mở email.'],
          ['Cách tìm', 'Rà điểm mù về cách định giá từ khảo sát, rồi để Claude phỏng vấn bạn về quyết định cần đưa ra trước khi tính gì.'],
          ['Đưa cho Claude', 'File CSV khảo sát. Kèm khuôn của một kết luận: chỉ số · cách tính · kết luận · mức tin cậy.']],
        build: [['Việc', 'Trang thanh toán và mở khoá bài học.'],
          ['Điều chưa biết', 'Bạn chưa từng tích hợp cổng thanh toán này. Webhook đến trễ thì sao? Hoàn tiền thì sao? Hoá đơn xuất lúc nào?'],
          ['Cách tìm', 'Rà điểm mù trên chính codebase và tài liệu của cổng thanh toán.'],
          ['Đưa cho Claude', 'Code mẫu của cổng thanh toán. Kèm khuôn trạng thái đơn hàng: chờ thanh toán · đã thanh toán · đã hoàn tiền, và mỗi đơn chỉ ở một trạng thái tại một thời điểm.']],
        media: [['Việc', 'Video giới thiệu khoá học.'],
          ['Điều chưa biết', 'Video quay xong trông hơi nhạt. Bạn đoán là do màu, nhưng chưa biết color grading là gì, nên cũng chưa biết thế nào là “đẹp”.'],
          ['Cách tìm', 'Nhờ Claude dạy bạn những unknown unknowns về color grading trước. Tác giả bài gốc cũng gặp đúng chuyện này khi dựng video ra mắt Claude Fable bằng Claude Code.'],
          ['Đưa cho Claude', 'Thông số đầu ra: dọc 9:16 · tối đa 60 giây · có phụ đề.']],
        design: [['Việc', 'Giao diện trang bán khoá học và bộ ảnh bìa.'],
          ['Điều chưa biết', 'Bạn biết mình thích gì khi thấy, nhưng không tả ra được.'],
          ['Cách tìm', 'Xin 4 hướng thật khác nhau trên cùng một trang HTML, chọn một, rồi để Claude hỏi bạn vì sao.'],
          ['Đưa cho Claude', 'File HTML của design system hoặc bộ nhận diện của studio. Kèm khuôn các màn: trang bán · thanh toán · cảm ơn.']],
        sales: [['Việc', 'Gói bán cho các shop online.'],
          ['Điều chưa biết', 'Bạn chưa biết shop hỏi gì nhiều nhất, và họ từ chối vì đâu.'],
          ['Cách tìm', 'Rà điểm mù về bán khoá học cho doanh nghiệp nhỏ, rồi để Claude phỏng vấn bạn về những khách đang có.'],
          ['Đưa cho Claude', 'Lịch sử tin nhắn hỏi đáp (đã bỏ thông tin cá nhân). Kèm khuôn của một gói: dành cho ai · gồm gì · giá · điều kiện.']],
        spec: [['Việc', 'Spec cho phần học.'],
          ['Điều chưa biết', 'Học viên được xem lại bài trong bao lâu? Bỏ dở giữa chừng thì tiến độ tính sao? Rớt bài kiểm tra thì có được thi lại không?'],
          ['Cách tìm', 'Để Claude phỏng vấn bạn từng câu, hỏi trước những câu làm đổi phạm vi.'],
          ['Đưa cho Claude', 'File câu hỏi của học viên khoá trước. Kèm khuôn của một yêu cầu: mã · mô tả · tiêu chí chấp nhận · ngoài phạm vi.']],
      } },
    ],
    close: {
      line: 'Mỗi bài giải thích, mỗi lần brainstorm, mỗi buổi phỏng vấn, mỗi bản nháp và mỗi tham chiếu đều là một cách rẻ để biết điều mình chưa biết, trước khi sửa nó trở nên đắt.',
      after: 'Làm rõ xong rồi mới giao. Phần sau nói chuyện giao thế nào để khỏi phải dặn đi dặn lại.',
      src: ['S2'],
      prompt: {
        chung: 'Tôi sắp làm [việc]. Tôi đã biết [điều bạn biết] nhưng chưa từng làm [phần còn lạ]. Hãy làm một blind spot pass: chỉ ra những unknown unknowns của tôi. Sau đó phỏng vấn tôi từng câu một về những chỗ còn mơ hồ, hỏi trước câu nào làm đổi cách làm. Khi đủ, viết lại thành SPEC.md.',
        ops: 'Tôi chưa từng [làm việc này]. Hãy làm một blind spot pass: những việc người làm lần đầu hay quên, những chỗ hay trễ. Sau đó phỏng vấn tôi từng câu một về nguồn lực và hạn chót.',
        content: 'Viết 3 bản [email] theo 3 giọng thật khác nhau, cùng một nội dung. Tôi sẽ chọn một bản. Sau đó hỏi tôi vì sao chọn nó, rồi gom các câu trả lời thành một thang chấm giọng văn để dùng cho lần sau.',
        research: 'Tôi cần tìm hiểu [thị trường] nhưng chưa biết nên hỏi gì. Hãy làm một blind spot pass: những câu hỏi người nghiên cứu hay bỏ sót, những nguồn hay sai. Sau đó phỏng vấn tôi từng câu một để chốt câu hỏi nghiên cứu, rồi ghi vào SPEC.md.',
        data: 'Đây là [file dữ liệu]. Tôi cần quyết [việc] nhưng chưa biết nên nhìn số nào. Hãy làm một blind spot pass về cách đọc loại dữ liệu này, rồi hỏi tôi từng câu về quyết định cần đưa ra trước khi tính gì.',
        build: 'Tôi cần tích hợp [cổng thanh toán] vào repo này nhưng chưa biết gì về phần thanh toán của codebase. Hãy làm một blind spot pass để chỉ ra những unknown unknowns của tôi, rồi giúp tôi viết prompt cho bạn tốt hơn.',
        media: 'Tôi không biết [kỹ thuật] là gì nhưng cần [làm việc này]. Hãy dạy tôi những unknown unknowns về nó để tôi biết cách nhờ bạn cho đúng.',
        design: 'Tôi biết mình thích gì khi thấy nhưng không tả được. Làm một trang HTML với 4 hướng thiết kế thật khác nhau cho [màn hình], dùng design system trong [thư mục]. Tôi chọn xong thì hỏi tôi vì sao.',
        sales: 'Tôi sắp chào [sản phẩm] cho [nhóm khách]. Hãy làm một blind spot pass: khách loại này hay hỏi gì, hay từ chối vì sao. Sau đó phỏng vấn tôi từng câu về khách đang có trước khi soạn gói.',
        spec: 'Tôi muốn viết spec cho [tính năng] nhưng chưa nghĩ kỹ. Phỏng vấn tôi từng câu một cho tới khi bạn đủ thông tin để viết spec, ưu tiên những câu làm đổi phạm vi. Xong thì ghi vào SPEC.md.',
      },
    },
    sources: ['S2', 'S1', 'S3', 'S6'],
  },

  {
    id: '02', phase: 'Trước', en: 'THE HANDOFF', vi: 'Giao việc: nói ít, nói một lần', minutes: 5,
    summary: 'Nói kết quả và thế nào là xong. Phần cách làm, để Claude phán đoán.',
    hook: {
      question: 'Bạn viết “TUYỆT ĐỐI KHÔNG” in hoa ba lần. Claude sẽ nghe lời hơn, hay làm quá tay hơn?',
      bridge: 'Theo docs của Claude Code: làm quá tay hơn. Nhấn mạnh chồng chất phần lớn chỉ khiến Claude áp luật quá mức.', src: ['S3'],
    },
    core: [
      { t: 'h', text: 'Một brief tốt có ba thứ' },
      { t: 'p', html: `Một brief tốt nói ba điều: ${G('kết quả')} bạn muốn, điều Claude không tự thấy, và ${G('thế nào là xong')}. Phần cách làm thì để Claude lo.` },
      { t: 'p', src: ['S3'], html: `Muốn bản đầy đủ thì nói “${E('be ambitious')}”. Câu đó nói về phạm vi, thứ chỉ bạn biết. Nó không bảo Claude nghĩ kỹ hơn.` },
      { t: 'thenNow', main: true, vi: 'Bớt luật, tin phán đoán', en: 'Give Claude rules → Let Claude use judgement', src: ['S1'],
        then: '“Mặc định không viết chú thích. Không bao giờ viết khối chú thích nhiều dòng.”',
        now: '“Viết sao cho giống phần đã có xung quanh: cùng độ dày chú thích, cách đặt tên, lối viết.”',
        why: `Hai câu trên dịch sát từ chỉ dẫn hệ thống cũ và mới của Claude Code. Luật cứng từng cần để tránh tình huống tệ nhất, nhưng nó sai với một phần yêu cầu: có người dùng có sở thích riêng, có đoạn code phức tạp cần chú thích dài. Model mới tự ${G('phán đoán')} được.` },
      { t: 'note', tag: 'Diễn giải của trang', html: 'Với việc của bạn, “giống phần đã có” là giọng của fanpage, bộ ảnh bìa đang dùng, mẫu báo cáo tuần trước. Đó là những thứ Claude tự đọc được, thay cho hai mươi luật.' },
      { t: 'thenNow', vi: 'Bớt nhắc, nói một lần', en: 'Repeat yourself → Simple tool descriptions', src: ['S1', 'S3'],
        then: 'Nhắc cùng một điều ở nhiều chỗ, in hoa cho chắc.',
        now: `Nói ${G('một lần')}, bằng lời thường, ở ${G('đúng chỗ')} nó được dùng.`,
        why: 'Model cũ đôi khi cần được nhắc lại, và hay nghe lời dặn ở cuối context hơn ở đầu. Model bây giờ làm theo một dòng viết bình thường; nhấn mạnh chồng chất làm nó áp luật quá tay. Một dòng bị lạc trong file dài nghĩa là file cần ngắn lại.' },
      { t: 'p', src: ['S3'], html: 'Luật không được phép sai, như gửi email cho khách hay xoá dữ liệu, thì không đặt trong lời dặn. Nó phải là quyền hoặc hook, để Claude Code chặn dù Claude có muốn làm.' },
      { t: 'h', text: 'Nói một lần thì nói ở đâu' },
      { t: 'list', src: ['S1', 'S3'], items: [
        `<b>Claude Code:</b> một file <code>CLAUDE.md</code> gọn, chủ yếu là ${E('gotcha')}, tức những điều Claude không tự đọc ra từ thư mục. Quy trình dài thì đưa vào skill; phần 03 nói tiếp.`,
        '<b>Cowork:</b> hướng dẫn của project. Đây là một hệ thống khác với <code>CLAUDE.md</code>.',
      ] },
      { t: 'lens', title: 'Ở phần việc của bạn', rows: {
        chung: [['Thay vì', '14 lời dặn về trang giới thiệu: giọng văn, độ dài, màu, những điều cấm.'], ['Hãy thử', 'Brief 3 dòng: trang để làm gì, theo <code>SPEC.md</code> đã chốt, và xong là khi mỗi khối trong SPEC có mặt trên trang.']],
        ops: [['Thay vì', '“Báo cáo PHẢI đầy đủ, KHÔNG được sót việc nào.”'], ['Hãy thử', '“Báo cáo tiến độ tuần theo mẫu tuần trước. Xong là khi mỗi mục có link nguồn.”']],
        content: [['Thay vì', 'Mười dòng tả giọng văn của studio.'], ['Hãy thử', '“Viết theo giọng fanpage hiện tại.” Nói một lần, trong hướng dẫn dự án.']],
        research: [['Thay vì', '“Tìm hiểu thật kỹ thị trường.”'], ['Hãy thử', 'Brief gồm 3 câu hỏi nghiên cứu, danh sách nguồn tin được, và hạn.']],
        data: [['Thay vì', '“Tính cẩn thận, kiểm lại nhiều lần.”'], ['Hãy thử', '“Xong là khi tổng khớp file nguồn.”']],
        build: [['Thay vì', 'Các dòng “LUÔN…” và “KHÔNG BAO GIỜ…” trong <code>CLAUDE.md</code>.'], ['Hãy thử', '<code>CLAUDE.md</code> ghi lệnh chạy test và một gotcha của cổng thanh toán.']],
        media: [['Thay vì', 'Nhắc lại thông số ở mỗi yêu cầu.'], ['Hãy thử', 'Nói thông số đầu ra một lần: dọc 9:16, tối đa 60 giây, có phụ đề.']],
        design: [['Thay vì', '20 luật về màu, chữ và khoảng cách.'], ['Hãy thử', '“Làm giống design system đang có.”']],
        sales: [['Thay vì', '“Viết gói bán thật hấp dẫn.”'], ['Hãy thử', 'Khuôn 4 phần cho mỗi gói: dành cho ai · gồm gì · giá · điều kiện.']],
        spec: [['Thay vì', '“Viết spec thật chi tiết.”'], ['Hãy thử', '“Be ambitious: gồm cả trạng thái lỗi và trạng thái trống.”']],
      } },
    ],
    close: {
      line: 'Nói ít không phải là nói thiếu. Là nói đúng điều chỉ bạn biết, một lần, rồi để Claude lo phần còn lại.',
      prompt: all(() => 'Đây là danh sách lời dặn tôi hay dùng: [dán]. Viết lại thành tối đa 5 dòng: giữ điều chỉ tôi biết, bỏ điều bạn tự làm đúng, gộp những dòng nhắc lại. Dòng nào là luật không được phép sai thì đánh dấu riêng, vì nó nên là quyền hoặc hook, không phải lời dặn.'),
    },
    sources: ['S1', 'S3'],
  },

  {
    id: '03', phase: 'Trong', en: 'LET IT WORK', vi: 'Để nó làm', minutes: 5,
    summary: 'Claude tự mở đúng tài liệu, tự nhớ điều đáng nhớ. Bạn chỉ lái khi nó lệch.',
    hook: {
      question: 'Đang làm giữa chừng, Claude gặp một chỗ kế hoạch không lường trước. Bạn muốn nó dừng lại hỏi, hay tự quyết rồi báo lại?',
      bridge: 'Cả hai, tuỳ chỗ. Mẹo là nói trước cho nó biết chỗ nào thì hỏi.',
    },
    core: [
      { t: 'h', text: 'Mở phiên mới, mang theo spec' },
      { t: 'p', src: ['S2', 'S3'], html: 'Có spec rồi thì mở một phiên mới để làm. Phiên mới có context sạch, cùng mọi thứ bạn đã gom được lúc làm rõ.' },
      { t: 'h', text: 'Để Claude ghi lại chỗ nó làm khác kế hoạch' },
      { t: 'p', src: ['S2'], html: `Claude giữ một file <code>implementation-notes.md</code>. Gặp chỗ buộc phải ${G('lệch kế hoạch')}, nó chọn phương án an toàn hơn, ghi vào mục “Lệch kế hoạch” rồi làm tiếp. Lần sau đọc lại, cả bạn và Claude đều học được.` },
      { t: 'h', text: 'Nói trước chỗ nào thì hỏi' },
      { t: 'p', src: ['S3'], html: 'Gặp chỗ mơ hồ, Claude hỏi bạn bằng câu hỏi nhiều lựa chọn. Bạn quy định trước: chỉ hỏi khi câu trả lời làm đổi kết quả cuối.' },
      { t: 'thenNow', main: true, vi: 'Bớt nhồi, để nó mở dần', en: 'Put it all upfront → Use progressive disclosure', src: ['S1', 'S5'],
        then: 'Dồn mọi hướng dẫn vào một file thật dài, để Claude khỏi bỏ sót.',
        now: `Chia thành một cây file nhỏ. Claude ${G('mở dần')}, đúng file vào đúng lúc.`,
        why: 'Claude Code đã giỏi nạp đúng context vào đúng lúc. Chính nhóm làm Claude Code đã tách phần rà code và phần kiểm chứng ra thành skill riêng, để Claude chỉ gọi khi cần. Với skill, Claude chỉ thấy sẵn phần mô tả ngắn; nội dung chỉ nạp khi dùng tới, nên tài liệu dài gần như không tốn gì cho tới lúc cần.' },
      { t: 'thenNow', vi: 'Để Claude tự nhớ', en: 'Memory in CLAUDE.md files → Auto-memory', src: ['S4', 'S1'],
        then: 'Tự tay ghi mọi điều cần nhớ vào <code>CLAUDE.md</code>.',
        now: `Claude ${G('tự nhớ')} những điều đáng nhớ: vai và thói quen làm việc của bạn, những lần bạn sửa nó, quyết định của dự án, nơi tìm thông tin. Bạn xem lại và sửa bằng <code>/memory</code>.`,
        why: 'Bốn điều cần biết về <em lang="en">auto memory</em>: nó bật sẵn ở các phiên chạy trên máy; bộ nhớ nằm trên chính máy đó, không theo bạn sang máy khác hay lên cloud; Claude không ghi những gì đọc lại được từ code; muốn chắc thì nói thẳng “nhớ giúp tôi rằng…”.' },
      { t: 'note', tag: 'Chỉ Claude Code', html: 'Auto memory và <code>/memory</code> là của Claude Code. Cowork có bộ nhớ riêng, là một hệ thống khác.' },
      { t: 'h', text: 'Bạn lái thế nào' },
      { t: 'p', src: ['S3'], html: `Xem ${G('phút đầu')}. Thấy lệch thì bấm Esc: Claude dừng ngay và giữ những gì đã làm. Sửa hai lần vẫn sai thì <code>/clear</code> rồi viết một prompt mới gom điều vừa học, đừng sửa lần thứ ba. Muốn hiểu sâu hơn, đọc <a data-href="c02/">Nâng cao A1 · Ngân sách ngữ cảnh</a>.` },
      { t: 'lens', title: 'Giữa chừng, ở phần việc của bạn', rows: {
        chung: [['Chuyện xảy ra', 'Trang hứa cho học thử, nhưng SPEC không nói mấy bài. Claude dừng lại hỏi: học thử mấy bài?']],
        ops: [['Chuyện xảy ra', 'Slack và bảng việc ghi hai hạn khác nhau cho cùng một đầu việc. Claude ghi lại chỗ lệch rồi hỏi bạn.']],
        content: [['Chuyện xảy ra', 'Một con số trong email chưa có nguồn. Claude hỏi bạn, không tự điền.']],
        research: [['Chuyện xảy ra', 'Hai nguồn nói khác nhau về giá. Claude ghi cả hai rồi hỏi bạn.']],
        data: [['Chuyện xảy ra', 'File khảo sát có dòng trùng. Claude chọn cách an toàn hơn, ghi vào mục “Lệch kế hoạch” rồi làm tiếp.']],
        build: [['Chuyện xảy ra', 'Cổng thanh toán không hỗ trợ hoàn tiền một phần. Claude chọn hướng an toàn hơn, ghi “Lệch kế hoạch #1” rồi làm tiếp.']],
        media: [['Chuyện xảy ra', 'Phụ đề theo đúng lời nói, hay theo bản đã biên tập? Claude hỏi bạn.']],
        design: [['Chuyện xảy ra', 'Màn thanh toán thiếu trạng thái lỗi. Claude hỏi bạn.']],
        sales: [['Chuyện xảy ra', 'Một khách hỏi giảm giá ngoài chính sách. Claude hỏi bạn, không tự hứa.']],
        spec: [['Chuyện xảy ra', 'Hai yêu cầu chỏi nhau. Claude hỏi bạn.']],
      } },
    ],
    close: {
      line: `Trong lúc Claude làm, việc của bạn không phải là ngồi canh. Là ${G('lái')} khi nó lệch, và đọc lại những gì nó ghi.`,
      src: ['S2'],
      prompt: all(() => 'Giữ một file implementation-notes.md. Gặp chỗ buộc phải lệch kế hoạch, chọn phương án an toàn hơn, ghi vào mục “Lệch kế hoạch” rồi làm tiếp. Chỉ dừng lại hỏi tôi khi câu trả lời làm đổi kết quả cuối.'),
    },
    sources: ['S1', 'S2', 'S3', 'S4', 'S5'],
  },

  {
    id: '04', phase: 'Sau', en: 'NO BABYSITTING', vi: 'Kiểm, hỏi vặn, rồi buông', minutes: 6,
    summary: 'Cho Claude một phép kiểm, đòi bằng chứng, hỏi vặn nó. Rồi để nó chạy.',
    hook: {
      question: 'Claude báo: “Xong rồi, mọi thứ đều chạy.” Bạn tin câu đó tới đâu?',
      bridge: 'Không có gì để chạy thử thì “trông như xong” là tất cả những gì Claude có. Khi ấy, bạn thành người kiểm thay nó.', src: ['S3'],
    },
    core: [
      { t: 'h', text: 'Một phép kiểm trả về đạt hay không đạt' },
      { t: 'p', src: ['S3'], html: `Cho Claude thứ nó chạy được, trả về đạt hay không đạt. Có ${G('phép kiểm')} rồi, Claude tự làm tiếp, bạn không phải ngồi xem. Docs đưa ví dụ: file test, mã thoát của bản build, linter, script so kết quả với mẫu, ảnh chụp trình duyệt đặt cạnh mockup.` },
      { t: 'note', tag: 'Diễn giải của trang', html: 'Với việc không phải code, phép kiểm có thể là: tổng khớp file nguồn · số nào cũng có link · mỗi clip tối đa 60 giây · đúng khuôn đã giao.' },
      { t: 'h', text: 'Đòi bằng chứng' },
      { t: 'p', src: ['S3'], html: `${G('Bằng chứng')} là lệnh đã chạy kèm kết quả, hoặc ảnh chụp. Một câu “mọi test đều qua” không kèm gì thì gần như chẳng nói lên điều gì.` },
      { t: 'h', text: 'Một người duyệt chưa thấy cách làm' },
      { t: 'p', src: ['S3'], html: 'Nhờ một reviewer ở context mới đối chiếu kết quả với SPEC. Dặn nó chỉ báo chỗ ảnh hưởng tới tính đúng và bỏ qua văn phong, vì một reviewer được nhờ tìm lỗi thì kiểu gì cũng tìm ra một cái gì đó.' },
      { t: 'thenNow', main: true, src: ['S3'],
        then: 'Dặn “làm tiếp đi, đừng lười, lặp tới khi xong”.',
        now: 'Cho nó một phép kiểm phải qua. Việc chạy mà không ai xem thì dùng <code>/goal</code> hoặc Stop hook.',
        why: 'Hàng này lấy từ bảng <em lang="en">What you can stop doing</em> của trang Best practices. <code>/goal</code> và Stop hook là tính năng của Claude Code.' },
      { t: 'h', text: 'Đảo vai: giờ bạn hỏi vặn Claude' },
      { t: 'p', src: ['S2', 'S14'], html: `Bắt Claude làm một báo cáo HTML về những gì đã đổi, cuối báo cáo có câu đố. Tác giả bài field guide chỉ merge khi trả lời đúng hết. Trong repo cộng đồng có mẹo của Boris Cherny để ${G('hỏi vặn')} theo hai chiều: <q lang="en">grill me on these changes and don’t make a PR until I pass your test</q> và <q lang="en">prove to me this works</q>.` },
      { t: 'grill', q: 'Webhook báo thanh toán đến hai lần cho cùng một đơn. Trang làm gì?',
        options: [
          { text: 'Mở khoá bài học hai lần', back: 'Chưa đúng. Lần thứ hai bị bỏ qua, vì đơn đã ở trạng thái “đã thanh toán”.' },
          { text: 'Bỏ qua lần thứ hai nhờ mã đơn', rec: true, back: 'Lần thứ hai bị bỏ qua, vì đơn đã ở trạng thái “đã thanh toán”.' },
          { text: 'Báo lỗi cho học viên', back: 'Chưa đúng. Lần thứ hai bị bỏ qua, vì đơn đã ở trạng thái “đã thanh toán”.' },
        ],
        why: 'Nếu bạn trả lời sai, bạn chưa hiểu thay đổi đủ để duyệt.' },
      { t: 'h', text: 'Trước khi để nó chạy một mình: 5 câu hỏi' },
      { t: 'list', ordered: true, src: ['S3'], items: [
        'Nó có biết thế nào là xong không?',
        'Nó tự kiểm được không?',
        'Nó được chạm vào đâu?',
        'Cái gì sẽ làm nó dừng?',
        'Kết quả đi đâu, và ai ký duyệt?',
      ] },
      { t: 'h', text: 'No babysitting không phải là bỏ mặc' },
      { t: 'p', src: ['S3'], html: 'Phần còn lại của bạn là bắt đầu việc, quyết lần này “xong” là gì, và duyệt ở cuối. Docs viết rằng không cấu hình nào thay được việc xem phút đầu.' },
      { t: 'h', text: 'Sáu dịch chuyển, nhìn lại' },
      { t: 'shifts' },
      { t: 'lens', title: 'Ở phần việc của bạn', rows: {
        chung: [['Phép kiểm', 'Mỗi khối của trang có trong SPEC.'], ['Trước khi buông', 'Bạn trả lời đúng bộ câu đố về trang rồi mới đăng.']],
        ops: [['Phép kiểm', 'Mỗi mục của báo cáo có link nguồn.'], ['Trước khi buông', 'Bạn đi qua 5 câu hỏi trước khi cho báo cáo tự chạy lúc 08:00 thứ Hai. Vài lần đầu, bạn đọc trước khi gửi.']],
        content: [['Phép kiểm', 'Số nào cũng có nguồn.'], ['Trước khi buông', 'Bài đăng chờ bạn duyệt.']],
        research: [['Phép kiểm', 'Số nào cũng có link còn sống.'], ['Trước khi buông', 'Một reviewer ở context mới kiểm từng khẳng định.']],
        data: [['Phép kiểm', 'Script chạy lại được và tổng khớp.'], ['Trước khi buông', 'Claude đố bạn về cách tính.']],
        build: [['Phép kiểm', 'Test và webhook test đều xanh.'], ['Trước khi buông', 'Reviewer mới đối chiếu với SPEC. Bạn qua câu đố rồi mới merge.']],
        media: [['Phép kiểm', 'Mỗi clip tối đa 60 giây, dọc 9:16, phụ đề khớp giờ.']],
        design: [['Phép kiểm', 'Ảnh chụp trình duyệt đặt cạnh bản nháp bạn đã chọn.']],
        sales: [['Phép kiểm', 'Mọi câu trả lời khớp chính sách.'], ['Trước khi buông', 'Email gửi khách chờ bạn duyệt.']],
        spec: [['Trước khi buông', 'Một reviewer đối chiếu SPEC với ghi chú phỏng vấn.']],
      } },
    ],
    close: {
      line: `Thôi cầm tay chỉ việc: cùng Claude làm rõ việc, giao trọn, cho nó phép kiểm, rồi ${G('buông')}. Bạn chỉ giữ lại hai việc: quyết thế nào là xong, và ${G('duyệt')} những gì không hoàn tác được.`,
      src: ['S2'],
      prompt: all(() => 'Tôi muốn chắc mình hiểu hết những gì vừa thay đổi. Làm cho tôi một báo cáo HTML: đã làm gì, vì sao, còn rủi ro gì. Cuối báo cáo là 5 câu hỏi; tôi phải trả lời đúng hết thì mới duyệt.'),
    },
    sources: ['S3', 'S2', 'S1', 'S14'],
  },
];

/* Bảng six shifts (14 §7), thứ tự theo bài gốc */
export const SHIFTS: { vi: string; en: string; part: string }[] = [
  { vi: 'Bớt luật, tin phán đoán', en: 'Give Claude rules → Let Claude use judgement', part: '02' },
  { vi: 'Bớt ví dụ, thiết kế khuôn', en: 'Give Claude examples → Design interfaces', part: '01' },
  { vi: 'Bớt nhồi, để nó mở dần', en: 'Put it all upfront → Use progressive disclosure', part: '03' },
  { vi: 'Bớt nhắc, nói một lần', en: 'Repeat yourself → Simple tool descriptions', part: '02' },
  { vi: 'Để Claude tự nhớ', en: 'Memory in CLAUDE.md files → Auto-memory', part: '03' },
  { vi: 'Bớt tả, đưa tham chiếu', en: 'Simple specs → Rich references', part: '01' },
];

export const PHASES: { label: string; line: string; parts: string[] }[] = [
  { label: 'Trước', line: 'Làm rõ cùng Claude, rồi giao gọn.', parts: ['01', '02'] },
  { label: 'Trong', line: 'Để nó tự tìm, tự nhớ. Bạn chỉ lái khi nó lệch.', parts: ['03'] },
  { label: 'Sau', line: 'Cho nó một phép kiểm, hỏi vặn kết quả, rồi mới buông.', parts: ['04'] },
];

export const partOf = (id: string) => PARTS.find((p) => p.id === id)!;
