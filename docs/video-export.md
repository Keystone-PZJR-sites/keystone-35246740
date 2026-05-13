# Hero Video Export Guide

Process for compressing hero background video clips for web delivery.

---

## Source Export Settings

Export a high-quality master from your editing software before running compression:

| Setting | Value |
|---|---|
| Format | MP4 (H.264) or ProRes |
| Resolution | 1920×1080 (or 2560×1440 for HiDPI) |
| Framerate | 24fps (or match source if motion-heavy) |
| Audio | None — remove all tracks |
| Duration | 6–15 seconds ideal for seamless looping |

---

## Prerequisites

Install FFmpeg via Homebrew (one-time):

```bash
brew install ffmpeg
```

---

## Compression Script

The script at `scripts/convert-videos.sh` takes a folder of MP4 masters and produces two optimized outputs per clip:

- `[name]-optimized.mp4` — compressed H.264 for maximum compatibility
- `[name].webm` — VP9 WebM for significantly smaller file sizes on modern browsers

### Usage

Copy the script into your clips folder and run it:

```bash
cd ~/path/to/clips
./convert-videos.sh
```

Or point it at a folder from anywhere:

```bash
./scripts/convert-videos.sh ~/path/to/clips
```

---

## Encoding Settings

**MP4 (H.264)**

| Setting | Value |
|---|---|
| Codec | libx264 |
| Quality (CRF) | 24 — lower = better quality, larger file |
| Preset | slow |
| Profile / Level | High / 4.1 |
| Audio | Stripped |

**WebM (VP9)**

| Setting | Value |
|---|---|
| Codec | libvpx-vp9 |
| Quality (CRF) | 33 — lower = better quality, larger file |
| Bitrate mode | Constant quality (`-b:v 0`) |
| Deadline | best (slowest encode, smallest output) |
| Audio | Stripped |

> The WebM pass is slow by design — `deadline best` can take several minutes per clip. This is a one-time cost per asset.

---

## Quality Check

Before handing off the files, verify:

- [ ] Clip loops cleanly (no hard cut or flash at the end)
- [ ] No audio track
- [ ] File size is reasonable — target under 5MB per clip at 1080p
