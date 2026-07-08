# V1-TTS — Speech Synthesis Terminal

> MANKIND IS DEAD. BLOOD IS FUEL. HELL IS FULL.
>
> ЧЕЛОВЕЧЕСТВО МЕРТВО. КРОВЬ — ТОПЛИВО. АД ПЕРЕПОЛНЕН.

An [ULTRAKILL](https://store.steampowered.com/app/1229490/ULTRAKILL/)-flavoured
text-to-speech terminal styled after IBM OS/2 Warp. Type something — V1 speaks
it with a proper 1982 robot voice, or renders it to a downloadable `.WAV`.

## Features

- **OS/2 Warp interface** — teal desktop, bevelled grey window chrome, status
  bar, the works;
- **Русский язык** — interface is fully localized (RU/EN switch in the menu
  bar), and Cyrillic input is transliterated automatically so V1 can read
  Russian text (with an accent);
- **V1 voice parameters** — pitch, speed, mouth and throat sliders;
- **Preview & download** — speak in the browser or save a `.WAV` file.

## Under the hood

The synthesizer core is a JavaScript adaption of SAM (Software Automatic
Mouth) for the Commodore C64, published in 1982 by Don't Ask Software (now
SoftVoice, Inc.). It is based on the adaption to C by
[Stefan Macke](https://github.com/s-macke/SAM) and the refactorings by
[Vidar Hokstad](https://github.com/vidarh/SAM) and
[8BitPimp](https://github.com/8BitPimp/SAM).

## Usage

Open `index.html` in a browser. That's it — no build step needed, the bundled
core lives in `dist/samjs.js`.

## License

The synthesizer is a reverse-engineered version of a commercial software
published more than 30 years ago. The current copyright holder is
SoftVoice, Inc. (www.text2speech.com). The status of the original software can
best be described as [Abandonware](http://en.wikipedia.org/wiki/Abandonware);
use it at your own risk.

ULTRAKILL is a trademark of Arsi "Hakita" Patala / New Blood Interactive.
This is a non-commercial fan project and is not affiliated with New Blood.
