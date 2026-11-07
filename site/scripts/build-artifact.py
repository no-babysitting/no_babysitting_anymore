#!/usr/bin/env python3
"""Turn site/dist into a claude.ai artifact folder: every CSS/JS file is inlined (the artifact CSP
only admits a few CDNs), links become relative, and the entry page loses its <html>/<head>/<body>
wrapper because the artifact host adds its own.   usage: python3 scripts/build-artifact.py <outdir>"""
import os, re, sys
DIST = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist')
OUT = sys.argv[1]

def read(p):
    with open(os.path.join(DIST, p.lstrip('/')), encoding='utf-8') as f:
        return f.read()

def inline(html):
    html = re.sub(r'<link rel="stylesheet" href="(/[^"]+\.css)"\s*/?>', lambda m: '<style>' + read(m.group(1)) + '</style>', html)
    html = re.sub(r'<script type="module" src="(/[^"]+\.js)"></script>', lambda m: '<script type="module">' + read(m.group(1)).replace('</script', '<\\/script') + '</script>', html)
    html = re.sub(r'<script src="(/[^"]+\.js)"></script>', lambda m: '<script>' + read(m.group(1)).replace('</script', '<\\/script') + '</script>', html)
    return html

def page(src, links):
    html = inline(read(src))
    for a, b in links.items():
        html = html.replace(f'href="{a}"', f'href="{b}"')
    return html

os.makedirs(os.path.join(OUT, 'c02'), exist_ok=True)
# entry page: strip the document wrapper, keep head content (title, fonts, styles) at the top
idx = page('index.html', {'/c02/': 'c02/index.html'})
head = re.search(r'<head>(.*?)</head>', idx, re.S).group(1)
head = re.sub(r'<meta charset="utf-8"\s*/?>|<meta name="viewport"[^>]*>', '', head)
body = re.search(r'<body[^>]*>(.*)</body>', idx, re.S).group(1)
open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(head + '\n<div class="nb">' + body + '</div>\n')
open(os.path.join(OUT, 'c02', 'index.html'), 'w', encoding='utf-8').write(page('c02/index.html', {'/': '../index.html'}))
print('artifact folder:', OUT)
