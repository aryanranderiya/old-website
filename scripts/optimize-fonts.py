#!/usr/bin/env python3
"""Convert every bundled font that is not already WOFF2 to WOFF2.

The archive ships a pile of OTF/TTF/WOFF files from the design work. WOFF2 is
smaller and supported everywhere that matters, so references are rewritten and
the original formats are removed.

Run from the repo root: python3 scripts/optimize-fonts.py
Requires: fonttools, brotli
"""

from __future__ import annotations

import pathlib
import re

from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
FONT_REF = re.compile(r"(?:\.\./|\./)?fonts/([^\"')\s]+\.(?:otf|ttf|woff))\b", re.I)


def main() -> None:
    refs = set()
    for file in list(DOCS.glob("*.html")) + list(DOCS.glob("css/*.css")):
        text = file.read_text(encoding="utf-8")
        for match in FONT_REF.finditer(text):
            refs.add(match.group(1))

    converted = 0
    for name in sorted(refs):
        source = DOCS / "fonts" / name
        if not source.exists():
            print(f"missing {name}")
            continue
        target = source.with_suffix(".woff2")
        if not target.exists() or target.stat().st_size == 0:
            font = TTFont(source)
            font.flavor = "woff2"
            font.save(target)
            converted += 1
            print(f"{name} -> {target.name} ({target.stat().st_size} bytes)")

    # Rewrite the references to the woff2 file.
    for file in list(DOCS.glob("*.html")) + list(DOCS.glob("css/*.css")):
        text = file.read_text(encoding="utf-8")
        updated = text
        for name in refs:
            woff2 = str(pathlib.Path(name).with_suffix(".woff2"))
            if woff2 == name:
                continue
            updated = updated.replace(f"fonts/{name}", f"fonts/{woff2}")
        if updated != text:
            file.write_text(updated, encoding="utf-8")

    print(f"converted {converted} fonts")


if __name__ == "__main__":
    main()
