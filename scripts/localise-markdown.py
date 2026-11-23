#!/usr/bin/env python3
"""Localise images referenced from the markdown documentation files.

The docs were exported from GitHub/Firebase and still embed remote images.
Each image is matched to the same file in the 2026 portfolio, or downloaded,
then the markdown is rewritten to a path the project page can resolve.

Run from the repo root: python3 scripts/localise-markdown.py
"""

from __future__ import annotations

import pathlib
import re
import shutil
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
SOURCE = (ROOT.parent / "website/public/images").resolve()

IMAGE_RE = re.compile(r"(!\[[^\]]*\]\()(https?://[^)\s]+)(\))")
HTML_IMG_RE = re.compile(r'(<img\b[^>]*\bsrc=["\'])(https?://[^"\']+)(["\'])')

IGNORED_HOSTS = {"behance.net", "console.cloud.google.com", "developers.google.com"}


def find_local(url: str) -> pathlib.Path | None:
    parsed = urllib.parse.urlparse(url)
    name = urllib.parse.unquote(parsed.path.rsplit("/", 1)[-1])
    stem = pathlib.Path(name).stem.lower()
    if not SOURCE.is_dir():
        return None
    for candidate in SOURCE.rglob(f"{stem}.*"):
        if candidate.is_file():
            return candidate
    return None


def download(url: str, target: pathlib.Path) -> bool:
    try:
        request = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(request, timeout=45) as response:
            if response.status != 200:
                return False
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(response.read())
            return True
    except Exception as error:  # noqa: BLE001 - report and continue
        print(f"  failed {url}: {error}")
        return False


def localise(url: str, doc: pathlib.Path) -> str | None:
    slug = doc.parent.name
    parsed = urllib.parse.urlparse(url)

    source = find_local(url)
    if source:
        target = DOCS / "media/projects" / slug / source.name
        target.parent.mkdir(parents=True, exist_ok=True)
        if not target.exists():
            shutil.copy2(source, target)
        return f"media/projects/{slug}/{source.name}"

    if parsed.hostname in IGNORED_HOSTS:
        return None

    name = urllib.parse.unquote(parsed.path.rsplit("/", 1)[-1])
    suffix = pathlib.Path(name).suffix or ".png"
    target = DOCS / "media/projects" / slug / "docs" / f"{abs(hash(url))}{suffix}"
    if target.exists() or download(url, target):
        return f"media/projects/{slug}/docs/{target.name}"
    return None


def main() -> None:
    docs = list((DOCS / "media").rglob("*.md"))
    changed = 0
    for doc in docs:
        text = doc.read_text(encoding="utf-8")

        def repl(match: re.Match[str]) -> str:
            local = localise(match.group(2), doc)
            return f"{match.group(1)}{local or match.group(2)}{match.group(3)}"

        updated = IMAGE_RE.sub(repl, text)
        updated = HTML_IMG_RE.sub(
            lambda match: f"{match.group(1)}{localise(match.group(2), doc) or match.group(2)}{match.group(3)}",
            updated,
        )
        if updated != text:
            doc.write_text(updated, encoding="utf-8")
            changed += 1
            print(f"rewrote {doc.relative_to(DOCS)}")
    print(f"{changed} files changed")


if __name__ == "__main__":
    main()
