# v1-tts

Text-to-speech in the browser. JavaScript port of SAM (Software Automatic
Mouth), a speech synthesizer released for the Commodore 64 in 1982 by
Don't Ask Software (now SoftVoice, Inc.).

Demo: https://flexiy0.github.io/v1-tts/

The core is based on the C port by [Stefan Macke](https://github.com/s-macke/SAM)
and refactorings by [Vidar Hokstad](https://github.com/vidarh/SAM) and
[8BitPimp](https://github.com/8BitPimp/SAM), adapted to JavaScript by
[discordier](https://github.com/discordier/sam).

## Usage

Open `index.html` in a browser. No build step required; the bundled core is
in `dist/samjs.js`.

Parameters: pitch, speed, mouth, throat (0–255). Output can be played back
or downloaded as WAV. Cyrillic input is transliterated to a Latin phonetic
approximation before synthesis, since the reciter only handles English text.

## API

```js
var sam = new SamJs({ pitch: 64, speed: 72, mouth: 128, throat: 128 });
sam.speak(text);      // render and play, returns a Promise
sam.download(text);   // render and download as WAV
sam.buf8(text);       // Uint8Array, 8-bit unsigned PCM
sam.buf32(text);      // Float32Array
```

## Development

```
yarn install
yarn build
yarn test
```

## License

The synthesizer is a reverse-engineered version of commercial software
published more than 30 years ago. The copyright holder is SoftVoice, Inc.
(www.text2speech.com); the original software is effectively abandonware.
No open-source license can be granted. Use at your own risk.
