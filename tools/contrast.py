#!/usr/bin/env python3
"""Contrast report for text tokens over every surface, both themes (WCAG 2.x).

usage: python3 tools/contrast.py design-system/tokens.json [--fail]
Prints one row per (theme, text token, surface). With --fail, exits 1 if a pair
that the token's own rules allow falls below its required ratio.
"""
import json
import sys

TEXT = ["fg", "fg-muted", "fg-subtle", "accent", "signal", "warn", "danger", "info"]
SURFACES = ["bg", "bg-raised", "bg-sunken"]
# Minimum ratio each text token must reach on each surface it is allowed on.
# bg-sunken carries only fg (tokens.json: "Trên nền này chỉ dùng chữ fg").
NEED = {t: {"bg": 4.5, "bg-raised": 4.5} for t in TEXT}
NEED["fg"]["bg-sunken"] = 4.5
NEED["control"] = {"bg": 3.0, "bg-raised": 3.0}  # non-text UI boundary (WCAG 1.4.11)


def lum(hexv):
    hexv = hexv.lstrip("#")
    out = []
    for i in (0, 2, 4):
        c = int(hexv[i:i + 2], 16) / 255
        out.append(c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4)
    return 0.2126 * out[0] + 0.7152 * out[1] + 0.0722 * out[2]


def ratio(a, b):
    la, lb = sorted((lum(a), lum(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def main():
    data = json.load(open(sys.argv[1], encoding="utf-8"))
    toks = {t["name"]: t["value"] for t in data["color"]["tokens"] if isinstance(t["value"], dict)}
    bad = 0
    for theme in ("dark", "light"):
        print(f"\n{theme}")
        for t in TEXT + ["control"]:
            row = []
            for s in SURFACES:
                r = ratio(toks[t][theme], toks[s][theme])
                need = NEED.get(t, {}).get(s)
                flag = ""
                if need is not None and r < need:
                    flag = " FAIL"
                    bad += 1
                elif need is None:
                    flag = " (n/a)"
                row.append(f"{s}:{r:5.2f}{flag}")
            print(f"  {t:10s} " + "  ".join(row))
    print(f"\n{bad} failing pair(s)")
    if "--fail" in sys.argv and bad:
        sys.exit(1)


if __name__ == "__main__":
    main()
