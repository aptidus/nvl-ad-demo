#!/usr/bin/env python3
"""Generate 8-second trailer clips for each NVL show using Google Veo 3.1 API.
Batches 5 at a time to respect rate limits."""

import json
import os
import time
import requests
import sys

API_KEY = os.environ.get("GEMINI_API_KEY")
BASE_URL = "https://generativelanguage.googleapis.com/v1beta"
MODEL = "veo-3.1-generate-preview"
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "videos")
BATCH_SIZE = 5
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── Show definitions with cinematic prompts ──
SHOWS = [
    {"id": "fractured", "prompt": "A female detective stands in a dimly lit evidence room, slowly running her fingers over photographs pinned to a corkboard. Camera pulls back. Moody blue and amber lighting. Cinematic thriller tone. 9:16 portrait."},
    {"id": "algorithm", "prompt": "Close-up of a woman programmer staring at cascading lines of code reflected in her glasses. The screen flickers ominously. Dark room, green monitor glow. Cinematic cyber thriller tone. 9:16 portrait."},
    {"id": "blindspot", "prompt": "A woman surgeon reaches toward a blinding white light, then the scene shifts to dark fragmented visions of a crime scene. Dramatic lighting contrast. Cinematic thriller. 9:16 portrait."},
    {"id": "cold-trail", "prompt": "An older man in a worn coat walks through falling snow toward an abandoned cabin. He brushes snow off a rusted mailbox. Somber, blue-grey color palette. Cinematic crime drama. 9:16 portrait."},
    {"id": "neon-saints", "prompt": "Three silhouettes stand in a neon-drenched nightclub alleyway. Rain-slicked street, purple and magenta neon signs reflected in puddles. Cinematic crime drama. 9:16 portrait."},
    {"id": "the-wire-city", "prompt": "Aerial shot of a futuristic megacity at night, camera swoops down to a figure on a rooftop typing on a holographic terminal. Cyberpunk blue and orange. Cinematic crime. 9:16 portrait."},
    {"id": "last-exit", "prompt": "A man runs through a vast desert landscape as dust swirls behind him. Camera follows low to the ground. Golden hour lighting, dramatic sky. Cinematic action thriller. 9:16 portrait."},
    {"id": "warpath", "prompt": "A muscular fighter wraps tape around his fists in a gritty underground gym. Camera slowly orbits around him. Harsh single spotlight. Cinematic action tone. 9:16 portrait."},
    {"id": "extraction-zero", "prompt": "A team of soldiers pushes through dense Amazon jungle at night, headlamp beams cutting through misty foliage. Camera tracks their movement. Green and black palette. Cinematic action adventure. 9:16 portrait."},
    {"id": "hot-mess", "prompt": "A woman chef stands in front of a taco truck, arms crossed, with a slight smirk. The truck is colorful, street festival behind her. Warm golden lighting. Cinematic comedy. 9:16 portrait."},
    {"id": "coworking", "prompt": "Five people sitting at desks in a quirky modern coworking space, one adjusting a thermostat while others react dramatically. Bright, airy office. Cinematic workplace comedy. 9:16 portrait."},
    {"id": "family-algo", "prompt": "A woman with glasses sits at a dinner table surrounded by eccentric family members, secretly typing on a tablet under the table. Warm household lighting. Cinematic comedy drama. 9:16 portrait."},
    {"id": "the-hallowing", "prompt": "A row of masked figures standing motionless on a foggy village street. One mask slowly turns toward the camera. Low amber streetlight. Cinematic horror. 9:16 portrait."},
    {"id": "below-the-floor", "prompt": "A flashlight beam sweeps across a dark cemented basement wall. Camera slowly pushes toward a crack in the concrete where something glows faintly. Cinematic horror thriller. 9:16 portrait."},
    {"id": "sleep-watchers", "prompt": "A person lies in a hospital sleep clinic bed, electrodes attached. Camera pulls back to reveal all patients in the ward share the same terrified expression. Blue clinical lighting. Cinematic supernatural horror. 9:16 portrait."},
    {"id": "glass-walls", "prompt": "A woman in business attire and a man in a courtroom exchange a long glance. Glass office buildings reflect city lights behind them. Warm amber and cool blue. Cinematic romance thriller. 9:16 portrait."},
    {"id": "silk-thorns", "prompt": "Two strangers stand facing each other in a rain-soaked alley, city lights blurred in the background. Soft romantic lighting through the rain. Cinematic romantic drama. 9:16 portrait."},
    {"id": "paris-rewind", "prompt": "A couple walks along the Seine in Paris at golden hour. Camera dollies past Parisian cafes. The Eiffel Tower glows in the background. Dreamy, soft-focus. Cinematic romance. 9:16 portrait."},
    {"id": "arc-seven", "prompt": "Interior of a massive colony spaceship. A crew member floats past a viewport showing distant stars. A mysterious radio signal pulses on a console. Blue and white sci-fi lighting. Cinematic sci-fi. 9:16 portrait."},
    {"id": "echo-state", "prompt": "A woman opens her eyes in a sterile white room, looks at her hands, and doesn't recognize them. Camera slowly rotates around her face. Clinical sci-fi atmosphere. 9:16 portrait."},
    {"id": "terraform", "prompt": "A red Martian landscape stretches to the horizon. A terraforming machine emits green mist. Something moves in the soil. Orange and rust-red tones. Cinematic sci-fi drama. 9:16 portrait."},
    {"id": "still-water", "prompt": "A woman stands alone on a misty lake dock at dawn, looking out over perfectly still water. Camera slowly pushes in. Muted blues and greens. Cinematic mystery drama. 9:16 portrait."},
    {"id": "the-vanishing", "prompt": "An empty fishing boat drifts toward a rocky shore in thick fog. Chains hang over the sides. The boat is locked from inside. Grey and teal palette. Cinematic mystery. 9:16 portrait."},
    {"id": "inside-the-machine", "prompt": "A team of engineers sits around a cluttered startup office, whiteboards covered in diagrams. One person types furiously. Natural office lighting. Cinematic documentary style. 9:16 portrait."},
    {"id": "the-last-glacier", "prompt": "A massive glacier face crumbles into arctic waters. Camera captures the scale from a helicopter angle. Brilliant white and deep blue. Cinematic nature documentary. 9:16 portrait."},
    {"id": "shadow-court", "prompt": "A woman knight in battered armor stands before a shimmering portal between two crumbling stone walls. Purple and gold magical light spills out. Cinematic dark fantasy. 9:16 portrait."},
    {"id": "spirit-engine", "prompt": "A young mechanic touches a glowing motorcycle engine, ethereal spirits swirling upward from the machine. Vibrant anime-inspired colors, neon pink and electric blue. Cinematic anime style. 9:16 portrait."},
    {"id": "seoul-midnight", "prompt": "A busy Seoul street at midnight. Neon signs in Korean glow against the night. Two young people lock eyes across the crowd. Vibrant colors, romantic atmosphere. Cinematic K-drama. 9:16 portrait."},
    {"id": "the-exchange", "prompt": "Two people sit at a shared trading desk surrounded by multiple monitors showing stock charts. Tension in their postures. Cool blue office lighting with red and green screen reflections. Cinematic K-drama thriller. 9:16 portrait."},
    {"id": "the-confession-tapes", "prompt": "A stark interrogation room with a single overhead light. A person sits across the table from a detective. Camera slowly zooms in. Black and white with warm highlight. Cinematic true crime documentary. 9:16 portrait."},
]


def submit_generation(show):
    """Submit a video generation request and return the operation name."""
    url = f"{BASE_URL}/models/{MODEL}:predictLongRunning"
    headers = {
        "x-goog-api-key": API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "instances": [{"prompt": show["prompt"]}],
        "parameters": {
            "aspectRatio": "9:16",
            "durationSeconds": 8,
            "personGeneration": "allow_all",
            "resolution": "720p"
        }
    }

    for attempt in range(3):
        resp = requests.post(url, headers=headers, json=payload)
        if resp.status_code == 200:
            data = resp.json()
            op_name = data.get("name")
            print(f"  ✅ Submitted {show['id']} → {op_name}")
            return op_name
        elif resp.status_code == 429:
            wait = 30 * (attempt + 1)
            print(f"  ⏳ Rate limited for {show['id']}, waiting {wait}s...")
            time.sleep(wait)
        else:
            print(f"  ❌ Error for {show['id']}: {resp.status_code} — {resp.text[:200]}")
            return None

    print(f"  ❌ Failed to submit {show['id']} after retries")
    return None


def poll_batch(pending):
    """Poll a batch of operations until all complete. Returns (completed, failed) counts."""
    headers = {"x-goog-api-key": API_KEY}
    remaining = dict(pending)
    completed = 0
    failed = 0

    while remaining:
        still_pending = {}
        for show_id, op_name in remaining.items():
            url = f"{BASE_URL}/{op_name}"
            resp = requests.get(url, headers=headers)
            data = resp.json()

            if data.get("done"):
                if "error" in data:
                    msg = data["error"].get("message", str(data["error"]))[:100]
                    print(f"  ❌ {show_id} failed: {msg}")
                    failed += 1
                    continue

                samples = data.get("response", {}).get("generateVideoResponse", {}).get("generatedSamples", [])
                if samples:
                    video_uri = samples[0].get("video", {}).get("uri", "")
                    if video_uri:
                        out_path = os.path.join(OUTPUT_DIR, f"{show_id}.mp4")
                        dl = requests.get(video_uri, headers=headers, allow_redirects=True)
                        with open(out_path, "wb") as f:
                            f.write(dl.content)
                        size_mb = os.path.getsize(out_path) / (1024 * 1024)
                        print(f"  ✅ {show_id}.mp4 ({size_mb:.1f} MB)")
                        completed += 1
                    else:
                        print(f"  ❌ {show_id}: no URI")
                        failed += 1
                else:
                    print(f"  ❌ {show_id}: no samples")
                    failed += 1
            else:
                still_pending[show_id] = op_name

        remaining = still_pending
        if remaining:
            print(f"  ⏳ {len(remaining)} still processing... (waiting 15s)")
            time.sleep(15)

    return completed, failed


def main():
    if not API_KEY:
        print("❌ GEMINI_API_KEY not set")
        sys.exit(1)

    # Check which videos already exist
    existing = set()
    for f in os.listdir(OUTPUT_DIR):
        if f.endswith(".mp4"):
            existing.add(f.replace(".mp4", ""))

    shows_to_generate = [s for s in SHOWS if s["id"] not in existing]

    if not shows_to_generate:
        print("✅ All videos already generated!")
        return

    print(f"\n🎬 {len(shows_to_generate)} videos to generate ({len(existing)} already exist)\n")

    total_completed = 0
    total_failed = 0

    # Process in batches of BATCH_SIZE
    for batch_num in range(0, len(shows_to_generate), BATCH_SIZE):
        batch = shows_to_generate[batch_num:batch_num + BATCH_SIZE]
        batch_idx = batch_num // BATCH_SIZE + 1
        total_batches = (len(shows_to_generate) + BATCH_SIZE - 1) // BATCH_SIZE
        print(f"\n── Batch {batch_idx}/{total_batches} ({len(batch)} videos) ──\n")

        # Submit batch
        pending = {}
        for show in batch:
            op_name = submit_generation(show)
            if op_name:
                pending[show["id"]] = op_name
            time.sleep(2)  # small delay between submissions

        if not pending:
            total_failed += len(batch)
            continue

        print(f"\n  Polling {len(pending)} operations...\n")
        c, f = poll_batch(pending)
        total_completed += c
        total_failed += f

        # Wait between batches to respect rate limits
        if batch_num + BATCH_SIZE < len(shows_to_generate):
            print(f"\n  ⏳ Waiting 30s before next batch...")
            time.sleep(30)

    print(f"\n🎬 Done! {total_completed} completed, {total_failed} failed.\n")

    # List all videos
    vids = sorted(f for f in os.listdir(OUTPUT_DIR) if f.endswith(".mp4"))
    print(f"📁 {len(vids)} total videos in {OUTPUT_DIR}/:")
    for v in vids:
        size = os.path.getsize(os.path.join(OUTPUT_DIR, v)) / (1024 * 1024)
        print(f"   {v} ({size:.1f} MB)")


if __name__ == "__main__":
    main()
