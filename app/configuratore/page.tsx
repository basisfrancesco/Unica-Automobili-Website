"use client";

import { useEffect, useMemo, useState } from "react";
import LayeredVenere, { type VenereLayerConfiguration } from "../components/LayeredVenere";

const paints = [
  { name: "Argento Venere", hex: "#ffffff", sample: "#c8c9c7" },
  { name: "Rosso Notturno", hex: "#8d2028", sample: "#781c23" },
  { name: "Blu Mezzanotte", hex: "#244765", sample: "#17334b" },
  { name: "Verde Inglese", hex: "#365547", sample: "#294437" },
  { name: "Nero Ossidiana", hex: "#242727", sample: "#151717" },
  { name: "Bianco Perla", hex: "#f3efe6", sample: "#e8e4da" },
  { name: "Giallo Amalfi", hex: "#e0b43e", sample: "#d6a623" },
  { name: "Arancio Bruciato", hex: "#b45a34", sample: "#9f4628" },
];

const calipers = [
  { name: "Rosso", hex: "#bb2027" },
  { name: "Giallo", hex: "#e5b72f" },
  { name: "Blu", hex: "#205a86" },
  { name: "Rame", hex: "#a4633d" },
  { name: "Grafite", hex: "#353b3c" },
];

const finishes = [
  { name: "Lucida", value: 1 },
  { name: "Satinata", value: 0.58 },
  { name: "Opaca", value: 0.2 },
];

export default function LayeredConfiguratorPage() {
  const [paintIndex, setPaintIndex] = useState(1);
  const [caliperIndex, setCaliperIndex] = useState(0);
  const [finishIndex, setFinishIndex] = useState(0);
  const [panel, setPanel] = useState<"paint" | "brakes" | "finish">("paint");
  const [expanded, setExpanded] = useState(false);

  const configuration: VenereLayerConfiguration = useMemo(() => ({
    paint: paints[paintIndex].hex,
    paintName: paints[paintIndex].name,
    caliper: calipers[caliperIndex].hex,
    caliperName: calipers[caliperIndex].name,
    highlightOpacity: finishes[finishIndex].value,
  }), [paintIndex, caliperIndex, finishIndex]);

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
    setCaliperIndex(4);
    setFinishIndex(0);
  };

  return (
    <main className="layer-config-page">
      <header className="layer-config-intro">
        <div>
          <p className="section-tag light">/ Atelier digitale · Prototipo</p>
          <h1>Una Venere.<br /><em>La tua.</em></h1>
        </div>
        <div className="layer-config-intro-copy">
          <span>Configuratore 2D · Vista laterale</span>
          <p>Vernice, riflessi e pinze vengono composti in tempo reale. Nessuna immagine completa viene sostituita.</p>
        </div>
      </header>

      <section className="layer-config-workspace" aria-label="Configuratore sperimentale Venere">
        <div className="layer-config-visual">
          <div className="layer-config-status"><i /> Live composition <span>8 livelli</span></div>
          <LayeredVenere configuration={configuration} />
          <button className="layer-config-expand" onClick={() => setExpanded(true)} aria-label="Apri la configurazione a schermo intero">Vista intera <span>↗</span></button>
          <div className="layer-config-caption">
            <span>Unica Venere</span>
            <strong>{paints[paintIndex].name}</strong>
            <small>{finishes[finishIndex].name} · Cerchi Silver · Pinze {calipers[caliperIndex].name}</small>
          </div>
        </div>

        <aside className="layer-config-panel">
          <div className="layer-config-tabs" role="tablist" aria-label="Sezioni del configuratore">
            <button className={panel === "paint" ? "active" : ""} onClick={() => setPanel("paint")} role="tab" aria-selected={panel === "paint"}><span>01</span> Vernice</button>
            <button className={panel === "brakes" ? "active" : ""} onClick={() => setPanel("brakes")} role="tab" aria-selected={panel === "brakes"}><span>02</span> Pinze</button>
            <button className={panel === "finish" ? "active" : ""} onClick={() => setPanel("finish")} role="tab" aria-selected={panel === "finish"}><span>03</span> Finitura</button>
          </div>

          <div className="layer-config-options" role="tabpanel">
            {panel === "paint" && <>
              <div className="layer-option-heading"><span>Verniciatura</span><h2>{paints[paintIndex].name}</h2><p>La tinta viene applicata alla maschera della carrozzeria mantenendo ombre, volumi e riflessi originali.</p></div>
              <div className="layer-paint-grid">{paints.map((paint, index) => <button key={paint.name} className={paintIndex === index ? "active" : ""} onClick={() => setPaintIndex(index)} aria-pressed={paintIndex === index}><i style={{ background: paint.sample }} /><span>{paint.name}</span><small>{paint.hex}</small></button>)}</div>
            </>}

            {panel === "brakes" && <>
              <div className="layer-option-heading"><span>Pinze freno</span><h2>{calipers[caliperIndex].name}</h2><p>Il colore interessa soltanto la superficie delle pinze; dischi, mozzi e cerchi restano livelli indipendenti.</p></div>
              <div className="layer-caliper-grid">{calipers.map((caliper, index) => <button key={caliper.name} className={caliperIndex === index ? "active" : ""} onClick={() => setCaliperIndex(index)} aria-pressed={caliperIndex === index}><i style={{ background: caliper.hex }} /><span>{caliper.name}</span></button>)}</div>
            </>}

            {panel === "finish" && <>
              <div className="layer-option-heading"><span>Superficie</span><h2>{finishes[finishIndex].name}</h2><p>L’intensità del clear coat è controllata separatamente dal colore per simulare una superficie lucida, satinata o opaca.</p></div>
              <div className="layer-finish-list">{finishes.map((finish, index) => <button key={finish.name} className={finishIndex === index ? "active" : ""} onClick={() => setFinishIndex(index)} aria-pressed={finishIndex === index}><span>{finish.name}</span><i><b style={{ opacity: finish.value }} /></i><small>0{index + 1}</small></button>)}</div>
              <div className="layer-wheel-note"><span>Finitura cerchi</span><strong>Silver satinato</strong><p>Il livello Black sarà attivato appena sarà disponibile il relativo asset trasparente.</p></div>
            </>}
          </div>

          <div className="layer-config-actions">
            <button onClick={reset}>Ripristina</button>
            <a href={`mailto:atelier@unicaautomobili.it?subject=${encodeURIComponent(`Venere — ${paints[paintIndex].name}, pinze ${calipers[caliperIndex].name}, finitura ${finishes[finishIndex].name}`)}`}>Invia all’atelier <span>↗</span></a>
          </div>
        </aside>
      </section>

      <section className="layer-config-explainer">
        <p className="section-tag light">/ Composizione</p>
        <div><strong>01</strong><span>Sfondo e ombra</span></div><div><strong>02</strong><span>Freni e pinze</span></div><div><strong>03</strong><span>Cerchi</span></div><div><strong>04</strong><span>Carrozzeria e dettagli</span></div>
      </section>

      <div className="sr-only" aria-live="polite">Configurazione aggiornata: {configuration.paintName}, pinze {configuration.caliperName}, finitura {finishes[finishIndex].name}.</div>

      {expanded && <div className="layer-config-lightbox" role="dialog" aria-modal="true" aria-label="Configurazione Venere a schermo intero">
        <LayeredVenere configuration={configuration} interactive={false} className="expanded" />
        <button onClick={() => setExpanded(false)}>Chiudi <span>×</span></button>
        <div><strong>{paints[paintIndex].name}</strong><span>{finishes[finishIndex].name} · Pinze {calipers[caliperIndex].name}</span></div>
      </div>}
    </main>
  );
}
