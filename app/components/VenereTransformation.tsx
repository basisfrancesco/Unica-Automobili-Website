"use client";

import { useRef, useState, type PointerEvent } from "react";
import VenereRender from "./VenereRender";
import { renderColours, renderViews, selectedOverlays } from "../lib/venere-renders";
import { asset } from "../lib/assets";

const side = renderViews.find(item => item.id === "side")!;
const silver = renderColours.find(item => item.slug === "argento") ?? renderColours[0];

export default function VenereTransformation() {
  const area = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);

  const update = (clientX: number) => {
    const bounds = area.current?.getBoundingClientRect();
    if (!bounds) return;
    setPosition(Math.max(0, Math.min(100, ((clientX - bounds.left) / bounds.width) * 100)));
  };

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || event.buttons === 1) update(event.clientX);
  };

  const onDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") event.currentTarget.setPointerCapture(event.pointerId);
    update(event.clientX);
  };

  return <section className="vt-section" id="trasformazione" aria-labelledby="vt-title">
    <div className="vt-intro" data-reveal>
      <p className="v-kicker">La trasformazione / Prima e dopo</p>
      <h2 id="vt-title">La stessa origine.<br/><em>Un’altra identità.</em></h2>
      <p>Da GranTurismo a Venere: la silhouette cambia, la meccanica diventa il punto di partenza di un nuovo disegno. Esplora le proporzioni spostando il cursore sull’auto.</p>
    </div>
    <div className="vt-stage" ref={area} onPointerMove={onMove} onPointerDown={onDown}>
      <div className="vt-original">
        <img src={asset("/images/venere/granturismo-original-side.webp")} alt="Maserati GranTurismo originale, profilo laterale" loading="lazy"/>
      </div>
      <div className="vt-after" style={{clipPath:`inset(0 ${100 - position}% 0 0)`}} aria-hidden="true">
        <VenereRender source={silver.images.side} framing={side.framing} height={side.height} label="Venere, profilo laterale nel configuratore" overlays={selectedOverlays({}, "side")} />
      </div>
      <span className="vt-divider" style={{left:`${position}%`}} aria-hidden="true"><span>‹ ›</span></span>
      <span className="vt-corner vt-corner-left">01 / GranTurismo</span>
      <span className="vt-corner vt-corner-right">02 / Venere</span>
    </div>
    <div className="vt-range">
      <label htmlFor="venere-transformation-range">Confronta le due silhouette</label>
      <input id="venere-transformation-range" type="range" min={0} max={100} value={Math.round(position)} onChange={event=>setPosition(Number(event.target.value))} aria-valuetext={`${Math.round(position)}% Venere visibile`}/>
      <span>Trascina o sposta il cursore</span>
    </div>
    <p className="vt-footnote">Confronto visivo tra la vettura originale e un render di progetto della Venere; le modifiche rappresentate sono concettuali.</p>
  </section>;
}
