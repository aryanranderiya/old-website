#!/usr/bin/env python3
"""Rewrite the archived markup so it only points at files in this repo.

This is a one-time migration helper for the 2025 snapshot. It is idempotent:
running it again leaves already-rewritten files alone.

Run from the repo root: python3 scripts/rewrite-externals.py
"""

from __future__ import annotations

import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"

PAGES = [
    "index.html",
    "AboutMe.html",
    "Contact.html",
    "DesignProjects.html",
    "Project.html",
    "Resume.html",
    "SoftwareProjects.html",
    "Success.html",
    "404.html",
    "navbar.html",
    "footer.html",
]

SCRIPT_LOCAL = {
    "gsap.min.js": "packages/gsap.min.js",
    "ScrollTrigger.min.js": "packages/ScrollTrigger.min.js",
    "ScrollToPlugin.min.js": "packages/ScrollToPlugin.min.js",
    "lenis.min.js": "packages/lenis.min.js",
    "bootstrap.bundle.min.js": "packages/bootstrap.bundle.min.js",
    "tsparticles.confetti.bundle.min.js": "packages/tsparticles.confetti.bundle.min.js",
    "web3forms-client.js": "packages/web3forms-client.js",
}

REMOTE_SCRIPTS = {
    r"cdnjs\.cloudflare\.com/ajax/libs/gsap/[^\"']*/gsap\.min\.js": "packages/gsap.min.js",
    r"cdnjs\.cloudflare\.com/ajax/libs/gsap/[^\"']*/ScrollTrigger\.min\.js": "packages/ScrollTrigger.min.js",
    r"cdnjs\.cloudflare\.com/ajax/libs/gsap/[^\"']*/ScrollToPlugin\.min\.js": "packages/ScrollToPlugin.min.js",
    r"unpkg\.com/lenis@[^\"']*/dist/lenis\.min\.js": "packages/lenis.min.js",
    r"cdn\.jsdelivr\.net/npm/bootstrap@[^\"']*/dist/js/bootstrap\.bundle\.min\.js": "packages/bootstrap.bundle.min.js",
    r"cdn\.jsdelivr\.net/npm/@tsparticles/confetti@[^\"']*/tsparticles\.confetti\.bundle\.min\.js": "packages/tsparticles.confetti.bundle.min.js",
    r"web3forms\.com/client/script\.js": "packages/web3forms-client.js",
}

SCRIPT_TAG = re.compile(r"<script\b[^>]*?\bsrc=[\"']([^\"']+)[\"'][^>]*>\s*</script>", re.I)
LINK_TAG = re.compile(r"<link\b[^>]*?>", re.I)


def inline_scripts(text: str) -> list[re.Match[str]]:
    return list(re.finditer(r"<script\b(?![^>]*\bsrc=)[^>]*>(.*?)</script>", text, re.I | re.S))


def strip_analytics(text: str) -> str:
    # The GA bootstrap block and the loader tag, in either order.
    text = re.sub(
        r"<script[^>]*src=[\"'][^\"']*googletagmanager\.com/gtag/js[^\"']*[\"'][^>]*>\s*</script>",
        "",
        text,
        flags=re.I,
    )
    for match in reversed(inline_scripts(text)):
        body = match.group(1)
        if "dataLayer" in body and "gtag(" in body:
            text = text[: match.start()] + text[match.end() :]
    return text


def rewrite_scripts(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        url = match.group(1)
        for pattern, local in REMOTE_SCRIPTS.items():
            if re.search(pattern, url):
                return f'<script src="{local}"></script>'
        if "kit.fontawesome.com" in url:
            return '<link rel="stylesheet" type="text/css" href="packages/fontawesome/css/all.min.css" />'
        return match.group(0)

    return SCRIPT_TAG.sub(repl, text)


def rewrite_links(text: str) -> str:
    result = text
    for match in reversed(list(LINK_TAG.finditer(text))):
        tag = match.group(0)
        if "fonts.googleapis.com" in tag or "fonts.gstatic.com" in tag:
            replacement = (
                '<link rel="stylesheet" type="text/css" href="css/materialSymbolsRounded.css" />'
                if "Material+Symbols" in tag
                else ""
            )
            result = result[: match.start()] + replacement + result[match.end() :]
        elif "cdn.jsdelivr.net/gh/devicons/devicon" in tag:
            result = result[: match.start()] + result[match.end() :]
    return result


def rewrite_devicon_images(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        icon = match.group(1)  # e.g. python/python-original
        return f'src="media/icons/devicon/{icon.replace("/", "-")}.svg"'

    return re.sub(
        r'src="https://cdn\.jsdelivr\.net/gh/devicons/devicon@[^"]*/icons/([^"]+)\.svg"',
        repl,
        text,
    )


def rewrite_images(text: str) -> str:
    text = text.replace('https://emojicdn.elk.sh/✏️', 'media/emoji/pencil.png')
    text = text.replace('https://emojicdn.elk.sh/🎨', 'media/emoji/palette.png')
    text = text.replace('https://emojicdn.elk.sh/👨‍💻', 'media/emoji/technologist.png')
    text = text.replace('https://emojicdn.elk.sh/🌐', 'media/emoji/globe.png')
    text = text.replace(
        'https://em-content.zobj.net/source/apple/391/flag-united-kingdom_1f1ec-1f1e7.png',
        'media/icons/flags/flag-united-kingdom.png',
    )
    text = text.replace(
        'https://em-content.zobj.net/source/apple/391/flag-india_1f1ee-1f1f3.png',
        'media/icons/flags/flag-india.png',
    )
    return text


def fix_fonts(text: str) -> str:
    # The Ogg filenames in the markup were guesses; keep the family/weight
    # mapping and point at the files that actually exist.
    fixes = {
        "Ogg-BoldItalic-BF646c18fc5103f.otf": "Ogg-BoldItalic-BF646c18fbc870f.otf",
        "Ogg-Light-BF646c18fc5b737.otf": "Ogg-Light-BF646c18fbb73f7.otf",
        "Ogg-LightItalic-BF646c18fc3aa35.otf": "Ogg-LightItalic-BF646c18fc49421.otf",
        "Ogg-Medium-BF646c18fc565d8.otf": "Ogg-Medium-BF646c18fc4e918.otf",
        "Ogg-RegularItalic-BF646c18fc45f75.otf": "Ogg-RegularItalic-BF646c18fc462a5.otf",
    }
    for old, new in fixes.items():
        text = text.replace(old, new)
    return text


def fix_asset_paths(text: str) -> str:
    text = text.replace('src="./media/bg_aryan_swirl.jpg"', 'src="./media/bg_aryan_swirl.webp"')
    return text


def fix_absolute_links(text: str, page: str) -> str:
    text = text.replace("https://www.aryanranderiya.com/", "https://old.aryanranderiya.com/")
    text = text.replace("https://www.aryanranderiya.com", "https://old.aryanranderiya.com")
    text = text.replace("https://aryanranderiya.com/SoftwareProjects", "SoftwareProjects")
    text = text.replace("https://aryanranderiya.com/Resume", "Resume")
    text = text.replace("https://aryanranderiya.com/DesignProjects", "DesignProjects")
    text = text.replace("https://aryanranderiya.com/Project", "Project")
    text = text.replace("https://aryanranderiya.com/Contact", "Contact")
    text = text.replace("https://aryanranderiya.com", "https://old.aryanranderiya.com")
    if page in {"404.html", "Success.html"}:
        text = text.replace('href="https://old.aryanranderiya.com"', 'href="/"')
    return text


def ensure_assets(text: str) -> str:
    """Make sure every page loads the self-hosted icon and icon fonts."""
    head_end = text.lower().find("</head>")
    if head_end == -1:
        return text
    additions = []
    if "materialSymbolsRounded.css" not in text:
        additions.append('<link rel="stylesheet" type="text/css" href="css/materialSymbolsRounded.css" />')
    if "packages/fontawesome/css/all.min.css" not in text:
        additions.append('<link rel="stylesheet" type="text/css" href="packages/fontawesome/css/all.min.css" />')
    if not additions:
        return text
    return text[:head_end] + "\n    " + "\n    ".join(additions) + "\n  " + text[head_end:]


def main() -> None:
    for name in PAGES:
        file = DOCS / name
        if not file.exists():
            print(f"skip missing {name}")
            continue
        text = file.read_text(encoding="utf-8")
        original = text
        text = strip_analytics(text)
        text = rewrite_scripts(text)
        text = rewrite_links(text)
        text = rewrite_devicon_images(text)
        text = rewrite_images(text)
        text = fix_fonts(text)
        text = fix_asset_paths(text)
        text = fix_absolute_links(text, name)
        if name not in {"navbar.html", "footer.html"}:
            text = ensure_assets(text)
        if text != original:
            file.write_text(text, encoding="utf-8")
            print(f"rewrote {name}")
        else:
            print(f"unchanged {name}")

    # The footer loaded Font Awesome's stylesheet as a script; one stylesheet
    # link in the page heads is enough.
    footer = DOCS / "footer.html"
    text = footer.read_text(encoding="utf-8")
    text = re.sub(
        r'<script\s+defer\s+src="\./packages/fontawesome-free-6\.7\.2-web/[^"]*all\.min\.css"\s+crossorigin="anonymous"\s*>\s*</script>',
        "",
        text,
    )
    text = re.sub(
        r'<script[^>]*fontawesome[^>]*>\s*</script>',
        "",
        text,
    )
    footer.write_text(text, encoding="utf-8")

    # index.css is the Tailwind source (its @imports are build-time only);
    # index_output2.css is the compiled file the page should load.
    index = DOCS / "index.html"
    text = index.read_text(encoding="utf-8")
    text = text.replace('<link rel="stylesheet" type="text/css" href="css/index.css" />', "")
    index.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
