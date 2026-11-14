---
title: "Model và effort: bắt đầu ở mặc định, nâng lên khi có bằng chứng"
description: Mức effort mặc định khác nhau giữa Claude Code và API, tên mức không cùng giá trị giữa các model, và mọi chỉ dẫn của Anthropic đều dặn tự đo. Từ đó, một cách chọn đơn giản.
verifiedAt: 2026-11-14
art: default
related: ['02']
# publishedAt, order and series are filled when the article is published (docs/24 section 6); it is third in the cluster after articles 01 and 02.
---

Có hai núm khi giao việc cho Claude: model nào, và effort bao nhiêu. Anthropic đã có một bài dạy cách dùng effort: [Using Claude Code: Spending your effort](https://claude.dev/blog/spending-your-effort/) (Thariq Shihipar, 25/9/2026). Bài này không lặp lại nó. Đây là ba điều tôi thấy khi đối chiếu tài liệu ngày 14/11/2026, và một cách chọn rút ra từ đó. Các mức và mặc định đổi nhanh nên mọi con số ở đây đi kèm ngày.

## Mặc định khác nhau theo bề mặt

Cùng một model có thể có mức effort mặc định khác nhau tùy bạn gọi nó ở đâu. Theo docs Claude Code, Fable 5.2, Opus 5.5, Sonnet 5.5 và Haiku 5.5 mặc định `medium`. Theo docs API, Fable 5.2 và Sonnet 5.5 mặc định `high`, còn Opus 5.5 và Haiku 5.5 mặc định `medium`.

| Model | Mặc định ở Claude Code | Mặc định ở API |
|---|---|---|
| Fable 5.2 | `medium` | `high` |
| Opus 5.5 | `medium` | `medium` |
| Sonnet 5.5 | `medium` | `high` |
| Haiku 5.5 | `medium` | `medium` |

Docs Claude Code còn nói: khi Claude Code không gửi mức effort nào, mặc định của API là cái được áp dụng, không phải mặc định của Claude Code. Nên khi ai đó nói “mặc định là medium” hay “mặc định là high”, câu hỏi đầu tiên là: ở bề mặt nào, với model nào, ngày nào.

## Tên mức không cùng giá trị giữa các model

Docs Claude Code viết: thang effort được chấm riêng cho từng model, nên cùng một tên mức không có cùng giá trị ở các model khác nhau. Docs API nói riêng về Sonnet 5.5: một mức không cho cùng lượng suy nghĩ như ở Sonnet 5. Effort cũng không phải ngân sách token cứng, mà là một tín hiệu về hành vi.

Vì vậy chuyện “tôi dùng medium” không chuyển được từ model này sang model khác, và một lời khuyên về mức effort có hạn dùng theo model.

## Mọi chỉ dẫn đều dặn tự đo

Docs API lặp một câu ở nhiều model: chạy thử các mức effort trên bài đánh giá của chính bạn, đừng mang cài đặt cũ sang model mới. Với Fable 5.2, docs viết: bắt đầu ở `high`; nâng lên `xhigh` cho việc code dài và khó nhất khi bạn đã đo thấy lợi; hạ xuống `medium` hay `low` khi bài đánh giá của bạn cho thấy chất lượng vẫn giữ; để `max` cho việc đo trần của model.

Docs Haiku 5.5 thêm một cảnh báo cụ thể: ở `low`, với prompt agent dài, model dễ bỏ một lần tìm kiếm, dừng sớm hoặc bỏ một bước kiểm tra. Còn bài *Spending your effort* viết, bằng lời của tác giả bài, rằng effort cao hợp với việc có nhiều trường hợp biên ẩn.

<aside aria-label="Quan điểm của tôi">

Từ đó tôi rút một cách chọn trong Claude Code: bắt đầu ở mặc định của model; nâng effort khi bạn có bằng chứng là việc này cần (có trường hợp biên, cần kiểm chứng); và chỉ thêm định tuyến giữa các model khi đã đo được lợi. Bài này không có số đo của tôi; đây là cách đọc các chỉ dẫn trên, không phải kết quả thử nghiệm.

</aside>

## Leo thang có giới hạn, và định tuyến

Trong Claude Code, leo thang có giới hạn đã có sẵn: mức `max` chỉ áp cho phiên hiện tại, trừ khi bạn đặt nó bằng biến môi trường `CLAUDE_CODE_EFFORT_LEVEL`. Bạn đổi mức bằng `/effort`, `--effort`, biến môi trường hoặc thanh trượt ở `/model`. Ở API, đổi effort theo từng tin nhắn giữ được bộ nhớ đệm prompt; đặt giá trị mới ở cấp request có thể làm mất một phần hoặc cả bộ nhớ đệm.

Về định tuyến giữa các model, bài *Spending your effort* không đưa lời khuyên nào. Claude Code có sẵn một kiểu rất đơn giản: alias `opusplan` dùng Opus ở chế độ lập kế hoạch rồi chuyển sang Sonnet khi thực thi. Docs Haiku 5.5 dặn so sánh các mức cao của nó với Sonnet 5.5 về hiệu năng, chi phí và tốc độ. Cả hai đều đứng cùng một câu: đo trên việc của bạn.

## Bài này chưa nói

- Giá và benchmark giữa các model: tôi không dùng, vì đổi nhanh và so điểm giữa các bài đo khác nhau dễ sai.
- Chi phí cho mỗi kết quả được chấp nhận (tính cả công của người): bài không đo.
- Ứng dụng Claude (Desktop, Cowork): mức mặc định ở đó tôi chưa mở.
- Các hãng khác: ngoài trục của mục này.

## Nguồn

- [Using Claude Code: Spending your effort](https://claude.dev/blog/spending-your-effort/), Thariq Shihipar, 25/9/2026, mở ngày 14/11/2026.
- [Effort](https://platform.claude.com/docs/en/build-with-claude/effort), docs nền tảng Claude, mở ngày 14/11/2026.
- [Model configuration](https://code.claude.com/docs/en/model-config), docs Claude Code, mở ngày 14/11/2026.

---

<!-- Phần dưới đây KHÔNG lên site; xoá khi đăng (docs/24 §6). Bản đồ đoạn → dòng trong ledger.md -->

## Bản đồ khẳng định → sổ nguồn (không đăng)

| Đoạn | Dòng ledger |
|---|---|
| S11: tác giả, ngày, tên | 1 |
| Mặc định ở Claude Code theo model | 6 |
| Mặc định ở API theo model | 4, 5 |
| Bảng so sánh Claude Code và API | 8 (suy từ 5 và 6) |
| Khi Claude Code không gửi mức, mặc định API áp dụng | 7 |
| Tên mức không cùng giá trị giữa model; Sonnet 5.5 so với Sonnet 5 | 10 |
| Effort là tín hiệu hành vi, không phải ngân sách cứng | 9 |
| Tự đo, đừng mang cài đặt sang model mới | 11 |
| Fable 5.2: bắt đầu `high`, nâng khi đã đo, hạ khi đánh giá cho thấy giữ chất lượng, `max` để đo trần | 12 |
| Haiku 5.5 ở `low` dễ bỏ tìm kiếm hay kiểm tra | 13 |
| S11: effort cao hợp với trường hợp biên ẩn (lời tác giả bài) | 2 |
| Callout "Quan điểm của tôi" | 22 (INFERENCE, nêu rõ là quan điểm, không có số đo của tác giả); vế "nâng khi có bằng chứng" bám 2, 11, 12 |
| `max` chỉ áp cho phiên hiện tại; cách đổi mức | 15 |
| Đổi effort theo tin nhắn giữ cache; đặt cấp request có thể mất cache | 16 |
| S11 không có lời khuyên định tuyến | 3 |
| `opusplan` | 17 |
| Haiku 5.5 dặn so với Sonnet 5.5 | 13 |
| "Chưa nói": giá, benchmark | 19, 20, 21 (UNVERIFIED, không dùng) |
| "Chưa nói": ứng dụng Claude | 8 (ghi chú: chưa mở) |
