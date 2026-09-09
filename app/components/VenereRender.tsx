"use client";
import { useEffect, useState } from "react";
import { asset } from "../lib/assets";
import type { RenderCutout } from "../lib/venere-renders";

// Share decoded downloads across views; discard failures so they can be retried.
const images = new Map<string, Promise<void>>();
function load(source: string) {
  let pending = images.get(source);
  if (!pending) {
    pending = new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => image.decode().then(resolve, reject);
      image.onerror = reject;
      image.src = asset(source);
    }).catch(error => { images.delete(source); throw error; });
    images.set(source, pending);
  }
  return pending;
}
export function preloadRender(source: string, overlays: RenderCutout[] = []) {
  void Promise.all([source, ...overlays.map(item => item.src)].map(load)).catch(() => {});
}
type Frame = { source: string; framing: string; height: number; label: string; overlays: RenderCutout[] };
export default function VenereRender({ source, framing, height, label, overlays = [], thumbnail = false }: Frame & { thumbnail?: boolean }) {
  const [frame, setFrame] = useState<Frame>();
  const [failure, setFailure] = useState<string>();
  const [attempt, setAttempt] = useState(0);
  const request = JSON.stringify({ source, framing, height, label, overlays });
  const failed = failure === request;
  const ready = frame && JSON.stringify(frame) === request;
  useEffect(() => {
    let current = true;
    const next: Frame = JSON.parse(request);
    Promise.all([next.source, ...next.overlays.map(item => item.src)].map(load)).then(() => {
      if (current) { setFrame(next); setFailure(undefined); }
    }).catch(() => { if (current) setFailure(request); });
    return () => { current = false; };
  }, [request, attempt]);
  return <div className={`venere-render ${thumbnail ? "is-thumbnail" : ""}`} aria-busy={!ready && !failed}>
    {frame && <svg className="venere-preview" viewBox={frame.framing} preserveAspectRatio="xMidYMid meet"
      role={thumbnail ? undefined : "img"} aria-label={thumbnail ? undefined : frame.label} aria-hidden={thumbnail || undefined}>
      <image href={asset(frame.source)} width="1000" height={frame.height} />
      {frame.overlays.map(item => <image key={item.src} href={asset(item.src)} x={item.x} y={item.y} width={item.width} height={item.height} />)}
    </svg>}
    {!thumbnail && !ready && <span className={`render-message ${frame ? "has-frame" : ""}`} role={failed ? "alert" : "status"}>
      {failed ? <>Immagine non disponibile. <button type="button" onClick={() => { setFailure(undefined); setAttempt(value => value + 1); }}>Riprova</button></> : "Caricamento immagine…"}
    </span>}
  </div>;
}
