#!/usr/bin/env python3
"""Build the standalone previews/ folder: one file per component x theme, with tokens,
bundle.css and bundle.js inlined, plus previews/index.html.

usage: python3 tools/build-previews.py            (run from the repo root)
Needs design-system/tokens.css to be current (tools/tokens2css.py).
"""
import html
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DS = os.path.join(ROOT, "design-system")
OUT = os.path.join(ROOT, "previews")
COMP = os.path.join(DS, "components")


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def main():
    tokens = read(os.path.join(DS, "tokens.css"))
    bcss = read(os.path.join(COMP, "bundle.css"))
    bjs = read(os.path.join(COMP, "bundle.js"))
    os.makedirs(OUT, exist_ok=True)
    rows = []
    for c in sorted(os.listdir(COMP)):
        src = os.path.join(COMP, c, "preview.html")
        if not os.path.isfile(src):
            continue
        page = read(src)
        m = re.search(r'@dsCard[^>]*subtitle="([^"]*)"', page)
        subtitle = m.group(1) if m else ""
        for theme in ("dark", "light"):
            out = page.replace("<head>", f"<head><style>{tokens}</style><style>{bcss}</style><script>{bjs}</script>", 1)
            out = out.replace('<html lang="vi">', f'<html lang="vi" data-theme="{theme}">', 1)
            with open(os.path.join(OUT, f"{c}-{theme}.html"), "w", encoding="utf-8") as f:
                f.write(out)
        rows.append(
            f'<tr><th scope="row">{c}</th><td>{html.escape(subtitle)}</td>'
            f'<td class="l"><a href="{c}-dark.html">[ dark ]</a> <a href="{c}-light.html">[ light ]</a></td></tr>'
        )
    index = INDEX.replace("{N}", str(len(rows))).replace("{ROWS}", "\n".join(rows))
    with open(os.path.join(OUT, "index.html"), "w", encoding="utf-8") as f:
        f.write(index)
    print(f"ok: {len(rows)} components, {len(rows) * 2} files + index.html")


INDEX = """<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>No Babysitting · Previews</title>
<style>
  :root { --bg:#14120f; --fg:#ede6da; --muted:#ada395; --line:#756a5e; --accent:#d97a4a; }
  @media (prefers-color-scheme: light) { :root { --bg:#f2efe9; --fg:#1a1714; --muted:#575047; --line:#857c70; --accent:#a0461f; } }
  body { margin:0; background:var(--bg); color:var(--fg); font:15px/1.5 system-ui, sans-serif; padding:24px 16px; }
  main { max-width:980px; margin:0 auto; }
  h1 { font:800 28px/1.1 system-ui, sans-serif; letter-spacing:.02em; text-transform:uppercase; margin:0 0 6px; }
  p { color:var(--muted); margin:0 0 20px; }
  table { width:100%; border-collapse:collapse; }
  th, td { text-align:left; vertical-align:top; padding:10px 8px; border-top:1px solid var(--line); }
  th { font:600 13px/1.4 ui-monospace, Menlo, monospace; white-space:nowrap; }
  td { color:var(--muted); }
  td.l { white-space:nowrap; }
  a { color:var(--fg); font:600 12px/1 ui-monospace, Menlo, monospace; text-decoration:none; margin-right:8px; }
  a:hover { text-decoration:underline; }
  @media (max-width:640px) { td:nth-child(2) { display:none; } }
</style>
</head>
<body>
<main>
<h1>No Babysitting · Previews</h1>
<p>{N} component, mỗi cái 2 theme. File đã nhúng sẵn token và runtime; cần mạng để tải font (Google Fonts) và GSAP 3.15.0 (jsDelivr). Trạng thái từng component: design-system/SOURCE-OF-TRUTH.md.</p>
<table>
<thead><tr><th>Component</th><td>Mô tả</td><td>Theme</td></tr></thead>
<tbody>
{ROWS}
</tbody>
</table>
</main>
</body>
</html>
"""

if __name__ == "__main__":
    main()
