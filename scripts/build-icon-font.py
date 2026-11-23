#!/usr/bin/env python3
"""Build the tiny self-hosted Material Symbols subset.

The variable icon font Google serves is ~5 MB because every icon is a glyph
reachable through a ligature. The archive only uses a couple of dozen icons, so
this script maps each icon name to its Private Use Area codepoint, rewrites the
markup to use those codepoints directly, and subsets the font. Result: ~20 KB.

Run from the repo root: python3 scripts/build-icon-font.py
Requires: fonttools, brotli (pip install fonttools brotli)
"""

from __future__ import annotations

import pathlib
import re
import sys

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
FONT = ROOT / ".cache/material-symbols-rounded.woff2"
SUBSET_FONT = DOCS / "media/fonts/material-symbols-rounded.subset.woff2"

NAMES = [
    "arrow_back",
    "arrow_downward",
    "arrow_forward",
    "arrow_outward",
    "apps",
    "arrow_right_alt",
    "category",
    "chat",
    "chevron_left",
    "chevron_right",
    "construction",
    "devices",
    "download",
    "file_open",
    "home",
    "info",
    "open_in_new",
    "outgoing_mail",
    "palette",
    "payments",
    "photo_library",
    "star",
    "terminal",
    "trophy",
    "vertical_align_top",
]

SPAN_RE = re.compile(
    r'(<span[^>]*class="material-symbols-(?:rounded|outlined)[^"]*"[^>]*>)\s*([a-z_0-9]+)\s*(</span\s*>)'
)


def main() -> int:
    if not FONT.exists():
        print(f"missing {FONT}; run scripts/vendor-externals.mjs first", file=sys.stderr)
        return 1

    font = TTFont(FONT)
    cmap = font.getBestCmap()
    by_glyph: dict[str, list[int]] = {}
    for codepoint, glyph in cmap.items():
        by_glyph.setdefault(glyph, []).append(codepoint)

    codepoints: dict[str, int] = {}
    for name in NAMES:
        hits = sorted(by_glyph.get(name, []))
        if not hits:
            print(f"no codepoint for {name}", file=sys.stderr)
            return 1
        codepoints[name] = hits[0]

    # Rewrite static markup.
    changed = 0
    for file in DOCS.glob("*.html"):
        text = file.read_text(encoding="utf-8")

        def repl(match: re.Match[str]) -> str:
            nonlocal changed
            name = match.group(2)
            if name not in codepoints:
                return match.group(0)
            changed += 1
            return f"{match.group(1)}&#x{codepoints[name]:x};{match.group(3)}"

        updated = SPAN_RE.sub(repl, text)
        if updated != text:
            file.write_text(updated, encoding="utf-8")

    # Rewrite icon markup generated in JavaScript (project cards).
    js = DOCS / "js/modules/pages/softwareProjects/projectCards.js"
    text = js.read_text(encoding="utf-8")
    for name in ("star", "payments", "trophy"):
        text = text.replace(
            f'<span class="material-symbols-rounded">{name}</span>',
            f'<span class="material-symbols-rounded">&#x{codepoints[name]:x};</span>',
        )
    js.write_text(text, encoding="utf-8")

    subset.main(
        [
            str(FONT),
            f"--output-file={SUBSET_FONT}",
            "--flavor=woff2",
            "--no-hinting",
            "--layout-features=",
            "--unicodes=" + ",".join(f"U+{cp:04X}" for cp in codepoints.values()),
        ]
    )
    print(f"icons rewritten: {changed}; subset: {SUBSET_FONT.stat().st_size} bytes")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
