#!/usr/bin/env python3
"""Turn site/dist into a claude.ai artifact folder: every CSS/JS file is inlined (the artifact CSP
only admits a few CDNs), site-absolute links become relative ('/c03/' -> '../c03/index.html'), and
the entry page loses its <html>/<head>/<body> wrapper because the artifact host adds its own.
usage: python3 scripts/build-artifact.py <outdir>"""
import base64, os, re, sys
DIST = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'dist'))
OUT = sys.argv[1]

def read(p):
    with open(os.path.join(DIST, p.lstrip('/')), encoding='utf-8') as f:
        return f.read()

def convert(rel):
    html = read(rel)
    # analytics never runs inside an artifact (its CSP blocks the script, and framed pages are not counted)
    html = re.sub(r'<script[^>]*data-goatcounter[^>]*></script>', '', html)
    # the 5 KB symbols font rides along as a data: URI; the artifact has no site root to serve it from
    html = re.sub(r"url\('(/fonts/[^']+\.woff2)'\)", lambda m: "url('data:font/woff2;base64," + base64.b64encode(open(os.path.join(DIST, m.group(1).lstrip('/')), 'rb').read()).decode() + "')", html)
    html = re.sub(r'<link rel="stylesheet" href="(/[^"]+\.css)"\s*/?>', lambda m: '<style>' + read(m.group(1)) + '</style>', html)
    html = re.sub(r'<script type="module" src="(/[^"]+\.js)"></script>', lambda m: '<script type="module">' + read(m.group(1)).replace('</script', '<\\/script') + '</script>', html)
    html = re.sub(r'<script src="(/[^"]+\.js)"></script>', lambda m: '<script>' + read(m.group(1)).replace('</script', '<\\/script') + '</script>', html)
    here = os.path.dirname(rel)
    def link(m):
        target = m.group(1)
        target = target + 'index.html' if target.endswith('/') else target
        return 'href="' + os.path.relpath(target.lstrip('/') or 'index.html', here or '.') + '"'
    return re.sub(r'href="(/[^"]*)"', link, html)

pages = sorted(os.path.relpath(os.path.join(d, f), DIST) for d, _, fs in os.walk(DIST) for f in fs if f == 'index.html')
for rel in pages:
    html = convert(rel)
    dst = os.path.join(OUT, rel); os.makedirs(os.path.dirname(dst), exist_ok=True)
    if rel == 'index.html':  # entry page: strip the document wrapper, keep head content at the top
        head = re.search(r'<head>(.*?)</head>', html, re.S).group(1)
        head = re.sub(r'<meta charset="utf-8"\s*/?>|<meta name="viewport"[^>]*>', '', head)
        # the artifact's name in the gallery: say it is the website, not the design system
        head = re.sub(r'<title>[^<]*</title>', '<title>No Babysitting Website</title>', head, count=1)
        # keep everything after <body ...>: Astro may emit page scripts after </body> and even </html>
        start = html.index('>', html.index('<body')) + 1
        body = html[start:].replace('</body>', '').replace('</html>', '')
        html = head + '\n<div class="nb">' + body + '</div>\n'
    open(dst, 'w', encoding='utf-8').write(html)
print(len(pages), 'pages ->', OUT)
