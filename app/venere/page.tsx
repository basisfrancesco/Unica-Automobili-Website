"use client";

import { useState } from "react";
import { asset } from "../lib/assets";

const finishes = [
  { name:"Blu Notte", src:"/images/configurator/blu.jpeg", color:"#12314b" }, { name:"Verde Inglese", src:"/images/configurator/verde-inglese.jpeg", color:"#24392f" }, { name:"Arancio Bruciato", src:"/images/configurator/arancione.jpeg", color:"#a94a22" }, { name:"Giallo Modena", src:"/images/configurator/giallo.jpeg", color:"#d9a514" }, { name:"Nero Assoluto", src:"/images/configurator/nero.jpeg", color:"#141414" },
];
const details = [
  { image:"/images/venere/details/front-light.png", number:"01", title:"Uno sguardo netto", copy:"Un segno luminoso sottile, incastonato in una superficie scolpita." },
  { image:"/images/venere/details/side-vent.png", number:"02", title:"Aria, disegnata", copy:"La funzione aerodinamica diventa un gesto grafico che alleggerisce il fianco." },
  { image:"/images/venere/details/rear-wheel.png", number:"03", title:"Tensione meccanica", copy:"Passaruota pieni e una presenza che nasce dalle proporzioni, non dall’eccesso." },
  { image:"/images/venere/details/tail-light.png", number:"04", title:"Una firma nella notte", copy:"La coda concentra tecnologia e carattere in un tratto immediatamente riconoscibile." },
];

export default function VenerePage() {
  const [finish,setFinish]=useState(0); const [technical,setTechnical]=useState<"engine"|"gearbox">("engine");
  return <main className="venere-page">
    <section className="venere-cinematic"><img src={asset("/images/venere-front.png")} alt="Unica Venere"/><div className="model-hero-shade"/><div className="venere-title"><p>Unica Automobili · 01</p><img src={asset("/images/venere-wordmark.png")} alt="Venere"/><span>Gran Turismo, ricreata.</span></div><a href="#essenza" className="hero-scroll"><span/>Scopri Venere</a></section>

    <section className="venere-essence" id="essenza" data-reveal><div className="vertical-note">Designed in Italy</div><div><p className="section-tag light">/ L’essenza</p><h1>Il fascino di una grande GT.<br/><em>La precisione di qualcosa di nuovo.</em></h1><p>Venere nasce dalla Maserati GranTurismo V8, ma non vuole semplicemente trasformarla. Ne conserva l’anima meccanica e le restituisce una carrozzeria, una dinamica e un rapporto con il guidatore completamente nuovi.</p></div></section>

    <section className="venere-profile" id="design" data-reveal><div className="profile-copy"><p className="section-tag light">/ Proporzione</p><h2>Potenza ferma.<br/><em>Anche da immobile.</em></h2><p>Cabina arretrata, cofano disteso, masse raccolte sulle ruote. Venere combina l’eleganza di una barchetta con la presenza di una moderna granturismo.</p></div><img src={asset("/images/venere-side.png")} alt="Profilo di Unica Venere"/></section>

    <section className="detail-story"><div className="detail-head" data-reveal><p className="section-tag">/ Dettagli</p><h2>Disegnata<br/>fino all’ultimo <em>millimetro.</em></h2></div><div className="detail-grid">{details.map((detail,index)=><article className={`detail-card detail-${index+1}`} key={detail.image} data-reveal><div className="detail-image"><img src={asset(detail.image)} alt={detail.title}/><span>{detail.number}</span></div><h3>{detail.title}</h3><p>{detail.copy}</p></article>)}</div></section>

    <section className="technical-section"><div className="technical-head" data-reveal><p className="section-tag light">/ Sotto la pelle</p><h2>Tradizione meccanica.<br/><em>Coinvolgimento contemporaneo.</em></h2></div><div className="technical-stage" data-reveal><div className="technical-visual"><img className={technical==="engine"?"active":""} src={asset("/images/venere/technical/engine.png")} alt="Motore V8 di Venere"/><img className={technical==="gearbox"?"active":""} src={asset("/images/venere/technical/gearbox.png")} alt="Cambio manuale di Venere"/></div><div className="technical-copy"><div className="technical-tabs"><button className={technical==="engine"?"active":""} onClick={()=>setTechnical("engine")}>01 · Motore</button><button className={technical==="gearbox"?"active":""} onClick={()=>setTechnical("gearbox")}>02 · Trasmissione</button></div>{technical==="engine"?<div><span className="tech-number">4.7</span><h3>V8 aspirato</h3><p>Il V8 di origine Ferrari viene rivisto nella risposta e nella respirazione. Un motore che non ha bisogno di artifici per essere memorabile.</p></div>:<div><span className="tech-number">6</span><h3>Rapporti manuali</h3><p>La conversione manuale rimette il pilota al centro: gesto, ritmo e controllo diventano parte integrante dell’esperienza.</p></div>}</div></div></section>

    <section className="front-rear"><figure data-reveal><img src={asset("/images/venere/front.png")} alt="Vista frontale Venere"/><figcaption><span>Front</span><p>Una presenza bassa, larga, priva di aggressività gratuita.</p></figcaption></figure><figure data-reveal><img src={asset("/images/venere/rear-straight.png")} alt="Vista posteriore Venere"/><figcaption><span>Rear</span><p>Volumi pieni e una firma luminosa che chiude la forma.</p></figcaption></figure></section>

    <section className="configurator-v2" id="configuratore"><div className="config-title" data-reveal><p className="section-tag light">/ Configuratore</p><h2>Il colore<br/>cambia il <em>carattere.</em></h2><p>Una prima selezione di finiture sviluppate per leggere ogni superficie di Venere in modo diverso.</p></div><div className="config-stage" data-reveal><div className="config-images">{finishes.map((item,index)=><img key={item.src} src={asset(item.src)} alt={`Venere ${item.name}`} className={finish===index?"active":""}/>)}</div><div className="config-ui"><div><span>Verniciatura esterna</span><strong>{finishes[finish].name}</strong></div><div className="config-swatches">{finishes.map((item,index)=><button key={item.name} onClick={()=>setFinish(index)} className={finish===index?"active":""} aria-label={item.name}><i style={{background:item.color}}/></button>)}</div><div className="config-counter">0{finish+1} / 0{finishes.length}</div></div></div></section>
  </main>;
}
