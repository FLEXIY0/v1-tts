# v1-tts

Neural text-to-speech in the browser. The page runs
[Piper](https://github.com/rhasspy/piper) voices client-side via
[piper-tts-web](https://github.com/Mintplex-Labs/piper-tts-web)
(onnxruntime-web + espeak-ng phonemizer, both WebAssembly). No server, no
API keys; everything is synthesized locally.

Demo: https://flexiy0.github.io/v1-tts/

## Usage

Open `index.html` in a browser (or the demo link). Pick a voice or leave
`auto` — Cyrillic input selects a Russian voice, anything else English.

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
