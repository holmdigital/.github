// Counts all-time npm downloads for the three a11y-hd packages and redraws the counter.
// A broken number must never become a false number: if any request fails or looks wrong,
// nothing is written and the last published count stays, with its date.
import { readFile, writeFile } from 'node:fs/promises';

const PACKAGES = ['engine', 'standards', 'components'];
const README = new URL('../profile/README.md', import.meta.url);
const SVG = new URL('../profile/assets/downloads.svg', import.meta.url);
const IMAGE_URL = 'https://raw.githubusercontent.com/holmdigital/.github/main/profile/assets/downloads.svg';
const START = '<!-- npm-downloads:start -->';
const END = '<!-- npm-downloads:end -->';
const DAY = 86_400_000;

const iso = (t) => new Date(t).toISOString().slice(0, 10);
const fmt = (n) => n.toLocaleString('en-US');

async function getJson(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'holmdigital-profile-downloads' } });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

// npm caps one range at 18 months and silently trims longer ones, so count year by year.
async function totalFor(name) {
  const pkg = `@holmdigital/${name}`;
  const meta = await getJson(`https://registry.npmjs.org/${pkg}`);
  const created = Date.parse(meta?.time?.created);
  if (!Number.isFinite(created)) throw new Error(`${pkg}: no creation date`);

  const today = Date.parse(iso(Date.now()));
  let from = Date.parse(iso(created));
  let total = 0;
  while (from <= today) {
    const to = Math.min(from + 364 * DAY, today);
    const range = `${iso(from)}:${iso(to)}`;
    const data = await getJson(`https://api.npmjs.org/downloads/point/${range}/${pkg}`);
    const n = data?.downloads;
    if (typeof n !== 'number' || !Number.isFinite(n) || n < 0) throw new Error(`${pkg} ${range}: invalid count`);
    if (data.start !== iso(from)) throw new Error(`${pkg} ${range}: npm answered from ${data.start}`);
    total += n;
    from = to + DAY;
  }
  return { name, total, created };
}

function drawSvg({ total, stats, since, updated, label }) {
  const max = Math.max(...stats.map((s) => s.total));
  const tiles = stats.map((s, i) => {
    const x = 560 + i * 204;
    const bar = Math.max(4, Math.round((144 * s.total) / max));
    return `
  <rect x="${x}" y="44" width="184" height="132" rx="14" fill="#0f172a" stroke="#1e3a5f" stroke-width="1.5"/>
  <text x="${x + 20}" y="80" class="mono" font-size="16" font-weight="700" fill="#7dd3fc">${s.name}</text>
  <text x="${x + 20}" y="124" font-size="32" font-weight="700" fill="#f8fafc">${fmt(s.total)}</text>
  <rect x="${x + 20}" y="144" width="144" height="8" rx="4" fill="#1e293b"/>
  <rect x="${x + 20}" y="144" width="${bar}" height="8" rx="4" fill="#38bdf8"/>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="220" viewBox="0 0 1200 220" role="img" aria-labelledby="dl-title dl-desc">
  <title id="dl-title">${fmt(total)} downloads on npm</title>
  <desc id="dl-desc">${label}</desc>
  <defs>
    <linearGradient id="dbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1220"/>
      <stop offset="1" stop-color="#0f1d33"/>
    </linearGradient>
    <radialGradient id="dglow" cx="0.15" cy="0.2" r="0.6">
      <stop offset="0" stop-color="#0ea5e9" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#0ea5e9" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="dcard"><rect width="1200" height="220" rx="24"/></clipPath>
  </defs>
  <style>
    text { font-family: "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .mono { font-family: "Cascadia Mono", Consolas, "SF Mono", Menlo, "DejaVu Sans Mono", monospace; }
  </style>
  <g clip-path="url(#dcard)">
    <rect width="1200" height="220" fill="url(#dbg)"/>
    <rect width="1200" height="220" fill="url(#dglow)"/>
  </g>
  <rect x="1" y="1" width="1198" height="218" rx="23" fill="none" stroke="#1e3a5f" stroke-width="2"/>

  <text x="48" y="62" font-size="14" font-weight="700" letter-spacing="2.5" fill="#7dd3fc">DOWNLOADS ON NPM</text>
  <text x="48" y="132" font-size="64" font-weight="800" fill="#f8fafc">${fmt(total)}</text>
  <text x="48" y="166" font-size="18" fill="#b8c4d4">All three a11y-hd packages, since ${since}</text>
  <text x="48" y="196" font-size="14" fill="#b8c4d4">Updated ${updated}</text>
${tiles}
</svg>
`;
}

let stats;
try {
  stats = await Promise.all(PACKAGES.map(totalFor));
} catch (err) {
  console.error(`Keeping the last published count. ${err.message}`);
  process.exit(1);
}

const total = stats.reduce((sum, s) => sum + s.total, 0);
if (total <= 0) {
  console.error('npm answered with a total of zero. Keeping the last published count.');
  process.exit(1);
}

const since = new Date(Math.min(...stats.map((s) => s.created)))
  .toLocaleString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const updated = iso(Date.now());
const [engine, standards, components] = stats;
const label = `${fmt(total)} downloads on npm across all three a11y-hd packages since ${since}: `
  + `engine ${fmt(engine.total)}, standards ${fmt(standards.total)} and components ${fmt(components.total)}. `
  + `Updated ${updated}.`;

const readme = await readFile(README, 'utf8');
const a = readme.indexOf(START);
const b = readme.indexOf(END);
if (a === -1 || b < a) {
  console.error(`Markers ${START} and ${END} are missing in profile/README.md.`);
  process.exit(1);
}
const block = `${START}
<p align="center">
  <img src="${IMAGE_URL}?v=${updated}" width="100%" alt="${label}">
</p>
${END}`;

await writeFile(SVG, drawSvg({ total, stats, since, updated, label }));
await writeFile(README, readme.slice(0, a) + block + readme.slice(b + END.length));
console.log(label);
