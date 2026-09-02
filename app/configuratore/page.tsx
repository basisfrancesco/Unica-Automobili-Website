"use client";

import { type CSSProperties, useEffect, useMemo, useState } from "react";
import LayeredVenere, { type VenereLayerConfiguration } from "../components/LayeredVenere";

const paints = [
  { name: "Argento Venere", slug: "argento-venere", sample: "#c8c9c7", note: "Metallizzato" },
  { name: "Rosso Notturno", slug: "rosso-notturno", sample: "#781c23", note: "Metallizzato" },
  { name: "Blu Mezzanotte", slug: "blu-mezzanotte", sample: "#17334b", note: "Metallizzato" },
  { name: "Verde Inglese", slug: "verde-inglese", sample: "#294437", note: "Metallizzato" },
  { name: "Nero Ossidiana", slug: "nero-ossidiana", sample: "#151717", note: "Metallizzato" },
  { name: "Bianco Perla", slug: "bianco-perla", sample: "#e8e4da", note: "Perlato" },
  { name: "Giallo Amalfi", slug: "giallo-amalfi", sample: "#d6a623", note: "Metallizzato" },
  { name: "Arancio Bruciato", slug: "arancio-bruciato", sample: "#9f4628", note: "Metallizzato" },
];

const wheels = [
  { name: "Argento Satinato", slug: "argento-satinato", sample: "#b7b8b5", note: "Firma Venere" },
  { name: "Nero Satinato", slug: "nero-satinato", sample: "#242626", note: "Contrasto tecnico" },
  { name: "Oro Champagne", slug: "oro-champagne", sample: "#a88a57", note: "Finitura atelier" },
];

const calipers = [
  { name: "Rosso", slug: "rosso", sample: "#bb2027" },
  { name: "Giallo", slug: "giallo", sample: "#e5b72f" },
  { name: "Blu", slug: "blu", sample: "#205a86" },
  { name: "Rame", slug: "rame", sample: "#a4633d" },
  { name: "Grafite", slug: "grafite", sample: "#353b3c" },
];

type Panel = "paint" | "wheels" | "brakes";

export default function LayeredConfiguratorPage() {
  const [paintIndex, setPaintIndex] = useState(1);
  const [wheelIndex, setWheelIndex] = useState(0);
  const [caliperIndex, setCaliperIndex] = useState(0);
  const [panel, setPanel] = useState<Panel>("paint");
  const [expanded, setExpanded] = useState(false);

  const configuration: VenereLayerConfiguration = useMemo(() => ({
    paintSlug: paints[paintIndex].slug,
    paintName: paints[paintIndex].name,
    wheelSlug: wheels[wheelIndex].slug,
    wheelName: wheels[wheelIndex].name,
    caliperSlug: calipers[caliperIndex].slug,
    caliperName: calipers[caliperIndex].name,
  }), [paintIndex, wheelIndex, caliperIndex]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", expanded);
    return () => document.body.classList.remove("menu-locked");
  }, [expanded]);

  const reset = () => {
    setPaintIndex(0);
    setWheelIndex(0);
    setCaliperIndex(4);
  };

  const configurationLabel = `${paints[paintIndex].name} · ${wheels[wheelIndex].name} · Pinze ${calipers[caliperIndex].name}`;

  return (
    <main className="layer-config-page">
      <header className="layer-config-intro">
        <div>
          <p className="section-tag light">/ Atelier digitale · Venere</p>
          <h1>Una Venere.<br /><em>La tua.</em></h1>
        </div>
        <div className="layer-config-intro-copy">
          <span>Configuratore fotografico · Vista laterale</span>
          <p>Il master originale rimane sempre integro. Vernice, ruote e freni si innestano come ritagli sovrapposti, senza vuoti tra un elemento e l’altro.</p>
        </div>
      </header>

      <section className="layer-config-workspace" aria-label="Configuratore Venere">
        <div className="layer-config-visual">
          <div className="layer-config-status"><i /> Master fotografico <span>Ritagli sovrapposti</span></div>
          <LayeredVenere configuration={configuration} />
          <button className="layer-config-expand" onClick={() => setExpanded(true)} aria-label="Apri la configurazione a schermo intero">Vista intera <span>↗</span></button>
          <div className="layer-config-caption">
            <span>Unica Venere</span>
            <strong>{paints[paintIndex].name}</strong>
            <small>{wheels[wheelIndex].name} · Pinze {calipers[caliperIndex].name}</small>
          </div>
        </div>

        <aside className="layer-config-panel">
          <div className="layer-config-tabs" role="tablist" aria-label="Sezioni del configuratore">
            <button className={panel === "paint" ? "active" : ""} onClick={() => setPanel("paint")} role="tab" aria-selected={panel === "paint"}><span>01</span> Vernice</button>
            <button className={panel === "wheels" ? "active" : ""} onClick={() => setPanel("wheels")} role="tab" aria-selected={panel === "wheels"}><span>02</span> Cerchi</button>
            <button className={panel === "brakes" ? "active" : ""} onClick={() => setPanel("brakes")} role="tab" aria-selected={panel === "brakes"}><span>03</span> Pinze</button>
          </div>

          <div className="layer-config-options" role="tabpanel">
            {panel === "paint" && <>
              <div className="layer-option-heading"><span>Verniciatura</span><h2>{paints[paintIndex].name}</h2><p>Non una tinta digitale: ogni colore è una carrozzeria renderizzata con profondità, grana e riflessi propri.</p></div>
              <div className="layer-paint-grid">{paints.map((paint, index) => <button key={paint.slug} className={paintIndex === index ? "active" : ""} onClick={() => setPaintIndex(index)} aria-pressed={paintIndex === index}><i style={{ background: paint.sample }} /><span>{paint.name}</span><small>{paint.note}</small></button>)}</div>
            </>}

            {panel === "wheels" && <>
              <div className="layer-option-heading"><span>Finitura cerchi</span><h2>{wheels[wheelIndex].name}</h2><p>Ogni gruppo ruota è ritagliato sulla fotografia completa: passaruota, profondità e parti nascoste restano quelli del master.</p></div>
              <div className="layer-wheel-grid">{wheels.map((wheel, index) => <button key={wheel.slug} className={wheelIndex === index ? "active" : ""} onClick={() => setWheelIndex(index)} aria-pressed={wheelIndex === index}><i className="layer-wheel-swatch" style={{ "--wheel-sample": wheel.sample } as CSSProperties} /><span><strong>{wheel.name}</strong><small>{wheel.note}</small></span><b>0{index + 1}</b></button>)}</div>
            </>}

            {panel === "brakes" && <>
              <div className="layer-option-heading"><span>Pinze freno</span><h2>{calipers[caliperIndex].name}</h2><p>La variante interviene soltanto dove è visibile tra le razze; tutto ciò che rimane nascosto continua dal master sottostante.</p></div>
              <div className="layer-caliper-grid">{calipers.map((caliper, index) => <button key={caliper.slug} className={caliperIndex === index ? "active" : ""} onClick={() => setCaliperIndex(index)} aria-pressed={caliperIndex === index}><i style={{ background: caliper.sample }} /><span>{caliper.name}</span></button>)}</div>
            </>}
          </div>

          <div className="layer-config-actions">
            <button onClick={reset}>Ripristina</button>
            <a href={`mailto:atelier@unicaautomobili.it?subject=${encodeURIComponent(`Venere — ${configurationLabel}`)}`}>Invia all’atelier <span>↗</span></a>
          </div>
        </aside>
      </section>

      <section className="layer-config-explainer">
        <p className="section-tag light">/ Composizione</p>
        <div><strong>01</strong><span>Master completo</span></div><div><strong>02</strong><span>Freni visibili</span></div><div><strong>03</strong><span>Gruppi ruota</span></div><div><strong>04</strong><span>Carrozzeria sovrapposta</span></div>
      </section>

      <div className="sr-only" aria-live="polite">Configurazione aggiornata: {configurationLabel}.</div>

      {expanded && <div className="layer-config-lightbox" role="dialog" aria-modal="true" aria-label="Configurazione Venere a schermo intero">
        <LayeredVenere configuration={configuration} interactive={false} className="expanded" />
        <button onClick={() => setExpanded(false)}>Chiudi <span>×</span></button>
        <div><strong>{paints[paintIndex].name}</strong><span>{wheels[wheelIndex].name} · Pinze {calipers[caliperIndex].name}</span></div>
      </div>}
    </main>
  );
}
