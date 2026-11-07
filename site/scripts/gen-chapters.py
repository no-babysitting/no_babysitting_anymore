#!/usr/bin/env python3
"""Read docs/02-pedagogical-script.md and write src/content/chapters.json:
id, number, English and Vietnamese titles, level, minutes, goals, misconception, beats, sources.
The script document stays the single source of chapter structure."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', '..', 'docs', '02-pedagogical-script.md')
OUT = os.path.join(HERE, '..', 'src', 'content', 'chapters.json')
text = open(SRC, encoding='utf-8').read()
heads = list(re.finditer(r'^## (Mở đầu|\d\db?) · (.+?) \((.+?)\)\s*$', text, re.M))
chapters = []
for i, h in enumerate(heads):
    end = heads[i + 1].start() if i + 1 < len(heads) else text.find('## Phụ lục')
    body = text[h.end():end]
    meta = re.search(r'^`(c\d+b?)` · (.+)$', body, re.M)
    cid = meta.group(1)
    parts = [p.strip() for p in meta.group(2).split('·')]
    level = parts[0] if not re.match(r"\d", parts[0]) else ''
    minutes = next((p for p in parts if re.match(r"\d+'/\d+'", p)), '')
    def line(label):
        m = re.search(r'^\*\*' + label + r':\*\*\s*(.+)$', body, re.M)
        return m.group(1).strip() if m else ''
    beats = []
    for r in re.finditer(r'^\| (b\d+) \| ([^|]+) \| (.+?) \| ([^|]*) \|\s*$', body, re.M):
        beats.append({'id': r.group(1), 'phase': r.group(2).strip(), 'text': r.group(3).strip()})
    q = ''
    if beats:
        m = re.search(r'\*\*"?(.+?)"?\*\*', beats[0]['text'])
        q = (m.group(1) if m else beats[0]['text']).strip('"“” ')
    src = re.search(r'^\*\*Nguồn:\*\*\s*(.+)$', body, re.M)
    no = '00' if h.group(1) == 'Mở đầu' else h.group(1).replace(' ', '')
    chapters.append({'id': cid, 'no': no, 'en': h.group(2).strip(), 'vi': h.group(3).strip(), 'level': level,
                     'minutes': minutes, 'goals': line('Mục tiêu'), 'myth': line('Hiểu lầm → Sự thật'),
                     'question': q, 'beats': beats, 'sources': src.group(1).strip() if src else ''})
json.dump(chapters, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(chapters), 'chapters ->', [c['id'] for c in chapters])
