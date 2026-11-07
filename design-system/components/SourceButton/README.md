SourceButton là nút "Nguồn" luôn nhìn thấy cạnh mỗi con số, trích dẫn, tip và bước "Cách làm". Bấm vào mở bảng nguồn để người học tự đối chiếu với bản gốc. Đây là dạng đầy đủ của SourceBadge.

## Dùng khi

- Cuối mỗi khối **HIỂU**, cạnh mỗi con số lớn, trên mỗi thẻ Library và trong mỗi khối "Cách làm". Mọi nội dung có nguồn đều phải có nút này (`06-sources-and-links.md`).

## Người dùng cung cấp

- `sources`: danh sách `SourceRef`: `kind` (Docs · Repo · Blog · Video), `title`, `author`, `publishedAt`, `verifiedAt`, `quote` (trích nguyên văn ngắn), `url`.
- Cờ trạng thái: có nguồn mâu thuẫn (hiện ■ `warn`), quá 30 ngày chưa kiểm chứng lại (viền `warn`).

## Quy tắc

- Nút là `nb-btn`: `[ Nguồn · n ↗ ]`, mono 12,5px viết thường, hover đảo màu; số nguồn cùng màu chữ của nút (không accent).
- Bảng nguồn nổi (`shadow-overlay`, viền `fg`): mỗi nguồn gồm nhãn loại, tiêu đề, người · ngày · `verifiedAt`, trích nguyên văn, `[ Mở bản gốc ↗ ]` và `[ Sao chép link ]`. Mobile: bottom sheet.
- Mở bằng fade `dur-quick`; tiêu đề bảng đổi bằng `NB.say` (không dùng M4: mở bảng nguồn không phải hành động của agent). Reduced motion: hiện thẳng.
- Không có link thì không đăng; nội dung do trang diễn giải gắn nhãn "Diễn giải".

## Không nên

- Giấu nút sau hover, hoặc dùng icon/emoji thay chữ.
- Link tới bản tóm tắt thay cho bản gốc; link có đuôi `.md`.

## Accessibility

- `<button aria-expanded aria-controls>` điều khiển `role="dialog"` không chặn trang (`aria-modal="false"`); Esc đóng và trả focus; link mở tab mới có nhãn "mở tab mới"; sao chép link báo qua `aria-live`.
- Preview dùng dữ liệu minh hoạ; link và trích dẫn thật phải kiểm tra lại trước khi đăng.
