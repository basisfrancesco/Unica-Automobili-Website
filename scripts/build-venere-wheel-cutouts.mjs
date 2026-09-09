// Extract original photographic pixels to transparent PNGs. No recolouring or runtime masks.
// Node >= 22; sharp installed or supplied through VENERE_SHARP_MODULE.
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const sharp = require(process.env.VENERE_SHARP_MODULE || 'sharp');
const output = 'public/images/configurator/V3/cutouts/wheels';
await mkdir(output, { recursive: true });
const sources = {
  argento: 'public/images/configurator/V3/render/Side-View/carrozzeria/argento.png',
  nero: 'public/images/configurator/V3/render/Side-View/Cerchi/nero.png',
};
// Coordinates measured on the 1376 × 768 inspection canvas. The boundary sits
// just beyond the rim in the tyre, covering the old silver lip without touching the body.
const wheels = [
  { id: 'front', cx: 314.5, cy: 478, rx: 88.5, ry: 89.5 },
  { id: 'rear', cx: 1092.5, cy: 475, rx: 88.5, ry: 89.5 },
];
const manifest = {};
for (const [finish, source] of Object.entries(sources)) {
  const { width, height } = await sharp(source).metadata();
  const sx=width/1376, sy=height/768;
  const displayScale=Math.min(1000/width,558/height);
  const offsetX=(1000-width*displayScale)/2, offsetY=(558-height*displayScale)/2;
  manifest[finish] = [];
  for (const wheel of wheels) {
    const left=Math.floor((wheel.cx-wheel.rx-1)*sx), top=Math.floor((wheel.cy-wheel.ry-1)*sy);
    const w=Math.ceil((wheel.cx+wheel.rx+1)*sx)-left, h=Math.ceil((wheel.cy+wheel.ry+1)*sy)-top;
    const alpha=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><ellipse cx="${wheel.cx*sx-left}" cy="${wheel.cy*sy-top}" rx="${wheel.rx*sx}" ry="${wheel.ry*sy}" fill="white"/></svg>`);
    const name=`${finish}-${wheel.id}.png`;
    await sharp(source).extract({left,top,width:w,height:h}).ensureAlpha()
      .composite([{input:alpha,blend:'dest-in'}]).png().toFile(`${output}/${name}`);
    manifest[finish].push({
      id: wheel.id, src: `/images/configurator/V3/cutouts/wheels/${name}`,
      x: left*displayScale+offsetX, y: top*displayScale+offsetY,
      width: w*displayScale, height: h*displayScale,
    });
    console.log(`${name}: ${w} × ${h}, original pixels with alpha`);
  }
}
await writeFile('app/lib/venere-wheel-cutouts.json', JSON.stringify(manifest,null,2)+'\n');
