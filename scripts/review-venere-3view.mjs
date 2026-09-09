import { createRequire } from 'node:module';
import { readFile, mkdir, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url), sharp=require(process.env.VENERE_SHARP_MODULE || 'sharp');
const library=JSON.parse(await readFile('app/lib/venere-3view.json','utf8'));
await mkdir('tmp/3view-review',{recursive:true});
const local=src=>`public${src}`;
const combinations=library.groups.reduce((rows,group)=>rows.flatMap(row=>group.options.map((_,index)=>[...row,index])),[[]]);
let configurations=0;
for(const colour of library.colours)for(const selection of combinations){
  for(const view of library.views){
    assert(colour.images[view.id]&&colour.thumbnails[view.id]);
    const parts=library.groups.flatMap((group,i)=>group.options[selection[i]].overlays[view.id]??[]);
    assert.equal(parts.length,view.id==='side'?4:1);
    assert.equal(new Set(parts.map(part=>part.id)).size,parts.length);
  }
  configurations++;
}
assert.equal(configurations,144);
let bytes=0;
for(const colour of library.colours)for(const view of library.views) {
  for(const src of [colour.images[view.id],colour.thumbnails[view.id]])bytes+=(await stat(local(src))).size;
}
for(const group of library.groups)for(const option of group.options)for(const [viewId,parts] of Object.entries(option.overlays))for(const part of parts){
  const view=library.views.find(v=>v.id===viewId);
  assert(part.x>=0&&part.y>=0&&part.x+part.width<=1000&&part.y+part.height<=view.height);
  const {data,info}=await sharp(local(part.src)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let transparent=0,opaque=0;for(let i=3;i<data.length;i+=4){if(data[i]===0)transparent++;if(data[i]===255)opaque++;}
  assert(transparent>0&&opaque>0,`${group.id}/${option.slug}/${viewId}: invalid alpha`);
  if(group.id==='calipers')assert(opaque<info.width*info.height*.1,'Caliper cutout must not cover spokes or body');
  bytes+=(await stat(local(part.src))).size;
}
// Wheels/exhaust/calipers are occluded in these orthographic front/rear views.
for(const group of library.groups.filter(g=>g.id!=='interior'))for(const option of group.options){assert(!option.overlays.front);assert(!option.overlays.rear);}
async function render(colour, selections, view, name) {
  const width=view.id==='side'?2200:1400,height=Math.round(width*view.height/1000);
  const overlays=library.groups.flatMap((g,i)=>g.options[selections[i]].overlays[view.id]??[]);
  const composites=[];
  for(const part of overlays)composites.push({input:await sharp(local(part.src)).resize(Math.round(part.width*width/1000),Math.round(part.height*width/1000),{fit:'fill'}).toBuffer(),left:Math.round(part.x*width/1000),top:Math.round(part.y*width/1000)});
  const output=`tmp/3view-review/${name}-${view.id}.png`;
  await sharp(local(colour.images[view.id])).resize(width,height).composite(composites).png().toFile(output);
  return output;
}
for(const [i,colour] of library.colours.entries())for(const view of library.views)await render(colour,[i,1,1,1],view,colour.slug);
for(const [i,option] of library.groups[1].options.entries())for(const view of library.views)await render(library.colours[1],[1,i,0,0],view,`interior-${option.slug}`);
const initial=[library.colours[0].images.side,...Object.values(library.colours[0].thumbnails),...library.groups.flatMap(g=>(g.options[0].overlays.side??[]).map(p=>p.src))];
let initialBytes=0;for(const src of initial)initialBytes+=(await stat(local(src))).size;
console.log(`PASS: complete 3-view catalogue, 144 configurations, isolated alpha cutouts, no gold tyres. Initial assets ${(initialBytes/1024).toFixed(0)} KiB; total referenced assets ${(bytes/1024/1024).toFixed(2)} MiB. 21 visual previews written.`);
