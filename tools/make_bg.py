"""Собирает шахматный тайл для фона: сахура / Даша.

Запуск из папки dasha-site:
    python tools/make_bg.py
"""

import os

from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
IMG = os.path.join(ROOT, "img")

CELL = 200


def square(path: str, size: int) -> Image.Image:
    with Image.open(path) as raw:
        return ImageOps.fit(raw.convert("RGB"), (size, size), Image.LANCZOS)


def main() -> None:
    log = square(os.path.join(IMG, "log.jpg"), CELL)
    her = square(os.path.join(IMG, "dasha.webp"), CELL)

    tile = Image.new("RGB", (CELL * 2, CELL * 2))
    tile.paste(log, (0, 0))
    tile.paste(her, (CELL, 0))
    tile.paste(her, (0, CELL))
    tile.paste(log, (CELL, CELL))

    out = os.path.join(IMG, "bg-tile.jpg")
    tile.save(out, "JPEG", quality=82, optimize=True)
    print(f"saved: {out} ({os.path.getsize(out)} bytes, {tile.width}x{tile.height})")


if __name__ == "__main__":
    main()
