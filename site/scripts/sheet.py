#!/usr/bin/env python3
"""Contact sheets for scripts/shots.cjs: puts the frames of a filmstrip side by side, eight to a sheet, with the
frame number and scroll position under each, so one look shows how a page or a pinned scene unfolds.
usage: python3 scripts/sheet.py <dir with frames.json and f-NN.png>"""
import json, os, sys
from PIL import Image, ImageDraw, ImageFont

d = sys.argv[1]
meta = json.load(open(os.path.join(d, 'frames.json'), encoding='utf-8'))
frames = meta['frames']
PER, COLS = 8, 4
phone = meta['vp'] != 'desktop'
W = 250 if phone else 480            # each frame is scaled to this width
GAP, LABEL = 10, 22
bg, fg, dim = (20, 18, 15), (237, 230, 218), (141, 131, 118)

def font(size):
    for p in ('/usr/share/fonts/truetype/jetbrains-mono/JetBrainsMono-Regular.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'):
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

f = font(13)
sheets = 0
for s in range(0, len(frames), PER):
    chunk = frames[s:s + PER]
    ims = []
    for fr in chunk:
        im = Image.open(os.path.join(d, fr['file'])).convert('RGB')
        im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
        ims.append(im)
    h = max(i.height for i in ims)
    cols = min(COLS, len(ims)); rows = (len(ims) + COLS - 1) // COLS
    sheet = Image.new('RGB', (cols * W + (cols + 1) * GAP, rows * (h + LABEL) + (rows + 1) * GAP), bg)
    dr = ImageDraw.Draw(sheet)
    for k, (im, fr) in enumerate(zip(ims, chunk)):
        x = GAP + (k % COLS) * (W + GAP); y = GAP + (k // COLS) * (h + LABEL + GAP)
        sheet.paste(im, (x, y))
        dr.rectangle([x - 1, y - 1, x + W, y + im.height], outline=(60, 54, 46))
        dr.text((x, y + im.height + 4), f"{s + k:02d}  y={fr['y']}  {fr['pct']}%", fill=dim, font=f)
    sheets += 1
    sheet.save(os.path.join(d, f'sheet-{sheets}.png'))
print(f'{sheets} contact sheet(s): ' + ', '.join(f'sheet-{i}.png' for i in range(1, sheets + 1)))
