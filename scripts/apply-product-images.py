from __future__ import annotations

import json
import re
import shutil
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "data" / "catalog.json"
IMAGE_ROOT = ROOT / "assets" / "products"
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}

CYR_TO_LATIN = str.maketrans(
    {
        "а": "a",
        "в": "b",
        "с": "c",
        "е": "e",
        "н": "h",
        "к": "k",
        "м": "m",
        "о": "o",
        "р": "p",
        "т": "t",
        "х": "x",
        "у": "y",
        "ё": "e",
    }
)


def normalize(value: object) -> str:
    return str(value or "").strip().lower().replace(",", ".").replace(" ", "")


def translit(value: str) -> str:
    return value.translate(CYR_TO_LATIN)


def flatten_images() -> None:
    IMAGE_ROOT.mkdir(parents=True, exist_ok=True)
    for file in sorted(IMAGE_ROOT.rglob("*")):
        if not file.is_file() or file.suffix.lower() not in IMAGE_EXTS:
            continue
        if file.parent == IMAGE_ROOT:
            continue
        target = IMAGE_ROOT / file.name
        if target.exists():
            stem = target.stem
            suffix = target.suffix
            index = 2
            while (IMAGE_ROOT / f"{stem}-{index}{suffix}").exists():
                index += 1
            target = IMAGE_ROOT / f"{stem}-{index}{suffix}"
        shutil.move(str(file), str(target))

    for folder in sorted(IMAGE_ROOT.rglob("*"), reverse=True):
        if folder.is_dir():
            try:
                folder.rmdir()
            except OSError:
                pass


def build_image_index() -> tuple[dict[str, str], list[tuple[str, str]]]:
    image_index: dict[str, str] = {}
    stems: list[tuple[str, str]] = []
    for file in sorted(IMAGE_ROOT.iterdir()):
        if not file.is_file() or file.suffix.lower() not in IMAGE_EXTS:
            continue
        key = normalize(file.stem)
        image_index.setdefault(key, file.name)
        stems.append((key, file.name))
    return image_index, stems


def candidates(article: object) -> tuple[list[str], str]:
    key = normalize(article)
    base = key.split("/")[0]
    raw = [
        key,
        key.replace("/", "."),
        key.replace("/", "-"),
        key.replace("/", "_"),
        key.replace("/", ""),
        base,
    ]
    raw.extend(translit(item) for item in list(raw))

    result: list[str] = []
    for item in raw:
        if item and item not in result:
            result.append(item)
    return result, base


def find_image(article: object, image_index: dict[str, str], stems: list[tuple[str, str]]) -> str:
    keys, base = candidates(article)
    for key in keys:
        if key in image_index:
            return image_index[key]

    # Accept names such as "180 0.png" for article 180 after normalization -> 1800.
    for stem, filename in stems:
        tail = stem[len(base) :]
        if stem.startswith(base) and tail and re.fullmatch(r"[._-]?\d+", tail):
            return filename
    return ""


def image_url(filename: str) -> str:
    return "/assets/products/" + quote(filename)


def main() -> None:
    flatten_images()
    image_index, stems = build_image_index()
    catalog = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))

    matched = 0
    missing = 0
    for section in catalog.get("sections", []):
        products = section[2] if isinstance(section, list) and len(section) > 2 else section.get("products", [])
        for product in products:
            if isinstance(product, list):
                article = product[0] if product else ""
                filename = find_image(article, image_index, stems)
                if filename:
                    while len(product) < 6:
                        product.append("")
                    product[5] = image_url(filename)
                    matched += 1
                else:
                    missing += 1
            elif isinstance(product, dict):
                filename = find_image(product.get("article"), image_index, stems)
                if filename:
                    product["image"] = image_url(filename)
                    matched += 1
                else:
                    missing += 1

    CATALOG_PATH.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Product image import complete: {matched} matched, {missing} without local image, {len(image_index)} image files.")


if __name__ == "__main__":
    main()
