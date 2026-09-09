// Offline visual QA. Run on Node >= 22 with sharp installed, or set VENERE_SHARP_MODULE.
// This renders the same SVG geometry/filters as the component, without a local server.
import { createRequire } from 'node:module';
import { mkdir, readFile } from 'node:fs/promises';
import { views } from '../app/lib/venere-views.ts';
import { materialCurves } from '../app/lib/venere-materials.ts';
import { paints, wheels, exhausts, calipers, interiors } from '../app/lib/venere-config.ts';
const require = createRequire(import.meta.url);
const sharp = require(process.env.VENERE_SHARP_MODULE || 'sharp');
const output = 'tmp/venere-mask-review';
const scale = process.argv.includes('--hd') ? 2 : 1;
await mkdir(output, { recursive: true });
const whiteWheels = process.argv.includes('--white-wheels');
const colours = { paint: paints[2].sample, wheels: wheels[whiteWheels ? 3 : 2].sample, calipers: calipers[0].sample, interiors: interiors[1].sample, exhausts: exhausts[whiteWheels ? 0 : 2].sample };
for (const view of views) {
  const original = await sharp(`public${view.source}`).resize(1376 * scale, 768 * scale).png().toBuffer();
  const image = `<image href="data:image/png;base64,${original.toString('base64')}" width="1376" height="768"/>`;
  const definitions = [], overlays = [];
  for (const surface of view.surfaces) {
    const maskSvg = await readFile(`public/images/configurator/V3/masks/${view.id}/${surface}.svg`);
    definitions.push(`<mask id="${surface}" maskUnits="userSpaceOnUse" x="0" y="0" width="1376" height="768" style="mask-type:luminance"><image href="data:image/svg+xml;base64,${maskSvg.toString('base64')}" width="1376" height="768"/></mask>`);
    const curves = materialCurves(surface, colours[surface]);
    definitions.push(`<filter id="${surface}-filter" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer>${curves.map((curve,i)=>`<feFunc${'RGB'[i]} type="table" tableValues="${curve}"/>`).join('')}</feComponentTransfer></filter>`);
    overlays.push(`<g mask="url(#${surface})"><g filter="url(#${surface}-filter)">${image}</g></g>`);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${1376 * scale}" height="${768 * scale}" viewBox="0 0 1376 768"><defs>${definitions.join('')}</defs>${image}${overlays.join('')}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`${output}/${view.id}-gloss${whiteWheels ? '-white' : ''}${scale > 1 ? '-hd' : ''}.png`);
  console.log(`Rendered ${view.id}: ${view.surfaces.join(', ')}`);
}
