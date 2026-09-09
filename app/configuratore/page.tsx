"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import VenereRender from "../components/VenereRender";
import { renderColours, renderWheels, availableViews, type RenderView } from "../lib/venere-renders";
import "./configurator.css";

export default function ConfiguratorPage() {
  const [colourIndex, setColourIndex] = useState(0);
  const [wheelIndex, setWheelIndex] = useState(0);
  const [viewId, setViewId] = useState<RenderView>("side");
  const colour = renderColours[colourIndex];
  const views = availableViews(colour);
  const view = views.find(item => item.id === viewId) ?? views[0];
  const source = colour.images[view.id]!;
  const wheel = renderWheels[wheelIndex];
  const overlays = wheel.overlays[view.id] ?? [];
  const label = `Venere ${colour.name}, cerchi ${wheel.name}, vista ${view.label.toLowerCase()}`;

  return <main className="venere-studio">
    <header className="studio-header">
      <Link href="/venere/" className="studio-back"><span aria-hidden="true">←</span> Venere</Link>
      <h1>Atelier <em>Venere</em></h1><span className="studio-edition">Unica Automobili</span>
    </header>
    <div className="studio-workspace">
      <nav className="studio-views" aria-label="Scegli la vista dell’auto">
        <span className="studio-eyebrow">Esplora</span>
        {views.map((item, index) => <button key={item.id} type="button" className={view.id === item.id ? "selected" : ""}
          aria-pressed={view.id === item.id} onClick={() => setViewId(item.id)}>
          <span className="studio-view-number">0{index + 1}</span>
          <VenereRender key={`${colour.slug}-${item.id}-${wheel.slug}`} source={colour.images[item.id]!} overlays={wheel.overlays[item.id]} framing={item.framing} label="" thumbnail />
          <span>{item.label}</span>
        </button>)}
      </nav>
      <section className="studio-stage" aria-label="Anteprima della tua Venere">
        <div className="studio-stage-heading"><span className="studio-eyebrow">La tua Venere</span><span>{view.label}</span></div>
        <div className="studio-image"><VenereRender key={`${colour.slug}-${view.id}-${wheel.slug}`} source={source} overlays={overlays} framing={view.framing} label={label} /></div>
        <div className="studio-caption"><div><span className="studio-eyebrow">Carrozzeria</span><h2>{colour.name}</h2></div><p>Cerchi {wheel.name}</p></div>
      </section>
      <aside className="studio-panel" aria-label="Personalizza la tua Venere">
        <div className="studio-panel-heading"><span className="studio-eyebrow">La tua interpretazione</span><h2>La tua Venere.</h2></div>
        <div className="studio-options" tabIndex={0} role="region" aria-label="Colori e cerchi disponibili, menu scorrevole">
          <fieldset className="studio-section">
            <legend><span>01</span>Carrozzeria</legend><p>Scegli il colore della tua Venere.</p>
            <div className="studio-swatches studio-swatches-paint">
              {renderColours.map((option, index) => <label key={option.slug} className={colour.slug === option.slug ? "chosen" : ""}>
                <input type="radio" name="paint" value={option.slug} checked={colour.slug === option.slug} onChange={() => {
                  setColourIndex(index);
                  if (!option.images[viewId]) setViewId(availableViews(option)[0].id);
                }} />
                <span className="studio-swatch" style={{ "--finish": option.sample } as CSSProperties} aria-hidden="true" />
                <span className="studio-option-name">{option.name}</span><span className="studio-check" aria-hidden="true">✓</span>
              </label>)}
            </div>
          </fieldset>
          <fieldset className="studio-section">
            <legend><span>02</span>Cerchi</legend><p>Scegli la finitura dei cerchi.</p>
            <div className="studio-swatches studio-wheel-options">
              {renderWheels.map((option, index) => <label key={option.slug} className={wheel.slug === option.slug ? "chosen" : ""}>
                <input type="radio" name="wheels" value={option.slug} checked={wheel.slug === option.slug} onChange={() => setWheelIndex(index)} />
                <span className="studio-swatch" style={{ "--finish": option.sample } as CSSProperties} aria-hidden="true" />
                <span className="studio-option-name">{option.name}</span><span className="studio-check" aria-hidden="true">✓</span>
              </label>)}
            </div>
          </fieldset>
          <section className="studio-summary" aria-label="Riepilogo configurazione"><h3>La tua selezione</h3>
            <dl><div><dt>Modello</dt><dd>Venere</dd></div><div><dt>Carrozzeria</dt><dd>{colour.name}</dd></div><div><dt>Cerchi</dt><dd>{wheel.name}</dd></div></dl>
          </section>
        </div>
        <div className="studio-actions"><button type="button" onClick={() => { setColourIndex(0); setWheelIndex(0); setViewId("side"); }}>Ripristina</button>
          <a href={`mailto:atelier@unicaautomobili.it?subject=${encodeURIComponent("La mia Venere")}&body=${encodeURIComponent(`Vorrei approfondire la Venere in colore ${colour.name}, con cerchi ${wheel.name}.`)}`}>Parlane con l’atelier <span aria-hidden="true">↗</span></a>
        </div>
      </aside>
    </div>
    <p className="studio-announcement" role="status" aria-live="polite">{label}.</p>
  </main>;
}
