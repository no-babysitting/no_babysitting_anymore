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
/* thuật ngữ tiếng Anh lần đầu trong một phần: in nghiêng, kèm nghĩa tiếng Việt trong ngoặc (góp ý của chủ dự án 11/11) */
const T = (en: string, vi: string) => `<em lang="en">${en}</em> (${vi})`;
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
    id: '00', phase: 'Mở đầu', en: 'WHY YOU STILL BABYSIT', vi: 'Vì sao bạn vẫn còn phải ngồi trông', minutes: 4,
    summary: 'Claude cần ít lời dặn hơn bạn nghĩ nhiều. Thứ em nó còn thiếu là những điều chỉ có bạn mới biết.',
    hook: {
      stat: ['80%', 'Tháng 7/2026, Anthropic cho biết họ đã xoá đi hơn 80% chỉ dẫn hệ thống của Claude Code.'],
      question: 'Claude chỉ cần ít lời dặn đến thế, vậy sao bạn vẫn còn phải ngồi trông?', src: ['S1'],
    },
    core: [
      { t: 'h', text: 'Khi những lời dặn chỏi nhau' },
      { t: 'p', src: ['S1'], html: `Khi đọc lại các phiên làm việc trong nội bộ, nhóm làm Claude Code nhận ra có những yêu cầu mang theo các lời dặn trái ngược nhau. Chỉ dẫn hệ thống thì bảo “để lại tài liệu khi cần”. Một ${T('skill', 'bộ hướng dẫn đóng gói sẵn')} lại bảo “KHÔNG thêm chú thích”. Còn người dùng thì nói “cứ làm cho chạy như bản cũ”. Claude vẫn đoán ra được ý, nhưng phải nghĩ kỹ hơn hẳn mới gỡ nổi mấy chỗ chỏi nhau ấy.` },
      { t: 'h', text: 'Vì sao bây giờ bỏ bớt được' },
      { t: 'p', src: ['S1'], html: `Những lời dặn ấy đã từng rất cần, để tránh các tình huống tệ nhất như lỡ tay xoá nhầm file. Nhưng các ${T('model', 'mô hình AI')} mới đã ${G('phán đoán')} tốt hơn nhiều. Vì thế nhóm Claude Code mới mạnh dạn xoá bớt, và để Claude tự dựa vào ${T('context', 'ngữ cảnh, tức mọi thứ Claude đang nhìn thấy')} xung quanh mà quyết.` },
      { t: 'thenNow', main: true, src: ['S1', 'S3'],
        then: 'Dặn càng nhiều thì càng an toàn.',
        now: `Chỉ cần dặn những điều Claude ${G('không tự thấy')} được. Phần còn lại, cứ để em nó tự phán đoán.`,
        why: 'Trang Best practices của Claude Code nói về những lời khuyên cũ như sau: <q lang="en">Every one of these was good advice when it was written.</q> Tạm dịch: lời khuyên nào trong số này cũng từng là lời khuyên tốt vào lúc nó được viết ra.' },
      { t: 'h', text: 'Những điều chỉ có bạn mới biết' },
      { t: 'list', src: ['S3'], items: [
        'một quy trình mới chỉ nằm trong đầu của một người;',
        'một file tuyệt đối không được mở ra;',
        'một phép kiểm phải qua được thì mới tính là xong;',
        'một khoản ngân sách không được phép vượt.',
      ] },
      { t: 'p', html: `Không có thiết lập mặc định nào biết được mấy điều đó cả. ${G('Điều chỉ bạn biết')} chính là chỗ đáng để bạn bỏ công ra nói cho rõ.` },
      { t: 'h', text: 'Ba chặng của một lần giao việc' },
      { t: 'phases' },
      { t: 'lens', first: true, title: 'Phần việc của bạn trong câu chuyện',
        intro: 'Từ đây cho tới cuối, mọi ví dụ đều đi theo một câu chuyện: studio “1 tỷ gói mè” (hư cấu) ra mắt khoá học online “Chụp đẹp bằng điện thoại”, 12 bài video ngắn dạy người bán hàng online chụp ảnh sản phẩm bằng điện thoại. Cả nhóm có đúng bốn tuần để làm.',
        outro: 'Ở mỗi phần, bạn sẽ thấy phần việc của mình đi qua đúng chặng ấy.',
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
      { t: 'p', html: 'No babysitting không có nghĩa là bỏ mặc cho xong. Đến phần 04, bạn sẽ thấy rõ mình cần giữ lại những việc gì.' },
    ],
    close: {
      line: `Thôi cầm tay chỉ việc không có nghĩa là buông tay hẳn. Bạn vẫn ${G('đặt tay đúng hai chỗ')}: lúc làm rõ công việc, và lúc duyệt kết quả.`,
      prompt: all((id) => `Đây là ${PASTE[id][0]}: [${PASTE[id][1]}]. Hãy chỉ ra giúp tôi: dòng nào bạn vẫn tự làm đúng mà không cần tôi dặn, những dòng nào đang chỏi nhau, và còn điều gì chỉ có tôi biết mà tôi chưa nói ra.`),
    },
    sources: ['S1', 'S3'],
  },

  {
    id: '01', phase: 'Trước', en: 'THE UNKNOWNS', vi: 'Tìm ra những điều mình chưa biết', minutes: 5,
    summary: 'Việc giao đi thường hỏng ở đúng những chỗ mà chính bạn cũng chưa nghĩ tới. Hãy để Claude giúp bạn tìm ra chúng, trước khi em nó bắt tay vào làm.',
    hook: {
      question: 'Bản giao việc đã rõ ràng, Claude cũng làm đúng từng chữ, vậy mà kết quả vẫn trật. Trật ở chỗ nào?',
      bridge: 'Thường thì không phải trật ở Claude đâu. Trật ở những điều bạn chưa nói ra, vì chính bạn cũng chưa kịp nghĩ tới.',
    },
    core: [
      { t: 'h', text: 'Bản đồ không phải là lãnh thổ' },
      { t: 'p', html: `Tất cả những gì bạn đưa cho Claude, từ ${T('prompt', 'câu lệnh bạn gõ')}, các file cho tới skill, mới chỉ là tấm bản đồ. Còn nơi công việc thật sự diễn ra, với khách hàng thật, dữ liệu thật và những ràng buộc thật, mới là lãnh thổ. Anh Thariq Shihipar ở Anthropic gọi những chỗ bản đồ không khớp với lãnh thổ là ${E('unknowns')}, tạm dịch là ${G('điều chưa biết')}.` },
      { t: 'p', src: ['S2'], html: 'Hễ gặp một điều chưa biết là Claude buộc phải đoán xem bạn muốn gì. Việc càng dài thì em nó càng gặp nhiều chỗ phải đoán như thế. Tác giả kể rằng Claude Fable là model đầu tiên khiến chất lượng công việc bị giới hạn bởi chính khả năng làm rõ điều chưa biết của tác giả.' },
      { t: 'h', text: 'Bốn loại điều chưa biết' },
      { t: 'p', html: 'Mỗi lần mang một việc tới cho Claude, tác giả lại chia những gì mình biết ra thành bốn ô:' },
      { t: 'grid4', cells: [
        ['Biết là mình biết.', 'Những điều đã có sẵn trong prompt: bạn muốn gì, và bạn đã nói ra rồi.'],
        ['Biết là mình chưa biết.', 'Những điều bạn biết rõ là mình vẫn chưa nghĩ xong.'],
        ['Không biết là mình biết.', 'Những điều hiển nhiên tới mức bạn chẳng bao giờ viết ra, nhưng hễ nhìn thấy là nhận ra ngay.'],
        ['Không biết là mình không biết.', 'Những điều bạn chưa từng nghĩ tới, kể cả chuyện kết quả có thể tốt tới mức nào.'],
      ] },
      { t: 'p', src: ['S2'], html: 'Người giao việc giỏi thì vẫn có điều chưa biết như ai. Họ chỉ khác ở chỗ luôn tính trước là thế nào cũng có, rồi chủ động đi tìm: trước khi làm, trong khi làm và cả sau khi làm.' },
      { t: 'h', text: 'Ba cách để Claude giúp bạn tìm ra' },
      { t: 'way', no: '1', title: 'Chưa biết là mình chưa biết gì? Hãy nhờ Claude rà điểm mù.',
        html: `Ở một mảng còn lạ, bạn thường không biết nên hỏi gì, thế nào mới gọi là tốt, trước đây người ta đã làm những gì, hay ổ gà nằm ở đâu. Hãy kể cho Claude nghe bạn là ai và đang biết tới đâu, rồi nhờ em nó ${G('rà điểm mù')} giúp. Trong prompt, tác giả dùng nguyên văn hai cụm ${T('blind spot pass', 'một lượt rà điểm mù')} và ${T('unknown unknowns', 'những điều mình không biết là mình không biết')}. Bạn cứ giữ nguyên hai cụm tiếng Anh ấy, vì Claude hiểu chúng rất rõ.`,
        prompt: 'Tôi không biết color grading (chỉnh màu phim) là gì, nhưng tôi cần chỉnh màu cho video này. Hãy dạy cho tôi những unknown unknowns về color grading, để tôi biết cách nhờ bạn cho đúng.' },
      { t: 'way', no: '2', title: 'Phải thấy rồi mới biết mình muốn gì? Hãy xin vài bản nháp để phản ứng.', src: ['S2', 'S6'],
        html: 'Có những tiêu chí mà bạn chỉ nói ra được sau khi đã nhìn thấy: một bố cục, một giọng văn, một bảng màu. Đừng cố ngồi tả làm gì. Hãy xin vài hướng thật khác nhau, đặt trên cùng một trang HTML, rồi chọn lấy cái khiến bạn gật đầu. Sửa vào lúc này rẻ hơn rất nhiều so với sửa khi mọi thứ đã làm xong.',
        prompt: 'Tôi cần một trang giới thiệu khoá học, nhưng tôi không có mắt thẩm mỹ. Hãy làm cho tôi một trang HTML có 4 hướng thiết kế thật khác nhau để tôi chọn.' },
      { t: 'way', no: '3', title: 'Biết là vẫn còn chỗ mơ hồ? Hãy để Claude phỏng vấn bạn.', src: ['S3', 'S2'],
        html: `Khi đã có hướng rồi mà vẫn còn vài chỗ chưa chốt, hãy để Claude ${G('phỏng vấn')} bạn. Em nó sẽ hỏi từng câu một, mỗi câu kèm sẵn vài lựa chọn, cho tới khi đủ để viết thành một ${T('spec', 'bản đặc tả công việc')}. Có spec rồi thì bạn mở một phiên mới để làm. Phiên ấy bắt đầu với context sạch sẽ, cùng một định nghĩa “thế nào là xong” đã được viết ra hẳn hoi.`,
        prompt: 'Hãy phỏng vấn tôi từng câu một về mọi chỗ còn mơ hồ. Hỏi trước những câu mà câu trả lời sẽ làm đổi cách làm. Khi đã đủ thì viết lại tất cả thành file SPEC.md.' },
      { t: 'grill', q: 'Trang này sẽ bán cho ai trước tiên?',
        options: [
          { text: 'Người mới mở shop online, tự chụp ảnh bằng điện thoại', rec: true, back: 'Nhóm này khớp nhất, vì khoá học dạy chụp bằng điện thoại.' },
          { text: 'Shop đã có thợ chụp ảnh riêng', back: 'Đề xuất vẫn là nhóm đầu: khoá học dạy chụp bằng điện thoại, mà nhóm này thì đã có thợ chụp rồi.' },
          { text: 'Người chụp ảnh nghiệp dư muốn lên tay nghề', back: 'Đề xuất vẫn là nhóm đầu: khoá học dạy chụp ảnh sản phẩm để bán hàng, chứ không dạy nhiếp ảnh nói chung.' },
        ],
        why: 'Câu trả lời sẽ làm đổi cả giọng văn, mức giá lẫn bài học thử.' },
      { t: 'note', tag: 'Dùng được cả ở Claude app và Cowork', html: 'Cả ba cách trên đều chỉ là prompt, nên ở đâu có Claude là ở đó bạn dùng được.' },
      { t: 'thenNow', main: true, vi: 'Bớt tả, đưa tham chiếu', en: 'Simple specs → Rich references', src: ['S1'],
        then: 'Viết spec thành một file markdown cho Claude đọc.',
        now: 'Đưa hẳn thứ thật ra: một bản nháp HTML, một file mẫu, một bộ bài kiểm, hay một thang chấm.',
        why: `Claude bây giờ đọc được những ${G('tham chiếu')} phức tạp hơn nhiều so với một file markdown. Bài gốc viết rằng một ${T('mockup', 'bản dựng thử')} bằng HTML thường cho ra kết quả tốt hơn hẳn một đoạn tả thiết kế hay một tấm ảnh chụp màn hình. Thang chấm (${E('rubric')}) cũng là một loại tham chiếu: nó cho Claude biết thế nào là tốt, để em nó tự đối chiếu lấy.` },
      { t: 'thenNow', vi: 'Bớt ví dụ, thiết kế khuôn', en: 'Give Claude examples → Design interfaces', src: ['S1'],
        then: 'Đưa ra vài ví dụ để Claude cứ thế làm theo.',
        now: `Nói cho rõ cái ${G('khuôn')}: việc này gồm những phần nào, và mỗi phần nhận những giá trị nào.`,
        why: 'Với các model mới, ví dụ rất dễ kéo Claude về quanh quẩn đúng vùng của ví dụ ấy. Anthropic đã rút phần mô tả công cụ ghi danh sách việc của Claude Code từ khoảng 9.100 ký tự, vốn toàn là danh sách “khi nào thì dùng” và ví dụ, xuống chỉ còn một câu, ba trạng thái <code>pending</code> (chờ làm), <code>in_progress</code> (đang làm), <code>completed</code> (đã xong), cùng một luật duy nhất: mỗi lúc chỉ có một việc đang làm. Chính cái khuôn ấy đã đủ gợi cho Claude cách dùng công cụ.' },
      { t: 'note', tag: 'Diễn giải của trang', src: ['S1', 'S2'], html: 'Bài gốc nói về công cụ của Claude Code. Còn với công việc của bạn, khuôn chính là cái khung của thứ cần giao: gồm những phần nào, những trường nào, những trạng thái nào. Muốn giữ được giọng văn thì hãy đưa thang chấm, đừng đưa ba bài mẫu để chép theo. Ví dụ vẫn có chỗ đứng của nó, đó là khi bạn thật sự muốn Claude làm y hệt, chẳng hạn chép lại cách một đoạn code đang chạy.' },
      { t: 'lens', title: 'Ở phần việc của bạn', rows: {
        chung: [['Việc', 'Trang giới thiệu khoá học.'],
          ['Điều chưa biết', 'Bạn chưa từng bán khoá học online, nên không biết trang bán khoá học thường cần gì: chính sách hoàn tiền, bài học thử, câu hỏi thường gặp.'],
          ['Cách tìm', 'Nhờ Claude rà điểm mù trước, rồi để Claude phỏng vấn bạn về người học.'],
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
      line: 'Mỗi bài giải thích, mỗi lần động não, mỗi buổi phỏng vấn, mỗi bản nháp và mỗi tham chiếu đều là một cách rẻ để biết ra điều mình chưa biết, trước khi việc sửa nó trở nên đắt đỏ.',
      after: 'Làm rõ xong xuôi rồi mới giao. Phần tiếp theo sẽ nói chuyện giao thế nào để khỏi phải dặn đi dặn lại.',
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
    id: '02', phase: 'Trước', en: 'THE HANDOFF', vi: 'Giao việc: nói ít thôi, và chỉ nói một lần', minutes: 5,
    summary: 'Hãy nói rõ kết quả bạn cần và thế nào thì tính là xong. Còn làm bằng cách nào, cứ để Claude tự phán đoán.',
    hook: {
      question: 'Bạn viết “TUYỆT ĐỐI KHÔNG” in hoa tới ba lần. Claude sẽ nghe lời hơn, hay lại làm quá tay hơn?',
      bridge: 'Theo tài liệu chính thức của Claude Code thì là làm quá tay hơn. Nhấn mạnh chồng lên nhấn mạnh, phần lớn chỉ khiến Claude áp luật quá mức cần thiết.', src: ['S3'],
    },
    core: [
      { t: 'h', text: 'Một bản giao việc tốt chỉ cần ba thứ' },
      { t: 'p', html: `Một ${T('brief', 'bản giao việc')} tốt nói được ba điều: ${G('kết quả')} bạn muốn có, những điều Claude không tự thấy được, và ${G('thế nào là xong')}. Còn làm bằng cách nào thì cứ để Claude lo.` },
      { t: 'p', src: ['S3'], html: `Nếu muốn một bản thật đầy đủ, bạn hãy nói “${T('be ambitious', 'cứ làm cho tới nơi tới chốn')}”. Câu ấy nói về phạm vi công việc, là thứ chỉ có bạn mới biết. Nó không hề bảo Claude phải nghĩ kỹ hơn.` },
      { t: 'thenNow', main: true, vi: 'Bớt luật, tin phán đoán', en: 'Give Claude rules → Let Claude use judgement', src: ['S1'],
        then: '“Mặc định là không viết chú thích. Không bao giờ được viết khối chú thích nhiều dòng.”',
        now: '“Hãy viết sao cho giống với phần đã có xung quanh: cùng độ dày chú thích, cùng cách đặt tên, cùng lối viết.”',
        why: `Hai câu trên được dịch sát từ chỉ dẫn hệ thống cũ và mới của Claude Code. Luật cứng đã từng cần, để tránh những tình huống tệ nhất. Nhưng nó lại sai với một phần các yêu cầu: có người dùng có sở thích riêng, có đoạn code phức tạp thật sự cần chú thích dài. Còn model mới thì đã tự ${G('phán đoán')} được những chuyện ấy rồi.` },
      { t: 'note', tag: 'Diễn giải của trang', html: 'Với công việc của bạn, “giống với phần đã có” chính là giọng văn của fanpage, bộ ảnh bìa đang dùng, hay mẫu báo cáo của tuần trước. Đó đều là những thứ Claude tự đọc được, và chúng thay được cho cả hai chục điều luật.' },
      { t: 'thenNow', vi: 'Bớt nhắc, nói một lần', en: 'Repeat yourself → Simple tool descriptions', src: ['S1', 'S3'],
        then: 'Nhắc đi nhắc lại cùng một điều ở nhiều chỗ, lại còn in hoa lên cho chắc.',
        now: `Chỉ nói ${G('một lần')} thôi, bằng lời lẽ bình thường, ở ${G('đúng chỗ')} mà nó được dùng tới.`,
        why: 'Model cũ đôi khi cần được nhắc lại, và thường nghe những lời dặn ở cuối context hơn là ở đầu. Model bây giờ thì làm theo ngay một dòng viết bình thường; nhấn mạnh chồng chất chỉ khiến nó áp luật quá tay. Nếu một dòng bị lạc mất trong một file dài, điều đó có nghĩa là file ấy cần được rút ngắn lại.' },
      { t: 'p', src: ['S3'], html: `Riêng những luật không được phép sai, như gửi email cho khách hay xoá dữ liệu, thì đừng đặt trong lời dặn. Chúng phải trở thành quyền hạn, hoặc thành ${T('hook', 'đoạn lệnh Claude Code tự chạy ở một thời điểm định sẵn')}, để chính phần mềm Claude Code đứng ra chặn, kể cả khi Claude có muốn làm.` },
      { t: 'h', text: 'Chỉ nói một lần thì nói ở đâu' },
      { t: 'list', src: ['S1', 'S3'], items: [
        `<b>Với Claude Code:</b> một file <code>CLAUDE.md</code> thật gọn, chủ yếu ghi các ${T('gotcha', 'chỗ dễ vấp')}, tức là những điều Claude không tự đọc ra được từ thư mục. Quy trình nào dài thì đưa vào skill; phần 03 sẽ nói tiếp chuyện này.`,
        '<b>Với Cowork:</b> phần hướng dẫn của project (dự án). Đây là một hệ thống khác hẳn với <code>CLAUDE.md</code>.',
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
      line: 'Nói ít không có nghĩa là nói thiếu. Nói ít là nói cho đúng những điều chỉ bạn biết, nói một lần thôi, rồi để Claude lo nốt phần còn lại.',
      prompt: all(() => 'Đây là danh sách những lời dặn tôi hay dùng: [dán vào đây]. Hãy viết lại giúp tôi thành tối đa 5 dòng: giữ lại những điều chỉ có tôi biết, bỏ đi những điều bạn vẫn tự làm đúng, và gộp các dòng nhắc lại nhau. Dòng nào là luật không được phép sai thì hãy đánh dấu riêng ra, vì nó nên trở thành quyền hạn hoặc hook, chứ không nên là lời dặn.'),
    },
    sources: ['S1', 'S3'],
  },

  {
    id: '03', phase: 'Trong', en: 'LET IT WORK', vi: 'Cứ để em nó làm', minutes: 5,
    summary: 'Claude tự biết mở đúng tài liệu và tự ghi nhớ những điều đáng nhớ. Bạn chỉ cần cầm lái khi em nó đi lệch.',
    hook: {
      question: 'Đang làm giữa chừng thì Claude gặp một chỗ mà kế hoạch không lường trước. Bạn muốn em nó dừng lại hỏi, hay cứ tự quyết rồi báo lại sau?',
      bridge: 'Cả hai đều đúng, tuỳ từng chỗ. Mẹo ở đây là nói trước cho Claude biết chỗ nào thì cần hỏi.',
    },
    core: [
      { t: 'h', text: 'Mở một phiên mới, mang theo bản đặc tả' },
      { t: 'p', src: ['S2', 'S3'], html: `Khi đã có ${T('spec', 'bản đặc tả công việc')} rồi, bạn hãy mở một phiên mới để bắt đầu làm. Phiên mới có ${T('context', 'ngữ cảnh')} sạch sẽ, lại mang theo được mọi thứ bạn đã gom góp trong lúc làm rõ.` },
      { t: 'h', text: 'Để Claude ghi lại những chỗ làm khác kế hoạch' },
      { t: 'p', src: ['S2'], html: `Hãy bảo Claude giữ một file ghi chú tên là <code>implementation-notes.md</code>. Mỗi khi gặp chỗ buộc phải ${G('lệch kế hoạch')}, em nó sẽ chọn phương án an toàn hơn, ghi lại vào mục “Lệch kế hoạch”, rồi làm tiếp. Lần sau đọc lại, cả bạn lẫn Claude đều học thêm được một điều.` },
      { t: 'h', text: 'Nói trước chỗ nào thì cần hỏi' },
      { t: 'p', src: ['S3'], html: 'Gặp chỗ còn mơ hồ, Claude sẽ hỏi bạn bằng một câu hỏi có sẵn nhiều lựa chọn. Việc của bạn là quy định từ trước: chỉ hỏi khi câu trả lời làm thay đổi kết quả cuối cùng.' },
      { t: 'thenNow', main: true, vi: 'Bớt nhồi, để nó mở dần', en: 'Put it all upfront → Use progressive disclosure', src: ['S1', 'S5'],
        then: 'Dồn hết mọi hướng dẫn vào một file thật dài, để Claude khỏi bỏ sót điều gì.',
        now: `Chia nhỏ ra thành một cây gồm nhiều file ngắn. Claude sẽ ${G('mở dần')} từng file, đúng cái cần vào đúng lúc cần.`,
        why: `Claude Code bây giờ đã rất giỏi việc nạp đúng context vào đúng lúc. Chính nhóm làm Claude Code cũng đã tách phần rà code và phần kiểm chứng ra thành các ${T('skill', 'bộ hướng dẫn đóng gói sẵn')} riêng, để Claude chỉ gọi tới khi cần. Với skill, Claude chỉ nhìn thấy sẵn một dòng mô tả ngắn; phần nội dung chỉ được nạp vào khi dùng tới. Nhờ vậy, tài liệu có dài mấy cũng gần như chẳng tốn gì cho tới lúc thật sự cần đến.` },
      { t: 'thenNow', vi: 'Để Claude tự nhớ', en: 'Memory in CLAUDE.md files → Auto-memory', src: ['S4', 'S1'],
        then: 'Tự tay ghi từng điều cần nhớ vào file <code>CLAUDE.md</code>.',
        now: `Claude ${G('tự nhớ')} lấy những điều đáng nhớ: vai trò và thói quen làm việc của bạn, những lần bạn sửa em nó, các quyết định của dự án, và nơi tìm thông tin. Em nó tự ghi những điều ấy thành các file ghi chú, còn bạn xem lại và sửa bằng lệnh <code>/memory</code>.`,
        why: `Tính năng này tên là ${T('auto memory', 'bộ nhớ tự động')}. Claude tự quyết định điều gì đáng để nhớ cho những lần làm việc sau, rồi lưu lại thành các file markdown mà bạn mở ra đọc, sửa hay xoá lúc nào cũng được. Những gì đọc lại được từ code thì Claude không ghi, và cũng không phải phiên nào em nó cũng ghi. Muốn chắc chắn thì bạn cứ nói thẳng: “hãy nhớ giúp tôi rằng…”.` },
      { t: 'note', tag: 'Các ghi chú ấy nằm ở đâu', src: ['S4'], html: 'Chuyện Claude có tự nhớ hay không, và chuyện các ghi chú được cất ở đâu, là hai chuyện khác nhau. Về nơi cất: các file ghi chú nằm ngay trên máy đang chạy phiên làm việc, nên chúng không tự theo bạn sang một máy khác hay lên môi trường cloud. Theo tài liệu chính thức, auto memory được bật sẵn ở các phiên chạy trên máy của bạn.' },
      { t: 'note', tag: 'Chỉ có ở Claude Code', html: 'Auto memory và lệnh <code>/memory</code> là của Claude Code. Cowork cũng có bộ nhớ, nhưng đó là một hệ thống riêng, khác hẳn.' },
      { t: 'h', text: 'Bạn cầm lái như thế nào' },
      { t: 'p', src: ['S3'], html: `Hãy xem kỹ ${G('phút đầu')} tiên. Thấy lệch hướng thì bấm phím Esc: Claude sẽ dừng lại ngay, và vẫn giữ nguyên những gì đã làm được. Còn nếu đã sửa tới hai lần mà vẫn sai, bạn hãy gõ <code>/clear</code> để mở lại một phiên sạch, rồi viết một prompt mới gom hết những điều vừa học được. Đừng cố sửa thêm lần thứ ba.` },
      { t: 'p', html: 'Muốn hiểu vì sao một phiên càng dài thì kết quả càng dễ kém đi, bạn đọc thêm ở <a data-href="c02/">Nâng cao A1 · Ngân sách ngữ cảnh</a>.' },
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
      line: `Trong lúc Claude làm, việc của bạn không phải là ngồi canh từng bước. Việc của bạn là cầm ${G('lái')} khi em nó đi lệch, và đọc lại những gì em nó đã ghi.`,
      src: ['S2'],
      prompt: all(() => 'Hãy giữ một file implementation-notes.md. Mỗi khi gặp chỗ buộc phải lệch kế hoạch, bạn hãy chọn phương án an toàn hơn, ghi lại vào mục “Lệch kế hoạch”, rồi làm tiếp. Chỉ dừng lại hỏi tôi khi câu trả lời làm thay đổi kết quả cuối cùng.'),
    },
    sources: ['S1', 'S2', 'S3', 'S4', 'S5'],
  },

  {
    id: '04', phase: 'Sau', en: 'NO BABYSITTING', vi: 'Kiểm kết quả, hỏi vặn lại, rồi từ đó tin tưởng', minutes: 6,
    summary: 'Hãy cho Claude một phép kiểm, đòi em nó đưa bằng chứng, rồi hỏi vặn lại cho ra lẽ. Sau đó thì cứ yên tâm để em nó chạy.',
    hook: {
      question: 'Claude báo lại: “Xong rồi, mọi thứ đều chạy tốt.” Bạn tin câu đó được tới đâu?',
      bridge: 'Nếu chẳng có gì để chạy thử, thì “trông có vẻ xong” là tất cả những gì Claude có trong tay. Khi ấy, chính bạn sẽ thành người kiểm thay cho em nó.', src: ['S3'],
    },
    core: [
      { t: 'h', text: 'Một phép kiểm chỉ trả về đạt hay không đạt' },
      { t: 'p', src: ['S3'], html: `Hãy cho Claude một thứ mà em nó tự chạy được, và kết quả chỉ có hai đường: đạt, hoặc không đạt. Một khi đã có ${G('phép kiểm')} như thế, Claude sẽ tự làm tiếp cho tới khi qua được, còn bạn không phải ngồi xem nữa. Tài liệu chính thức đưa ra vài ví dụ: một file ${T('test', 'bài kiểm thử tự động')}, mã thoát của bản dựng phần mềm, công cụ soát lỗi code (${E('linter')}), một đoạn script so kết quả với mẫu, hay một ảnh chụp trình duyệt đặt cạnh bản dựng thử.` },
      { t: 'note', tag: 'Diễn giải của trang', html: 'Với những việc không phải viết code, phép kiểm có thể là: tổng số khớp với file nguồn · con số nào cũng có link dẫn nguồn · mỗi clip dài tối đa 60 giây · sản phẩm đúng với cái khuôn đã giao.' },
      { t: 'h', text: 'Đòi cho được bằng chứng' },
      { t: 'p', src: ['S3'], html: `${G('Bằng chứng')} là câu lệnh đã chạy kèm theo kết quả của nó, hoặc là một tấm ảnh chụp màn hình. Còn một câu “mọi bài kiểm đều qua cả rồi” mà không kèm theo gì, thì gần như chẳng nói lên được điều gì.` },
      { t: 'h', text: 'Nhờ thêm một người duyệt chưa hề thấy cách làm' },
      { t: 'p', src: ['S3'], html: `Hãy nhờ một ${T('reviewer', 'người duyệt, ở đây là một phiên Claude khác')} mở trong context mới tinh, đối chiếu kết quả với bản SPEC. Nhớ dặn nó chỉ báo những chỗ ảnh hưởng tới tính đúng sai, và bỏ qua chuyện văn phong. Bởi một reviewer đã được nhờ đi tìm lỗi thì kiểu gì cũng sẽ tìm ra được một cái gì đó.` },
      { t: 'thenNow', main: true, src: ['S3'],
        then: 'Dặn Claude rằng “cứ làm tiếp đi, đừng có lười, lặp lại cho tới khi xong”.',
        now: 'Cho Claude một phép kiểm buộc phải qua. Với những việc chạy mà không có ai ngồi xem, hãy dùng lệnh <code>/goal</code> hoặc Stop hook.',
        why: 'Hàng này được lấy từ bảng <em lang="en">What you can stop doing</em> (những việc bạn có thể thôi làm) của trang Best practices. Lệnh <code>/goal</code> đặt ra một điều kiện “xong” để Claude làm tiếp tới khi đạt; Stop hook là đoạn lệnh tự chạy mỗi khi Claude định dừng. Cả hai đều là tính năng của Claude Code.' },
      { t: 'h', text: 'Đảo vai: bây giờ tới lượt bạn hỏi vặn Claude' },
      { t: 'p', src: ['S2', 'S14'], html: `Hãy bắt Claude làm một bản báo cáo HTML về những gì đã thay đổi, và cuối báo cáo phải có vài câu đố dành cho bạn. Tác giả bài field guide chỉ chịu gộp thay đổi vào bản chính khi đã trả lời đúng hết các câu đố ấy. Trong kho mẹo của cộng đồng còn có hai câu của anh Boris Cherny, dùng để ${G('hỏi vặn')} theo cả hai chiều: <q lang="en">grill me on these changes and don’t make a PR until I pass your test</q> (hãy hỏi vặn tôi về các thay đổi này, và đừng gửi lên cho tới khi tôi qua được bài kiểm của bạn), và <q lang="en">prove to me this works</q> (hãy chứng minh cho tôi thấy là nó chạy được).` },
      { t: 'grill', q: 'Thông báo thanh toán của cùng một đơn bị gửi tới hai lần. Trang sẽ xử lý thế nào?',
        options: [
          { text: 'Mở khoá bài học hai lần', back: 'Chưa đúng. Lần thứ hai sẽ bị bỏ qua, vì đơn hàng đã ở trạng thái “đã thanh toán” rồi.' },
          { text: 'Bỏ qua lần thứ hai, nhờ có mã đơn', rec: true, back: 'Lần thứ hai bị bỏ qua, vì đơn hàng đã ở trạng thái “đã thanh toán” rồi.' },
          { text: 'Báo lỗi cho học viên', back: 'Chưa đúng. Lần thứ hai sẽ bị bỏ qua, vì đơn hàng đã ở trạng thái “đã thanh toán” rồi.' },
        ],
        why: 'Nếu bạn trả lời sai, tức là bạn chưa hiểu thay đổi này đủ để duyệt nó.' },
      { t: 'h', text: 'Trước khi để Claude chạy một mình: 5 câu hỏi' },
      { t: 'list', ordered: true, src: ['S3'], items: [
        'Claude đã biết thế nào là xong chưa?',
        'Claude có tự kiểm được kết quả của mình không?',
        'Claude được phép chạm vào những đâu?',
        'Điều gì sẽ khiến Claude dừng lại?',
        'Kết quả sẽ đi về đâu, và ai là người ký duyệt?',
      ] },
      { t: 'h', text: 'No babysitting không phải là bỏ mặc' },
      { t: 'p', src: ['S3'], html: 'Phần việc còn lại của bạn là khởi đầu công việc, quyết định xem lần này “xong” nghĩa là gì, và duyệt ở khâu cuối. Tài liệu chính thức viết rằng không có cách cấu hình nào thay được việc xem kỹ phút đầu tiên.' },
      { t: 'h', text: 'Nhìn lại cả sáu dịch chuyển' },
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
      line: `Thôi cầm tay chỉ việc: hãy cùng Claude làm rõ công việc, giao trọn phần thực thi, cho em nó một phép kiểm, rồi yên tâm ${G('buông')} tay. Bạn chỉ giữ lại đúng hai việc: quyết định thế nào là xong, và ${G('duyệt')} những gì không hoàn tác được.`,
      src: ['S2'],
      prompt: all(() => 'Tôi muốn chắc chắn là mình hiểu hết những gì vừa thay đổi. Hãy làm cho tôi một bản báo cáo HTML: bạn đã làm những gì, vì sao làm vậy, và còn những rủi ro nào. Cuối báo cáo hãy đặt 5 câu hỏi; tôi phải trả lời đúng hết thì mới duyệt.'),
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
  { label: 'Trước', line: 'Cùng Claude làm rõ công việc, rồi mới giao cho thật gọn.', parts: ['01', '02'] },
  { label: 'Trong', line: 'Cứ để em nó tự tìm, tự nhớ. Bạn chỉ cầm lái khi em nó đi lệch.', parts: ['03'] },
  { label: 'Sau', line: 'Cho em nó một phép kiểm, hỏi vặn lại kết quả, rồi mới yên tâm buông tay.', parts: ['04'] },
];

export const partOf = (id: string) => PARTS.find((p) => p.id === id)!;
