// Web copies of the supplied V3 photos; originals remain unchanged.
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const sharp = require(process.env.VENERE_SHARP_MODULE || 'sharp');
const root = 'public/images/V3';
await mkdir(`${root}/web`, { recursive: true });
const photos = {
  'front-three-quarter': 'Base/3quarti anteriore.png',
  'rear-three-quarter': 'Base/3quarti posteriore.png',
  'side-dark': 'Base/side buia.png',
  side: 'Base/side.png',
  'front-light': 'Details/Front Light.png',
  'front-logo': 'Details/Front Logo.png',
  'rear-light': 'Details/Rear Light.png',
  'side-vent': 'Details/Side Vent.png',
};
for (const [name, source] of Object.entries(photos)) {
  await sharp(`${root}/${source}`).resize({ width: 2200, height: 2400, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 93, effort: 6 }).toFile(`${root}/web/${name}.webp`);
  console.log(`${source} -> ${name}.webp`);
}
