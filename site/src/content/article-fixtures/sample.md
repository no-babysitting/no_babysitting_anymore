---
title: Trang thử mẫu bài viết
description: Trang này chỉ để thử khung bài viết; nội dung không phải bài thật.
publishedAt: "2026-11-13"
verifiedAt: "2026-11-13"
order: 0
art: default
series: Thử nghiệm
related: ["01", "c02"]
tags: [fixture]
---

Đây là đoạn mở đầu của trang thử. Nó đủ dài để trình duyệt ngắt dòng vài lần ở khổ điện thoại, và có chữ tiếng Anh xen giữa như <em lang="en">context window</em> để kiểm tra kiểu chữ nghiêng.

## Chữ có dấu xếp chồng

Nguyễn Thị Thuỷ kể rằng buổi chiều ấy trời ngả sang màu tím nhạt, khuỷu tay tựa lên cửa sổ, tiếng ếch ngoài ruộng vọng vào ngập ngừng, rồi tắt hẳn. Những chữ như ướt, huyền, ngoằn ngoèo, khuỳnh, quẫy, ễnh ương, nhược điểm và thượng nguồn cho biết dấu thanh có bị cắt đầu hay chồng lên nhau không.

### Một danh sách ngắn

- Mục thứ nhất nói về một việc làm được trong một câu.
- Mục thứ hai dài hơn một chút, để thấy dòng thứ hai của một mục danh sách xuống dòng đúng chỗ khi màn hình hẹp.
- Mục thứ ba trỏ tới [một trang ngoài](https://example.com/) để thử kiểu liên kết.

## Một khối mã

```text
claude --version
echo "dòng này đủ dài để cuộn ngang bên trong khối mã chứ không làm cả trang cuộn ngang trên điện thoại"
```

> Một câu trích ngắn, đặt trong khối trích dẫn.

Đoạn cuối. Nó giữ chỗ cho phần chân bài mà hai lát sau sẽ thêm vào.

## Bảng rộng

| Bề mặt | Trạng thái | Ghi chú dài để thử cột hẹp và xuống dòng | Nguồn |
|---|---|---|---|
| Claude Code | Có | Một ghi chú đủ dài để chiếm vài dòng ở khổ điện thoại và vẫn đọc được khi bảng thành thẻ | [trang thử](/01/) |
| Chat | Chưa rõ | Ghi chú khác, ngắn hơn | [ví dụ](https://example.com/) |

## Chú thích kiểu callout

<aside aria-label="Quan điểm của tôi">

Đây là một khung nhấn. Nó có nhãn do bài đặt, chứa **chữ đậm**, `mã` và một [liên kết nội bộ](/01/).

</aside>

## Khối prompt, chú thích cuối và ảnh

```text
Hãy đọc tệp README.md rồi tóm tắt ba việc cần làm trước khi chạy thử, mỗi việc một dòng.
```

Một câu có chú thích cuối.[^1] Và một hình minh hoạ có alt:

![Hai ô vuông nối nhau bằng một mũi tên, minh hoạ một bước chuyển](./sample-diagram.svg)

[^1]: Nội dung chú thích cuối, đủ dài để thấy nó xuống dòng và có đường quay lại.
