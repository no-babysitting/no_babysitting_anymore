import json, sys

t = json.load(open(sys.argv[1]))
out = []
themes = [th['id'] for th in t['color']['themes']]


def val(tok, th):
    v = tok['value']
    if isinstance(v, str):
        return v
    return v.get(th, v[themes[0]])


def css(v):
    return f"var(--{v[1:-1]})" if v.startswith('{') else v


for i, th in enumerate(themes):
    sel = f':root, [data-theme="{th}"]' if i == 0 else f'[data-theme="{th}"]'
    lines = [f"--{tok['name']}:{css(val(tok, th))};" for tok in t['color']['tokens']]
    lines += [f"--{tok['name']}:{val(tok, th)};" for tok in t['shadow']['tokens']]
    out.append(sel + '{' + ''.join(lines) + '}')
root = []
for fam in ['spacing', 'radius', 'duration', 'easing', 'layout']:
    root += [f"--{tok['name']}:{tok['value']};" for tok in t[fam]['tokens']]
root += [f"--font-{k}:{v};" for k, v in t['type']['families'].items()]
out.append(':root{' + ''.join(root) + '}')
open(sys.argv[2], 'w').write('\n'.join(out))
print('ok', len(out))
