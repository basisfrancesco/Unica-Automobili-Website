"use client";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import VenereRender, { preloadRender } from "../components/VenereRender";
import { renderColours, renderGroups, renderViews, selectedOverlays, type RenderView } from "../lib/venere-renders";
import "./configurator.css";

export default function ConfiguratorPage() {
  const [colourIndex, setColourIndex] = useState(0);
  const [selection, setSelection] = useState<Record<string, number>>({});
  const [viewId, setViewId] = useState<RenderView>("side");
  const colour = renderColours[colourIndex];
  const view = renderViews.find(item => item.id === viewId)!;
  const overlays = selectedOverlays(selection, viewId);
  const choices = renderGroups.map(group => ({ ...group, selected: group.options[selection[group.id] ?? 0] }));
  const description = choices.map(group => `${group.label}: ${group.selected.name}`).join(", ");
  const label = `Venere ${colour.name}, ${description}, vista ${view.label.toLowerCase()}`;
  const warmView = (id: RenderView) => preloadRender(colour.images[id], selectedOverlays(selection, id));

  return <main className="venere-studio">
    <header className="studio-header">
      <Link href="/venere/" className="studio-back"><span aria-hidden="true">←</span> Venere</Link>
      <h1>Atelier <em>Venere</em></h1><span className="studio-edition">Unica Automobili</span>
    </header>
    <div className="studio-workspace">
      <nav className="studio-views" aria-label="Scegli la vista dell’auto">
        <span className="studio-eyebrow">Esplora</span>
        {renderViews.map((item, index) => <button key={item.id} type="button" className={view.id === item.id ? "selected" : ""}
          aria-pressed={view.id === item.id} onPointerEnter={() => warmView(item.id)} onFocus={() => warmView(item.id)} onClick={() => setViewId(item.id)}>
          <span className="studio-view-number">0{index + 1}</span>
          <VenereRender source={colour.thumbnails[item.id]} overlays={[]} framing={item.framing} height={item.height} label="" thumbnail />
          <span>{item.label}</span>
        </button>)}
      </nav>
      <section className="studio-stage" aria-label="Anteprima della tua Venere">
        <div className="studio-stage-heading"><span className="studio-eyebrow">La tua Venere</span><span>{view.label}</span></div>
        <div className="studio-image"><VenereRender source={colour.images[viewId]} overlays={overlays} framing={view.framing} height={view.height} label={label} /></div>
        <div className="studio-caption"><div><span className="studio-eyebrow">Carrozzeria</span><h2>{colour.name}</h2></div><p>Cerchi {choices[0].selected.name}<br />Interni {choices[1].selected.name}</p></div>
      </section>
      <aside className="studio-panel" aria-label="Personalizza la tua Venere">
        <div className="studio-panel-heading"><span className="studio-eyebrow">La tua interpretazione</span><h2>La tua Venere.</h2></div>
        <div className="studio-options" tabIndex={0} role="region" aria-label="Personalizzazioni disponibili, menu scorrevole">
          <fieldset className="studio-section">
            <legend><span>01</span>Carrozzeria</legend><p>Scegli il colore della tua Venere.</p>
            <div className="studio-swatches studio-swatches-paint">
              {renderColours.map((option, index) => <label key={option.slug} className={colour.slug === option.slug ? "chosen" : ""}
                onPointerEnter={() => preloadRender(option.images[viewId], overlays)}>
                <input type="radio" name="paint" value={option.slug} checked={colour.slug === option.slug}
                  onFocus={() => preloadRender(option.images[viewId], overlays)} onChange={() => setColourIndex(index)} />
                <span className="studio-swatch" style={{ "--finish": option.sample } as CSSProperties} aria-hidden="true" />
                <span className="studio-option-name">{option.name}</span><span className="studio-check" aria-hidden="true">✓</span>
              </label>)}
            </div>
          </fieldset>
          {choices.map((group, groupIndex) => <fieldset key={group.id} className="studio-section">
            <legend><span>0{groupIndex + 2}</span>{group.label}</legend>
            <p>{group.id !== "interior" && viewId !== "side" ? "Osserva questo dettaglio nella vista laterale." : "Scegli la tua finitura."}</p>
            <div className="studio-swatches studio-swatches-paint">
              {group.options.map((option, index) => {
                const next = { ...selection, [group.id]: index };
                const warm = () => preloadRender(colour.images[viewId], selectedOverlays(next, viewId));
                return <label key={option.slug} className={group.selected.slug === option.slug ? "chosen" : ""} onPointerEnter={warm}>
                  <input type="radio" name={group.id} value={option.slug} checked={group.selected.slug === option.slug} onFocus={warm} onChange={() => setSelection(next)} />
                  <span className="studio-swatch" style={{ "--finish": option.sample } as CSSProperties} aria-hidden="true" />
                  <span className="studio-option-name">{option.name}</span><span className="studio-check" aria-hidden="true">✓</span>
                </label>;
              })}
            </div>
          </fieldset>)}
          <section className="studio-summary" aria-label="Riepilogo configurazione"><h3>La tua selezione</h3>
            <dl><div><dt>Modello</dt><dd>Venere</dd></div><div><dt>Carrozzeria</dt><dd>{colour.name}</dd></div>
              {choices.map(group => <div key={group.id}><dt>{group.label}</dt><dd>{group.selected.name}</dd></div>)}
            </dl>
          </section>
        </div>
        <div className="studio-actions"><button type="button" onClick={() => { setColourIndex(0); setSelection({}); setViewId("side"); }}>Ripristina</button>
          <a href={`mailto:atelier@unicaautomobili.it?subject=${encodeURIComponent("La mia Venere")}&body=${encodeURIComponent(`Vorrei approfondire la Venere in colore ${colour.name}. ${description}.`)}`}>Parlane con l’atelier <span aria-hidden="true">↗</span></a>
        </div>
      </aside>
    </div>
    <p className="studio-announcement" role="status" aria-live="polite">{label}.</p>
  </main>;
}
