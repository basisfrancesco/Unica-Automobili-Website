import { createRequire } from 'node:module';
import { readFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url);
const sharp=require(process.env.VENERE_SHARP_MODULE || 'sharp');
const manifest=JSON.parse(await readFile('app/lib/venere-wheel-cutouts.json','utf8'));
const directory='tmp/venere-wheel-review';
await mkdir(directory,{recursive:true});
const resources={};
for(const [finish,cutouts] of Object.entries(manifest)) {
  assert.equal(cutouts.length,2);
  for(const cutout of cutouts) {
    const png=await readFile(`public${cutout.src}`);
    const metadata=await sharp(png).metadata();
    assert(metadata.hasAlpha);
    const {data,info}=await sharp(png).ensureAlpha().raw().toBuffer({resolveWithObject:true});
    assert.equal(data[3],0,'Cutout corner must be transparent');
    assert.equal(data[(Math.floor(info.height/2)*info.width+Math.floor(info.width/2))*4+3],255,'Wheel centre must be opaque');
    resources[cutout.src]=png.toString('base64');
  }
}
for(const colour of ['argento','blu','nero']) {
  const path=`public/images/configurator/V3/render/Side-View/carrozzeria/${colour}.png`;
  const base=await sharp(path).resize({width:2000}).jpeg({quality:98,chromaSubsampling:'4:4:4'}).toBuffer();
  for(const [finish,cutouts] of Object.entries(manifest)) {
    const baseTag=`<image href="data:image/jpeg;base64,${base.toString('base64')}" width="1000" height="558" preserveAspectRatio="xMidYMid meet"/>`;
    const tags=cutouts.map(c=>`<image href="data:image/png;base64,${resources[c.src]}" x="${c.x}" y="${c.y}" width="${c.width}" height="${c.height}"/>`).join('');
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1860" height="580" viewBox="40 150 930 290">${baseTag}${tags}</svg>`;
    await sharp(Buffer.from(svg)).png().toFile(`${directory}/${colour}-${finish}.png`);
    console.log(`Rendered ${colour} / ${finish}`);
  }
}
console.log('PASS: four transparent photographic cutouts; all six combinations rendered.');
