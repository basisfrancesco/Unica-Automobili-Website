"use client";

import { useState } from "react";
import { asset } from "../lib/assets";
import type { RenderCutout } from "../lib/venere-renders";

export default function VenereRender({ source, framing, label, overlays = [], thumbnail = false }: {
  source: string; framing: string; label: string; overlays?: RenderCutout[]; thumbnail?: boolean;
}) {
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState(false);
  const ready = [source, ...overlays.map(item => item.src)].every(src => loaded.includes(src));
  const markLoaded = (src: string) => setLoaded(previous => previous.includes(src) ? previous : [...previous, src]);
  return <div className={`venere-render ${thumbnail ? "is-thumbnail" : ""}`}>
    {!thumbnail && !ready && !failed && <span className="render-message" role="status">Caricamento immagine…</span>}
    {failed ? <span className="render-message" role={thumbnail ? undefined : "alert"}>Immagine non disponibile</span> :
      <svg className="venere-preview" viewBox={framing} preserveAspectRatio="xMidYMid meet"
        style={{ opacity: ready ? 1 : 0 }} role={thumbnail ? undefined : "img"} aria-label={thumbnail ? undefined : label} aria-hidden={thumbnail || undefined}>
        <image href={asset(source)} width="1000" height="558" preserveAspectRatio="xMidYMid meet"
          onLoad={() => markLoaded(source)} onError={() => setFailed(true)} />
        {overlays.map(item => <image key={item.src} href={asset(item.src)} x={item.x} y={item.y} width={item.width} height={item.height}
          onLoad={() => markLoaded(item.src)} onError={() => setFailed(true)} />)}
      </svg>}
  </div>;
}
