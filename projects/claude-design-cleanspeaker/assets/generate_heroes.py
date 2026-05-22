#!/usr/bin/env python3
"""Generate 4 hero images for CleanSpeaker v2 via Gemini 2.5 Flash Image."""
import os, json, base64, sys, urllib.request, urllib.error
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ.get("GEMINI_API_KEY")
if not KEY:
    print("ERROR: GEMINI_API_KEY not set", file=sys.stderr); sys.exit(1)

MODEL = "gemini-2.5-flash-image"
URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={KEY}"
OUT_DIR = Path(__file__).parent.parent / "assets" / "heroes"
OUT_DIR.mkdir(parents=True, exist_ok=True)

PROMPTS = {
    "hero-droplet": (
        "Ultra-macro photograph of a modern smartphone bottom-edge speaker grille, dark gunmetal, "
        "slightly wet, shot at a low 30-degree angle. A single perfectly spherical water droplet is "
        "suspended in mid-air just above the grille, being ejected upward by a luminous translucent "
        "cyan-to-blue sound wave forming three concentric ring shockwaves. Volumetric fog catching "
        "the cyan light. Background: deep matte black studio void with subtle blue rim light. "
        "Style: premium product photography, Apple keynote hero shot, Teenage Engineering OP-1 "
        "marketing aesthetic. Strict color palette: matte black, gunmetal grey, glacial cyan #5EE6FF, "
        "deep blue #2A7BFF. Absolutely NO text, NO logos, NO people, NO UI elements, NO cartoon, "
        "NO illustration. Vertical 3:4 composition, dramatic studio lighting, razor-sharp focus on "
        "droplet showing internal refraction. 4K, hyper-realistic, photographic."
    ),
    "hero-console": (
        "Premium close-up product photograph of a high-end audio console device, like a Teenage "
        "Engineering OP-1 or a Bose studio mixer, sitting on a dark carbon-fibre surface in a moody "
        "studio. Centered: a single oversized circular metallic control dial with a luminous cyan "
        "ring of light glowing through the bezel and tick marks. Brushed aluminium texture on the "
        "ring, deep black recessed face. Soft volumetric haze. Cinematic three-quarter angle. "
        "Strict color palette: matte black, gunmetal grey, brushed aluminium, glacial cyan #5EE6FF, "
        "deep blue #2A7BFF. NO text, NO numbers visible, NO branding, NO people, NO UI elements, "
        "NO illustration. Vertical 4:5 composition, sharp focus on dial, shallow depth-of-field on "
        "background. Hyper-realistic product photography, 4K."
    ),
    "result-split": (
        "Split-screen ultra-macro photograph of the SAME smartphone speaker grille, two halves side "
        "by side. Left half: foggy, dusty, slightly blurred, cool desaturated tone, faint grey haze "
        "around the grille suggesting muffled sound. Right half: crystal-clear, slightly wet from "
        "fresh cleaning, glowing cyan light passing through the speaker holes in beams, sharp focus, "
        "vivid cyan rim light. Hard vertical divider line down the center. Background: deep matte "
        "black. Strict color palette: matte black, gunmetal grey, dusty desaturated tone on left, "
        "glacial cyan #5EE6FF and deep blue #2A7BFF on right. NO text, NO labels, NO logos, NO "
        "people, NO UI. Horizontal 3:2 composition, photographic, hyper-real, 4K, premium product "
        "photography in the style of Apple keynote before/after slides."
    ),
    "texture-ripple": (
        "Aerial top-down photograph of a perfectly still pool of glossy black liquid, with a single "
        "luminous cyan sound wave rippling outward from the center forming four expanding concentric "
        "rings. Surface tension reflections, micro highlights. The cyan light source is underneath "
        "and inside the liquid, glowing through translucent waves. Strict color palette: jet black "
        "liquid, glacial cyan #5EE6FF, deep blue #2A7BFF undertones in the depths. NO text, NO "
        "objects, NO splashes, NO droplets, just pure ripple geometry. Square 1:1 composition, "
        "centered symmetric composition, slight vignette, dark moody studio. Hyper-real photography, "
        "macro lens, 4K."
    ),
}

def generate(name: str, prompt: str):
    body = json.dumps({
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"responseModalities": ["IMAGE"]},
    }).encode("utf-8")
    req = urllib.request.Request(
        URL, data=body, method="POST",
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            resp = json.loads(r.read())
    except urllib.error.HTTPError as e:
        return name, False, f"HTTP {e.code}: {e.read()[:300].decode('utf-8','replace')}"
    except Exception as e:
        return name, False, f"{type(e).__name__}: {e}"

    parts = resp.get("candidates",[{}])[0].get("content",{}).get("parts",[])
    img_b64 = None; mime = "image/png"
    for p in parts:
        if "inlineData" in p:
            img_b64 = p["inlineData"]["data"]; mime = p["inlineData"].get("mimeType","image/png"); break
        if "inline_data" in p:
            img_b64 = p["inline_data"]["data"]; mime = p["inline_data"].get("mime_type","image/png"); break
    if not img_b64:
        return name, False, f"no image in response: {json.dumps(resp)[:400]}"

    ext = "png" if "png" in mime else ("jpg" if "jpeg" in mime else "bin")
    out = OUT_DIR / f"{name}.{ext}"
    out.write_bytes(base64.b64decode(img_b64))
    return name, True, f"saved {out.relative_to(OUT_DIR.parent.parent)} ({out.stat().st_size//1024} KB)"

with ThreadPoolExecutor(max_workers=4) as ex:
    futs = [ex.submit(generate, n, p) for n, p in PROMPTS.items()]
    for f in futs:
        name, ok, msg = f.result()
        print(f"[{'OK ' if ok else 'ERR'}] {name}: {msg}")
