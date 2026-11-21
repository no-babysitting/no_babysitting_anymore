# Sổ nguồn: Từ chưa có gì đến việc đầu tiên với problem2outcome

Nhãn và dòng nào được vào bài: `editorial/CLAUDE.md`. Cột "Mở ngày" là `verifiedAt` (`YYYY-MM-DD`). Cả hai trang docs được đọc qua công cụ tải trang (bản tóm tắt có trích nguyên văn); người rà nên mở lại trang gốc trước khi đăng.

| # | Khẳng định | Nhãn | Nguồn trực tiếp | Mở ngày | Bề mặt, model, phiên bản | Điều kiện và giới hạn |
|---|---|---|---|---|---|---|
| 1 | Claude Code cần tài khoản Pro, Max, Ultra, Team, Enterprise hoặc Console; gói miễn phí của claude.ai không có Claude Code | VERIFIED | https://code.claude.com/docs/en/setup | 2026-11-21 | Claude Code (trang ví dụ phiên bản 2.1.x) | Trang không ghi ngày cập nhật. Gói và tên gói đổi nhanh |
| 2 | Cài khuyến nghị: macOS, Linux, WSL: `curl -fsSL https://claude.ai/install.sh \| bash`; Windows PowerShell: `irm https://claude.ai/install.ps1 \| iex`; Homebrew: `brew install --cask claude-code`; WinGet: `winget install Anthropic.ClaudeCode` | VERIFIED | như dòng 1 | 2026-11-21 | như dòng 1 | Bản cài native tự cập nhật; Homebrew và WinGet không |
| 3 | Mở terminal trong thư mục dự án, gõ `claude`, đăng nhập qua trình duyệt; `claude --version` kiểm đã cài | VERIFIED | như dòng 1 | 2026-11-21 | như dòng 1 | |
| 4 | App máy tính Claude dùng được Claude Code không cần terminal | VERIFIED | như dòng 1 ("Prefer a graphical interface?") | 2026-11-21 | như dòng 1 | Trang này không nói cách mở thư mục trong app; README của `problem2outcome` nói chọn "Code", chưa kiểm ở đây (xem dòng 11) |
| 5 | Xoá `~/.claude` xoá cả cài đặt và lịch sử phiên; app máy tính, tiện ích VS Code và JetBrains cũng ghi vào thư mục đó | VERIFIED | như dòng 1, mục "Remove configuration files" | 2026-11-21 | như dòng 1 | Trang không mô tả chỗ lưu lịch sử trong dùng thường, và không nói cách tắt |
| 6 | Cài Codex CLI (macOS, Linux): `curl -fsSL https://chatgpt.com/codex/install.sh \| sh` | VERIFIED | https://learn.chatgpt.com/docs/codex/cli | 2026-11-21 | Codex CLI | Các tab Windows, npm, Homebrew không đọc được lệnh: **không vào bài** |
| 7 | Lần đầu chạy `codex` trong thư mục dự án, chọn "Sign in with ChatGPT" hoặc cách đăng nhập khác | VERIFIED | như dòng 6 | 2026-11-21 | Codex CLI | Trang không nói cần gói ChatGPT nào: **bài không nêu gói** |
| 8 | Codex đọc `AGENTS.md` từ gốc dự án xuống thư mục hiện tại, tối đa 32 KiB gộp theo mặc định | VERIFIED | https://learn.chatgpt.com/docs/agent-configuration/agents-md | 2026-11-21 | Codex CLI | `AGENTS.md` của `problem2outcome` nhỏ hơn 8 KB |
| 9 | Bộ nhớ cục bộ của Codex tắt mặc định; khi bật nằm trong `~/.codex` (hoặc `CODEX_HOME`); xoá trong app máy tính bằng "Delete Codex memories" | VERIFIED | https://learn.chatgpt.com/codex/customization/memories | 2026-11-21 | Codex CLI và app | Trang không nói cách xoá chỉ bằng CLI, cũng không nói nơi lưu lịch sử phiên (`codex resume`) |
| 10 | `problem2outcome` chỉ chủ động ghi vào `me.md` và `tasks/` | INFERENCE | `AGENTS.md` và README của `problem2outcome` (PR #4, commit e649d63); đánh giá độc lập: agent tự nói lịch sử Claude Code nằm ngoài thư mục | 2026-11-21 | Claude Code, nhiều persona | Là luật viết cho agent, không phải cơ chế ép buộc. Công cụ vẫn giữ lịch sử riêng |
| 11 | Cách mở thư mục trong app Claude trên máy tính; chữ trên nút | UNVERIFIED | | | | **Không vào bài**; bài chỉ nói "mở thư mục bằng app hoặc terminal" |
| 12 | Gói ChatGPT nào dùng được Codex; lệnh cài Codex ở Windows | UNVERIFIED | | | | **Không vào bài** |
| 13 | `problem2outcome` chạy tốt trên Codex | UNVERIFIED | đánh giá độc lập F-L5-04: chưa ai chạy | 2026-11-21 | | Bài nói thẳng là chưa thử |
