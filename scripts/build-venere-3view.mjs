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
  side: `<path d="M706 153 L716 129 Q722 131 731 132 L730 128 Q728 123 733 122 Q737 121 740 128 L745 133 Q815 139 859 124 Q870 121 878 116 C875 105 877 90 880 83 Q883 76 889 79 Q894 79 897 84 Q904 81 910 84 Q917 84 918 94 Q920 116 914 132 Q896 142 873 147 L843 151 L747 154 Z"/><g transform="scale(${1/scale})"><path d="M3448 460 C3442 415 3444 340 3458 307 Q3472 292 3495 300 Q3530 303 3542 322 Q3560 315 3590 320 Q3615 329 3610 375 L3610 460 Z"/></g>`,
  front: '<path d="M179 515 Q197 486 222 454 Q249 446 284 445 L328 444 Q354 442 382 444 Q455 444 481 452 Q509 480 534 515 Q466 512 400 513 L307 514 Z"/>',
  // Only the interior behind the roll hoops, never the painted rear fairings.
  rear: `<g transform="scale(${1/scale})"><path d="M3613 1819 C3632 1785 3655 1775 3699 1775 C3747 1772 3776 1784 3802 1813 C3740 1807 3677 1811 3613 1819 Z"/><path transform="translate(8280 0) scale(-1 1)" d="M3613 1819 C3632 1785 3655 1775 3699 1775 C3747 1772 3776 1784 3802 1813 C3740 1807 3677 1811 3613 1819 Z"/></g><path d="M972 437 Q1050 434 1129 437 L1125 445 Q1096 442 1074 448 L1071 460 Q1069 465 1062 465 L1040 465 Q1033 465 1031 460 L1028 449 Q1002 443 980 446 Z"/>`, 
};
// Shared outline includes the outer metal lip, not just the bright inner edge.
const exhaustShape = `<g transform="translate(${1970/scale} ${890/scale}) scale(${1/scale})"><path d="M47 50 Q46 40 63 38 L177 33 Q197 32 213 53 L319 216 Q330 239 309 249 L175 262 Q138 268 122 239 L49 69 Q46 58 47 50 Z"/></g>`;
const groups = [
  { id:'wheels', label:'Cerchi', folder:'Cerchi', shapes:{side:wheelShape}, options:[['argento','Argento Vivo','#bebbc0'],['nero','Nero Grafite','#252329'],['oro','Oro Seta','#b29865'],['bianco','Bianco Gesso','#ffffff']] },
  { id:'interior', label:'Interni', folder:'Interni', shapes:interiorShapes, options:[['nero','Nero Inchiostro','#252329'],['bianco','Bianco Neve','#f4f0e9'],['blu','Blu Notte','#334d78'],['marrone','Cuoio Castagna','#825236'],['panna','Panna Avorio','#e6d5b5'],['arancio','Arancio Ambra','#c57537'],['bordeaux','Rosso Granata','#652936'],['grigio','Grigio Pietra','#93918e']] },
  { id:'calipers', label:'Pinze', folder:'pinze', shapes:{side:'calipers'}, options:[['argento','Argento Tecnico','#bebbc0'],['giallo','Giallo Corsa','#e9c920'],['nero','Nero Grafite','#252329'],['rosso','Rosso Fiamma','#bb2633'],['bianco','Bianco Ghiaccio','#f7f6f2'],['blu','Blu Elettrico','#315cbb']] },
  { id:'exhaust', label:'Scarichi', folder:'scarichi', shapes:{side:exhaustShape}, options:[['argento','Argento Vivo','#bebbc0'],['nero','Nero Fumo','#252329'],['titanio','Titanio Aurora','#496c9f'],['ceramica','Ceramica Antracite','#454344'],['oro','Oro Caldo','#bb986a']] },
];
const bodyColours = [
  ['argento','Argento di Luna','#bebbc0'],['blu','Blu Abisso','#193e77'],
  ['verde inglese','Verde Selva','#183e31'],['arancione','Arancio Vesuvio','#d97525'],
  ['azzurro','Azzurro Riviera','#76b3d4'],['rosso scuro','Rosso Amarena','#652334'],
  ['bianco','Bianco Dolomia','#f3f0ea'],['giallo','Giallo Zafferano','#e5ba28'],
  ['nero','Nero Ossidiana','#17171b'],['oro','Oro Pallido','#bfab8a'],['viola','Viola Ametista','#582e68'],
];
// Fail loudly when a supplied finish was forgotten or renamed.
for (const [folder,options] of [['Body',bodyColours],...groups.map(g=>[g.folder,g.options])]) {
  const supplied=(await readdir(`${root}/${folder}`)).filter(f=>f.toLowerCase().endsWith('.png')).map(f=>f.slice(0,-4));
  const registered=options.map(o=>o[0]);
  if(supplied.some(f=>!registered.includes(f))||registered.some(f=>!supplied.includes(f))) throw new Error(`Catalogue differs from source folder: ${folder}`);
}
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
for (const [slug,name,sample] of bodyColours) {
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
