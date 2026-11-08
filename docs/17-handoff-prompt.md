# 17 · Prompt giao cho coding agent: dựng nội dung v4 (08/11/2026)

> Chủ dự án dán phần §1 vào một phiên Claude Code mới, mở trên repo này. Phần §2 giải thích vì sao prompt được viết như vậy. Phần §3 là danh sách tham chiếu mà prompt trỏ tới.

## 1. Prompt

```text
Bạn tiếp quản phần nội dung của No Babysitting: repo no-babysitting/no_babysitting_anymore, site Astro trong site/, design system trong design-system/. Trang đang chạy ở https://no-babysitting.github.io/no_babysitting_anymore/.

Mục tiêu: thay nội dung hiện tại bằng lộ trình chính mới, gồm 5 phần Trước, Trong, Sau xoay quanh six shifts, để trang sẵn sàng cho mọi người vào học. Học xong, người đọc phải tự giao trọn được một việc cho Claude mà không phải ngồi trông. Đợt này chỉ làm chữ, typography, hiệu ứng chữ, art ASCII mở chương và mascot. Chưa dựng mô phỏng mới.

Đọc khi cần, theo thứ tự này:
- docs/14-content-script-v4.md: kịch bản (kim tự tháp, trang chủ, 5 phần, câu chuyện chung, kính theo vai). Phần 01 đã viết đủ chữ. Hãy dùng nó làm tham chiếu về giọng và độ dài; các phần khác có nội dung riêng, đừng chép khung câu của 01.
- docs/16-writing-guide.md: văn phong tiếng Việt và tiếng Anh. Đọc trước khi viết câu nào.
- docs/15-typography-motion-v4.md: vai chữ, golden word, điểm dừng, hiệu ứng M15–M17, art mở chương, mascot, kính, cách đo.
- Khi đụng tới code: design-system/SOURCE-OF-TRUTH.md, docs/09, docs/11, docs/13, và chính các component đang có. Code hiện tại là tham chiếu tốt nhất về cách dự án này làm; c02 là chương duy nhất đã viết xong.

Thế nào là xong (chi tiết ở docs/14 §11):
- chữ khớp kịch bản và văn phong;
- con số, tên tính năng, câu trích nào cũng có nguồn bấm được, chỗ diễn giải có nhãn;
- check.cjs, type-check.cjs (kèm --selftest) và design-check.cjs đều xanh, có thêm phép đo cho các luật mới;
- tắt chuyển động thì vẫn đọc được đủ.

Hai việc không có ngoại lệ:
- PR có câu chữ mới chỉ được merge sau khi chủ dự án duyệt. PR chỉ đổi code, hiệu ứng hay hạ tầng thì bạn tự merge khi các bộ kiểm xanh.
- Không bịa. Kịch bản có chỗ nào khác với nguồn chính thức ở docs/17 §3 thì theo nguồn và ghi lại.

Cách làm với chủ dự án (taiseixx, viết tiếng Việt):
- Trước khi bắt tay, làm một blind spot pass trên repo và trên kịch bản.
- Điều gì còn mơ hồ mà câu trả lời làm đổi cấu trúc thì hỏi chủ dự án từng câu một, kèm đề xuất của bạn. Điều nhỏ thì tự quyết và ghi lại.
- Art mở chương và mascot là những thứ chủ dự án chỉ biết mình muốn gì khi đã nhìn thấy. Hãy làm trước một trang HTML với vài hướng cho mỗi thứ để chủ dự án chọn, rồi mới dựng vào site.
- Giữ một file implementation-notes.md. Gặp chỗ buộc phải lệch kịch bản, chọn phương án an toàn hơn, ghi vào mục "Lệch kịch bản" rồi làm tiếp.
- Mỗi PR nội dung kèm một trang HTML ngắn: đã đổi gì, vì sao, còn rủi ro gì. Cuối trang có vài câu hỏi để chủ dự án tự kiểm trước khi duyệt.

Thứ tự gợi ý:
1. Gỡ những thứ đã bỏ (docs/14 §9).
2. Khung trang và dữ liệu của 5 phần.
3. Trang chủ cùng phần 00 và 01.
4. Phần 02, 03, 04, mỗi phần một PR.
5. Art, mascot, kính: có thể làm song song, sau khi chủ dự án đã chọn hướng.
```

## 2. Prompt này theo six shifts thế nào

| Shift | Trong prompt |
|---|---|
| **Bớt luật, tin phán đoán** | Prompt nói mục tiêu, lý do và thế nào là xong. Chỉ giữ hai luật thật sự không có ngoại lệ: duyệt chữ (D13) và không bịa. Mọi thứ khác để agent tự quyết rồi ghi lại |
| **Bớt ví dụ, thiết kế khuôn** | Không đưa ví dụ code để chép. Agent được trỏ tới khuôn dữ liệu của một phần (14 §3), bảng vai chữ, các mã hiệu ứng và bảng luật đo, tức là những "giao diện" mà việc phải khớp vào |
| **Bớt nhồi, để nó mở dần** | Prompt ngắn; chi tiết nằm trong một cây file, mỗi file ghi rõ khi nào cần đọc. Danh sách docs chính thức có `llms.txt` để agent tự tìm thêm trang |
| **Bớt nhắc, nói một lần** | Mỗi điều nói đúng một lần, bằng lời thường, không in hoa, không "QUAN TRỌNG" |
| **Để Claude tự nhớ** | Không bắt chép luật vào CLAUDE.md: luật đã nằm trong docs, auto memory tự ghi điều đáng nhớ. Riêng quyết định và chỗ lệch thì ghi vào `implementation-notes.md` để chủ dự án đọc được (theo bài field guide) |
| **Bớt tả, đưa tham chiếu** | Đưa thứ thật thay cho lời tả: phần 01 viết đủ, chương c02 đang chạy, code của các component, trang đang chạy, cùng danh sách nguồn chính thức ở §3 |

Prompt cũng dùng các mẫu làm việc của bài *Finding your unknowns*:
- rà điểm mù trước khi làm;
- hỏi từng câu một, ưu tiên những câu làm đổi cấu trúc;
- với thứ chỉ biết khi nhìn thấy, làm bản nháp HTML có vài hướng;
- ghi chú triển khai, có mục "Lệch kịch bản";
- giải thích và đố cuối mỗi PR.

## 3. Tham chiếu

**Chính thức (Anthropic), ưu tiên đọc trước.** Đã đọc ngày 08/11/2026.

| Nguồn | Link | Dùng cho |
|---|---|---|
| Six shifts: *The new rules of context engineering for Claude 5 generation models* (Thariq Shihipar, 24/07/2026) | <https://claude.dev/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models/> · bản markdown: thêm `.md` | Nội dung chính |
| *A field guide to Claude Fable 5: Finding your unknowns* (Thariq Shihipar, 06/07/2026) | <https://claude.com/resources/articles/a-field-guide-to-claude-fable-finding-your-unknowns> | Phương pháp Trước, Trong, Sau |
| *Best practices for Claude Code* | <https://code.claude.com/docs/en/best-practices> | Phép kiểm, lái phiên, 5 câu hỏi, *What you can stop doing* |
| *How Claude remembers your project* | <https://code.claude.com/docs/en/memory> | Auto memory (phần 03) |
| *Extend Claude with skills* | <https://code.claude.com/docs/en/skills> | Progressive disclosure (phần 03) |
| *How Claude Code works* · *Desktop application* | <https://code.claude.com/docs/en/how-claude-code-works> · <https://code.claude.com/docs/en/desktop> | Vòng làm việc; Claude Code không cần terminal |
| Mục lục toàn bộ docs | <https://code.claude.com/docs/llms.txt> | Tự tìm thêm trang khi cần |
| *The unreasonable effectiveness of HTML* (20/05/2026) | <https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/> | Bản nháp HTML, trang giải thích kèm câu đố |
| *How we use skills* (03/06/2026) | <https://claude.dev/blog/lessons-from-building-claude-code-how-we-use-skills/> | Nâng cao A3 |
| *Dynamic workflows* (02/06/2026) | <https://claude.dev/blog/a-harness-for-every-task-dynamic-workflows-in-claude-code/> | Nâng cao A4; thang chấm |
| *Spending your effort* (25/09/2026) · *Building effective agent automations* (08/10/2026) · *How the Claude Code team does code review* (15/10/2026) | <https://claude.dev/blog/spending-your-effort/> · <https://claude.dev/blog/building-effective-agent-automations/> · <https://claude.dev/blog/solving-code-review-at-anthropic/> | Nâng cao A5, A8, A7 (viết sau) |
| *AI Fluency: Framework & Foundations* (Anthropic, khung 4D: Delegation, Description, Discernment, Diligence) | <https://www.coursera.org/learn/ai-fluency-framework-foundations> | Đọc thêm nếu cần một khung cho người đọc không làm dev. Chưa đối chiếu nội dung khoá học; chỉ dẫn vào trang sau khi đã đọc |

**Cộng đồng.** Ghi rõ là nguồn cộng đồng khi dẫn.

| Nguồn | Link | Dùng cho |
|---|---|---|
| `shanraisshan/claude-code-best-practice` | <https://github.com/shanraisshan/claude-code-best-practice> | Mẹo "grill me…" và "prove to me this works" (Boris Cherny); phỏng vấn bằng AskUserQuestion rồi mở phiên mới (Thariq); Library |

**Cách dạy và cách viết** (cho người viết; không hiện trên trang).

| Mã | Nguồn | Dùng cho |
|---|---|---|
| P1 | *Gagné's Nine Events of Instruction*, Northern Illinois University CITL. <https://www.niu.edu/citl/resources/guides/instructional-guide/gagnes-nine-events-of-instruction.shtml> | Ánh xạ ba hồi (14 §3). Dùng như khung lập kế hoạch, không phải danh sách phải đủ |
| P2 | R. E. Mayer (2017), *Using multimedia for e-learning*, Journal of Computer Assisted Learning. DOI 10.1111/jcal.12197 | Báo hiệu cấu trúc, chia đoạn, bỏ thứ thừa (15 §0) |
| P3 | Nielsen Norman Group, *Inverted Pyramid*. <https://www.nngroup.com/articles/inverted-pyramid/> | Ý chính đi trước (16 §1) |
| P4 | Nielsen Norman Group, *Scrolljacking 101*. <https://www.nngroup.com/articles/scrolljacking-101/> | Trần ba điểm dừng (15 §3) |
| P5 | Barbara Minto, *The Pyramid Principle* | SCQA, câu đỉnh, các nhánh không chồng nhau (14 §2) |
| P6 | Australian Government Style Manual, *Inverted pyramid structure*. <https://www.stylemanual.gov.au/structuring-content/types-structure/inverted-pyramid-structure> | Đọc thêm về P3 |
| V1 | Huỳnh Thanh Triều, "Hình ảnh của thời gian trong ngôn ngữ", Tạp chí Khoa học ĐHSP TP.HCM, số 9/2006. <https://journal.hcmue.edu.vn/index.php/hcmuejos/article/download/1272/1263/1273> | Đang/đã/sẽ cần điểm mốc (16 §2.1) |

**Trong repo.**

| File | Dùng cho |
|---|---|
| `docs/14-content-script-v4.md` | Kịch bản nội dung |
| `docs/15-typography-motion-v4.md` | Typography và hiệu ứng |
| `docs/16-writing-guide.md` | Văn phong |
| `docs/08-kaizen-go-live.md` §1b | Quyết định D21–D42 |
| `design-system/SOURCE-OF-TRUTH.md`, `design-system/components/*/preview.html`, `bundle.js` | Vai chữ, component, runtime ASCII (`NB.ascii`, `NB.sources.*`, `NB.colleague`, `NB.seen`) |
| `docs/09-motion-script.md`, `docs/11-typography.md`, `docs/13-design-taste.md` | Tầng chuyển động, luật đo chữ, luật đo trình bày, cách chạy bộ kiểm (nhớ đặt `NB_BASE=/no_babysitting_anymore/`) |
| `site/src/pages/c02/index.astro`, `site/src/scripts/motion.ts` | Chương đã viết; điểm dừng, các kiểu reveal |
| `.claude/skills/typography-check/` | Rà typography bằng mắt |
