#!/usr/bin/env python3
"""Localise every project asset referenced by docs/db.json.

The 2025 site kept its media in Firebase Storage. That bucket's billing
account was deleted, so every URL now returns 403. The 2026 portfolio already
mirrors the same screenshots as optimised WebP, so this script copies them in
and rewrites db.json to relative paths.

Source media lives outside this repo (the new site). Point ARCHIVE_MEDIA_SOURCE
at `public/images/projects` of aryanranderiya/website if it moves.

Run from the repo root: python3 scripts/sync-project-media.py
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import shutil
import urllib.parse

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
DB = DOCS / "db/db.json"
SOURCE = pathlib.Path(
    os.environ.get("ARCHIVE_MEDIA_SOURCE", ROOT.parent / "website/public/images/projects")
).resolve()

FOLDER_TO_SLUG = {
    "Encode_Official Website": "encode",
    "Rezrek": "rezrek",
    "Pesronal_Blog": "blog-nextjs",
    "DungeonQuest": "dungeon-quest",
    "Slate": "slate",
    "IEEE": "ieeecs-website",
    "Nasa_Space Apps Hackathon 2024": "sustain",
    "Personal_Portfolio": "old-portfolio",
    "BlinkAnalytics": "blink-analytics",
    "MWI": "mwi",
    "LyfeLane": "lyfelane",
    "Wi-Fi_Attendance": "wifi-attendance",
    "Spotify_Tools": "spotify-tools",
    "Google_Contacts Email Scraper": "google-contacts-scraper",
    "URL_Shortener": "url-shortener",
    "TicketBus": "ticketbus",
    "Portfolio": "old-portfolio",
    "YouTube_Shorts Automator": "youtube-shorts-automator",
    "University_Research Portal": "university-research-portal",
    "GAIA": "gaia",
    "Resume": "resume",
}

# Old filename -> file that holds the same asset in the new site.
ICON_ALIASES = {
    "express-original-wordmark-svg.png": "media/icons/devicon/express-express-original-wordmark.svg",
    "flask-original-svg.svg": "media/icons/devicon/flask-flask-original.svg",
    "github-original-svg.svg": "media/icons/devicon/github-github-original.svg",
    "vercel-original-wordmark-svg.svg": "media/icons/devicon/vercel-vercel-original-wordmark.svg",
}

ALIASES = {
    ("Personal_Portfolio", "Gaia-1.png"): "gaia/gaia-dashboard.webp",
    ("Personal_Portfolio", "mwicollage.png"): "mwi/1.webp",
    ("Personal_Portfolio", "Untitled video - Made with Clipchamp (3).mp4"): "@blogvideo",
    ("Portfolio", "PortfolioRecordingCompressed.mp4"): "@blogvideo",
    ("ClientWork", "lyfelanecollage.webp"): "lyfelane/1.webp",
    ("Rezrek", "image (1).png"): "rezrek/rezrek-main.webp",
    ("Rezrek", "rezrek main.webp"): "rezrek/rezrek-main.webp",
    ("Rezrek", "aditygandhi.webp"): "@avatar-aditya",
    ("Rezrek", "khevnagandhi.webp"): "@avatar-khevna",
    ("DungeonQuest", "Screenshot from 2025-04-17 14-43-46.png"): "dungeon-quest/screenshot-1.webp",
    ("Resume", "Aryan Randeriya Resume.pdf"): "@resume",
}

# Documentation files that were stored under a Firebase path.
DOC_ALIASES = {
    ("TicketBus", "TicketBus_documentation.md"): "ticketbus/5_project_TicketBus_1712174799259_documentation.md",
    ("Portfolio", "README.md"): "old-portfolio/README.md",
}


def decode_path(url: str) -> tuple[str, str, str] | None:
    parsed = urllib.parse.urlparse(url)
    raw = urllib.parse.unquote(parsed.path).lstrip("/")
    if not raw:
        return None
    # Paths look like: <bucket>/ProjectMedia/<folder>/<file>
    # or the older Style: <bucket>/ProjectMedia%2F<folder>%2F<file> (already decoded).
    parts = raw.split("/")
    if len(parts) >= 2 and parts[0] == "aryanranderiya-portfolio.appspot.com":
        parts = parts[1:]
    if parts and parts[0] == "ProjectMedia":
        parts = parts[1:]
    if len(parts) == 1 and "ProjectMedia" in parts[0]:
        parts = parts[0].split("ProjectMedia", 1)[1].lstrip("/").split("/")
    if len(parts) < 2:
        folder = "ClientWork"
        filename = parts[0] if parts else ""
    else:
        folder = parts[0]
        filename = parts[-1]
    # Old URLs collapsed project sub-folders into one name; the first segment
    # is the project folder either way.
    if folder == "ClientWork":
        return ("ClientWork", "ClientWork", filename)
    return (folder, folder, filename)


def find_in_source(slug: str, filename: str) -> pathlib.Path | None:
    folder = SOURCE / slug
    if not folder.is_dir():
        return None
    stem = re.sub(r"[^a-z0-9]+", "-", pathlib.Path(filename).stem.lower()).strip("-")
    candidates = [
        file
        for file in folder.iterdir()
        if file.is_file()
        and re.sub(r"[^a-z0-9]+", "-", file.stem.lower()).strip("-") == stem
    ]
    if candidates:
        # Prefer the smallest modern format when several exist.
        order = {".webp": 0, ".avif": 1, ".png": 2, ".jpeg": 3, ".jpg": 4, ".svg": 5, ".mp4": 6, ".md": 7}
        return sorted(candidates, key=lambda f: (order.get(f.suffix.lower(), 9), f.name))[0]
    return None


def copy_asset(src: pathlib.Path, slug: str) -> str:
    dest_dir = DOCS / "media" / "projects" / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / src.name
    if not dest.exists() or dest.stat().st_size != src.stat().st_size:
        shutil.copy2(src, dest)
    return f"media/projects/{slug}/{src.name}"


def main() -> int:
    if not DB.exists():
        print(f"missing {DB}")
        return 1
    data = json.loads(DB.read_text(encoding="utf-8"))
    mapping: dict[str, str] = {}
    unresolved: list[str] = []

    def localise(value: str) -> str:
        if not value.startswith(("http://", "https://")):
            return value
        if value in mapping:
            return mapping[value]
        icon_name = value.rsplit("/", 1)[-1]
        if icon_name in ICON_ALIASES:
            mapping[value] = ICON_ALIASES[icon_name]
            return ICON_ALIASES[icon_name]
        if re.match(r"^https://(storage\.googleapis\.com|cdn\.jsdelivr\.net)", value):
            if "cdn.jsdelivr.net" in value and "/icons/" in value:
                icon = value.split("/icons/", 1)[1]
                local = f"media/icons/devicon/{icon.replace('/', '-')}"
                mapping[value] = local
                return local
            parsed = decode_path(value)
            if parsed:
                folder, slug_hint, filename = parsed
                slug = FOLDER_TO_SLUG.get(folder, slug_hint.lower())
                source = find_in_source(slug, filename)
                if source is None:
                    alias = ALIASES.get((folder, filename)) or DOC_ALIASES.get((folder, filename))
                    if alias == "@resume":
                        source = ROOT.parent / "website/public/resume.pdf"
                    elif alias == "@blogvideo":
                        # Portfolio recording lives under public/images/blog.
                        source = SOURCE.parent / "blog/building-my-portfolio/portfolio.mp4"
                    elif alias == "@avatar-aditya":
                        source = DOCS / "media/testimonials/aditya-gandhi.svg"
                        slug = "testimonials"
                    elif alias == "@avatar-khevna":
                        source = DOCS / "media/testimonials/khevna-gandhi.svg"
                        slug = "testimonials"
                    elif alias:
                        source = SOURCE / alias
                        slug = pathlib.Path(alias).parent.name
                if source is not None and source.is_file():
                    local = copy_asset(source, slug)
                    mapping[value] = local
                    return local
        unresolved.append(value)
        return value

    def walk(obj):
        if isinstance(obj, dict):
            return {key: walk(value) for key, value in obj.items()}
        if isinstance(obj, list):
            return [walk(value) for value in obj]
        if isinstance(obj, str):
            return localise(obj)
        return obj

    data = walk(data)

    # Site-level links inside the data snapshot.
    def fix_links(obj):
        if isinstance(obj, dict):
            return {key: fix_links(value) for key, value in obj.items()}
        if isinstance(obj, list):
            return [fix_links(value) for value in obj]
        if isinstance(obj, str):
            if obj == "https://aryanranderiya.com/media/cdn/TicketBusDocumentation.pdf":
                return "https://github.com/aryanranderiya/TicketBus"
            return obj.replace("https://aryanranderiya.com", "https://old.aryanranderiya.com")
        return obj

    data = fix_links(data)
    DB.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"localised {len(mapping)} urls")
    if unresolved:
        print(f"unresolved {len(unresolved)}:")
        for url in sorted(set(unresolved)):
            print("  ", url)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
