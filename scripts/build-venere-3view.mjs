// Deterministic photographic cutouts. The SVG paths are used offline only to
// cut original pixels; the website never recolours or masks a material.
import { createRequire } from 'node:module';
import { mkdir, writeFile, stat, readdir, unlink } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const require = createRequire(import.meta.url);
const sharp = require(process.env.VENERE_SHARP_MODULE || 'sharp');
const root = 'public/images/configurator/V3/render/3View';
const out = 'public/images/configurator/V3/generated';
await mkdir(out, { recursive: true });
const scale = 5504 / 1400;
// All rectangles and contours share the same 1400px-wide contact sheet.
const views = {
  side: { label: 'Laterale', rect: [145, 48, 1110, 330], width: 2200 },
  front: { label: 'Frontale', rect: [55, 420, 605, 345], width: 1400 },
  rear: { label: 'Posteriore', rect: [760, 418, 580, 350], width: 1400 },
};
for (const view of Object.values(views)) {
  const [x,y,w,h] = view.rect.map(n => Math.round(n * scale));
  view.crop = { left:x, top:y, width:w, height:h };
  view.height = 1000 * h / w;
}
const wheelShape = '<ellipse cx="368.5" cy="281.8" rx="74.4" ry="74.8"/><ellipse cx="1047.5" cy="279.2" rx="74.4" ry="75.2"/>';
const interiorShapes = {
  side: '<path d="M706 153 L716 129 Q722 131 731 132 L730 128 Q728 123 733 122 Q737 121 740 128 L745 133 Q815 139 859 124 Q876 118 879 110 Q877 91 881 82 Q886 74 893 79 L899 84 Q907 80 913 86 Q918 88 918 98 L916 115 Q910 127 902 135 Q873 148 843 150 L747 154 Z"/>',
  front: '<path d="M179 515 Q197 486 222 454 Q249 446 284 445 L328 444 Q354 442 382 444 Q455 444 481 452 Q509 480 534 515 Q466 512 400 513 L307 514 Z"/>',
  // Only the interior behind the roll hoops, never the painted rear fairings.
  rear: '<path d="M902 467 Q919 451 940 451 Q961 449 969 461 L972 465 Q940 463 917 467 L898 472 Z M1128 465 L1134 457 Q1151 447 1174 453 Q1193 457 1203 470 L1193 467 Q1165 463 1128 465 Z M972 437 Q1050 434 1129 437 L1111 472 Q1104 487 1090 487 L1015 487 Q1002 487 991 474 Z"/>',
};
const exhaustShape = `<g transform="translate(${2000/scale} ${900/scale}) scale(${1/scale})"><path d="M18 37 Q15 29 32 27 L146 22 Q165 22 178 38 L229 112 Q239 132 211 136 L100 144 Q75 145 65 128 Z M79 148 Q72 136 98 133 L210 128 Q231 126 244 146 L284 211 Q298 234 268 240 L156 249 Q130 251 120 232 Z"/></g>`;
const groups = [
  { id:'wheels', label:'Cerchi', folder:'Cerchi', shapes:{side:wheelShape}, options:[['argento','Argento','#bebbc0'],['nero','Nero','#252329'],['oro','Oro','#b29865']] },
  { id:'interior', label:'Interni', folder:'Interni', shapes:interiorShapes, options:[['nero','Nero','#252329'],['bianco','Bianco','#f4f0e9'],['blu','Blu','#334d78'],['marrone','Marrone','#825236']] },
  { id:'calipers', label:'Pinze', folder:'pinze', shapes:{side:'calipers'}, options:[['argento','Argento','#bebbc0'],['giallo','Giallo','#e9c920']] },
  { id:'exhaust', label:'Scarichi', folder:'scarichi', shapes:{side:exhaustShape}, options:[['argento','Argento','#bebbc0'],['nero','Nero','#252329']] },
];
const manifest = { views: Object.entries(views).map(([id,v])=>({id,label:v.label,framing:`0 0 1000 ${v.height}`,height:v.height})), colours:[], groups:[] };
let bytes = 0;
const generated = new Set();
async function save(name, buffer) {
  const hash = createHash('sha256').update(buffer).digest('hex').slice(0,10);
  const file = `${name}-${hash}.webp`;
  generated.add(file);
  await writeFile(`${out}/${file}`, buffer); bytes += buffer.length;
  return `/images/configurator/V3/generated/${file}`;
}
async function source(folder, name) {
  const path = `${root}/${folder}/${name}.png`;
  const meta = await sharp(path).metadata();
  if (meta.width !== 5504 || meta.height !== 3072) throw new Error(`Unexpected sheet size: ${path}`);
  return path;
}
for (const [slug,name,sample] of [['argento','Argento','#bebbc0'],['blu','Blu','#193e77'],['verde inglese','Verde inglese','#183e31']]) {
  const path = await source('Body',slug), colour = {slug:slug.replaceAll(' ','-'),name,sample,images:{},thumbnails:{}};
  for (const [id,view] of Object.entries(views)) {
    const cropped = sharp(path).extract(view.crop);
    colour.images[id] = await save(`body-${colour.slug}-${id}`, await cropped.clone().resize(view.width).webp({quality:94,effort:6}).toBuffer());
    colour.thumbnails[id] = await save(`thumb-${colour.slug}-${id}`, await cropped.clone().resize(240).webp({quality:82,effort:6}).toBuffer());
  }
  manifest.colours.push(colour);
}
// Yellow is a clean separation guide for the visible caliper surfaces. Fill
// enclosed lettering, but keep the spokes outside the cutout, for every finish.
const yellow = await sharp(await source('pinze','giallo')).removeAlpha().raw().toBuffer();
const caliperAlpha = Buffer.alloc(5504*3072);
for (const [x0,y0,x1,y1] of [[397,233,427,323],[985,232,1020,324]]) {
  const left=Math.floor(x0*scale),top=Math.floor(y0*scale),right=Math.ceil(x1*scale),bottom=Math.ceil(y1*scale);
  for(let y=top;y<bottom;y++) for(let x=left;x<right;x++) {
    const i=y*5504+x,j=i*3;
    if(Math.min(yellow[j],yellow[j+1])-yellow[j+2]>22 && yellow[j+1]>55) caliperAlpha[i]=255;
  }
  const outside = new Set(), queue=[];
  const push=(x,y)=>{const i=y*5504+x;if(x<left||x>=right||y<top||y>=bottom||outside.has(i)||caliperAlpha[i])return;outside.add(i);queue.push([x,y]);};
  for(let x=left;x<right;x++){push(x,top);push(x,bottom-1);}for(let y=top;y<bottom;y++){push(left,y);push(right-1,y);}
  for(let q=0;q<queue.length;q++){const [x,y]=queue[q];push(x-1,y);push(x+1,y);push(x,y-1);push(x,y+1);}
  for(let y=top;y<bottom;y++)for(let x=left;x<right;x++)if(!outside.has(y*5504+x))caliperAlpha[y*5504+x]=255;
}
for(const group of groups) {
  const result = {id:group.id,label:group.label,options:[]};
  for(const [slug,name,sample] of group.options) {
    const path=await source(group.folder,slug),option={slug,name,sample,overlays:{}};
    for(const [id,shape] of Object.entries(group.shapes)) {
      const view=views[id];
      let alpha;
      if(shape==='calipers') alpha=await sharp({create:{width:5504,height:3072,channels:3,background:'white'}}).joinChannel(caliperAlpha,{raw:{width:5504,height:3072,channels:1}}).png().toBuffer().then(buffer=>sharp(buffer).extract(view.crop).png().toBuffer());
      else alpha=await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="5504" height="3072" viewBox="0 0 1400 ${3072/scale}"><g fill="white">${shape}</g></svg>`)).extract(view.crop).png().toBuffer();
      // Trim transparent margins, then keep explicit registration coordinates.
      const rgba = await sharp(path).extract(view.crop).ensureAlpha().composite([{input:alpha,blend:'dest-in'}]).png().toBuffer();
      const {data,info}=await sharp(rgba).raw().toBuffer({resolveWithObject:true});
      let x0=info.width,y0=info.height,x1=0,y1=0;
      for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
      const rect={left:x0,top:y0,width:x1-x0+1,height:y1-y0+1};
      const buffer=await sharp(rgba).extract(rect).resize({width:Math.max(1,Math.round(rect.width*view.width/view.crop.width))}).webp({lossless:true,effort:6}).toBuffer();
      const src=await save(`${group.id}-${slug}-${id}`,buffer), factor=1000/view.crop.width;
      option.overlays[id]=[{id:group.id,src,x:x0*factor,y:y0*factor,width:rect.width*factor,height:rect.height*factor}];
    }
    result.options.push(option);
  }
  manifest.groups.push(result);
}
await writeFile('app/lib/venere-3view.json',JSON.stringify(manifest,null,2)+'\n');
// Remove only obsolete hashed outputs from this generator, never source PNGs.
for(const file of await readdir(out)) if(/^(body|thumb|wheels|interior|calipers|exhaust)-[a-z-]+-[a-f0-9]{10}\.webp$/.test(file)&&!generated.has(file)) await unlink(`${out}/${file}`);
console.log(`Generated library: ${(bytes/1024/1024).toFixed(2)} MiB. Original body sheet: ${((await stat(`${root}/Body/blu.png`)).size/1024/1024).toFixed(2)} MiB.`);
