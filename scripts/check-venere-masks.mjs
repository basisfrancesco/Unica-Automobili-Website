// Validate the HD source alignment and physical boundaries, and export reusable SVG masks.
// Node >= 22. Run with --write to update public masks after editing venere-views.ts.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { cutouts, views } from '../app/lib/venere-views.ts';
const require = createRequire(import.meta.url);
const sharp = require(process.env.VENERE_SHARP_MODULE || 'sharp');

function svgMask(geometry) {
  const paths = (list, fill) => list.map(d => `<path d="${d}" fill="${fill}" fill-rule="evenodd"/>`).join('');
  const clip = geometry.intersect ? `<clipPath id="apertures">${paths(geometry.intersect, 'white')}</clipPath>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="5504" height="3072" viewBox="0 0 1376 768"><defs>${clip}<mask id="surface" maskUnits="userSpaceOnUse" x="0" y="0" width="1376" height="768" style="mask-type:luminance"><g${geometry.intersect ? ' clip-path="url(#apertures)"' : ''}>${paths(geometry.paths, 'white')}</g>${paths(geometry.exclude || [], 'black')}</mask></defs><rect width="1376" height="768" fill="white" mask="url(#surface)"/></svg>\n`;
}

// Points lie well inside identified surfaces, not on antialiased edges.
const probes = {
  side: {
    paint: { inside: [[750,400],[447,482],[944,480],[952,272],[311,370]], outside: [[510,451],[750,526],[317,477],[104,527],[584,311],[965,275],[1282,354],[50,300]] },
    wheels: { inside: [[311,424],[1089,425],[238,480]], outside: [[315,477],[1092,477],[285,435],[1048,435],[218,477]] },
    calipers: { inside: [[363,487],[1040,480]], outside: [[315,477],[280,435],[341,462],[1089,425]] },
    interiors: { inside: [[909,264],[928,269]], outside: [[949,269],[850,280],[900,345]] },
  },
  front: {
    paint: { inside: [[705,350],[359,560],[170,400]], outside: [[700,550],[235,362],[1175,362],[706,443],[701,160],[194,650],[20,20]] },
    interiors: { inside: [[543,160],[854,160]], outside: [[705,170],[876,191],[550,250],[400,150]] },
  },
  rear: {
    paint: { inside: [[700,330],[200,380],[460,92]], outside: [[275,312],[1090,312],[680,530],[180,540],[699,130],[50,50]] },
    interiors: { inside: [[460,118],[901,118]], outside: [[407,130],[700,120],[470,150]] },
  },
};
const raster = {};
for (const view of views) {
  assert.deepEqual(view.surfaces, Object.keys(cutouts[view.id]), `${view.id} surface manifest`);
  const header = await readFile(`public${view.source}`);
  assert.equal(header.readUInt32BE(16), 5504, `${view.id} width`);
  assert.equal(header.readUInt32BE(20), 3072, `${view.id} height`);
  const [x,y,w,h] = view.box.split(' ').map(Number);
  assert(x >= 0 && y >= 0 && x+w <= 1376 && y+h <= 768);
  raster[view.id] = {};
  for (const [surface, geometry] of Object.entries(cutouts[view.id])) {
    const svg = svgMask(geometry);
    const file = `public/images/configurator/V3/masks/${view.id}/${surface}.svg`;
    if (process.argv.includes('--write')) {
      await mkdir(`public/images/configurator/V3/masks/${view.id}`, { recursive: true });
      await writeFile(file, svg);
    } else assert.equal(await readFile(file, 'utf8'), svg, `${file} needs regeneration`);
    const pixels = await sharp(Buffer.from(svg)).resize(1376,768).ensureAlpha().raw().toBuffer();
    raster[view.id][surface] = pixels;
    for (const [kind, points] of Object.entries(probes[view.id][surface])) {
      for (const [px,py] of points) {
        const alpha = pixels[(py*1376+px)*4+3];
        assert(kind === 'inside' ? alpha > 250 : alpha < 5, `${view.id}/${surface}: ${px},${py} expected ${kind}, alpha ${alpha}`);
      }
    }
  }
}
// A caliper cannot cover a spoke; independent finish choices must not overwrite each other.
for (let i=3; i<raster.side.wheels.length; i+=4) {
  assert(!(raster.side.wheels[i]>250 && raster.side.calipers[i]>250), 'Wheel/caliper surfaces overlap');
}
console.log('PASS: 3 HD sources, 8 masks, protected-surface probes, no opaque wheel/caliper overlap.');
