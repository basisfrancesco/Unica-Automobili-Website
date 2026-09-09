"use client";

import { useState } from "react";
import { asset } from "../lib/assets";

export default function VenereRender({ source, framing, label, thumbnail = false }: {
  source: string; framing: string; label: string; thumbnail?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div className={`venere-render ${thumbnail ? "is-thumbnail" : ""}`}>
    {!thumbnail && !loaded && !failed && <span className="render-message" role="status">Caricamento immagine…</span>}
    {failed ? <span className="render-message" role={thumbnail ? undefined : "alert"}>Immagine non disponibile</span> :
      <svg className="venere-preview" viewBox={framing} preserveAspectRatio="xMidYMid meet"
        role={thumbnail ? undefined : "img"} aria-label={thumbnail ? undefined : label} aria-hidden={thumbnail || undefined}>
        <image href={asset(source)} width="1000" height="558" preserveAspectRatio="xMidYMid meet"
          onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
      </svg>}
  </div>;
}
