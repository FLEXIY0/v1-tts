# v1-tts

Neural text-to-speech in the browser. The page runs
[Piper](https://github.com/rhasspy/piper) voices client-side via
[piper-tts-web](https://github.com/Mintplex-Labs/piper-tts-web)
(onnxruntime-web + espeak-ng phonemizer, both WebAssembly). No server, no
API keys; everything is synthesized locally.

Demo: https://flexiy0.github.io/v1-tts/

## Usage

Open `index.html` in a browser (or the demo link). Two engines:

- **Microsoft Sam — V1** (default): the authentic ULTRAKILL "V1" voice —
  Microsoft Sam (SAPI4) at pitch 200 / speed 180, served by
  [tetyys.com](https://www.tetyys.com/SAPI4/). Robotic but clearly
  intelligible. Cyrillic is transliterated since Sam is an English formant
  synth. By default it plays through a media element straight from tetyys
  (no CORS needed), and `Download` opens the WAV in a new tab. For reliable
  playback plus a real stitched download, run the optional proxy below.

### Optional: Microsoft Sam proxy

tetyys sends no CORS headers, so the browser can play its audio but can't
read the bytes to post-process or stitch a download, and direct playback
depends on tetyys being reachable from the client. `proxy/sam-proxy.js` is
a ~30-line Cloudflare Worker that fetches the SAPI4 audio server-side and
re-serves it with CORS. Deploy it (steps are in the file header), then open
the site once as `…/v1-tts/?proxy=https://<your-worker-url>` — the page
remembers it in `localStorage`, and the V1 voice then works everywhere with
full download support.
- **Piper** voices: neural TTS running fully in-browser (see below). Pick
  a specific voice or `Piper — auto` (Cyrillic → Russian, else English).
  The `preset`/`robot` effect applies to these only.

The first synthesis downloads the runtime and the selected voice:
onnxruntime WASM (~10 MB, cdnjs), the espeak-ng phonemizer data (~18 MB,
jsdelivr) and the voice model (~63 MB, HuggingFace). The voice model is
cached in browser storage (OPFS) and the CDN assets in the HTTP cache, so
later runs are effectively instant. Expect a noticeable wait on the very
first run.

Long texts are split into sentence-sized chunks; the next chunk is
synthesized while the current one plays, so playback starts quickly.
`rate` changes playback speed (0.5–2.0) without affecting pitch.
`Download WAV` renders the whole text and stitches the chunks into one file.

`preset` gives the clean voice a machine character with an offline Web
Audio pass (soft-clip drive + ring modulation + bit-crush + lowpass):
*Improved SAM (V1)* is the SAM/V1 robot sound kept intelligible over the
neural voice, *Heavy robot* is more aggressive, *Human* is bypass. The
`robot` slider scales how much of the preset's character is mixed in
(0 % = clean voice). All of this runs in-browser — no extra downloads.

`dist/piper.js` is `@mintplex-labs/piper-tts-web` bundled with esbuild,
with `onnxruntime-web` pinned to 1.18.0 to match the WASM assets the page
loads from the CDN (`esbuild entry.js --bundle --format=esm --minify` with
node builtins aliased to an empty module).

## Legacy SAM core

The repository also contains a JavaScript port of SAM (Software Automatic
Mouth, Commodore 64, 1982) in `src/` and `dist/samjs.js` — the engine this
site used originally. It is a reverse-engineered version of commercial
software whose copyright holder is SoftVoice, Inc.; effectively
abandonware, no open-source license can be granted. Piper voices carry
their own licenses (see the model cards on HuggingFace).
