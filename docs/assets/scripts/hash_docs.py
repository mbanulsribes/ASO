import hashlib
import hmac
import os
import shutil
from pathlib import Path

SECRET = os.environ["HASH_SECRET"].encode()

SOURCE = Path("docs")
DEST = Path("docs_public")

# Carpetas que NO queremos renombrar
EXCLUDE = {
    "assets",
    "stylesheets",
    "javascripts",
    "img",
    "images"
}

if DEST.exists():
    shutil.rmtree(DEST)

DEST.mkdir()


def hash_name(name):
    return hmac.new(
        SECRET,
        name.encode(),
        hashlib.sha256
    ).hexdigest()[:16]


# Copiar archivos que están directamente en docs
for item in SOURCE.iterdir():

    if item.is_file():
        shutil.copy2(item, DEST / item.name)

    elif item.is_dir():

        if item.name in EXCLUDE:
            shutil.copytree(item, DEST / item.name)
            continue

        new_name = hash_name(item.name)

        shutil.copytree(
            item,
            DEST / new_name
        )

        print(f"{item.name} -> {new_name}")