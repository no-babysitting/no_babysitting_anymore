/* Six kinds of digital work for the home page's delegation run (docs/10-script-v3-proposal.md §5, approved 07/11/2026).
   Every tool says how Claude gets to it; examples are illustrative and the page labels them so (docs/08 §3). */

export type Avail = 'builtin' | 'connector' | 'cli' | 'browser' | 'other';
export const AVAIL: Record<Avail, { label: string; mark: string }> = {
  builtin: { label: 'có sẵn', mark: 'is-signal' },
  connector: { label: 'cần connector/MCP', mark: 'is-warn' },
  cli: { label: 'cần CLI ngoài', mark: 'is-warn' },
  browser: { label: 'cần tiện ích trình duyệt', mark: 'is-warn' },
  other: { label: 'hợp sản phẩm khác', mark: 'is-muted' },
};

export interface Tool { name: string; avail: Avail; note?: string }
export interface Check { text: string; ok: boolean; fix?: string }
export interface WorkType {
  id: string;
  label: string;
  outcome: string;
  brief: [string, string][];
  restate: string;
  ask: string;
  tools: Tool[];
  plan: string[];
  lanes: number;
  log: string[];
  checks: Check[];
  deliver: string;
  approve: string;
  surface: string;
  chapters: string[];
}

export const WORK: WorkType[] = [
  {
    id: 'ops', label: 'Vận hành',
    outcome: 'Mỗi thứ Hai 8 giờ, gom cập nhật từ Slack, Jira và email thành báo cáo tuần, gửi kênh điều hành.',
    brief: [['3', 'nguồn'], ['1', 'báo cáo'], ['08:00', 'thứ Hai']],
    restate: 'Gom việc xong, việc trễ và rủi ro của tuần, mỗi dòng có link về nguồn.',
    ask: 'Việc trễ hạn tính theo Jira hay theo email?',
    tools: [{ name: 'Slack', avail: 'connector' }, { name: 'Jira', avail: 'connector' }, { name: 'Email', avail: 'connector' }, { name: 'Lịch chạy mỗi thứ Hai', avail: 'other', note: 'lịch chạy của Cowork, hoặc lịch chạy trên cloud của Claude Code (research preview)' }],
    plan: ['Đọc ba nguồn của tuần', 'Lọc trùng, xếp theo dự án', 'Viết nháp theo mẫu báo cáo', 'Đối chiếu số việc trễ với Jira'],
    lanes: 3,
    log: ['Đọc #du-an-a, #du-an-b', 'Lấy 42 issue từ Jira', 'Lọc 9 mục trùng', 'Viết nháp báo cáo'],
    checks: [
      { text: 'Mỗi dòng có link về nguồn', ok: true },
      { text: 'Số việc trễ hạn khớp Jira', ok: true },
      { text: 'Không còn mục của tuần trước', ok: false, fix: 'Gỡ 1 mục đã đóng từ tuần trước' },
    ],
    deliver: 'Bản nháp báo cáo tuần, kèm bảng nguồn.',
    approve: 'Lần đầu bạn duyệt trước khi gửi; gửi lên kênh là hành động không hoàn tác được.',
    surface: 'Cowork, hoặc lịch chạy trên cloud của Claude Code',
    chapters: ['02', '04'],
  },
  {
    id: 'content', label: 'Marketing',
    outcome: 'Từ brief sản phẩm, viết bộ nội dung ra mắt: landing copy, 5 bài social, 3 email, đúng giọng thương hiệu.',
    brief: [['9', 'mẩu nội dung'], ['3', 'kênh'], ['1', 'giọng']],
    restate: 'Một thông điệp chính, chín biến thể theo kênh, không claim nào thiếu căn cứ.',
    ask: 'Có claim nào bộ phận pháp lý không cho dùng không?',
    tools: [{ name: 'Thư mục brand guide và chiến dịch cũ', avail: 'builtin' }, { name: 'Trang đối thủ', avail: 'builtin', note: 'tra web' }, { name: 'Đăng bài', avail: 'connector', note: 'luôn hỏi trước khi đăng' }],
    plan: ['Chốt thông điệp chính', 'Viết biến thể cho từng kênh', 'Reviewer mới đối chiếu với brief'],
    lanes: 2,
    log: ['Đọc brand guide', 'Tra 4 trang đối thủ', 'Viết 9 bản nháp', 'Gửi reviewer'],
    checks: [
      { text: 'Độ dài đúng từng kênh', ok: true },
      { text: 'Giọng khớp brand guide', ok: true },
      { text: 'Claim nào cũng có căn cứ', ok: false, fix: 'Gỡ một claim "nhanh nhất thị trường" chưa có số liệu' },
    ],
    deliver: 'Tài liệu nội dung và lịch đăng.',
    approve: 'Bạn duyệt trước khi đăng; đăng bài cần quyền bạn cho.',
    surface: 'Cowork hoặc Claude Code',
    chapters: ['01', '02'],
  },
  {
    id: 'research', label: 'Nghiên cứu',
    outcome: 'Tổng hợp 15 nguồn về thị trường xe điện Đông Nam Á thành brief 2 trang có trích dẫn, trước 9 giờ thứ Hai.',
    brief: [['15', 'nguồn'], ['2', 'trang'], ['3', 'câu hỏi'], ['09:00', 'hạn']],
    restate: 'Trả lời ba câu hỏi bằng số liệu có nguồn; chỗ nguồn mâu thuẫn thì ghi cả hai.',
    ask: 'Ưu tiên số liệu năm nay hay xu hướng 5 năm?',
    tools: [{ name: 'Tra web', avail: 'builtin', note: 'trừ phiên trên Amazon Bedrock' }, { name: 'PDF trong thư mục', avail: 'builtin', note: 'PDF dài cần poppler' }, { name: 'Google Drive', avail: 'connector' }],
    plan: ['Chia 15 nguồn thành 3 nhóm', '3 subagent đọc song song', 'Tổng hợp, đánh dấu chỗ mâu thuẫn'],
    lanes: 3,
    log: ['Tra web "EV Đông Nam Á"', 'Đọc 6 PDF', 'Ghi 31 trích dẫn', 'Viết brief'],
    checks: [
      { text: 'Số liệu nào cũng có link', ok: true },
      { text: 'Link còn mở được', ok: true },
      { text: 'Không dùng số liệu cũ', ok: false, fix: 'Thay một số liệu 2023 bằng bản 2026' },
    ],
    deliver: 'brief.md và bảng nguồn.',
    approve: 'Bạn đọc và duyệt trước khi gửi đi.',
    surface: 'Claude Code hoặc Cowork',
    chapters: ['01', '04'],
  },
  {
    id: 'data', label: 'Dữ liệu',
    outcome: 'Từ 3 file xuất CRM và sheet chi phí, dựng dashboard hiệu quả chiến dịch tháng 10, kèm 5 nhận định.',
    brief: [['3', 'file'], ['5', 'nhận định'], ['0,5%', 'lệch tối đa']],
    restate: 'Một dashboard và năm nhận định, tổng phải khớp file nguồn.',
    ask: 'Doanh thu tính theo ngày chốt hay ngày tạo đơn?',
    tools: [{ name: 'File CSV', avail: 'builtin' }, { name: 'File .xlsx', avail: 'builtin', note: 'đọc qua script hoặc skill' }, { name: 'Google Sheets', avail: 'connector' }],
    plan: ['Làm sạch', 'Ghép bảng', 'Tính chỉ số', 'Vẽ và viết nhận định'],
    lanes: 1,
    log: ['Chạy script làm sạch', 'Ghép 3 bảng', 'Tính CPA, ROAS', 'Dựng dashboard'],
    checks: [
      { text: 'Tổng doanh thu khớp file nguồn', ok: true },
      { text: 'Số dòng khớp sau khi ghép', ok: false, fix: 'Bắt 37 dòng trùng, ghép lại' },
      { text: 'Biểu đồ đúng thang', ok: true },
    ],
    deliver: 'Dashboard và script chạy lại được.',
    approve: 'Bạn xem nhận định trước khi chia sẻ.',
    surface: 'Claude Code hoặc Cowork',
    chapters: ['04', 'c02'],
  },
  {
    id: 'build', label: 'Dựng sản phẩm',
    outcome: 'Từ PRD 1 trang, dựng prototype web đặt lịch hẹn chạy được, có test.',
    brief: [['1', 'PRD'], ['4', 'màn hình'], ['0', 'thư viện mới']],
    restate: 'Bốn màn hình theo PRD, dùng component sẵn có, test và build phải xanh.',
    ask: 'Bản đầu có cần đăng nhập không?',
    tools: [{ name: 'Repo và component sẵn có', avail: 'builtin' }, { name: 'Chạy test, build, dev server', avail: 'builtin' }, { name: 'Chụp màn hình so với mẫu', avail: 'browser' }],
    plan: ['Plan theo lát dọc', 'Lát 1: đặt lịch', 'Lát 2: xem lịch', 'Reviewer mới so với PRD'],
    lanes: 2,
    log: ['Đọc PRD', 'Sửa 7 file', 'Chạy test', 'Chụp màn hình'],
    checks: [
      { text: 'Build xanh', ok: true },
      { text: 'Test xanh', ok: false, fix: 'Sửa một test đỏ ở màn đặt lịch' },
      { text: 'Ảnh chụp khớp mẫu', ok: true },
    ],
    deliver: 'Pull request kèm ảnh chụp.',
    approve: 'Bạn review và merge.',
    surface: 'Terminal hoặc IDE kèm Claude in Chrome, hoặc ứng dụng desktop',
    chapters: ['03', '04'],
  },
  {
    id: 'media', label: 'Sáng tạo',
    outcome: 'Cắt 12 video phỏng vấn thành 24 clip dọc 30 giây, có phụ đề tiếng Việt.',
    brief: [['12', 'video'], ['24', 'clip'], ['30s', 'mỗi clip'], ['9:16', 'khung']],
    restate: 'Hai đoạn hay nhất mỗi video, cắt dọc, phụ đề khớp lời.',
    ask: 'Phụ đề theo đúng lời nói hay đã biên tập?',
    tools: [{ name: 'Thư mục video', avail: 'builtin', note: 'chỉ thao tác file' }, { name: 'ffmpeg', avail: 'cli' }, { name: 'Nhận dạng giọng nói', avail: 'cli' }],
    plan: ['Skill "cắt clip" với các bước cố định', 'Tách lời, chọn đoạn', 'Cắt, gắn phụ đề, xuất 9:16'],
    lanes: 2,
    log: ['Tách lời 12 video', 'Chọn 24 đoạn', 'Cắt bằng ffmpeg', 'Gắn phụ đề'],
    checks: [
      { text: 'Mỗi clip ≤ 30 giây', ok: true },
      { text: 'Đúng khung 9:16', ok: true },
      { text: 'Phụ đề khớp giờ', ok: false, fix: 'Chỉnh một phụ đề lệch 0,8 giây' },
    ],
    deliver: 'Thư mục 24 clip và bảng mốc giờ.',
    approve: 'Bạn xem trước khi đăng.',
    surface: 'Phiên Claude Code chạy trên máy có ffmpeg',
    chapters: ['01'],
  },
];
