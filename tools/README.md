# 🎬 Hero intro video — how to make it

This builds a **cinematic intro video** for the hero section using **your voice
recording + your photo**: sharp portrait on the right, blurred zooming
background, your name / title / tagline, a **red waveform synced to your voice**,
optional auto-captions, and your real voice as the soundtrack.

## Step 1 — Add your recording

Save your voice recording here (any of these formats work — `.mp3`, `.m4a`,
`.wav`, or even a selfie `.mp4`, audio will be extracted):

```
src/assets/hero video/my_voice.mp3
```

Tip for a good 15–25s intro, say something like:
> "Hi, I'm Afroj Pathan, a Flutter Developer and Architect from Latur, India.
>  I build scalable cross-platform apps for Android, iOS, web and desktop using
>  Clean Architecture, BLoC and Firebase. Let's build something great together."

## Step 2 — Build the video

From the project root:

```powershell
powershell -ExecutionPolicy Bypass -File tools/make-hero-video.ps1 -Audio "src/assets/hero video/my_voice.mp3"
```

Add `-Subtitles` to burn auto-generated captions (see Whisper note below):

```powershell
powershell -ExecutionPolicy Bypass -File tools/make-hero-video.ps1 -Audio "src/assets/hero video/my_voice.mp3" -Subtitles
```

Output is written to `src/assets/hero video/intro.mp4`.

## Step 3 — Use it in the site

In `src/components/Hero.jsx`, change the video import to:

```js
import heroVideo from '../assets/hero video/intro.mp4';
```

## Auto-captions (Whisper) — one-time setup

`-Subtitles` uses ffmpeg's built-in Whisper. It needs a model file once:

1. Download `ggml-base.en.bin` (~148 MB) from
   https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-base.en.bin
2. Save it to `tools/models/ggml-base.en.bin`

(Without `-Subtitles` the video still gets your name, title, tagline and the
red voice waveform — captions are optional.)

## Files in this folder
- `make-hero-video.ps1` — the build script
- `preview_filter.txt` — filtergraph used for the silent style preview
- `fonts/` — Segoe UI fonts copied here so ffmpeg can use them
- `models/` — put the Whisper model here (for captions)
