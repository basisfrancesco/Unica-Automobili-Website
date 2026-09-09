"use client";

import Link from "next/link";
import { useState, type CSSProperties } from "react";
import VenerePreview, { type VenereConfiguration } from "../components/VenerePreview";
import { paints, wheels, calipers, interiors } from "../lib/venere-config";
import { views, type Surface, type VenereView } from "../lib/venere-views";
import "./configurator.css";

const initialConfiguration: VenereConfiguration = {
  paint: paints[0], wheels: wheels[0], calipers: calipers[4], interiors: interiors[0],
};
const sections: { id: Surface; title: string; subtitle: string; options: { slug: string; name: string; sample: string; note?: string }[] }[] = [
  { id: "paint", title: "Carrozzeria", subtitle: "Il colore della tua Venere.", options: paints },
  { id: "wheels", title: "Cerchi", subtitle: "Tre interpretazioni dello stesso disegno.", options: wheels },
  { id: "calipers", title: "Pinze freno", subtitle: "Un accento tra le razze.", options: calipers },
  { id: "interiors", title: "Interni", subtitle: "Il tuo spazio, la tua materia.", options: interiors },
];

export default function ConfiguratorPage() {
  const [view, setView] = useState<VenereView>("side");
  const [configuration, setConfiguration] = useState(initialConfiguration);
  const label = Object.values(configuration).map(item => item.name).join(" · ");
  const currentView = views.find(item => item.id === view)!;
  return <main className="venere-studio">
    <header className="studio-header">
      <Link href="/venere/" className="studio-back"><span aria-hidden="true">←</span> Venere</Link>
      <h1>Atelier <em>Venere</em></h1><span className="studio-edition">Unica Automobili</span>
    </header>
    <div className="studio-workspace">
      <nav className="studio-views" aria-label="Scegli la vista dell’auto">
        <span className="studio-eyebrow">Esplora</span>
        {views.map((item, index) => <button key={item.id} type="button" className={view === item.id ? "selected" : ""}
          aria-pressed={view === item.id} onClick={() => setView(item.id)}>
          <span className="studio-view-number">0{index + 1}</span>
          <VenerePreview view={item.id} configuration={initialConfiguration} thumbnail /><span>{item.label}</span>
        </button>)}
      </nav>
      <section className="studio-stage" aria-label="Anteprima della tua Venere">
        <div className="studio-stage-heading"><span className="studio-eyebrow">La tua Venere</span><span>{currentView.label}</span></div>
        <div className="studio-image"><VenerePreview view={view} configuration={configuration} /></div>
        <div className="studio-caption"><div><span className="studio-eyebrow">Verniciatura</span><h2>{configuration.paint.name}</h2></div>
          <p>{configuration.wheels.name}<br />Interni {configuration.interiors.name}</p></div>
      </section>
      <aside className="studio-panel" aria-label="Personalizza la tua Venere">
        <div className="studio-panel-heading"><span className="studio-eyebrow">Su misura</span><h2>Ogni dettaglio, tuo.</h2></div>
        <div className="studio-options" tabIndex={0} role="region" aria-label="Finiture e materiali, menu scorrevole">
          {sections.map((section, index) => <fieldset className="studio-section" key={section.id}>
            <legend><span>0{index + 1}</span>{section.title}</legend><p>{section.subtitle}</p>
            {(section.id === "wheels" || section.id === "calipers") && view !== "side" &&
              <button className="studio-side-hint" type="button" onClick={() => setView("side")}>Osserva il dettaglio nella vista laterale ↗</button>}
            <div className={`studio-swatches studio-swatches-${section.id}`}>
              {section.options.map(option => <label key={option.slug} className={configuration[section.id].slug === option.slug ? "chosen" : ""}>
                <input type="radio" name={section.id} value={option.slug} checked={configuration[section.id].slug === option.slug}
                  onChange={() => setConfiguration(previous => ({ ...previous, [section.id]: option }))} />
                <span className="studio-swatch" style={{ "--finish": option.sample } as CSSProperties} aria-hidden="true" />
                <span className="studio-option-name">{option.name}{option.note && <small>{option.note}</small>}</span>
                <span className="studio-check" aria-hidden="true">✓</span>
              </label>)}
            </div>
          </fieldset>)}
          <section className="studio-summary" aria-label="Riepilogo configurazione"><h3>La tua selezione</h3>
            <dl>{sections.map(section => <div key={section.id}><dt>{section.title}</dt><dd>{configuration[section.id].name}</dd></div>)}</dl>
          </section>
        </div>
        <div className="studio-actions"><button type="button" onClick={() => setConfiguration(initialConfiguration)}>Ripristina</button>
          <a href={`mailto:atelier@unicaautomobili.it?subject=${encodeURIComponent("La mia Venere")}&body=${encodeURIComponent(`Vorrei approfondire questa configurazione Venere:\n\n${sections.map(section => `${section.title}: ${configuration[section.id].name}`).join("\n")}`)}`}>Parlane con l’atelier <span aria-hidden="true">↗</span></a>
        </div>
      </aside>
    </div>
    <p className="studio-announcement" role="status" aria-live="polite">{currentView.label}. {label}.</p>
  </main>;
}
