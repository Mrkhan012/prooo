<#
  make-hero-video.ps1
  Build a cinematic hero intro video from your VOICE recording + your PHOTO.

  Produces: sharp portrait on the right, blurred zooming background, your
  name / title / tagline on the left, a red audio waveform synced to your
  voice, optional burned-in subtitles, and your real voice as the audio track.

  USAGE (run from the project root):
    powershell -ExecutionPolicy Bypass -File tools/make-hero-video.ps1 -Audio "src/assets/hero video/my_voice.mp3"
    # add -Subtitles to burn auto-captions (needs a Whisper model, see README)

  After it finishes, the new video is written to:
    src/assets/hero video/intro.mp4
  Then update the import in src/components/Hero.jsx to point at intro.mp4.
#>

param(
  [Parameter(Mandatory = $true)][string]$Audio,
  [string]$Photo = "src/assets/profile/profile.jpeg",
  [string]$Out   = "src/assets/hero video/intro.mp4",
  [string]$Name  = "AFROJ PATHAN",
  [string]$Title = "Flutter Developer and Architect",
  [string]$Tag   = "Transforming ideas into elegant Flutter apps",
  [switch]$Subtitles,
  [string]$Model = "tools/models/ggml-base.en.bin"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $Audio)) { throw "Audio file not found: $Audio" }
if (-not (Test-Path $Photo)) { throw "Photo file not found: $Photo" }

# --- audio duration (for logging; we use -shortest to bound the render) ---
$dur = & ffprobe -v error -show_entries format=duration -of csv=p=0 $Audio
Write-Host "Audio: $Audio  (~$([math]::Round([double]$dur,1))s)"

# --- optional: auto-subtitles via ffmpeg's whisper filter ---
$srt = "tools/intro.srt"
$subChain = ""
if ($Subtitles) {
  if (-not (Test-Path $Model)) {
    throw "Whisper model not found at $Model. See tools/README.md to download ggml-base.en.bin."
  }
  Write-Host "Transcribing with Whisper -> $srt ..."
  & ffmpeg -y -loglevel error -i $Audio -af "whisper=model=$($Model):language=en:format=srt:destination=$($srt)" -f null NUL
  if (Test-Path $srt) {
    # Burn subtitles, centered near the bottom, above the waveform.
    $subChain = ",subtitles=$($srt):fontsdir=tools/fonts:force_style='FontName=Segoe UI,Fontsize=20,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,BorderStyle=1,Outline=2,Shadow=1,Alignment=2,MarginV=70'"
  } else {
    Write-Warning "Subtitle file was not produced; continuing without captions."
  }
}

# --- the cinematic filtergraph ---
# input 0 = looped photo, input 1 = audio
$filter = @"
[0:v]split=2[a][b];
[a]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=25:2,eq=brightness=-0.22:saturation=1.05,zoompan=z='min(zoom+0.0004,1.18)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':fps=30:s=1920x1080[bg];
[b]scale=-1:1015[fg];
[bg][fg]overlay=x=1215:y=(H-h)/2[base];
[base]drawbox=x=130:y=440:w=64:h=7:color=0xff2a2a:t=fill,drawtext=fontfile=tools/fonts/segoeuib.ttf:text='HELLO I AM':fontcolor=0xff6a6a:fontsize=34:x=134:y=470:shadowcolor=black@0.6:shadowx=2:shadowy=2,drawtext=fontfile=tools/fonts/seguibl.ttf:text='$Name':fontcolor=white:fontsize=118:x=128:y=518:shadowcolor=black@0.7:shadowx=3:shadowy=3,drawbox=x=132:y=672:w=80:h=6:color=0xff2a2a:t=fill,drawtext=fontfile=tools/fonts/segoeuib.ttf:text='$Title':fontcolor=0xff3b3b:fontsize=50:x=132:y=694:shadowcolor=black@0.7:shadowx=2:shadowy=2,drawtext=fontfile=tools/fonts/segoeui.ttf:text='$Tag':fontcolor=white@0.9:fontsize=30:x=132:y=772:shadowcolor=black@0.7:shadowx=2:shadowy=2[txt];
[1:a]showwaves=s=900x130:mode=line:colors=0xff2a2a|0xff6a6a:rate=30,format=rgba,colorchannelmixer=aa=0.9[wave];
[txt][wave]overlay=x=128:y=900$subChain,format=yuv420p[out]
"@

$filter | Set-Content -Encoding ascii "tools/_hero_filter.txt"

Write-Host "Rendering $Out ..."
& ffmpeg -y -loglevel error -loop 1 -framerate 30 -i $Photo -i $Audio `
  -filter_complex_script "tools/_hero_filter.txt" -map "[out]" -map "1:a" `
  -c:v libx264 -pix_fmt yuv420p -r 30 -c:a aac -b:a 192k -shortest $Out

if (Test-Path $Out) {
  Write-Host "`nDONE -> $Out" -ForegroundColor Green
  Write-Host "Next: in src/components/Hero.jsx, change the heroVideo import to '../assets/hero video/intro.mp4'."
} else {
  throw "Render failed - no output produced."
}
