/**
 * Cloudflare Worker: CORS proxy for the tetyys SAPI4 Microsoft Sam TTS.
 *
 * tetyys.com serves valid WAV audio but sends no CORS headers, so a browser
 * on another origin can play it in an <audio> element yet cannot fetch() the
 * bytes (needed to post-process or stitch a download). This Worker fetches
 * the audio server-side and re-serves it with Access-Control-Allow-Origin,
 * so the page can read the WAV like any same-origin resource.
 *
 * Deploy (free Cloudflare account):
 *   1. https://dash.cloudflare.com  ->  Workers & Pages  ->  Create Worker
 *   2. Replace the default code with this file, Deploy.
 *   3. Copy the worker URL, e.g. https://sam.<you>.workers.dev
 *   4. Open the site once as  https://flexiy0.github.io/v1-tts/?proxy=<that URL>
 *      (the page remembers it). Done — the V1 voice now works everywhere.
 *
 * Or with wrangler:  wrangler deploy proxy/sam-proxy.js --name sam
 *
 * Request:  GET /?text=...&voice=Sam&pitch=200&speed=180  ->  audio/wav
 */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': '*',
};

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'GET') return new Response('method not allowed', { status: 405, headers: CORS });

    const q = new URL(request.url).searchParams;
    const text = q.get('text');
    if (!text) return new Response('missing text', { status: 400, headers: CORS });

    const upstream = 'https://www.tetyys.com/SAPI4/SAPI4?voice=' +
      encodeURIComponent(q.get('voice') || 'Sam') +
      '&pitch=' + encodeURIComponent(q.get('pitch') || '100') +
      '&speed=' + encodeURIComponent(q.get('speed') || '100') +
      '&text=' + encodeURIComponent(text);

    let resp;
    try {
      resp = await fetch(upstream, { headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://www.tetyys.com/SAPI4/' } });
    } catch (e) {
      return new Response('upstream fetch failed: ' + e, { status: 502, headers: CORS });
    }
    if (!resp.ok) return new Response('upstream ' + resp.status, { status: 502, headers: CORS });

    return new Response(resp.body, {
      headers: { ...CORS, 'Content-Type': 'audio/wav', 'Cache-Control': 'public, max-age=86400' },
    });
  },
};
