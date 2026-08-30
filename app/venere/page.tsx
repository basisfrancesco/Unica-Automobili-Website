"use client";

import { useEffect, useState } from "react";
import { asset } from "../lib/assets";

const views = [
  { src: "/images/venere-front.png", label: "Tre quarti anteriore" },
  { src: "/images/venere-side.png", label: "Profilo" },
  { src: "/images/venere-rear.png", label: "Tre quarti posteriore" },
];
const finishes = [
  { name: "Blu Notte", src: "/images/configurator/blu.jpeg", color: "#12314b" },
  { name: "Verde Inglese", src: "/images/configurator/verde-inglese.jpeg", color: "#24392f" },
  { name: "Arancio Bruciato", src: "/images/configurator/arancione.jpeg", color: "#a94a22" },
  { name: "Giallo Modena", src: "/images/configurator/giallo.jpeg", color: "#d9a514" },
  { name: "Nero Assoluto", src: "/images/configurator/nero.jpeg", color: "#141414" },
];

export default function VenerePage() {
  const [view, setView] = useState(0);
  const [finish, setFinish] = useState(0);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setView((current) => (current + 1) % views.length);
      if (event.key === "ArrowLeft") setView((current) => (current - 1 + views.length) % views.length);
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <main className="model-page">
    <section className="model-hero venere-hero">
      <img className="model-hero-bg" src={asset("/images/venere-front.png")} alt="Venere" /><div className="model-hero-shade" />
      <div className="model-hero-title"><p className="section-tag light">/ Unica Automobili — 01</p><img className="wordmark venere-page-mark" src={asset("/images/venere-wordmark.png")} alt="Venere" /><p>Gran Turismo, ricreata.</p></div>
      <a className="scroll-cue" href="#storia"><span /> Scopri</a>
    </section>
    <section className="venere-story" id="storia"><div><span className="number">4.7</span><span className="unit">V8 aspirato</span></div><div className="story-copy"><p>Un motore dal carattere inconfondibile. Una nuova carrozzeria disegnata per esaltarne proporzioni, presenza e purezza.</p><p>La base meccanica della Maserati GranTurismo con V8 di origine Ferrari viene evoluta nel motore, nell’assetto e nel coinvolgimento di guida. Il cambio manuale completa un’esperienza autentica e diretta.</p></div></section>
    <section className="gallery-section"><div className="section-intro"><p className="section-tag light">/ La forma</p><h2>Ogni linea ha<br /><em>una ragione.</em></h2></div><div className="viewer">{views.map((item,index)=><img key={item.src} src={asset(item.src)} alt={`Venere — ${item.label}`} className={view===index?"active":""}/>)}<div className="viewer-controls">{views.map((item,index)=><button key={item.label} className={view===index?"active":""} onClick={()=>setView(index)}><span>0{index+1}</span>{item.label}</button>)}</div></div></section>
    <section className="pillars"><article><span>01</span><h3>Disegnata da zero</h3><p>Ogni superficie è ripensata. Le proporzioni classiche incontrano un linguaggio scultoreo e contemporaneo.</p></article><article><span>02</span><h3>Meccanica evoluta</h3><p>Motore, ciclistica e risposta dinamica affinati per dare nuova precisione a una grande GT italiana.</p></article><article><span>03</span><h3>Manuale, per scelta</h3><p>Una conversione studiata per restituire al pilota ritmo, controllo e il piacere di ogni cambiata.</p></article></section>
    <section className="configurator" id="configuratore"><div className="configurator-head"><div><p className="section-tag">/ Configuratore</p><h2>Trova il tuo<br /><em>colore.</em></h2></div><p>Esplora una prima selezione di finiture sviluppate per Venere. Ogni tonalità cambia la luce, le superfici e il carattere dell’auto.</p></div><div className="configurator-stage"><div className="configurator-images">{finishes.map((item,index)=><img key={item.src} src={asset(item.src)} alt={`Venere in finitura ${item.name}`} className={finish===index?"active":""}/>)}<span className="stage-label">Vista laterale</span><span className="stage-count">0{finish+1} / 0{finishes.length}</span></div><div className="finish-panel"><div className="finish-title"><span>Verniciatura esterna</span><strong>{finishes[finish].name}</strong></div><div className="swatches" role="radiogroup" aria-label="Seleziona la finitura esterna">{finishes.map((item,index)=><button key={item.name} className={finish===index?"active":""} onClick={()=>setFinish(index)} role="radio" aria-checked={finish===index} aria-label={item.name}><i style={{backgroundColor:item.color}}/></button>)}</div><div className="config-summary"><span>Venere</span><span>V8 4.7 · Manuale</span><a href="mailto:atelier@unicaautomobili.it">Richiedi questa configurazione ↗</a></div></div></div></section>
  </main>;
}
