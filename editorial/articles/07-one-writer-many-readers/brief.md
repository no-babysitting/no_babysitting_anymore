---
status: draft
topic: 7
slug: one-writer-many-readers
working_title: Một người viết, nhiều người đọc
verifiedAt: 2026-11-13
---

# Một người viết, nhiều người đọc

Bài lẻ, ngoài cụm 3 bài đầu. Issue: #57. Nguồn: báo cáo nghiên cứu về multi-agent coding của tác giả, [`raw/report.md`](raw/report.md). Bản nháp: [`draft.md`](draft.md). Sổ nguồn: [`ledger.md`](ledger.md).

## Quyết định của tác giả cho bài này (13/11/2026)

- **Vị trí:** bài lẻ, ra khi sẵn sàng; không đổi thứ tự cụm (D61, D65).
- **Trục:** chỉ dẫn thực hành, theo kết luận của báo cáo: mặc định một agent ghi; agent phụ chỉ đọc hoặc review ở context sạch; "xong" do máy xác định.
- **Phạm vi:** hiệu quả, kiểm chứng, vai trò của người (báo cáo §3.1, §3.4, §3.6) và chi phí (§3.8, §5). Không đưa vào: sự cố an toàn nêu tên hãng (§3.10), bảng công cụ và giá thuê bao (§3.9, §6).
- **Mở bài:** chuyện thật của repo này.
- **Nguồn:** không mở lại. Bài dựa trên bằng chứng của báo cáo; sổ nguồn ghi mọi dòng là `UNVERIFIED` và nêu ngoại lệ.

## Luận điểm

Với việc code hằng ngày, mặc định là một agent ghi; thêm agent chỉ có lời ở tìm kiếm rộng, giả thuyết debug cạnh tranh, review ở context sạch và vài ticket độc lập. Phần kết nối với No Babysitting là quan điểm của tác giả, ghi rõ trong bài là không có số đo trực tiếp.

## Trong repo đã có gì (đừng dạy lại)

- Phần 04 của Lộ trình chính dạy "reviewer ở context mới" (`parts.ts` từ dòng 327; `docs/14` §6.4). Bài dẫn sang qua `related: ['04']`, không dạy lại cách làm.
- "Một lần giao việc" ở trang chủ (`work-types.ts`) có ví dụ "3 subagent đọc song song": khớp với chỗ báo cáo xếp subagent chỉ đọc vào nhóm có lời.
- Nâng cao A4 *Làm theo nhóm* (`docs/14` §8: subagent tốn gì, reviewer mới, chạy song song, dynamic workflows) chưa viết. Bài này là bằng chứng cho nó, không thay nó.

## Điều gì bài này nói mà docs chưa nói

- Số đo về multi-agent: khi nào thắng, khi nào thua, tỷ lệ xung đột merge, review khác hãng, và chỗ hóa đơn thật sự đi.
- Chuyện thật của repo này ở phần mở bài.

## Việc cần tác giả quyết

1. **Quy tắc "agent không tự merge vào `main`" so với D67.** Bài nêu quy tắc này như khuyến nghị cho người đọc (báo cáo §3.4), không nói dự án làm vậy. Nhưng `AGENTS.md` §2 (D67) cho agent chính tự merge PR không có chữ mới khi CI xanh; chữ mới thì merge sau khi bạn duyệt. Người đọc repo công khai sẽ thấy chỗ lệch. Giữ nguyên, hay thêm một câu nêu cách dự án này làm?
   **Đã quyết 14/11/2026 (D81):** giữ nguyên, nêu quy tắc như khuyến nghị cho người đọc, không nêu cách dự án làm. Không đổi `draft.md`.
2. **Ngày `verifiedAt`.** `2026-11-13` là ngày nhận báo cáo, không phải ngày mở nguồn (`docs/06` §1 mục 8 định nghĩa là "ngày mở nguồn gần nhất"). Báo cáo ghi "tháng 11/2026" và nói giá được kiểm "đầu tháng 11/2026". Bài ghi "tháng 11/2026" ngay trong câu. Dòng ngày đầu bài vì thế đọc là "thu thập ngày 13/11/2026". Chấp nhận, hay muốn ghi khác?
   **Đã quyết 14/11/2026 (D84):** giữ `verifiedAt` 13/11/2026; bài vẫn ghi "tháng 11/2026" trong câu.
3. **Phần mở bài.** Tôi (agent) viết theo những gì quan sát được trong PR #35, #42, #46. Bạn đọc lại xem đúng và đủ chưa. Bài không nêu #42 và #46 do agent nào viết vì chưa biết; vì thế không nói "cùng agent" hay "khác agent" về chính vụ này. `AGENTS.md` coi mọi phiên Claude Code là "agent chính" và D67 ghi "không có agent thứ hai đang làm việc", nên bài cũng không viết "repo có hơn một agent" (bản đầu có câu này; đã bỏ). Câu về ngoại lệ gộp `main` lấy từ `AGENTS.md` §2.
   **Đã quyết 14/11/2026 (D84):** tác giả đã đọc phần mở bài và xác nhận "Đúng và đủ".
4. **Mâu thuẫn với track Nhập môn (`docs/18` N4).** Báo cáo (§4 mục 2) nói file ngữ cảnh do LLM sinh không giúp thành công và tăng chi phí suy luận hơn 20%, và diễn giải điều đó cho `/init`. `docs/18` N4 dạy `/init` làm bước đầu. Bài chỉ nêu "file do LLM sinh" (bảng chi phí) và không nêu `/init`. Khi N4 được viết cần ContradictionNote hoặc sửa N4.
   **Đã quyết 14/11/2026 (D84):** giữ nguyên, bài không nêu `/init`; xử lý mâu thuẫn với N4 khi N4 được viết.
5. **Link còn thiếu.** Báo cáo chỉ kèm ID arXiv (đã ghép link, chưa mở). Chưa có URL: Cognition ("Multi-Agents: What's Actually Working", 22/4/2026); Anthropic ("How we built our multi-agent research system", 6/2025; "Beyond permission prompts", 20/10/2025); tài liệu Claude Code về agent teams, auto mode, chi phí subagent, `/code-review`; tài liệu Codex và changelog Codex CLI; tài liệu Prompt caching của Claude Platform; PwC; METR (24/2/2026); MAST (NeurIPS 2025). Cách nhanh nhất: nhờ agent nghiên cứu xuất danh sách URL của các nguồn. `docs/06` §1 mục 1 vẫn đòi link bấm được cho con số và câu trích.
   **Bốn chỗ trang nói khác bài: đã quyết 14/11/2026 (D84) "Giữ nguyên theo báo cáo".** Khi đăng, PR ghi đúng sự thật rằng bốn chỗ này đã được báo là trang nguồn nói khác hoặc không có câu đó, kèm bảng ở cuối `ledger.md`.
   **Đã làm 14/11/2026 (chủ dự án chọn "Agent tìm URL để gắn link, giữ nhãn UNVERIFIED"):** URL của Cognition, hai bài Anthropic, docs Claude Code (agent teams, chi phí, auto mode, lệnh), docs Codex (subagent, changelog), prompt caching, MAST, METR đã gắn vào `draft.md`; bảng và các chỗ bài nói khác trang ở cuối `ledger.md`. Còn thiếu: PwC (không có trong bản nháp). Bốn chỗ cần tác giả xem lại vì trang nói khác bài hoặc không có câu đó: `/code-review` chạy trong subagent mới; "Cognition cũng nêu đúng điểm này" (yêu cầu duyệt từ luồng nền); "30–50% người tham gia" của METR và cách gọi "công bố nghiên cứu tiếp nối"; số trace của MAST.
6. **Điền khi đăng:** `publishedAt`, `order` (bài lẻ: không có `series`), `art`, `tags` (`docs/24` §6; schema ở issue #44).
7. **Tiêu đề và mô tả.** Đang là "Một người viết, nhiều người đọc" (lấy từ tiêu đề báo cáo). Đổi nếu bạn muốn.
8. **Khi đăng, PR ghi đúng sự thật về đối chiếu nguồn.** Mẫu ở `AGENTS.md` §8 ("chủ dự án là người đối chiếu duy nhất") không đúng cho bài này: không ai đối chiếu nguồn gốc, tác giả quyết đăng theo báo cáo (13/11/2026). Ghi như vậy, kèm "Chữ chờ duyệt" (§3).

## Điều tôi không đưa vào bài, và vì sao

Đây là chọn lọc biên tập, không phải kiểm nguồn.

- **"Trung bình −0,3%" (§1 mục 1):** chỉ có ở phần tóm tắt, thân báo cáo (§3.1) không nhắc lại số này.
- **METR "−18% thời gian, khoảng tin cậy −38% đến +9%":** dấu của số không rõ (dòng thời gian của báo cáo ghi nghiên cứu gốc là −19%). Bài chỉ giữ lời tự nhận "không đáng tin" của METR.
- **Johann Rehberger, chuỗi tấn công auto mode (8/2026):** hạng D, nêu tên một người và một lỗ hổng của một sản phẩm, qua lời kể. Chờ nguồn.
- **AgenticFlict (27,67%):** không cần cho lập luận; báo cáo ghi hai bản tóm tắt thứ cấp cho cỡ mẫu khác nhau.
- **Giá thuê bao, bảng công cụ, ba cấu hình tham chiếu (§3.9, §6):** ngoài phạm vi tác giả chọn; chính báo cáo nói giá "một phần lấy từ blog và snippet, cần đối chiếu lại".
- **Sự cố an toàn nêu tên (§3.10), bộ nhớ ngoài (§3.5), `/init` (§4 mục 2):** ngoài phạm vi, hoặc mâu thuẫn N4 (mục 4 ở trên).
- **Cột "Bằng chứng" và "Công duy trì" của bảng mẫu (§2), mục 9 của sổ tay chi phí (cấu trúc cache cho người tự dựng harness bằng SDK).**

## Câu hỏi mở cho tác giả

- Ngoài chuyện `CHANGELOG.md`, bạn đã tự chạy nhiều agent trên repo nào chưa? Một câu chuyện thứ hai (kể cả chuyện thất bại) sẽ làm bài mạnh hơn.
- Phần kết ("đổi chỗ trông, không phải bớt trông") là quan điểm của bạn, chưa có số đo nào chống lưng. Giữ, rút ngắn, hay bỏ?
