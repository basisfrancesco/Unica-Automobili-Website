// Validate the HD source alignment and physical boundaries, and export reusable SVG masks.
// Node >= 22. Run with --write to update public masks after editing venere-views.ts.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { cutouts, views, glossySources } from '../app/lib/venere-views.ts';
import { materialCurves } from '../app/lib/venere-materials.ts';
import { paints, wheels, exhausts, calipers, interiors } from '../app/lib/venere-config.ts';
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
    wheels: { inside: [[311,424],[1089,425],[238,480],[315,477],[1092,477]], outside: [[285,435],[1048,435],[218,477]] },
    calipers: { inside: [[363,487],[1040,480]], outside: [[315,477],[280,435],[341,462],[1089,425]] },
    interiors: { inside: [[909,264],[928,269]], outside: [[949,269],[850,280],[900,345]] },
    exhausts: { inside: [[505,431],[530,460]], outside: [[511,442],[530,472],[565,457],[477,483],[485,430],[504,456],[552,485]] },
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
  const glossy = await readFile(`public${glossySources[view.id]}`);
  assert.equal(glossy.readUInt32BE(16), 5504, `${view.id} glossy width`);
  assert.equal(glossy.readUInt32BE(20), 3072, `${view.id} glossy height`);
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
  assert(!(raster.side.paint[i]>250 && raster.side.exhausts[i]>250), 'Paint/exhaust surfaces overlap');
}
console.log('PASS: 3 HD sources, 9 masks, coordinated wheel centers, protected exhaust openings, independent surfaces.');
for (const [surface, finishes] of Object.entries({ paint: paints, wheels, exhausts, calipers, interiors })) {
  for (const finish of finishes) {
    for (const curve of materialCurves(surface, finish.sample)) {
      const values = curve.split(' ').map(Number);
      assert(values.every((v,i) => Number.isFinite(v) && v>=0 && v<=1 && (i===0 || v>=values[i-1])), `${surface}/${finish.slug}: invalid tonal curve`);
      assert.equal(values[0], 0, 'Deep occlusion remains black');
      assert.equal(values.at(-1), 1, 'Specular peak remains neutral white');
    }
  }
}
const whiteCurves = materialCurves('wheels', wheels.find(w=>w.slug==='bianco-puro').sample);
assert(whiteCurves.every(curve=>curve===whiteCurves[0]), 'Pure white wheels must not have a colour cast');
const whiteValues = whiteCurves[0].split(' ').map(Number);
assert(whiteValues[16]>.85 && whiteValues[28]<whiteValues[30] && whiteValues[30]<1, 'White stays bright without clipping highlight detail');
console.log('PASS: all finish curves preserve shading; pure white wheels are neutral and retain highlight detail.');
for (const paint of paints) {
  const satin = materialCurves('paint', paint.sample, 'satinata');
  const gloss = materialCurves('paint', paint.sample, 'lucida');
  assert.notDeepEqual(satin, gloss, `${paint.slug} supports both finishes`);
  for (const curve of satin) {
    const values=curve.split(' ').map(Number);
    assert(values.every((v,i)=>v>=0 && v<=1 && (i===0 || v>=values[i-1])));
  }
}
console.log('PASS: 6 HD sources, glossy/satin response available for all 12 paints.');
