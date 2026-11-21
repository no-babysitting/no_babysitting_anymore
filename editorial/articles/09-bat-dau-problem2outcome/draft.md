Bài này dành cho bạn nếu chưa từng cài một công cụ như Claude Code hay Codex, và muốn dùng `problem2outcome` để làm một việc thật. Mình đi từ bước chưa có gì, và nói rõ chỗ nào mình chưa thử.

## Bước 0: chọn một công cụ

`problem2outcome` chạy trong một agent mở trên một thư mục: Claude Code hoặc Codex. Mình mới chạy nó trên Claude Code. Codex đọc cùng file chỉ dẫn (`AGENTS.md`), nhưng mình chưa thử lần nào, nên chưa dám nói nó chạy tốt. Nếu bạn dùng Codex, bạn là người thử đầu tiên, và phản hồi của bạn có ích.

Claude Code cần tài khoản Pro, Max, Ultra, Team, Enterprise hoặc Console. Gói miễn phí của claude.ai không có Claude Code. Gói và tên gói đổi nhanh, nên hãy xem trang cài đặt của Anthropic trước khi trả tiền.[^1]

## Bước 1: cài

Nếu bạn chưa từng mở terminal, hãy đọc hướng dẫn terminal của Anthropic trước. Anthropic cũng có app máy tính để dùng Claude Code không cần terminal.[^1] Phần dưới là cách cài bằng terminal, đúng lệnh trên trang của hãng ngày 21/11/2026. Trang đó là nguồn đúng; hãy mở nó và so lệnh trước khi chạy.

- **macOS, Linux:** `curl -fsSL https://claude.ai/install.sh | bash`
- **Windows (PowerShell):** `irm https://claude.ai/install.ps1 | iex`
- **Homebrew:** `brew install --cask claude-code`

Cài xong, gõ `claude --version`. Thấy một số phiên bản là được.[^1]

Với Codex, trên macOS và Linux lệnh là `curl -fsSL https://chatgpt.com/codex/install.sh | sh`. Mình chưa đọc được lệnh cho Windows từ trang của hãng, nên không chép ở đây. Lần đầu chạy, `codex` cho bạn chọn đăng nhập bằng tài khoản ChatGPT.[^2]

## Bước 2: mở đúng thư mục

Tải thư mục `problem2outcome` về và giải nén. Mở terminal trong thư mục đó, rồi gõ `claude` (hoặc `codex`). Lần đầu, Claude Code mở trình duyệt để bạn đăng nhập.[^1] Với app máy tính, bạn mở chính thư mục đó trong app.

Đây là điều quan trọng nhất của bước này: agent chỉ nên làm việc trong thư mục này. Nó cũng là nơi `problem2outcome` đọc chỉ dẫn. Codex đọc `AGENTS.md` từ gốc thư mục, giới hạn mặc định 32 KiB, và file của `problem2outcome` nhỏ hơn nhiều.[^3]

## Bước 3: việc đầu tiên

Nói bằng lời của bạn điều bạn muốn làm xong, ví dụ: "Viết email mời khách cũ quay lại, giảm 15% nếu đặt trước 20/12."

Agent sẽ hỏi "xong" nghĩa là gì với bạn, và chờ bạn xác nhận trước khi viết. Khi làm xong, nó đối chiếu kết quả với câu trả lời của bạn, từng điểm một, và bạn là người nhận hoặc yêu cầu làm lại. Agent không tự nhận thay bạn.

## Điều `problem2outcome` lưu, và điều nó không lưu hộ bạn

Phương pháp này chỉ chủ động ghi vào hai chỗ: `me.md` (bạn muốn được giúp tới đâu ở mỗi quyết định) và thư mục `tasks/` (tiêu chí và việc bạn đã nhận hay chưa). Bạn đọc, sửa hay xoá được cả hai.

Nhưng đó là luật mình viết cho agent, không phải rào chắn. Công cụ bạn dùng vẫn có thể giữ lịch sử riêng ở ngoài thư mục. Với Claude Code, thư mục cài đặt `~/.claude` chứa cả cài đặt lẫn lịch sử phiên, và app máy tính cũng ghi vào đó. Trang của Anthropic nói xoá thư mục này sẽ xoá cả lịch sử phiên.[^4] Trang đó không mô tả chi tiết chỗ lưu lịch sử trong lúc dùng thường, cũng không nói cách tắt. Với Codex, bộ nhớ cục bộ tắt mặc định; nếu bạn bật, nó nằm trong `~/.codex`.[^5] Lịch sử phiên của Codex không được các trang mình đọc mô tả.

Vì vậy, nếu việc của bạn có dữ liệu khách hàng hay kế hoạch kinh doanh, đừng coi `me.md` và `tasks/` là toàn bộ dấu vết. Hãy đọc tài liệu của công cụ bạn dùng về lịch sử và bộ nhớ trước khi giao dữ liệu nhạy cảm. Bài [Memory: “nhớ tôi” khác “biết cách làm việc trong repo này”](/articles/memory/) giải thích vì sao những cơ chế này khác nhau.

## Mình chưa kiểm

- Codex: chưa chạy `problem2outcome` trên Codex.
- Mình chưa kiểm cách mở thư mục trong app máy tính của Claude, nên bài không chỉ nút nào.
- Mình chưa đọc được gói ChatGPT nào dùng được Codex, nên bài không nêu.

[^1]: Anthropic, "Advanced setup", code.claude.com/docs/en/setup, mở ngày 21/11/2026.
[^2]: OpenAI, Codex CLI, learn.chatgpt.com/docs/codex/cli, mở ngày 21/11/2026.
[^3]: OpenAI, "AGENTS.md", learn.chatgpt.com/docs/agent-configuration/agents-md, mở ngày 21/11/2026.
[^4]: Anthropic, "Advanced setup", mục "Remove configuration files", mở ngày 21/11/2026.
[^5]: OpenAI, "Memories", learn.chatgpt.com/codex/customization/memories, mở ngày 21/11/2026.
