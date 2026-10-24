#!/usr/bin/env python3
"""Bundle index.html + assets into one self-contained HTML file.

Usage:  python3 tools/build-standalone.py
Output: dist/flight-standalone.html
"""
import base64
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent


def datauri(path: str, mime: str) -> str:
    blob = (ROOT / path).read_bytes()
    return f"data:{mime};base64," + base64.b64encode(blob).decode()


def main() -> None:
    html = (ROOT / "index.html").read_text()
    css = (ROOT / "assets/styles.css").read_text()
    js = (ROOT / "assets/app.js").read_text()

    images = {
        "assets/hero-jet.jpg": datauri("assets/hero-jet.jpg", "image/jpeg"),
        "assets/cabin.jpg": datauri("assets/cabin.jpg", "image/jpeg"),
        "assets/crew.jpg": datauri("assets/crew.jpg", "image/jpeg"),
    }

    css = css.replace('url("hero-jet.jpg")', f'url("{images["assets/hero-jet.jpg"]}")')
    html = html.replace('<link rel="preload" as="image" href="assets/hero-jet.jpg" />', "")
    html = html.replace(
        '<link rel="stylesheet" href="assets/styles.css" />', "<style>\n" + css + "\n</style>"
    )
    for path, uri in images.items():
        html = html.replace(f'src="{path}"', f'src="{uri}"')
        html = html.replace(f'content="{path}"', f'content="{uri}"')
    html = html.replace(
        '<script src="assets/app.js"></script>', "<script>\n" + js + "\n</script>"
    )

    leftover = set(re.findall(r'(?:href|src)="(?!#|https?://|data:)([^"]+)"', html))
    if leftover:
        raise SystemExit(f"Un-inlined local references remain: {sorted(leftover)}")

    out = ROOT / "dist/flight-standalone.html"
    out.parent.mkdir(exist_ok=True)
    out.write_text(html)
    print(f"Wrote {out.relative_to(ROOT)} ({out.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
