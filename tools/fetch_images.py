#!/usr/bin/env python3
"""Download every image listed in images.txt into the images/ folder.
Run by .github/workflows/fetch-images.yml (or locally: python3 tools/fetch_images.py)."""
import pathlib, sys, time, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
ok = skip = fail = 0
for line in (ROOT / 'images.txt').read_text().splitlines():
    if not line.strip():
        continue
    local, url = line.split('\t')
    dest = ROOT / local
    if dest.exists() and dest.stat().st_size > 0:
        skip += 1
        continue
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (VisionProperties image sync)'})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if len(data) < 500:
            raise ValueError('response too small')
        dest.write_bytes(data)
        ok += 1
        print('saved', local)
    except Exception as e:  # keep going; the site falls back to the original URL
        fail += 1
        print('FAILED', local, url, e, file=sys.stderr)
    time.sleep(0.3)
print(f'done: {ok} saved, {skip} already present, {fail} failed')
