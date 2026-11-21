Bài này dành cho bạn nếu chưa từng cài một công cụ như Claude Code hay Codex, mà muốn dùng `problem2outcome` để làm một việc thật. Nó đi từ bước chưa có gì, và nói rõ chỗ nào chưa được thử.

## Chọn một công cụ

`problem2outcome` chạy trong một agent mở trên một thư mục: Claude Code hoặc Codex. Nó mới được thử trên Claude Code. Codex đọc cùng file chỉ dẫn (`AGENTS.md`), nhưng chưa ai chạy `problem2outcome` trên đó, nên tôi chưa dám nói nó chạy tốt. Nếu bạn dùng Codex, bạn là người thử đầu tiên, và phản hồi của bạn có giá trị.

Claude Code cần tài khoản Pro, Max, Ultra, Team, Enterprise hoặc Console. Gói miễn phí của claude.ai không có Claude Code. Tên gói và điều kiện đổi khá nhanh, nên hãy xem trang cài đặt của Anthropic trước khi trả tiền.[^1]

## Cài đặt

Terminal là cửa sổ để gõ lệnh: máy Mac có sẵn ứng dụng Terminal, Windows có PowerShell. Nếu bạn chưa từng dùng, Anthropic có một hướng dẫn terminal riêng và cũng có app máy tính để dùng Claude Code mà không cần terminal.[^1]

Phần dưới là các lệnh trên trang cài đặt của Anthropic, đọc ngày 21/11/2026. Trang đó mới là nguồn đúng. Hãy mở nó và so với lệnh dưới đây trước khi chạy, vì lệnh cài chạy thẳng trên máy bạn.

macOS, Linux:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows (PowerShell):

```powershell
irm https://claude.ai/install.ps1 | iex
```

Homebrew:

```bash
brew install --cask claude-code
```

Cài xong, gõ `claude --version`. Thấy một số phiên bản là đã cài được.[^1]

Với Codex, trên macOS và Linux lệnh là:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

Lệnh cho Windows chưa đọc được từ trang của OpenAI nên không chép ở đây. Lần đầu chạy `codex`, bạn chọn đăng nhập bằng tài khoản ChatGPT.[^2]

## Mở đúng thư mục

Tải thư mục `problem2outcome` về và giải nén. Mở terminal trong thư mục đó rồi gõ `claude` (hoặc `codex`). Lần đầu, Claude Code mở trình duyệt để bạn đăng nhập.[^1]

Nếu bạn dùng app máy tính, hãy mở chính thư mục này làm thư mục làm việc. Tên nút trong app chưa được kiểm, nên bài không chỉ nút nào.

Thư mục này là nơi `problem2outcome` đọc chỉ dẫn. Codex đọc `AGENTS.md` từ gốc thư mục, tối đa 32 KiB theo mặc định, và file của `problem2outcome` nhỏ hơn nhiều.[^3]

## Việc đầu tiên

Nói bằng lời của bạn điều bạn muốn làm xong, ví dụ: "Viết email mời khách cũ quay lại, giảm 15% nếu đặt trước 20/12."

Agent sẽ hỏi "xong" nghĩa là gì với bạn, rồi chờ bạn xác nhận trước khi viết. Khi làm xong, nó đối chiếu kết quả với câu trả lời của bạn, từng điểm một, và bạn là người nhận hoặc yêu cầu làm lại. Trong các lần chạy thử, kể cả khi người dùng ép, agent chưa lần nào nhận kết quả thay họ.[^4]

Kẹt ở bước nào thì bạn báo trên trang GitHub của dự án. Nơi người mới kẹt chính là chỗ bài này cần sửa.

## Điều problem2outcome lưu, và điều nó không lưu hộ bạn

Phương pháp này chỉ chủ động ghi vào hai chỗ: `me.md` (bạn muốn được giúp tới đâu ở mỗi quyết định) và thư mục `tasks/` (tiêu chí và việc bạn đã nhận hay chưa). Bạn đọc, sửa hay xoá được cả hai.

Nhưng đó là luật viết cho agent, không phải rào chắn. Công cụ bạn dùng vẫn có thể giữ lịch sử riêng ở ngoài thư mục. Với Claude Code, thư mục `~/.claude` chứa cả cài đặt lẫn lịch sử phiên, và app máy tính cũng ghi vào đó. Trang của Anthropic nói xoá thư mục này sẽ xoá cả lịch sử phiên.[^5] Trang đó không mô tả chỗ lưu lịch sử khi dùng bình thường, cũng không nói cách tắt. Với Codex, bộ nhớ cục bộ tắt theo mặc định; nếu bạn bật, nó nằm trong `~/.codex`.[^6] Các trang tôi đọc không mô tả nơi Codex lưu lịch sử phiên.

Vì vậy, nếu việc của bạn có dữ liệu khách hàng hay kế hoạch kinh doanh, đừng coi `me.md` và `tasks/` là toàn bộ dấu vết. Hãy đọc tài liệu của công cụ bạn dùng về lịch sử và bộ nhớ trước khi đưa dữ liệu nhạy cảm vào. Bài [Memory: “nhớ tôi” khác “biết cách làm việc trong repo này”](/articles/memory/) giải thích vì sao các cơ chế đó khác nhau.

## Điều chưa kiểm

- Chưa ai chạy `problem2outcome` trên Codex.
- Chưa kiểm cách mở thư mục trong app máy tính của Claude, nên bài không chỉ tên nút.
- Chưa đọc được gói ChatGPT nào dùng được Codex, nên bài không nêu gói.
- Chưa có người không rành kỹ thuật nào đi hết bài này từ đầu tới việc đầu tiên. Bạn có thể là người đầu tiên.

[^1]: Anthropic, [“Advanced setup”](https://code.claude.com/docs/en/setup), mở ngày 21/11/2026.
[^2]: OpenAI, [Codex CLI](https://learn.chatgpt.com/docs/codex/cli), mở ngày 21/11/2026.
[^3]: OpenAI, [“AGENTS.md”](https://learn.chatgpt.com/docs/agent-configuration/agents-md), mở ngày 21/11/2026.
[^4]: Đánh giá độc lập về problem2outcome (PR #4, 21/11/2026), các lần chạy trên Claude Code với Sonnet và Haiku. Chưa công bố; xem `ledger.md` dòng 14.
[^5]: Anthropic, [“Advanced setup”](https://code.claude.com/docs/en/setup), mục “Remove configuration files”, mở ngày 21/11/2026.
[^6]: OpenAI, [“Memories”](https://learn.chatgpt.com/codex/customization/memories), mở ngày 21/11/2026.
