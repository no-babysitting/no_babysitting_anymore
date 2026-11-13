# 06 · Nguồn và liên kết (bắt buộc cho người làm tiếp)

> Phiên bản 1.0 · 07/11/2026. Tài liệu này gom **mọi link nguồn đã dùng** trong giai đoạn trước phát triển và đặt ra **quy tắc bắt buộc**: nội dung nào trên site cũng phải có link để người học tự đối chiếu nguồn.

## 1. Quy tắc bắt buộc cho người làm tiếp

1. **Mọi con số, trích dẫn, tip, bước "Cách làm" và nhãn độ bền** hiển thị trên site phải có ít nhất một nguồn bấm được. Không có link thì không đăng (hoặc gắn nhãn "Diễn giải của trang" và nói rõ không có nguồn).
2. **Link tới bản gốc, không tới bản tóm tắt.** Docs chính thức, trang repo, bài blog, video. Với tip trong repo: link tới đúng file/mục trong repo *và* tới nguồn gốc của tip (tweet, bài viết) nếu repo có.
3. **Mỗi nguồn ghi đủ:** loại (Docs · Repo · Blog · Video · Nghiên cứu của trang), người hoặc tổ chức, ngày xuất bản (nếu có), **`verifiedAt`** (ngày trang đã mở và kiểm tra), và trích nguyên văn ngắn khi là số liệu hoặc lời của người.
4. **Dữ liệu nguồn nằm trong content, không viết cứng trong code:** mỗi beat và mỗi đơn vị Library có `sources: SourceRef[]` (SAD §7.2b). `SourceRef = { url, title, kind, author?, publishedAt?, verifiedAt, quote? }`.
5. **Cổng kiểm tra:** build fail nếu có beat, con số hoặc đơn vị Library không có nguồn; CI hằng tháng chạy link checker (link chết, chuyển hướng, đổi tiêu đề) và nhắc kiểm chứng lại mục có `verifiedAt` quá 30 ngày. Link nội bộ của docs không được dùng đuôi `.md` khi hiển thị cho người học (đó là dạng markdown thô); kiểm tra lại từng link trước khi đăng.
6. **Nút "Nguồn" (SourceButton) là một thành phần giao diện quan trọng và phải được thiết kế đẹp**, không phải chú thích nhỏ cuối trang. Xem §2.
7. **Khi nguồn mâu thuẫn:** hiện cả hai nguồn cạnh nhau (ContradictionNote); docs chính thức là chuẩn (PRD §11).
8. **Ngoại lệ có phạm vi: mục Bài viết** (D63, `24-articles-section-plan.md`). Mục 1 vẫn đúng: con số và câu trích có link bấm được, đặt ngay trong đoạn. Mục 3–5 áp dụng ở dạng nhẹ: không có `SourceRef[]` và `SourceButton` cho từng nguồn; cả bài có **một `verifiedAt`** (ngày mở nguồn gần nhất, dạng `YYYY-MM-DD`), hiện cho người đọc là ngày thu thập thông tin; số hay đổi (giá, benchmark, mức mặc định, giới hạn) kèm ngày ngay trong câu; thiếu nguồn không làm build fail.

## 2. Đặc tả SourceButton (yêu cầu thiết kế)

Mục tiêu: người học luôn biết "điều này lấy từ đâu" và mở được bản gốc trong một thao tác, mà không rời mạch học.

| Hạng mục | Yêu cầu |
|---|---|
| Vị trí | Cuối mỗi khối **HIỂU**, cạnh mỗi con số lớn, trên mỗi thẻ Library và trong mỗi khối "Cách làm". Luôn nhìn thấy, không chỉ hiện khi hover |
| Hình thức | Nút khung vuông theo hệ thiết kế: `[ NGUỒN · 3 ↗ ]` (số nguồn), mono hoa, viền `control`, hover đảo màu như `.nb-btn`; ô vuông ■ accent chỉ hiện khi có nguồn mâu thuẫn. Không dùng icon xã giao hay emoji |
| Mở ra | Bấm mở **bảng nguồn** (popover trên desktop, bottom sheet trên mobile): mỗi nguồn một hàng gồm loại (nhãn `Docs/Repo/Blog/Video`), tiêu đề, người · ngày, `verifiedAt`, trích nguyên văn ngắn, nút `[ MỞ BẢN GỐC ↗ ]` và `[ SAO CHÉP LINK ]` |
| Chuyển động | Mở bảng bằng M4 (decode nhãn) + fade ngắn `dur-quick`; không trượt xa. Reduced motion: hiện thẳng |
| Trạng thái | thường · hover · focus (vòng focus `focus-ring`) · đang mở · link chết (nhãn cảnh báo, vẫn hiện bản lưu trích dẫn) · chưa kiểm chứng lại quá 30 ngày (nhãn `warn`) |
| Bàn phím và a11y | Là `<button>` điều khiển một vùng `role="dialog"` không chặn trang; `aria-expanded`; Esc đóng và trả focus; link mở tab mới có `rel="noopener"` và chữ báo "mở tab mới"; tên nút đọc được ("Nguồn của khối này, 3 nguồn") |
| Presenter mode | Phím tắt mở bảng nguồn ở beat hiện tại; có chế độ ẩn nút trên màn chiếu nhưng vẫn truy cập được bằng phím |
| Kiểm thử | Snapshot 3 bề rộng × 2 theme; axe 0 vi phạm; link checker; chuỗi tiếng Việt dài không bị cắt |

Người làm tiếp cần **thiết kế và duyệt bản preview của SourceButton** (thêm vào design system như một component, ví dụ `SourceButton`) trước khi áp dụng đại trà; `SourceBadge` hiện tại (chip mono nhỏ) chỉ là dạng thu gọn của thành phần này.

## 3. Nguồn gốc của dự án

| Nguồn | Link | Dùng cho |
|---|---|---|
| Repo best practice (nguồn nội dung chính) | https://github.com/shanraisshan/claude-code-best-practice | Toàn bộ Library; bản clone dùng ở commit `722071c` (06/11/2026) |
| GSAP (thư viện) | https://github.com/greensock/GSAP | Chuyển động; ghim 3.15.0 |
| GSAP agent skills | https://github.com/greensock/gsap-skills | Quy ước viết GSAP đúng cách |
| Anthropic skills (tham chiếu) | https://github.com/anthropics/skills | Ví dụ skill chính thức |
| Bài "The new rules of context engineering for Claude 5 generation models" (Thariq Shihipar, 24/07/2026), nguồn của six shifts | https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models | Six shifts, Then → Now. *Lưu ý:* tiêu đề trang bản đã tải ghi "claude.dev Blog"; kiểm tra lại URL chuẩn trước khi đăng |
| Repo asciify (build-time, MIT) | https://www.npmjs.com/package/asciify-engine | Chuyển ảnh/video sang ASCII lúc build; ghim bản ≥ 2 tuần tuổi |

## 4. Docs và bài chính thức đã đọc (kiểm chứng 06–07/11/2026)

**Model, effort, chi phí (chương 05b):**
- https://code.claude.com/docs/en/model-config
- https://code.claude.com/docs/en/fast-mode
- https://code.claude.com/docs/en/advisor
- https://claude.com/blog/the-advisor-strategy (09/04/2026; số liệu thuộc thế hệ 4.6)
- https://platform.claude.com/docs/en/about-claude/models/choosing-a-model
- https://platform.claude.com/docs/en/build-with-claude/effort
- https://code.claude.com/docs/en/best-practices (khung đối chiếu cho mọi chương; xem Script §0.11)
- https://code.claude.com/docs/en/remote-control

**Claude Code theo chủ đề (ma trận bề mặt, `05-surface-matrix.md`):**
- Tổng quan và cài đặt: https://code.claude.com/docs/en/overview · https://code.claude.com/docs/en/quickstart · https://code.claude.com/docs/en/platforms · https://code.claude.com/docs/en/common-workflows
- Context, phiên, tua lại: https://code.claude.com/docs/en/context-window · https://code.claude.com/docs/en/sessions · https://code.claude.com/docs/en/checkpointing
- Bộ nhớ: https://code.claude.com/docs/en/memory
- Skill, command, subagent, plugin: https://code.claude.com/docs/en/skills · https://code.claude.com/docs/en/commands · https://code.claude.com/docs/en/sub-agents · https://code.claude.com/docs/en/plugins/install
- Công cụ và rào chắn: https://code.claude.com/docs/en/mcp · https://code.claude.com/docs/en/permissions · https://code.claude.com/docs/en/permission-modes · https://code.claude.com/docs/en/sandboxing · https://code.claude.com/docs/en/hooks · https://code.claude.com/docs/en/hooks-guide · https://code.claude.com/docs/en/tools-reference
- Kiểm chứng và rà soát: https://code.claude.com/docs/en/code-review · https://code.claude.com/docs/en/code-review-local · https://code.claude.com/docs/en/chrome · https://code.claude.com/docs/en/computer-use
- Làm theo nhóm, workflow: https://code.claude.com/docs/en/agent-teams · https://code.claude.com/docs/en/agent-view · https://code.claude.com/docs/en/workflows · https://code.claude.com/docs/en/worktrees
- Việc định kỳ, ở mọi nơi: https://code.claude.com/docs/en/scheduled-tasks · https://code.claude.com/docs/en/routines · https://code.claude.com/docs/en/desktop-scheduled-tasks · https://code.claude.com/docs/en/goal · https://code.claude.com/docs/en/slack · https://code.claude.com/docs/en/github-actions · https://code.claude.com/docs/en/mobile
- Các bề mặt app: https://code.claude.com/docs/en/desktop · https://code.claude.com/docs/en/desktop-quickstart · https://code.claude.com/docs/en/claude-code-on-the-web · https://code.claude.com/docs/en/web-quickstart · https://code.claude.com/docs/en/vs-code · https://code.claude.com/docs/en/jetbrains · https://code.claude.com/docs/en/artifacts

**Cowork, Claude Tag và trung tâm hỗ trợ:**
- https://claude.com/product/cowork · https://claude.com/docs/cowork/overview · https://claude.com/docs/cowork/guide/projects · https://claude.com/docs/cowork/guide/dispatch · https://claude.com/docs/cowork/changelog
- https://claude.com/resources/articles/cowork-is-now-claude · https://claude.com/blog/cowork-plugins · https://claude.com/blog/how-anthropic-teams-use-claude-code
- https://claude.com/resources/guides/deploying-claude-across-your-organization/how-anthropic-teams-use-cowork
- https://claude.com/docs/claude-tag/overview · https://claude.com/docs/claude-tag/users/proactivity
- https://support.claude.com/en/articles/13345190-get-started-with-cowork · https://support.claude.com/en/articles/14116274-organize-your-tasks-with-claude-cowork · https://support.claude.com/en/articles/15520349-use-claude-cowork-on-web-desktop-and-mobile
- https://support.claude.com/en/articles/12512180-using-skills-in-claude · https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome · https://support.claude.com/en/articles/9487310-what-are-artifacts-and-how-do-i-use-them · https://support.claude.com/en/articles/12138966-release-notes

*Một số link ở trên được ghi nhận ở dạng `.md` trong dữ liệu nghiên cứu; khi đưa lên site dùng dạng không có đuôi `.md` và kiểm tra lại (quy tắc 5).*

**Bài blog chính thức tháng 10/2026 (chỉ biết tiêu đề và ngày từ mục "Related posts" của bài six shifts; chưa có URL, chưa đọc nội dung; người làm tiếp phải tìm link chuẩn và đọc trước khi viết):**
- *How the Claude Code team does code review* (15/10/2026) → chương 07
- *Building effective agent automations* (08/10/2026) → chương 09
- *Claude Code in the cloud: a field guide to cloud sessions* (06/10/2026) → chương 09
- *Getting started with Claude Code mods* (01/10/2026) → Library, Đào sâu của c06

## 5. Reference thị giác (chỉ học quy tắc, không chép)

- https://aino.agency/ · https://wrdlss.club/ · https://elvas.studio/work/deified-brand-identity-website-and-motion/ · https://asciify.org/ · https://artefakt.mov/ · video Polsia do chủ dự án cung cấp (chưa có link trong tài liệu; bổ sung nếu có)
- Ảnh chụp và ghi chú: thư mục `screenshots/references/` của gói handoff; khảo sát và quy tắc rút ra ở `03-design-system.md` §12.11.

## 6. Tư liệu nghiên cứu nội bộ (trong gói handoff)

| Thư mục | Nội dung |
|---|---|
| `research/knowledge-base/` | Ghi chú đọc 3 repo nguồn (concepts, tips, workflows, voices, pedagogy, GSAP) |
| `research/surface-verification/` | Nghiên cứu theo bề mặt và ca sử dụng non-coding, kèm vòng kiểm chứng (JSON) và bản tóm tắt (TXT); mỗi tuyên bố có URL docs |

## 7. Nhật ký giới hạn kiểm chứng

- Các ý model/effort đã đối chiếu nguyên văn ngày 07/11/2026 (Script, c05b). Bảng *What you can stop doing* của trang Best practices chỉ đọc được phần giải thích qua bản tóm tắt của công cụ; **mở trang đọc nguyên văn** trước khi viết c02 và c05.
- Trước khi đăng bất kỳ link nào: mở link, đối chiếu tiêu đề và ngày, ghi `verifiedAt`.
